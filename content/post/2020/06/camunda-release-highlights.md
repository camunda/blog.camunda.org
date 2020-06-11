+++
author = "Niall Deehan"
categories = ["Community"]
tags = ["Release notes", "7.13", "BPMN", "Camunda Run"]
date = "2020-06-11T10:00:00+02:00"
title = "Camunda Release Highlights"

+++

In the past few days, months of work by my fellow Camunda folk has resulted in a cavalcade of new releases - from big stuff like:

* [Camunda BPM 7.13.0](https://blog.camunda.com/post/2020/06/camunda-bpm-runtime-713-released/)
* [Camunda Modeler 4.0.0](https://blog.camunda.com/post/2020/06/camunda-modeler-4.0.0-released/)
* [Camunda Optimize 3.1.0-alpha2](https://blog.camunda.com/post/2020/05/camunda-optimize-31-alpha2-released/)

To smaller project releases

* [External Task Client 2.0.0 for NodeJS](https://blog.camunda.com/post/2020/06/camunda-bpm-713-side-projects-released/#nodejs-external-task-client-2-0-0)
* [Assert 6.0.0](https://blog.camunda.com/post/2020/06/camunda-bpm-713-side-projects-released/#assert-6-0-0)
* [Spring Boot Starter 7.13.0](https://blog.camunda.com/post/2020/06/camunda-bpm-713-side-projects-released/#spring-boot-starter-7-13-0)

Because all of this fast-paced release of software can be slightly overwhelming, I wanted to spend some time focusing on a few specific parts that I'm quite excited about.

<!--more-->

As part of the DevRel team I tend to look at features with an eye to the impact they can make in helping the developer community solve additional problems. A lot of features added to this release improve the experience and openness of the software we write for our community, and I'm excited to see what you think.

## Camunda BPM Run (aka Lil’ Camboot)

Up until now if you wanted to get started with Camunda, you’d either download the application server distro or you’d embed the engine with Spring Boot using start.camunda.com. In both cases you’d need a certain amount of understanding about Java - especially if you intended to configure the engine in any way. A little while ago we all got together to discuss how we could make it easier for the community members among us who are less inclined to use Java to get started with Camunda. As a result, [Lil’ Camboot](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/) (or Camunda BPM Run - as it became known) was born.

It’s a wonderful, tiny distribution of the Camunda Engine, Webapps and REST API, in which you can deploy models, scripts and decision tables without using Java. But more importantly you can now configure the Camunda Engine easily, in one file, without needing to code anything. This is going to take some of the hardest aspects of running Camunda in a non-Java shop away.

## OpenAPI Documentation

I was wondering about which new features people from the community were interested in using, so I decided to ask both our community members on the forum as well as people on twitter.

{{< figure class="no-border teaser" src="openapi-documentation.png" alt="OpenAPI Documentation">}}

It’s pretty clear that the OpenAPI implementation is a runaway favourite, but why?

In a similar vein to Camunda BPM Run - this feature may end up introducing a lot of new people to Camunda, specifically people who might see Camunda as “Java-Only” software. The documentation puts large parts of our existing REST API into an open standard that will let people explore the engine’s capabilities using Swagger as well as generating clients for their preferred languages. I’m particularly interested in finding out what kind of new technologies will be integrated with Camunda by the community, now that it’s so much easier.

{{< figure class="no-border teaser" src="swagger-editor.png" alt="Swager Editor">}}

## Modeling DMN is becoming easier.

The Camunda Modeler lets you model in BPMN, CMMN and DMN and, since BPMN is the oldest and most popular of the three, we’ve focused heavily on making the user experience the best of any modeling tool out there. Now it’s time to take some of the lessons we’ve learned from that experience to help improve the next most popular notation - DMN. An improvement we made quite a while ago for BPMN modeling, which had a big impact on the user experience, is auto-placement of BPMN symbols and now we’ve added it to DRDs (Decision Requirements Diagrams). As well as speeding up modeling, it also helps encourage good modeling practices.

{{< figure class="no-border teaser" src="modelling-dmn.png" alt="Modeling DMN is becoming easier">}}

## Standardizing REST endpoints for all Distros.

I spend a lot of my time quite happily helping answer questions on Camunda’s forum. Most of which come from new users. Because of this, I often become aware of seemingly small things that have a big impact on how people experience our software. One such pain in the neck is the fact that the REST end-point for Camuna’s spring boot distro was ___/rest___ while every other distro was ___/engine-rest___. That might seem like a small thing, but it made this really confusing when following tutorials and examples which would have differed based on what you were running Camunda on. With this new version, not only have we standardized the RESTendpoints to ALL be ___/engine-rest___ but we’ve also made it easier to specify your own endpoint in case you liked it the old way.

## So - whats next?

There is always more to come - in fact, both [Zeebe](https://zeebe.io/) and Operate are still being hammered away at. [Camunda Cloud](https://blog.camunda.com/post/2020/04/introducing-the-camunda-cloud-early-access-program/) is undergoing constant improvement and [Cawemo](https://blog.camunda.com/post/2020/04/cawemo-enterprise-on-premises-1-2-released/) releases continue to make big improvements to engine integration and modeling experience.

You can stay informed of the progress by visiting the [forum](https://forum.camunda.org/) for announcements or checking out the [blog](https://blog.camunda.com/) regularly.

Plus if you’d like to watch the product teams discussing all the details of the 7.13 release - check out the [Camunda BPM 7.13 Release Webinar](https://bit.ly/2Al2y89).
