+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-04-30T15:00:00+02:00"
title = "Camunda Modeler 4.0.0-alpha.2 Released"
+++

We are happy to announce the release of Camunda Modeler v4.0.0-alpha.2. This release introduces significant changes to the DMN modeling experience as well as further BPMN modeling improvements and bug fixes.

[Download the latest release](https://downloads.camunda.cloud/release/camunda-modeler/4.0.0-alpha.1/) and start modeling right away.

<!--more-->

## Simplified DMN Modeling

After adopting the latest DMN standard in the [last alpha release](https://blog.camunda.com/post/2020/03/camunda-modeler-4.0.0-alpha.1-released/), we're continuing to invest into our DMN modeler to make an even better tool for decision modeling. With the introduction of automatic placement of BPMN elements in Camunda Modeler v1.12.0, creating well laid out diagrams became both easier and faster. This alpha release finally brings this feature to the DRD editor of the Camunda Modeler.

{{< figure class="no-border teaser" src="dmn.gif" alt="The new DRD top-down editing modeling" caption="The new DRD top-down editing modeling" >}}

## Encouraging Best Practices...

When building the new modeling experience, we incorporated the latest results of our ongoing user research. The most significant one is that DRD diagrams are modeled from top to bottom, resulting in a tree structure. In contrast, BPMN diagrams are modeled from left to right. Now, diagrams in both toolkits are automatically laid out accordingly.

{{< figure class="no-border teaser" src="dmn-1.gif" alt="DRD diagrams are automatically laid out top to bottom" caption="DRD diagrams are automatically laid out top to bottom" >}}

Following the top to bottom layout, created connections will connect newly created elements to already existing ones. Furthermore, the layout of information requirements has been adjusted to support the tree structure resulting from the top to bottom approach.

## ...Without Enforcing Them

Even though we encourage you to layout your decision requirement diagrams top to bottom, you can still create diagrams any way you want. If you prefer modeling left-to-right, simply drag the elements from the context pad instead of clicking.

## BPMN Modeling Improved

Following the design [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) incoming and outgoing connections of sub-processes will now be laid out straight whenever possible. This applies to creating connections to and moving or resizing sub-processes. Furthermore, boundary events will not move anymore when resizing a sub-process doesn't require it.

{{< figure class="no-border teaser" src="bpmn.gif" alt="Fewer surprises when working with sub processes" caption="Fewer surprises when working with sub processes" >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#400-alpha1) to learn about all features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://downloads.camunda.cloud/release/camunda-modeler/4.0.0-alpha.1/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
