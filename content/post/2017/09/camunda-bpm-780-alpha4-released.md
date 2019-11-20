+++
author = "Seif Eddine Ghezala"
categories = ["Execution"]
tags = ["Release Note"]
date = "2017-09-29T12:00:00+01:00"
title = "Camunda 7.8.0-alpha4 Released"
+++

How about a new release of **Camunda BPM 7.8** to spice things up?

Among the long list of new features in Camunda BPM 7.8-alpha4, the highlights are:

* Deletion of Process Definitions in Cockpit (EE)
* History Cleanup in Cockpit (EE)
* Batch Process Instance Restart (EE)
* Interval Configuration for Failed Jobs
* [11 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.8.0-alpha4)

You can [Download Camunda BPM 7.8](https://camunda.org/download/#latest) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


To see a full list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15091)
and the list of [Known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.8.0-alpha4).


If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.8.0-alpha4).
<!--more-->

## Deletion of Process Definitions in Cockpit (EE)
Until now, it has only been possible to erase process definitions in Cockpit by deleting a whole deployment. This behaviour is not sensible for any case as, generally speaking, a deployment consists of several process definitions and resources – including those that are possibly still required and not supposed to be deleted.

This release brings a new feature to Cockpit that allows to delete process definitions, regardless of their respective
deployments.

{{< video mp4="processDefinitionDeletion.mp4" title="Camunda BPM Cockpit" caption="Deleting process definitions" >}}

Apart from deleting individual versions, it is even possible to delete all versions of a process definition.

> Please bear in mind that this feature is only available in the Enterprise Edition of Camunda BPM.
> To try it out anyway, please request a [Free Trial](https://camunda.com/trial/) or a
> [Quote](https://camunda.com/bpm/enterprise/quote.php).

## History Cleanup in Cockpit (EE)

History cleanup is a functionality that makes the engine delete outdated data that mainly consists of finished process/decision/case instances and all their related data.

This version of Cockpit introduces a brand new page for this functionality. This page contains two main sections to manage the history cleanup functionality and to get useful reports that help configuring it more efficiently.

### History Cleanup Management Section
The first section contains all the necessary information about the state of the history cleanup.

{{< figure class="teaser" src="history-cleanup-states.gif" alt="History Cleanup Management" caption="History Cleanup Management" title="Camunda BPM Cockpit" >}}

In fact, the cleanup can be in 4 different possible states:

* There is currently no cleanup running.
* There is a cleanup scheduled in _x_ amount of time.
* The last running cleanup had incidents.
* There is neither a running nor a scheduled cleanup.


Moreover, this section of the cleanup page allows to perform operations on the history cleanup:

* Trigger a cleanup (only when there is no cleanup already running and when the last running history cleanup had no incidents).
* Retry the last run cleanup job (only if it had incidents).

### Cleanable Instances Report
The second section of the cleanup page contains reports that help configuring the history cleanup functionality more efficiently.

{{< video mp4="cleanable-instances-report.mp4" title="Camunda BPM Cockpit" caption="Cleanable Instances Report" >}}


This section displays information about the finished and cleanable process/decision/case instances and their respective **history time to live** configurations. Having this information in one view offers insights on whether any configuration changes need to be done.

Furthermore, it is possible to update the history time to live configuration for a certain process/decision/case definition directly from the table.

> **Notice:** this feature is only available in the Enterprise Edition of Camunda BPM.
> However, you can still try it out by requesting a [Free Trial](https://camunda.com/trial/) or a
> [Quote](https://camunda.com/bpm/enterprise/quote.php).

## Batch Process Instance Restart in Cockpit (EE)

[Last month’s release](https://blog.camunda.org/post/2017/08/camunda-bpm-780-alpha3-released/) introduced the batch process instance modification feature in Camunda Cockpit. Modification can be executed on process instances which are still running. But what about process instances which have already ended? Sometimes it is necessary to recreate or restart a process instance which has already ended. To achieve this, this release makes the [Process Instance Restart API](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-restart/) available in Camunda Cockpit.

The Process Instance Restart API allows to recreate one or multiple process instances from history. To specify which instances should be restarted, the list of finished process instances can be filtered by start- or end-date, variable values, business key [and more](https://docs.camunda.org/manual/latest/reference/rest/history/process-instance/post-process-instance-query/#request-body). The following animation shows how to restart all process instances with certain variable values:

{{< figure class="teaser" src="batchrestart.gif" alt="Animation showing batch process instance restart"
caption="Restart multiple process instances as batch" title="Camunda BPM Cockpit">}}

This operation is executed asynchronously using Camunda’s batch infrastructure. This ensures that the operation can also be executed on large sets of process instances.

## Interval Configuration for the Failed Jobs

In its default behaviour, the Camunda BPM engine takes care of retrying failed jobs automatically. After the initial failure, the job is only retried twice. However, the number of retries can be configured locally within the BPMN 2.0 XML for several BPMN notation elements (e.g., tasks).

The previous release introduced the possibility to configure the number of retrials globally with the property `failedJobRetryTimeCycle`. However, this property could only accept a static number.

This release introduces a new notation to configure the `failedJobRetryTimeCycle` property, allowing greater flexibility in the configuration of the number of retries of a failed job and the time of each retry:

```xml
...
<process-engine name="default">
  ...
  <properties>
    ...
    <property name="failedJobRetryTimeCycle">PT5M,PT20M,PT30M</property>
  </properties>
</process-engine>
...
```

In this example, the engine is configured to retry failed jobs 3 times with a delay of 5 minutes before the first retry, 20 minutes before the second one, and 30 minutes before the last one.

For more details about this feature, please check out the
[documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#retry-intervals).


## What's Next?
The next alpha version is scheduled for the end of October and our team is already working on it.

If you are curious about what the team is cooking for the next releases, here are few highlights:

* Support for Microsoft Edge
* Cockpit - Persistent Columns in Search

You can also find out more details if you check out our [roadmap](https://camunda.org/roadmap).

The minor release of **Camunda BPM 7.8** is coming this fall (November 30, 2017).

## Your Feedback Matters!
Your feedback is extremely important for us in order to improve Camunda BPM, so your thoughts are always highly appreciated and considered by our team.

Feel free to share your ideas and suggestions with us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep bugging you, things that you think should work differently etc., please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
