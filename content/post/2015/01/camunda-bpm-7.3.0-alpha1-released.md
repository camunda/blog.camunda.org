---
title: "Camunda BPM 7.3.0-alpha1 released"
date: "2015-01-27"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/01/camunda-BPM-7.3.0-alpha1-released.html"

---

<div>
The first alpha release in the 7.3 branch is ready! This is what's inside:<br />
<br />
<ul>
<li><b>New Documentation</b></li>
<ul>
<li>Case Management Getting Started Tutorial (<a href="http://docs.camunda.org/latest/guides/getting-started-guides/cmmn/">Docs</a>)</li>
<li>Multi Tenancy (<a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-architecture-overview-multi-tenancy-model">Docs</a>)</li>
</ul>
<li><b>Process Engine</b></li>
<ul>
<li>Features</li>
<ul>
<li>Namespaces in XPath (<a href="https://jira.camunda.com/browse/CAM-2342">CAM-2342</a>)</li>
<li>Typed Variable API in CDI Module (<a href="https://jira.camunda.com/browse/CAM-3152">CAM-3152</a>, contribution by Michael Scholz)</li>
<li>Support for CMMN Manual Activation Rule (<a href="https://jira.camunda.com/browse/CAM-3169">CAM-3169</a>)&nbsp;</li>
<li>Use BPMN Call Activity for starting a CMMN Case Instance (<a href="https://jira.camunda.com/browse/CAM-3353">CAM-3353</a>)</li>
</ul>
<li>Bugfixes</li>
<ul>
<li>Multi Instance (<a href="https://jira.camunda.com/browse/CAM-986">CAM-986</a>,&nbsp;contribution by Ronny Bräunlich)</li>
<li>Variable Serialization (<a href="https://jira.camunda.com/browse/CAM-3167">CAM-3167</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-3174">CAM-3174</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-3176">CAM-3176</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-3179">CAM-3179</a>)</li>
</ul>
</ul>
<li><b>Cockpit</b></li>
<ul>
<li>Maintenance</li>
<ul>
<li>Upgrade to Bootstrap 3 (<span style="color: red;">See "Known Issues" below</span>)</li>
<li>Switched from Angular UI to Angular Bootstrap&nbsp;(<span style="color: red;">See "Known Issues" below</span>)</li>
<li>Support for&nbsp;requirejs-angular-define deprecated</li>
</ul>
<li>Features</li>
<ul>
<li>Improved startup time: All Javascript resources are now minified (including plugins)</li>
<li>Advanced Process Instance Search (<a href="https://jira.camunda.com/browse/CAM-2697">CAM-2697</a>, enterprise edition only)</li>
</ul>
</ul>
<li><b>Camunda Tasklist</b></li>
<ul>
<li>Features</li>
<ul>
<li>Create a standalone task</li>
<li>Support custom libraries providing custom angular controllers and other components. (<a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist-customizing-custom-scripts">Docs</a>)</li>
<li>Support for plugins (<a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist-plugins">Docs</a>)</li>
</ul>
</ul>
</ul>
<div>
All together, 75 issues were closed.&nbsp;<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13506">Read the complete release notes in JIRA</a>.</div>
<div>
<br /></div>
<div>
Camunda BPM is open source and can be downloaded from <a href="http://camunda.org/download/#latest">http://camunda.org/download/#latest</a>.</div>
<div>
<a name='more'></a><h3>
Process Engine Bug Fixes</h3>
<div>
From the perspective of the process engine, this release is primarily a bugfix release with some minor new features mostly in the case management support. Community users running the process engine in production might consider upgrading to this release.</div>
<div>
Enterprise subscription customers have already received these bug fixes backported to the 7.2 branch (or 7.1 if applicable) through their enterprise subscription.</div>
<h3>
Camunda Cockpit Known Issues</h3>
</div>
<div>
We started to upgrade some of the frontend frameworks we use in Cockpit. This includes the upgrade from Bootstrap 2 to Bootstrap 3 as well as the switch from Angular UI to Angular Bootstrap.</div>
{{< figure src="http://1.bp.blogspot.com/-TF05a1x4tK0/VMeVRnuJO7I/AAAAAAAABKE/7GjQGjmliQ4/s1600/cockpit-bootstrap3.png" >}}
<div>
<br /></div>
<div>
As a result of this upgrade, the cockpit application currently has some known issues:</div>
<div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US"><a href="https://jira.camunda.com/browse/CAM-3369">CAM-3369</a>,&nbsp;</span><a href="https://jira.camunda.com/browse/CAM-3370">CAM-3370</a>, <a href="https://jira.camunda.com/browse/CAM-3372">CAM-3372</a>, <a href="https://jira.camunda.com/browse/CAM-3373">CAM-3373</a>, <a href="https://jira.camunda.com/browse/CAM-3378">CAM-3378</a>, <a href="https://jira.camunda.com/browse/CAM-3379">CAM-3379</a>.</div>
<div class="MsoNormal">
<br /></div>
</div>
<div>
But don't worry, Valentin is busy fixing them!</div>
{{< figure src="http://3.bp.blogspot.com/-38MJYsSfLTo/VMeTYkh63sI/AAAAAAAABJ0/wR2QDFV-ieA/s1600/IMG_20150127_143135897.jpg" >}}
<h3 style="clear: both; text-align: left;">
Minification</h3>
<div class="separator" style="clear: both; text-align: left;">
We also finally added minification for cockpit:</div>
<div class="separator" style="clear: both; text-align: left;">
Before: 222 Requests, 2.5 MB transferred</div>
After: 18 Requests, 1.0 MB transferred<br />
<div>
<br /></div>
<div>
This should make cockpit better suited for Web / Cloud deployments</div>
<div>
<br /></div>
</div>