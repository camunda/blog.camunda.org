+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-11-30T10:00:00+01:00"
title = "Camunda Modeler 1.5 Released"
+++

We are happy to announce the Camunda Modeler version 1.5 release!

This release adds the ability to model Decision Requirement Diagrams (DRDs).
On top of that, it brings huge performance improvements when working with large diagrams (BPMN, CMMN and DMN) and feature parity with [Camunda BPM 7.6](http://blog.camunda.org/post/2016/11/camunda-bpm-760-released/).

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

{{< figure class="main teaser headline no-border" src="screenshot.png" alt="Camunda Modeler DRD Modeling Screenshot" caption="Model Decision Requirement Diagrams (DRDs)" >}}


## Decision Requirement Diagrams

With this Camunda Modeler release, you are now able to model Decision Requirement Diagrams (DRDs). The DRD editor allows you to drill down into decisions backed up by Desision Tables / Literal Expressions via green table / literal expression overlays on Decision nodes. Drilled down you may edit tables as usual and literal expressions (new).

You can still create and edit single Decision Table diagrams. Converting these tables to DRDs is easy, too: Switching from Table to DRD view embeds an existing table inside a new decision requirement diagram and allows you to evolve your model from there.

Learn more about the supported DMN / DRD feature set the [Camunda Modeler documentation](https://docs.camunda.org/manual/latest/modeler/camunda-modeler/dmn/).


### DMN Namespace Correction

The modeler will transparently update the DMN namespace from
our proprietary one (see [bug #46](https://github.com/bpmn-io/dmn-js/issues/46)) to the official DMN 1.1 namespace. This ensures the best interoperability with other DMN tools.


## Modeling Speed Improvements

When working with bigger BPMN 2.0, DMN and CMMN diagrams the modeler should feel significantly faster now. Some numbers:

{{< figure class="main teaser headline no-border" src="performance.png" alt="Camunda Modeler Speed improvements" caption="Model faster with Camunda Modeler 1.5" >}}

As seen above diagram import is around 50% faster now. Common modeling operations such as move or resize work significantly faster now, too, leading to overall better responsiveness. For advanced tools such as the space tool changes are even more significant.

If you would like to learn more about the under the hood changes that let to these performance improvements check out the [bpmn-js release blog post](https://bpmn.io/blog/posts/2016-bpmn-js-0-18.html).


## Additional Improvements

Some other minor improvements are:

* Direct editing / label rendering improvements
* Ability to configure conditional events (released with [Camunda BPM 7.6](http://blog.camunda.org/post/2016/11/camunda-bpm-760-released/)) in the BPMN properties panel


## What's next?

For the next milestone, we will look into overall usability and stability improvements. We would also love to hear your feedback. Do you like the new DRD modeling capabilities? Do you miss anything or spot a bug?

Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
