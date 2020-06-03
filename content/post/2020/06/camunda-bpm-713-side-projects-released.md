+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-06-02T14:30:00+02:00"
title = "More From Camunda BPM: NodeJS External Task Client, Spring Boot Starter & Assert"

+++

Alongside our Camunda BPM 7.13.0 release, we're excited to announce the following releases:

* [External Task Client 2.0.0 for NodeJS](/post/2020/06/camunda-bpm-713-side-projects-released/#nodejs-external-task-client-2-0-0)
* [Assert 6.0.0](/post/2020/06/camunda-bpm-713-side-projects-released/#assert-6-0-0)
* [Spring Boot Starter 7.13.0](/post/2020/06/camunda-bpm-713-side-projects-released/#spring-boot-starter-7-13-0)


You can read all about the Camunda BPM 7.13.0 release in the dedicated [blog post](/post/2020/06/camunda-bpm-7130-released/).

<!--more-->

<!-- FEATURES EXPLANATIONS BEGIN -->

## NodeJS External Task Client 2.0.0

The [External Task Clients](https://docs.camunda.org/manual/7.13/user-guide/ext-client/) help you to decouple your services from the Workflow Engine – a common use case, for example, in microservices architectures. We've released version 2.0.0 of our [NodeJS client](https://github.com/camunda/camunda-external-task-client-js).

Node 8 support is deprecated with versions >2.0.0.


### Logging Levels in NodeJS Client
In production, you usually don't care about every time the client queries for new jobs. These log entries make debugging harder because errors get buried. But during development, it is important to check if jobs are acquired and fetching works as expected.

To accommodate both use cases, the default logger now supports log levels. The default level is `info`. You can change the logging level like this:

```javascript
const { Client, logger } = require("camunda-external-task-client-js");

const client = new Client({
  use: logger.level('error'),
  baseUrl: "http://localhost:8080/engine-rest"
});
```

To emulate the previous logging behavior, you can use the `debug` logging level. You can learn more about the logger in the [docs](https://github.com/camunda/camunda-external-task-client-js/blob/master/docs/logger.md).

### Keycloak Auth Interceptor for NodeJS Client
Keycloak provides a single sign-on solution and allows centralized user management for all your applications. If you secure the Camunda REST-API this way, it can become difficult to access it from an external service.

The Keycloak Auth Interceptor modifies the request headers of the requests to work with your Keycloak-secured REST-API. To instantiate a client with the Keycloak Interceptor, you will have to configure your Authentication first:

```JavaScript
const {
  Client,
  KeycloakAuthInterceptor
} = require("camunda-external-task-client-js");

const keycloakAuthentication = new KeycloakAuthInterceptor({
  tokenEndpoint: "https://your.keyclock.domain/realms/your-realm/protocol/openid-connect/token",
  clientId: "your-client-id",
  clientSecret: "your-client-secret"
});

const client = new Client({
  baseUrl: "http://localhost:8080/engine-rest",
  interceptors: keycloakAuthentication
});
```

Read more about the details [here](https://github.com/camunda/camunda-external-task-client-js/blob/master/docs/KeycloakAuthInterceptor.md).

## Assert 6.0.0

Assert helps you test your processes conveniently in Java. The latest release adds more testing and convenience features to make checking your processes quick and thorough.

Check out Assert on [Github](https://github.com/camunda/camunda-bpm-assert).

### Find Elements by Name
Tests should be expressive. To aid in this, Assert now has the convenience function `findId()`, which will search for the ID of an element with a particular name.

Tests that would typically contain a nondescriptive ID like

```Java
assertThat(processInstance).isWaitingAt("Task_0834dhg");
```
can now be written using the Task name
```Java
assertThat(processInstance).isWaitingAt(findId("Process Invoice"));
```

Read more about it in our [user guide](https://github.com/camunda/camunda-bpm-assert/blob/master/docs/User_Guide_BPMN.md#finding-tasks-events-and-gateways-by-name).


### Assertions for Joining Gateways

With Assert 6.0.0 it is now possible to run assertions on joining gateways, even though they are no active tasks.
The assertions can be used like any other Element:

```Java
assertThat(processInstance).isWaitingAt("JoiningGateway");
```

## Spring Boot Starter 7.13.0
The Camunda Engine can be embedded into your Spring Boot project using the Spring Boot starter.

Starting with the release Camunda BPM 7.13.0, Spring Boot starter is now part of the core platform. Therefore, it will also follow the 7.x release cycle of the core platform in the future.

You can read the details in the [Camunda BPM Run release post](https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run/#changes-in-camunda-bpm-spring-boot-starter).

## Register for the Webinar

If you're not already registered, be sure to secure a spot at the release webinar. You can register for free [here](https://register.gotowebinar.com/register/6891541377977636112).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM, and we rely on your feedback! Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/t/camunda-bpm-7-13-0-feature-feedback/20355).
