+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-02-28T08:55:00+01:00"
title = "Camunda BPM 7.13.0-alpha2 Released"
+++

We are happy to share the second alpha release of **Camunda BPM 7.13** with you!

This release features the following improvements:

* Job Execution with Managed Server Resources
* Query Jobs and Incidents by Failed Activity Ids
* Hostnames in Historic Job Log
* Full Coverage of DMN FEEL 1.2
* OpenAPI Documentation of REST API
* Camunda BPM Run
* [8 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0-alpha2)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15699).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0-alpha2).

<!--more-->

## Job Execution with Managed Server Resources

For [supported environments](https://docs.camunda.org/manual/latest/introduction/supported-environments#container-managed-process-engine-and-camunda-cockpit-tasklist-admin), Camunda BPM provides server modules that integrate the Job Execution with the application server's managed threadpools. If you are using one of those environments, it is recommended to use the integration provided with it. 

Integration into other JEE7+ compliant application servers is now offered by a new type of job executor: the `ManagedJobExecutor`. The purpose of this job executor is to ensure that job execution within the process engine is correctly controlled by the application server, by using managed resources (primarily: managed threads).

In order to facilitate the `ManagedJobExecutor`, the engine must be configured to use it. When bootstrapping the engine from Java code, you would create the new job executor like this:

```java
@ApplicationScoped
public class EngineBuilder {
  // Inject the ManagedExecutorService from the application server
  @Resource
  private ManagedExecutorService managedExecutorService;

  private ProcessEngine processEngine;
  private ManagedJobExecutor managedJobExecutor;

  @PostConstruct
  public void build() {
    // Create a new ManagedJobExecutor
    managedJobExecutor = new ManagedJobExecutor(this.managedExecutorService);
    // Create a process engine configuration 
    ProcessEngineConfigurationImpl engineConfiguration = ...
    // Other configuration
    // Use the ManagedJobExecutor
    engineConfiguration.setJobExecutor(managedJobExecutor);

    // Build the process engine
    processEngine = engineConfiguration.buildProcessEngine();
  }
}
```

Read more about the new job executor in [the documentation](https://docs.camunda.org/manual/latest/user-guide/runtime-container-integration/job-execution-with-managed-resources).

This feature was initiated by the community, particularly by [Tiese Barrell](https://github.com/tiesebarrell). 
Thanks for your great contribution on that topic!

## Query Jobs and Incidents by Failed Activity Ids

With the first alpha of 7.13, we included the id of the failed activity in jobs and incidents for quicker root causing of failures (see the [related blog post](https://blog.camunda.com/post/2020/01/camunda-bpm-7130-alpha1-released/#show-failed-activity-in-jobs-incidents)). 
Adding to that, jobs and incidents can now also be queried by the `failedActivityId` in the [REST API](https://docs.camunda.org/manual/latest/reference/rest/job/get-query/#query-parameters) and the Java API.

> Please note that the failed activity id has changed from `lastFailingActivityId` to `failedActivityId` in several APIs with this alpha.

## Hostnames in Historic Job Log

If you have multiple servers executing your Jobs, it is not clear if only a specific server is having trouble. With this alpha, the node which executed the Job is now displayed in the Job log to make debugging your process more comfortable.

{{< figure src="batch-job-log.png" alt="Job Log for failed Batches">}}

The Job Log is located in the history view of the Process Definition and Process Instance. We also added a Job Log for failed Batch Jobs. You can find it when inspecting a failed Batch. Keep in mind that history has to be enabled for this feature to work!

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform.
> To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)

## Full Coverage of DMN FEEL 1.2

Starting with this second alpha, we added full coverage of **DMN FEEL 1.2**. We achieved it by 
adding the former Community Extension **FEEL Scala Engine** to the Camunda Stack.

We will be releasing a more detailed blog post with a comprehensible example soon. 
In the meantime, you can read more about the feature here:

* [FEEL Scala Documentation]
* [FEEL in the User Guide]
* [Migration Guide for Camunda BPM <= 7.12 Users]

## OpenAPI Documentation of REST API

Another new addition within this alpha are the first steps of OpenAPI Documentation for the REST API. 
We started small by documenting the Process Instance REST endpoints according to the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification), so this is still work in progress. 
Our goal is a single `openapi.json` file that contains our OpenAPI documentation. 
If you are interested in our progress or if you want to check out the documentation, please feel free to download the JAR file containing it [here](https://app.camunda.com/nexus/repository/camunda-bpm/org/camunda/bpm/camunda-engine-rest-openapi/7.13.0-alpha2/camunda-engine-rest-openapi-7.13.0-alpha2.jar).

## Camunda BPM Run

Last but not least, we are proud to announce **Camunda BPM Run**, a new distribution of Camunda BPM that provides the Camunda web applications (Cockpit, Tasklist, Admin) and the REST API.
Camunda BPM Run is highly configurable and can be operated without any Java knowledge.
This alpha version ships the first increment of Run.

Follow these simple steps to start Run:

1. Download the distro from [here](https://app.camunda.com/nexus/repository/public/org/camunda/bpm/run/camunda-bpm-run/7.13.0-alpha2/camunda-bpm-run-7.13.0-alpha2.zip) (the Enterprise version can be found [here](https://app.camunda.com/nexus/repository/internal/org/camunda/bpm/run/camunda-bpm-run-ee/7.13.0-alpha2-ee/camunda-bpm-run-ee-7.13.0-alpha2-ee.zip)).
1. Unpack the downloaded archive
1. Put a BPMN file in `/configuration/resources` (optional)
1. Execute one of the start scripts (`start.bat` or `start.sh`)
1. Point your browser to http://localhost:8080 to access the Camunda webapps (Cockpit, Tasklist, Admin)
1. Access the REST API via http://localhost:8080/rest/engine

We will be releasing a more detailed blog post with a comprehensible example soon. 
In the meantime, you can read more about the feature here:

* [Installation Guide](https://docs.camunda.org/manual/latest/installation/camunda-bpm-run)
* [User Guide](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run)

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

[FEEL Scala Documentation]: https://camunda.github.io/feel-scala/
[FEEL in the User Guide]: https://docs.camunda.org/manual/latest/user-guide/dmn-engine/feel/
[Migration Guide for Camunda BPM <= 7.12 Users]: https://docs.camunda.org/manual/latest/update/minor/712-to-713/#entirely-replaced-feel-engine
