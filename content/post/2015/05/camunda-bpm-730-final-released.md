---
title: "Camunda BPM 7.3.0 Final Released"
date: "2015-05-29T13:00:00+02:00"
author: "Daniel Meyer"

categories:
  - "Release"
tags: 
  - "release notes"

aliases:
  - "/2015/05/camunda-bpm-730-final-released.html"

---

I’m pleased to announce the availability of Camunda 7.3.0 Final. The release focuses on improving Camunda BPM for large production deployments. The highlights are:<br />
<ul><li>Process instance repair and modification: go back or skip ahead in a process.</li>
<li>Authorizations: restrict access to processes, tasks and administrative actions.</li>
<li>Search for process instances and incidents in Cockpit</li>
<li>Starting new process instance at any activity / set of activities</li>
<li>Tasklist extensibility and customization: extend the Tasklist Web Application with Html and Javascript based plugins.</li>
</ul>A <a href="#features-overview">detailed feature overview</a> can be found at the end of this the post.<br />
<div style="background-color: #f4f6f4; border: 1px solid #e4e6e4; border-radius: 3px; max-width: 500px; overflow: hidden; margin: 30px auto;">  <h2 style="padding: 15px; float: left; position: relative; margin: 0; display-block; text-align: center; width: 300px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;">    <a href="http://camunda.org/download" title="Oh Yeah!" style="font-size: 28px; line-height: 32px; display: block; text-align: center;">Download For Free</a>   </h2><h3 style="padding: 15px; float: right; position: relative; margin: 0; display-block; text-align: center; width: 200px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;">    <a href="https://registry.hub.docker.com/u/camunda/camunda-bpm-platform/" title="Ahoi!" style="font-size: 20px; line-height: 32px; display: block; text-align: center;">Run with Docker</a>   </h3></div><div style="text-align:center; width:100%"><a href="https://network.camunda.org/webinars/28">Register for the Webinar</a><br />
</div><a name='more'></a><br />
<h2>Process Instance Repair and Modification</h2>Sometimes process instances somehow take a wrong turn or end up in a state they should not be in. Or, you need to "rewind", "go back" in order to re-execute some steps with different parameters. Sometimes you also need to skip some steps for whatever reason. Yes, that should not happen but in reality there are all kinds of things that can go wrong in the environment of a process which lead to a situation where you need to "repair" a process instance. Camunda now provides a killer feature for this:<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-rZ_WJwqplJ4/VWczW-p6MvI/AAAAAAAACVU/nLtw4W7POyA/s1600/modification.gif" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="http://4.bp.blogspot.com/-rZ_WJwqplJ4/VWczW-p6MvI/AAAAAAAACVU/nLtw4W7POyA/s640/modification.gif" width="640" /></a></div><br />
We call this feature <em>Process instance Modification</em>. It allows you to freely start or cancel any activity in a BPMN process or "move" a token by cancelling the current activity and starting another activity as shown in the animation above. <!--Implementing this feature in a way that it functions consistently for all supported BPMN elements including for constructs such as multi instance sub processes was hard but we managed to do it. On our way, we substantially improved the internal implementation of the BPMN execution core (again :)). As a result, the internal implementation is now much easier to understand and constructs such as multi instance and event subprocesses are implemented in a much simpler way and in a way which is more compliant to the BPMN specification.--><br />
<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-process-instance-modification">More information on process instance modification including the corresponding apis can be found in the docs.</a><br />
<br />
<em>Note: In the community edition, the feature is exposed through the Java and Rest apis. The <a href="http://docs.camunda.org/7.3/guides/user-guide/#cockpit-process-instance-modification">UI plugin for Cockpit</a> shown in the animation above is only included in the <a href="http://camunda.com/bpm/enterprise/">Commercial version of Camunda BPM</a>.</em><br />
<br />
<h2>Authorizations</h2>Camunda now features a full fledged authorization framework allowing you to configure<br />
<ul><li>which tasks, processes, cases... a user is allowed to see,</li>
<li>how a user can interact with these resources, for instance, which tasks a user is authorized to complete, which processes he can start and so forth.</li>
</ul>Authorizations can be configured in the Camunda Admin application (or using the Java and Rest apis):<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-grgci47AB_I/VWb8IaILRuI/AAAAAAAACUs/QPOG3DpVvmA/s1600/authorizations.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="396" src="http://4.bp.blogspot.com/-grgci47AB_I/VWb8IaILRuI/AAAAAAAACUs/QPOG3DpVvmA/s640/authorizations.png" width="640" /></a></div>Once configured, authorizations are enforced by the Java api and the Rest api.<br />
<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-authorization-service">More details on authorizations can be found in the User Guide</a>.<br />
<br />
<h2>Search for process instances and incidents in Cockpit</h2>In Cockpit, you can now search for process instances and incidents (failures) on the dashboard. You can use all the criteria provided by the historic process instance and incident search api:<br />
<a href="http://2.bp.blogspot.com/-RlXkP9OPA8A/VWgqWcaKm5I/AAAAAAAACXY/DaP7f14Au6E/s1600/cockpit-search.png" imageanchor="1" ><img border="0" src="http://2.bp.blogspot.com/-RlXkP9OPA8A/VWgqWcaKm5I/AAAAAAAACXY/DaP7f14Au6E/s640/cockpit-search.png" /></a><br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#cockpit-dashboard-search">More information can be found in the docs</a><br />
<br />
<br />
<h2>Starting new process instance at any activity / set of activities</h2>You can now start a process instance at any activity / set of activities. The following example shows how to create a new process instance which does not start at the start event but at two other activities ("SendInvoiceReceiptTask" and "DeliverPizzaSubProcess"):<br />
<pre class="prettyprint"><code class="language-java">ProcessInstance instance = runtimeService.createProcessInstanceByKey("invoice")
  .startBeforeActivity("SendInvoiceReceiptTask")
    .setVariable("creditor", "Nice Pizza Inc.")
  .startBeforeActivity("DeliverPizzaSubProcess")
    .setVariableLocal("destination", "12 High Street")
  .execute();
