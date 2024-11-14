---
title: pgsql in EKS
author: ChocolateAceCream
date: 2024/11/13 16:25
categories:
 - AWS
tags:
 - AWS
 - PVC
 - EKS
 - pgSQL
---

# Setup PgSQL inside eks cluster
## Why
After deploy consul, I think it's time to deploy some go-kit micro services. The first one comes to my mind is a auth service, which will use redis and pgsql for sure.

## How
Before I start, i realized one important thing: each node in eks can only hold certain numbers of pods (depends on the node ec2 type.) t3.small can only hold 11 pods per node, and consul/prometheus/grafana those pods already take place like 10 pods per node. That's why I failed to deploy my pgsql pod on my first try.

Then i delete one demo pods, and tried again, still failed. Because pgsql try to create pods randomly on each node, once failed (because node pod is reaching capacity), it retry on next node. However, each try, since all deployment is using one PVC, that PVC is contaminated. Which result in failure of pgsql deployment. Lessons learned here is:
1. apply your service/deployment first, then apply your PVC/storageClass file, so pod will have time to reach an available node
2. add new node when you don't have enough pods. According to the document, the reason why each node can only deploy certain numbers of pod is because potentially, each pod can have their own external ip (public ip), so that's the bottleneck where capacity comes.

## StorageClass
For my understanding, StorageClass is like a template, so when creating PVC, you can use the StorageClass to create same type PVC.
e.g.
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gp3-immediate
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
reclaimPolicy: Delete # Retain: Keeps the EBS volume even if the PVC is deleted. You may want to use Delete if you want the volume to be deleted automatically when the PVC is deleted
volumeBindingMode: Immediate # The volume is provisioned as soon as the PVC is created. Alternatively, you can use WaitForFirstConsumer to delay provisioning until the PVC is bound to a Pod
```

## PVC (PersistentVolumeClaim)
the EBS that can be attached/mounted to certain pod. Since it's EBC indeed, it can easily adjust its size (increase only), so no need to assign a large size at the initialization.
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pgsql-pvc
spec:
  accessModes:
    - ReadWriteOnce # The volume can be mounted as read-write by a single node
  resources:
    requests:
      storage: 1Gi  # Adjust size as needed
  storageClassName: gp3-immediate  # Name of your StorageClass, or leave empty if default
```

# deployment
Deployment is not hard, but two gotcha to notice here
1. configMap can be created using cli like this
> kubectl create configmap pgsql-init-script --from-file=init.sql

but then if you need to update the configMap or that init.sql file, you need to re-create it and rollout restart the pod using that configMap as well.

2.  When PVC is created, the root folder is used for lost + found, so use PGDATA to specify a subfolder that used to hold pgsql data.
e.g. if your pvc mountPath is defined as /var/lib/postgresql/data, since pvc root path contains lost+found, we need explicit define a subfolder using env variable PGDATA as /var/lib/postgresql/data/pgdata, so pgsql data will be store at pvc's root_path/pgdata folder.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: pgsql-init-script
data:
  init.sql: |
    -- Create the database
    CREATE DATABASE iot_backend;

    -- Connect to the database to run the following commands within its context
    \connect iot_backend;

    -- Create the user with the specified password
    CREATE USER nuodi WITH PASSWORD '123qwe';

    -- Grant all privileges on the database to the user
    GRANT ALL PRIVILEGES ON DATABASE iot_backend TO nuodi;

    -- Grant usage and create privileges on the public schema to the user
    GRANT USAGE ON SCHEMA public TO nuodi;
    GRANT CREATE ON SCHEMA public TO nuodi;
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  labels:
    app: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:alpine
        ports:
        - containerPort: 5432
        resources:
          requests:
            memory: "256Mi"
            cpu: "500m"
          limits:
            memory: "500Mi"
            cpu: "1000m"
        env:
        - name: POSTGRES_USER
          value: "root"
        - name: POSTGRES_PASSWORD
          value: "123qwe"
        - name: PGDATA
          value: "/var/lib/postgresql/data/pgdata"  # Set PGDATA to the subdirectory path
        volumeMounts:
        - name: pgsql-data
          mountPath: /var/lib/postgresql/data  # Mount the volume here
        - name: pgsql-init-scripts
          mountPath: /docker-entrypoint-initdb.d  # PostgreSQL will automatically run any scripts in this directory
      volumes:
      - name: pgsql-data
        persistentVolumeClaim:
          claimName: pgsql-pvc
      - name: pgsql-init-scripts
        configMap:
          name: pgsql-init-script
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  type: LoadBalancer
  ports:
  - port: 5432
    targetPort: 5432
  selector:
    app: postgres

```