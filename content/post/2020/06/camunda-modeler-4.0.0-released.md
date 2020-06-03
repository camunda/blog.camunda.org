+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-06-02T14:00:00+02:00"
title = "Camunda Modeler 4.0.0 Released"
+++

We are excited to announce the release of Camunda Modeler v4.0.0. This release introduces significant changes to the DMN editor, overhauls deployments from the Camunda Modeler, and adds error tracking.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling right away.

<!--more-->

## Ready for DMN 1.3

DMN 1.3 is the upcoming version of the DMN standard. Compared to DMN 1.1 version 1.3 of the standard ships with a number of improvements, most importantly, a diagram interchange that allows graphical information to be exchanged across vendors.
The app now exports DMN 1.3 and uses the standardized diagram interchange when doing so. You can open older DMN 1.1 or DMN 1.2 files; however, those will be migrated to DMN 1.3 on save.

## Camunda BPM Compatibility with DMN 1.3

DMN 1.3 diagrams created with Camunda Modeler v4.0.0 are compatible with the following versions of Camunda BPM: 7.13.0, 7.12.4, 7.11.11, 7.10.17 and above. Make sure to update your Camunda engine accordingly if you are using DMN 1.3.

## Simplified DMN Modeling

Besides adopting the latest DMN standard, we are continuously investing in our DMN modeler to make it an even better tool for decision modeling. With the introduction of automatic placement of BPMN elements in Camunda Modeler v1.12.0, creating well laid out diagrams became both easier and faster. This release finally brings this feature to the DRD editor of the Camunda Modeler.

## Encouraging Best Practices...

When building the new modeling experience, we incorporated the latest results of our ongoing user research. The most significant one is that DRD diagrams are modeled from top to bottom, resulting in a tree structure. In contrast, BPMN diagrams are modeled from left to right. Now, diagrams in both toolkits are automatically laid out accordingly.

{{< figure class="no-border teaser" src="1-dmn.gif" alt="New DRD top-down editing modeling" caption="New DRD top-down editing modeling" >}}

Following the top to bottom layout, created connections will connect newly created elements to already existing ones. Furthermore, the layout of information requirements has been adjusted to support the tree structure resulting from the top to bottom approach.

## ...Without Enforcing Them

Even though we encourage you to layout your decision requirement diagrams top to bottom, you can still create diagrams any way you want. If you prefer modeling left-to-right, simply drag the elements from the context pad instead of clicking.

## Overhauled Deployments from the Camunda Modeler

Deploying diagrams from the Camunda Modeler has been an integral feature since its introduction. With v4.0.0, we have completely overhauled the UX of deployments. This marks the first step in streamlining the look and feel of the Camunda Modeler.

{{< figure class="no-border teaser" src="2-deployments.gif" alt="Overhauled deployments UI" caption="Overhauled deployments UI" >}}

## Error Tracking

Starting with this release, the Camunda Modeler is able to track errors that might occur. Knowing about these errors will help us build a more stable modeling application. To enable error tracking check the `Enable Error Reports` option in the privacy preferences found under `Help > Privacy Preferences`.

{{< figure class="no-border teaser" src="3-error-tracking.gif" alt="Enable error reports through privacy settings " caption="Enable error reports through privacy settings" >}}

If you want to learn more about what kind of information we collect and why we collect it, read our [Privacy Policy](https://camunda.com/legal/privacy/).

## Last but not least

[As a part of the Camunda rebranding](https://blog.camunda.com/post/2020/01/something-bold-something-new-fresh-look/), we say goodbye to our old Camunda Modeler icon and introduce a fresh new icon. You may see this icon in your taskbar, app launch menu, etc.

{{< figure class="no-border teaser" src="4-icon.png" width="100px" alt="New Camunda Modeler icon" caption="New Camunda Modeler icon" >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md) to learn about all the features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
