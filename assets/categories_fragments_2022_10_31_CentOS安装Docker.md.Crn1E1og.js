import{_ as p}from"./chunks/ArticleMetadata.pg5HSCh1.js";import{_ as h,D as o,o as e,c as k,I as d,w as r,k as t,a as c,R as g,b as F,e as m}from"./chunks/framework.lWSK3XUC.js";import"./chunks/md5.US-HucPO.js";const u="/vuepress-blog/assets/202210312020985.YlmMgovU.png",E=JSON.parse('{"title":"CentOS 安装 Docker、Docker Compose","description":"","frontmatter":{"title":"CentOS 安装 Docker、Docker Compose","author":"查尔斯","date":"2022/10/31 20:56","categories":["杂碎逆袭史"],"tags":["Docker","Linux","CentOS"]},"headers":[],"relativePath":"categories/fragments/2022/10/31/CentOS安装Docker.md","filePath":"categories/fragments/2022/10/31/CentOS安装Docker.md","lastUpdated":1669526061000}'),y={name:"categories/fragments/2022/10/31/CentOS安装Docker.md"},C=t("h1",{id:"centos-安装-docker、docker-compose",tabindex:"-1"},[c("CentOS 安装 Docker、Docker Compose "),t("a",{class:"header-anchor",href:"#centos-安装-docker、docker-compose","aria-label":'Permalink to "CentOS 安装 Docker、Docker Compose"'},"​")],-1),D=g('<div class="tip custom-block"><p class="custom-block-title">笔者说</p><p>笔者下面的步骤及配置是基于发帖时间当下的实践，大多数程序大多数情况下在相差不大的版本时可以直接参考。</p></div><h2 id="docker-安装" tabindex="-1">Docker 安装 <a class="header-anchor" href="#docker-安装" aria-label="Permalink to &quot;Docker 安装&quot;">​</a></h2><h3 id="方式一" tabindex="-1">方式一 <a class="header-anchor" href="#方式一" aria-label="Permalink to &quot;方式一&quot;">​</a></h3><ol><li><p>软件更新</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> update</span></span></code></pre></div></li><li><p>安装 yum-utils</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yum-utils</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> device-mapper-persistent-data</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> lvm2</span></span></code></pre></div></li><li><p>设置 yum 软件源</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">yum-config-manager</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> --add-repo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> https://download.docker.com/linux/centos/docker-ce.repo</span></span></code></pre></div></li><li><p>安装 docker-ce（免费社区版）</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker-ce</span></span></code></pre></div></li><li><p>启动 docker</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker</span></span></code></pre></div></li><li><p>设置 docker 开机自启</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker</span></span></code></pre></div></li><li><p>检验是否安装成功</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">docker</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -v</span></span></code></pre></div></li></ol><h3 id="方式二-推荐" tabindex="-1">方式二（推荐） <a class="header-anchor" href="#方式二-推荐" aria-label="Permalink to &quot;方式二（推荐）&quot;">​</a></h3><p>一条命令安装 docker。</p><ol><li>下载并安装 docker</li><li>启动并设置 docker 开机自启</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> https://get.docker.com</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> bash</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> --mirror</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> Aliyun</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker</span></span></code></pre></div><h2 id="docker-配置" tabindex="-1">Docker 配置 <a class="header-anchor" href="#docker-配置" aria-label="Permalink to &quot;Docker 配置&quot;">​</a></h2><p>在 Windows 系统中安装软件时，我们都清楚要尽量不安装在 C 盘，数据存储也尽量迁移到其他空间更大的盘。不然随着程序的使用，数据越来越多，再加上大多数情况下 C 盘空间并不大，最终导致 C 盘很快会被占满。</p><p>同理，不更改 docker 的数据存储目录，那它的镜像、容器等存储占用随着使用时间的增长而增长，那你的服务器系统盘很快就会被占满了。所以建议你将 docker 的数据存储目录改到你服务器的数据盘挂载目录。</p><p>更改 docker 数据存储目录这一点是笔者推荐的，而设置 docker 镜像加速这一点其实根本无需笔者多言，你先不配置，用用 docker 再说，如果你 <code>docker pull</code> 速度很快，那完全不需要配置。这三个镜像加速源是笔者验证过的，当你感受到拉镜像的 “绝望” 时，不妨再来配置试一试。</p><div class="tip custom-block"><p class="custom-block-title">笔者说</p><p>关于镜像加速地址，你还可以从阿里云找到你专属的镜像加速地址。</p><p>按下面的路径就可以找到：</p><p>产品与服务 -&gt; 容器与中间件 -&gt; 容器服务 -&gt; 容器镜像服务 -&gt; 镜像加速器</p></div><p><img src="'+u+`" alt="202210312020985"></p><p>闲话不多说，配置只需要 3~5 步即可搞定。</p><ol><li><p>编辑 daemon.json 配置文件</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果 /etc 下没有 docker 目录，可以先创建一下</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># mkdir -p /etc/docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /etc/docker/daemon.json</span></span></code></pre></div></li><li><p>将下方配置内容写入 daemon.json 配置文件</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#8DDB8C;">  &quot;data-root&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/opt/disk/docker&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#8DDB8C;">  &quot;registry-mirrors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">    &quot;https://hub-mirror.c.163.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">    &quot;https://mirror.baidubce.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">    &quot;https://ustc-edu-cn.mirror.aliyuncs.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div></li><li><p>重新加载服务配置文件并重启 docker 服务</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 重新加载服务配置文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 重启 docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> docker</span></span></code></pre></div></li></ol><h2 id="docker-compose-安装" tabindex="-1">Docker Compose 安装 <a class="header-anchor" href="#docker-compose-安装" aria-label="Permalink to &quot;Docker Compose 安装&quot;">​</a></h2><ol><li><p>下载 docker-compose 脚本，并改名为 docker-compose</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">uname</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">)-$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">uname</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">)</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/local/bin/docker-compose</span></span></code></pre></div></li><li><p>给脚本授予可执行权限</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/local/bin/docker-compose</span></span></code></pre></div></li><li><p>检验是否安装成功</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -v</span></span></code></pre></div></li></ol><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ol><li>Custom Docker daemon options#Runtime directory and storage driver：<a href="https://docs.docker.com/config/daemon/systemd/#runtime-directory-and-storage-driver" target="_blank" rel="noreferrer">https://docs.docker.com/config/daemon/systemd/#runtime-directory-and-storage-driver</a></li></ol>`,20);function v(s,b,_,A,f,B){const l=p,n=o("ClientOnly");return e(),k("div",null,[C,d(n,null,{default:r(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(e(),F(l,{key:0,article:s.$frontmatter},null,8,["article"])):m("",!0)]}),_:1}),D])}const O=h(y,[["render",v]]);export{E as __pageData,O as default};
