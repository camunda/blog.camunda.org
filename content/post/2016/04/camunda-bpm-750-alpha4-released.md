+++
author = "Thorben Lindhauer"
categories = ["Execution"]
date = "2016-04-29T12:00:00+02:00"
tags = ["Release Note"]
title = "Camunda BPM 7.5.0-alpha4 Released"
+++

Camunda 7.5.0-alpha4 is here and it is packed with new features. The highlights are:

* Transparent Multi-Tenancy Access Restricitions
* Improved Process Instance Migration
  * BPMN Support
  * Large Sets of Process Instances
  * User Experience
* External Task API
  * Triggering Error Events
  * Prioritization
* Version Tags for Process Definitions
* Fine-Grained Task Access Permissions
* Historic Identity Links
* Wildfly 10 Support
* [32 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.5.0-alpha4)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14593) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Find a [list of known issues](https://jira.camunda.com/issues/?jql=project%20%3D%20%22camunda%20BPM%22%20and%20affectedVersion%20%3D%207.5.0-alpha4) in Jira.

<!--more-->

# Transparent Multi-Tenancy Access Restricitions

The [new feature for identifier-based multi-tenancy](http://docs.camunda.org/manual/latest/user-guide/process-engine/multi-tenancy/#one-process-engine-with-tenant-identifiers)
enables assigning process definitions and instances to tenants. This release ships the ability to call engine API such that
access is restricted to those instances that belong to specific tenants. This effectively allows your tenants
to use the engine API in a tenant-agnostic way. For example:

```java
List<String> currentTenants = new ArrayList<String>();
currentTenants.add("tenant1");
currentTenants.add("tenant2");

try{
  identityService.setAuthentication(null, null, currentTenants);
  runtimeService
    .createMessageCorrelation("Invoice Received")
    .correlateAll();
} finally {
  identityService.clearAuthentication();
}
```

The above correlation code correlates *Invoice Received* to process instances of *tenant1* and *tenant2* only. In 7.5.0, tenant authentication is going to be part
of the default web application authentication filters. Your tenants can then transparently use a single Cockpit installation without accessing each other's data.

Note that this is still under development, so not all APIs support this feature yet.

# Improved Process Instance Migration

[Process instance migration](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-migration/) is a new feature in 7.5.0
to move process instances from one version of a process to another. Long running process instances no longer lag behind changing processes.

7.5.0-alpha4 ships the following improvements:

* Almost the entire BPMN palette supported
* Process instance queries can be used to apply a migration plan to a large set process instances ([see the docs](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-migration/#selecting-process-instances-to-migrate))
* Improved User Experience (Camunda Enterprise version only)

## User Experience

Cockpit's UI to compose migration plans visually, to execute migration plans, and to track migration improves steadily:

### Compose Migration Plans

{{< figure class="teaser no-border" src="migration-1.png" caption="Compose Migration Plans" >}}

### Select Process Instances By Querying

{{< figure class="teaser no-border" src="migration-2.png" caption="Select Process Instances" >}}

### Observe Progress

{{< figure class="teaser no-border" src="migration-3.png" caption="Observe Migration Progress" >}}


# External Task API

The API for [external tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) has improved in two areas:
Triggering error events and prioritization.

## Triggering Error Events

The new API method `ExternalTaskService#handleBpmnError` cancels a running external task instance and triggers BPMN error propagation.

{{< figure class="teaser no-border" src="external-task-error.png" caption="An external task with a BPMN error event" >}}

Code to trigger the error:

```java
LockedExternalTask lockedTask = ...;

externalTaskService.handleBpmnError(lockedTask.getId(), "workerId", "Data Inconsistent");
```


## Task Prioritization

Similar to jobs, [external tasks can be prioritized](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#specify-external-task-priorities)
and fetched according to that priority. In BPMN, you can define a priority as an external task attribute:

```xml
<serviceTask id="externalTaskWithPrio"
  camunda:type="external"
  camunda:topic="externalTaskTopic"
  camunda:taskPriority="8"/>
```

At runtime, tasks with the highest priority can be fetched by using the API method `ExternalTaskService#fetchAndLock(int maxTasks, String workerId, boolean usePriority)`:

```java
List<LockedExternalTask> tasks =
  externalTaskService.fetchAndLock(5, "worker", true)
    .topic("invoiceProcessing", 10000L)
    .execute();
```

Stay tuned for the next Camunda Modeler release or check out the [nightly builds](https://camunda.org/release/camunda-modeler/nightly/) to edit the `taskPriority` in the modeler.


# Version Tags for Process Definitions

Processes are often run in different environments where the same BPMN process model is deployed but is assigned different IDs and versions by the process engine.
For the purpose of stable identifiers, it is now possible to assign a version tag to a process definition.

In BPMN XML, the version tag can be set as follows:

```xml
<bpmn2:process camunda:versionTag="1.5-patch2" ...
```

And the tag can be used with the engine API to identify the deployed process definition:

```java
ProcessDefinition processDefinition = processEngine.getRepositoryService().createProcessDefinitionQuery()
  .versionTag("1.5-patch2")
  .singleResult();
```

Stay tuned for the next Camunda Modeler release or check out the [nightly builds](https://camunda.org/release/camunda-modeler/nightly/) to edit the `versionTag` in the modeler.


# Fine-Grained Task Access Permissions

More fine-grained permissions can be used when working with tasks, separating responsibilities of distributing tasks and working on a tasks.
In particular, the permissions `TASK_ASSIGN` and `TASK_WORK` have been added. `TASK_ASSIGN` restricts access to assigning and delegating a task.
`TASK_WORK` restricts access to claiming and completing a task. See [the documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#task-permissions) for details.


# Historic Identity Links

Identity links are used to manage relationships between users/groups and entities in the process engine. For example, task assignment
is managed via identity links. The new historic identity link log query enables querying for all identity links ever created:

```java
HistoricTaskInstance task = ...;

List<HistoricIdentityLinkLog> allTaskCandidates =
  historyService.createHistoricIdentityLinkLogQuery()
    .taskId(task.getId())
    .type(IdentityLinkType.CANDIDATE)
    .list();
```


# Wildfly 10 Support

Wildfly 10 is now an officially supported environment for Camunda. You can download the new Wildfly 10 distribution [here](https://camunda.org/release/camunda-bpm/wildfly10/7.5/). Note that JBoss 7 and Wildfly 8 are still supported, however Wildfly version 9 has been skipped.


# Feedback Welcome

Please try out the awesome new features of this new release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).


# End of Support Notice

Camunda 7.5.0 Final will be released on May 31st, 2016. With 7.5.0 Final, we officially remove the support for the Glassfish distribution from the Enterprise Subscription. Read the [forum announcement](https://forum.camunda.org/t/camunda-glassfish-end-of-support/535) for more details.
