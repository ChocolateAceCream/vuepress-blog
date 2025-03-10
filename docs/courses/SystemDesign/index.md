---
title: System Design
author: ChocolateAceCream
date: 2024/05/04 10:24
categories:
 - System Design
tags:
 - System Design
---

# System Design Key Points Summary <Badge text="System" type="warning" />

## Identify the trade-off

### Case Study: Youtube Video
When storing a video's meta data into mongoDB, one wise choice is to embedded video's uploader user info in the same collection. So each time video meta info is read, no need to join user's table. One drawback is updating user's info, now it need to upload all certain user's videos' meta data (which has user's info embedded). However, we can do it async since it's no big deal for a few seconds/minutes delay for the update (so viewer might see older info of video uploader), that's the trade-off.

### Case Study: twitter
1. Twitter is a read heavy system, so we can use read-only replicates of our DB. And since twitter includes follower/followee relations, better use relational DB and sharding. Even though sometimes write take place and may cause few seconds delay to the sharding, it's still a good trade-off.

2. The CDN usage. CND should be able to pull the S3 object storage for videos/images

3. Identify the key. Always considering what is the best field to used as a key to sharding/index. We want all twitters for one user go to one DB replicates. That's why we should use UID to sharding. For indexing of following table, since it's read heavy, it's way more frequently for a guy to track all ppl he followed rather than all guys that follow him. So we use follower as index.

4. For a recommendation twitters list, since 60% of ppl are active, we can generate the list asyncly for all users (or better, for ppl who logged in last 30 days). For example, when a new twitter generated, we push it to the message queue, and a worker will asyncly process the new twitter and put into feed cache