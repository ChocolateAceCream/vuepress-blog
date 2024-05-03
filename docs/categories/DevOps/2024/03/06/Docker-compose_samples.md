---
title: docker-compose sample files
author: ChocolateAceCream
date: 2024/03/06 19:00
isTop: false
categories:
 - DevOps
tags:
 - docker-compose
 - Grafana
 - Prometheus
 - MinIO
 - Docker
 - Raspberry Pi
---

# docker-compose sample files <Badge text="docker-compose" type="warning" />
sample docker-compose yaml files to deploy all kinds of services

## Prometheus, Grafana and MinIO
### purpose
using prometheus to gather metrics of docker, minio and prometheus itself, and implement data visualization using grafana dashboard

##### Docker setup
```bash
sudo docker run --name docker_exporter --detach --restart always --volume "/var/run/docker.sock":"/var/run/docker.sock" --publish 9417:9417 prometheusnet/docker_exporter
```
execute this cmd so docker expose a metrics endpoint for prometheus to use

##### MinIO setup
```yml
# docker-compose.yml
version: '3'
services:
  minio:
    image: minio/minio:latest
    container_name: blog_minio
    ports:
      - "3050:9000" # service api port
      - "3060:3060" # manage portal port
    restart: always
    volumes:
      - ./data/:/data/
      - ./config/:/root/.minio
    environment:
    - MINIO_ROOT_USER=${MINIO_ROOT_USER}
    - MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}

    # allow prometheus connect to this endppoint without auth, otherwise you need to manully generate a bear_token and paste it into prometheus config
    - MINIO_PROMETHEUS_AUTH_TYPE=public

    # command: server /data --console-address ":3060" --address ":3050"
    # dont override server address port since metrics port won't changed along with it.
    # better fix console-address port since it's generated randomly
    command: server /data --console-address ":3060"

    # since healthcheck is taken care by prometheus, no need here
    # healthcheck:
    #   test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
    #   interval: 30s
    #   timeout: 20s
    #   retries: 3
```

***Don't change the serve address port***
***Don't change the serve address port***
***Don't change the serve address port***
Since the minIO metrics is using that default port 9000

##### Prometheus setup
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

      # volumes, not mount binding
      - prometheus_volumes:/prometheus

    # so it can visit host machine's service using host.docker.internal
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

## Raspberry Pi 3B install docker-compose

1. install pip3

2. install docker-compose using pip3
```bash
sudo pip3  -v install docker-compose
```