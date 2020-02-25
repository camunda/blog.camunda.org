+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-11-26T10:00:00+01:00"
title = "Camunda Modeler 2.2  Released"
+++

We are proud to announce the Camunda Modeler 2.2 release. This release improves the accessibility of all diagram editors, ships a number of important fixes and provides feature parity with Camunda BPM 7.10.


<!--more-->

The diagram editors (BPMN, CMMN, DRD) now allow you to move a selection of elements with keyboard arrows, giving you more pixel-perfect control over how elements should be positioned. Use the arrow keys along with `Ctrl/Cmd` to move the canvas instead. Press the `Shift` modifier to accelerate both element and canvas movement.

{{< figure class="teaser no-border" src="keyboard-move.gif" alt="Move Elements with Keyboard Arrows" caption="Move Elements with keyboard arrows." >}}

[Download the Camunda Modeler](https://camunda.com/download/modeler/) and start modeling right away.


## Accessible Context Pad

The context pad that provides quick access to modeling actions. Starting with this release it is always accessible, even when modeling on very high or low zoom levels.

{{< figure class="teaser no-border" src="accessible-context-pad.gif" alt="Context pad and popup menu always accessible" caption="Adapting it size to be always accessible: A better context pad." >}}


## Improved Event Based Gateway Modeling

We always strive to be being good in the little things, too. In that spirit, this release improves the modeling of event-based gateways.

{{< figure class="teaser no-border" src="event-based-gateway.gif" alt="Improved context pad, better modeling rules around event-based gateways." caption="Better hints and modeling rules around event-based gateways." >}}


## Camunda 7.10 Feature Parity

This version of our modeler adds support for editing [`camunda:isStartableInTasklist`](https://docs.camunda.org/manual/latest/reference/bpmn20/custom-extensions/extension-attributes/#isstartableintasklist), thus providing full compatibility with the upcoming Camunda 7.10 platform release.


## Full Changelog

The following summarizes all changes shipped with the latest release, including changes from the unannounced `v2.1.0` release.

#### General

* `FEAT`: support moving elements via keyboard arrows on all diagram editors; move canvas using `Ctrl/Cmd` modifier; use `SHIFT` to accelerate keyboard movement speed ([#376](https://github.com/bpmn-io/bpmn-js/issues/376))
* `FEAT`: add accessible context-pad and popup-menu to all diagram editors
* `FIX`: correctly detect file type when opening file ([#944](https://github.com/camunda/camunda-modeler/issues/944))
* `FIX`: correct properties panel scrolling with many items

#### BPMN

* `FEAT`: add editing support for `camunda:isStartableInTasklist` ([#843](https://github.com/camunda/camunda-modeler/issues/843))
* `FEAT`: add ability to register moddle extensions as plugins to bpmn-js ([#949](https://github.com/camunda/camunda-modeler/pull/949))
* `FEAT`: improve `EventBasedGateway` context pad tooltips ([#917](https://github.com/camunda/camunda-modeler/issues/917))
* `FEAT`: improve modeling behavior after `EventBasedGateway` ([#784](https://github.com/camunda/camunda-modeler/issues/784))
* `FEAT`: display group names ([#844](https://github.com/bpmn-io/bpmn-js/issues/844))
* `CHORE`: update to `bpmn-js@3`

#### DMN

* `FEAT`: add ability to move DRD editor canvas with keyboard arrows
* `FEAT`: add diagram origin cross in DRD editor
* `CHORE`: update to `dmn-js@6.0.0`


## Looking Forward

This release ships with Camunda 7.10 feature parity, numerous bug fixes and accessibility improvements for all our diagram editors. Download it from [camunda.com](https://camunda.com/download/modeler/).

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@Camunda](https://twitter.com/Camunda).

Stay tuned for updates on our ongoing editor core refactoring.