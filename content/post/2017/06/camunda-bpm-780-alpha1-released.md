+++
author = "Tassilo Weidner"
categories = ["Execution"]
tags = ["Release Note"]
date = "2017-06-30T12:00:00+01:00"
title = "Camunda 7.8.0-alpha1 Released"
+++

We are excited to announce the first alpha release of **Camunda BPM 7.8**.

It is packed with new features. In a nutshell, the highlights are:

* Timezone support
* Statistics for history cleanup
* More notation elements for the fluent BPMN builder API
* New batch operation for changing the suspension state of process instances
* Upgrade to the latest version of MyBatis
* [22 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.8.0-alpha1)

Also see the complete list of [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?version=14905&projectId=10230) 
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.8.0-alpha1).

Be one of the first to try **Camunda BPM 7.8**! You can [download it](https://camunda.org/download/)
or [run it with docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/). There is no reason to hesitate – **it is free!** 

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.8.0-alpha1).
<!--more-->

## Timezone Support
This release introduces the possibility to operate Camunda BPM in a setting that involves multiple timezones. 
Previously, all users were supposed to be in the timezone of the server which runs the engine. Starting with this release, 
the default date format includes explicit timezone information so that users in different timezones can easily collaborate.

In the new format `yyyy-MM-dd'T'HH:mm:ss.SSSZ` the `Z` stands for the zero UTC offset zone designator.

If you prefer to use the old format, have a look at the 
[custom date format documentation](http://docs.camunda.org/manual/latest/reference/rest/overview/date-format/) 
to find out how to change the date format.

> **Heads up!**
> 
> Please bear in mind that this change might affect your embedded task forms or custom webapp plugins. To work with 
> the new default date format, you need to send dates with timezone information included.

## Statistics for the History Cleanup
With the last minor release of **Camunda BPM**, the [History Cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup) 
feature was introduced. It allows to remove outdated historic data on a periodical basis.

This release brings possibilities to monitor the removed data, which helps to choose the best suited settings for the 
history cleanup, based on metrics and reports. The metrics are provided for instances of BPMN, CMMN and DMN definitions.

Additionally, the report of finished process instances highlights processes which cause bigger amounts of historic data. 
This helps to take a well-informed decision for the history time to live parameter.

For more details, please see the documentation about [Metrics](https://docs.camunda.org/manual/latest/reference/rest/metrics/get-metrics-interval/) and the
[Finished Process Instance Report](https://docs.camunda.org/manual/latest/reference/rest/history/process-definition/get-cleanable-process-instance-report/).

## More Notation Elements for the Fluent BPMN Builder API
The fluent BPMN builder API allows to create simple process definitions in Java. This release expands the range of notation 
elements by event subprocesses and compensation markers for activities.

The event subprocess can be added to the process builder in the manner of creating a new process. Before the compensation 
marker for an activity can be used, a boundary event has to be attached to the task which should be possible to compensate.

Here you can find a simple Java example which includes both newly introduced notation elements:

```java
ProcessBuilder process = Bpmn.createProcess();

// Compensation marker for activity (user task)
BpmnModelInstance instance = process
  .startEvent()
    .userTask()
      .boundaryEvent()
        .compensateEventDefinition()
        .compensateEventDefinitionDone()
        .compensationStart()
          .userTask()
            .name("compensate")
        .compensationDone()
  .endEvent()
  .done();

// Event subprocess
process.eventSubProcess()
  .startEvent()
    .userTask()
  .endEvent();
```

When the Fluent BPMN builder API generates the BPM diagram graphically, the event subprocess will be placed underneath 
the BPMN diagram:

{{< bpmn-viewer name="sample-process" >}}

## New Batch Operation to Change the Suspension State of Process Instances
The concept behind batch operations is to provide a solution for applying administrative operations on a huge 
number of process instances without a need for manual intervention. 

This release adds the operation to update the suspension state of process instances. The process instances which are 
supposed to be processed by the batch operation can be defined in three ways:

* By listing each process instance id separately
* By a process instance query 
* By a historic process instance query 

The batch operation can be executed synchronously or asynchronously.

This example shows how to suspend process instances asynchronously:

```java
runtimeService.updateProcessInstanceSuspensionState()
	.byProcessInstanceIds(processInstance1.getId(), processInstance2.getId())
	.suspendAsync();
```

To find out how to use this feature, please see the documentation of the
[Java API](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch-operations/#update-suspend-state-of-process-instances)
as well as the 
[REST API](https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-activate-suspend-in-batch/) 
.

## Upgrade to the Latest Version of MyBatis
MyBatis was upgraded to its [latest version, 3.4.4](https://github.com/mybatis/mybatis-3/releases/tag/mybatis-3.4.4). 
This resolves the issue of a NullPointerException in heavy load scenarios which was caused by a MyBatis bug.

## Take a Sneak Peek at What Is Next
We are already eagerly busy preparing for the next alpha release, which is scheduled for end of July. 

Among other things, we are working on the following features, which are planned to be released in one of the next alpha releases: 

* Batch modification of process instances (EE)
* Faster rendering of BPMN diagrams in Cockpit
* OR in task queries

And that is not all: if you are interested, take a look at the [roadmap](https://camunda.org/roadmap).


The minor release of **Camunda BPM 7.8** is coming this fall (November 30, 2017).

## Your Feedback Is Highly Appreciated!
With every release we constantly strive to improve **Camunda BPM**. To make this possible, we are reliant on your feedback.
Feel free to share your ideas and suggestions with us. 

You can contact us by writing a post in the [forum](https://forum.camunda.org/).