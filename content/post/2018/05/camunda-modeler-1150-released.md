+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-05-30T11:00:00+01:00"
title = "Camunda Modeler 1.15.0 Released"
+++

We are happy to announce the latest release of our Camunda Modeler, version 1.15.0. The release ships with numerous small usability improvements. With a new version of our BPMN toolkit under the hood it brings the long-awaited ability to model data stores between participants/pools, too.

<!--more-->

{{< figure class="teaser no-border" src="data-stores.png" alt="Data Stores can now be modeled between participants/pools" caption="Model data stores in between participants/pools" >}}

Download the Camunda Modeler from [camunda.com](https://camunda.com/download/modeler/) and start modeling right away.


## BPMN Modeling Improvements

* `FEAT`: allow data stores to be modeled between participants ([#183](https://github.com/camunda/camunda-modeler/issues/183))
* `FEAT`: allow deletion of external labels, clearing text ([#243](https://github.com/camunda/camunda-modeler/issues/243))
* `FEAT`: speed up BPMN diagram import by only rendering non-empty labels
* `CHORE`: improve text rendering in BPMN diagrams
* `FIX`: correct BPMN editor align button tooltip ([#590](https://github.com/camunda/camunda-modeler/issues/590))
* `FIX`: make `cycle` option for BPMN intermediate timer events available again ([#792](https://github.com/camunda/camunda-modeler/issues/792), reverts a change in Camunda Modeler v1.14.0)
* `FIX`: prevent BPMN element deletion when pressing `DEL` in BPMN properties panel ([#680](https://github.com/camunda/camunda-modeler/issues/680))


## Other Improvements

* `FEAT`: show loader when opening huge diagrams ([#704](https://github.com/camunda/camunda-modeler/issues/704))
* `FEAT`: export image using native type chooser ([#171](https://github.com/camunda/camunda-modeler/issues/171))
* `FIX`: correct edit menu on direct editing activation ([#708](https://github.com/camunda/camunda-modeler/issues/708))


## Wrapping up

Download the lastest Camunda Modeler release from [camunda.com](https://camunda.com/download/modeler/).

Do you miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@Camunda](https://twitter.com/Camunda).
