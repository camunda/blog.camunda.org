+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-03-29T18:00:00+01:00"
title = "Camunda BPM 7.11.0-alpha3 Released"
+++

**Camunda BPM 7.11.0-alpha3** is here and the highlights are:

* Official Support for camunda-bpm-assert
* Java/REST API: Case Insensitive Semantics for Task Variables Names
* Java/REST API: Return Variables after task completion
* Cockpit: Audit Log Dashboard (Enterprise)
* Cockpit: Recalculate Timer Due Dates
* [15 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.11.0-alpha3)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15384).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.11.0-alpha3).

<!--more-->

## Official Support for Camunda BPM Assert

BPM Assert is now **an official part of Camunda BPM** with the release of version 3.0.0-alpha1.

We want to thank [Martin Schimak and the many other contributors](https://github.com/camunda/camunda-bpm-assert/graphs/contributors), who have made BPM Assert into what it is today.

The current release is mostly concentrated on including the project in the Camunda development lifecycle and resolving compatibility issues. You can read up on this in the separate [blog post](https://blog.camunda.com/post/2019/03/camunda-bpm-assert-300-alpha1-released/).

The highlights from this release:

* new Maven coordinates:
```xml
<dependency>
  <groupId>org.camunda.bpm.assert</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>3.0.0-alpha1</version>
</dependency>
```

* no inheritance from [AssertJ](http://joel-costigliola.github.io/assertj/) Assertions anymore

* compatibility artifacts if you want to use BPM Assert with Java 1.7 or Spring Boot 2.0.x (see our [version compatibility overview](https://docs.camunda.org/manual/develop/user-guide/testing/#assertions-version-compatibility))

* official support for CMMN assertions

* assertions for external tasks, just write:
```java
complete(externalTask("review"), withVariables("approved", true));
```

The final release is scheduled for May 31, 2019. Stay tuned for the next releases!

## Java/REST API: Case Insensitive Semantics for Task Variables Names
In the [Camunda 7.11.0-alpha2](../camunda-bpm-7110-alpha2-released) release we introduced task queries where variable names could be treated case-insensitively. To do this, we introduced several new methods. (Nine in total: Three types of variables times three case-insensitive operators)

The team decided that we also want to support case-insensitive variable **names** in task queries which meant that the method count would again increase by nine resulting in 18 methods just for comparing variables case-insensitively.

We decided to drop all this in favor of a more simple solution that can handle variable names and values case-insensitively, needs only two different methods and just has one small trade-off.

With this release you can use one of the following methods to flag the whole query to match all variable names and/or values case-insensitively. The methods for individual variables are no longer supported.
```
taskQuery.matchVariableValuesIgnoreCase();
taskQuery.matchVariableNamesIgnoreCase();
```
For more information on how to use this via the REST API check the documentation [here](https://docs.camunda.org/manual/latest/reference/rest/task/post-query/) and [here](https://docs.camunda.org/manual/latest/reference/rest/task/get-query/). If you want to see how it used with the Java API, find the documentation about it [here](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/task/TaskQuery.html).

## Java/REST API: Return Variables after task completion
When starting a process instance, it is already possible to get the latest variables returned. Now we can do something similar with tasks when they are completed.

With the REST API it is now possible to set the `withVariablesInReturn` property to get all variables in the process scope after the task completes. This can be done on the POST `/task/{taskId}/complete` and POST `/task/{taskId}/submit-form` endpoints like this:
```json
{
 "variables":
    {"aVariable": {"value": "aStringValue"},
    "anotherVariable": {"value": 42},
    "aThirdVariable": {"value": true}},
 "withVariablesInReturn": true
}
```

Using the Java API, this can be achieved by using one of the new methods:
```
taskService.completeWithVariablesInReturn(String taskId, Map<String, Object> variables)
formService.submitTaskFormWithVariablesInReturn(String taskId, Map<String, Object> properties);
```


## Cockpit: Operations Log Dashboard (Enterprise)
We love the automation of processes. But sometimes, we have to make changes manually. To keep track of all manual changes, we already offer the `User Operations` table in the History view.

The new Operations Log in Cockpit creates an overview of all User Operations in your application. From here, you can easily keep track of all manual changes made to your processes.

A similar dashboard is planned for Camunda Admin, so stay tuned.

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform. To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)



## Cockpit: Recalculate Timer Due Dates
In the [Camunda 7.11.0-alpha2](../camunda-bpm-7110-alpha2-released) release the API to Recalculate Job due dates. This feature is now accessible from Cockpit. Recalculation is useful when the due date is dependent on variables or expressions, which will be reevaluated with the current process state. In the process instance runtime view, a new Tab is introduced, which allows for recalculating the timer due date or setting a specific one.

{{<figure src="timer_recalculation.png" alt="Screenshot of the Recalculation Dialog in Cockpit">}}

<!--no-more-->

## What's Next?

This is the third alpha release on the road to **Camunda BPM 7.11** (due May 31, 2019). Stay tuned for more features around setting engine-wide history time to live and improvements of Audit Log Dashboards. Also please have a look at our [roadmap](https://camunda.com/learn/community/#roadmap).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

