---
title: "camunda BPM 7.2.0-alpha2 released"
date: "2014-06-12"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/06/camunda-bpm-720-alpha2-released.html"

---

<div>
Today we announce the next alpha release of camunda BPM platform.

The highlights of this release are:

<ul>
<li>Deploy and instantiate CMMN Case Definitions,</li>
<li>New Tasklist Skeleton</li>
<li>I/O Mappings for BPMN 2.0 Activities and Events</li>
<li>Xml Data processing in Java, Expression Language and Script Languages</li>
<li>Simple SOAP Http Connector</li>
</ul>
<div>
See <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13296">complete release notes in Jira</a>.</div>
<div>

</div>
<div style="text-align: center;">
<a href="http://camunda.org/download">Download camunda BPM 7.2.0-alpha2 now.</a></div>

<a name='more'></a>

<h3>
Deploy and instantiate CMMN Case Definitions</h3>
We are making good progress on CMMN support in the process engine. CMMN is an emerging OMG standard for Case Management. It is now possible to deploy and instantiate a CMMN Case Definition using both Java and REST Api:

<div class="embedded-gist">
<script src="https://gist.github.com/meyerdan/bbf2e20be953bd311101.js"></script>
</div>
More examples can be found on <a href="https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/test/java/org/camunda/bpm/engine/test/examples/cmmn/CaseTest.java">Github</a>.

In the next release we will provide support for CMMN human tasks, manual activation completing cases and tasks and maybe more.

<h3>
New Tasklist Skeleton</h3>
The new release contains a very early preview version of the upcoming tasklist application.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-DW1MwOBtG7k/U5mxIor63OI/AAAAAAAAAbE/pibg3VaE2GQ/s1600/tasklist-dev-screenshot.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-DW1MwOBtG7k/U5mxIor63OI/AAAAAAAAAbE/pibg3VaE2GQ/s1600/tasklist-dev-screenshot.png" height="174" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Skeleton of new tasklist</td></tr>
</tbody></table>


The tasklist-ui is now developed in a separate <a href="https://github.com/camunda/camunda-tasklist-ui">git repository</a>.

<div class="separator" style="clear: both; text-align: center;">
</div>


<h3>
I/O Mapping in Process Engine</h3>
The process engine now provides support for input output mappings for Tasks, Events and Subprocesses. Input Output mappings can be used for creating variables in a local scope or mapping variables out of a local scope:

<div class="embedded-gist">
<script src="https://gist.github.com/meyerdan/c3d85082a0c8e88ff6d5.js"></script>
</div>
<h3>
Xml in Expression Language</h3>
<div>
camunda BPM now provides out of the box support for working with complex data objects in expression language. In alpha-2, support is limited to Xml, other formats like Json are planned. In alpha-2 you can access attributes and child elements of Xml data objects and it is possible to execute XPath queries. This makes is easier to work with Xml data in expression language without having to to map it to Java Objects:</div>
<div class="embedded-gist">
<script src="https://gist.github.com/meyerdan/7fd0321d9af7f2aa136d.js"></script></div>
<div>
Support for this is provided through <a href="https://github.com/camunda/camunda-spin">camunda Spin</a>, a small library providing lightweight wrappers around existing low-level Apis and parsers (such as Dom).</div>
<div>
Spin can also be used from Java Delegate implementations (obviously) and JVM scripting languages.</div>
<div>

</div>
<div>
On top of directly using Spin in El expressions or script code, we plan on using it as data transformation provider for the process engine. This will be usecases around requesting different data representations for a variable (Java Object vs. mapped JSON Representation) and many more.</div>
<h3>
Connecting Soap Webservices</h3>
<div>
Alpha 2 also provides a buit-in, low level webservice connector which allows you to invoke SOAP-based webservices directly from BPMN Xml. There is a <a href="https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-service">preliminary usage example</a>. The connector implementation is provided in the <a href="https://github.com/camunda/camunda-connect">camunda Connect</a> github repository.</div>

</div>