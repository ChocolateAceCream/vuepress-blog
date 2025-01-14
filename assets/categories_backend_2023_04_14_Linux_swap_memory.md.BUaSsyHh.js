import{_ as r}from"./chunks/ArticleMetadata.DF8KOe0b.js";import{_ as d,m as e,a as c,e as p,x as t,u as n,B as g,ah as F,o as l,p as m,q as y}from"./chunks/framework.BuAcqOzq.js";import"./chunks/theme.QDj8ERkL.js";const N=JSON.parse('{"title":"Linux set swap memory","description":"","frontmatter":{"title":"Linux set swap memory","author":"ChocolateAceCream","date":"2023/04/14 19:00","isTop":false,"categories":["backend"],"tags":["Linux"]},"headers":[],"relativePath":"categories/backend/2023/04/14/Linux_swap_memory.md","filePath":"categories/backend/2023/04/14/Linux_swap_memory.md","lastUpdated":1714762338000}'),u={name:"categories/backend/2023/04/14/Linux_swap_memory.md"},C={id:"linux-set-swap-memory",tabindex:"-1"},w=p("a",{class:"header-anchor",href:"#linux-set-swap-memory","aria-label":'Permalink to "Linux set swap memory <Badge text="Linux" type="warning" />"'},"​",-1),b=F(`<h3 id="reason" tabindex="-1">Reason: <a class="header-anchor" href="#reason" aria-label="Permalink to &quot;Reason:&quot;">​</a></h3><p>usually cloud server only have limited memory that run out easily, one solution is to set swap memory in linux server.</p><ol><li>check if system already has swap</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">free</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -h</span></span></code></pre></div><p>if there&#39;s any swap, remove swap so we can add new one</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> swapoff</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /swapfile</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> rm</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">  /swapfile</span></span></code></pre></div><ol start="2"><li>create new swap</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 4g is the size of swapfile</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> fallocate</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -l</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 4G</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /swapfile</span></span></code></pre></div><ol start="3"><li>assign swap</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 600</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /swapfile</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> mkswap</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /swapfile</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> swapon</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /swapfile</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> swapon</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> --show</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">free</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -h</span></span></code></pre></div><ol start="4"><li>add to start up script, otherwise swap will lost after restart</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;/swapfile none swap sw 0 0&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> tee</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /etc/fstab</span></span></code></pre></div><ol start="5"><li>set swappiness (conditions to trigger swap)</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># enable swap when memory used more than 90%, add to start up script</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;vm.swappiness=10&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /etc/sysctl.conf</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># check if setting works</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sysctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -p</span></span></code></pre></div>`,14);function _(s,v,D,f,x,B){const h=e("Badge"),o=r,k=e("ClientOnly");return l(),c("div",null,[p("h1",C,[t("Linux set swap memory "),n(h,{text:"Linux",type:"warning"}),t(),w]),n(k,null,{default:g(()=>{var a,i;return[(((a=s.$frontmatter)==null?void 0:a.aside)??!0)&&(((i=s.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(l(),m(o,{key:0,article:s.$frontmatter},null,8,["article"])):y("",!0)]}),_:1}),b])}const V=d(u,[["render",_]]);export{N as __pageData,V as default};