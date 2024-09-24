---
title: Summary
author: ChocolateAceCream
date: 2024/09/24 10:24
isTop: true
categories:
 - Interview
tags:
 - System Design
---

# System Design Key Points Summary <Badge text="System" type="warning" />

## Identify the trade-off

### Case Study: Youtube Video
When storing a video's meta data into mongoDB, one wise choice is to embedded video's uploader user info in the same collection. So each time video meta info is read, no need to join user's table. One drawback is updating user's info, now it need to upload all certain user's videos' meta data (which has user's info embedded). However, we can do it async since it's no big deal for a few seconds/minutes delay for the update (so viewer might see older info of video uploader), that's the trade-off.