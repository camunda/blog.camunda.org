+++
author = "Robert Gimbel"
categories = ["Execution, Modelling"]
date = "2015-11-30T10:00:00+01:00"
tags = ["Release Note", "Tooling", "Camunda Modeler Eclipse Plug-in"]
title = "Camunda Eclipse Plugin 3.0.0 Released"

+++

Today we release version 3.0.0 of the Camunda Eclipe Plugin. This major release provides a set of new features.
<!--more-->
## Features

* Compatibility with the new Camunda Modeler which uses the new <camunda> namespace

* Compatibility with Camunda BPM Platform 7.4 which also supports the new <camunda> namespace

* Support for editing the event type "delete" for a task listeners in the properties panel

## Download and Update Sites

Please refer to our documentation for information on the [Eclipse Update Sites](https://docs.camunda.org/manual/7.4/modeler/eclipse-plugin/update-sites/).

Note that the URLs of the update sites changed.

> **Known issue**: Currently the indigo version of the modeler cannot be installed due to a problem with archived update sites in eclipse. We are working on it.

## Breaking Change

This major version contains a breaking change, since we introduced the new <camunda> namespace for extension elements and attributes.
[Read this section of the Update Guide for details](https://docs.camunda.org/manual/7.4/update/minor/73-to-74/#changed-url-of-bpmn-extensions-namespace).

The Camunda Eclipse Plugin version 3.0 ist compatible with Camunda BPM versions 7.4.0, 7.3.3, 7.2.6 onwards.

## The Future of Modelling

Consider switching to the new Camunda Modeler in the long run. It offers a much better usability and also supports DMN.
For more background information, read the [release blogpost of the Camunda Modeler](http://blog.camunda.org/post/2015/11/hello-new-camunda-modeler/).
