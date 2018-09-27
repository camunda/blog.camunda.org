+++
author = "Johannes Heinemann, Sebastian Stamm, Omran Abazeed, Kyrylo Zakurdaiev"
categories = ["Camunda Optimize"]
date = "2018-09-28T12:00:00+01:00"
tags = ["Camunda Optimize", "Release Note"]
title = "Camunda Optimize 2.2.0 Released"
+++

You had to wait several months and were already desperately longing to try it out. There is good news: no need to wait any longer because finally the first minor version of our latest product Camunda Optimize is out!

Optimize is an add-on to Camunda that provides continuous monitoring and insights about your deployed business processes. This Big Data solution **helps process owners make informed decisions** to optimize their processes. The new version allows for a deeper analysis and comes with strong improvement of the continuous monitoring.

Version 2.2.0 is again packed with features. The highlights are:

* Group by Variable
* New durations operations
* Combining reports
* Process Parts
* New filters
* Night-time mode
* UI/UX improvements
* Define goal lines
* Import complex variables
* Secure Elasticsearch

<!--more-->

// TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (Johannes)
The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15317) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Group by Variable

We [improved the UI of the control panel in the report builder in general](#improvements-in-the-control-panel), but also added a new option for the group-by operator. This allows you to group process instances by their variables. Using this new functionality, you can for example investigate if certain variable values have an influence on the process instance duration or if there are unusually many (or few) instances with specific variable values.

{{< figure class="main teaser no-border" src="groupby-variable.png">}}

To use this feature, you need to select a process definition, version and view in the Report edit view and then open the group by variable menu. Under the Variables option you see all variables that occured for this process version. You can use the search box at the top of the list to quickly find the desired variable. Keep in mind that the group by variable option is only available for views dealing with process instances.

# New duration operations

With the old version of Optimize it was already possible to get the average duration. However, the problem with that is if you are interested in the outliers, e.g. process instances that took a every long or short time. Why? Maybe the longer a process instance is running the more money it costs. Thus, it would make sense to find out to find exactly those process instances and with the new operations maximum and minumum this is possible. There is also another aspect with outliers: extrem values distort the average value. To compensate that fact it also possible retrieve the median of the duration. As an example see the following dashboard, which compares the different operations that you can perform on the process instance duration:

{{< figure class="main teaser no-border" src="new-duration-operations.png">}}

But that not the end of the story. The new operations can not only be applied on the process instance duration, but also on the flow node duration. This gives you even more flexibility to find outliers and make your reports more robost against outliers on a flow node level.

# Combining reports

Creating reports in Optimize is already a very powerful feature. You can monitor and analyze your business process data with it. The more reports you create the more you also want to compare the results to add context to the reports, because isolated data is less useful and might be hard to interpret. Therefore, the new release offers a new feature to combine reports to show data side-by-side with other data. 

To illustrate this new feature, let's take an example: let's assume we track the sales leads that are coming in. Now we don't want to see all the leads coming in, but compare them based on the region they are coming from to see how good we are performing there. An example diagram could then look like the following:

{{<figure src="sales-leads.png" class="main teaser no-border">}}

# Process Parts

// TODO: Sebastian

# New filters

In order to give you the possibility to create even more specific and precise reports, with the newest Camunda Optimize version we introduce new filters: `cancelled instances only` filter and the extension for the `executed flow nodes` filter, which was present in previous releases as well, but now you can also filter by flow nodes which were not executed during the process.

## Filter by canceled process instances

In the `Add Filter` dropdown you can now select a `Canceled Instances Only` Filter. Reports with this filter applied will only evaluate data from the process instances, that were terminated (canceled) during the execution.

{{<figure src="canceled-processes-filter.png" class="main teaser no-border">}}

## Filter by non-executed flow nodes

In the "Filter by Flownodes" modal dialog, there is a new button that allows you to only include process instances in your report where certain flow nodes have _not_ been executed. You can select multiple flow nodes to create a filter where none of the selected flownodes have been executed. As always, you can see a preview of the filter you are about to create above the diagram.

{{< figure class="main teaser no-border" src="filter-flownodes-no.png">}}

## End date filter

In the newest version of Camunda Optimize, you can filter process instances by the end date.
Report will only show instances that ended within the defined range of time, if you apply this filter.
It is also possible to apply an end date filter in a rolling fashion, this works similar to the rolling start date filter, that was present in previous versions of optimize as well, – the defined range will change as the time goes. You can also apply the start date and the end date filters together.
{{< figure class="End date filter" src="optimize-end-date-filter.png">}}

# Night-time mode

One of the key features that Optimize provides is the monitoring of the data. You create a dashboard with reports depicting all the important information at one glance. Therefore many users had a large screen in their office running Optimize with a dashboard on it. As soon as there occurred profound changes in their workflow they could immediately spot that on the dashboard.

However, during the night a bright screen can be really painful to look at after a while. To mitigate this problem, the new release of Optimize allows to toggle the theme in the fullscreen dashboard mode, such that everything becomes dark. That makes watching the Optimize dashboard even during the night time a pleasent experience. In the following you can see an example dark mode version of the dashboard:

{{< figure class="main teaser no-border" src="nighttime-mode.png">}}


# UI/UX improvements

In this release, since there are many new features that got added to Camunda Optimize, It was necessary to organize all the new options in a ways to allow easy selection. To achieve that, a new menu selection for the report control panel is implemented. The new menu selection is designed to group existing features that are similar to submenus. This makes existing menus much simpler and easier to choose from.

Another important feature is the added search box in the dashboard and report list. Now it is much easier to find a report by just typing any part of the report name in the search box. Moreover, searchable selection menus were introduced to makes it easy to select from a long lists of entries. It is used in a number of places throughout the application especially in places where selecting from a list of variables is needed.

Dashboards also got some UI/UX improvements. For example, when moving a dashboard from one place to another, the dashboard snaps to a grid. It also shows feedback to the user when the placement is not possible due to an overlapping with another report.

## Search through report/dashboard lists

Before this release, finding a report/dashboard was only possible by scrolling through the list. This is not very efficient especially if there are a large number of entries in the list. To solve that, a new search input box is added to the dashboard/report list where users can just type the name of the report/dashboard. Doing that will automatically filter the list to show the reports that only matches what was typed into the search box. The search is case insensitive and can match any part of the report/dashboard name.
The following figure illustrates the added feature:
{{< figure class="main teaser no-border" src="list-search-feature.gif">}}

## Search through number reports during the alert definition

To help you quickly find the report you want to create an alert for, we replaced the old select dropdown with a new typeahead input field that allows you to search for reports by their name. Keep in mind that the list will still only display reports that are visualized as single number or duration, as alerts can only be created for such reports.

{{< figure class="main teaser no-border" src="alert-typeahead.gif">}}

## Improvements in the control panel

In the report control panel, the dropdowns for the view, group by and visualization options now have submenus, giving you a more structured layout to find exactly the option you were looking for without scrolling through a list of very detailed unrelated entries

{{< figure class="main teaser no-border" src="control-panel-ui.png">}}

## Show relative distribution of process instances for count views

Previously, if you had a report that showed the number of either flownodes or process instances, you could see the total number of entries, but were unable to see the distribution of those entries. With this release, we add this information to all affected reports. For example, if you have a report showing the number of started process instances in every month, you could see that 45% of all process instances have been started in July.

{{< figure class="main teaser no-border" src="relative-value.png">}}

For table visualizations, this information is shown as a third column, for chart and headmap visualizations, you can hover over an entity to see the relative value in the tooltip.

## Toggle badge overlay with all actual values in Heatmap

When looking at heatmaps, it's easy to get a quick overview of the flow node distribution, but it's hard to see actual numbers without hovering over every single flownode to inspect the tooltip. That's why we added an "Always show tooltips" button for Heatmaps. When clicking this button, all tooltips for all flownodes stay visible. This is also possible when you have defined some target values. If you save the report in this state, the tooltips will also be shown on any dashboard this report is added to.

{{< figure class="main teaser no-border" src="many-tooltips.png">}}

## See where you drop your report in the dashboard

When editing a dashboard, reports are aligned to the grid in the background. This helps creating a clear and good looking layout for the dashboard. With this release we added some additional feedback when dragging a report. I gray outline shows where the report would be placed when you drop it. It also shows a red outline if the report cannot be placed at this position because it would overlap with an already existing report.

{{< figure class="main teaser no-border" src="dropshadow.gif">}}

# Improve the UI/UX of the Reports/Dashboards/Alerts list

Before this release, the reports, dashboards and alerts lists were inconsistent in term of styling and the information provided. In this release we tried to improve that by adding extra information and icons to the lists. For example, A report list item now includes the selected process definition name. Moreover, Icons are also added according to the report type whether it is a number, table, barchart, piechart or heatmap.

{{< figure class="main teaser" src="report-list.png">}}

The dashboard list items also got updated. A dashboard list item now indicates how many reports are available inside as shown in the image below:

{{< figure class="main teaser" src="dashboard-list.png">}}

The Alert list before this release was not consistent with the other list. Therefore, we unified its styling with the other lists

{{< figure class="main teaser" src="alert-list.png">}}

## Loading indicator

Since loading data from a server takes some time especialy if the internet is slow. It is very important to inform the user that the data is being loaded from the server. Therefore, A loading indicator is added through the application that appears everytime that data is bering loaded.

{{< figure class="main teaser no-border" src="loading-indicator.gif">}}

## Improve bpmn diagram performance

When using Optimize, we often need bpmn diagrams, e.g. to display the model, to extract flow node names or to enable user interactions. Sometimes, it is needed to use the same bpmn diagram in multiple place and evertime a bpmn diagram is needed, it get instantiated again. Moreover, instantiating a new bpmn diagram takes relatively long time. Therefore, in this release, everytime a new instance is created, it is cached in memeory and When it is needed again, it is directly available and there is no need to instantiate a new instance anymore. This makes loading pages that has bpmn diagrams much faster.

## See process instance count

// TODO: Sebastian

# Define goal lines

// TODO: write a short introduction to that paragraph. Maybe shortly mention the use-case (Omran)

## Bar chart goal line

It is possible now to set a goal line on bar charts in Optimize. This is useful to highlight the bars above or below a certain value. For example, supposing that the number of completed process instances every month should always be above 10. This can be done by setting the target value in the bar chart view to 10. Now if the number of process instances is below 10 in any month, that month will be highlighted in red as shown.
{{< figure class="main teaser no-border" src="bargoal.png">}}
This feature can be also used with every other bar chart visualization.

## Area chart goal line

// TODO: Omran

# Import complex variables

Filtering for variables or grouping by variables are powerful tools to analyse your data. The problem with the previous version of Optimize was, that the application only imported primitive variables. Many users have their important information hidden in complex variables, e.g. represented as JSON variables and then want to analyze fields that are hidden in those fields. With the new alpha release you can now write your own [variable plugin](https://docs.camunda.org/optimize/latest/technical-guide/import/plugins/#variable-import-customization) to transform your complex variables to primitive ones to still be able to filter for your desired information. The whole import/plugin system is depicted in the following diagram:

{{< figure class="main teaser no-border" src="map-complex-variables-to-primitives.png">}}

As you can see, Optimize is fetching all variables including the complex ones. Later on it is filtering out the complex variables and only stores the primitive variables into Optimize. Bad news is, that Optimize does not store the complex variables directly, but on the bright side gives you the power to write your own variable adpation plugin to map data of complex to primitives variables and then those new variables are imported to Elasticsearch.

# Secure Elasticsearch

// TODO: change link to docs to latest when it is released (Johannes)

The Camunda Platform collects a lot of sensitive. To protect the database and the information it contains from compromise you can secure the database. Now Optimize is importing this sensitive data to Elasticsearch and so far it was not possible to use Optimize with a secured Elasticsearch version. This changes with the new 2.2 release. Add elastics X-Pack feature to your Elasticsearch instance to restrain the access to the instance and encrypt the communication. Read more about how to do that in the documentation about [Secure Elasticsearch](https://docs.camunda.org/optimize/develop/technical-guide/secure-elasticsearch/).

# Much more

// TODO:!!!!!!!!!!!!!!!!!!!!!!!! (Johannes)
There are many more smaller features and bugfixes in the release which aren't presented here in the blogpost. The [full release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15317) provide those details.

## How to get it

If you want to give the new Camunda Optimize a try, you can download the release from [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 days trial version.
