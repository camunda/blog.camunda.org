+++
author = "Sebastian Stamm, Johannes Heinemann, Omran Abazeed, Sebastian Bathke"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-11-30T15:00:00+01:00"
title = "Camunda Optimize 2.3.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.3.0-alpha2.
You can find many improvements and features of the upcoming Optimize version 2.3.0 in this second alpha release:

* Raw data table sorting
* Line charts with improved goal line visualizations
* New improved progress bar styling
* Improved report configurations
* Single-Sign-On support with auth plugins
* Improved upgrade performance #1

**@TODO meggle: update the link after Jira release:**
The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=<TODO>) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Raw data table sorting

{{< figure class="main teaser" src="tableSort.gif">}}

Raw data reports are becoming even more powerful. In addition to hiding and re-arranging columns, with this release it is now possible to sort the table by any column. To do so, simply click on any column header in the report edit mode. Clicking the same column again reverses the sort order.

The sorting that is defined for the report is applied to any instance of the report, so even if you embed the report in a dashboard, it will keep its sorting.

# Line charts with improved goal line visualization

{{< figure class="main teaser" src="lineChart.png">}}

When you define a goal value for a line chart, we display a goal line to visualize whether the goal was reached or not. With this release, we re-designed the goal line and its interaction with the line chart. The datapoints as well as the line is now colored in red when the goal is not reached. In addition, the line is now much smoother than before.

# New improved progress bar styling
The progress bar colors and shape are improved to match the overall Optimize styling. A red line indicator is also added when the progress bar exceeds the goal value. After this indicator the bar turns into a darker color to clearly show the exceeded amount.

{{< figure class="main teaser" src="progressBar.png">}}

# Improved report configurations
A new configuration panel is added to single and combined reports in order to allow the user to easily customize and configure reports. The panel appears by clicking on the cog button available in the edit mode of the report. Every visualization has different settings included in the panel. In line chart and bar chart reports, it is possible to select the color of the graph, add names to the x-axis and y-axis and other additional settings as shown in the figure below. 

{{< figure class="main teaser" src="chartConfiguration.png">}}

In number reports, number precision can be configured from the panel to limit the most significant units to be shown. 

{{< figure class="main teaser" src="NumberConfiguration.png">}}

Some of the previous report settings were also moved into this new panel such as the goal line settings for chart and number reports and tooltips settings for heatmap reports.

# Rearrangement of reports in combined reports
A drag-drop behavior is added to the selected reports section to allow reordering the reports in the report view as shown in the animation below.

{{< figure class="main teaser" src="dragDrop.gif">}}

This feature also works for every other visualization in the combined report.

# Single-Sign-On support with auth plugins
**@TODO Johannes**

# Improved upgrade performance #1

This Optimize release yields an increased upgrade performance by a magnitude of 2 compared to previous releases. It does that by cutting the amount of reindex operations performed for each index upgrade in half. Stay tuned for further improvements in future that will ensure the Optimize upgrade takes the least time possible with the available hardware resources. So you can enjoy new features as soon as possible.

# How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 day trial version. If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
