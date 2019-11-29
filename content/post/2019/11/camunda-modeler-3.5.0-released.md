+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2019-11-28T12:00:00+02:00"
title = "Camunda Modeler 3.5 Released"
+++

We are happy to announce the release of Camunda Modeler v3.5.0. This release comes with an improved deployment feature and many more improvements to the BPMN and DMN modeling experience.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling.

<!--more-->

## Remember Authentication Details When Deploying

To make repeated deployments easier, you can now save your authentication details when deploying. The next time you're deploying, you don't have to enter it again.

{{< figure class="no-border teaser" src="deploy-frame-compressed.gif" alt="Remember authentication details" caption="Remember authentication details" >}}

## Sub-Processes Cannot Be Collapsed Anymore

We have long been discouraging our users from using collapsed sub-processes in processes that are meant to be executed. They are regarded as an anti-pattern since collapsed sub-processes hide important information during execution. Call activities should be used instead.

To better align the Camunda Modeler with this best practice as of this release sub-processes cannot be collapsed anymore.

{{< figure class="no-border teaser" src="subprocess.gif" alt="Sub-Processes cannot be collapsed anymore" caption="Sub-Processes cannot be collapsed anymore" >}}

Looking forward we believe that this change will make it easier to model processes that are ready for execution. Let us know what you think about this change in [our forum](https://forum.camunda.org/).

## Connect From/To Anywhere

As of this release, you're able to connect elements regardless of what the direction of the resulting connection will be. If the elements can be connected, you're able to connect them. The same also applies to reconnecting connections to other elements.

{{< figure class="no-border teaser" src="connect.gif" alt="Connect from/to anywhere" caption="Connect from/to anywhere" >}}

## DMN

This release comes with a couple of improvements to the DMN modeling experience. For more details, check out the [changelog](https://github.com/camunda/camunda-modeler/blob/develop/CHANGELOG.md#dmn).

{{< figure class="no-border teaser" src="dmn.gif" alt="Improved DMN experience" caption="Improved DMN experience" >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#340) to learn about all features, bug fixes and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
