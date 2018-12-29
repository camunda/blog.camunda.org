+++
author = "Daniel Meyer"
categories = ["Community"]
tags = ["Products", "Review"]
date = "2018-12-28"
title = "The Camunda Stack In 2018: The Year In Review"
draft = false
+++

The year is coming to an end, so I want to take a moment to consider the progress our product teams have made this year and, most of all, thank everybody for their fantastic work. We have achieved great things this year, taking major steps in our mission to set the standard for workflow automation technology that brings developers and business people together.

## Where we are coming from and what drives us

When we launched the Camunda open source project in 2013, we put forward a very [simple hypothesis]({{< ref "/post/2013/04/the-camunda-hypothesis.md" >}}): _Business process automation projects are most successful when software developers and business people work together_. In our opinion, only BPM software that enabled this was good BPM software.

At the time, this was quite provocative. Monolithic, black-box BPM suites were predominant, and they were difficult for developers to use (and business people didn’t fare any better). The industry was high on it’s newest designer drug: “Zero Code BPM”, spreading the idea that business people could create software without the need for software developers, all by waving the magic wand of BPM.

It is no false glorification to say that we were bucking the trend. And yet, provocative as it was, the Camunda Hypothesis could quickly be validated. Many organizations chose our open, lightweight frameworks over the existing closed suites, and the Zero Code BPM craze turned out to be nothing but a pipe dream.

At Camunda Con this year, Jakob presented [our vision]({{< ref "/post/2018/10/the-re-emergence-of-workflow-automation.md">}}) that, one day, every business process automation project in every organization will be using Camunda technology - either directly or embedded in another solution. This may sound like hubris at first, and obviously we are not there yet, but this is what motivates and drives us. When I look back at what our teams have achieved this year, I am happy and proud to say that in 2018, we took major steps towards realizing that vision.

## Evolving the Core Workflow Engine

