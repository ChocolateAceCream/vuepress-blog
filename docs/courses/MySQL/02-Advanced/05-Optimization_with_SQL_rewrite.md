---
title: Optimization with sql re-write
author: ChocolateAceCream
date: 2024/02/20 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# How MySql Do the optimization using sql re-write <Badge text="MySQL" type="warning" />

#### remove useless ( and )
e.g. ((a = 5 and b = c) or (a>c) and (c <5))
can be optimized as:
(a = 5 and b = c) or (a > c) and (c < 5)

#### constant_propagation
a = 5 and b>a
will be translated into
a = 5 and b > 5

p.s. not to use constant_propagation in OR

#### equality_propagation
a = b and b = c and c = 5 can be simplified as
a = 5 and b = 5 and c = 5

#### trivial_condition_removal
for those forever true or false expression, the condition will be replaced with true or false
e.g (a < 1 and b = b) OR (a = 6 OR 5 != 5)
result: a < 1 or a = 6

#### do the calculation in expression
e.g. a = 5 + 1
result: a = 6
p.s. column has to be shown as a isolated item in expression in order to perform the calculation
e.g.
-a < 8
ABS(a) > 5
won't be transformed

#### HAVEING and WHERE
where is executed before group by and aggregation
having is executed after group by and aggregation
IF no group by is used, having behaves same as the where. so optimizer will combine where and having statement together

#### INNER JOIN vs  OUTER/LEFT/RIGHT JOIN
driving table and driven table for inner join is exchangeable. if record from driving table cannot find a match in driven table, that record will be discased.

For outer join, if driving table's record cannot find in driven table, it still be added to the result set, only need to set NULL for the filed of each column of driven table for that record.

#### reject-NULL
if where closure Implicitly indicate some non-null conditions for certain columns from driven table, then those OUTER/LEFT/RIGHT join can be simplified as a inner join. Optimizer will consider the cheapest way of join to execute.
SELECT * FROM t1 LEFT JOIN t2 ON t1.m1 = t2.m2 WHERE t2.m2 = 2;
this sample query will be simplified as
SELECT * FROM t1 inner join t2 on t1.ma = t2.m2 where t2.m2 = 2

#### scalar subquery and row subquery
both subquery return a single line of record or a single value. Usually used in bool express for comparison
e.g
> select * from ts where m1 < (select MIN(m2) from t2)
or
> select * from t1 where (m1,n1) = (select m2, n2 from t2 limit 1)

#### [NOT]IN/ANY/SOME/ALL(subquery)
constrains:
1. no ***limit*** keywords allowed in subquery
2. order by is not necessary
3. distinct is also unnecessary since returned value is a set
4. group by without aggregation/having is useless
so optimizer will remove all these redundant syntax.


- in(subquery):
> select * from t1 where (m1, n1) in (select m2,n2 from t2)

- ANY/SOME(subquery) are synonymous and can be used interchangeably:
> select * from t1 where m1 > ANY(select m2 from t2)

- ALL(subquery)
select * from t1 where m1 > ALL(select m2 from t2)

- EXISTS(subquery)
return true if subquery returns any records.
select * from t1 where exists(select 1 from t2)

#### in(subquery) optimization
e.g. 1 subquery related to outer layer query
```sql
select * from s1 where
  key1 = (select common_field from s2 where s1.key3 = s2.key3 limit 1)
```
execution sequence:
1. get a record from outer layer query
2. get key3 from that record
3. check if where return true,if so, add it to the result set
4. repeat step 1~3 for each record from s1

e.g. 2 subquery not related to outer layer query
```sql
SELECT * FROM s1    WHERE key1 IN (SELECT common_field FROM s2 WHERE key3 = 'a');
```
once subquery return too many records, it will cause efficiency problem like:
- cannot use index, have to do whole table scan for outer layer
- if too many params in IN(sub), a record will have to iterate each params for matching detecting.
e.g.
SELECT * FROM tbl_name WHERE column IN (a, b, c ..., ...);
will need to check column = a OR column = b OR column = cOR ..., which will cause efficiency problem

