+++
author = "Jakob Freund"
draft = false
categories = ["Community"]
tags = ["BPMN","Microservices Orchestration"]
date = "2019-02-11"
title = "Why Camunda is not covered in the Gartner iBPMS MQ"

+++

Gartner has recently released the latest version of their [Magic Quadrant for Intelligent Business Process Management Suites (iBPMS)](https://www.gartner.com/en/documents/3899484/magic-quadrant-for-intelligent-business-process-manageme). You will not find Camunda BPM in that MQ, and in this blog post, I want to explain why.

Despite rumours to the contrary, Gartner will look at your product even if you’re not a paying customer. So although we aren’t Gartner customers, they reached out to us in June last year announcing that a new version of the MQ was in the making and they were considering including Camunda BPM, since it is coming up more and more often in client conversations. They have a standardized approach to this, and in the first step they asked us if we believe our product qualifies for the MQ. Here is what I replied:

<!--more-->
{{< figure class="main teaser" src="camunda-gartner.png" alt="Camunda-Gartner">}}

So why would I say that?

First, it’s important to understand that “iBPMS” is not actually a software category, it is a term invented by Gartner a few years ago and has never been picked up by anyone else (to illustrate this, here’s [a google trend report comparing search volumes for “iBPMS” vs “Camunda”](https://trends.google.com/trends/explore?date=all&q=ibpms,camunda)).

In the beginning of the report, Gartner defines an iBPMS as:
*An iBPMS is a type of high-productivity (low-code/no-code) application development platform.*

And this is exactly what Camunda BPM is not and was never meant to be.

When we started Camunda BPM in 2013, we followed our hypothesis that the existing BPMS products in the market implemented a flawed approach, which is exactly the approach Gartner describes to define an iBPMS.

Our reasoning was this:

Those iBPMS products do not deliver on their promise that less tech savvy “citizen developers” could actually implement core business process automation solutions in a 100% model-driven fashion. In conclusion, iBPMS users have to revert back to their IT departments and ask them to assign professional software developers to do the job.

Those software developers would then need to learn a proprietary, vendor-specific way of application development. Developing this skill takes a long time, is often a frustrating experience and the hard-earned skill needs to be continuously maintained. In conclusion, there is often a lack of sufficiently skilled software developers within in the organization, which forces iBPMS customers to look for outside resources.

Those outside resources are system integrators that partner with the iBPMS vendor and provide consultants certified by that vendor. Those consultants are either not as skilled as promised, too expensive, or simply not available, and often all of that at the same time.

Another problem we saw is indicated by the “S” in iBPMS which stands for “Suite”, meaning that those products are meant to cover all aspects of an application technology stack, from the UI layer over the application layer, to the persistence layer. You are not supposed to use this kind of product in a headless fashion and just integrate it with your own UI layer, or use it with your preferred application server, or your preferred database, or basically anything that is not part of the suite already.

So we defined Camunda BPM as a developer-friendly, open source alternative, and this works pretty well. While Gartner state in their MQ report that:

*The growth of the overall BPMS market was modest in 2017.*

Our revenue has been growing more than 80% year over year since we launched our product in 2013. Ironically, this growth is to some extent fueled by organizations that signed up with Camunda in order to replace almost half of the products listed in the Gartner iBPMS MQ.

Another analyst firm that literally put Camunda on their radar last year is Thoughtworks, one of the biggest and most highly respected consulting firms in the software development space.

[They recommend assessing Camunda in their latest technology radar](https://www.thoughtworks.com/radar/languages-and-frameworks/camunda) and their reasoning is at complete odds with the way Gartner defines an iBPMS:

**_We tend to be quite skeptical of business process model and notation (BPMN) tools in general as they're often associated with low-code environments and their downsides. Although the OSS BPMN framework Camunda provides some of this whizziness, it also offers workflow and decision engines that can be directly integrated as a library in your Java code. This makes it easy to test, version and refactor workflows. Camunda also integrates with Spring and Spring Boot, among other frameworks, making it a solid choice._**

So in a nutshell, Thoughtworks recommends looking at Camunda because it’s anything but a low-code platform, which is exactly how Gartner defines an iBPMS.

Furthermore, Camunda was recently mentioned by infoQ, a media outlet covering important software architecture matters. They have put the category “(Lightweight) workflow and decision automation platforms”, a category defined by Camunda, in the early adopter stage of [their technology adoption lifecycle graph](https://www.infoq.com/articles/architecture-trends-2019).

One of their experts explains this as follows:  

*Workflow platforms like Camunda. I think they are very important in microservices or distributed systems with more complex business logic.*

And this brings us to the last and, in the future, perhaps most critical design problem of the iBPMS concept: these products are too heavyweight to be embedded in distributed microservices.Their core architecture is too monolithic and not sufficiently scalable to be used as a non-invasive layer for process events monitoring and microservices orchestration.

I hope I have explained why Camunda is not willing to compromise on our product in order to be listed in the Gartner iBPMS MQ. That being said, I want to emphasize that Gartner is a trusted advisor to more than 15,000 organizations globally. I highly respect them for their business competence, and at the end of the day if what you want is an iBPMS, then you should of course look at the iBPMS MQ for guidance.

Perhaps one day Gartner will define a magic quadrant for “workflow and decision automation” or “microservices orchestration” products, and if that should ever happen, you know where to find Camunda. :-)
