+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2020-02-28T00:00:00+00:00"
title = "Camunda Optimize 3.0.0-alpha2 Released"
+++

We’re excited to announce the release of Camunda Optimize 3.0.0-alpha2.

In this second alpha release of the year, you can get an early look at many improvements and features in advance of the stable Optimize 3.0.0.

This release focuses on:

* Enhanced User Task Monitoring and Reporting
* Improved Dashboard Handling
* Support for Elasticsearch 7.6

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15891) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Enhanced User Task Monitoring and Reporting

Optimize 3.0.0-alpha2 includes new User Task Monitoring and Reporting capabilities.

Up to this point when monitoring the distribution of User Tasks across Assignees or Candidate Groups, it was only possible to see the number or duration of each User Task per Assignee or Candidate Group:

{{< figure src="usertask-report1.png" alt="User Task Group by Assignee distribute by Flow Node " >}}

This release adds the possibility to group by Flow Node and distribute by Assignee or Candidate Group. The resulting report could look like this:
{{< figure src="usertask-report2.png" alt="User Task Group by Flow Node distribute by Assignee" >}}

This report can help to get a good overview about the distribution of each User Task across different Assignees or Candidate Groups and makes Optimize's User Task Reporting capabilities even stronger.

# Improved Dashboard Handling

In addition to the new reporting capabilities, this release also improves the way you can work with dashboards. When adding a report to a dashboard other reports automatically make space for the report. Especially in dashboards that contain many reports this improvement simplifies dashboard interactions a lot.  

{{< video mp4="dashboard-behaviour.mp4" alt="Improved Dashboard Behaviour" >}}

# Support for Elasticsearch 7.6

From this version on, Elasticsearch 7.0.x - 7.6.x is now officially supported.

# What's Next?

The next major release of Camunda Optimize is getting closer and will be released beginning of April. Stay tuned!

A smooth upgrade from Camunda Optimize 2.7 to Optimize 3.0 will be possible. Together with the final 3.0.0 release we will publish a dedicated upgrade guide.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
