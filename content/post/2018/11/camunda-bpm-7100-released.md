+++
author = "Nikola Koevski"
categories = ["Execution"]
date = "2018-11-30T12:00:00+02:00"
tags = ["Release Note"]
title = "Camunda BPM 7.10.0 Released"

+++

Camunda BPM platform 7.10.0 is now available, and the highlights are:

<!-- FEATURES LIST BEGINS -->

* History Cleanup across hierarchies
* Fetch and Lock External Tasks based on Process Definition and Tenant
* Extending the "Handle External Task BPMN Error" API
* Tasklist-startable Process Definitions
* Additional Supported Environments
* [# Bug Fixes](https://app.camunda.com/jira/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.10.0)

<!-- FEATURES LIST ENDS -->

You can [Download Camunda for free](https://camunda.com/download/) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

We have also released the Camunda Spring Boot Starter 3.1.0, which relies on Spring Boot 2.0.2 by default.

To see a full list of the changes, please check out our [Release Notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10230&version=15096)
and the list of [Known Issues](https://app.camunda.com/jira/issues/?jql=affectedVersion%20%3D%207.9.0%20and%20status%20!%3D%20Closed).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.9.0).

<!-- FEATURES EXPLANATIONS BEGIN -->
<!--more-->

## History Cleanup Across Hierarchies

When creating a BPMN process, it is possible to introduce [Call Activities](https://docs.camunda.org/manual/reference/bpmn20/subprocesses/call-activity/) which can in turn reference BPMN processes.
This allows to model process hierarchies spanning multiple levels.

Previously, historical data related to child processes has been cleaned-up without taking the runtime of the 
top-level process into account. This led to inconsistencies, as it might happen that the historical data of child 
processes was cleaned-up before the respective top-level process instance has been finished.

{{< figure class="teaser no-border" src="hierarchy.png" alt="" >}}

Starting with this release, a new cleanup strategy has been introduced which tackles this issue: each historical instance
inherits the removal time of the top-level process instance. This allows to always cleanup the historical data consistently.

If you would like to gain a broader understanding of how the new cleanup strategy works, please see the updated 
[History Cleanup](https://docs.camunda.org/manual/user-guide/process-engine/history/#history-cleanup) documentation.

## Fetch and Lock External Tasks based on Process Definition and Tenant

When some logic needs to be implemented/executed outside of the engine [External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks), could be the right pattern for you. That way the process engine publishes a unit of work to a worker to fetch and complete. Fetch and lock mechanism is extend further by filtering tasks based on two new options - process definition and tenant id. You can find a
java example below:
```java
externalTasks = externalTaskService.fetchAndLock(2, "aWorkerId")
      .topic("createOrder", 10000)
      .processDefinitionId("aProcessDefinitionId")
      .withoutTenantId()
      .execute();
```
and here is a REST API example:

POST `/external-task/fetchAndLock`
```json
 {
      "workerId":"aWorkerId",
      "maxTasks":2,
      "usePriority":true,
      "topics":
          [{"topicName": "createOrder",
            "lockDuration": 10000,
            "processDefinitionId": "aProcessDefinitionId",
            "tenantIdIn": "tenantOne"
          }]
  }
```
For more infomation please check the [REST documentation](https://docs.camunda.org/manual/latest/reference/rest/external-task/fetch/).

The feature is expose to both of the external task clients:
* [NodeJS external task client](https://github.com/camunda/camunda-external-task-client-js) - 1.1.0 version for non-Java developers
* [Java external task client](https://github.com/camunda/camunda-external-task-client-java) - 1.1.1 version can be embedded in Java applications

## Extending the "Handle External Task BPMN Error" API

During process execution, a [business error](https://docs.camunda.org/manual/develop/reference/bpmn20/events/error-events/#business-errors-vs-technical-errors) can occur. In the world of External tasks, the worker can report a BPMN error to the process engine by using `handleBpmnError` method of the `ExternalTaskService` (or the respective REST API endpoint). The method can only be invoked by the worker possessing the most recent lock for a task. Now, when reporting this kind of BPMN errors, additional data in the form of an error message and variables can be passed. This additional information can then be used later in the process flow.
Here is an example on how this can be achieved via [Java API](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#reporting-bpmn-error):
```java
externalTaskService.handleBpmnError(externalTaskId, "aWorker", "ERROR-SPEC-10", "anErrorMessage", variables);
```
The [REST API](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-bpmn-error/) call would look like this:

POST /external-task/externalTaskId/bpmnError

Request Body:
```json
{
  "workerId": "aWorker",
  "errorCode": "ERROR-SPEC-10",
  "errorMessage": "anErrorMessage",
  "variables": {
	  "aVariable" : {
		  "value" : "aStringValue",
		  "type": "String"
	  },
	  "anotherVariable" : {
		  "value" : true,
		  "type": "Boolean"
	  }
  }
}
```

## Tasklist-startable Process Definitions

Imagine you have a process, which is referenced from a call activity of a parent process, or processes with a message, signal or conditional start events. Usually, such processes
are not intended to be started directly, but rather triggered by some internal events. So far, they would still be shown under Tasklist "Start process" menu.
Now, with the new process attribute "*isStartableInTasklist*", you can define, whether the process should be startable from tasklist or not.

You can find a simple example of a process below:
```xml
<process id="subProcess"
         name="Process called from Super Process"
		 isExecutable="true"
		 camunda:isStartableInTasklist="false">
...
</process>
```

Please note that the user needs the following permissions to see a process definition in this list, and of course, to start one:

* `CREATE` permission for all Process instances
* `CREATE_INSTANCE` and `READ` permissions on the Process Definition level

## Configure Business Key in Delegation Code

Version 7.10 makes available the much-requested option to configure the business key of an already running process instance. The setting can be done inside delegation code (Execution listener, Task listner or Java delegate implementation). Here is an example:
```java
public class SetNewBusinessKeyDelegate implements JavaDelegate {
   public void execute(DelegateExecution execution) throws Exception {
    execution.setProcessBusinessKey("businessKey");
  }
 }
```
You can find more information about the delegation code in our [User guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#set-business-key-from-delegation-code).
What is a business key? - you can check this [How to Use Business Keys?](https://blog.camunda.com/post/2018/10/business-key/) blog post.

## Additional Supported Environments

### Support for Java 9 / 10 / 11

Camunda BPM is now on the cutting-edge of Java, since this release brings support for Java 9 & 10 as well as for Java 11.

### Extending our Database support

Version 7.10.0 also extends the database support of Camunda BPM, now adding PostgreSQL 10.4 and MariaDB 10.3 to our supported environments.

### A Single WildFly distro

Finally, from Camunda BPM 7.10.0 onwards, a single WildFly distro will be provided, always with the latest version of WildFly (currently WildFly 14). New Camunda BPM users, that wish to use it with WildFly 8 or WildFly 10-13, will need to do a [full manual installation](https://docs.camunda.org/manual/latest/installation/full/jboss/manual/) on the appropriate vanilla WildFly application server. WildFly 8 continues to be supported through a separate `camunda-wildfly8-subsystem` (included with [this](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-wildfly8-modules/) archive).

<!-- FEATURES EXPLANATIONS END -->

## And Much More

There are many smaller features and bug-fixes in the release that aren't included in this blog post. The [full release notes]() provide the details.

## Register for the Webinar

If you're not already registered, be sure to secure a last-minute spot at the free release webinars, available in [German](https://register.gotowebinar.com/register/7430032682918026764) and [English](https://register.gotowebinar.com/register/5312228152286683916).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we rely on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep annoying you, things that you think should work differently, and so on, please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
