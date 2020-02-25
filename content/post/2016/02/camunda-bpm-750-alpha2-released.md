+++
author = "Thorben Lindhauer"
categories = ["Execution"]
date = "2016-02-25T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.5.0-alpha2 Released"
+++

Camunda 7.5.0-alpha2 is here. The highlights of this release are:

* New View in Cockpit for Process Instance Migration (Camunda Enterprise Edition only)
* New API for Process Instance Migration
* New API for Resource-efficient Multi-tenancy
* Extended Support for External Tasks
* BPMN Model API Improvements
* [18 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.5.0-alpha2)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14390) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Find a [list of known issues](https://jira.camunda.com/issues/?jql=project%20%3D%20%22camunda%20BPM%22%20and%20affectedVersion%20%3D%207.5.0-alpha2) in Jira.

<!--more-->


# Process Instance Migration in Cockpit

Process definitions evolve over time like the businesses they support. BPMN makes it easy to change a process, yet running process instances lack that agility. Camunda's new migration feature is here to fill that gap and alpha2 ships our first increment of it.

Migration is performed according to a *migration plan* that tells which activity of the source process definition corresponds to which activity of the target definition.
To facilitate composing migration plans, Cockpit ships a visual tool:

{{< figure class="teaser" src="cockpit-migration.gif" alt="Cockpit Migration screencast" >}}

Migrating a user task is transparent from a process participant's point of view. When finishing a task after migration, process flow continues at the target activity.

Note that the migration plugin for Cockpit is only available in the [Camunda Enterprise Edition](http://camunda.com/bpm/enterprise/).


# Process Instance Migration API

Migration with all its features is accessible via Java and REST API that are available in both, Community and Enterprise version.

Create a migration plan:

```java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("process:1", "process:2")
  .mapEqualActivities()
  .mapActivities("validateAddress", "validatePostalAddress")
  .mapActivities("archiveApplication", "archiveApplication")
  .build();
```

Execute it:

```java
List<String> processInstanceIds = ...;

runtimeService.executeMigrationPlan(migrationPlan, processInstanceIds);
```

In the current state, you can:

* Migrate user task instances
* Remove and add sub processes
* Remove, migrate, and add boundary events

See [our documentation](http://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-migration/) for details.


# Resource-efficient Multi-Tenancy

With alpha2, a tenant id can be used to discriminate data that belongs to different tenants. While this separates tenant data, storage resources like the database schema and tables as well as execution resources like the job executor thread pool are shared. Scaling the number of tenants that use the BPM platform becomes less costly.

Make a deployment for a tenant:

```java
repositoryService
  .createDeployment()
  .tenantId("tenant1")
  .addClasspathResource("processes/process.bpmn")
  .deploy();
```

Start a process instance:

```java
runtimeService
  .createProcessInstanceByKey("process")
  .processDefinitionTenantId("tenant1")
  .execute();
```

And restrict queries:

```java
List<Task> tasksForTenant1 = taskService
  .createTaskQuery()
  .tenantIdIn("tenant1")
  .list();
```

See the examples for [shared engine](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-shared) and [embedded engine](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-embedded) in our examples repository and make sure to read the [documentation](http://docs.camunda.org/manual/latest/user-guide/process-engine/multi-tenancy/#one-process-engine-with-tenant-identifiers).


# Extended Support for External Tasks

[External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) can be used to cross technological boundaries when implementing processes. This release enables implementing the following activities externally:

* Business Rule Task
* Message-Throwing End Event
* Message-Throwing Intermediate Event
* Send Task


# BPMN Model API Improvements

The [BPMN model API](https://docs.camunda.org/manual/latest/user-guide/model-api/bpmn-model-api/) and its fluent builder are great tools for focused unit testing. This release extends the fluent builder by the following features:

* Timer, message, signal, error and escalation events
* Execution listeners
* Sequential and parallel multi-instance
* Camunda input/output parameters with name and value

Creating a BPMN 2.0 model with a multi-instance activity is now:

```java
BpmnModelInstance processModel = Bpmn.createExecutableProcess("process")
  .startEvent()
  .userTask("userTask1")
    .multiInstance()
    .parallel()
    .cardinality("3")
    .done()
  .endEvent()
  .done()
```


# Feedback Welcome

If you have feedback on the new release, please comment on this post or reach out in the [forums](https://groups.google.com/forum/#!forum/camunda-bpm-users).
