+++
author = "Ricardo Matias"
categories = ["Modeling"]
tags = ["BPMN 2.0", "CMMN", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-07-13T13:00:00+01:00"
title = "Camunda Modeler 1.2 released"

+++

We are happy to announce version 1.2 of the Camunda Modeler!

This release comes with new layouting helpers for BPMN, a new properties panel for CMMN and other modeling related improvements for BPMN and CMMN.

[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).

<!--more-->

<style>
  @media(min-width: 900px) {
    figure.main.teaser.headline {
      margin-left: -80px !important;
      margin-right: -80px !important;
    }
  }
</style>


## Align and Distribute BPMN Elements

One of the bigger features in this release is the ability to align and distribute BPMN elements in the current selection. These help out a lot in creating a clean and organized BPMN model.

Trigger the align an distribute helpers from the menu bar icons through the *Edit* menu.

{{< figure class="main teaser no-border" src="align-distribute.gif" alt="Camunda Modeler Screenshot" caption="Align and distribute elements evenly." >}}


## CMMN Properties Panel

We've added a properties panel to CMMN that allows you to change implementation details without the need to jump into the underlying XML document. The panel supports all Camunda related CMMN extensions as well as a number of important CMMN properties.

{{< figure class="main teaser no-border" src="cmmn-properties-panel.png" alt="Camunda Modeler Screenshot" caption="Edit CMMN properties in the new properties panel." >}}


## Better Diagram Zooming

We've added two new zooming options that will help out with nagivating BPMN and CMMN diagrams. Now you can zoom the diagrams to their actual size and fit them in your screen, so you can see it completly. These can be triggered via the *Window* menu or with a keyboard shortcut.


## Misc Modeling Improvements

We integrated new upstream versions of our [modeling](https://bpmn.io/blog/posts/2016-snapping-auto-expanding-cmmn-js.html) [toolkits](https://bpmn.io/blog/posts/2016-distribution-helpers-label-layouting-bpmn-js.html) resulting in a number of CMMN and BPMN modeling improvements:

__CMMN__

* Element snapping
* Auto expand of containers

__BPMN__

* Automatic label move with connections
* Improved Connection import
* Improved Message Flow Layouting
* Ability to create point to point connections with the global connect tool


## Give us Feedback

We would love to hear your feedback. You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
