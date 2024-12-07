---
title: Redis Cluster
author: ChocolateAceCream
date: 2024/12/05 16:25
categories:
 - Redis
tags:
 - AWS
 - Redis
 - Cloud
 - StatefulSet
 - StorageClass
---

# Deploy redis cluster in EKS <Badge text="redis" type="warning" />
When deploy redis cluster in eks, it has to be deployed as a StatefulSet, so its data can be persistent.

## StatefulSet
Used to manage stateful applications. Unlike Deployment, StatefulSet is used when the app's identity or storage must persist across pod restarts or rescheduling.

A StatefulSet usually have three components:
- pod template
- volume claim template: a template for creating separated pvc for each stateful pods
- selector

So, in order to create PVC, we need to first define a StorageClass (check 03-pgsql for memory refreshment)

Let's break down each part of k8s deployment config file to understand how to deploy redis cluster

### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-cluster
data:
  update-node.sh: |
    #!/bin/sh
    REDIS_NODES="/data/nodes.conf"
    sed -i -e "/myself/ s/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/${POD_IP}/" ${REDIS_NODES}
    exec "$@"
  redis.conf: |+
    cluster-enabled yes
    cluster-require-full-coverage no # allow cluster to continue operating even if some nodes/shards are down
    cluster-node-timeout 15000 # time to wait before considering node as failed
    cluster-config-file /data/nodes.conf
    cluster-migration-barrier 1 # at least 1 replica need to confirm the migration before its finalized
    appendonly yes # AOF, so operations will be replay on the restart
    protected-mode no # allow redis to accept connections from any IP address
```

update-node.sh will
1. match lines in nodes.conf that contains the word myself
2. replace ip address to the POD_IP (which is an env variable injected by k8s, representing the current pod's ip)

### volumeClaimTemplates
a template used to create unique PVC for each pod, these PVCs are named using the statefulSet and pod name, ensure stable and unique storage per pod
p.s. you need to create StorageClass first
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
spec:
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 5Gi
      storageClassName: data
```
the PVC created would be named like this:
- data-redis-cluster-0
- data-redis-cluster-1
- data-redis-cluster-2

### templates
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
spec:
  serviceName: redis-cluster
  replicas: 6
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
      - name: redis
        image: redis:6.0.6
        ports:
        - containerPort: 6379
          name: client
        - containerPort: 16379
          name: gossip # The Redis gossip protocol port used for cluster node communication.
        command: ["/conf/update-node.sh", "redis-server", "/conf/redis.conf"]
        env:
        - name: POD_IP
          valueFrom:
            fieldRef: # dynamic reference to a specific field from the pod's meta or status
              fieldPath: status.podIP # other fields available is metatdata.name, status.hostIP (node ip)
        volumeMounts:
        - name: conf
          mountPath: /conf
          readOnly: false # default for volumes
        - name: data
          mountPath: /data
          # readOnly: false
      volumes:
      - name: conf
        configMap:
          name: redis-cluster
          defaultMode: 0755
```

I want to talk more about this line of code
> command: ["/conf/update-node.sh", "redis-server", "/conf/redis.conf"]

the first element in `command` array is the executable script and others are the params passed to that executable. If we look at the script `update-node.sh` we can find an interested line
> exec "$@"

the exec here is replacing the main process with a new process which running the arguments passed into that script. It's very important to do so in a container environment since:
1. the process running in the container is typically PID 1, and that process is where signals like `SIGTERM` were sent to.
2. without exec, `redis-server` will be executed in a child process, and the main process, PID 1, won't propagate signal to its child process, so you will never be able to control it.


# Summary
the whole config file is like this
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-cluster
data:
  update-node.sh: |
    #!/bin/sh
    REDIS_NODES="/data/nodes.conf"
    sed -i -e "/myself/ s/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/${POD_IP}/" ${REDIS_NODES}
    exec "$@"
  redis.conf: |+
    cluster-enabled yes
    cluster-require-full-coverage no
    cluster-node-timeout 15000
    cluster-config-file /data/nodes.conf
    cluster-migration-barrier 1
    appendonly yes
    protected-mode no
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
spec:
  serviceName: redis-cluster
  replicas: 6
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
      - name: redis
        image: redis:6.0.6
        ports:
        - containerPort: 6379
          name: client
        - containerPort: 16379
          name: gossip
        command: ["/conf/update-node.sh", "redis-server", "/conf/redis.conf"]
        env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        volumeMounts:
        - name: conf
          mountPath: /conf
          readOnly: false
        - name: data
          mountPath: /data
          readOnly: false
      volumes:
      - name: conf
        configMap:
          name: redis-cluster
          defaultMode: 0755
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 5Gi
      storageClassName: data
```