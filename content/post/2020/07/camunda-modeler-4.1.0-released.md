+++
author = "Niklas Kiefer"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-07-14T14:00:00+02:00"
title = "Camunda Modeler 4.1.0 Released"
+++

We are excited to announce the release of Camunda Modeler v4.1.0. This release introduces significant changes to the decision table editor and an improved way to navigate DMN diagrams.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling right away.

<!--more-->

## Improved Decision Table Editing

The understandability of decision tables is crucial for getting the overall logic of business decisions. We did a lot of work to improve the rendering and editing of our baked-in DMN decision table editor.

Besides various design improvements, our goal was to make it easier for our users to understand the implications of their business rules. The result is an enhanced table header layout to give the most important facts at first hand. It includes explanations for the selected hit policy and clarity about the logical order of input and output clauses.

{{< figure class="no-border teaser" src="decision-table-layout.gif" alt="Inspect the hit policy meaning after selecting it" caption="Inspect hit policy meaning after selecting it" >}}

While doing those changes, we always incorporated our ongoing user research results. Hereby we identified a primary need in the ability to handle table sizes efficiently. This release addresses this need and now comes with a new feature to increase and decrease the width of separate columns. This will significantly improve the arrangement of larger cell contents to fit our user's needs.

{{< figure class="no-border teaser" src="resize-table-columns.gif" alt="Resize Decision Table Columns" caption="Resize decision table columns" >}}

Alongside those changes, we improved a lot more to enhance the overall table editing experience. We'd love to hear your feedback regarding this!


## DMN Overview Navigation

When working with complex DMN diagrams being able to navigate efficiently is crucial. We introduced a new means of navigating the DRD diagram elements without having to go back and forth between DRD and DRG element view.

{{< figure class="no-border teaser" src="overview.png" alt="DMN Overview Navigation" caption="DMN Overview Navigation" >}}

When working on a single decision table or literal expression, you can resize the overview or close hide it.

## Sending Telemetry

Another additional feature we ship with this release is usage statistics tracking. We do this to understand our users and their actions better in order to improve the product further.

Note that we do not track any personal or identifiable data. This feature may always be switched on or off via `Help > Privacy Preferences > Enable Usage Statistics`. Per default, sending usage statistics is switched off.

{{< figure class="no-border teaser" src="usage-statistics.png" alt="Enable Usage Statistics option in Privacy Preferences" caption="Enable Usage Statistics option in Privacy Preferences" >}}

Refer to [this document](https://github.com/camunda/camunda-modeler/tree/master/docs/telemetry) to see what exactly we are sending to our telemetry server.

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md) to learn about all the features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
