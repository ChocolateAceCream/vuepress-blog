import{_ as o}from"./chunks/ArticleMetadata.DwFanBbw.js";import{_ as l,D as n,o as e,c as h,I as c,w as d,k as i,a as m,R as u,b as g,e as k}from"./chunks/framework.wushOZ5h.js";import"./chunks/md5.l01k3oYT.js";const b=""+new URL("202010081752199.zPf680oL.gif",import.meta.url).href,_=""+new URL("202010081752326.tlcKwZ97.jpeg",import.meta.url).href,f=""+new URL("202010081752612.fQkpDPhd.png",import.meta.url).href,q=""+new URL("202010081752667.FOQ9SHMr.png",import.meta.url).href,A=""+new URL("202010081752687.ObyIO-y7.jpeg",import.meta.url).href,B=""+new URL("202010081755202.YX3IP38P.png",import.meta.url).href,y=""+new URL("202010081755352.04cHZr58.gif",import.meta.url).href,C=""+new URL("202010081755573.stO57kdK.gif",import.meta.url).href,D=""+new URL("202010081755606.G_AMV9Hj.png",import.meta.url).href,E=""+new URL("202010081755712.9sVG7UmW.gif",import.meta.url).href,v=""+new URL("202010081755798.XHWR2fXJ.gif",import.meta.url).href,w=""+new URL("202010081756376.IODCGMzQ.gif",import.meta.url).href,F=""+new URL("202010081756666.wdZft5UK.gif",import.meta.url).href,P=""+new URL("202010081756767.IdUGFzBY.jpeg",import.meta.url).href,N=JSON.parse('{"title":"程序调试入门","description":"","frontmatter":{"title":"程序调试入门","author":"查尔斯","date":"2020/10/08 19:07","categories":["Java基础快速入门"],"tags":["Java","Java基础"]},"headers":[],"relativePath":"courses/java/01-Java语法入门/12-程序调试入门.md","filePath":"courses/java/01-Java语法入门/12-程序调试入门.md","lastUpdated":1661438394000}'),U={name:"courses/java/01-Java语法入门/12-程序调试入门.md"},x=i("h1",{id:"程序调试入门",tabindex:"-1"},[m("程序调试入门 "),i("a",{class:"header-anchor",href:"#程序调试入门","aria-label":'Permalink to "程序调试入门"'},"​")],-1),L=u('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><strong>C：</strong> 学习到本篇的各位同学，想必对编写期、运行期的报红，报错早已见怪不怪了。</p><p><img src="'+b+'" alt="202010081752199"></p><p>出了问题后，面向百度编程，解决了一部分，还有很多隐藏在 &quot;冰山&quot; 之下，所以在工作中，大家都自嘲是在写 Bug。</p><p><img src="'+_+'" alt="202010081752326"></p><p>正因如此，<em>一个有经验的程序员不仅仅要熟练各种技术，还应该表现出成熟且稳定的 Bug 解决能力</em> 。笔者在本篇将会带你熟悉下常见的 Bug 解决思路及方式， <strong>掌握了这些技巧</strong> ，在大多数情况下你会轻松一些的。</p><h2 id="bug和debug" tabindex="-1">bug和debug <a class="header-anchor" href="#bug和debug" aria-label="Permalink to &quot;bug和debug&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">bug （计算机领域漏洞）</p><p>bug 是计算机领域专业术语，原意是 &quot;臭虫&quot;，现在用来指代计算机上存在的漏洞，原因是系统安全策略上存在的缺陷，有攻击者能够在未授权的情况下访问的危害。</p><p>bug 这个术语从 &quot;臭虫&quot; 转换为漏洞，还有一段 &quot;可歌可泣&quot; 的故事 ：为马克2号（Harvard Mark II）编制程序的格蕾丝·霍珀（Grace Hopper）是一位美国海军准将及计算机科学家，同时也是世界最早的一批程序设计师之一。有一天，她在调试设备时出现故障，拆开继电器后，发现有只飞蛾被夹扁在触点中间，从而“卡”住了机器的运行。于是，霍珀诙谐地把程序故障统称为“臭虫（BUG）”，把排除程序故障叫 DEBUG，而这奇怪的“称呼”，竟成为后来计算机领域的专业行话。[1]</p></div><p><img src="'+f+'" alt="202010081752612"></p><p><img src="'+q+'" alt="202010081752667"></p><p>另外以后快别外行似的喊 <code>必忧计</code> 了，人家叫 <code>bug</code> 。</p><details class="details custom-block"><summary>行业内还有这么一个冷笑话是：程序员最讨厌乾隆的哪个儿子？</summary><p>八阿哥（bug）</p></details><h2 id="调试思路" tabindex="-1">调试思路 <a class="header-anchor" href="#调试思路" aria-label="Permalink to &quot;调试思路&quot;">​</a></h2><p>日常生活中，家用电路出现问题时，打了维修电话叫电工过来，电工首先会和我们沟通下大致情况，看看问题大致的方向和可能，然后再使用万用表及其他专业检测工具对电路逐段进行检测，最后再找到异常情况的部分，进行相应维修或部件更换。</p><p>我们在进行程序调试（debug）时也应该遵循类似的思路进行：</p><ol><li>理清需求， <strong>观察故障提示、现象</strong> ，看是否能确定问题大致方向和可能</li><li>阅读代码</li><li>逐条语句执行程序</li><li>观察程序执行情况</li><li>发现问题</li><li>解决问题</li></ol><h2 id="调试方式" tabindex="-1">调试方式 <a class="header-anchor" href="#调试方式" aria-label="Permalink to &quot;调试方式&quot;">​</a></h2><p>调试思路掌握之后，还有一些配套的调试方式可以帮助我们快速定位及修复 bug。</p><h3 id="小黄鸭调试法" tabindex="-1">小黄鸭调试法 <a class="header-anchor" href="#小黄鸭调试法" aria-label="Permalink to &quot;小黄鸭调试法&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">小黄鸭调试法</p><p>小黄鸭调试法（又称橡皮鸭调试法，黄鸭除虫法）是软件工程中使用的调试代码方法之一。</p><p>此概念是参照于一个来自《程序员修炼之道》书中的一个故事。传说中程序大师随身携带一只小黄鸭，在调试代码的时候会在桌上放上这只小黄鸭，然后详细地向鸭子解释每行代码[2]</p><p>许多程序员都有过向别人（甚至可能向完全不会编程的人）提问及解释编程问题，就在解释的过程中击中了问题的解决方案。一边阐述代码的意图一边观察它实际上的意图并做调试，这两者之间的任何不协调会变得很明显，并且更容易发现自己的错误。如果没有玩具小鸭子也可以考虑向其它东西倾诉，比如桌上的花花草草，键盘鼠标。</p><p>类似的，有一种现象叫做 cone of answers，这是一个常见的现象。 <strong>你的朋友跑来问你一个问题，但是当他自己把问题说完，或者说到一半的时候就想出了答案走了，留下一脸茫然的你。是的，这个时候你就起到了那只小黄鸭的作用</strong> 。</p><p>相似的概念还有不少，例如自白调试、纸板程序员或程序员的假人、想出脑外等等。总的来说，在你试图表述自己的想法的过程中，自然地在促使自己去整理思路，重新考虑问题。[3]</p></div><p>小黄鸭调试法是一种非常经典的代码阅读技巧。一边读代码，一边给自己或其他的媒介来解释对应代码的含义。有些简单的问题，就这么被发现了。</p><p><img src="'+A+`" alt="202010081752687"></p><h3 id="输出语句" tabindex="-1">输出语句 <a class="header-anchor" href="#输出语句" aria-label="Permalink to &quot;输出语句&quot;">​</a></h3><p>单纯通过代码阅读，如果是单词类错误（单词错误是前期学习过程中，出现频次最高的）。以我们程序员这么 &quot;护犊子&quot; 的情况，有时候看多少遍都看不出来。<em>&quot;我的代码和他的一样，我的代码没错啊？怎么就是不行？&quot;</em></p><p>这种情况下，就需要我们在程序执行的过程中，找寻一些关键的地方增加输出语句，然后执行看输出效果。如果输出语句和预期效果不对，甚至干脆没有执行，那问题很大可能就出在这里了。</p><h3 id="专业调试工具-重要" tabindex="-1">专业调试工具[重要] <a class="header-anchor" href="#专业调试工具-重要" aria-label="Permalink to &quot;专业调试工具[重要]&quot;">​</a></h3><p>通过阅读代码、加输出语句来查找程序错误，前期固然可行。但是当程序结构越来越复杂时，或者花费了大量时间依然没有能够发现及解决问题时，还需要配合专业的 debug 工具来调试。</p><p>在 JDK 中内置了 <code>jdb</code> 可以用来在命令行调试程序，但是我们现在在用 Eclipse 这种 IDE ，人家也携带了相应的调试程序。命令行和可视化界面这种选择，毫无疑问要选择后者。</p><h2 id="eclipse调试" tabindex="-1">Eclipse调试 <a class="header-anchor" href="#eclipse调试" aria-label="Permalink to &quot;Eclipse调试&quot;">​</a></h2><p>接下来我们通过一个案例来演示一下具体 Eclipse 中调试工具的使用步骤。</p><h3 id="问题描述" tabindex="-1">问题描述 <a class="header-anchor" href="#问题描述" aria-label="Permalink to &quot;问题描述&quot;">​</a></h3><p><strong>案例需求：输出 1 ~ 5 这5个数字。</strong></p><p><strong>代码实现：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;程序调试演示，注意观察 i 的值：&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">while</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(i);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><strong>存在问题：</strong> 只能输出到4，无法输出5这个数</p><p><img src="`+B+'" alt="202010081755202"></p><h3 id="使用步骤" tabindex="-1">使用步骤 <a class="header-anchor" href="#使用步骤" aria-label="Permalink to &quot;使用步骤&quot;">​</a></h3><p>程序运行嗖嗖的，我们根本无法逐行的观察具体真实的执行过程，Eclipse 的程序调试（debug）又被称为断点调试。所谓断点，就是你希望运行中的程序在哪一行停下来，让你可以逐行进行分析。</p><p><strong>第一步：看故障现象，分析错误，设置断点。</strong></p><p>在你想监测程序运行的开始代码行左侧栏，双击鼠标左键将出现一个断点标志，再双击可以取消断点。</p><p><img src="'+y+'" alt="202010081755352"></p><p><strong>第二步：启动调试。</strong></p><p>这时候，我们不再以 <code>run as</code> 运行了，而是右键以 <code>debug as</code> 运行。</p><p>启动时，Eclipse 会弹出一个对话框提示你是否要切换到 debug 模式视图，我们点击 switch 切换过去，debug as 运行后，它会按照正常的执行顺序进行代码执行，直到遇到断点行才停下来。此时这一行代码处于 <strong>等待执行</strong> ，还未执行的状态。</p><p><img src="'+C+'" alt="202010081755573"></p><p>debug 视图的界面布局如下：</p><p><img src="'+D+'" alt="202010081755606"></p><p><strong>第三步：单步运行。</strong></p><p>连续点击 F6 键可以单步运行程序，即逐行执行程序，这时候我们就可以来观察程序运行过程了。</p><p><img src="'+E+'" alt="202010081755712"></p><p><strong>第四步：观察变量变化。</strong></p><p>在逐行运行过程中，可以观察右侧变量表来查看变量的变化情况，鼠标直接放在变量名上，也可以直接查看它的当前值。</p><p>选中表达式还可以查看表达式的计算结果。</p><p><img src="'+v+'" alt="202010081755798"></p><p><strong>其他调试按钮的使用：</strong></p><p>我们可以按下 F8 ，按下它，会向下快速执行代码行到下个断点才会停住。这样我们就可以只观察想要看到的代码行效果了。</p><div class="tip custom-block"><p class="custom-block-title">笔者说</p><p>在运行过程中，随时可以添加断点或取消断点，非常灵活。</p></div><p>我们也可以按下 Ctrl + F2 随时结束当前的调试。</p><p><img src="'+w+'" alt="202010081756376"></p><p>好了，我们最后完整调试一下吧，调试到最后环节时，很容易就发现 <code>i</code> 的值到了5的时候，就无法进入循环了，问题就出在这，改动条件表达式为 <code>i &lt;= 5</code> 就没事了。</p><p>调试完之后，你可以在右侧 断点表 快速清除所有的断点，然后再点击右上角的 Java 视图标志切换回之前的开发模式。</p><p><img src="'+F+'" alt="202010081756666"></p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><p>[1]百度百科. bug （计算机领域漏洞）[EB/OL]. <a href="https://baike.baidu.com/item/bug/3353935" target="_blank" rel="noreferrer">https://baike.baidu.com/item/bug/3353935</a>. 2020-1-13</p><p>[2]百度学术. The Pragmatic programmer:From journeyman to master[EB/OL]. <a href="https://xueshu.baidu.com/usercenter/paper/show?paperid=1971af4403d863660114ff571f6757a5&amp;site=xueshu_se" target="_blank" rel="noreferrer">https://xueshu.baidu.com/usercenter/paper/show?paperid=1971af4403d863660114ff571f6757a5&amp;site=xueshu_se</a>. 2021-1-13</p><p>[3]百度百科. 小黄鸭调试法[EB/OL]. <a href="https://baike.baidu.com/item/%E5%B0%8F%E9%BB%84%E9%B8%AD%E8%B0%83%E8%AF%95%E6%B3%95/16569594" target="_blank" rel="noreferrer">https://baike.baidu.com/item/小黄鸭调试法/16569594</a>. 2021-1-13</p><h2 id="后记" tabindex="-1">后记 <a class="header-anchor" href="#后记" aria-label="Permalink to &quot;后记&quot;">​</a></h2><p>在本篇中，笔者试着添加了一些动态 gif 图来更好的展现一些操作步骤，希望它们对你有帮助，也希望你能看懂这无声的“对白”。</p><p>本篇也是笔者语言入门系列的第一个程序调试使用，只是入门操作而已，后续随着系列的延续，再补充更多的使用技巧以及其他调试按钮的功能。</p><p>希望你从现在开始好好用用每个 IDE 的程序调试工具，绝对比你遇到问题或思路不畅时，只靠眼睛瞪代码有效。</p><p><img src="'+P+'" alt="202010081756767"></p><div class="info custom-block"><p class="custom-block-title">笔者说</p><p>对于技术的学习，笔者一贯遵循的步骤是：先用最最简单的 demo 让它跑起来，然后学学它的最最常用 API 和 配置让自己能用起来，最后熟练使用的基础上，在空闲时尝试阅读它的源码让自己能够洞彻它的运行机制，部分问题出现的原因，同时借鉴这些技术实现来提升自己的代码高度。</p><p>所以在笔者的文章中，前期基本都是小白文，仅仅穿插很少量的源码研究。当然等小白文更新多了，你们还依然喜欢，后期会不定时专门对部分技术的源码进行解析。</p></div>',72);function R(a,I,j,O,J,V){const p=o,r=n("ClientOnly");return e(),h("div",null,[x,c(r,null,{default:d(()=>{var t,s;return[(((t=a.$frontmatter)==null?void 0:t.aside)??!0)&&(((s=a.$frontmatter)==null?void 0:s.showArticleMetadata)??!0)?(e(),g(p,{key:0,article:a.$frontmatter},null,8,["article"])):k("",!0)]}),_:1}),L])}const $=l(U,[["render",R]]);export{N as __pageData,$ as default};
