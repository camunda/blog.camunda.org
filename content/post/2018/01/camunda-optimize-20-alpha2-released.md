+++
author = "Johannes Heinemann"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-01-26T15:00:00+01:00"
title = "Camunda Optimize 2.0.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.0.0-alpha2.
This release marks the second alpha release of Camunda Optimize 2.0.0. This version contains a lot of UI improvements as well as two new filter that help you narrow down your view on the process even further to really only see the data you want to see. Also more work on the dashboard was done. You are now able to resize your reports within the dashboard to arrange it to your needs. In addition to that an old acquaintance is back - the branch analysis - providing the possibility to perform a statistical analysis to get even deeper insight in your process behavior.

<!--more-->

# Arange the dashboard

{{< figure class="main teaser no-border" src="dashboard-resizing.png">}}

The dashboard allows you to monitor your processes from different angles at one glance. Define as many report as you like and add them to the dashboard. Before, every report had the same size. This is now over. Set the size of every single report and arrange them to maximize the monitoring power of Optimize!

# Filter process instances

Locating flaws in your process models can be a huge challenge when you have millions of process instances to sift through. This is exactly where the filter functionality of Optimize provides you with ability to narrow down your view to only a subset of process instances. Some awesome filters were already available in older versions of Optimize, e.g. filter process instances by their start date, certain variable values or flow nodes that were executed in the process. In the release we are extending this capability by two more filters:

## Filter process instances by a rolling date

{{< figure class="main teaser no-border" src="rolling-date-filter.png">}}

Change is happening everyday and with that new problems arise. To find those changes as fast as possible, you are now able to define a date filter that does not remain static, e.g. filter all process instances between 2018-01-01 and 2018-01-26, but delivers the subset in a rolling fashion, e.g. all process instances started in the past 7 days. For every day that passes, this range is automatically adjusted.

## Filter process instances by their duration

{{< figure class="main teaser no-border" src="duration-filter.png">}}

Time is money! That also applies to process instances. Therefore, I'm often interested in process instances that took way too long. To do so, you can now filter them by the duration they took to finish.

# Find out which paths lead to a desired outcome

{{< figure class="main teaser no-border" src="branch-analysis.png">}}

If a process contains more than one end event, it is useful to know which path tokens take when they get to an end event. Camunda Optimize can show you a statistical analysis for a given end event and a gateway. This analysis includes how tokens were split at the gateway in question and how many of the tokens of each branch reached the end event.

## How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release from [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 days trail version.



