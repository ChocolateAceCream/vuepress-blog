---
title: Serializable Snapshot Isolation
author: ChocolateAceCream
date: 2025/01/03 19:30
isTop: true
categories:
 - PostgreSQL
tags:
 - PostgreSQL
---

# Serializable Snapshot Isolation (SSI) in PostgreSQL compared to plain Snapshot Isolation (SI) <Badge text="PostgreSQL" type="warning" />
**available with version > 9.1**

## Overview
When ```default_transaction_isolation = 'serializable'``` is enabled, SSI will protect you from any conflict transactions. The first committer always wins and other transaction is rolled back.

## cases when ssi is useful to keep data consistency
#### write skew:
Two transactions concurrently read the same data and attempt updates based on their initial reads, leading to inconsistencies.

#### Deadlocks
A deadlock occurs when two or more transactions are waiting on resources held by each other, creating a cycle.

PostgreSQL resolves deadlocks by aborting one of the transactions.