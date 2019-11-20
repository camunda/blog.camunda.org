---
title: "camunda BPM 7.1.0-alpha2 released"
date: "2014-01-31"
author: "Roman Smirnov"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/01/camunda-bpm-710-alpha2-released.html"

---

<div>
<span style="background-color: transparent;">It was a hard time of two months without a new camunda BPM release, but the waiting came to an end today. We are happy to announce the first release of 2014: <a href="http://camunda.org/download/">camunda BPM 7.1.0-alpha2</a>.</span>&nbsp;The highlights of this release are:<br />
<br />
<ul>
<li>engine:</li>
<ul>
<li>enhance PVM Atomic Operation and Graph Model to provide facility for an activity to cancel a scope or be executed concurrently to activities in the same scope. This refactoring has the following positive effects:</li>
<ul>
<li>write History for Boundary Events, Intermediate Catch Events following an Event Based Gateway</li>
<li>Execution Listeners on cancel scope / concurrent activities now work proper</li>
<li>and fixed a lot of further bugs</li>
</ul>
<li>a Receive Task with a message reference can be triggered like an ordinary event (<a href="http://docs.camunda.org/api-references/bpmn20/#tasks-receive-task">docs</a>)</li>
<li>query after Historic Activity Statistics</li>
</ul>
<li>cockpit:</li>
<ul>
<li>use grunt to build client sides assets, manage client sides dependencies and fetch them (<a href="https://github.com/camunda/camunda-bpm-platform/tree/master/webapps/h2-webapp">github-docs</a>)</li>
<li>show suspended Job Definitions on the process diagram</li>
<li>add a view switcher to be able to write an own process definition or instance view as a plugin</li>
<li>implement a new process definition view as a enterprise plugin to show historic process instances data</li>
</ul>
<li>performance test suite (<a href="https://github.com/camunda/camunda-bpm-platform/tree/master/qa/performance-tests-engine#the-process-engine-performance-test-suite">github</a>)</li>
<li>enterprise support for Oracle WebLogic 12c, jBoss EAP 6.1 and 6.2</li>
<li>some contributions from <a href="https://github.com/clintmanning">Clint</a>&nbsp;and <a href="https://github.com/sm32550">Markus</a></li>
</ul>
<div>
In total, about 90 Issues have been closed during the last two months. For further details have look into the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13190">Release Notes</a>&nbsp;and finally</div>
<div>
<br /></div>
<div>
<a href="http://camunda.org/download/">Download camunda BPM 7.1.0-alpha2!</a></div>
<div>
<br />
<a name='more'></a></div>
<h3>
camunda BPMN model API</h3>
<div>
Another big thing is the <a href="https://github.com/camunda/camunda-bpmn-model">camunda BPMN model API</a> to parse, create and edit BPMN 2.0 XML files. The BPMN model API has been implemented by <a href="https://github.com/menski">Sebastian</a>&nbsp;and the <a href="https://github.com/camunda/camunda-bpmn-model">repository</a> is accessible since today! A seperate blog post is followed in short.</div>
<h3>
ASCII-driven-programming</h3>
<div>
We had a lot of discussions about how to provide the possibility for an activity to cancel a scope or be executed concurrently to activities in the same scope as native PVM Atomic Operations. In the course of the discussion we drew a lot of graphs for different cases (ie. interrupting and non-interrupting boundary events and interrupting and non-interrupting event sub processes) and discussed how the graphs should be tranformed to support the behavior native. As a result we drew some "nice" ASCII pictures in the source code to describe how the source graph should be transformed to achieve the desired behavior.</div>
{{< figure src="http://2.bp.blogspot.com/-5Z8SSVbdt4c/Uuup4HOy6iI/AAAAAAAAADc/236DQ0mEUZs/s1600/ascii.png" >}}
<div>
You are welcome to have a closer look at it and give us some feedback ;)</div>
<div>
<br /></div>
<h3>
Define your own view in cockpit</h3>
<div>
It is now possible to define your own views on process definitions and process instances in cockpit.</div>
{{< figure src="http://4.bp.blogspot.com/-l45rb2u-v9k/UuuvFhPyZLI/AAAAAAAAADo/eipNYdddj00/s1600/view-switcher.png" >}}
<div>
<br /></div>
<div>
We used this new mechanism to implement an enterprise plugin containing a view which is based on historic process data, that includes finished process instances too.</div>
{{< figure src="http://2.bp.blogspot.com/-pYbqn6SP58c/Uuuwf4MZE2I/AAAAAAAAADw/PWkus2tYGQA/s1600/cockpit-history.png" >}}
<div>
Learn <a href="http://docs.camunda.org/latest/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin">here</a> how to develop a cockpit plugin and implement your own view.</div>
<div>
<br /></div>
<h3>
What's next?</h3>
<div>
The following weeks we will continue the work on the following topics: standalone eclipse modeler, monitoring of processes based on historic data in cockpit, non-interrupting message event subprocesses, audit trail of task etc. In three or four weeks we will release the next alpha version of camunda BPM 7.1.</div>
<div>
<br /></div>
<div>
Until then try and test the current release of <a href="http://www.camunda.org/download/">camunda BPM</a>&nbsp;and give us feedback!</div>
<div>
<br /></div>
<div>
<a href="http://camunda.com/about/jobs/">We are hiring!</a></div>
</div>