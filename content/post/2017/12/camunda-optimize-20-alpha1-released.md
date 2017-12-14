+++
author = "Askar Akhmerov"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2017-12-14T20:00:00+01:00"
title = "Camunda Optimize 2.0-alpha-1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.0-alpha-1.
This release marks the first ever alpha release of the Camunda Optimize 2.0.
 It features extended capabilities for analyzing your Business Processes as
 well as new User Interface.

<!--more-->

## Extended Analytics

Optimize 2.0 provides ground-breaking capabilities to analyze your data even
deeper. Along with new aggregations of your data comes possibility to create
reports and dashboards to represent your data and get full insight of it.

{{< figure
    class="teaser no-border"
    src="main_board.png"
    alt="Dashboards and Reports"
    caption="Analytics Represented in Dashboards and Reports" >}}

Updated aggregations allow you to view either count of process and activities or
 their durations grouped by process instance start date intervals or flow nodes
 frequency. Which can be represented in one of following ways:

* Number
* Table
* Bar chart
* Area line chart
* Pie chart
* Heatmap
* JSON Dump

{{< figure
    class="teaser no-border"
    src="report_creation.png"
    alt="Report Creation"
    caption="Report Creation" >}}

Once you have prepared all reports with insights of your data you can now assemble
them into Dashboards. Each dashboard consists of one or more reports placed on
an infinite grid.

{{< figure
    class="teaser no-border"
    src="dashboard_creation.png"
    alt="Dashboard Creation"
    caption="Dashboard Creation" >}}

## Blazing Fast Import

In order to provide you best user experience, we improved speed of import process,
which now also allows you full control over load that you are putting on your hardware
both on Optimize and Engine sides.

## Ease Of Configuration

Configuration files are now using YAML format, which is easier to maintain and
understand.

## ES 6.0 Ready

Elasticsearch 6.0 was released recently and Optimize is already able to work with
it which allows you rolling updates of your Elasticsearch instances, better
indexing performance and search capabilities.

## How to get it

If you want to give the new Camunda Optimize a shot you can download the alpha release [here](https://camunda.com/download/enterprise/).

## What's next?

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
