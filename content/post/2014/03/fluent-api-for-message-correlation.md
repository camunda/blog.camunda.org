---
title: "Fluent API for Message Correlation"
date: "2014-03-17T08:25:00+01:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 

aliases:
  - "/2014/03/fluent-api-for-message-correlation.html"

---

camunda BPM 7.1.0-alpha4 features a new fluent API for message correlation.<br />
<br />
BPMN 2.0 defines events and tasks catching messages. The following is a fragment of a process waiting for an order to be cancelled:<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-S9HlEghrT28/UyadSyDG3oI/AAAAAAAAAXA/Tc7v-ug7mzo/s1600/message-example.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-S9HlEghrT28/UyadSyDG3oI/AAAAAAAAAXA/Tc7v-ug7mzo/s1600/message-example.png" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Intermediate&nbsp;Message Catch Event</td></tr>
</tbody></table>
In BPMN 2.0 XML you have to provide a name for the message you want to catch:<br />
<br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&lt;bpmn2:definitions ...&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; ...</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;bpmn2:message id="<b>Message_1</b>" name="<b>orderCancelled</b>"/&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; ...</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;bpmn2:process id="Process_1" isExecutable="false"&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; ...</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;bpmn2:intermediateCatchEvent id="IntermediateCatchEvent_2" name="Order &amp;#xA;Cancelled"&gt; &nbsp; &nbsp; &nbsp; <br />&nbsp; &nbsp; &nbsp; &lt;bpmn2:messageEventDefinition messageRef="<b>Message_1</b>"/&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/bpmn2:intermediateCatchEvent&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp;&nbsp;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;/bpmn2:process&gt;</span><br />
<div>
<br />
<h3>
New Fluent API</h3>
</div>
camunda Engine now featues a fluent DSL for correlating this message to the process engine:<br />
<br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; runtimeService.createMessageCorrelation("<b>orderCancelled</b>")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .processInstanceBusinessKey("someOrderId")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .setVariable("CANCEL_REASON", "someReason")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .setVariable("CANCEL_TIMESTAMP", new Date())</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .correlate();</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
<span style="font-family: inherit;">The fluent DSL makes it easy to define a complex correlation set based on different restrictions. The above example correlates the message on the business key. On top of that, correlation based on process variables and process instance id is supported:</span><br />
<span style="font-family: inherit;"><br /></span>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; runtimeService.createMessageCorrelation("<b>orderCancelled</b>")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .processInstanceVariableEquals("orderId", "someOrderId")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .processInstanceVariableEquals("customerId", "someCustomerId")</span><br />
<div>
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; &nbsp; &nbsp; .correlate();</span></div>
<span style="font-family: inherit;"><br /></span>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; runtimeService.createMessageCorrelation("<b>orderCancelled</b>")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .processInstanceId("someProcessInstanceId")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; .correlate();</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
The API also makes it easy to provide the message payload as a single or multiple variables through <span style="font-family: Courier New, Courier, monospace;">setVariable(varName, value)</span>.<br />
<h3>
More Efficient than Query&nbsp;+ Trigger</h3>
We recommend using the fluent DSL or the <span style="font-family: Courier New, Courier, monospace;">RuntimeService.correlateMessage(...)</span> methods introduced in 7.0 over the Query&nbsp;+ Trigger pattern. Using the Query&nbsp;+ Trigger pattern you first query for an execution having a message event subscription and then trigger that execution:<br />
<br />
Not as efficient:<br />
<br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; // Query</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; Execution e = runtimeService.createExecutionQuery()</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; .processInstanceBusinessKey("someOrderId")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; .messageEventSubscriptionName(</span><span style="font-family: 'Courier New', Courier, monospace;">"</span><b style="font-family: 'Courier New', Courier, monospace;">orderCancelled</b><span style="font-family: 'Courier New', Courier, monospace;">"</span><span style="font-family: 'Courier New', Courier, monospace;">)</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; .singleResult();</span><br />
<br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; Map&lt;String, Object&gt; variables = new HashMap&lt;String, Object&gt;();</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; variables.put("</span><span style="font-family: 'Courier New', Courier, monospace;">CANCEL_REASON</span><span style="font-family: Courier New, Courier, monospace;">",&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace;">"someReason"</span><span style="font-family: Courier New, Courier, monospace;">);</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; variables.put("</span><span style="font-family: 'Courier New', Courier, monospace;">CANCEL_TIMESTAMP</span><span style="font-family: Courier New, Courier, monospace;">",&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace;">new Date()</span><span style="font-family: Courier New, Courier, monospace;">);</span><br />
<span style="font-family: 'Courier New', Courier, monospace;"><br /></span>
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; // Trigger</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; runtimeService.messageEventReceived("</span><b style="font-family: 'Courier New', Courier, monospace;">orderCancelled"</b><span style="font-family: Courier New, Courier, monospace;">, e.getId(), variables);</span><br />
<br />
The Query&nbsp;+ Trigger pattern has two disadvantages:<br />
<ol>
<li>More lines of code :)</li>
<li>Two process engine commands instead of a single one. This makes it less efficient in terms of performance.</li>
</ol>
