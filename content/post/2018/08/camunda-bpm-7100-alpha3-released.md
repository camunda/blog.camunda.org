+++
author = "Yana Vasileva"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-08-31T12:00:00+01:00"
title = "Camunda 7.10.0-alpha3 Released"
+++

**Camunda BPM 7.10.0-alpha3** is here and the highlights are:

* Extending "Handle External Task BPMN Error"
* Complete Hierarchical History Cleanup
* [9 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.10.0-alpha3)

Together with the third alpha of platform, we released also:

* [Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter/) 3.1.0-alpha1 - [release notes](https://jira.camunda.com/browse/CAM/fixforversion/15333)
* [NodeJS external task client](https://github.com/camunda/camunda-external-task-client-js) 1.1.0-alpha1 for non-Java developers - [release notes](https://jira.camunda.com/sr/jira.issueviews:searchrequest-printable/temp/SearchRequest.html?jqlQuery=project+%3D+CAM+AND+component+%3D+%22external+task+client+js%22+AND+fixVersion+in+%287.10.0-alpha1%2C+7.10.0-alpha2%2C+7.10.0-alpha3%29+AND+%28status+%3D+Closed+or+status+%3D+Resolved%29&tempMax=1000)
* [Java external task client](https://github.com/camunda/camunda-external-task-client-java) 1.1.0-alpha1 - can be embedded in Java applications, [release notes](https://jira.camunda.com/sr/jira.issueviews:searchrequest-printable/temp/SearchRequest.html?jqlQuery=project+%3D+CAM+AND+component+%3D+%22external+task+client+java%22+AND+fixVersion+in+%287.10.0-alpha1%2C+7.10.0-alpha2%2C+7.10.0-alpha3%29+AND+%28status+%3D+Closed+or+status+%3D+Resolved%29&tempMax=1000)


You can <a href="https://camunda.com/download/">Download Camunda for free</a> (click on Preview Release) or <a href="https://hub.docker.com/r/camunda/camunda-bpm-platform/">Run it with Docker</a>.


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15332)
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.10.0-alpha3).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.10.0-alpha3).

<!--more-->

## Extending "Handle External Task BPMN Error"

During process execution a [business error](https://docs.camunda.org/manual/develop/reference/bpmn20/events/error-events/#business-errors-vs-technical-errors) can occur. In the world of External tasks, the worker can report a BPMN error to the process engine by using `ExternalTaskService#handleBpmnError` (or the respective Rest endpoint). The method can only be invoked by the worker possessing the most recent lock for a task. The additional data which can be passed now when reporting such kind of BPMN errors are error message and variables which can be used later in the process flow.
Here is an example how this can be achieved via [Java API](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#reporting-bpmn-error):
```java
externalTaskService.handleBpmnError(externalTaskId, "aWorker", "ERROR-SPEC-10", "anErrorMessage", variables);
```
The [REST API](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-bpmn-error/) call would look like:

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

## Complete Hierarchical History Cleanup

This alpha release adds upon the Hierarchical History Cleanup feature introduced in the second alpha. Previously, the new mechanism was only aware of the hierarchical structure of Historic Process Instances.

With this release, the mechanism is expanded to include Historic Decision Instances, covering both cases, when decision instances are evaluated individualy and as part of a BPMN process. In the former, the removal time of the root decision instance is adopted by all the child decision instances, and in the latter, the root process instance removal time dictates the removal time of it's process and decision instance descendants (read more [here](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#internal-implementation)).

Furthermore, the Cleanable Process and Decision Instance Reports have been adjusted to report the correct number of cleanable instances when the new mechanism is used.

Finally, the attributes: `removalTime` and `rootProcessInstanceId` have been made available through the [Historic Process Instance](https://docs.camunda.org/manual/latest/reference/rest/history/process-instance/) and [Historic Decision Instance](https://docs.camunda.org/manual/latest/reference/rest/history/decision-instance/) endpoints of the Rest API.

## Next Steps…
As usual the fourth alpha release is scheduled for the end of the next month and we are already working on it.

Among other things, we are working on the following topics, which are planned to be released in one of the next alpha releases:

* Support of latest Wildfly version
* bpmn-js plugins are available in Cockpit

To get a complete overview of already implemented and planned features, please take a look at the [roadmap](https://camunda.com/learn/community/#roadmap) for the bigger list of planned features.

The minor release of **Camunda BPM 7.10** is coming this fall (November 30, 2018).

## Your Feedback Is Highly Appreciated!

With every release we constantly strive to improve **Camunda BPM**. To make this possible, we rely on your feedback.
Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
