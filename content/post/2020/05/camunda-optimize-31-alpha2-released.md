+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2020-05-29T00:00:00+00:00"
title = "Camunda Optimize 3.1.0-alpha2 Released"
+++

We’re excited to announce the release of Camunda Optimize 3.1.0-alpha2.

In this second alpha release of Optimize 3.1.0, you can get an early look at many improvements and features in advance of the stable Optimize 3.1.0.

<!--more-->

This release adds following new capabilities:


* Dashboard Filters
  - Instance State Filters
  - Process Start & End Date Filters
* Flow Node and User Task Filters
  - Flow Node and User Task Duration Filter
  - Assignee and Candidate Group Filter
* New User Task Reports in regards to Assignee & Candidate Groups


The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=16095) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# New Dashboard Filters

In Optimize users can add one or multiple reports to Dashboards to get an up-to-date view of process performance at one glance.
With this release we made Dashboards even more powerful by introducing *Dashboard Filters*.

Dashboard Filters allow Dashboard Viewers to apply certain filters across all reports that have been added to a particular Dashboard:

- Editors can choose between a range of different filters and add them to their Dashboard as needed.
- Viewers can easily make use of them by clicking on the "Filters" Button on the Dashboard without having to open and edit every single report.

Within this release we added Process Instance State and Start / End Date Filters for Dashboards. Additional filters are already on the horizon.

In the following you can see how Dashboard Editors can add the filters to a Dashboard:

{{< figure src="dashboard-filters-editmode.png" alt="Dashboard Filters - Edit Mode" >}}

## State Filters

Once applied the state filter can be used by a Dashboard viewer like this:

{{< figure src="dashboard-filters-state.png" alt="Dashboard Filters - Instance State Filtering" >}}

## Start and End Date Filters

Similar to the state filter the start and end date filters can be used like this:

{{< figure src="dashboard-filters-start-date.png" alt="Dashboard Filters - Start Date Filtering" >}}

# New powerful Flow Node and User Task Filters

With this release we add more capabilities for detailed Flow Node and User Task Analysis - mainly in the area of their durations as well as Assignee and Candidate Groups.

## Flow Node and User Task Duration Filter

Flow Node and User Task Duration are a great indication for underperformance or bottlenecks within your end-to-end process.
Optimize already allows you to look at minimum, maximum and average durations of Flow Nodes and User Tasks for a long time, but with this release we add filtering capabilities for Flow Node and User Task Durations for the first time.

With the help of this new filter you can simply identify process instances where a certain flow node is taking longer or shorter than you expected.

You can find the new *Flow Node Duration Filter* in the Report Edit mode alongside the Process Instance Duration Filter under the category *Duration*.

{{< figure src="flownode-duration-filter1.png" alt="Flow Node Duration Filter 1" >}}

Within the modal you are able to specify a duration for one or multiple flow nodes at the same time (combined with OR).

{{< figure src="flownode-duration-filter2.png" alt="Flow Node Duration Filter 2" >}}

In the report edit mode you are able to see the applied filters with the help of a small overlay:

{{< figure src="flownode-duration-filter3.png" alt="Flow Node Duration Filter 3" >}}

## Assignee and Candidate Group Filter

When monitoring performance and execution of User Tasks, assignees and candidate groups are an important ingredient.
In order to make the analysis and monitoring more efficient we added Assignee and Candidate Group filters within this release.

You will find the new *Assignee and Candidate Group Filters* within the Report Builder Filter menu:

{{< figure src="usertask-assignee-filter1.png" alt="User Task Assignee & Candidate Group 1" >}}

Within the modal you can define which assignees (or candidate groups) should be included in the set of process instances you are looking at:
{{< figure src="usertask-assignee-filter2.png" alt="User Task Assignee & Candidate Group 2" >}}


{{< figure src="usertask-assignee-filter3.png" alt="User Task Assignee & Candidate Group 3" >}}

# New User Task Reports in regards to Assignee & Candidate Groups

In Optimize 3.0 we added User Task Trend Analysis by introducing "group by start & end date" for User Tasks.
With this release we go even further and allow you to distribute the information by assignees or candidate groups.

This functionality allows you to easily identify how many User Tasks have been completed by assignees at a certain period of time.

You can find the new distribution capabilities in the Configuration Popover.

{{< figure src="usertask-groupby-enddate-assignee-distribution1.png" alt="Assignee Trend Analysis 1">}}

An example could look like this:
{{< figure src="usertask-groupby-enddate-assignee-distribution2.png" alt="Assignee Trend Analysis 2">}}

# What's Next?

This was the last alpha release before we'll release **Camunda Optimize 3.1** beginning of July 2020. Stay tuned.

A smooth update from Camunda Optimize 3.0 to Optimize 3.1 will be possible. Along with the release we will publish a dedicated update guide.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
