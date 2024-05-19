import{_ as o}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as d,m as n,a as g,e as p,x as t,u as h,B as c,ah as A,o as l,p as y,q as D}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const S=JSON.parse('{"title":"Integrate Iconfont in RN","description":"","frontmatter":{"title":"Integrate Iconfont in RN","author":"ChocolateAceCream","date":"2024/05/14 19:00","isTop":false,"categories":["frontend"],"tags":["TypeScript","React Native","Expo","Iconfont"]},"headers":[],"relativePath":"categories/frontend/2024/05/14/Iconfont_In_React_Native.md","filePath":"categories/frontend/2024/05/14/Iconfont_In_React_Native.md","lastUpdated":1716096925000}'),C={name:"categories/frontend/2024/05/14/Iconfont_In_React_Native.md"},F={id:"integrate-iconfont-in-react-native",tabindex:"-1"},B=p("a",{class:"header-anchor",href:"#integrate-iconfont-in-react-native","aria-label":'Permalink to "Integrate Iconfont in React Native<Badge text="React Native" type="warning" />"'},"​",-1),u=A(`<p>Motivation: the default expo FontAwesome won&#39;t let you use your own svg. So I want to integrate Iconfont to manage my own svg set. It&#39;s always good to have control of what you using.</p><h2 id="how-it-works" tabindex="-1">How it works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How it works&quot;">​</a></h2><p>use createIconSet from react-native-vector-icons to create a icon set which can be imported when use. However, createIconSet requires three params:</p><ul><li>glyphMap (map of icon name to glyph represent of icon, which we need to generate ourselves)</li><li>fontFamily (we know it&#39;s iconfont)</li><li>ttf file path (we can download the ttf file from your iconfont project) if we open the css file download from iconfont, we can see each icon has a hex representation number, we used that number to generate our own glyphMap, which map the icon name to a decimal number which equal to that hex number. We can write our own script to do that or use existing tools like <a href="https://github.com/Jon-Millent/iconfont-to-json" target="_blank" rel="noreferrer">iconfonttojson</a></li></ul><h2 id="step-by-step-instruction" tabindex="-1">Step by step instruction <a class="header-anchor" href="#step-by-step-instruction" aria-label="Permalink to &quot;Step by step instruction&quot;">​</a></h2><ol><li>download iconfont project as a font class</li><li>install iconfont-to-json, which is used to convert css file to a glyphMap</li></ol><blockquote><p>npm i iconfont-to-json -g</p></blockquote><ol start="3"><li>add to your package.json</li></ol><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#8DDB8C;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#8DDB8C;">    &quot;build:iconfont&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;iconfonttojson ./font/iconfont.css&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><ol start="4"><li>run the script, generate glyphMap</li><li>create an iconfont component</li></ol><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> { createIconSet } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;react-native-vector-icons&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> glyphMap </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;@/font/iconfont.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> iconSet</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> createIconSet</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  glyphMap,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">  &quot;iconfont&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">  require</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;@/assets/fonts/iconfont.ttf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> iconSet;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> const</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">  Button</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">  TabBarItem</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">  TabBarItemIOS</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">  getImageSource</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> iconSet;</span></span></code></pre></div><ol start="6"><li>used it in your project</li></ol><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> IconFont </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;@/components/IconFont&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> buildTabBarIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">iconName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">  &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">IconFont name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{iconName} size</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">18</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">} style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{{ </span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: props.tintColor }} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> TabLayout</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">() </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> colorScheme</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> useColorScheme</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    &lt;</span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">Tabs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      screenOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">        tabBarActiveTintColor</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: Colors[colorScheme </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">??</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;light&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">].tint,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">        // Disable the static render of the header on web</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">        // to prevent a hydration error in React Navigation v6.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">        headerShown</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">useClientOnlyValue</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      }}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    &gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">      &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">Tabs.Screen</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;index&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        options</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">          title</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;Tab One&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">          tabBarIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">            buildTabBarIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;icon-blog-menu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, { tintColor: color }),</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">          headerRight</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">            &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">Link href</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/modal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> asChild</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">              &lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Pressable</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                {({ </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">pressed</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">                  &lt;</span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">FontAwesome</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                    name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;info-circle&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                    size</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">25</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                    color</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{Colors[colorScheme </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">??</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;light&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">].text}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                    style={{ marginRight: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">15</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, opacity: pressed </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> }}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">                  /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                )}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">              &lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">Pressable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">            &lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">Link</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          ),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">      /&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">      &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">Tabs.Screen</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;two&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        options</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">          title</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;Tab Two&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">          tabBarIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">            buildTabBarIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;icon-blog-home&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, { tintColor: color }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">      /&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    &lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">Tabs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>p.s. remember to edit path to your files.</p>`,14);function E(s,m,f,b,_,q){const e=n("Badge"),k=o,r=n("ClientOnly");return l(),g("div",null,[p("h1",F,[t("Integrate Iconfont in React Native"),h(e,{text:"React Native",type:"warning"}),t(),B]),h(r,null,{default:c(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(l(),y(k,{key:0,article:s.$frontmatter},null,8,["article"])):D("",!0)]}),_:1}),u])}const T=d(C,[["render",E]]);export{S as __pageData,T as default};
