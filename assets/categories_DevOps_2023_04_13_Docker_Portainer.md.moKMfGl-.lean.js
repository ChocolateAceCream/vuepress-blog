import{_ as C}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as y,m as r,a as u,e as s,x as i,u as n,B as l,ah as c,o as h,p as o,q as d}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const m="/vuepress-blog/assets/1.BORlrkM-.png",D="/vuepress-blog/assets/2.KBVUxPRn.png",V=JSON.parse('{"title":"Portainer TLS connection","description":"","frontmatter":{"title":"Portainer TLS connection","author":"ChocolateAceCream","date":"2023/04/13 19:00","isTop":false,"categories":["DevOps"],"tags":["Portainer","Docker","TLS"]},"headers":[],"relativePath":"categories/DevOps/2023/04/13/Docker_Portainer.md","filePath":"categories/DevOps/2023/04/13/Docker_Portainer.md","lastUpdated":1714717174000}'),v={name:"categories/DevOps/2023/04/13/Docker_Portainer.md"},b={id:"portainer-tls-connect-to-remote-env",tabindex:"-1"},f=s("a",{class:"header-anchor",href:"#portainer-tls-connect-to-remote-env","aria-label":'Permalink to "Portainer TLS connect to remote env <Badge text="Portainer" type="warning" />"'},"​",-1),_=s("p",null,[s("strong",null,"server"),i(": host that running portainer "),s("strong",null,"client"),i(": host that to be connected to, which is running docker")],-1),B=s("h1",{id:"client-side-config",tabindex:"-1"},[i("client side config "),s("a",{class:"header-anchor",href:"#client-side-config","aria-label":'Permalink to "client side config"'},"​")],-1),A=c("",8),S=c("",10),P=s("ol",null,[s("li",null,[i("open portainer UI, add new environment, select docker standalone then select api connection "),s("img",{src:m,alt:"图片alt",title:"图片title"})]),s("li",null,[i("enable tls, upload ca files of client host, then click connect. "),s("em",null,[s("strong",null,"P.S.")]),i(" remember to add host in server hosts file. e.g. point ali-cloud to actual client host ip "),s("img",{src:D,alt:"图片alt",title:"图片title"})])],-1);function T(a,N,E,$,O,q){const F=r("Badge"),p=C,k=r("ClientOnly"),g=r("font");return h(),u("div",null,[s("h1",b,[i("Portainer TLS connect to remote env "),n(F,{text:"Portainer",type:"warning"}),i(),f]),n(k,null,{default:l(()=>{var t,e;return[(((t=a.$frontmatter)==null?void 0:t.aside)??!0)&&(((e=a.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(h(),o(p,{key:0,article:a.$frontmatter},null,8,["article"])):d("",!0)]}),_:1}),_,B,n(k,null,{default:l(()=>{var t,e;return[(((t=a.$frontmatter)==null?void 0:t.aside)??!0)&&(((e=a.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(h(),o(p,{key:0,article:a.$frontmatter},null,8,["article"])):d("",!0)]}),_:1}),A,n(g,{color:"red"},{default:l(()=>[i("/etc/ssl/openssl.cnf")]),_:1}),i(" might be found from different directory, use following command to find the right location"),S,n(k,null,{default:l(()=>{var t,e;return[(((t=a.$frontmatter)==null?void 0:t.aside)??!0)&&(((e=a.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(h(),o(p,{key:0,article:a.$frontmatter},null,8,["article"])):d("",!0)]}),_:1}),P])}const M=y(v,[["render",T]]);export{V as __pageData,M as default};