+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-04-27T08:00:00+01:00"
tags = ["Microservices"]
title = "Stack and Technology Questions: Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation"
+++

Back in March, I conducted the webinar: “[Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/)”. Not only was I overwhelmed by the number of attendees, but we also got a huge list of interesting questions before and, especially, during the webinar. I was able to answer some of these, but ran out of time to answer them all. So I want to answer all open questions in this series of seven blog posts - you can click on the hyperlinks below to navigate to the other entries.

<!--more-->

In this blog, we’ll be exploring Stack and Technology questions.

1. [BPMN & modeling-related questions (6 answers)](https://blog.camunda.com/post/2020/04/webinar-faq-part-1-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
2. [Architecture related questions (12)](https://blog.camunda.com/post/2020/04/architecture-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
3. __Stack & technology questions__ (6)
4. Camunda product-related questions (5)
5. Camunda Optimize specific questions (3)
6. Questions about best practices (5)
7. Questions around project layout, journey and value proposition (3)


__Q: How could Camunda be used in conjunction with Apache streaming and queuing platform?__

The downside of questions via chat is that you simply can’t ask counter questions to understand the exact meaning. So I am not sure what Apache streaming and queuing platform relates to. But if my consulting past teaches me just one thing … this does not need to stop me from answering ;-)

Let’s assume this platform is what I know as Apache Kafka. Then there are two interesting aspects to look at:

First: There is an overlap of the use case of streaming and workflow, especially when streaming is used to build event-chains between microservices, as I described with the choreography in an earlier answer.

But, there are also good examples of how to use streaming and workflow together. My ah-ha moment was when saw one use case around vehicle maintenance, which I describe in detail in [Zeebe loves Kafka: Act on Insights of your Streams](https://blog.bernd-ruecker.com/zeebe-loves-kafka-d82516030f99).

Assume that you have a huge number of sensors that constantly send measurements (oil pressure is 80 psi) via Kafka. Now you have some clever logic generating insights based on these measures (oil pressure is critically high). All these insights are also sent via Kafka.

But now you want to act on this information, e.g. to alert an operations person to organize some maintenance. In order to do so you have to get from the world of stateless event streams into the world of stateful workflows, from a world of a massive amount of information (the measurements might be sent every second) to a world with lower numbers, especially as you want to start a workflow only once per insight.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/kafka-topic.png" alt="Kafka Topic" >}}

__The second interesting aspect__ is actually about the integration of both tools, which is exactly the next question!

__Q: Integration with Apache Kafka, best practices?__
Integrating a workflow engine with Apache Kafka is technically speaking relatively easy. You need to:

- Ingest records from Kafka into the workflow engine, which is done via message receive events/tasks in BPMN.
- Publish records onto Kafka from the workflow, which is done via message send events/tasks in BPMN (or service tasks if you prefer).

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/workflow-engine.png" alt="Kafka Topic" >}}

You can find some pieces of code doing this with Java and Camunda BPM e.g. in the [flowing-retail example using Spring Boot and Spring Cloud Streams](https://github.com/berndruecker/flowing-retail/blob/master/kafka/java/order-camunda/src/main/java/io/flowing/retail/order/messages/MessageListener.java#L69). Or if you use Camunda Cloud (Zeebe) you could also leverage the [Kafka connector for Zeebe](https://zeebe.io/blog/2019/08/official-kafka-connector-for-zeebe/), as [you can see in this example on GitHub](https://github.com/zeebe-io/kafka-connect-zeebe/tree/master/examples/ping-pong).

__Q: Integrating with Spring Cloud?__
Yes, this is possible. Camunda BPM offers a Spring Boot starter, so it is easy to hook it into the Spring universe including Spring Cloud. There are some examples using e.g. Spring Cloud Streams or also Spring Cloud to run Camunda on Cloud Foundry/PCF.

__Q: Do you have any hands-on experience with a heterogeneous Camunda architecture? If yes, do you have any suggestions or best practices?__

This question would need to be revised with more details. Almost every customer uses Camunda in a heterogeneous context. I could imagine this question is related to the next two: What if I don’t develop in Java?

__Q: You mentioned the benefits of embedded Camunda. In this scenario, what languages or tech stack is Camunda compatible with? We like our microservices written in Go and Node.JS.__

The Camunda engine is written in Java. So it is not possible to run it embedded as a library in any other language. Sorry :-(

__BUT:__ You can use Camunda from other languages. I wrote about that in 2017: [Use Camunda as an easy-to-use REST-based orchestration and workflow engine (without touching Java)](https://blog.bernd-ruecker.com/use-camunda-without-touching-java-and-get-an-easy-to-use-rest-based-orchestration-and-workflow-7bdf25ac198e). The main idea is: Camunda provides a REST API which allows you to code in whatever language you like and just talk [REST with Camunda:](https://docs.camunda.org/manual/latest/reference/rest/)

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/camunda-rest.png" alt="Camunda Rest" >}}

This works very well for a lot of customers in different worlds, like for example Go, Node.JS, C# and Ruby.

With the upcoming 7.13 release we further improved the experience by introducing two features:
[Camunda Run:](https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run/) A distribution of Camunda BPM that is highly configurable and doesn’t require you to have any Java know-how.
[OpenAPI Support (aka Swagger):](https://blog.camunda.com/post/2020/02/camunda-bpm-7130-alpha2-released/) This allows you to use the REST API from the programming language of your choice, for example by generating a client for it.

__Q: Is it OK to use Camunda with a full .NET solution?__

Yes, of course. See my answer to the last question, which also applies to .NET. We still do not provide a ready-to-be-used client library as a NuGet package, but we are not that far away anymore. And we plan to improve support for other languages over time too.

__Ready for more?__

Next week we’ll be diving into Camunda product-related questions. But if you can’t wait until the next blog, you can check out the original [here on my Medium site](https://blog.bernd-ruecker.com/microservices-webinar-faq-1a9741f4481c).
