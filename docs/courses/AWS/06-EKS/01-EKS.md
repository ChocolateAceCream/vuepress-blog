---
title: EKS
author: ChocolateAceCream
date: 2024/11/05 16:25
categories:
 - AWS
tags:
 - AWS
 - Go
 - EKS
 - VPC
---

# Setup EKS and VPC using terraform
## Why VPC
VPC can be used to provide a unified entry point for all services, not limited to EKS, S3, etc, so each service will communicate to each other in same internal network.

You can define your own subset inside VPC like this:
10.0.1.0/24
which means first 24 bits of ip is fixed as identity of this subnet
then last 8 bits, 10.0.1.1 to 10.0.1.254 is its Usable IP Addresses
p.s.
10.0.1.0 represents the network address
10.0.1.255 is the broadcast address

## How
1. setup aws credentials using access key and secret
> aws configuration
2. terraform apply the config file
```hcl
# Specify provider
provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {
  filter {
    name = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

locals {
  cluster_name = "my-eks-${random_string.suffix.result}"
}

resource "random_string" "suffix" {
  length = 8
  special = false
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.8.1"
  name = "my-vpc"
  cidr = "10.0.0.0/16"
  azs = slice(data.aws_availability_zones.available.names, 0, length(data.aws_availability_zones.available.names))
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }
}

module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "20.8.5"

  cluster_name = local.cluster_name
  cluster_version = "1.29"

  cluster_endpoint_public_access           = true
  enable_cluster_creator_admin_permissions = true

  cluster_addons = {
    aws-ebs-csi-driver = {
      service_account_role_arn = module.irsa-ebs-csi.iam_role_arn
    }
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"
  }

  eks_managed_node_groups = {
    one = {
      name = "node-group-1"

      instance_types = ["t3.small"]

      min_size     = 1
      max_size     = 3
      desired_size = 2
    }

    two = {
      name = "node-group-2"

      instance_types = ["t3.small"]

      min_size     = 1
      max_size     = 2
      desired_size = 1
    }
  }
}

# https://aws.amazon.com/blogs/containers/amazon-ebs-csi-driver-is-now-generally-available-in-amazon-eks-add-ons/
data "aws_iam_policy" "ebs_csi_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}

module "irsa-ebs-csi" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role-with-oidc"
  version = "5.39.0"

  create_role                   = true
  role_name                     = "AmazonEKSTFEBSCSIRole-${module.eks.cluster_name}"
  provider_url                  = module.eks.oidc_provider
  role_policy_arns              = [data.aws_iam_policy.ebs_csi_policy.arn]
  oidc_fully_qualified_subjects = ["system:serviceaccount:kube-system:ebs-csi-controller-sa"]
}
```

3. use aws to setup kubectl
>  aws eks --region us-west-1 update-kubeconfig --name your-eks-cluster-name

# network
## inbound
you can Expose the Deployment with a LoadBalancer Service, so that deployment can be visited from anywhere in the internet
aws will auto-generate an external ip for that service (need to wait few minutes for DNS record updated)
e.g. hello world
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
  labels:
    app: hello-world
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - name: helloworld
        image: karthequian/helloworld:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: hello-world-service
  labels:
    app: hello-world
spec:
  type: LoadBalancer
  selector:
    app: hello-world
  ports:
    - protocol: TCP
      port: 80          # External port for the service
      targetPort: 80   # Port on the container
```

## outbound
if pod inside eks wants to visit internet, we can configure a NAT with a elastic ip so  all the outbound connections from an instance can be configured to go through NAT and the IP address that the destination server sees will be the IP address of the NAT gateway which is static.

## Clean up
When delete EKS, sometimes you need to manually delete its dependencies, from the following aspects:
1. in EC2 panel, check EBS that associated with EKS node ec2 instance, delete those
2. still in EC2 panel, check load balancer, delete VPC related ones
3. back to VPS panel, try to delete your VPC