---
title: "Camunda Spring Boot Starter 2.3.0-alpha1 Released"
date: "2017-10-06"
author: "Svetlana Dorokhova"
tags: ["Release Note"]
categories: ["Execution"]
---

We are excited to announce the release of a new Alpha version of the Camunda Spring Boot Starter.

As announced at the Community Day in September, the Spring boot starter is now **an official part of Camunda BPM**. This includes support for our enterprise customers. 
<!--more-->
This decision was made based on the overwhelmingly positive feedback we got from the community and the fast level of adoption the extension has had.
First of all, we want to take this opportunity to thank [Oliver Steinhauer and the many other contributors](https://github.com/camunda/camunda-bpm-spring-boot-starter/graphs/contributors), who have made the spring boot starter into what it is today. In particular, we also want to thank [Jan Galinski](https://twitter.com/jangalinski) from Holisticon, who not only contributed a lot to this project in the past, but also took the time to visit us in our Berlin office to review the codebase with us and help us to take over responsibility for it. We took this picture during those days:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We&#39;re super HAPPY to have <a href="https://twitter.com/jangalinski?ref_src=twsrc%5Etfw">@jangalinski</a> visiting our office to work on the Spring Boot extension with our awesome developer Svetlana 😀! <a href="https://t.co/KFhsSQvIOW">pic.twitter.com/KFhsSQvIOW</a></p>&mdash; Camunda BPM (@CamundaBPM) <a href="https://twitter.com/CamundaBPM/status/893474361365209088?ref_src=twsrc%5Etfw">August 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

# This Release

The current release does not implement new features. Is mostly concentrated on including the project in the Camunda development lifecycle:

- The project will continue to be maintained in the existing [repository on Github](https://github.com/camunda/camunda-bpm-spring-boot-starter).
- Issues are now tracked in the [Camunda Jira](https://jira.camunda.com/browse/CAM)
- Documentation from now on can be found on the [Camunda docs page](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/), including a [Getting Started Guide](https://docs.camunda.org/get-started/).

Here are some changes:

* The `groupId` for Maven dependencies has changed, it is now `org.camunda.bpm.springboot`. For example:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp</artifactId>
  <version>2.3.0-alpha1</version>
</dependency>
```

* New Maven artifact for EE Webapps: `camunda-bpm-spring-boot-starter-webapp-ee` (documented [here](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/webapps/#enterprise-webapps))
* Default values for some configuration parameters have changed: the history level is now FULL by default, UUID-Generator is used for id generation by default.

# Future Direction

The scope will continue to be:

* Core starter - includes engine only
* Starter for REST API
* Starter for Camunda Web applications
* Starter for EE Web applications (including enterprise plugins, reserved for enterprise customers)

## Release cycles

The Camunda Spring Boot Starter will continue to have its own versioning (2.3.0, 2.4.0, etc.). However, each minor Camunda BPM release will automatically mean the release of 
a new Spring Boot Starter version. 

Version 2.3.0 will use Camunda BPM 7.8 by default. In a similar way, one could expect that Spring Boot Starter v 2.4.0 will rely on Camunda BPM 7.9.

# Stay with us

We're extremely excited on how much the community was involved in the project so far, and hope that this won't stop in the future. You're always welcome with your ideas for new features, your feedback regarding usage experience and of course contributions in the codebase is highly appreciated.