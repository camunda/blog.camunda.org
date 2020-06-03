+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-06-02T14:31:00+02:00"
title = "Camunda BPM Runtime 7.13 Released"

+++

We are excited to announce the Camunda BPM Platform 7.13.0 is now available, including many new features.

Here are some of the highlights:

<!-- FEATURES LIST BEGINS -->

* [Camunda BPM Run](/post/2020/06/camunda-bpm-runtime-713-released/#camunda-bpm-run)
* [OpenAPI Documentation](/post/2020/06/camunda-bpm-runtime-713-released/#openapi-documentation)
* [DMN 1.3 and FEEL 1.2 Support](/post/2020/06/camunda-bpm-runtime-713-released/#dmn-1-3-and-feel-1-2-support)
* [Improved Capabilities for Microservice Deployments](/post/2020/06/camunda-bpm-runtime-713-released/#improved-capabilities-for-microservice-deployments)
  * [Hostnames in Job Logs](/post/2020/06/camunda-bpm-runtime-713-released/#hostnames-in-job-logs)
  * [Deployment Aware Batch Jobs and Asynchronous Cockpit Operations](/post/2020/06/camunda-bpm-runtime-713-released/#deployment-aware-batch-jobs-and-asynchronous-cockpit-operations)
* [New Authorizations](/post/2020/06/camunda-bpm-runtime-713-released/#new-authorizations)
  * [Historic Task Authorizations](/post/2020/06/camunda-bpm-runtime-713-released/#historic-task-authorizations)
  * [Historic Process Instance Authorizations](/post/2020/06/camunda-bpm-runtime-713-released/#historic-process-instance-authorizations)
* [Improved Webapp Functionality](/post/2020/06/camunda-bpm-runtime-713-released/#improved-webapp-functionality)
  * [New Metrics](/post/2020/06/camunda-bpm-runtime-713-released/#new-metrics)
  * [Accurately Display Failed Activity](/post/2020/06/camunda-bpm-runtime-713-released/#accurately-display-failed-activity)
* [Additional API Functionalities](/post/2020/06/camunda-bpm-runtime-713-released/#additional-api-functionalities)
* [Changes to Environments](/post/2020/06/camunda-bpm-runtime-713-released/#changes-to-environments)
  * [Context Paths in Spring Boot](/post/2020/06/camunda-bpm-runtime-713-released/#context-paths-in-spring-boot)
  * [Additional Supported Environments](/post/2020/06/camunda-bpm-runtime-713-released/#additional-supported-environments)
  * [Retired Environments](/post/2020/06/camunda-bpm-runtime-713-released/#retired-environments)
<!-- FEATURES LIST ENDS -->

You can [download Camunda 7.13.0 for free](https://camunda.com/download/) or [run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Also included in the release:

* [Assert](https://github.com/camunda/camunda-bpm-assert) 6.0.0 for convenient testing of processes in Java
* [NodeJS External Task Client](https://github.com/camunda/camunda-external-task-client-js) 2.0.0 for JavaScript developers
* [Java External Task Client](https://github.com/camunda/camunda-external-task-client-java) 1.3.1, which can be embedded in Java applications


You can read all about these releases in the dedicated [blog post](/post/2020/06/camunda-bpm-7.13-side-projects-released).


<!--more-->

For a complete list of the changes, please check out the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15532)
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.13.0%20and%20status%20!%3D%20Closed).
For patched security vulnerabilities, see our [security notices](https://docs.camunda.org/security/notices/).

If you want to dig deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0).

<!-- FEATURES EXPLANATIONS BEGIN -->

## Camunda BPM Run

<!-- What -->

Say hello to the newest distribution: Camunda Run. Run is a standalone process engine that requires no app server or Java knowledge to get started.

<!-- Why -->
Run is a perfect solution for your teams to orchestrate microservices and to get your projects up and running quickly. The distribution comes with the Camunda web applications (Cockpit, Tasklist, Admin) as well as the REST API, offering you the complete Camunda BPMN functionality to automate and orchestrate any of your processes.

<!-- How -->
To get started, read up on the [Run release blogpost](https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run/#starting-with-run), download it [here](https://downloads.camunda.cloud/release/camunda-bpm/run/7.13/) or check out the [User Guide](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/).


## OpenAPI Documentation
<!-- What -->

We aim to make extending Camunda as straight forward as possible. To help you when developing external services, we now provide OpenAPI documentation for our REST API. OpenAPI is a standard that defines language-agnostic interfaces for REST APIs. Using the OpenAPI documentation, you can interact with the Camunda process engine with minimal implementation effort.

<!-- Why -->
With many tools already available, you can quickly test out the API using Swagger and even generate a REST client in your favorite programming language.

{{< figure src="openapi-swagger.png" alt="OpenAPI swagger">}}

The generated REST client can then be used to integrate your existing application into the workflow, or you can extend Camunda in the language of your choice.

<!-- How -->
Get started by checking the [documentation](https://docs.camunda.org/manual/7.13/reference/rest/openapi/) for usage and coverage, and download the specification [here](https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm/org/camunda/bpm/camunda-engine-rest-openapi/).


## DMN 1.3 and FEEL 1.2 Support
<!-- What -->
DMN allows business analysts and stakeholders to model decisions that can be executed inside your process. With DMN 1.3 and FEEL 1.2, the DMN engine becomes even more powerful.

<!-- Why -->
DMN 1.3 allows for easier diagram exchanges between vendors, and FEEL 1.2 extends the FEEL coverage to more elements. FEEL can now be used in input expressions, output entries, and literal expressions.

<!-- How -->
You can model DMN 1.3 diagrams using the latest version of the [Camunda Modeler](https://camunda.com/download/modeler/). Check out the [introductory blog post](https://blog.camunda.com/post/2020/03/camunda-bpm-supports-dmn-feel-1.2/) which walks you through all the new features.


## Improved Capabilities for Microservice Deployments
This release includes improvements for using Camunda in microservice architectures.

### Hostnames in Job Logs
When operating Camunda in a cluster with multiple servers, some jobs might cause problems on a single node. To make debugging easier and get your process running smoothly, faster, we added the hostname of the executing server to the historic job log.

This way, you know exactly which node a specific job ran on, and can make adjustments accordingly.

{{< figure src="hostname-job-log.png" alt="Hostnames in Cockpit Job Log">}}

The new data is also available in the [Camunda REST API](https://docs.camunda.org/7.13/latest/reference/rest/history/job-log/get-job-log-query/)

### Deployment Aware Batch Jobs and Asynchronous Cockpit Operations

When running Camunda on multiple nodes with different process applications, specific jobs can only be executed on the server with the correct process application. This can lead to problems when batches are not deployment aware and are executed on the wrong server. With Camunda 7.13, all batch jobs are deployment aware.

This ensures that the batch jobs are always executed on the node with the correct process application. The same applies to asynchronously executed cockpit operations.

Make sure to check our [Update Guide](https://docs.camunda.org/manual/7.13/update/minor/712-to-713/#deployment-aware-batch-operations) for further details on this feature with regards to version updates.


## New Authorizations
This release introduces improvements for history authorizations. Because SQL queries become more complex with these features, they are not enabled by default. You can enable them with the help of the process engine configuration flag:

```xml
<property name="enableHistoricInstancePermissions">true</property>
```

You can read more about the details and implications in the [User Guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#historic-instance-permissions).

### Historic Task Authorizations
When you worked on a task, you might want to go back and check your submission.
With the historic instance permissions enabled, additional historic task permission is granted when a user is assigned a task. This way, you have access to all Task Instances that you worked on and can review your work.

### Historic Process Instance Authorizations
Sometimes, you want to restrict which process instances a person can access. This was already possible with the runtime authorizations, while the historic authorizations worked on a process definition level.  
It is now possible to grant access to specific historic process instances only.

## Improved Webapp Functionality

With the Camunda webapps, we strive to create an excellent tool for managing and operating your processes.  

### New Metrics

We added more execution metrics to the system dashboard. Additional to the flow node instances and executed decision elements, we now also display the number of started Root Process Instances (RPI) and Executed Decision Instances (EDI).

{{< figure src="execution-metrics.png" alt="Admin System Dashboard">}}

A Root Process Instance has no parent process instance; i.e., it is a top-level execution. An Executed Decision Instance is a DMN decision table or a DMN literal expression.

Read more about metrics in our [User Guide](https://docs.camunda.org/manual/7.13/user-guide/process-engine/metrics/).


### Accurately Display Failed Activity

Incidents during execution can happen. In that case, the last transaction is rolled back, and an incident is created at the next activity. However, multiple activities can be grouped in one transaction, but the incident token does not indicate the correct activity.

With the release of Camunda BPM 7.13, the failing activity ID is logged and displayed as well.

{{< figure src="failing-activity-id.png" alt="Failed Activity ID in a Process">}}


## Additional API Functionalities

This release also introduces multiple additions to the Java and REST API. You can now

* [retrieve definitions sorted by their deployment time using `sortBy: deployTime`](https://docs.camunda.org/manual/develop/reference/rest/process-definition/get-query/)
* [retrieve a list of distinct external task topic names](https://docs.camunda.org/manual/develop/reference/rest/external-task/get-topic-names/)
* [query tasks by list of process instance ids using `processInstanceIdIn`](https://docs.camunda.org/manual/develop/reference/rest/task/get-query/)
* [retrieve event subscriptions using the REST API](https://docs.camunda.org/manual/develop/reference/rest/event-subscription/)


## Changes to Environments

We aim to support the latest technologies and provide a wide range of supported environments.

### Context Paths in Spring Boot
We changed the default Spring Boot context paths to be in line with the deployment on an application server. The webapps will be available at `/camunda` (previously `/`) and the REST API at `/engine-rest` (previously `/rest`).

You can change this path in the configuration file. To recreate the old behavior, add the following lines to your `application.yaml`:

```yaml
camunda.bpm.webapp.application-path: '/'
spring.jersey.application-path: '/rest'
```

Read more about configuration options in our  
* [Spring Boot Configuration Guide](https://docs.camunda.org/manual/7.13/user-guide/spring-boot-integration/configuration/)
* [Spring Boot REST API User Guide](https://docs.camunda.org/manual/7.13/user-guide/spring-boot-integration/rest-api/)


### Additional Supported Environments
With Camunda BPM 7.13, we added support for the following environments:

* Java 14
* Oracle 19c (also supported as of 7.12.2+)
* PostgreSQL 12.2
* Wildfly Application Server 19.0

You can find a list of all supported environments [here](https://docs.camunda.org/manual/7.13/introduction/supported-environments/).

### Retired Environments
With this release, we end the support for the following environments:

* Oracle WebLogic Server 12R1
* Internet Explorer 11

Dropping support of legacy environments means we can support new technologies and provide a secure product. For more details, please read about the [changes in supported environments](https://docs.camunda.org/enterprise/announcement/#camunda-bpm-7-13).


<!-- FEATURES EXPLANATIONS END -->

## And Much More
There are many smaller features and bug fixes in the release that are not included in this blog post, but the [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15532) provide the details.

## Register for the Webinar
If you're not already registered, be sure to secure a spot at the release webinar. You can register for free [here](https://register.gotowebinar.com/register/6891541377977636112).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM, and we rely on your feedback! Feel free to share your ideas and suggestions with us.

You can contact us via the [Camunda user forum](https://forum.camunda.org/t/camunda-bpm-7-13-0-feature-feedback/20355).
