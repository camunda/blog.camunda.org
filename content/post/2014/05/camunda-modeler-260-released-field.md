---
title: "camunda Modeler 2.6.0 released: Field Injection, properties panel and bug fixes"
date: "2014-05-26"
author: "Michael Schöttes"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2014/05/camunda-modeler-260-released-field.html"

---

<div>
<div dir="ltr" style="text-align: left;" trbidi="on">
The camunda BPM team is happy to announce the release of camunda Modeler 2.6.0. This release contains updates on the properties panel, a new properties tab, bpmn 2.0 alignment and bug fixes.<br />
Find a complete list of issues solved in this release in <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13192">JIRA</a>.<br />
<br />
This release covers Eclipse&nbsp;&nbsp;Eclipse&nbsp;<a href="http://camunda.org/release/camunda-modeler/update-sites/kepler/latest/site/">Kepler</a>&nbsp;and&nbsp;<a href="http://camunda.org/release/camunda-modeler/update-sites/latest/site/">Juno/Indigo</a>&nbsp;as well as the&nbsp;<a href="http://camunda.org/bpmn/tool/">camunda Modeler Standalone</a>.<br />
<a name='more'></a><br />
The new features and bug fixes where mainly developed by&nbsp;<a href="http://camunda.org/community/team.html#kristin-details">Kristin</a>!<br />
<br />
<b>Asynchronous Continuation on Parallel Gateways</b><br />
As the parallel gateway is a synchronizing gateway, it is subject to optimistic locking. The new feature allows you to use the engines JobExecutor Retry mechanism for resolving optimistic locking conflicts without impacting the preceding tasks.<br />
<br />
<b>Field Injection</b><br />
We introduced a new tab to configure field injections for the following elements: Service Task, Business Rule Task, Send Task, End Message Event and Throwing Message Event.<br />
Find more information in our <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-delegation-code-field-injection">docs</a>.<br />
<br />
<b>bpmn 2.0 alignment</b><br />
The new modeler offers you the possibility to edit expressions without the xsi:type attribute. As the modeler is focused on executable processes, we didn't support this in the past. This caused exceptions at the model import, mainly when used together with business focused design tools.<br />
<br />
<br />
Download the <a href="http://camunda.org/release/camunda-modeler/kepler/camunda-modeler-kepler-latest.zip">prepackaged modeler</a>, update your <a href="http://camunda.org/download/modeler/">Eclipse plugin</a> or check out the <a href="http://camunda.org/bpmn/tool/">standalone version</a> <b>NOW</b>! Give us feedback in our&nbsp;<a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">our forums</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;or&nbsp;on&nbsp;</span><a href="https://twitter.com/camundaBPM" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">twitter</a>.<br />
<br />
Happy modeling!!!&nbsp;</div>
</div>