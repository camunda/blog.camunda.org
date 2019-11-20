+++
author = "Yana Vasileva"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-03-29T15:00:00+01:00"
title = "Camunda 7.9.0-alpha3 Released"

+++

Camunda BPM platform 7.9.0-alpha3 is here and the highlights are:

* Spring Boot Starter alpha release
* Payload in Signal Events
* Implement Your BPMN Service Task with Node
* [16 Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.9.0-alpha3)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


To see a full list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15301)
and the list of [Known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.9.0-alpha3).


If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.9.0-alpha3).


## Spring Boot Starter alpha release

As previously announced, the next stable release of Spring Boot Starter will be in May, together with Camunda BPM 7.9. This Spring Boot Starter 3.0.0-alpha1 version comes with the recently released Spring Boot 2.0.0. ([Camunda Spring Boot Starter repository](https://github.com/camunda/camunda-bpm-spring-boot-starter))

## Payload in Signal Events

Signal Events are broadcast to all of the signal-catching Process Instances. This alpha release adds support for payloads in Signal Events. This feature can be used in case you need to pass some addition information (variables or business key) within the signal.
The Signal payload is declared in the Throwing Signal Event Definition. Here is how the XML looks like:

```xml
<signalEventDefinition signalRef="thePizzaSignal">
    <extensionElements>
        <camunda:in source="X" target="Y" />
        <camunda:in sourceExpression="${X + 5}" target="Z" />
        <camunda:in variables="all" local="true" />
        <camunda:in businessKey="${execution.processBusinessKey}" />
    </extensionElements>
</signalEventDefinition>
```
For more details about this feature, please check out the [documentation](https://docs.camunda.org/manual/latest/reference/bpmn20/events/signal-events/#passing-variables).

## Implement Your BPMN Service Task with Node

Now it is possible to handle your BPMN Service Tasks in NodeJS. We already released the second alpha of the Camunda NodeJS External Task Client project and you can read more about it in the previous [blog post](https://blog.camunda.com/post/2018/03/extermal-task-js-alpha2/).

In addition, we have released the first alpha of the [External Task Java Client](https://blog.camunda.com/post/2018/03/camunda-external-task-client-java-010-alpha1-released/) just a week ago.

If you want to dive in deeper, check out the loan granting example of the [NodeJS](https://github.com/camunda/camunda-external-task-client-js/tree/master/examples/granting-loans) and [Java](https://github.com/camunda/camunda-external-task-client-java/tree/master/examples/loan-granting) clients.

We will be happy to receive some [feedback](https://forum.camunda.org/) from you, so don't hesitate to try it and share your thoughts with us.

## What's Next?

The next alpha version is scheduled for the end of April and our team is already working on it.

Here is a highlight if you want to know what the team is preparing for the next releases:

* Version tag in a business rule task to bind a decision to evaluate	

You can also find out more details if you check out our [roadmap](https://camunda.com/learn/community/#roadmap).

## Your Feedback Matters!

With every release we constantly strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep bugging you, things that you think should work differently etc., please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
