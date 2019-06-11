+++
author = "Maciej Barelkowski"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note"]
date = "2019-01-18T13:00:00+01:00"
title = "Camunda Modeler 3.0.0-0 Released"
+++

We are proud to announce the first preview of Camunda Modeler 3.0.0 release. This is the first pre-release of Camunda Modeler built upon new architecture. Besides the core refactoring, it ships several new features as well as important fixes.

<!--more-->

In the last months, we have worked on rebuilding Camunda Modeler to make it more extendable as well as easier to maintain and develop. We are now able to release the current state.

{{< figure class="no-border teaser" src="refactored-modeler.png" alt="A screenshot of refactored Camunda Modeler" title="Refactored Modeler" caption="Good old Camunda Modeler on brand new architecture." >}}

[Download Camunda Modeler](https://camunda.org/release/camunda-modeler/3.0.0-0/) and start modeling right away.

## Completely Reworked Deployment Tool

We introduced the deployment tool in version 1.12.0. It allows to deploy your diagrams directly from Camunda Modeler. In the current version, it has been rebuilt from scratch and now it is even more powerful and useful than before.

Now you will be able to authenticate your deployment with username and password (HTTP Basic) or a bearer token. You no longer need to type the detailed endpoint URL. Simply paste a link to root of your REST API. What is more, Camunda Modeler will remember the last endpoint.

{{< figure class="no-border teaser" src="deployment-success.png" alt="A screenshot of deployment tool with successful deployment authenticated with username and password" title="Rebuilt Deployment Tool" caption="Now you can deploy with credentials." >}}

Even if something goes wrong, you will see a meaningful error message. For the technical users, Camunda Modeler displays a detailed error message in the log.

{{< figure class="no-border teaser" src="deployment-error.png" alt="A screenshot of deployment tool with failed deployment and a meaningful error message" title="Meaningful Error Messages" caption="No more cryptic errors." >}}

To save the bandwidth and the engine power, only the changed resources are now deployed.

Although we added multiple functionalities to the deployment tool, we are aware that there is still room for improvement. Please let us know what you think and share your opinion via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@Camunda](https://twitter.com/Camunda).

## Decision Tabs

In the previous version of Camunda Modeler, the only way to edit decision elements was via the diagram tab. Now it is much easier. You can simply navigate using tabs as each decision element is displayed there.

{{< figure class="no-border teaser" src="decision-tabs.png" alt="A screenshot of DMN diagram with decision elements represented as tabs" title="Decision Tabs" caption="Simply click on a tab to move to desired decision element." >}}

## Feedback Shortcuts

It is now easier to suggest new features or report issues. Simply go to the help menu and choose the _Report Issue_ option.

{{< figure class="no-border teaser" src="report-issue.png" alt="A screenshot showing shortcut to new issue page in help menu" title="Feedback Shortcuts" caption="Reporting issues has never been easier." >}}

You can also look for already suggested features with the _Search Feature Requests_ option.

## Full Changelog

The following summarizes all changes shipped with the latest release, including changes from the unannounced `v2.2.x` releases.

### General

* `FEAT`: add ability for users to give feedback via the Help menu ([#1094](https://github.com/camunda/camunda-modeler/issues/1094))
* `FEAT`: improve resolution of exported images ([#486](https://github.com/camunda/camunda-modeler/issues/486))
* `CHORE`: rewrite client app in ReactJS ([#866](https://github.com/camunda/camunda-modeler/issues/866))
* `CHORE`: rewrite back-end for better separation of concerns and extensibility ([#866](https://github.com/camunda/camunda-modeler/issues/866))
* `CHORE`: rework back-end to client communication ([#866](https://github.com/camunda/camunda-modeler/issues/866))
* `FIX`: do not restrict height of properties panel content ([#283](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/283), [#62](https://github.com/bpmn-io/cmmn-js-properties-panel/pull/62), [#6](https://github.com/bpmn-io/dmn-js-properties-panel/pull/6))

### Deploy Dialog

* `FIX`: disable editor shortcuts while modal is active ([#929](https://github.com/camunda/camunda-modeler/issues/929))

### BPMN

* `FEAT`: add hints to returned Java types in properties panel ([#286](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/286))
* `FEAT`: show target variable name instead of index in properties panel ([#287](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/287))
* `CHORE`: update to `bpmn-js@3.1.0`
* `FIX`: render labels always on top ([#1050](https://github.com/camunda/camunda-modeler/issues/1050))
* `FIX`: include `camunda:calledElementVersionTag` ([#1074](https://github.com/camunda/camunda-modeler/issues/1074))
* `FIX`: do not join incoming/outgoing flows other than sequence flows on element deletion ([#1033](https://github.com/camunda/camunda-modeler/issues/1033))
* `FIX`: correct `camunda:isStartableInTasklist` default value

### DMN

* `CHORE`: update to dmn-js@6.2.0
* `FIX`: correct dirty state indicator

### CMMN

* `CHORE`: update to `cmmn-js@0.17.0`

## Current State

As the current release is a pre-release, it still does not provide all the features included in latest stable release `v2.2.4`. Features planned for the second pre-release include:

* plugin system
* drag and drop file to open a diagram
* dirty state indicator.

## Looking Forward

This pre-release ships with new features and fixes as well as up-to-date versions of all our diagram editors. Download it from [camunda.com](https://camunda.org/release/camunda-modeler/3.0.0-0/).

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@Camunda](https://twitter.com/Camunda). Or simply use the brand new feedback shortcuts in Camunda Modeler.

Stay tuned for updates on next pre-release.
