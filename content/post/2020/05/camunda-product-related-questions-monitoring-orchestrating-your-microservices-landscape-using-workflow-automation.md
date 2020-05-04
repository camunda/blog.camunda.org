+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-05-04T08:00:00+01:00"
tags = ["Microservices"]
title = "Camunda product-related Questions: Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation"
+++

Back in March, I conducted the webinar: “[Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/)”. Not only was I overwhelmed by the number of attendees, but we also got a huge list of interesting questions before and, especially, during the webinar. I was able to answer some of these, but ran out of time to answer them all. So I want to answer all open questions in this series of seven blog posts - you can click on the hyperlinks below to navigate to the other entries.

In this blog, we’ll be exploring Camunda product-related questions

1. [BPMN & modeling-related questions (6 answers)](https://blog.camunda.com/post/2020/04/webinar-faq-part-1-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
2. [Architecture related questions (12)](https://blog.camunda.com/post/2020/04/architecture-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
3. [Stack & technology questions (6)](https://blog.camunda.com/post/2020/04/stack-and-technology-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
4. __Camunda product-related questions (5)__
5. Camunda Optimize specific questions (3)
6. Questions about best practices (5)
7. Questions around project layout, journey and value proposition (3)

__Q: What is the difference between Camunda BPM and Zeebe?__

There were a few different ways people asked the same question: How do you position Camunda BPM vs Zeebe in relation to this presentation? Is Camunda BPM still the best/most reliable solution for microservice architecture with orchestration flows? Or is Zeebe the recommended route for such a new project?

To get everybody on the same page first, within Camunda we have two open-source workflow engine projects:
- [Camunda BPM](https://github.com/camunda/camunda-bpm-platform): A BPMN workflow engine that persists state via a relational database. The engine itself is stateless and if you [cluster the engine all nodes meet in the database](https://docs.camunda.org/manual/latest/introduction/architecture/#clustering-model).
- [Zeebe](https://zeebe.io/): A BPMN workflow engine that persists state on its own (kind of event sourcing). Zeebe forms an own-distributed system and replicates its state to other nodes using a RAFT protocol. If you want to learn more about it, check out [Zeebe.io — a horizontally scalable distributed workflow engine](https://blog.bernd-ruecker.com/zeebe-io-a-horizontally-scalable-distributed-workflow-engine-45788a90d549).

Camunda BPM is our fully featured BPM platform that covers a wide range of use cases across different industries. Zeebe, on the other hand, is the engine that powers [Camunda Cloud](https://camunda.com/products/cloud/), our managed workflow service (workflow as a service). We have built Zeebe to allow horizontal scaling, to run smoothly in cloud-native environments and to not require any third party dependency like a database. This is great, but also harder to operate for many companies that are not yet fully invested in cloud-native architectures. And of course, Zeebe does not yet have all the features of Camunda BPM.

So my recommendation is to use Camunda BPM unless you want to use Camunda Cloud, which then means you should use Zeebe.

I would however try to use [External Tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) as much as possible in Camunda BPM. This will set your application up to be architecturally ready for future migrations. One customer, for example, wanted to leverage the managed services and thus migrated from Camunda BPM to Camunda Cloud — and it was a relatively easy endeavor because of this.

__Q: Can we manage a large number of instances?__

Yes. But it always depends.

First of all: does this large number of instances wait most of the time? Or does it refer to a large number of requests?
Then: What is a large number? 100? 1,000? 1,000,000? Per Day? Per Hour? Per Second?

In our best practice [Performance Tuning Camunda](https://camunda.com/best-practices/performance-tuning-camunda/), we gave some recommendations on how to load test and tune the engine. The only reliable way to give a good answer is to set up a load test that mimics the patterns you will need. So far we were able to make every scenario we encountered work :-) A good resource to learn that you can scale quite far is also the [24h Fitness case study](https://camunda.com/case-studies/featured-24-hour-fitness/).

__Q: Is it possible to use Camunda BPM for microservices swarm orchestration and data flow regulation in hi-load systems (25M events per day)? How can we exclude or optimize the DB (as a bottleneck) from the processes?__

This relates to the last question but is more precise on the numbers. So doing the math, 25M events are approx. 300 events per second. I have no idea about the load distribution, but normally you always need to look at peaks too, so let’s assume 500.

Now I don’t know what these 500 events do within Camunda, but for simplicity, let’s assume they are correlated as messages, so every event leading to one request within Camunda.

In that ballpark, it makes sense to have a closer look at performance and I would recommend doing a proper load test. If you find it is still possible to tune the engine, e.g. [adjust the database indices](https://camunda.com/best-practices/performance-tuning-camunda/#_tuning_database_queries) (if you know what you are doing) or [reducing the amount of history data](https://camunda.com/best-practices/performance-tuning-camunda/#_history_backend) being written.

But I want to repeat myself: so far we were able to make every scenario we encountered work :-) [Best talk to us about your concrete use case](https://zeebe.io/enterprise/).

__Q: How to design high-performance large volumes business processes? Especially large digital transformation projects specific to 5G business. Currently working on POC for German telco in 5G for BSS stack using Camunda?__

This kind of relates to the last question and requires a deeper look into the specific scenario. Please reach out to us to discuss this.

__Q: What are the most significant enterprise features of Camunda that enable workflow orchestration which are not present with the community version?__

The good news is, that there is no significant feature missing in the community edition, that would stop you from doing microservices orchestration. It is important for us that our community edition is usable in real-life scenarios!

That’s said, of course, we need to provide enough motivation to go for the enterprise edition to pay everybody’s salary. This is mostly about all the additional tooling you need if you apply Camunda in bigger and mission-critical scenarios: features in the operations tool around diving into historic data, fixing problems at scale, migrating versions and so on. And Camunda Optimize as the analytic tool is also enterprise only.

On top of that, of course you get support, more access to our consulting services, additional warranties and further patches for old versions.

You can find a [comparison table here.](https://camunda.com/enterprise/)

__Ready for more?__

Next week we’ll be diving into Camunda Optimize specific questions. But if you can’t wait until the next blog, you can check out the original [here on my Medium site.](https://blog.bernd-ruecker.com/microservices-webinar-faq-1a9741f4481c)
