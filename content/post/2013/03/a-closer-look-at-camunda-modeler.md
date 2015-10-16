---
title: "A closer look at the camunda modeler"
date: "2013-03-22"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/03/a-closer-look-at-camunda-modeler.html"

---

<div>
Along with the <a href="http://camundabpm.blogspot.de/2013/03/camunda-forks-activiti-and-launches.html">launch</a> of our <a href="http://camunda.org/">open-source BPM platform</a> we made the camunda modeler available to the public, both as <a href="http://camunda.org/download/modeler/">a&nbsp;software</a> and as&nbsp;<a href="https://github.com/camunda/camunda-modeler" target="_blank">source code</a>.<br />
<br />
With the camunda modeler, you get at free modeling tool that integrates in your Eclipse IDE and <span style="font-family: inherit;"><span style="background-color: white; line-height: 24.44444465637207px;">focuses on seamless modeling of process and collaboration</span><span style="background-color: white; line-height: 24.44444465637207px;">&nbsp;diagrams.&nbsp;</span></span>But see yourself:<br />
<div style="font-size: medium; font-weight: normal;">
<br /></div>
<div style="font-size: medium; font-weight: normal;">
<embed align="middle" allowscriptaccess="always" height="501" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://camunda.github.com/camunda-modeler/assets/video/intro.swf" type="application/x-shockwave-flash" width="591"></embed></div>
<div style="font-size: medium; font-weight: normal;">
<br /></div>
<div style="font-size: medium; font-weight: normal;">
We invite you to&nbsp;<a href="http://camunda.org/download/modeler/">try out the modeler</a>,&nbsp;<a href="https://groups.google.com/forum/#!forum/camunda-bpm-users">give us feedback</a>&nbsp;and&nbsp;<a href="https://github.com/camunda/camunda-modeler/blob/kepler/CONTRIBUTING.md">contribute to it</a>.<br />
<h2>
Present, past and Future</h2>
The camunda modeler is based on the <a href="http://eclipse.org/bpmn2-modeler/">Eclipse BPMN 2.0 Modeler</a>&nbsp;that integrates into the Eclipse IDE. Its aim was to allow users with technical focus to create BPMN 2.0 diagrams and maintain BPMN and&nbsp;<a href="http://camunda.org/">camunda BPM</a>&nbsp;/&nbsp;<a href="http://activiti.org/">Activiti</a>&nbsp;specific attributes in those diagrams.<br />
<br />
Beginning October 2012, we decided to dedicate bigger long term efforts to make the modeler a general purpose tool to create and refactor BPMN 2.0 diagrams. As a result the focus of the tool shifted towards user&nbsp;friendliness, quality (in terms of bugs) and an easier maintainable code base.<br />
<br />
Since then, we have taken huge steps forward:<br />
<ul>
<li>We simplified the modeler architecture.</li>
<li>We established a test infrastructure which comprises both unit tests for modeler features as well as blackbox user interface tests (400 Unit tests and 45 Minutes of blackbox Jubula tests).</li>
<li>We rewrote many, if not most of the modeler features to increase testability and maintainability of the code base.</li>
<li>We wrote a new model import to allow it to work with (most) diagrams, including BPMN 2.0 exports from other tool vendors.</li>
<li>We reworked the property panels and added help texts and input validation&nbsp;to aid the user.</li>
<li>We added advanced layouting features for flows to make it easier to work with complex models.</li>
</ul>
<div>
As of now there are still numerous areas to improve and work is long from finished. Many things such as layouting of message flows, better handling of pools and refactoring of the symbol palette are on our <a href="http://camunda.org/roadmap/">roadmap</a>. Further, we would like to publish the modeler as a ready-to-use standalone tool for non-Eclipse users. Progress on all these issues is documented in both our&nbsp;<a href="https://github.com/camunda/camunda-modeler/blob/kepler/CHANGELOG.md">technical changelog</a>&nbsp;as well as in our&nbsp;<a href="http://camunda.org/components/modeler/release-notes/">release notes</a>.&nbsp;</div>
<h2>
The modeler for contributors</h2>
<div>
We highly encourage you to contribute to the modeler if you share our vision of a user&nbsp;friendly, high quality BPMN 2.0 modeling tool. Check out our <a href="https://github.com/camunda/camunda-modeler/blob/kepler/CONTRIBUTING.md">contribution guidelines</a>&nbsp;to get started. Tell us what you think and share your ideas on the tool in our&nbsp;<a href="https://groups.google.com/forum/#!forum/camunda-bpm-dev">development forum</a>.</div>
<div>
<br /></div>
<div>
Stay tuned for frequent camunda modeler releases and upcomming blog posts.</div>
<div>
In the mean time, we will continue to code with quality in mind.</div>
</div>
</div>