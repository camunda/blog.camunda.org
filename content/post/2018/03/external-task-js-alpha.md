+++
author = "Seif Eddine Ghezala & Fabian Hinsenkamp"
categories = ["Execution"]
tags = ["Execution", "Release Note"]
date = "2018-03-13T15:00:00+01:00"
title = "Camunda NodeJS External Task Client 0.1.0-alpha Released"
+++

We are so excited to announce what the team has been cooking for the past few weeks: [camunda-external-task-client.js](https://github.com/camunda/camunda-external-task-client-js),
 a NodeJS client for [Camunda External Tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/)!

The main features set includes:

* _Fetch & Lock_ Tasks Globally
* Task Completion
* Lock Time Manipulation

## _Fetch & Lock_  Tasks Globally
A detail about the Camunda Engine API worth pointing out is that it's possible to fetch external tasks as a batch independently of their specific topics.
The _Client_ performs _Fetch & Lock_ in batches, leading to significantly less requests and a superior performance
compared to executing the same operation per topic.
Furthermore, it offers to start/stop polling for available tasks and distributes them by topic.
Each individual topic can be subscribed in order to complete associated tasks by a specified handler function.

## Task Completion
The Client offers already the full range of features related to completing a task. 
When the handler function has [completed](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-complete/) the desired work, it can signal the process engine to continue the process execution after the service task.
Moreover, it can be signalled that the execution of the task has [failed](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-failure/) or a business error needs to be [handled](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-bpmn-error/).

## Lock Time Manipulation
Beside actions related to completion, the lock time of a task can be manipulated. The lock time refers to the time period during which a task is unavailable for  _Fetch & Lock_ , as it's already
being processed.
In some use cases it is required to be able to [extend](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-extend-lock/) the lock time or [unlock](https://docs.camunda.org/manual/latest/reference/rest/external-task/post-unlock/) the task immediately. 
Therefore, camunda-external-task-client.js supports both features.

## How to get it?
Check out [this link](https://github.com/camunda/camunda-external-task-client-js) to see install & usage guidelines, API
documentation, and source code of camunda-external-task-client.js.

## What's next?
Variable support is the next topic we will tackle before the next release.

## Feedback
Do you miss anything or spot a bug? Or do you have feedback on this release?

 * Reach out to us via [our forums](https://forum.camunda.org/c/engine)
 * Create an issue on [Github](https://github.com/camunda/camunda-external-task-client-js/issues)
 * Tweet us on [@Camunda](https://twitter.com/Camunda)
