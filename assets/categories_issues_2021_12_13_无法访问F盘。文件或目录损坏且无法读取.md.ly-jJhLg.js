import{_ as o}from"./chunks/ArticleMetadata.Sb1DYAHo.js";import{_ as p,D as c,o as e,c as l,I as _,w as d,k as i,a as h,R as m,b as g,e as u}from"./chunks/framework.FVQzxbLi.js";import"./chunks/md5.RtphNWHi.js";const k="/assets/202112132257200.L1G0bgyr.png",f="/assets/202112132257205.p2i2ER30.png",F="/assets/202112132257210.3wmuV8_R.png",b="/assets/202112132257215.wz0_uS5L.png",v="/assets/202112132257220.6vPFeL9c.png",y="/assets/202112132257225.YIvw6ypF.png",C="/assets/202112132257230.Hsr2v59n.png",D="/assets/202112132257235.YLpxcDjZ.png",L=JSON.parse('{"title":"无法访问 F:\\\\。文件或目录损坏且无法读取。","description":"","frontmatter":{"title":"无法访问 F:\\\\。文件或目录损坏且无法读取。","author":"查尔斯","date":"2021/12/13 22:57","categories":["Bug万象集"],"tags":["Windows"]},"headers":[],"relativePath":"categories/issues/2021/12/13/无法访问F盘。文件或目录损坏且无法读取.md","filePath":"categories/issues/2021/12/13/无法访问F盘。文件或目录损坏且无法读取.md","lastUpdated":1663747241000}'),P={name:"categories/issues/2021/12/13/无法访问F盘。文件或目录损坏且无法读取.md"},x=i("h1",{id:"无法访问-f-。文件或目录损坏且无法读取。",tabindex:"-1"},[h("无法访问 F:\\。文件或目录损坏且无法读取。 "),i("a",{class:"header-anchor",href:"#无法访问-f-。文件或目录损坏且无法读取。","aria-label":'Permalink to "无法访问 F:\\。文件或目录损坏且无法读取。"'},"​")],-1),q=m('<h2 id="问题描述" tabindex="-1">问题描述 <a class="header-anchor" href="#问题描述" aria-label="Permalink to &quot;问题描述&quot;">​</a></h2><p>笔者这块西数的移动硬盘最近真的是问题频发，前段时间无法删除损坏的回收站，这两天在家里电脑上插上之后，双击 F 盘提示已损坏，较之以前问题更甚。</p><p>这的确给了笔者一个 “惊喜”，最近两周好像没开 Drive 备份到 NAS 。硬盘要是坏了，这两周的东西还能剩下多少就不好说了。</p><p>不过好在最后问题解决了，跟笔者来一起看看解决方法吧。</p><p><img src="'+k+'" alt="202112132257200"></p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><h3 id="尝试1-尝试检查与修复" tabindex="-1">尝试1：尝试检查与修复 <a class="header-anchor" href="#尝试1-尝试检查与修复" aria-label="Permalink to &quot;尝试1：尝试检查与修复&quot;">​</a></h3><p>首先，在出现问题的磁盘上【右键】单击，然后选择【属性】。</p><p><img src="'+f+'" alt="202112132257205"></p><p>在弹出的【属性】对话框中，选择【工具】选项卡，然后点击【检查】按钮。这个功能是用来检查磁盘文件系统错误的，检查完还会有个错误修复的环节。</p><p><img src="'+F+'" alt="202112132257210"></p><p>可惜的是，不知道是笔者这台电脑登录的账号权限问题，还是系统错误，这项修复手段，笔者用不了。</p><p><img src="'+b+'" alt="202112132257215"></p><h3 id="尝试2-命令行修复" tabindex="-1">尝试2：命令行修复 <a class="header-anchor" href="#尝试2-命令行修复" aria-label="Permalink to &quot;尝试2：命令行修复&quot;">​</a></h3><p>还是老规矩，桌面可视化中的功能只是一种手段，每一项功能都有其对应的系统命令。</p><p>按下【Windows】键，弹出【开始】菜单，直接输入【cmd】来在菜单中搜索。搜索出来后，在【cmd.exe/命令行】上【右键】单击，选择【以管理员身份运行】。</p><p><img src="'+v+`" alt="202112132257220"></p><p>在弹出的 CMD 命令行窗口中，输入以下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这条命令是用来检查磁盘并修复的，中间的 f: 换成你出现上方问题的盘符即可。 </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">chkdsk</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> f:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /f</span></span></code></pre></div><p><img src="`+y+'" alt="202112132257225"></p><p><img src="'+C+'" alt="202112132257230"></p><p>等待检查修复结束，笔者的 F 盘又回来了。</p><p><img src="'+D+'" alt="202112132257235"></p>',23);function w(a,N,V,A,S,T){const r=o,n=c("ClientOnly");return e(),l("div",null,[x,_(n,null,{default:d(()=>{var s,t;return[(((s=a.$frontmatter)==null?void 0:s.aside)??!0)&&(((t=a.$frontmatter)==null?void 0:t.showArticleMetadata)??!0)?(e(),g(r,{key:0,article:a.$frontmatter},null,8,["article"])):u("",!0)]}),_:1}),q])}const R=p(P,[["render",w]]);export{L as __pageData,R as default};
