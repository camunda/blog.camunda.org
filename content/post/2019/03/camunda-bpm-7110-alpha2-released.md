+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-03-01T08:00:00+01:00"
title = "Camunda BPM 7.11.0-alpha2 Released"
+++

**Camunda BPM 7.11.0-alpha2** is here and the highlights are:

* Fine-grained Permissions for Tasks, Process Instances, and Process Definitions
* Java/REST API: Recalculate Job Due Dates
* Java/REST API: Case Insensitive Semantics for Task Variables
* Delete Variable History in Cockpit Full (Enterprise)
* [18 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.11.0-alpha2)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15374).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.11.0-alpha2).

<!--more-->

## Fine-grained Permissions for Tasks, Process Instances, and Process Definitions

We add a few more fine-grained permissions in Admin Webapp. The new additions are: 

* _Update Variable_ and _Read Variable_ for Tasks
* _Retry Job_, _Suspend_, and _Update Variable_ for Process Instances
* _Suspend Instance_, _Update Instance Variable_, and _Update Task Variable_ for Process Definitions
* _Read Task Variable_, _Read Instance Variable_, and _Read History Variable_ for Process Definition which are disabled by default. Please learn more [here](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#default-read-variable-permissions)

Having these fine-grained permissions, you can grant a user to be allowed to perform only the specific operation (_Suspend Instance_) for which they are assigned to do. In comparison to grant them _Update_ permission which allows them to perform more than that.
For a complete list of the available permissions, please visit our [User guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#permissions-by-resource).

## Java/REST API: Recalculate Job Due Dates
Everything changes and nothing stands still.
Thus, this alpha now allows recalculation of job due dates. 
This comes in handy if your due dates are based on variables and other context that might change over time. 

The recalculation can be based on the original creation date of the job or the current date.
The first option will be the default for REST API interaction if you do not specify otherwise.
You can find an example for both below:

```java
managementService.recalculateJobDuedate("aJobId", true);// based on original creation date of the job

managementService.recalculateJobDuedate("aJobId", false);// based on current date
```

The REST API examples would look as follows (both calls return status code `204 No content`):

POST `/job/aJobId/duedate/recalculate`

POST `/job/aJobId/duedate/recalculate?creationDateBased=false`

For more information please check the [REST documentation](https://docs.camunda.org/manual/latest/reference/rest/job/post-recalculate-job-duedate/).


## Java/REST API: Case Insensitive Semantics for Task Variables

With this alpha, queries for tasks with task, process and case instance variables support case-insensitive semantics.

There are three new operators to help you use this feature with the REST API: `eqic`, `neqic` and `likeic` (corresponding to `eq`, `neq` and `like`, with _ic_ standing for `ignore case`).

Here are some examples:

GET `/task?taskVariables=varName_eqic_varValue`

GET `/task?processVariables=varName_neqic_varValue`

GET `/task?caseInstanceVariables=varName_likeic_varValue`


A POST request could look like this:

POST `/task`

Request Body:

```json
{
  "taskVariables": [
    {
      "name": "varName",
      "value": "varValue",
      "operator": "eqic"
    },
    {
      "name": "anotherVarName",
      "value": "anotherVarValue",
      "operator": "likeic"
    },
    {
      "name": "thirdVarName",
      "value": "thirdVarValue",
      "operator": "neqic"
    }
  ]
}
```

For more information please check the documentation [here](https://docs.camunda.org/manual/latest/reference/rest/task/post-query/) and [here](https://docs.camunda.org/manual/latest/reference/rest/task/get-query/).

The new semantics are also supported in the Java API. They can be used for `TaskQuery` and `TaskFilter`. Creating a case-insensitive `TaskQuery` with Java is as simple as:

```java
taskQuery.taskVariableValueEqualsIgnoreCase(variableName, variableValue)
taskQuery.processVariableValueNotEqualsIgnoreCase(variableName, variableValue)
taskQuery.caseInstanceVariableValueLikeIgnoreCase(variableName, variableValue)
```

You can find more information on the new TaskQuery features [here](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/task/TaskQuery.html).


## Delete Variable History in Cockpit Full (Enterprise)

In the previous alpha, we introduced the possibility to delete historical variables using API calls. Now it has become possible to do so directly in **Cockpit Full** of the Enterprise Platform. You can delete specific or all variables from the process history view.

{{< figure class="Delete Variable History" src="historical_deletion.png" alt="Screenshot of the cokckpit variable history view">}}

You can find more information on how to use this feature [here](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/process-history-views/).

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform. To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)


<!--no-more-->

## What's Next?

This is the second alpha release on the road to **Camunda BPM 7.11** (due May 31, 2019). Stay tuned for more features around permissions, job execution and testing support. For details see our [roadmap](https://camunda.com/learn/community/#roadmap).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
