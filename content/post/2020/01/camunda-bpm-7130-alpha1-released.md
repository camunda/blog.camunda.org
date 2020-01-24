+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-01-31T11:00:00+01:00"
title = "Camunda BPM 7.13.0-alpha1 Released"
+++

**Camunda BPM 7.13.0-alpha1** is here and the highlights are:

* Feat 1
* Show Failed Activity in Jobs & Incidents
* Oracle 19c Support
* [XX Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0-alpha1)


You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

<!-- TODO: Add link to release notes -->
If you are interested, you can see the complete [release notes](#foo).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0-alpha1).

<!--more-->

## Feat 1

Your text here...

## Show Failed Activity in Jobs & Incidents

Quick discovery of exception root causes can be key to a frictionless operation of processes. Among other tools, Camunda provides job logs and incidents to easily gain insights into failures and their causes. For specific scenarios this can however be harder to achieve than desired. Take the following example:

1. A process has two tasks `foo` and `bar`.
2. Task `foo` is marked as `asyncBefore`.
3. The execution of task `bar` fails.

In that case, the job and its job log will only show the failure's stacktrace and the id of task `foo` as the related activity of the asynchronous continuation job. However, identifying the actually failing task `bar` as the root cause here is a rather manual task that might for example involve further investigations of server log statements.

With this release, runtime and history data for jobs and incidents will additionally provide the id of the activity that caused the failure. With this, the root cause of a failure will be more accessible and also digestible as structured information.

You can find the new `lastFailingActivityId` in numerous REST request results as shown in the [Get Jobs](https://docs.camunda.org/manual/latest/reference/rest/job/get-query/#result) and the [Get Historic Incidents](https://stage.docs.camunda.org/manual/latest/reference/rest/history/incident/get-incident-query/#result) endpoints.

## Oracle 19c Support

Starting with this alpha, Camunda is officially supported to run on Oracle 19c.

## What's Next?

This is the first alpha release on the road to **Camunda BPM 7.13** (due May 31, 2020). 
<!-- TODO: Add future features -->
Stay tuned for more features around ...

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).