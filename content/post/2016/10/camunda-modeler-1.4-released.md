+++
author = "Patrick Dehn"
categories = ["Modeling"]
tags = ["BPMN 2.0", "CMMN", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-10-24T16:00:00+01:00"
title = "Camunda Modeler 1.4 Released"
+++

We are proud to announce version 1.4 of the Camunda Modeler! In this release we are introducing new *element template* features and improving the stability of the BPMN and DMN Modeler.

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


## Element Templates Features

* Define `camunda:in` and `camunda:out` bindings (useful for call activities)
* Define `camunda:executionListener` bindings
* Hide input fields for bindings with the input type `Hidden`
* Load element templates dynamically on diagram load rather than application start
* Be able to load element templates from a folder relative to diagrams (`.camunda`)
* Recognize template errors in the Camunda Modeler log section

{{< figure class="main teaser headline no-border" src="call-activity-element-templates.png" alt="Camunda Modeler Call Activity Element Templates Screenshot" caption="Call Activity Element Templates" >}}


Learn more about element templates in the [documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/element-templates) or take a look at the updated [sample template definitions](https://github.com/camunda/camunda-modeler/blob/master/resources/element-templates/samples.json).


## DMN Simple Mode Improvements

Besides fixing some bugs in the DMN toolkit, we also made several improvements to the simple mode. We improved parsing for numeric expressions so that you should get less unexpected `[expression]` fields. We also improved how the simple mode deals with output cells.


## Other Improvements

In BPMN default flows are now kept when reconnecting the *sequence flow* end to another *activity* (see [details](https://forum.bpmn.io/t/moving-outgoing-connection-start-point-from-gateway-causes-default-flow-to-be-lost/1079)).

## What's next?

In the next milestone of the Camunda Modeler we will integrate DRD Features to the DMN Modeler. Besides that we will work on further stability improvements.

## Give us Feedback

We would love to hear your feedback. Do you like the new element template features? Do you miss anything? You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
