+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-06-18T10:00:00+01:00"
title = "Camunda Modeler 1.16.0 Released"
+++

We are happy to announce the latest release of our Camunda Modeler, version 1.16.0 shipping with an improved minimap and a number of improvements and bug fixes. It also ships with the latest BPMN modeling.

<!--more-->

{{< figure class="teaser no-border" src="minimap.gif" alt="Improved minimap allows for easier navigation" caption="Improved minimap allows for easier navigation" >}}

The improved minimap allows you to drag the viewport anywhere in the modeler. It also comes with improved zooming similar to the zooming on the canvas. Last but not least, we've added a button that lets you minimize the minimap if you don't need it.

Download the Camunda Modeler from [camunda.com](https://camunda.com/download/modeler/) and start modeling right away.


## BPMN Modeling Improvements

* `FEAT`: resize text annotation when editing via properties panel ([#631](https://github.com/camunda/camunda-modeler/issues/631))
* `FIX`: create/update labels when updating element name via properties panel ([#824](https://github.com/camunda/camunda-modeler/issues/824))
* `FIX`: correct target attribute in signal payload not being removed from BPMN 2.0 XML ([#818](https://github.com/camunda/camunda-modeler/issues/818))


## Other Improvements

* `FEAT`: show loader on application startup
* `FIX`: correct error message on import error ([#821](https://github.com/camunda/camunda-modeler/issues/821))


## Wrapping Up

Download the lastest Camunda Modeler release from [camunda.com](https://camunda.com/download/modeler/).

Do you miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@Camunda](https://twitter.com/Camunda).
