---
title: "camunda BPM platform 7.2.0-alpha6 released"
date: "2014-11-14"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/11/camunda-bpm-720-alpha6-released.html"

---

<div>
6 weeks after the last release we release camunda BPM 7.2.0-alpha6. The release ships<br />
<br />
<ul>
<li><b>Tasklist</b></li>
<ul>
<li>Flexible layout with collapsible / expandable areas</li>
<li>Enhanced Forms Support</li>
<ul>
<li>Embedded Forms</li>
<ul>
<li>Check Box, Select box, Date Picker</li>
<li>Advanced Scripting</li>
<li>Working with JSON-Serialized Java Objects</li>
<li>Save partially filled in form to local Storage</li>
<li>AngularJS interoperability</li>
</ul>
<li>Generated Forms</li>
<li>External Forms</li>
</ul>
<li>List of Tasks</li>
<ul>
<li>Search by process / task / case variable</li>
<li>Navigate through list using Keyboard</li>
</ul>
<li>Process Diagram is displayed (with <a href="http://bpmn.io/">bpmn.io</a>)</li>
<li>Display the value of Process / Case Variables in the list of tasks</li>
<li>Support for CMMN Human Tasks</li>
<li>Bugfixes<br /></li>
</ul>
<li><b>Process Engine / REST API</b></li>
<ul>
<li>CMMN-Based Case Management</li>
<ul>
<li>History for Case Instances and Case Activity Instances</li>
<li>Sentries</li>
<li>Variable Listeners</li>
<li>Transformer Extensions</li>
</ul>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-variables-typed-value-api">New Typed Variable API</a> (<a href="https://jira.camunda.com/browse/CAM-2903">CAM-2903</a>)</li>
<ul>
<li>Work with both Serialized and De-serialized representation of Object Values</li>
<li>Specify Serialization Data Format for Objects (e.g. JSON, XML...)</li>
<li>Support Typed Null Values (e.g. 'Integer' with value null)</li>
<li>Better variable support in REST Api</li>
</ul>
<li>Improved Support for Inclusive Gateway (OR Gateway)</li>
<li>Custom History Levels (fine grained control over the amount of Data Logged, <a href="https://jira.camunda.com/browse/CAM-2724">CAM-2724</a>)</li>
<li>Job Executor Improvements</li>
<ul>
<li>First Level Cache reuse (performance boost) (<a href="https://jira.camunda.com/browse/CAM-2763">CAM-2763</a>)</li>
<li>Better Scalability and Work Distribution in clusters (<a href="https://jira.camunda.com/browse/CAM-2805">CAM-2805</a>)</li>
</ul>
<li>Improved performance of Expression Language execution (<a href="https://jira.camunda.com/browse/CAM-2725">CAM-2725</a> contribution by Jörn Horstmann, Zalado)</li>
<li>Improved HAL Support in REST Api (<a href="https://jira.camunda.com/browse/CAM-2940">CAM-2940</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-2798">CAM-2798</a>,&nbsp;</li>
<li>Upgraded Mybatis dependency to 3.2.8 (Contribution by Frank Langelage)<br /></li>
</ul>
<li>Improved integration of camunda SPIN for <a href="http://docs.camunda.org/latest/guides/user-guide/#data-formats-xml-json-other">working with XML and JSON data</a></li>
<ul>
<li>Spin is now an optional Process Engine Plugin</li>
<li>Default provider for JAX-B or Jackson based Object Serialization<br /></li>
</ul>
<li>Improved integration of camunda Connect providing HTTP and SOAP connectors</li>
<ul>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-connectors">Connect is now an optional Process Engine Plugin</a><br /></li>
</ul>
<li><a href="http://docs.camunda.org/latest/guides/installation-guide/was/#bpm-platform">Greatly improved distribution for IBM Websphere Application Server</a></li>
<ul>
<li>Resource Adapter embedded into EAR</li>
<li>Better support for Shared Libraries</li>
<li>IBM Deployment Descriptors provide default values for deployment metadata</li>
</ul>
</ul>
<div style="text-align: left;">
All in all, 217 Jira Issues were closed.&nbsp;<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13499">See the complete Release Notes in JIRA</a>.</div>
<div style="text-align: left;">
<br /></div>
<div style="text-align: center;">
<a href="http://camunda.org/download/#latest">Download camunda BPM 7.2.0-alpha6 now for free!</a></div>
<div style="text-align: center;">
<br /></div>
<div style="text-align: left;">
alpha6 is the last alpha release before the 7.2.0 final release which is due end of this month (November). It can be considered to be the "release candidate". Almost all features planned for the 7.2.0 relase are in alpha6 and we do not expect any more major API or Database changes. (No guarantees, however :) )</div>
<div>
<br /></div>
<div>
<a name='more'></a><h3>
Tasklist == Awesome!!</h3>
</div>
<div>
We made good progress on the tasklist application and you can now do some very interesting things with it. We also improved the invoice demo application so if you download alpha6 and start it up, there are some tasks automatically created for you to play around with. At this point I just want to post some impressions:&nbsp;</div>
<div>
<br /></div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="https://3.bp.blogspot.com/-X4pNcYpH0VM/VGYQ8DrwyRI/AAAAAAAAAgI/scuLOG7pyxc/s1600/tasklist1.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="346" src="https://3.bp.blogspot.com/-X4pNcYpH0VM/VGYQ8DrwyRI/AAAAAAAAAgI/scuLOG7pyxc/s640/tasklist1.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">A task with an embedded form</td></tr>
</tbody></table>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="https://1.bp.blogspot.com/-XBiWsLxhoWM/VGYQ8Ih96qI/AAAAAAAAAgQ/L4Y88Ny8s_0/s1600/tasklist2.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="376" src="https://1.bp.blogspot.com/-XBiWsLxhoWM/VGYQ8Ih96qI/AAAAAAAAAgQ/L4Y88Ny8s_0/s640/tasklist2.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">The history of a task</td></tr>
</tbody></table>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="https://4.bp.blogspot.com/-RmD5Q2cK82Q/VGYQ9A7Gc7I/AAAAAAAAAgU/m9z4LXrogL8/s1600/tasklist3.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="376" src="https://4.bp.blogspot.com/-RmD5Q2cK82Q/VGYQ9A7Gc7I/AAAAAAAAAgU/m9z4LXrogL8/s640/tasklist3.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Share a filter with users and groups</td></tr>
</tbody></table>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="https://3.bp.blogspot.com/-DGt0oYMoiyg/VGYQ9K8mOeI/AAAAAAAAAgg/wd6P4022tms/s1600/tasklist4.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="346" src="https://3.bp.blogspot.com/-DGt0oYMoiyg/VGYQ9K8mOeI/AAAAAAAAAgg/wd6P4022tms/s640/tasklist4.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">List of tasks with variable values. Variables to fetch can be defined in filter.</td></tr>
</tbody></table>
<br />
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="https://3.bp.blogspot.com/-g84WDHAQ4S4/VGYQ9e3bF1I/AAAAAAAAAgY/X2b6XpeGAC0/s1600/tasklist5.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="376" src="https://3.bp.blogspot.com/-g84WDHAQ4S4/VGYQ9e3bF1I/AAAAAAAAAgY/X2b6XpeGAC0/s640/tasklist5.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Searching for tasks based on variables<br /><br /><br /><br /><h3 style="text-align: left;">
Join our Webinar on camunda BPM 7.2.0:</h3>
<div style="text-align: left;">
There is so much more stuff in alpha6 which deserves more than a bullet point but it has been a busy couple of weeks and the guys start opening beers and I think I am going to join them. You should Jakob Freund and myself in the Webinar we are going to do where we will try to present and explain all the awesome features which are new in camunda BPM 7.2.0:</div>
<div style="text-align: left;">
<br /></div>
<div style="text-align: center;">
<b><span style="font-size: x-large;"><a href="http://camunda.com/landing/webinar-release72/">Webinar: Camunda BPM 7.2</a></span></b></div>
</td></tr>
</tbody></table>
<div style="text-align: center;">
<br /></div>
<div>
<br /></div>
<div>
<br /></div>
<div>
<br /></div>
<div>
<br /></div>

</div>