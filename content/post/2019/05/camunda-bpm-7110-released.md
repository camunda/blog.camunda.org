+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-05-31T12:00:00+02:00"
title = "Camunda BPM 7.11.0 Released"

+++

We are excited to announce that Camunda BPM platform 7.11.0 is now available. Highlights from Camunda 7.11.0 include:

<!-- FEATURES LIST BEGINS -->

* Operator Authorizations
* Operator and Admin Auditing
* Return Variables on Task Completion / Form Submission / Message Correlation
* Asynchronously set Removal Time on Historical Data
* BPMN Error Event Triggering from Execution Listeners
* Fluent Java Testing API
* Additional Supported Environments
* [92 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.11.0)

<!-- FEATURES LIST ENDS -->

You can [download Camunda 7.11.0 for free](https://camunda.com/download/) or [run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Also included in the release:

* [Camunda Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter) 3.3.1, which relies on Spring Boot 2.1.5 by default.
* [Camunda BPM Assert](https://github.com/camunda/camunda-bpm-assert) 4.0.0 for convenient testing of processes in Java.
* [NodeJS external task client](https://github.com/camunda/camunda-external-task-client-js) 1.1.1 version for Javascript developers
* [Java external task client](https://github.com/camunda/camunda-external-task-client-java) 1.2.0 version can be embedded in Java applications

<!--more-->

For a complete list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15343)
and the list of [Known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.11.0%20and%20status%20!%3D%20Closed). For patched security vulnerabilities, see our [Security Notices](https://docs.camunda.org/security/notices/).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.11.0).

<!-- FEATURES EXPLANATIONS BEGIN -->

## Fine-Grained Operator Permissions

Cockpit is the swiss army knife for your process operations. It provides the transparency to identify problems and empowers your operators to react whenever necessary. When you run critical business processes with Camunda, avoiding unwanted modifications to your data is important. That's why 7.11 adds new permissions that let you give your users exactly those permissions that they need to perform their task best.

{{< figure class="teaser no-border" src="1-authorizations.png" alt="operator-permissions" caption="Giving an operator the permissions to retry jobs and suspend process instances">}}

You can now control if a user can:

* Retry jobs
* Suspend process instances and definitions
* Create a batch of a specific type
* Read runtime and historic process variables
* Change process variables

Read on:

* [Glossary of Permissions](https://docs.camunda.org/manual/7.11/user-guide/process-engine/authorization-service/#permissions-by-resource)

## Track All Changes Made by Operators and Administrators

To improve transparency of who did what, *all* operations that can be performed in Cockpit, Tasklist and Admin are now included in the user operation log.

On top of that, Camunda enterprise edition ships two audit log dashboards that let you browse and search this data. In Cockpit, all task-related and operative actions can be inspected:

{{< figure class="teaser no-border" src="2-audit-log-cockpit.png" alt="operator-permissions" caption="See a log of all operative actions in Cockpit">}}

In Admin, all administrative actions such as creating users or granting permissions can be viewed:

{{< figure class="teaser no-border" src="3-audit-log-admin.png" alt="operator-permissions" caption="See a log of all administrative actions in Admin">}}

Read on:

* [Auditing in Cockpit](https://docs.camunda.org/manual/7.11/webapps/cockpit/auditing/)
* [User Operation Log](https://docs.camunda.org/manual/7.11/user-guide/process-engine/history/)
* [Glossary of Logged Operations](https://docs.camunda.org/manual/7.11/user-guide/process-engine/history/#glossary-of-operations-logged-in-the-user-operation-log)

## More APIs Return Variables

This release introduces additional APIs that trigger a process instances and return variables. What was already possible for [starting process instances](https://docs.camunda.org/manual/7.11/user-guide/process-engine/process-engine-concepts/#variables-in-return) is now also available for completing tasks, submitting task forms and correlating messages. For task completion, the API looks as follows:

```java
TaskService taskService = ...;
Task task = ...;

VariableMap processInstanceVariables = taskService
    .completeWithVariablesInReturn(task.getId(), null, false);
```

The return value contains the resulting state of process instance variables before the call returns. This lets your processes synchronously communicate results to the caller. For example, consider the following process:

{{< figure class="teaser no-border" src="4-variables-in-return.png">}}

With the new API, you can immediately obtain the computed total as a result of completing the task and display it to the user.

Read on:

* REST API: [Complete a Task](https://docs.camunda.org/manual/7.11/reference/rest/task/post-complete/), [Submit a Task Form](https://docs.camunda.org/manual/7.11/reference/rest/task/post-submit-form/), [Correlate a Message](https://docs.camunda.org/manual/7.11/reference/rest/message/post-message/)

## Change the Removal Time of Historical Data

When you use [history cleanup](https://docs.camunda.org/manual/7.11/user-guide/process-engine/history/#history-cleanup), every historic process instance has its own [removal time](https://docs.camunda.org/manual/7.11/user-guide/process-engine/history/#instance-removal-time) which is the time after which it will be removed to free up space in your database. You can now change the removal time of single or many instances at once:

{{< figure class="teaser no-border" src="5-removal-time-batch.png">}}

You have the options to set an arbitrary removal time, to let the engine re-compute the removal time based on the current time-to-live settings, or to clear the removal time. Clearing will prevent the data to be removed at all, so you can keep historic data of selected instances indefinitely.

Hint for anyone migrating from 7.9: This feature lets you assign a removal time to data that was created with Camunda versions <= 7.9, so that they are covered by removal-time-based history cleanup.

Read on:

* [History Cleanup](https://docs.camunda.org/manual/7.11/user-guide/process-engine/history/#history-cleanup)
* [Java API to Set Removal Time](https://docs.camunda.org/manual/7.11/user-guide/process-engine/batch-operations/#set-a-removal-time)

## Trigger BPMN Errors from Execution and Task Listeners

With this release, [BPMN Error events](https://docs.camunda.org/manual/7.11/reference/bpmn20/events/error-events/) can be triggered from [execution and task listeners](https://docs.camunda.org/manual/7.11/user-guide/process-engine/delegation-code/#execution-listener). Consider the following process:

{{< figure class="teaser no-border" src="6-bpmn-errors.png">}}

We can implement an execution listener on the `end` event of the *Receive Payment* activity that validates the received funds:

```java
public class ValidatePaymentListener implements ExecutionListener {

  @Override
  public void notify(DelegateExecution execution) throws Exception {
    int billedAmount = (int) execution.getVariable("billedAmount");
    int receivedAmount = (int) execution.getVariable("receivedAmount");

    if (receivedAmount < billedAmount) {
      throw new BpmnError("insufficient-payment");
    }
  }
}
```

In case the error is raised, the catching boundary event triggers and a human can clarify the case.

Read on:

* [Throwing BPMN Errors from Delegation Code](https://docs.camunda.org/manual/7.11/user-guide/process-engine/delegation-code/#throw-bpmn-errors-from-delegation-code)
* [Implementing BPMN Error Events](https://docs.camunda.org/manual/7.11/reference/bpmn20/events/error-events/)

## Fluent Java Testing API

[camunda-bpm-assert](https://github.com/camunda/camunda-bpm-assert) has become part of the Camunda product. With this library, writing unit tests for your BPMN processes becomes a breeze:

```java
// Given we create a new process instance
ProcessInstance processInstance = runtimeService().startProcessInstanceByKey("testProcess");
// Then it should be active
assertThat(processInstance).isActive();
// And it should be the only instance
assertThat(processInstanceQuery().count()).isEqualTo(1);
// And there should exist just a single task within that process instance
assertThat(task(processInstance)).isNotNull();

// When we complete that task
complete(task(processInstance));
// Then the process instance should be ended
assertThat(processInstance).isEnded();
```

This project has been a popular community extension for many years. We thank the [maintainers of the community extension](https://github.com/camunda/camunda-bpm-assert#credits) for all their work!

Read on:

* [Introduction](https://docs.camunda.org/manual/7.11/user-guide/testing/#camunda-assertions)
* [User Guide](https://github.com/camunda/camunda-bpm-assert/tree/master/docs)

## Additional Supported Environments

### Support for Java 12

Camunda BPM continues to keep pace with Java development, bringing support for Java 12 with version 7.11.0.

### Extending our Database support

Version 7.11.0 also extends database support for:

* PostgreSQL versions 10.7, 11.1 and 11.2
* Amazon Aurora PostgreSQL compatible with PostgreSQL 9.6 / 10.4 / 10.7
* Oracle 18c
* Microsoft SQL Server 2017

### Application Servers

Finally, for shared engine setups, Camunda BPM 7.11.0 brings support for:

* JBoss EAP 7.2
* WildFly Application Server 15 and 16

Read on:

* [List of Supported Environments](https://docs.camunda.org/manual/7.11/introduction/supported-environments/)

<!-- FEATURES EXPLANATIONS END -->

## And Much More

There are many smaller features and bug fixes in the release that are not included in this blog post. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15343) provide the details.

## Register for the Webinar

If you're not already registered, be sure to secure a spot at the free release webinars, which is offered in [German](https://attendee.gotowebinar.com/register/5485618940456067851) and [English](https://attendee.gotowebinar.com/register/7295666867938241291).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we rely on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/).
