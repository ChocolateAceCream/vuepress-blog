---
title: Interview Preps
author: ChocolateAceCream
date: 2025/03/27 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - Interview
 - Database
---

# Interview Preps  <Badge text="Go" type="warning" />
Today I did some prep works for the upcoming interviews, reviewed some concepts/algorithms/designs. Just want to write it down so my brain can turn them into long-term memories while I sleeping tonight.

## Difference between Primary key and Index
- The main difference is that a indexed field can contains duplicated values (unless it's unique index), while primary key is always unique. So, you cannot always reference a foreign key on index (unless it's unique)
- Primary key can be composite, same as index.
```sql
CREATE TABLE posts (
    topic_id INT NOT NULL,
    post_seq INT NOT NULL AUTO_INCREMENT,  -- Sequence within topic
    user_id INT NOT NULL,
    post_date DATETIME,
    content TEXT,
    PRIMARY KEY (topic_id, post_seq),  -- Natural composite key
    KEY (user_id)  -- For user-centric queries
);
CREATE INDEX index_name ON table_name (col1, col2, ...);
```

## bloom filter
This topic with a separated single blog, but I just want to summarize several key points about bloom filter.

### why?
if you have 1MB memory and 10M items, you want to check the next new item is shown before, then you can use bloom filter to quickly find out. But, there might be a small chance of false negative (means it detect item has shown before but it actually not) while no false positive(it detect item has not shown before then it must have not shown before)

### How?
Use several hash functions to hash the item id, then % 8,388,608 (1MB * 8 = bits) to fit in []byte, check that byte to true. When look up, do the same, if any position returned by hash function in []byte found false, then 100% item not shown before. However, if all position returned true, it still have chance of actually not shown.

### Standard Capacity Formula:
```
n = - (m * ln(p)) / (ln(2))²
```
Where:
- m = 8,388,608 bits
- p = desired false positive probability
- n = maximum number of items

#### Practical Examples:
| False Positive Rate (p) | Max Items (n) | Hash Functions (k) |
|-------------------------|---------------|--------------------|
| 1% (0.01)              | ~1,209,513    | 5                  |
| 0.1% (0.001)           | ~806,342      | 7                  |
| 0.01% (0.0001)         | ~604,757      | 10                 |

## Http code 302 & 307
both means redirect request, so once response return by backend, frontend will redirect to that url.
However, 302 will convert post to get but 307 will keep the original request

## Consistent Hashing
similar to bloom filter, you hash the tag, then find the right place to put it in.
Image we use hash as a circle. then we use hash function to hash the tag, find next v-node on the ring

## Time wheel
like cron job, but more efficient.
It should contains following elements
1. step interval
2. a slot[] to store jobs' ID that should run at certain time
3. a mapper to find job's execute function with given id
4. a lock
5. a pointer to store current slot index.

for jobs that to be put into slot, it should contains
1. id
2. cycle number

Process:
1. calculate the slot index using the job's scheduled time, total numbers of slots, and step interval of time wheel. Also calculate the cycle number.
2. each time interval, time wheel moved one slot up, until reach the end of slot, then start from beginning. When a slot is hit, iterate the store jobs from that slot's ID list, check cycle number, if it's 0, means should execute job now. if not, reduce cycle number by 1.
