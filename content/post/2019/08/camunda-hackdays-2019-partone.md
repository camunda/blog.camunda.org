+++
author = "Niall Deehan"
categories = ["Community"]
tags = ["extension", "hackdays"]
date = "2019-08-20T01:00:00+01:00"
title = "Camunda hackday projects 2019: Getting Started and External Tasks"
+++

Each year the coding inclined residents  of Camunda towers embark on a 3-day adventure into a realm of big ideas and hacky solutions. Its starts months before when a list of potential project ideas is created. Then as the hackdays approach people find ideas that they like and teams form until the day of reckoning arrives and we all gather together to see if we can realize the lofty ambition of creating a working prototype over the course of about 60 hours. 

We had some unifying themes these this year and I'm going to write each post on the projects that are (sometimes loosely) related to that theme. In this post I'll discuss projects that help users get started with Camunda and also improvements for external tasks. 

<!--more-->
## Getting Started
This theme focused on the idea of helping someone who is getting started with Camunda. Each project is very different but in each case it tries to quickly help people build and understand a camunda project.. 

### How to dramatically over-engineer a getting started guide
This project aims to answer the question “What would happen if backend devs had to build a frontend project” the answer is a 500MB ``node_modules`` folder and ``pom.xml`` file that goes beyond 1000 lines. What do you get for that? Nine buttons and about 5 web pages. In this project [myself](https://twitter.com/NiallDeehan), [Basti](https://twitter.com/sebwarnke) and [Felix](https://github.com/anhaltFelix) all worked on a getting started guide for camunda that is actually orchestrated by a Camunda process. Built using Springboot and React through [JHipster](https://www.jhipster.tech/) the user was guided through a getting started guide where we could observe or change the potential paths via a camunda process

{{< figure src="overengineered-getstarted-cockpit.png" alt="Cockpit">}}

{{< figure src="overengineered-getstarted-frontend.png" alt="frontend">}}

If you want to see how so much code can produce such little impact, luckily it's [here on github](https://github.com/NPDeehan/CamundaGettingStarted)

### Start Camunda BPM (improved getting started experience)
Currently if you're interested in getting started with Camunda and Springboot we have a great [spring boot starter](https://github.com/camunda/camunda-bpm-spring-boot-starter) for you to use. But that does still require that you have some idea about how to add things to a spring boot project. Adding version numbers, editing pom.xml files, this apparently was all too much for [Tassilo](https://github.com/tasso94). So he created really a fantastic way to let users choose the kind of project they want to create through a GUI and then lets you inspect and download a working spring boot project based on your requirements! I'm already looking into putting this into production...

{{< figure src="tassiloGetStarted.png" alt="tassilofrontend">}}

You can [find the project here](https://github.com/tasso94/start-camunda)

### Camunda Playground
The idea of this project is wonderful and challenging: "Try out and explore Camunda in minutes, not hours." Camunda BPM has become such a generic tool that sometimes it can be hard to know exactly where to start. Here, our great pioneer [Nico](https://github.com/nikku) teamed up with our man in black [Philipp](https://github.com/philippfromme) to create a really engaging visual guide through the Camunda Stack, starting with the [Camunda modeler](https://camunda.com/download/modeler/) you're guiding through the concepts of BPMN as well as automation and the Camunda webapps. 

{{< figure src="camundaplayground.png" alt="playground">}}

I can not recommend more that you should [give it a spin right](https://github.com/nikku/camunda-playground)


## External Tasks
[External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) are a pattern concept used by both Camunda and Zeebe, although with different implementations. But this idea is that business logic is abstracted out of the orchestrator to somewhere else in order to give it independence regarding implementation and release cycles. It's fast becoming the most popular way to use Camunda BPM so not surprising to see some interest during the hackdays. 

### gRPC API for External Tasks in BPM Runtime
At the moment, external tasks that connect to Camunda BPM use the REST API. This generally works quite well, although things like long polling needed to be implemented by us. If we used gRPC instead of REST this wouldn't be required. As a fun experiment [Tobias](https://github.com/tmetzke) decided to try to find out what other benefits could come out of introducing a gRPC API for Camunda's external task as well as making it easy to kick off with a spring boot starter
```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-grpc-external-task</artifactId>
  <version>3.3.1</version>
</dependency>
```
Tobias also created [client and service examples](https://github.com/tmetzke/camunda-bpm-grpc-external-task/tree/master/example). You can find the whole project [right here](https://github.com/tmetzke/camunda-bpm-grpc-external-task).


### Module to inject reflect into your node process.
As projects are moving towards microservices and microservice orchestration, the question of monitoring starts to come up more and more. When using a monolithic architecture you could be happy in the knowledge that if one thing is down - everything is down. :) Distributed systems are not as polite as to entirely crash out all together, so [Linus](https://github.com/linus-amg) decided to looking adding a node module that can be added to your external tasks in order to keep track of them. But far more than that! He created a dashboard where you can view all your works as well as restart, terminate and even update them.

{{< figure src="linusReflect.png" alt="reflect">}}

This is something a lot of people have been asking for and i think it's a step in the right direction. [try it out here](https://github.com/linus-amg/reflect-injector)


In the next installment I'll write about the hackday projects that I'll crowbar into the themes of "Fun and Productive"