</code></pre><a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-process-engine-concepts-starting-a-process-instance-at-any-set-of-activities">More details can be found in the documentation.</a><br />
 <br />
<h2>Tasklist Extensibility and Customization</h2>You can now extend and customize Camunda Tasklist with plugins.<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-72gOpFz2Lb0/VWgLyRSkTxI/AAAAAAAACXI/wex3YC2TdkU/s1600/tasklist.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-72gOpFz2Lb0/VWgLyRSkTxI/AAAAAAAACXI/wex3YC2TdkU/s640/tasklist.png" /></a></div><br />
Tasklist plugins can be implemented with HTML and Java Script. They allow you to add additional domain specific functionality to the tasklist.<br />
<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#tasklist-plugins">More details on Tasklist Plugins can be found in the Docs.</a><br />
<br />
<h2>Getting the new Release</h2><a href="http://camunda.org/download">Download Camunda</a> or <a href="https://registry.hub.docker.com/u/camunda/camunda-bpm-platform/">run it with Docker</a>.<br />
You can use <a href="http://docs.camunda.org/7.3/guides/getting-started-guides/#apache-maven-apache-maven-coordinates">Apache Maven</a> for embedding Camunda in your custom java applications.<br />
<br />
<h2>Enterprise Support</h2>This new minor release is fully supported in the <a href="http://camunda.com/bpm/enterprise/">Camunda BPM Enterprise Subscription</a>. Support includes Help Requests based on different SLAs as well as access to maintenance releases. Maintenance releases allow customers to get bugfixes for production systems based on the 7.3 branch. While the community project will now start working on 7.4, we will backport bugfixes to the 7.3 branch and perform maintenance releases reserved for enterprise subscription customers.<br />
<br />
<h2>Upgrading to 7.3.0</h2>There is a <a href="http://docs.camunda.org/7.3/guides/migration-guide/#migrate-from-camunda-bpm-72-to-73">Migration Guide</a> targeting existing Camunda BPM 7.2 installations.<br />
<br />
<h2 id="features-overview">Detailed Feature Overview</h2>Here is a more detailed feature overview of both Api and web application features:<br />
<br />
<h4>New Api Features</h4><ul><li><a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-authorization-service">Authorization Framework</a>,</li>
<li>Runtime Api:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-process-engine-concepts-starting-a-process-instance-at-any-set-of-activities">Starting a Process Instance at any activity / set of activities</a>,<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-process-instance-modification">Process instance repair and modification: go back and skip ahead in a process</a>,</li>
<li>History Api:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-history-and-audit-event-log-history-entities">Monitor Job Execution with Historic Job Log</a>,<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-history-and-audit-event-log-partially-sorting-history-events-by-their-occurrence">Sorting History Events by occurrence</a>, Extended auditing through User Operation Log,</li>
<li>Task Api:<br />
sort by variable value, additional search parameters</li>
<li>BPMN:<br />
Re-implementation of Multi Instance Loop Characteristics,<br />
Correct implementation of Event Subprocess,</li>
<li>CMMN:<br />
<a href="http://docs.camunda.org/7.3/api-references/cmmn10/#overview-cmmn-10-overview-and-coverage-markers">Required Rule</a>,<br />
<a href="http://docs.camunda.org/7.3/api-references/cmmn10/#markers-auto-complete">Auto Complete</a><br />
<a href="http://docs.camunda.org/7.3/api-references/bpmn20/#subprocesses-call-activity-create-a-case-instance">Use BPMN Call Activity for starting a CMMN Case</a></li>
<li>Data format Api:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#data-formats-xml-json-other-json-native-json-variable-value">native support for Json and XML variables</a>,<br />
<a href="http://docs.camunda.org/7.3/api-references/spin/#handling-xml-querying-xml-querying-with-namespaces">support for namespaces in XPath</a>,</li>
<li><a href="http://docs.camunda.org/7.3/guides/user-guide/#introduction-supported-environments">Support for additional Databases, Application Servers and Java Runtimes</a>,</li>
<li>Job Executor:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#process-engine-the-job-executor-the-job-order-of-job-acquisition">Control order of Job Execution</a></li>
</ul><br />
<h4>New Web Application Features</h4><ul><li>Cockpit:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#cockpit-process-instance-modification">Process Instance Modification</a>,<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#cockpit-dashboard-search">Advanced Search</a>,<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#cockpit-history-view-process-instance-historical-view">Historic Job Log</a>,<br />
Improved support for Object Variables,<br />
minification of HTML and Javascript resources</li>
<li>Tasklist:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#tasklist-plugins">Customization and Extensibility (Plugins)</a>,<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#tasklist-dashboard-search-for-tasks">Advanced Search</a> with <a href="http://docs.camunda.org/7.3/guides/user-guide/#tasklist-dashboard-search-for-tasks">advanced sorting options</a>,<br />
Zoom BPMN Process Diagram,<br />
<a href="http://docs.camunda.org/7.3/api-references/embedded-forms/#supported-html-controls-file-input-fields">File Upload</a>,<br />
Standalone Tasks,<br />
<a href="http://docs.camunda.org/7.3/api-references/embedded-forms/#working-with-json-objects">working with Json Data in Forms</a>,<br />
</li>
<li>Admin:<br />
<a href="http://docs.camunda.org/7.3/guides/user-guide/#admin-administrator-account-restrict-process-permissions">Edit Authorizations</a>,<br />
Flow Node Count,<br />
minification of HTML and Javascript resources</li>
<li>Commons UI:<br />
<a href="http://camunda.github.io/camunda-commons-ui/latest/">Reusable Widget library</a> including widgets for displaying BPMN diagrams, editing Variables ...</li>
</ul><br />
<h2>Thank You</h2>I want to take this opportunity to thank everybody who contributed to the new release including our community members and our amazing <a href="http://camunda.org/team/">team</a> at Camunda.