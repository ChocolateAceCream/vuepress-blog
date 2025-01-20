import{_ as u}from"./chunks/ArticleMetadata.4tiueInE.js";import{_ as d,m as s,a as m,e as i,x as r,u as o,B as p,ah as k,o as n,p as _,q as b}from"./chunks/framework.BuAcqOzq.js";import"./chunks/theme.B531u9tI.js";const f="/vuepress-blog/assets/basic_component.Cs5dsfTF.png",g="/vuepress-blog/assets/k8s_arch.C2RqvJIj.png",A=JSON.parse('{"title":"Basic of Orchestration System","description":"","frontmatter":{"title":"Basic of Orchestration System","author":"ChocolateAceCream","date":"2024/03/21 10:24","isTop":true,"categories":["Orchestrator"],"tags":["Orchestrator"]},"headers":[],"relativePath":"courses/Orchestrator/01-Basic/01-Basic_of_Orchestrator_System.md","filePath":"courses/Orchestrator/01-Basic/01-Basic_of_Orchestrator_System.md","lastUpdated":1714767430000}'),y={name:"courses/Orchestrator/01-Basic/01-Basic_of_Orchestrator_System.md"},B={id:"basic-of-orchestration-system",tabindex:"-1"},S=i("a",{class:"header-anchor",href:"#basic-of-orchestration-system","aria-label":'Permalink to "Basic of Orchestration System <Badge text="Orchestrator" type="warning" />"'},"​",-1),O=k('<p>an orchestrator system automates deploying, scaling, and managing containers.</p><h2 id="components" tabindex="-1">Components <a class="header-anchor" href="#components" aria-label="Permalink to &quot;Components&quot;">​</a></h2><ul><li>Task</li><li>Job</li><li>scheduler</li><li>manager</li><li>worker</li><li>cluster</li><li>CLI <img src="'+f+'" alt="Basic Component"> each orchestrator system should have a scheduler, a manger, and a worker, and they all operate on tasks</li></ul><h4 id="tasks-kubernetes-objects" tabindex="-1">Tasks (kubernetes objects) <a class="header-anchor" href="#tasks-kubernetes-objects" aria-label="Permalink to &quot;Tasks (kubernetes objects)&quot;">​</a></h4><ul><li>service that runs in a container, could be nginx, RESTful API server or a script</li></ul><h5 id="a-task-should-specify" tabindex="-1">a task should specify: <a class="header-anchor" href="#a-task-should-specify" aria-label="Permalink to &quot;a task should specify:&quot;">​</a></h5><ol><li>cpu, memory, disk required to run the task</li><li>restart policy (what should orchestrator do in case of failure)</li><li>image used for the task</li></ol><h4 id="job-kubernetes-objects" tabindex="-1">Job (kubernetes objects) <a class="header-anchor" href="#job-kubernetes-objects" aria-label="Permalink to &quot;Job (kubernetes objects)&quot;">​</a></h4><ul><li>an aggregation of tasks. such as k8s&#39;s Deployment, ReplicaSet, StatefulSet, DaemonSet and Job resource types</li></ul><h4 id="scheduler" tabindex="-1">Scheduler <a class="header-anchor" href="#scheduler" aria-label="Permalink to &quot;Scheduler&quot;">​</a></h4><ul><li><p>decides what machine can best host the tasks defined in the job, using algorithms such as round-robin or Enhanced Parallel Virtual Machine(E-PVM)</p></li><li><p>The scheduler should perform these functions:</p></li></ul><ol><li>Determine a set of candidate machines on which a tasks could run</li><li>rank them</li><li>pick the best one</li></ol><h4 id="manager-control-plane" tabindex="-1">Manager (control plane) <a class="header-anchor" href="#manager-control-plane" aria-label="Permalink to &quot;Manager (control plane)&quot;">​</a></h4><ul><li>entry point for users. User submit jobs to manager, manager use scheduler find a machine to run job and use assign worker to run the tasks, then collect metrics from each work, so those data can be used in scheduling process</li></ul><h4 id="worker-kubelet" tabindex="-1">Worker (kubelet) <a class="header-anchor" href="#worker-kubelet" aria-label="Permalink to &quot;Worker (kubelet)&quot;">​</a></h4><ul><li>running manager assigned tasks as docker containers</li><li>providing metrics, health for manager for the purpose of scheduling tasks</li></ul><p><img src="'+g+'" alt="k8s arch"></p>',17);function q(e,C,P,j,x,T){const l=s("Badge"),c=u,h=s("ClientOnly");return n(),m("div",null,[i("h1",B,[r("Basic of Orchestration System "),o(l,{text:"Orchestrator",type:"warning"}),r(),S]),o(h,null,{default:p(()=>{var a,t;return[(((a=e.$frontmatter)==null?void 0:a.aside)??!0)&&(((t=e.$frontmatter)==null?void 0:t.showArticleMetadata)??!0)?(n(),_(c,{key:0,article:e.$frontmatter},null,8,["article"])):b("",!0)]}),_:1}),O])}const N=d(y,[["render",q]]);export{A as __pageData,N as default};