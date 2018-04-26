+++
author = "Fabian Hinsenkamp"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-04-27T15:00:00+01:00"
title = "Camunda 7.9.0-alpha4 Released"

+++

Camunda BPM platform 7.9.0-alpha4 is here and the highlights are:

* External task notification for long polling fetch and lock handler
* VersionTag binding in Business rule task and Call activity
* Asynchronous modification of a single process instance
* History cleanup in multiple threads
* Camunda Wildfly Swarm community extention
* [XX Fixes](https://app.camunda.com/jira/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.9.0-alpha4)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


To see a full list of the changes, please check out our [Release Notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10230&version=15301)
and the list of [Known Issues](https://app.camunda.com/jira/issues/?jql=affectedVersion%20%3D%207.9.0-alpha4).


If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.9.0-alpha3).

## External Task Notifications for Long Polling

With the preceding Camunda 7.9.0-alpha2 release, we introduced a long polling fetch and lock handler for External Tasks. This provides a reduction of requests and a more efficient use of client, and server side resources.

However, it is possible that a new External Task had been created before the long polling timer runs out. The clients were not notified about this change in the previous alpha release version. Now, through the implementation of an ExternalTask notification for the long polling _Fetch & Lock_ handler, this is possible. Immediately after a new External Task is created, the handler is notified that a new External Task exists. Then, the handler interrupts the suspension periods and attempts to respond with the new External Task to some of the pending client requests

## Version Tag Binding in Business Rule Task and Call Activity

[Version Tag](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-versioning/#version-tag) is a useful feature for those who want to maintain customized versioning of their processes.
This alpha extends the usage of the version tag with two new bindings:
* Decision to evaluate in a business rule task - [learn more](https://docs.camunda.org/manual/latest/reference/bpmn20/subprocesses/call-activity/#calledelement-binding)
* Process in a call activity - [learn more](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/business-rule-task/#using-camunda-dmn-engine)


## Asynchronous Modification of a Single Process Instance

Process instance modification allows users to flexibly start an activity again or cancel a running activity. 
Within this alpha release it is possible to execute a modification of single process instance asynchronously.

Here is an example of async modification:
```java
Batch modificationBatch = runtimeService.createProcessInstanceModification(processInstanceId)
        .cancelActivityInstance("anActivityInstanceId")
        .startBeforeActivity("anActivityId")
        .executeAsync();
```		
As you can see a new batch is created which will asynchronously execute the desired modification in separate job. For more information please check the [User Guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-modification/#asynchronous-modification-of-a-process-instance) in the docs.

## History cleanup in multiple threads

By defining configuration parameter `historyCleanupDegreeOfParallelism` you can now make historic data to be removed faster.
This parameter defines how many history cleanup jobs will be created by the engine. Allowed values are between 1 (default) and 8.
With the appropriate configuration of job executor, these jobs may be executed in parallel, speeding up the history cleanup process.

## Camunda Wildfly Swarm community extention

In case you're using [Wildfly Swarm](http://wildfly-swarm.io/) to build your application, the new community extension is now available to easily include Camunda Engine and/or 
Web applications to Wildfly Swarm projects. Please check the project on [GitHub](https://github.com/camunda/camunda-bpm-wildfly-swarm).

## What's Next?

The next minor version is scheduled for the end of May and our team is already working on it.

Here is a highlight if you want to know what the team is preparing for the next releases:

* Next Feature 1
* Next Feature 2


You can also find out more details if you check out our [roadmap](https://camunda.com/learn/community/#roadmap).



## Your Feedback Matters!

With every release we constantly strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep bugging you, things that you think should work differently etc., please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
