---
title: "{ \"json\" : \"everywhere\" } - How to use json in a process"
date: "2015-02-09T09:08:00+01:00"
author: "Roman Smirnov"

categories:
  - "Development"
tags: 
  - "embedded forms"
  - "JSON"
  - "spin"

aliases:
  - "/2015/02/json-everywhere-how-to-use-json-in.html"

---

Since Camunda BPM platform 7.2 it is very easy to read, write and manipulate json objects by using Camunda Spin. Among other things, this feature is used to serialize Java objects inside a process instance in the process engine.<br />
<br />
But what if you want to use Json Variables without mapping to Java objects? With the next alpha release we will introduce a new <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-variables-supported-variable-values">ValueType </a>"json" (and "xml" but that is an other story).<br />
<br />
In this post I demonstrate how you can use the json value type to<br />
<br />
<ul><li>implement HTML Forms which work with a Json Variable,</li>
<li>implement BPMN Sequence Flow conditions based on the properties of the Json Variable.</li>
</ul><a name='more'></a><br />
<br />
<h3>Example Process</h3><div>In this post I use the following example process:</div><br />
<br />
<ul><ul></ul></ul><div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-x1qVsd35w78/VNTEWgBP3AI/AAAAAAAAAEw/ABiL0CINhjc/s1600/process.png" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/-x1qVsd35w78/VNTEWgBP3AI/AAAAAAAAAEw/ABiL0CINhjc/s1600/process.png" /></a></div><br />
<br />
<h3>Create a Json variable in a start form</h3><div>The process instance is started by using a plain Html form inside camunda Tasklist.<br />
<br />
<pre class="prettyprint"><code class="language-html">&lt;form role="form" class="form-horizontal"&gt;
  &lt;script cam-script type="text/form-script"&gt;

    var customer = $scope.customer = {};

    camForm.on('form-loaded', function () {
      // declare a 'json' variable 'customer'
      camForm.variableManager.createVariable({
        name: 'customer',
        type: 'json',
        value: customer
      });
    });

  &lt;/script&gt;
  &lt;div class="control-group"&gt;
    &lt;label class="control-label" for="firstName"&gt;First Name&lt;/label&gt;
    &lt;div class="controls"&gt;
      &lt;input id="firstName" class="form-control"
               type="text" ng-model="customer.firstName" required /&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Additional fields omitted --&gt;

&lt;/form&gt;
</code></pre><br />
The custom java script creates a new object and binds it to the angular <code>$scope</code> of the form as a variable named <code>customer</code>. Then a new process variable named <code>customer</code> will be created when the form has been loaded successfully. The type of the process variable is set to <code>json</code>, so that the variable will be persisted simply as json without the need to deserialize it to a custom Java object.<br />
<br />
The form itself is a plain angular form (see <code>ng-model</code> binding of input field).<br />
<br />
<h3>Accessing an existing Json variable in a task form</h3></div><div>An existing json variable can be accessed using custom java script. The pattern is to fetch first the value of the variable and then bind it to an angular scope variable:<br />
<br />
<pre class="prettyprint"><code class="language-html">&lt;form role="form" class="form-horizontal"&gt;
  &lt;script cam-script type="text/form-script"&gt;

    camForm.on('form-loaded', function () {
      // tell the form SDK to fetch the json variable name 'customer'
      camFom.variableManager.fetchVariable('customer');
    });

    camForm.on('variable-fetched', function () {
      // work with the variable (bind it to current angular $scope)
      $scope.customer = camForm.variableManager.variableValue('customer');
    });

  &lt;/script&gt;
  &lt;div class="control-group"&gt;
    &lt;label class="control-label" for="firstName"&gt;First Name&lt;/label&gt;
    &lt;div class="controls"&gt;
      &lt;input id="firstName" class="form-control"
             type="text" ng-model="customer.firstName" required /&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Additional fields omitted --&gt;

&lt;/form&gt;
</code></pre><br />
<h3>Accessing an existing json variable in an expressions</h3></div>In the past you could already store Json as variable values. However, you needed to store it as a String variable. The problem with that is that in a sequence flow you cannot easily write EL Expressions using the properties of the json if it is stored as a String.<br />
<br />
In Camunda 7.2 we introduced Spin and it became possible to pare the String within El and <a href="http://docs.camunda.org/latest/guides/user-guide/#data-formats-xml-json-other-json-expression-language-integration">use the Spin API for formulating conditions</a>:<br />
<br />
<pre class="prettyprint"><code class="language-java">${ JSON(customer).prop("age").numberValue() &gt;= 21}</code></pre><br />
While this was a huge improvement the problem is that if you need to interpret the same variable as Json multiple times within a command, it needs to be parsed multiple times (among other downsides).<br />
Now that we introduce Json variables as native ValueTypes, you can directly access the properties of a Json variable in conditions:<br />
<br />
<pre class="prettyprint"><code class="language-xml">&lt;sequenceFlow id="SequenceFlow_4" name="age above 21"
    sourceRef="ExclusiveGateway_1" targetRef="UserTask_2"&gt;
  &lt;conditionExpression xsi:type="tFormalExpression"&gt;
    &lt;![CDATA[
      ${ customer.prop("age").numberValue() &gt;= 21 }
    ]]&gt;
  &lt;/conditionExpression&gt;
&lt;/sequenceFlow&gt;

&lt;sequenceFlow id="SequenceFlow_5" name="age under 21"
    sourceRef="ExclusiveGateway_1" targetRef="UserTask_3"&gt;
  &lt;conditionExpression xsi:type="tFormalExpression"&gt;
    &lt;![CDATA[
      ${ customer.prop("age").numberValue() &lt; 21 }
    ]]&gt;
  &lt;/conditionExpression&gt;
&lt;/sequenceFlow&gt;
</code></pre><br />
<br />
The example resources can be found <a href="https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-json">here</a>.