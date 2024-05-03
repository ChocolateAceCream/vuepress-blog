---
title: How search works
author: ChocolateAceCream
date: 2024/02/16 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# How search works <Badge text="MySQL" type="warning" />

## Single table query

To help demonstrate the idea, first create a table with 10000 piece data.

```sql
CREATE TABLE single_table (
	id INT NOT NULL AUTO_INCREMENT,
	key1 VARCHAR ( 100 ),
	key2 INT,
	key3 VARCHAR ( 100 ),
	key_part1 VARCHAR ( 100 ),
	key_part2 VARCHAR ( 100 ),
	key_part3 VARCHAR ( 100 ),
	common_field VARCHAR ( 100 ),
	PRIMARY KEY ( id ),
	KEY idx_key1 ( key1 ),
	UNIQUE KEY idx_key2 ( key2 ),
KEY idx_key3 ( key3 ),
KEY idx_key_part ( key_part1, key_part2, key_part3 )) ENGINE = INNODB CHARSET = utf8;
```

### const
```sql
SELECT * FROM single_table WHERE id = 1438;
-- or
SELECT * FROM single_table WHERE key2 = 3841;
```
When search by comparing primary key or single unique column  secondary index (not null value) with a const.

### ref
when search with normal secondary index and index lookup happens, we call this operation ref.
ref is less efficient compared to const because multiple records may hit the index search (with same value for this secondary index column).

***p.s.*** when search with range, it's not a ref anymore
***p.s.2*** when null value is also a search criteria, we call this ref_or_null, such as
```sql
select * from single_demo where key1 = 'abc' or key1 is null;
```

### range
```sql
SELECT * FROM single_table WHERE key2 IN (1438, 6328) OR (key2 >= 38 AND key2 <= 79);
```
<=> null safe operator, can be used to compare null values.

### index
```sql
SELECT key_part1, key_part2, key_part3 FROM single_table WHERE key_part2 = 'abc';
```
key_part2 is not the left most column in idx_key_part, however,  we can still use index to improve search efficiency. This is because key_part1, key_part2, key_part3 all included in idx_key_part, we can still iterate whole idx_key_part tree to filter out data tha has key_part2 = 'abc'. Since that idx_key_part tree is much smaller than the main tree, we call this operation index, which iterate the secondary tress.

### all
iterate whole main tree.

example:
```sql
select * from single_table where key1 = 'abc' and key2 > 1000
```
1. since key1 is indexed, we search key1 tree find all ids with key1 = 'abc'
2. index lookup using the ids from step 1, find all data rows in main tree
3. filter out those data rows by key2>1000

### interception
when multiple search condition hit multiple index, we can intercept the result from each condition's search result to come up the final data rows.

e.g
```sql
 SELECT * FROM single_table WHERE key1 = 'a' AND key_part1 = 'a' AND key_part2 = 'b'AND key_part3 = 'c';
```
can use interception to combine result of two search conditions  key1 = 'a'  and ( key_part1 = 'a' AND key_part2 = 'b'AND key_part3 = 'c';)

examples that cannot use interception
```sql
SELECT * FROM single_table WHERE key1 > 'a' AND key_part1 = 'a' AND key_part2 = 'b'AND key_part3 = 'c';

SELECT * FROM single_table WHERE key1 = 'a' AND key_part1 = 'a';
```
first case is because using a range, interception required exact match.
second case is because using Composite index require the present of all indexed columns.

***p.s.*** same rules also apply for union

```sql
SELECT * FROM single_table WHERE key1 = 'a' AND id > 100;
```
special case: using
since rows with same secondary index values are then ordered by primary key, for this query, we first search by key1='a', then we can just filter out result using id>100.

### union
combine result using or
```sql
select * from single_table where key1 = 'a' or key3 = 'b'
```
since key1 and key3 both indexed, we can combine the search result of two.

```sql
SELECT * FROM single_table
WHERE key_part1 = 'a' AND key_part2 = 'b' AND key_part3 ='c'
OR (key1 = 'a' AND key3 = 'b');
```
union intercept result from key_part1 = 'a' AND key_part2 = 'b' AND key_part3 ='c'  and  (key1 = 'a' AND key3 = 'b'); since both hit index

### sort union
```sql
SELECT * FROM single_table WHERE key1 < 'a' OR key3 > 'z'
```
we can sort each result from key1 < 'a' and key3 > 'z', then union the result.

usefulness: when result from a secondary index is small, then sort that result based on primary key won't cost much.


## Search Mechanism
### Search without index
If the searched column is not indexed, InnoDB will iterate from infimum to supremum in each page.

