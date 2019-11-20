+++
author = "Johannes Heinemann, Sebastian Stamm"
categories = ["Camunda Optimize"]
date = "2018-06-29T12:00:00+01:00"
tags = ["Camunda Optimize", "Release Note"]
title = "Camunda Optimize 2.1.0 Released"
+++

You had to wait several months and were already desperately longing to try it out. There is good news: no need to wait any longer because finally the first minor version of our latest product Camunda Optimize is out!

Optimize is an add-on to Camunda that provides continuous monitoring and insights about your deployed business processes. This Big Data solution **helps process owners make informed decisions** to optimize their processes. The new version allows for a deeper analysis and comes with strong improvement of the continuous monitoring.

Version 2.1.0 is again packed with features. The highlights are:

- Data import performance improvements
- Table improvements
- Configure Access and Authorizations
- New additional reports
- Inspect your data in Cockpit
- Typeahead in variable filter

<!--more-->

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15317) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Data import performance improvements

The data import already proved to work reliably. However, one scenario that we didn't think of was the deletion of historic data which resulted in Optimize not importing all new incoming data. By solving this issue we were also able to boost the import significantly. With the Camunda Optimize 2.1.0 release we are taking another step to provide you with a rock-solid product that enables you to continously monitor your data, even quicker.

## Handle the deletion of historic data

Until now, the scenario of the Camunda Platform and Optimize is depicted in the following figure:

{{< figure class="main teaser no-border" src="Optimize-Setup-Assumption.png">}}

The assumption was that the Engine keeps all the data and never throws anything away. Camunda Optimize can import all the data and everyone is happy. However, huge amounts of data comes with a price and that is the latency of retrieving the data from the database. Therefore, many customers decided to use the [history cleanup feature](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-time-to-live) from the Engine and thus keeping only recent data (e.g. last 30 days, 6 months etc.). The idea was then to import always all data to Camunda Optimize while the Engine only keeps the recent data. The following figure depicts again the crux of it:

{{< figure class="main teaser no-border" src="Optimize-Setup-Reality.png">}}

With the new release, Camunda Optimize is now able to cope with this scenario. As a result, users now have the power to get insights into their data over longer time periods.

Please be aware that Optimize only imports the data that it can use for its analysis. Currently, that is:

- the history of the activity instances.
- the history of the process instances.
- the history of variables. Though here we only keep the latest version of the variable and only import primitive types.
- the process definitions.
- the process definition xmls.

## Performance enhancements

To test the performance of the new import, we took a data set consisting of the following distribution:

<table class="table table-striped">
  <tr>
    <th>Number of Process Definitions</th>
    <th>Number of Activity Instances</th>
    <th>Number of Process Instances</th>
    <th>Number of Variable Instances</th>
  </tr>
  <tr>
    <td align="center">20</td>
    <td align="center">21 932 786</td>
    <td align="center">2 000 000</td>
    <td align="center">6 913 889</td>
  </tr>
</table>

While the old import implementation took about 5 hours for the whole import process, the new version only take about 30 minutes to import all data to Camunda Optimize and with that became 8 times faster.

# Table improvements

{{< figure class="main teaser no-border" src="tableImprovements.gif">}}

This release contains significant improvements to Raw Data Reports. With an increased default column width the contents of the table are easily readable even when the table contains many columns. We also moved the Variable label from the variable columns to a higher-level header, freeing up space in all columns.

## Performance Improvements for large datasets

Tables with a lot of rows and columns are now render faster. If the table contains more than 20 rows, you can use the "Previous" and "Next" buttons at the bottom of the table to scroll through the entries.

## Hide and re-arrange columns

Raw Data reports contain a lot of information. With Camunda Optimize 2.1.0 you can configure which information is included in the table report. Using a button to the right of the table in the Report edit mode, you can select which columns are included in the report.

You can also re-arrange the order of columns by grabbing any column by the header and moving it to the desired position.

# Configure Access and Authorizations

