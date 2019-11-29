+++
author = "Ricardo Matias"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-01-03T15:00:00+01:00"
title = "Camunda Modeler 1.6 Released"
+++

We are happy to announce the Camunda Modeler version 1.6 release!

This release is a colorful one, with the addition of colors to BPMN. We also focused on improving the overall stability of the Modeler.

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

{{< figure class="main teaser headline no-border" src="bpmn-colors.png" alt="Camunda Modeler BPMN Colors Screenshot" caption="Add color to your BPMN processes" >}}

## BPMN Colors

Now you can add colors to BPMN elements right from the toolbar. This feature gives the ability of visually setting elements apart to convey emphasis on certain parts of your diagram. To use it, select an element and choose the color by clicking on the paintbrush icon (color picker). Pools and lanes can also be colored. When you save this diagram the colors will be added to each element on the xml, this allows to persist the colors between sessions and share your colored diagrams.

## Other Improvements

We worked on making the tab management behavior more robust and the save/open/export dialogs are now using an industry-wide behavior of which folder to show.

## What's next?

For the next milestone, we are going to look into copying implementation details and XML search improvements. Do you miss anything or spot a bug?

Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
