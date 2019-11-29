---
title: "camunda Modeler 2.1.0 released"
date: "2013-10-15"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2013/10/camunda-modeler-210-released.html"

---

<div>
Today we relased a new version of the camunda Modeler. It provides better property editing support for BPMN 2.0 and camunda BPM properties, improvements in pool and lane handling and fixes a number of important bugs.<br />
<br />
<a name='more'></a><br />
<h3>
Property Editing Support</h3>
Kristin and Roman extended the property panel to achieve partity with new engine extensions and features introduced in camunda BPM 7.0:<br />
<br />
<ul>
<li>On throwing message events and send tasks service task engine extensions may be edited</li>
<li>On call activities <a href="http://docs.camunda.org/latest/api-references/bpmn20/#subprocesses-call-activity-passing-business-key">passing the business key</a> as well as <a href="http://docs.camunda.org/latest/api-references/bpmn20/#subprocesses-call-activity-passing-variables">all variables</a> may be edited</li>
<li>On call activities the <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-versioning-which-version-will-be-used">called element binding and version</a> may be specified</li>
<li>On start events the form key may be edited independent of the event definition</li>
</ul>
<div>
In addition, documentation may now be maintained for all BPMN 2.0 elements.</div>
<br />
<h3>
Modeling enhancements</h3>
<div>
To enhance the modeling experience I worked on an improved pool and lane handling</div>
<div>
<ul>
<li>Pools and lanes may not be shrinked below their children bounds</li>
<li>Bendpoints are properly update upon pool or lane resize</li>
<li>Sufficient space is added on the diagram when adding a new pool</li>
</ul>
Furthermore we fixed the boundary event attachment on attached element resize.&nbsp;</div>
<br />
<h3>
BPMN 2.0 Compatibility</h3>
<div>
Daniel, Roman and&nbsp;<span style="background-color: white;">I</span>&nbsp;improved the interoperability of the modeler by fixing a number of diagram import and export related bugs:</div>
<div>
<br />
<ul>
<li>No more<span style="font-family: inherit;">&nbsp;</span><span style="background-color: white; line-height: 15.454545021057129px;"><span style="font-family: Courier New, Courier, monospace; font-size: 12.727272033691406px;">xsi:type=“xsd:anyType"</span><span style="font-family: inherit;"> is added to extension elements on export</span></span></li>
<li><span style="background-color: white; line-height: 15.454545021057129px;"><span style="font-family: inherit;">Documentation is exported correctly without reordering</span></span></li>
<li><span style="background-color: white; line-height: 15.454545021057129px;"><span style="font-family: inherit;">Data object references are supported on import and are correctly created by the modeler</span></span></li>
<li><span style="background-color: white; line-height: 15.454545021057129px;"><span style="font-family: inherit;">Diagrams containing invalid DI references to data objects are automatically fixed during import</span></span></li>
</ul>
<div>
<span style="line-height: 15.453125px;"><br /></span></div>
<span style="line-height: 15.453125px;">Finally, we switched from <span style="font-family: Courier New, Courier, monospace;">activiti</span><span style="font-family: inherit;"> t</span>o <span style="font-family: Courier New, Courier, monospace;">camunda</span> as the default namespace prefix for engine attributes.&nbsp;</span><br />
<div>
<span style="line-height: 15.453125px;"><br /></span></div>
<div>
<span style="line-height: 15.453125px;">Check out the&nbsp;</span><a href="https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#2.1.0">release notes</a>&nbsp;for a complete list of changes.</div>
<br />
<h3>
Behind the Scenes</h3>
</div>
<div>
Christian and Roman integrated the modeler tests into our continuous integration. As a result the ~500 modeler tests run now continuously and no test covered feature will accidently be broken again.</div>
<div>
<br /></div>
<div>
What is lying ahead of us? For the next modeler release we look into Eclipse Kepler support and more modeling improvements.</div>
<div>
<br /></div>
<div>
Feel free to <a href="http://camunda.org/download/modeler/">try out the new modeler</a> and give us feedback via <a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users">our forums</a> or <a href="https://twitter.com/camundaBPM">twitter</a>.</div>
</div>