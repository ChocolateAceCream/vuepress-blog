---
title: BigInt
author: ChocolateAceCream
date: 2023/09/25 19:00
isTop: false
categories:
 - frontend
tags:
 - JavaScript
---


# BigInt <Badge text="JavaScript" type="warning" />

### Why BigInt ?

1. JS cannot handle big number calculation correctly. Any number that exceeds the range from -2^53 to 2^52 will not be guaranteed to be accurately calculated.

2. JS Number has limitations: each Number is converted to binary first then stored in memory and used for operations. As a result, these decimal numbers lose precision when they are converted to binary and vice versa.
```javascript
console.log(0.1 + 0.2)
// 0.30000000000000004
```
Using BigInt can completely avoid this problem because decimal numbers are not allowed in BigInt.

3. Similar to the first point, Number has an upper bound at Number.MAX_VALUE and a lower bound at Number.MIN_VALUE, so if you need to do calculations that exceed that range, they will not be accurate.
