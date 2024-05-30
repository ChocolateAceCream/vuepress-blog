import{_ as l}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as u,m as o,a as p,e as i,x as r,u as s,B as m,ah as f,o as n,p as g,q as _}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const b="/vuepress-blog/assets/arch.drawio.DOd84oU8.png",N=JSON.parse('{"title":"React server side component brief talk","description":"","frontmatter":{"title":"React server side component brief talk","author":"ChocolateAceCream","date":"2024/05/30 19:00","isTop":false,"categories":["frontend"],"tags":["React","React Native","Server Side Component"]},"headers":[],"relativePath":"categories/frontend/2024/05/30/React_server_side_component.md","filePath":"categories/frontend/2024/05/30/React_server_side_component.md","lastUpdated":1717113273000}'),w={name:"categories/frontend/2024/05/30/React_server_side_component.md"},v={id:"brief-talk-about-react-server-side-component",tabindex:"-1"},k=i("a",{class:"header-anchor",href:"#brief-talk-about-react-server-side-component","aria-label":'Permalink to "Brief talk about React server side component<Badge text="React" type="warning" />"'},"​",-1),y=f('<p>Is it a good idea to use server side component in React? My first impression is like: why do we need such thing? Am I back to 10 years ago where we write embedded html templates like .erb in rails? So I spent some time digging how it works to figure out if it&#39;s a good idea to use it in the future.</p><h2 id="concept" tabindex="-1">Concept <a class="header-anchor" href="#concept" aria-label="Permalink to &quot;Concept&quot;">​</a></h2><p>Core concept about react server side component is that it can generate &#39;virtual node&#39; in server side and pass it back to render at browser. It&#39;s more SEO friendly and improved UX since user won&#39;t need to download all the bundler js files.</p><h2 id="constrains" tabindex="-1">Constrains <a class="header-anchor" href="#constrains" aria-label="Permalink to &quot;Constrains&quot;">​</a></h2><p>However, the biggest limitation about this approach is that: everything has to be done at first request (when first req was sent to your server to request frontend resources).</p><p>Based on this limitation, first thing in my mind is: how to auth? Yea it&#39;s true that server side component can direct run sql to fetch data from backend db, but how you make sure current use has enough privilege to do that operation? So auth is a must have step right before any resource are fetched from Server side component. Initially I thought this might violate the biggest constrain: everything must be done at first request because: YOU HAVE TO MAKE A AUTH CALL.</p><h3 id="workaround" tabindex="-1">Workaround <a class="header-anchor" href="#workaround" aria-label="Permalink to &quot;Workaround&quot;">​</a></h3><p>Then I thought deeper, how can auth done? answer is JWT or session. If user has logged in that web before, we can use JWT or session for auth at the first request, then we can use server side component&#39;s power to finish the job. However, what if user is first time login the web?</p><p>The workaround answer is: <strong>REDIRECT</strong></p><p>That&#39;s quite often we see after success auth, we are redirect several times before finally landed into the page we want to. When redirect happens, route changed and so new request for certain page were sent to the server, and that request can be seen as &#39;first request&#39; so server side component can be used in such scenario.</p><p><img src="'+b+'" alt="architecture"></p><p>As long as all server side component page has its specific router defined(so no dynamic values are passed to server side component), ideally we only need an auth service backend api and let server side component take care of the rest.</p><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>Currently the limitation of server side component is still huge. You can only use it when your url changed. Which means it&#39;s not suitable to use in modal, pop ups, paged table, infinite loading etc. Which means you still need backend api endpoint to backup those functions. So why brother to use server side component at the first place? I guess the only possible scenario I would use it is the landing page. Now react 19 is almost out, let&#39;s wait and see.</p>',14);function C(e,q,R,T,A,I){const c=o("Badge"),d=l,h=o("ClientOnly");return n(),p("div",null,[i("h1",v,[r("Brief talk about React server side component"),s(c,{text:"React",type:"warning"}),r(),k]),s(h,null,{default:m(()=>{var t,a;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((a=e.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),g(d,{key:0,article:e.$frontmatter},null,8,["article"])):_("",!0)]}),_:1}),y])}const P=u(w,[["render",C]]);export{N as __pageData,P as default};
