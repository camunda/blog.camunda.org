---
title: "camunda Modeler 2.4.0 released: Design / Source View and enhanced file handling"
date: "2014-02-10"
author: "Michael Schöttes"

categories:
  - "Execution"
tags:
  - "Camunda Modeler Eclipse Plug-in"
  - "Release Note"

aliases:
  - "/2014/02/camunda-modeler-240-released-design.html"

---

<div>
<div dir="ltr" style="text-align: left;" trbidi="on">
<span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">Today we are happy to announce the new release of our camunda Modeler. Beside a couple of bug fixes this version adds a Source / Design view switch and an enhanced file handling.</span><br />
<span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"><br /></span>
<span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">Checkout the complete list of issues&nbsp;</span><a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13004" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">solved in this release</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">. And of course,&nbsp;</span><a href="http://camunda.org/download/modeler/" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">try out the new modeler</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;and tell us what you think via&nbsp;</span><a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">our forums</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;or&nbsp;on&nbsp;</span><a href="https://twitter.com/camundaBPM" style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">twitter</a><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">.</span><br />
<span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"><br /></span>
<span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"></span><br />
<a name='more'></a><span style="font-family: Times New Roman, Times, FreeSerif, serif;"><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">The new features were initially developed for&nbsp;</span></span><a href="http://camunda.org/bpmn/tool/" style="font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">camunda Modeler Standalone</a><span style="font-family: Times New Roman, Times, FreeSerif, serif;"><span style="background-color: white; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;and are now incorporated into the main modeler codebase.&nbsp;</span></span><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">Thanks to </span><a href="https://github.com/Nikku" style="font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">Nico's</a><span style="background-color: white;"><span style="font-family: Times New Roman, Times, FreeSerif, serif;"><span style="font-size: 15px; line-height: 21.559999465942383px;">&nbsp; work we could align the development of both projects.</span></span></span><br />
<br />
<b>Source/Design View</b><br />
<span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">A feature that allows you to switch from the design perspective to the underlying BPMN 2.0 xml</span><span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">. </span><span style="background-color: white; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">Use the source view to see what is behind the graphical representation or to edit custom attributes.</span><span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;">&nbsp;</span><br />
<span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"><br /></span>
<br />
<div class="separator" style="clear: both; text-align: center;">
<iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/UdFB9DJango" width="560"></iframe>
</div>
<span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"><br /></span><span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"><br /></span>
<span style="background-color: white; color: #666666; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px;"><br /></span>
<b>Enhanced file handling</b><br />
Open and edit files outside of your eclipse workspace by drag and drop them directly into the editor tab.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/iW83ADadQO8" width="560"></iframe>
</div>
<br />
Furthermore you can work on a diagram in your favorite text editor while the same file is opened in eclipse. Changes will be recognized by Eclipse so that you will not run into a version conflict.<br />
<br />
The new release is available for Eclipse Kepler and Juno/Indigo.<br />
<br />
<a href="http://camunda.com/about/jobs/" style="background-color: white; color: #2288bb; font-family: 'Times New Roman', Times, FreeSerif, serif; font-size: 15px; line-height: 21.559999465942383px; text-decoration: none;">We are hiring!</a></div>
</div>