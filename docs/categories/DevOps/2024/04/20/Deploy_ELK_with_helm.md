---
title: Deploy ELK with helm
author: ChocolateAceCream
date: 2024/04/20 19:00
isTop: false
categories:
 - DevOps
tags:
 - Elasticsearch
 - Kibana
 - Filebeat
 - Kubernetes
 - Logstash
---

# Deploy ELK on single node cluster using helm <Badge text="Kubernetes" type="warning" />

### install elastic search
since I'm running single replica cluster, I cannot create multi-node elasticsearch cluster. So modify the default yaml
> replicas: 1
minimumMasterNodes: 1
clusterHealthCheckParams: 'wait_for_status=yellow&timeout=1s'

then install using helm
> helm repo add elastic https://helm.elastic.co
> helm install elasticsearch elastic/elasticsearch -f elasticsearch.yaml

remember to retrieve user's passwd
> kubectl get secrets --namespace=default elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d

### install filebeat
> helm install filebeat elastic/filebeat


### install logstash
> helm install logstash elastic/logstash

