+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-06-01T15:00:00+01:00"
title = "Camunda Modeler 1.8.1 Released"
+++

We are happy to announce the Camunda Modeler version 1.8.1 release!

This patch release comes with a number of improvements both in the Camunda Modeler itself and in the libraries it builds upon, such as [bpmn-js](https://github.com/bpmn-io/bpmn-js), [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel) and [diagram-js](https://github.com/bpmn-io/diagram-js).

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

{{< figure class="main teaser no-border" src="minimap-persistance.gif" alt="Camunda Modeler Clone BPMN Implementation Details" caption="Open/closed state of the minimap is now being persisted." >}}

## Improvements

Most notably in this patch release, the minimap is now closed by default. We've added an icon to it so you can find it easily when it's closed. Furthermore, the open/close state of the minimap is now being persisted in the same way it is for the properties panel. If you create a new diagram or open an existing one the minimap will be open/closed depending on if you opened/closed it before.

With version 1.8.0 of the Camunda Modeler, we introduced plugins, which allow you to change the modeler's appearance and behavior and add new features by simply copying the directory containing the plugin into the `plugins` directory of the Camunda Modeler. In order to make finding this folder easier, we've added it by default to the modeler's directory. Additionally, we've improved the [documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins) for plugins.

Thanks to a contribution by [Jia Huang](https://github.com/iamfat) bpmn-js-properties-panel and dmn-js can now be internationalized. What's even better is that with plugins internationalization is as simple as adding a plugin to the modeler (the necessary plugin points are going to be created soon).

## Bug Fixes

We have included a number of bug fixes in the libraries the Camunda Modeler builds upon, therefore further improving the modeling experience. These include [diagram-js](https://github.com/bpmn-io/diagram-js), [diagram-js-minimap](https://github.com/bpmn-io/diagram-js-minimap), [bpmn-js](https://github.com/bpmn-io/bpmn-js), [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel) and [dmn-js](https://github.com/bpmn-io/dmn-js).

## What's next?

In our next milestone we will focus on reworking text annotations and further improving the usability of the Camunda Modeler.

Do you miss anything or spot a bug? Or do you have feedback on the latest addition of the minimap or pluggability? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
