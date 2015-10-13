---
title: "Start and Complete a process with the REST API"
date: "2015-08-05T16:34:00+02:00"
author: "Niall Deehan"

categories:
  - "Development"
tags: 

aliases:
  - "/2015/08/start-and-complete-process-with-rest-api.html"

---

<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="color: #1f497d;">If you’ve already <a href="https://camunda.org/download/">downloaded the Camunda BPM</a> platform you’ve already got our invoice example running locally. So I’m going to start with how you might run
through that process using our REST API. <o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;">I’m going to assume that you’ve
got some method of making those calls either programmatically or using a
RestClient (I’ve used chrome’s <a href="https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo">advanced rest client</a>&nbsp;to test the calls). So lets begin...&nbsp;<o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<h3>
<b><span style="color: #1f497d;">Starting the process.&nbsp; </span></b></h3>
</div>
<div class="MsoNormal">
<b><span style="color: #1f497d;"><br /></span></b></div>
<div class="MsoNormal">
<span style="color: #1f497d;">For most processes we could kick things off by using the <a href="http://docs.camunda.org/latest/api-references/rest/#process-definition-start-process-instance">start process instance</a> rest call </span><span style="background: #F9F2F4; color: #c7254e; font-family: Consolas; font-size: 9.5pt;">/process-definition/key/{key}/start.</span><span style="color: #1f497d;">&nbsp;But because the invoice process has a start form
I’m going to use <a href="http://docs.camunda.org/latest/api-references/rest/#process-definition-submit-start-form">another way of starting the process</a> </span><span style="background: #F9F2F4; color: #c7254e; font-family: Consolas; font-size: 9.5pt;">/process-definition/key/{key}/submit-form</span><span style="color: #1f497d;"> [2]. Which looks something like this:<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<a href="http://localhost:8080/engine-rest/process-definition/key/invoice/submit-form"><span style="color: lime;">http://localhost:8080/</span><span style="color: purple;">engine-rest/</span><span style="color: #548235;">process-definition/key/</span><b style="color: #548235;">invoice</b><span style="color: #548235;">/submit-form</span></a><span style="color: #1f497d;"> <o:p></o:p></span>
</div>
<div class="MsoNormal">
<br />
<a name='more'></a><br /></div>
<div class="MsoNormal">
<span style="color: #1f497d;">In bright green is the name of the local server. Purple is the start of the path and of course the rest (no pun intended) is the
call. This includes “invoice” which is the key that works out which process we want
to start. <o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;">This isn’t going to work just yet
though, we’ll also need to add the content type to the header (this is true for
all calls), in this case we’re using JSON so the header look like this:<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #548235;">content-type: application/json<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #548235;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;">There is also the matter of
passing in the variables that are needed by the process – the invoice example
has a “start form” that requires a user to enter certain data when the process
starts. We can pass in those variables in the payload of the call a JSON object. It
would look like this:<o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">{"variables":<o:p></o:p></span>
</div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp; {<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp; "creditor":
{"value":"Niall","type":"String"},<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp;
"amount":{"value":"100","type":"String"},<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp;
"invoiceNumber":{"value":"123","type":"String"}<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp; }<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">}<o:p></o:p></span><br />
<span style="color: #ed7d31;"><br /></span></div>
<div class="MsoNormal">
</div>
<div class="MsoNormal">
</div>
<span style="color: #1f497d;">The REST call is now complete and
when we run it should return a happy status of 200 – as well as some useful variables
sent through JSON. The interesting parts of which are: <o:p></o:p></span>
<br />
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="font-family: 'Courier New'; font-size: 10pt;">{<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span class="jsonparserkeyname"><span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">id</span></span><span style="font-family: 'Courier New'; font-size: 10pt;">:<span class="apple-converted-space">&nbsp;</span><span class="jsonparserpunctuation">"</span></span><span class="jsonparserstringvalue"><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">95aef406-3a7a-11e5-85b6-dafa20524153</span></span><span class="jsonparserpunctuation"><span style="font-family: 'Courier New'; font-size: 10pt;">"</span></span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span class="jsonparserkeyname"><span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">definitionId</span></span><span style="font-family: 'Courier New'; font-size: 10pt;">:<span class="apple-converted-space">&nbsp;</span><span class="jsonparserpunctuation">"</span></span><span class="jsonparserstringvalue"><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">invoice:1:15e97a1c-312d-11e5-aca3-a0e120524153</span></span><span class="jsonparserpunctuation"><span style="font-family: 'Courier New'; font-size: 10pt;">"</span></span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span class="jsonparserkeyname"><span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">businessKey</span></span><span style="font-family: 'Courier New'; font-size: 10pt;">:<span class="apple-converted-space">&nbsp;</span></span><span class="jsonparsernullvalue"><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span></span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span class="jsonparserkeyname"><span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">caseInstanceId</span></span><span style="font-family: 'Courier New'; font-size: 10pt;">:<span class="apple-converted-space">&nbsp;</span></span><span class="jsonparsernullvalue"><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span></span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span class="jsonparserkeyname"><span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">ended</span></span><span style="font-family: 'Courier New'; font-size: 10pt;">:<span class="apple-converted-space">&nbsp;</span></span><span class="jsonparserbooleanvalue"><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">false</span></span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span class="jsonparserkeyname"><span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">suspended</span></span><span style="font-family: 'Courier New'; font-size: 10pt;">:<span class="apple-converted-space">&nbsp;</span></span><span class="jsonparserbooleanvalue"><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">false</span></span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: 'Courier New'; font-size: 10pt;">}<o:p></o:p></span><br />
<span style="font-family: 'Courier New'; font-size: 10pt;"><br /></span></div>
<div class="MsoNormal">
</div>
<div class="MsoNormal">
<span style="color: #1f497d;">The returned ID is the most
important right now – because you can use that to contact the running process
instance when you need to make other calls. <o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<h3>
<b><span style="color: #1f497d;">Get a task.</span></b></h3>
</div>
<div class="MsoNormal">
<span style="color: #1f497d;">The next call we’re going to
make is to get details of the task that the process instance is currently waiting at.
We’ll be calling the engine and asking for <a href="http://docs.camunda.org/latest/api-references/rest/#task-get-tasks">a single task</a> </span><span style="background: #F9F2F4; color: #c7254e; font-family: Consolas; font-size: 9.5pt;">/task</span><span style="color: #1f497d;">&nbsp;This call has a variety of parameters you can use to
get the specific task you’re looking for – we’re just going to use the <i><b>processInstanceId</b></i>
because that was returned to us when we started the process originally and we happen to know that the process only has one active task right now. So the
call would look something like this:<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #548235;"><a href="http://localhost:8080/engine-rest/task/?processInstanceId=95aef406-3a7a-11e5-85b6-dafa20524153">http://localhost:8080/engine-rest/task/?processInstanceId=<b>95aef406-3a7a-11e5-85b6-dafa20524153</b></a></span><span style="color: #7030a0;"><o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="color: #1f497d;">This call will return a JSON
object describing the task:<o:p></o:p></span><br />
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="font-family: 'Courier New'; font-size: 10pt;">{<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">id</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">95af1b22-3a7a-11e5-85b6-dafa20524153</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">name</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">Assign
Approver</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">assignee</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">demo</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">created</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">2015-08-04T09:29:47</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">due</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">2015-08-07T09:29:47</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">followUp</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">delegationState</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">description</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">Select the
colleague who should approve this invoice.</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">executionId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">95aef406-3a7a-11e5-85b6-dafa20524153</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">owner</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">parentTaskId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">priority</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: blue; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">50</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">processDefinitionId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">invoice:1:15e97a1c-312d-11e5-aca3-a0e120524153</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">processInstanceId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">95aef406-3a7a-11e5-85b6-dafa20524153</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">taskDefinitionKey</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">assignApprover</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">caseExecutionId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">caseInstanceId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">caseDefinitionId</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">null</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">suspended</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;</span><span style="color: #770088; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">false</span><span style="font-family: 'Courier New'; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-left: 36.0pt;">
<span style="color: #ce7b00; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">formKey</span><span style="font-family: 'Courier New'; font-size: 10pt;">:&nbsp;"</span><span style="color: #4488aa; font-family: &quot;Courier New&quot;; font-size: 10.0pt;">embedded:app:forms/assign-approver.html</span><span style="font-family: 'Courier New'; font-size: 10pt;">"<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: 'Courier New'; font-size: 10pt;">}<o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="color: #1f497d;">The most important variable here is again the ID, but this is the ID of the current task not the process. We can use that ID to send calls to that task - like for instance to complete the task. Which is what
we’re going to do right now.<o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<h3>
<b><span style="color: #1f497d;">Complete a task.</span></b></h3>
</div>
<div class="MsoNormal">
<span style="color: #1f497d;">This is a <a href="http://docs.camunda.org/latest/api-references/rest/#task-complete-task">very straight forward POST</a> call that requires the id of the task you want to complete </span><span style="background: #F9F2F4; color: #c7254e; font-family: Consolas; font-size: 9.5pt;">/task/{id}/complete</span><span style="color: #1f497d;">&nbsp;. <o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;">So when you add the id the
request looks a little something like this: <o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #548235;"><a href="http://localhost:8080/engine-rest/task/95af1b22-3a7a-11e5-85b6-dafa20524153/complete">http://localhost:8080/engine-rest/task/<b>95af1b22-3a7a-11e5-85b6-dafa20524153</b>/complete</a></span><span style="color: #7030a0;"><o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="color: #1f497d;">But this particular task has a
UI that requires a user to enter center data – an approver. Once again we’re
going to need to add variables as a JSON object to the payload of the request:<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">{"variables":<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp; {<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp; "approver":
{"value":"Demo","type":"String"}<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">&nbsp; }<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #ed7d31;">}<o:p></o:p></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="color: #1f497d;">That task should complete with a
code 204 and doesn’t return any data. The token will then move onto the next task.</span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<h3>
<span style="color: #1f497d;"><b>Now you can try a little&nbsp;exercise:&nbsp;</b></span></h3>
</div>
<div class="MsoNormal">
<span style="color: #1f497d;">To finish the process all you need to do is use variety of Get Task
-&gt; Complete Task&nbsp;calls until the process has reached an end event. You can always check <a href="http://docs.camunda.org/7.3/guides/user-guide/#cockpit">Cockpit </a>when you need to find out where the token currently is. So why not give it a try?&nbsp;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<span style="color: #1f497d;"><br /></span></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<br /></div>
