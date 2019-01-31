+++
author = "Felix Mueller, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-01-29T09:00:00+01:00"
title = "Camunda Optimize 2.4.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.4.0-alpha1.
You can find many improvements and features of the upcoming Optimize version 2.4.0 in this first alpha release including:

* ElasticSearch REST Client
* ElasticSearch updated version support
* Java 11 Support
* DMN Improvements
* Export Reports to CSV
* Automatic interval selection for date grouping

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15369) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).
<!--more-->
# ElasticSearch Changes

ElasticSearch can be seen as the backbone for Camunda Optimize since we store the imported historic engine data as well as reports, dashboards, and alerts in it. Given this dependency we need to make sure that we always stay up-to-date with enhancements and changes that are added to ElasticSearch.

## ElasticSearch REST Client

When we started the development of Camunda Optimize Elastic's recommendation of communicating to ElasticSearch was to use their Java TransportClient. Since then Elastic has changed their strategy.

Nowadays Elastic officially recommends to use the Java REST Client for communication to the ElasticSearch nodes. Additionally, Elastic plans to deprecate the TransportClient in [future releases](https://www.elastic.co/guide/en/elasticsearch/client/java-api/6.5/client.html).
Besides this some Cloud service providers, who offer Elastic as a Service, do not support the TransportClient (anymore).

With this release of Optimize we reworked the communication from Optimize to ElasticSearch and are using the REST Client in favour of Elastic's TransportClient.

[something about why this is great]

## ElasticSearch updated version support

With this release of Camunda Optimize we update our support for ElasticSearch meaning that from 2.4.0-alpha1 onwards we will not support ElasticSearch 6.0.0 anymore. Instead we add official support for following ElasticSearch versions:

  - 6.2.0+
  - 6.3.1+
  - 6.4.0+
  - 6.5.0+

Elastic has already announced their End Of Life Support for 6.0.x (2019-05-14) and 6.1.x (2019-06-13) and Optimize will reject any versions earlier than 6.2.0 and later/equal to 7.0.0 during startup.

# Java 11 Support

With Optimize 2.4.0-alpha1 comes [Java 11 (LTS) Oracle/OpenJDK Runtime support](https://docs.camunda.org/optimize/latest/technical-guide/supported-environments/#java-runtime). While the minimum supported Java Runtime Version remains 1.8 which is still actively supported by Oracle, Java 9 and 10 as non-LTS releases have already reached their [end of life](https://www.oracle.com/technetwork/java/java-se-support-roadmap.html) and are thus not included as supported runtimes by Optimize.

So feel free to run Optimize 2.4.0-alpha1 with the latest Oracle/OpenJDK Java 11 LTS Runtime.

# DMN Improvements

With Optimize 2.3.0 we added the first DMN Report and since then Optimize imports historic decision instances from the Camunda BPM Runtime Platform.

## DMN Import Plugin Point

The historic decision instances that are being imported can include input and output variables which contain sensitive, irrelevant or incomplete information.
To allow customization of these inputs and outputs we added a new Plugin Point to Camunda Optimize that works in a similar fashion to the existing Variable Import Plugin Point for BPMN process variables.
Implementing such plugins allows you to enrich inputs and outputs with some external values (resolving external variable references), filter out or anonymize information that you don't want to have in Optimize for any reasons, and much more.
Read more about that feature in the [Optimize documentation](https://docs.camunda.org/optimize/latest/technical-guide/plugins/decision-import/), also you can have a look at our [example repository](https://github.com/camunda/camunda-optimize-examples/tree/master/decision-import-plugin) to find the example use cases and plugin implementations.

## DMN Import can be disabled

DMN can be used for many different use-cases. Eventually you use DMN tables for making decisions where it does not make really sense to trying improve the decisions or you simply want to focus on processes rather than decisions.

With this release we added the possibility to completely disable the DMN data import such that decision definitions and decision instances are not imported.

By setting the configuration `import.data.dmn.enabled` to `false` in the `environment-config.yaml` you disable the import. You can find this configuration settings in the [documentation](https://docs.camunda.org/optimize/develop/technical-guide/setup/configuration/#engine-common-settings)

## DMN Raw Data Report Links to Cockpit

When looking at a number of decisions in the Raw Data report, you might be interested in the details for a certain instance. With this release we added a deep link from decision instances to the Cockpit meaning that Decision Raw Data reports have a similar deep link as you are already used to from BPMN Raw Data reports.

[add picture here]

# Export Reports to CSV

For a while it is already possible to export Raw Data Reports as CSV files allowing users to view historic process information in tools like Microsoft Excel to eventually combine them with other data or do further analysis outside of Optimize.
With this release we add the possibility to export all Reports that are currently available in Optimize as CSV.
[bit more here]

# Automatic interval selection for date grouping

While adding more and more features to Optimize, we are also trying to improve the user experience of Optimize and this is exactly what this feature is about. From now on the grouping by date can automatically be done for you, without you worrying about what is the best time range to select.

Let's say you have process for your lead qualification and you want to see how many leads arrived over time. Since you are not sure when the process was actually rolled out in production you don't know if you need to group the data by week, month or year. With the new version you now can select to an automatic grouping. This way Optimize decides for you, based on the data that exists, how the data should be distributed. Have a look here on how this could look like:

{{< figure class="Automatic Interval Selection for grouping by date" src="automatic-selection.png">}}

# What's Next?

The next alpha of Camunda Optimize 2.4 is coming end of February (February 28, 2019). Our team is already working on it by adding some larger features and again many small improvements.

After the next alpha release we will release the next minor **Camunda Optimize 2.4** at the of the first quarter 2019. Stay tuned.

# How to get it

If you want to give the new Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.
Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
