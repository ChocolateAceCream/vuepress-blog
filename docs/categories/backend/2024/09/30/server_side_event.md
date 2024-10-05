---
title: Server Side Event
author: ChocolateAceCream
date: 2024/09/30 19:00
isTop: false
categories:
 - backend
tags:
 - Server Side Event
---

# Server Side Event (SSE) <Badge text="SSE" type="warning" />

## What is SSE
a long-live http GET request, backend can write to response body in real-time and frontend can subscribe to the message to get the update. It's one-way communication unlike websocket

## why using SSE
low-cost, light-weight, easy to implement (no ping/heart-beep), built-in reconnection.

## limitations
since SSE is indeed http request which is long-live, so server will have to hold the request for a long-time, which take up the big portion of server http handling capacity.

Also, for older browser, it may not support SSE.

## how to use
A few things to notice when setting up SSE in backend:
1. don't return the request. Once returned, the request ends, and SSE is no longer valid
2. don't set writeTimeout (response timeout) on server, since SSE need to be long-live. Also, if a writeTimeout is set, clint side may keep trying reconnect once timeout reached
