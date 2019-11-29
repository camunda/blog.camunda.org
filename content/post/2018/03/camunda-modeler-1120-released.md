+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN 1.1", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-03-27T20:00:00+01:00"
title = "Camunda Modeler 1.12.0 Released"
+++

We are proud to announce the release of Camunda Modeler version 1.12.0. This is the first stable release shipping with the completely rewritten DMN modeling that handles large decision tables with ease. We've also added the possibility to deploy diagrams directly from the Camunda Modeler.

<!--more-->

If you’ve ever worked with a large DMN decision table using the Camunda Modeler you might have noticed that it becomes significantly slower as soon as you have a few hundred rules. In order to improve the performance of DMN modeling, we decided to rewrite it from scratch. The result is a faster DMN modeling that comes with a lot of usability improvements.

## Quick and easy modeling

Having two modes for DMN modeling always created friction since users had to switch back and forth between modes quite a lot. Both modes were targeted towards a specific user but after getting a lot of feedback we realized that there is no clear distinction between the two. The new DMN modeling comes without modes. Instead, you can always edit in your preferred way. Either edit directly or through the context menu that you can open by clicking the button that shows up when selecting a cell. Clicking a cell while pressing CMD opens the context menu immediately. Since there are no modes anymore no information is hidden meaning that expressions are always visible and strings are always in quotes and must be edited in quotes since that is the correct syntax. When using the context menu for editing correct syntax is always ensured.

{{< figure class="teaser no-border" src="modeless.gif" alt="Editing in your preferred way" caption="Editing in your preferred way" >}}

## Copy, cut and paste elements

Copying, cutting and pasting elements is standard functionality in most tools. There was something similar available in the DMN modeling for quite some time. As of this release we're bringing you actual copying, cutting and pasting of both rows (rules) and columns (inputs and outputs) in tables. You can access these functions using the context menu (right click) or using keyboard shortcuts.

{{< figure class="teaser no-border" src="copy-paste.gif" alt="Copy and paste rules, inputs and outputs" caption="Copy and paste rules, inputs and outputs" >}}

## Improved Visibility

We've changed a few things in order to improve the visibility of certain information. Setting a label for an input or output now hides the expression behind it. A set variable name will now always be visible which is especially helpful if you want to refer to this variable later on. Furthermore, non-default expression languages now will be indicated through a badge.

{{< figure class="teaser no-border" src="visibility.gif" alt="Complex expressions can be hidden behind labels" caption="Complex expressions can be hidden behind labels" >}}

## Deployment

You can now easily deploy diagrams (BPMN, CMMN, DMN) directly from the Camunda Modeler. Just configure the endpoint, deployment name and an optional tenant ID and you're good to go.

{{< figure class="teaser no-border" src="deploy.gif" alt="Deploy diagrams directly from the Camunda Modeler" caption="Deploy diagrams directly from the Camunda Modeler" >}}

## Changes in BPMN, CMMN and DMN modeling

The latest BPMN, CMMN and DMN modeling comes with a few changes to the way you navigate diagrams. Using the mouse wheel now scrolls the canvas vertically. Using it while pressing SHIFT moves it horizontally. You can zoom using the mouse wheel if you press CMD. We've also added support for gestures with two fingers.

## Other Improvements

Even though this release focusses on DMN modeling there have been numerous improvements in BPMN and CMMN modeling, too. Besides bug fixes this includes:

* auto placement of elements as a quick and easy way to model
* adaptive label positioning that makes sure your labels are not overlapped by other elements
* improvements in handling malformed XML and BPMN 2.0 XML exported from other tool vendors

## Wrapping up

If you want to give the new Camunda Modeler a shot you can download it [here](https://camunda.org/release/camunda-modeler/1.12.0/).

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
