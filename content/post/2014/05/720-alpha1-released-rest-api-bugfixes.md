---
title: "7.2.0-alpha1 Released: Rest API, Bugfixes and Refactorings"
date: "2014-05-20"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/05/720-alpha1-released-rest-api-bugfixes.html"

---

<div>
The first alpha release of camunda BPM 7.2.0 is out. The release brings<br />
<div>
<ul>
<li>Rest API features:&nbsp;</li>
<ul>
<li><a href="https://jira.camunda.com/browse/CAM-1375">Deployments</a>, <a href="https://jira.camunda.com/browse/CAM-2134">Task Comments</a>, <a href="https://jira.camunda.com/browse/CAM-2136">Task Attachments</a>, <a href="https://jira.camunda.com/browse/CAM-2141">Task Variables</a></li>
</ul>
<li>Script Execution Improvements</li>
<ul>
<li><a href="https://jira.camunda.com/browse/CAM-2098">Caching of compiled scripts</a> (=&gt; performance improvements)</li>
<li><a href="https://jira.camunda.com/browse/CAM-1876">Variable handling for scripts</a>&nbsp;(=&gt; Jython, JRuby and JavaScript can now be used)</li>
<li>Groovy is now included in all distributions and works out of the box.</li>
</ul>
<li>Maintenance</li>
<ul>
<li><a href="https://jira.camunda.com/browse/CAM-1481">Bumped Version of Mybatis dependency to 3.2.3</a></li>
<li>Frontend library upgrades</li>
<ul>
<li>Bump version of angularjs to 1.2.16</li>
<li>Remove Bootstrap Javascript and replace with angular-ui</li>
</ul>
</ul>
<li>And many bugfixes.</li>
</ul>
<div>
<span style="font-size: large;"><span style="color: red;"><b>Known Issues</b></span><b style="color: red;">:</b></span></div>
<div>
<span style="font-size: large;">In this alpha release,&nbsp;<b>camunda Tasklist has several known issues</b>&nbsp;<span id="goog_1272215698"></span><span id="goog_1272215699"></span><a href="https://www.blogger.com/"></a>related to form handling. See:&nbsp;<a href="https://jira.camunda.com/browse/CAM-2233">CAM-2233</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-2234">CAM-2234</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-2236">CAM-2236</a>.</span></div>
<div>
<br /></div>
<div>
<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13293">See the complete Release Notes</a>.&nbsp;</div>
<div>
<br /></div>
<div>
<div style="text-align: center;">
<b><a href="http://camunda.org/download/">Download camunda BPM 7.2.0-alpha1 now.</a></b></div>
<a name='more'></a></div>
</div>
<h3>
What is going on behind the Scenes?</h3>
<div>
Behind the scenes we started work on the big new features for 7.2.0. Currently there are a lot of very interesting ideas floating around and everybody is hacking like crazy.</div>
<h3>
Case Management</h3>
<div>
In camunda BPM 7.2.0 we will add support for case management based on CMMN. <a href="http://www.omg.org/spec/CMMN/">CMMN (Case Management Model and Notation)</a> &nbsp;is an emerging standard by the OMG. We are currently bootstrapping support for CMMN in a way that it <b>will play together nicely with BPMN</b>. To achieve this we have done <a href="https://jira.camunda.com/browse/CAM-2216">some major refactorings</a>&nbsp;in order to provide a base infrastructure for both BPNN and CMMN. On top of this, Roman has already started work on the <a href="https://github.com/camunda/camunda-bpm-platform/blob/e702609b5538dd7df2439b365d8da3a91642500d/engine/src/test/java/org/camunda/bpm/engine/test/cmmn/operation/CaseInstanceTest.java">CMMN engine core</a>.</div>
<h3>
Tasklist.makeAwesome()</h3>
<div>
Yes!! We have also started work on the new tasklist application. The new tasklist will provide<b> a new super awesome UI</b>, greatly improved embedded forms (based on a standalone, embeddable SDK) and many more features such as filters, comments and attachments.</div>
<h3>
Scripting, Scripting, Scripting!</h3>
<div>
With the thriving Groovy ecosystem and the new high performance and spec compliant JVM Javascript implementation (<a href="http://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine)">Nashorn</a>), scripting starts to become a serious alternative to EJB. :) On top of that, I think that the dynamic typing and runtime compilation/ interpretation model is a very good fit in a BPM environment. So <b>expect camunda BPM to become a lot more polyglot</b> in the next months!</div>
<div>
Already in this release we have improved the support for scripting. We plan adding further improvements such as <b>external scripts</b> (putting the script source in a separate file, not in the BPMN file), &nbsp;<b>use scripts everywhere</b> (allowing scripts to be used where expressions are used now) and a testing environment.</div>
<h3>
Extended Dataformats and Query languages</h3>
<div>
We will make it very easy to work with different kinds of dataformats in your processes. We will have out of the box support for XML and JSON and the corresponding query languages (XPath and JSONPath).</div>
<h3>
An interactive BPMN Developer Webapplication</h3>
<div>
This is currently in early early alpha phase: we are prototyping the concept of an interactive developer / debugger application. The debugger lets you put breakpoints in BPMN processes, inspect the suspended executions and step / resume through the process. It also provides an interactive scripting console allowing you to evaluate scripts or expressions in the context of a suspended execution or interact with the API of the process engine. This will give you a <b>guaranteed Java- &amp; Maven-Free developer&nbsp;experience</b> if you are a script developer <b>but also plays well together with Java &amp; Maven</b> if you are into these things (like me :)).&nbsp;</div>
<div>
<br /></div>
<div>
Right now it's not much but this is what it looks like:</div>
{{< figure src="http://4.bp.blogspot.com/-tF78gNuRaf8/U3WcWRUXWUI/AAAAAAAAAak/Fitdk7Jep08/s1600/developer.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div>
(I have done the UI myself =&gt; it will look better once one of our UI guys gets to work on it :) )</div>
<div>
<br /></div>
<div>
Exciting times ahead!</div>
<div>
<br /></div>

</div>