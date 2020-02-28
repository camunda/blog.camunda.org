+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-11-29T09:00:00+01:00"
title = "Camunda BPM 7.12.0 Released"

+++

We are excited to announce that Camunda BPM Platform 7.12.0 is now available.

The release includes many new capabilities. Here are some of the highlights:

<!-- FEATURES LIST BEGINS -->

* [Enhanced BPMN Execution](/post/2019/11/camunda-bpm-7120-released/#enhanced-bpmn-execution)
    * [Trigger BPMN Errors and Escalations from User Tasks](/post/2019/11/camunda-bpm-7120-released/#trigger-bpmn-errors-and-escalations-from-user-tasks)
    * [Time-triggered Listeners for User Tasks](/post/2019/11/camunda-bpm-7120-released/#time-triggered-listeners-for-user-tasks)
    * [Update Listeners for User Tasks](/post/2019/11/camunda-bpm-7120-released/#update-listeners-for-user-tasks)
* [Improved Operations](/post/2019/11/camunda-bpm-7120-released/#improved-operations)
    * [Annotate Operation Logs with Comments](/post/2019/11/camunda-bpm-7120-released/#annotate-operation-logs-with-comments)
    * [Contextual Logging for Processes](/post/2019/11/camunda-bpm-7120-released/#contextual-logging-for-processes)
* [Stronger Security](/post/2019/11/camunda-bpm-7120-released/#stronger-security)
    * [Protection Against Malicious Variable Values](/post/2019/11/camunda-bpm-7120-released/#protection-against-malicious-variable-values)
* [Additional Supported Environments](/post/2019/11/camunda-bpm-7120-released/#additional-supported-environments)

<!-- FEATURES LIST ENDS -->

You can [download Camunda 7.12.0 for free](https://camunda.com/download/) or [run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Also included in the release:

* [Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter) 3.4.0, which relies on Spring Boot 2.2.1 by default
* [Assert](https://github.com/camunda/camunda-bpm-assert) 5.0.0 for convenient testing of processes in Java
* [NodeJS External Task Client](https://github.com/camunda/camunda-external-task-client-js) 1.3.0 for JavaScript developers
* [Java External Task Client](https://github.com/camunda/camunda-external-task-client-java) 1.3.0, which can be embedded in Java applications

You can read all about these releases in the dedicated [blog post](/post/2019/12/ext-task-clients-130-spring-boot-starter-340-assert-500).

<!--more-->

For a complete list of the changes, please check out the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15387) 
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.12.0%20and%20status%20!%3D%20Closed). 
And for patched security vulnerabilities, see our [security notices](https://docs.camunda.org/security/notices/).

If you want to dig deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.12.0).

<!-- FEATURES EXPLANATIONS BEGIN -->

## Enhanced BPMN Execution

Camunda BPM 7.12.0 includes significant improvements around BPMN process execution.

You can model all the features mentioned below with the version 3.5.0 of [Camunda Modeler](https://camunda.com/download/modeler/).

### Trigger BPMN Errors and Escalations from User Tasks

In some cases, a human task worker cannot complete an assigned task – for instance, because an unforeseen error 
occurs, or a decision needs to be escalated.

Starting in 7.12, it's possible to trigger BPMN Error and Escalation events from user tasks via the Java or REST APIs. 

The sample process shown below has an Error event, as well as an Escalation Boundary event, attached to the user task "Review annual report":

{{< figure class="teaser no-border" src="trigger-bpmnerror-escalation-usertask.png">}}

The following example shows how to trigger a BPMN Error via REST API:

`POST /task/482g036/bpmnError`
```javascript
{
  "errorCode": "invalid-data-error",
  "errorMessage": "The data provided for the report is invalid.",
  "variables": {
      "reportId" : {
        "value" : "PLR-233",
        "type": "String"
      }
  }
}
```

The REST API request triggers an Error for the user task `482g036` with the code `invalid-data-error`, 
a message and passes a variable `reportId`.

You can read more here:

* [Trigger BPMN Errors and Escalations from User Tasks](https://docs.camunda.org/manual/7.12/reference/bpmn20/tasks/user-task/#reporting-bpmn-error)
* REST API for [Errors](https://docs.camunda.org/manual/7.12/reference/rest/task/post-bpmn-error/) & [Escalations](https://docs.camunda.org/manual/7.12/reference/rest/task/post-bpmn-escalation/)
* [BPMN Event Form Buttons](https://docs.camunda.org/manual/7.12/reference/embedded-forms/controls/bpmn-buttons/) & [Example](https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-bpmn-events)
* [Form Lifecycle & Events](https://docs.camunda.org/manual/7.12/reference/embedded-forms/lifecycle/)

### Time-triggered Listeners for User Tasks

For a manual task, it is sometimes necessary to automatically trigger certain actions after
a specific amount of time (e.g. for escalation, reassignment, email notifications, etc.).

Starting in 7.12, the Workflow Engine can execute Time-triggered Listeners for user 
tasks in your processes.

For example, the following process contains a Time-triggered Listener for the user task "Pick Items":

{{< figure class="teaser no-border" src="time-triggered-user-task-listener.png">}}

The Time-triggered Listener will call the task Listener Class `com.example.ReassignListener` after one hour.

You can configure the Listener in Camunda Modeler as follows:

{{< figure class="teaser no-border" src="timeout-listener-process.gif">}}

You can read more here:

* [Defining a Task Listener](https://docs.camunda.org/manual/7.12/user-guide/process-engine/delegation-code/#defining-a-task-listener)
* [BPMN Extension Elements](https://docs.camunda.org/manual/7.12/reference/bpmn20/custom-extensions/extension-elements/#tasklistener)
* [Process Instance Migration](https://docs.camunda.org/manual/7.12/user-guide/process-engine/process-instance-migration/#timeout-task-listeners)

### Update Listeners for User Tasks

Properties of a manual task may change over time. To react accordingly to changes, it may 
make sense to trigger specific actions automatically. For instance, to notify an assigned 
task worker when a due date is set or updated.

This release features Update Listeners for user tasks.

The following process contains an Update Listener for the user task "Check invoice":

{{< figure class="teaser no-border" src="update-user-task-listener.png">}}

The Update Listener calls the Task Listener class `com.example.NotifyAssigneeListener` as soon as the task is updated.

You can configure the Listener in Camunda Modeler as follows:

{{< figure class="teaser no-border" src="update-listener-process.gif">}}

You can read more here:

* [Defining a Task Listener](https://docs.camunda.org/manual/7.12/user-guide/process-engine/delegation-code/#defining-a-task-listener)
* [BPMN Extension Elements](https://docs.camunda.org/manual/7.12/reference/bpmn20/custom-extensions/extension-elements/#tasklistener)

### Additional BPMN Execution Features

* [Improved Lifecycle of Task Listeners](https://docs.camunda.org/manual/7.12/user-guide/process-engine/delegation-code/#task-listener-event-lifecycle)
* [Change Offset between Due Dates of Recurring Timers](https://docs.camunda.org/manual/7.12/reference/bpmn20/events/timer-events/#modify-a-time-cycle)

## Improved Operations

This release introduces powerful features to improve operations such as annotating 
operation logs with comments or contextual logging for processes.

### Annotate Operation Logs with Comments

Operation logs are helpful for auditing manual operations. However, the logged technical 
information might be not enough to understand the specific reason that an operator 
performed a specific operation.

Camunda BPM 7.12.0 makes it possible to annotate logs with a comment to put the operation in the 
correct business context and make later auditing easier.

In Cockpit and Admin, it's possible to annotate the logs of an already performed 
operation with a comment:

{{< figure class="teaser no-border" src="op-log-annotation.gif">}}

Additionally, when modifying a process instance, you can directly add a comment:

{{< figure class="teaser no-border" src="op-log-annotation-modification.gif">}}

You can read more here:

* [Annotate Operation Logs with Comments](https://docs.camunda.org/manual/7.12/user-guide/process-engine/history/#annotation-of-user-operation-logs)
* [Pass a Comment on Process Instance Modification](https://docs.camunda.org/manual/7.12/user-guide/process-engine/process-instance-modification/#annotation)

### Contextual Logging for Processes

When it comes to debugging, it's key to link logs of the workflow engine to the context 
in which the respective process execution took place. For instance, when an exception
occurs in a Java delegate, it can be very helpful to trace it back to the affected 
process instance. 

This release leverages the *Mapped Diagnostic Context* (MDC) technique 
of SLF4J to link logs to the respective process execution context. To make use of this new feature,
you need to add the context placeholder `%X` to the logging pattern.

Here's what the configuration will look like when using the Logback implementation:
```xml
<configuration>
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>
        %d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} {%X} - %msg%n
      </pattern>
    </encoder>
  </appender>

  ...

</configuration>
```

The configuration shown above produces the following log output:
<pre style="font-size:0.8em">
<code>08:12:05.212 [camundaTaskExecutor-3] WARN org.camunda.bpm.engine.jobexecutor {activityId=bill-customer, processDefinitionId=billing-process:1:216698df, processInstanceId=298e7511} - ENGINE-14006 Exception while executing job 33c54b1a: 
java.lang.RuntimeException: Invocation of billing service failed!
  at com[...]BillingService.lambda$performBilling$0(BillingService.java:29)
  at org.camunda[...]JavaDelegateInvocation.invoke(JavaDelegateInvocation.java:40)
  ...</code>
</pre>

With the help of the log output, we can easily see that the exception occurred while 
executing the instance `298e7511` from the process definition `billing-process:1:216698df` 
inside the activity `bill-customer`.

You can read more here:

* [Process Data Context](https://docs.camunda.org/manual/7.12/user-guide/logging/#process-data-context)
* [Configure the Logging Context Parameters](https://docs.camunda.org/manual/7.12/reference/deployment-descriptors/tags/process-engine/#logging-context-parameters)
* [Mapped Diagnostic Context (MDC) by SLF4J](https://www.slf4j.org/manual.html#mdc)

### Additional Operations Features

* [Inspect Documentation on BPMN Elements](https://docs.camunda.org/manual/7.12/webapps/cockpit/bpmn/process-definition-view/#bpmn-documentation)
* [Case-Insensitive Variable Filter in Web Apps](https://docs.camunda.org/manual/7.12/webapps/tasklist/dashboard/#case-insensitive-search)

## Stronger Security

We continuously strive to improve the security of Camunda BPM. 

### Protection against Malicious Variable Values

The Workflow Engine allows the exchange of structured process data from untrusted 
sources in the form of JSON and XML.

The deserialization of JSON and XML data from untrusted sources is prone to 
exploitation. When the provided data is malicious, arbitrary code can be executed 
inside the Java Virtual Machine (JVM).

Camunda BPM 7.12.0 includes an all-new security mechanism to prevent the Workflow 
Engine from deserializing malicious JSON and XML data. 

By default, common Java types like list or map structures are whitelisted. When a 
malicious JSON or XML variable value with a non-whitelisted Java type is stored, 
the Workflow Engine rejects the variable value from being deserialized. You can 
extend the whitelist with your custom Java types.

You can read more here:

* [Variable Values from Untrusted Sources](https://docs.camunda.org/manual/7.12/user-guide/security/#variable-values-from-untrusted-sources)
* [Configure the Java Type Validation](https://docs.camunda.org/manual/7.12/reference/deployment-descriptors/tags/process-engine/#deserializationTypeValidationEnabled)

### Additional Security Features

* [Query Maximum Results Limit](https://docs.camunda.org/manual/7.12/user-guide/process-engine/process-engine-api/#query-maximum-results-limit)
* [HTTP Header Security in Webapps](https://docs.camunda.org/manual/7.12/webapps/shared-options/header-security/)
* [Cookie Security in Webapps](https://docs.camunda.org/manual/7.12/webapps/shared-options/cookie-security/)

## Additional Supported Environments

Camunda BPM 7.12.0 introduces support for new environments:

* Support for Java 13
* Ready-to-use Docker Images that are based on OpenJDK 11 (LTS)
* Support for WildFly Application Server 17 and 18

You can read more here:

* [List of Supported Environments](https://docs.camunda.org/manual/7.12/introduction/supported-environments/)

## Retired Environments

Camunda BPM 7.12.0 discontinues support for older versions of legacy application servers and database systems.
Additionally, Java 7 is no longer supported. 

Dropping support of legacy environments enables us to support new technologies and provide a secure product. 
For more details, please read about the [Changes in Supported Environments](http://docs.camunda.org/enterprise/announcement/#camunda-bpm-7-12).


<!-- FEATURES EXPLANATIONS END -->

## And Much More
There are many smaller features and bug fixes in the release that are not included in this blog post. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15387) provide the details.

## Register for the Webinar

If you're not already registered, be sure to secure a spot at the free release webinars, which are offered in [German](https://camunda.com/learn/webinars/camunda-bpm-7-12-release-webinar-de/) and [English](https://camunda.com/learn/webinars/camunda-bpm-7-12-release-webinar-en).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. This is only possible with your feedback! Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/).
