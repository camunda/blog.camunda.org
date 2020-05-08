+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-05-11T08:00:00+01:00"
tags = ["Microservices"]
title = "Camunda Optimize-specific Questions: Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation"
+++

Back in March, I conducted the webinar: “[Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/)”. Not only was I overwhelmed by the number of attendees, but we also got a huge list of interesting questions before and, especially, during the webinar. I was able to answer some of these, but ran out of time to answer them all. So I want to answer all open questions in this series of seven blog posts - you can click on the hyperlinks below to navigate to the other entries.

In this blog, we’ll be exploring Camunda Optimize-specific questions

1. [BPMN & modeling-related questions (6 answers)](https://blog.camunda.com/post/2020/04/webinar-faq-part-1-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
2. [Architecture related questions (12)](https://blog.camunda.com/post/2020/04/architecture-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
3. [Stack & technology questions (6)](https://blog.camunda.com/post/2020/04/stack-and-technology-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
4. [Camunda product-related questions (5)](https://blog.camunda.com/post/2020/05/camunda-product-related-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)
5. __Camunda Optimize-specific questions (3)__
6. Questions about best practices (5)
7. Questions around project layout, journey and value proposition (3)

__Q: Is Camunda Optimize Event-Mapping/Ingestion available now? Open-source or as a product? Are there any plans in the future to provide a community edition of Optimize?__

Process events monitoring [was released with Optimize 3](https://blog.camunda.com/post/2020/04/announcing-camunda-optimize-3.0/) and is already available today.
There is no community edition available of [Camunda Optimize](https://camunda.com/products/optimize/) and there are no plans to provide one.

That’s said there is a [free trial version available](https://camunda.com/download/enterprise/) and I could imagine we will also have ways to easily leverage Camunda Optimize in Camunda Cloud soon (maybe even a free tier? But nothing I can promise!).

__Q: In the Optimize demo, you created a process and mapped it to the Kafka events. Did you deploy it to a Camunda engine which provided Camunda history events to Optimize? If so, is that Camunda engine part of Optimize?__

No, Camunda Optimize just needs Elasticsearch as a data store. It does not need any workflow engine to do process events monitoring.

__Q: Maybe instead of calling it “Process Discovery”, how about the buzzword-compliant “Process Mining”?__

Let’s quote Wikipedia:
Process mining is a family of techniques in the field of [process management](https://en.wikipedia.org/wiki/Process_management) that support the analysis of [business processes](https://en.wikipedia.org/wiki/Business_process) based on event logs. During process mining, specialized data mining algorithms are applied to event log data in order to identify trends, patterns and details contained in event logs recorded by an information system.

Process discovery is one of these techniques, which can derive a process model from all the events you ingest. And this is what I talked about in the webinar: We want to add process discovery to the product (and we already had a working prototype).

Additionally, I would not (yet) call Optimize a fully-fledged process mining tool — but I know that I am often too honest for this world and some other vendors don’t care about exact category boundaries too much ;-)


__Ready for more?__

Next week we’ll be taking a closer look at best practices. But if you can’t wait until the next blog, you can check out the original [here on my Medium site](https://blog.bernd-ruecker.com/microservices-webinar-faq-1a9741f4481c).
