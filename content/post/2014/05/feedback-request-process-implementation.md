---
title: "Feedback Request: Process Implementation with XML & JSON Data and Scripting Languages"
date: "2014-05-02T15:52:00+02:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 
  - "classless"
  - "feedback"
  - "JSON"
  - "spin"
  - "XML"

aliases:
  - "/2014/05/feedback-request-process-implementation.html"

---

One of our largest customers approached us with the following requirement:<br />
<br />
<i>"We want to implement BPMN processes, such that&nbsp;</i><br />
<ol>
<li><i>these processes work with rich XML and JSON data objects,</i></li>
<li><i>but we are not forced to deploy custom Java Code."</i></li>
</ol>
<div>
Requirement (1) is a very common one. Many of our users and customers work with rich XML and JSON data objects. To do this, many of them implement custom Java Classes and use technologies like JAX-B or Jackson for mapping XML and JSON to Java.</div>
<div>
<br /></div>
<div>
Requirement (2) is also a common one. Note however that in this case, the driving force behind it is&nbsp;<b>not zero-coding</b>. Our customer is a rather large hardware / software vendor &nbsp;and their product is deployed in hundreds of installations. The process engine is part of these installations. What they are looking for is a lightweight deployment model: they want to be able to deploy complex process implementations which are more or less self-contained. This is not the case if they have to write Java Classes. Java classes have to be deployed and re-deployed each time you make a change. Although camunda BPM provides a deployment model for bundling BPMN processes with Java Code (<a href="http://docs.camunda.org/latest/guides/user-guide/#process-applications">see Process Applications</a>) which even allows you to operate multiple versions of your process in parallel, each deployment is a complete Java EE / Java Servlet application deployment with all pros and cons this entails.</div>
<div>
<br /></div>
<div>
Based on these and similar requirements, we are now working on a new feature which will be called "Classless Workflows". We plan adding this feature in camunda BPM 7.2.</div>
<div>
<br /></div>
<div>
The core idea behind this feature is simple:</div>
<div>
<ol>
<li>Provide a rich, dynamic programming model for XML and JSON in Java,</li>
<li>Make this available from JVM scripting languages like Javascript, Groovy, Python, ...</li>
</ol>
<div>
In order to render this more concrete, we developed an example which attempts to illustrate how a developer could use these features:&nbsp;</div>
</div>
<div>
<br /></div>
<div>
<a href="https://github.com/camunda/camunda-classless-examples/blob/master/customer-rating/README.md">https://github.com/camunda/camunda-classless-examples/blob/master/customer-rating/README.md</a></div>
<div>
<br /></div>
<div>
<b><span style="color: red; font-size: large;">If you are interested in this topic, it would be great if you could give us some feedback on this example!&nbsp;</span></b></div>
<div>
<br /></div>
<div>
<i>(Note: I am not sure whether the example is easy to understand. If not, let us know then we can improve it.)</i></div>
