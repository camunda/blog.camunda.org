+++
author = "Miklas Boskamp, Thorben Lindhauer"
categories = ["Execution"]
tags = ["Camunda BPM"]
date = "2020-03-06T12:00:00+01:00"
title = "Introducing Camunda BPM Run"
+++


We are proud to announce **Camunda BPM Run**, a new distribution of Camunda BPM that provides the Camunda web applications (Cockpit, Tasklist, Admin) and the REST API.

Camunda BPM Run is highly configurable and can be operated without any Java knowledge.

<!--more-->

Run is for you if at least one of the following statements is true:

* You need a [standalone process engine](https://docs.camunda.org/manual/latest/introduction/architecture/#standalone-remote-process-engine-server) accessible via REST API
* You don't have extensive Java knowledge (or none at all) but still want to use Camunda BPM
* You don't want to configure an application server yourself
* You want to configure everything in one place
* You just want to Run Camunda BPM


Camunda BPM 7.13.0-alpha2 ships the first increment of Run. This blogpost shows:

* [Starting with Run](#starting-with-run)
* [Highlight Features](#highlight-features): What is in our first Run release?
* [Outlook](#outlook): Where do we want to take Run?
* [Changes in Camunda BPM Starter](#changes-in-camunda-bpm-spring-boot-starter): We moved Camunda BPM Spring Boot Starter into the 7.x release cycle. Here is why.

# Starting with Run
Follow these simple steps to start Run:

1. Download the distro from [here](https://app.camunda.com/nexus/repository/public/org/camunda/bpm/run/camunda-bpm-run/7.13.0-alpha2/camunda-bpm-run-7.13.0-alpha2.zip).
1. Unpack the downloaded archive
1. Put a BPMN file in `/configuration/resources` (optional)
1. Execute one of the start scripts (start.bat or start.sh)
1. Point your browser to http://localhost:8080 to access the Camunda webapps (Cockpit, Tasklist, Admin)
1. Access the REST API via http://localhost:8080/rest/ (e.g., http://localhost:8080/rest/engine)

For more configuration options, head over to the `configuration` folder, and you will find a file called `application.yml`. This is the only configuration file you will need to touch.
You can fill it with configuration properties from [this list](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/#configure-camunda-bpm-run) of available properties.

By default, Run starts with a file-based H2 database, which is intended for testing. If you want to use a different database, you can configure it as described [in the documentation](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/#database). Make sure to drop a matching JDBC driver jar in the `configuration/database` folder.

Here is an overview of an unpacked Camunda BPM Run distro:

```
camunda-bpm-run
├── configuration/
│   ├── database/
│   │   └── put your database driver jar here
│   ├── keystore/
│   │   └── put your SSL keystore here if you want to use HTTPS
│   ├── resources/
│   │   └── put your BPMN files here
│   └── application.yml
├── internal/
├── start.bat
└── start.sh
```

# Highlight Features

## Optional Webapps and REST API
You can enable the webapps and the REST API independently by passing the `--rest` or `--webapps` argument to the start script. If you pass both arguments or no argument, Camunda BPM Run will start with both webapps and REST API.

## Auto-Deployment of Resources
If you already have some models you want to deploy, drop them in the `resources` folder along with all other deployment resources.
Everything in this folder will be picked up and deployed during engine startup.

## CORS
Camunda BPM Run supports Cross-Origin Resource Sharing. You can enable it and configure allowed origins via the `application.yml` configuration file.

```
camunda.bpm.run.cors:
  enabled: true
  allowed-origins: http://foo.bar
```

# Outlook
Camunda BPM Run is still at an early alpha stage but provides already many comfort features in terms of easy configuration and fast bootstrapping of a Camunda BPM engine.
We have many ideas for further improvements to the distro, like providing a docker container, integrate a Swagger API endpoint, or add a drop folder for custom script engines. You can find a list of current and completed tickets related to Camunda BPM Run in our [Jira](https://jira.camunda.com/issues/?jql=project%20%3D%20CAM%20AND%20component%20%3D%20run%20ORDER%20BY%20fixVersion%20ASC).

Keep in mind that we have not decided on a final set of features yet, and all of them can change or not end up as part of Camunda BPM Run.

Feel free to share your ideas or suggestions in our [forum](https://forum.camunda.org/).

# Changes in Camunda BPM Spring Boot Starter

Camunda BPM Run is based on [Camunda BPM Spring Boot Starter](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/). Until 7.12, the Starter had its own versioning scheme and release cycle (see the [version compatibility table](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/version-compatibility/) for reference). With the introduction of Run, we have made two noteworthy changes:

1. The Spring Boot starter follows the 7.x release cycle of the core platform. We will release the Spring Boot starter with every new 7.x version (be it a minor, patch, or alpha release).
1. The Spring Boot starter codebase is located in the core platform repository: https://github.com/camunda/camunda-bpm-platform/tree/master/spring-boot-starter

We have made these changes for the following reasons:

1. Camunda BPM Run follows the 7.x cycle. By releasing the Spring Boot starter in the same cycle, we can develop and release Camunda BPM more efficiently.
1. The 7.x cycle is the central release cycle of the Camunda BPM product that our userbase follows closely. Aligning Spring Boot starter with that will facilitate choosing the right Spring Boot starter version.
1. By releasing the Spring Boot starter together with the core platform, we will indirectly improve our product quality. One Spring Boot starter release will be developed, released, and tested for exactly one Camunda BPM version. Problems due to version incompatibilities will become less likely to appear.

The changes apply only from 7.13 onwards. The Spring Boot starter for previous versions is not affected, regarding both versioning and code location (e.g., see https://github.com/camunda/camunda-bpm-spring-boot-starter/tree/3.4).