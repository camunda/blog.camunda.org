---
title: "A look at the fresh REST API"
date: "2013-03-19T17:52:00+01:00"
author: "Thorben Lindhauer"

categories:
  - "Development"
tags: 

aliases:
  - "/2013/03/a-look-at-fresh-rest-api.html"

---

camunda BPM comes with a fresh REST API based on JAX-RS. Its goal is to expose the process engine services as broadly as possible. That means we aim to enable you to interact with process engine services via REST with similar expressiveness as in plain Java. With 7.0.0-alpha1, we provide methods such as <a href="http://docs.camunda.org/latest/api-references/rest/#task">task querying</a> that already realize our desired degree of detail (similar for process definitions and instances). For future releases, we plan to broaden the scope to reach the afore-mentioned goal.<br />
<h3>
Use it with a prebuilt distro </h3>
In 7.0.0-alpha1 the API covers interactions with process definitions, process instances and tasks as documented on <a href="http://docs.camunda.org/latest/api-references/rest/">camunda.org</a>. Enough to build your first process applications as demonstrated in camunda's <a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist">tasklist</a>. In our prebuilt distros, the REST API is enabled by default and is ready to go.<br />
<br />
Cool feature: camunda's <a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit">cockpit</a> prototype uses the new methods for aggregated runtime statistics. These give you the number of running instances of BPMN concepts such as <a href="http://docs.camunda.org/latest/api-references/rest/#process-definition">processes</a> and <a href="http://docs.camunda.org/latest/api-references/rest/#process-definition-get-activity-instance-statistics">activities</a> grouped by process definition and activity respectively. Optionally you can also get the number of failed jobs.<br />
<br />
You may also address the several process engines you are running on the platform by prepending <code>/engine/{engine-name}</code> to any of the method's urls. If you omit this, the default engine is used. <br />
<h3>
Embed it in your own JAX-RS application</h3>
Got your embedded engine and want to quickly add REST capabilities to it? You may embed the RESTful resources in your own JAX-RS application with little&nbsp;configuration if you run on Resteasy and have jackson-jaxrs on your classpath. Pick up the REST resources by adding the following Maven dependency:<br />
<pre>&lt;dependency&gt;
&lt;groupid&gt;org.camunda.bpm&lt;/groupid&gt;
&lt;artifactid&gt;camunda-engine-rest&lt;/artifactid&gt;
&lt;classifier&gt;classes&lt;/classifier&gt;
&lt;version&gt;7.0.0-alpha1&lt;/version&gt;
&lt;/dependency&gt;
</pre>
<br />
Then you can choose which of the resources you want to include. Have a look <a href="http://docs.camunda.org/latest/api-references/rest/#overview-embedding-the-api">here</a> to see how this can be done. (The alternative is to use a JAX-RS implementation provided by your application server.)<br />
<br />
Being an alpha release, we are aware that essential features such as authentication are still missing. However, this is on our roadmap to 7.0.0 final, so stay tuned and explore the <a href="http://docs.camunda.org/latest/">docs</a> meanwhile!