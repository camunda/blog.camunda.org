+++
author = "Johannes Heinemann, Sebastian Stamm"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-05-31T15:00:00+01:00"
title = "Camunda Optimize 2.1.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.1.0-alpha2.

This release marks the second alpha release of Camunda Optimize 2.1.0. It is also the last alpha release of Optimize 2.1.0 before we release the final version of 2.1.0 next month. The current alpha version handles authorization for users and process definitions so that only users who are authorized to access Optimize can use it and can only see the Process Definitions they are allowed to see. In addition, we added the possibility to add external reports to dashboards and added a new Progress Bar Visualization for single number reports.

<!--more-->

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15313) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Authorization

Before this release every user that was registered within the engine, could access Camunda Optimize. However, this behavior could lead to a situation where unauthorized people read sensitive data. To prevent this there are now two options: first you can restrict the access to Camunda Optimize and second you can define which Process Definitions users have access to.

The former can be achieved by creating an application authorization for Optimize. In Camunda Admin this could for example look like the following:

{{< figure class="main teaser no-border" src="Admin-Authorize-Optimize-Access.png">}}

By this configuration we allow the user John to login into Optimize. If now want to go to Optimize without beeing authorized, I get a notifiaction that it was not possible to log you in. For instance like it is done with the user mary in the following:

{{< figure class="main teaser no-border" src="Optimize-Login-Mary.png">}}

To define authorization on Process Definitions you use again the authorization system from the Camunda Platform. Let's for example grant the user john access to the process definiton invoice in Camunda Admin:

{{< figure class="main teaser no-border" src="Admin-Authorize-ProcessDefinition-Access.png">}}

With this setting the user john can only access Optimize reports that are based on the Process Definition invoice. If john now accesses a dashboard where a report is added that john has no access to, he sees a message informing him about this fact, e.g. like in the following:

{{< figure class="main teaser no-border" src="Optimize-Dashboard-Restricted-Reports.png">}}

If you interested in more details, just read through the respective sections [User Access Management](https://docs.camunda.org/optimize/2.1/technical-guide/user-management/) and [Authorization Management](https://docs.camunda.org/optimize/2.1/technical-guide/authorization/) in the Optimize documentation.

# External Reports

{{< figure class="main teaser no-border" src="externalWidget.png">}}

In addition to Optimize Reports, you can now also add external data sources to an Optimize Dashboard. This allows you to include widgets, images or even whole webpages.

# Progress Bar Visualization

{{< figure class="main teaser no-border" src="progress.png">}}

This release adds a new functionality to reports which are visualized as single number. Using the Target Value functionality that was previously reserved for Duration Heatmap reports, you can now set a target value for your numeric reports.

The progress towards the target value is then visualized as progress bar, giving you an intuitive representation of the current state in relation to your goal.

# How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 day trial version.
