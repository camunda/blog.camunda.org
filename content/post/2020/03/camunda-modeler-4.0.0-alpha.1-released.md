+++
author = "Oguz Eroglu"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-03-25T15:00:00+02:00"
title = "Camunda Modeler 4.0.0-alpha.1 Released"
+++

We are happy to announce the release of Camunda Modeler v4.0.0-alpha.1. It is shipped with notable changes in DMN modeling and the Deployment Tool. In addition, we included several bug fixes.

This release ships with support for the upcoming DMN 1.3 standard. It can open DMN 1.1 and DMN 1.2 diagrams; however, doing so, it converts these diagrams to DMN 1.3.
__Ensure you only convert your DMN diagrams if you are using a Camunda BPM platform that supports DMN 1.3, too.__  The upcoming Camunda BPM 7.13.0-alpha3 release as well as patch versions of Camunda Enterprise ship  DMN 1.3 support in the platform.

[Download the latest release](https://downloads.camunda.cloud/release/camunda-modeler/4.0.0-alpha.1/) and start modeling right away.

<!--more-->

## Ready for DMN 1.3

DMN 1.3 is the upcoming version of the DMN standard. Compared to DMN 1.1 version 1.3 of the standard ships with a number of improvements, most importantly, a diagram interchange that allows graphical information to be exchanged across vendors.
The app now exports DMN 1.3 and uses the standardized diagram interchange when doing so. You can open older DMN 1.1 or DMN 1.2 files; however, those will be migrated to DMN 1.3 on save.

## Supported Camunda BPM versions for DMN modeling

Starting from Camunda Modeler v4.0.0-alpha.1, there will be some changes in supported Camunda BPM versions for DMN modeling. Note that Camunda Modeler v4.0.0.0-alpha.1 DMN editor is compatible with following Camunda BPM versions: `7.13.0, 7.12.4, 7.11.11, 7.10.17 and above`. Make sure to update your Camunda engine accordingly if you are using the DMN editor of the Camunda Modeler.

## Improvements in Deployment Tool

With Camunda Modeler v4.0.0-alpha.1, we have completely overhauled our Deployment Tool for improved user experience.

{{< figure class="no-border teaser" src="deployment-tool.gif" alt="Brand new UX in Deployment Tool." caption="Brand new UX in Deployment Tool." >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#400-alpha1) to learn about all features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://downloads.camunda.cloud/release/camunda-modeler/4.0.0-alpha.1/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
