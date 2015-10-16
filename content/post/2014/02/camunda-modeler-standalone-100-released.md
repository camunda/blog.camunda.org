---
title: "camunda Modeler Standalone 1.0.0 released as an official part of camunda BPM"
date: "2014-02-06"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/02/camunda-modeler-standalone-100-released.html"

---

<div>
<div class="separator" style="clear: both; text-align: left;">
The camunda Modeler Standalone&nbsp;is a tool that allows you to create, view and edit&nbsp;<a href="https://en.wikipedia.org/wiki/Business_Process_Modeling_Notation"><span id="goog_1978039880"></span>BPMN<span id="goog_1978039881"></span></a>&nbsp;process and collaboration diagrams in a seamless way. I am happy to say that the project,&nbsp;<a href="http://blog.camunda.org/2013/12/camunda-modeler-standalone-introduction.html" target="_blank">previously a side project of mine</a>,&nbsp;is now an official part of camunda BPM. Today we released version 1.0.0 as the first stable version of the modeler. <a href="http://camunda.org/download/modeler/" target="_blank">Get it now</a>.</div>
<div class="separator" style="clear: both; text-align: left;">
</div>
<a name='more'></a><br /><br />
<div class="separator" style="clear: both; text-align: left;">
As part of camunda BPM the camunda Modeler Standalone got its&nbsp;<a href="http://camunda.org/bpmn/tool/" target="_blank">own place</a>&nbsp;on&nbsp;<a href="http://camunda.org/" style="text-align: center;">camunda.org</a>&nbsp;and a&nbsp;one-click-to-distribution build. From now on, it will be subject to our extensive QA and receive support through our <a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users" target="_blank">forums</a>.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://camunda.org/bpmn/tool/" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-YooGjl2XQX8/UvJFpvd0dJI/AAAAAAAAAKc/NbRz-jjzBI8/s1600/modeler-screenshot.png" width="500" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">The home of the modeler on <a href="http://camunda.org/">camunda.org</a></td></tr>
</tbody></table>
<div>
<br /></div>
<div>
<h2>
Under the Hood</h2>
</div>
<div>
The camunda Modeler Standalone is <a href="https://github.com/camunda/camunda-modeler-standalone" target="_blank">open-source on GitHub</a>. It has our <a href="https://github.com/camunda/camunda-modeler" target="_blank">camunda Modeler BPMN 2.0 plug-in for Eclipse</a>&nbsp;under the hood. In fact, both share more than 95% of the plug-in code base. As a result, most new BPMN modeling features need to be implemented only once.</div>
<div>
<br /></div>
<div>
The standalone modeler adds better operating system integration on top of the Eclipse plug-in. This includes the ability to create, open and save BPMN 2.0 diagrams directly on the file system. Furthermore it adds a source view that allows you to switch from the design perspective to the underlying BPMN 2.0 xml. Use the source view to see what is behind the graphical representation or to edit custom attributes.</div>
<div>
<br /></div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://camunda.org/bpmn/tool/images/feature-source-view.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://camunda.org/bpmn/tool/images/feature-source-view.png" height="292" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Source view gets you access to all the details</td></tr>
</tbody></table>
<div>
<br /></div>
<h2>
Installer (for Windows Users)</h2>
<div>
<div>
Windows users can <a href="http://camunda.org/bpmn/tool/" target="_blank">get an installer</a> for the modeler that takes care of the operating system integration. It creates an uninstaller, too, that makes sure that the&nbsp;&nbsp;BPMN 2.0 modeling tool&nbsp;leaves no traces whenever you decide to get rid of it.</div>
</div>
<h2>
Moving Forward</h2>
<div>
For all the <a href="http://eclipse.org/" target="_blank">Eclipse</a>&nbsp;users that are using our camunda Modeler BPMN 2.0 plug-in there is no need to worry. We will keep the plug-in on par with the standalone version and vice versa. <i>Read: </i>Expect a new version of the Eclipse modeling plug-in with the latest changes, soon.</div>
<div>
<br /></div>
<div>
In the mean time, <a href="http://camunda.org/download/modeler/" target="_blank">try out our standalone Modeler</a>, an offline BPMN tool that is both <a href="http://www.gnu.org/philosophy/free-sw.html" target="_blank">free as in free beer and as in open source</a>.</div>
<div>
<br /></div>
<div>
<br /></div>
<div>
You like what we are doing or have ideas for improvements? Tell us <a href="https://twitter.com/camundaBPM" target="_blank">via twitter</a> or <a href="https://groups.google.com/forum/#!forum/camunda-bpm-users" target="_blank">on our forums</a>.</div>
</div>