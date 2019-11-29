+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN 1.1", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-01-31T20:00:00+01:00"
title = "Camunda Modeler 1.12.0-alpha-2 Released"
+++

We are proud to announce the release of Camunda Modeler version 1.12.0-alpha-2. This alpha release of the Camunda Modeler makes editing DMN decision tables easier and brings us closer to a completely rewritten and feature-complete DMN modeling experience.

<!--more-->

## Editing Decision Tables made simple

If you've never worked with DMN 1.1 before getting the syntax right might be challenging in the beginning. Therefore instead of directly editing cells you can edit them using a context menu that ensures the correct syntax.

{{< figure class="teaser no-border" src="screencast.gif" alt="Editing made simple" caption="Editing made simple" >}}

If you've been using the Camunda Modeler for a while you might wonder where the button for switching between direct and simple editing went. As of this version of the Camunda Modeler you can use both ways of editing without having to switch back and forth.

## Predefined Values

Predefining values is an easy way of adding default values when editing string expressions. This feature is now available in the rewritten DMN modeling.

{{< figure class="teaser no-border" src="input-output-values.gif" alt="Editing predefined values" caption="Editing predefined values" >}}

Whenever you edit a string expression you will be able to simply select values that you've defined before.

## Other Improvements

Besides an improved DMN modeling this alpha release also ships with the latest BPMN modeling. Some of the highlights include

* improved navigation including native support for gestures with two fingers
* create and attach boundary event directly from the context pad
* auto placement of elements as a quick and easy way to model
* adaptive label positioning that makes sure your labels are not overlapped by other elements
* improvements in handling malformed XML _and_ BPMN 2.0 XML exported from other tool vendors

You can read more about the improved BPMN modeling [here](https://bpmn.io/blog/posts/2018-bpmn-js-0-26.html).

## How to get it

If you want to give the new Camunda Modeler a shot you can download the alpha release [here](https://camunda.org/release/camunda-modeler/1.12.0-alpha-2/).

## What's next?

There are a couple of topics we are going to tackle next in order to further improve the DMN modeling experience and to come closer to a stable release which you can expect at the end of March:

* literal expressions
* copy rules/inputs/outputs
* clear rules
* edit input/output entry expression language

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
