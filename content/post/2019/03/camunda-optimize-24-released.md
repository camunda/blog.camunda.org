+++
author = "Omran Abazeed, Sebastian Bathke, Johannes Heinemann, Felix Mueller, Sebastian Stamm, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-03-29T09:00:00+01:00"
title = "Camunda Optimize 2.4.0 Released"
+++

We are happy to announce the release of Camunda Optimize 2.4.0.

With this minor release we add many exciting features in the following areas:

* [Decision Reports](#decision-reports)
* [User Task Reports](#user-task-reports)
* [UX & Report Enhancements](#ux-and-report-enhancements) (i.a. [Reports & Dashboards in Collections](#reports-dashboards-in-collections), [Sorting of Table Reports](#sorting-of-table-reports), [Simplified Start Date Filter Selection](#simplified-start-date-filter-selection))
* [Infrastructure Improvements](#infrastructure-improvements) (i.a. [Clustering](#clustering), [Security](#security), [ElasticSearch REST Client](#elasticsearch-rest-client) & [Support](#elasticsearch-updated-version-support))

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa#tbd) listing all features and bug fixes are available in Jira.

<!--more-->
You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Decision Reports
After the introduction of DMN in Optimize 2.3, in 2.4.0, we've added many new report types for decisions. These new decision report types allow users to analyse and improve decision tables in the same way that it's possible for processes, broadening the scope of Camunda Optimize in a meaningful way.

In your reports, you can now select the evaluation count view. In combination with new "group by" options, this allows you to see how often a decision was evaluated, how the number of evaluations changed over time, or how evaluations are distributed over different input and output variables.

This information can then be visualized with the charts you already know from process reports. You can also set goals, configure the chart colors, and define axis names.

We also added a completely new visualization in the form of a DMN table. If you select `rules` as the grouping criterion, you will see the decision table as you would see it in the Camunda Modeler, but with an additional column showing you how often the rule hit.

All of these reports are of course combinable with filters, which gives you maximum flexibility for creating the report you need.

{{< figure caption="Decision Report showing evaluated rule count" src="decision-reports.png">}}

## Gradient Bars

In the screenshot above you can see that the information how often each rule was matched is not only displayed as number, but also represented as a colored bar. This allows you to easily see which rules matched often and maybe even provides opportunity to clean up large decision tables by removing less often matched rules.

Of course you can also disable this feature in the visualization configuration.

## DMN Import Plugin Point

Historic decision instances that are imported can include input and output variables with sensitive, irrelevant or incomplete information.

To allow customization of these inputs and outputs, we added a new plugin point for Camunda Optimize that works in a similar fashion to the existing Variable Import Plugin Point for BPMN process variables.

Implementing such plugins allows you to enrich inputs and outputs with some external values (resolving external variable references), to filter out or anonymize information that you don't want to have in Optimize.

Read more about the feature in the [Optimize documentation](https://docs.camunda.org/optimize/2.4/technical-guide/plugins/decision-import/). You can have a look at our [example repository](https://github.com/camunda/camunda-optimize-examples/tree/master/decision-import-plugin) to find the example use cases and plugin implementations.

## Disable DMN Import

DMN can be used for many different use cases. Eventually in your specific use case, there is no need to improve the business rules at all.

With this release, we made it possible to completely disable the DMN data import such that decision definitions and decision instances are not imported.

You can disable the import by setting the configuration `import.data.dmn.enabled` to `false` in the `environment-config.yaml`. You can find this configuration settings in the [documentation](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#engine-common-settings).

## DMN Raw Data Report Links to Cockpit

When looking at a number of decisions in the Raw Data report, you might be interested in the details for a certain instance. With this release we added a deeplink from decision instances to the Camunda Cockpit. Decision Raw Data reports have a deeplink similar to what you've seen in BPMN Raw Data reports.

{{< figure class="Decision Instance Link to Cockpit" src="decision-instance-cockpit-link.png">}}


# User Task Reports
Since the inception of Camunda Optimize, users have been able to see the duration of flow nodes. User tasks in particular contain lots of additional valuable information, too. With this release, we've added the option to create reports not only for the total duration of user tasks, but also have a look at their work and idle time separately.

The idle time of a user task is the time it took until someone was assigned to work on the task after it was created. The work time is the time it then took until the task was completed.

You can find the new feature in the view options for process reports.

{{< figure caption="Report showing the average work time for four user tasks" src="usertask-report.png">}}

By making use of this feature it is also possible to compare the idle, work and total time spent on user tasks in a Combined Report.

{{< figure caption="Combined Report showing the average work, idle and total time for four user tasks" src="usertask-combined-report.png">}}

# UX and Report Enhancements

## Reports & Dashboards in Collections

Using Optimize by multiple people and departments might make it harder to find reports and dashboards and organize them as needed.
Therefore, we've added Collections to Optimize. Collections are a great way to group your reports and dashboards to make it easier for people in your organization to find the data they need. Collections exist in the top of the Homepage for easy access and can be easily created using the 'Create New' button on top right of the page. Both reports and dashboard can be added to collections using the `Add to Collection` dropdown found on the reports and dashboards list items.

As part of this feature we also removed the Dashboard & Report list pages and included them in the new Optimize Homepage which is called `Dashboards & Reports`. This allows you to find all of your reports and dashboards in a single place.

{{< video mp4="collections.mp4" alt="Collections">}}


## Sorting of Table Reports

Table Reports in Optimize can be sorted in simple clicks.
Clicking on the header of a column will sort the table by that column. This is shown on the table by a line on the top or the bottom of the header depending on the direction of this sorting (ascending or descending) as shown:

{{< figure src="sorting.png" alt="Sorting table reports">}}

The sorting is persisted with the Report configuration, which means that the sorting you defined will also be used once the Report is placed on a Dashboard.

## Restructured View Options in Report Builder

With the addition of user task reports the dropdown to select the view in the report builder became quite crowded. We took this opportunity to clean up and restructure the dropdown. It is now much clearer which entity (Process Instance, Flow Node or User Task) and which property (Count or Duration) the report should be based on. The aggregation (average, minimum, etc.) can now be selected in the visualization configuration dropdown:

{{< figure src="view-dropdown.png" alt="Selecting views and aggregations">}}


## Simplified Start Date Filter Selection

If your report is visualized as a bar- or linechart, you can use your mouse to select the area you want to create a start date filter for. This allows you to "zoom into" the chart. Afterwards you can still edit or remove the filter again.

{{< video mp4="zoom-in.mp4" alt="Zoom into chart">}}

## Automatic Interval Selection for Date Grouping

Moving forward, the grouping by date can be done for you automatically, without you worrying about the best time range to select. In combination with the new way of selecting a start date filter, this features gives you an enhanced user experience.

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

# Infrastructure Improvements

## Clustering
This release also includes configuration parameters that allow you to seamlessly run multiple Optimize instances in a cluster setup.

An Optimize cluster can provide you the following advantages:

* Increase the availability of Optimize by scaling it horizontally (most commonly used for a failover setup)
* Setup dedicated importing and user-serving Optimize instances to increase responsiveness on high import loads
* In a multi-engine scenario, to distribute the import load over multiple Optimize instances

In a cluster, you need to configure one importing Optimize instance per connected Camunda BPM engine as well as a shared secret on instances that serve user requests. For a more details, please read the dedicated guide in our [documentation](https://docs.camunda.org/optimize/2.4/technical-guide/setup/clustering/).

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

In summary you are able to configure multiple nodes to connect to, only need to care about the elasticsearch HTTP port, can configure a HTTP proxy if required and in terms of secured connections don't need a client certificate anymore. However, this also means you need to revise your Optimize configuration to comply with the new [elasticsearch connection configuration](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#connection-settings) and [elasticsearch security settings](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#security-settings)

### Adding Support for more Elasticsearch Versions

With this release of Camunda Optimize, we've updated our support for Elasticsearch, meaning that from 2.4.0 onwards, we will no longer support ElasticSearch 6.0.0. Instead, we've added official support for the following Elasticsearch versions:

  - 6.2.0+
  - 6.3.1+
  - 6.4.0+
  - 6.5.0+

Elastic has already announced End of Life for support for 6.0.x (2019-05-14) and 6.1.x (2019-06-13), and Optimize will reject any versions earlier than 6.2.0 and later than or equal to 7.0.0 during startup.


## Java 11 Support

With Optimize 2.4.0 comes [Java 11 (LTS) Oracle/OpenJDK Runtime support](https://docs.camunda.org/optimize/2.4/technical-guide/supported-environments/#java-runtime). While the minimum supported Java Runtime Version remains 1.8, which is still actively supported by Oracle, Java 9 and 10 as non-LTS releases have already reached their [end of life](https://www.oracle.com/technetwork/java/java-se-support-roadmap.html) and are thus not included as supported runtimes by Optimize.

So feel free to run Optimize 2.4.0 with the latest Oracle/OpenJDK Java 11 LTS Runtime.

## Environment Variables in Config

For means of externalizing configuration properties from the `environment-config.yaml` configuration file, Optimize now provides Java System Property & OS Environment [variable placeholder support](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#java-system-properties-os-environment-variable-placeholders).


# How to get it

If you want to give the new Camunda Optimize a try, you can download the release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Camunda Optimize is part of Camunda Enterprise, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.

# Register for the Webinar

If you’re not already registered, be sure to secure a spot in our free release webinars, which are offered in [German](https://attendee.gotowebinar.com/register/6384722582779437835) and [English](https://attendee.gotowebinar.com/register/4944989072020589067).
