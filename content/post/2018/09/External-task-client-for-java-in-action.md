+++
author = "Ingo Richtsmeier"
categories = ["Execution"]
date = "2018-08-24T20:37:39+02:00"
tags = ["External task", "External task client for Java"]
title = "External Task Client for Java in Action"
draft = true

+++

My first touch with the External task client for Java was in June when I added an exercise to our Camunda BPM Training for Java Developers to use the external task client. The examples are very easy to follow and adopt.

# Powerful

At the first impression it is very easy to set up. All you need to do is to implement the Business Logic of the external service task in a handler and you are done.

## Performance

In discussions with certain customers we got to the question, how many external task clients you can start and how they should be configured not to harm the engine. I wanted to measure it and played around with the configuration.

## Configuration

There are a lot of options to configure your external task client. The main classes for this are the `ExternalTaskClientBuilder` and the `TopicSubsriptionBuilder`. These builders use a fluent api to set all the options. Now you can see the default values in the JavaDoc, together with the units. To publish this improved, we released version 1.0.1 of the camunda-external-task-client-java.

## An Example

From my inspections I got the point that there are two different kind of external task clients. The first is for tasks, where the business logic is finished immediatly (let say in some milliseconds). The second is for tasks, where the business logic takes a while (more than a few seconds) to complete.

For the first tasks the default configuration is fine and you can start very soon:

```
    ExternalTaskClient client = ExternalTaskClient.create()
      .baseUrl("http://localhost:8080/engine-rest")
      .workerId("Blogpost-Worker-for-fast-tasks")
      .build();

    TopicSubscriptionBuilder handler = client.subscribe("topic1")
      .handler((externalTask, externalTaskService) -> {
        // implement your business logic here 
        externalTaskService.complete(externalTask);
      });
    handler.open();
```

This handler fetches up to 10 tasks at once the handler completes them sequentially. Each task is locked for 20 seconds. If there are no tasks to do, the client will extend the pause between two fetches by factor 2, starting with 500 ms and bounded by 1 minute. Long Polling is not used, so it can take up to a minute to work on the next task after a longer break.

### Long Polling

You have to add `.asyncResponseTimeout(90000).disableBackoffStrategy()` to the `client` to activate long polling. The client offers all 90 seconds the option to work on a task. If a task is added by a process instance in the engine, the client will pick it up immediatly. With disabled backoff, the client doesn't pause between two sequential fetches without getting any task in the reponse. In the worst case, if there are no process instances started over a long time, the client asks every 90 seconds for new tasks. This Long Polling configuration can speed up the overall process instance completion time because the delay between the task creation and fetching the task is small (maybe a few milliseconds).

The configuration for long-running-tasks may look like this:
```
    ExternalTaskClient client = ExternalTaskClient.create()
        .baseUrl("http://localhost:8080/engine-rest")
        .workerId("Blogpost-Worker-for-long-running-tasks")
        .maxTasks(1)
        .asyncResponseTimeout(90000)
        .build();

    TopicSubscriptionBuilder handler = client.subscribe("topic1")
        .lockDuration(60000)
        .handler((externalTask, externalTaskService) -> {
          // implement your business logic here 
          externalTaskService.complete(externalTask);
        });
    handler.open();
```

In the TopicSubscription you should add the `lockDuration` that you need to handle your task savely. If you find out that the `lockDuration` isn't sufficient, you can call `externalTaskService.extendLock(externalTask, 120000);` in the handler.

Because the tasks are handled sequentially, you should restrict the fetch to single tasks by setting `maxTasks(1)`.

### Mesurements

I was able to setup a Camunda engine in spring-boot with an authorization enabled REST Api exposed (see [this example](https://github.com/camunda-consulting/code/tree/master/snippets/springboot-rest-api-basic-auth) for further details). I deployed a simple process with two external tasks. Completing the first task takes 10 seconds, the second tasks needs 15 seconds to be completed (both topic handlers use thread sleep). I started new process instance every 2 seconds, so the tasks pile up in the engine quite fast.

I started five workers on my laptop, each able to work on both topics. The access logs of tomcat shows response times about 40 ms for each fetch-and-lock or complete.

So I think the external task implementation is fast enough to handle a lot of clients and is very scalable.