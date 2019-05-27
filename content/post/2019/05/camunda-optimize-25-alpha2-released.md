+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-05-27T09:00:00+01:00"
title = "Camunda Optimize 2.5.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.5.0-alpha2.
You can find improvements and features from the upcoming Optimize version 2.5.0 in this second alpha release, including:

- Multi-Tenancy Support
- Flow Node + User Task Reports Enhancements
  - Show / Hide Configuration
  - Running, Completed, All State Configuration
  - Duration for Running Flow Nodes
- Group by End Date

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=xxx&version=xxxx) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Multi-Tenancy Support

Multi-Tenancy regards the case in which a single Camunda installation should serve more than one tenant. For each tenant, certain guarantees of isolation should be made. For example, one tenant’s process instances should not interfere with those of another tenant.

With Camunda BPM Runtime Platform Multi-Tenancy can be achieved in two different ways:
One way is to use one process engine per tenant. The other way is to use just one process engine and associate the data with tenant identifiers.

With this release of Optimize we add support for both Multi-Tenancy options for the first time. Let's have a look in more detail how this looks like:

## Tenant-specific Reports

In case you are working with tenants, Optimize allows you to select the tenant(s) you want to focus on within the Process Definition selection. Besides this it is possible to select "none" for analyzing process instances of the definition that have no tenant information. The Process Definition will look like this:

img

Naturally Optimize also considers authorizations for tenant specific information - meaning that if a user does not have access to a specific tenant, this tenant will not show up in the Report Builder and the user will not have access to reports that have been created by other users for this tenant.

## Setup

Depending on the chosen Multi-Tenancy option the Optimize configuratin has to be adjusted:

When you are making use of the `Single Process Engine With Tenant-Identifiers` option, Optimize automatically pulls the relevant tenant information from the Process Engine during import. This means that there is no additional setup required.


When you are making use of the `One Process Engine Per Tenant` option, it is required to configure a `defaultTenant` for each engine that you are connecting to Optimize in order to separate data correctly. During import of historic data this information will be added automatically.

The following `environment-configuration.yaml` configuration snippet illustrates the configuration of this defaultTenant on two different engines.

```yaml
...
engines:
  "engineTenant1":
    name: engineTenant1
    defaultTenant:
      # the id used for this default tenant on persisted entities
      id: tenant1
      # the name used for this tenant when displayed in the UI
      name: First Tenant
  ...
  "engineTenant2":
    name: engineTenant2
    defaultTenant:
      # the id used for this default tenant on persisted entities
      id: tenant2
      # the name used for this tenant when displayed in the UI
      name: Second Tenant
...
```

For more details regarding Multi-Tenancy we added a section in our [Technical Guide](https://docs.camunda.org/optimize/technical-guide/setup/multi-tenancy/).

# Flow Node Enhancements

Being able to analyze Flow Node information efficiently helps identifying bottlenecks and continuously speeding up process execution.
Therefore, we are happy to add more support for Flow Node and User Task analysis with this release.

## Show / Hide Flow Node Configuration

When looking at Flow Nodes and User Tasks per default you will see all Flow Nodes and User Tasks. Especially working with larger or more complex processes requires to focus on relevant information. With this release we added the possibility to hide certain flow nodes that are not relevant for your analysis.

Imagine a Hiring Process which can have different outcomes (End Events) then you might need to report the Number of End Events to upper management.

Within the Configuration Options Popover you will find a new Button which leads you to the selection overlay.
{{< figure src="flow-node-display-configuration.png" alt="Flow Node Display Configuration" >}}

You can make your selection by just clicking on the relevant flow nodes.
{{< figure src="flow-node-selection-overlay.png" alt="Flow Node Display Configuration Overlay" >}}

The result is a Flow Node Report focusing on the flow nodes that are relevant for you - in our example the End Events of the Hiring Process.
{{< figure src="flow-node-report.png" alt="Flow Node Report" >}}

## Running and Completed Flow Node Configuration

tbd


## Durations for Running Flow Nodes

Until this release it was already possible to analyze duration of completed flow nodes (including user tasks). As for continuous process improvement and monitoring purposes running flow nodes and user tasks are also very important, we added the duration for running flow nodes and user tasks, too. In combination with the above mentioned configuration option of running, completed or all flow node status it is now possible to create reports that focus on running flow durations.

# Group by End Date

Since Optimize 2.0 it is already possible to group process instance data (e.g. duration or count data) by the start date of the process instances. This is very valuable, but in some situations of analyzing historic process information it is more relevant to know when certain instances have been completed.

(exmaple)

With this Optimize release we add support for groping process instance information by end date.
This works in a very similar fashion as grouping by start date as you can see in below screenshot:



# What's Next?

Optimize 2.5.0-alpha2 is the last alpha release before we'll release the next minor **Camunda Optimize 2.5** at the end of the second quarter 2019. Stay tuned.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core Camunda BPM engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
