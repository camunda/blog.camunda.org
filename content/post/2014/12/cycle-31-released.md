---
title: "Cycle 3.1 Released"
date: "2014-12-18"
author: "Sebastian Stamm"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/12/cycle-31-released.html"

---

<div>
We are happy to announce the release of Cycle version 3.1. Cycle is a tool which makes synchronization of BPMN diagrams between the camunda modeler and third party modeling tools possible. With this release we provide a feature which allows bpmn tool vendors to integrate their tool with camunda cycle by providing custom Connectors. <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=13500" target="_blank">The complete release notes can be found in JIRA</a><br />
<br />
You can download the <a href="http://camunda.org/download/cycle/" target="_blank">distribution of Cycle 3.1 from camunda.org</a> and view the <a href="https://github.com/camunda/camunda-cycle" target="_blank">source code on GitHub</a>.<br />
<h3>
Connectors</h3>
Cycle uses Connectors which implement the necessary operations to synchronize BPMN diagrams. With Cycle 3.1, we provide a way to augment Cycle with custom Connectors. Tool vendors can implement needed operations and publish a Connector which integrates their tool with camunda Cycle. This allows users of the third party tool to seamlessly work with the third party tool, integrate the changes into camunda BPM and merge changes back. We provide a repository where we&nbsp;<a href="https://github.com/camunda/camunda-cycle-connectors" target="_blank">list all available custom Connectors</a>. The <a href="https://www.ibo.de/ibo.html" target="_blank">IBO Software GmbH</a> already contributed a Connector for their <a href="https://www.ibo.de/prozessmanagement/prozessmanagement-software.html" target="_blank">Prometheus tool</a>.<br />
<br />
Tool vendors can find an example how to implement a Connector to integrate their tool with camunda Cycle in our <a href="https://github.com/camunda/camunda-bpm-examples/tree/master/cycle/camunda-cycle-connector-example" target="_blank">examples repository</a>.<br />
<br />
In addition to the possibility to augment Cycle with custom Connectors, we also added build-in GIT support for camunda Cycle.<br />
<br />
<h3>
Diagram Rendering</h3>
Cycle displays an image of the current state of the BPMN diagram. Previously, the tool was responsible to provide this image alongside the BPMN file and keep the image file up to date. With this release we add the option to let Cycle render the bpmn diagram by using the BPMN file instead of using a provided image. This improves the integration of tools which do not provide an image themselves.<br />
<br />
To render the diagrams, we use the awesome <a href="http://bpmn.io/" target="_blank">bpmn.io toolkit</a>.<br />
<br />
{{< figure src="http://2.bp.blogspot.com/-6ahEAly2UFU/VI_zysQvnMI/AAAAAAAACn0/LbHcz_bJCHQ/s1600/screenshot_cycle.PNG" >}}
<br />
<br />
<h3>
Upgrading to Cycle 3.1</h3>
If you want to use the new version of Cycle, we provide you with the necessary upgrade scripts. Please see our installation guide for information <a href="http://stage.docs.camunda.org/guides/installation-guide/camunda-cycle/#migration" target="_blank">how to upgrade to camunda Cycle 3.1</a>.
</div>