+++
author = "Daniel Meyer"
categories = ["Execution"]
date = "2015-11-30T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.4.0 Released"
+++

I’m pleased to announce the availability of Camunda 7.4.0 Final. The highlights of this release are:

* DMN - Decision Model and Notation
* New Camunda Modeler
* Job Executor Improvements
* BPMN Heatmap
* Extended BPMN Support
* Extended CMMN Support
* New Documentation

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Also: [Register for the Webinar](https://network.camunda.org/webinars/47).

For updating an existing installation or application, make sure to read the [update guide](https://docs.camunda.org/manual/7.4/update/minor/73-to-74/).

<!--more-->

# DMN - Decision Model and Notation

DMN is a new emerging standard by the OMG (Object Management Group) which can be used for "Business Decision Management".

It can be integrated seamlessly with BPMN and CMMN and allows modeling complex decision logic as Decision Tables. Such decision tables  are understandable by business domain experts but can also be executed directly:

{{< figure src="decision-table.gif" alt="DMN Decision Table" caption="A DMN Decision Table" >}}

Representing complex decision logic with DMN has many advantages:

* Compact representation of decision logic
* Business/IT Alignment: makes it easier for Business experts and developers to collaborate
* Business Agility: Decision Tables are easy to change and can be redeployed at runtime without changing the application 
* Explicit Versioning: Decision Tables can be explicitly versioned using a repository
* Auditing and Reporting: executed decision tables can be audited to understand why individual decisions were taken and to aggregate statistics and reports

More introductory information on DMN can be found in the [DMN Tutorial](https://camunda.org/dmn/tutorial/).

Camunda 7.4 provides end-to-end DMN Modeling and execution features:

* [Camunda Modeler for editing DMN](https://docs.camunda.org/manual/7.4/modeler/camunda-modeler/)
* [Lightweight DMN Engine implemented in Java](https://docs.camunda.org/manual/7.4/user-guide/dmn-engine/)
* [Integration of the DMN Engine with the Process Engine](https://docs.camunda.org/manual/7.4/user-guide/process-engine/decisions/) providing Decision Repository, Rest API, Decision History, Auditing and Integration with BPMN and CMMN
* [Integration into Camunda Cockpit](https://docs.camunda.org/manual/7.4/webapps/cockpit/dmn/)
* [DMN Implementation Reference](https://docs.camunda.org/manual/7.4/reference/dmn11/)

To get started quickly, see the following [Example](https://github.com/camunda/camunda-bpm-examples/tree/master/dmn-engine/dmn-engine-java-main-method).

# New Camunda Modeler

To learn about the new Camunda Modeler, read the [Release Blogpost](http://blog.camunda.org/post/2015/11/hello-new-camunda-modeler/).

Modeling for execution and matching process engine version: Camunda Modeler is compatible with Camunda Process Engine versions 7.4.0, 7.3.3, 7.2.6 or higher. Also please see the [migration note](https://docs.camunda.org/manual/7.4/update/minor/73-to-74/#changed-url-of-bpmn-extensions-namespace) about the Extension Namespace URL.

# Job Executor Improvements

There are two significant improvements to the [Job Executor](https://docs.camunda.org/manual/7.4/user-guide/process-engine/the-job-executor/):

* Support for [Priorities](https://docs.camunda.org/manual/7.4/user-guide/process-engine/the-job-executor/#job-prioritization)
* [Tunable Backoff](http://blog.camunda.org/post/2015/09/scaling-camunda-bpm-in-cluster-job/) reducing contention during job acquisition

# BPMN Heatmap

The [BPMN Heatmap](https://docs.camunda.org/manual/7.4/webapps/cockpit/bpmn/process-history-views/#heatmap) is a new feature in Cockpit.
It overlays a BPMN diagram with a "heatmap", showing the relative frequency with which activities and paths in a process are executed.

{{< figure src="heatmap.png" alt="The BPMN Heatmap" caption="The BPMN Heatmap in Cockpit" >}}

Or in other words: some tasks are simply "hotter" than others :).

# Extended BPMN Support

The release adds support for new BPMN symbols in the process engine.

Most prominently, Escalation is now supported. The support for compensation and signal events has been completed.
The following new events are added:

<div style="font-size:30pt" >{{< bpmn-icon name="start-event-non-interrupting-escalation" >}}
{{< bpmn-icon name="intermediate-event-catch-escalation" >}}
{{< bpmn-icon name="start-event-escalation" >}}
{{< bpmn-icon name="end-event-escalation" >}}
{{< bpmn-icon name="intermediate-event-throw-escalation" >}}
{{< bpmn-icon name="intermediate-event-catch-non-interrupting-escalation" >}}
{{< bpmn-icon name="start-event-compensation" >}}
{{< bpmn-icon name="end-event-compensation" >}}
{{< bpmn-icon name="start-event-signal" >}}</div>

On top of this, it is now possible to

* Use [Asynchronous Continuations with individual instances of an activity with multiple instance characteristics](https://docs.camunda.org/manual/7.4/user-guide/process-engine/transactions-in-processes/#asynchronous-continuations-of-multi-instance-activities)
* Invoke [DMN Decisions from BPMN Business Rule Task](https://docs.camunda.org/manual/7.4/reference/bpmn20/tasks/business-rule-task/)

# Extended CMMN Support

Camunda Process Engine now supports CMMN 1.1. Consider the [migration note](https://docs.camunda.org/manual/develop/update/minor/73-to-74/) in the update guide.

On top of this, the following new features were added:

* [Decision Task](https://docs.camunda.org/manual/7.4/reference/cmmn11/tasks/decision-task/): invoke DMN decision tables from CMMN
* [Repetition Rule](https://docs.camunda.org/manual/7.4/reference/cmmn11/markers/repetition-rule/): execute the same task multiple times

# New Documentation

We have spent considerable time and effort to give the documentation a complete makeover.
We hope that the new documentation is easier to work with than the old one.

Just compare:

* [the new documentation](https://docs.camunda.org/manual/7.4/)
* [the previous version](https://docs.camunda.org/manual/7.3/)

# And More

* New concept of [External Tasks](https://docs.camunda.org/manual/7.4/user-guide/process-engine/external-tasks/)
* [Deployment View in Cockpit](https://docs.camunda.org/manual/7.4/webapps/cockpit/deployment-view/)
* Support for Tomcat 8
* Native support for [File Variables](https://docs.camunda.org/manual/7.4/user-guide/process-engine/variables/#file-values) in Api and [Html Forms](https://docs.camunda.org/manual/7.4/reference/embedded-forms/controls/files/)
* Process Engine [logging migrated to SLF4J](http://stage.docs.camunda.org/manual/develop/update/minor/73-to-74/#special-considerations-1)

# Feedback

If you have feedback on the new release, please comment on this post or reach out in the [forums](https://groups.google.com/forum/#!forum/camunda-bpm-users).

It is still time to [register for the Release Webinar](https://network.camunda.org/webinars/47).

We are doing a Release Road Show in DACH, see [Next Meetings](https://network.camunda.org/meetings/) in network.
