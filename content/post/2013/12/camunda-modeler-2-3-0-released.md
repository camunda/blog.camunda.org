---
title: "camunda Modeler 2.3.0 released: Custom Tasks, Form Fields and better Subprocess Modeling"
date: "2013-12-05"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2013/12/camunda-Modeler-2-3-0-released.html"

---

<div>
We are happy to announce the new release of the camunda Modeler. This version adds the ability to extend the modeler with custom tasks. Furthermore it adds editing support for form fields that were recently <a href="http://blog.camunda.org/2013/11/camunda-BPM-7.1.0-alpha1-released.html">re-introduced</a> into the camunda BPM platform. Last but not least, it improves the handling of subprocesses.
<br />
<a name='more'></a><br />
<h3>
Custom Task Plugins</h3>
<div>
Custom task plugins give you the ability to contribute self-made tasks to the camunda modeler.<br />
<br /></div>
{{< figure src="modeler-custom-task.png" caption="Quite a custom task">}}
A custom task is a task that may be reused across all of your diagrams. It can ship with a predefined configuration, can have a customized look and feel and integrates into the palette as well as the properties panel.<br />
<div>
<br /></div>
<div>
Check out our&nbsp;<a href="https://github.com/camunda/camunda-bpm-examples/tree/master/modeler/custom-task-advanced">custom task example</a>&nbsp;that show cases what is possible with custom tasks. <a href="http://docs.camunda.org/latest/real-life/how-to/#modeler">Head over</a> to the how to section if you want to build your own custom tasks right away.</div>
<div>
<br /></div>
<h3>
Form Field Editing</h3>
<div>
You are now able to edit form fields for via the property panel. Check out Daniels&nbsp;<a href="http://www.youtube.com/watch?feature=player_embedded&amp;v=VgJQ8nPzEMQ#t=358">introduction on generated forms</a>&nbsp;to get more context on the topic.</div>
<div>
<br /></div>
<h3>
Subprocess Improvements</h3>
<div>
For everyone modeling subprocesses out there, there is good news. You may now safely expand and collapse subprocesses. Internal layout of children will be retained. Import and export, work, too.</div>
<div>
<br /></div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-fSqx_qXZefc/Up9awk0m1aI/AAAAAAAAAJ0/icipOV2dV1g/s1600/collapse-subprocess.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-fSqx_qXZefc/Up9awk0m1aI/AAAAAAAAAJ0/icipOV2dV1g/s400/collapse-subprocess.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Do it</td></tr>
</tbody></table>
<br />
<div>
We fixed a number of bugs, too, including the sudden popup of error markers on BPMN 2.0 diagrams.</div>
<div>
<br /></div>
<div>
Checkout the complete list of issues <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13003">solved in this release</a>. And of course, <a href="http://camunda.org/download/modeler/">try out the new modeler</a>&nbsp;and tell us what you thing via&nbsp;<a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users">our forums</a>&nbsp;or&nbsp;on&nbsp;<a href="https://twitter.com/camundaBPM">twitter</a>.<br />
<br />
Thanks go to&nbsp;<a href="https://twitter.com/hawky4s">Christian</a>, <a href="https://twitter.com/meyerdan">Daniel </a>and <a href="https://twitter.com/_mschoe">Michael </a>for <a href="https://twitter.com/meyerdan/status/408633474992459776">getting this Release through QA</a>.</div>
</div>