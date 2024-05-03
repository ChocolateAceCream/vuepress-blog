---
title: Transaction
author: ChocolateAceCream
date: 2024/02/21 10:24
isTop: true
categories:
 - MySQL
tags:
 - MySQL
---

# Transaction <Badge text="MySQL" type="warning" />

### ACID
- Atomicity: do it all or don't do it
- Isolation: each transaction is isolated performed, not affect others.
- Consistency: make sure data compliant real world rules
- Durability: data persistance(stored in hard disk)

We call one or multiple db operations that need to keep ACID principle ***Transaction***

##### Trigger
a trigger is a piece of sql that executed after/before action(insert/delete/update).

e.g. use trigger before insert to validate data
```sql
CREATE TRIGGER account_trigger_demo AFTER INSERT ON account FOR EACH ROW
BEGIN
	IF
		NEW.balance > 1000 UPDATE account
		SET balance = NEW.balance / 10
	END IF;
END;
```
P.S don't create dead loop. e.g. in after insert trigger, you update the data column, which will cause another insert trigger event.
p.s. The SQLSTATE value '45000' is a general-purpose code in MySQL that represents "unhandled user-defined exception". It's commonly used with the SIGNAL statement to raise custom errors.

'00000': This class code means that the SQL statement completed successfully.
'23000': This class code is for integrity constraint violation. For example, it's used when you try to insert a duplicate key into a unique column.
'22001': This class code is for string data, right truncation. For example, it's used when you try to insert a string into a varchar column, but the string is longer than the column's maximum length.
'42000': This class code is for syntax error or access rule violation. For example, it's used when your SQL syntax is incorrect.


### Transaction Status
- active: db operation are executing
- partially committed: the last operation of transaction finished, right before the data write back from buffer-pool into disk(changed data still in memory).
- failed: if operation failed due to db error/OS error/power off/stop manually, and operations cannot continue executed, we need to roll back to restore data. During error happens and roll back process, is called failed status
- abort: once roll back finished, transaction reached abort status
- committed: once changed data write back to the disk, we call it committed

### Syntax
```sql
START TRANSACTION READ WRITE, WITH CONSISTENT SNAPSHOT
-- you sql starts here
UPDATE account SET balance = balance - 10 WHERE id = 1;
UPDATE account SET balance = balance + 10 WHERE id = 2;
COMMIT;
```


- READ ONLY/READ WRITE: whether transaction can write/read DB data. default is READ WRITE
p.s. for temp table, even transaction is read only, it can still modify the temp table since temp table only exists in session.

- ROLLBACK
rollback can only be applied by programmer manually. When transaction facing some errors in executing, it will rollback itself, you don't need call rollback yourself. ROLLBACK only works when autocommit is turned off by
> set autocommmit=0;

then call rollback will roll everything back to last commit
```sql
START TRANSACTION READ WRITE, WITH CONSISTENT SNAPSHOT
-- you sql starts here
UPDATE account SET balance = balance - 10 WHERE id = 1;
UPDATE account SET balance = balance + 10 WHERE id = 2;
ROLLBACK;
```

##### SAVEPOINT
used with rollback to rollback to certain point.
```sql
BEGIN
UPDATE account SET balance = balance - 10 WHERE id = 1;
SAVEPOINT S1;
UPDATE account SET balance = balance + 1 WHERE id = 2;
ROLLBACK TO S1;
```

##### CONSISTENT SNAPSHOT
the main difference for BEGIN and START TRANSACTION is that START TRANSACTION can apply CONSISTENT SNAPSHOT method.

CONSISTENT SNAPSHOT is a read-only view of the database at the start of transaction. e.g. all select statement inside transaction will see the same db even though other transactions modified db on at the same time.
e.g.
```sql
START TRANSACTION WITH CONSISTENT SNAPSHOT
select * from orders;
select * from users;
-- ... more SELECT statements ...
COMMIT;

```

In this example, all the SELECT statements within the transaction see the same consistent snapshot of the orders table, even if other transactions are adding, modifying, or deleting rows in the orders table at the same time.

p.s AUTOCOMMIT is set to off automatically when executing an transaction
p.s. CONSISTENT SNAPSHOT can prevent dirty read.


### implicit commit
We know once start a transaction, autocommit is turned off. However, some syntax will trigger commit action just like COMMIT syntax, which will commit all previous changes. Such syntax including:
- DDL: CREATE/ALTER/DROP etc...
- change mysql system tables: ALTER USER/GRANT/SET PASSWORD etc...
- nested transaction:
```sql
BEGIN;
SELECT ...;
UPDATE ...;
BEGIN;
-- SECOND BEGIN will commit select and update.
```
- lock/unlock: LOCK TABLES/UNLOCK TABLES etc...
- load data into db: LODA DATA
