---
title: GoKit Prometheus Integration
author: ChocolateAceCream
date: 2024/04/21 19:00
isTop: false
categories:
 - DevOps
tags:
 - GoKit
 - Prometheus
 - docker-compose
 - Kubernetes
---

# GoKit Prometheus Integration <Badge text="Prometheus" type="warning" />

1. start prometheus as docker-compose
```yml
version: '3.8'

volumes:
  prometheus_volumes: {}
  grafana_volumes: {}

services:
  prometheus:
    image: prom/prometheus
    restart: always
    volumes:
      - ./prometheus:/etc/prometheus/
      - prometheus_volumes:/prometheus
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    ports:
      - 9090:9090
    links:
      - cadvisor:cadvisor
      - alertmanager:alertmanager
    depends_on:
      - cadvisor

  node-exporter:
    image: prom/node-exporter
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - --collector.filesystem.ignored-mount-points
      - '^/(sys|proc|dev|host|etc|rootfs/var/lib/docker/containers|rootfs/var/lib/docker/overlay2|rootfs/run/docker/netns|rootfs/var/lib/docker/aufs)($$|/)'
    ports:
      - 9100:9100
    restart: always
    deploy:
      mode: global

  alertmanager:
    image: prom/alertmanager
    restart: always
    ports:
      - 9093:9093
    volumes:
      - ./alertmanager/:/etc/alertmanager/
    command:
      - '--config.file=/etc/alertmanager/config.yml'
      - '--storage.path=/alertmanager'

  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - 8080:8080
    restart: always
    deploy:
      mode: global

  grafana:
    image: grafana/grafana
    user: '472'
    restart: always
    environment:
      GF_INSTALL_PLUGINS: 'grafana-clock-panel,grafana-simple-json-datasource'
    volumes:
      - grafana_volumes:/var/lib/grafana
      - ./grafana/provisioning/:/etc/grafana/provisioning/
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    env_file:
      - ./grafana/config.monitoring
    ports:
      - 9080:3000
    depends_on:
      - prometheus
```

if using windows docker desktop, try to use private ip if you want your prometheus inside container to visit go service on host machine

```yml
# my global config
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.
  evaluation_interval: 15s # By default, scrape targets every 15 seconds.
  # scrape_timeout is set to the global default (10s).

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
      monitor: 'my-project'

# Load and evaluate rules in this file every 'evaluation_interval' seconds.
rule_files:
  - 'alert.rules'
  # - "first.rules"
  # - "second.rules"

# alert
alerting:
  alertmanagers:
  - scheme: http
    static_configs:
    - targets:
      - "alertmanager:9093"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  - job_name: 'gokit'
    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s
    static_configs:
      - targets: ['172.25.155.210:3300']
```

1. install dependency
> go get github.com/prometheus/client_golang/prometheus
go get github.com/prometheus/client_golang/prometheus/promauto
go get github.com/prometheus/client_golang/prometheus/promhttp

2. four types of data
- Counter: a single monotonically increasing counter whose value can only increase or be reset to zero(on restart)

- Gauge: a single numerical value that can arbitrarily go up and down

- Histogram: A histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets. It also provides a sum of all observed values.

- Summary: Similar to a histogram, a summary samples observations (usually things like request durations and response sizes). While it also provides a total count of observations and a sum of all observed values, it calculates configurable quantiles over a sliding time window.

Two rules of thumb:

If you need to aggregate, choose histograms.

Otherwise, choose a histogram if you have an idea of the range and distribution of values that will be observed. Choose a summary if you need an accurate quantile, no matter what the range and distribution of the values is.



# Install prometheus on k8s cluster (Docker desktop)
1. install using helm
>helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/prometheus

2. change the config file (helm value.yaml)
```yaml
serverFiles:
  prometheus.yml:
    # my global config
    global:
      scrape_interval:     15s # By default, scrape targets every 15 seconds.
      evaluation_interval: 15s # By default, scrape targets every 15 seconds.
      # scrape_timeout is set to the global default (10s).

      # Attach these labels to any time series or alerts when communicating with
      # external systems (federation, remote storage, Alertmanager).
      external_labels:
          monitor: 'prometheus-k8s'

    # Load and evaluate rules in this file every 'evaluation_interval' seconds.
    rule_files:
      - 'alert.rules'
      # - "first.rules"
      # - "second.rules"

    # alert
    alerting:
      alertmanagers:
      - scheme: http
        static_configs:
        - targets:
          - "prometheus-alertmanager:9093"

    # A scrape configuration containing exactly one endpoint to scrape:
    # Here it's Prometheus itself.
    scrape_configs:
      # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.

      # - job_name: docker
      #   scrape_interval: 5s
      #   static_configs:
      #     - targets: ['host.docker.internal:9417']
      #     # - targets: ['52.52.54.255:9417']

      - job_name: 'prometheus'

        # Override the global default and scrape targets from this job every 5 seconds.
        scrape_interval: 5s

        static_configs:
            - targets: ['prometheus-server:9090']


      - job_name: 'prometheus-kube-state-metrics'

        # Override the global default and scrape targets from this job every 5 seconds.
        scrape_interval: 5s

        dns_sd_configs:
        - names:
          - 'prometheus-kube-state-metrics'
          type: 'A'
          port: 8080

    #     static_configs:
    #          - targets: ['cadvisor:8080']

      - job_name: 'prometheus-prometheus-node-exporter'

        # Override the global default and scrape targets from this job every 5 seconds.
        scrape_interval: 5s

        dns_sd_configs:
        - names:
          - 'prometheus-prometheus-node-exporter'
          type: 'A'
          port: 9100

      # - job_name: 'gokit'
      #   # Override the global default and scrape targets from this job every 5 seconds.
      #   scrape_interval: 5s
      #   static_configs:
      #     - targets: ['172.25.155.210:3300']
      #   metrics_path: /minio/v2/metrics/cluster
      #   scheme: http
      #   static_configs:
      #   - targets: ['host.docker.internal:3050']
    #  - job_name: 'pushgateway'
    #    scrape_interval: 10s
    #    dns_sd_configs:
    #    - names:
    #      - 'tasks.pushgateway'
    #      type: 'A'
    #      port: 9091

    #     static_configs:
    #          - targets: ['node-exporter:9100']
```
p.s. target name is the service name in k8s

3. create ingress to route external traffic to prometheus
```yaml
# ingress for default namespace
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: default-namespace-ui-ingress
  namespace: default
spec:
  ingressClassName: nginx
  rules:
  # ingress for prometheus ui
  - host: "prometheus-ui"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: prometheus-server
            port:
              number: 80
```
p.s. remember to add prometheus-ui to point to 127.0.0.1 in your C:\Windows\System32\drivers\etc\hosts file