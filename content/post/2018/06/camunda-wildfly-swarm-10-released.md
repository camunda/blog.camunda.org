+++
author = "Svetlana Dorokhova"
categories = ["Execution"]
date = "2018-06-11T12:00:00+02:00"
tags = ["Release Note"]
title = "Wildfly Swarm Community Extension 1.0.0 Released"

+++

[Wildfly Swarm](http://wildfly-swarm.io/) is a way to build your Java EE application with just enough of the application server, packaged in one `uber-jar`.
This is usually the way to go, when building microservices architecture, when each service is such kind of Jar, containing the server runtime inside it.
For those who want to try it out, the community extension is now available to easily include Camunda Engine and/or Web applications into Wildfly Swarm projects.

<!--more-->

This extension provide so called "fractions":

* **camunda-bpm-swarm-fraction-platform** for Camunda engine
* **camunda-bpm-swarm-fraction-rest** for Camunda REST API
* **camunda-bpm-swarm-fraction-webapp(-ee)** for Camunda Webapps 

Example:

```xml
    <dependency>
      <groupId>org.wildfly.swarm</groupId>
      <artifactId>camunda-bpm-swarm-fraction-webapp</artifactId>
      <version>${fraction.version}</version>
    </dependency>
```

Please also check [example project](https://github.com/camunda/camunda-bpm-wildfly-swarm/tree/master/example).

Feel free to contribute in source code or report the issues. You can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-wildfly-swarm).
