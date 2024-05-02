---
title: Operation Cost
author: ChocolateAceCream
date: 2024/02/12 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# Cost of mysql operations <Badge text="MySQL" type="warning" />

The total cost is I/O + CPU

##### I/O cost:
the cost to load data from disk to memory

default ***I/O cost for loading a page is 1***

##### CPU cost:
read and search cost.

default ***CPU cost for read a piece of data and perform operations on it is 0.2***

***ps*** 1 and 0.2 are called const of cost.

### example: a optimize process of query execution
```sql
SELECT
	*
FROM
	single_table
WHERE
	key1 IN ( 'a', 'b', 'c' )
	AND key2 > 10
	AND key2 < 1000 AND key3 > key2
	AND key_part1 LIKE '%hello%'
	AND common_field = '123';
```

1. get an idea of table
```sql
show table status like 'single_table'
```
- rows: if using InnoDB, the number returned are estimation. if using MyISAM, then the number returned are accurate.

- Data_length: the table file size in disk ( in B)
Data_length = count of clustered index pages * page size

the default page size is 16kb, which is 16 * 1024, then
count of pages = Data_length  / (16 * 1024)

in this case, the count of pages is about 161.

I/O cost is:
161 * 1 = 161 (might be slight difference since mysql designer did minor adjust in code)

CPU cost is:
rows * 0.2 = 18525 * 0.2 = 3705

the total cost for whole table scan is 161 + 3705 = 3866

2. calculate the cost when using index
>	AND key2 > 10 AND key2 < 1000

mysql designer assume for the cost for reading the index key range from a to b is equal to the cost of reading a page, which is 1.
so the I/O cost is 1

and totally there are ***485*** counts of record for key2 fall in the range 10 ~ 1000, and the CPU cost for reading 485 records are:
485 * 0.2 = 97

and total cost for reading index is 1 + 97 = 98

then we need to do index lookup in original table for each of 485 records:

mysql designer assume the cost for each index lookup equals to
the cost of loading a page, which is 1
so the I/O cost for index lookup for total 485 records is:
485 * 1 = 485
and the CPU cost is 485 * 0.2 = 97

so the total cost for index lookup is 485 + 97 = 582
plus the previous cost for reading index 98, the final cost for using key2 as index  would be 582 + 98 = 680

3. repeat above process for each sub-query
> key1 IN ('a', 'b', 'c')

this sub-query is equal to:
key1 in
- ['a', 'a'] 40 records
- ['b', 'b'] 50 records
- ['c', 'c'] 30 records (total 30 + 40 + 50 = 120)

so the total cost for using key1 as index is:
3 + 120 + 120*0.2+ 120*0.2 = 171

4. Compare the cost for each index approach
for the remaining query that cannot apply index lookup approach:
```sql
AND key3 > key2 # since not compare to const, cannot use index
AND key_part1 LIKE '%hello%' # start with %, cannot use index
AND common_field = '123'; # common_field is not indexed.
```
since we will have to use whole table scan approach, so we can omit them compare cost of which index we using.

so now we can either using key1 or key2 as index for searching.
since key2 cost is 680 and key1 cost is 171, so we choose key1 as index to use

***p.s.*** if there exist index intersection, we can further reduce the cost by applying index merging.

#### index dive
for sub-query
```sql
SELECT * FROM single_table WHERE key1 IN ('aa1', 'aa2', 'aa3', ... , 'zzz');
```
since key1 in not a unique index, for each IN condition 'aa1', 'aa2', ..., there might exist multiple records matched the condition. so we lookup the B+ tree to determine the range of those records, and that approach is called ***index dive***.

for some special case: 2000+ params inside IN condition,
we use the const eq_range_index_dive_limit to decide if we using this approach

- check the value of eq_range_index_dive_limit:
```sql
show variables like '%dive%'
```
eq_range_index_dive_limit	200

#### Join Table Search Cose
Total cost = cost of visiting driving table + fanout record counts * cost of visiting driven table.
e.g.
```sql
SELECT * FROM single_table AS s1
INNER JOIN single_table2 AS s2
WHERE s1.key2 >10 AND s1.key2 < 1000;
```
this sql first use index to find records which has key2 in (10, 1000). And the result is called fanout. Then for each record in fanout, it will lookup according record in table 2.

For outer join (e.g. left or right join), the driving table and driven table are fixed, so the cost would be fixed either. However, for inner join, we need to calculate the cost of using each table as driving table and choose the smaller cost one.

e.g.
```sql
SELECT * FROM single_table AS s1
INNER JOIN single_table2 AS s2
ON s1.key1 = s2.common_field
WHERE s1.key2 > 10
AND
s1.key2 < 1000
AND
s2.key2 > 1000
AND
s2.key2 < 2000;
```

