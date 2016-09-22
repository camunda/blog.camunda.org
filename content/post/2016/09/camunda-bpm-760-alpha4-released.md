+++
author = "Johannes Heinemann, Christopher Zell, Roman Smirnov, Askar Akhmerov and Daniel Meyer"
categories = ["Execution"]
date = "2016-09-23T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.6.0-alpha4 Released"
+++

Camunda 7.6.0-alpha4 is here and it is packed with new features. The highlights are:

* Batch Cancellation of Process Instances
* CMMN Monitoring in Cockpit
* New Home Page for the Webapplication
* Improved Metrics API
* [25 Bug Fixes](https://app.camunda.com/jira/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.6.0-alpha4)

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10230&version=14691) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

<!--more-->
# Batch Cancellation of Process Instances

The new alpha version comes along with a new batch operation. This feature is only available in the Enterprise Edition of Cockpit.

It is now possible to cancel process instances asynchronously, based on search criteria and\or a list of process instance Ids. This allows users to cancel a huge number of process instances.

{{< figure class="teaser" src="batch_cancelation.png" alt="Batch Process Instances Cancellation" caption="" >}}

The page is accessible from the [process instance search](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/dashboard/#search) on the dashboard in Cockpit.

Batch Cancel operations are also available in the Java and [REST API](https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-delete/).

# CMMN Monitoring in Cockpit

This release introduces Monitoring Capabilities for CMMN in Cockpit. This feature is only available in the Enterprise Edition of Cockpit.

On the dashboard, a new tile named "Cases" is available:

{{< figure class="teaser" src="cmmn-cockpit-dashboard.png" alt="CMMN Cockpit" caption="" >}}

Clicking on "Case Definitions" leads us to the _Cases Dashboard_ where we can see a list of deployed Case Definitions and search for Case Instances: 

{{< figure class="teaser" src="cmmn-cockpit-case-dashboard.png" alt="CMMN Cockpit" caption="" >}}

When we select a Case Definition, the _Case Definition View_ opens. This view shows the diagram of the latest version of the Case Definition. On the diagram, we can see how many times a particular Plan Item (Task) has been created and completed. We can also search for Case Instances:

{{< figure class="teaser" src="cmmn-cockpit-definition-view.png" alt="CMMN Cockpit" caption="" >}}

Finally, if we drill down into a particular Case Instance, the _Case Instance View_ opens. This view provides all relevant information about this particular Case Instance. In addition, it is possible to modify variables and terminate the Case Instance:

{{< figure class="teaser" src="cmmn-cockpit-instance-view.png" alt="CMMN Cockpit" caption="" >}}

# CMMN Human Tasks in Tasklist

As a cherry on top, Tasklist now displays the CMMN diagram if the current task is part of a CMMN Case:

{{< figure class="teaser" src="cmmn-tasklist.png" alt="CMMN Cockpit" caption="" >}}

# New Home Page for the Webapplication

We have added a new "Home Page" to the Camunda Webapplication:

{{< figure class="teaser" src="webapp-welcome.png" alt="CMMN Cockpit" caption="" >}}

This is the first page the user sees when opening the Webapplication. It provides 3 basic functionalities:

* Overview of which applications are available to the user.
* Possibility to edit the user profile and change the password.
* List of additional links which can be customized.

# Improved Metrics API

This alpha release introduces the new metric interval query:

```java
List<MetricIntervalValue> intervals =  managementService.createMetricsQuery()
    .startDate(startTime)
    .endDate(endTime)
    .name(Metrics.ACTIVTY_INSTANCE_START)
    .interval(60 * 30); // 30 minutes
```

The query returns a list of `MetricIntervalValue` objects, each of which provides the number of started (created) activity instances during an interval of 30 seconds. The results can be plotted to give an impression of load over time:

{{< figure class="teaser no-border" src="metricActivityStart.png" alt="Activity Start Interval Metric" caption="" >}}

Similar data points can be retrieved for the other available metrics: `activity-instance-end` `job-acquisition-attempt`, `job-acquired-success`, `job-acquired-failure`, `job-execution-rejected`, `job-successful`, `job-failed`, `job-locked-exclusive` and `executed-decision-elements`.

# Feedback Welcome

Please try out the awesome new features of this release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).
