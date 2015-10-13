---
title: "Who cares about Types? Querying with Numeric Variable Values"
date: "2014-11-25T11:34:00+01:00"
author: "Thorben Lindhauer"

categories:
  - "Development"
tags: 
  - "engine"

aliases:
  - "/2014/11/query-numeric-variable-values.html"

---

The final camunda 7.2 release is a stone's throw away and ships a ton of new features. One of these is the <i>typed variable value API</i>. You may already know the plain-value-based API that exists since the process engine's very first days. A variable can be set on an execution/task/... as follows:
<pre class="prettyprint">execution.setVariable("var", 42);</pre>

Behind the scenes, the process engine performs some magic to squeeze numbers, booleans, or even complex Java objects into the database and return it from there on the next call:
<pre class="prettyprint">int myLuckyNumber = (Integer) execution.getVariable("var");</pre>
<br />

With 7.2 (and the latest alpha), we introduce the typed value API. It is not a whole new API but rather of a gentle extension. Like before, the variable API is map-based and no existing code breaks. With the typed value API, performing the same task as above, it is possible to write<br />
<pre class="prettyprint">execution.setVariable("var", Variables.integerValue(42));</pre>
and<br />
<pre class="prettyprint">TypedValue typedValue = execution.getValueTyped("var");</pre>

You might have noticed the <i>TypedValue</i> which is the very core of this concept. Instead of the plain variable value, there is an intermediate object, the typed value.<br />
<br />
<br />
What can you do with it? Assume there is a variable called "var" in four different process instances:<br />

<pre class="prettyprint">runtimeService.setVariable(processInstance1.getId(), "var", 42000);
runtimeService.setVariable(processInstance2.getId(), "var", (short) 42);
runtimeService.setVariable(processInstance3.getId(), "var", (long) 123123123);
runtimeService.setVariable(processInstance4.getId(), "var", 745.0d);</pre>

The four variables all differ in type and exact value. Yet, all are numeric values. In order to find all process instances with variable value > 10, the following can be written:<br />

<pre class="prettyprint">runtimeService.createProcessInstanceQuery()
  .variableValueGreaterThan("var", 10).list();</pre>

Unfortunately, this returns only one process instance, <code>processInstance1</code>. Why? Because 42 is an integer value and the query only searches for process instances with an integer value greater than 10.<br />
<br />
Often, this is not what users want. All values are numeric and can be compared on a conceptual level. That is where typed values come to the rescue. Now, it is possible to write the following process instance query:

<pre class="prettyprint">runtimeService.createProcessInstanceQuery()
  .variableValueGreaterThan("var", Variables.numberValue(10)).list();</pre>

This query returns all four process instances. The process engine detects that the types <i>integer</i>, <i>short</i>, <i>long</i>, and <i>double</i> are all subordinates of the type <i>number</i>. It now knows that you do not mean integers with value greater than 10 but any number value that is greater than 10.<br />
<br />
<br />
Why should you care? Sometimes you don't know the type a variable in question has. In Cockpit, users specify a numeric value to query with. Its exact type is of little interest. While some MyBatis and SQL hacks made this possible in Cockpit before 7.2, it is now a well-defined API feature. And the best: You can use it in your own queries, wherever variable values can be specified.<br />
<br />
That is not all to it; the typed value API has much more to offer. To learn more about it, stay tuned for the <a href="http://camunda.com/landing/webinar-release72/">release webinar</a>, blog posts, tutorials, and examples to follow. Of course, you can right now have a look at the <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-variables-typed-value-api">documentation</a> and discover the typed value API.