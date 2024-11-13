---
title: Consul
author: ChocolateAceCream
date: 2024/11/10 16:25
categories:
 - KONG
tags:
 - AWS
 - Go
 - EKS
 - VPC
 - Consul
---

# Consul setup

## Purpose
use consul api-gateway as backend api entry point, then implement traffic split and service mesh, as well as observation system using prometheus/grafana/loki in a EKS environment
## Things to notice
It's common practice to put all backend api services behind consul api-gateway, so gateway can take care of routing, auth, certificates etc...
For the frontend code, there's no need to put it behind a gateway, so a stand-alone nginx service is good enough, or other option is to put it in s3 + CDN.
## Steps
1. Setup EKS and VPC using terraform
2. setup portainer
> kubectl apply -f https://downloads.portainer.io/ce2-16/portainer-agent-k8s-lb.yaml
3. install consul using helm
> helm install --values values-v1.yaml consul hashicorp/consul --create-namespace --namespace consul --version "1.2.0"
- after install, run this
> export CONSUL_HTTP_TOKEN=$(kubectl get --namespace consul secrets/consul-bootstrap-acl-token --template={{.data.token}} | base64 -d)

>export CONSUL_HTTP_ADDR=https://$(kubectl get services/consul-ui --namespace consul -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

so you can retrieve url and token which used for consul ui login

4. install ebs
> kubectl apply -f ebs.yaml
5. install api gateway
> kubectl apply -f consul-api-gateway.yaml
6. install demo services
> kubectl apply -f echo-service.yaml

demo services includes:
- service resolver (used to identify subsets)
- ervice splitter (used to split traffic to different subset based on weight)
- service defaults - used to specify the  protocol to used (http)
- service - used to register in consul service mesh
- service account - used by consul to manage the sidecar proxy injected into each service pod
- two deployment of pods - service resolver will identify subsets based on this annotation **"consul.hashicorp.com/service-meta-version": "xxx"**

7. create intentions to assign api-gateway permission to visit echo services
> kubectl apply -f intentions.yaml

8. create routes to define gateway re-routing rules
> kubectl apply -f routes.yaml

9. test if traffic is split using api-gateway svc external ip
> kubectl get svc -n consul

then copy the link and run this script
```bash
# Define the URL
url="https://link-from-previous-step:8443/echo-demo"

# Loop 10 times
for i in {1..10}; do
    # Send the request and parse the "service" field using jq
    service=$(curl -s -k "$url" | jq -r '.service')
    echo "Request $i: Service = $service"
done
```

you should see which pod the request goes to

10. install observation stack
> install-prom-gra-loki.sh

11. forward port of grafana svc so you can check dashboard locally
> kubectl port-forward svc/grafana 3000:3000