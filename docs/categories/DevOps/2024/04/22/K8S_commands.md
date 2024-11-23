---
title: Kubernetes Common operations and commands
author: ChocolateAceCream
date: 2024/04/22 19:00
isTop: true
categories:
 - DevOps
tags:
 - Kubernetes
---

# Kubernetes Common operations and commands <Badge text="Kubernetes" type="warning" />
1. enter a pod
>  kubectl exec -it consul-server-0 -n consul -- /bin/sh

you may want to run
> kubectl get pods -n consul

to get pod name under namespace consul

2. view logs of specific pod
> kubectl logs -n ingress-nginx ingress-nginx-controller-7b576d7f46-gtmmk

same, you want to run
> kubectl get pods -n ingress-nginx

to get your pod name first

3. retrieve k8s manifest that was generated by helm when installing the chart
> helm get manifest consul --namespace consul

where first consul is the actual release name.
P.S this only display the yaml during the installation. Once you change the config later manually, it's not covered in the output.

4. -w -l
-w is used for real-time result update. (watch), only apply to kubectl get
-f is used with kubectl logs to get live log feeds
-l is used for label match
e.g.
> kubectl get pods --namespace=default -l app=elasticsearch-master -w
will find pods under that namespace with lable app=xxx, and live update the result once changed.

5. port forward
kubectl port-forward svc/my-demo-app-service 8081:8081 -n gokit