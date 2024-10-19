import{_ as y}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as A,m as h,a as C,e as c,x as p,u as t,B as r,ah as d,o as n,p as k,q as o}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const w=JSON.parse('{"title":"panic & recovery","description":"","frontmatter":{"title":"panic & recovery","author":"ChocolateAceCream","date":"2024/10/09 19:00","isTop":false,"categories":["backend"],"tags":["Go"]},"headers":[],"relativePath":"categories/backend/2024/10/09/panic.md","filePath":"categories/backend/2024/10/09/panic.md","lastUpdated":1729378533000}'),u={name:"categories/backend/2024/10/09/panic.md"},D={id:"panic",tabindex:"-1"},f=c("a",{class:"header-anchor",href:"#panic","aria-label":'Permalink to "panic <Badge text="Go" type="warning" />"'},"​",-1),B=d(`<p>panic halts the normal flow of the program (current function&#39;s execution), then looking for recovery from deferred function stack (as defer stack is LIFO order), starts from current scope (current function). If no recovery function found, then panic will propagated to the higher scope, keep looking for recovery function from its defer stack. However, if recovery function found, then panic got recovery and higher scope won&#39;t be affected.</p><h2 id="key-points" tabindex="-1">Key Points: <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points:&quot;">​</a></h2><ul><li>Propagation halts the execution of the current function and moves up the call stack.</li><li>If no recover() is present in the scope, the panic will propagate until it terminates the program.</li><li>once the recover() function is called, only the remaining deferred functions are executed, and the regular code in the function does not resume.</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	defer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> func</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> recover</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(); r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;Recovered from first panic:&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, r)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	defer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> func</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> recover</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(); r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;Recovered from second panic:&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, r)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">			panic</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;second panic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;Triggering first panic...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">	panic</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;First panic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h1 id="os-exit-1" tabindex="-1">os.Exit(1) <a class="header-anchor" href="#os-exit-1" aria-label="Permalink to &quot;os.Exit(1)&quot;">​</a></h1>`,5),m=d(`<p>os.Exit() immediately terminates the program, exiting with a specific exit code. It does not run deferred functions and it stops the program abruptly</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">os.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">Exit</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// Program exits successfully.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">os.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">Exit</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// Program exits with an error (common exit code for errors).</span></span></code></pre></div>`,2);function F(s,_,E,v,b,x){const g=h("Badge"),e=y,l=h("ClientOnly");return n(),C("div",null,[c("h1",D,[p("panic "),t(g,{text:"Go",type:"warning"}),p(),f]),t(l,null,{default:r(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),k(e,{key:0,article:s.$frontmatter},null,8,["article"])):o("",!0)]}),_:1}),B,t(l,null,{default:r(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),k(e,{key:0,article:s.$frontmatter},null,8,["article"])):o("",!0)]}),_:1}),m])}const $=A(u,[["render",F]]);export{w as __pageData,$ as default};
