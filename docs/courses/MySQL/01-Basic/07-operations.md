---
title: MySQL operations
author: ChocolateAceCream
date: 2024/02/24 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# MySQL operations

1. select different columns from different tables:
```sql
select a.ID, a.Name, b.Street, b.City
from person as a
left join loc as b
on a.ID = b.ID
```

2. limit and offset
- limit 1,n means to retrieve "n" number of rows starting from the second(1+1) row.
- limit 1 offset n means to skip the first "N" number of rows and retrieve only one row after that
- limit and offset applies to the query result
e.g.
```sql
SELECT SUM(author_id) as total FROM articles ORDER BY id DESC LIMIT 4;
-- this won't sum up first 4 rows, the query will first sum up all rows then apply limit 4 on the result, so the final result if null
-- optionally, you can use where to select first 4 rows.
```

3. DENSE_RANK(), rank() and row_number()
```sql
SELECT
	published,
	title,
	DENSE_RANK() over ( PARTITION BY published ORDER BY id ) `rank`
FROM
	articles
```
| published | title                                                      | rank |
|-----------|------------------------------------------------------------|------|
| 1         | Hello World                                                | 1    |
| 1         | fdasf                                                      | 2    |
| 1         | Project deployment through multiple nginx container        | 3    |
| 1         | ssh to remote server using ssh config                      | 4    |
| 1         | Config github action for CI/CD                             | 5    |
| 1         | Golang Embed usage (need go1.16+)                          | 6    |
| 1         | Deploy minio using docker to provide image hosting service | 7    |
| 1         | Fetch text file from backend and then display              | 8    |
| 1         | Gorm raw sql pagination                                    | 9    |
| 1         | Gorm UpdateColumn                                          | 10   |
| 1         | Integrate emoji-mart-vue-fast in elementPlus               | 11   |
| 1         | Watch pinia store object field change in vue3              | 12   |
| 1         | Gorm cascade delete                                        | 13   |
| 1         | Install bypass openwrt in docker                           | 14   |
| 1         |  Mount ext4 harddisk to openwrt in docker                  | 15   |
| 1         | Portainer tls connect to remote env                        | 16   |
| 1         | Set swap memory in Linux                                   | 17   |
| 1         | NPS                                                        | 18   |
| 1         | Install docker-compose on Raspberry Pi 3B                  | 19   |
| 1         | Setting dayjs i18n in vue3                                 | 20   |
| 1         | gorm association preload usage                             | 21   |
| 1         | Build a notification system                                | 22   |
| 1         | asdfasdf                                                   | 23   |
| 2         |                                                            | 1    |
| 2         |                                                            | 2    |
| 2         |                                                            | 3    |
| 2         |                                                            | 4    |
| 2         |                                                            | 5    |


As shown in the result, **DENSE_RANK()** will create an additional colum as rank (be careful to use `rank` since rank keyword is preserved by mysql, otherwise you can use my_rank or xxx directly as column name). The PARTITION BY create a published value.

same syntax applied for rank() and row_number(), the only difference is the result:
- row_number() will never repeat, just rank from 1,2,3,4,5 etc...
- rank() can repeat, if a>b=c>d, then a=1, b=2, c=2, d= 4
- dense_rank() also repeat, if a>b=c>d, then a=1, b=2,c=2,d=3



4. having
- usually used with  **group by** keywords, to filter out groups which meet the certain conditions
```sql
SELECT
	pid,
	SUM( pid ) AS total,
	count( pid )
FROM
	menus AS a
GROUP BY
	pid
HAVING
	total > 6
```

5. date operation
- convert a datetime type colum to date type column, so you can compare the two datetime column by their date only
```sql
DATE(datetime_type_colum_name)
```

- add/sub duration to a date
```sql
DATE_SUB(date_column, INTERVAL 12 DAY)
DATE_ADD(date_column, INTERVAL 2 YEAR)
```

- the diff between two date
```sql
# if date_col_1 is 1 day earlier than date_col_2
DATEDIFF(date_col_1, date_col_2) = -1 # true
DATEDIFF( date_col_2,date_col_1) = 1 # true
```

- using data range in where closure
```sql
where my_date between '2013-10-01'
```

6. math operations
- round(val, decimal_points)
round a number to designated decimal points
```sql
round(2.123123, 2)
-- output 2.12
```

- using sum with if
```sql
sum (if status = 'completed', 0, 1)
-- if status is completed, then sum += 0, else, sum += 1
```

- using sum with case when
```sql
sum(case when status = 'completed' then 0 else 1 end)
```

- with
used to define common table expressions (CTEs). CTEs are temporary result sets that can be referenced within the main query
```sql
With t1 as(
  select distinct player_id as pi, min(event_date) as e
  from activity
  group by player_id
),
 t2 as (
  select *
  from Activity as a1
  join t1
  on a1.player_id = t1.pi and DATE_ADD(t1.e, interval 1 day) = a1.event_date
)

select round((select count(*) from t2) /(select count(*) from t1) , 2) as fraction
```

- using count(*) over
```sql
with t as (
SELECT tiv_2016,
COUNT(*) OVER (PARTITION BY (tiv_2015)) as cnt_2015,
COUNT(*) OVER (PARTITION BY lat, lon) as cnt_ll
FROM Insurance)
select round(sum(tiv_2016),2) as tiv_2016  from t
where cnt_2015 > 1 and cnt_ll = 1
```
explain:
**COUNT(*)** is a window function that counts the number of rows in each partition of the result set.
**OVER** is a keyword that indicates that we are using a window function and specifies the window or partition of the result set to operate on.
**PARTITION BY (tiv_2015)** is a clause that defines the partitioning scheme for the window function. In this case, we are partitioning the result set by the tiv_2015 column, which means that the window function will count the number of rows with the same tiv_2015 value.

7. ROW_NUMBER() OVER (partition by xxx order by id)
generate unique number for each row in the result set
- PARTITION BY (optional): Divides the result set into partitions based on one or more columns. The ROW_NUMBER() function restarts the numbering for each partition.
- ORDER BY (optional): Specifies the order of the rows within each partition. The

***PS:*** note that the ROW_NUMBER() function does not guarantee any specific order unless an ORDER BY clause is specified.
e.g.
```sql
select id,visit_date,people, ROW_NUMBER() over (order by id) as rn
```

8. group by VS. distinct
in terms of efficiency, if there's index, then almost the same.

before mysql 8.0:
group by sorted implicitly under certain condition (that's why we usually use ***order by null*** to suppress this action). therefore if no index present, distinct has better efficiency

mysql 9.0 and above:
implicitly sort has been removed, so almost the same even without index.