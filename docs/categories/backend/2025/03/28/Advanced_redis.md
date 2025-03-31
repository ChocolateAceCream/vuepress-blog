---
title: Advanced Redis
author: ChocolateAceCream
date: 2025/03/28 19:00
isTop: false
categories:
 - backend
tags:
 - Redis
---

# Advanced Redis  <Badge text="Redis" type="warning" />
Normally we just use set/get with redis, but redis has much more functionalities, so in this blog I'd like to talk about some advanced topics of redis.

## Hash
Create a hash for given key, like maps in go
HSET key field value
HGETALL
HMGET key field1 field2 ...
HGET key field

## bitset (bit array)
kind of a bitmap, so given an field, store value either 1 or 0 to mark the status
SETBIT key offset value
GETBIT key offset
BITCOUNT key [start end]: counts set bits with 1

since 1byte = 8 bits, so 10M users with 500 permission (status) will take 10M * 500 / 8 = 630MB

## consistent hashing
In traditional hashing (e,g, hash(key) % n), when adding a new node (n+1), all cache need to be recalculated then re-distribute. That cause a lot of troubles like traffic spikes or data migration slow etc... Consistent hashing is introduced to solve this kind of problems.

We all know hash value is between 0 ~ 2^32-1, image connect tail and head of hash sets to form a circle, then you add node evenly on that circle. Now if a new element is coming in, hash it to the circle, and find the next node clock-wise, that's the node you want to put your data into.

A-->B-->C-->D-->A

If you want to add a new node, F, between C and D, like this

A-->B-->C-->'F'-->D-->A

Now you only need to migrate data between C and D, but traditional hashing require you to re-arrange data among all nodes. Same story for deleting, only 2 Node will be affected.

#### One more optimization -> Virtual Nodes
Sometimes if you not evenly distributed your nodes along the circle, it will cause one node super busy and one node has nothing to work with. One approach to solve this is to use virtual nodes, so multiple virtual nodes can be mapped to a single physical server.


