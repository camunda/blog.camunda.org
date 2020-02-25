+++
author = "Johannes Heinemann, Sebastian Stamm, Omran Abazeed, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
date = "2018-09-28T09:00:00+01:00"
tags = ["Camunda Optimize", "Release Note"]
title = "Camunda Optimize 2.2.0 Released"
+++

For all of you who have been patiently awaiting Optimize 2.2.0 and are eager to try it out, we have some good news: the wait is over! Today, we're happy to announce the latest Camunda Optimize release.

Optimize works alongside Camunda BPM to provide continuous monitoring and insights about your deployed business processes. Optimize tames huge quantities of data to **help process owners make informed decisions** to improve their processes. The new version allows for deeper analysis and comes with many improvements of Optimize's continuous monitoring capabilities.

Version 2.2.0 is feature-rich, and highlights include:

- Group by Variable
- New durations operations
- Combining reports
- Process Parts
- New filters
- Night-time mode
- UI/UX improvements
- Define goal lines
- Import complex variables
- Secure Elasticsearch

<!--more-->

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15338) are available in Jira.

Ready to get hands-on? [Try out a free trial of Camunda Optimize 2.2.0](#how-to-get-it).

In the rest of this post, we'll give more detail on features in this release and what you can achieve with them.

# Group by Variable

We [improved the UI of the control panel in the report builder in general](#improvements-in-the-control-panel), and we also added a new option for the group-by operator. This allows you to group process instances by their variables. Using this new functionality, you can, for example, investigate if certain variable values have an influence on the process instance duration or if there are unusually many (or few) instances with specific variable values.

{{< figure class="main teaser no-border" src="groupby-variable.png">}}

To use this feature, you need to select a process definition, version, and view in the Report edit view and then open the group by variable menu. Under the Variables option you see all variables that occurred for this process version. You can use the search box at the top of the list to quickly find the desired variable. Keep in mind that the group by variable option is only available for views dealing with process instances.

# New duration operations

With previous versions of Optimize, it was already possible to get the average duration. However, what was missing was a way to look at the outliers, e.g. process instances that took a every long or short time. Why? Maybe the longer a process instance is running, the more money it costs. Thus, it would make sense to find those specific process instances, and with the new operations maximum and minimum, this is possible. There's another thing to consider with outliers: extreme values distort the average value. To mitigate this effect, it also possible retrieve the median of the duration. As an example, see the following dashboard, which compares the different operations that you can perform on the process instance duration:

{{< figure class="main teaser no-border" src="new-duration-operations.png">}}

But that not the end of the story. The new operations can be applied not only on the process instance duration, but also on the flow node duration. This gives you even more flexibility to find outliers and make your reports more robust against outliers on a flow node level.

# Combining reports

Creating reports in Optimize is already a very powerful feature, making it possible to monitor and analyze your business process data. The more reports you create, the more important it becomes to compare the results to add context to the reports, because isolated data is less useful and might be hard to interpret. Therefore, the new release offers a new feature to combine reports to show data side-by-side with other data.

To illustrate this new feature, let's use an example: assume we track the sales leads that are coming in. Now, we don't want to see all the incoming leads in aggregate, but rather, we want to compare them based on the region they're coming from to see how well we're performing in a specific region. An example diagram could look like the following:

{{<figure src="sales-leads.png" class="main teaser no-border">}}

# Process Parts

Sometimes you're not interested in the duration of the whole process instance, but only a certain part of it. Let's say you have a process for sales lead qualification. While this process may include all steps from the lead arriving to the final classification, you might be interested in the time it took between the research of a lead and the discovery call. For such scenarios, you can now define Process Instance Parts. When specifying a process part, the process instance duration report now refers to the selected part only instead of the whole instance.

{{< figure class="main teaser no-border" src="process-part.png">}}

# New filters

In order to give you the option to create even more specific and precise reports, Optimize 2.2.0 introduces new filters: `cancelled instances only` filter and the extension for the `executed flow nodes` filter--which was present in previous releases as well, but now lets you filter by flow nodes that were not executed during the process.

## Filter by canceled process instances

In the `Add Filter` dropdown you can now select a `Canceled Instances Only` Filter. Reports with this filter applied will only evaluate data from the process instances that were terminated (canceled) during the execution.

{{<figure src="canceled-processes-filter.png" class="main teaser no-border">}}

## Filter by non-executed flow nodes

In the "Filter by Flow nodes" modal dialog, there is a new button that allows you to only include process instances in your report where certain flow nodes have _not_ been executed. You can select multiple flow nodes to create a filter where none of the selected flow nodes have been executed. As always, you can see a preview of the filter you are about to create above the diagram.

{{< figure class="main teaser no-border" src="filter-flownodes-no.png">}}

## End date filter

In the newest version of Camunda Optimize, you can filter process instances by the end date. The report will only show instances that ended within the defined range of time if you apply this filter. It is also possible to apply an end date filter in a rolling fashion. This works similar to the rolling start date filter that was present in previous versions of Optimize as well--the defined range will change as time passes. You can also apply the start date and the end date filters together.
{{< figure class="End date filter" src="optimize-end-date-filter.png">}}

# Night mode

One of the key features that Optimize provides is the monitoring of the data. You create a dashboard with reports collecting all important information in one glance. Therefore, many users have a large screen in their office running Optimize and showing a dashboard. As soon as there were profound changes in their workflow, they could immediately spot the change on the dashboard.

However, especially at night, a bright screen can be painful to look at after a while. To mitigate this problem, the new release of Optimize allows you to toggle the theme in the fullscreen dashboard mode so that all elements become dark. That makes watching the Optimize dashboard a pleasant experience, even during nighttime. In the following screenshot, you can see an example of the dark mode version of the dashboard:

{{< figure class="main teaser no-border" src="nighttime-mode.png">}}

# UI/UX improvements

In this release, since there are many new features that were added to Optimize, it was necessary to organize all the new options in a ways to allow easy selection. To achieve that, a new menu selection for the report control panel is being introduced. The new menu selection is designed to group existing features that are similar to submenus. This makes existing menus much simpler and easier to choose from.

Another important feature is the a new search box in the dashboard and report list. Now it is much easier to find a report by just typing any part of the report name in the search box. Moreover, searchable selection menus were introduced to makes it easy to select from a long lists of entries. It is used in a number of places throughout the application especially in places where selecting from a list of variables is needed.

Dashboards also received some UI/UX improvements. For example, when moving a dashboard from one place to another, the dashboard snaps to a grid. It also shows feedback to the user when the placement is not possible due to an overlap with another report.

## Search through report/dashboard lists

Before this release, finding a report/dashboard was only possible by scrolling through a list. This is not very efficient, especially if there are a large number of entries in the list. To solve that, a new search input box was added to the dashboard/report list where users can just type the name of the report/dashboard. Doing that will automatically filter the list to show only the reports that match what was typed into the search box. The search is case insensitive and can match any part of the report/dashboard name.
The following figure illustrates the added feature:
{{< figure class="main teaser no-border" src="list-search-feature.gif">}}

## Search through number reports during the alert definition

To help you quickly find the report you want to create an alert for, we replaced the old select dropdown with a new typeahead input field that allows you to search for reports by their name. Keep in mind that the list will still only display reports that are visualized as single number or duration, as alerts can only be created for such reports.

{{< figure class="main teaser no-border" src="alert-typeahead.gif">}}

## Improvements to the control panel

In the report control panel, the dropdowns for the view, group by, and visualization options now have submenus, giving you a more structured layout to find the exact option you were looking for without scrolling through a list of very detailed and unrelated entries

{{< figure class="main teaser no-border" src="control-panel-ui.png">}}

## Show relative distribution of process instances for count views

Previously, if you had a report that showed the number of either flow nodes or process instances, you could see the total number of entries, but you were unable to see the distribution of those entries. With this release, we add this information to all affected reports. For example, if you have a report showing the number of started process instances every month, you could see that 45% of all process instances have been started in July.

{{< figure class="main teaser no-border" src="relative-value.png">}}

For table visualizations, this information is shown as a third column, for chart and headmap visualizations, you can hover over an entity to see the relative value in the tooltip.

## Toggle badge overlay with all actual values in Heatmap

When looking at heatmaps, it's easy to get a quick overview of the flow node distribution, but it's hard to see actual numbers without hovering over every single flow node to inspect the tooltip. That's why we added an "Always show tooltips" button for Heatmaps. When clicking this button, all tooltips for all flow nodes stay visible. This is also possible when you have defined some target values. If you save the report in this state, the tooltips will also be shown on any dashboard this report is added to.

{{< figure class="main teaser no-border" src="many-tooltips.png">}}

## See where you drop your report in the dashboard

When editing a dashboard, reports are aligned to the grid in the background. This helps creating a clear and good looking layout for the dashboard. With this release we added some additional feedback when dragging a report. A gray outline shows where the report would be placed when you drop it. It also shows a red outline if the report cannot be placed at this position because it would overlap with an existing report.

{{< figure class="main teaser no-border" src="dropshadow.gif">}}

# Improved UI/UX of the Reports/Dashboards/Alerts list

Before this release, the reports, dashboards, and alerts lists were inconsistent in terms of styling and the information provided. In this release we tried to improve that by adding extra information and icons to the lists. For example, a report list item now includes the selected process definition name. Moreover, Icons were also added according to the report type whether it is a number, table, barchart, piechart, or heatmap.

{{< figure class="main teaser" src="report-list.png">}}

The dashboard list items were also updated. A dashboard list item now indicates how many reports are available inside as shown in the image below:

{{< figure class="main teaser" src="dashboard-list.png">}}

The Alert list prior to this release was not consistent with the other lists. Therefore, we unified its styling.

{{< figure class="main teaser" src="alert-list.png">}}

## Loading indicator

Since loading data from a server takes some time, especially if the internet is slow, it is very important to inform the user that the data is being loaded from the server. Therefore, a loading indicator was added throughout Optimize and appears every time that data is loading.

{{< figure class="main teaser no-border" src="loading-indicator.gif">}}

## Improve bpmn diagram performance

When using Optimize, we often need bpmn diagrams, e.g. to display the model, to extract flow node names, or to enable user interactions. Sometimes, it is necessary to use the same bpmn diagram in multiple places, and every time a bpmn diagram is required, it gets instantiated again. In addition, instantiating a new bpmn diagram takes relatively long time. Therefore, in this release, every time a new instance is created, it is cached in memory and when it is needed again, it is directly available--there is no need to instantiate a new instance anymore. This makes loading pages that have bpmn diagrams much faster.

## See process instance count

When defining a report, you often use filters to get the specific process instances you are interested in. Previously, there was no indication about how many process instances are in the defined filter for the selected process definition. With this release, the information how many instances are in the current filter is displayed in the report control panel right next to the filter itself.

# Define goal lines

In some use cases, the visualized data follows an expected pattern and the user is not interested in seeing it repeat over and over again; rather, it is more important to detect any outliers or problems that occur throughout the pattern. To achieve that, Optimize allows you to set a goal line in any bar chart and area chart reports. Setting a goal line highlights in red the parts of visualization that are below or above a certain value. This is useful, for example, to detect if a certain activity is suddenly taking hours instead of minutes to finish or if the monthly sales dropped below or exceeded a certain value.

## Bar chart goal line

It is possible to set a goal line on bar chart reports to highlight the bars above or below a certain value. For example, suppose that the number of completed process instances every month should always be above 10. This can be done by setting the target value in the bar chart view to 10. Now if the number of process instances is below 10 in any month, that month will be highlighted in red as shown.
{{< figure class="main teaser no-border" src="bargoal.png">}}

## Area chart goal line

It is also possible to set a goal line on area chart reports. The feature works exactly like the Bar chart goal line. However, instead of highlighting the bar chart bars, the feature highlights the parts of the line that are below or above a certain value as shown in the chart below:

{{< figure class="main teaser no-border" src="lineGoal.png">}}

# Import complex variables

Filtering for variables or grouping by variables are powerful tools to analyse your data. A problem with the previous version of Optimize was that the application only imported primitive variables. Many users have their important information hidden in complex variables, e.g. represented as JSON variables, and then want to analyze values that are hidden in those fields. With the new alpha release you can now write your own [variable plugin](https://docs.camunda.org/optimize/2.2/technical-guide/import/plugins/#variable-import-customization) to transform your complex variables to primitive ones to still be able to filter for your desired information. The whole import/plugin system is depicted in the following diagram:

{{< figure class="main teaser no-border" src="map-complex-variables-to-primitives.png">}}

As you can see, Optimize fetches all variables including the complex ones. Later on, it is filtering out the complex variables and only stores the primitive variables in Optimize. Optimize does not currently store the complex variables directly, but on the bright side, gives you the power to write your own variable adapter plugin to map data of complex to primitives variables, and then those new variables will be imported to Elasticsearch.

# Secure Elasticsearch

The Camunda Platform collects a lot of sensitive data. To protect the database and the information it contains from being compromised, you can secure the database. But then Optimize imports this same sensitive data to Elasticsearch, and prior to this release, it was not possible to use Optimize with a secured Elasticsearch version. This changes with the new 2.2 release. You can add Elastic's X-Pack feature to your Elasticsearch instance to restrain the access to the instance and encrypt the communication. Read more about how to do that in the documentation about [secure Elasticsearch](https://docs.camunda.org/optimize/2.2/technical-guide/secure-elasticsearch/).

# And much more!

There are many additional smaller features and bugfixes in the release that we didn't mention in this blog post. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15338) include those details.

## How to get it

If you want to give the new Camunda Optimize a try, you can download the release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your enterprise customer credentials. Unlike the core Camunda BPM engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.
