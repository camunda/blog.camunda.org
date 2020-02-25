+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "DMN 1.1", "Tooling", "Release Note", "Camunda Modeler"]
date = "2018-03-01T20:00:00+01:00"
title = "Camunda Modeler 1.12.0-alpha-3 Released"
+++

We are proud to announce the release of Camunda Modeler version 1.12.0-alpha-3. This alpha release ships with the latest DMN modeling and the possibility to deploy diagrams directly from the Camunda Modeler. It also brings us one step closer to a stable release which you can expect at the end of March.

<!--more-->

## Improved DMN Modeling

Expression languages set to anything other than the configured default are now visualized which allows you to see at one glance which cells have a set non-default expression language.

{{< figure class="teaser no-border" src="expression-language.png" alt="Editing expression language" caption="Editing expression language" >}}

Editing input expressions has also been improved. As of this release you don't have to switch between simple expressions and scripts anymore. Both are technically the same and therefore can be edited in one place.

{{< figure class="teaser no-border" src="input-expression-script.gif" alt="Editing input expression script" caption="Editing input expression script" >}}

## Deploy Diagrams directly from the Camunda Modeler

Deploying manually modeled diagrams to a Camunda BPM engine can sometimes be inconvenient, especially when you try to change the model and redeploy several times.

You can now deploy BPMN, DMN and CMMN diagrams directly from the modeler.

To do so, you must first have a configured deployment endpoint.

{{< figure class="teaser no-border" src="deployment-endpoint-configuration.gif" alt="Configuring a deployment endpoint" caption="Configuring a deployment endpoint" >}}

To deploy the current diagram, simply click the deploy icon in the menu bar and choose `Deploy Current Diagram`.

{{< figure class="teaser no-border" src="deployment-configuration.gif" alt="Configuring a deployment endpoint" caption="Configuring a deployment endpoint" >}}

You can then configure the deployment name and tenant id before deploying.


## Other Improvements

Besides an improved DMN modeling this alpha release also ships with the latest BPMN modeling that includes various bug fixes.

## How to get it

If you want to give the new Camunda Modeler a shot you can download the alpha release [here](https://camunda.org/release/camunda-modeler/1.12.0-alpha-3/).

## What's next?

There are a few topics left that we will tackle in order to have a stable release at the end of march:

* copy rules/inputs/outputs
* drag and drop of rules/inputs/outputs
* adding and editing cell descriptions
* editing input and output labels

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
