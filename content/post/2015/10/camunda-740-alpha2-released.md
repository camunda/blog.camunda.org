---
title: "Camunda 7.4.0-Alpha2 released"
date: "2015-10-01"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/10/camunda-740-alpha2-released.html"

---

<div>
Today we release Camunda BPM 7.4.0-Alpha2. This is the second alpha release previewing the upcoming 7.4.0 Release.<br />
<br />
The highlights of this release are:<br />
<ul><li>Improved DMN Engine<br />
<ul><li>Hit Policies</li>
<li>Data Types</li>
</ul></li>
<li>New Cockpit Features,<br />
<ul><li>Auditing of DMN Decisions,</li>
<li>BPMN Heat Map,</li>
</ul></li>
<li>Improved BPMN Engine<br />
<ul><li>Support for BPMN Escalation</li>
<li>Improved Asynchronous Execution Efficiency</li>
<li>SLF4j Logging</li>
<li>Faster Deployments</li>
</ul></li>
<li>Improved CMMN Engine<br />
<ul><li>Add Support for Repetition Rule</li>
</ul></li>
<li>Support for Tomcat 8</li>
<li>New Documenation</li>
<li>Many Bugfixes</li>
</ul><br />
Overall more than 170 issues were closed. See <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=14194">complete Release Notes in Jira</a>.<br />
<div style="background-color: #f4f6f4; border-radius: 3px; border: 1px solid #e4e6e4; margin: 30px auto; max-width: 500px; overflow: hidden;"><h2 style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; float: left; margin: 0; padding: 15px; position: relative; text-align: center; width: 300px;"><a href="http://camunda.org/download#latest" style="display: block; font-size: 28px; line-height: 32px; text-align: center;">Download For Free</a>   </h2><h3 style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; float: right; margin: 0; padding: 15px; position: relative; text-align: center; width: 200px;"><a href="https://registry.hub.docker.com/u/camunda/camunda-bpm-platform/" style="display: block; font-size: 20px; line-height: 32px; text-align: center;">Run with Docker</a>   </h3></div><a name='more'></a><h2>DMN Auditing in Cockpit</h2><br />
Cockpit now provides a preview of the support for DMN-based Decision Auditing.<br />
<br />
The dashboard displays now all deployed decision tables. Selecting a decision table opens the Decision Definition View:<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-IKthxtJdZ74/Vgvp-IK8avI/AAAAAAAADeY/YJY6hqJcmkw/s1600/cockpit-dmn-1.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="272" src="http://4.bp.blogspot.com/-IKthxtJdZ74/Vgvp-IK8avI/AAAAAAAADeY/YJY6hqJcmkw/s400/cockpit-dmn-1.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Decision Definition View</td></tr>
</tbody></table><br />
This view displays the decision table itself and displays aggregated information of all past executions of the decision table (decision instances).<br />
Currently, only a list of all decision instances is displayed. However, much more features can be added here in the future, such as searching for decision instances,<br />
displaying aggregated information about how often each rule in the table fired, and so on.<br />
<br />
Selecting an individual decision instance opens the Decitions Instance View:<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/--3o2cYGLqIg/Vgvq72E0jZI/AAAAAAAADek/mx7WgmoX5rA/s1600/cockpit-dmn-2.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="272" src="http://3.bp.blogspot.com/--3o2cYGLqIg/Vgvq72E0jZI/AAAAAAAADek/mx7WgmoX5rA/s400/cockpit-dmn-2.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Decision Instance View</td></tr>
</tbody></table>The Decision Instance view provides information about an individual execution of the decision (table). The focus of this view is to allow users to inspect an individual decision, understanding which rules evaluated to true (and why?) and what output was produced. At the moment it is possible to inspect the input and output values of the table. This view can will be enhanced by visualizing as much information as possible inside the table itself, including highlighting of fired rules etc.<br />
<br />
<h2>BPMN Heatmap in Cockpit</h2><br />
(This feature is only available in the Enterprise Edition.)<br />
<br />
Cockpit now features a BPMN Heat Map which gives a quick overview about hot spots in a BPMN process in the blink of an eye:<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-g6DjLA6aMtM/VgvpTrpmXtI/AAAAAAAADeQ/c8_qYnnrZtg/s1600/cockpit-heatmap.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="272" src="http://4.bp.blogspot.com/-g6DjLA6aMtM/VgvpTrpmXtI/AAAAAAAADeQ/c8_qYnnrZtg/s400/cockpit-heatmap.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">BPMN Heat Map</td></tr>
</tbody></table><br />
The idea is that activities and sequence flows are colored based on the number of times they have been executed. Activities which have been executed many times are colored in a brighter color than activities which were executed fewer times. Or in other words, some activities are "hotter" than others :)<br />
<br />
How the history plugin came together is actually a nice success story for "community-driven innovation":<br />
<br />
Since quite a while, our man Jakob has been preaching about how BPMN allows intuitive visualization of statistics and data around process execution. "Even something like a heatmap, you know like the weather man uses, is easily possible", he used to say. At some point Matthias Wiedemann -at the time working for our consulting partner Opitz Consulting- actually built a <a href="https://github.com/mwiede/camunda-cockpit-plugins/tree/master/cockpit-plugin-heatmap">BPMN Heatmap as a Community maintained Cockpit Plugin</a>. The plugin was a huge success and everybody wanted to use it. But, since it was a community maintained plugin, people did not always have time to port it to the latest version of Camunda or ensure compatibility with all versions. It also had a lot of limitations around how the visualization was rendered (because it was a proof concept implemenation) and we thus decided to re-iterate on the idea, rewrite the code and add it to cockpit as an out of the box feature.<br />
<br />
<h2>Support for BPMN Escalation</h2><br />
The Camunda Engine now fully supports <a href="https://docs.camunda.org/manual/latest/reference/bpmn20/events/escalation-events/">BPMN Escalation</a>.<br />
<br />
<h2>Improved Asynchronous Execution Efficiency</h2><br />
Again, the performance and efficiency of the job executor has been improved. <a href="http://blog.camunda.org/2015/09/scaling-camunda-bpm-in-cluster-job.html">Read all about it in Thorben's Blogpost</a>.<br />
<br />
<h2>Support for CMMN Repetition Rule</h2><br />
<a href="https://docs.camunda.org/manual/latest/reference/cmmn10/markers/repetition-rule/">CMMN Repetition Rule</a> is now supported in CMMN engine. This was a much requested feature and I am very happy that we could add it in these busy DMN times :)<br />
<br />
<h2>New Documenation</h2><br />
We have completely revamped the whole <a href="http://docs.camunda.org/manual/latest">documentation</a>, improving content, structure and the layout.<br />
<br />
<h2>What's up next?</h2><br />
<ul><li>DMN, DMN, DMN, ... :)</li>
<li>Process Engine Runtime Repository View in Cockpit,</li>
<li>Support for reactive Service Task Workers,</li>
<li>As always, amazing things are happening in <a href="http://bpmn.io/">bpmn.io</a>,</li>
<li>...</li>
</ul>
</div>