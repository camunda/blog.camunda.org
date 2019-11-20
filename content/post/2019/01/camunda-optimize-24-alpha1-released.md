+++
author = "Sebastian Bathke, Johannes Heinemann, Felix Mueller, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-02-01T09:00:00+01:00"
title = "Camunda Optimize 2.4.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.4.0-alpha1.
You can find many improvements and features from the upcoming Optimize version 2.4.0 in this first alpha release, including:

* Elasticsearch REST Client
* Elasticsearch updated version support
* Java 11 Support
* DMN Improvements
* Export Reports to CSV
* Automatic interval selection for date grouping

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15369) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).
<!--more-->
# Elasticsearch Changes

Elasticsearch plays an important role for Camunda Optimize since we use it to store imported historic engine data as well as reports, dashboards, and alerts. Given this close integration, we need to make sure that we always stay up-to-date with enhancements and changes that are added to Elasticsearch.

## Elasticsearch REST Client

When we started the development of Camunda Optimize, Elastic's recommendation for communicating to Elasticsearch was to use their Java TransportClient. Since then, Elastic has updated their recommended approach.

Elastic now officially recommends using the Java REST Client for communication with the Elasticsearch nodes. Additionally, Elastic plans to deprecate the TransportClient in [future releases](https://www.elastic.co/guide/en/elasticsearch/client/java-api/6.5/client.html).
In addition, some cloud service providers who offer Elastic as a service no longer support the TransportClient.

With this release of Optimize, we reworked the communication from Optimize to Elasticsearch and are using the REST Client instead of Elastic's TransportClient.

## Elasticsearch updated version support

With this release of Camunda Optimize, we've updated our support for Elasticsearch, meaning that from 2.4.0-alpha1 onwards, we will no longer support ElasticSearch 6.0.0. Instead, we've added official support for the following Elasticsearch versions:

  - 6.2.0+
  - 6.3.1+
  - 6.4.0+
  - 6.5.0+

Elastic has already announced End of Life for support for 6.0.x (2019-05-14) and 6.1.x (2019-06-13), and Optimize will reject any versions earlier than 6.2.0 and later than or equal to 7.0.0 during startup.


# Java 11 Support

With Optimize 2.4.0-alpha1 comes [Java 11 (LTS) Oracle/OpenJDK Runtime support](https://docs.camunda.org/optimize/latest/technical-guide/supported-environments/#java-runtime). While the minimum supported Java Runtime Version remains 1.8, which is still actively supported by Oracle, Java 9 and 10 as non-LTS releases have already reached their [end of life](https://www.oracle.com/technetwork/java/java-se-support-roadmap.html) and are thus not included as supported runtimes by Optimize.

So feel free to run Optimize 2.4.0-alpha1 with the latest Oracle/OpenJDK Java 11 LTS Runtime.

# DMN Improvements

With Optimize 2.3.0, we added the first DMN report to Optimize, and ever since that release, Optimize imports historic decision instances from the Camunda BPM Runtime Platform. With this release, we added a couple of improvements to lay the ground for more exciting features in this area.

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


# Export Reports to CSV

For awhile, it's been possible to export Raw Data Reports as CSV files, allowing users to view historic process information in tools like Microsoft Excel to eventually combine them with other data or do further analysis outside of Optimize.
With this release, we added the ability to export **all report types** that are currently available in Optimize as a CSV.
This allows you to continue your analysis outside of Optimize - no matter what kind of view you're using and which visualization type you chose.

# Automatic Interval Selection for Date Grouping

As we add more and more features to Optimize, we're also trying to improve the user experience, and this is exactly what this feature is about. Moving forward, the grouping by date can be done for you automatically, without you worrying about the best time range to select.

Let's say you have a process for sales lead qualification, and you want to see how many leads arrived over time. Since you're not sure when the process was actually rolled out in production, you don't know if you need to group the data by week, month or year. Starting with this release, you can select automatic grouping. Optimize decides for you how the data should be distributed based on the data that exists. Here's what this might look like:

{{< figure class="Automatic Interval Selection for grouping by date" src="automatic-selection.png">}}

Of course, you can still decide yourself to group by Year, Month, Week, Day, and Hour.

# What's Next?

The next alpha of Camunda Optimize 2.4  will be released on February 28, 2019. Our team is already working on it, adding both larger features and many small improvements.

After the next alpha release, we'll release the next minor **Camunda Optimize 2.4** at the end of the first quarter 2019. Stay tuned.

# How to get it

If you want to give the new Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core Camunda BPM engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
