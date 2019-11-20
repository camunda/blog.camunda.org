---
title: "camunda BPM 7.1.0-alpha4 released - BPMN coverage, Performance & Cockpit"
date: "2014-03-11"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/03/camunda-bpm-710-alpha4-released.html"

---

<div>
Today we released camunda BPM 7.1.0-alpha4. This release provides many improvements and bug fixes:<br />
<ul>
<li><b>Process Engine:</b></li>
<ul>
<li>BPMN coverage:&nbsp;</li>
<ul>
<li>Support for Non-Interrupting Event Subprocess - (<a href="https://jira.camunda.com/browse/CAM-112" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-112</a>) -&nbsp;<b><span style="color: red;">HOT</span></b></li>
</ul>
<li>Performance Improvements:</li>
<ul>
<li>Execution Tree pre-fetching (<a href="https://jira.camunda.com/browse/CAM-1967" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1967</a>)</li>
<li>Reduce number of database queries. (<a href="https://jira.camunda.com/browse/CAM-1905" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1905</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-1906" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1906</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-1966" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1966</a>)</li>
</ul>
<li>Message Correlation Improvements:&nbsp;</li>
<ul>
<li>Added Fluent Builder &amp; Correlation using Process Instance Id (<a href="https://jira.camunda.com/browse/CAM-1775" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1775</a>)</li>
</ul>
</ul>
<li><b>camunda Cockpit </b>(Webapplication for Monitoring &amp; Operations)<b>:</b></li>
<ul>
<li>Community Features:</li>
<ul>
<li>Resolve Caching problems - Try 1 (<a href="https://jira.camunda.com/browse/CAM-1899" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1899</a>)</li>
<li>Improved Plugin API (<a href="https://jira.camunda.com/browse/CAM-1737" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1737</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-1958" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1958</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-1959" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1959</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-1960" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1960</a>,&nbsp;<a href="https://jira.camunda.com/browse/CAM-1961" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1961</a>)</li>
<li>Search &amp; Filter Activity Instance Tree (<a href="https://jira.camunda.com/browse/CAM-1874" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1874</a>)</li>
</ul>
<li>Enterprise only:</li>
<ul>
<li>History of Variables (<a href="https://jira.camunda.com/browse/CAM-73" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-73</a>)</li>
<li>History of User Tasks (<a href="https://jira.camunda.com/browse/CAM-1875" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1875</a>)</li>
</ul>
</ul>
<li><b>Bpmn Model API:</b></li>
<ul>
<li>Support for all camunda Extension elements &amp; Attributes (<a href="https://jira.camunda.com/browse/CAM-1854" style="background-color: white; color: #3b73af; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-decoration: none;">CAM-1854</a>)</li>
</ul>
</ul>
<br />
All in all, 45 Issues were closed.&nbsp;<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13194">Find the complete release notes in Jira.</a><br />
<br />
<a href="http://camunda.org/download/">Download camunda BPM 7.1.0-alpha4 now!</a>&nbsp;Give us Feedback <a href="http://camunda.org/community/forum.html">in the forums</a> and via Twitter:&nbsp;<a href="https://twitter.com/camundaBPM">@camundaBPM</a>.<br />
<br />
<a name='more'></a><h3>
New camunda Cockpit Features</h3>
<div>
First, we<b> tried to fix the caching problems</b> many of our users experienced, see:</div>
<div>
<a href="https://groups.google.com/forum/#!searchin/camunda-bpm-users/cockpit$20cache/camunda-bpm-users/mnd1RXAiR50/veSaemAPVmAJ">https://groups.google.com/forum/#!searchin/camunda-bpm-users/cockpit$20cache/camunda-bpm-users/mnd1RXAiR50/veSaemAPVmAJ</a></div>
<div>
<br /></div>
<div>
Let us know if you experience any problems when you upgrade camunda BPM this time.&nbsp;</div>
<div>
<br /></div>
<div>
Second, we added some new features:</div>
<div>
<br /></div>
<div>
<b>The Possibility to Filter / Search the Activity Instance Tree:</b></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
{{< figure src="http://3.bp.blogspot.com/-22XSc_0BsDs/Ux9PGXS9obI/AAAAAAAAAV0/XWrCNzhvSqQ/s1600/filter-tree.png" >}}
<div>
<b><br /></b></div>
<div>
<br /></div>
<div>
<b>Enterprise Edition only: The Variable History Log</b></div>
{{< figure src="http://4.bp.blogspot.com/-44_rBiWnXSw/Ux9PHB_a3KI/AAAAAAAAAWQ/wly0W2kyoWk/s1600/variables.png" >}}
<div>
<b><br /></b></div>
<div>
<br /></div>
<div>
<b>Enterprise Edition only:&nbsp;The User Task History Log</b></div>
{{< figure src="http://1.bp.blogspot.com/-9DjgHPb5y4M/Ux9PGby_RTI/AAAAAAAAAWE/fvDjMbO-8As/s1600/usertask.png" >}}
<div>
<b><br /></b></div>
<div>
<br /></div>
<div>
<b>Enterprise Edition only:&nbsp;Visualize number of cancelled Activity Instances on Diagram:</b></div>
{{< figure src="http://1.bp.blogspot.com/-KqzaFyZWhSU/Ux9PGdM8fDI/AAAAAAAAAWI/MHpIsOmg5o4/s1600/state-cancelled.png" >}}
<div>
<b><br /></b></div>
<div>
<br /></div>
<div>
And finally, we added the possibility to <b>write plugins for the camunda Admin application</b>. The camunda Admin application now features a "System" section which can be enhanced using plugins:</div>
<div>
<br /></div>
{{< figure src="http://1.bp.blogspot.com/-cRuZTyQosXI/Ux8tCoYBfzI/AAAAAAAAAVU/j99S-_tkvY8/s1600/admin.png" >}}
<h3>
Finally arrived: the Non Interrupting Event Subprocess:&nbsp;</h3>
<div>
We finally added support for the non interrupting event Subprocess. Actually most of the code was already added with alpha3 but we had to do some additional testing and minor fixes for Multi Instance cases before we could release it officially.</div>
<div>
<br /></div>
<div>
The non-interrupting event subprocess allows to react to an event (like a message, a signal or a timer) without interrupting the main flow of the process:</div>
<div>
<br /></div>
{{< figure src="http://1.bp.blogspot.com/-qKmBDwbcb3A/Ux8kIdcuPNI/AAAAAAAAAU4/Ce-DReJ2n8w/s1600/event_subprocess.png" >}}
<div>
In the example above, if a new guest introduces himself, the main flow will not be interrupted. Executing such processes was not possible before.<br />
<br /></div>
<div>
For those of you interested in the implementation details: we added <a href="https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/main/java/org/camunda/bpm/engine/impl/pvm/runtime/AtomicOperation.java">a new base operation (Atomic Operation)</a> to the process engine which allows to start an activity concurrently. The same code is now also used for non interrupting boundary events which, on an abstract level, behave very similarly with one key difference: for correctly supporting event subprocesses we had to implement execution tree expansion which re-expands a compacted execution tree into a concurrency tree:</div>
<div>
<br /></div>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp;Compacted Subtree &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Expanded Subtree</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp;================= &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;================</span><br />
<span style="font-family: Courier New, Courier, monospace;"><br /></span>
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ... &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;...</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; +------+ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;+-------+ &nbsp; Scope=tt</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; | &nbsp;e &nbsp; | &nbsp; &nbsp; &nbsp; =&gt; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; e &nbsp; | &nbsp; ConCurrent=ff</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; +------+ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;+-------+</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; s=tt &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;^</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;cc=ff &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; / \</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; / &nbsp; \</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/ &nbsp; &nbsp; \ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Both:</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; +-------+ &nbsp; +--------+ &nbsp; &nbsp;s=ff</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | CCE-1 | &nbsp; | PPE &nbsp; &nbsp;| &nbsp; cc=tt</span><br />
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; +-------+ &nbsp; +--------+</span><br />
<div>
<br /></div>
<div>
<br /></div>
<div>
Find more information in the <a href="http://camunda.org/bpmn/reference.html#activities-event-subprocess">BPMN Reference</a>&nbsp;and the <a href="http://docs.camunda.org/latest/api-references/bpmn20/#subprocesses-event-subprocess">BPMN Implementation Reference</a>.</div>
<div>
<br /></div>
<h3>
Performance Improvements</h3>
<div>
We did some performance improvements in two areas:<br />
<br />
<ul>
<li>Reducing the number of unnecessary selects,</li>
<li>Execution Tree Pre-fetching</li>
</ul>
<br />
In the following process we reduced the number of selects necessary for triggering the boundary event from 33 down to 8:<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-1GBwk4nNMNk/Ux8nFaLGEpI/AAAAAAAAAVE/HlcoZ-cqD8k/s1600/BoundaryEventPerformanceTest.interruptingOnConcurrentTask.png" >}}
The testcase is part of our <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/qa/performance-tests-engine">performance testsuite</a>. The results can be verified using the "Sql Statement Log".<br />
<br />
Log for alpha 3 vs. Log for alpha4<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-tgxw4IJSuZU/Ux9RHJDyKCI/AAAAAAAAAWg/i3gDmn5Dvps/s1600/alpha4.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-tgxw4IJSuZU/Ux9RHJDyKCI/AAAAAAAAAWg/i3gDmn5Dvps/s1600/alpha4.png" height="287" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">alpha4 NEW</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-QH03_z2UbLk/Ux9RFC6ZVEI/AAAAAAAAAWY/3Ef1ih-RemI/s1600/alpha3.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://1.bp.blogspot.com/-QH03_z2UbLk/Ux9RFC6ZVEI/AAAAAAAAAWY/3Ef1ih-RemI/s1600/alpha3.png" height="283" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">alpha3 OLD</td></tr>
</tbody></table>
<br />
<br />
Performance Benchmarks show an improvement in performance of roughly 30% if the database runs on a different machine then the process engine.<br />
<br />
Execution tree pre-fetching w<span style="font-family: inherit;">ill f</span><span style="background-color: white;"><span style="font-family: inherit;"><span style="line-height: 20px;">etch all the executions inside the same process instance upon the first access of an execution from the&nbsp;</span></span><span style="line-height: 20px;">hierarchy which is not equal to the initially fetched execution. The executions will be fetched</span><span style="font-family: inherit;"><span style="line-height: 20px;">&nbsp;as list and we then reconstruct the complete execution tree.</span></span></span><span style="background-color: white; font-family: inherit; line-height: 20px;">&nbsp;</span><br />
<span style="font-family: inherit;"><br style="background-color: white; line-height: 20px;" /><span style="background-color: white; line-height: 20px;">In many cases this is an optimization over fetching the execution tree lazily. Usually we need all executions anyway and it is preferable to fetch more data in a single query (maybe even too much data) then to run multiple queries, each returning a fraction of the data.&nbsp;</span><br style="background-color: white; line-height: 20px;" /><br style="background-color: white; line-height: 20px;" /><span style="background-color: white; line-height: 20px;">The most important consideration here is network roundtrip: If the process engine and database run on separate hosts, network roundtrip has to be added to each query. Economizing on the number of queries economizes on network roundtrip. The tradeoff here is network roundtrip vs. throughput: multiple roundtrips carrying small chucks of data vs. a single roundtrip carrying more data.</span></span><br />
<h3>
What else is gioing on?</h3>
<a href="http://blog.camunda.org/2014/03/camunda-bpm-assert-10-released-as.html">Matrin Schimak has released camunda BPM assert 1.0!!!!!!!!!&nbsp;</a><br />
<br />
<a href="http://network.camunda.org/meetings/28">Join us at our community event here in Berlin on March 18th!</a> The Beer (and Bionade) has already arrived and is well guarded by Nastasja, our community manager!<br />
<br />
{{< figure src="http://2.bp.blogspot.com/--wQhoP3odoY/Ux8yFAMaX6I/AAAAAAAAAVk/gHXjv-uFwj4/s1600/beer.jpg" >}}
<br />
<br />
<br />
<br /></div>
<br />
<br />
<br />
</div>