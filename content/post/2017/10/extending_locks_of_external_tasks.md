+++
author = "Svetlana Dorokhova"
categories = ["Execution"]
tags = ["External Tasks"]
date = "2017-10-20T12:00:00+01:00"
title = "Extending Locks of External Tasks"
+++

The External tasks concept was introduced in v. 7.4. So far, only two operations existed to deal with external tasks: **Fetch & Lock** and **Complete** (read more in our [docs](https://docs.camunda.org/manual/7.7/user-guide/process-engine/external-tasks/)).

These operations may be enough in most of the use cases, but can also cause a lot of inconveniences:

<!--more-->

 * When an external task represents a long-running operation (like video transcoding, data indexing, etc.)
 * When it's hard to estimate the time that the worker will need to finish the task

Before v. 7.8, a worker had to choose the lock duration at the very beginning, when fetching the task, and it did not have a margin for error. If the lock duration is not big enough, 
so that the worker is not able to complete the task in the given amount of time, the task can be fetched by another worker. As a consequence, two workers will do one and the same job,
which can lead to huge problems like data inconsistency, etc. On the contrary, if the lock duration is too long and the worker can't complete the task for some reason (system crash or anything),
then another worker is not able to take over the work, unless the timeout has been reached.

To resolve such problems, starting with version 7.8, the new operation **Extend Lock** was introduced. It allows to sequentially update the lock duration for the external task,
while working on it.

Previously, the process could look like this:

{{< figure src="external-tasks-before.svg" alt="External task scenario before v.7.8" title="External task scenario before v.7.8" >}}

Let's imagine that we have two servers up and we Fetch & Lock and start a long running process on one of those servers. This long running process could take 8 hours to complete, 
so we set the timeout to be 8 hours. Two hours into the process, that server has a problem and is automatically torn down and a new server is brought up 
in its place. Previously, Camunda (and the second server) would have continued waiting for another 6 hours before unlocking the task. Only after the timeout has been reached,
the task will be available for Fetch & lock again from another server.

Now, with the new Extend Lock operation, our scenario could look like this:

{{< figure src="external-tasks-after.svg" alt="External task scenario in v.7.8" title="External task scenario in v.7.8" >}}

Every 25 minutes, the first server can report that it is still working on the task and will need at least 30 minutes more. In case it has neither reported “complete” nor extended the lock after another 
30 minutes, the task will be unlocked by Camunda and can be fetched for execution by another server.

Also in this pattern, the worker does not need to estimate lock duration at the very beginning. It can just use some "standard" initial value and then extend the lock as much as necessary.

## How to use it

In the Java API, the feature can be accessed through the `ExternalTaskService`:

```java
	ExternalTaskService externalTaskService = processEngine.getExternalTaskService();
	externalTaskService.extendLock("exampleExternalTaskId", "exampleWorkerId", 60000);
```
In this example, the lock duration is extended by 60000 ms = 1 min.

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
