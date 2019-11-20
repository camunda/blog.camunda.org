---
title: "camunda BPM 7.0-alpha7 released"
date: "2013-07-04"
author: "Roman Smirnov"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/07/camunda-bpm-70-alpha7-released.html"

---

<div>
<a href="http://camunda.org/download/">camunda BPM 7.0.0-alpha7</a> is out now!<br />
<br />
The highlights of this new release are:

<br />
<ul>
<li>In Cockpit we worked on the visualization of Process Instances:</li>
<ul>
<li>Incidents of a running process instance will be shown in the corresponding rendered process diagram.</li>
<li>The former introduced <a href="http://camundabpm.blogspot.de/2013/06/introducing-activity-instance-model-to.html">Activity Instance Tree</a> will be visualized as a tree.</li>
<li>Now it is possible to select a BPMN element in the rendered process diagram or to select a activity instance wihtin the activity instance tree. If a single BPMN Element is selected, the corresponding activity instances will also be selected in the tree (and vice versa).</li>
<li>Variable instances of the process instance/activity instances will be shown in the view.</li>
</ul>
<li>In Cockpit you can switch between the configured process engines (multi-tenancy).</li>
<li>The variable instances can be selected via an introduced Java and REST Api.</li>
<li>Support of a further Bpmn 2.0 Element: Link Event.</li>
<li>New user guide for <a href="http://docs.camunda.org/latest/guides/user-guide/#cycle">Cycle</a> and <a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist">Tasklist</a>.</li>
</ul>
33 issues were closed. See the complete release notes in <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12990">Jira</a>. 
<br />
<h3>
Visualization of a Process Instance</h3>
<div>
The following screencast summarizes all in <a href="http://camunda.org/download/">this release</a> implemented features in camunda Cockpit:<br />
<br />
<br />
<br />
<iframe width="560" height="315" src="//www.youtube.com/embed/zqzXM0QBSbY" frameborder="0" allowfullscreen></iframe>
<br /></div>
<h3>
Support of multi-tenancy in camunda Cockpit</h3>
<div>
Due to the possibility to run <a href="https://app.camunda.com/confluence/display/foxUserGuide/Multi-Tenancy">multiple tenants</a>&nbsp;on the camunda BPM platform you can now switch between the configured process engines in Cockpit to get the process engine specific information.</div>
<div>
<br /></div>
{{< figure src="http://4.bp.blogspot.com/-6uLs4Ms3wc0/UdWEVcPAHKI/AAAAAAAAACo/TuLjwwy-XWk/s228/multi-tenancy.png" >}}
<div>
<br /></div>
<h3>
Variable Instance query</h3>
<div>
Now it is possible to create a variable instance query to get variables instances:</div>
<div>
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.14902); color: #333333; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code style="background-color: transparent; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 0px; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 0px;">runtimeService
  .createVariableInstanceQuery()
  .list()
</code></pre>
</div>
<div>
Furthermore, with the Java Api you are able to query after variables instances for more than one task id, process instance id, execution id and activity instance id at once. For example:<br />
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.14902); color: #333333; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 0px; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 0px;">runtimeService
  .createVariableInstanceQuery()
  .taskId("aTaskId", "anotherTaskId")
  .list</code></pre>
In the case of the example you will get all variable instances with the task id "aTaskId" and "anotherTaskId". This is also possible with the process instance ids, execution ids and activity instance ids.<br />
<br />
<b>Note:</b>&nbsp;At the moment it is not possible to select variable instance with the type 'bytes'.<br />
<br />
The variable instance query is also exposed via the <a href="http://docs.camunda.org/api-references/rest/#!/variable-instance/get-query">REST API</a>.<br />
<br />
<br />
<br />
<br /></div>
</div>