+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-04-03T07:30:00+00:00"
title = "Camunda BPM 7.13.0-alpha3 Released"
+++

We are happy to share the third alpha release of **Camunda BPM 7.13** with you!

This release features the following improvements:

- Camunda BPM Supports DMN 1.3 End-to-End
- Failed Activity ID in Cockpit
- Progress on the Camunda Rest API OpenAPI Documentation 
- More Fine-Grained Historic Task Permissions
- Deployment-Aware Batch Operations
- New Supported Environments
- [12 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0-alpha3)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15990).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0-alpha3).

<!--more-->


## Camunda BPM Supports DMN 1.3 End-to-End

Camunda BPM product supports DMN 1.3 now end-to-end (from deployment to end user).
This release adds support in Cockpit for DMN 1.3, the next version of the DMN standard. If you edit and deploy DMN diagrams in Cockpit which use earlier versions of DMN, they will automatically be migrated to DMN 1.3.

The Camunda engine already supports the DMN 1.3 namespace since the last alpha release, so there are no more steps required to migrate. Make sure you have the latest alpha version of [Camunda Modeler](https://downloads.camunda.cloud/release/camunda-modeler/4.0.0-alpha.1/) installed to edit DMN 1.3 files locally and read all about in the [Modeler's blog post](https://blog.camunda.com/post/2020/03/camunda-modeler-4.0.0-alpha.1-released/).

## Failed Activity ID in Cockpit

With the first alpha of 7.13, we included the id of the failed activity in jobs and incidents for quicker root causing of failures (see the [related blog post](https://blog.camunda.com/post/2020/01/camunda-bpm-7130-alpha1-released/#show-failed-activity-in-jobs-incidents)). To find the exception root causes even faster, you can now view the Failed Activity in the Cockpit Job log.

{{< figure src="failing_activity_id.png" alt="Failing Activity in the Incidents Tab">}}

The new attribute can be found in these tables:

- the Process Instance Jobs tab
- the Incidents tabs
- the History Job logs

## Progress on the Camunda Rest API OpenAPI Documentation

This alpha brings even more additions to the OpenAPI documentation started in Camunda 7.13-alpha2. Now, you can also 
find documentation on the following endpoints:

* Condition
* Deployment
* Engine
* External Task
* Message
* Metrics
* Process Instance
* Signal
* Schema Log
* Task
* Version

If you are interested in our progress or if you want to check out the documentation, please feel free to download the 
JAR file [here](https://app.camunda.com/nexus/repository/camunda-bpm/org/camunda/bpm/camunda-engine-rest-openapi/7.13.0-alpha3/camunda-engine-rest-openapi-7.13.0-alpha3.jar).

## More Fine-Grained Historic Task Permissions

The example process shown below has two tasks. The token starts waiting in **Evaluate Yourself**, and 
the task is assigned to the employee Steve. When Steve enters his self-evaluation and completes 
the task, the token moves further to **Evaluate Employee**, and the task is assigned to Steves manager 
Kate.

{{< figure class="no-border" src="historic-task-permissions-process.png" alt="Example Process" >}}

Previously, Steve couldn't look up his self-evaluation after completing the task. With this release, 
an additional historic task read permission is granted when a user is assigned to a task that allows 
seeing the task-related history data (i. e., variable, detail & identity link log history).

You can enable the feature with the help of a process engine configuration flag:
```xml
<property name="enableHistoricInstancePermissions">true</property>
```

You can read more about the feature in the [User Guide].

## Deployment-Aware Batch Operations

With this release, all [batch operations](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch-operations) that work on process-related elements, e.g. process instances, are deployment-aware.

Since [Monitor Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch#monitor-job) do not need any deployment-related resources anymore with this release as well,
only [Seed Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch#seed-job) and [Execution Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch#execution-jobs) are affected by this. Technically, seed jobs and execution jobs will receive a `deploymentId` so [deployment-aware job executors](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor#job-execution-in-heterogeneous-clusters) can pick up those jobs of a batch that need to be executed on their nodes.

The deployment id of the seed job is chosen from a list of involved deployments. The list of deployments involved in a batch is derived from the elements of the batch operation, e.g. for chosen process instances the deployments their process definitions belong to are fetched. Execution jobs only contain elements of the same deployment and are bound to it as well.

Make sure to check our [Update Guide](https://docs.camunda.org/manual/latest/update/minor/712-to-713#deployment-aware-batch-operations) for further details on this feature with regards to version updates.

## New Supported Environments

With this alpha release, Camunda BPM supports Java 14 and PostgreSQL 12.2.

## Share Your Thoughts with Us!

Your feedback is really important to us, so please download **Camunda BPM 7.13.0-alpha3**, try it out, and let us know
what you think about it.

You can contact us in the [forum](https://forum.camunda.org/), send a tweet to [@Camunda](https://twitter.com/Camunda),
or file a bug in [our ticket system](https://jira.camunda.com/secure/CreateIssue!default.jspa).

[User Guide]: https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#historic-instance-permissions
