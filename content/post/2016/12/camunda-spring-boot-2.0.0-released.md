+++
author = "Jan Galinski"
categories = ["Execution"]
date = "2016-12-09T12:00:00+02:00"
tags = ["extension"]
title = "Camunda BPM SpringBoot 2.0.0 released"
+++

Today is a great day for the camunda spring boot starter extension: after three
month of hard (but mostly fun) work, we are proud to announce of release 2.0.0.

We decided to switch to a new major version, because a lot of things changed:

* new maven module structure, new groupId: `org.camunda.bpm.extension.springboot`
* switch to Java 8
* switch to spring boot 1.4.2
* switch to camunda 7.6.0

Besides those internal enhancements, we worked on stability, convenience and support of the enterprise edition.


<!--more-->

## What's new?

Let's have a quick look at the main improvements. For the full list of changes, [check the Release Milestone](https://github.com/camunda/camunda-bpm-spring-boot-starter/milestone/3?closed=1).

### Features

* **Bill of Material** <br/> Instead of adding all different extension modules separately, you can now import `camunda-bpm-spring-boot-starter-bom` in your dependencyManagement.

* **Testing** <br/> The new `camunda-bpm-spring-boot-starter-test` module bundles useful testing components like camunda-bpm-mockito and camunda-bpm-assert. Together with the powerful [spring-boot 1.4 testing tools](https://spring.io/blog/2016/04/15/testing-improvements-in-spring-boot-1-4), this will probably be the only test-scope import you need.

* **Webjar/EE** <br/> We introduced a maven-plugin that allows integrating the camunda webapp via generated sources. So you no longer need to provide a custom webjar project when you are using the camunda enterprise edition.

* **Provisioning** <br/> When testing locally, you can now start your camunda application with a predefined _admin user_, _empty tasklist-filter_ and inserted _license-key_ (enterprise edition). Reduces roundtrip times during development.

* **Job Execution** <br/> Threadpool-size and retry-cycle can now be configured via application properties.  

* **Process Application** <br/> With the new `@EnableProcessApplication` annotation you can now turn your application in a camunda process application without extending any super-classes. <br/> We highly recommend activating this and let camunda handle the process deployment via processes.xml. There were several issues with the spring classpath scanning used when providing deploymentResources in the past.

* **Camunda 7.6.0** <br/> We decided to switch to the latest camunda version, released last week. There have been several enhancements and fixes in the core-platform that simplify the modularization and context setup we need for the starter. <br/> This means: when you want to use the spring-boot starter 2.0.0, you will have to switch to 7.6.0 as well.

## How to use it?

As always, the extension is published on maven central, so if you are using maven, just add the dependency. Mind the **new groupId** and consider using the BOM.

```xml

<dependency>
  <groupId>org.camunda.bpm.extension.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter([-rest|-webapp])</artifactId>
  <version>2.0.0</version>
</dependency>
```

and then create a simple process application like this one:

```java
// note that when using the ProcessApplication, you still need
// an empty processes.xml under src/main/resources/META-INF!
@SpringBootApplication
@EnableProcessApplication
public class WebappExampleProcessApplication  {

  public static void main(String[] args) {
    SpringApplication.run(WebappExampleProcessApplication.class, args);
  }

}
```

We enhanced documentation and examples, so make sure to checkout our [github pages](http://camunda.github.io/camunda-bpm-spring-boot-starter/).

## Roadmap

A lot of cool ideas did not make it to this release, so we will not get bored. Focus are:

* let the webapp follow the webjar specification `META-INF/resources/webjars/camunda`.
* include cockpit plugins from the marketplace into the generated webapp.
* get rid of the empty processes.xml, all configuration should be done via application properties.
* support multiple webapp-contexts so the camunda webapp and your custom application can run on the same spring boot node.

## Join us

Developing this extension is fun, but we could need some help! So if you are using the extension: share your thoughts, if you discover problems or have great enhancement ideas: file an issue on github or even provide a pull request. Or just chat with us, we have our own channel in the [camunda-forum](https://forum.camunda.org/c/community-extensions/spring-boot-starter)!
