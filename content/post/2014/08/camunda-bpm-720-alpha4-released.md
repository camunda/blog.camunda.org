---
title: "camunda BPM 7.2.0-alpha4 released: CMMN Listener, Tasklist, Spin, Connect"
date: "2014-08-07"
author: "Sebastian Menski"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/08/camunda-bpm-720-alpha4-released.html"

---

<div>
Today we release the next alpha release of camunda BPM platform. The highlights of this release are:<br />
<br />
<ul>
<li>CMMN Listener support</li>
<li>Embedded Forms in Tasklist &nbsp;</li>
<li>JSON support in Spin</li>
<li>JSON to Java mapping with Spin</li>
<li>Simple REST HTTP Connector</li>
</ul>
<div>
See <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13490" target="_blank">complete release notes in Jira.</a></div>
<div>
<br /></div>
<div style="text-align: center;">
<a href="http://camunda.org/download" target="_blank">Download camunda BPM 7.2.0-alpha4 now.</a></div>
<br />
<br />
<a name='more'></a><h3>
Add Listeners to your CMMN Case Definitions</h3>
As the CMMN support of our platform steadily increases we started to add features known from our BPMN implementation. With this alpha release you can add <i>camunda:caseExecutionListener</i> to plan items and <i>camunda:taskListener</i> to human tasks:<br />
<br />
<script src="https://gist.github.com/menski/aaa98ff2c2f8b2bd5df0.js"></script>

<br />
Case execution listener can be added for the following state transitions: close, complete, create, disable, enable, exit, manualStart, occur, parentResume, parentSuspend, parentTerminate, reactivate, reenable, resume, start, suspend and terminate. Task listener on human tasks are triggered for the following events: assignment, complete, create and delete. Case execution listeners and task listeners on human task which do not specify a event will be triggered on <i>all</i> previous listed events.<br />
<br />
The CMMN Listeners support all features of our BPMN Listeners like field injection or script execution.<br />
<h3>
Embedded forms in Tasklist</h3>
<div>
After a refactoring of our front end projects and infrastructure finally new features are arriving in the tasklist. Embedded forms of processes and tasks are now visible in the tasklist. There were some major changes to the forms SDK which will improve the performance and the variable handling of your forms. For a sneak peak of the new features see the <a href="https://github.com/camunda/camunda-bpm-sdk-js/blob/master/doc/embedded-forms/index.md" target="_blank">docs</a> of the camunda-bpm-sdk-js. Also tasks can now be assigned from the task list and are correctly displayed by the available filters.<br />
<br /></div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-u3j7khqcIg0/U-NMC4tf55I/AAAAAAAAADk/Ojptzi3SAT0/s1600/2014-08-07-115043_1015x756_scrot.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-u3j7khqcIg0/U-NMC4tf55I/AAAAAAAAADk/Ojptzi3SAT0/s1600/2014-08-07-115043_1015x756_scrot.png" height="476" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Filtered tasklist with an embedded form. The assignee can be changed directly from the tasklist.</td></tr>
</tbody></table>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<h3>
camunda Spin JSON support</h3>
<div>
It is now possible to read, modify and write JSON with camunda Spin. For more information on all features please see the <a href="http://docs.camunda.org/latest/api-references/spin/" target="_blank">documentation</a>.</div>
<br />
<script src="https://gist.github.com/menski/3f2a3eb75a6d843075a5.js"></script>

Besides the manipulation of JSON it is also possible to map Java Objects to their JSON representation and vice versa. This feature will be used by the process engine to improve the serialization of Java Objects inside a process instance. It is already implemented in the core of the engine but not yet available from the public API.<br />
<br />
<h3>
Accessing REST APIs with camunda Connect</h3>
<div>
<div style="text-align: left;">
With the new camunda Connect REST HTTP Connector we provide a low level connector to access REST APIs from a BPMN process. A simple example process which demonstrates the new connector in combination with variable mappings and script execution can be found in our <a href="https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/rest-service" target="_blank">examples repository</a>.</div>
</div>

</div>