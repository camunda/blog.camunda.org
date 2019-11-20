+++
author = "Omran Abazeed, Johannes Heinemann"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-08-31T15:00:00+01:00"
title = "Camunda Optimize 2.2.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.2.0-alpha2. This release was mainly focused on improving the UI/UX of the application. The design of the Reports/Dashboards/Alerts lists were imrpovde. A Loading indicator is added throughout the application that appears everytime the data is being loaded from the server. Another interesting feature, is the night time mode in the dashboard view. There are also some performance imrprovements such as the caching of bpmn diagramns.

This release marks the second alpha release of Camunda Optimize 2.2.0.

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15334) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Improve the UI/UX of the Reports/Dashboards/Alerts list

Before this release, the reports, dashboards and alerts lists were inconsistent in term of styling and the information provided. In this release we tried to improve that by adding extra information and icons to the lists. For example, A report list item now includes the selected process definition name. Moreover, Icons are also added according to the report type whether it is a number, table, barchart, piechart or heatmap.

{{< figure class="main teaser" src="report-list.png">}}

The dashboard list items also got updated. A dashboard list item now indicates how many reports are available inside as shown in the image below:

{{< figure class="main teaser" src="dashboard-list.png">}}

The Alert list before this release was not consistent with the other list. Therefore, we unified its styling with the other lists

{{< figure class="main teaser" src="alert-list.png">}}

# Added night-time mode in Dashboard full screen mode

One of the key features that Optimize provides is the monitoring of the data. You create a dashboard with reports depicting all the important information at one glance. Therefore many users had a large screen in their office running Optimize with a dashboard on it. As soon as there occurred profound changes in their workflow they could immediately spot that on the dashboard.

However, during the night a bright screen can be really painful to look at after a while. To mitigate this problem, the new release of Optimize allows to toggle the theme in the fullscreen dashboard mode, such that everything becomes dark. That makes watching the Optimize dashboard even during the night time a pleasent experience. In the following you can see an example dark mode version of the dashboard:

{{< figure class="main teaser no-border" src="nighttime-mode.png">}}

# Loading indicator

Since loading data from a server takes some time especialy if the internet is slow. It is very important to inform the user that the data is being loaded from the server. Therefore, A loading indicator is added through the application that appears everytime that data is bering loaded.

{{< figure class="main teaser no-border" src="loading-indicator.gif">}}

# Improve bpmn diagram performance

When using Optimize, we often need bpmn diagrams, e.g. to display the model, to extract flow node names or to enable user interactions. Sometimes, it is needed to use the same bpmn diagram in multiple place and evertime a bpmn diagram is needed, it get instantiated again. Moreover, instantiating a new bpmn diagram takes relatively long time. Therefore, in this release, everytime a new instance is created, it is cached in memeory and When it is needed again, it is directly available and there is no need to instantiate a new instance anymore. This makes loading pages that has bpmn diagrams much faster.

# How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 day trial version.
