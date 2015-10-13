---
title: "Monitor collaborating executable BPMN 2.0 processes in cockpit"
date: "2013-11-29T14:30:00+01:00"
author: "Bernd Rücker"

categories:
  - "Development"
tags: 
  - "BPMN"
  - "cockpit"

aliases:
  - "/2013/11/monitor-collaborating-executable-bpmn.html"

---

In a current customer project we faced the issue that there were two executable processes - independent of each other. So far - so normal. But these two processes had to sync status here and there - so they were clearly related, but not by using a&nbsp;<a href="http://docs.camunda.org/latest/api-references/bpmn20/#subprocesses-call-activity" target="_blank">Call Activity</a>. BPMN 2.0 allows this by <b>communication via messages</b>&nbsp;as shown in the following example. But how to keep track of this in monitoring? We developed a small c<b>ockpit plugin</b> to show the related process instances - see below.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-0IneiSViOHI/UpiTR9OmReI/AAAAAAAAALs/tjfPu89PKnQ/s1600/collaboration.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-0IneiSViOHI/UpiTR9OmReI/AAAAAAAAALs/tjfPu89PKnQ/s400/collaboration.png" height="192" width="400" /></a></div>
<a name='more'></a>The process is in the area of IT infrastructure management, where changes are handled by multiple different change processes handled by different departments which are pretty autonomous. But actually for todays post it is not really important what the process does. I can just add that I am pretty happy that camunda is small enough to have much easier processes in place for IT infrastructure management ("Hey Stefan - get the wireless working please" ;-)).<br />
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
I added a new example process application showing the above process in action - including the Java code I wrote in order so send all the messages:</div>
<div class="separator" style="clear: both; text-align: left;">
<span style="color: #0000ee; font-size: large;"><u><a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/cockpit-plugin-bpmn-collaboration">https://github.com/camunda/camunda-consulting/tree/master/snippets/cockpit-plugin-bpmn-collaboration</a></u></span></div>
<br />
I used process variables ("callingProcess" and "calledProcess") to remember which processes communicate with each other. I used this variables in a pretty straight forward <a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit-plugins" target="_blank">cockpit plugin</a> showing the related processes &nbsp;for a selected process instance (comparable to what we do out-of-the-box for call activities):<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-i7dvJ2Q2-sY/UpiVNDaxlOI/AAAAAAAAAL4/d2s2_8iOrVg/s1600/screenshot1.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-i7dvJ2Q2-sY/UpiVNDaxlOI/AAAAAAAAAL4/d2s2_8iOrVg/s320/screenshot1.png" height="221" width="320" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
This makes it pretty easy to keep everything under control in operations. And the best: It took only a couple of minutes to write the plugin :-)<br />
<br />
Check it out yourself:<br />
<span style="font-size: large;"><a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/cockpit-plugin-bpmn-collaboration">https://github.com/camunda/camunda-consulting/tree/master/snippets/cockpit-plugin-bpmn-collaboration</a></span><br />
<br />
Feedback always welcome - use our <a href="http://camunda.org/community/forum.html" target="_blank">forum</a>.