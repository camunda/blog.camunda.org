+++
author = "Kyrylo Zakurdaiev, Omran Abazeed, Johannes Heinemann, Sebastian Stamm"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-08-03T15:00:00+01:00"
title = "Camunda Optimize 2.2.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.2.0-alpha1.

This release marks the first alpha release of Camunda Optimize 2.2.0. Although it is just an alpha release, it is already packed with new brilliant features. The release allows to group process instance frequencies and durations by variable. Also you can perform additional operations like minimum, maximum and median on duration reports. Narrow down your view on the data even further by using the new `canceled process instance only` or `non-executed flow node` filter. Use Optimize to see even faster when certain targets (e.g. KPI's or SLA's) were not met by using the the new goal line in the bar chart. The new version contains not only improvements in the report builder - now you have advanced possibilities regarding the import of complex process variables. Also the UI/UX of Optimize got some improvements, e.g. finding your desried report or dashboard is now a piece of cake, since you can just filter for the name you are looking for.

<!--more-->

// TODO: add jira release
The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15313) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Group by Variable

// TODO: Sebastian

# New duration operations

With the old version of Optimize it was already possible to get the average duration. However, the problem with that is if you are interested in the outliers, e.g. process instances that took a every long or short time. Why? Maybe the longer a process instance is running the more money it costs. Thus, it would make sense to find out to find exactly those process instances and with the new operations maximum and minumum this is possible. There is also another aspect with outliers: extrem values distort the average value. To compensate that fact it also possible retrieve the median of the duration. As an example see the following dashboard, which compares the different operations that you can perform on the process instance duration:

{{< figure class="main teaser no-border" src="new-duration-operations.png">}}

But that not the end of the story. The new operations can not only be applied on the process instance duration, but also on the flow node duration. This gives you even more flexibility to find outliers and make your reports more robost against outliers on a flow node level.


# New filters

// TODO: Kyrylo -> write short summary

## Filter by canceled process instances

// TODO: Kyrylo

## Filter by non-executed flow nodes

// TODO: Sebastian

# Import complex variables

Filtering for variables or grouping by variables are powerful tools to analyse your data. The problem with the previous version of Optimize was, that the application only imported primitive variables. Many users have their important information hidden in complex variables, e.g. represented as JSON variables and then want to analyze fields that are hidden in those fields. With the new alpha release you can now write your own [variable plugin](https://docs.camunda.org/optimize/latest/technical-guide/import/plugins/#variable-import-customization) to transform your complex variables to primitive ones to still be able to filter for your desired information. The whole import/plugin system is depicted in the following diagram: 

{{< figure class="main teaser no-border" src="map-complex-variables-to-primitives.png">}}

As you can see, Optimize is fetching all variables including the complex ones. Later on it is filtering out the complex variables and only stores the primitive variables into Optimize. Bad news is, that Optimize does not store the complex variables directly, but on the bright side gives you the power to write your own variable adpation plugin to map data of complex to primitives variables and then those new variables are imported to Elasticsearch.

# UI/UX improvements

// TODO: Omran -> write short summary

## Search trough report/dashboard lists

// TODO: Omran

## Search trough number reports during the alert definition

// TODO: Sebastian

## Improvements in the control panel

// TODO: Sebastian

## Show Percentage on Hover in Heatmap & Charts

// TODO: Sebastian

## Toggle badge overlay with all actual values in Heatmap

// TODO: Sebastian

## See where you drop your report in the dashboard

// TODO: Sebastian

# How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 day trial version.
