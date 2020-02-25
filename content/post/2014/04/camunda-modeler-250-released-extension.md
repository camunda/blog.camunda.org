---
title: "camunda Modeler 2.5.0 released: Extension elements, properties panel and bug fixes"
date: "2014-04-04"
author: "Michael Schöttes"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2014/04/camunda-modeler-250-released-extension.html"

---

<div>
<div dir="ltr" style="text-align: left;" trbidi="on">
<br />
The camunda BPM team is pleased to announce the release of camunda Modeler 2.5.0. This release is dedicated to align the latest improvements of camunda BPM 7.1 with the modelers properties panel. Furthermore we implemented a new properties tab for extension elements and of course we fixed bugs.<br />
<div>
<br /></div>
<div>
Find a complete list of issues solved in this release in <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13191">JIRA</a>.</div>
<div>
<br /></div>
<div>
<div class="MsoNormal">
<span lang="EN-US">This release
covers Eclipse <a href="http://camunda.org/release/camunda-modeler/update-sites/kepler/latest/site/">Kepler</a> and <a href="http://camunda.org/release/camunda-modeler/update-sites/latest/site/">Juno/Indigo</a> as well as the <a href="http://camunda.org/bpmn/tool/">camunda ModelerStandalone</a>.<o:p></o:p></span></div>
<div class="MsoNormal">
</div>
<a name='more'></a></div>
<div>
The new features where mainly developed by <a href="http://camunda.org/community/team.html#kristin-details">Kristin</a>! Furthermore <a href="http://camunda.org/community/team.html#roman-details">Roman</a> did some great bugfixes.<br />
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<b>Properties Panel</b></div>
<div class="MsoNormal">
<span lang="EN-US">We aligned the elements of the properties panel with the latest engine features released with camunda BPM 7.1.</span></div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US"><b>Follow Up Date</b></span></div>
<div class="MsoNormal">
<span lang="EN-US">According to <a href="https://jira.camunda.com/browse/CAM-1654">CAM-1654</a>&nbsp;you can define a follow up date for User Tasks. Find more information in our <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-user-task-follow-up-date">docs</a>.</span></div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US"><b>Receive Task message handling</b></span></div>
<div class="MsoNormal">
<span lang="EN-US">Similar to the Catching Message Event you can add messages for Receive Task via the properties panel. This is according to the engines correlateMessage() method.</span></div>
<div class="MsoNormal">
</div>
<div>
<br /></div>
<br />
<div class="MsoNormal">
<span lang="EN-US"><b>Extension Elements</b></span></div>
<div class="MsoNormal">
<span lang="EN-US"></span></div>
<div class="MsoNormal">
<span lang="EN-US">Add
extension elements to all BPMN elements via the new Extensions tab. Find more
information about extension elements in our <a href="http://docs.camunda.org/latest/guides/user-guide/#bpmn-model-api-extension-elements">docs</a>. Furthermore check out the
<a href="https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/bpmn-parse-listener">BPMN Parse Listener example</a> build by <a href="http://camunda.org/community/team.html#kristin-details">Kristin</a>.&nbsp;<o:p></o:p></span></div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US"><b>Exclusive Flag</b></span></div>
<div class="MsoNormal">
<span lang="EN-US">In the course of this release we implemented the Exclusive checkbox to determine whether a job will be performed at the same time as another exclusive job from the same process instance. Find detailed information in our <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor-exclusive-jobs">docs</a>.</span></div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US"><a href="http://camunda.org/download/modeler/">T<span style="font-family: Times New Roman, Times, FreeSerif, serif;"><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">ry out the new modeler</span></span></a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;and tell us what you think via&nbsp;</span><a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">our forums</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;or&nbsp;on&nbsp;</span><a href="https://twitter.com/camundaBPM" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">twitter</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">.</span></span></div>
</div>
</div>
</div>