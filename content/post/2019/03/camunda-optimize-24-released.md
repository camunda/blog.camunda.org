+++
author = "Omran Abazeed, Sebastian Bathke, Johannes Heinemann, Felix Mueller, Sebastian Stamm, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-03-29T09:00:00+01:00"
title = "Camunda Optimize 2.4.0 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.4.0.
This release includes many features and also bug fixes. The new features can be clustered in four major areas:

* DMN Reports
* User Task Reports
* Infrastructure Enhancements (i.a. Clustering, ElasticSearch REST Client & Support)
* UX Enhancements (i.a. Notifications, Reports in Collections)

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa#tbd) are available in Jira.

<!--more-->
You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# DMN Reports
In Optimize 2.3, we introduced the first-ever report for DMN: The raw data report. In 2.4.0, we've added many new report types for decisions. In your reports, you can now select the evaluation count view. In combination with new "group by" options, this allows you to see how often a decision was evaluated, how the frequency of evaluations changed over time, or how evaluations are distributed over different input and output variables.

This information can then be visualized with the charts you already know from process reports. You can also set goals, configure the chart colors, and define axis names.

We also added a completely new visualization in the form of a DMN table. If you select rules as the grouping criterion, you will see the decision table as you would see it in the Camunda Modeler, but with an additional column showing you how often the rule hit.

All of these reports are of course combinable with filters, which gives you maximum flexibility for creating the report you need.

These new decision report types finally allow users to analyse and improve decision tables in the same way that's possible for processes, broadening the scope of Camunda Optimize in a meaningful way.
{{< figure caption="Decision Report showing evaluated rule count" src="decision-reports.png">}}

## Gradient Bars

[sebastian?]

## DMN Import Plugin Point

Historic decision instances that are imported can include input and output variables with sensitive, irrelevant or incomplete information.

To allow customization of these inputs and outputs, we added a new plugin point for Camunda Optimize that works in a similar fashion to the existing Variable Import Plugin Point for BPMN process variables.

Implementing such plugins allows you to enrich inputs and outputs with some external values (resolving external variable references), to filter out or anonymize information that you don't want to have in Optimize for whatever reason, and much more.

