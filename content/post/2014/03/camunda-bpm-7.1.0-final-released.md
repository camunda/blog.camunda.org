---
title: "Finally! camunda BPM 7.1.0-Final is released"
date: "2014-03-31"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/03/camunda-BPM-7.1.0-Final-released.html"

---

<div>
Today we release 7.1.0-Final, the new minor version of camunda BPM. Compared to the 7.0.0.Final release, the new version includes many new features and improvements:<br />
<ol>
<li>Improved process engine with Job Definitions, better BPMN coverage and improved performance,</li>
<li>All-new BPMN Model API for convenient BPMN model access,</li>
<li>New features in the cockpit monitoring web application,</li>
<li>Improved Tasklist and Task Forms, including support for HTML5 and Generated Task Forms.</li>
<li>Support for&nbsp;<span style="background-color: white; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;">Oracle WebLogic Server 12c</span>&nbsp;and JBoss Application Server 7.2 and JBoss EAP 6.1 / 6.2</li>
</ol>
<div>
This blog post contains a more detailed feature overview below. The release is now available on camunda.org for download:</div>
<br />
<div style="text-align: center;">
<b><a href="http://camunda.org/download">You can download the release on camunda.org for free.</a></b></div>
<div style="text-align: center;">
<br /></div>
<div style="text-align: left;">
All in all, 320 issues were closed. See the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12891">complete release notes in Jira</a>.<br />
<a name='more'></a></div>
<h3>
Enterprise support&nbsp;</h3>
<span style="font-family: inherit;"><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">The 7.1 release is the basis for the next supported production release for camunda BPM. It is fully supported in&nbsp;</span><a href="http://camunda.com/bpm/enterprise/" style="background-color: white; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">the camunda BPM enterprise subscription</a><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">. Support includes&nbsp;</span>Help Requests<span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;based on different SLAs as well as access to camunda BPM maintenance releases. Maintenance releases allow customers to get bugfixes for production systems based on the 7.1 codebase. While the community project will forge ahead for 7.2, we will backport bugfixes to the 7.1 branch and perform maintenance releases reserved for enterprise subscription customers.</span><br style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;" /><br style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;" /><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">There is a&nbsp;</span><a href="http://docs.camunda.org/guides/migration-guide/" style="background-color: white; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">Migration Guide</a><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;targeting existing camunda bpm 7.0 installations.</span></span><br />
<h3>
Detailed Features Overview</h3>
<div>
<br /></div>
The following is a more detailed overview of the new features:<br />
<br />
<h4>
Job Definitions</h4>
<div>
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-i4RlHKHFhiA/UzlP88fzkxI/AAAAAAAAAXg/8rVSSCNASuM/s1600/2014-03-31-131919_154x119_scrot.png" imageanchor="1" style="clear: left; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-i4RlHKHFhiA/UzlP88fzkxI/AAAAAAAAAXg/8rVSSCNASuM/s1600/2014-03-31-131919_154x119_scrot.png" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Activity with suspended<br />
Job Definition (in Cockpit).</td></tr>
</tbody></table>
Allows querying, activating &amp; suspending job execution on a per activity level. This allows you to prevent an activity from being executed. This is particularly useful for fixing technical problems or preparing system migrations or updates: process instances can make progress until they reach a given activity and will then queue up until the activity is activated again.<br />
(<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-engine-concepts-jobs-and-job-definitions">Documentation</a>).<br />
<br />
<br />
<br /></div>
<h4>
Improved BPMN Coverage</h4>
<div>
Added support for <a href="http://docs.camunda.org/latest/api-references/bpmn20/#overview-bpmn-20-overview-and-coverage-events">non-interrupting event subprocess</a>. Supported start events are <i>signal</i>, <i>message</i> and <i>timer</i>.&nbsp;</div>
<div>
Support for receive tasks was improved: <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-receive-task">receive tasks</a>&nbsp;now support the <span style="font-family: Courier New, Courier, monospace; font-size: x-small;">messageRef</span> attribute and can be triggered through <span style="font-family: Courier New, Courier, monospace; font-size: x-small;">correlateMessage()</span>.<br />
<br /></div>
<div>
<h4>
Improved Message Correlation</h4>
<div>
Message correlation was improved and it is now possible to use a fluent builder API for correlating a message&nbsp;<span style="background-color: white; line-height: 21.559999465942383px;">(</span><a href="http://blog.camunda.org/2014/03/fluent-api-for-message-correlation.html" style="background-color: white; line-height: 21.559999465942383px;">Blogpost</a><span style="background-color: white; line-height: 21.559999465942383px;">)</span>:</div>
<div>
<br /></div>
<div>
<span style="font-size: x-small;"><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 21.559999465942383px;">&nbsp; runtimeService.createMessageCorrelation("orderCancelled")</span><br style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; line-height: 21.559999465942383px;" /><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 21.559999465942383px;">&nbsp; &nbsp; &nbsp; .processInstanceBusinessKey("someOrderId")</span><br style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; line-height: 21.559999465942383px;" /><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 21.559999465942383px;">&nbsp; &nbsp; &nbsp; .setVariable("CANCEL_REASON", "someReason")</span><br style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; line-height: 21.559999465942383px;" /><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 21.559999465942383px;">&nbsp; &nbsp; &nbsp; .setVariable("CANCEL_TIMESTAMP", new Date())</span><br style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; line-height: 21.559999465942383px;" /><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 21.559999465942383px;">&nbsp; &nbsp; &nbsp; .correlate();</span></span><br />
<span style="font-size: x-small;"><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 21.559999465942383px;"><br /></span></span></div>
<h4>
User Operation Log</h4>
<div>
A new History Entity allowing to query for operations a user performed on a task.</div>
<div>
<br /></div>
<h4>
Performance Improvements</h4>
<div>
Again, we improved the process engine performance for some constructs mainly in combination with concurrent executions and scopes. We further reduced the number of database queries (SELECTs) necessary at runtime. We also added a <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/qa/performance-tests-engine">performance test suite</a> to our repository which allows running benchmarks and SQL statement logs.<br />
<br /></div>
<h4>
Bpmn Model API</h4>
<div>
<span style="font-family: inherit;">We added a completely new component called the <a href="http://docs.camunda.org/latest/guides/user-guide/#bpmn-model-api">BPMN Model API</a>.&nbsp;<span style="background-color: white; line-height: 20px;">The camunda BPMN model API provides a simple and lightweight library for parsing, creating, editing and writing of BPMN 2.0 XML files. The model API enables an easy extraction of information from an existing process definition or to create a complete new one without manual XML parsing.&nbsp;</span></span></div>
<div>
<span style="font-family: inherit;"><span style="background-color: white; line-height: 20px;"><br /></span></span></div>
<div>
<span style="background-color: white;"><span style="font-family: inherit;"><span style="line-height: 20px;">The&nbsp;</span></span><span style="line-height: 20px;">following</span><span style="font-family: inherit;"><span style="line-height: 20px;">&nbsp;example shows how to create a new process with the fluent builder API:</span></span></span></div>
<div>
<br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; Bpmn.createExecutableProcess("helloCamunda")</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp;.startEvent()</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp;.userTask()</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp;.endEvent()</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; .done();</span>
<span style="background-color: white; font-family: 'Courier New', Courier, monospace; font-size: x-small; line-height: 21.559999465942383px;">&nbsp;&nbsp;</span><br />
<span style="background-color: white; font-family: 'Courier New', Courier, monospace; font-size: x-small; line-height: 21.559999465942383px;"><br /></span></div>
<h4>
Cockpit Open Source Features</h4>
</div>
<div>
Suspension of Process Instances, Process Definitions and Job Definitions:<br />
<br />
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-q-17Q334U7Q/Uzlp1yYQexI/AAAAAAAAAXw/-zKwldSQNns/s1600/2014-03-31-151117_590x380_scrot.png" imageanchor="1" style="clear: left; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img border="0" src="http://1.bp.blogspot.com/-q-17Q334U7Q/Uzlp1yYQexI/AAAAAAAAAXw/-zKwldSQNns/s1600/2014-03-31-151117_590x380_scrot.png" height="128" width="200" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Suspend process Definition</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-6tuHp6vzUp0/Uzlp2D01cdI/AAAAAAAAAX0/naWgO5ZhxGM/s1600/2014-03-31-151240_1670x907_scrot.png" imageanchor="1" style="clear: left; display: inline !important; margin-bottom: 1em; margin-left: auto; margin-right: auto; text-align: center;"><img border="0" src="http://4.bp.blogspot.com/-6tuHp6vzUp0/Uzlp2D01cdI/AAAAAAAAAX0/naWgO5ZhxGM/s1600/2014-03-31-151240_1670x907_scrot.png" height="108" width="200" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Job Definition Overview <br />
with "Suspend Buttons"</td></tr>
</tbody></table>
<br />
<br />
<br />
<br /></div>
<div>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
Improved Handling of Binary Datatypes including upload / download for byte streams and editing of serializable Java variables:</div>
<div>
{{< figure src="http://2.bp.blogspot.com/-vpar5HPao6Y/UzlrEedgw_I/AAAAAAAAAYU/fK93YZv2nNU/s1600/2014-03-31-151758_548x438_scrot.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
Many, many improvements were done under the hood, including better build infrastructure (<a href="http://gruntjs.com/">grunt</a> / <a href="http://bower.io/">bower</a>), better UI testing (through <a href="https://github.com/angular/protractor">protractor</a>) and better <a href="https://github.com/angular/protractor">developer documentation</a>.<br />
<br /></div>
<h4>
Cockpit Enterprise Subscription-Only Features</h4>
<div>
History for Process Instances including sophisticated querying and searching for finished process instances and drill down into individual instances, providing:<br />
<br />
<b>Audit Log</b>, allowing to follow the path of a process instance through the diagram, visualizing running, completed and cancelled activity instances. <br />
<br />
{{< figure src="http://4.bp.blogspot.com/-gTRCMTeaKI8/Uzlsxr_OW8I/AAAAAAAAAYw/DZ_jaLhefJw/s1600/2014-03-31-152513_1676x915_scrot.png" >}}
<br />
As well as a <b>Variable Log</b> and a <b>User Task</b> log:<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-imrC0xHYeO8/Uzlse_65fJI/AAAAAAAAAYs/Is4xOCFw61k/s1600/variables.png" >}}
{{< figure src="http://3.bp.blogspot.com/-DQXPDgVjetI/Uzlse6-JOkI/AAAAAAAAAYo/iF_AsogoeRg/s1600/usertask.png" >}}
<h4>
Tasklist</h4>
<div>
HTML5&nbsp;<b>Embedded Task Forms</b>&nbsp;allow you to implement task forms in plain HTML and Javascript. They are rendered inside the tasklist. With the 7.1 release we greatly improve support for Embedded<br />
Taskforms including support for select boxes, radio buttons and custom scripting &amp; validation. (<a href="https://github.com/camunda/camunda-quickstarts/tree/master/usertask/task-form-embedded" style="color: #2288bb; text-decoration: none;">Quickstart Example</a>,&nbsp;<a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist-task-forms-embedded-task-forms" style="color: #2288bb; text-decoration: none;">Docs</a>).<br />
<br /></div>
<div>
{{< figure src="http://3.bp.blogspot.com/-xA3pVG_QXu4/Uzk45rYEJpI/AAAAAAAAAXQ/DbSncOBsEmA/s1600/screenshot.png" >}}
</div>
<div>
<br />
In addition, we added the <b>Generated Task Forms</b> feature which allows you to define a simple form in camunda Modeler and have it rendered in Tasklist&nbsp;<span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">(</span><a href="http://blog.camunda.org/2013/12/how-to-use-generated-task-forms-with.html" style="background-color: white; color: #2288bb; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">Blogpost</a><span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">,&nbsp;</span><a href="https://github.com/camunda/camunda-quickstarts/tree/master/usertask/task-form-generated" style="background-color: white; color: #2288bb; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">Quickstart Example</a><span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">,&nbsp;</span><a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist-task-forms-generated-task-forms" style="background-color: white; color: #2288bb; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">Docs</a><span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">).</span><br />
<br />
{{< figure src="http://2.bp.blogspot.com/-aFbmN8-0kn8/Uzl7kDKWcrI/AAAAAAAAAZA/bit2Ne6mxXo/s1600/screenshot-modeler.png" >}}
<br />
<h4>
<span style="background-color: white; font-family: inherit; line-height: 21.559999465942383px;">Distributions</span></h4>
</div>
<div>
<span style="background-color: white; font-family: inherit; line-height: 21.559999465942383px;">We now provide a standalone distribution for the web application (Tasklist&nbsp;+ Cockpit) as </span><span style="background-color: white; font-family: Courier New, Courier, monospace; font-size: x-small; line-height: 21.559999465942383px;">.war</span><span style="background-color: white; font-family: inherit; line-height: 21.559999465942383px;"> file download. This distribution includes an embedded process engine (configured using spring xml) and can be deployed on most application servers.</span></div>
<div>
<br /></div>
<ol><ol>
</ol>
</ol>
</div>
</div>