+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2019-08-27T12:00:00+02:00"
title = "Camunda Modeler 3.3 Released"
+++

We are proud to announce the release of Camunda Modeler v3.3. It comes with two significant improvements to our BPMN modeler: improved navigation and a better copy & paste experience. Furthermore, we included several bug fixes.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling.

<!--more-->

## Improved Navigation

If you've ever modeled a sub-process in a process or a participant in a collaboration you've probably experienced the difficulties of navigating inside of these elements. As of this release dragging inside these elements moves the canvas instead of the element. To move a sub-process or a participant, drag on its label or its borders.

{{< figure class="no-border teaser" src="navigation.gif" alt="Navigation" caption="No accidentally moving elements instead of the canvas anymore" >}}

Furthermore, you can now press `Space` to activate the hand tool momentarily. Alternatively, press `CommandOrControl` when dragging to move the canvas.

## Better Copy & Paste Experience

Copying and pasting elements may sound like a straight forward feature. Nevertheless, we thought we could do better. Why wouldn't you want all the great features you already get when creating new elements? Features like snapping to existing elements, snapping to the grid and seeing what your elements will look like once you've created them. As of this release pasting elements works just like creating them. In fact, we've reworked the entire feature, thus ensuring that copying and pasting elements works reliably.

{{< figure class="no-border teaser" src="copy-paste.gif" alt="Copy Paste" caption="Snap to existing elements and the grid when pasting" >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#330) to learn about all features and bug fixes that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
