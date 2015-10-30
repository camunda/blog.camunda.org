---
title: "Hello ${name}! - Templating with camunda BPM"
date: "2014-07-25"
author: "Sebastian Menski"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/07/hello-name-templating-with-camunda-bpm.html"

---

<div>
As part of our <a href="http://blog.camunda.org/2014/07/scripting-everywhere-in-camunda-bpm.html" target="_blank">scripting improvements</a>&nbsp;we also addressed templating as a new feature of camunda BPM. With the new <a href="http://blog.camunda.org/2014/07/camunda-bpm-720-alpha3-released.html" target="_blank">camunda BPM 7.2.0-alpha3</a> release it is now also possible to use <a href="http://freemarker.org/" target="_blank">FreeMarker</a> or <a href="https://velocity.apache.org/" target="_blank">Apache Velocity</a> templates inside your BPMN process.<br />
<br />
<a name='more'></a><br />
We integrated this template engines as JSR 223 compatible scripting engines. Therefore we create small wrappers for these template engines in our <a href="https://github.com/camunda/camunda-template-engines-jsr223" target="_blank">camunda-template-engines-jsr223</a>&nbsp;project.&nbsp;This has the advantage that we do not need new extension elements or attributes for the BPMN xml. Instead a template can be used everywhere a script can be used. This is especially useful for script tasks and input output mappings. If the template engine JSR 223 wrapper is part of your classpath you can use the name of the template engine as script language.<br />
<br />
The maven coordinates of the template engine wrappers a the following if you want to use them with an embedded engine or in a JUnit test case:<br />
<br />
<pre style="white-space: pre-wrap; word-wrap: break-word;">&lt;dependency&gt;
  &lt;groupId&gt;org.camunda.template-engines&lt;/groupId&gt;
  &lt;artifactId&gt;camunda-template-engines-freemarker&lt;/artifactId&gt;
  &lt;version&gt;1.0.0&lt;/version&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
  &lt;groupId&gt;org.camunda.template-engines&lt;/groupId&gt;
  &lt;artifactId&gt;camunda-template-engines-velocity&lt;/artifactId&gt;
  &lt;version&gt;1.0.0&lt;/version&gt;
&lt;/dependency&gt;</pre>
<pre style="white-space: pre-wrap; word-wrap: break-word;"></pre>
<pre style="white-space: pre-wrap; word-wrap: break-word;"></pre>
<div style="white-space: pre-wrap; word-wrap: break-word;">
<span style="font-family: inherit;">The following example shows a simple use case where an input output mapping is used on a service task to generate a text content needed by this task. Here we use the FreeMarker template engine to generate the body of an email.</span></div>
<br />
<script src="https://gist.github.com/menski/b880b33bdb34aae5e50b.js"></script>

As you can see the process variables in the current scope can directly be used in the template. The result of the processed template is than save in a local variable which is available inside of the service task.<br />
<br />
Another interesting use case for templates are camunda connectors (added in <a href="http://blog.camunda.org/2014/06/camunda-bpm-720-alpha2-released.html" target="_blank">7.2.0-alpha2</a>). As templates like scripts can be loaded from external resources it is possible to use the a SOAP envelope template in multiple processes or projects. An example for such an template can be found in our <a href="https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-service" target="_blank">SOAP connector example</a>.<br />
<br />
<script src="https://gist.github.com/menski/2fd9e14f175d5755def4.js"></script>

As a side effect of this new feature we have demonstrated that you can now easily integrate own scripting-like languages in camunda BPM. If it is possible to create a JSR 223 compatible wrapper it can be used in camunda BPM.<br />
<br />
To read more technical details about templating please visit our <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-templating" target="_blank">user guide</a>. And please let us know what you think about this new feature.
</div>