### Search with index
By understanding the way B+tree index works in InnoDB. We can improve search efficiency by creating proper index.

e.g. if we create a person_info table with name, birthday, phone as secondary index.

```sql
create table person_info(
  id int not null auto_increment,
  phone char(11) not null,
  birthday date not null,
  name varchar(100) not null,
  country varchar(100) not null,
  primary key (id),
  index idx_name_birthday_phone(name, birthday, phone)
)
```

case 1:
```sql
SELECT * FROM person_info WHERE birthday = '1990-09-27' AND phone_number = '15123983239' AND name = 'Ashburn';
```
all three search criteria hit the idx_name_birthday_phone ( order of search query does not matter since mysql will optimize search query before start searching)

case 2:
```sql
SELECT * FROM person_info WHERE name = 'Ashburn' AND birthday = '1990-09-27';
```
still hit idx_name_birthday_phone index.

case 3:
```sql
SELECT * FROM person_info WHERE birthday = '1990-09-27';
```
missing the idx_name_birthday_phone. Since idx_name_birthday_phone is indexed by order name > birthday > phone, so search by birthday will miss the index.

case 4:
```sql
SELECT * FROM person_info WHERE name LIKE 'As%'
```
hit the index. When index with varchar or char, it compare each character of the data string from left to right. So if search by prefix, it can hit the index. but search by '%As%' or '%As' won't hit index. The trick thing for suffix search like '%As' is that you can reverse the data string when storing.

case 5: search by range
```sql
SELECT * FROM person_info WHERE name > 'Asa' AND name < 'Barlow';
```
first search name = 'Asa' then search name = 'Barlow', then return result between these two.

However, when search by range on multiple columns, such as
```sql
SELECT * FROM person_info
WHERE name > 'Asa' AND name < 'Barlow' AND birthday > '1980-01-01';
```

only the name hit the index because birthday is only take into order when name is same.

Similarly, for the following sql
```sql
SELECT * FROM person_info
WHERE
  name = 'Ashburn' AND
  birthday > '1980-01-01' AND
  birthday< '2000-12-31' AND
  phone_number > '15100000000';
```
since name is fixed, we can use index for birthday range comparison, but phone_number will miss the index, we have to iterate each phone_number in the result of previous two condition search

case 6: order by
```sql
SELECT * FROM person_info ORDER BY name, birthday, phone_number LIMIT 10;
```
hit the index, because order by sequence is the same as idx_name_birthday_phone.

but for sql
```sql
SELECT * FROM person_info WHERE name = 'A' ORDER BY birthday, phone_number LIMIT 10;
```
miss the index since order by sequence is not same as idx_name_birthday_phone

case 7: group by
In order to use index, group by order should follow the idx_name_birthday_phone order as well
```sql
SELECT name, birthday, phone_number, COUNT(*)
FROM person_info
GROUP BY name, birthday, phone_number
```

### cost of index
Once your search hit index, you can easily get back primary ids which satisfy the searching criteria. However, when some columns are not indexed and showed up in search, we then need to look up there columns from default B+ tree(which use default index). If the number of primary keys are huge, maybe we should just do the whole table scan directly without bother using index.

e.g.
```sql
SELECT * FROM person_info WHERE name > 'Asa' AND name < 'Barlow' LIMIT 10;
```
when 90% of the records has name between Asa and Barlow, the sql optimizer may scan the whole table instead of using idx_name_birthday_phone index.

So, try to ***only use index columns*** in the search.

### Best practice when using index
1. pick index columns that used in group by, order by, and where closure.
2. if a column has few distinct values, no need to set index.
3. try to use small type for the indexed colum. e.g. TINYINT over INT, MEDIUM INT over BIGINT. (This also applied for the primary key's type)
4. When index on string, we can index on first xx characters
```sql
index idx_name(name(10))
-- index on first 10 char of name
```
however, when using this approach, order by name won't hit index.
5. if index column is used with expression or function, it won't hit index.
e.g.
```sql
where name * 2 < 4
-- not hit index, since name * 2 is not indexed

where name < 4/2
-- hit index, name is shown up by itself

```
6. set primary key to be auto_increment, so that when insert new record, it always append to the end, to avoid modifying the existing order of records.
```sql
CREATE TABLE person_info (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	NAME VARCHAR ( 100 ) NOT NULL,
	birthday DATE NOT NULL,
	phone_number CHAR ( 11 ) NOT NULL,
	country VARCHAR ( 100 ) NOT NULL,
PRIMARY KEY ( id ),
KEY idx_name_birthday_phone_number ( NAME ( 10 ), birthday, phone_number ));
```