Read more about the feature in the [Optimize documentation](https://docs.camunda.org/optimize/latest/technical-guide/plugins/decision-import/). You can have a look at our [example repository](https://github.com/camunda/camunda-optimize-examples/tree/master/decision-import-plugin) to find the example use cases and plugin implementations.

## Disable DMN Import

DMN can be used for many different use cases where the business rules for a decision are well-established and won’t be changing often. Eventually there is even no need to improve the business rules at all.

With this release, we made it possible to completely disable the DMN data import such that decision definitions and decision instances are not imported.

You can disable the import by setting the configuration `import.data.dmn.enabled` to `false` in the `environment-config.yaml`. You can find this configuration settings in the [documentation](https://docs.camunda.org/optimize/develop/technical-guide/setup/configuration/#engine-common-settings).

## DMN Raw Data Report Links to Cockpit

When looking at a number of decisions in the Raw Data report, you might be interested in the details for a certain instance. With this release we added a deeplink from decision instances to the Cockpit. Decision Raw Data reports have a deeplink similar to what you've seen in BPMN Raw Data reports.

{{< figure class="Decision Instance Link to Cockpit" src="decision-instance-cockpit-link.png">}}


# User Task Reports
Since the inception of Camunda Optimize, users have been able to see the duration of flow nodes. User tasks in particular contain lots of additional valuable information, too. With this release, we've added the option to create reports not only for the total duration of user tasks, but also have a look at their work and idle time separately.

The idle time of a user task is the time it took until someone was assigned to work on the task after it was created. The work time is the time it then took until the task was completed.

You can find the new feature in the view options for process reports.

{{< figure caption="Report showing the average work time for two user tasks" src="usertask-report.png">}}

[todo combination of User Task Reports]

# Infrastructure Enhancements

## Clustering
Last but not least, this release includes configuration parameters that allow you to seamlessly run multiple Optimize instances in a cluster setup.

An Optimize cluster can provide you the following advantages:

* Increase the availability of Optimize by scaling it horizontally (most commonly used for a failover setup)
* Setup dedicated importing and user-serving Optimize instances to increase responsiveness on high import loads
* In a multi-engine scenario, to distribute the import load over multiple Optimize instances

In a cluster, you need to configure one importing Optimize instance per connected Camunda BPM engine as well as a shared secret on instances that serve user requests. For a more details, please read the dedicated guide in our [documentation](https://docs.camunda.org/optimize/latest/technical-guide/setup/clustering/).

The following sample illustrates a simple failover cluster setup.

{{< figure caption="Sample Optimize Cluster Setup " src="clustering.png">}}

In this example, Optimize #1 acts as the actively-importing instance which also serves user requests if they are routed to it by the user facing load balancer. Optimize #2, on the other hand, is configured to not import data from the engine and thus solely handles user requests. If one instance is down, users will still be able to access Optimize as they are routed to the current available instance.

## Security

[Johannes?]

## Elasticsearch Changes

Elasticsearch plays an important role for Camunda Optimize since we use it to store imported historic engine data as well as reports, dashboards, and alerts. Given this close integration, we need to make sure that we always stay up-to-date with enhancements and changes that are added to Elasticsearch.

### Elasticsearch REST Client

When we started the development of Camunda Optimize, Elastic's recommendation for communicating to Elasticsearch was to use their Java TransportClient. Since then, Elastic has updated their recommended approach.

Elastic now officially recommends using the Java REST Client for communication with the Elasticsearch nodes. Additionally, Elastic plans to deprecate the TransportClient in [future releases](https://www.elastic.co/guide/en/elasticsearch/client/java-api/6.5/client.html).
In addition, some cloud service providers who offer Elastic as a service no longer support the TransportClient.

With this release of Optimize, we reworked the communication from Optimize to Elasticsearch and are using the REST Client instead of Elastic's TransportClient.

### Elasticsearch updated version support

With this release of Camunda Optimize, we've updated our support for Elasticsearch, meaning that from 2.4.0 onwards, we will no longer support ElasticSearch 6.0.0. Instead, we've added official support for the following Elasticsearch versions:

  - 6.2.0+
  - 6.3.1+
  - 6.4.0+
  - 6.5.0+

Elastic has already announced End of Life for support for 6.0.x (2019-05-14) and 6.1.x (2019-06-13), and Optimize will reject any versions earlier than 6.2.0 and later than or equal to 7.0.0 during startup.


## Java 11 Support

With Optimize 2.4.0 comes [Java 11 (LTS) Oracle/OpenJDK Runtime support](https://docs.camunda.org/optimize/latest/technical-guide/supported-environments/#java-runtime). While the minimum supported Java Runtime Version remains 1.8, which is still actively supported by Oracle, Java 9 and 10 as non-LTS releases have already reached their [end of life](https://www.oracle.com/technetwork/java/java-se-support-roadmap.html) and are thus not included as supported runtimes by Optimize.

So feel free to run Optimize 2.4.0 with the latest Oracle/OpenJDK Java 11 LTS Runtime.

## Environment Variables in Config

[meggle?]

# UX / Report Enhancements

## Reports & Dashboards in Collections

[Omran?]

## Restructured Report Builder View / Aggregation Options

[sebastian?]

## Sorting of Reports visualizes as Table

[Omran?]

## New way of selecting a Start Date Filter

[sebastian?]

## Automatic Interval Selection for Date Grouping

As we add more and more features to Optimize, we're also trying to improve the user experience, and this is exactly what this feature is about. Moving forward, the grouping by date can be done for you automatically, without you worrying about the best time range to select.

Let's say you have a process for sales lead qualification, and you want to see how many leads arrived over time. Since you're not sure when the process was actually rolled out in production, you don't know if you need to group the data by week, month or year. Starting with this release, you can select automatic grouping. Optimize decides for you how the data should be distributed based on the data that exists. Here's what this might look like:

{{< figure class="Automatic Interval Selection for grouping by date" src="automatic-selection.png">}}

Of course, you can still decide yourself to group by Year, Month, Week, Day, and Hour.


## Instance State Filter Enhancement
In addition to all of Optimize's process instance filters, we now introduce the Non-Canceled Instances Filter. Applying this filter will make Optimize query only those instances that were not canceled during execution. This means that only active and completed instances are considered. Externally or internally terminated instances are not included in the report. You can combine this new filter with a Completed Instances Filter to see only instances that were successfully completed--otherwise, the Completed Instances Filter includes canceled instances as well. The Non-Canceled Instances filter can also be combined with the duration filter to filter only successfully completed instances by duration, for example.

## Export Reports to CSV

For awhile, it's been possible to export Raw Data Reports as CSV files, allowing users to view historic process information in tools like Microsoft Excel to eventually combine them with other data or do further analysis outside of Optimize.
With this release, we added the ability to export **all report types** that are currently available in Optimize as a CSV.
This allows you to continue your analysis outside of Optimize - no matter what kind of view you're using and which visualization type you chose.

## Notifications
This release includes a new notification feature in Optimize. Notifications provide timely information about the status of the application and give you direct feedback of the result of actions that were taken.

Here are some of the cases where a notification appears:

* Failure to save a report or dashboard
* Session timeout
* Logout failure

Notifications appear at the top center of the page. They appear in different styles depending on the type of the notification as shown in the image below.

{{< figure caption="Notifications types" src="notifications.png">}}

Multiple notifications will be stacked on top of each other and will close automatically if the user does not interact with them.

# How to get it

If you want to give the new Camunda Optimize a try, you can download the release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Camunda Optimize is part of Camunda Enterprise, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.

# Register for the Webinar

If you’re not already registered, be sure to secure a spot in our free release webinars, which are offered in [German](https://attendee.gotowebinar.com/register/6384722582779437835) and [English](https://attendee.gotowebinar.com/register/4944989072020589067).
