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

## build-in functions
### Type Casting
syntax is ```::TARGET_TYPE```
e.g.
```sql
update account
  set balance = balance - 900::money
--   or you can do this
--   set balance = balance - '900'::money

  where name = 'kevin' and type = 'checking';
```
this will casting 900 to money type.

### random()
```random() ``` generate random number from 0 ~ 1
e.g.
```sql
WITH x (a,b) AS (
    SELECT
			trunc(random() * 100)::text,  -- Generate a random number once
			trunc(random() * 100)::integer  -- Generate a random number once
    FROM generate_series(1, 3)       -- Create 10 rows
)
insert into account select x.a,'saving',x.b::money from x;
```
### generate_series(start,end,step)
- step is optional
generate a series given start point, end point and steps in between.

### vacuum
clean up dead tuples manually. useful when high write activity involved.

dead tuples are generated because of pgsql's MVCC (multi-version concurrency control). This model ensures data consistency and isolation by maintaining multiple versions of a row, allowing transactions to work concurrently without locking.

### analyze
collect statistics about the table's data and stores them in the system catalog. These statistics are used by the query planner to make efficient query execution decisions.

e.g.
```sql
vacuum analyze t;
```

**vacuum analyze is useful when**
1. after large updates, inserts, or deletes
2. query performance has degraded due to inaccurate table statistics or table bloat

### string concatenation
1. use || to concatenate two strings.
e.g. match val column with string str1str2str3
```sql
select * from t where val = 'str1' || 'str2' || 'str3'
```

2. use concat()
e.g. previous example can be rewrite using concat() as:
```sql
select * from t where val = concat('str1', 'str2', 'str3')
```

3. use concat_ws(), first param is the separator
e.g.
```sql
select concat_ws(', ', 'apple','banana', 'pear')
-- Result: 'apple, banana, pear'
```

### substring()
1. substring(str, from)
```sql
SELECT SUBSTRING('user@example.com' FROM POSITION('@' IN 'user@example.com') + 1);
-- Result: 'example.com'
```

2. substring(str, from, for)
```sql
select substring('123456' from 1 for 3)
-- Result: '123'
```


### now()
return the current timestamp, pgsql specific, the DB standard command is CURRENT_TIMESTAMP

### TO_CHAR
used to format a number or date/time value to a string given the desired format.
e.g.
```sql
TO_CHAR(value,format)
-- value: date/time or numeric value
-- format: format template
```


#### Fill Mode (FM)
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

#### Time formatting
e.g.
```sql
SELECT TO_CHAR(NOW(), 'YYYY-MM-DD');  -- Output: '2024-07-28'
```

##### Where FM works in formatting date/time

```sql
SELECT TO_CHAR(DATE '2024-01-28', 'Month DD, YYYY'); -- Output: 'January   28, 2024'
```

since TO_CHAR() by default format 'Month' with a Fixed-width formatting approach, which ensures that all month names take up the same amount of space (which is the length of longest month name plus one space. len(september) + 1 = 10, which can be helpful for tabular displays). That's where FM can be used if we don't want the default format
```sql
SELECT TO_CHAR(DATE '2024-07-28', 'FMMonth DD, YYYY'); -- Output: 'July 28, 2024'
```


### COLLATE
This key word is used to tell PG how to compare/sort string in a string column.

usage:
```sql
CREATE TABLE names_accent_sensitive (
    name VARCHAR COLLATE pg_catalog."default"
);
```
using pg_catalog."default" will make sure same approach is used when compare string.

other options are:
- case-insensitive
> name VARCHAR COLLATE "en_US.utf8"

- Spanish language, where accents are considered, and sorting reflects this.
> name VARCHAR COLLATE "es_ES.utf8"

- Case-Insensitive Collation
> name VARCHAR COLLATE "C"

### ON CONFLICT
sometimes when insert a record into table, you need to check the constrains such as unique keys. That's where **ON CONFLICT** is useful.

For example, if I want to insert a new user record, but the email already exist and it has unique constrain, I might want to just update the rest of fields.
```sql
INSERT INTO users (username, email)
VALUES ($1, $2)
ON CONFLICT (email) DO UPDATE
SET username = EXCLUDED.username;
```
- EXCLUDED refer to the values that were originally provided for the insert.
- ON CONFLICT (email): Specifies that if there's a conflict (i.e., a record with the same email already exists), the operation should perform an update instead of inserting a new record.
- DO UPDATE: Specifies the columns to update in case of a conflict.

