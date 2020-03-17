+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-02-27T09:30:00+01:00"
title = "The Microservices Workflow Automation Cheat Sheet: The Role of the Workflow Engine"
+++
We recently shared [3 Common Pitfalls in Microservice Integration - and how to avoid them](https://camunda.com/learn/whitepapers/3-common-pitfalls/) and lots of you wanted more. So let's take one step back to the things you’ll be considering before migrating to a microservices architecture and applying workflow automation. In this second of our four-blog series, we’ll look at all things architecture - starting with three basic architecture alternatives to set up your microservices landscape.

<!--more-->

You can find the [source code on GitHub ](https://github.com/berndruecker/flowing-retail)for the simple order fulfillment application, introduced in the [first blog](https://blog.camunda.com/post/2020/02/the-microservices-workflow-automation-cheat-sheet/) in this series, available as the flowing-retail sample application which we use as an example in this blog.

__The role of the workflow engine — three architecture alternatives__

How can you set up an architecture using a workflow engine to create a balance between spreading your business process across multiple microservices and real visibility into the end-to-end process? Let’s simplify matters and assume we have a greenfield and only three architecture alternatives we can choose from (so no hybrid architectures or legacy).

1. Asynchronous communication by commands and events -- normally using a message or event bus
2. Point-to-point communication by request/response -- often REST
3. Work distribution by workflow engine

We’re not yet looking at whether to run the workflow engine centralized or decentralized, which is a separate question we’ll tackle in our next blog post.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/02/microservices-workflow-automation-cheat-sheet/workflow-engine.jpg" alt="shipment" >}}


__1: Asynchronous communication by commands and events__

This architecture relies on a central bus for asynchronous communication. Different microservices connect to this bus. Orchestration logic and respective orchestration flows are owned by the microservices. Workflows can send new commands to the bus  -- like “hey payment, please retrieve some money for me”. Or wait for events to happen --  “whoever is interested, I retrieved payment for O42”.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/02/microservices-workflow-automation-cheat-sheet/order-payment.jpg" alt="shipment" >}}

- Typical tools: Kafka, RabbitMQ (AMQP), JMS.
- What the workflow engine does: timeout handling, managing activity chains / the flow, support stateful [enterprise integration patterns](https://www.enterpriseintegrationpatterns.com/) like [aggregator](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html) or [resequencer](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html), consistency and compensation handling aka [Saga pattern](https://blog.bernd-ruecker.com/saga-how-to-implement-complex-business-transactions-without-two-phase-commit-e00aa41a1b1b), which I spoke about in greater depth at [JavaZone Oslo](https://2018.javazone.no/program/45df84d4-e819-4fc9-9e3b-931972891441).
- Implementation example: [https://github.com/berndruecker/flowing-retail/tree/master/kafka/java](https://github.com/berndruecker/flowing-retail/tree/master/kafka/java)
- Pro: Temporal decoupling of microservices.
  - Event-driven architecture applied right can reduce coupling; many failure scenarios (like e.g. response messages that are missing) are transparent to the developer, so they think properly about these situations.
- Con: Requires message or event bus as central component which is not easy to operate.
   - Lack of operations tooling for these components leads to effort going into homegrown “message hospitals.” Most developers are not so familiar with asynchronous communication.

__2: Point-to-point communication by request/response__

In this architecture you simply actively call other microservices, most often in a synchronous, blocking way. The most prominent way of doing this is REST. Endpoints are typically retrieved from a registry. The workflow engine can orchestrate the REST calls and also help with challenges of remote communication -- a topic I discussed in detail at QCon London.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/02/microservices-workflow-automation-cheat-sheet/rest.jpg" alt="shipment" >}}

Typical tools: REST, SOAP, gRPC; Could also be implemented with blocking messaging using request/reply queues e.g. in RabbitMQ.
What the workflow engine does: stateful resilience patterns (like stateful retry), timeout handling, managing activity chains / the flow, consistency and compensation handling aka Saga pattern as discussed in my talk Lost in Transaction.
Implementation example: https://github.com/berndruecker/flowing-retail/tree/master/rest
Pro: Easy to setup and understood by most developers; good tooling available.
Con: Calls look like they were local, so developers often forget about the complexity of distributed systems; requires resilience patterns to be applied (e.g. Circuit Breaker, Stateful Retry, etc.).

__3: Work distribution by workflow engine__

In this architecture the workflow distributes work among microservices, which means it becomes some kind of bus itself. Microservices can subscribe to certain work of a workflow and get tasks via some kind of queue.

{{< figure class="no-border"  src="https://blog.camunda.com/post/2020/02/microservices-workflow-automation-cheat-sheet/start-flow.jpg" alt="shipment" >}}

- Typical tools: External Tasks (Camunda BPM) or Workers (Zeebe).
- What the workflow engine does: communication channel, timeout handling, managing activity chains / the flow, consistency and compensation handling aka Saga pattern.
- Implementation example: [https://github.com/berndruecker/flowing-retail/tree/master/zeebe](https://github.com/berndruecker/flowing-retail/tree/master/zeebe)
- Pro: Easy to set up; good operations tooling.
- Con: Workflow engine becomes a central piece of the architecture and needs to be operated appropriately; communication between microservices only via workflows — or a second way of communication needs to established (e.g. REST or Messaging).

__Thoughts and recommendation__

It’s hard to give a clear recommendation without knowing the full background of an individual case.  Normally I try to figure out what is already established in the company and base my decision on gut feeling about what can be successful in that environment.

For example, if a customer doesn’t have any experience with Kafka or Messaging, it will be very hard to establish this on the go. So they might be better using a REST-based architecture, especially if, for example, they are deep into Spring Boot, making some of the challenges relatively easy to solve. However, if they strategically want to move towards more asynchronism, while I personally support that, I’d still want to make sure they are really able to handle it.

If a customer already embraces [Domain-driven design (DDD)](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) and events, or even leverages frameworks like Akka or Axon, an event-driven approach that includes the workflow engine may be the best option.

So, there is a wide range of possibilities, and I think all options can be totally valid. Ask yourself what fits into your organization, what tools you already have and what goals you are after. Don’t forget about your developers who have to do all the nitty-gritty hard work and need to really understand what they are doing. And don’t forget about operations to make sure you really have fun when going live.

In the next blog, we’ll be exploring more architecture and evaluating whether you should run a workflow engine centralized or decentralized.

This blog was originally published on [Bernd’s blog](https://blog.bernd-ruecker.com/the-microservice-workflow-automation-cheat-sheet-fc0a80dc25aa) - check it out if you want to dive even deeper into microservices!

### Interested in learning even more?

Join Bernd Ruecker, our Camunda Co-Founder and Chief technologist, for his upcoming webinar titled, [Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/) on Wednesday March 11th, 2020. He‘ll discuss how workflow automation supports the orchestration of microservices, ensuring seamless execution of business processes even in a case of a failure.

<!--HubSpot Call-to-Action Code --><span class="hs-cta-wrapper" id="hs-cta-wrapper-91976394-78e0-43f9-b003-c9a8e9fb9306"><span class="hs-cta-node hs-cta-91976394-78e0-43f9-b003-c9a8e9fb9306" id="hs-cta-91976394-78e0-43f9-b003-c9a8e9fb9306"><!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]--><a href="https://cta-redirect.hubspot.com/cta/redirect/4513465/91976394-78e0-43f9-b003-c9a8e9fb9306"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-91976394-78e0-43f9-b003-c9a8e9fb9306" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/4513465/91976394-78e0-43f9-b003-c9a8e9fb9306.png"  alt="Get the webinar recording here."/></a></span><script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script><script type="text/javascript"> hbspt.cta.load(4513465, '91976394-78e0-43f9-b003-c9a8e9fb9306', {}); </script></span><!-- end HubSpot Call-to-Action Code -->

If you can’t make it to the webinar, no worries. Sign up anyway and we’ll send you the recording as soon as it’s complete.
