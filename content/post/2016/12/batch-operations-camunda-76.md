+++
author = "Felix Müller"
categories = ["Execution"]
date = "2016-12-02T14:00:36+02:00"
tags = ["7.6", "Batch"]
title = "Batch Operations with Camunda 7.6"
+++

Camunda 7.6 just got [released](https://blog.camunda.org/post/2016/11/camunda-bpm-760-released/) and it comes with many new exciting features. One of them is the Batch Operation feature and within this post I gonna tell you what you can do with it and why it is so useful.
Before I outline some really good use cases for batch operations let's have a look what the concept actually means.

# Batch
In Camunda the Batch operation concept can be used to offload workload from the current execution to the background. This means that with the help of this concept operators are able to perform administrative operations on large numbers of process instances without having to worry about the duration of the transaction. Already in Camunda 7.5 a Batch framework was implemented (e.g. to perform [Process Instance Migration](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-migration/)), but with Camunda 7.6 many new APIs and Cockpit views were introduced.

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
The first new Batch operation you can use in Camunda 7.6 is for canceling running process instances. This feature can be useful in production and development in many cases.

Just to give an example one can imagine that an external website with a form is used to start process instances in Camunda via the REST API. Now it could happen that this external website is not secured against Spam Bots. Automatically a large amount of Process Instances would have been started in Camunda and the operator could immediately go into Cockpit and filter the correct process instances and cancel them.

Of course there are many more use cases for this feature, but this just gives you an idea when such feature can be useful.

## Delete historic process instances
When running Camunda in production usually a large amount of historic process instances accumulates over time. In some cases these process instances are relevant for auditing or reporting purposes. Still, often there is a need to delete large amounts of completed process instances from the history tables after some time.

In the past operators had to manually build batch jobs that use e.g. Camunda's REST API to delete those instances. With Camunda 7.6 it is now possible to create a batch job through the Cockpit to delete the historic instances very easily.

## Incrementing Retries for a batch of process instances
Another new batch operation might be of interest for you if many jobs within your workflows have failed and you want to increase the amount of retries.

Such scenario could occur if e.g. an external system that you are integrating was down for some reason or you had some bug in a specific service task. Increasing the amount of retries will tell the job executor to try the jobs again.

# Summary
This short blogpost just focused on Batch operations and one can see that the extended Batch API and the new Cockpit views look very promising and can be useful in both Production and Development environments.
Thumbs up and thanks to the Camunda Core Developers for implementing this cool feature.
Go ahead and try the new feature by [downloading Camunda 7.6](https://docs.camunda.org/enterprise/download/).
