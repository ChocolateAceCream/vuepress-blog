import{_ as p}from"./chunks/ArticleMetadata.BX5YQDgB.js";import{_ as m,m as l,a as d,e as r,x as s,u as o,B as u,ah as _,o as i,p as b,q as g}from"./chunks/framework.C8Xrbvax.js";import"./chunks/theme.CbFC1_Md.js";const B=JSON.parse('{"title":"Deploy ELK with helm","description":"","frontmatter":{"title":"Deploy ELK with helm","author":"ChocolateAceCream","date":"2024/04/20 19:00","isTop":false,"categories":["DevOps"],"tags":["Elasticsearch","Kibana","Filebeat","Kubernetes","Logstash"]},"headers":[],"relativePath":"categories/DevOps/2024/04/20/Deploy_ELK_with_helm.md","filePath":"categories/DevOps/2024/04/20/Deploy_ELK_with_helm.md","lastUpdated":1714766746000}'),f={name:"categories/DevOps/2024/04/20/Deploy_ELK_with_helm.md"},k={id:"deploy-elk-on-single-node-cluster-using-helm",tabindex:"-1"},y=r("a",{class:"header-anchor",href:"#deploy-elk-on-single-node-cluster-using-helm","aria-label":'Permalink to "Deploy ELK on single node cluster using helm <Badge text="Kubernetes" type="warning" />"'},"​",-1),q=_('<h3 id="install-elastic-search" tabindex="-1">install elastic search <a class="header-anchor" href="#install-elastic-search" aria-label="Permalink to &quot;install elastic search&quot;">​</a></h3><p>since I&#39;m running single replica cluster, I cannot create multi-node elasticsearch cluster. So modify the default yaml</p><blockquote><p>replicas: 1 minimumMasterNodes: 1 clusterHealthCheckParams: &#39;wait_for_status=yellow&amp;timeout=1s&#39;</p></blockquote><p>then install using helm</p><blockquote><p>helm repo add elastic <a href="https://helm.elastic.co" target="_blank" rel="noreferrer">https://helm.elastic.co</a> helm install elasticsearch elastic/elasticsearch -f elasticsearch.yaml</p></blockquote><p>remember to retrieve user&#39;s passwd</p><blockquote><p>kubectl get secrets --namespace=default elasticsearch-master-credentials -ojsonpath=&#39;{.data.password}&#39; | base64 -d</p></blockquote><h3 id="install-filebeat" tabindex="-1">install filebeat <a class="header-anchor" href="#install-filebeat" aria-label="Permalink to &quot;install filebeat&quot;">​</a></h3><blockquote><p>helm install filebeat elastic/filebeat</p></blockquote><h3 id="install-logstash" tabindex="-1">install logstash <a class="header-anchor" href="#install-logstash" aria-label="Permalink to &quot;install logstash&quot;">​</a></h3><blockquote><p>helm install logstash elastic/logstash</p></blockquote>',11);function w(e,D,K,E,C,x){const n=l("Badge"),c=p,h=l("ClientOnly");return i(),d("div",null,[r("h1",k,[s("Deploy ELK on single node cluster using helm "),o(n,{text:"Kubernetes",type:"warning"}),s(),y]),o(h,null,{default:u(()=>{var t,a;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((a=e.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(i(),b(c,{key:0,article:e.$frontmatter},null,8,["article"])):g("",!0)]}),_:1}),q])}const N=m(f,[["render",w]]);export{B as __pageData,N as default};
