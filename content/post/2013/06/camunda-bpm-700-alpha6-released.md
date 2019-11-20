---
title: "camunda BPM 7.0.0-alpha6 released"
date: "2013-06-14"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/06/camunda-bpm-700-alpha6-released.html"

---

<div>
<div>
<br /></div>
<div>
Today we announce the <a href="http://www.camunda.org/download/">release of camunda BPM 7.0.0-alpha6</a>. In this release we focused on visualizing process instance state on top of a rendered diagram in cockpit. We added the following features:&nbsp;</div>
<div>
<ul>
<li>Process Instance Detail view in cockpit visualizing active activity instances with count</li>
<li>Updated process definition view to include failed jobs from subprocess instances</li>
<li>Greatly improved <a href="https://github.com/camunda/camunda-bpmn.js">Javascript BPMN 2.0 Renderer</a> (now feature complete)</li>
<li>Added persistent Activity Instance tree in process engine</li>
<li><a href="http://docs.camunda.org/latest/api-references/rest/#execution-get-message-event-subscription">Event Subscription Query is exposed in REST and Java API</a></li>
</ul>
<div>
41 issues were closed. See the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12893">complete release notes in Jira</a>.&nbsp;</div>
<div>
<a name='more'></a></div>
<h3>
Process Instance Detail View in Cockpit</h3>
</div>
<div>
In cockpit we started work on the process instance detail view. This view will allow you to drill down into a single process instance and explore it's running and completed activities as well as the variables, tasks, jobs... &nbsp;associated. To open the process instance detail view, you can select a process definition on the start page (dashboard), navigate the the process definition page and select a process instance from the instance list.</div>
<div>
<br /></div>
{{< figure src="http://4.bp.blogspot.com/-KtTipRABJ5c/UbsRi0DQbbI/AAAAAAAAAJE/lQgx5Y9rakA/s1600/overview.png" >}}
<div>
<br /></div>
<div>
<br /></div>
<div>
In the initial increment we focused on rendering the process diagram (using our <a href="https://github.com/camunda/camunda-bpmn.js">Javascript-based BPMN renderer</a>) and visualizing the currently active activity instances on this diagram:</div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td><a href="http://3.bp.blogspot.com/-Q2jUYHFml98/UbsSI4lR16I/AAAAAAAAAJM/qHcXP-NeobQ/s1600/multiInstance.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="113" src="http://3.bp.blogspot.com/-Q2jUYHFml98/UbsSI4lR16I/AAAAAAAAAJM/qHcXP-NeobQ/s200/multiInstance.png" width="200" /></a></td></tr>
<tr><td class="tr-caption" style="font-size: 13px;">Multi Instance</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-eeSzH-DLjmQ/UbsSJvzgAZI/AAAAAAAAAJY/NK0tOfpuHrg/s1600/scoping.PNG" imageanchor="1" style="margin-left: auto; margin-right: auto; text-align: center;"><img alt="" border="0" height="150" src="http://3.bp.blogspot.com/-eeSzH-DLjmQ/UbsSJvzgAZI/AAAAAAAAAJY/NK0tOfpuHrg/s320/scoping.PNG" title="Embedded Subprocess and Scoping" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Embedded Subprocess and Scoping</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-oczqZv4ZP4c/UbsSIx5TtoI/AAAAAAAAAJU/xwJ-0ETnpgw/s1600/compensation.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="125" src="http://4.bp.blogspot.com/-oczqZv4ZP4c/UbsSIx5TtoI/AAAAAAAAAJU/xwJ-0ETnpgw/s200/compensation.png" width="200" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Compensation</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-FarP3t8mJ8M/UbsSI6MXxYI/AAAAAAAAAJQ/nyuy6jzoUFM/s1600/join.png" imageanchor="1" style="margin-left: auto; margin-right: auto; text-align: center;"><img border="0" height="147" src="http://1.bp.blogspot.com/-FarP3t8mJ8M/UbsSI6MXxYI/AAAAAAAAAJQ/nyuy6jzoUFM/s400/join.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Parallel Join</td></tr>
</tbody></table>
<h3>
How does it work?</h3>
<div>
In order to visualize these diagrams, camunda Cockpit creates two client side models:</div>
<div>
<ul>
<li><b>The process definition object model</b>: is a Javascript object model representation of the parsed BPMN 2.0 process definition XML. The model has the form of a tree structured in accordance with the BPMN 2.0 semantic process model. We merge the BPMN Diagram Interchange information into this tree.</li>
<li><b>The process instance object model</b>: is a Javascript object model representation of the current process instance state. The model has the form of a tree and is constructed from the Activity Instance Tree (new feature) retrieved from the process engine.&nbsp;</li>
</ul>
<div>
Both the process definition tree and the process instance tree have the same structure (ie. activity instances in the process instance tree are at the same level as their corresponding activity definitions in the object model.). In order to achive this, we had to make a couple of additions in the core process engine (PVM-Process Virtual Machine).&nbsp;</div>
</div>
{{< figure src="http://4.bp.blogspot.com/-V8nkTQOkxZs/UbsYqwAIRCI/AAAAAAAAAJ0/3lFh2RoXx6A/s1600/architecture.png" >}}
<h3>
Visualizing the Activity Instance Tree</h3>
<div>
We will visualize the Activity Instance tree in the process instance detail view on the left hand side:</div>
{{< figure src="http://4.bp.blogspot.com/-EeLbTkkAwPk/UbsqYY6bwGI/AAAAAAAAALc/ka0el09PyuM/s1600/Instance+Details+inkl+Tree.png" >}}
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div>
<br /></div>
<div>
See&nbsp;<a href="https://jira.camunda.com/browse/CAM-719">CAM-719</a></div>
<h3>
<a href="http://camundabpm.blogspot.de/2013/06/introducing-activity-instance-model-to.html">Read more about the activity instance tree in this follow up blog post</a>.</h3>
</div>