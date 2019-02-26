+++
author = "Patrick Schalk"
categories = ["Community"]
date = "2019-03-04T12:00:00+02:00"
tags = ["Release Note", "Batch", "Extension"]
title = "Camunda BPM Custom Batch 1.3.0"
+++
 
I'm happy to announce the new version 1.3.0 of the [Camunda BPM Custom Batch extension](https://github.com/camunda/camunda-bpm-custom-batch). This extension provides a simple way to use the camunda batch functionality for your own purposes and split huge workloads into small asynchronous jobs. If you are interested in how the extension is working, and how customers use it, take a look at the [presentation slides from CamundaCon 2018](https://www.slideshare.net/camunda/camundacon-2018-custom-batch-extension).
 
So what happened since version 1.0.0? Here is a short summary of exclusive and prioritized batch jobs.
 
<!--more-->
 
# Exclusive (1.3.0)
 
With 1.3.0 it's now possible to disable the `exclusive` flag of the generated batch jobs.
By default, a job is always exclusive, which means that all jobs of the same process instance, as well as all batch jobs, are not run in parallel. Thus, potential conflicts are reduced at the cost of performance.
(see also [Camunda Documentation: Exclusive Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#exclusive-jobs))
 
However performance might be an issue when it comes to batch jobs. By setting `exclusive` to false, custom batch jobs can now run in parallel, i.e. all job executor threads can work on them. and they will be executed much faster. **But take care**, this can also lead into delayed execution of regular timer jobs, because all job executor threads could busy with batch jobs.
In this case, you could use the `jobExecutorPreferTimerJobs` flag to prefer timer jobs before working on batch jobs.

A custom batch could be set as non exclusvie when creating the batch:

```java
CustomBatchBuilder.of(listOfStringData)
  .jobHandler(printStringBatchJobHandler)
  .exclusive(false)
  .create();
```
 
# Configuration format (1.3.0)
 
Adding the `exclusive` flag to the batch also required to extend the batch configuration. This is always a breaking change, because up to now, we just saved the serialized configuration class. In order to make it easier in the future to extend the batch configuration, it's now saved as a json string.
Nevertheless, the extension is still able to work on batches with the old configuration format.
 
# Priority (1.2.0)
 
When releasing 1.2.0, we implemented a feature to set the priority of generated batch jobs. With this it's now possible to set e.g. a lower priority to batch jobs than to normal timer jobs or a higher priority for batches which should be completed as fast as possible. Priority is always important to consider when you play around with the `exclusive` flag.

The priority of the batch jobs can be set during creation of the batch:

```java
CustomBatchBuilder.of(listOfStringData)
  .jobHandler(printStringBatchJobHandler)
  .jobPriority(0L)
  .create();
```
