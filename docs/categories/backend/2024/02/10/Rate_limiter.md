---
title: Rate Limiter with Redis
author: ChocolateAceCream
date: 2024/02/10 19:00
isTop: false
categories:
 - backend
tags:
 - Redis
 - Sorted-set
 - Rate Limiter
---

# Implement Rate Limiter using Redis sorted-set <Badge text="Redis" type="warning" />
Required Version: >2.1.6

The sorted set is a data structure in Redis that stores a collection of unique elements, each associated with a score(float). Elements are sorted based on their scores

### add key-value pair to set
```bash
ZADD myset 1 "element1" 2 "element2" 3 "element3"
```
myset: key in redis
element1: element
1: score of element
### remove by score range
```bash
ZREMRANGEBYSCORE myset 1 3
```
myset: key in redis
1: min score
3: max score
this command remove all elements with score between 1 and 3 (inclusive)

### fetch elements
```bash
ZRANGE myset 0 -1
```
myset: key
0: start index
-1: end index

### Set TTL
```bash
MULTI
ZADD myset 1 "a" 2 "b" 3 "c"
EXPIRE myset 60
EXEC
```

### Implement rate limiter
Purpose: implement a rate limiter that allow 10 actions in 1 time interval (60 seconds), and the two close actions has minimum 3 seconds time differential.
Steps:
1. we first generate a sorted set in redis using timestamp of coming action as both value and score.
2. when new action comes in, we first drop all elements of the set which occurred before one interval ago.
assume timestamp in ms and current action's timestamp is 1707674862497
```bash
ZREMRANGEBYSOCRE myset 0 1707674862497-60*1000
```
3. fetch all elements of myset and set a TTL of one time interval to myset
```bash
ZRANGE myset 0 -1
EXPIRE myset 60
```

4. add new action to myset
```bash
ZADD myset 1707674862497 1707674862497
```

5. since we fetched before add, now the last element in fetch result is the previous one action, we compare its timestamp with current one, if differential bigger than 3 sec, we not allow the new action. Also, with count of fetch results + 1, if bigger than allowed actions 10, the new action is not allowed.

By this approach, if a user keep send new req, none of new req will get executed.

P.S should wrap redis actions in between MULTI EXEC

### Common rate limit related headers
http code 429: too many request
X-Ratelimit-Remaining
X-Ratelimit-limit
X-Ratelimit-Retry-After: number of second to wait