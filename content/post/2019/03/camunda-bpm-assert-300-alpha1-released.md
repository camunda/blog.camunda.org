---
title: "Camunda BPM Assert 3.0.0-alpha1 Released"
date: "2019-03-18T08:00:00+01:00"
author: "Tobias Metzke"
tags: ["Release Note"]
categories: ["Execution"]
---

We are excited to announce the release of a new Alpha version of Camunda BPM Assert.

BPM Assert is now **an official part of Camunda BPM**.

First of all, we want to take this opportunity to thank [Martin Schimak and the many other contributors](https://github.com/camunda/camunda-bpm-assert/graphs/contributors), who have made BPM Assert into what it is today. We also want to thank Martin for taking the time to visit us in our Berlin office to review the codebase with us and help us to take over responsibility for it.

# This Release

The current release is mostly concentrated on including the project in the Camunda development lifecycle:

* The project will continue to be maintained in the existing [repository on Github](https://github.com/camunda/camunda-bpm-assert).
* Issues are now tracked in the [Camunda Jira](https://jira.camunda.com/browse/CAM/component/14065)
* Documentation from now on can also be found on the [Camunda docs page](https://docs.camunda.org/manual/develop/user-guide/testing/#camunda-assertions).

Here are some changes:

* The `groupId` for Maven dependencies has changed, it is now `org.camunda.bpm.assert`. For example:
```xml
<dependency>
  <groupId>org.camunda.bpm.assert</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>3.0.0-alpha1</version>
</dependency>
```

* The inheritance from [AssertJ](http://joel-costigliola.github.io/assertj/) Assertions has been cut. 
In case AssertJ assertions are used in test code, the imports have to be adjusted to also include
```java
import static org.assertj.core.api.Assertions.*;
```

* Due to binary incompatibilities between AssertJ versions we want to support, we released two further artifacts with 
artifactIds `camunda-bpm-assert-assertj2` and `camunda-bpm-assert-assertj3-9-1`. The AssertJ v2 artifact can be used if you are working with Java 1.7
and want to use Camunda BPM Assert. The AssertJ v3.9.1 artifact serves as a compatibility version for users of Spring Boot 2.0.x which includes this AssertJ version as a dependency.
So, if you are using the [Camunda Spring Boot Starter](https://docs.camunda.org/manual/develop/user-guide/spring-boot-integration/) v3.1.0, you would add the following dependency:
```xml
<dependency>
  <groupId>org.camunda.bpm.assert</groupId>
  <artifactId>camunda-bpm-assert-assertj3-9-1</artifactId>
  <version>3.0.0-alpha1</version>
</dependency>
```
As to which compatibility artifact will be included in which version of BPM Assert can always be observed in the [version compatibility overview](https://docs.camunda.org/manual/develop/user-guide/testing/#assertions-version-compatibility).

* CMMN assertions are now officially part of BPM Assert as well. They have been around in the 2.0.0 alpha versions already. 
We would like to thank all contributers from Holisticon for their work on this!

* External tasks can be asserted now as well. Several convenience methods for working with external tasks have been added, so you can write the following test code now:
```java
complete(externalTask("review"), withVariables("approved", true));
```
Thanks again to all contributors from Holisticon, especially Simon Zambrovski and Martin Guenther.


# Future Direction

The scope will be to enable further useful areas of testing the Camunda BPM Engine that have not been included yet.

## Release cycles

Camunda BPM Assert will continue to have its own versioning (3.0.0, 3.1.0, 4.0.0 etc.). However, each minor Camunda BPM release will automatically mean the release of 
a new BPM Assert version. This can be observed in the [version compatibility overview](https://docs.camunda.org/manual/develop/user-guide/testing/#assertions-version-compatibility) as well.

Version 3.0.0 will use Camunda BPM 7.10 by default. In a similar way, one could expect that BPM Assert v3.1.0 will rely on Camunda BPM 7.11.

The final release of BPM Assert v3.0.0 is planned for May 31, 2019.

# Stay with us

We're extremely excited on how much the community was involved in the project so far, and hope that this won't stop in the future. You're always welcome with your ideas for new features, your feedback regarding usage experience and of course contributions in the codebase is highly appreciated.