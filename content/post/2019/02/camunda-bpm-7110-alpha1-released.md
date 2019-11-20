+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-02-01T08:00:00+01:00"
title = "Camunda BPM 7.11.0-alpha1 Released"
+++

**Camunda BPM 7.11.0-alpha1** is here and the highlights are:

* Fine-grained Permissions for Batches and Job Retries
* MariaDB/MySQL: Job Due Dates after 2038
* JBoss/Wildfly: Expressions in Camunda Subsystem
* Java/REST API: Deleting Historic Variables
* [17 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.11.0-alpha1)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15370).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.11.0-alpha1).

<!--more-->

## Fine-grained Permissions for Batches and Job Retries

Within this alpha, we introduce the first portion of more fine-grained permissions. It contains *Create Batch* permission for each type of batch operation. Also, *Job Retry* permission for process definitions and process instances. Here is a use case when these permissions will be a handful: A user is allowed to perform *Set Retries* batch operation and they are not supposed to delete process instances by batch. In such a case, the user can be granted the *Create Batch Set Job Retries* permission and they will be able to perform only this kind of batch operation. For a complete list of the available permissions, please visit our [User guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#additional-batch-permissions). Stay tuned for further permission additions for process instance and process definition in the next alpha releases.

## MariaDB/MySQL: Job Due Dates after 2038

The Internet will end in 2038!

What is this about? The MySQL/MariaDB `Timestamp` data type has the [Y2K38 bug](https://en.wikipedia.org/wiki/Year_2038_problem) that is related to time representation as the seconds elapsed since `01 January 1970` stored in a `signed 32-bit integer`.

Why is this bad? Well, the latest date that can be stored this way is `03:14:07 19 January 2038 (UTC)`, making it impossible to set a `Timestamp` with a future date beyond 2038.

So the Internet will probably not end in 2038, but the Camunda engines, using a MySQL/MariaDB database, will definitely continue working away, executing jobs even after that date. With this alpha release we made sure that all the MySQL/MariaDB `Timestamp` columns that contain future dates, most significantly the `Job DUEDATE_` column, have been migrated to `DateTime` columns which have a much larger time range.

A drawback of the `DateTime` data type is that it does not store time zone information. That means that when updating from an older version of the engine, the update script will use the database server time zone to convert the `TIMESTAMP` into `DateTime` values of that time zone.

## JBoss/Wildfly: Expressions in Camunda Subsystem

Starting with this alpha, it is possible to reference system properties using Ant-style expressions (i.e., `${PROPERTY_KEY}`) in the Camunda subsystem in the server configuration of JBoss AS 7 and all WildFly versions (`standalone.xml` or `domain.xml`).

All elements and attributes except for the `name` attribute on the elements `process-engine` and `job-acquisition` support expressions.

Here is an example:

```xml
<!-- ... -->
<plugin>
  <class>org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin</class>
  <properties>
    <property name="administratorUserName">${camunda.administratorUserName}</property>
  </properties>
</plugin>
<!-- ... -->
```

Read more on expressions in the documentation for [JBoss](https://docs.jboss.org/author/display/AS71/Expressions) and [WildFly](http://docs.wildfly.org/15/Extending_WildFly.html#expressions).

## Java/REST API: Deleting Historic Variables

Everybody has a right to be forgotten. But sometimes you don't want to erase just everything right away.
Thus, this alpha now allows deleting the history of variables without removing the entire historic process instance.
The history can be deleted per variable and per process instance. You can find an example for both below:

```java
historyService.deleteHistoricVariableInstance("aVariableInstanceId");

historyService.deleteHistoricVariableInstancesByProcessInstanceId("aProcessInstanceId");
```

The REST API examples would look as follows (both calls return status code `204 No content`):

DELETE `/history/variable-instance/aHistoricVariableId`

DELETE `/history/process-instance/aProcessInstanceId/variable-instances`

For more infomation please check the REST documentation [here](https://docs.camunda.org/manual/latest/reference/rest/history/variable-instance/delete-variable-instance/) and [here](https://docs.camunda.org/manual/latest/reference/rest/history/process-instance/delete-variable-instances/).

<!--no-more-->

## What's Next?

This is the first alpha release on the road to **Camunda BPM 7.11** (due May 31, 2019). Stay tuned for more features around permissions, job execution and testing support. For details see our [roadmap](https://camunda.com/learn/community/#roadmap).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
