+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-03-05T09:30:00+01:00"
title = "The Microservices Workflow Automation Cheat Sheet - to Centralize or Decentralize?"
+++

We recently shared [3 Common Pitfalls in Microservice Integration - and how to avoid them](https://camunda.com/learn/whitepapers/3-common-pitfalls/) and lots of you wanted more. So this four-part blog series takes us one step back to the things you’ll be considering before migrating to a microservices architecture and applying workflow automation. In this third post in the series, we’ll dive deeper into architecture and discuss whether it’s better to run a workflow engine centralized or decentralized.

<!--more-->

You can find the [source code on GitHub](https://github.com/berndruecker/flowing-retail) for the simple order fulfillment application, introduced in the [first blog](https://blog.camunda.com/post/2020/02/the-microservices-workflow-automation-cheat-sheet/) in this series, available as the flowing-retail sample application which we use as an example in this blog.

__Central or decentralized workflow engine?__

If you want to use the workflow engine for work distribution - like we discussed in the second [blog of this series](https://blog.camunda.com/post/2020/02/the-microservices-workflow-automation-cheat-sheet-the-role-of-the-workflow-engine/)  - , it has to be centralized. In the other alternatives you have two and a half options:

- Decentralized engines, meaning you run one engine per microservice
- One central engine which serves multiple microservices
- A central engine, that is used like decentralized ones.

A good background read on this is [Architecture options to run a workflow engine.](https://blog.bernd-ruecker.com/architecture-options-to-run-a-workflow-engine-6c2419902d91)

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/orchestrating-lambdas-using-camunda-cloud/monitoring.png" alt="monitoring" >}}

__Decentralized engines__

With microservices, the default is to give teams a lot of autonomy and isolate them from each other as much as possible. In this sense, it is also the default to have decentralized engines, one workflow engine per microservice that needs one. Every team can probably even decide which actual engine (product) they want to use.

- Implementation example: [https://github.com/berndruecker/flowing-retail/tree/master/kafka/java/order-camunda](https://github.com/berndruecker/flowing-retail/tree/master/kafka/java/order-camunda)
- Pro: Autonomy; isolation.
- Con: Every team has to operate its own engine (including e.g. patching); no central monitoring out-of-the-box (yet).

Typically monitoring is discussed most in this architecture: “How can we keep an overview of what is going on”?

It is most often an advantage to have decentralized operating tools. As teams in microservice architectures often do DevOps for the services they run, they are responsible for fixing errors in workflows. So it is pretty cool that they have a focused view where they only see things they are responsible for.

__Central monitoring with decentralized engines__

But often you still want to have a general overview, at least of end-to-end flows crossing microservice boundaries. Customers often build their own centralized monitoring, most often based on e.g. Elastic. 

You can now send the most important events from the decentralized engines (e.g. workflow instance started, milestone reached, workflow instance failed or ended) to it. The central monitoring just shows the overview on a higher level and links back to the decentralized operating tools for details. In other words, the decentralized workflow engine handles all retry and failure handling logic and the central monitoring simply gives visibility into the overall flow.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/orchestrating-lambdas-using-camunda-cloud/workflow-engine-monitor.png" alt="monitor" >}}


In our own stack we allow certain tools to collect data from decentralized engines, e.g. [Camunda Optimize](https://camunda.com/products/optimize/).
- Implementation example: A simplified example is contained in [https://github.com/berndruecker/flowing-retail/tree/master/kafka/java/monitor](https://github.com/berndruecker/flowing-retail/tree/master/kafka/java/monitor)

__One Central Engine__

To simplify operations, you can also run a central engine. This is a remote resource that microservices can connect to in order to deploy and execute workflows. Technically that might be via REST (Camunda BPM) or gRPC (Zeebe). Of course you could also leverage [Camunda Cloud](https://camunda.com/products/cloud/) as a managed workflow engine. 

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/orchestrating-lambdas-using-camunda-cloud/shipment.png" alt="camunda cloud" >}}


- Implementation example: [https://github.com/berndruecker/flowing-retail/tree/master/kafka/java/order-zeebe](https://github.com/berndruecker/flowing-retail/tree/master/kafka/java/order-zeebe)
- Pro: Ease of operations; central monitoring available out-of-the-box
- Con: Less strict isolation between the microservices, in terms of runtime data but also in terms of product versions; central component is more critical in terms of availability requirements.

If you want to use the workflow engine as work distribution you need to run it centralized.


__Central Engine, that is used like a Decentralized Engine.__

This approach requires explanation. What you can do in Camunda is to run the workflow engine as a library (e.g. using the [Spring Boot Starter](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/)) in a decentralized manner in different microservices. But you then connect all of these engines to a central database where they meet. This allows you to have central monitoring for free.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/orchestrating-lambdas-using-camunda-cloud/order2.png" alt="camunda cloud" >}}

- Pro: Central monitoring available out-of-the-box.
- Con: Less isolation between the microservices in terms of runtime data but also in terms of product versions, but actually moderated by features like [Rolling Upgrade](https://docs.camunda.org/manual/latest/update/rolling-update/) and [Deployment Aware Process Engine](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#job-execution-in-heterogeneous-clusters).

__Thoughts and recommendation__

I personally tend to favor the decentralized approach in general. It is simply in sync with the microservice values.

However, I’m fine with running a central engine for the right reasons. This is especially true for smaller companies where operations overhead matters more than clear communication boundaries. It is also less of a problem to coordinate a maintenance window for the workflow engine in these situations. So as a rule of thumb: the bigger the company is, the more you should tend towards decentralization. On top of organizational reasons, the load on an engine could also make the decision clear —as multiple engines also mean to distribute load.

Having the hybrid with a shared database is a neat trick possible with Camunda, but should probably not be overused. I would also limit it to scenarios where you can still oversee all use cases of the workflow engine and easily talk to each team using it.
Of course, you can also mix and match. For example, you could share one database between a limited number of microservices, that are somehow related, but other teams use a completely separated engine.

However, a much more important question than where the engine itself runs is about ownership and governance of the process models - which is exactly what we’ll be discussing in the fourth and final installment of this blog series!

This blog was originally published on [Bernd’s blog](https://blog.bernd-ruecker.com)  - check it out if you want to dive even deeper into microservices!


<!--HubSpot Call-to-Action Code --><span class="hs-cta-wrapper" id="hs-cta-wrapper-da776aec-b76e-4a90-a9b3-64d0f0033df7"><span class="hs-cta-node hs-cta-da776aec-b76e-4a90-a9b3-64d0f0033df7" id="hs-cta-da776aec-b76e-4a90-a9b3-64d0f0033df7"><!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]--><a href="https://cta-redirect.hubspot.com/cta/redirect/4513465/da776aec-b76e-4a90-a9b3-64d0f0033df7"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-da776aec-b76e-4a90-a9b3-64d0f0033df7" style="border-width:0px;" height="237" width="600" src="https://no-cache.hubspot.com/cta/default/4513465/da776aec-b76e-4a90-a9b3-64d0f0033df7.png"  alt="Save my spot"/></a></span><script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script><script type="text/javascript"> hbspt.cta.load(4513465, 'da776aec-b76e-4a90-a9b3-64d0f0033df7', {}); </script></span><!-- end HubSpot Call-to-Action Code -->


