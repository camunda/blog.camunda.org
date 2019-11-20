+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-08-02T8:00:00+01:00"
title = "Camunda BPM 7.12.0-alpha2 Released"
+++

**Camunda BPM 7.12.0-alpha2** is here and the highlights are:

* Query Tasks by a list of assignees with the assigneeIn filter
* DMN 1.2 Schema Support
* OR in More Query Types
* Clarified OpenJDK Support
* Engine Logging Configuration
* Case Insensitive Queries
* Operation Log Annotations
* [23 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.12.0-alpha2)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15508).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.12.0-alpha2).

<!--more-->


## Query Tasks by a list of assignees with the `assigneeIn` filter

With version 7.12.0-alpha2, it is possible to query for Tasks that are assigned to any assignee in a
given list of assignee IDs. The feature is available through the Java API, by calling:
```java
taskService.createTaskQuery()
    .taskAssigneeIn("john", "mary", "demo")
    .list();
```
Filtering by assignees can also be done through the Rest API by sending a [HTTP Get](https://docs.camunda.org/manual/latest/reference/rest/task/get-query/) or
[HTTP Post](https://docs.camunda.org/manual/latest/reference/rest/task/post-query/#request) Request to the `/task` endpoint.

## DMN 1.2 Schema Support

As of this version, DMN models that use the DMN 1.2 namespace can be deployed into the process engine and parsed with the [DMN Model API](https://docs.camunda.org/manual/latest/user-guide/model-api/dmn-model-api/). Note that this is currently limited to the scope of implemented DMN 1.1 features. See our [DMN Implementation Reference](https://docs.camunda.org/manual/latest/reference/dmn11/) for details.

## OR in More Query Types

A special thanks go to [Fabian Bahle](https://github.com/funfried) who contributed this feature
to our codebase.

In Camunda BPM 7.8, we introduced OR in Task Queries. In this release, we added the feature to
more query types:

* Process Instances
* Historic Process Instances
* Historic Task Instances

The criteria of "normal" queries are implicitly linked together with the logical `AND` operator.
With the help of OR queries, the criteria are tied together with the logical `OR` operator.

Here you can see an example query which uses the newly introduced Java API:
```java
List<ProcessInstance> processInstances =
  runtimeService.createProcessInstanceQuery()
    .or()
      .processDefinitionKey("invoice")
      .variableValueEquals("foo", "bar")
    .endOr()
    .list();
```

And this is how the REST API call would look like:

`POST /process-instance`
```json
{
  "orQueries": [
    {
      "processDefinitionKey": "invoice",
      "variables": [{
        "name": "foo",
        "operator": "eq",
        "value": "bar"
      }]
    }
  ]
}
```

The queries shown above would retrieve all process instances which either belong to the key
"invoice" or that have a variable with the name "foo" and the value "bar".

For more details, please see the documentation about the
[Java API](http://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-api/#or-queries) and the
[REST API](http://docs.camunda.org/manual/latest/reference/rest/process-instance/post-query/#request-with-or-queries).


## Clarified OpenJDK Support

With the changes in Oracle's licensing model for OracleJDK, alternative JDKs and JDK builds have moved into the focus of our users. Camunda supports OpenJDK and IBM JDK already since version 7.0. Now, we have clarified that our OpenJDK support includes variants such as Oracle OpenJDK, Adopt OpenJDK, Amazon Corretto, and Azul Zulu. This applies to this alpha release, as well as previous releases until 7.9.0. See our [Supported Environments documentation](https://docs.camunda.org/manual/latest/introduction/supported-environments/#java-runtime) for a complete list.

## Engine Logging Configuration

We introduced two new configuration flags in the Process Engine Configuration that allows users to configure logging behavior.

<strong>Enable/Disable Logging Of Command Exceptions:</strong> Exceptions that occur during the execution of a command get caught and re-thrown to be handled by the calling user code. Whether or not these exceptions are logged can be configured by the new configuration flag enableCmdExceptionLogging. Bear in mind, that catching but not logging these exceptions can result in a loss of debugging/troubleshooting information. Also, when logging the exceptions, some exceptions might still be logged by the engine and thus can appear twice in the log (e.g., exceptions during job execution). By default, command exception logging is switched on.

<strong>Enable/Disable Reduced Job Exception Logging:</strong> The engine logs exceptions that occur during the execution of a job. Since a failed job can be retried and fail again, those exceptions might appear several times in the log. It is now possible to reduce the output by setting the enableReducedJobExceptionLogging configuration flag to true. This way, exceptions that occur while executing a job that has retries left are not logged. Only the last failure (that uses the last retry) are logged. A known limitation of this is when setting the job retries to 0 or 1 the job would execute once but an exception would not be logged since we currently have no way of checking left retries at the first execution.


## Case Insensitive Queries
With the Camunda 7.11.0 release, we introduced case insensitive semantics for task variable queries. It is now possible to create case insensitive Process-, Case-, Execution-, and VariableInstances queries as well. It is also possible to query historical Process-, Task-, and Case instances this way.

The Java and REST-API behave as we described in the [7.11.0-alpha3 Blog Post](https://blog.camunda.com/post/2019/03/camunda-bpm-7110-alpha3-released/). For more information on how to use it, check how to use the [REST API](https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-query/) or [JAVA API](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.12/org/camunda/bpm/engine/runtime/ProcessInstanceQuery.html) in our documentation.

It is also possible to use case insensitive Queries from Cockpit. Whenever a search supports case insensitive searches, the options to ignore the case of the name and value will appear. Please note that this option will only be displayed if the search contains a variable, even if the query itself supports this option. It is also possible to use case insensitive searches in Batch and Migration operations, making filtering for specific Process Instances easier.

{{< figure src="case_insensitive_search.png" alt="A Case Insensitive Process Instance Search" >}}


## Operation Log Annotations
Some actions require an explanation. With this release, we added the possibility to annotate user actions in the Operation Log. This helps with auditing and can give a better understanding of why a specific operation or modification was performed.

This functionality can be found in the Operation Log in Cockpit and Admin. The column is enabled by default. If you used the operation log in a previous version of Camunda, you have to add it manually using the `Add column` button.

{{< figure src="log_annotation.png" alt="A Annotated Operation Log Entry" >}}

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform. To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)


## Stay Tuned!

This is the second alpha release on the road to **Camunda BPM 7.12** (due November 30, 2019). The next developer preview
(alpha 3) is scheduled at the end of August and will be packed with new features.

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
