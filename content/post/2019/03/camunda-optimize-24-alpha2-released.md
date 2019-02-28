+++
author = "Sebastian Bathke, Johannes Heinemann, Felix Mueller, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-03-01T09:00:00+01:00"
title = "Camunda Optimize 2.4.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.4.0-alpha2.
You can find many improvements and features from the upcoming Optimize version 2.4.0 in this second alpha release, including:

* DMN Reports
* User Task Reports
* New Filter: Non-Canceled Instances
* Notifications
* Clustering


The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa) are available in Jira.
<!--more-->
You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# DMN Reports
With Optimize 2.3 we introduced the first report for DMN: The raw data report. With this release we add a whole bunch of new report types for decisions. In your reports, you can now select the evaluation count view. In combination with new group by options this allows you to see how often a decision was evaluated, how the frequency of evaluations changed over time or how evaluations are distributed over different input and output variables.

This information can then be visualized with the charts you already know from process reports. You can also set goals, configure the chart colors and define axis names.

We also added a completely new visualization in form of a DMN table. If you select rules as grouping criterium, you will see the dmn table as you would see it in the Camunda modeler, but with an additional column detailing how often each rule was evaluated.

All of these reports are of course combinable with filters, which gives you maximum flexibility for creating the report you need.

{{< figure caption="Decision Report showing evaluated rule count" src="decision-reports.png">}}

# User Task Reports
Since the inception of Camunda Optimize, you were able to see the duration of your flow nodes. And while user tasks are also flow nodes, they contain a lot more interesting information. With this release we add the option to create reports not only for the total duration of user tasks, but also have a look at their work and idle time separately.

The idle time of a user task is the time it took until someone was assigned to work on the task after the it was created. The work time is the time it then took until the task was completed.

You can find the new feature in the view options for process reports.

{{< figure caption="Report showing the average work time for two user tasks" src="usertask-report.png">}}

# New Filter: Non-Canceled Instances
In addition to all of the Optimize's process instance filters, we now introduce Non-Canceled Instances Filter. Applying this filter will make Optimize query only those instances, which were not canceled during the execution. This means, that only active and completed instances are considered. Externally or internally terminated instances are not included in the report. You can combine this new filter with Completed Instances Filter (to see only instances that were successfully completed, otherwise Completed Instances Filter includes canceled instances as well), or with the duration filter (to filter only successfully completed instances by duration), etc.

# Notifications
[omran?]

# Clustering
[meggle?]


# What's Next?

After this alpha release, we'll release the next minor **Camunda Optimize 2.4** at the end of the first quarter 2019. Stay tuned.

# How to get it

If you want to give the new Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core Camunda BPM engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
