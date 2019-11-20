+++
author = "Sebastian Stamm"
categories = ["Execution"]
date = "2016-03-31T14:30:00+02:00"
tags = ["Release Note"]
title = "Camunda BPM 7.5.0-alpha3 Released"
+++

Camunda 7.5.0-alpha3 is here. The highlights of this release are:

* New Design for Camunda Tasklist
* New Accessibility Features for Tasklist Users
* New Cockpit Dashboard
* Improved Support for Multi Tenancy
* More Powerful Process Instance Migration
* [42 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.5.0-alpha3)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14591) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Find a [list of known issues](https://jira.camunda.com/issues/?jql=project%20%3D%20%22camunda%20BPM%22%20and%20affectedVersion%20%3D%207.5.0-alpha3) in Jira.

<!--more-->

# New Design for Camunda Tasklist

With this release, Tasklist gets a new look:

{{< figure class="teaser no-border" src="tasklist-2016-design-1.png" caption="The all new Tasklist!" >}}

All information about this change can be read in a [dedicated blogpost]({{< ref "/post/2016/03/tasklist-2016-design.md" >}}).

# Accessibility Features for Tasklist Users

The accessibility of Tasklist has been improved as well. All elements and buttons are now accessible using keyboard navigation. There are also [keyboard shortcuts](https://docs.camunda.org/manual/latest/webapps/tasklist/accessibility/#keyboard-shortcuts) which improve productivity of tasklist users. It is also possible to [add additional shortcuts](https://docs.camunda.org/manual/latest/webapps/tasklist/configuration/#shortcuts) and use them in Tasklist plugins.

{{< figure class="teaser no-border" src="tasklist-2016-shortcuts.png" caption="A list of tasklist shortcuts" >}}

# New Cockpit Dashboard & Navigation

The Cockpit dashboard is the main entry point for monitoring and operations. Over the past releases, a lot of features were added to Camunda Cockpit. As a consequence, the dashboard became more and more crowded.

With this release we provide a first snapshot of where we want to go with the dashboard. The new dashboard provides an overview over four categories in Cockpit: Processes, Decisions, Deployments and Reporting. In addition, it shows some aggregated counts like the number of deployed  processes or running process instances. Note that we have not done any actual styling on this so you can expect it to look a bit "fancier" in the final release :)

{{< figure class="teaser no-border" src="cockpit-dashboard.png" caption="The new Cockpit Dashboard" >}}

As you would expect, the new dashboard can still be extended with plugins and custom functionality. See the documentation for a [list of all plugin points in Cockpit](https://docs.camunda.org/manual/latest/webapps/cockpit/extend/plugins/#plugin-points)


# Improved Support for Multi Tenancy

With 7.5, Camunda introduces multi tenancy features which allow users to manage multiple tenants (aka *isolated workspaces*) in the same database over a single API entry point. Compared to the last alpha release, alpha3 enhances support for multi tenancy by making the following APIs and features tenant aware:

* Message Correlation API
* Signal API
* Suspend / Activate API
* Support for working with shared resources (Example: deploy a process definition for all tenants but assign a tenant's instances to the tenant's workspace)
* Call Activities
* DMN Decisions and Business Rule Tasks
* History
* Tenant Ids in Cockpit and Tasklist

# More Powerful Process Instance Migration

With this release it is possible to migrate process instances which have multi-instance activities. In addition, instances can be migrated asynchronously using the new batch API.

This is code example using the (open source) Java API:

```go
ProcessEngine processEngine = ProcessEngineConfiguration.createStandaloneInMemProcessEngineConfiguration().buildProcessEngine();
RepositoryService repositoryService = processEngine.getRepositoryService();
RuntimeService runtimeService = processEngine.getRuntimeService();
TaskService taskService = processEngine.getTaskService();

repositoryService.createDeployment()
  .addModelInstance("process1.bpmn", Bpmn.createExecutableProcess("coffee-process")
    .startEvent()
      .userTask("prepare-coffe")
    .endEvent()
    .done())
  .deploy();

ProcessInstance pi = runtimeService.startProcessInstanceByKey("coffee-process");
Task prepareCoffeeTask = taskService.createTaskQuery().singleResult();

// no wait, if I prepare this coffee, I cannot drink it :(

repositoryService.createDeployment()
  .addModelInstance("process1.bpmn", Bpmn.createExecutableProcess("coffee-process")
    .startEvent()
      .userTask("prepare-coffe")
      .userTask("drink-coffee")
    .endEvent()
    .done())
  .deploy();

ProcessDefinition v1 = repositoryService.createProcessDefinitionQuery().processDefinitionVersion(1).singleResult();
ProcessDefinition v2 = repositoryService.createProcessDefinitionQuery().processDefinitionVersion(2).singleResult();

MigrationPlan migrationPlan = runtimeService.createMigrationPlan(v1.getId(), v2.getId())
  .mapEqualActivities()
  .build();

runtimeService
  .newMigration(migrationPlan)
  .processInstanceIds(Collections.singletonList(pi.getId()))
// .executeAsync()   => would perform the migration in the background
  .execute();

// Yäy, now I can prepare *and* drink coffee. I really like Camunda! :)
taskService.complete(prepareCoffeeTask.getId()); // awesome that the task has preserved id with migration :)
// drink coffee task is available:
assertNotNull(taskService.createTaskQuery().taskDefinitionKey("drink-coffe").singleResult());
```

The Cockpit interface for the migration (Enterprise Edition only) now uses a page flow, providing separate pages for the migration mapping, instance selection and confirmation.

{{< figure class="teaser no-border" src="cockpit-migration.png" caption="The migration confirmation screen in Cockpit" >}}

# Feedback Welcome

If you have feedback on the new release, please comment on this post or reach out in the [new forum](https://forum.camunda.org/).
