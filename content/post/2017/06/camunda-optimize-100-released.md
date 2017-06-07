+++
author = "Sebastian Stamm"
categories = ["Execution"]
date = "2017-06-07T11:00:00+01:00"
tags = ["Release Note"]
title = "Camunda Optimize 1.0.0 Released"
+++

Today we release the first version of a brand new product: Camunda Optimize.

With Camunda BPM, we have a rock-solid, freaking fast execution engine with web-applications for administrators (Camunda Admin), operators (Camunda Cockpit) and end users (Camunda Tasklist).

Camunda Optimize is an addition to Camunda BPM, that provides continuous monitoring and insights about your deployed business processes. This Big Data solution **helps process owners to make informed decisions** to optimize their processes.

Version 1.0.0 is already packed with features. The highlights are:

* Visualization of flow nodes execution frequencies in a process
* Visualization of average execution duration for any activity
* Eliminating bottle-necks of your process by finding steps that take longer than a specified target value
* Find out which paths process instances took that reached a desired outcome
* Perform analysis based on a subset of all process instances, i.e., by variable value or start date

# Visualization of flow node frequency

{{< figure class="main teaser no-border" src="frequency.png">}}

Camunda Optimize can display a heatmap view of your processes showing which nodes and sequence flows have the most activity. Activity is measured by the number of tokens which have been processed by the node or sequence flow. You can also access the absolute number of instances for any activity.

# Visualization of flow node duration

{{< figure class="main teaser no-border" src="duration.png">}}

In addition to the frequency visualization, Camunda Optimize also displays information about how long each activity took. That way it's easy to determine which flow nodes take a long time on average. You can also access the precise average duration for each flow node.

# Finding steps taking longer than a target value

{{< figure class="main teaser no-border" src="targetValue.png">}}

Based on the duration heatmap, Optimize allows you to specify a target value for every activity. For example, if a user task has to be completed within one day, you can set the target value to one day. If the average time it takes to complete the user task exceeds this target value, the task is highlighted in the heatmap.

# Find out which paths lead to a desired outcome

{{< figure class="main teaser no-border" src="statistics.png">}}

If a process contains more than one end-event, it is useful to know which path tokens take when they get to an end event. Camunda Optimize can show you a statistical analysis for a given end event and a gateway. This analysis includes how tokens were split at the gateway in question and how many of the tokens of each branch reached the end event.

# Filter process instances

{{< figure class="main teaser no-border" src="filter.png">}}

Camunda Optimize allows you to perform all the analytics on a subset of process instances. To do so, you can filter them by their start date or by their variable values.

# How to get it

In contrast to the core engine, Camunda Optimize is not open source, so please [get in touch with us](https://camunda.com/about/contact/) to find out how you can use Camunda Optimize for your processes.