now we need to compare cost of using table 1 as driving table and using table 2 as driving table and choose the smaller one.

And the main difference is usually the fanout * cost of visiting driven table part. so we need always try to minimum fanout counts and cost of visiting driven table. so, better create index in driven table and use that index as join key.

#### More than 2 tables join
if we need to join more than 2 tables, the case we need to evaluate are n!.
e.g.
join A and B and C:
we can arrange ABC or ACB or BAC or BCA or CAB or CBA, totally is 3*2*1 = n! = 6 cases.
Since there are too many cases to be evaluated, we keep an variable to store minimum cost. Once in the middle of calculating cost for one case is exceeding the minimum cost, the evaluation process is terminated.

That variable is called ***optimizer_search_depth***.

Also, mysql designer suggested some experience based rules and any cases meet the rules will not be considered.

A system variable called ***optimizer_prune_level*** is used to control whether the rules are on or off


#### const in calculating cost
```sql
SHOW TABLE FROM mysql LIKE '%cost%';
```
| Tables_in_mysql (%cost%) |
|---|
| engine_cost |
| server_cost |

Server_cost table stores cost for server layer, such as join, search, syntax analyzer, and optimizer etc.
engine_cost table, on the other hand, is used to store cost for data I/O

Now dig deeper in server_cost table
```sql
select * from mysql.server_cost
```
|cost_name | cost_value | last_update  | comment |
|---|---|---|---|
|disk_temptable_create_cost   |       NULL | 2018-01-20 12:03:21 | NULL    |
| disk_temptable_row_cost      |       NULL | 2018-01-20 12:03:21 | NULL    |
| key_compare_cost             |       NULL | 2018-01-20 12:03:21 | NULL    |
| memory_temptable_create_cost |       NULL | 2018-01-20 12:03:21 | NULL    |
| memory_temptable_row_cost    |       NULL | 2018-01-20 12:03:21 | NULL    |
| row_evaluate_cost            |       NULL | 2018-01-20 12:03:21 | NULL    |

cost_value is NULL for all const by default, which means default value will be used to each const
|name|default value| comment|
|---|---|---|
disk_temptable_create_cost | 40.0 | 创建基于磁盘的临时表的成本，如果增大这个值的话会让优化器尽量少的创建基于磁盘的临时表。
disk_temptable_row_cost | 1.0 | 向基于磁盘的临时表写入或读取一条记录的成本，如果增大这个值的话会让优化器尽量少的创建基于磁盘的临时表。
key_compare_cost | 0.1 | 两条记录做比较操作的成本，多用在排序操作上，如果增大这个值的话会提升filesort的成本，让优化器可能更倾向于使用索引完成排序而不是filesort。
memory_temptable_create_cost | 2.0 | 创建基于内存的临时表的成本，如果增大这个值的话会让优化器尽量少的创建基于内存的临时表。
memory_temptable_row_cost | 0.2 | 向基于内存的临时表写入或读取一条记录的成本，如果增大这个值的话会让优化器尽量少的创建基于内存的临时表。
row_evaluate_cost | 0.2 | 这个就是我们之前一直使用的检测一条记录是否符合搜索条件的成本，增大这个值可能让优化器更倾向于使用索引而不是直接全表扫描。

P.S. When mysql execute query that includes DISTINCT, GROUP_BY, UNION, and SORTING, mysql might create a temp table to help searching. When records count are huge, that temp table might be created using MyISAM or InnoDB as engine to use disk as storage. And when the count of records are low, might use Memory engine to create memory based table.
e.g. For Distinct search, mysql can create a temp table with unique index and insert records in this temp table, once all records inserted, that temp table is the result set.

For engine_cost const:
```sql
select * from mysql.engine_cost
```

| engine_name | device_type | cost_name | cost_value | last_update | comment | default_value |
|---|---|---|---|---|---|---|
| default     |           0 | io_block_read_cost     | NULL       | 2023-02-16 17:58:00 | NULL    |             1 |
| default     |           0 | memory_block_read_cost | NULL       | 2023-02-16 17:58:00 | NULL    |          0.25 |

|name|default value| comment|
|---|---|---|
io_block_read_cost | 1.0 | 从磁盘上读取一个块对应的成本。请注意我使用的是块，而不是页这个词儿。对于InnoDB存储引擎来说，一个页就是一个块，不过对于MyISAM存储引擎来说，默认是以4096字节作为一个块的。增大这个值会加重I/O成本，可能让优化器更倾向于选择使用索引执行查询而不是执行全表扫描。
memory_block_read_cost | 1.0 |与上一个参数类似，只不过衡量的是从内存中读取一个块对应的成本。

The reason for using 1.0 for both const is because mysql cannot tell if a block is loaded into memory yet, so designer assume the cost is equal to load data from disk or memory.