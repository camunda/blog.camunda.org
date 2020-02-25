+++
author = "Fabian Hinsenkamp"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-04-27T15:00:00+01:00"
title = "Camunda 7.9.0-alpha4 Released"

+++

Camunda BPM platform 7.9.0-alpha4 is here and the highlights are:

* External Task Notifications for Long Polling
* Version Tag Binding in Business Rule Task and Call Activity
* Asynchronous Modification of a Single Process Instance
* History Cleanup in Multiple Threads
* Camunda Wildfly Swarm Community Extension
* Integration of the Latest Version of dmn-js
* [20 Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.9.0-alpha4)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


To see a full list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15304)
and the list of [Known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.9.0-alpha4).


If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.9.0-alpha4).

## External Task Notifications for Long Polling

With the preceding Camunda 7.9.0-alpha2 release, we introduced a long polling _Fetch & Lock_ handler for External Tasks. This reduces the amount of requests and a more efficient use of client, and server side resources.

However, it is possible that a new External Task has been created before the long polling timer runs out. Till now, the clients were not notified about this. This release introduces ExternalTask notifications for the long polling _Fetch & Lock_ handler. Thereby, the handler is immediately notified after a new External Task is created. Then, the handler interrupts the suspension periods and attempts to respond with the new External Task to some of the pending client requests.

## Version Tag Binding in Business Rule Task and Call Activity

[Version Tag](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-versioning/#version-tag) is a useful feature if you want to maintain customized versioning of processes.
This alpha release extends the usage of the version tag with two new bindings:
* Decision to evaluate in a business rule task - [learn more](https://docs.camunda.org/manual/latest/reference/bpmn20/subprocesses/call-activity/#calledelement-binding)
* Process in a call activity - [learn more](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/business-rule-task/#using-camunda-dmn-engine)


## Asynchronous Modification of a Single Process Instance

Process instance modification allows to flexibly start an activity again or cancel a running activity.
Within this alpha release it is possible to execute a modification of single process instance asynchronously.

Here is an example of async modification:
```java
Batch modificationBatch = runtimeService.createProcessInstanceModification(processInstanceId)
        .cancelActivityInstance("anActivityInstanceId")
        .startBeforeActivity("anActivityId")
        .executeAsync();
```		
As you can see a new batch is created which will asynchronously execute the desired modification in a separate job. For more information please check the [User Guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-modification/#asynchronous-modification-of-a-process-instance) in the docs.

## History Cleanup in Multiple Threads

Now historic data can be removed faster by defining the configuration parameter `historyCleanupDegreeOfParallelism`.
This parameter defines how many history cleanup jobs will be created by the engine. Allowed values are between 1 (default) and 8.
With the appropriate [configuration](https://docs.camunda.org/manual/7.8/reference/deployment-descriptors/tags/job-executor/) of the job executor, these jobs may be executed in parallel, speeding up the history cleanup process.

## Camunda Wildfly Swarm Community Extention

In case you're using [Wildfly Swarm](http://wildfly-swarm.io/) to build your application, the new community extension is now available to easily include Camunda Engine and/or 
Web applications to Wildfly Swarm projects. Please check the project on [GitHub](https://github.com/camunda/camunda-bpm-wildfly-swarm).

## Integration of the Latest Version of DMN-JS in Cockpit

This alpha release integrates the last version of DMN-JS, the DMN library Cockpit uses internally and which was completly rewritten recently. The benefits are mainly UX improvements and 
a huge performance boost when vieweing & modeling Decision Tables and Decision Requirement Diagrams. 

{{< figure class="teaser" src="new-dmn.gif" alt="Large decision table with the new dmn-js" caption="Large decision table with the new dmn-js" title="Camunda BPM Cockpit" >}}
{{< figure class="teaser" src="old-dmn.gif" alt="Large decision table with the old dmn-js" caption="Large decision table with the old dmn-js" title="Camunda BPM Cockpit" >}}


## What's Next?

Next month we will release a minor version. It is scheduled for the end of May and our team is already working on it. Finalising larger features and clearing the backlog are the clear focus.

You can also find out more details if you check out our [roadmap](https://camunda.com/learn/community/#roadmap).



## Your Feedback Matters!

With every release we constantly strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep bugging you, things that you think should work differently etc., please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
