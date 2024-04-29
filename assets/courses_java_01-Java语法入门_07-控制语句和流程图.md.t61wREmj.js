import{_ as d}from"./chunks/ArticleMetadata.Sb1DYAHo.js";import{_,D as s,o as n,c as E,I as t,w as m,k as a,a as e,R as c,b as A,e as u}from"./chunks/framework.FVQzxbLi.js";import"./chunks/md5.RtphNWHi.js";const B="/assets/202010071016008.h3Rwe4v4.png",f="/assets/202010071027166.kHq50jpG.png",b="/assets/202010071032777.f4IyJkIZ.png",g="/assets/202010071032888.LYtsHncj.png",D="/assets/202010061032999.-gjFxgum.png",L=JSON.parse('{"title":"控制语句和流程图","description":"","frontmatter":{"title":"控制语句和流程图","author":"查尔斯","date":"2020/10/07 11:15","categories":["Java基础快速入门"],"tags":["Java","Java基础"]},"headers":[],"relativePath":"courses/java/01-Java语法入门/07-控制语句和流程图.md","filePath":"courses/java/01-Java语法入门/07-控制语句和流程图.md","lastUpdated":1663999704000}'),q={name:"courses/java/01-Java语法入门/07-控制语句和流程图.md"},C=a("h1",{id:"控制语句和流程图",tabindex:"-1"},[e("控制语句和流程图 "),a("a",{class:"header-anchor",href:"#控制语句和流程图","aria-label":'Permalink to "控制语句和流程图"'},"​")],-1),k=c('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><strong>C：</strong> 现实生活中，我们每天都要面对各种选择，有句俗话叫&quot; <strong>选择比努力更重要</strong> &quot;，不同选择所对应的结果千差万别。在程序中编写的代码也是如此，我们上篇学到的关系运算符、逻辑运算符就可以让程序执行不同的选择。</p><p>而且对于初级的应用开发者（码农），未来每天的工作就是用本篇的选择结构写业务逻辑，所以它们学起来也不难，因为经常要使用啊！</p><p>在介绍 Java 中的选择结构语法前，笔者先带你在本篇介绍一下程序中常见的流程控制语句。</p><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>在前几篇的学习中，我们也写了几行代码，而且也明白编写的代码是自上而下依次执行下来的，编写几行，就会自上而下执行几行。这种&quot;一根筋&quot;的代码被称为 <strong>顺序控制语句</strong> 。</p><p><img src="'+B+'" alt="202010071016008"></p><h2 id="顺序控制语句" tabindex="-1">顺序控制语句 <a class="header-anchor" href="#顺序控制语句" aria-label="Permalink to &quot;顺序控制语句&quot;">​</a></h2><p><strong>顺序控制语句</strong> 是程序中最简单的流程控制，按照代码执行的先后顺序，依次执行，程序中的大多数代码都是这样执行的。[1]</p>',9),w=a("h2",{id:"选择控制语句",tabindex:"-1"},[e("选择控制语句 "),a("a",{class:"header-anchor",href:"#选择控制语句","aria-label":'Permalink to "选择控制语句"'},"​")],-1),P=a("p",null,[e("本篇我们要学习的选择结构就属于 "),a("strong",null,"选择控制语句"),e(" 。 "),a("strong",null,"选择控制语句"),e(" 也被称为分支结构语句，选择结构有特定的语法规则，代码要执行具体的逻辑运算进行判断，逻辑运算的结果有两个或多个（真或假），所以产生了选择，根据不同的选择就会执行不同的代码。[1]")],-1),v=a("h2",{id:"循环控制语句",tabindex:"-1"},[e("循环控制语句 "),a("a",{class:"header-anchor",href:"#循环控制语句","aria-label":'Permalink to "循环控制语句"'},"​")],-1),F=a("p",null,"循环控制语句可以在满足循环条件的情况下，反复执行某一段代码，这段被重复执行的代码被称为循环体语句（循环操作）。当反复执行这个循环体时，需要在合适的时候把循环判断条件修改为 false ，从而结束循环，否则循环将一直执行下去，形成死循环。[1]",-1),x=c('<h2 id="流程图" tabindex="-1">流程图 <a class="header-anchor" href="#流程图" aria-label="Permalink to &quot;流程图&quot;">​</a></h2><h3 id="概述-1" tabindex="-1">概述 <a class="header-anchor" href="#概述-1" aria-label="Permalink to &quot;概述&quot;">​</a></h3><p>你看上方的控制语句，笔者每个都配有一个简单图示，这种图示叫流程图。以后的程序逻辑越来越复杂，我们就可以通过流程图，用图示的方式，来反映出特定主体为了满足特定需求而进行的，有特定逻辑关系的一系列操作过程（程序步骤）。</p><div class="tip custom-block"><p class="custom-block-title">什么是流程图？</p><p>流程图是对过程、算法、流程的一种图像表示，在技术设计、交流及商业简报等领域有广泛的应用。通常用一些图框来表示各种类型的操作，在框内写出各个步骤，然后用带箭头的线把它们连接起来，以表示执行的先后顺序。用图形表示算法，直观形象，易于理解。有时候也被称之为输入-输出图。顾名思义，就是用来直观地描述一个工作过程的具体步骤。这种过程既可以是生产线上的工艺流程，也可以是完成一项任务所必需的管理过程。</p><p>一张简明的流程图，不仅能促进产品经理与设计师、开发者的交流，还能帮助我们查漏补缺，避免功能流程、逻辑上出现遗漏，确保流程的完整性。流程图能让思路更清晰、逻辑更清楚，有助于程序的逻辑实现和有效解决实际问题。</p><p>通常，对于任何希望创建流程的人来说，无论创建的是什么用的流程，流程图都是很有用的。它可以帮你：</p><ol><li>设计你产品的交互流程</li><li>确保的你的产品在任何时候都是友好的（甚至包括你原来根本未曾考虑过的故障发生时）</li><li>帮助你整合零散的线框图</li><li>帮助你与不同背景的同事进行沟通：比如引导工程师开发[2]</li></ol></div><h3 id="图示" tabindex="-1">图示 <a class="header-anchor" href="#图示" aria-label="Permalink to &quot;图示&quot;">​</a></h3><p>为便于识别，绘制流程图的习惯做法是：</p><ul><li>圆角矩形：表示开始与结束</li><li>矩形：表示操作步骤、用于普通工作环节</li><li>菱形：表示问题判断（审核/审批/评审）环节</li><li>平行四边形：表示输入和输出</li><li>箭头：代表工作流方向</li></ul><p><img src="'+f+'" alt="202010071027166"></p><p><img src="'+b+'" alt="202010071032777"></p><p>流程图中有这么多符号，想要更好更快的绘制，我们可以使用一些流程图绘制工具！例如微软的 <code>visio</code> 或是直接使用在线流程图绘制网站：<a href="https://www.processon.com/" target="_blank" rel="noreferrer">Process On</a>（使用挺顺手，就是容量小，免费用户只能创建9张图，想新建更多，要么充钱要么导出图后删除一些无用的，记得删除后再进入回收站内删除，否则也会占用容量）、还有 <a href="https://www.edrawsoft.cn/" target="_blank" rel="noreferrer">亿图</a> 也可以使用。</p><p><img src="'+g+'" alt="202010071032888"></p><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><p>例如：公司报销的流程，特定主体是员工，特定需求是报销，特定逻辑关系是员工报销过程中的一系列操作。下方是某办公自动化系统的报销业务流程设计图。</p><p><img src="'+D+'" alt="202010061032999"></p><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ol><li>绘制流程图时，为了提高流程图的逻辑性，应遵循从左到右、从上到下的顺序排列，而且可以在每个元素上用阿拉伯数字进行标注。</li><li>从开始符开始，以结束符结束。开始符号只能出现一次，而结束符号可出现多次。若流程足够清晰，可省略开始、结束符号。</li><li>当各项步骤有选择或决策结果时，需要认真检查，避免出现漏洞，导致流程无法形成闭环。</li><li>处理符号应为单一入口、单一出口。</li><li>连接线不要交叉。</li><li>如果两个同一路径的下的指示箭头应只有一个。</li><li>相同流程图符号大小需要保持一致。</li><li>处理为并行关系，可以放在同一高度。</li><li>必要时应采用标注，以此来清晰地说明流程。</li><li>流程图中，如果有参考其他已经定义的流程，不需重复绘制，直接用已定义流程符号即可。</li></ol><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><p>[1]文泷Vincent. 流程控制语句—顺序、选择、循环[EB/OL]. <a href="https://blog.csdn.net/qq_34236718/article/details/80596376" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_34236718/article/details/80596376</a>. 2018-06-06</p><p>[2]edraw 亿图. 什么是流程图？看完你就明白了！[EB/OL]. <a href="https://www.edrawsoft.cn/what-is-flowchart/" target="_blank" rel="noreferrer">https://www.edrawsoft.cn/what-is-flowchart/</a>. 2021-01-08</p><h2 id="后记" tabindex="-1">后记 <a class="header-anchor" href="#后记" aria-label="Permalink to &quot;后记&quot;">​</a></h2><p>我们即将进入选择结构的学习，意味着我们要开始编写稍微灵活的程序，这时候大家要注意自己的逻辑思维训练。如果无法在脑海中构建一个比较好的空间思维图，那就老实的画画流程图，然后再写程序，绝对是有用的！！！</p><div class="info custom-block"><p class="custom-block-title">笔者说</p><p>对于技术的学习，笔者一贯遵循的步骤是：先用最最简单的 demo 让它跑起来，然后学学它的最最常用 API 和 配置让自己能用起来，最后熟练使用的基础上，在空闲时尝试阅读它的源码让自己能够洞彻它的运行机制，部分问题出现的原因，同时借鉴这些技术实现来提升自己的代码高度。</p><p>所以在笔者的文章中，前期基本都是小白文，仅仅穿插很少量的源码研究。当然等小白文更新多了，你们还依然喜欢，后期会不定时专门对部分技术的源码进行解析。</p></div>',22);function T(r,V,J,I,N,S){const h=d,p=s("ClientOnly"),o=s("Mermaid");return n(),E("div",null,[C,t(p,null,{default:m(()=>{var l,i;return[(((l=r.$frontmatter)==null?void 0:l.aside)??!0)&&(((i=r.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(n(),A(h,{key:0,article:r.$frontmatter},null,8,["article"])):u("",!0)]}),_:1}),k,t(o,{id:"mermaid_382ee186",graph:"flowchart%20LR%0A%20%20%20%20A(%5B%E5%BC%80%E5%A7%8B%5D)%20--%3E%20B%5B%E8%AF%AD%E5%8F%A51%5D%0A%20%20%20%20B%20--%3E%20C%5B%E8%AF%AD%E5%8F%A52%5D%0A%20%20%20%20C%20--%3E%20D%5B%E8%AF%AD%E5%8F%A53%5D%0A%20%20%20%20D%20--%3E%20E(%5B%E7%BB%93%E6%9D%9F%5D)"}),w,P,t(o,{id:"mermaid_382ee1a4",graph:"flowchart%20LR%0A%20%20%20%20A(%5B%E5%BC%80%E5%A7%8B%5D)%20--%3E%20B%7B%E6%9D%A1%E4%BB%B6%E8%A1%A8%E8%BE%BE%E5%BC%8F%7D%0A%20%20%20%20B%20--%3E%7C%E6%98%AF%7C%20C%5B%E8%AF%AD%E5%8F%A5%5D%0A%20%20%20%20C%20--%3E%20D%0A%20%20%20%20B%20--%3E%7C%E5%90%A6%7C%20D(%5B%E7%BB%93%E6%9D%9F%5D)"}),v,F,t(o,{id:"mermaid_382ee1c2",graph:"flowchart%20LR%0A%20%20%20%20A(%5B%E5%BC%80%E5%A7%8B%5D)%20--%3E%20B%7B%E5%BE%AA%E7%8E%AF%E6%9D%A1%E4%BB%B6%7D%0A%20%20%20%20B%20--%3E%7C%E6%98%AF%7C%20C%5B%E5%BE%AA%E7%8E%AF%E6%93%8D%E4%BD%9C%5D%0A%20%20%20%20C%20--%3E%20B%0A%20%20%20%20B%20--%3E%7C%E5%90%A6%7C%20D(%5B%E7%BB%93%E6%9D%9F%5D)"}),x])}const O=_(q,[["render",T]]);export{L as __pageData,O as default};
