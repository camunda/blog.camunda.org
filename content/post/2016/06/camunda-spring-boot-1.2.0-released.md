+++
author = "Jan Galinski"
categories = ["execution"]
date = "2016-06-11T18:36:39+02:00"
tags = ["extension"]
draft = true
title = "Camunda BPM SpringBoot 1.2.0 released"

+++

Good news for all users of the Spring Boot community extension (and those who want to become users):
Version 1.2.0 has been released!

<!--more-->


## Features

* Support for 7.4 features like DMN and external tasks.
* Supports webapp (cockpit, tasklist, admin). This requires 7.5.0.
* embedded forms in webapp can be used
* Default spring boot version is 1.3.5, introducing spring 4.2
* introduce SpringBootProcessApplication allowing deployment via processes.xml configuration


## Fixes

* using history-level "auto" now works, allowing multiple engines connected to one datasource to adopt to the configured level
* fix bean problems in cloud context (hystrix, eureka)



The starter now uses camunda bpm 7.5.0 by default. In this version, the webapp is supported completely.
You can still use version 7.4.0 by manually overwriting the version properties, but note that with 7.4.0
there are limitations with the tasklist.
