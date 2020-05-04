+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-04-29T07:30:00+00:00"
title = "Camunda BPM 7.13.0-alpha4 Released"
+++

We are happy to share the fourth alpha release of **Camunda BPM 7.13** with you!

This release features the following improvements:

- Read Permission for Historic Process Instances
- Query for Definitions by Deployment Time
- [14 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0-alpha4)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=16011).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.13.0%20AND%20status%20!%3D%20Closed%20).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.13.0-alpha4).

<!--more-->

## Read Permission for Historic Process Instances

Previously, it was only possible to grant a user read permission on historical data in a very 
coarse-grained manner for all instances related to a particular process definition key at once 
and not fine-grained only for certain process instances. Alpha 4 introduces the feature to grant 
read permission on specific Historic Process Instances.

You can enable the feature with the help of a process engine configuration flag:
```xml
<property name="enableHistoricInstancePermissions">true</property>
```

Read more about the feature in the [User Guide].


[user guide]: https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/#historic-instance-permissions

## Query for Definitions by Deployment Time

All Process and Decision Definitions receive a timestamp when deployed to the engine. Sometimes it
would be useful to be able to query for only those definitions that were deployed after or at a
given moment (e.g. to only fetch the definitions that were added after your last query).

With this release we expanded the capabilities of the `ProcessDefinitionQuery` and the
`DecisionDefinitionQuery` so you can do just that. Both queries now have filter and sort options
for deployment time.

```java
query.deployedAfter(Date deployedAfter);
query.deployedAt(Date deployedAt);
query.orderByDeploymentTime().desc();
```

The same functionality was added to the equivalent REST endpoints. You can find the details
described in the REST documentation for 

* [GET /process-definition](https://docs.camunda.org/manual/latest/reference/rest/process-definition/get-query/)
* [GET /decision-definition](https://docs.camunda.org/manual/latest/reference/rest/decision-definition/get-query/)

## Share Your Thoughts with Us!

Your feedback is really important to us, so please download **Camunda BPM 7.13.0-alpha4**, try it out, and let us know
what you think about it.

You can contact us in the [forum](https://forum.camunda.org/), send a tweet to [@Camunda](https://twitter.com/Camunda),
or file a bug in [our ticket system](https://jira.camunda.com/secure/CreateIssue!default.jspa).
