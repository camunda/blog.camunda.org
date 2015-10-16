---
title: "Getting Started: CMMN and Camunda"
date: "2014-12-17"
author: "Thorben Lindhauer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/12/getting-started-cmmn-and-camunda.html"

---

<div>
With <a href="http://blog.camunda.org/2014/11/camunda-BPM-7.2.0-Final-released.html">Camunda BPM 7.2</a>, we have released our very first implementation of the Case Management Model and Notation (CMMN) standard. Some people even say it is the first available CMMN implementation at all. Like BPMN, CMMN is a specification by the Object Management Group and while BPMN is a standard for modeling <i>processes</i> that are highly structured, CMMN is a standard for modeling <i>cases</i>. In contrast to processes, cases are user- and data-driven and typically are much less pre-defined in terms of execution order and required tasks.
<br><br>

<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-EI5ZO559M6w/VJGqej8ZBWI/AAAAAAAAAAU/xX9R9LYE4ec/s1600/cmmn-complete.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-EI5ZO559M6w/VJGqej8ZBWI/AAAAAAAAAAU/xX9R9LYE4ec/s320/cmmn-complete.png" /></a></div>
<br><br>

With 7.2, it is now possible to deploy CMMN models to the engine, and interact with case instances via a rich Java and REST API. For human tasks, camunda Tasklist can be used just like it can be used for BPMN user tasks. To walk you through the development of your first CMMN application, we have compiled a <a href="http://docs.camunda.org/7.2/guides/getting-started-guides/cmmn/">getting started guide</a>. It guides you through the following:

<ul>
<li> Creating a CMMN model</li>
<li> Deploying the model to Camunda BPM </li>
<li> Using camunda Tasklist to work on human tasks </li>
<li> Specifying and implementing new CMMN constructs like sentries and milestones </li>
</ul>

So now:

<div class="separator" style="clear: both; text-align: center;"><a href="http://docs.camunda.org/7.2/guides/getting-started-guides/cmmn/" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-4tQMfdNTJtQ/VJGtSkMmscI/AAAAAAAAAAs/QXmqM6WqTQo/s200/blogpost-cmmn.png" /></a></div>
</div>