+++
author = "Daniel Meyer"
categories = ["Execution"]
date = "2016-11-30T11:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.6.0 Released"
+++

Camunda 7.6.0 is here and it is packed with new features. The highlights are:

* DMN Decision Requirements Diagrams (Engine, Modeler, Cockpit)
* Shiny new Dashboard (Cockpit)
* BPMN Conditional Events (Engine, Modeler)
* Batch Operations (Engine, Cockpit)
* CMMN modeling and monitoring (Modeler, Cockpit)
* Human Task Monitoring and Reporting (Cockpit)
* Rolling Updates (Engine)
* 148 Bug Fixes

[List of known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.6.0)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14490) are available in Jira.

This is a joint release of the BPM Runtime Platform and the [Camunda Modeler version 1.5](http://blog.camunda.org/post/2016/11/camunda-modeler-015-released/).

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

# DMN Decision Requirements Diagrams

With this version, DMN gets a major feature update:

* Model, execute and monitor DMN Decision Requirements Diagrams (DRDs),
* Model, execute and monitor DMN Literal Expressions.

DRDs allow **decomposing complex decision logic** into different parts or aspects. The following is an example of a DRD with annotations:

{{< figure class="main teaser no-border" src="drd.png">}}

In order to learn more about DRDs, consult the following resources:

* [DMN Tutorial](https://camunda.org/dmn/tutorial/#drd)
* [DMN Getting Started](https://docs.camunda.org/get-started/dmn11/)
* [DMN Modeling with Camunda Modeler](https://docs.camunda.org/manual/7.6/modeler/camunda-modeler/dmn/)
* [DMN Reference Documentation](https://docs.camunda.org/manual/7.6/reference/dmn11/drg/)
* [DMN Cockpit Documentation](https://docs.camunda.org/manual/7.6/webapps/cockpit/dmn/)

Literal Expressions are an alternative to Decision Tables. They can be used whenever decision logic is cannot be formulated as a Decision Table but is implemented as an expression. In order to learn more about Literal Expressions, consult the following resources:

* [Documentation on Literal Expressions](https://docs.camunda.org/manual/7.6/reference/dmn11/decision-literal-expression/)

_Open source vs. Enterprise: DMN execution engine and Modeler are open source, Monitoring in Cockpit is an enterprise feature._

# Shiny new Dashboard

Cockpit Dashboard receives a complete makeover:

{{< figure class="main teaser no-border" src="cockpit-dashboard.png">}}

The "Right Now" card shows currently open process instances, incidents and tasks. The "Metrics" section shows process engine activity over time and compares it to the previous period. The "Deployed" card gives a summary of deployed resources.

_Open source vs. Enterprise: Metrics card is enterprise, others are open source._

# BPMN Conditional Events

We are particularly proud to roll out support for the mighty & powerful BPMN Conditional Events with this release.

Conditional Events allow waiting for a condition to become true and then react by performing additional steps or interrupting the current steps and taking another path in the process:

{{< figure class="main teaser no-border" src="bpmn-conditional.png">}}

Support for conditional events is added in execution and modeling. Resources on Conditional Events:

* [BPMN Modeling Reference](https://camunda.org/bpmn/reference/#events-conditional)
* [BPMN Implementation Reference](https://docs.camunda.org/manual/7.6/reference/bpmn20/events/conditional-events/)

_Open source vs. Enterprise: Engine and Modeler are open source._

# Batch Operations

Often, operators need to perform administrative operations on large numbers of process instances. Camunda 7.6.0 introduces new APIs and Cockpit views to run such operations through the engine's batch framework.

In detail, the following operations are supported:

* Canceling batch of running process instances
* Incrementing Retries for a batch of process instances
* Deleting batch of finished process instances from history (cleanup)

The APIs work in a way that they can be executed on a list of process instance ids or on a search query (engine runs the query internally and performs operation on each instance returned.)

Cockpit provides a view allowing users to search for process instances and execute an operation:

{{< figure class="main teaser no-border" src="batch-operation.png">}}

Resources:

* [Cockpit Documentation](https://docs.camunda.org/manual/7.6/webapps/cockpit/batch/)
* [Engine Documentation](https://docs.camunda.org/manual/7.6/user-guide/process-engine/batch/)

_Open source vs. Enterprise: Batch operations in Engine are open source, Cockpit views are enterprise._

# CMMN Modeling and Monitoring

CMMN is now available full stack by adding support for modeling and monitoring in Cockpit.

The Camunda Modeler allows to model all CMMN Symbols and configure Camunda's properties extensions for execution:

{{< figure class="main teaser no-border" src="cmmn-modeler.png">}}

Cockpit now provides visibility into the CMMN execution allowing users to search through case instances, inspect their status and perform administrative actions and corrections:

{{< figure class="main teaser no-border" src="cmmn.png">}}

Resources on CMMN modeling and monitoring:

* [CMMN Cockpit Documentation](https://docs.camunda.org/manual/7.6/webapps/cockpit/cmmn/)
* [CMMN Modeling Documentation](https://docs.camunda.org/manual/7.6/modeler/camunda-modeler/cmmn/)

_Open source vs. Enterprise: CMMN execution engine and Modeler are open source, Monitoring in Cockpit is an enterprise feature._

# Human Task Monitoring and Reporting

Cockpit now allows users to search human tasks and get reports and statistics:

{{< figure class="main teaser no-border" src="cockpit-open-tasks.png">}}

Resources on Human Tasks in Cockpit:

* [Open Tasks Dashboard](https://docs.camunda.org/manual/7.6/webapps/cockpit/tasks-dashboard/)
* [Completed Tasks Reports](https://docs.camunda.org/manual/7.6/webapps/cockpit/reporting/#completed-task-instance-report)

_Open source vs. Enterprise: Task monitoring in Cockpit is an enterprise feature._

# Rolling Updates

Rolling updates allow performing a Camunda update in a cluster with no or minimal down time. The nodes are updated one by one or in groups. During the update process, it is ensured that at least one node is available to handle incoming requests, guaranteeing availability and minimizing downtime.

Starting from 7.6.0 Camunda guarantees backwards compatibility of the database schema in a way that rolling upgrades can be orchestrated. An example orchestration is explained in the docs:

{{< figure class="main teaser no-border" src="rolling-updates.png">}}

Resources on rolling updates:

* [Documentation](https://docs.camunda.org/manual/7.6/update/rolling-update/)

_Open source vs. Enterprise: Engine is open source._

# Register for the Webinar

If you have not already, make sure to place a last-minute registration for the release [Webinar](https://network.camunda.org/webinars/91)

# Feedback Welcome

If you have questions or feedback on the release, please do not hesitate to post in the [forums](https://forum.camunda.org/).
