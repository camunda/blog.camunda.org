+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-07-02T07:30:00+00:00"
title = "Camunda BPM Runtime 7.14.0-alpha1 Released"
+++

We are happy to share the first alpha release of **Camunda BPM 7.14** with you! As a bonus, we include an alpha release of the Java External Task client.

This release features the following improvements:

- Sending Telemetry
- Java External Task Client 1.4.0-alpha1
- [14 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.14.0-alpha1)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements, take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=16108).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.14.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.14.0-alpha1).

<!--more-->

## Sending Telemetry

With this alpha, we are introducing an option to send telemetry data to Camunda. The goal for this initiative is to offer you a great and stable user experience when using Camunda. The insights into common environment setups and product usage patterns we can gather will help us to make product development decisions to your benefit. A list to the type of information we can collect can be found [here](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#initializeTelemetry). By default, the feature it **disabled** and has to be explicitly enabled either with process engine configuration [option](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#initializeTelemetry) when setting up your Camunda instance or via Java/[REST](https://docs.camunda.org/manual/latest/reference/rest/telemetry/port-telemetry/) API later on whenever you decide to switch the option on or off. Please note the feature is still under development. Only if sending telemetry is enabled, the engine is going to send every 24 hours or upon engine stop the following data:

* process engine installation id
* process engine version and edition (`community` or `enterprise`)
* database vendor and version

## Java External Task Client 1.4.0-alpha1

This first 7.14 alpha release is accompanied by an alpha release of the Java External Task client, which comes with two new features.

### Fetch local variables only

When fetching external tasks, all variables visible to the external task are attached to the response and submitted to the external task worker. In some cases, users want to have more control over which of these variables should be included. The concept of [variable scopes and visibility](https://docs.camunda.org/manual/latest/user-guide/process-engine/variables/) helps to limit access to only the necessary ones, and the [REST API](https://docs.camunda.org/manual/latest/reference/rest/external-task/fetch/) provides a flag (`localVariables`) to include only local variables and exclude global variables.

The external task client was extended to make use of this. Now it is possible to limit the returned variables to local variables by using a new configuration option:

```java
  externalTaskClient.subscribe("topicName").localVariables(true).open();
```

### Fetch extension properties

Extension properties are custom key-value-properties that can be set on any BPMN activity, e.g., with the Camunda Modeler using the Extension tab in the Properties Panel.

For external tasks, we now support fetching these properties via the [REST API](https://docs.camunda.org/manual/latest/reference/rest/external-task/fetch/) (using the `includeExtensionProperties` flag) and the external task using a new configuration option:

```java
  externalTaskClient.subscribe("topicName").includeExtensionProperties(true).open();
```

## Share Your Thoughts with Us!

Your feedback is really important to us, so please download **Camunda BPM 7.14.0-alpha1**, try it out, and let us know
what you think about it.

You can contact us in the [forum](https://forum.camunda.org/), send a tweet to [@Camunda](https://twitter.com/Camunda),
or file a bug in [our ticket system](https://jira.camunda.com/secure/CreateIssue!default.jspa).

