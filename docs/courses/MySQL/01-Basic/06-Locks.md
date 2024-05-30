---
title: Locks
author: ChocolateAceCream
date: 2024/02/23 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# Locks <Badge text="MySQL" type="warning" />
We can add locks to read/write operations to solve dirty write/dirty read/repeatable read/phantom problem. Which is less efficiency than MVCC.

##### Consistent reads
transactions that applied MVCC under READ COMMITTED, REPEATABLE READ, any SELECT statement is not locked, so called consistent reads.

### Locking Reads
- Shared Locks(S Lock): To read a record, has to first obtain its S lock.
- Exclusive Locks(X Lock): To write a record, has to first obtain its x lock.
- S lock will block x lock
- S lock will not block S lock
- X lock will block S lock and X lock

##### Synyax
s lock:
> SELECT ... LOCK IN SHARE MODE

X lock:
> SELECT ... FOR UPDATE;

### write
- delete: can be treated as a locking read with x lock
- update: three cases
1. if updated data storage space not changed, and primary key not changed, then treated as a locking read with X lock
2. if updated data storage space change, but primary key not changed, treated as a delete with x lock and then insert with explicitly lock.
3. if primary key changed, indeed it's a delete and insert.
-insert:
usually adding a new record don't need lock. so mysql introduce an explicitly lock to make sure the inserted data is not visible to other transactions before commit.

## Multi-granularity lock
previously locks we talked about are all row level locks. We can add locks on table level as well(s lock or x lock) Once table is s or x locked, its rows are also s or x locked. However, when lock the table, we have to check if any rows have already locked. To avoid iterating the whole table, when we lock the row, we add ***intension lock*** (IS- intension s lock or IX - intension x lock)on the table first.

|compatibility|X|IX|S|IS|
|---|---|---|---|---|
|X|❌|❌|❌|❌|
|IX|❌|✔️|❌|✔️|
|S|❌|❌|✔️|✔️|
|IS|❌|✔️|✔️|✔️|

since IX and IS are only used in quick check if table can be applied S lock or X lock, IX and IS are compatible to each other.