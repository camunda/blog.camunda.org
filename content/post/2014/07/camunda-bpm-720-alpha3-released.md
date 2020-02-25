---
title: "camunda BPM 7.2.0-alpha3 released: CMMN, Scripting, Async, Correlation, Model Api, Forms"
date: "2014-07-17"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/07/camunda-bpm-720-alpha3-released.html"

---

<div>
Today we release camunda BPM 7.2.0-alpha3. Usually when we do a new alpha release, I write a Blogpost which gives an overview over the new features added in that release. But this time I cannot do that: there are simply too many new features to cover in a single blog post! So this time I will just give a bullet point list with the highlights and you guys will just have to wait for additional blogposts to come out in the next days.<br />
<br />
So what is in the new Release?<br />
<ul>
<li><b>CMMN support</b> is greatly enhanced.&nbsp;(CMMN is the emerging OMG standard for Case Management). <a href="http://docs.camunda.org/latest/api-references/cmmn10/">Documentation</a>.</li>
<ul>
<li>Support the basic case instance and plan item lifecycle,</li>
<li>support for stages, human tasks, case tasks and process tasks.</li>
</ul>
<li><b>Scripting</b>, everywhere:</li>
<ul>
<li>Load script sources from classpath and deployment,</li>
<li>Auto-deployment of script sources,</li>
<li>Use scripts as sequence flow conditions, task listeners, execution listeners,</li>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-scripting">Greatly improved documentation</a>.</li>
</ul>
<li><b>Template Engines</b>: you can now <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-templating">use FreeMarker and Apache Velocity as template engine</a> as an alternative to a script engine. Template engines allow a more declarative approach to composing payload (XML, JSON, Email Templates etc...)</li>
<li><b>Javascript SDK and Forms</b>: we started work on a reusable Javascript SDK which runs in Node.JS and the Browser. Providing</li>
<ul>
<li>Convenient access to the REST Api Operations in Javascript,</li>
<li>Reusable Embedded Forms. Use Embedded Forms inside and outside of camunda Tasklist.</li>
</ul>
<li>Enhanced <b>Asynchronous Continuations</b>:&nbsp;</li>
<ul>
<li>Use <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-configuring-asynchronous-continuations">Asynchronous Continuations AFTER activities</a></li>
<li>Use Asynchronous Continuations for more BPMN constructs (such as the Parallel Gateway)</li>
</ul>
<li>Enhanced <b>Model API</b>:&nbsp;</li>
<ul>
<li>Support for all event definitions and gateways</li>
<li>Support for writing BPMN DI</li>
</ul>
<li>Enhanced <b>Message Correlation</b>: You can now <a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-message-events-using-the-runtime-service39s-correlation-methods">correlate a message to all executions</a> which match the correlation criteria. (Contribution by <a href="https://github.com/sm29105">Michael Scholz</a>)&nbsp;</li>
<li>...</li>
</ul>
<div>
Over the last 4 Weeks, over 70 Issues were closed. See the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13390">complete release Notes in JIRA</a>.</div>
<div>
<br /></div>
<div style="text-align: center;">
<b><a href="http://camunda.org/download/">Download camunda BPM 7.2.0-alpha3 now!</a></b></div>
<div style="text-align: center;">
<br /></div>

</div>