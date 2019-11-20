---
title: "Benchmarking Performance of camunda Process Engine - Broken SSDs and some Numbers"
date: "2014-01-22"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/01/benchmarking-camunda-process-engine.html"

---

<div>
<a href="http://blog.camunda.org/2014/01/gaining-insight-into-performance-of.html">Yesterday morning I posted some details</a> about our current performance testing efforts. At that point I was still developing the <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/qa/performance-tests-engine">performance testing framework</a> and using the H2 in-memory database when running tests, just to check whether everything runs clean. Yesterday evening, finally, I wanted to run some tests on a "real" database. &nbsp;I hadn't done any serious performance testing since a couple of month back when we released camunda BPM 7.0 Final and in the meantime I have switched my operating system from Windows 7 to Ubuntu Linux. Turns out that Linux is much more serious when it comes to I/O errors and broken SSDs. But more on that later. Let's start with some numbers.<br />
<br />
<br />
<a name='more'></a><br />
<h3>
Some Numbers</h3>
{{< figure src="http://1.bp.blogspot.com/--9ynIODsi2w/Ut_vU7x3flI/AAAAAAAAAT4/5PRgtrIJASw/s1600/screenshot.png" >}}
We ran the benchmarks with History Logging turned on and off. Obviously turning History off will improve performance dramatically :)<br />
<br />
<b><a href="https://jira.camunda.com/secure/attachment/17665/performance-test-results-22-01-2014.zip">Download the test results here.</a>&nbsp;(Contains many more processes than shown here).</b><br />
<b><br /></b>
<b>You can also <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/qa/performance-tests-engine">have a look at the testsuite itself</a>.</b><br />
<br />
<i>Numbers are PostgreSQL with stock memory configuration on the hardware described at the end of the post.</i><br />
<br />
<h3>
History vs. No History</h3>
If you look at a simple process which consists of a sequence with a single (no-op) step:<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-FpvEcxmH9y0/Ut_QASA3YVI/AAAAAAAAASk/W0nK_9T4IoA/s1600/SequencePerformanceTest.syncSequence1Step.png" >}}
Without History, we get the following results:<br />
<br />
{{< figure src="http://4.bp.blogspot.com/-Yt9qxCCrgFU/Ut_Ul177QxI/AAAAAAAAASw/Af69yr8GJ14/s1600/SequencePerformanceTest.asyncSequence1Step.png" >}}
Without history, we can execute up to 3937.01 Instances of this process per second using 4 Threads. This means that executing a single instance of this takes 0,2 Milliseconds. So not even a whole millisecond! As amazing as this sounds, there must be a trick involved :) And there is: The "trick" behind this number becomes clear if we look at the the Sql Statement log:<br />
<br />
{{< figure src="http://3.bp.blogspot.com/-bgV92OvYt5I/Ut_W2qGpGmI/AAAAAAAAAS8/w6XPMPM1dho/s1600/SequencePerformanceTest.asyncSequence1Step.sqllog.png" >}}
<br />
<br />
At History Level None, this process does not perform any inserts to the database, it will just perform a single SELECT. Since this process does not have any waitstate, it will just complete in a single transaction and we do not have to write off any execution state. If we dive into the details, we see that we just select the last version of the process definition:<br />
<br />
<pre style="white-space: pre-wrap; word-wrap: break-word;"><span style="font-size: x-small;">{
  "testName" : "SequencePerformanceTest.syncSequence1Step",
  "configuration" : {
    "testWatchers" : "org.camunda.bpm.qa.performance.engine.sqlstatementlog.StatementLogPerfTestWatcher",
    "historyLevel" : "none"
  },
  "passResults" : [ {
    "duration" : 7,
    "numberOfThreads" : 1,
    "stepResults" : [ {
      "stepName" : "StartProcessInstanceStep",
      "resultData" : [ {
        "statementType" : "SELECT_MAP",
        "statement" : "selectLatestProcessDefinitionByKey",
        "durationMs" : 5
      } ]
    } ]
  } ]
}</span></pre>
<br />
Given that we run this select over and over in the benchmark, I assume that the database will put this result into some sort of in-memory cache and will not actually hit the Disk a lot. Hence the results. Turning on history obviously has a dramatic performance impact. At history level "FULL" we can still run up to&nbsp;698.32 instances of this process per second, boiling down to a single instance taking about 1,43... Milliseconds. Which is still good. Looking at the Sql Statement Log explains the difference:<br />
<br />
<pre style="white-space: pre-wrap; word-wrap: break-word;"></pre>
<pre style="white-space: pre-wrap; word-wrap: break-word;"><span style="font-size: x-small;">{
  "testName" : "SequencePerformanceTest.syncSequence1Step",
  "configuration" : {
    "testWatchers" : "org.camunda.bpm.qa.performance.engine.sqlstatementlog.StatementLogPerfTestWatcher",
    "historyLevel" : "full"
  },
  "passResults" : [ {
    "duration" : 7,
    "numberOfThreads" : 1,
    "stepResults" : [ {
      "stepName" : "StartProcessInstanceStep",
      "resultData" : [ {
        "statementType" : "SELECT_MAP",
        "statement" : "selectLatestProcessDefinitionByKey",
        "durationMs" : 1
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricProcessInstanceEvent",
        "durationMs" : 1
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricActivityInstanceEvent",
        "durationMs" : 1
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricActivityInstanceEvent",
        "durationMs" : 0
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricActivityInstanceEvent",
        "durationMs" : 0
      } ]
    } ]
  } ]
}</span></pre>
<h3>
<span style="font-family: inherit; font-size: small; font-weight: normal;">On top of the select, we now need to perform 4 INSERTs, logging the Historic Activity Instances to the Database.&nbsp;</span></h3>
<div>
If you run the performance testsuite, you will find results for longer sequences with 5 and 15 Steps. There you can observe the same behavior.</div>
<h3>
Wait States</h3>
<div>
A second major performance factor are waitstates. Whenever the process engine hits a wait state, it must flush all its runtime memory state to the database so that it can pick up execution here later. Let's compare the results:</div>
<div>
<br /></div>
{{< figure src="http://2.bp.blogspot.com/-7Zae04TCyO0/Ut_bzCHAfPI/AAAAAAAAATM/KQAQFzNF0Og/s1600/SequencePerformanceTest.asyncSequence1Step.png" >}}
<div>
This time the difference between the history levels is not that big because in both cases we need to do more database communication:</div>
<div>
<br /></div>
<div>
<pre style="white-space: pre-wrap; word-wrap: break-word;"><span style="font-size: x-small;">{
  "testName" : "SequencePerformanceTest.asyncSequence1Step",
  "configuration" : {    
    "testWatchers" : "org.camunda.bpm.qa.performance.engine.sqlstatementlog.StatementLogPerfTestWatcher",
    "historyLevel" : "none"
  },
  "passResults" : [ {
    "duration" : 5,
    "numberOfThreads" : 1,
    "stepResults" : [ {
      "stepName" : "StartProcessInstanceStep",
      "resultData" : [ {
        "statementType" : "SELECT_MAP",
        "statement" : "selectLatestProcessDefinitionByKey",
        "durationMs" : 0
      }, {
        "statementType" : "INSERT",
        "statement" : "insertExecution",
        "durationMs" : 1
      } ]
    }, {
      "stepName" : "SignalExecutionStep",
      "resultData" : [ {
        "statementType" : "SELECT_MAP",
        "statement" : "selectExecution",
        "durationMs" : 1
      }, {
        "statementType" : "SELECT_MAP",
        "statement" : "selectProcessDefinitionById",
        "durationMs" : 0
      }, {
        "statementType" : "SELECT_LIST",
        "statement" : "selectVariablesByExecutionId",
        "durationMs" : 0
      }, {
        "statementType" : "SELECT_LIST",
        "statement" : "selectExecutionsByParentExecutionId",
        "durationMs" : 1
      }, {
        "statementType" : "DELETE",
        "statement" : "deleteExecution",
        "durationMs" : 0
      } ]
    } ]
  } ]
}</span></pre>
<pre style="white-space: pre-wrap; word-wrap: break-word;"><span style="font-size: x-small;">
</span></pre>
</div>
<span style="font-weight: normal;">In History, the historic&nbsp;Activity&nbsp;Instance needs to be INSERTED when the execution firsts enters the&nbsp;activity&nbsp;and then UPDATED (with an END timestamp + maked&nbsp;completed) when it is ended. In order for this update to be efficient, it is&nbsp;important&nbsp;that&nbsp;the existing Historic Activity Instance row can be located efficiently.</span><br />
<h3>
What we did last Summer: Optimizing&nbsp;History for Waitstates</h3>
<span style="font-weight: normal;">This brings me to something we made a lot of progress on when working on camunda BPM 7.0 Final: Having proper activity instance Ids in Runtime allows us to update history efficiently. <a href="http://blog.camunda.org/2013/06/introducing-activity-instance-model-to.html">A side effect of the changes described in this blogpost</a> was that we could highly optimize the update of open Historic Activity Instances in History: If you know the unique Id of an Activity Instance in Runtime and use that as primary key for the historic activity instance table in History, then you can do updates using the primary key. Which is way more efficient than the complex search query we did in the past. Back in summer we benchmarked this with a process containing 15 wait states:</span><br />
<span style="font-weight: normal;"><br /></span>
<br />
{{< figure src="http://4.bp.blogspot.com/-c1w_QInlZy8/Ut_lj62jcPI/AAAAAAAAATY/xJIqzvQ69X4/s1600/SequencePerformanceTest.asyncSequence15Steps.png" >}}
<span style="font-weight: normal;">We ran the benchmark in a way that we continuously had 200,000 running process instances and looked at how many we could complete while starting new ones:</span><br />
<span style="font-weight: normal;"><br /></span>
<span style="font-weight: normal;"><br /></span>
<br />
{{< figure src="http://4.bp.blogspot.com/-kHO8pe-m-34/Ut_mLe8dxrI/AAAAAAAAATg/JcXcmr8v6YA/s1600/wait-states-throughput.png" >}}
The blue line is the new implementation doing an update by primary key, the red line is the old implementation which needs to do a complex search on the table for the correct Historic Activity Instance. As you can see the optimization brings up to 40 more completed instances per second. What's more we could get rid of a large composite table index which took up more space than the actual data inside the table (after 5 million activity instances, the table size was ~1820MB, the Index size was ~3975MB, PostgreSQL) .<br />
<br />
Another thing which is now possible is asynchronous history logging using a messaging system. I am REALLY looking forward to benchmarking that configuration.<br />
<h3>
<b>Process Variables</b></h3>
A third major performance impact is process variables. Up until now we have only looked at process engine only state. But when implementing interesting processes, you usually want to move some data :)<br />
We included some simple process variable tests in the testsuite. The following charts shows how adding more process variables impacts throughput:<br />
<br />
{{< figure src="http://3.bp.blogspot.com/-k4bgBmRHXV8/Ut_q2pNvYJI/AAAAAAAAATs/2KqpKnzWJUQ/s1600/variables-throughput.png" >}}
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Going form a single String Variable to 10 String variables more than cuts throughput in half. This is explained by the fact that the process engine has to do an insert for each variable:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<pre style="white-space: pre-wrap; word-wrap: break-word;"><span style="font-size: x-small;">{
  "testName" : "VariablesPerformanceTest.noneStartEvent10StringVars",
  "configuration" : {
    "numberOfThreads" : 1,
    "numberOfRuns" : 1,
    "databaseName" : "org.h2.Driver",
    "testWatchers" : "org.camunda.bpm.qa.performance.engine.sqlstatementlog.StatementLogPerfTestWatcher",
    "historyLevel" : "full"
  },
  "passResults" : [ {
    "duration" : 26,
    "numberOfThreads" : 1,
    "stepResults" : [ {
      "stepName" : "StartProcessInstanceStep",
      "resultData" : [ {
        "statementType" : "SELECT_MAP",
        "statement" : "selectLatestProcessDefinitionByKey",
        "durationMs" : 2
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricProcessInstanceEvent",
        "durationMs" : 1
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricActivityInstanceEvent",
        "durationMs" : 2
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricVariableUpdateEvent",
        "durationMs" : 1
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricVariableInstance",
        "durationMs" : 1
      }, {
        "statementType" : "INSERT",
        "statement" : "insertHistoricVariableUpdateEvent",
        "durationMs" : 1
      }, ... ]
    } ]
  } ]
}</span></pre>
<br />
Byte variables are worse: In that case both a variable instance and a Byte array entity must be inserted.<br />
<br />
<h3>
<b>How I&nbsp;discovered&nbsp;that my SSD&nbsp;is broken</b></h3>
<div>
Yesterday evening I finally kicked the starter on the testsuite running on MySQL. Even though I said above that I am not really interested in getting any absolute numbers out of it, I was still kind of looking forward to the numbers. I own a Core i7 Quad Core processor with Intel SSD and plenty of main memory which is not a bad system in itself and I wanted to see how the numbers have evolved since this summer. But already after a few minutes, the benchmark died with some obscure I/O error messages I hadn't seen before. When I tried to check what happened I noticed that my file system was now mounted in read-only mode. Strange... There was nothing I could do but rebooting the system and trying again. On the second try, the same thing happened (different error message but same behavior). So I thought maybe there was something wrong with my MySQL installation and I tried PostgreSQL: same problem. So I gave up and went to bed in a grumpy mood. This morning the Linux experts here at camunda had a look and the diagnosis was that there is a Firmware Bug involved which is "Un Fixable" (heard that one before :) ) and leads to errors under heavy I/O. Windows 7 seems to ignore this but my Ubuntu Box was configured in a way that it puts the Filesystem into read-only mode when an error occurs. So there you have the ultimate proof: the process engine does stress your hardware to the max! :)</div>
<h3>
The Hardware we ended up running the Benchmark on</h3>
But luckily, Sebastian stepped in and offered to run the benchmarks on his box. He uses a Lenovo Thinkpad and runs Archlinux.<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-eG-wSACwtzE/Ut_EmI8x9UI/AAAAAAAAASU/IKI9ep1vSdo/s1600/hardware.jpg" >}}
Sebastian running the Benchmarks on his developer Box:<br />
<br />
<i>Intel Core i5 (4 Cores, 2.5 Ghz)</i><br />
<i>SSD Hard Disk,</i><br />
<i>8Gig Main Memory</i><br />
<i>Archlinux Kernel 3.12.8</i><br />
<br />
Now you are probably thinking: <i>What!?!?... some guy running a benchmark on his developer box while hacking away, writing email and wearing a dubious underground style hoodie... Are you kidding me? Am I supposed to take this seriously?</i><br />
<br />
I say: Yes you should! Here is why:<br />
<br />
a) We are not interested in absolute numbers anyway: As I explained yesterday, our goal with this performance testsuite is not to produce absolute numbers. We know from extensive customer interaction and own benchmarks that the process engine is fast. Just how fast exactly depends on a number of factors we cannot easily reproduce here anyway.&nbsp;So we may as well go ahead and run it on &nbsp;developer box. (The perspective is to integrate the performance testsuite into CI - yes we do have actual high performance pizza-box servers for that - and systematically track performance over time: see last paragraph of this post.)<br />
<br />
b) The <i>playing-around-while-wearing-the-underground-</i><i>hoodie</i><i>-numbers </i>are impressive enough, I think. Anything else can only be better ;)<br />
<h3>
The Perspective</h3>
<div>
As discussed in this previous post we want to further extend the test suite and integrate it into CI. This will allow us to systematically track the performance of the process engine as we add more features in the future.</div>
<br />
</div>