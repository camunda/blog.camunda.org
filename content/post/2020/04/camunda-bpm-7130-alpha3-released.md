+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-04-03T11:55:00+01:00"
title = "Camunda BPM 7.13.0-alpha3 Released"
+++

We are happy to share the third alpha release of **Camunda BPM 7.13** with you!

This release features the following improvements:

- Feature Xxx
- Deployment-Aware Batch Operations
- DMN 1.3 Support in Cockpit
- Failed Activity ID in Cockpit
- ...
- [XX Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0-alpha3)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15990).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0-alpha3).

<!--more-->

## Feature Xxx

...

## Deployment-Aware Batch Operations

With this release, all [batch operations](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch-operations) that work on process-related elements, e.g. process instances, are deployment-aware.

Since [Monitor Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch#monitor-job) do not need any deployment-related resources anymore with this release as well,
only [Seed Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch#seed-job) and [Execution Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/batch#execution-jobs) are affected by this. Technically, seed jobs and execution jobs will receive a `deploymentId` so [deployment-aware job executors](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor#job-execution-in-heterogeneous-clusters) can pick up those jobs of a batch that need to be executed on their nodes.

The deployment id of the seed job is chosen from a list of involved deployments. The list of deployments involved in a batch is derived from the elements of the batch operation, e.g. for chosen process instances the deployments their process definitions belong to are fetched. Execution jobs only contain elements of the same deployment and are bound to it as well.

Make sure to check our [update guide](https://docs.camunda.org/manual/latest/update/minor/712-to-713#deployment-aware-batch-operations) for further details on this feature with regards to version updates.

## DMN 1.3 Support in Cockpit

With this release, Cockpit adds support for DMN 1.3, the next version of the DMN standard. If you edit and deploy DMN diagrams in Cockpit which use earlier versions of DMN, they will automatically be migrated to DMN 1.3.

The Camunda engine already supports the DMN 1.3 namespace since the lase alpha release, so there are no more steps required to migrate. Make sure you have the latest version of [Camunda Modeler](https://camunda.com/download/modeler/) installed to edit DMN 1.3 files locally.

## Failed Activity ID in Cockpit

With the first alpha of 7.13, we included the id of the failed activity in jobs and incidents for quicker root causing of failures (see the [related blog post](https://blog.camunda.com/post/2020/01/camunda-bpm-7130-alpha1-released/#show-failed-activity-in-jobs-incidents)). To find the exception root causes even faster, you can now view the Failed Activity in the Cockpit Job log.

{{< figure src="failing_activity_id.png" alt="Failing Activity in the Incidents Tab">}}

The new attribute can be found in these tables:

- the process instance jobs tab
- the incidents tabs
- the history job logs

## New Supported Environments

With this alpha release, Camunda BPM supports Java 14 and PostgreSQL 12.2.

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
