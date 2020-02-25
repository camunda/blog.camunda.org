+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-12-06T20:00:00+01:00"
title = "Camunda Modeler 1.12.0-alpha-1 Released"
+++

We are happy to announce the release of Camunda Modeler version 1.12.0-alpha-1. This release marks the first ever alpha release of the Camunda Modeler. It features a completely rewritten DMN modeling that is blazingly fast and handles big decision tables with ease.

<!--more-->

## Blazingly fast DMN modeling

{{< figure class="teaser no-border" src="modeling.gif" alt="The new DMN modeling experience" caption="The new DMN modeling experience" >}}

If you've ever worked with a big DMN decision table using the Camunda Modeler you might have noticed that it becomes significantly slower as soon as you have a few hundred rules.  In order to improve the performance of DMN modeling, we started to rewrite it from scratch. The result is a new modeling experience that is equally enjoyable with both small and big DMN decision tables. Speaking of performance:

{{< figure class="teaser no-border" src="chart.png" alt="Import time" caption="Import time of a decision table with 500 rules in ms" >}}
Using the new DMN modeling you might notice that there are a few things missing. That's why this is an alpha release.

Things you can do already:

* edit decision name and ID
* edit hit policy
* add/remove rules/inputs/outputs
* cut/paste rules/inputs/outputs
* edit input expression/output name
* edit input/output types
* edit input/output entries

Things you can't do yet:

* drag/drop rules/inputs/outputs
* copy rules/inputs/outputs
* clear rules
* edit input/output values
* edit input/output entries using a simple mode
* edit input/output entry expression language
* add input/output entry descriptions

If you prefer performance over features the new DMN modeling you can already give the new DMN modeling a shot. If you want to use any of the features we haven't rewritten yet please bear with us, we're working on it.

## Other Improvements

Besides a rewritten DMN modeling this alpha release also ships with new XML parsing that is significantly faster and fixes a few bugs that in the past allowed you to open invalid BPMN, CMMN or DMN.

## How to get it

If you want to give the new Camunda Modeler a shot you can download the alpha release [here](https://camunda.org/release/camunda-modeler/1.12.0-alpha-1/).

## What's next?

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
