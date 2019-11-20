---
title: "Camunda BPM 7.2.0 Final Released"
date: "2014-11-28"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/11/camunda-BPM-7.2.0-Final-released.html"

---

<div>
Today we announce the official release of Camunda BPM 7.2.0 Final. This version constitutes the latest production-ready release of Camunda BPM platform and will be supported with patch updates in the the Camunda Enterprise Subscription.<br />
<br />
<b>Camunda BPM is open source</b>, you can <a href="http://camunda.org/download">download the distribution from camunda.org</a> and <a href="http://github.com/camunda">inspect the sources on GitHub</a>.<br />
<h2>
Highlights of 7.2.0 Final</h2>
<div>
This blogpost provides a summary of the highlights of the 7.2.0 Release. <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12997">The complete release notes can be found in JIRA</a>.</div>
<h3>
New Tasklist</h3>
<div>
This version ships a completely redesigned Tasklist.<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
{{< figure src="http://4.bp.blogspot.com/-SYonG-9HP4Y/VHhAt4rWR8I/AAAAAAAAAhs/UKwvhaQ1MP8/s1600/tasklist.png" >}}
<div class="separator" style="clear: both; text-align: center;">
The Tasklist is a single page Java Script application which is developed as part of the camunda BPM community Endition (Open Source). If you are interested in the <a href="https://github.com/camunda/camunda-tasklist-ui">source code of Camunda Tasklist</a>, you can find it on Github.<br />
<br />
The tasklist layout is divided into three columns: a configurable list of filters, a list of tasks and the task details. Each column can be collapsed: for instance, once you have selected a filter, you can collapse the left column and focus on the list of tasks or an individual task. The task view itself can be maximized which gives more room for complex forms.<br />
<br />
<a href="http://blog.camunda.org/2014/09/introducing-task-filters.html">Task Filters</a> represent Task Queries (which some of you may know from using the Java API or the REST Api of the process engine) which are saved to the database such that they can be executed repeatedly. Filters can be configured directly inside the tasklist:<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-9guO-zKCqPQ/VHhAregJRoI/AAAAAAAAAiQ/oYAuzT_xDJk/s1600/filter-general.png" >}}
<br />
The above image shows the "General" settings of &nbsp;a filter. A filter can be assigned a name, a description as well as a color and a priority (which determines the ordering in the list of filters). The "Auto refresh" setting is interesting: if it is enabled, the filter is periodically refreshed such that users of the tasklist notice if a task is added or removed by another user or the process enigne.<br />
<br />
It is also possible to define the criteria of the filter (which represent the actual task query):<br />
{{< figure src="http://3.bp.blogspot.com/-mDsZDOSSeMY/VHhArZjLQBI/AAAAAAAAAiE/5E8zeWWFl18/s1600/filter-criteria.png" >}}
<br />
Filters (and the task query itself, for that matter) now also support expressions which make the filters more flexible and usable by multiple users. Check the userguide for a list of <a href="http://docs.camunda.org/7.2/guides/user-guide/#process-engine-expression-language-internal-context-functions">useful expression language additions for filters</a>.<br />
<br />
We put in place <u>a sophisticated authorization system</u> for filters: first, you can configure which users and groups are authorized to create new filters. Users who are authorized to create filters can then share these filters with either all other users (globally) or with defined users and groups. This way users can determine which filters other users can see inside the tasklist and by extension, which kinds of tasks these other users should work on.<br />
<br />
Finally, it is also possible to configure a list of variables which should be fetched and displayed in the list of tasks:<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-pEIG4L1Qo6Y/VHhAr-m3ybI/AAAAAAAAAiU/9C1t5t_PD0Y/s1600/filter-variables.png" >}}
<br />
The result is that these variables are fetched for all tasks matched by the filter:<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
{{< figure src="http://2.bp.blogspot.com/-WJS5o_6oDpk/VHhAswI4ZWI/AAAAAAAAAh0/qhl4ZJ7Gki8/s1600/task-list-details.png" >}}
<br />
Besides the variables, the "task cards" in the list of tasks provide the following information:<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-JcKwip_Bad8/VHhAscW462I/AAAAAAAAAh4/1-K7KN3VVsk/s1600/task-card.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The name of the task, the name of the process or case definition, Created Date, Due Date and Follow Up Date, the name of the assignee, the task priority and the variables configured in the filter. Since this information is fetched for all tasks in the list, we implemented a new, powerful, mediatype in the <a href="http://docs.camunda.org/7.2/api-references/rest/#overview-hypertext-application-language-hal">REST Api (application/json+hal)</a>. This is now available to all users of the API and allows then to <u>fetch this complex information in a singe Rest request</u> which is assembled by the REST Api using a constant number of database queries. In addition, resources like users and groups are cached to minimize the number of LDAP requests necessary for fetching user information.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
When working on a task, users are presented a form:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
{{< figure src="http://1.bp.blogspot.com/-HD45lZjIph4/VHhAstjB9yI/AAAAAAAAAhc/ofXYQHxmXz4/s1600/task-form.png" >}}
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The tasklist supports different kinds of forms, the screenshot above shows an HTML based "embedded form". <a href="https://github.com/camunda/camunda-bpm-platform/blob/master/examples/invoice/src/main/webapp/forms/assign-approver.html">The source code of this form</a> can be found on GitHub.&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Support for such forms is provided through the new <a href="http://docs.camunda.org/7.2/api-references/embedded-forms/">Camunda Javascript SDK</a>. The SDK is developed as a separate project allowing users to use embedded forms in their own applications. <a href="https://github.com/camunda/camunda-bpm-sdk-js">The sourcecode of the SDK</a> can also be found on Github.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Besides the form, users can inspect the history of a task:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
{{< figure src="http://2.bp.blogspot.com/-hhpb4wQXRL4/VHhAs6xzj7I/AAAAAAAAAho/ZGDnJ8kVcaM/s1600/task-history.png" >}}
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The history is sourced from the "User Operation Log" we introduced in camunda BPM 7.1. Finally, the diagram view shows the BPMN 2.0 Diagram, highlighting the current user task in the process:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
{{< figure src="http://2.bp.blogspot.com/-6xiOAtmg9Sc/VHhAtZy_PlI/AAAAAAAAAhw/cmsash7ttqg/s1600/task-process.png" >}}
<div class="separator" style="clear: both; text-align: left;">
The diagram is rendered with our new <a href="http://bpmn.io/">Javascript Toolkit for BPMN 2.0: bpmn.io</a>.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
We are really excited to provide this new release of Camunda Tasklist to the community. A lot of customer feedback has been distilled into this and I am looking forward to seeing how it is used.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Note that the tasklist can also be localized, a community project with localizations has already been started:&nbsp;<a href="https://github.com/camunda/camunda-tasklist-translations">https://github.com/camunda/camunda-tasklist-translations</a></div>
</div>
<h3>
Case Management with CMMN</h3>
<div>
With 7.2.0, we introduce support for a completely new definition language called <a href="http://docs.camunda.org/7.2/api-references/cmmn10/">Case Management Model and Notation (CMMN)</a>.</div>
<div>
CMMN is an emerging OMG standard for (Adaptive) Case Management. Version 1.0 is freshly released and vendor adoption starts to take off.<br />
<br />
CMMN allows modeling Cases. A case allows humans to do work in a more or less structured way in order to achieve something. Classic examples where case management is applied are Credit Application, Customer Support Management, Document Management, and so on.<br />
<br />
The following is a simple Example of a Credit Application Case modeled in CMMN:<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-XGGj3Ikt-58/U8eXtudzhxI/AAAAAAAAAbU/L9WZHvOWXJw/s1600/loan-application.png" >}}
<br />
<div>
The Picture above shows the graphical representation of the CMMN Model. The model also has an executable XML representation which looks like this:
</div>
<div>
<script src="https://gist.github.com/meyerdan/3f5611399c3c2ca25538.js"></script>
</div>
<br /></div>
<div>
With 7.2 we introduce coverage for the following CMMN contructs:<br />
<br />
<ul>
<li>Stage</li>
<li>Human Task, Process Task, Case Task</li>
<li>Sentries</li>
<li>Milestones</li>
</ul>
<br />
The implementation is provided through the process engine Java API as well as the REST Api.</div>
<h3>
Process Engine Improvements for High Load Scenarios</h3>
<div>
The camunda process engine has been improved to work better in high load scenarios. First, we have done a complete rewrite of the persistence session / first level cache (formerly known as DbSqlSession). The new implementation has the following advantages:<br />
<br />
<ul>
<li>Reduction of <u>dead locks</u> due to consistent flush ordering. Before, the ordering of the database flush (INSERTS, UPDATES, DELETES) at the end of the transaction could lead to deadlocks, the new implementation enforces that any two transactions working on the same pair of entities will flush modifications in the same order.</li>
<li><u>1st level cache reuse</u>: the first level cache will always be consistent with the database at the end of a transaction which allows us to reuse it in subsequent transactions. The cache can currently be reused in sequences of asynchronous continuations executed by the Job Executor. At the end of a transaction we flush the deltas and then reuse the cache in the next transaction, instead of throwing the memory state away and re-fetching everything from the database. This makes asynchronous continuations a lot more light-weight.</li>
<li>In the future:</li>
<ul>
<li>&nbsp;it may be easier to support alternative databases such as Mongo DB. We already experimented with Hazelcase (in-memory data grid) as persistence provider and it worked out.</li>
<li>we will be able to remove the limitation induced by the fact that atomic operations are executed recursively: the stack size grows limiting the number of activity instance which can be executed in a single transaction. We could now remove this in the next release if users should need this.</li>
</ul>
</ul>
Next, the <u>scalability of the Job Executor</u>&nbsp;(responsible for asynchronous processing) has been improved in 7.2. Before only 1-2 nodes could consume effectively from the queue, now users can now have larger clusters.<br />
<u><br /></u>
<u>Custom history levels</u>: it is now possible to implement a custom history level which allows users to determine in a very fine granular way what data should be logged. This is useful for users with extreme amounts of process instances and who need to control the number of history events produced.<br />
<br />
<div>
Performance and &nbsp;scalability are continuous efforts for us. We improve them with each release because we always have customers who push the limits. I am already looking forward to the improvements we will have to do in the next release :)</div>
</div>
<h3>
Xml, Json and other Dataformats</h3>
<div>
The 7.2 release introduces support for <a href="http://docs.camunda.org/latest/guides/user-guide/#data-formats-xml-json-other">Xml and Json Dataformats</a> at different levels. Fist, the process enigne can now serialize Java Objects using Xml or Json out of the box.<br />
The serialization dataformat can be configured using the new, typed variable API:<br />
<br />
<pre>CustomerData customerData = new CustomerData();

