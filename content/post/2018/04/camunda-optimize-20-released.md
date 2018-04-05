+++
author = "Johannes Heinemann"
categories = ["Camunda Optimize"]
date = "2018-04-05T12:00:00+01:00"
tags = ["Camunda Optimize", "Release Note"]
title = "Camunda Optimize 2.0.0 Released"
draft = true
+++

You had too wait several month and were already deperately longing to try it out. There is good news: no need to wait any long, because finally the second major version of our latest product Camunda Optimize is out!

Camunda Optimize is an add-on to Camunda BPM, that provides continuous monitoring and insights about your deployed business processes. This Big Data solution **helps process owners to make informed decisions** to optimize their processes. The new version allows for a deeper analysis and comes with strong improvement of the continuous monitoring.

Version 2.0.0 is again packed with features. The highlights are:

* Get answers to questions about your process using reports
* Monitor your business process with dashboards
* Use more filters to narrow down your view on the process
* Share your insights with other people
* Retrieve an update notifications with alerting

<!--more-->

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15095) are available in Jira.

You can [try out a free trial Camunda Optimize version](#how-to-get-it).

# Get answers to questions about your process using reports

Once you have rolled out your business process, it is very hard to find out which part are not running as expected and need adjustments. Or as life goes on the environment is changing and the process gets outdated and you need to find out which parts of you process need to be updated. With the report functionality you are able to explicitly ask questions what isn't working acording to your requirements and get deeper insights in your process from different angles. Thus, you are prepared to react to any changes in the process and always keep your business performance top-notch.

See here an example of how easy it is to create a report:

{{< video mp4="buildReport.mp4" alt="Animation showing an example of how to build a report"
title="Report builder in Camunda Optimize" caption="Animation showing an example of how to build a report" >}}

The report builder ships with loads of great features, but the following highlight the most noteworthy ones:

## Configure Reports across multiple versions

{{< figure class="main teaser no-border" src="processDefinitionSelection.png">}}

Previously, you had to select a process version when creating a Report, even if the Report does not differ structurally between versions. With the new release, you can configure a Report to consider all process instances across all versions of the process.

We also improved the process definition selection, providing you with a preview of the process.

## Target Duration Comparison

{{< video mp4="targetValue.mp4" alt="Animation showing how to compare your actual duration to your target duration"
title="Target Duration Comparison in Camunda Optimize" caption="Animation showing how to compare your actual duration to your target duration" >}}

In some scenarios, not the actual value is of importance but how this value compares to a set goal. For example, if an activity which should only take some minutes suddenly takes hours this might indicate a problem.

For Duration Heatmaps, you can now define target duration values for flow nodes. The heatmap then indicates only those nodes whose actual duration are above the set target duration, giving you information about which parts of the process are currently not performing as specified and thus you are able to eliminate bottle-necks of your process.

# Continuously Monitor your business process with dashboards

{{< figure class="main teaser no-border" src="dashboard.png">}}

Often it is desired to get a quick overview of the business performance by monitoring the underlying processes. To achieve that, you can define reports in Camunda Optimize according to your KPIs (Key Performance Indicators) relavant to your business objectives. A dashboards shows multiple report so you can get an up-to-date view of the productivity of your system at one glance.

# Use filter to narrow down your view on the process

Locating flaws in your process models can be a huge challenge when you have millions of process instances to sift through. Filtering your data lets you exclude information that you are not interested in and that is distracting you from the important details. In Optimize defining a filter lets you narrow down your view to inpect only a subset of process instances. For instance, that can help to answer questions like "How many invoices did we pay within the last 30 days?" or "How long took the fraud check for all completed process instances within the last year?".

Some awesome filters were already available in older versions of Optimize, e.g. filter process instances by their start date, certain variable values or flow nodes that were executed in the process. In the new release we are extending this capability by three more filters:

## Filter process instances by a rolling date

{{< figure class="main teaser no-border" src="rolling-date-filter.png">}}

Change is happening everyday and with that new problems arise. To find those changes as fast as possible, you are now able to define a date filter that does not remain static, e.g. filter all process instances between 2018-01-01 and 2018-01-26, but delivers the subset in a rolling fashion, e.g. all process instances started in the past 7 days. For every day that passes, this range is automatically adjusted.

## Filter process instances by their duration

{{< figure class="main teaser no-border" src="duration-filter.png">}}

Time is money! That also applies to process instances. Therefore, I'm often interested in process instances that took way too long. To do so, you can now filter them by the duration they took to finish.

## Filter process instances by their completion status

By default, a Report considers all process instances, regardless of whether they are still running or not. This release adds two new filters for Reports and Analysis: Running Instances Only and Completed Instances Only. This allows you to make more fine-grained filters, showing you exactly what you need.

# Share your insights with other people

{{< figure class="main teaser no-border" src="sharing.png">}}

Providing visibility and insights about your processes is one of the key functionalities of Optimize. Therefore, this version adds a read-only sharing option to Reports and Dashboards. You can generate a link to a specific Report or Dashboard so that collegues who might not have an Optimize account can access the resource. As it is a read-only link, you do not have to fear that the Report or Dashboard is changed.

Using the Sharing functionality, it is also possible to embed a Report or Dashboard into external pages, e.g. your corporate wiki.

# Retrieve an update notifications with alerting

{{< figure class="main teaser no-border" src="alerts.png">}}

Being able to get quickly get notified when the system status changes is important. You want to know right away, without having to open Optimize and go through Reports and Dashboards. With the new Alerting feature, you can send an Email whenever a Report value is above or below a threshold.

# Much more

There are many more smaller features and bugfixes in the release which aren't presented here in the blogpost. The [full release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15095) provide the details.

# Register for the Webinar

If you have not already, make sure to place a last-minute registration for the free release webinars - [German](https://register.gotowebinar.com/register/6723119265615514113) and [English](https://register.gotowebinar.com/register/8385014598244744706).

## How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release from [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 days trail version.
