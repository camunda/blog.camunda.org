+++
author = "Nikola Koevski"
categories = ["Execution"]
date = "2018-11-30T12:00:00+02:00"
tags = ["Release Note"]
title = "Camunda BPM 7.10.0 Released"

+++

We're excited to announce that Camunda BPM platform 7.10.0 is now available. Highlights from Camunda 7.10.0 include:

<!-- FEATURES LIST BEGINS -->

* History Cleanup across hierarchies
* Fetch and Lock External Tasks based on Process Definition and Tenant
* Extending the "Handle External Task BPMN Error" API
* Tasklist-startable Process Definitions
* Configure Business Key in Delegation Code
* Additional Supported Environments
* [89 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.10.0)

<!-- FEATURES LIST ENDS -->

You can [download Camunda 7.10.0 for free](https://camunda.com/download/) or [run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Also included in the release:

* Camunda Spring Boot Starter 3.1.0, which relies on Spring Boot 2.0.2 by default.
* [NodeJS external task client](https://github.com/camunda/camunda-external-task-client-js) 1.1.1 version for non-Java developers
* [Java external task client](https://github.com/camunda/camunda-external-task-client-java) 1.1.0 version can be embedded in Java applications

<!--more-->

To see a complete list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15290)
and the list of [Known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.10.0%20and%20status%20!%3D%20Closed).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.10.0).

<!-- FEATURES EXPLANATIONS BEGIN -->


## History Cleanup Across Hierarchies

When creating a BPMN process, it is possible to introduce [Call Activities](https://docs.camunda.org/manual/7.10/reference/bpmn20/subprocesses/call-activity/) which can in turn reference BPMN processes.
This makes it possible to model process hierarchies spanning multiple levels.

Previously, historical data related to child processes was cleaned-up without taking the runtime of the
top-level process into account. This led to inconsistencies, as it was possible that the historical data of child
processes was cleaned-up before the respective top-level process instance has been finished.

{{< figure class="teaser no-border" src="process-hierarchy.png" alt="History cleanup across hierarchies" >}}

Starting with this release, a new cleanup strategy has been introduced to tackle this issue: each historical instance
inherits the removal time of the top-level process instance. This ensures historical data is always cleaned up consistently.

To learn more about how the new cleanup strategy works, please see the updated
[History Cleanup](https://docs.camunda.org/manual/7.10/user-guide/process-engine/history/#history-cleanup) documentation.

## Fetch and Lock External Tasks based on Process Definition and Tenant

[External tasks](https://docs.camunda.org/manual/7.10/user-guide/process-engine/external-tasks) are the right pattern for you when some logic needs to be implemented/executed outside of the engine. With this approach, the process engine publishes a unit of work for a worker to fetch and complete. In this release, the [fetch and lock](https://docs.camunda.org/manual/7.10/user-guide/process-engine/external-tasks/#fetching-tasks) mechanism is extend further by filtering tasks based on two new options - process definition and tenant id. You can find a
java example below:
```java
externalTasks = externalTaskService.fetchAndLock(2, "aWorkerId")
      .topic("createOrder", 10000)
      .processDefinitionId("aProcessDefinitionId")
      .withoutTenantId()
      .execute();
```
This is available in the REST API as well. For more infomation please see the [REST documentation](https://docs.camunda.org/manual/7.10/reference/rest/external-task/fetch/).

The feature is exposed in the latest version of the external task clients [NodeJS client](https://github.com/camunda/camunda-external-task-client-js) and [Java client](https://github.com/camunda/camunda-external-task-client-java).

## Extending the "Handle External Task BPMN Error" API

During process execution, a [business error](https://docs.camunda.org/manual/7.10/reference/bpmn20/events/error-events/#business-errors-vs-technical-errors) can occur. In the world of external tasks, the worker can report a BPMN error to the process engine by using `handleBpmnError` method of the `ExternalTaskService` (or the respective REST API endpoint). The method can only be invoked by the worker possessing the most recent lock for a task. When reporting this kind of BPMN errors, additional data in the form of an error message and variables can now be passed. This additional information can then be used later in the process flow.
```java
externalTaskService.handleBpmnError(externalTaskId, "aWorker", "ERROR-SPEC-10", "anErrorMessage", variables);
```
This is available via the [Java API](https://docs.camunda.org/manual/7.10/user-guide/process-engine/external-tasks/#reporting-bpmn-error) and [REST API](https://docs.camunda.org/manual/7.10/reference/rest/external-task/post-bpmn-error/).

The feature is exposed in the latest version of the external task clients for [NodeJS client](https://github.com/camunda/camunda-external-task-client-js) and [Java client](https://github.com/camunda/camunda-external-task-client-java).

## Tasklist-startable Process Definitions

Imagine you have a process that's referenced from a call activity of a parent process, or a process with a message, signal or conditional start events. Usually, such processes
are not intended to be started directly, but rather triggered by some internal events. Until now, they would still be shown under the Tasklist "Start process" menu.
Now, with the new process attribute "*isStartableInTasklist*", you can define whether the process should be startable from Tasklist or not.

You can find a simple example of a process and further documentation in the [user guide](https://docs.camunda.org/manual/7.10/user-guide/process-engine/process-engine-concepts/#start-process-instances-via-tasklist).

Please note that the user needs the following permissions to see a process definition in this list, and of course, to start one:

* `CREATE` permission for all process instances
* `CREATE_INSTANCE` and `READ` permissions at the process definition level

## Configure Business Key in Delegation Code

Version 7.10 makes available the much-requested option to configure the business key of an already running process instance. The setting can be done inside delegation code (Execution listener, Task listener or Java delegate implementation). Here is an example:
```java
public class SetNewBusinessKeyDelegate implements JavaDelegate {
   public void execute(DelegateExecution execution) throws Exception {
    execution.setProcessBusinessKey("businessKey");
  }
 }
```
You can find more information about the delegation code in our [User guide](https://docs.camunda.org/manual/7.10/user-guide/process-engine/delegation-code/#set-business-key-from-delegation-code).
Not familiar with business keys? Check out this blog post: [How to Use Business Keys?](https://blog.camunda.com/post/2018/10/business-key/)

## Additional Supported Environments

### Support for Java 9 / 10 / 11

Camunda BPM is now on the cutting-edge of Java, and this release brings support for Java 9 & 10 as well as for Java 11.

### Extending our Database support

Version 7.10.0 also extends Camunda BPM database support, now adding PostgreSQL 10.4 and MariaDB 10.3 to our supported environments.

### A Single WildFly distro

Finally, from Camunda BPM 7.10.0 onwards, a single WildFly distro will be provided, always with the latest version of WildFly (currently WildFly 14). New Camunda BPM users who wish to use Camunda with WildFly 8 or WildFly 10-13 will need to do a [full manual installation](https://docs.camunda.org/manual/7.10/installation/full/jboss/manual/) on the appropriate vanilla WildFly application server. WildFly 8 continues to be supported through a separate `camunda-wildfly8-subsystem` (included with [this](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-wildfly8-modules/) archive).

<!-- FEATURES EXPLANATIONS END -->

## And Much More

There are many smaller features and bug fixes in the release that aren't included in this blog post. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15290) provide the details.

## Register for the Webinar

If you're not already registered, be sure to secure a spot at the free release webinars, which is offered in [German](https://register.gotowebinar.com/register/7430032682918026764) and [English](https://register.gotowebinar.com/register/5312228152286683916).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we rely on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to user experience, things that keep annoying you, things that you think should work differently, and so on, please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com).