## Window Functions
window functions perform calculations across a specified set of rows, known as "window", from a query and return a single value related to the current row.
e.g. calculate total sales amount for each department
```sql
select t.*, sum(t.sales_amount) over (partition by t.department) as department_total
from sales as t
```

e.g.2 calculate sales' rank in each department
```sql
select t.*, rank() over (partition by t.department order by sales_amount desc) as dept_rank
```

common types of window functions include ranking functions, aggregate functions, offset functions and distribution functions.

### ranking functions
- ROW_NUMBER(): give unique identify rows within a group or order data without any gaps
e.g.
> row_number() OVER (partition by p.department ) AS row_n

- RANK(): assigns rank with gaps for ties. (resulted rows rank like 1,1,3,3,5)
- DENSE_RANK(): assigns rank without gaps for ties (resulted rows rank like 1,1,2,2,3)
- NTILE(n): divides rows into n approximately equal groups. e.g. ntile(4) can get top 25% and bottom 25% of partition

### offset functions
Offset functions allow access to data from other rows in relation to the current row. They are used when you need to compare values between rows or when you run time-series analysis or trend detection.

- LAG(): Access data from a previous row
e.g.
```sql
SELECT P
	.*,
	LAG ( P.sales_amount ) OVER ( ORDER BY P.sale_person_id ) AS pre_amount,
	p.sales_amount - LAG ( P.sales_amount ) OVER ( ORDER BY P.sale_person_id ) AS diff_from_prev
FROM
	promo_sales AS P
```

- LEAD(): Access data from a subsequent (next) row
```sql
SELECT P
	.*,
	LEAD ( P.sales_amount ) OVER ( ORDER BY P.sale_person_id ) AS next_amount,
	p.sales_amount - LEAD ( P.sales_amount ) OVER ( ORDER BY P.sale_person_id ) AS diff_from_next
FROM
	promo_sales AS P
```

- FIRST_VALUE(): Get first value in an ordered set
```sql
SELECT P
	.*,
	FIRST_VALUE ( P.sales_amount ) OVER ( ORDER BY P.sale_person_id ) AS first_val
FROM
	promo_sales AS P
```

- LAST_VALUE(): Get last value in an ordered set
```sql
SELECT P
	.*,
	LAST_VALUE ( P.sales_amount ) OVER ( partition by department ORDER BY P.sale_person_id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING ) AS last_val
FROM
	promo_sales AS P
```
p.s. last_val() usage is different compared to others, because the default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. so it always return current row as it's the last row in the frame. So in order to use it properly, we need explicitly define the window frame as ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING, which include all rows from the first to the last in the ordered partition

### Distribution Functions
Distribution functions calculate the relative position of a value within a group of values and also help you understand the distribution of values.

- PERCENT_RANK(): Calculates the percentile rank of a row, usually used to calculate bottom 25%, top 25% etc...
p.s. the percent_rank() is calculated based on DENSE_RANK() of row in a partition.
```sql
SELECT P
	.*,
	PERCENT_RANK() OVER ( partition by p.department order BY p.sales_amount asc ) AS par_rank
FROM
	promo_sales AS P
```

- CUME_DIST(): Calculates the cumulative distribution of a value
For example:
The first row (100): 1 / 5 = 0.2 (1 row out of 5 has a value <= 100)
The second row (150): 2 / 5 = 0.4 (2 rows out of 5 have values <= 150)
The last row (300): 5 / 5 = 1.0 (all 5 rows have values <= 300)

- PERCENTILE_CONT(): Calculates a continuous percentile value
- PERCENTILE_DISC(): Calculates a discrete percentile value
p.s. it only can be applied to aggregated functions and not window functions

## Triggers

### Creation
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### usage
```sql
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## Constraints
A constraint is a rule applied to a column (or columns) in a table to enforce data integrity and consistency. Constraints can ensure that data entered into a table adheres to specific rules, such as uniqueness, data type, or value ranges.
### Foreign key
A foreign key is a specific type of constraint that enforces a link between two tables. It ensures that the value in a column (or a set of columns) in one table matches the value in a column in another table, thereby establishing a relationship between the tables.
#### one to one
put foreign key on either table is sufficient.
#### one to many
put foreign key on many side of table
```sql
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```
#### many to many
put foreign key on joined table with primary key of both tables
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```
