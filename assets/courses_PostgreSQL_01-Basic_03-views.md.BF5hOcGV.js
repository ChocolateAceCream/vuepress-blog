import{_ as o}from"./chunks/ArticleMetadata.DQkBh7AX.js";import{_ as d,m as e,a as c,e as h,x as n,u as t,B as g,ah as y,o as l,p as A,q as u}from"./chunks/framework.BuAcqOzq.js";import"./chunks/theme.C-zQALvK.js";const I=JSON.parse('{"title":"Views","description":"","frontmatter":{"title":"Views","author":"ChocolateAceCream","date":"2025/01/23 19:30","isTop":true,"categories":["PostgreSQL"],"tags":["PostgreSQL","Views","Materialized View","Recursive view"]},"headers":[],"relativePath":"courses/PostgreSQL/01-Basic/03-views.md","filePath":"courses/PostgreSQL/01-Basic/03-views.md","lastUpdated":1737951972000}'),C={name:"courses/PostgreSQL/01-Basic/03-views.md"},m={id:"views-in-pgsql",tabindex:"-1"},w=h("a",{class:"header-anchor",href:"#views-in-pgsql","aria-label":'Permalink to "Views in PGSQL <Badge text="PostgreSQL" type="warning" />"'},"​",-1),F=y(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>As defined in documentation: Views is a named query stored in pgsql, which is defined based on one or multiple tables (known as <em><strong>base tables</strong></em>).</p><p>I may ask myself the following questions:</p><ol><li>when the view is updated? and how&#39;s its interaction with underlying tables.</li><li>why do I need views</li><li>how efficient to use views compare to direct query</li></ol><p>and after a little bit of research, I found answers to all of my questions above.</p><h3 id="why-views" tabindex="-1">Why views <a class="header-anchor" href="#why-views" aria-label="Permalink to &quot;Why views&quot;">​</a></h3><p>views offer many advantages:</p><h5 id="simplifying-complex-queries" tabindex="-1">simplifying complex queries <a class="header-anchor" href="#simplifying-complex-queries" aria-label="Permalink to &quot;simplifying complex queries&quot;">​</a></h5><p>you can direct query from views as if they were regular tables, so you can create a view using complex query then build other query on top of it.</p><h5 id="security-and-access-control" tabindex="-1">Security and access control <a class="header-anchor" href="#security-and-access-control" aria-label="Permalink to &quot;Security and access control&quot;">​</a></h5><p>you can expose subsets of data from your table using views, hiding sensitive infos</p><h5 id="logical-data-independence" tabindex="-1">logical data independence <a class="header-anchor" href="#logical-data-independence" aria-label="Permalink to &quot;logical data independence&quot;">​</a></h5><p>If your applications use views, you can freely modify the structure of the base tables. In other words, views enable you to create a layer of abstraction over the underlying tables.</p><h3 id="how-to-use-views" tabindex="-1">How to use views <a class="header-anchor" href="#how-to-use-views" aria-label="Permalink to &quot;How to use views&quot;">​</a></h3><h4 id="creation" tabindex="-1">creation <a class="header-anchor" href="#creation" aria-label="Permalink to &quot;creation&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">create  OR REPLACE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> VIEW</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> demo_view</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">as</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> authors</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">limit</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span></span></code></pre></div><p>p.s. you can use view as <em><strong>base table</strong></em> to create other views</p><h4 id="drop-views" tabindex="-1">drop views <a class="header-anchor" href="#drop-views" aria-label="Permalink to &quot;drop views&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">drop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> view</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> EXISTS</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> demo_view CASCADE</span></span></code></pre></div><p>p.s. if no CASCADE keywords, then a view cannot be delete if other views depend on it</p><h3 id="updatable-views" tabindex="-1">Updatable views <a class="header-anchor" href="#updatable-views" aria-label="Permalink to &quot;Updatable views&quot;">​</a></h3><p>It&#39;s a complex topic regarding the interaction between views and its base tables.</p><p>Basically, a view is read-only because it&#39;s indeed a saved SQL query, so, when updating the underlying table, views will automatically updated as well, since it dynamically fetched from the underlying table.</p><p>However, some views that meet certain conditions are updatable, so you can direct updating these kind of views, and both base-table and views are updated with new data.</p><p>here&#39;s the conditions for a view to be updatable:</p><ul><li><p>single source of <code>FROM</code> clause, which can be a table or another updatable view</p></li><li><p>the query that used to construct views cannot contain one of the following clauses at the top level:</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span>GROUP BY</span></span>
<span class="line"><span>HAVING</span></span>
<span class="line"><span>LIMIT</span></span>
<span class="line"><span>OFFSET FETCH</span></span>
<span class="line"><span>DISTINCT</span></span>
<span class="line"><span>WITH</span></span>
<span class="line"><span>UNION</span></span>
<span class="line"><span>INTERSECT</span></span>
<span class="line"><span>EXCEPT</span></span></code></pre></div><p>now let&#39;s explain why</p><ol><li><p>group by since group by did aggregates rows into groups, so it&#39;s impossible to map changes to the original table</p></li><li><p>having similar to group by, aggregated rows cannot be mapped</p></li><li><p>limit and offset since views generated with limit and offset are not full set of original table, so pgsql cannot determine how updates should propagate to rows that are not included in the result set</p></li><li><p>distinct similar reason as limit and offset, result set may not 1v1 map with original table</p></li><li><p>WITH (CTEs) CTEs act as a temp result set, so updates cannot propagate to the original table</p></li><li><p><em><strong>Union, intersect</strong></em> and <em><strong>except</strong></em> union combine result from two result sets, so cannot determine which result set the updates goes to. Similar to intersect, which return rows that are common to both queries, and except, which returns rows that are in the first query but not in the second</p></li></ol><p>Generally speaking, the rows in the result set has to be 1v1 correspondence with rows in the underlying table in order to do an update.</p><h4 id="with-check-option" tabindex="-1">With check option <a class="header-anchor" href="#with-check-option" aria-label="Permalink to &quot;With check option&quot;">​</a></h4><p>By default, once you have a updatable view created, you can insert new data into that view, and the change will propagated to its underlying table.</p><p>However, what if, you insert a new row that is not within the range of that view? e.g. a view where id &lt; 10, then you insert a new row for id =11? The answer is: the new row will indeed propagate to its parent but it&#39;s invisible in the view table since it&#39;s out of range.</p><p>This is not the behavior we want sometimes, so we can implement with check option when create that view</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">create  OR REPLACE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> VIEW</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> demo_view</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">as</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> id,  first_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> authors</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1000</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> cascaded </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">check</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> option</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">update</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> demo_view </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> first_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;Aaaa&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> where</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1222</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">insert into</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> demo_view (id,first_name)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">values</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">899</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;vvvv&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span></code></pre></div><p>If you apply <em><strong>with cascaded check option;</strong></em>, then pgsql will raise error when executing insert statement.</p><blockquote><p>ERROR: new row violates check option for view &quot;demo_view&quot; DETAIL: Failing row contains (...</p></blockquote><p>p.s. cascade is the default, so <em><strong>with cascaded check option</strong></em> is equal to <em><strong>with check option;</strong></em></p><p>alternative, you can use <em><strong>with local check option;</strong></em> , which only ensure the updates and inserts satisfy the conditions of the current view</p><h2 id="materialized-views" tabindex="-1">Materialized views <a class="header-anchor" href="#materialized-views" aria-label="Permalink to &quot;Materialized views&quot;">​</a></h2><p>Materialized views cache the result set of an expensive query and allow you to refresh data periodically.</p><p>Some of key features are:</p><ol><li>Persistent Storage:</li></ol><ul><li>since data is stored physically on disk, when query the materialized view, db will direct fetch the data from disk, without re-execute the query</li></ul><ol start="2"><li>Manual Refresh:</li></ol><ul><li>A materialized view does not automatically update when the underlying table are updated. Instead, you must manually refresh it using the <strong>refresh materialized view</strong> command</li></ul><ol start="3"><li><p>Read-Only: By default, materialized views are read-only, which means you cannot apply <strong>update</strong> or <strong>insert</strong> However, you can drop and re-create it to refresh.</p></li><li><p>Indexes: You can create indexes on materialized views, further optimizing the performance</p></li></ol><h3 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to &quot;Syntax&quot;">​</a></h3><h4 id="creation-1" tabindex="-1">Creation <a class="header-anchor" href="#creation-1" aria-label="Permalink to &quot;Creation&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DROP</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> MATERIALIZED VIEW </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">IF</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> EXISTS</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> demo_mv;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> MATERIALIZED view demo_mv</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">AS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> authors</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">with</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> no</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> data</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><p>a few things need to be noticed here:</p><ol><li>you can not use <em><strong>create or replace</strong></em> for materialized views</li><li>if you use <strong>with no data</strong> option, then the view is flagged as unreadable, which means you have to first <em><strong>REFRESH MATERIALIZED VIEW</strong></em> before you query it. By default, materialized views are created <strong>with data</strong></li></ol><h4 id="refresh" tabindex="-1">Refresh <a class="header-anchor" href="#refresh" aria-label="Permalink to &quot;Refresh&quot;">​</a></h4><p>To load data into materialized views, you use <em><strong>REFRESH MATERIALIZED VIEW</strong></em> command</p><blockquote><p>refresh MATERIALIZED view demo_mv;</p></blockquote><p>Be careful when you apply this command because it will lock the underlying table during the refresh process, so you cannot query its underlying table while the data is loading into the view.</p><h5 id="concurrently-option-available-pgsql-v9-4-or-later" tabindex="-1">Concurrently option (available pgsql v9.4 or later) <a class="header-anchor" href="#concurrently-option-available-pgsql-v9-4-or-later" aria-label="Permalink to &quot;Concurrently option (available pgsql v9.4 or later)&quot;">​</a></h5><p>the default way or refresh mv is fast, but it required the locking of table, so alternatively, we can apply this command</p><blockquote><p>REFRESH MATERIALIZED VIEW CONCURRENTLY view_name;</p></blockquote><p>to refresh concurrently (so no need to lock the table), but it required the mv has its own unique index.</p><p>Here&#39;s what happened underneath:</p><ol><li>apply the command</li><li>pgsql create a snapshot of the underlying table at that time when command executed</li><li>pgsql create a new, temp version of materialized view that is going to be used</li><li>pgsql used that snapshot to build the new version of mv.</li><li>replace the ond mv with the new mv once updating is done</li></ol><p>P.S.</p><ol><li>once snapshot is created, any changes to the underlying table won&#39;t reflect on the new view</li><li>before new mv is done building, all query to the mv will using old version of mv.</li><li>If a view is created using no data option, then you cannot apply *<strong>REFRESH MATERIALIZED VIEW CONCURRENTLY view_name;</strong> directly on it. You need to run <em><strong>REFRESH MATERIALIZED VIEW view_name;</strong></em> first. Also, you need to create unique index beforehand</li></ol><h4 id="remove" tabindex="-1">Remove <a class="header-anchor" href="#remove" aria-label="Permalink to &quot;Remove&quot;">​</a></h4><blockquote><p>Drop materialzied view view_name;</p></blockquote><h2 id="recursive-view-available-v9-3" tabindex="-1">Recursive view (available v9.3+) <a class="header-anchor" href="#recursive-view-available-v9-3" aria-label="Permalink to &quot;Recursive view (available v9.3+)&quot;">​</a></h2><p>a recursive view is a view whose defining query references the view name itself. e.g.</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">drop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> table</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> EXISTS</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  employee;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> employee</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  employee_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">INT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> PRIMARY KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  first_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">VARCHAR</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  last_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">VARCHAR</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  manager_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">INT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">  FOREIGN KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (manager_id) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">REFERENCES</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee (employee_id) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ON DELETE CASCADE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">INSERT INTO</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee (employee_id, first_name, last_name, manager_id)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">VALUES</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Windy&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Hays&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Ava&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Christensen&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Hassan&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Conner&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Anna&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Reeves&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Sau&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Norman&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Kelsie&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Hays&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Tory&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Goff&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Salley&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;Lester&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">create</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> RECURSIVE</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> view report (employee_id, sub) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">as</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee_id, first_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sub</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> manager_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">is</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> null</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">union all</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">select</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">	e</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">employee_id</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		r</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">sub</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> ||</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;&gt;&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">first_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">last_name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sub</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	employee e</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">inner join</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> report r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">on</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">manager_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> r</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">employee_id</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><h2 id="alter-view" tabindex="-1">Alter view <a class="header-anchor" href="#alter-view" aria-label="Permalink to &quot;Alter view&quot;">​</a></h2><p>Use the ALTER VIEW ... RENAME TO statement to rename a view. Use the ALTER VIEW ... (SET check_option) statement to change the check option of a view. Use the ALTER VIEW ... SET SCHEMA statement to change the schema of a view.</p><h2 id="listing-view" tabindex="-1">listing view <a class="header-anchor" href="#listing-view" aria-label="Permalink to &quot;listing view&quot;">​</a></h2><p>listing all materialized views:</p><blockquote><p>SELECT * FROM pg_matviews;</p></blockquote>`,74);function D(s,v,E,b,B,f){const p=e("Badge"),r=o,k=e("ClientOnly");return l(),c("div",null,[h("h1",m,[n("Views in PGSQL "),t(p,{text:"PostgreSQL",type:"warning"}),n(),w]),t(k,null,{default:g(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(l(),A(r,{key:0,article:s.$frontmatter},null,8,["article"])):u("",!0)]}),_:1}),F])}const T=d(C,[["render",D]]);export{I as __pageData,T as default};
