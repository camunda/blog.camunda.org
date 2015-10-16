---
title: "Process Test Coverage Report"
date: "2015-08-31"
author: "Bernd Rücker"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/08/process-test-coverage-report.html"

---

<div>
As part of the Hack Days this year my colleague Falko migrated an existing tool we (Camunda Consulting) used with success in a lot of projects to&nbsp;<a href="http://bpmn.io/">bpmn.io</a>: The <a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/process-test-coverage">Process Test Coverage Report Generator</a>. It just hooks into an automated test (typically JUnit) and creates an HTML report showing the coverage:<br />
<br />
<ul>
<li>For every Test Case</li>
<li>For the whole Test Suite</li>
</ul>
<div>
See this example for one test case - obviously the Happy Path of the process model:</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-jP0h-G4dUNE/VeSdgQvu-3I/AAAAAAAAARU/akfz4seDr5w/s1600/testing-process-definitions-coverage.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="234" src="http://1.bp.blogspot.com/-jP0h-G4dUNE/VeSdgQvu-3I/AAAAAAAAARU/akfz4seDr5w/s320/testing-process-definitions-coverage.png" width="320" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div>
The report can easily be watched locally within your IDE or hooked into your Jenkins Build. See <a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/process-test-coverage/README.md">GitHub Readme</a> for details.&nbsp;</div>
<div>
<br /></div>
<div>
By the way - our Best Practice is to go for "Flow Node Coverage" - so your Test Suite should "visit" each BPMN Flow Node (Events, Activities, Gateways, ...) at least once.</div>
<div>
<br /></div>
<div>
Happy Testing!</div>

</div>