+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-05-05T15:00:00+01:00"
title = "Camunda Modeler 1.8 Released"
+++

We are happy to announce the Camunda Modeler version 1.8 release!

This release brings extensibility through plugins, a minimap that helps you to navigate big processes and a number of improvements for the modeling experience.

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

{{< figure class="main teaser no-border" src="plugins.gif" alt="Camunda Modeler Clone BPMN Implementation Details" caption="You can now use plugins!" >}}

## Extend the Modeler

You can now create and add plugins to the Camunda Modeler by simply copying them into the modelers plugins directory. Plugins allow you to modify the modelers appearance and to extend its functionality.

To get you started we have created a [repository](https://github.com/camunda/camunda-modeler-plugins) with ready-to-use plugins for the modeler and templates for creating your own plugins.
There is also an [example plugin](https://github.com/camunda/camunda-modeler-plugin-example) for you to to get started with creating Camunda Modeler plugins.

Check out the [plugin documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins) for all the details on how to extend the Camunda Modeler.


## Navigate Huge Processes

If you have ever modeled a bigger process you know that navigation can be hard sometimes. The new minimap helps you to navigate these big processes with ease:

{{< figure class="teaser no-border" src="minimap.gif" alt="Minimap screencast" caption="Navigate with ease!" >}}

You can see which part of the process you are looking at at any time. Click, drag or zoom the minimap to navigate your process. In case you don't need the minimap you can close it.

## Other Improvements

In BPMN and DMN modeling we have included a number of minor improvements and bug fixes.

## What's next?

In our next milestone we will focus on stability and usability improvements for the Camunda Modeler.

Do you miss anything or spot a bug? Or do you have feedback on the latest addition of the minimap or pluggability? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
