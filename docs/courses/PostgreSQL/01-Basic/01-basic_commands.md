---
title: Common operator & commands
author: ChocolateAceCream
date: 2024/07/24 22:24
isTop: true
categories:
 - PostgreSQL
tags:
 - PostgreSQL
---

# Common operator & commands <Badge text="PostgreSQL" type="warning" />

# Function and trigger

# Advanced operators & functions
## TO_CHAR
used to format a number or date/time value to a string given the desired format.
e.g.
> TO_CHAR(value,format)
- value: date/time or numeric value
- format: format template

### Fill Mode (FM)
in TO_CHAR(), FM modifier is used to create more readable outputs by trimming spaces and leading zeros.
e.g.
```sql
SELECT TO_CHAR(123.4500, '9990.999');
-- Output: ' 123.450'

SELECT TO_CHAR(123.4500, 'FM9990.999');
-- Output: '123.45'

SELECT TO_CHAR(12345.67, 'FM999G999D99'); -- Output: '12,345.67'
```
P.S. be careful for overflows, once the given input value exceeds the format length, result could be ####.##.
P.S.2 FM will automatically round the input and then trim the tailing/leading 0s

### Time formatting
e.g.
```sql
SELECT TO_CHAR(NOW(), 'YYYY-MM-DD');  -- Output: '2024-07-28'
```

#### Where FM works in formatting date/time

```sql
SELECT TO_CHAR(DATE '2024-01-28', 'Month DD, YYYY'); -- Output: 'January   28, 2024'
```

since TO_CHAR() by default format 'Month' with a Fixed-width formatting approach, which ensures that all month names take up the same amount of space (which is the length of longest month name plus one space. len(september) + 1 = 10, which can be helpful for tabular displays). That's where FM can be used if we don't want the default format
```sql
SELECT TO_CHAR(DATE '2024-07-28', 'FMMonth DD, YYYY'); -- Output: 'July 28, 2024'
```