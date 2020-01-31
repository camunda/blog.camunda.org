+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2020-01-31T00:00:00+00:00"
title = "Camunda Optimize 3.0.0-alpha1 Released"
+++

We’re excited to announce the release of Camunda Optimize 3.0.0-alpha1.

In this first alpha release of the year, you can get an early look at many improvements and features in advance of the stable Optimize version 3.0.0.

In this release, we focused on:

- Enhanced User Task Monitoring and Reporting
- Enhanced Date Filters
- Support for Elasticsearch 7

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15695) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Enhanced User Task Monitoring and Reporting

Optimize 3.0-alpha1 includes further enhancements to the User Task Monitoring and Reporting capabilities.

Up to this point, when monitoring the distribution of User Tasks or analyzing durations of User Tasks, unassigned User Tasks were not visible in Reports.
The number of unassigned User Tasks and their duration can be very useful when monitoring or analyzing User Task Performance.

Therefore, we have added Unassigned User Tasks to all relevant reports by default.
There is no additional work needed from your side to access this data.

The following example shows all User Tasks of a Process grouped by assignees:
{{< figure src="unassigned-usertasks.png" alt="Unassigned User Tasks" >}}

Additionally, it is also possible to look at the same information distributed by specific User Tasks.
This makes it possible to easily identify how many User Tasks are unassigned currently.
{{< figure src="unassigned-usertasks-pertask.png" alt="Unassigned User Tasks" >}}

# Enhanced Date Filters

With this release, we added more capabilities to our date filters and also improved the usability of the existing functionality.

Prior to 3.0.0-alpha1, there were two different approaches for filtering on dates. You could either filter on a fixed date period, or you could look at a relative time period from today in the past.

One piece of functionality that was missing was the selection of instances that were started or ended in a certain period of time - but relative to the evaluation date of the report itself.

We have added this functionality by reworking the Date Filter for Start and End Date of Process Instances completely.

## Fixed Period

Example: Show me all process instances that have been started in January 2020.

{{< figure src="date-filter-fixed.png" alt="Camunda" >}}

## Rolling Period

Example: Show me all process instances that have been started in the past 30 days.

{{< figure src="date-filter-rolling2.png" alt="Camunda" >}}

## New Relative Period

Example: Show me all process instances that have been started this month.

{{< figure src="date-filter-new-relative.png" alt="Camunda" >}}


# Support for Elasticsearch 7

With this release, we are adding official support for Elasticsearch 7 - more precisely 7.0.x, 7.1.x, 7.2.x, 7.3.x, 7.4.x, and 7.5.x.
And we are no longer supporting Elasticsearch 6.
If you are currently running Optimize in production, it is possible to easily upgrade from Elasticsearch 6 to Elasticsearch 7.

# What's Next?

We'll release the next alpha of **Camunda Optimize 3.0** end of February 2020. Stay tuned.

A smooth update from Camunda Optimize 2.7 to Optimize 3.0 will be possible. Along with the release we will publish a dedicated update guide.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
