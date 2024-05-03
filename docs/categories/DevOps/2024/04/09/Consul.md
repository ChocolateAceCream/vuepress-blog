---
title: Consul Intro
author: ChocolateAceCream
date: 2024/04/09 19:00
isTop: false
categories:
 - DevOps
tags:
 - Consul
 - Go
 - Kubernetes
---


# Consul <Badge text="Consul" type="warning" />
consul is used for service discovery and registration.

##### install
1. add repo
> helm repo add hashicorp https://helm.releases.hashicorp.com

2. check consul chart
> helm search repo hashicorp/consul

3. make sure consul namespace is not taken
> kubectl get namespace

4. install  consul using helm
> helm install consul hashicorp/consul --set global.name=consul --create-namespace --namespace consul

5. expose consul endpoint to external use, with ingress (make sure ingress controller is already installed and host consul-ui exist in your hosts file)

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
              number: 8500
```

6. register service to consul. Remember to de-register service when service end, because consul will not do that automatically. Consul will check health status of service, if it's unhealthy for 48 hours (default), then it's removed.
p.s. if using wsl, bind address to private ip e.g. 172.xxx.xxx.xx
```go
apiClient, _ := consulApi.NewClient(&consulApi.Config{
		Address: "consul-ui",
	})
	client := consul.NewClient(apiClient)

	// Create a Consul registrar
	registrar := consul.NewRegistrar(client, &consulApi.AgentServiceRegistration{
		ID:      "strService-1",
		Name:    "strService",
		Port:    port,
		Address: address,
		Check: &consulApi.AgentServiceCheck{
			HTTP:                           fmt.Sprintf("http://%s:%d/health", address, 3300),
			Timeout:                        "30s",
			Interval:                       "5s",
			DeregisterCriticalServiceAfter: "120s", //check失败后120秒删除本服务
		},
		// Check: &consulApi.AgentServiceCheck{
		// 	HTTP:     "http://192.168.1.247:3300/health",
		// 	Interval: "10s",
		// },
	}, logger)

	// HTTP transport
	errChan := make(chan error)
	go func() {
		registrar.Register()
		errChan <- s.ListenAndServe()
	}()

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errChan <- fmt.Errorf("%s", <-c)
	}()

	error := <-errChan
	registrar.Deregister()
	logger.Log("err", error)
```