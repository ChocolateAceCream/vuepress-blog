---
title: Go GC
author: ChocolateAceCream
date: 2024/02/08 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - GC
---

# Go GC <Badge text="Go" type="warning" />
GO GC is basically repetition of three stage:
- sweeping: sweep off any memory from heap that is not marked as live, free them
- turning off: sleep until next cycle
- marking: scan whole heap, mark resource that is still using as live

GO GC is a trade of memory usage and CPU cost. a more frequently GC cycle will free more memory but cost more CPU runtime.

### Tunning by GOGC

GOGC = Target Heap Memory = Total heap memory
Total Heap Memory = Live Heap + New heap memory(for GC)
New heap memory = (Live heap + GC roots) * GOGC / 100
and minimum New heap memory is 4MB
***So doubling GOGC will double heap memory overheads and roughly halve GC CPU cost***

set GOGC=off can set GOGC value to infinity. However, the memory limit is defined to be soft, the Go runtime ***makes no guarantees*** that it will maintain this memory limit under all circumstances; it only promises ***some reasonable amount of effort***. It allow a peak memory exceeding the limit for as long as 2 * GOMAXPROCS CPU-second. Means at worse case, ***only 50% of CPU runtime is spent on GC*** and other is spent on running program, so you program will slow down at most by 2x

However, even if GOGC=off, there's a GOMEMLIMIT environment variable which can be used to set the memory limit
GOMEMLIMIT = heap + system.
However, when GOMEMLIMIT is small, GC will keep blocking the process since it is required to clean up more memory for system to run, so be careful when setting GOMEMLIMIT

### Best Practice
1. run in container with a fixed amount of available memory, with an additional 5%~10% headroom.
2. Don't set GOGC to off when there's a an actual memory limit exists. It will slow the program 2x
3. When increase the input size, memory usage is increasing proportionally, don't set a memory limit on such case.