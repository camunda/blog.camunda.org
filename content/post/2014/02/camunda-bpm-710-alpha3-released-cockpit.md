---
title: "camunda BPM 7.1.0-alpha3 released - Cockpit, BPMN Model Api and Task Operation Log"
date: "2014-02-20"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/02/camunda-bpm-710-alpha3-released-cockpit.html"

---

<div>
Today we release the next alpha version of camunda BPM. The highlights of this release are:<br />
<ul>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#bpmn-model-api">Bpmn Model API</a></li>
<li>Task Operation Log</li>
<li><a href="https://jira.camunda.com/browse/CAM-1182">Edit group Identity Links</a> in&nbsp;cockpit monitoring web application</li>
<li>Cockpit usability improvements (Browser History, Icons)</li>
<li><a href="https://github.com/camunda/camunda-bpm-examples">Consolidated Examples Repository</a></li>
</ul>
<div>
On top of this we introduced new features into the cockpit monitoring web application which are reserved for enterprise subscription customers only:</div>
<ul>
<li>Diagram View for Historic Process Instances</li>
<li>Audit Log for Historic Process Instances</li>
<li>Advanced Querying Features for Historic Process Instances</li>
</ul>
<br />
<div>
<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13193">View the complete Relese Notes in Jira.</a></div>
<div>
<br /></div>
<div>
<b><a href="http://camunda.org/download/">Download camunda BPM alpha 3 now</a></b> and Give us Feedback via&nbsp;<a href="https://twitter.com/camundaBPM">@camundaBPM</a> and in the <a href="http://camunda.org/community/forum.html">Forums</a>.<br />
<br />
<a name='more'></a></div>
<h3>
Bpmn Model Api integration with Process Engine</h3>
<div>
The <a href="http://docs.camunda.org/latest/guides/user-guide/#bpmn-model-api">BPMN Model API</a> allows you to read, update and create BPMN 2.0 compliant process models using a high level Java API. The API itself lives inside a separate <a href="https://github.com/camunda/camunda-bpmn-model">repository on Gihub</a>&nbsp;so that it can be used independently from camunda BPM.</div>
<div>
<br /></div>
<div>
In this release we integrate it into camunda BPM distributions giving you convenient access to the process model at runtime.<br />
<br />
First, you can access the model for all processes deployed to the process engine using the Repository Service:<br />
<br />
<script src="https://gist.github.com/meyerdan/9112096.js"></script>
</div>
<div>
You can also get your hands on the current FlowElement or Usertask from a JavaDeleagte, ExecutionListener or TaskListener implementation:<br />
<br />
<script src="https://gist.github.com/meyerdan/9112186.js"></script>
</div>
<div>
<a href="https://github.com/menski">Sebastian Menski</a>&nbsp;who is largely responsible for the BPMN model api implementation also&nbsp;added a fluent builder API which makes it easy to create a new BPMN process (or edit an existing process) using in only a few lines of code:
<br />
<script src="https://gist.github.com/meyerdan/9112021.js"></script>
</div>
<h3>
Task Operation Log</h3>
Thanks to <a href="https://github.com/dgf">Danny Gräf</a>, the process engine now logs operations performed on tasks at history level full. This allows you to inspect which user created, delegated, completed ... a Task:<br />
<br />
<script src="https://gist.github.com/meyerdan/9112468.js"></script>

This is a feature request that many of our customers requested. We plan on adding this feature to the cockpit monitoring application as well.
<br />
<h3>
New enterprise Features in cockpit</h3>
<div>
<a href="https://github.com/romansmirnov">Roman Smirnov</a> and <a href="https://github.com/zeropaper">Valentin Vago</a>&nbsp;added a couple of enterprise only features to camunda cockpit:</div>
<div>
<br /></div>
<div>
Advanced querying for Historic Process Instances:<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-mQbYbcMbGV8/UwYMJfYEESI/AAAAAAAAAUY/RmEEbcQAyuQ/s1600/filters-1.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
An activity audit log:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
{{< figure src="http://2.bp.blogspot.com/-pHgy7CNfAgM/UwYMObgKR4I/AAAAAAAAAUg/4Fxp-OFPFEs/s1600/history-1.png" >}}
<br />
Which can be filtered using the hierarchical activity instance tree:<br />
{{< figure src="http://3.bp.blogspot.com/-38D08Wledho/UwYMafWPwuI/AAAAAAAAAUo/5daA-1rxAvw/s1600/history-2.png" >}}
<br /></div>
<div>
<br /></div>
<h3>
What else is going on?</h3>
<div>
<a href="http://network.camunda.org/meetings/28">Join us at the camunda BPM birthday party in Berlin on March 18th!</a><br />
<br />
We announced the launch of our new open source project <a href="http://bpmn.io/">bpmn.io</a>.<br />
<br />
There has been some awesome progress in some of our <a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-community-extensions">community maintained extensions</a>:<br />
<br />
<a href="https://github.com/camunda/camunda-bpm-platform-osgi" style="box-sizing: border-box; color: #428bca; text-decoration: none;">OSGi Integration</a><br />
<a href="https://github.com/rbraeunlich">Ronny Bräunlich</a> did some great work on the testsuite and got a contribution of <a href="https://github.com/camunda/camunda-bpm-platform-osgi/tree/master/camunda-bpm-karaf-commands">apache karaf commands</a><br />
<br />
<a href="https://github.com/camunda/camunda-bpm-assert" style="box-sizing: border-box; color: #428bca; text-decoration: none;">AssertJ Testing Library</a><br />
Great progress in fluent assertion library maintained by <a href="https://github.com/martinschimak">Martin Schimak</a>. You definitely have to check out this project!!!<br />
<br />
<a href="https://github.com/camunda/camunda-bpm-needle" style="box-sizing: border-box; color: #428bca; text-decoration: none;">Needle Testing Library</a><br />
<a href="https://github.com/jangalinski">Jan Galinski</a> added features and documentation.</div>
<div>
<br />
<br />
<br />
<br />
<br /></div>
</div>