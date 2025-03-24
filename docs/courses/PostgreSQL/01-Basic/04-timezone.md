---
title: Time & Date
author: ChocolateAceCream
date: 2025/03/22 19:30
isTop: true
categories:
 - PostgreSQL
tags:
 - PostgreSQL
 - Timestamp
---

# Time & Date in PGSQL <Badge text="PostgreSQL" type="warning" />
## Common standard for handle time/date
### RFC3339 & ISO 8601
RFC 3339 is subset of ISO 8601, so any valid RFC is also valid ISO
#### ISO 8601 Examples
1. Date Format: YYYY-MM-DD
Example: 2023-10-05 (October 5, 2023).

2. Time Format: hh:mm:ss.sss (24-hour clock).
Example: 14:30:45.123 (2:30:45.123 PM).

3. Combined Date and Time: YYYY-MM-DDThh:mm:ss.sssZ
- T separates the date and time.
- Z indicates UTC (Coordinated Universal Time).
Example: 2023-10-05T14:30:45Z.

4. Time Zone Offsets:
±hh:mm or ±hhmm can be used to specify a time zone offset from UTC.
Example: 2023-10-05T14:30:45+02:00 (2 hours ahead of UTC).

5. Durations: Represented as PnYnMnDTnHnMnS.
Example: P1Y2M3DT4H5M6S (1 year, 2 months, 3 days, 4 hours, 5 minutes, and 6 seconds).

6. Intervals: Represented as start/end or start/duration.
Example: 2023-10-05T14:30:45Z/2023-10-06T14:30:45Z.

#### RFC3339 example
1. Date Format: YYYY-MM-DD
Example: 2023-10-05.

2. Time Format: hh:mm:ss.sss (24-hour clock).
Example: 14:30:45.123.

3. Combined Date and Time: YYYY-MM-DDThh:mm:ss.sssZ or YYYY-MM-DDThh:mm:ss.sss±hh:mm.
- T separates the date and time.
- Z indicates UTC.
- ±hh:mm specifies a time zone offset.
Example: 2023-10-05T14:30:45+02:00.

Key Difference:
- ISO 8601 can be used to present date, time, datetime, duration, intervals, but RFC 3339 can only be used to present datetime.


## timestamp, timestamptz and interval
timestamp, timestamptz are two common type to store datetime info, one without timezone info and one with.
If you use timestamp, then somewhere in your code you need to convert time to UTC when store and convert back to your timezone when retrieve.
If you use timestamp, you can directly store the datetime with zone info.

### Recommendation
- If you use timestamp, ensure all timestamps are stored in a consistent time zone and handle time zone conversions explicitly in your code
- For micro services, since every service may deal with timezone differently, use timestamp is a more flexible approach.
- For monolithic, if cross-region, then consider use timestamptz to handle the timezone part for you.

### Interval
An interval represents a duration of time. It can include components such as:
- Years
- Months
- Days
- Hours
- Minutes
- Seconds
- Milliseconds
e.g.
```sql
INTERVAL '1 day'          -- 1 day
INTERVAL '2 hours'        -- 2 hours
INTERVAL '3 months'       -- 3 months
INTERVAL '1 year 6 months' -- 1 year and 6 months
INTERVAL '1 day 12:30:45' -- 1 day, 12 hours, 30 minutes, and 45 seconds
```

## Common functions
### DATE_PART(text, timestamptz)
```DATE_PART``` function is used to extract a specific part of a date or time. However, it can **only** be used to **extract one field**, such as year or month or day or hour etc...
e.g.
```sql
select date_part('month', bill_time)
-- select bill_time field and extract the month
```
p.s. date_part is pgsql special

### DATE_TRUNC()
```DATE_TRUNC``` can be used to truncate a timestamp/interval to the beginning of certain field
e.g. truncate the timestamp to the beginning of that month
```sql
select date_trunc('month', '2020-02-14'::timestamptz)
-- return 2020-02-01 00:00:00+00

select date_trunc('MINUTE', '2020-02-14T12:23:22'::timestamptz)
-- return 2020-02-14 12:23:00+00

SELECT DATE_TRUNC('month', INTERVAL '1 year 3 months 15 days');
-- return 1 year 3 mons
```

### AGE(end,start)
return interval between start end datetime and start datetime
e.g.
```sql
SELECT AGE('2023-10-05'::timestamp, '1985-08-17'::timestamp)
-- return 38 years 1 mon 19 days
```

### EXTRACT
extract certain field of given interval or timestamp
```sql
select extract(day from AGE('2023-10-05'::timestamp, '1985-08-17'::timestamp))
-- return 19

select extract(month from AGE('2023-10-05'::timestamp, '1985-08-17'::timestamp))
-- return 1
```

Most commonly used is **epoch** to convert seconds of given interval. if input is a datetime, then return the number of seconds since January 1, 1970, 00:00:00 UTC.

```sql
select round(extract(epoch from '1988-07-17'::timestamp))
-- return 585100800, which is number of seconds between January 1, 1970, 00:00:00 UTC. and '1988-07-17'

select round(extract(epoch from NOW() - '1988-11-11'::timestamp)/86400)
-- return 13282, which is days between now and '1988-11-11'
```

p.s. compare to date_part (pgsql special), extract is common sql standard and widely supported.