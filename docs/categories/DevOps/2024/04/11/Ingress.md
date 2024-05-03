---
title: Ingress Intro
author: ChocolateAceCream
date: 2024/04/11 19:00
isTop: false
categories:
 - DevOps
tags:
 - Ingress
 - Kubernetes
---

# Ingress

#### Intro
ingress is used to manage the external access to the services inside a k8s clusters.

In order to use ingress, you have to first create an ingress controller, then define your own routing rules to direct traffics.

e.g. create an ingress proxy to direct traffic to local k8s cluster service running in docker desktop

1. install ingress controller. so controller will automatically detect rules and apply those rules to proxy request
> helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update \
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

this will install ingress under ingress-nginx namespace, if that namespace is not exists, it will create one automatically

3. check if ingress controller is running
> kubectl get service -n ingress-nginx

you can check the log for the controller from pod like this:
> kubectl get pod -n ingress-nginx

to get a list of pods, copy the pod name for controller, then run this
> kubectl logs -n ingress-nginx <pod_name>

4. apply routing rules
```yml
# consul-ingress.yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: consul-ui-ingress
  namespace: consul
spec:
  ingressClassName: nginx
  rules:
  - host: "consul-ui"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: consul-ui
            port:
              number: 80
```
several things to notice here:
- this ingress service has to be under the same namespace of the service endpoint you want redirect your traffic to. In this case, it has to be under consul namespace, which is the same namespace of consul-ui service.
- ingressClassName is a new concept in k8s 1.18+,  to specify the class of Ingress Controllers that should handle the Ingress, depends on the ingress controller type installed on k8s cluster.
to check which class in your case, run
> kubectl get ingressclass
- host can only be names but not ips. remember to add consul-ui to your hosts files.
- ingress cannot forward host:ip, it can only listen to port 80 for http or 443 for https, so best practice is to add different host names in your hosts file. Ingress will redirect the request based on the host name of the request.

Now apply this rules:
> kubectl apply -f consul-ingress.yml

Now if you visit consul-ui, ingress will redirect that request to consul-ui service port 80


### Other approach
you can simply forward a port using
> kubectl port-forward service/consul-server --namespace consul 8500:8500

to map that service port to localhost port 8500