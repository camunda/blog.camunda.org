---
title: "Gracefully Cancelling a Process Instance"
date: "2015-02-02"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/02/gracefully-cancelling-process-instance.html"

---

<div>
Cancelling a running process instance in Camunda is easy:
<br />
<pre>DELETE /process-instance/{id}
</pre>
or, using Java API:
<br />
<pre>RuntimeService.deleteProcessInstance(String, String)
</pre>
this will simply delete the process instance and remove it from the database. Sometimes this is exactly what you need.<br />
<br />
However: what if you want to cancel the process instance gracefully? Gracefully in the sense that the effects it has had on the outside world are undone? The answer to this is compensation. In this post I discuss two ways to implement compensation.<br />
<br />
<a name='more'></a><br /><br />
<h3>
Internal Compensation</h3>
Modeling compensation inside the process itself:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-KBa6dKFuMxE/VM9uZjhaNvI/AAAAAAAABNQ/MWRNag5wgqA/s1600/internal-compensation.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-KBa6dKFuMxE/VM9uZjhaNvI/AAAAAAAABNQ/MWRNag5wgqA/s1600/internal-compensation.png" /></a></div>
<br />
<br />
The compensation undoes the effects of the process so far. This is usually modeled in a way where you attach a <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-task-markers-compensation">compensation handler</a> to those service tasks which have effects on "the outside world" and implement logic which undoes the effects of those service tasks. Then, top level inside the process you can have an <a href="http://docs.camunda.org/latest/api-references/bpmn20/#subprocesses-event-subprocess">interrupting event subprocess</a> with a message start event followed by an intermediate compensation throw event.<br />
<br />
When you send the message it will<br />
<br />
<ol>
<li>interrupt (effectively cancel) everything currently happening inside the process instance.</li>
<li>throw compensation which will propagate to all compensation handlers which have been activated so far.</li>
</ol>
<br />
<b>Advantage</b><br />
<br />
<ul>
<li>everything self-contained inside the same process model</li>
<li>compensation handlers can directly access variables of the process instance</li>
<li>the process engine "knows" which service tasks have already been executed (effectively how far the process instance made progress) and handles triggering of the right compensation handlers for you</li>
</ul>
<br />
<b>Downside</b><br />
<br />
<ul>
<li>you cannot implement it "retro actively" in the sense that it already has to be modeled inside the process before you deploy the process.</li>
<li>if every service task has a compensation handler, the model may become "cluttered".</li>
</ul>
<h3>
External Compensation</h3>
Modeling a second process which undoes the effects of the first process.<br />
<br />
First, you model a regular process (lets call it the "main process") without any compensation logic:<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-lMshnWfbdOQ/VM9unCamdaI/AAAAAAAABNY/tOCswuXzvwU/s1600/external-compensation-main.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-lMshnWfbdOQ/VM9unCamdaI/AAAAAAAABNY/tOCswuXzvwU/s1600/external-compensation-main.png" /></a></div>
<br />
Then you can model a second process (lets call it "compensation process") which undoes the effects of the main process:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-RIHkO93Tl4s/VM9vMUGTZ7I/AAAAAAAABNo/S6xKQkPLYy4/s1600/external-compensation.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-RIHkO93Tl4s/VM9vMUGTZ7I/AAAAAAAABNo/S6xKQkPLYy4/s1600/external-compensation.png" /></a></div>
<br />
The compensation process can load the variables of the main process from history and may also check history to see how far the main process has made progress (because it does not know which services in the main process were executed and which services were not).<br />
<br />
<b>Or Better</b>: you provide the necessary variables as input of the compensation process and make the compensation services idempotent. Meaning, the Cancel Flight service does nothing if no flight has been booked. That way you can just call them all.<br />
<br />
<b>Advantage</b><br />
<br />
<ul>
<li>can be done retro-actively after the "main process" has been deployed into production</li>
<li>cancellation and compendation logic do not "clutter" main process model</li>
</ul>
<br />
<b>Downside</b><br />
<br />
<ul>
<li>if you change the main process you may have to change the compensation process. People tend to forget to do this :) If you have everything inside a single model, this is simpler.</li>
<li>You either need to load the progress of the main process from history or make the compensation services idempotent</li>
</ul>
<div>
<br /></div>
<div>
Any thoughts?</div>

</div>