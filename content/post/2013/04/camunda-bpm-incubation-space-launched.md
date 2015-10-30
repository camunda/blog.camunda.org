---
title: "camunda BPM incubation space launched with contribution by plexiti"
date: "2013-04-24"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/04/camunda-bpm-incubation-space-launched.html"

---

<div>
<div class="separator" style="clear: both; text-align: left;">
I am happy to announce the official launch of the camunda BPM incubation space with the first large community contribution by <a href="http://plexiti.com/">plexiti</a>.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
View it on github:&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
<a href="https://github.com/camunda/camunda-bpm-incubation">https://github.com/camunda/camunda-bpm-incubation</a></div>
<div class="separator" style="clear: both; text-align: left;">
<a href="https://github.com/camunda/camunda-bpm-fluent-testing">https://github.com/camunda/camunda-bpm-fluent-testing</a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
The goal of the camunda BPM incubation space is to promote the development of interesting new projects and ideas around BPM, BPMN and process engines.<br />
<br />
Due to the productization and stabilization focus in the camunda BPM core platform, we decided to&nbsp;separate out these&nbsp;experimental&nbsp;projects from the core platform. The core BPM platform is stable and maintained and can be found in the github repository&nbsp;<a href="https://github.com/camunda/camunda-bpm-platform">camunda-bpm-platform</a>. This is also the base for the supported (commercial)&nbsp;<a href="http://www.camunda.com/fox/product/community-vs-enterprise/">camunda BPM platform product</a>.&nbsp;<a href="https://github.com/camunda/camunda-bpm-incubation">The camunda-bpm-incubation</a>&nbsp;repository contains a list of incubation projects which may be located in that repository itself or inside a different repository. We hope that this helps us finding a balance between being able to try out new innovative ideas (possibly in an unstructured or even unstable manner) but still being able to provide a stable "core" project. I think that this is also helpful for users of the project: users immediately see which parts of the project are stable and maintained and which other parts are still experimental.<br />
<h3>
Plexiti makes the first large&nbsp;community&nbsp;contribution to camunda BPM</h3>
<div>
The first project started in the incubation space is located at&nbsp;<a href="https://github.com/camunda/camunda-bpm-fluent-testing">https://github.com/camunda/camunda-bpm-fluent-testing</a>&nbsp;and is a contribution by <a href="http://plexiti.com/">plexiti</a>.&nbsp;</div>
<div>
<br /></div>
<div>
Plexiti is an innovative company from Vienna / Austria and founded by <span style="font-family: inherit;">Martin Schimak&nbsp;</span><span style="font-family: inherit;">and&nbsp;</span><span style="font-family: inherit;">Rafael Cordones. <a href="http://network.camunda.org/meetings/3" target="_blank">You can meet them at our jointly organized community event in Vienna</a>.</span></div>
<div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<br /></div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<a href="https://groups.google.com/d/msg/camunda-bpm-dev/m8VDRnZe55A/YsZ2QwnFOPcJ">Martin has presented the project on the camunda BPM DEV group</a>: &nbsp;</div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<br /></div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
It's an emerging little library aiming at easing tests when developing process applications. We reach out to</div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<ul>
<li style="line-height: 17px;">ease the readability and maintainability of process model tests and make the writing of process model tests more fluent and more fun</li>
</ul>
</div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<ul>
<li style="line-height: 17px;">make it even easier to mock the services available to a process instance than it already is</li>
</ul>
</div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
For that purpose, you can -&nbsp;<b>aspect 1&nbsp;</b>- write&nbsp;FEST assertions, e.g. like</div>
</div>
</div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<pre style="background-color: #f8f8f8; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(204, 204, 204); color: #333333; line-height: 19px; margin-bottom: 15px; margin-top: 15px; overflow: auto; padding: 6px 10px; text-align: -webkit-auto; vertical-align: baseline; white-space: pre-wrap;"><span style="border: 0px; font-family: Helvetica; margin: 0px; padding: 0px; vertical-align: baseline;"><span style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">assertThat</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">(</span><span style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">processInstance</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">).</span><span style="border: 0px; color: teal; margin: 0px; padding: 0px; vertical-align: baseline;">is<wbr></wbr>WaitingAt</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">(</span><span style="border: 0px; color: #dd1144; margin: 0px; padding: 0px; vertical-align: baseline;">"review"</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">);</span>
<span style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">assertThat</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">(</span><span style="border: 0px; color: teal; margin: 0px; padding: 0px; vertical-align: baseline;">task</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">).</span><span style="border: 0px; color: teal; margin: 0px; padding: 0px; vertical-align: baseline;">isAssignedTo</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">(</span><span style="border: 0px; color: #dd1144; margin: 0px; padding: 0px; vertical-align: baseline;"><wbr></wbr>"piggie"</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">);</span></span></pre>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
but you can also -&nbsp;<b>aspect 2</b>&nbsp;- query and drive "the process" via a somewhat more fluent API than currently available, e.g. like</div>
</div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<pre style="background-color: #f8f8f8; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(204, 204, 204); color: #333333; line-height: 19px; margin-bottom: 15px; margin-top: 15px; overflow: auto; padding: 6px 10px; text-align: -webkit-auto; vertical-align: baseline;"><span style="border: 0px; font-family: Helvetica; margin: 0px; padding: 0px; vertical-align: baseline;"><span style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">processInstance</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">.</span><span style="border: 0px; color: teal; margin: 0px; padding: 0px; vertical-align: baseline;">task</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">().</span><span style="border: 0px; color: teal; margin: 0px; padding: 0px; vertical-align: baseline;">complet<wbr></wbr>e</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">(</span><span style="border: 0px; color: #dd1144; margin: 0px; padding: 0px; vertical-align: baseline;">"approved"</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">,</span> <span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">true</span><span style="border: 0px; font-weight: bold; margin: 0px; padding: 0px; vertical-align: baseline;">);</span></span></pre>
</div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
You can find a bit more documentation of what's currently possible in the&nbsp;<a href="https://github.com/camunda/camunda-bpm-fluent-testing/blob/master/README.md" style="border: 0px; color: #6611cc; cursor: pointer; margin: 0px; padding: 0px; text-decoration: none; vertical-align: baseline;" target="_blank">README.md</a>&nbsp;of the github project.</div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<br /></div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
We are currently working to completely separate these two independent aspects and would like to contribute them into the&nbsp;<a href="http://camunda.org/" style="border: 0px; color: #6611cc; cursor: pointer; margin: 0px; padding: 0px; text-decoration: none; vertical-align: baseline;" target="_blank">camunda.org</a>&nbsp;incubation space, e.g. as</div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<br /></div>
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<b>Project 1)</b>&nbsp;camunda-bpm-fluent-tests</div>
</div>
</div>
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<div style="border: 0px; margin: 0px; padding: 0px; vertical-align: baseline;">
<div style="background-color: white; border: 0px; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 0px; padding: 0px; vertical-align: baseline;">
<b>Project 2</b>) camunda-bpm-fluent-engine-api</div>
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
<br /></div>
<h3>
Try it out!</h3>
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
Since today we have a running Hudson job that deploys snapshot builds to the camunda BPM nexus repository. This allows you to easily try out camunda-bpm-fluent-tests:</div>
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
<br /></div>
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
Add the following maven dependency:</div>
<br />
<span style="font-family: Courier New, Courier, monospace;">&lt;dependency&gt;<br />&nbsp; &lt;groupId&gt;org.camunda.bpm.incubation&lt;/groupId&gt;<br />&nbsp; &lt;artifactId&gt;camunda-bpm-fluent-engine-api&lt;/artifactId&gt;<br />&nbsp; &lt;version&gt;0.4-SNAPSHOT&lt;/version&gt;<br />&nbsp; &lt;scope&gt;test&lt;/scope&gt;<br />&lt;/dependency&gt;<br />&lt;dependency&gt;<br />&nbsp; &lt;groupId&gt;org.camunda.bpm.incubation&lt;/groupId&gt;<br />&nbsp; &lt;artifactId&gt;camunda-bpm-fluent-assertions&lt;/artifactId&gt;<br />&nbsp; &lt;version&gt;0.4-SNAPSHOT&lt;/version&gt;<br />&nbsp; &lt;scope&gt;test&lt;/scope&gt;<br />&lt;/dependency&gt;</span><br />
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
<br /></div>
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
And add the camunda BPM repository:</div>
<div style="background-color: white; color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">&lt;repositories&gt;<br />&nbsp; &lt;repository&gt;<br />&nbsp; &lt;id&gt;camunda-bpm-nexus&lt;/id&gt;<br />&nbsp; &lt;name&gt;camunda-bpm-nexus&lt;/name&gt;<br />&nbsp; &lt;url&gt;https://app.camunda.com/nexus/content/groups/public&lt;/url&gt;<br /> &lt;/repository&gt; &lt;/repositories&gt;</span><br />
<h2>
</h2>
<h3>
More contributions welcome!</h3>
<span style="font-family: inherit; font-size: small; font-weight: normal;">If you have an interesting idea for an incubation project, <a href="https://github.com/camunda/camunda-bpm-incubation/blob/master/README.md">read the technical guidelines in Github</a> and <a href="https://groups.google.com/forum/?fromgroups=#!forum/camunda-bpm-dev">talk to us on the DEV mailing list</a>!</span></div>
</div>
</div>
</div>
</div>