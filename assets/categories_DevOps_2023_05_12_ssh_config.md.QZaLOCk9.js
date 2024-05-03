import{_ as c}from"./chunks/ArticleMetadata.41rSz6Gb.js";import{_ as d,D as a,o as t,c as k,k as h,a as n,I as l,w as g,R as m,b as u,e as y}from"./chunks/framework.lWSK3XUC.js";import"./chunks/md5.US-HucPO.js";const N=JSON.parse('{"title":"SSH config","description":"","frontmatter":{"title":"SSH config","author":"ChocolateAceCream","date":"2023/05/12 19:00","isTop":false,"categories":["DevOps"],"tags":["SSH","Linux"]},"headers":[],"relativePath":"categories/DevOps/2023/05/12/ssh_config.md","filePath":"categories/DevOps/2023/05/12/ssh_config.md","lastUpdated":1714705686000}'),f={name:"categories/DevOps/2023/05/12/ssh_config.md"},F={id:"ssh-to-remote-server-using-ssh-config",tabindex:"-1"},b=h("a",{class:"header-anchor",href:"#ssh-to-remote-server-using-ssh-config","aria-label":'Permalink to "SSH to remote server using ssh config <Badge text="SSH" type="warning" />"'},"​",-1),_=m(`<h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><p>Use ssh config to save host infos, then use that info to ssh to host, avoiding entering password every time.</p><h2 id="config" tabindex="-1">Config <a class="header-anchor" href="#config" aria-label="Permalink to &quot;Config&quot;">​</a></h2><ol><li>in local machine, generate pub key and private key</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ssh-keygen</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> rsa</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -b</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 4096</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -C</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;your@email.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># enter file name test</span></span></code></pre></div><p>this command will generate two files in ~/.ssh/ folder: test and test.pub. (one is private key and .pub is public key)</p><ol start="2"><li>In remote machine, go to ~/.ssh folder, copy test.pub (public key) file to that folder</li><li>In remote machine, edit ssh config file /etc/ssh/sshd_config add the following</li></ol><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">PubkeyAuthentication yes</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">AuthorizedKeysFile  .ssh/test.pub</span></span></code></pre></div><ol start="4"><li>back to local .ssh folder, generate a new file named config and fill in the client machine info</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># ~/.ssh/config</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Host</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> test_client</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">  HostName</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> xxx.xx.xx.xx</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # ip of client machine</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">  User</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> root</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # login name of client ssh client</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">  IdentityFile</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> ~/.ssh/test</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # path to client private key</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">  StrictHostKeyChecking</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # skip host check, automatically add host to known_hosts file</span></span></code></pre></div><ol start="4"><li>Now you can direct ssh to client machine from server machine using</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ssh</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> test_client</span></span></code></pre></div><ol start="5"><li>This also works on scp. e.g.</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">scp</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> test_client:~/.ssh/test</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> ./</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># copy test file from client machine to server machine</span></span></code></pre></div>`,14);function C(s,v,D,S,A,x){const o=a("Badge"),p=c,r=a("ClientOnly");return t(),k("div",null,[h("h1",F,[n("SSH to remote server using ssh config "),l(o,{text:"SSH",type:"warning"}),n(),b]),l(r,null,{default:g(()=>{var i,e;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((e=s.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(t(),u(p,{key:0,article:s.$frontmatter},null,8,["article"])):y("",!0)]}),_:1}),_])}const T=d(f,[["render",C]]);export{N as __pageData,T as default};
