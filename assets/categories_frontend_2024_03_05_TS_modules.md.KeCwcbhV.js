import{_ as c}from"./chunks/ArticleMetadata._MCKScPp.js";import{_ as h,D as i,o as a,c as u,k as l,a as o,I as n,w as m,R as k,b as g,e as f}from"./chunks/framework.ayLJxpji.js";import"./chunks/md5.fuFebm6b.js";const q=JSON.parse('{"title":"TS Module","description":"","frontmatter":{"title":"TS Module","author":"ChocolateAceCream","date":"2024/03/05 19:00","isTop":false,"categories":["frontend"],"tags":["TypeScript"]},"headers":[],"relativePath":"categories/frontend/2024/03/05/TS_modules.md","filePath":"categories/frontend/2024/03/05/TS_modules.md","lastUpdated":1714619516000}'),y={name:"categories/frontend/2024/03/05/TS_modules.md"},S={id:"module-in-typescript",tabindex:"-1"},_=l("a",{class:"header-anchor",href:"#module-in-typescript","aria-label":'Permalink to "Module in TypeScript <Badge text="TypeScript" type="warning" />"'},"​",-1),b=k('<p>Here are some basic concepts about module systems in JavaScript and how TypeScript handles them:</p><ul><li><strong>ESModule</strong>: Primarily for running in browsers.</li><li><strong>CommonJS</strong>: Used mainly in backend Node.js environments.</li><li><strong>Node 16+ Support for ESModule</strong>: Starting with Node version 16, ESModule is supported. Prior to version 16, only CommonJS was supported.</li><li><strong>Purpose of TypeScript Compiler</strong>: The TypeScript compiler aims to detect errors before the code is executed at runtime. It requires information about the runtime environment where the compiled code will run.</li><li><strong>File Extensions in TypeScript</strong>: <ul><li><code>.mts</code> and <code>.cts</code> files let the TypeScript compiler know the compiled code should be in <code>.mjs</code> (ES Module) and <code>.cjs</code> (CommonJS) formats, respectively.</li><li>For <code>.js</code> files, the TypeScript compiler will look up the module setting in <code>package.json</code>. If <code>&quot;type&quot;: &quot;module&quot;</code> is found, it outputs <code>.mjs</code>; otherwise, it defaults to <code>.cjs</code>.</li></ul></li></ul><h3 id="es-module-details" tabindex="-1">ES Module Details: <a class="header-anchor" href="#es-module-details" aria-label="Permalink to &quot;ES Module Details:&quot;">​</a></h3><h4 id="es2015" tabindex="-1">ES2015: <a class="header-anchor" href="#es2015" aria-label="Permalink to &quot;ES2015:&quot;">​</a></h4><ul><li>Introduced <code>import</code> and <code>export</code> syntax to the language.</li></ul><h4 id="es2020" tabindex="-1">ES2020: <a class="header-anchor" href="#es2020" aria-label="Permalink to &quot;ES2020:&quot;">​</a></h4><ul><li><p>Adds features like <code>import.meta</code> and <code>export * as ns from &quot;mod&quot;</code> to the previous standards.</p></li><li><p>Example:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">import</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> utils </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;./utils&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// You can export all functions in a namespaced module called utils, then use them like `utils.func1()`, `utils.func2()`.</span></span></code></pre></div></li><li><p>Supports export default for exporting a single default function or variable from a module.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> func1</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">() </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{}</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// This can be imported and aliased as desired:</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> defaultFunc </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;utils&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// `defaultFunc` refers to `func1`.</span></span></code></pre></div><p>Note: import * will ignore the default export in the target file.</p></li></ul><h4 id="es2022" tabindex="-1">ES2022: <a class="header-anchor" href="#es2022" aria-label="Permalink to &quot;ES2022:&quot;">​</a></h4><p>Adds support for top-level await to ES2020, allowing await to be used outside of async functions.</p>',9);function A(e,C,T,D,v,E){const r=i("Badge"),d=c,p=i("ClientOnly");return a(),u("div",null,[l("h1",S,[o("Module in TypeScript "),n(r,{text:"TypeScript",type:"warning"}),o(),_]),n(p,null,{default:m(()=>{var s,t;return[(((s=e.$frontmatter)==null?void 0:s.aside)??!0)&&(((t=e.$frontmatter)==null?void 0:t.showArticleMetadata)??!0)?(a(),g(d,{key:0,article:e.$frontmatter},null,8,["article"])):f("",!0)]}),_:1}),b])}const B=h(y,[["render",A]]);export{q as __pageData,B as default};
