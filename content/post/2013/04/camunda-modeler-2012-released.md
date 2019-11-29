---
title: "camunda modeler 2.0.12 released"
date: "2013-04-05"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2013/04/camunda-modeler-2012-released.html"

---

<div>
<div>
Yesterday we released version 2.0.12 of our modeler with a number of bug fixes as well as layout and usability improvements. One highlight is splitting layouted sequence flows to insert new flow elements between two connected nodes.
<br />
<br /></div>
<div>
<embed align="middle" allowscriptaccess="always" height="501" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://camunda.github.com/camunda-modeler/assets/video/drop-on-flow.swf" type="application/x-shockwave-flash" width="591"></embed>
</div>
<div>
<br />
Other things worth noting include<br />
<ul>
<li>Improved integration of the model wizard</li>
<li>Proper support for event subprocess / non-interrupting start event</li>
<li>Diagram image generation handles spaces in diagram file names correctly</li>
</ul>
<div>
<br /></div>
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://camunda.github.com/camunda-modeler/assets/image/event-subprocess.png" imageanchor="1" style="clear: left; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img alt="Event subprocess and non-interrupting start event" border="0" height="156" src="http://camunda.github.com/camunda-modeler/assets/image/event-subprocess.png" title="Event Subprocess" width="200" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Event Subprocess</td></tr>
</tbody></table>
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://camunda.github.com/camunda-modeler/assets/image/wizard-integration.png" imageanchor="1" style="clear: left; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img border="0" height="127" src="http://camunda.github.com/camunda-modeler/assets/image/wizard-integration.png" width="200" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Wizard integration</td></tr>
</tbody></table>
</div>
<div style="clear: both;">
<br />
We also fixed some crucial bugs, reworked the layouting of participants and the resize behavior of pools, lanes and subprocesses.<br />
<br />
For details refer to the <a href="https://jira.camunda.com/secure/IssueNavigator!executeAdvanced.jspa?jqlQuery=fixVersion+%3D+%22modeler+2.0.12%22&amp;runQuery=true&amp;clear=true" target="_blank">issues closed in this release</a>&nbsp;or check our&nbsp;<a href="https://github.com/camunda/camunda-modeler/blob/kepler/CHANGELOG.md" target="_blank">detailed technical changelog</a>.<br />
<br />
As always, <a href="http://camunda.org/download/modeler/" target="_blank">upgrade your modeler</a> installation and tell us what you think!<br />
<br /></div>
</div>