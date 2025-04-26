---
title: Full-test search
author: ChocolateAceCream
date: 2025/04/23 19:30
isTop: true
categories:
 - PostgreSQL
tags:
 - PostgreSQL
---

# Full-test search with GIN and tsvector <Badge text="PostgreSQL" type="warning" />
PostgreSQL provides powerful built-in full-text search capabilities using tsvector data types and GIN (Generalized Inverted Index) indexes.

## GIN
general idea of GIN is that each word is extracted and mapped with row number sets which contains that word.
It has slower write speed compared to B-tree but much faster query speed in return.

Optimized for these operators:

Arrays: @> (contains), <@ (contained by), && (overlap), = (equals)

JSONB: @>, ?, ?|, ?&

### Full-text: @@ (matches)
e.g.
```sql
select *
from article
where  to_tsvector('english', article_content) @@ to_tsquery('english', 'aaa')
```
assume article_content is a word or paragraph, then @@ means find if the content exist any word matched 'aaa'

#### Things to keep in mind
Directly using to_tsvector like the example above is not optimal, since tsvector is calculated on-the-fly. A better approach is to add a column that store tsvector of content then create a gin index on that column
```sql
alter table article
add column article_content_tsvector
generated always as (to_tsvector('english', article_content)) stored;
create index article_content_gin on article using gin (article_content_tsvector)
```

##### Key Components
- Generated Column:
A column whose value is always computed from other columns
Automatically updated when the source data changes

- GENERATED ALWAYS AS:
Defines the expression that computes the column value
PostgreSQL will enforce that this value cannot be manually set

- STORED:
The computed value is physically stored on disk
Alternative is VIRTUAL (not stored, computed on read) but PostgreSQL only supports STORED for generated columns

- to_tsvector('english', dots):
Creates a full-text search vector using English language rules
Parses the dots column content into searchable tokens

- create gin index
need to pass in a tsvector type column as indexed column

Now a full-text search will hit the index and much faster.
### fastupdate
turn fastupdate on and off for certain use cases
- fastupdate=on (default)
prioritize index update speed by using pending lists. However, this will slow the search speed since it will now scan both the index and growing pending lists
- fastupdate=off
prioritize search speed. No more pending list, hence the update will be slower. Essential for read-heavy workloads or benchmarking search performance
e.g.
```sql
create index idx_gin_article_content
on article using gin (article_content_tsvector)
with (fastupdate=off)
```

### jsonb data

```sql
CREATE INDEX idx_gin_profile ON users USING GIN(profile_jsonb);
-- Find users with "premium" in their profile
SELECT * FROM users WHERE profile_jsonb @> '{"subscription": "premium"}';
```

a more complicated sql may look like this
```sql
select *
from t_verify_capture_codes
where  dots_jsonb#>'{0}' @> '13'
```

|Operator | Meaning | Example | Result|
|--|--|--|--|
-> | Get JSON object/array by key/index (as JSON) | data->'name' | "Alice"
->> | Get JSON value by key/index (as text) | data->>'name' | Alice
#> | Get nested JSON object (as JSON) | data#>'{address,city}' | "Tokyo"
#>> | Get nested JSON value (as text) | data#>>'{address,city}' | Tokyo
@> | Contains (JSONB only) | data @> '{"role":"admin"}' | true/false
<@ | Is contained by | data <@ '{"role":"admin"}' | true/false
? | Has key | data ? 'role' | true/false
`? | ` | Has any key from array | `data ?
?& | Has all keys from array | data ?& array['a','b'] | true/false
