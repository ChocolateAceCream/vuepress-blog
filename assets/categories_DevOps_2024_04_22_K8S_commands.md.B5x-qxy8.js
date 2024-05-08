import{_ as m}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as d,m as a,a as u,e as r,x as n,u as s,B as _,ah as g,o as l,p as h,q as b}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const N=JSON.parse('{"title":"Kubernetes Common operations and commands","description":"","frontmatter":{"title":"Kubernetes Common operations and commands","author":"ChocolateAceCream","date":"2024/04/22 19:00","isTop":true,"categories":["DevOps"],"tags":["Kubernetes"]},"headers":[],"relativePath":"categories/DevOps/2024/04/22/K8S_commands.md","filePath":"categories/DevOps/2024/04/22/K8S_commands.md","lastUpdated":1714766746000}'),f={name:"categories/DevOps/2024/04/22/K8S_commands.md"},k={id:"kubernetes-common-operations-and-commands",tabindex:"-1"},w=r("a",{class:"header-anchor",href:"#kubernetes-common-operations-and-commands","aria-label":'Permalink to "Kubernetes Common operations and commands <Badge text="Kubernetes" type="warning" />"'},"​",-1),y=g('<ol><li>enter a pod</li></ol><blockquote><p>kubectl exec -it consul-server-0 -n consul -- /bin/sh</p></blockquote><p>you may want to run</p><blockquote><p>kubectl get pods -n consul</p></blockquote><p>to get pod name under namespace consul</p><ol start="2"><li>view logs of specific pod</li></ol><blockquote><p>kubectl logs -n ingress-nginx ingress-nginx-controller-7b576d7f46-gtmmk</p></blockquote><p>same, you want to run</p><blockquote><p>kubectl get pods -n ingress-nginx</p></blockquote><p>to get your pod name first</p><ol start="3"><li>retrieve k8s manifest that was generated by helm when installing the chart</li></ol><blockquote><p>helm get manifest consul --namespace consul</p></blockquote><p>where first consul is the actual release name. P.S this only display the yaml during the installation. Once you change the config later manually, it&#39;s not covered in the output.</p><ol start="4"><li>-w -l -w is used for real-time result update. (watch), only apply to kubectl get -f is used with kubectl logs to get live log feeds -l is used for label match e.g.</li></ol><blockquote><p>kubectl get pods --namespace=default -l app=elasticsearch-master -w will find pods under that namespace with lable app=xxx, and live update the result once changed.</p></blockquote><ol start="5"><li>port forward kubectl port-forward svc/my-demo-app-service 8081:8081 -n gokit</li></ol>',16);function v(e,q,x,C,K,S){const c=a("Badge"),i=m,p=a("ClientOnly");return l(),u("div",null,[r("h1",k,[n("Kubernetes Common operations and commands "),s(c,{text:"Kubernetes",type:"warning"}),n(),w]),s(p,null,{default:_(()=>{var t,o;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((o=e.$frontmatter)==null?void 0:o.showArticleMetadata)??!0)?(l(),h(i,{key:0,article:e.$frontmatter},null,8,["article"])):b("",!0)]}),_:1}),y])}const V=d(f,[["render",v]]);export{N as __pageData,V as default};
