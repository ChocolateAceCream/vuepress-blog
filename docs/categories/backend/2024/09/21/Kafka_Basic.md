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
