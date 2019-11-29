---
title: "camunda Modeler 2.2.0 released: Kepler support and modeling improvements"
date: "2013-11-08"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2013/11/camunda-modeler-220-released-kepler.html"

---

<div>
Today we are happy to announce the new release of the camunda Modeler. This version adds official support for Eclipse Kepler. On top of that it ships with the ability to change the type of tasks, events and gateways as well as a simplified connection of elements. <br />
<a name='more'></a><h3>
Eclipse Kepler Support</h3>
<div>
Kepler support is finally there. Head over to the downloads site and <a href="http://camunda.org/download/modeler/">get a fresh version of the modeler</a>, ready for Kepler.</div>
<h3>
Morphing áka Changing Flow Node Types</h3>
<div>
Morphing flow nodes to different types is something we are pretty exited about because it makes it a lot easier to change existing process models. Thanks to Roman, this feature is now available via the actions menu as two small gears for tasks, events and gateways.</div>
<div>
<br /></div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-g7blQ23YZ5k/Unz9fgP2aTI/AAAAAAAAAJk/ycU_Jk-WAwE/s1600/morph.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-g7blQ23YZ5k/Unz9fgP2aTI/AAAAAAAAAJk/ycU_Jk-WAwE/s1600/morph.png" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Morphing an exclusive gateway via the actions menu</td></tr>
</tbody></table>
<div>
Changing the flow node type performs a semantic check on the model and makes sure that invalid outgoing flows (according to the BPMN 2.0 specification) are removed. You may undo the operation via&nbsp;<span style="font-family: Courier New, Courier, monospace;">CTRL-Z</span><span style="font-family: inherit;">&nbsp;if it has unexpected implications on your model.</span><br />
<span style="font-family: inherit;"><br /></span></div>
<div>
<span style="font-family: inherit;">Have a look on the screen cast shown below to see how the new morphing feature feels like.</span></div>
<center>
<div class="tr-caption-container" style="display: inline-block; margin: 1em auto; width: auto;">
<embed align="middle" allowscriptaccess="always" height="381" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://camunda.github.com/camunda-modeler/assets/video/morph/morph.swf" type="application/x-shockwave-flash" width="593"></embed>

<div class="tr-caption">
Morphing all around over the world.
</div>
</div>
</center>
<div>
<br />
<h3>
Easier Connection of Elements</h3>
</div>
<div>
We simplified the connection of objects via the actions menu. In the new version of the Modeler the tool will automatically choose the correct connection type based on the rules defined in BPMN 2.0. That also means that some invalid connections may no longer be drawn. Bear with us, it is all for the sake of better BPMN 2.0 models.&nbsp;</div>
<div>
<br /></div>
<div>
See the screen cast below to for a quick overview on the changed look and feel.</div>
<center>
<div class="tr-caption-container" style="display: inline-block; margin: 1em auto; width: auto;">
<embed align="middle" allowscriptaccess="always" height="404" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://camunda.github.com/camunda-modeler/assets/video/morph/connection.swf" type="application/x-shockwave-flash" width="610"></embed>

<div class="tr-caption">
Simple connection drawing. Really.
</div>
</div>
</center>
<div>
<h3>
Property Panel Improvements</h3>
</div>
<div>
Some other notable changes to the properties panel include (thanks to Kristin and Roman):</div>
<div>
<ul>
<li>targetNamespace editable</li>
<li>compensation task editable</li>
<li>message names editable</li>
<li>async throwing message event editable</li>
<li>datastores and data objects may be maintained</li>
<li>loop for activities can be set</li>
<li>call activity property validation added</li>
</ul>
<div>
<h3>
BPMN 2.0 Compatibility</h3>
</div>
<div>
To help mitigating common modeling errors we added further checks to the Modeler for flow and flow node addition, as well as reconnection of flows. These reduce the likelyhood that invalid BPMN 2.0 is the result of a modeling session.&nbsp;</div>
</div>
<div>
<br /></div>
<div>
<span style="line-height: 15.453125px;">Check out the&nbsp;</span><a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13001">all closed issues</a>&nbsp;for a complete list of changes.</div>
<div>
</div>
<h3>
Behind the Scenes</h3>
<div>
Michael has done a great job on improving our Jubula QA. The others in the team are already working on features for the next modeler version. Expect something exciting!</div>
<div>
<br /></div>
<div>
For now, feel free to <a href="http://camunda.org/download/modeler/">try out the new modeler</a>. Is there anything you particularily liked or a feature that is still missing? Tell us on via&nbsp;<a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users">our forums</a>&nbsp;or&nbsp;on&nbsp;<a href="https://twitter.com/camundaBPM">twitter</a>.</div>
</div>