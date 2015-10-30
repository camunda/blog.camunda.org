---
title: "camunda BPM + Apache Camel: Integrating two Open Source frameworks for a lightweight BPM+SOA infrastructure"
date: "2013-09-25"
author: "Bernd Rücker"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/09/camunda-bpm-apache-camel-integrating.html"

---

<div>
<a href="http://camel.apache.org/">Apache Camel</a> is a well known Open Source framework solving a lot of integration problems and implementing the <a href="http://www.eaipatterns.com/">Enterprise Integration Patterns</a>. So combining it with <a href="http://camunda.org/">camunda BPM</a> is a perfect match: solve workflow and BPM requirements with camunda and integration requirements with Camel.<br />
<br />
Together with <a href="http://rafael.cordones.me/">Rafael Cordones</a>&nbsp;we took the existing&nbsp;<a href="https://github.com/Activiti/Activiti/tree/master/modules/activiti-camel">Activiti Camel Module</a>&nbsp;as a basis and did a huge refactoring. For everybody knowing this module I compiled the changes at the end of this article. For everybody else: Lean back and enjoy the show while I quickly walk you through the features. I do this based on our&nbsp;<a href="https://github.com/camunda/camunda-bpm-camel">"camel use cases" example</a>&nbsp;which is available on GitHub (by the way - you can discuss this process model on <a href="http://camunda.org/share/#/process/f54a4ff9-4cc1-428c-829b-a4002dcdd81f">camunda share</a>):<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-DT4BSiRQ14c/UkGVzVF04II/AAAAAAAAAHg/qetP2QHJrrc/s1600/use-cases.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-DT4BSiRQ14c/UkGVzVF04II/AAAAAAAAAHg/qetP2QHJrrc/s400/use-cases.png" height="140" width="400" /></a></div>
<br />
<a name='more'></a>The process does not solve any real-life business problem but showcases different use cases:<br />
<ul>
<li>Start a process instance when a file is dropped into a folder</li>
<li>Start a process instance when a new Tweet is shared on Twitter with the term 'camunda' in it</li>
<li>Call a Camel route ("Service") from a <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-service-task">ServiceTask</a>. This Service 
always throws an Exception which we catch with a BPMN Error Event.</li>
<li>Call a Camel route ("Service") from a <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-send-task">SendTask</a>&nbsp;and retrieve the response asynchronous in a following <a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-message-events">Message Event</a>.</li>
<li>Between all steps there is a <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-user-task">UserTask</a> so that you can click through the example using <a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist">Tasklist</a>.</li>
</ul>
<b>The camunda BPM Camel component</b><br />
<b><br /></b>
We developed a <a href="http://camel.apache.org/component.html">Camel component</a> to talk to camunda BPM from Camel. You can easily add this component to your own project as described here:&nbsp;<a href="https://github.com/camunda/camunda-bpm-camel">https://github.com/camunda/camunda-bpm-camel</a>. I currently work on a JBoss AS 7 distribution already containing Camel and this component - which would make it even more easy to get started. But that's for another time. Let's examine what the component can do for you:<br />
<b><br /></b>
<b>Start a Process Instance</b><br />
<br />
Starting a new process instance is really easy - just call the "<span style="font-family: Courier New, Courier, monospace;">camunda-bpm:start</span>" endpoint within your Camel Route and specify which process definition should be used. In the example the <a href="http://camel.apache.org/file.html">File Component</a> is used which can watch a drop folder for new files:<br />
<br />
<span style="font-family: 'Courier New', Courier, monospace;">from("file://C:/temp/")</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; &nbsp;.convertBodyTo(String.class) // convert content into String</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; &nbsp;.to("camunda-bpm:start?processDefinitionKey=camel-use-cases");</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
As an alternative you can start a process instance by a message (then the message start event is triggered and the process definition has not to be specified). In the example the <a href="http://camel.apache.org/twitter.html">Twitter Component</a> is used polling Twitter for new Tweets with the keyword 'camunda':<br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
<span style="font-family: Courier New, Courier, monospace;">from("twitter://search?type=polling&amp;delay=5&amp;keywords=camunda&amp;consumerKey="...")</span><span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp;.transform().groovy("def map=[:] \n" +</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "map['tweet.what'] = request.body.text &nbsp; &nbsp; &nbsp; \n" +</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "map['tweet.when'] = request.body.createdAt &nbsp;\n" +</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "request.body = map")</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp;.to("camunda-bpm:message?messageName=camel.start");</span><br />
<br />
Note that I used a <a href="http://camel.apache.org/groovy.html">Groovy script to transform</a> the data from what I get from Twitter to what I want to have in the process engine. As I am not a Groovy expert I am sure that there is a more elegant solution to do that - but it worked within minutes - so I was happy. Camel supports multiple possibilities to transform data easily .<br />
<br />
<b>Call a Camel Route from the Process Instance</b><br />
<br />
In order to call a camel route you have to add a simple expression to your BPMN 2.0 process model:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-loOzH1EakIg/UkGaYWB2ShI/AAAAAAAAAH0/AwKOuHhl7Wk/s1600/serviceTaskCamel.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-loOzH1EakIg/UkGaYWB2ShI/AAAAAAAAAH0/AwKOuHhl7Wk/s320/serviceTaskCamel.png" height="320" width="306" /></a></div>
<br />
In the background this will create the following XML:<br />
<br />
<span style="font-family: Courier New, Courier, monospace;">&lt;bpmn2:serviceTask id="ServiceTask_1" name="call some service"</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; <span class="Apple-tab-span" style="white-space: pre;"> </span>camunda:expression="#{camel.sendTo('direct:syncService')}" &gt;</span><br />
<div>
<br /></div>
Which references a Camel route:<br />
<br />
<span style="font-family: Courier New, Courier, monospace;">from("direct://syncService")</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; .onException(SampleException.class) // map exception to BPMN error</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .throwException(new BpmnError("camel.error"))</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; .end()</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; .process(new Processor() { &nbsp; &nbsp; &nbsp; &nbsp;</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; @Override</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; public void process(Exchange exchange) throws Exception {</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // always throwing error to demonstrate error event</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;throw new SampleException("some error occured in service");</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; }</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; });</span><br />
<div>
<br /></div>
<div>
What you do in the Camel route is completely up to you and not part of this blog post. What I did in the above route is to always throw an exception (do not consider this best practice ;-)). But this allows me to show how to map any exception a <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-delegation-code-throwing-bpmn-errors-from-delegation-code">BPMN error</a> which can be <a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-error-events">handled in the BPMN</a> process model. Note that this should only be done in cases of errors you want to model in your process model - see <a href="http://docs.camunda.org/latest/real-life/how-to/#concepts-error-handling">How-To on Error Handling</a> for details.</div>
<div>
<br /></div>
<div>
<b>Get a response message</b></div>
<div>
<br /></div>
<div>
Calling the route with the SendTask is the same as with the ServiceTask. But interesting is how to get the response to the process instance waiting in the message event. The following screenshot shows one process instance waiting for the message in cockpit:</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-DLKPcPCYl_A/UkGeBFtLoFI/AAAAAAAAAIA/fP29vq88uWQ/s1600/waiting-process-cockpit.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-DLKPcPCYl_A/UkGeBFtLoFI/AAAAAAAAAIA/fP29vq88uWQ/s320/waiting-process-cockpit.png" height="203" width="320" /></a></div>
<div>
<br /></div>
<div>
This is again easy:</div>
<div>
<br /></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;">from("seda:someQueue")</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; .to("camunda-bpm:message?messageName=camel.answer");&nbsp;</span></div>
</div>
<div>
<br /></div>
<div>
The message name corresponds to the message name in the BPMN 2.0 XML:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-0GVHasEU-kI/UkKZkRgEH1I/AAAAAAAAAIc/RBnUDVhJc88/s1600/messageEvent.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-0GVHasEU-kI/UkKZkRgEH1I/AAAAAAAAAIc/RBnUDVhJc88/s200/messageEvent.png" height="192" width="200" /></a></div>
<br />
<br />
In the example expect the property <span style="font-family: Courier New, Courier, monospace;">CamundaBpmProcessInstanceId </span>to be present in the Camel message properties, this is how correlation currently is done. You could hook in some logic in your Route to do correlation/matching yourself, as e.g. shown in the <a href="https://github.com/camunda/camunda-consulting/tree/master/showcases/bank-account-opening-camel">Bank Account Opening Example</a> (this uses by the way a ReceiveTask instead of a Message Event - both is possible):</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-baz9tYfWOCg/UkGfj6uLwwI/AAAAAAAAAIM/_frRpSfBteU/s1600/ReceiveTask.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-baz9tYfWOCg/UkGfj6uLwwI/AAAAAAAAAIM/_frRpSfBteU/s1600/ReceiveTask.png" /></a></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;">from("file://" + postidentFolder)</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; .process(new Processor() {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp;public void process(Exchange exchange) throws Exception {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace;">&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace;">// extract key from file name</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp;String businessKey =&nbsp;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; exchange.getIn().getHeader("CamelFileName")</span><span style="font-family: 'Courier New', Courier, monospace;">.toString()</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; .split("-")[1]</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; .substring(0, 4);</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp;exchange.setProperty(CAMUNDA_BPM_BUSINESS_KEY, businessKey);</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp;}</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; })</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; .to("camunda-bpm://message?activityId=wait_for_postident").</span></div>
<div>
<br /></div>
</div>
<div>
<b>Where to get it?</b><br />
<br />
<ul>
<li>The camunda-bpm-camel component and further information can be found on GitHub:&nbsp;<a href="https://github.com/camunda/camunda-bpm-camel">https://github.com/camunda/camunda-bpm-camel</a></li>
<li>The sources for the example used in this blog post can be found on GitHub:&nbsp;<a href="https://github.com/camunda/camunda-consulting/tree/master/showcases/camel-use-cases">https://github.com/camunda/camunda-consulting/tree/master/showcases/camel-use-cases</a></li>
<li>A business example (opening a bank account) using Camel can found on GitHub as well:&nbsp;<a href="https://github.com/camunda/camunda-consulting/tree/master/showcases/bank-account-opening-camel">https://github.com/camunda/camunda-consulting/tree/master/showcases/bank-account-opening-camel</a></li>
</ul>
Note that camunda-bpm-camel is still in incubation phase!<br />
<ul>
</ul>
</div>
<div>
<b>Why is it cool?</b><br />
<b><br /></b>
Personally I like Apache Camel especially because it introduced a common language and a well adopted Component concept having a simple solution available for a lot of integration problems out there. File handling, Streaming, huge CSV files processes in parallel? No problem with Camel. Twitter, Salesforce, Hadoop or whatever? There might be a component, see this amazing list here: <a href="https://github.com/apache/camel/tree/master/components">https://github.com/apache/camel/tree/master/components</a>.<br />
<br />
Camel is no rocket-science. It is not a complex ESB. It is a down-to-earth Java framework making your live easier and reducing the amount of code for quite some problems. The philosophy is matching pretty well with ours. Together with camunda BPM you can already built some sophisticated BPM/SOA solution.<br />
<b><br /></b>
<b>Further topics</b></div>
<div>
<ul>
<li><b>Correlation:&nbsp;</b>We have some <a href="http://docs.camunda.org/latest/api-references/javadoc/org/camunda/bpm/engine/impl/runtime/CorrelationHandler.html">Correlation Mechanism</a> already built in camunda BPM. So we want to make that available in the Camel integration as well. Currently we discuss how this can be done best - basically which parameters to set in a Camel message in order to get that working. Join <a href="http://camunda.org/community/forum.html">our forum</a> to add your opinion!</li>
<li><b>Retry Mechanism</b>: Camel has some retry strategies if some external service is unavailable. camunda BPM has own <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor-failed-jobs">retry strategies</a> as well. I recommend to use retrying from camunda normally - as this makes monitoring easier. But I am happy to get feedback.</li>
</ul>
</div>
<div>
<b>Ongoing discussions and next steps</b></div>
<div>
<b><br /></b></div>
<div>
If you follow the forum you will notice that we are still discussing. Join the discussion if you like! To give you an impression - there are a couple of things we ask ourselves:</div>
<div>
<ul>
<li>I would like to have Camel installed as a JBoss module and the route deployed within a Process Application. This should be easy doable - but currently we lack time for it.</li>
<li>Should we rely on camel-cdi? As this has <a href="https://groups.google.com/forum/#!searchin/camunda-bpm-users/camel-cdi/camunda-bpm-users/brILmqj4Xrw/00Jg9H0vaZoJ">some drawbacks</a>.&nbsp;</li>
<li>Properties or Header for CamundaBpm properties? Currently we use <a href="http://camel.apache.org/properties.html" target="_blank">properties</a>.&nbsp;Properties are hanging off the Exchange and not off the messages that flow through a route. A processor in a route <i>can</i> copy the headers but may not do it. Properties are maintained all through the route. But normally headers are used. Maybe we should switch?</li>
<li>Is it interesting to get a <span style="font-family: Courier New, Courier, monospace;">camunda-bpm://events?filter=…</span> consumer endpoint that captures Audit Log events from the engine and send them down the route?&nbsp;</li>
<li>Should we support multiple process engines? Ho do we expose this on the camel API? As a parameter (<span style="font-family: Courier New, Courier, monospace;">camunda-bpm://start?processEngine=...</span>)?</li>
</ul>
</div>
<br />
<b>Changes compared to Activiti Camel Module</b><br />
<br />
And for everybody familiar with the Activiti Camel Module it might be interesting what we changed. In a nutshell:<br />
<ul>
<li>Removed the CamelBehavior (we prefer working with expressions, see examples above).</li>
<li>Add support for Message Events (not only ReceiveTask).</li>
<li>Separated the codebase&nbsp;to not force Spring dependencies when using CDI and vice-versa:</li>
<ul>
<li><a href="https://github.com/camunda/camunda-bpm-camel/tree/master/camunda-bpm-camel-common">camunda-bpm-camel-common</a></li>
<li><a href="https://github.com/camunda/camunda-bpm-camel/tree/master/camunda-bpm-camel-spring">camunda-bpm-camel-spring</a></li>
<li><a href="https://github.com/camunda/camunda-bpm-camel/tree/master/camunda-bpm-camel-cdi">camunda-bpm-camel-cdi</a></li>
</ul>
</ul>
<ul>
<li>Refactored the core code base to make it easier understandable.</li>
<li>Added examples.</li>
</ul>
</div>