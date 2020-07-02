+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-06-15T12:00:00+00:00"
title = "Camunda BPM Runtime 7.14.0-alpha1 Released"
+++

We are happy to share the first alpha release of **Camunda BPM 7.14** with you!

This release features the following improvements:

- Feature 1
- Feature 2
- Feature 3
- Sending Telemetry
- [X Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.14.0-alpha1)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=16108).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.14.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.14.0-alpha1).

<!--more-->

## Feature 1

## Feature 2

## Feature 3

## Sending Telemetry

With this alpha, we are introducing an option to send telemetry data to Camunda. Such data will help us to have a better overview of product usage, e.g common environment setups, and improving our product by making decision based on it. By default, the feature it **disabled** and has to be explicitly enabled either with process engine configuration [option](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#initializeTelemetry) when setting up your Camunda instance or via Java/[REST](https://docs.camunda.org/manual/latest/reference/rest/telemetry/port-telemetry/) API later on whenever you decide to switch the option on or off. Please note the feature is still under development. Only if sending telemetry is enabled, the engine is going to send every 24 hours or upon engine stop the following data:
* process engine installation id
* process engine version and edition (`community` or `enterprise`)
* database vendor and version

## Share Your Thoughts with Us!

Your feedback is really important to us, so please download **Camunda BPM 7.14.0-alpha1**, try it out, and let us know
what you think about it.

You can contact us in the [forum](https://forum.camunda.org/), send a tweet to [@Camunda](https://twitter.com/Camunda),
or file a bug in [our ticket system](https://jira.camunda.com/secure/CreateIssue!default.jspa).

