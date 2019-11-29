+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN 1.1", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-04-12T20:00:00+01:00"
title = "Camunda Modeler 1.13.0 Released"
+++

We are happy to announce the release of Camunda Modeler version 1.13.0. This release brings new features and improvements to BPMN properties editing. It also ships with the latest BPMN, DMN and CMMN modeling.

<!--more-->

After working hard on rewriting the whole DMN modeling part of the Camunda Modeler for this release we focussed on BPMN, making sure that you can use the new features that will be introduced in Camunda BPM 7.9.0.

## Edit More BPMN Properties

We've added a number of properties that can now be edited:

* [called element of business rule tasks and call activities](https://docs.camunda.org/manual/7.8/reference/bpmn20/subprocesses/call-activity/#calledelement-binding) can be bound to version tag

* [source and target of variables passed to subprocesses](https://docs.camunda.org/manual/7.8/reference/bpmn20/subprocesses/call-activity/#calledelement-binding) are validated

* selecting the label of an element will show the same properties as selecting the element

* [conditions of conditional events](https://docs.camunda.org/manual/latest/reference/bpmn20/events/conditional-events/#condition) can  be set to script

* [expressions for business keys passed to subprocesses](https://docs.camunda.org/manual/7.8/reference/bpmn20/subprocesses/call-activity/#passing-business-key) can be edited

* [candidate starter users and groups of processes](https://docs.camunda.org/manual/7.8/reference/bpmn20/custom-extensions/extension-attributes/#candidatestartergroups) can be edited

* variables passed by [signal events](https://docs.camunda.org/manual/7.8/reference/bpmn20/events/signal-events/#throwing-signal-events) can be edited

* condition and variable name of [conditional start events](https://docs.camunda.org/manual/7.8/reference/bpmn20/events/conditional-events/#conditional-start-event) can be edited


{{< figure class="teaser no-border" src="business-key.gif" alt="Editing the business key expression of a call activity" caption="Editing the business key expression of a call activity" >}}

Besides that we also fixed a number of bugs related to property editing.

## Other Improvements

This release also ships with the latest BPMN, DMN and CMMN modeling. This means more improvements and fixes under the hood. Some of the highlights include:

* DMN decision tables without inputs are supported

* DMN decision table and literal expression navigation using the keyboard has been improved

* dots in XML attribute names are handled correctly

* reserved entities in body properties are now encoded instead of being escaped using CDATA

{{< figure class="teaser no-border" src="no-inputs.gif" alt="DMN decision table inputs can be removed" caption="DMN decision table inputs can be removed" >}}

## Wrapping up

If you want to try out the new Camunda Modeler you can download it [here](https://camunda.org/release/camunda-modeler/1.13.0/).

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
