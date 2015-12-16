---
title: "Synchronous vs. Asynchronous Service Invocations - BPMN Service Task (1)"
date: "2013-11-10"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/11/bpmn-service-synchronous-asynchronous.html"

---

<div>
<div class="MsoNormal">
<span lang="EN-US">The BPMN
2.0 Specification provides the Service Task activity allowing users to invoke
some application service.&nbsp;</span>In this
Blogpost I want to explain the difference between a synchronous and an
asynchronous service invocation in camunda BPM.<br />
<br /></div>
<div class="MsoNormal">
<span lang="EN-US"><b>NOTE</b>: <i>this bogposts covers the topic at an abstract level. If you are looking for concrete, ready-to-use examples, have a look at our quickstart repository:&nbsp;</i></span>
<br />
<ul>
<li>&nbsp;<a href="https://github.com/camunda/camunda-quickstarts/tree/master/servicetask/service-invocation-synchronous">quickstart on synchronous service invocations</a></li>
<li>&nbsp;<a href="https://github.com/camunda/camunda-quickstarts/tree/master/servicetask/service-invocation-asynchronous">quickstart on asynchronous service invocations</a></li>
</ul>
</div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US"></span></div>
<a name='more'></a><h3>
Synchronous Service
Invocations</h3>
<div class="MsoNormal">
<span lang="EN-US">Let’s start
with synchronous service invocations. A synchronous service invocation follows
the well-known <a href="http://www.servicedesignpatterns.com/ClientServiceInteractions/RequestResponse">Request
/ Response Pattern</a>: <o:p></o:p></span></div>
{{< figure src="http://3.bp.blogspot.com/-7DvI7gR80DU/Un_WwdE24gI/AAAAAAAAAPY/l3dKY8oXYHY/s1600/sync-service-invocation.png" >}}
<br />
<div class="MsoNormal">
<span lang="EN-US">The process
engine performs a synchronous request to a service and waits for a response.
The characteristic property of this invocation pattern consists in the fact
that the process engine thread sending the request is blocked until the
response is obtained:</span></div>
{{< figure src="http://3.bp.blogspot.com/-ruzHMpfRDeA/Un_Wxt7y3nI/AAAAAAAAAPk/jqrJvMfutW4/s1600/sync-service-invocation-illustrated.png" >}}
<div align="center" class="MsoNormal" style="text-align: center;">
<br /></div>
<div class="MsoNormal">
<span lang="EN-US">Transactional
process engines such as the camunda process engine will typically associate a
database transaction (Process Engine Tx in the illustration above) with this thread.
<o:p></o:p></span></div>
<div class="MsoNormal">
<span lang="EN-US"><br /></span></div>
<div class="MsoNormal">
<span lang="EN-US">Implementing
a synchronous service invocation in camunda BPM is very straight forward:<o:p></o:p></span></div>
<div class="MsoListParagraphCxSpFirst" style="mso-list: l0 level1 lfo1; text-indent: -18.0pt;">
</div>
<ol>
<li><span lang="EN-US" style="text-indent: -18pt;"><span style="font-size: 7pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span><span lang="EN-US" style="text-indent: -18pt;">Model
a Process containing a Service Task</span></li>
<li><span lang="EN-US" style="text-indent: -18pt;"><span style="font-size: 7pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span><span lang="EN-US" style="text-indent: -18pt;">Attach
a “JavaDelegate”-Implementation to the service task.</span></li>
</ol>
Check out this <a href="https://github.com/camunda/camunda-quickstarts/tree/master/servicetask/service-invocation-synchronous">quickstart on synchronous service invocation</a>s to learn how to to implement this.<br />
<h3>
<span lang="EN-US">Asynchronous Service Invocations</span></h3>
<div>
<span lang="EN-US">An asynchronous service invocation usually follows the <a href="http://www.servicedesignpatterns.com/ClientServiceInteractions/RequestAcknowledge">Request / Acknowledge / Callback Pattern</a>:</span></div>
<div>
<span lang="EN-US"><br /></span></div>
{{< figure src="http://3.bp.blogspot.com/-QY6TZDqztWE/Un_Yf13y3QI/AAAAAAAAAP4/NhcVK0lnY_4/s1600/async-service-invocation.png" >}}
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The process engine sends the request to the service. But instead of processing the request right away, the the service first puts the request into a Queue. It then acknowledges the receipt of the request to the process engine. The request is then delivered asynchronously to the actual request processor. The request processor executes the business logic. Finally it sends a callback to the process engine which may now continue execution in the process instance.&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
In practice, we encounter multiple variations of this pattern. For example, the callback itself may be delivered synchronously or asynchronously. Furthermore, the queuing of the requests may be performed before or behind the service boundary. Here is an illustration of two of such variations:&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
{{< figure src="http://4.bp.blogspot.com/-5Ou09ISyMuU/Un_Yf6cBtOI/AAAAAAAAAP8/iru4LFGRyRI/s1600/async-service-invocation-queuing.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Contrary to the synchronous service invocation, the transaction context of the process engine is &nbsp;not propagated to the service implementation. In fact, an asynchronous service invocation always comes down to at least two transactions (labelled Tx1 and Tx2 in the illustration below):</div>
{{< figure src="http://2.bp.blogspot.com/-CpaUxjWL8dE/Un_Yf7VqcrI/AAAAAAAAAP0/f45bD3bvsuI/s1600/async-service-invocation-illustrated.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<ol>
<li>in the first transaction (Tx1), the request message is sent. If the request is acknowledged, the process engine interrupts execution and commits the transaction.</li>
<li>in the second transaction (Tx2), the callback is sent and processed. This constitutes a new transaction in which the process engine resumes the state of the execution and ends the service task activity.</li>
</ol>
<div class="MsoNormal">
<span lang="EN-US">Implementing an asynchronous service invocation in camunda BPM is a lot more complicated than implementing a synchronous service invocation. You have to:<o:p></o:p></span></div>
<div class="MsoListParagraphCxSpFirst" style="text-indent: -18pt;">
</div>
<ol>
<li><span lang="EN-US" style="text-indent: -18pt;"><span style="font-size: 7pt;">&nbsp;</span></span><span lang="EN-US" style="text-indent: -18pt;">Model a Process containing a Service Task</span></li>
<li><span lang="EN-US" style="text-indent: -18pt;"><span style="font-size: 7pt;">&nbsp;</span></span><span lang="EN-US" style="text-indent: -18pt;">Attach a “SignallableActivityBehavior”-Implementation to the service task.</span></li>
<li><span lang="EN-US" style="text-indent: -18pt;">In the execute() method, send a message to the actual Business Logic</span></li>
<li><span lang="EN-US" style="text-indent: -18pt;">Implement a callback message which is correlated to the same process instance from which the request message was sent.</span></li>
</ol>
<div class="separator" style="clear: both; text-align: left;">
Check out this&nbsp;<a href="https://github.com/camunda/camunda-quickstarts/tree/master/servicetask/service-invocation-asynchronous">quickstart on asynchronous service invocations</a>&nbsp;to learn how to to implement this.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div>
<div style="text-align: center;">
<a href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US" rel="license"><img alt="Creative Commons License" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" style="border-width: 0;" /></a><br />
This blogpost including images &amp; illustrations is licensed under a <a href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US" rel="license">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
</div>
</div>

</div>