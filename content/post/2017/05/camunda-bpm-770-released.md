+++
author = "Daniel Meyer"
categories = ["Execution"]
date = "2017-05-31T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.7.0 Released"
+++

Camunda BPM Platform 7.7.0 is here, greatly improving the technical operations of the platform.

The highlights are:

* Automated, configurable "cleanup" of the history database to avoid large amounts of data
* New features for Camunda Cockpit (monitoring of external tasks, direct deployment of processes, drill-down for monitoring metrics)
* Drastic reduction of optimistic locking exceptions when using Job Executor
* Process Instance Modification for large batches (via API)
* Process Instance Restart API (single and batch)
* Improved and more detailed documented security mechanisms
* Additional technical supported environments (IBM WAS 9, PostgreSQL 9.6, MySQL 5.7).

The [complete release notes][release-notes] are available in Jira.

[List of known Issues.](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.7.0)

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

[release-notes]: https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14607

<!--more-->

# Automated, configurable cleanup of history data

When executing models (BPMN, DMN, CMMN) Camunda can create an audit log containing a complete record of every executed step along with input and output data. This audit log is called "History".

As more and more models are executed the amount of history data grows, disk space can become an issue and query performance can degrade.

Camunda BPM 7.7 now introduces a new, fully automated and configurable mechanism for cleaning up history data once it is not needed anymore.

To use the cleanup mechanism, it is now possible to define a **History Time to Live (TTL)** for BPMN, DMN and CMMN models. The TTL can be defined directly in XML, via API or in Cockpit. The TTL controls for how long the history for a finished Process Instance is kept before it is deleted. The following is an example of the TTL definition of 5 days for a BPMN process:

```xml
<process id="myProcess" [...] camunda:historyTimeToLive="5">
    ...
</process>
```

The cleanup mechanism uses Camunda's Job Executor to run in the background. It is highly configurable: users can control when it runs (by defining a so called "batch window") and how much data it deletes in a single transaction (by defining the "batch size").

More details on the history cleanup mechanism can be found in the [documentation](https://docs.camunda.org/manual/7.7/user-guide/process-engine/history/#history-cleanup).

# New Features in Camunda Cockpit

This release adds many new features in Cockpit. In this blogpost we can only present the three main highlights: monitoring of external task information, deployments and drill down for metrics.

## History API and monitoring for External Tasks

[External tasks](https://docs.camunda.org/manual/7.7/user-guide/process-engine/external-tasks/) are a very powerful feature in Camunda to build resilient systems.

So far, no history data was collected and it was not possible to monitor external tasks in cockpit. These features are added with this release.

In cockpit, users can now see more details on external tasks, both in runtime and history views. The runtime view shows the currently open external tasks for the selected process instance. The history view shows the external task log:

{{< figure class="teaser" src="cockpit-external-task-history.png" caption="External Task Log in Cockpit History View" >}}

## Deployments from Cockpit

It is now possible to deploy BPMN, CMMN and DMN models directly from cockpit's deployment view:

{{< figure class="teaser no-border" src="cockpit-deploy.png" caption="Deployment of a BPMN model directly from cockpit." >}}  

## Metrics Drill Down

It is now possible to select a time span in the chart and find the corresponding process instances, jobs and decisions which were executed during that time:

{{< figure class="teaser no-border" src="metrics-drilldown.png" caption="Select a time span in metrics chart to drill down." >}}

# Drastic reduction of optimistic locking exceptions when using Job Executor

This release features an optimization which drastically reduces the number of optimistic locking exceptions when using the job executor. Our [blogpost on the alpha version release]({{< ref "/post/2017/02/camunda-bpm-770-alpha1-released.md" >}}) which first introduced this feature has the details.

# Batch Process Instance Modification and Restart API

Sometimes a BPMN process instance needs to be repaired and some steps need to be repeated or skipped. Some common causes for this are: incorrect data/payload has been provided or an error in an external system has occurred and now some steps need to be repeated.

To deal with such situations, Camunda introduced the very powerful [process instance modification API](https://docs.camunda.org/manual/7.7/user-guide/process-engine/process-instance-modification/) in previous releases. This API allows a process instance to "go back" or "skip ahead" in the process. However, up until now, this only worked on a single process instance. Starting with 7.7. process instance modification can now be executed on a (potentially large) batch of process instances.

For example, the following code snipped selects all process instances currently waiting inside the activity "review-invoice" and causes them to go to the "select-approver" activity:

```java
runtimeService.createModification("invoice")
    .processInstanceQuery(runtimeService.createProcessInstanceQuery().activityIdIn("review-invoice"))
	  .cancelAllForActivity("review-invoice")
	  .startAfterActivity("select-approver")
	  .executeAsync();
```

More details can be found in the documentation on [process instance modification](https://docs.camunda.org/manual/7.7/user-guide/process-engine/process-instance-modification/) and [batch operations](https://docs.camunda.org/manual/7.7/user-guide/process-engine/batch-operations/)

Modification can be executed on process instances which are still running. But what about process instances which have already ended? Sometimes it is necessary to recreate or restart a process instance which has already ended. To achieve this, a completely new API has been introduced, the [process instance restart API](https://docs.camunda.org/manual/7.7/user-guide/process-engine/process-instance-restart/).

The process instance restart API allows to recreate one or multiple process instances from history. For example, the following code snippet restarts all process instances which were finished (ended) today with their initial set of variables:

```java
Date now = ...;
Date midnight = ...;

runtimeService.restartProcessInstances("invoice")
	    .historicProcessInstanceQuery(historyService.createHistoricProcessInstanceQuery().finishedBefore(now).finishedAfter(midnight))
	    .startBeforeActivity("startEvent")
	    .initialSetOfVariables()	    
	    .executeAsync();
```

Again, the operation is executed asynchronously using Camunda's batch infrastructure. This ensures that the operation can be executed even if the `HistoricProcessInstanceQuery` returns a large set of results.

# Security Improvements

The 7.7. release also ships a set of security improvements.

First, the security of user passwords was improved:

* Random salt generation is now used to defend against dictionary attacks.
* By default, a stronger hashing algorithm is used.

As almost everything in Camunda, both hashing and salting is implemented as pluggable SPIs, allowing users to customize the process and use the algorithms of their choice. The [documentation](http://docs.camunda.org/manual/7.7/user-guide/process-engine/password-hashing) has the details and the following [blogpost]({{< ref "/post/2017/02/customize-pw-hash.md" >}}) gives an example.

Second, there is now a [step by step documentation](https://docs.camunda.org/manual/7.7/user-guide/security/) guiding users through aspects of Camunda which are relevant from a a security point of view.

# Much more

There are many more smaller features and bugfixes in the release which cannot be presented here in the blogpost. The [full release notes][release-notes] provide the details.

# Register for the Webinar

If you have not already, make sure to place a last-minute registration for the free release [webinars](https://network.camunda.org/webinars/98).

## Feedback Welcome

Please try out the awesome new features of this release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).
