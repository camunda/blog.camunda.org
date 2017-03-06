+++
author = "Stephan Pelikan"
categories = ["Community"]
date = "2017-02-24T07:49:23Z"
tags = ["Release Note", "Camel", "Execution"]
title = "Camunda BPM Camel 0.5.0 Released"

+++

The community extension [Camunda BPM Camel](https://github.com/camunda/camunda-bpm-camel) connects seamless Camunda BPM and the intergration framework [Apache Camel](http://camel.apache.org/).

Next to minor changes the new release adds support for consuming [Camunda's external tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) (introduced in Camunda 7.4.0) in the form of a Camel route endpoint. This is another level of technical decoupling and brings a lot of adventages.

<!--more-->

# Consuming Camunda's external tasks

This is a simply example showing how to consume external tasks in a Camel route: 

```java
public class CamelRouteBuilder extends RouteBuilder {

   @Override
   public void configure() throws Exception {
   
      from("camunda-bpm:poll-externalTasks?topic=topic1")
            .convertBodyTo(Topic1SOAPRequest.class);
            .to("cxf://http://myserver/topic1service?serviceClass=com.example.topic1service&dataFormat=MESSAGE");
            
   }
    
}
```

After starting the Camel context the route starts polling Camunda for externals tasks of `topic1`. In this example the task is converted to a SOAP request using a custom converter and is sent to a webservice endpoint. Once the webservice is sent the external task is completed and the workflow proceeds.

For more details see the [documentation](https://github.com/camunda/camunda-bpm-camel#camunda-bpmpoll-externaltasks-consuming-external-tasks).

# Advantages

The are some good reasons for using external tasks for the combination of Camunda BPM and Apache Camel:

## Loose coupling

{{< figure class="teaser no-border" src="clean-code-simpsons.jpg" alt="Strong coupling is bad code" caption="Strong coupling is bad code" >}}

Using a Camel route instead of a Java bean inside a service tasks gives you some sort of decoupling since you don't need the Camunda Java API any more (see [here](https://github.com/camunda/camunda-bpm-camel#calling-a-camel-endpoint-service) for details). But doing so introduces Camel into your BPMNs which is again some sort of coupling.

Using external tasks also removes Camel from your workflows because both sides, BPMN and Camel, use the topic as the task's identifier.

## Technical decoupling

{{< figure class="teaser no-border" src="technical-decoupling.png" alt="Do not block job executor threads" caption="Do not block job executor threads" >}}

For example calling a webservice might be a long task and is blocking the thread which is running the workflow. This thread might be a http thread if the process was started in the context of sending a form and the user has to wait for completing the webservice. If you place an `asyncBefore` flag at the service task the user doesn't have to wait and the thread is now one of Camunda's job executor.

But even the job executor threads shouldn't be blocked because you might run out of them and Camunda stucks. Or more worth, incoming messages of foreign systems might not correlate because the process couldn't be drive the a receive task in time. Using external tasks solves this problem because an external task is a wait point within the workflow. At a wait point (like a user task) Camunda BPM waits for the task to be completed and can be do other work in the meantime.

## Asynchronous communication

{{< figure class="teaser no-border" src="diagram_async.png" alt="Hide technical issues" caption="Hide technical issues" >}}

One important rule of making BPMNs is to hide technical issues because they do not effect the workflow's aim and make the BPMN less readable. If you have asynchronous communication with foreign systems it was hard to find a clean way for doing so.

The new Camel endpoints for external tasks offer a clean solution by splitting asynchronous communication into to up to four transactions within one service task (see image above):

1. As mentioned in "[Technical decoupling](#technical-decoupling)" an external task is a wait point and therefore commits the current transaction.
1. Polling the external task and sending the synchronous message is the next transaction. By using Camels ["transacted" feature](http://camel.apache.org/transactional-client.html) it is even possible to split this transaction into two transactions (consuming the external task; sending the request) or three (consuming the external task; sending the request; safe information about failed communication).
1. Processing the asynchronous response. E.g. store new data into your tables.
1. By using the flag `asyncAfter` at the service task further workflow processing will use it's own transaction.

For more details see the [documentation](https://github.com/camunda/camunda-bpm-camel#camunda-bpmasync-externaltask-processing-outstanding-external-tasks).

# Conclusion

As Camunda BPM is a great engine for processing workflows Apache Camel is a great framework for integration patterns. [Camunda BPM Camel](https://github.com/camunda/camunda-bpm-camel) combines them and gives you the ability of building complex systems which are easy to maintain. The new release 0.5.0 takes the next step by using Camunda's external tasks.
