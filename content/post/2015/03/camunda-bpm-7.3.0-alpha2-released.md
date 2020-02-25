---
title: "Camunda BPM 7.3.0-alpha2 released"
date: "2015-03-05"
author: "Daniel Meyer"

categories:
  - "Execution"
tags:
  - "Release Note"

aliases:
  - "/2015/03/camunda-BPM-7.3.0-alpha2-released.html"

---

<div>
A new alpha release of our open source BPM and Workflow platform is available for download. The highlights of this release are:<br />
<ul><li>Process Engine and Rest Api</li>
<ul><li>Native JSON and XML Variable Value Types</li>
<li>Improved Sorting: specify multiple sort parameters in rest api, sort task by variable value</li>
<li>Historic Job Log</li>
<li>Support for databases: Oracle 12c</li>
<li>Partially Order Historic Activity Instances by occurrence</li>
</ul><li>Cockpit</li>
<ul><li>UI improvements</li>
<li>Advanced Process Instance Search (enterprise feature)</li>
</ul><li>Tasklist</li>
<ul><li>Sort by multiple parameters</li>
<li>Sort by variable value</li>
</ul><li>Admin</li>
<ul><li>Browse Users by Group</li>
</ul><li>JavaScript SDK</li>
<ul><li>Add group resource</li>
<li>Support local variables</li>
</ul></ul><div>The <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13690">full release notes</a> can retrieved from Jira. The <a href="https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.3.0-alpha2">known issues</a> as well.</div><br />
<div>You can <a href="http://camunda.org/download#latest">download Camunda</a>, <a href="https://github.com/camunda/docker-camunda-bpm-platform">run it with Docker</a> or <a href="http://docs.camunda.org/7.2/guides/getting-started-guides/#apache-maven-apache-maven-coordinates">add it to your application with maven</a>.</div><a name='more'></a><br />
<h3>Run this Release with Docker<br />
</h3>If you want to run this release with <a href="http://docker.io/">Docker</a>, you can use the freshly baked Docker images. The following command line will start the tomcat distribution:<br />
<pre class="prettyprint"><code>docker pull camunda/camunda-bpm-platform:7.3.0-alpha2
docker run -d --name camunda -p 8080:8080 camunda/camunda-bpm-platform:7.3.0-alpha2
</code></pre>Open browser with url: <a href="http://localhost:8080/camunda/">http://localhost:8080/camunda/</a><br />
<br />
See the <a href="https://github.com/camunda/docker-camunda-bpm-platform">Camunda Docker Images</a> project for alternative distributions and versions.<br />
<br />
<h3>Native XML and JSON Variable Types</h3><div>This feature allows you to work with Xml and Json variables in a "native" way, in both the Rest Api and the Java Api.<br />
<br />
Assume you have the following Json Document:<br />
<pre class="prettyprint"><code class="language-json">{
  "customerId": "SFAS-342434",
  "revenue": 3324.43,
  ...
}
</code></pre>Then it can be stored as Json variable in the following way:<br />
<pre class="prettyprint"><code class="language-java">import static org.camunda.spin.plugin.variable.SpinValues.*;

// assuming the json document is available as string variable
String customerData = ...;

// set the customer as json variable of a process instance
runtimeService.setVariable(pid, "customerData", jsonValue(customerData));
</code></pre>The important part is the <code>jsonValue(...)</code> method. It tells the process engine that the provided string should not be interpreted as a string but as a json value. What is the benefit?<br />
<br />
First, the value can be of arbitrary size (while the max character size for string values is limited).<br />
<br />
If we request the variable in expression language (when implementing the condition of a sequence flow), we can directly access the properties of the json object:<br />
<pre class="prettyprint"><code class="language-xml">&lt;sequenceFlow name="vip customer" sourceRef="..." targetRef="..."&gt;
  &lt;conditionExpression xsi:type="tFormalExpression"&gt;
    &lt;![CDATA[
      ${ customerData.prop("revenue").doubleValue() &gt;= 10000 }
    ]]&gt;
  &lt;/conditionExpression&gt;
&lt;/sequenceFlow&gt;
</code></pre>Note how we can directly access a property of the json object in <code>customer.prop("revenue")</code>.<br />
<br />
How is this possible? The process engine internally uses the <a href="http://docs.camunda.org/latest/api-references/spin/">Camunda Spin</a> library for parsing the Json value with Jackson and providing a lightweight wrapper over the Jackson Api, optimized for fluent Api access.<br />
<br />
You get the same benefit if you request the variable from java code:<br />
<pre class="prettyprint"><code class="language-java">public class ProcessCustomerData implements JavaDelegate {

  public void execute(DelegateExecution execution) {
    JsonValue customerData = execution.getVariableTyped("customerData");

    double revenue = customerData.getValue().prop("revenue").doubleValue();
  }

}
</code></pre>Note that if the same variable is requested multiple times in the same command, it will only be parsed once.<br />
<br />
In case you do not need a parsed representation, you can also request the serialized (string) representation:<br />
<pre class="prettyprint"><code class="language-java">JsonValue customerData = execution.getVariableTyped("customerData", false);    
String valueAsString = customerData.getValueSerialized();
</code></pre>For this feature some documentation is still missing but you can already read <a href="http://blog.camunda.org/2015/02/json-everywhere-how-to-use-json-in.html">Roman's Blogpost</a>&nbsp;and <a href="https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-json">checkout the example</a> on GitHub.</div><br />
<h3>Sort Tasks by Variable Value</h3><div>When querying for tasks, it is now possible to sort by variable value:<br />
<pre class="prettyprint"><code class="language-java">taskService.createTaskQuery()
  .taskAssignee("jonny")
  .orderByDueDate().desc()
  .orderByTaskVariable("invoiceAmount", ValueType.DOUBLE).desc()
  .list();
</code></pre><br />
The same can be done in the Tasklist as you can see here:<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-Xj4VuyYRlBo/VPhzZI7bcAI/AAAAAAAABoE/eHMP03p47mA/s1600/tasklist-variable-sort.png" >}}
<br />
</div><br />
<h3>Advanced Process Instance Search</h3>We added an enterprise feature to Cockpit which allows searching for process instances with complex criteria:<br />
{{< figure src="http://1.bp.blogspot.com/-YW6kGBN7KQw/VPiBiyr2wHI/AAAAAAAABoc/KokXNHH5tP4/s1600/search.png" >}}
<h3>The most awesome things are yet to come!</h3>We have <strong>amazing</strong> things in the pipepline. On current master it is already possible to do this:<br />
<pre class="prettyprint"><code class="language-java">List<execution> executions = runtimeService.createExecutionQuery()
  .processDefinitionKey("invoice")
  .activityId("selectAssignee")
  .list();

for (Execution e : executions) {
  runtimeService.createProcessInstanceModification(e.getProcessInstanceId())
    .cancelAllInActivity("selectApprover")
    .startBeforeActivity("approveInvoice")
      .setVariable("approver", "jonny1")
    .execute();
}
</code></pre>And that is just the beginning... :=)<br />

</div>
