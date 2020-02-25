+++
author = "Thorben Lindhauer"
categories = ["Execution"]
date = "2016-05-31T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.5.0 Released"
+++

After six months of dedicated work, we are proud to announce the release of Camunda BPM 7.5.0.

The highlights are:

* Process Instance Migration
* Multi Tenancy with Tenant Identifiers
* Reporting API and Duration Report
* External Task Improvements
* Webapp UI/UX improvements
* New Supported Environments
* And More

[Download Camunda For Free](https://camunda.org/download/) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Register for release webinars held in [English language](https://network.camunda.org/webinars/75) and [German language](https://network.camunda.org/webinars/74) where we will present the new features to you.

Read the [update guide](https://docs.camunda.org/manual/7.5/update/minor/74-to-75/) to learn how to update an existing installation or application.

See our JIRA for a [list of known issues](https://jira.camunda.com/issues/?jql=project%20%3D%20%22camunda%20BPM%22%20and%20affectedVersion%20%3D%207.5.0) and the section at the end of this post on issues that we are fixing in the near future.

<!--more-->


# Process Instance Migration

{{< video mp4="migration.mp4" caption="Composition of Migration Plans in Camunda Cockpit" >}}

Today's organizations need to quickly adapt their processes to changing requirements. While they have the tools and skills to rapidly improve BPMN models and
supplementary code, immediate control over the state of running process instances is often lacking. The result is a gap between to-be processes and as-is processes.

Camunda BPM 7.5.0 closes that gap by providing the tools to apply improved process models to long-running process instances with minimal interference on process operations. In particular it contains:

* A powerful [Java and REST API to migrate process instances](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-migration/)
* A comprehensive [UI in Camunda Cockpit](http://docs.camunda.org/manual/7.5/webapps/cockpit/bpmn/process-instance-migration/) that puts migration at the fingertips of the end user (Enterprise Edition only)
* Infrastructure to migrate large numbers of process instances

{{< figure src="batch-migration.png" alt="Batch Dashboard" caption="Migration Status Reporting in Camunda Cockpit" >}}


# Multi Tenancy with Tenant Identifiers

{{< figure src="multi-tenancy-tenant-identifiers.png" alt="Multi-Tenancy with Tenant Identifiers" caption="Multi-Tenancy with Tenant Identifiers" >}}

The new release brings greater flexibility when using Camunda in a multi tenancy scenario. In addition to the existing approach with [one process engine per tenant](https://docs.camunda.org/manual/7.5/user-guide/process-engine/multi-tenancy/#one-process-engine-per-tenant) that separates data into different database schemas, you can now employ [a single process engine for all tenants](https://docs.camunda.org/manual/7.5/user-guide/process-engine/multi-tenancy/#single-process-engine-with-tenant-identifiers).
It reduces the effort to manage large tenant bases significantly.

The single engine approach uses *tenant identifiers* in the form of persistent attributes in the Camunda database schema.
Resources can be shared between all tenants or restricted to a single tenant. From a tenant's perspective, the multi-tenancy concept is transparent. Access
is restricted to their own data without interfering with other tenants.

In essence, the new Multi Tenancy feature provides:

* Persistent tenant markers for process engine resources
* Java and REST APIs to set and query by tenant markers
* Camunda Admin UI to manage tenants and tenant membership
* Authentication API for transparent resource access from a tenant's perspective
* Camunda web application filter for transparent resource access from a tenant's perspective
* Deployment of shared resources to manage common processes, cases, and decisions for all tenants in one place

{{< figure src="tenant-management.png" alt="Tenant Management in Camunda Admin" caption="Tenant Management in Camunda Admin" >}}


# Reporting API and Duration Report

{{< figure src="reports.png" alt="Reporting in Camunda Cockpit" caption="Process Instance Duration Report in Camunda Cockpit" >}}

Analyze process performance over a period of time with the new reporting features:

* A new history API to programmatically create process instance reports
* A corresponding Cockpit UI (Enterprise Edition only)

Find details on reporting in the [alpha1 blog post](https://blog.camunda.org/post/2016/01/camunda-bpm-750-alpha1-released).


# External Task Improvements

The [External Task Pattern](https://docs.camunda.org/manual/7.5/user-guide/process-engine/external-tasks/) is a Camunda feature to decouple BPMN flow evaluation in the process engine from task execution.

This release extends the external task concept by two aspects:

* [Signal BPMN errors](https://docs.camunda.org/manual/7.5/user-guide/process-engine/external-tasks/#reporting-bpmn-error) from an external task instance and trigger error-catching events
* Process [external tasks by priority](https://docs.camunda.org/manual/7.5/user-guide/process-engine/external-tasks/#specify-external-task-priorities)


# Webapp UI/UX Improvements

{{< figure src="cockpit-dashboard.png" alt="New Camunda Cockpit Dashboard" caption="New Camunda Cockpit Dashboard" >}}

In the recent months, we have made the Camunda UI more simple and consistent.
This affects the web applications (Cockpit, Tasklist, Admin) as well as the [online documentation](https://docs.camunda.org) and the [new user forum](https://forum.camunda.org).

The web applications contain the following improvements:

* Cleaner and more consistent web application UI
* [Full Keyboard Accessibility](https://docs.camunda.org/manual/7.5/webapps/tasklist/accessibility/) for Camunda Tasklist
* New Camunda Cockpit Dashboard
* New Camunda Admin Dashboard

[Read the focused blogpost blogpost](https://blog.camunda.org/post/2016/03/tasklist-2016-design/) that introduces the new concepts and compares the 7.4.0 Tasklist design to the new 7.5.0 Tasklist design.


# New Supported Environments

We add the following application servers to the list of supported environments:

* Wildfly 10
* Oracle WebLogic 12c R2 (Enterprise Edition only)


# And More

* [Version Tags for Process Definitions](http://docs.camunda.org/manual/7.5/user-guide/process-engine/process-versioning/#version-tag)
* [Fine-Grained Task Access Permissions](https://docs.camunda.org/manual/7.5/user-guide/process-engine/authorization-service/#additional-task-permissions)
* [Historic Identity Links](https://docs.camunda.org/manual/7.5/user-guide/process-engine/history/#history-entities)
* [Improved Fluent Builder for BPMN Model API](https://docs.camunda.org/manual/7.5/user-guide/model-api/bpmn-model-api/)
* [Per-Process-Application Configuration of Object Variable Serialization](https://docs.camunda.org/manual/7.5/user-guide/data-formats/data-formats-in-processes/#extending-serialization)
* 186 bugfixes

Read the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14091) for a complete list of features.


# Known Issues

Camunda 7.5.0 has a regression with the REST API resource for message correlation (see ticket [CAM-6139](https://jira.camunda.com/browse/CAM-6139)). We will release Camunda 7.6.0-alpha1 with a bug fix in the near future.


# What Do You Think?

What do you think about the new Camunda BPM features? Let us know in the [user forums](https://forum.camunda.org/) or in the comments section of this article!
