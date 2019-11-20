+++
author = "Svetlana Dorokhova"
categories = ["Execution"]
tags = ["Release Note"]
date = "2017-07-28T12:00:00+01:00"
title = "Camunda 7.8.0-alpha2 Released"
+++

Camunda BPM platform 7.8.0-alpha2 is here and it is packed with new features. The highlights are:

* OR in task queries
* Sorting and filtering in Admin
* Extending of locks on external tasks
* More batch operations in Cockpit: suspend/restart process instance and set retries on external tasks (EE)
* [18 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.8.0-alpha2)

Also see the complete list of [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14906)
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.8.0-alpha2).

You can [download it](https://camunda.org/download/)
or [run it with docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.8.0-alpha2).
<!--more-->

## OR in Task Queries

Tasks are an integral part of processes since they are considered as the smallest entity of work. According to the
technical context, **Camunda BPM** provides several interfaces for querying tasks. Listed from bottom to top in the stack
these are: Java API, REST API and Tasklist.

With this release we are introducing **OR in Task Queries** as the counterpart of the default task query behavior (AND).

{{< video mp4="tasklist-or-queries.mp4" title="Camunda BPM Tasklist" caption="Switching the query type from ALL to ANY." >}}

Ordinary task queries consist of the combination of different criteria. Adding further criteria to a query leads
implicitly to a gradual reduction of the total task amount. Technically speaking: the criteria are combined with a
logical AND operation.

**OR in Task Queries** allows to unite multiple total amounts of tasks where each of these meet other criteria. In other
words the total amount of tasks are composed not only of tasks which meet all criteria simultaneously, but also of tasks
which either meet one **or** the other criterion. The combination of two criteria can therefore reveal more tasks than
each of which on its own.

> Everything has been said! Please show me some code...

Here you can see an use case of the newly introduced Java API:
```java
List<Task> tasks = taskService.createTaskQuery()
  .or()
    .taskNameLike("%Appr%")
    .taskPriority(50)
  .endOr()
  .list();
```

And this is how the REST API call would look like:

`POST /task`
```java
{
  "orQueries": [
    {
      "nameLike": "%Appr%",
      "priority": 50
    }
  ]
}
```

The queries above would retrieve all tasks which either contain the substring "Appr" in the task name or given the 50th
degree of priority.

For more details, please see the documentation about the
[Java API](http://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-api/#or-queries) and the
[REST API](http://docs.camunda.org/manual/latest/reference/rest/task/post-query/#request-with-or-queries).

## Extending of locks on external tasks

External tasks allow a [Fetch & Lock](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#fetching-tasks)
method which will lock a task for a given amount of time. However, this time limit is strict and cannot be changed.
After the timeout is reached, the lock expires and the task can be fetched and locked once again.

This release makes it possible to change the timeout for the worker who owns the lock on external task.

It solves a problem when working with long running processes that can fail during their execution.
For example, we have two servers up and we Fetch & Lock and start a long running process on one of those servers.
This long running could take 12 hours to complete, so we set the timeout to be 12 hours. Two hours into the process,
that server has a problem and is automatically torn down and a new server is brought up in its place.
Before, Camunda (and the second server) would have continued waiting for another 10 hours before unlocking the task.

Now it is not necessary to set such a long timeout from the beginning.

A worker can extend the lock sequentally during the execution of external task to avoid the situation above. In our example the first server can report every 5 minutes 
that it is still working on the task and will need at least 10 minutes more. In case after another 10 minutes, it has neither reported "complete", nor extended 
the lock for 10 more minutes, the task will be unlocked by Camunda and can be taken for execution by another server.

In Java API, the feature can be accessed through ExternalTaskService:

```java
	ExternalTaskService externalTaskService = processEngine.getExternalTaskService();
	externalTaskService.extendLock("exampleExternalTaskId", "exampleWorkerId", 60000);
```
In this example, the lock duration will be extended by 60000 ms = 1 min.

The REST API call would look like:

`POST /external-task/exampleExternalTaskId/extendLock`

```java
	{
		"workerId": "exampleWorkerId",
		"newDuration": 60000
	}
```

For more details, please see the documentation about the
[Java API](http://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#extending-of-locks-on-external-tasks) and the
[REST API](http://docs.camunda.org/manual/latest/reference/rest/external-task/post-extend-lock/).

## Sorting and filtering in Admin

Among other things the Admin webapp is supposed to manage users, groups and tenants. This release brings new features
to make finding certain records of these categories more easy.
{{< video mp4="admin-filter-sorting.mp4" title="Camunda BPM Admin" caption="Sorting & Filtering." >}}
This is achieved on the one hand by providing the possibility to sort rows of a results table according to a particular
attribute in ascending or descending order. On the other hand the rows of the results table can now be filtered according
to several criteria with the well known search widget.


## More Batch Operations in Cockpit

In our [last alpha release](http://blog.camunda.org/post/2017/06/camunda-bpm-780-alpha1-released/) we added a new batch operation to change the suspension 
state of process instances via [Java](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch-operations/#update-suspend-state-of-process-instances) 
or [REST API](https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-activate-suspend-in-batch/).

For our Enterprise Customers this feature is now also conveniently available in Cockpit in the Batch Operations page.

{{< figure class="teaser" src="cockpit-batch.png" alt="Camunda Cockpit Batch Operations" caption="Batch Operations in Camunda Cockpit" >}}

Another frequently requested feature is now also available per API and Cockpit: Restarting external tasks in batch. Check out the [Java API](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch-operations/#setting-retries-of-external-tasks) and [REST API](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-retries-async/).


## Take a Sneak Peek at What Is Next

We are already eagerly busy preparing for the next alpha release, which is scheduled for end of August.

Among other things, we are working on the following features, which are planned to be released in one of the next alpha releases:

* Batch modification of process instances (EE)
* Batch restart of finished/cancelled process instances (EE)
* Cockpit improved Support for JSON & XML Variables

And that is not all: if you are interested, take a look at the [roadmap](https://camunda.org/roadmap).


The minor release of **Camunda BPM 7.8** is coming this fall (November 30, 2017).

## Your Feedback Is Highly Appreciated!
With every release we constantly strive to improve **Camunda BPM**. To make this possible, we are reliant on your feedback.
Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
