+++
author = "Oguz Eroglu"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2019-10-17T12:00:00+02:00"
title = "Camunda Modeler 3.4 Released"
+++

We are happy to announce the release of Camunda Modeler v3.4. It is shipped with two
important improvements: Extension point for UI Plugins and features for a better
deployment experience. In addition, we included several bug fixes.

[Download the latest release](https://camunda.com/download/modeler/) and start modeling.

<!--more-->

## Improved Deployment Experience

Camunda Modeler v3.4 comes with an improved deployment experience for its users. The built-in Deployment Plugin will now automatically check if the engine backend is accessible or not before the deployment process. In addition, the Deployment Plugin is also now capable of remembering the deployment details per diagram. We believe this will make things much easier for our users as the deployment feature is meant to be used repeatedly.

{{< figure class="no-border teaser" src="deployment.gif" alt="Deployment Tool" caption="Deployment Tool automatically checks if the Camunda Engine is accessible." >}}

Another additional improvement is the display of Camunda Engine related parse errors. Camunda Modeler now displays validation errors in human-readable format so that the users can fix them easily.

{{< figure class="no-border teaser" src="human_readable_validation_error.gif" alt="Deployment Tool" caption="Human-readable validation errors." >}}

## Extension Point for UI Plugins

It is now possible for Camunda Modeler plugins to have access to UI elements such as toolbar and modals. To make things easier during plugin development process, we also made access to workspace configurations possible for plugins to be able to save and restore their states. In addition to this, we introduced [several application events to hook into](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#plugins).

A good example for a UI Plugin is our built-in Deployment feature.

{{< figure class="no-border teaser" src="deployment_tool_as_a_plugin.gif" alt="Deployment Tool" caption="Built-in Deployment Tool as a UI plugin." >}}

[Check out these examples](https://github.com/camunda/camunda-modeler/tree/develop/resources/plugins) to see how to create the new client extension. Also, keep in mind that the new plugin extension point, just like any of our existing
extension points, may be subject to change in the future. Don't forget to check our [Plugin documentation](https://github.com/camunda/camunda-modeler/tree/develop/docs/plugins) out.

## Looking Forward

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#340) to learn about all features, bug fixes and numerous additional improvements that made it into this release. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
