+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-03-12T09:30:00+01:00"
title = "The Microservices Workflow Automation Cheat Sheet - Who owns your process model?"
+++

We recently shared [3 Common Pitfalls in Microservice Integration - and how to avoid them](https://camunda.com/learn/whitepapers/3-common-pitfalls/) and lots of you wanted more. So this four-part blog series takes us one step back to the things you’ll be considering before migrating to a microservices architecture and applying workflow automation. In this fourth and final post in the series, we’ll discuss why the physical ownership of process models is so important to ongoing success.

<!--more-->

You can find the [source code on GitHub](https://github.com/berndruecker/flowing-retail) for the simple order fulfillment application, introduced in the [first blog](https://blog.camunda.com/post/2020/02/the-microservices-workflow-automation-cheat-sheet/) in this series, available as the flowing-retail sample application which we use as an example in this blog.

__Ownership of process models__

Independent of the physical deployment of a workflow model (where the engine runs) it must be __crystal clear__ who is responsible for a certain model, where it is maintained and how changes are deployed.

In microservice architectures the ownership of a workflow model must be in the team owning the respective domain.

__In the flowing-retail example there are two workflow models:__

- Order fulfillment: This belongs to the order fulfillment business capability and has its home in the order microservice.
- Payment: This is owned by the payment microservice.

It is really essential that you distribute the ownership of parts of the business process fitting to your domain boundaries. Don’t do a BPM monolith — where e.g. the order fulfillment process handles business logic and other details related to payment — just because you do a workflow model.

__The “orchestration process”?__

I am often asked: “But where is the orchestration process?”
That’s easy -- In my understanding of microservices, there is no such thing as an orchestration process. Often, people mean end-to-end business processes, like order fulfillment in the above example. Of course, the end-to-end process is highly visible and important, but it is domain logic like everything else and goes into a microservice boundary in our example the order microservice. In that sense the order microservice containing end-to-end orchestration logic might be very important — but organized the same like other microservices as e.g. payment.

When saying “orchestration process,” some people mean domain logic that only involves the flow — so the respective microservice might not have other logic (no own data, no own programming code, etc.). That’s fine — but it should still be a microservice as even this logic needs clear responsibilities. And often the logic grows over time anyway.

__Summary__

- This topic is complex and there are no easy-to-adopt-in-all-scenario-answers. I hope this blog series gave you some orientation. Let’s quickly recap:
- You need to choose your communication style: Asynchronous, RPC-ish or work distribution using the workflow engine. Depending on that choice the workflow engine can perform different favors for you:
- The ownership of workflow models must be in the domain of the respective microservice. The workflow should clearly concentrate on that domain.
- You can run the workflow engine centralized or decentralized.
- Track or manage —you should strive for a balanced mix of choreography and orchestration.

__Interested in learning more?__

Watch Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation webinar, led by Bernd Ruecker, our Camunda Co-Founder and Chief technologist. He discussed how workflow automation supports the orchestration of microservices, ensuring seamless execution of business processes even in a case of a failure.

<!--HubSpot Call-to-Action Code --><span class="hs-cta-wrapper" id="hs-cta-wrapper-91976394-78e0-43f9-b003-c9a8e9fb9306"><span class="hs-cta-node hs-cta-91976394-78e0-43f9-b003-c9a8e9fb9306" id="hs-cta-91976394-78e0-43f9-b003-c9a8e9fb9306"><!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]--><a href="https://cta-redirect.hubspot.com/cta/redirect/4513465/91976394-78e0-43f9-b003-c9a8e9fb9306"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-91976394-78e0-43f9-b003-c9a8e9fb9306" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/4513465/91976394-78e0-43f9-b003-c9a8e9fb9306.png"  alt="Get the webinar recording here."/></a></span><script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script><script type="text/javascript"> hbspt.cta.load(4513465, '91976394-78e0-43f9-b003-c9a8e9fb9306', {}); </script></span><!-- end HubSpot Call-to-Action Code -->

This blog was originally published on [Bernd’s blog](https://blog.bernd-ruecker.com/the-microservice-workflow-automation-cheat-sheet-fc0a80dc25aa)  - check it out if you want to dive even deeper into microservices!
