---
title: Views
author: ChocolateAceCream
date: 2025/01/23 19:30
isTop: true
categories:
 - PostgreSQL
tags:
 - PostgreSQL
 - Views
 - Materialized View
 - Recursive view
---

# Views in PGSQL <Badge text="PostgreSQL" type="warning" />

## Overview
As defined in documentation:
Views is a named query stored in pgsql, which is defined based on one or multiple tables (known as ***base tables***).

I may ask myself the following questions:
1. when the view is updated? and how's its interaction with underlying tables.
2. why do I need views
3. how efficient to use views compare to direct query

and after a little bit of research, I found answers to all of my questions above.

### Why views
views offer many advantages:
##### simplifying complex queries
you can direct query from views as if they were regular tables, so you can create a view using complex query then build other query on top of it.

##### Security and access control
you can expose subsets of data from your table using views, hiding sensitive infos

##### logical data independence
If your applications use views, you can freely modify the structure of the base tables. In other words, views enable you to create a layer of abstraction over the underlying tables.

### How to use views

#### creation
```sql
create  OR REPLACE VIEW demo_view
as
select id from authors
limit 10
```

p.s. you can use view as ***base table*** to create other views

#### drop views
```sql
drop view if EXISTS demo_view CASCADE
```

p.s. if no CASCADE keywords, then a view cannot be delete if other views depend on it

### Updatable views
It's a complex topic regarding the interaction between views and its base tables.

Basically, a view is read-only because it's indeed a saved SQL query, so, when updating the underlying table, views will automatically updated as well, since it dynamically fetched from the underlying table.

However, some views that meet certain conditions are updatable, so you can direct updating these kind of views, and both base-table and views are updated with new data.

here's the conditions for a view to be updatable:

- single source of ```FROM``` clause, which can be a table or another updatable view

- the query that used to construct views cannot contain one of the following clauses at the top level:
```
GROUP BY
HAVING
LIMIT
OFFSET FETCH
DISTINCT
WITH
UNION
INTERSECT
EXCEPT
```

now let's explain why
1. group by
since group by did aggregates rows into groups, so it's impossible to map changes to the original table

2. having
similar to group by, aggregated rows cannot be mapped

3. limit and offset
since views generated with limit and offset are not full set of original table, so pgsql cannot determine how updates should propagate to rows that are not included in the result set

4. distinct
similar reason as limit and offset, result set may not 1v1 map with original table

5. WITH (CTEs)
CTEs act as a temp result set, so updates cannot propagate to the original table

6. ***Union, intersect*** and ***except***
union combine result from two result sets, so cannot determine which result set the updates goes to.
Similar to intersect, which return rows that are common to both queries, and except, which returns rows that are in the first query but not in the second

Generally speaking, the rows in the result set has to be 1v1 correspondence with rows in the underlying table in order to do an update.

#### With check option
By default, once you have a updatable view created, you can insert new data into that view, and the change will propagated to its underlying table.

However, what if, you insert a new row that is not within the range of that view? e.g. a view where id < 10, then you insert a new row for id =11?
The answer is:
the new row will indeed propagate to its parent but it's invisible in the view table since it's out of range.

This is not the behavior we want sometimes, so we can implement with check option when create that view

```sql
create  OR REPLACE VIEW demo_view
as
select id,  first_name from authors
where id >1000
with cascaded check option;

update demo_view set first_name = 'Aaaa' where id = 1222;

insert into demo_view (id,first_name)
values(899,'vvvv');
```

If you apply ***with cascaded check option;***, then pgsql will raise error when executing insert statement.
> ERROR:  new row violates check option for view "demo_view"
DETAIL:  Failing row contains (...

p.s. cascade is the default, so
***with cascaded check option*** is equal to ***with check option;***

alternative, you can use ***with local check option;*** , which only ensure the updates and inserts satisfy the conditions of the current view

## Materialized views
Materialized views cache the result set of an expensive query and allow you to refresh data periodically.

Some of key features are:
1. Persistent Storage:
- since data is stored physically on disk, when query the materialized view, db will direct fetch the data from disk, without re-execute the query

2. Manual Refresh:
- A materialized view does not automatically update when the underlying table are updated. Instead, you must manually refresh it using the **refresh materialized view** command

3. Read-Only:
By default, materialized views are read-only, which means you cannot apply **update** or **insert** However, you can drop and re-create it to refresh.

4. Indexes:
You can create indexes on materialized views, further optimizing the performance

### Syntax
#### Creation
```sql
DROP MATERIALIZED VIEW IF EXISTS demo_mv;
create MATERIALIZED view demo_mv
AS
select *
from authors
where id < 10
with no data;
```

a few things need to be noticed here:
1. you can not use ***create or replace*** for materialized views
2. if you use **with no data** option, then the view is flagged as unreadable, which means you have to first ***REFRESH MATERIALIZED VIEW*** before you query it. By default, materialized views are created **with data**

#### Refresh
To load data into materialized views, you use ***REFRESH MATERIALIZED VIEW*** command

> refresh MATERIALIZED view demo_mv;

Be careful when you apply this command because it will lock the underlying table during the refresh process, so you cannot query its underlying table while the data is loading into the view.

##### Concurrently option (available pgsql v9.4 or later)
the default way or refresh mv is fast, but it required the locking of table, so alternatively, we can apply this command
> REFRESH MATERIALIZED VIEW CONCURRENTLY view_name;

to refresh concurrently (so no need to lock the table), but it required the mv has its own unique index.

Here's what happened underneath:
1. apply the command
2. pgsql create a snapshot of the underlying table at that time when command executed
3. pgsql create a new, temp version of materialized view that is going to be used
4. pgsql used that snapshot to build the new version of mv.
5. replace the ond mv with the new mv once updating is done

P.S.
1. once snapshot is created, any changes to the underlying table won't reflect on the new view
2. before new mv is done building, all query to the mv will using old version of mv.
3. If a view is created using no data option, then you cannot apply ***REFRESH MATERIALIZED VIEW CONCURRENTLY view_name;** directly on it. You need to run ***REFRESH MATERIALIZED VIEW view_name;*** first. Also, you need to create unique index beforehand

#### Remove
> Drop materialzied view view_name;

## Recursive view (available v9.3+)
a recursive view is a view whose defining query references the view name itself.
e.g.
```sql
drop table if EXISTS  employee;
CREATE TABLE employee (
  employee_id INT PRIMARY KEY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee (employee_id) ON DELETE CASCADE
);
INSERT INTO employee (employee_id, first_name, last_name, manager_id)
VALUES
  (1, 'Windy', 'Hays', NULL),
  (2, 'Ava', 'Christensen', 1),
  (3, 'Hassan', 'Conner', 1),
  (4, 'Anna', 'Reeves', 2),
  (5, 'Sau', 'Norman', 2),
  (6, 'Kelsie', 'Hays', 3),
  (7, 'Tory', 'Goff', 3),
  (8, 'Salley', 'Lester', 3);
SELECT * FROM employee;

create RECURSIVE view report (employee_id, sub) as
select employee_id, first_name || last_name  as sub
from employee
where manager_id is null
union all
select
	e.employee_id,
	(
		r.sub || '>' || e.first_name || e.last_name
	) as sub

from
	employee e
inner join report r on e.manager_id = r.employee_id;
```

## Alter view
Use the ALTER VIEW ... RENAME TO statement to rename a view.
Use the ALTER VIEW ... (SET check_option) statement to change the check option of a view.
Use the ALTER VIEW ... SET SCHEMA statement to change the schema of a view.

## listing view
listing all materialized views:
> SELECT * FROM pg_matviews;