I feel confident when I say that the Camunda Workflow Engine is the most complete and powerful BPMN 2.0 workflow engine currently on the market. It [implements every relevant BPMN symbol](https://docs.camunda.org/manual/7.10/reference/bpmn20/#coverage), has [sophisticated operations APIs](https://docs.camunda.org/manual/7.10/user-guide/process-engine/process-instance-modification/), integrates into any environment and has been highly optimized and battle tested for more than 5 year. And neither did the past year pass by without massive improvements in many different areas. Two of which I want to highlight:

Our biggest achievement is that it is now possible to use Camunda with other programming languages than Java in a seamless way. Thanks to the [external task pattern](https://docs.camunda.org/manual/7.10/user-guide/process-engine/external-tasks/) (which we pioneered more than two years ago with Camunda 7.4 but greatly enhanced in 2018) and [the ready-to-use clients](https://docs.camunda.org/manual/7.10/user-guide/ext-client/), there exists now a fully fledged solution for implementing Service Tasks in every programming language. This is extremely important, because the programming language landscape is becoming increasingly diverse, while the challenge to automate business processes remains universal. It is our conviction, that every developer should have access to a great workflow engine!

The second achievement I want to highlight doesn’t come in the shape of a shiny new feature, but hides under the cloak of plain hard work. A key strength of Camunda is that it [integrates into a broad range of technical environments](https://docs.camunda.org/manual/7.4/introduction/supported-environments/). To ensure that it stays current with evolving environments, the team has worked hard to support the most recent versions of these environments, such as Java 12, recent versions of every supported databases, application servers and browsers, and many more. This may sound self-evident, but everybody who has taken a peek behind the curtain of software development knows that it is truly not. Camunda is now supported on 7 databases, runs in 6 application servers and works with any version of Spring 3 to 5.1, and this is something that we are unashamedly proud of.

## Supporting Developers in the Open Source Community

Over the years, a vibrant community has formed around Camunda’s core. This community is very active in our [forum](https://forum.camunda.org/) and on [Github](https://github.com/Camunda), and keeps contributing numerous extensions and plugins to the core frameworks. In 2018, we have encouraged the community to get together for [meetups](https://camunda.com/events/meetups/) and [events](https://camunda.com/events/camundadays/) even more actively than in the previous years. There are now 16 meetup groups with more than 1100 members worldwide, which is beyond exciting. I want to express a big "Thank You!" to the many meetup organizers and our team at Camunda! Bringing the community together and supporting developers is an important and invaluable achievement that takes years of continuous work and enthusiasm.

We have also invested heavily in further exploring and describing usecases of workflow technology, particularly for new architectures such as [microservices](https://blog.bernd-ruecker.com/the-microservice-workflow-automation-cheat-sheet-fc0a80dc25aa), [distributed systems](https://berndruecker.io/lost-in-transaction/) and the [cloud](https://blog.bernd-ruecker.com/architecture-options-to-run-a-workflow-engine-6c2419902d91). Camunda’s co-founder [Bernd](https://berndruecker.io/) alone has spoken at more than 50 conferences and events. Read about it in [his personal review](https://blog.bernd-ruecker.com/developer-relations-at-camunda-2018-recap-cbf85f5abd19), which is a must-read anyway.

## Optimize: The Power of Analytics for Process Improvements

There is nothing more exciting than seeing a great new product being adopted like hotcakes. In April, we released [Optimize](https://docs.camunda.org/optimize/2.3/) 2.0, the first version providing key features such as reports and dashboards. As a result, Optimize has been adopted by many Camunda customers, and we are still receiving tremendously promising feedback.

Optimize is the first veritable “business tool” in the Camund stack, and the fact that it was adopted so quickly proves once more the value in enabling developers and business people to collaborate. This holds double when we take into account that Optimize does not focus on the modeling phase, but involves business stakeholders when processes are already in production.

We have an amazing team working on Optimize who have many exciting things in the pipeline for next year.

## Bpmn.io: Setting the Standard for BPMN and DMN Modelling

2018 was the year when the [bpmn.io](https://bpmn.io/) project became the de-facto standard in BPMN and DMN modelling. It has been adopted by a growing number of vendors besides Camunda and has a very active Open Source Community, which are the two pillars of continuous success. And yet, personally, I feel like we have only just begun to scratch the surface of what is possible with modelling and visualizing BPMN in the browser.

For now, read all about it in [Nico’s blogpost](https://bpmn.io/blog/posts/2018-year-in-review.html).

## Cawemo: Allowing Business and Technical Stakeholders to Collaborate on Diagrams

When we started [Cawemo (the Camunda Web Modeler)](https://cawemo.com) to provide a lightweight modeling tool for small teams, it was meant to be a side project. At the beginning of 2018, it was not a lot more than bpmn.io with a simple repository for project workspaces. But over the course of the year, the team added a number of advanced features such as [versioning and milestones](https://blog.cawemo.com/milestones-and-history/), as well as [permissions to control access to projects](https://blog.cawemo.com/collaborator-project-permissions/). Moving forward, Cawemo will be an integral part of the Camunda Stack: It will be available both on-prem and in the cloud, and allow developers and business people to edit BPMN diagrams and DMN decisions collaboratively.

Going back to the original Camunda Hypothesis about bringing developers and business people together, there is no end in sight to where we can go with Cawemo in 2019 and beyond.

## Zeebe: Redefining what is Possible with Workflow Automation

Our vision is that one day, every business process automation project uses Camunda technology. When we say “business process automation” project, this includes every project that implements a business process, including but not limited to traditional use cases of workflow technology. For example, settling trades at a financial trading platform requires “automating a business process” as well. However, advanced requirements re. throughput and latency have previously made it impossible to use a workflow engine for automating these processes, even though everybody agrees that a workflow engine would yield great benefits.

[Zeebe](https://zeebe.io) represents Camunda’s ambition to push the boundaries of what can be done with workflow automation, and thereby we redefine what workflow engines can achieve and how they work. This year, the team has made a huge leap towards achieving that mission. They have shown that [Zeebe can run more than a million transactions per second](https://zeebe.io/blog/2018/06/benchmarking-zeebe-horizontal-scaling/), and, in doing so, they have created a new class of workflow engine. To top this, [Zeebe’s cloud native architecture](https://docs.zeebe.io/basics/README.html) enables many additional benefits besides scalability, [read the complete summary in Mike's review blogpost](https://zeebe.io/blog/2018/12/zeebe-2018-year-in-review/).

## Goals for 2019

Of course we can’t reveal everything yet... but here are a few of our goals for 2019:

* Next year, we are reinforcing our efforts to support the Camunda developer and open source community. We will further improve developer tooling and target even more communities such as the C# and .Net community while still maintaining prime support for the Java ecosystem
* The popular [Camunda Assertions Library](https://github.com/camunda/camunda-bpm-assert) will be officially supported
* Cockpit will be further optimized for large enterprise deployments with powerful operator authorization and auditing features
* We are strengthening our offering for business stakeholders by building powerful analytics features in Optimize and establishing Cawemo as a key tool in the Camunda stack
* Finally we are targeting the first production-ready release of Zeebe. We will focus on building and supporting the Zeebe open source community, and we will provide further operations tooling around Zeebe

Can’t wait to get back to work :)
