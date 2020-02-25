+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-01-30T09:55:00+01:00"
title = "Camunda BPM 7.13.0-alpha1 Released"
+++

We are happy to share the first alpha release of **Camunda BPM 7.13** with you!

This release features the following improvements:

* Show Failed Activity in Jobs & Incidents
* Exclude Nodes from participating in History Cleanup
* Define Invocations per Batch Job by Batch Type
* Oracle 19c Support
* [22 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0-alpha1)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15690).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0-alpha1).

<!--more-->

## Show Failed Activity in Jobs & Incidents

Quick discovery of exception root causes can be key to a frictionless operation of processes. Among other tools, Camunda provides job logs and incidents to easily gain insights into failures and their causes. For specific scenarios this can however be harder to achieve than desired. Take the following example:

1. A process has two tasks `foo` and `bar`.
2. Task `foo` is marked as `asyncBefore`.
3. The execution of task `bar` fails.

In that case, the job and its job log will only show the failure's stacktrace and the id of task `foo` as the related activity of the asynchronous continuation job. However, identifying the actually failing task `bar` as the root cause here is a rather manual task that might for example involve further investigations of server log statements.

With this release, runtime and history data for jobs and incidents will additionally provide the id of the activity that caused the failure. With this, the root cause of a failure will be more accessible and also digestible as structured information.

You can find the new `lastFailingActivityId` in numerous REST request results as shown in the [Get Jobs](https://docs.camunda.org/manual/latest/reference/rest/job/get-query/#result) and the [Get Historic Incidents](https://stage.docs.camunda.org/manual/latest/reference/rest/history/incident/get-incident-query/#result) endpoints.

## Exclude Nodes From Participating in History Cleanup

In a multi-engine setup, it is sometimes not desired to execute the History Cleanup job on all nodes, 
for instance, because the additional load during History Cleanup ties up capacities and slows down 
other tasks in the Workflow Engine.

{{< figure class="teaser no-border" src="disabled-cleanup.png" caption="Camunda Cockpit indicates disabled History Cleanup">}}

Starting with this release a new engine configuration flag is available to exclude a specific node 
from participating in History Cleanup:

```xml
<property name="historyCleanupEnabled">false</property>
```

You can read more here:

* [Clustered History Cleanup (User Guide)](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#clustered-cleanup)
* [Engine Configuration (Reference)](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#history-cleanup-enabled)

## Define Invocations per Batch Job by Batch Type

With the help of the global engine configuration property `invocationsPerBatchJob`, it is already 
possible to configure how often a batch job is called. Sometimes it is necessary to define the 
invocations per batch job individually for each batch type. For instance, to balance the number 
of jobs that are created per batch type.

This feature is now available and can be configured for Spring-based environments as follows:
```xml
<property name="invocationsPerBatchJobByBatchType">
  <map>
    <entry key="process-set-removal-time" value="10" />
    <entry key="historic-instance-deletion" value="3" />
  </map>
</property>
```

You can read more here:

* [Batch Configuration (User Guide)](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch/#configuration)
* [Engine Configuration (Reference)](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#invocations-per-batch-job-by-batch-type)


## Oracle 19c Support

Starting with this alpha, Camunda is officially supported to run on Oracle 19c.

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
