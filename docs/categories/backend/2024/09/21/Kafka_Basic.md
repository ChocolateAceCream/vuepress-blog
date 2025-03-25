---
title: Kafka Concepts
author: ChocolateAceCream
date: 2024/09/21 19:00
isTop: false
categories:
 - backend
tags:
 - Kafka
---

# Kafka Concepts <Badge text="Kafka" type="warning" />
## Topics
- Producer write data to topics and consumer read data from topics
- Multiple consumers can subscribe to the same topic and receive the data

## Partition
Subdivision of a topic. Each topic consist of one or more partitions, in each partition, the message is guaranteed to be consumed in FIFO order.

## Key
each message can have a key of any []byte type, this key is used for partition the message (using hash of the key to determine the partition if no partition was given). If no key is given, then message is assigned to partition using default hashing method

## Value
Can be any format that parsed into []byte.

## In-Sync Replicas(ISR)
the broker that are:
- fully up-to-date with partition's leader
- alive and replicating without lag beyond threshold

common setting is
```sh
ack=all
# Wait for all ISR (In-Sync Replicas) of the partition to confirm the write before ACKing the producer
min.insync.replicas=2
# Only allow writes if at least 2 brokers (including leader) are in the In-Sync Replicas (ISR) set
```

So once producer send message to broker, the leader broker will sync message in background in parallel to all the ISRs and wait for ack back. if not enough ack (less than the min.insync.replicas), the write is rejected, msg was marked as uncomitted, so it can be GC or rolled back during failover.
If has enough acks back, then msg was marked as committed and included in High Watermark

p.s. when counting ISRs, leader broker itself is always counted as ISR

## High Watermark
The high watermark is the offset of the last committed message in kafka partition
A message is committed if it has been
- written to the leader
- replicated to all required ISRs (>=min.insync.replicas)

p.s. ***consumers only see messages up to the HW.***
