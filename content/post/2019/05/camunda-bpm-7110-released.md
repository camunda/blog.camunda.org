+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-05-31T12:00:00+02:00"
title = "Camunda BPM 7.11.0 Released"

+++

We're excited to announce that Camunda BPM platform 7.11.0 is now available. Highlights from Camunda 7.11.0 include:

<!-- FEATURES LIST BEGINS -->

* Operator Authorizations
* Operator and Admin Auditing
* Return Variables on Task Completion / Form Submission / Message Correlation
* Asynchronously set Removal Time on Historical Data 
* BPMN Error Event Triggering from Execution Listeners
* Fluent Java Testing API
* Additional Supported Environments
* [91 Bug Fixes](https://app.camunda.com/jira/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.11.0)

<!-- FEATURES LIST ENDS -->

You can [download Camunda 7.11.0 for free](https://camunda.com/download/) or [run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Also included in the release:

* [Camunda Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter) 3.3.0, which relies on Spring Boot 2.1.5 by default.
* [NodeJS external task client](https://github.com/camunda/camunda-external-task-client-js) 1.2.0 version for non-Java developers
* [Java external task client](https://github.com/camunda/camunda-external-task-client-java) 1.2.0 version can be embedded in Java applications

<!--more-->

To see a complete list of the changes, please check out our [Release Notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10230&version=15343)
and the list of [Known Issues](https://app.camunda.com/jira/issues/?jql=affectedVersion%20%3D%207.11.0%20and%20status%20!%3D%20Closed).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.11.0).

<!-- FEATURES EXPLANATIONS BEGIN -->

## Operator Authorizations: ability to control what an operator can do in cockpit

## Operator and Admin Auditing: ability to track any changes made by operators and administrators

## Return Variables on Task Completion / Form Submission / Message Correlation

## Asynchronously set Removal Time on Historical Data

## BPMN Error Event Triggering from Execution Listeners

## Fluent Java Testing API

## Additional Supported Environments

### Support for Java 12

Camunda BPM continues to keep pace with Java development, bringing support for Java 12 with version 7.11.0.

### Extending our Database support

Version 7.11.0 also extends database support for:
* PostgreSQL versions 10.7, 11.1 and 11.2
* Amazon Aurora PostgreSQL compatible with PostgreSQL 9.6 / 10.4 / 10.7
* Oracle 18c
* Microsoft SQL Server 2017

### Application Servers

Finally, Camunda BPM 7.11.0 brings support for:
* JBoss EAP 7.2
* WildFly Application Server 15 and 16

<!-- FEATURES EXPLANATIONS END -->

## And Much More

There are many smaller features and bug fixes in the release that aren't included in this blog post. The [full release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10230&version=15343) provide the details.

## Register for the Webinar

If you're not already registered, be sure to secure a spot at the free release webinars, which is offered in [German](https://attendee.gotowebinar.com/register/5485618940456067851) and [English](https://attendee.gotowebinar.com/register/7295666867938241291).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To mak this possible, we rely on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to user experience, things that keep annoying you, things that you think should work differently, and so on, please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com).
