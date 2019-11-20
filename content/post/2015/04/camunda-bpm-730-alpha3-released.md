---
title: "Camunda BPM 7.3.0-alpha3 released"
date: "2015-04-24"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/04/camunda-bpm-730-alpha3-released.html"

---

<div>
A new alpha release of our open source BPM and Workflow platform is available for <a href="http://camunda.org/download/#latest">download</a>. The highlights of this release are:<br />
<ul>
<li>Process Engine Java and Rest Api</li>
<ul>
<li>Process-level authorizations: define ACL-like authorizations for restricting possible interactions with process-related resources (Process Definitions, Process Instances, Tasks ...), in both Java and REST Api.</li>
<li>Deep tissue refactoring of implementation of Multi Instance constructs in process engine.</li>
<li>Many, many bug fixes related to multi instance, event subprocesses, boundary events and compensation.</li>
<li>Api for process instance repair: Modify a process instance's execution structure through the ability to start and cancel activities in a flexible way.</li>
<li>Job Executor Threadpool can be configured for shared process engine in Apache Tomcat</li>
<li>Improved Error Handling: call activities now also map variables in case an error is thrown, access error code as process variable in error handler</li>
<li>Improved Task Query capabilities: <code>processInstanceBusinessKeyIn(...), processDefinitionKeyIn(...), .taskDefinitionKeyIn(...), .parentTaskId(...), </code>, </li>
<li>Adds Support for Databases: Mysql 5.5 / 5.6, Maria DB 10.0, Microsoft SQL Server 2014, PostgreSQL 9.4, IBM DB2 10.1 /10.5</li>
<li>Adds Support for Application Servers: Wildfly 8.2, JBoss EAP 6.4</li>
<li>Adds Support for Java Runtimes: IBM® J9 virtual machine (JVM) 8, OpenJDK 6 / 7</li>
<li>Rest API now supports Jackson 2.3.x</li>
</ul>
<li>Cockpit</li>
<ul>
<li>Better auditing through improved User Operation Log now supporting all process instance related interactions</li>
<li>Restrict visibility of process definitions, instances and tasks and the possible interactions on these based on authorizations</li>
<li>Enterprise Edition-only feature: UI for process instance repair: Modify a process instance's execution structure through the ability to start and cancel activities in a flexible way.</li>
<li>UI improvements</li>
<li>bpmn.io is now used as diagram renderer</li>
<li>Activity instance tree now correctly differentiates the multi instance body scope from the inner activity instance</li>
</ul>
<li>Tasklist</li>
<ul>
<li>Start process dialog: Restrict visibility of processes which a user is not authorized to start.</li>
<li>Improved Filter Capabilities</li>
</ul>
<li>Admin</li>
<ul>
<li>Configure process-related authorizations</li>
</ul>
</ul>
<div>
The <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13792">full release notes</a> can retrieved from Jira.</div>
<br />
<div>
You can <a href="http://camunda.org/download#latest">download Camunda</a>, <a href="https://github.com/camunda/docker-camunda-bpm-platform">run it with Docker</a> or <a href="http://docs.camunda.org/7.2/guides/getting-started-guides/#apache-maven-apache-maven-coordinates">add it to your application with maven</a>.</div>
<a name='more'></a><br />
<h3>
Run this Release with Docker<br />
</h3>
If you want to run this release with <a href="http://docker.io/">Docker</a>, you can use the freshly baked Docker images. The following command line will start the tomcat distribution:<br />
<pre class="prettyprint"><code>docker pull camunda/camunda-bpm-platform:7.3.0-alpha3
docker run -d --name camunda -p 8080:8080 camunda/camunda-bpm-platform:7.3.0-alpha3
</code></pre>
Open browser with url: <a href="http://localhost:8080/camunda/">http://localhost:8080/camunda/</a><br />
<br />
See the <a href="https://github.com/camunda/docker-camunda-bpm-platform">Camunda Docker Images</a> project for alternative distributions and versions.<br />
<br />
<h3>
The Process Instance Modification Api<br />
</h3>
This release introuces a very powerful new api for modifying the state of process instance. You can<br />
<ul>
<li>Cancel existing activity instances,</li>
<li>Start execution before an activity, after an activitiy or on a sequence flow.</li>
</ul>
The following is an example of how the api can be used.<br />
<br />
Assume that we have the following BPMN process: <br />
<br />
{{< figure src="http://2.bp.blogspot.com/-h7AM2zyyX20/VTnOcdljYKI/AAAAAAAAB2A/lmKY1CVnCYA/s1600/process1.png" >}}
<br />
We have a process instance which is currently waiting in the <em>Prepare Bank Transfer</em> task. Due to a technical problem, the <em>Archive Invoice</em> service task must be executed again. In order to achieve that we can execute the following command using the process instance modification API:<br />
<br />
<pre class="prettyprint"><code class="language-java">//find process instance for invoice id '1223123'
ProcessInstance pi = runtimeService.createProcessInstanceQuery()
  .variableValueEquals("invoiceId", "1223123")
  .singleResult();

