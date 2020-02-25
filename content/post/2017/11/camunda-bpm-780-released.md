+++
author = "Roman Smirnov"
categories = ["Execution"]
date = "2017-11-30T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.8.0 Released"
+++

Camunda BPM Platform 7.8.0 is here, significantly improving the process engine's performance.

Besides that, we have made numerous improvements for Cockpit. The highlights are:

* Batch Operations for Process Restart, Suspend/Resume and State Modification
* Deletion of Process Definitions
* Inspecting and Editing JSON and XML variables
* Seeing the number of technical incidents within a process diagram
* Faster rendering of BPMN diagrams
<!--more-->

In addition, the database Microsoft Sql Server 2016 and the Microsoft Edge browser are now officially supported.

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14894) are available in Jira.

[List of known Issues.](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.8.0%20AND%20status%20!%3D%20Closed)

You can [Download Camunda For Free](https://camunda.org/download/) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

We have also released the [Camunda Spring Boot Starter 2.3.0]({{< ref "/post/2017/11/camunda-spring-boot-starter-230-released.md" >}}) project, which relies on Camunda BPM 7.8 by default. 

# Significant performance improvements

Camunda 7.8 improves performance by using batching of SQL-statements to the database.

Let's look at the following BPMN process as an example:

{{< figure src="batch-process.png" >}}

1. The process is started with a single variable `loopVariable`, containing a list of 20 Strings.
2. Step 1 is declared as multi instance, creating instances based on the `loopVariable` collection - 20 instances in our case. This produces 20 separate variables in the database (including history of changes in two historic tables).
3. After the parallel gateway, 5 service tasks are executed. This also produces some output to the history tables.
4. Finally, all the changes are committed in one transaction, as all the processes are declared to be executed synchronously.

Below you can find our benchmark results when running this process at history level FULL against different databases with batch mode ON and OFF. The chart shows throughput over time (i.e., process instances executed / minute), higher is better.

{{< figure src="batch-chart-throughput.png" >}}

Please be aware that these numbers should not be used to compare different databases. However, they are consistent within one database and demonstrate considerable speed improvements on 4 out of 6 tested databases. At the same time, we see that the MySQL and MariaDB databases apparently do not distinguish between batch and simple processing mode.

How is this improvement possible?

When executing such a process, the engine needs to perform many SQL statements (INSERT, UPDATE, DELETE, SELECT). Usually, statements are executed sequentially. In that case, each statement constitutes a full roundtrip from the Java process engine to the database, including the network roundtrip time. With 7.8, this is optimized by using SQL statement batching. All statements executed against the same database table are now executed as a batch, which is only a single roundtrip to the database.

Batch mode is switched on by default. (Please see [limitations for some databases](https://docs.camunda.org/manual/7.8/user-guide/process-engine/database/#jdbcBatchProcessing).)

It is possible to switch it off by using the following configuration parameter:

```xml
<property name="jdbcBatchProcessing" value="false"/>
```

# New Features in Camunda Cockpit

This release adds many new features in Cockpit. In this blogpost we only present the three main highlights:

* Batch Modification of Process Instances
* Restart of Process Instances
* Deletion of Process Definitions

## Batch Modification of Process Instances

Sometimes process instances somehow take a wrong turn or end up in a state they should not be in. Some common causes for this are:

* Incorrect data/payload has been provided or
* An error in an external system

After solving these (or other) issues, it might be necessary to repeat some steps.

To deal with such situations, Camunda introduced a feature to modify process instances in previous releases. Up until now, in Cockpit the modification only worked on a single process instance. Starting with 7.8, process instance modification can now be executed in a batch of process instances in Cockpit.


{{< video mp4="batchmodification.webm" alt="Animation showing batch process instance modification"
title="Camunda BPM Cockpit" caption="Animation showing batch process instance modification" >}}


More details can be found in the documentation on [process instance modification](https://docs.camunda.org/manual/7.8/webapps/cockpit/bpmn/process-instance-modification/#perform-a-batch-modification) and [batch operations](https://docs.camunda.org/manual/7.8/user-guide/process-engine/batch-operations/).

## Restart of Process Instances

While modifications can only be applied to running process instances, sometimes it is necessary to recreate or to restart process instances which have already ended. To achieve this, this release makes the Process Instance Restart API available in Camunda Cockpit.


{{< video mp4="batchrestart.webm" alt="Animation showing batch process instance restart"
title="Camunda BPM Cockpit" caption="Animation showing batch process instance restart" >}}

More details can be found in the documentation on [process instance restart](https://docs.camunda.org/manual/7.8/webapps/cockpit/bpmn/process-instance-restart/) and [batch operations](https://docs.camunda.org/manual/7.8/user-guide/process-engine/batch-operations/).

## Deletion of Process Definitions

Until now, it has only been possible to erase process definitions in Cockpit by deleting a whole deployment. This behavior is not sensible as, generally speaking, a deployment consists of several process definitions and resources – including those that are possibly still required and not supposed to be deleted.

This release brings a new feature to Cockpit that allows deletion of process definitions, regardless of their respective deployments.

{{< video mp4="processDefinitionDeletion.webm" alt="Deleting process definitions"
title="Camunda BPM Cockpit" caption="Deleting process definitions" >}}

Apart from deleting individual versions, it is even possible to delete all versions of a process definition.

More details can be found in the documentation on [process definition deletion](https://docs.camunda.org/manual/7.8/webapps/cockpit/bpmn/dashboard/#delete-process-definitions).

# Much more

There are many more smaller features and bugfixes in the release which aren't presented here in the blogpost. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14894) provide the details.

# Register for the Webinar

If you have not already, make sure to place a last-minute registration for the free release webinars - [German](https://register.gotowebinar.com/register/6723119265615514113) and [English](https://register.gotowebinar.com/register/8385014598244744706).

## Feedback Welcome

Please try out the awesome new features of this release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).
