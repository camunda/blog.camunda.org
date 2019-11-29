+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-08-30T10:00:00+01:00"
title = "Camunda Modeler 2.0 Released"
+++

We are happy to announce the Camunda Modeler 2.0 release. The new Modeler ships with major improvements to BPMN editing and another round of minimap enhancements. A brand new properties panel for DMN adds support for Camunda specific properties and allows you to inspect and edit technical DMN properties in one place. Finally, the modeler now ships with signed executables, allowing you to safely employ it, even in locked down, corporate environments on both MacOS and Windows.


<!--more-->

{{< figure class="teaser no-border" src="boundary-events.png" alt="Model Boundary Event and activity loops" caption="Model Boundary Event and Activity loops" >}}

The improved BPMN editor allows you model to Boundary Event to Activity loops and Activity self-referencing loops in a convenient manner. Additional BPMN editor improvements include, among others, a reworked minimap and better message flow layout. Check out the [BPMN changelog](#bpmn) for all noteworthy improvements.

[Download the Camunda Modeler](https://camunda.com/download/modeler/) and start modeling right away.


## DMN Properties Panel

A new properties panel for DMN allows you to inspect and edit technical properties in a single place.

{{< figure class="teaser no-border" src="dmn-properties-panel.png" alt="Inspect and edit DMN technical properties using the properties panel" caption="Inspect and edit DMN technical properties" >}}

The panel is available for all editors (DRD, Decision Table, and Literal Expression) and may be toggled open / closed via the menu or a keyboard shortcut.

Using the panel you may edit the name and ID property of DRD and decision elements as well as [Camunda extensions](https://docs.camunda.org/manual/7.9/reference/dmn11/custom-extensions/camunda-attributes/) such as `camunda:versionTag`. As seen in the screenshot above we dropped the DRD editing overlay. Edit the properties using the properties panel from now on.


## Signing, Installers and More

Starting with this release the Camunda Modeler ships with signed executables for both MacOS and Windows. This makes it running the application hassle-free, even in locked down, corporate environments.

In the future we will provide native installers that make installing and updating the application easier. In preparation, we dropped the automatic in-app file association wiring on Windows.

File associations that previously were wired automatically on Windows must now be wired explicitly using scripts provided in the `support` directory. Check out the [updated installation documentation](https://docs.camunda.org/manual/latest/installation/camunda-modeler/) to learn more.


## Full Changelog

Have a look at the following sections for the full list of changes.

#### BPMN

* `FEAT`: snap `bpmn:Event` to center when creating message flows ([#887](https://github.com/camunda/camunda-modeler/issues/887))
* `FEAT`: support boundary event to activity loops ([#776](https://github.com/camunda/camunda-modeler/issues/776))
* `FEAT`: support activity to activity loops
* `FIX`: prevent error dragging label onto `bpmn:MessageFlow` ([#888](https://github.com/camunda/camunda-modeler/issues/888))
* `FIX`: round coordinates when dragging elements ([#886](https://github.com/camunda/camunda-modeler/issues/886))
* `FIX`: correct minimap collapse icon
* `FIX`: prevent creation of duplicate flows ([#777](https://github.com/camunda/camunda-modeler/issues/777))

#### DMN

* `FEAT`: add DMN properties panel, available for all DMN editors ([#847](https://github.com/camunda/camunda-modeler/issues/847))
* `FEAT`: add ability to edit `camunda:historyTimeToLive` on `dmn:Decision` elements ([#581](https://github.com/camunda/camunda-modeler/issues/581))
* `FEAT`: add ability to edit `camunda:versionTag` on `dmn:Decision` elements ([#802](https://github.com/camunda/camunda-modeler/issues/802))
* `CHORE`: drop `dmn:Definitions` `name` and `id` editing from DRD editor; you may edit these properties via the DMN properties panel ([`653eb607`](https://github.com/camunda/camunda-modeler/commits/653eb607183c6cf0457b8023a2d61cf8343da7fb))
* `FIX`: properly reflect decision id changes in decision table and literal expression editors

#### General

* `FEAT`: sign executables on Windows and MacOS ([#787](https://github.com/camunda/camunda-modeler/issues/787))
* `FEAT`: provide MacOS DMG distribution ([#787](https://github.com/camunda/camunda-modeler/issues/787))
* `CHORE`: drop in-app Windows file association behavior in favor of external support script ([`a07b693a`](https://github.com/camunda/camunda-modeler/commits/a07b693a9648715af0410cc13f5c58dcbea2f3df))
* `CHORE`: bump `electron` version
* `CHORE`: update to `bpmn-js@2.5.1`
* `CHORE`: update to `dmn-js@5.1.2`
* `CHORE`: update to `diagram-js-minimap@1.2.2`
* `FIX`: correct app icons ([#503](https://github.com/camunda/camunda-modeler/issues/503))



## Looking Forward

This release ships important updates to improve BPMN and DMN editing as well as compatibility of the app with restricted environments. Download it from [camunda.com](https://camunda.com/download/modeler/).

Do you miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@Camunda](https://twitter.com/Camunda).

Stay tuned for bigger under the hood improvements that touch the editor core to improve navigation, performance, and ease of use.