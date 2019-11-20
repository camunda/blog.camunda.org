+++
author = "Omran Abazeed, Sebastian Bathke, Johannes Heinemann, Felix Mueller, Sebastian Stamm, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-03-29T09:00:00+01:00"
title = "Camunda Optimize 2.4.0 Released"
+++

We are happy to announce the release of Camunda Optimize 2.4.0.

The release includes many exciting features in the following areas:

* [Decision Reports](/post/2019/03/camunda-optimize-24-released/#decision-reports)
* [User Task Reports](/post/2019/03/camunda-optimize-24-released/#user-task-reports)
* [UX & Report Enhancements](/post/2019/03/camunda-optimize-24-released/#ux-and-report-enhancements) (e.g. [Reports & Dashboards in Collections](/post/2019/03/camunda-optimize-24-released/#reports-dashboards-in-collections), [Sorting of Table Reports](/post/2019/03/camunda-optimize-24-released/#sorting-of-table-reports), and [Simplified Start Date Filter Selection](/post/2019/03/camunda-optimize-24-released/#simplified-start-date-filter-selection))
* [Infrastructure Improvements](/post/2019/03/camunda-optimize-24-released/#infrastructure-improvements) (e.g. [Clustering](/post/2019/03/camunda-optimize-24-released/#clustering), [Security](/post/2019/03/camunda-optimize-24-released/#security), [ElasticSearch REST Client](/post/2019/03/camunda-optimize-24-released/#elasticsearch-rest-client) & [Support](/post/2019/03/camunda-optimize-24-released/#adding-support-for-more-elasticsearch-versions))

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15365) listing all features and bug fixes are available in Jira.

<!--more-->
You can [try out a free trial of Camunda Optimize](#how-to-get-it) and also [register for our webinars in English and German](#register-for-the-webinar).

# Decision Reports
DMN was first introduced in Optimize 2.3, and in 2.4.0, we've added many new report types for decisions. These new decision report types allow users to analyse and improve decision tables in the same way that's possible for processes, broadening the scope of Camunda Optimize in a meaningful way.

In your reports, you can now select the evaluation count view. In combination with new "group by" options, this allows you to see how often a decision was evaluated, how the number of evaluations changed over time, or how evaluations are distributed over different input and output variables.

This information can then be visualized with the charts you already know from process reports. You can also set goals, configure the chart colors, and define axis names.

We also added a completely new visualization in the form of a DMN table. If you select `rules` as the grouping criterion, you will see the decision table as you would see it in the Camunda Modeler, but with an additional column showing you how often each rule was matched.

And all of these reports are combinable with filters, which gives you maximum flexibility for creating the report you need.

{{< figure caption="Decision Report showing evaluated rule count" src="decision-reports.png">}}

## Gradient Bars

In the screenshot above, you can see that the information about how often each rule was matched is not only displayed as number, but also represented as a colored bar. This allows you to easily see which rules matched often and could provide an opportunity to clean up large decision tables by removing less-frequently-matched rules.

Of course, you can also disable this feature in the visualization configuration.

## DMN Import Plugin Point

Historic decision instances that are imported can include input and output variables with sensitive, irrelevant, or incomplete information.

To allow customization of these inputs and outputs, we added a new plugin point for Camunda Optimize that's similar to the existing Variable Import Plugin Point for BPMN process variables.

Implementing such plugins allows you to enrich inputs and outputs with some external values (resolving external variable references) and to filter out or anonymize information that you don't want to have in Optimize.

Read more about the feature in the [Optimize documentation](https://docs.camunda.org/optimize/2.4/technical-guide/plugins/decision-import/). You can have a look at our [example repository](https://github.com/camunda/camunda-optimize-examples/tree/master/decision-import-plugin) to find the example use cases and plugin implementations.

## Disable DMN Import

You might reach a point where for your use case, there's no longer a need to improve the business rules.

With this release, we made it possible to completely disable the DMN data import such that decision definitions and decision instances are not imported.

You can disable the import by setting the configuration `import.data.dmn.enabled` to `false` in the `environment-config.yaml`. You can find this configuration setting in the [documentation](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#engine-common-settings).

## DMN Raw Data Report Links to Cockpit

When looking at a large number of decisions in the Raw Data report, you might be interested in the details for a certain instance. With this release, we added a deeplink from decision instances to the Camunda Cockpit. Decision Raw Data reports have a deeplink similar to what you've seen in BPMN Raw Data reports.

{{< figure class="Decision Instance Link to Cockpit" src="decision-instance-cockpit-link.png">}}


# User Task Reports
Since the inception of Camunda Optimize, users have been able to see the duration of flow nodes. User tasks in particular contain lots of additional valuable information, too. In 2.4.0, it's possible to create reports not only for the total duration of user tasks, but also to examine their work and idle time separately.

The _idle time_ of a user task is the time it took until someone was assigned to work on the task after it was created. The _work time_ is the time it took until the task was completed after assignment.

You can find the new feature in the view options for process reports.

{{< figure caption="Report showing the average work time for four user tasks" src="usertask-report.png">}}

The feature also makes it possible to compare the idle, work, and total time spent on user tasks in a Combined Report.

{{< figure caption="Combined Report showing the average work, idle and total time for four user tasks" src="usertask-combined-report.png">}}

# UX and Report Enhancements

## Reports & Dashboards in Collections

When Optimize is used by many different people and departments, it can be difficult to find reports and dashboards and organize them as needed.
To address this challenge, we've added Collections to Optimize. Collections are a great way to group your reports and dashboards and to make it easier for people in your organization to find the data they need. Collections exist in the top of the Homepage for easy access and can be created using the 'Create New' button on top right of the page. Both reports and dashboards can be added to collections using the `Add to Collection` dropdown found on the reports and dashboards list items.

We also removed the Dashboard & Report list pages and instead now include them in the new Optimize homepage, which is called `Dashboards & Reports`. This allows you to find all of your reports and dashboards in a single place.

{{< video mp4="collections.mp4" alt="Collections">}}


## Sorting of Table Reports

Table Reports in Optimize can be sorted in a few clicks.
Clicking on the header of a column will sort the table by that column. A line on the top or the bottom of the header specifies the direction of this sorting (ascending or descending) as shown below:

{{< figure src="sorting.png" alt="Sorting table reports">}}

The sorting is persisted with the Report configuration, which means that the sorting you defined will also be used once the Report is placed on a Dashboard.

## Restructured View Options in Report Builder

With the addition of user task reports, the dropdown to select the view in the report builder would have been a bit too crowded. We took this opportunity to clean up and restructure the dropdown. It is now much clearer which entity (Process Instance, Flow Node or User Task) and which property (Count or Duration) the report should be based on. The aggregation (average, minimum, etc.) can now be selected in the visualization configuration dropdown:

{{< figure src="view-dropdown.png" alt="Selecting views and aggregations">}}


## Simplified Start Date Filter Selection

If your report is visualized as a bar or line chart, you can use your mouse to select the area you want to create a start date filter for. This allows you to "zoom into" the chart. Afterwards, you can still edit or remove the filter.

{{< video mp4="zoom-in.mp4" alt="Zoom into chart">}}

## Automatic Interval Selection for Date Grouping

Moving forward, grouping by date can be done for you automatically without the need to worry about the best time range to select. Along with the new option for selecting a start date filter that we just discussed, this feature provides an improved user experience.

Imagine that you have a process for sales lead qualification and you want to see how many leads arrived over time. Since you're not sure when the process was actually rolled out in production, you don't know if you need to group the data by week, month, or year. Starting with this release, you can select automatic grouping. Optimize decides for you how the data should be distributed based on the data that exists. Here's what this might look like:

{{< figure class="Automatic Interval Selection for grouping by date" src="automatic-selection.png">}}

Of course, you can still decide yourself to group by Year, Month, Week, Day, and Hour.

## Instance State Filter Enhancement
Optimize's process instance filters now include the Non-Canceled Instances Filter.

Applying this filter return _only_ the instances that were not canceled during execution. This means that only active and completed instances are included, and externally or internally terminated instances are not included in the report. You can combine this new filter with a Completed Instances Filter to see only instances that were successfully completed--otherwise, the Completed Instances Filter includes canceled instances as well.

## Export Reports to CSV

For many releases, Optimize has supported the export of Raw Data Reports as CSV files, allowing users to view historic process information in tools like Microsoft Excel to eventually combine them with other data or do further analysis outside of Optimize.
With this release, we added the ability to export **all report types** that are currently available in Optimize as a CSV.
This allows you to continue your analysis outside of Optimize no matter what kind of view you're using and which visualization type you chose.

## Notifications
Optimize 2.4.0 also includes a new notification feature. Notifications provide timely information about the status of Optimize and give you direct feedback on actions you've taken.

Here are some of the cases where a notification appears:

* Failure to save a report or dashboard
* Session timeout
* Logout failure

Notifications appear at the top center of the page in different styles depending on the type of the notification:

{{< figure caption="Notifications types" src="notifications.png">}}

Multiple notifications will be stacked on top of each other and will close automatically if the user does not interact with them.

# Infrastructure Improvements

## Clustering
This release also includes configuration parameters that allow you to seamlessly run multiple Optimize instances in a cluster setup.

An Optimize cluster can provide you the following advantages:

* Improve the availability of Optimize by scaling it horizontally (most commonly used for a failover setup)
* Enables setup of dedicated importing and user-serving Optimize instances to increase responsiveness on high import loads
* In a multi-engine scenario, makes it possible to the import load over multiple Optimize instances

In a cluster, you need to configure one importing Optimize instance per connected Camunda BPM engine as well as a shared secret on instances that serve user requests. For a more details, please read the dedicated guide in our [documentation](https://docs.camunda.org/optimize/2.4/technical-guide/setup/clustering/).

The following example illustrates a simple failover cluster setup.

{{< figure caption="Sample Optimize Cluster Setup " src="clustering.png">}}

In this example, Optimize #1 acts as the actively-importing instance and also serves user requests if they are routed to it by the user-facing load balancer. Optimize #2, on the other hand, is configured not to import data from the engine and thus solely handles user requests. If one instance is down, users will still be able to access Optimize as they are routed to the currently-available instance.

## Security

Security is a topic we take very seriously at Camunda. To demonstrate that, we recently added a dedicated [Camunda Security Guide](https://docs.camunda.org/security/) to the documentation. There, you can also find a [Security Notice](https://docs.camunda.org/security/notices/) guide that lists all issues and fixes regarding security. In the future, Optimize will add risks to this list, to, starting with this 2.4.0 release.

Additionally, you might already be familiar with the [Camunda Platform Security Instructions](https://docs.camunda.org/manual/latest/user-guide/security/), where you can read all about how to protect your Camunda BPM Platform against potential threats. Because more and more organizations are using Optimize in production, we now provide the same for Optimize. You can read more about how to safeguard Optimize in the [Optimize Security Instructions](https://docs.camunda.org/optimize/2.4/technical-guide/setup/security/).

## Elasticsearch Changes

Elasticsearch plays an important role for Camunda Optimize since we use it to store imported historic engine data as well as reports, dashboards, and alerts. Given this close integration, we need to make sure that we always stay up-to-date with enhancements and changes that are added to Elasticsearch.

### Elasticsearch REST Client

When we started development of Camunda Optimize, Elastic's recommendation for communicating to Elasticsearch was to use their Java TransportClient. Since then, Elastic has updated their recommended approach.

Elastic now officially recommends using the Java REST Client for communication with the Elasticsearch nodes. Additionally, Elastic plans to deprecate the TransportClient in [future releases](https://www.elastic.co/guide/en/elasticsearch/client/java-api/6.5/client.html).
In addition, some cloud service providers who offer Elastic as a service no longer support the TransportClient.

With this release of Optimize, we reworked the communication from Optimize to Elasticsearch and are using the REST Client instead of Elastic's TransportClient.

If you are currently using a previous version of Optimize, you need to revise your Optimize configuration to comply with the new [Elasticsearch connection configuration](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#connection-settings) and [Elasticsearch security settings](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#security-settings)

### Adding Support for more Elasticsearch Versions

With this release of Camunda Optimize, we've updated our support for Elasticsearch, meaning that from 2.4.0 onwards, we will no longer support ElasticSearch 6.0.0. We've added official support for the following Elasticsearch versions:

  - 6.2.0+
  - 6.3.1+
  - 6.4.0+
  - 6.5.0+

Elastic has already announced End of Life for support for 6.0.x (2019-05-14) and 6.1.x (2019-06-13), and Optimize will reject any versions earlier than 6.2.0 and later than or equal to 7.0.0 during startup.


## Java 11 Support

With Optimize 2.4.0 comes [Java 11 (LTS) Oracle/OpenJDK Runtime support](https://docs.camunda.org/optimize/2.4/technical-guide/supported-environments/#java-runtime). While the minimum supported Java Runtime Version remains 1.8, which is still actively supported by Oracle, Java 9 and 10 as non-LTS releases have already reached their [end of life](https://www.oracle.com/technetwork/java/java-se-support-roadmap.html) and are thus not included as supported runtimes by Optimize.

So you can feel free to run Optimize 2.4.0 with the latest Oracle/OpenJDK Java 11 LTS Runtime.

## Environment Variables in Config

For means of externalizing configuration properties from the `environment-config.yaml` configuration file, Optimize now provides Java System Property & OS Environment [variable placeholder support](https://docs.camunda.org/optimize/2.4/technical-guide/setup/configuration/#java-system-properties-os-environment-variable-placeholders).


# How to get it

If you want to give the new Camunda Optimize a try, you can download the release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Camunda Optimize is part of Camunda Enterprise, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.

# Register for the Webinar

If you’re not already registered, be sure to sign up for a spot in our free release webinars, which are offered in [German](https://attendee.gotowebinar.com/register/6384722582779437835) and [English](https://attendee.gotowebinar.com/register/4944989072020589067).
