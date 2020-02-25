+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-10-31T11:00:00+01:00"
title = "Camunda BPM 7.12.0-alpha5 Released"
+++

**Camunda BPM 7.12.0-alpha5** is here and the highlights are:

* Comments on Process Instance Modification
* Query for Process Definitions without Version Tag
* Contextual Process Data in Logging
* Improved Task Event Lifecycle
* Change the CSRF Prevention Cookie Name
* Support for WildFly 17 & 18
* Discontinued Support for Legacy Environments
* [19 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.12.0-alpha5)


You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15544).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.12.0-alpha5).

<!--more-->

## Comments on Process Instance Modification
With the Camunda 7.11.0 release, we introduced the [user operation log](https://docs.camunda.org/manual/latest/webapps/cockpit/auditing/), which provides information about the manual changes made to your processes.

It is now possible to provide a comment directly when making process instance modifications. The comment will be added to the user operation log, providing information when the operations are audited at a later point. This option is available when modifying the process from cockpit, as well as in the [REST](https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-modification/)- and [Java API](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.12/org/camunda/bpm/engine/RuntimeService.html#createProcessInstanceModification-java.lang.String-).

{{< figure src="cockpit_modification.png" alt="Process Instance Modification" >}}

## Query for Process Definitions without Version Tag
Version tags are a great means of adding semantic version names to your process definitions.
But up until now, it was not possible to specifically and directly query for those process definitions that did not have a version tag attached.
Those process definitions can now be looked up by using the `withoutVersionTag` option in the process definition queries.

Using the Java API, definitions without version tag can be found by writing

```java
List<ProcessDefinition> pdList = processEngine.getRepositoryService().createProcessDefinitionQuery()
    .withoutVersionTag()
    .list();
```

The REST API offers similar functionality as described [here](https://docs.camunda.org/manual/latest/reference/rest/process-definition/get-query/) and [here](https://docs.camunda.org/manual/latest/reference/rest/process-definition/get-query-count/).

## Contextual Process Data in Logging
Logs are a valuable source of information when it comes to analyzing the behavior of applications.
However, the information provided in log statements regarding the process execution context often is quite limited.

In order to provide details on the current execution context in log statements,
we now set process execution-specific data in the [Mapped Diagnostic Context (MDC)](https://www.slf4j.org/manual.html#mdc).

The process data is held in the MDC for the time of process execution and removed from it after the execution context is successfully left.
In case of arising exceptions upon execution, the data is kept in the MDC until the calling context,
i.e., the [JobExecutor](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/) or the surrounding command, finishes its logging.

The keys at which the properties are accessible in the MDC can be defined in the
[process engine configuration](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#logging-context-parameters).

In order to access the MDC data, you need to adjust the logging pattern of your logging configuration.
An example using Logback could look as follows.

```xml
<configuration>
  ...

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} context:[%X] - %msg%n</pattern>
    </encoder>
  </appender>

  ...
</configuration>
```

By adding the `context:[%X]` to your configuration, all values that are present in the MDC at the time the log statement is created will be displayed.
Please refer to the manual of your logging framework for further information on how to access the MDC, e.g., the [Logback documentation](http://logback.qos.ch/manual/layouts.html#mdc).

## Improved Task Event Lifecycle

The [Task Lifecycle](https://docs.camunda.org/manual/latest/webapps/tasklist/task-lifecycle/) in the
Process Engine has been well defined. However, there was a lack of definition in what order, and
under what conditions, are Task Events fired. This impacted the assumptions under which Task
Listeners were executed.

This alpha release improves upon the Task **Event(()) Lifecycle by defining a proper order of
firing of Task Events and adding an additional `update` event. It is now ensured that:

1. On Task creation, the Task `create` event is fired first.
  1. If an initial assignee has been set, an `assignment` event is fired after the `create` event.
2. When a Task property, or task-related entity (Attachment, Comment, local Task variable), is
   changed on an existing Task, an `update` event is fired.
  1. If the updated property is the `assignee`, an `assignment` event is also fired after the
     `update` event is fired.
3. When a Task is completed, a `complete` event is fired, and this will be the last event, unless
   the Task is canceled through the execution `complete` Task Listener.
4. If the Task is canceled, by a BPMN Error thrown inside a Task Listener, Process Instance
   deletion, or an interrupting Boundary Event/Event Subprocess, a `delete` event is fired, and this
   will be the last event in the lifecycle.

You can find additional details about the order and conditions of Task Event triggering in the
[Camunda Task Event Lifecycle documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#task-listener-event-lifecycle).

## Change the CSRF Prevention Cookie Name

When running within the same domain namespace third-party Webapps besides the Camunda BPM ones, the 
CSRF Prevention mechanisms of the different Webapps may interfere with each other because they use the 
same cookie name.

Starting with this release, the name of the CSRF Prevention cookie is configurable. The default name 
is `XSRF-TOKEN`. To change the cookie name, you need to define the name on both the client- and 
server-side.

You can read how to change the cookie name [client-side](https://docs.camunda.org/manual/latest/webapps/cockpit/extend/configuration/#change-csrf-cookie-name)
and [server-side](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/configuration/#csrf)
in the documentation.

## Support for WildFly 17 & 18

WildFly 17 and 18 are now part of the supported environments.

## Discontinued Support for Legacy Environments

The following environments are no longer supported in Camunda 7.12:

* Java 7
* JBoss Application Server 7
* JBoss EAP 6.1 / 6.2 / 6.3
* Wildfly Application Server 8.2
* Oracle 10
* PostgreSQL 9.1 / 9.3
* DB2 9.7 / 10.1
* Microsoft SQL Server 2008

We have carefully selected these environments based on usage statistics and end of life dates by the respective vendors. Discontinuing support for legacy environments enables us to support new technologies and to provide a secure product. For example, many frameworks and libraries that Camunda integrates with no longer work with Java 7 in their most recent versions. Dropping Java 7 on our end allows us to stay up to date.

## What’s Next?
This is the last alpha version before the next minor release of Camunda 7.12.0 on November 29, 2019. Our development team is already preparing everything
for a great release packed with new features and a lot of bug-fixes. Stay tuned!

## Your Feedback Matters!
With every release, we constantly strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
