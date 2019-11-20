+++
author = "Tassilo Weidner"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-04-27T12:00:00+01:00"
title = "Camunda External Task Client (Java) 0.1.0-alpha2 Released"
+++

Recently we released the [first alpha version](https://blog.camunda.com/post/2018/03/camunda-external-task-client-java-010-alpha1-released/) 
of the **Camunda External Task Client (Java)**. Today we are happy to announce the second alpha release.

The External Task concept helps to decouple your services from the Workflow Engine.

The highlights of this release are:

* Set variables to the local scope of External Tasks
* Specify a response timeout to fetch and lock External Tasks (long polling)
* More serialization formats to exchange object variables (XML and JAVA)

You can find the complete release notes [here](https://jira.camunda.com/sr/jira.issueviews:searchrequest-printable/temp/SearchRequest.html?jqlQuery=project+%3D+CAM+AND+component+%3D+%22external+task+client+java%22+AND+fixVersion+not+in+%287.9.0-alpha1%2C+7.9.0-alpha2%2C+7.9.0-alpha3%29+AND+%28status+%3D+Closed+or+status+%3D+Resolved%29&tempMax=1000).

<!--more-->
## Handling Orders Example
This example showcases some of the new features. Let's consider the following workflow:

{{< figure class="teaser" src="order.svg" alt="A Workflow for Handling Orders" title="A Workflow for Handling Orders" >}}

Make sure that you have an up and running [Camunda Workflow Engine](https://camunda.com/download/) and deploy 
[this workflow](https://raw.githubusercontent.com/camunda/camunda-external-task-client-java/master/examples/order-handling/workflow.bpmn) to it.

Next, create a Maven project and adjust the `pom.xml` by adding the following Maven coordinates:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-external-task-client</artifactId>
  <version>0.1.0-alpha2</version>
</dependency>
```

Create a simple invoice class:

```java
public class Invoice {
  public String id;

  public Invoice(String id) {
    this.id = id;
  }
}
```

Create a main class and add the following lines to it:

```java
// bootstrap the client
ExternalTaskClient client = ExternalTaskClient.create()
  .baseUrl("http://localhost:8080/engine-rest")
  .asyncResponseTimeout(1000)
  .build();

// subscribe to the topic
client.subscribe("invoiceCreator")
  .handler((externalTask, externalTaskService) -> {

    // instantiate an invoice object
    Invoice invoice = new Invoice("A123");

    // create an object typed variable with the serialization format XML
    ObjectValue invoiceValue = Variables
      .objectValue(invoice)
      .serializationDataFormat("application/xml")
      .create();

    // add the invoice object and its id to a map
    Map<String, Object> variables = new HashMap<>();
    variables.put("invoiceId", invoice.id);
    variables.put("invoice", invoiceValue);

    // select the scope of the variables
    boolean isRandomSample = Math.random() <= 0.5;
    if (isRandomSample) {
      externalTaskService.complete(externalTask, variables);
    } else {
      externalTaskService.complete(externalTask, null, variables);
    }

    System.out.println("The External Task " + externalTask.getId() +
      " has been completed!");

  }).open();

Thread.sleep(1000 * 60 * 5);
```

Finally, run the application. You should see the following output:
```
The External Task 1d375217-2cfe-11e8-96c2-769e8e30ca9b has been completed!
The External Task 0857150d-2cfe-11e8-96c2-769e8e30ca9b has been completed!
...
```

The project sources of this example can be found 
[here](https://github.com/camunda/camunda-external-task-client-java/tree/master/examples/order-handling). Please also see 
the [documentation](https://github.com/camunda/camunda-external-task-client-java) of the External Task Client.

What do you think about this release? Share your ideas and suggestions with us in the [forum](https://forum.camunda.org/).
