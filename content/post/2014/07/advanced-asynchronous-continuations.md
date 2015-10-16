---
title: "Advanced Asynchronous Continuations in camunda BPM"
date: "2014-07-18"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/07/advanced-asynchronous-continuations.html"

---

<div>
<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations">Asynchronous continuations</a> are a a very powerful process engine feature. Up until now you could use asynchronous continuations in two ways:
<br />
<ol>
<li>Before an activity.&nbsp;</li>
<li><a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-start-events-asynchronous-instantiation">Asynchronous process instantiation using the async start event. </a>(Added in 7.0).</li>
</ol>
With <a href="http://blog.camunda.org/2014/07/camunda-bpm-720-alpha3-released.html">camunda BPM 7.2.0-alpha3</a>, Asynchronous continuations become even more powerful:<br />
<ol>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-configuring-asynchronous-continuations">You can now place an asynchronous continuation AFTER an activity. </a>(<span style="color: red;"><b>HOT!)</b></span></li>
<li>Asynchronous continuations are now supported on more BPMN 2.0 constructs, such as the Parallel Gateway.</li>
</ol>
<div>
<a name='more'></a></div>
<h3>
Why Asynchronous Continuations?</h3>
<div>
Asynchronous continuations are break-points in the process execution. They are used as transaction boundaries and allow another thread than the currently active thread to continue execution.</div>
<div>
<br /></div>
<div>
From a use case perspective
<br />
<ul>
<li>Async is used for placing a safe-point before an activity such that the execution state is committed. If the activity then fails to execute, the transaction is rolled back only up to the safe point.</li>
<li>Async also comes in handy if you have longer-running computations and do not want to block the calling thread (eg. HTTP Thread) but instead want to delegate the heavy lifting to a background thread.</li>
<li>Finally, due to the fact that asynchronous continuations are executed by the job executor, the retry mechanism can be used in order to retry a failed activity execution.</li>
</ul>
</div>
<div>
<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-why-asynchronous-continuations">Asynchronous continuations are covered from a use case perspective in the user guide.</a><br />
<br />
<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-understanding-asynchronous-continuations">More in-depth information about how asynchronous continuations work in camunda BPM can be found in the userguide.</a></div>
<h3>
NEW: Asynchronous Continuations After an Activity</h3>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://stage.docs.camunda.org/guides/user-guide/assets/img/process-engine-async.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://stage.docs.camunda.org/guides/user-guide/assets/img/process-engine-async.png" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;"><br />
Asynchronous Continuations BEFORE and AFTER an activity. <a href="http://stage.docs.camunda.org/guides/user-guide/#process-engine-transactions-in-processes-understanding-asynchronous-continuations">Details</a>.</td></tr>
</tbody></table>
<div>
<br /></div>
<div>
Asynchronous continuations after an activity come in handy when you want to place a safe point after an activity:</div>
<div>
<br /></div>
<div>
<script src="https://gist.github.com/meyerdan/de3bea2a1de7eb1039d8.js"></script></div>
<div>
<br /></div>
<div>
Asynchronous continuations after an activity are useful if you want to make sure that the state changes performed by the activity are saved before the process engine continues process execution.</div>
<div>
<ul>
<li>Usually this is a lot more intuitive than placing the asynchronous continuation before the next activity.</li>
<li>An activity may have multiple outgoing sequence flows. Without the capability to place an asynchronous continuation after the activity, you would have to place it before all of the next activities.</li>
<li>Not every activity may have a "next activity". In BPMN 2.0 it is perfectly valid that an activity does not have any outgoing flows. Or, the activity may be a compensation handler which is not allowed to have an outgoing sequence flow.</li>
<li>If the activity is followed by a synchronizing construct (like a parallel gateway) it is useful to place a safe point after the activity in order to make sure a potential failure &amp; retry caused by optimistic locking does not affect the activity. (You could also place an asynchronous continuation BEFORE the parallel gateway, of course).</li>
</ul>
</div>
<div>
<br /></div>
I think that currently camunda BPM is the most advanced open source process engine in this area. If you know another open source process engine with has more flexible asynchronous continuation capabilities, let us know, I am always good for a challenge :)<br />
<br />
----<br />
As a side-note: the concept which makes asynchronous continuations possible is the "Atomic Operation". When the process engine executes a process, it will progress though the graph as a sequence of Atomic Operations. It then becomes possible to break execution between two atomic operations being executed. We are implementing <b>CMMN (The new standard for adaptive case management, ACM)</b> with the&nbsp;<a href="https://github.com/camunda/camunda-bpm-platform/tree/master/engine/src/main/java/org/camunda/bpm/engine/impl/cmmn/operation">same programming model</a>. As a result, it will also be possible to implement Async for CMMN as well :)<br />
<br />
</div>