---
title: Basic Concepts
author: ChocolateAceCream
date: 2024/02/22 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# Basic Concepts <Badge text="MySQL" type="warning" />

## Redo log
used to store the operations that need to be done to flush data from buffer pool to disk

## Clustered Index

default index that used by InnoDB to store data in B+ tree

#### Clustered Index VS. primary key
when primary key exists, it is clustered index.
if primary key is not set, a none-null, unique column will be selected as clustered index. if that index is not exist, db will create implicit primary key and use it as clustered index.

