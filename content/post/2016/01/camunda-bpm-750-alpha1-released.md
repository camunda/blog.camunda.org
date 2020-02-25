+++
author = "Daniel Meyer"
categories = ["Execution"]
date = "2016-01-29T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.5.0-alpha1 Released"
+++

I am pleased to announce the availability of Camunda 7.5.0-alpha1. The highlights of this release are:

* New Reporting View in Cockpit (Camunda Enterprise Edition only)
* New Reporting API
* Customize Serialization of Java Object Variables inside a Process Application
* Added Oracle WebLogic Server 12c R2 (12.2.1) to supported Environments (Camunda Enterprise Edition only)
* Improved Javascript Client / SDK
* [52 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.5.0-alpha1)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14293) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

> **Known Issue:** You have to [empty the browser cache](clear-the-cache.jpg) before accessing the Web Application.

<!--more-->

# New Reporting View in Cockpit

This alpha release ships a new reporting view. This view currently provides one report which is the Process Instance Duration report.
You can select

* All or a single process definition
* If you selected a process definition you can then select an individual version
* An "aggregation period", currently supported: monthly and quarterly

Cockpit then shows a bar chart which displays the minimum, average and maximum values for the duration of process instances that are finished and were started in a given period of time. This is what it looks like:

{{< figure src="reporting-cockpit.gif" alt="Reporting in cockpit" >}}

Note that the reporting plugin is only available in the [Camunda Enterprise Edition](http://camunda.com/bpm/enterprise/).

# New Reporting API

The reporting features demonstrated above can also be used in the API (Java and REST). The following Java Api call retrieves the report data for
the `invoice` process instance, aggregates it by month and then prints the results:

```java
final List<DurationReportResult> monthlyStats = historyService
  .createHistoricProcessInstanceReport()
  .processDefinitionKeyIn("invoice")
  .duration(PeriodUnit.MONTH);

monthlyStats.forEach((res) ->
{
  System.out.println(res.getPeriod() + ": " + res.getMaximum());
});
```

Try it out and give us feedback!

# Promises in Javascript SDK

The Javascript SDK now features support for Promises (as an alternative to the Node-style callbacks it always had). Example

```javascript

var camClient = new CamSDK.Client({  
  apiUri: 'http://localhost:8080/engine-rest/'
});

var task = camClient.resource('task');

task.list({ assignee: 'demo' }).then(
  function(result) {
    //... work with the result
  }
);
```

The promises support was a nice [Community Contribution](https://github.com/camunda/camunda-bpm-sdk-js/pull/10).

# User Interface Updates (Webapp)

In the context of 7.5.0 we will also give the webapp's UI a major overhaul.

Focus is on *simplicity* and *consistency*.

As a first step, we will align the styles in the individual parts of the web application (Cockpit, Tasklist, Admin) and beyond (Docs, Blog, ...).

In this release we started with this effort and you will notice that the header of the web application is different. Many more things are to come.

# Under the Hood (Webapp)

The beginning of a release cycle is also a good point in time to do refactorings and other improvements to keep the project maintainable.

In the context of 7.5, the web application also gets a major "under the hood" overhaul:

* All sources and tests can now be found in a single repository: [camunda/camunda-bpm-webapp](https://github.com/camunda/camunda-bpm-webapp)
* The web application is moving to Browserify (compatibility for legacy require.je plugins is maintained)

# Customize Serialization of Java Object Variables inside a Process Application

This feature allows users of a "shared process engine" to configure the serialization of Java object Variables inside their application. With embedded process engine it was possible before.

An example usecase is:

* A Java Object should be stored as process variable
* JSON should be used as Serialization Dataformat (ie. the Java Object should be serialized as JSON to the Database)
* You want to control how the JSON is generated, particularly you want Dates to be formatted in a certain way

It is now possible to ship [Spin Dataformat Configurators](https://docs.camunda.org/manual/latest/reference/spin/extending-spin/) with a process application. This makes it possible to configure the wrapped Jackson Object Mapper and set configuration properties.

[Read more about Java Object Serialization in the docs](https://docs.camunda.org/manual/latest/user-guide/data-formats/data-formats-in-processes/#serializing-process-variables).

# Upcoming

Behind the scenes we have started work on two major topics that we want to address in the 7.5 release (due on May 31th):

* Resource-Efficient Multi tenancy (possibility to use multiple tenants inside a single process engine and a single database)
* Process Instance Version Migration (bulk-migrate process instances from one version of a process definition to another version)

The current alpha release already secretly contains some multi tenancy features (you can already perform a deployment for a given tenant and then use the tenant-id when searching for process definitions).

There are more topics we will tackle in the 7.5 release, have a look at the [roadmap](https://camunda.org/roadmap/) if you are interested.

# Feedback Welcome

If you have feedback on the new release, please comment on this post or reach out in the [forums](https://groups.google.com/forum/#!forum/camunda-bpm-users).
