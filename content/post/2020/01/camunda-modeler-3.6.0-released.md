+++
author = "Niklas Kiefer"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2020-01-27T10:00:00+02:00"
title = "Camunda Modeler 3.6 Released"
+++

We are happy to announce the Camunda Modeler v3.6.0 release. Along numerous minor improvements it ships a new feature to start process instances right from the app. A brand new updates notification mechanism ensures you won't ever miss an update again.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling.

<!--more-->

## Start Process Instances

Starting process instances is one of the significant steps along the getting-started journey into the Camunda Engine. This release introduces an easy way to deploy and execute BPMN diagrams besides modeling them.

{{< figure class="no-border teaser" src="start-instance.gif" alt="Start process instance" caption="Configure endpoint and start a process instance" >}}

Use the run action in the toolbar to start a new process instance. When using the feature for the first time, it will ask you to configure an engine endpoint. You might know that from deploying diagrams, which uses the same configured endpoints. Additionally, you can [define a business key](https://blog.camunda.com/post/2018/10/business-key/).

Once you're done with the configuration, the diagram is deployed and executed. If successful, you'll be able to see the instance inside Cockpit.

After executing once, no configuration is needed anymore for this diagram by default. Use the toolbar action again to re-deploy diagram changes and start a new process instance.

{{< figure class="no-border teaser" src="start-instance-directly.gif" alt="Start process instance directly" caption="Start process instance directly" >}}

We believe this will help developers a lot to implement executable processes in the Modeler end to end. Check it out and give us feedback in [our forum](https://forum.camunda.org/c/modeler).

## Get New Versions Notifications

As of this version, you will get notified whenever there is a newer Camunda Modeler version available. We believe this is a huge improvement for allowing our users to stay up to date with our releases and to try out new features.

When we release a new version, you'll see a notification like this:

{{< figure class="no-border teaser" src="update-notification.png" alt="Update Notifications" caption="This is how update notifications look like. Note that the versions in the image are still test data." >}}

Note that you can always disable this feature if you don't need such functionality by going to `Help > Privacy Preferences` and uncheck the `Enable Update Checks` option.

Wait for future updates to come in and tell us what you think about this feature in [our forum](https://forum.camunda.org/c/modeler).

## BPMN

This release includes numerous bug fixes and improvements to the BPMN modeling experience. For more details, check out the [changelog](https://github.com/camunda/camunda-modeler/blob/develop/CHANGELOG.md#360).

{{< figure class="no-border teaser" src="copy-paste-loops.gif" alt="Copy and paste loops" caption="We added a couple of copy and paste improvements" >}}

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#360) to learn about all features, bug fixes, and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug, or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