execution.setVariable("customerData", objectValue(customerData)
  .serializationDataFormat(SerializationDataFormats.JSON)
  .create());
</pre>
<br />
We also introduce the <a href="http://docs.camunda.org/latest/api-references/spin/">Spin Dataformat API</a> which provides support for parsing, writing, querying and mapping Xml and Json data. The Spin Dataformat API can be used in Expression Language as well, allowing users to directly execute XPath or JsonPath when configuring sequence flow conditions:<br />
<br />
<pre>${XML(customer).xPath("/customer/address/postcode").element().textContent() == "1234"}
</pre>
<br />
The Spin Dataformat API allows users to extend it with custom functionality or implement their own dataformats. <a href="https://github.com/camunda/camunda-spin">Source code for the Spin Dataformat API is avaliable on Github</a>.</div>
<h3>
Improved Scripting &amp; Templating</h3>
<div>
Users can now use <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-scripting">script languages</a>, namely Javascipt, Groovy, JRuby and Jython. For these languages, support has been improved in the following way:<br />
<ul>
<li>Compilation: the process enigne can be configured to compile (and cache the compiled scripts) these languages. This <u>improves performance</u>.</li>
<li>Scripts <u>can now be used everywhere</u> where expression language or custom Java code can be used, including Execution Listeners, Task Listeners, Sequence Flow conditions.</li>
</ul>
<div>
On top of this, we provide script engine wrappers for <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-templating">template engines</a> (namely Freemarker, Apache Valocity and XSLT) which can be used everywhere where scripts are used. Template engines are useful for composing data and payload such as XML and JSON or formatting text such as Emails.</div>
</div>
<h3>
Out of the box REST and SOAP Connectors</h3>
<div>
<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-connectors">Camunda 7.2 introduces a new API for connectors</a>: the <a href="http://docs.camunda.org/latest/api-references/connect/">Camunda Connect API</a>. Out of the box, the 7.2 Release provides support for a REST and SOAP connectors.<br />
<br />
What makes connectors different from plain &nbsp;Java delegate implementations (which you already know)?<br />
<ol>
<li>The most important difference is that connectors declare their input / output parameters. This will make it possible for us to build tooling which allows users to configure the input / output parameters of arbitrary connectors. Connector I/O is configured using <a href="http://docs.camunda.org/7.2/guides/user-guide/#process-engine-process-variables-inputoutput-variable-mapping">variable I/O mapping</a> (also new :) )</li>
<li>Connectors provide a simple Interceptor API which allows users to customize connectors. This way they can implement cross cutting concerns such as logging, authentication, encryption etc.</li>
<li>Connectors provide a more Request / Response oriented API. We may also support asynchronous connectors in the future.</li>
</ol>
<div>
Note: camunda Modeler does not yet support configuring such connector, the next release of the modeler will provide this support.</div>
</div>
<h3>
Wildfly Application Server</h3>
<div>
Wildfy application server is now officially supported in Camunda BPM 7.2. :)</div>
<h2>
Upgrading to 7.2.0 Final</h2>
<div>
We have prepared a <a href="http://docs.camunda.org/7.2/guides/migration-guide/#migrate-from-camunda-bpm-71-to-72">migration guide</a> which explains how an existing installation or application can be upgraded to Camunda 7.2.0 Final.</div>
<h2>
Enterprise Support</h2>
The 7.2 release is the basis for the next supported production release for camunda BPM. It is fully supported in <a href="http://camunda.com/bpm/enterprise/">the Camunda BPM enterprise subscription</a>. Support includes Help Requests based on different SLAs as well as access to camunda BPM maintenance releases. Maintenance releases allow customers to get bugfixes for production systems based on the 7.2 codebase. While the community project will forge ahead for 7.3, we will backport bugfixes to the 7.2 branch and perform maintenance releases reserved for enterprise subscription customers.<br />
<br />
There is a <a href="http://docs.camunda.org/7.2/guides/migration-guide/#migrate-from-camunda-bpm-71-to-72">Migration Guide</a>&nbsp;targeting existing Camunda BPM 7.1 installations.

<br />
<h2>
Join the Release Webinars</h2>
<div>
Join us for our (free) <a href="http://camunda.com/landing/webinar-release72/">English</a> and <a href="http://camunda.com/de/landing/webinar-release72/">German</a> Release Webinars!</div>
<h2>
Community</h2>
Finally I want to thank the community for the awesome contributions we keep getting, both in the form of bug fixes and improvements to the main code base as well as community extension projects.<br />
<br />
<h2>
What's Next?</h2>
<div class="MsoNormal">
</div>
<ul>
<li>We will release camunda Cycle 3.1 providing support for Git connector (among others) and better extensibility.</li>
<li>The documentation will be improved, including chapters on Multi Tenancy</li>
<li>And after that: Camunda BPM 7.3 :)</li>
</ul>
<br />
<div class="MsoNormal">
<br /></div>
</div>
</div>