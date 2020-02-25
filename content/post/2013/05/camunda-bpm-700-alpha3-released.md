---
title: "camunda BPM 7.0.0-alpha3 released"
date: "2013-05-03"
author: "Thorben Lindhauer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/05/camunda-bpm-700-alpha3-released.html"

---

<div>
<p><a href="http://www.camunda.org/download/">camunda BPM 7.0.0-alpha3</a> is out now! It packs a bunch of new features such as support for Spring Process Applications and correlation via the engine's Java API.</p>
<p>
First things first: Get it <a href="http://www.camunda.org/download/">here</a>!
</p>
<h3>Spring Process Applications</h3>
<p>
Use process engines, container-managed or embedded, from within your Spring application context (on Tomcat, Glassfish). See below an example from our <a href="http://docs.camunda.org/latest/guides/getting-started-guides/spring-framework/">getting started guide</a>:
</p>
<script src="https://gist.github.com/ThorbenLindhauer/5509274.js"></script>

<h3>Message correlation</h3>
<p>
BPMN offers two incoming message constructs that are supported by the engine: Message start events and intermediate catching message events. Now you have the possibility to deliver messages in one call. 
</p>
<p>
Use the RuntimeService#correlateMessage methods to correlate messages to executions waiting for a specific message or start a new process instance. You do not need to know any longer, whether you deliver the message for a start or intermediate event. Correlation is done based on process instance variables and business keys. Our <a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-message-events">documentation on message events</a> gives some details.
</p>
<p>
Shortly, we will also offer this through the REST API and publish a more detailed blog post covering this topic.
</p>
<h3>What else?</h3>
<p>
<p>
A number of bug fixes. Check our <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=12790">release notes</a> to see what ships in alpha3.
</p>
</div>