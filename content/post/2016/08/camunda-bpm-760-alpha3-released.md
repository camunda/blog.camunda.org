+++
author = "Christopher Zell, Philipp Ossler and Daniel Meyer"
categories = ["Execution"]
date = "2016-08-11T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.6.0-alpha3 Released"

+++

Camunda 7.6.0-alpha3 is here and it is packed with new features. The highlights are:

* Reporting for Tasks
* Support for Decisions with Literal Expressions
* CMMN Engine Improvements
* Rolling Upgrades
* [23 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.6.0-alpha3)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14609) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

<!--more-->

# Reporting for Tasks

The new alpha version comes along with a new reporting feature for Tasks.
It is now possible to query reports of completed tasks, which are completed before or after a given date.

{{< figure class="teaser no-border" src="historic-task-instance-report.png" alt="Historic Task Report" caption="" >}}

Two different task reports are now available:

 * duration report contains the average, minimum and maximum duration of all completed tasks for a given timeframe. 
   (Monthly and quarterly aggregation of the duration times are supported.)
 * completed task report indicates how many tasks are completed in a time span

## Reporting API for Tasks
The following example shows how to query a duration report for the completed tasks.
```java
   List<DurationReportResult> taskReportResults = historyService
      .createHistoricTaskInstanceReport()
      .completedBefore(calendar.getTime())
      .duration(PeriodUnit.MONTH);
```        
The query returns a list of duration report objects, which contains for each month the average, minimum and maximum duration of all completed tasks.

In the next example you see the query to get the report for the completed tasks grouped by the process definition key.
Each report object contains a number of tasks which are completed in the time span and the task or process definition key on which the group by was done.
```java
   List<HistoricTaskInstanceReportResult> historicTaskInstanceReportResults = historyService
      .createHistoricTaskInstanceReport()
      .countByProcessDefinitionKey();
```

For more information about the task reports and the REST API see the [reference guide](https://docs.camunda.org/manual/latest/reference/rest/history/task/get-task-report/).

# Support for Decisions with Literal Expressions

In addition to decision tables, the DMN engine now supports literal expressions as decision implementations.
This kind of decision allows to specify the decision logic as an expression. The following snippet shows an example decision:

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="dish" name="Desired Dish" namespace="party">
  
  <decision id="season" name="Season">
    <variable name="season" typeRef="string" />
    <literalExpression expressionLanguage="groovy">
      <text>calendar.getSeason(date)</text>
    </literalExpression>
  </decision>

</definitions>
```

The `literalExpression` element contains the expression and allows to set the expression language. The name of the result variable and their type is specified by the `variable` element.
You can use the expression to aggregate the result of required decisions, or to invoke a bean which provides the decision logic. 

To evaluate decisions with literal expressions, the DMN engine provides new methods that work with any kind of decision logic:

```java
DmnDecisionResult result = dmnEngine.evaluateDecision(decision, variables);

DmnDecisionResult result = dmnEngine.evaluateDecision("key", inputStream, variables);
```

You can also evaluate decisions with literal expressions using the Decision Service, a Business Rule Task or a Decision Task. See the [user guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/decisions/decision-service/) and the [reference guide](https://docs.camunda.org/manual/latest/reference/dmn11/decision-literal-expression/) for details.

Expect Camunda Modeler support for literal expressions in the future.

# CMMN Engine Improvements

Based on user feedback, a number of improvements have been made to the CMMN engine.

## Variable On-Parts
Probably the most interesting new feature is [Variable On-Parts](http://docs.camunda.org/manual/latest/reference/cmmn11/sentry/#variableonpart) for sentries. Variable On-Parts allow a sentry to react to `Create`, `Update` and `Delete` events for Variables. Or in other words, it is now possible to control tasks and other plan items in a case based on data. The following is an example of how to define a Sentry with a Variable On-Part:

```xml
<sentry id="Sentry_1">
  <extensionElements>
    <camunda:variableOnPart variableName="interestRate">
      <camunda:variableEvent>update</camunda:variableEvent>
    </camunda:variableOnPart>
  </extensionElements>	
</sentry> 
```

The above sentry has an on part which is satisfied as the variable `interestRate` gets updated.

## Case Workers improvement
Case Workers can now also terminate a Case:

```java
caseService.terminateCaseExecution(...);
```

## Manual Activation Rule
Also, please note the following bugfix concerning the interpretation of the manual activation rule attribute of CMMN. This [bugfix](https://jira.camunda.com/browse/CAM-6362) is included in this release and originates from an official [bugfix](https://jira.camunda.com/browse/OMG-12) in the OMG CMMN standard.

# Rolling Upgrades

In the past some of our Customers wanted to upgrade their Camunda cluster with minimized downtime. One solution to do this are rolling upgrades.

A rolling upgrade is a process on which the nodes are updated one by one or in groups. During the upgrade process, it is ensured that at least one node is available to handle incoming requests, guaranteeing availability and minimizing downtime.

{{< figure class="teaser no-border" src="architecture.png" alt="Architecture" caption="" >}}

Starting from 7.6.0 Camunda ensures backwards compatibility of the database schema. Backwards compatibility makes it possible to operate an older version of the process engine on a newer version of the database schema. This guarantee enables the possibility to execute rolling upgrades.

For more information about rolling upgrades see the [rolling upgrade](https://docs.camunda.org/manual/latest/update/rolling-upgrade/) documentation.

# Perspective

We have also started work providing monitoring and operation features for CMMN inside Camunda Cockpit. The next alpha release will allow users to preview these features.

{{< figure class="teaser no-border" src="cockpit-case-definition.png" alt="CMMN Cockpit" caption="" >}}

# Feedback Welcome

Please try out the awesome new features of this release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).

