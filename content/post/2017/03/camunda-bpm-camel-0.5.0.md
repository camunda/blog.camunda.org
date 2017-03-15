+++
author = "Stephan Pelikan"
categories = ["Community"]
date = "2017-02-24T07:49:23Z"
tags = ["Release Note", "Camel", "Execution"]
title = "Camunda BPM Camel 0.5.0 Released - External Task Support"

+++

The community extension [Camunda BPM Camel](https://github.com/camunda/camunda-bpm-camel) seamlessly connects Camunda BPM and the intergration framework [Apache Camel](http://camel.apache.org/).

Next to minor changes the new release adds support for consuming [Camunda's external tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) (introduced in Camunda 7.4.0) in the form of a Camel route endpoint. This is another level of technical decoupling and brings a lot of adventages.

<!--more-->

# Consuming Camunda's external tasks

This is a simple example showing how to consume external tasks in a Camel route: 

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

After starting the Camel context the route starts polling Camunda for externals tasks of `topic1`. In this example the task is converted to a SOAP request using a custom converter and is sent to a webservice endpoint. Once the webservice call is done, the external task is completed and the workflow proceeds.

For more details see the [documentation](https://github.com/camunda/camunda-bpm-camel#camunda-bpmpoll-externaltasks-consuming-external-tasks).

# Advantages

There are some good reasons for using external tasks for the combination of Camunda BPM and Apache Camel:

## Loose coupling

{{< figure class="teaser no-border" src="clean-code-simpsons.jpg" alt="Strong coupling is bad code" caption="Strong coupling is bad code" >}}

Using a Camel route instead of a Java bean inside a service tasks gives you some degree of decoupling since you don't need the Camunda Java API any more (see [here](https://github.com/camunda/camunda-bpm-camel#calling-a-camel-endpoint-service) for details). Using external tasks also decouples Camel from your workflows because both sides, BPMN and Camel, use the topic as the identifying feature for the work that needs to be done.

## Non-blocking service execution

{{< figure class="teaser no-border" src="technical-decoupling.png" alt="Do not block job executor threads" caption="Do not block job executor threads" >}}

For example, calling a webservice might be a long task and is blocking the thread which is running the workflow. This thread might be a HTTP-thread if the process was started in the context of sending a form and the user has to wait for completing the webservice. If you place an `asyncBefore` flag at the service task, the user wouldn't have to wait because the thread is not blocked for executing the service task. Instead the task is now executed by one of Camunda's job executor threads.

But even job executor threads shouldn't be blocked because you have to think about proper configuration for scalability. Another problem which can arise is that response message of an asynchronous service calls might arrive before the engine transaction has committed. And that means the incoming message cannot be correlated. Using external tasks solves this problem because an external task is a wait state within the workflow (like a user task). The service is not called before the transaction is committed, hence the response message can never be faster.

## Asynchronous communication

{{< figure class="teaser no-border" src="diagram_async.png" alt="Hide technical issues" caption="Hide technical issues" >}}

A best practice when modeling BPMN is to hide technical issues because so that they don't affect the readability of the workflow and it's business aim. If you have asynchronous communication with foreign systems in the past it was hard to find a clean way for doing so.

The new Camel endpoints for external tasks offer a clean solution by splitting asynchronous communication into up to four transactions relevant in the context of a service task (see image above):

1. As mentioned in "[Technical decoupling](#technical-decoupling)" an external task is a wait state and therefore the transaction which created the task commits immediately.
1. Polling the external task and sending the synchronous message is the next transaction. By using Camels ["transacted" feature](http://camel.apache.org/transactional-client.html) it is even possible to split this transaction into two transactions (consuming the external task; sending the request) or three (consuming the external task; sending the request; save information about failed communication).
1. Processing the asynchronous response. E.g. store new data into your tables.
1. By using the flag `asyncAfter` at the service task, further workflow processing will use it's own transaction and won't undo the data previously stored in case of a rollback.

For more details see the [documentation](https://github.com/camunda/camunda-bpm-camel#camunda-bpmasync-externaltask-processing-outstanding-external-tasks).

# Conclusion

Jus as Camunda BPM is a great engine for processing workflows, Apache Camel is a great framework for integration patterns. [Camunda BPM Camel](https://github.com/camunda/camunda-bpm-camel) combines the two and gives you the ability of building complex systems which still are easy to maintain. The new release 0.5.0 takes the next step by using Camunda's external tasks.

This is a guest post by [Stephan Pelikan](mailto:stephan.pelikan@wdw-elab.de).
