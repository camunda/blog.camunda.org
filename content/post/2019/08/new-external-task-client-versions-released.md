+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-08-06T8:00:00+01:00"
title = "New External Task Client Versions Released"
+++

We are happy to announce that we published new versions for our external task clients. They introduce new features and configuration options.

The new Versions are

- Camunda External Task Client (Java) v1.2.1
- Camunda External Task Client (JavaScript) v1.2.0

Find more details about the new additions below.

<!--more-->

## Camunda External Task Client (Java)

## Camunda External Task Client (JavaScript)

Version 1.2.0 of the External Task Client for JavaScript introduces the possibility to set a maximum number of parallel executions. This can be used to prevent overloading the client with long-running tasks.

With the parameter `maxParallelExecutions` set, the client will only fetch the number of new tasks until the set number is reached, but never more than `maxTasks` at once. The release is fully backward-compatible. If `maxParallelExecutions` is not set, `maxTasks` Tasks will be fetched every polling cycle.

You can install it out with `npm i camunda-external-task-client-js` or check out the source code on [Github](https://github.com/camunda/camunda-external-task-client-js).