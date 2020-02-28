+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-12-02T09:00:00+01:00"
title = "More From Camunda BPM: NodeJS/Java External Task Client 1.3.0, Spring Boot Starter 3.4.0 & Assert 5.0.0"

+++

We are excited to announce the following releases:

* [External Task Clients 1.3.0 for NodeJS & Java](/post/2019/12/ext-task-clients-130-spring-boot-starter-340-assert-500/#external-task-clients)
* [Spring Boot Starter 3.4.0](/post/2019/12/ext-task-clients-130-spring-boot-starter-340-assert-500/#spring-boot-starter-3-4-0)
* [Assert 5.0.0](/post/2019/12/ext-task-clients-130-spring-boot-starter-340-assert-500/#assert-5-0-0)

You can read all about the Camunda BPM 7.12.0 release in the dedicated [blog post](/post/2019/11/camunda-bpm-7120-released/).

<!--more-->

<!-- FEATURES EXPLANATIONS BEGIN -->

## External Task Clients

The [External Task Clients](https://docs.camunda.org/manual/7.12/user-guide/ext-client/) help you to decouple your services from 
the Workflow Engine – a common use case, for example, in microservices architectures. We've released version 1.3.0 of our clients for [NodeJS](https://github.com/camunda/camunda-external-task-client-js) 
& [Java](https://github.com/camunda/camunda-external-task-client-java), which support the latest features of Camunda BPM 7.12.0. 

The features mentioned below are available for both the NodeJS and the Java client.

### Fetch and Lock by Version Tag

When you want to assign a custom label to a specific version of a process definition, you can 
tag it with a version.

Imagine a case where there are already older versions of a process deployed to the Workflow Engine and
we want to deploy a new version of this process with the version tag `1.5.2`:

{{< figure class="teaser no-border" src="fetch-and-lock-by-versiontag.png">}}

The external task with the topic name `compute-total` is not only present in the process shown above, 
but also in older versions of this process. However, we want our external task client to only work 
on external tasks belonging to the process definition with the version tag `1.5.2`.

Let's have a look how we can achieve this using the NodeJS client:
```javascript
const { Client, Variables } = require('camunda-external-task-client-js');

// configure & bootstrap the client
const client = new Client({ baseUrl: 'http://localhost:8080/engine-rest' });

// susbscribe to a specific topic
const topicSubscription = client.subscribe(
  'compute-total',
  // only fetch tasks belonging to a version tag
  { processDefinitionVersionTag: '1.5.2' },
  async function({ task, taskService }) {
    // complete the task with the variable 'total'
    await taskService.complete(task, new Variables().set({ total: 55 }));
  }
);
```

In the code example shown above, the NodeJS Client is configured, bootstrapped and
finally subscribed to the topic name `compute-total`. Additionally, the subscription 
is configured only to fetch external tasks belonging to the process with the version 
tag `1.5.2`.

You can read more here:

* [Version Tag](https://docs.camunda.org/manual/7.12/user-guide/process-engine/process-versioning/#version-tag)

### Fetch and Lock With Priorities

Sometimes, it's necessary to prioritize certain external tasks over others. It's now possible to specify priorities 
on the process or task level.

Let's consider the following process:

{{< figure class="teaser no-border" src="fetch-and-lock-with-priority.png">}}

In the process shown above, you can see two external tasks with the topic name
`pay-money`. When the invoice is due, the payment of the invoice is prioritized 
with `100`, otherwise with `0`.

The feature is enabled by default, meaning that no additional configuration is needed to
fetch external tasks with priorities. If necessary, you can disable this behavior.

You can read more here:

* [External Task Prioritization](https://docs.camunda.org/manual/7.12/user-guide/process-engine/external-tasks/#external-task-prioritization)

## Spring Boot Starter 3.4.0

Spring Boot Starter simplifies your local development workflow and
allows you to bundle your Process Application into an Uber-JAR. This 
release relies on Spring Boot 2.2.1 by default.

For a complete list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15395).

### Auto-Configuration of Jackson Java 8 Modules in Spin

Camunda Spin, together with Jackson, allow the exchange of structured process data 
in the form of JSON with the Workflow Engine.

This release includes auto-configuration of the Jackson Java 8 modules. When adding 
the Maven coordinates of a Jackson Java 8 module, it is configured automatically.

Auto-configuration is available for the following Jackson Java 8 modules:

1. Parameter names (`jackson-module-parameter-names`)
2. Java 8 Date/time (`jackson-datatype-jdk8`)
3. Java 8 Datatypes (`jackson-datatype-jsr310`)

For instance, if you want to add support for Jackson Java 8 Date/time to your Spring Boot
Process Application, you'd add the following Maven coordinates:

```xml
...
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-plugin-spin</artifactId>
  <version>7.12.0</version>
</dependency>

<dependency>
  <groupId>org.camunda.spin</groupId>
  <artifactId>camunda-spin-dataformat-json-jackson</artifactId>
  <version>1.7.4</version>
</dependency>

<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jdk8</artifactId>
</dependency>
...
```

Read on:

* [Configuring Spin DataFormats](https://docs.camunda.org/manual/7.12/user-guide/spring-boot-integration/configuration/#configuring-spin-dataformats)
* [Jackson Java 8 Modules](https://github.com/FasterXML/jackson-modules-java8)
* [Spring Boot Starter on GitHub](https://github.com/camunda/camunda-bpm-spring-boot-starter)

## Assert 5.0.0

Assert helps you to test your processes conveniently in Java. 

Assert 5.0.0 is compatible with Assertj 3.13.2, which is used in turn by 
Camunda BPM Spring Boot Starter 3.4.0.

This release discontinues the support of the compatibility artifacts 
for Assertj 2.9.0 and 3.11.1.

For a complete list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15397).

You can read more here:

* [Assert](https://docs.camunda.org/manual/7.12/user-guide/testing/#camunda-assertions)
* [Assert on GitHub](https://github.com/camunda/camunda-bpm-assert)

## Register for the Webinar

If you're not already registered, be sure to secure a spot at the free release webinars, which are offered in [German](https://camunda.com/learn/webinars/camunda-bpm-7-12-release-webinar-de/) and [English](https://camunda.com/learn/webinars/camunda-bpm-7-12-release-webinar-en).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. And we rely on your feedback! Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/).
