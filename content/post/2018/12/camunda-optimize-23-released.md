+++
author = "Felix Müller, Johannes Heinemann, Sebastian Bathke"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-12-21T08:00:00+01:00"
title = "Camunda Optimize 2.3.0 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.3.0.

Optimize works alongside Camunda BPM to provide continuous monitoring and insights for your deployed business processes and decision tables. Optimize tames huge quantities of data to help process owners make informed decisions to improve their processes and decisions.

Version 2.3.0 is a feature-rich release, and highlights include:

* First DMN Report
* History Cleanup
* New Report configurations
* Enhanced Combined Reports
* The ability to disable sharing via configuration
* UI/UX Improvements
* Enhanced Version Upgrade
* Plugins: Single Sign-On (SSO), Examples, Debug Mode
* Restructured Documentation
* Pick up license from file

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15342) are available in Jira.

Ready to get hands-on? [Try out a free trial of Camunda Optimize 2.3.0](#how-to-get-it).

In the rest of this post, we’ll give more detail on features in this release and what you can achieve with them.

Prefer not to read the whole post and instead see the new features demonstrated by members of the team? [Register for the free release webinar now](#register-for-the-webinar).

# First DMN Report

Optimize 2.3.0 features DMN raw data reports.
To handle the creation of different report types, Optimize now offers a drop-down menu on the "Create Report" button with BPMN Report as the default.

{{< figure class="main teaser" src="dmn_report_create.png">}}

Selecting `Create DMN Report` allows you to create a raw data report for a particular decision definition.

{{< figure class="main teaser" src="dmn_raw_data_report.png">}}

While this marks the first milestone for DMN reports in Optimize, more report types are planned for upcoming releases.
Please note that in order to see decision definition and instance data, the user needs to be granted access to decision data in Camunda Admin. See our documentation on [Authorization Management](https://docs.camunda.org/optimize/2.3/technical-guide/setup/authorization/).

# History Cleanup

In order to satisfy data protection laws or just for general storage management purposes, Optimize now provides an automated cleanup functionality.

The cleanup is performed based on process and decision instance data. The criteria to decide whether an instance should be cleaned up is based on its end date and the configured time to live period (ttl). There is a global ttl as well as the option to configure process and decision definition-specific ttls. The cleanup has two different cleanup modes for processes: one that completely deletes the process instance (`'all'`) and another that only clears out the variables of the process instance but keeps the instance itself (`'variables'`). Same as the ttl, the mode can be overridden for specific process definitions. For decision instances, the whole instance including input and output variables is always cleaned up.

By default, the cleanup is disabled to prevent unintended data loss. The details of its configuration are explained thoroughly in a dedicated [History Cleanup](https://docs.camunda.org/optimize/2.3/technical-guide/setup/history-cleanup/) section in the Optimize Technical Guide.

# New Report Configurations

A new configuration panel was added to single and combined BPMN reports in order to allow the user to easily customize and configure reports. You can find the panel by clicking on the cog button available in the edit mode of the report. Every visualization has different settings included in the panel. In line chart and bar chart reports, it is possible to select the color of the graph, add names to the x-axis and y-axis, and edit other settings as shown in the figure below.

{{< figure class="main teaser" src="chartConfiguration.png">}}

In number reports, number precision can be configured from the panel to limit the most significant units to be shown.

{{< figure class="main teaser" src="NumberConfiguration.png">}}

Some of the previous report settings were also moved into this new panel, such as the goal line settings for chart and number reports and tooltips settings for heatmap reports.


# Enhanced Combined Reports

Combining reports in Optimize is a powerful feature that allows you to compare the results of multiple reports together in one visualization. In previous releases, we added the ability to combine bar charts, line charts, and table reports. In 2.3.0, we improve this feature even more:

## Combine single number reports

This release allows you to also combine reports with number visualization. Combining multiple number reports will result in a bar chart containing a single bar for each report.

To illustrate this new feature, let’s use an example: assume we track the sales lead count. Now, we don’t want to see all the leads in aggregate, but rather, we want to compare them based on the leads results. An example diagram could look like the following:

{{< figure class="main teaser" src="combined-number.png">}}

## Rearrangement of Reports in Combined Reports

A drag-and-drop behavior was added to the selected reports section to allow reordering the reports in the report view as shown in the animation below.

{{< figure class="main teaser" src="dragDrop.gif">}}

This feature also works for every other visualization in the combined report.

# Sharing can be disabled via configuration

Optimize allows you to easily share reports and dashboards.
By switching the share button on the report or dashboard page, Optimize automatically generates a link that you can send to people who do not have access to Camunda Optimize and thus enable them to see the dashboard or report.

As Optimize can contain sensitive data regarding your processes and decisions, you eventually do not want to enable this feature for your Optimize users.
With this release the report and dashboard sharing feature, which is enabled by default, can now be disabled via the `sharing.enabled` property in the [configuration](https://docs.camunda.org/optimize/2.3/technical-guide/setup/configuration/#other). Once disabled, the share button will be deactivated with a tooltip hint that sharing is disabled.

# UI/UX Improvements

With this release, we also focused on the UI/UX of Optimize, and along with many small improvements, there are some highlights to point out:

## Raw data table sorting

{{< figure class="main teaser" src="tableSort.gif">}}

Raw data reports are becoming even more powerful. In addition to hiding and re-arranging columns, it's now possible to sort the table by any column. To do so, simply click on any column header in the report edit mode. Clicking the same column again reverses the sort order.

The sorting that is defined for the report is applied to any instance of the report, so even if you embed the report in a dashboard, it will maintain its sorting.

## Line charts with improved goal line visualization

{{< figure class="main teaser" src="lineChart.png">}}

When you define a goal value for a line chart, we display a goal line to visualize whether the goal was reached or not. With this release, we redesigned the goal line and its interaction with the line chart. The datapoints as well as the line are now colored in red when the goal has not been reached. In addition, the line is now much smoother than before.

## New improved progress bar styling
The progress bar colors and shape were improved to match the overall Optimize styling. A red line indicator is also added when the progress bar exceeds the goal value. Above the indicator, the bar turns a darker color to clearly show the exceeded amount.

{{< figure class="main teaser" src="progressBar.png">}}

## New Analysis Page UI

{{< figure class="main teaser" src="analysis.png">}}

If a process contains more than one end event, it is useful to know which path tokens take when they get to an end event. Camunda Optimize can show you a statistical analysis for a given end event and a gateway. This analysis includes how tokens were split at the gateway in question and how many of the tokens of each branch reached the end event.

In this release, we improved the usability of the analysis page by providing more information in the control panel of the page as well as giving a textual summary of the result. With these changes, the information is much clearer and easier to understand.

# Enhanced Version Upgrade

To increase the visibility and responsiveness of the upgrade process, the upgrade utility now outputs information on the total number of steps to execute, the number of the current step, and the progress for each single step as percentage.

```
Starting step 1/12: AddFieldStep
Reindexing from optimize-process-instance-temp to optimize-process-instance, progress: 0%
Reindexing from optimize-process-instance-temp to optimize-process-instance, progress: 69%
Reindexing from optimize-process-instance-temp to optimize-process-instance, progress: 100%
Successfully finished step 1/12: AddFieldStep
...
Starting step 11/12: UpdateDataStep
Successfully finished step 11/12: UpdateDataStep
Starting step 12/12: UpdateDataStep
Finished upgrade successfully!
```

In addition, this Optimize release yields an improved upgrade performance by a magnitude of 2 compared to previous releases. It achieves this by cutting the number of reindex operations performed for each index upgrade in half.

# Plugins

Optimize allows you adapt the behavior of Optimize, e.g. to decide which kind of data should be analyzed and to tackle technical issues. In this release, we added another plugin point, added example plugins for different use cases, and let you enable the debug mode of Optimize to develop your plugins more easily.

## Single Sign-On (SSO)

People working in large companies usually have a broad range of tools they use during their daily work. Logging into each tool seperately to access it can be a real pain. To mitigate this problem, many tools support a single-sign-on mechanism, such that the user only needs to log in once and automatically has access to all of their tools.

Optimize now also supports this feature. Simply implement an Optimize single-sign-on plugin and add it to your Optimize distribution. Read more about how to implement the plugin in the [Optimize Plugin System documentation](https://docs.camunda.org/optimize/2.3/technical-guide/plugins/single-sign-on/) or check out the [Camunda Optimize Keycloak SSO Example](https://github.com/camunda/camunda-optimize-examples/tree/master/sso-plugin/optimize-sso-keycloak) to learn how to enable SSO with Optimize and Keycloak.

## New Plugin Examples

It was sometimes hard to get started or find a way to use
the plugin system for certain use cases. To help you with that we created an [Optimize example repository](https://github.com/camunda/camunda-optimize-examples)
which contains a collection of usage examples to quickly get you started

Within this repository you will find examples for [SSO plugins](https://github.com/camunda/camunda-optimize-examples/tree/master/sso-plugin) as well as [variable import plugins](https://github.com/camunda/camunda-optimize-examples/tree/master/variable-import-plugin).

The SSO plugin shows how you can enable SSO with Optimize and Keycloak.
For the variable import plugins, we added four different examples to show the most common use cases for this type of plugin: anonymizing variables, filtering out variables, resolving references to external systems, and transforming complex variables.

If there is an example that you would like to see added there and that you think other users might benefit from, too, feel free to provide a [pull request](https://github.com/camunda/camunda-optimize-examples/pulls) anytime.

## Debug mode

Optimize offers more and more plugins so that you can adapt it to your needs. As fun as it can be to create a plugin, up until the last release, it was a rather cumbersome task because you received no insights into what actually happened during your custom plugin execution. The only resource that provided you with some information was the Optimize log.

Those times have past! With the new debug mode, it has never been easier to implement your own plugin. Just start Optimize in the debug mode, connect your favorite IDE to the debug port, and step through your plugin implementation to find out what's happening. With this feature, it becomes a piece of cake to implement your own Optimize plugin. Read all about it in the [plugin documentation](https://docs.camunda.org/optimize/develop/technical-guide/plugins/#debug-your-plugin).

# Documentation restructuring

Starting from 2.0, we added a myriad of features to Optimize. As with all software, adding more functionality also comes with a price: you have to refactor old code and rewrite documentation that no longer fits the evolving product. The time had come for Optimize to do exactly that. The old documentation structure did not align with all of Optimize's new features and needed a new shiny layout that makes it more intuitive to find what you are looking for. Feel free to check out the [new documentation version](https://docs.camunda.org/optimize/2.3/).

# Pick up license from file

So far adding a license to Optimize was as simple as copying it and pasting it into the input box of the Optimize license page. However, often companies do not want their users to add the license manually, but let the software automatically read the license, so users do not get bothered by the license prompt. With the new release this is now possible by adding the license file to your Optimize distribution. Read all about it in the [Optimize license documentation](https://docs.camunda.org/optimize/2.3/user-guide/license/).

# And much more!

There are many additional smaller features and bugfixes in the release that we didn’t mention in this blog post. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15342) include those details.

# How to get it

If you want to give the new Camunda Optimize a try, you can download the release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.

# Register for the Webinar

If you’re not already registered, be sure to secure a spot in our free release webinars, which are offered in [German](https://attendee.gotowebinar.com/register/5494607444828132365) and [English](https://attendee.gotowebinar.com/register/1407787595570816781).
