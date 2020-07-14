+++
author = "Niklas Kiefer"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-07-14T08:00:00+02:00"
title = "Camunda Modeler 4.1 Released"
+++

We are excited to announce the release of Camunda Modeler v4.1. This release introduces a new layout to the DMN decision table editor and a more efficient way to navigate DMN diagrams.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling right away.

<!--more-->

## New Decision Table Layout

Being able to collaborate and review a decision table without having to dig into detail is crucial. As part of our ongoing effort to make the DMN editor an even better tool, we're introducing changes to the decision table layout to increase overall readability and, therefore, understandability. 

These changes include more information about inputs and outputs and referring to the selected hit policy using their full name.

{{< figure class="no-border teaser" src="decision-table-layout.gif" alt="Hover the hit policy for further explanation" caption="Hover the hit policy for further explanation" >}}

Furthermore, you can now resize decision table columns. Once you change a column's width, it will be remembered when re-opening the decision table.

{{< figure class="no-border teaser" src="resize-table-columns.gif" alt="Decision table columns can now be resized" caption="Decision table columns can now be resized" >}}

Since this release introduces quite significant changes to the DMN editor we would love to hear your feedback.


## Navigating DMN Diagrams

When working with complex DMN diagrams being able to navigate efficiently is crucial. We introduced a new means of navigating the DRD diagram elements without having to go back and forth between DRD and DRG element view.

{{< figure class="no-border teaser" src="overview.png" alt="DMN Overview Navigation" caption="DMN Overview Navigation" >}}

When working on a single decision table or literal expression, you can resize the overview or close hide it.

## Usage Statistics

If you want to help us make the Camunda Modeler an even better product, you can now enable it to send usage statistics. No data will be sent without your permission and no sensitive data will be sent ever. Go to `Help > Privacy Preferences` to enable and disable this feature.

{{< figure class="no-border teaser" src="usage-statistics.png" alt="Enable Usage Statistics option in Privacy Preferences" caption="Enable Usage Statistics option in Privacy Preferences" >}}

Refer to [this document](https://github.com/camunda/camunda-modeler/tree/master/docs/telemetry) to see what exactly we are sending to our telemetry server.

## Looking Forward

Please read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md) to learn about all the features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
