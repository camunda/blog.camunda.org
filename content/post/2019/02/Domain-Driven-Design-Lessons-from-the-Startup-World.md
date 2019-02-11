+++
author = "Charley Mann"
draft = false
categories = ["Community"]
tags = ["BPMN"]
date = "2019-02-08T13:00:00+01:00"
title = "Domain Driven Design: Lessons from the Startup World"
+++

We recently hosted the Domain Driven Design Berlin Meetup: Real World Domain Driven Design Example from the Startup World... and why this architecture failed in the end.

Our speaker for the evening, the talented [Sandra Ahlgrimm](https://twitter.com/skriemhild), Cloud Advocate at Microsoft, walked us through an [interesting real-life case study](https://www.slideshare.net/sandramarlii/real-world-domain-driven-design-example), brimming with DevOps lessons. Here’s our key takeaways from this insightful evening

<!--more-->

###Lesson #1: Don’t expect startup IT to be full of Greenfield opportunities for DDD

Sandra’s presentation focused on a real-life scenario that she experienced when she joined a growing, specialist pharmaceutical startup that needed to scale its IT architecture, fast. It was around 1.5 years old and had experienced colossal expansion, yet still operated on a monolith running Java EE, which was simply not able to keep pace.

Working as part of a five-strong DevOps team, supported by a handful of freelance developers, her role was to enable greater agility and flexibility of the IT structure, so the startup could grow more rapidly.

Sounds like a great Greenfield opportunity in theory, but in practice Sandra’s team had to maintain the existing monolith with no access to the source code. Luckily a REST API was available. This forced them to think creatively so that the software solution interacted with the legacy platform until every functionality was rebuilt.

###Lesson #2: Walk a mile in your users’ shoes

The startup was structured into three physically separate units: a laboratory where pharmaceuticals were produced and tested; a warehouse that managed storage and logistics; and an administration arm that handled the day-to-day running of business.

Naturally Sandra and her team, and even the startup’s CEO, assumed they could add the most value to the laboratory. However, working two days on the ground in the warehouse, to gain a better understanding of business needs, she discovered that it was the warehouse that would gain the greatest benefit from digital transformation.

The warehouse suffered from extremely slow processing, because the IT architecture ran on a single Windows server with one massive spreadsheet acting as the database. It would take upwards of 10 minutes to get a response from the server and many orders were simply lost in the ether, with no records being kept. In fact, pickers still worked from printed article lists, which were easily duplicated and corrupted.

###Lesson #3: Think big - but start small  

Understanding the needs of the end users, Sandra wanted to model a software solution for the warehouse where individual warehouse pickers could receive job instructions to a handheld device, based on real-time orders, and turned to [event-sourcing](https://martinfowler.com/articles/201701-event-driven.html) to achieve this.   

Part of the event-driven programming ideology, event-sourcing removes the need for a traditional database and instead places the event store as the principal source of truth. Doing away with a database suits scenarios where end users don’t need to run regular queries – such as the warehouse’s pickers.

To handle the constant stream of real-time data submitted to the warehouse, Sandra implemented Command Query Responsibility Segregation (CQRS) architecture which, as the name suggests, splits the query (read) and command (write) models. Again, ideal for a scenario where you deal with one state more than another. In the case of the warehouse, reads far outweighed the writes.

Be aware that CQRS can be tricky to get right. Martin Fowler, [in his blog on the subject](https://martinfowler.com/bliki/CQRS.html), advocates caution, as it can add an unnecessary layer of complexity unless you are already working with an extremely complex system within a DDD framework.   

###Lesson #4: Culture can kill your software architecture

So why did this project ultimately fail? After all, the software and architecture worked perfectly in production.

In the end, two members of Sandra’s DevOps team left the project and their replacements had different experiences and ideas on ways the project could be executed, sidelining her code.

Even though it’s not in production, you can [read Sandra’s code on Gitlab](https://gitlab.com/SandraKriemann/Microservice-Picking-Usecase), where she’s shared the entire project – which also formed part of her Master’s thesis.

###Want to learn more? Great!

Our Co-founder Bernd Rücker recently spoke at [Domain Driven Design Europe](https://dddeurope.com/2019/) - the largest gathering of DDD aficionados in Europe, focussed on the professional implementation of building software systems for complex domains. He shared his thoughts and experiences on strategies to [manage consistency across boundaries](https://www.slideshare.net/BerndRuecker/ddd-europe-2019-lost-in-transaction), and recipes that ease the management of the right level of consistency, allowing you to focus on business logic code.

If you have any questions or need further insights to get your workflow process running smoothly, visit the [Camunda Forum](https://forum.camunda.org/), where our team can help you.  
