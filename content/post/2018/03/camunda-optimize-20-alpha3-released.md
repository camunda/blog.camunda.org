+++
author = "Sebastian Stamm"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-03-02T15:00:00+01:00"
title = "Camunda Optimize 2.0.0-alpha3 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.0.0-alpha3.

This release marks the third alpha release of Camunda Optimize 2.0.0. It is also the last one before the GA release of Camunda Optimize 2.0.0 next month. The current alpha version contains lots of new features that allow you to receive more nuanced feedback when working with Reports, e.g. when a Report exceeds a certain threshold or when a flow node exceeds a given target value. We also introduce external sharing, allowing you to share read-only variants of Reports and Dashboards with collegues who might not have an Optimize account. You can also embed Reports and Dashboards in other pages.

<!--more-->

# Target Duration Comparison

{{< figure class="main teaser no-border" src="targetValue.gif">}}

In some scenarios, not the actual value is of importance but how this value compares to a set goal. For example, if an activity which should only take some minutes suddenly takes hours this might indicate a problem.

For Duration Heatmaps, you can now define target duration values for flow nodes. The heatmap then indicates only those nodes whose actual duration are above the set target duration, giving you information about which parts of the process are currently not performing as specified.

# External Embedding and Sharing of Reports and Dashboards

{{< figure class="main teaser no-border" src="embed.png">}}

Providing visibility and insights about your processes is one of the key functionalities of Optimize. Therefore, this version adds a read-only sharing option to Reports and Dashboards. You can generate a link to a specific Report or Dashboard so that collegues who might not have an Optimize account can access the resource. As it is a read-only link, you do not have to fear that the Report or Dashboard is changed.

Using the Sharing functionality, it is also possible to embed a Report or Dashboard into external pages, e.g. your corporate wiki.

# Email Alerts when a Report exceeds a given threshold

{{< figure class="main teaser no-border" src="alerts.png">}}

Being able to get quickly get notified when the system status changes is important. You want to know right away, without having to open Optimize and go through Reports and Dashboards. With the new Alerting feature, you can send an Email whenever a Report value is above or below a threshold.

# Filter process instances by their completion status

By default, a Report considers all process instances, regardless of whether they are still running or not. This release adds two new filters for Reports and Analysis: Running Instances Only and Completed Instances Only. This allows you to make more fine-grained filters, showing you exactly what you need.

# Configure Reports across multiple versions

{{< figure class="main teaser no-border" src="processDefinitionSelection.png">}}

Previously, you had to select a process version when creating a Report, even if the Report does not differ structurally between versions. With the new release, you can configure a Report to consider all process instances across all versions of the process.

We also improved the process definition selection, providing you with a preview of the process.

## How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release from [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 days trail version.
