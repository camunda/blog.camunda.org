+++
author = "Maciej Barelkowski"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-02-26T15:00:00+02:00"
title = "Camunda Modeler 3.7 Released"
+++

We are happy to announce the Camunda Modeler 3.7 release. It ships several features enhancing modeling experience with the improved space tool among them. Snapping and alignment/distribution helpers that landed in the DMN Editor makes it easier to create clear DMN diagrams. What is more, once you finish modeling, you can quickly deploy your diagram to Camunda Spring Boot Starter.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling right away.

<!--more-->

## Camunda Spring Boot Starter Support

[Camunda Spring Boot Starter](https://github.com/camunda/camunda-bpm-platform/tree/master/spring-boot-starter) is the simplest way to get you started with Camunda. In Camunda Modeler 3.7, we now support it per default. Once you start your Spring Boot-based Camunda app, you can deploy and run against it from Camunda Modeler right away.

{{< figure class="no-border teaser" src="spring-boot.png" alt="Deployment tool connected to Camunda Spring Boot Starter" caption="The default URL points now to Camunda Spring Boot Starter REST engine" >}}

Do you prefer to use a Tomcat distribution instead? Don't worry, Camunda Modeler detects it and supports it right away.

## Improved Space Tool

The space tool is a useful feature when you create or modify complex diagrams. Once you placed multiple elements, the space tool allows inserting new shapes in between them. You can also use it to remove empty space.

{{< figure class="no-border teaser" src="space-tool.gif" alt="Space tool used to move end event" caption="Space tool can now move sequence flow labels without surprises" >}}

With the current release, we reworked the space tool so that it can better handle connection resizing. The layout, as well as positioning of the labels, lead to no surprises so that you don't need to manually re-position shapes after a change.

## Alignment/Distribution Helpers and Snapping in DMN Editor

Grid snapping released for BPMN Editor in [Camunda Modeler 3.2 release](https://blog.camunda.com/post/2019/07/camunda-modeler-3.2.0-released/#grid-snapping) proved to be a helpful modeling feature. Together with snapping to elements, it allows creating well-ordered and clear DMN diagrams easily.

{{< figure class="no-border teaser" src="snapping.gif" alt="Snapping in DMN Editor" caption="Grid snapping and snapping to element allow to create readable diagrams" >}}

Furthermore, if you want to rearrange diagram elements quickly, you can use the alignment/distribution helpers to do that. Choose them from the toolbar, as you could already do in BPMN Editor.

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#370) to learn about all features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