##### Materialize
so mysql designer introduce a temp table for storing subquery result (columns from subquery).
- filter out duplicated values (by creating a primary index or unique index)
- using hash index & memory engine.
hash indexes are well-suited for = but efficient for range queries
memory engine use in-memory storage when you need fast, temp access to data

after generated Materialize table, to find the result for
> SELECT * FROM tbl_name WHERE column IN (a, b, c ..., ...);

is basically an inner join operation on that tmp table and s1. Optimizer will choose the lower cost way of implementation to choose which table is driving table and which one is driven table

##### semi-join
internal used only. for this following sql, according to the previous section, it will be transformed as an inner join. However, if using inner join, duplicated s2 record might be added to the result set. In fact, we don't care how many matched records exist. That's where SEMI JOIN introduced

```sql
SELECT * FROM s1    WHERE key1 IN (SELECT common_field FROM s2 WHERE key3 = 'a');
```
after optimizer transformed it into a semi join

```sql
select s1.* from s1 SEMI JOIN s2
on s1.key1 = s2.common_field
where key3 = 'a'
```
##### how semi join implemented
- table pullout
```sql
 SELECT * FROM s1      WHERE key2 IN (SELECT key2 FROM s2 WHERE key3 = 'a');
```
since key2 is a secondary index (primary key is same) of s2, it's not containing any duplicated values. SEMI JOIN is equal to a inner join in this case.
result:
> SELECT s1.* FROM s1
INNER JOIN s2
ON s1.key2 = s2.key2
WHERE s2.key3 = 'a';

- DuplicateWeedout execution strategy
> SELECT * FROM s1      WHERE key1 IN (SELECT common_field FROM s2 WHERE key3 = 'a');

for this query, since common_field might contain duplicated records, we introduce a temp table like this:

> CREATE TABLE tmp (     id PRIMARY KEY );

before a record adding to the final result, we first add it to this tmp table using s1.id of that record. If adding success, we add it to the final result set, but if adding failed, we know that record has been added so we can skip this record.

#### semi join constrains
cases that cannot apply semi join:

- subquery connected with outer layer quest by OR
>  SELECT * FROM s1      WHERE key1 IN (SELECT common_field FROM s2 WHERE key3 = 'a')         OR key2 > 100;

- NOT IN: duplicated records allowed
> SELECT * FROM s1      WHERE key1 NOT IN (SELECT common_field FROM s2 WHERE key3 = 'a')

- subquery contains GROUP BY, HAVING, AGGREGATION, and UNION

#### Convert In to EXISTS
> select * from s1
where key1 in (select key3 from s2 where s1.common_field = s2.common_field) or key2 > 100;

can be converted to
> select * from s1 where exists(
  select 1 from s2 where s1.common_field = s2.common_field and s1.key1 = s3.key3
) or key2 > 100

after convert, key3 index can be used in the query.

P.S. If IN(subquery) cannot be converted to semi-join, it will be tried to convert to materialized table, and if still cannot convert, it will be converted to exists.

P.S. select 1 in EXISTS() is efficient because we don't care what the select record is, we only care if there's any records in that result set. So we use select 1 here

#### derived table
> SELECT * FROM  (       SELECT id AS d_id,  key3 AS d_key3 FROM s2 WHERE key1 = 'a'   ) AS derived_s1 WHERE d_key3 = 'a';

SELECT id AS d_id,  key3 AS d_key3 FROM s2 WHERE key1 = 'a' is a derived table.

For optimizing subquery with derived table, materialization is the common approach, which materialized that derived table. However, for some special case, we delay the materialization, since it may not be necessary, like the following e.g.
>  SELECT * FROM (         SELECT * FROM s1 WHERE key1 = 'a'     ) AS derived_s1 INNER JOIN s2     ON derived_s1.key1 = s2.key1     WHERE s2.key2 = 1;

Optimizer will first try to find s2.key2 = 1, if cannot find any, then materialization is meaning less.

The other approach is to rewrite the derived table into no derived table forms.
e.g. the previous e.g. can be re-write as
> select * from s1
inner join s2
on s1.key1 = s2.key1
where s2.key2=1 amd s1.key1='a'