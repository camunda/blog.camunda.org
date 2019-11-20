+++
author = "Johannes Heinemann, Sebastian Stamm"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2018-04-27T15:00:00+01:00"
title = "Camunda Optimize 2.1.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.1.0-alpha1.

This release marks the first alpha release of Camunda Optimize 2.1.0. The current alpha version can deal with process instances that were deleted from the engine history and with that also the data import performance was improved significantly. In addition, the interactions with tables have been have been extended, especially for Raw Data Reports.

<!--more-->

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15305) are available in Jira.

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Data import improvements

The data import already proved to work reliably. However, one scenario that we didn't think of was the deletion of historic data which resulted in Optimize not importing all new incoming data. By solving this issue we were also able to boost the import significantly. With the Camunda Optimize 2.1.0-alpha1 release we are taking another step to provide you with a rock-solid product that enables you to continously monitor your data, even quicker.

## Handle the deletion of historic data

Until now, the scenario of the Camunda Platform and Optimize is depicted in the following figure:

{{< figure class="main teaser no-border" src="Optimize-Setup-Assumption.png">}}

The assumption was that the Engine keeps all the data and never throws anything away. Camunda Optimize can import all the data and everyone is happy. However, huge amounts of data comes with a price and that is the latency of retrieving the data from the database. Therefore, many customers decided to use the [history cleanup feature](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-time-to-live) from the Engine and thus keeping only recent data (e.g. last 30 days, 6 months etc.). The idea was then to import always all data to Camunda Optimize while the Engine only keeps the recent data. The following figure depicts again the crux of it:

{{< figure class="main teaser no-border" src="Optimize-Setup-Reality.png">}}

With the new release, Camunda Optimize is now able to cope with this scenario. As a result, users now have the power to get insights into their data over longer time periods.

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

While the old import implementation took about 5 hours for the whole import process, the new version only take about 40 minutes to import all data to Camunda Optimize and with that became five times faster. 

# Table improvements

{{< figure class="main teaser no-border" src="tableImprovements.gif">}}

This release contains significant improvements to Raw Data Reports. With an increased default column width the contents of the table are easily readable even when the table contains many columns. We also moved the Variable label from the variable columns to a higher-level header, freeing up space in all columns.

## Performance Improvements for large datasets

Tables with a lot of rows and columns are now render faster. If the table contains more than 20 rows, you can use the "Previous" and "Next" buttons at the bottom of the table to scroll through the entries.

## Hide and re-arrange columns

Raw Data reports contain a lot of information. With Camunda Optimize 2.1.0-alpha1 you can configure which information is included in the table report. Using a button to the right of the table in the Report edit mode, you can select which columns are included in the report.

You can also re-arrange the order of columns by grabbing any column by the header and moving it to the desired position.

# How to get it

If you want to give the new Camunda Optimize a shot, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. In contrast to the core engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30 day trial version.
