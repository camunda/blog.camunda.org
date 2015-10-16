---
title: "Job Suspension - Powerful Operations with Camunda BPM"
date: "2014-11-07"
author: "Robert Gimbel"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/11/job-suspension-powerful-operations-with.html"

---

<div>
This blogpost is about a very powerful feature in <a href="http://camunda.org/">camunda BPM</a> for operating critical processes which are in production. Given a core process which operates under high volume, almost any problem is critical in a way. The more options you have to deal with those problem the better. I am going to show you one of those options, namely <b>job suspension</b>.<br />
<br />
<a name='more'></a><br />
<h1>
The Process</h1>
Let's say you have automated your order processing, i.e. the orders which are generated in your web shop. I will use a very simple example. New orders start a process in the backend, the delivery is scheduled and once the goods are delivered, the payment is scheduled. Let's say your business is successful and you have many orders per minute.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-zowNdLTpVfM/VFuQyS8-BxI/AAAAAAAAAGM/U0aXmcvyJ4A/s1600/OrderProcessingOK.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-zowNdLTpVfM/VFuQyS8-BxI/AAAAAAAAAGM/U0aXmcvyJ4A/s1600/OrderProcessingOK.png" height="288" width="400" /></a></div>
<br />
From a technical perspective, all steps are executed <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations">asynchronously</a>.<br />
<br />
<h1>
</h1>
<h1>
The Problem</h1>
<div>
Let's assume that the payment service is down for an hour. Immediately you will observe loads of exceptions from your engine, arising from failing process instances, which cannot settle the payment.</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-taewLG8BYWw/VFuSUDzVIOI/AAAAAAAAAGY/8djUeiELl60/s1600/OrderProcessingDown.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-taewLG8BYWw/VFuSUDzVIOI/AAAAAAAAAGY/8djUeiELl60/s1600/OrderProcessingDown.png" height="288" width="400" /></a></div>
<div>
<br /></div>
<div>
While the payment service stays down, what do you need?</div>
<div>
<ul>
<li>You still need to take incoming orders, no argument about that, that's your business</li>
<li>Still, you do not want any process instance that calls the payment service to end up in a corrupted state, that has to be dealt with afterwards.&nbsp;</li>
</ul>
<h1>
</h1>
<h1>
The Solution</h1>
</div>
<div>
Since you are using asynchronous continuations, the job suspension feature of camunda BPM comes into play. Using job suspension you can suspend all jobs of process instances which are about to call the payment service. This is very helpful, since you are still able to start new process instances for incoming orders but you avoid running instances from ending up in a failed state. This can be done globally from a process perspective.&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-s7Ygt3HCpfo/VFuUjUA4PWI/AAAAAAAAAGk/m002VSalOfg/s1600/OrderProcessingStop.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-s7Ygt3HCpfo/VFuUjUA4PWI/AAAAAAAAAGk/m002VSalOfg/s1600/OrderProcessingStop.png" height="288" width="400" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Once the payment service is up again, you do the inverse and simply unsuspend the job definition. Of course it will take some time until all "waiting" jobs are executed, but in general the process engine is doing the job which would have involved manual intervention otherwise.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<h1 style="clear: both; text-align: left;">
</h1>
<h1 style="clear: both; text-align: left;">
Other Use Cases</h1>
<div>
<ul>
<li>you are calling java code which has a bug. you can stop all instances from calling the wrong java code, deploy a hotfix and continue</li>
<li>you need to make changes to a script or business rules before you want processes to continues</li>
<li>any other problem which is related to your process but beyond the control of the engine</li>
</ul>
<h1>
</h1>
<h1>
</h1>
<h1>
Job Suspension vs. Job Retry</h1>
<div>
What are the different use cases for job suspension and the engine's built-in retry mechanism? In short, I would recommend the retry mechanism for unknown and unexpected problems which occur temporarily. As soon as you know that something is not going to work, I would recommend to use job suspension to avoid too many retries/exceptions of the same problem. Of course this is a general statement that has to be decided depending on the actual problem.</div>
<h1>
</h1>
<h1>
Related Readings</h1>
</div>
<div>
<ul>
<li>Cockpit provides Tooling for <a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit-suspension-job-definition-suspension">job suspension</a>&nbsp;and <a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit-failed-jobs-bulk-retry">bulk retry for failed jobs</a>.&nbsp;</li>
<li>Read the <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-engine-concepts-suspending-and-activating-job-execution">engine documentation on job suspension</a></li>
<li><a href="http://docs.camunda.org/latest/api-references/rest/#job-definition">REST API on job suspension</a>&nbsp;(globally for all instances)</li>
<li><a href="http://docs.camunda.org/latest/api-references/rest/#job">REST API on job suspension</a> (for single jobs)</li>
<li>Using camunda BPM as <a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-architecture-overview-shared-container-managed-process-engine">shared process engine</a> makes this feature even more powerful, since the engine is more independent from your application logic</li>
</ul>
</div>
<div>
<br /></div>

</div>