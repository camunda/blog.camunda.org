+++
author = "Tassilo Weidner"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-03-23T12:00:00+01:00"
title = "Camunda External Task Client (Java) 0.1.0-alpha1 Released"
+++

We are excited to release the first alpha of the **Camunda External Task Client (Java)**.

A Workflow Engine typically calls Service Tasks actively. The Java client allows to break with this principle: remote and 
independent Service Task workers continuously fetch tasks, perform the work and share the result with the Workflow Engine 
once the work has been done.

<!--more-->

The first preview version includes the following features:

* Complete external tasks
* Extend the lock duration of external tasks
* Unlock external tasks
* Report BPMN errors as well as failures
* Share primitive and object typed process variables with the Workflow Engine

## Example
Let's consider the following example to get a better understanding of how to use the Java client:

{{< figure class="teaser" src="loan-process.svg" alt="A Workflow of Granting Loans" title="A Workflow of Granting Loans" >}}

Firstly, make sure that you have an up and running [Camunda Workflow Engine](https://camunda.com/download/).

Secondly, deploy the workflow to the Camunda Workflow Engine. You can download the workflow 
[here](https://raw.githubusercontent.com/camunda/camunda-external-task-client-java/master/examples/loan-granting/workflow.bpmn).

Next, create a Maven project and adjust the `pom.xml` by adding the following Maven coordinates:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-external-task-client</artifactId>
  <version>0.1.0-alpha1</version>
</dependency>
```

Then create a main class and add the following lines to it:

```java
// bootstrap the client
ExternalTaskClient client = ExternalTaskClient.create()
  .baseUrl("http://localhost:8080/engine-rest")
  .build();

// subscribe to the topic
client.subscribe("creditScoreChecker")
  .lockDuration(1000)
  .handler((externalTask, externalTaskService) -> {
  
    // retrieve a variable from the Workflow Engine
    int defaultScore = externalTask.getVariable("defaultScore");

    List<Integer> creditScores = 
      new ArrayList<>(Arrays.asList(defaultScore, 9, 1, 4, 10));
    
    // create an object typed variable
    ObjectValue creditScoresObject = Variables
      .objectValue(creditScores)
      .create();

    // set the recently created variable
    externalTask.setVariableTyped("creditScores", creditScoresObject);

    // complete the external task
    externalTaskService.complete(externalTask);
    
    System.out.println("The External Task " + externalTask.getId() 
      + " has been completed!");

  }).open();

Thread.sleep(1000 * 60 * 5);
```

Finally, run the application. You should see the following output:
```
The External Task 1d375217-2cfe-11e8-96c2-769e8e30ca9b has been completed!
The External Task 0857150d-2cfe-11e8-96c2-769e8e30ca9b has been completed!
...
```

Now, you got a quick impression of how to use the Java client and how it behaves. This example can also be found 
as a detailed [step-by-step guide](https://github.com/camunda/camunda-external-task-client-java/tree/master/examples/loan-granting)
with all necessary project sources.

Please also see the [documentation](https://github.com/camunda/camunda-external-task-client-java).

> **We are reliant on your feedback!**
> Feel free to share your ideas and suggestions with us in the [forum](https://forum.camunda.org/).
