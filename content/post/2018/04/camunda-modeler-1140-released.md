+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN 1.1", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-04-27T20:00:00+01:00"
title = "Camunda Modeler 1.14.0 Released"
+++

We are happy to announce the release of Camunda Modeler version 1.14.0. This release ships with the possibility to create new diagrams from empty files, Signavio compatibility and the latest BPMN, DMN and CMMN modeling.

<!--more-->

## Open empty BPMN, CMMN and DMN files

Opening empty .bpmn, .cmmn or .dmn files previously wasn't possible since they do not contain valid XML. You can now create new files outside of the Camunda Modeler in order to open them afterwards. You'll get asked if you want to create a new diagram.

{{< figure class="teaser no-border" src="empty-file.gif" alt="Opening an empty DMN file" caption="Opening an empty DMN file" >}}

## Signavio Compatibility

If you've ever worked with BPMN diagrams exported by Signavio you might have noticed a few issues due to different ways of handling collapsed subprocesses. As of this release the Camunda Modeler is compatible with BPMN diagrams exported by Signavio. As soon as it detects such a diagram it will make sure it stays compatible so it can be imported into Signavio again later. Creating a BPMN diagram with the Camunda Modeler will not ensure compatibility.

{{< figure class="teaser no-border" src="signavio.gif" alt="Expanding a subprocess exported from Signavio" caption="Expanding a subprocess exported from Signavio" >}}

## Wrapping up

If you want to try out the new Camunda Modeler you can download it [here](https://camunda.org/release/camunda-modeler/1.14.0/).

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
