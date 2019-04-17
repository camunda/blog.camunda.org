+++
author = "Bernd Rücker"
categories = ["Community"]
tags = ["Community"]
date = "2019-04-17T9:00:00+02:00"
title = "How to run Camunda on Pivotal Cloud Foundry (PCF)"
+++

[Camunda](https://camunda.com/) is a popular open source workflow engine that’s very lightweight and developer friendly. If you’re developing in Java you can use it embedded e.g. in [Spring Boot](https://spring.io/projects/spring-boot) applications. Otherwise you simply leverage its REST APIs and language clients, so Camunda can also be used in other programming languages. It can be integrated with basically every technology, including e.g. Kafka, RabbitMQ, REST or SOAP.

<!--more-->
Cloud Foundry is a popular Cloud runtime environment that can be used in the cloud via e.g. [Pivotal Web Services](https://run.pivotal.io/), but also allows you to run a cloud environment on-premise.

In a lot of customer scenarios both tools are used together. This blog describes [a tutorial walking you through the various steps to run Camunda on PCF](https://github.com/berndruecker/camunda-on-pcf), and all code is [available on Github](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#lines).

### Approaches and how-tos
There are many ways of running Camunda (I wrote about this in [Architecture options to run a workflow engine](https://blog.bernd-ruecker.com/architecture-options-to-run-a-workflow-engine-6c2419902d91)). But for this article I concentrate on the two recommended default architectures:

{{< figure class="no-border teaser" src="camunda-on-pivotal-cloud-foundry.png" alt="camunda on pivotal cloud foundry" >}}

1. Embed Camunda into your Spring Boot application. This setup is only possible if you develop your applications (or microservices) in Java. If you use Spring Boot, this approach is great as Camunda will be integrated using a proper [Spring Boot Starter](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/) alongside typical Spring Boot best practices. So this is a easy to get-started setup which comes naturally for Spring Boot users.
  - There is a [step-by-step how-to available](https://github.com/berndruecker/camunda-on-pcf/tree/master/spring-boot-embedded-engine-sample) for this approach.
  - There is a [screencast available walking you through this approach](https://www.youtube.com/watch?v=va2uf-RRhPs).
  <br><br>

2. Run Camunda as service and connect to it via [REST API](https://docs.camunda.org/manual/latest/reference/rest/) and [External Tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/). This is the default approach that works in every stack, so you can use the programming language of your choice. This approach requires you two do two things:
  1. Run Camunda itself as own PCF deployment. This is necessary as there is not yet a managed service providing Camunda in the cloud (but Camunda is currently working on it).

      - There is a [step-by-step how-to available](https://github.com/berndruecker/camunda-on-pcf/tree/master/engine-as-a-service) to do this.
      <br><br>
  2. Deploy your own application including the workflow.
      - There is an example available including a [step-by-step how-to for Node.JS](https://www.youtube.com/watch?v=e0rdC8ElxLk)
      - There is a [screencast available walking you through this approach using the Node.JS sample](https://www.youtube.com/watch?v=va2uf-RRhPs)

I hope this gives you a good starting point for your Camunda on PCF endeavor.
## Camunda Optimize
[Camunda Optimize](https://camunda.com/products/optimize/) is a business analysis tool that can make sense of data in Camunda workflow engines. You can also run Optimize as PCF deployment.
  - There is a [step-by-step how-to available for this approach](https://github.com/berndruecker/camunda-on-pcf/tree/master/optimize-as-a-service).
  - There is a [screencast available walking you through this approach](https://www.youtube.com/watch?v=w_EOtS9-pWU).

## Why not Docker?
In order to run applications on PCF you leverage so called build packs, for Camunda that's the [Java build pack of PCF](https://github.com/cloudfoundry/java-buildpack),  available by default. [Camunda also provides docker images](https://github.com/camunda/docker-camunda-bpm-platform). While you can run docker images on PCF, it [isn’t their recommend way](https://docs.pivotal.io/tiledev/2-2/bosh-release.html):

_"While this [Docker] is a great, easy way to deploy your service on PCF, we do not recommend this as a long-term, production-ready solution. There is really no benefit of running your service in containers on the VMs, and it does have a number of operational (“day 2”) drawbacks:_

  - _You introduce more software (Docker) which needs to be kept up-to-date, and has the potential for issues, downtime, and security vulnerabilities._
  - _You can no longer take advantage of the patching capabilities of PCF for stemcells and application dependencies, such as frameworks and libraries. Instead, you become directly responsible for managing all software that is in the Docker images you deploy."_

### Conclusion
It is easy to run Camunda on Cloud Foundry by leveraging the Java build pack. This can be mastered also by non Java people. The step-by-step how-tos should help you get started.
