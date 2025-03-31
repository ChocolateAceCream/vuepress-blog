import{_ as h}from"./chunks/ArticleMetadata.D2A1XW7u.js";import{_ as u,m as o,a as p,e as r,x as i,u as n,B as m,ah as g,o as s,p as f,q as _}from"./chunks/framework.BuAcqOzq.js";import"./chunks/theme.CkVN5qIL.js";const S=JSON.parse('{"title":"Advanced Redis","description":"","frontmatter":{"title":"Advanced Redis","author":"ChocolateAceCream","date":"2025/03/28 19:00","isTop":false,"categories":["backend"],"tags":["Redis"]},"headers":[],"relativePath":"categories/backend/2025/03/28/Advanced_redis.md","filePath":"categories/backend/2025/03/28/Advanced_redis.md","lastUpdated":1743458943000}'),b={name:"categories/backend/2025/03/28/Advanced_redis.md"},k={id:"advanced-redis",tabindex:"-1"},y=r("a",{class:"header-anchor",href:"#advanced-redis","aria-label":'Permalink to "Advanced Redis  <Badge text="Redis" type="warning" />"'},"​",-1),v=g('<p>Normally we just use set/get with redis, but redis has much more functionalities, so in this blog I&#39;d like to talk about some advanced topics of redis.</p><h2 id="hash" tabindex="-1">Hash <a class="header-anchor" href="#hash" aria-label="Permalink to &quot;Hash&quot;">​</a></h2><p>Create a hash for given key, like maps in go HSET key field value HGETALL HMGET key field1 field2 ... HGET key field</p><h2 id="bitset-bit-array" tabindex="-1">bitset (bit array) <a class="header-anchor" href="#bitset-bit-array" aria-label="Permalink to &quot;bitset (bit array)&quot;">​</a></h2><p>kind of a bitmap, so given an field, store value either 1 or 0 to mark the status SETBIT key offset value GETBIT key offset BITCOUNT key [start end]: counts set bits with 1</p><p>since 1byte = 8 bits, so 10M users with 500 permission (status) will take 10M * 500 / 8 = 630MB</p><h2 id="consistent-hashing" tabindex="-1">consistent hashing <a class="header-anchor" href="#consistent-hashing" aria-label="Permalink to &quot;consistent hashing&quot;">​</a></h2><p>In traditional hashing (e,g, hash(key) % n), when adding a new node (n+1), all cache need to be recalculated then re-distribute. That cause a lot of troubles like traffic spikes or data migration slow etc... Consistent hashing is introduced to solve this kind of problems.</p><p>We all know hash value is between 0 ~ 2^32-1, image connect tail and head of hash sets to form a circle, then you add node evenly on that circle. Now if a new element is coming in, hash it to the circle, and find the next node clock-wise, that&#39;s the node you want to put your data into.</p><p>A--&gt;B--&gt;C--&gt;D--&gt;A</p><p>If you want to add a new node, F, between C and D, like this</p><p>A--&gt;B--&gt;C--&gt;&#39;F&#39;--&gt;D--&gt;A</p><p>Now you only need to migrate data between C and D, but traditional hashing require you to re-arrange data among all nodes. Same story for deleting, only 2 Node will be affected.</p><h4 id="one-more-optimization-virtual-nodes" tabindex="-1">One more optimization -&gt; Virtual Nodes <a class="header-anchor" href="#one-more-optimization-virtual-nodes" aria-label="Permalink to &quot;One more optimization -&gt; Virtual Nodes&quot;">​</a></h4><p>Sometimes if you not evenly distributed your nodes along the circle, it will cause one node super busy and one node has nothing to work with. One approach to solve this is to use virtual nodes, so multiple virtual nodes can be mapped to a single physical server.</p>',15);function w(e,A,T,C,B,N){const d=o("Badge"),l=h,c=o("ClientOnly");return s(),p("div",null,[r("h1",k,[i("Advanced Redis "),n(d,{text:"Redis",type:"warning"}),i(),y]),n(c,null,{default:m(()=>{var t,a;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((a=e.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(s(),f(l,{key:0,article:e.$frontmatter},null,8,["article"])):_("",!0)]}),_:1}),v])}const V=u(b,[["render",w]]);export{S as __pageData,V as default};
