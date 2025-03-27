---
title: Buffer Pool
author: ChocolateAceCream
date: 2024/10/01 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# Buffer Pool <Badge text="Go" type="warning" />

## Why buffer pool
When buffers are frequently used and discarded (like http response writer), using buffer pool can avoid excessive memory allocations.

## What is buffer pool
A pool to store buffers, usually have a get() and put(), where get() will return a buffer from pool if existing unused buffers, or create new buffer if no existing buffers in pool. and put() will reset buffer and then return the buffer to the pool for recycling.

P.S buffers in buffer pool can be GC, once no goroutine request that buffer for a certain time, then GC will recycle the buffer from pool. So buffer pool in go like sync.Pool is designed for short-lived, frequently reused objects.

## How to use
```go
package main

import (
	"bytes"
	"fmt"
	"sync"
)

var bufferPool = sync.Pool{
	New: func() interface{} {
		return new(bytes.Buffer)
	},
}

func main() {
	buf := bufferPool.Get().(*bytes.Buffer)
	defer bufferPool.Put(buf)
	buf.Reset()
	buf.WriteString("Hello world")
	buf.WriteString("\n!!!")
	fmt.Println(buf.String())
}

```

### get(), put() and reset()
get() will return objects from buffer pool, after use, use put() to put object back to pool.
you can call reset() before put() to make sure value is cleaned, or right after get()

## What's behind buffer pool (sync.Pool)
In order to understand how buffer pool works, first we need to understand logical processor (P) of G-M-P scheduling model (Goroutine-Machine-Processor)

#### **G-M-P Model Overview**
| Component | Role |
|-----------|------|
| **G (Goroutine)** | Lightweight thread managed by Go. |
| **M (Machine)** | OS thread (real CPU thread). |
| **P (Processor)** | Schedules goroutines onto `M`s. |

#### How Ps work with sync.Pool
Each P has its own local cache to put sync.Pool objects.
When you call Put() or Get(), the operation first tries the current P’s local cache (lock-free, fast path).
If the local cache is full/empty, it interacts with the global pool (requires a mutex, slow path).

So, in order to go with fast path, one way is to increase GOMAXPROCS (usually set to the # of CPU cores), which is equal to number of Ps. More Ps means more local caches and less chance of going to slow path

#### global pool
rarely used, act as a backup plan if P's local cache overflows.
- When a P’s local cache overflows (e.g., too many Put() calls), excess objects spill into the global pool.
- When a P’s local cache is empty (e.g., too many Get() calls), it can steal objects from the global pool.