+++
author = "Felix Müller"
categories = ["Execution"]
date = "2016-12-23T14:00:36+02:00"
tags = ["7.6", "Batch"]
title = "Batch Operations with Camunda 7.6"
+++

Camunda 7.6 got [released](https://blog.camunda.org/post/2016/11/camunda-bpm-760-released/) few weeks ago and it comes with many new exciting features. One of them is the extended Batch Operation feature and within this post I gonna tell you what you can do with it and why it is so useful.
Before I outline some really good use cases for Batch Operations let's have a look what the concept actually means.

# Batch
In general, batch processing is a concept in which a number of jobs is executed without manual intervention. Therefore, in Camunda the Batch operation concept can be used to offload workload from the current execution to the background. This means that with the help of this concept operators are able to perform administrative operations on a large number of process instances without having to manually intervene.

Already in Camunda 7.5 a Batch framework was implemented (e.g. to perform [Process Instance Migration](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-migration/)), but with Camunda 7.6 many new, exciting APIs and Cockpit views were introduced.

# New Features
The new features fall into two categories being the Cockpit and the Engine:

For the new Batch operations the Batch API in the engine has been extended and you can find the new [Batch documentation here](https://docs.camunda.org/manual/7.6/user-guide/process-engine/batch/).

Within the Camunda Cockpit you will find two new views "Batch operation" and "Batches" ([see docs](https://docs.camunda.org/manual/7.6/webapps/cockpit/batch/)).
The "Batches" view gives you a quick overview about completed, running and also failed batch operations:
{{<figure src="batches_view.png" alt="Batches Overview">}}

The "Batch operation" view looks like this:
{{<figure src="batch_operation_definition.png" alt="Batch operation dashboard">}}

Besides searching and filtering process instances within this view you have the possibility to choose between three new types of operations:

## Cancel running process instances
The first new Batch operation that you can use in Camunda 7.6 is for cancelling running process instances. This feature can be useful in production and development in many cases.

Just to give an example one can imagine a scenario in which an external website with a form is used to start process instances in Camunda via the REST API. Unfortunately, the external website has not been secured against spam bots. One day a spam bot automatically submits a few thousand times the form on this website. This triggers the creation of a large amount of process instances in Camunda.
In the past operators would have to manually cancel the process instances one by one or write a script that supports them doing that. With the help of the new batch view the operator can just open the Camunda Cockpit and cancel the correct process instances straightaway.

Due to the new views in Cockpit that I have shown above, it is very obvious how you can cancel the running process instances as an administrator. This is why instead of just showing screenshots of the Cockpit, I want to show you how you can cancel running process instances using Camunda's REST API:


First, let's start a few process instances (as the spam bot would have done it) through the external form by executing following request multiple times:
```
POST  /process-definition/key/invoice/start

{
	"variables": {
		"amount" : {"value" : 30},
     	"creditor" : {"value" : "SpamBot", "type": "String"},
     	"invoiceCategory": {"value":""},
     	"invoiceClassification": {"value":""}
	}
}
```

Let's check how many process instances were created by the spam bot:
```
GET  /process-instance/count?processDefinitionKey=invoice&variables=creditor_eq_SpamBot

```

This gives us:
```
{
  "count": 1500
}
```

Now let's go ahead and **delete the process instances using the new Batch endpoint**:
```
POST /process-instance/delete

Request Body:
{
	"processInstanceQuery": {
			"variables": [
				{
                 "name": "creditor",
			     "operator": "eq",
			     "value": "SpamBot"
			    }
			]
	},
	"deleteReason": "This was the crazy SpamBot"
}

```
```
Status 200 OK

{
  "id": "2fd7c769-c8f2-11e6-adcc-32e087ccfe63",
  "type": "instance-deletion",
  "totalJobs": 1500,
  "jobsCreated": 0,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "2fd7c76a-c8f2-11e6-adcc-32e087ccfe63",
  "monitorJobDefinitionId": "2fd7c76b-c8f2-11e6-adcc-32e087ccfe63",
  "batchJobDefinitionId": "2fd7c76c-c8f2-11e6-adcc-32e087ccfe63",
  "suspended": false,
  "tenantId": null
}
```
[Camunda Docs REST API - Delete Async (POST)](https://docs.camunda.org/manual/7.6/reference/rest/process-instance/post-delete/)


## Delete historic process instances
When running Camunda in production usually a large amount of historic process instances accumulates over time. In some cases these process instances are relevant for auditing or reporting purposes. Still, often there is a need to delete large amounts of completed process instances from the history tables after some time.

In the past operators had to manually build batch jobs that use e.g. Camunda's REST API to delete those instances. With Camunda 7.6 it is now possible to create a batch job through the Cockpit to delete the historic instances very easily.

Nervertheless, even with the REST API there is a new endpoint which makes it very easy to delete historic process instances without having to manually script something. So let's delete the process instances from 2015:
```
POST /history/process-instance/delete

Request Body:
{
  "deleteReason" : "Old history from 2015",
  "historicProcessInstanceQuery": {
    "startedAfter": "2015-01-01T00:00:01",
    "finishedBefore": "2015-12-31T23:59:59"
  }
}
```

```
Response
Status 200 OK

{
  "id": "e917a3d1-c8f2-11e6-adcc-32e087ccfe63",
  "type": "historic-instance-deletion",
  "totalJobs": 2120,
  "jobsCreated": 0,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "e917a3d2-c8f2-11e6-adcc-32e087ccfe63",
  "monitorJobDefinitionId": "e917a3d3-c8f2-11e6-adcc-32e087ccfe63",
  "batchJobDefinitionId": "e917a3d4-c8f2-11e6-adcc-32e087ccfe63",
  "suspended": false,
  "tenantId": null
}
```
[Camunda Docs REST API - Delete Async (POST)](https://docs.camunda.org/manual/7.6/reference/rest/history/process-instance/post-delete/)

## Incrementing Retries for a batch of process instances
Another new batch operation might be of interest for you if many jobs within your workflows have failed and you want to increase the amount of retries.

Such scenario could occur if e.g. an external system that you are integrating was down for some reason or you had some bug in a specific service task. Increasing the amount of retries will tell the job executor to try the jobs again.

```
POST /process-instance/job-retries

Request Body:

{
  "retries" : 3,
  "processInstanceQuery": {
    "startedAfter": "2016-12-20T11:44:13"
  }
}
```


[Camunda Docs REST API - Set Job Retries Async (POST)](https://docs.camunda.org/manual/7.6/reference/rest/process-instance/post-set-job-retries/)

# Summary
This short blogpost just focused on Batch operations and one can see that the extended Batch API and the new Cockpit views look very promising and can be useful in both Production and Development environments. I hope the examples gave you some ideas when the feature might be useful for your project.
Thumbs up and thanks to the Camunda Core Developers for implementing this cool feature.
Go ahead and try the new feature by [downloading Camunda 7.6](https://docs.camunda.org/enterprise/download/).