// find active instance of 'prepareBankTransfer' activity for this process instance
ActivityInstance prepareBankTransferInstance = runtimeService.getActivityInstance(pi.getId())
  .getActivityInstances("prepareBankTransfer")[0];

// perform the modification
runtimeService.createProcessInstanceModification(pi.getId())
  .startBeforeActivity("archiveInvoice")
  .cancelActivityInstance(prepareBankTransferInstance.getId())
  .execute();
</code></pre>
<br />
The command will first search for the process instance for invoice with id '1223123'.<br />
Within this process instance it then searches for the instance of the 'prepareBankTransfer' activity.<br />
Finally it executes the modification starting a new instance of the 'archiveInvoice' activity and then cancels the previous 'prepareBankTransfer' activitiy.<br />
<br />
We believe the usecases for this Api are centered around<br />
<ul>
<li>Repairing process instances in which some steps have to be repeated or skipped.</li>
<li>Migrating process instances from one version of a process definition to another.</li>
<li>Testing: you can now flexibly "skip ahead" in the process or "go back" which is very useful for testing individual segments of a process</li>
</ul>
<br />
<h3>
Process Instance Modification Plugin for Cockpit</h3>
<br />
Camunda Cockpit now also provides a plugin for using the modification API. This plugin is only available in the Camunda Enterprise Subscription.<br />
<br />
{{< figure src="http://4.bp.blogspot.com/-hwPs8WLgUzs/VTnUQ_pH4DI/AAAAAAAAB2Q/kUJWckAcTGY/s1600/cockpit-modifications.png" >}}
<br />
<h3>
Process Authorizations</h3>
<br />
This release provides a first preview of the Process Authorization API. The Api allows users to authorize access to process related resources such as<br />
<ul>
<li>Process Definitions</li>
<li>Process Instances</li>
<li>Tasks</li>
</ul>
<br />
If authorization checks are enabled, authenticated users can only see, modify and delete those process definitions, process instances and tasks which they are authorized to see, modify and delete.<br />
<br />
<h4>
Example</h4>
<br />
If the demo user <em>mary</em> logs into the Camunda tasklist, she is not authorized to start the invoice process. As a result, she does not see the process in the list of processes she can start:<br />
{{< figure src="http://3.bp.blogspot.com/-a0Le86p0Jv4/VTnXx2FCyRI/AAAAAAAAB2o/QKXJ17Spgao/s1600/cockpit-no-auth.png" >}}
Next, we create the necessary authorization for Mary. We authorize her to READ the Process Definition invoice and to CREATE_INSTANCE of the Process Definition invoice.<br />
{{< figure src="http://1.bp.blogspot.com/-sxWlaZLC9kM/VTnXxy1BGRI/AAAAAAAAB2c/QHzKLBfOvFc/s1600/admin-auth.png" >}}
&nbsp; As a result, she can now see the Process Definition "invoice and start a new process instance:<br />
{{< figure src="http://2.bp.blogspot.com/-BaPbYQ1KLcA/VTnXx8I4M3I/AAAAAAAAB2k/E86OYLrq8RQ/s1600/tasklist-auth.png" >}}
<br />
All of this is available at a Java API and REST API level as well.<br />
<br />
In this alpha release, the authorization framework is still missing some pieces:<br />
<br />
<ul>
<li>Variable Access</li>
<li>Repsitory Service Access</li>
<li>History</li>
</ul>
<div>
This will be completed before we release the 7.3.0 Final release.</div>
<div>
<br /></div>
<div>
We believe this is a big step for Camunda as it will allow users to deploy the Rest API and web applications in the could and other untrusted networks and restrict access to resources on a per user or group level.</div>

</div>