Before this release every user that was registered within the engine, could access Camunda Optimize. However, this behavior could lead to a situation where unauthorized people read sensitive data. To prevent this there are now two options: first you can restrict the access to Camunda Optimize and second you can define which Process Definitions users have access to.

The former can be achieved by creating an application authorization for Optimize. In Camunda Admin this could for example look like the following:

{{< figure class="main teaser no-border" src="Admin-Authorize-Optimize-Access.png">}}

By this configuration we allow the user John to login into Optimize. If now want to go to Optimize without being authorized, I get a notifiaction that it was not possible to log you in. For instance like it is done with the user mary in the following:

{{< figure class="main teaser no-border" src="Optimize-Login-Mary.png">}}

To define authorization on Process Definitions you use again the authorization system from the Camunda Platform. Let's for example grant the user john access to the process definiton invoice in Camunda Admin:

{{< figure class="main teaser no-border" src="Admin-Authorize-ProcessDefinition-Access.png">}}

With this setting the user john can only access Optimize reports that are based on the Process Definition invoice. If john now accesses a dashboard where a report is added that john has no access to, he sees a message informing him about this fact, e.g. like in the following:

{{< figure class="main teaser no-border" src="Optimize-Dashboard-Restricted-Reports.png">}}

If you interested in more details, just read through the respective sections [User Access Management](https://docs.camunda.org/optimize/2.1/technical-guide/user-management/) and [Authorization Management](https://docs.camunda.org/optimize/2.1/technical-guide/authorization/) in the Optimize documentation.

# New additional Reports

The old Optimize version enabled you to define all kinds of reports, but often you want to enrich the dashboard with information from other tools or see the progress of you certain key results more easily, which is now possible with Optimize 2.1.0.

## External Reports

{{< figure class="main teaser no-border" src="externalWidget.png">}}

In addition to Optimize Reports, you can now also add external data sources to an Optimize Dashboard. This allows you to include widgets, images or even whole webpages.

## Progress Bar Visualization

{{< figure class="main teaser no-border" src="progress.png">}}

This release adds a new functionality to reports which are visualized as single number. Using the Target Value functionality that was previously reserved for Duration Heatmap reports, you can now set a target value for your numeric reports.

The progress towards the target value is then visualized as progress bar, giving you an intuitive representation of the current state in relation to your goal.

# Inspect your data in Cockpit

The [Raw Data Report](https://docs.camunda.org/optimize/2.0/user-guide/report/#define-the-report) already showed detailed information on a process instances level. However, when you discovered a process instance you are interested in and wanted to see that one in Camunda Cockpit, you had to copy the process instance id and than search for that one in Cockpit. With the new release this step is simplified a lot, as depicted in the following figure:

{{< figure class="main teaser no-border" src="Jump-To-Cockpit.png">}}

As you can see the entries the process instance column are highligted. By clicking on one item you can directly click on a process instance id and directly jump to Cockpit.

# Typeahead in variable filter

One of the core features of Optimize are filters, that allow you to narrow down your view on the data to see only the information you are interested in. Especially, the variable filter is a core element there, because the variables provide additional information that is not contained in the bpmn model itself. Since Optimize is a big data application this also results in having a huge amount of variables. Previously, all variable names were part of a dropdown, which could grow quite large when a process contains many variables. Now you have an input field, where you can search for the variables you are interested in and thus swiftly pick them:

{{< figure class="main teaser no-border" src="Typeahead_VariableName.png">}}

The same problem occurred also for variable values, since each variable can have a large range of variable values. For this reason, you can use a similar typeahead mechanism to easily pick a filter for your specific variable values:

{{< figure class="main teaser no-border" src="Typeahead_VariableValue.png">}}

# Much more

There are many more smaller features and bugfixes in the release which aren't presented here in the blogpost. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15317) provide those details.

## How to get it

If you want to give the new Camunda Optimize a try, you can download the release from [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 days trial version.
