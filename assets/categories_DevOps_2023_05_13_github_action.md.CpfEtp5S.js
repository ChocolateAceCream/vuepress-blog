import{_ as d}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as o,m as n,a as g,e as l,x as t,u as e,B as c,ah as D,o as h,p as y,q as A}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const C="/vuepress-blog/assets/1.drawio.D0vCD42T.png",S=JSON.parse('{"title":"Github Action","description":"","frontmatter":{"title":"Github Action","author":"ChocolateAceCream","date":"2023/05/13 19:00","isTop":false,"categories":["DevOps"],"tags":["Github","CI/CD","Github Action"]},"headers":[],"relativePath":"categories/DevOps/2023/05/13/github_action.md","filePath":"categories/DevOps/2023/05/13/github_action.md","lastUpdated":1715139274000}'),F={name:"categories/DevOps/2023/05/13/github_action.md"},u={id:"config-github-action-for-ci-cd",tabindex:"-1"},B=l("a",{class:"header-anchor",href:"#config-github-action-for-ci-cd","aria-label":'Permalink to "Config Github Action for CI/CD <Badge text="Github" type="warning" />"'},"​",-1),m=D('<h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><p>Using github action to automate CI/CD process <img src="'+C+`" alt="图片alt" title="图片title"></p><h2 id="concepts" tabindex="-1">Concepts <a class="header-anchor" href="#concepts" aria-label="Permalink to &quot;Concepts&quot;">​</a></h2><h5 id="jobs" tabindex="-1">jobs <a class="header-anchor" href="#jobs" aria-label="Permalink to &quot;jobs&quot;">​</a></h5><p>Jobs, by default, is running in parallel, but its dependencies can be configured so that jobs can be run in orders. Jobs, indeed, is a set of steps.</p><h5 id="steps" tabindex="-1">steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;steps&quot;">​</a></h5><p>Steps existed inside jobs, which running in sequences. A step can be a set of shell scripts that running in orders, or an action p.s. steps shared data since they run on same runner</p><h5 id="action" tabindex="-1">action <a class="header-anchor" href="#action" aria-label="Permalink to &quot;action&quot;">​</a></h5><p>Action is a set of customized steps, which includes outputs and inputs. THe main purpose is to reduce duplicated steps in a job.</p><h5 id="strategy-matrix" tabindex="-1">strategy &amp; matrix <a class="header-anchor" href="#strategy-matrix" aria-label="Permalink to &quot;strategy &amp; matrix&quot;">​</a></h5><p>Same job will be run multiple time on each matrix params e.g.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">      matrix</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        node-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">17.5.0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">16.0.1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        go-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1.18</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">19</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]</span></span></code></pre></div><p>this job will run 4 times, on each node&amp;go version combinations</p><h2 id="config" tabindex="-1">Config <a class="header-anchor" href="#config" aria-label="Permalink to &quot;Config&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">blog-ci</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> #</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">run-name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">github.env --- \${{ github.env }}</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">  push</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># &quot;push to ci branch&quot; event will trigger the action</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">    branches</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;ci&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">  workflow_dispatch</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:   </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># manually trigger the github action</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">    inputs</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">      version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># can be use as env variables as \${{ inputs.version }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        description</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;choose a version to deploy&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        required</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        type</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">string</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">jobs</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">  ci</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">    runs-on</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">ubuntu-latest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">    strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">      matrix</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        node-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">17.5.0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        go-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1.18</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]  </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># usage: \${{ matrix.go-version }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">    env</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    # env defined here can be shared by all steps inside same job. If env defined inside a step, then that variable only available inside that step</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">      HOST</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ secrets.HOST}}</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # usage: $Host</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">      USER</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ secrets.USER}}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">      KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ secrets.SSH_PRIVATE_KEY}}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">    steps</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      -</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">docker login</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">docker/login-action@v2</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # use customized action</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        with</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># input of action</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">          username</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ secrets.DOCKERHUB_USER }}</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> # secrets of repo, set on github web UI</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">          password</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ secrets.DOCKERHUB_ACCESS_TOKEN }}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">add ssh host</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        shell</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">bash</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          mkdir -p ~/.ssh/ &amp;&amp; echo &quot;$KEY&quot; &gt; ~/.ssh/id_rsa &amp;&amp; chmod 600 ~/.ssh/id_rsa</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          cat &gt;&gt;~/.ssh/config &lt;&lt;END</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          Host server</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">            HostName $HOST</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">            User $USER</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">            IdentityFile ~/.ssh/id_rsa</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">            StrictHostKeyChecking no</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          END</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          ssh-keyscan github.com &gt;&gt; ~/.ssh/known_hosts</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          scp server:/root/test.md ./</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          cat ./test.md</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          # ssh -T server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">Checkout branch</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">actions/checkout@v2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">Use Node.js \${{ matrix.node-version }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">actions/setup-node@v2.1.2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        with</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">          node-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ matrix.node-version }}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">Use Go \${{ matrix.go-version }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">actions/setup-go@v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        with</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">          go-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">\${{ matrix.go-version }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">scp config files</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          scp server:/root/docker/blog/server/config.yml ./server/</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          scp server:/root/docker/blog/web/.env ./web/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">build frontend images</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          cd ./web</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          npm install</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          npm run build</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          docker build -t nuodi/blog-web:latest .</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          docker push nuodi/blog-web:latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">build backend images</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          cd ./server</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          go get -v -t -d ./...</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          docker build -t nuodi/blog-server:latest .</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          docker push nuodi/blog-server:latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">deploy</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">          ssh -T server &quot;docker login -u \${{ secrets.DOCKERHUB_USER }} -p \${{ secrets.DOCKERHUB_ACCESS_TOKEN }} &amp;&amp; /root/deploy.sh&quot;</span></span></code></pre></div><p>P.S.</p><ol><li><p>In each step, it&#39;s like open a new terminal, pwd will be reset to /home/runner/work/repo-name</p></li><li><p>when ssh to a remote server in a step, it only valid for the current line of script. e.g.</p></li></ol><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">run</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">  ssh -T server &quot;docker login -u \${{ secrets.DOCKERHUB_USER }} -p \${{ secrets.DOCKERHUB_ACCESS_TOKEN }} &amp;&amp; /root/deploy.sh&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">  pwd</span></span></code></pre></div><p>the <em><strong>pwd</strong></em> cmd will not execute on remote server, instead it will return runner&#39;s pwd</p>`,19);function b(s,E,v,_,f,w){const p=n("Badge"),k=d,r=n("ClientOnly");return h(),g("div",null,[l("h1",u,[t("Config Github Action for CI/CD "),e(p,{text:"Github",type:"warning"}),t(),B]),e(r,null,{default:c(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(h(),y(k,{key:0,article:s.$frontmatter},null,8,["article"])):A("",!0)]}),_:1}),m])}const T=o(F,[["render",b]]);export{S as __pageData,T as default};