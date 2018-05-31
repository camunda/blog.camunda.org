+++
author = "Johannes Heinemann, Sebastian Stamm"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-05-31T15:00:00+01:00"
title = "Camunda Optimize 2.1.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.1.0-alpha2.

This release marks the second alpha release of Camunda Optimize 2.1.0. It is also the last alpha release of Optimize 2.1.0 before we release the final version of 2.1.0 next month. The current alpha version handles authorization for users and process definitions so that only users who are authorized to access Optimize can use it and can only see the Process Definitions they are allowed to see. In addition, we added the possibility to add external reports to dashboards and added a new Progress Bar Visualization for single number reports.

<!--more-->

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15313) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Authorization

TODO

# External Reports

{{< figure class="main teaser no-border" src="externalWidget.png">}}

In addition to Optimize Reports, you can now also add external data sources to an Optimize Dashboard. This allows you to include widgets, images or even whole webpages.

# Progress Bar Visualization

{{< figure class="main teaser no-border" src="progress.png">}}

This release adds a new functionality to reports which are visualized as single number. Using the Target Value functionality that was previously reserved for Duration Heatmap reports, you can now set a target value for your numeric reports.

The progress towards the target value is then visualized as progress bar, giving you an intuitive representation of the current state in relation to your goal.

# How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 day trial version.
