---
title: Blocking / Non-blocking IO
author: ChocolateAceCream
date: 2025/03/30 19:00
isTop: false
categories:
 - backend
tags:
 - Ruby on Rails
 - Nodejs
 - Go
---

# Blocking Vs. Non-blocking IO <Badge text="Go" type="warning" />
The main difference is that blocking IO means when waiting for IO, whole program execution wait there doing nothing. while in non-blocking case, when IO blocks, a schedule will switch to other part of the program and keep running, then check back the status of blocked IO.

## Ruby on Rails (Semi-non-blocking io)
Since the present of global Interpreter lock (GIL), only one thread can run ruby code at a time, which means CPU-bound work is blocked if one thread is running some heavy computations.
Imagine you have three threads running by puma, one threads is waiting for a DB query, then puma can switch to second thread and handle another request. Then, second request is handled and wait for DB query (1st request are still waiting as well), now puma can switch to 3rd thread to handle another request. However, only one thread can do CPU-bound work at one time.

## Go routine
Go routine support pure non-blocking IO. Multiple threads can execute go at same time, if any go routine waiting for IO, then schedule will switch to next go routine to run on the thread. That's why go is very good at concurrency

## Nodejs event loop
Nodejs is single thread, but using non-blocking IO, so CPU work blocks the entire event loop (no parallelism)
One workaround is to use worker threads to offload CPU tasks to separate threads (which run CPU heavy jobs on other thread thus make it a IO waiting event)