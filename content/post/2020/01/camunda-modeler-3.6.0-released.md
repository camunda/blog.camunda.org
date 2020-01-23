+++
author = "Niklas Kiefer"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-01-22T12:00:00+02:00"
title = "Camunda Modeler 3.6 Released"
+++

We are happy to announce the release of Camunda Modeler v3.6.0. It comes along with a new feature to start process instances right from the app and a brand new updates notification mechanism.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling.

<!--more-->

## Start Process Instances

Starting process instances is one of the significant steps along the getting-started journey into the Camunda Engine. This release introduces an easy way to do precisely that right beside the modeled BPMN diagrams.

{{< figure class="no-border teaser" src="start-instance.gif" alt="Start process instance" caption="Configure endpoint and start a process instance" >}}

Use the run action in the toolbar to start a new process instance. When using the first time, it will ask you to configure an engine endpoint. You might know that from deploying diagrams. Additionally, you can [define a business key](https://blog.camunda.com/post/2018/10/business-key/).

Once finishing the configuration, the diagram got deployed, and a new process instance starts on the engine. If successful, you'll be able to see the instance inside Cockpit directly.

After executing once, no configuration is needed anymore for this diagram by default. Use the toolbar action again to re-deploy diagram changes and start a new process instance.

{{< figure class="no-border teaser" src="start-instance-directly.gif" alt="Start process instance directly" caption="Start process instance directly" >}}

The start instance feature shipped with this release is a first iteration to help developers executing their processes directly from the Modeler. We'd love you to check it out and hear some feedback.

## Get New Versions Notifications

Starting from v3.6.0, Camunda Modeler is capable of detecting newer versions and informing users in case such versions exist. We believe this will be a huge
improvement considering the adoption of our new releases.

Here's an example of how this all looks like:

{{< figure class="no-border teaser" src="update-notification.png" alt="Update Notifications" caption="This is how update notifications look like. Note that the versions in the image are still test data." >}}

As you may have noticed, we also improved the designs of our buttons. The new styles are available in our modals (deployment, start instance, update notifications etc.).

We have implemented this feature in a user friendly way to make sure the user experience is not affected by such notifications. However, we also let our users disable/enable
this feature. Use `Help > Privacy Preferences > Enable Update Checks` in the application menu to modify your settings. We'd love to hear what you think about this feature.

## Electron Update

The Camunda Modeler builds on top of the [Electron framework](https://www.electronjs.org/). With this release, we updated the version to `electron@7`. It ships with bug fixes for a couple of known security vulnerabilities and several improvements.

Check out the [official blog post](https://www.electronjs.org/blog/electron-7-0) to find out more about the newest Electron version.

## BPMN

This release comes with a couple of bug fixes and improvements to the BPMN modeling experience. For more details, check out the [changelog](https://github.com/camunda/camunda-modeler/blob/develop/CHANGELOG.md#bpmn).

{{< figure class="no-border teaser" src="copy-paste-loops.gif" alt="Copy and paste loops" caption="Improved copy and paste of loops" >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#360) to learn about all features, bug fixes and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
