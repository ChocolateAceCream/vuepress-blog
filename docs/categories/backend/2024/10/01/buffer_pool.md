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
type BufferPool struct {
  pool sync.Pool
}

func (p *BufferPool) Get() *bytes.Buffer {
  buf := p.pool.Get()
  if buf == nil {
    return &bytes.Buffer{}
  }
  return buf.(*bytes.Buffer)
}

func (p *BufferPool) Put(buf *bytes.Buffer) {
  p.pool.Put(buf)
}
```
