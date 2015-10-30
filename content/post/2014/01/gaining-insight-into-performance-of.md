---
title: "Gaining insight into the Performance of camunda Process Engine"
date: "2014-01-21"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/01/gaining-insight-into-performance-of.html"

---

<div>
The camunda process engine has a very active codebase and is constantly evolving. Only <a href="https://github.com/camunda/camunda-bpm-platform/commit/202913749dcd3ec88761699340a8bd0529b84e03">last week we did a major refactoring</a>, re-implementing the way the BPMN Boundary Event, Event Subprocess, Terminate End Event and similar constructs work. In summer we introduced an <a href="http://blog.camunda.org/2013/06/introducing-activity-instance-model-to.html">activity instance model</a> and rewrote the history implementation, turning it into a <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-history-and-audit-event-log">fire-and-forget event stream</a>.&nbsp;We also constantly add new features such as <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-incidents">incidents</a>&nbsp;and many others.<br />
When doing such refactorings, the extensive process engine testsuite gives us the confidence that we do not break existing functionality from a functional perspective (process engine currently has 1669&nbsp;Testases, over 500 were added last year). On top of that, we put quite some effort into database migration testing, <a href="https://github.com/camunda/camunda-bpm-platform/blob/5984ad3ba7552c4e07b5126802059b931753c08a/qa/test-db-instance-migration/test-fixture-70/src/test/java/org/camunda/bpm/qa/upgrade/TestActivityInstanceUpgrade.java">making sure that you can migrate running process instances</a> from one version of camunda BPM to another. However, one important thing that we did not systematically track until now is process engine performance. We did do intermittent benchmarks whenever we did major changes but until now we did not track performance systematically.<br />
In this post I want to give a short insight into the process engine performance testsuite we are currently setting up and the design goals behind it.<br />
<a name='more'></a><br />
<br />
We are currently setting up a <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/qa/performance-tests-engine">performance testsuite in the camunda BPM platform repository</a>. The testsuite is located in the qa/ folder and can be run as part of the maven build. (See project <a href="https://github.com/camunda/camunda-bpm-platform/blob/master/qa/performance-tests-engine/README.md">README</a> for details.) <b>We are still at the beginning of this effort but I wanted to share some insights early on.</b><br />
<h3>
Goals of the Performance Testsuite</h3>
The performance test suite will serve three main goals:<br />
<ul>
<li>Systematically tracking the evolution of the process engine performance over time,</li>
<li>Serving as a tool for process engine optimization,</li>
<li>Producing results for different process engine features and configurations.</li>
</ul>
<div>
Tracking performance over time is important due to the refactorings we do in the process engine codebase and the new features we constantly add. When adding a feature or when changing an existing feature, we want to see how this change impacts performance. Does the change make the process engine slower?</div>
<div>
<br /></div>
<div>
The testsuite shall also serve as a tool for optimization. The main source for optimizations in the process engine is looking at the database communication profile. Database communication constitutes the main bottleneck when it comes to process engine performance. If you can optimize database communication, the process engine will be faster. This is why the performance testsuite also provides the possibility to perform Database Sql Statement logging, counting the INSERTs, DELETEs, SELECTs and UPDATEs, performed by a test run.&nbsp;</div>
<div>
<br /></div>
<div>
Finally, we want to produce results for different features and configurations of the process engine. We want to provide answers to questions like "How does turning on history logging impact performance?", "What's the cost of a process variable?", "How do different BPMN constructs behave?". We can also run the testsuite against different databases and gain insight into the differences of these databases when used as persistence provider for the process engine.</div>
<h3>
Benchmarks</h3>
<div>
The benchmark runs the performance testsuite in multiple passes. Each pass will perform a configurable number of iterations on a certain number of threads. The first pass will use one thread, the second one two threads, the third one three threads and so forth. The benchmark gives some relative numbers as to how long it takes to run a certain process in a number of iterations with a given amount of threads. It will also show to which extent adding more threads will influence the performance numbers (scale up).<br />
<h3>
The Sql Statement Log</h3>
</div>
<div>
The Sql Statement Log allows gaining insight into the process engine's communication profile with the database, counting the INSERTs, UPDATEs, DELETEs and SELECTs performed by a testrun. This is interesting since the database communication is the main source of performance bottlenecks. It also provides the most potential for optimizations.</div>
<h3>
Output of a Performance Test</h3>
<div>
A performance test will produce a list of JSON files in the target/results/ folder of a project. The JSON files contain detailed data about the performance test. The following is the output of an individual SQL statement log for a process consisting solely of a message start event:</div>
<div>
<br /></div>
<br />
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">{</span></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; "testName" : "StartEventPerformanceTest.messageStartEvent",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; "configuration" : {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; "numberOfThreads" : 1,</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; "numberOfRuns" : 1,</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; "testWatchers" : "org.camunda.bpm.qa.performance.engine.sqlstatementlog.StatementLogPerfTestWatcher"</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; },</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; "passResults" : [ {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; "duration" : 8,</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; "numberOfThreads" : 1,</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; "stepResults" : [ {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; "stepName" : "StartProcessInstanceByMessageStep",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; "resultData" : [ {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statementType" : "SELECT_MAP",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statement" : "selectMessageStartEventSubscriptionByName",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "durationMs" : 1</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; }, {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statementType" : "SELECT_MAP",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statement" : "selectProcessDefinitionById",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "durationMs" : 1</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; }, {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statementType" : "INSERT",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statement" : "insertHistoricProcessInstanceEvent",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "durationMs" : 1</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; }, {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statementType" : "INSERT",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "statement" : "insertHistoricActivityInstanceEvent",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; "durationMs" : 1</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; } ]</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; } ]</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; } ]</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">}</span></div>
</div>
<h3>
Aggregating the Results</h3>
<div>
The performance test suite then allows to aggregate the reults of all individual test runs into an aggregated report which is rendered in both HTML and JSON format:&nbsp;</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-OHkgUeJSTtg/Ut4uxbWC7wI/AAAAAAAAASA/yxfU02JDbDM/s1600/sql-statement-log-report.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-OHkgUeJSTtg/Ut4uxbWC7wI/AAAAAAAAASA/yxfU02JDbDM/s1600/sql-statement-log-report.png" height="238" width="320" /></a></div>
<br />
<br />
<br />
<div class="separator" style="clear: both; text-align: left;">
The Html report can be read by us developers and the JSON report allows us to process the aggregated results further. For instance, we can compare two executions of the testsuite and get insight into whether performance turned to the better or the worse.</div>

</div>