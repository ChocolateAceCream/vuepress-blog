---
title: envoy Proxy
author: ChocolateAceCream
date: 2024/11/16 16:25
categories:
 - Consul
tags:
 - AWS
 - Go
 - EKS
 - VPC
 - envoy
 - Consul
---

# envoy
Consul use envoy for its sidecar mode.
## Sidecar mode
When deploy a service inside consul service mesh using k8s, you need to deploy multiple stuff along with it, which must includes:
- **ServiceDefaults**
- ServiceAccount
- Deployment
- Service
- ServiceIntentions
- HTTPRoute

and optionally, you can also includes

- ServiceResolver
- ServiceSplitter

if you want to split your traffic into each deployment replicated pods with given rules, which is useful in canary/ grey test

### Intro
Let's focus on sidecar mode. In each service deployed inside consul service mesh, inside its deployment pod, there're two containers: one is for running your micro service code, and the other is envoy proxy.

### ServiceDefaults
To config the behavior of that envoy, you can put those configs inside your ServiceDefaults config.

e.g. A very simple ServiceDefaults config
```yaml
apiVersion: consul.hashicorp.com/v1alpha1
kind: ServiceDefaults
metadata:
  name: echo-1 # the name of micro service that using this ServiceDefaults
  namespace: default # the namespace of that micro service
spec:
  protocol: http
```

### ProxyDefaults
optionally, you can apply a ProxyDefaults when you start your consul service mesh.The config inside ProxyDefaults will apply to all services that deployed in that service mesh as default envoy setting.

e.g.
```yaml
apiVersion: consul.hashicorp.com/v1alpha1
kind: ProxyDefaults
metadata:
  name: global
spec:
  config:
    envoy_prometheus_bind_addr: '0.0.0.0:20200'
```

### Conclusion
Use ServiceDefaults to configure individual services (e.g., protocol settings).
Use ProxyDefaults to enforce global configurations for all proxies (e.g., resource limits, logging).
The two configurations work together, with ServiceDefaults overriding ProxyDefaults for specific services.

## Extension
Envoy has a lot of extension to use, but consul only support some of those.
### lua extension
you can use this extension to run a lua script on envoy sidecar proxy. It should be able to listen both inbound and outbound request, but seems like consul only support inbound listener
e.g.
```yaml
apiVersion: consul.hashicorp.com/v1alpha1
kind: ServiceDefaults
metadata:
  name: echo-1
  namespace: default
spec:
  protocol: http
  envoyExtensions:
  - name: "builtin/lua" # has to be this so it can be recognized by envoy
    arguments:
      proxyType: "connect-proxy"
      listener: "inbound"
      script: |-
        function envoy_on_request(request_handle)
          request_handle:logInfo("---inbound---")
          -- Store the original path in a custom header
          local original_path = request_handle:headers():get(":path")
          request_handle:logInfo("Original path: " .. original_path)
          request_handle:headers():add("x-original-path", original_path)

          -- Rewrite the path to "/" for the auth service
          request_handle:headers():replace(":path", "/")
          request_handle:logInfo("Rewritten path for auth: /")

          -- Iterate over all headers and log their key-value pairs
          for key, value in pairs(request_handle:headers()) do
              request_handle:logInfo(key .. ": " .. value)
          end
        end
```

### external auth
ext-authz extension can reroute the auth process to an external service.
The interaction is very interesting. When the request reached this extension, it will duplicate a request and send it to the auth service (duplicate means the path, headers are also forwarded). If the auth service return error code range 400 to 499, then this extension will use the response of auth service as its response. Otherwise, even if the auth service is 500, 502, or down, the extension will trade it as "authorized".

p.s. timeout is a must have field

e.g.
```yaml
apiVersion: consul.hashicorp.com/v1alpha1
kind: ServiceDefaults
metadata:
  name: echo-1
  namespace: default
spec:
  protocol: http
  envoyExtensions:
  - name: builtin/ext-authz
    arguments:
      listenerType: inbound
      proxyType: connect-proxy
      config:
        httpService:
          target:
            service:
              name: eks-micro-auth-service
              namespace: default
            timeout: "5s" # Required timeout field
```
P.S.
One service default can configured to have multiple extensions, and the order of extension will decide its execute sequence in the filter chain.