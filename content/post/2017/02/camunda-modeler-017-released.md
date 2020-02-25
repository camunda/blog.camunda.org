+++
author = "Ricardo Matias, Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-03-07T15:00:00+01:00"
title = "Camunda Modeler 1.7 Released"
+++

We are happy to announce the Camunda Modeler version 1.7 release!

This release brings massive improvements to copy and paste, a new way to use element templates and various improvements for BPMN and DMN modeling.

[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).

<!--more-->

<style>
  @media(min-width: 900px) {
    figure.main.teaser.headline {
      margin-left: -120px !important;
      margin-right: -120px !important;
    }
  }
</style>

{{< figure class="main teaser no-border" src="bpmn-clone-properties.gif" alt="Camunda Modeler Clone BPMN Implementation Details" caption="Your implementation details will now be copied!" >}}


## BPMN Copy Implementation Details

With this release we super-powered copy and paste. When copying, BPMN and [Camunda](https://docs.camunda.org/manual/7.6/reference/bpmn20/custom-extensions/) details are now copied with the element.

During element replacement, all applicable details are carried over, too. Never loose an input mapping, again!


## BPMN Default Element Templates

Element templates may now be declared as _default_ to apply their properties to all newly created elements of a specific type. This may help organizations, i.e. to ensure certain diagram elements always contain specific, domain specific meta-data.

You can simply specify an element template as default by setting its `isDefault` property to `true` (see [documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/element-templates#default-templates) for details).


## Other Improvements

Related to BPMN modeling, inserting an element in an existing sequence flow was only possible during element creation so far. You are now able to do the same when moving an existing element, too. Furthermore we were able to fix a couple of bugs related to rendering labels.

In DMN modeling we have included in a number of minor improvements and bug fixes, too.


## What's next?

The next milestone, focuses on making the Camunda Modeler open for extension. Stay tuned and look forward for [exciting stuff](https://bpmn.io/toolkit/bpmn-js/examples/) to be hackable into the Modeler, soon.

Do you miss anything or spot a bug? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
