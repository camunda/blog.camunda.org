---
title: "camunda BPM 7.0.0-alpha2 released"
date: "2013-04-23"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/04/camunda-bpm-700-alpha2-released.html"

---

<div>
I am happy to announce the release of <a href="http://www.camunda.org/download/">camunda bpm platform 7.0.0-alpha2</a>. This is the first camunda BPM release that contains a distribution for Glassfish Application Server. You can now download a complete open source BPM platform with fully compliant Java EE 6 integration!<br />
<br />
<a href="http://www.camunda.org/download/">Download it now!</a><br />
<h2>
Highlights:</h2>
<div>
<ul>
<li>Glassfish 3.x Distribution with Java EE 6 process engine integration</li>
<li>New Job Executor Service with JCA 1.6 Integration</li>
<li>Job Executor manageability through JMX</li>
<li>New space for documentation:&nbsp;<a href="http://docs.camunda.org/">http://docs.camunda.org/</a>&nbsp;with new <a href="http://docs.camunda.org/guides/installation-guide/">installation&nbsp;guides</a>.</li>
</ul>
<div>
I will dedicate a&nbsp;separate&nbsp;Blogpost to showcasing the Job Executor improvements in the following days.</div>
<div>
<br /></div>
<div>
In addition, the release contains a set of small improvements and bug fixes. Read the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12590">Complete Release Notes</a>&nbsp;in JIRA.</div>
</div>
<div>
<br /></div>
<h2>
Major QA Infrastructure Improvements&nbsp;</h2>
<div>
Probably not as exciting for most people as for myself but I still think stuff like this deserves some attention :) We also made a lot of QA infrastructure improvements behind the scenes. For instance, we have made it a lot easier to run in-container (ie. inside JBoss / Glassfish / Tomcat) integration tests for both process engine and web applications.</div>
{{< figure src="http://1.bp.blogspot.com/-iOSAIkeQqH4/UXaUXGxdwBI/AAAAAAAAAGs/_f8qzuOtBHs/s1600/qa-infrastructure.png" >}}
<div>
This allows us to run extensive in-container testsuites testing the Java EE 6 and Servlet integrations against all supported runtime containers and databases.&nbsp;</div>
<h2>
What's next?</h2>
<div>
For the next release we plan:</div>
<div>
<ul>
<li><a href="https://jira.camunda.com/secure/RapidBoard.jspa?rapidView=23&amp;view=planning&amp;selectedEpic=CAM-398">Websphere distribution (enterprise customers only)</a></li>
<li><a href="https://jira.camunda.com/secure/RapidBoard.jspa?rapidView=23&amp;view=planning&amp;selectedEpic=CAM-9">Lots of additions to the REST-API</a></li>
<li><a href="https://jira.camunda.com/secure/RapidBoard.jspa?rapidView=23&amp;view=planning&amp;selectedEpic=CAM-572">camunda cockpit</a>: Nico and Roman will start working on the new cockpit plugin concept end of this week. This will lay the groundwork for future work on the cockpit tool. Cockpit will be "the big thing" for the 7.0 final release.</li>
</ul>
<div>
<a href="http://www.camunda.org/download/">Go get it!</a></div>
</div>

</div>