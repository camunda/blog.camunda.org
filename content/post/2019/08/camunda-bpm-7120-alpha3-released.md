+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-08-29T8:00:00+01:00"
title = "Camunda BPM 7.12.0-alpha3 Released"
+++

**Camunda BPM 7.12.0-alpha3** is here and the highlights are:

* Version tag in Fetch & Lock of External Tasks
* Cockpit: Timestamps in External Tasks Log (Enterprise)
* Customizable resource deployment
* [13 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.12.0-alpha3)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/) (based on Java 11).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15514).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.12.0-alpha3).

<!--more-->

## Version tag in Fetch & Lock of External Tasks

In order to complete external tasks with the help of a worker, the tasks need to be fetched and locked first.
We extended the set of parameters of the fetch and lock instruction by a `processDefinitionVersionTag`.
With the help of this new parameter you can limit the fetched tasks to a specific version of their process definition.
An example for the Java API could look as follows:

```java
List<LockedExternalTask> fetchedExternalTasks = externalTaskService
  .fetchAndLock(1, "workerID")
  .topic("externalTaskTopic", 10000L)
  .processDefinitionVersionTag("version X.Y")
  .execute();
```

Here is the equivalent REST API example:

POST `/external-task/fetchAndLock`

Request Body:

```json
{
  "workerId": "workerID",
  "maxTasks": 1,
  "topics": [
    {
      "topicName": "externalTaskTopic",
      "lockDuration": 10000,
      "processDefinitionVersionTag": "version X.Y"
    }
  ]
}
```

For more information please check the documentation [here](https://docs.camunda.org/manual/latest/reference/rest/external-task/fetch/).

## Cockpit: Timestamps in External Tasks Log (Enterprise)

Understanding when external task events happened can be crucial in auditing an application as well as in debugging it. 
Until now, timestamps for the external task log were however not displayed in Cockpit.

From now on, the timestamps of external task events are displayed in Cockpit in the External Tasks Log in the process instance history view.

{{< figure src="external-task-log-timestamp.png" alt="External Tasks Log timestamps">}}

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform. To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)

## Customizable Resource Deployment

Resource Deployment in Camunda is performed through several phases. According to the
[deployment configuration](https://docs.camunda.org/manual/latest/reference/rest/deployment/post-deployment/#request-body), a deployment can be deployed

1. with all the same resources again or 
2. filtered by enabling `deploy-changed-only`, i. e. with only the changed (and new) resources.

Until this release, the filter criteria for changed resources was to compare the bytes of a 
given resource and its name, already present in the database. This does not allow for a lot of flexibility. Any additional checks on the resources (ex. a higher `Camunda Version Tag`) were simply not possible.

With this release, it is possible to customize the filter criteria for changed resources as 
well as determine what older deployments should be resumed, if a Process Application deployment
is performed.

The customization can be done by implementing the `DeploymentHandler` and `DeploymentHandlerFactory`
interfaces through a Process Engine Plugin, and setting the new implementation of the factory at
`ProcessEngineConfiguration#setDeploymentHandlerFactory`.

## Stay Tuned!

This is the third alpha release on the road to **Camunda BPM 7.12** (due November 30, 2019). The next developer preview
(alpha 4) is scheduled at the end of September and will be packed with new features.

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
