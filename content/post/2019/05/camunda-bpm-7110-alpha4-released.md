+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-05-03T08:00:00+01:00"
title = "Camunda BPM 7.11.0-alpha4 Released"
+++

**Camunda BPM 7.11.0-alpha4** is here and the highlights are:

* Change the Removal Time for Historic Processes
* Engine Wide History Time to Live
* More User Operation Log Entries
* Support for Password Policies
* Tasklist: Case-Insensitive Task Queries
* [8 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.11.0-alpha4)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15390).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.11.0-alpha4).

<!--more-->

## Change the Removal Time for Historic Processes
With Camunda BPM 7.10 we introduced a removal time-based History Cleanup mechanism. This mechanism requires a removal time for each historical instance. The removal time is the time after which an instance shall be removed.

Sometimes it is necessary to postpone or even prevent the deletion of certain historic process instances. Changing the removal time for certain instances was previously not possible.

This release introduces a Batch Operation to asynchronously set the removal time for historical processes and all related entities. The following example shows the usage of the Java API:
```java
HistoricProcessInstanceQuery query = historyService.createHistoricProcessInstanceQuery();

Batch batch = historyService.setRemovalTimeToHistoricProcessInstancesAsync()
  .byQuery(query)
  .absoluteRemovalTime(new Date()) // set an absolute removal time or null
  .executeAsync();
```

Besides the possibility to set the removal time to an absolute value, it is also possible to automatically calculate the removal time by calling the method `.calculatedRemovalTime()`.

Additionally, the removal time can be set across multiple hierarchies by calling the method `.hierarchical()`.

## Engine Wide History Time to Live
Introducing [History Cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup) to your Camunda BPM applications can reduce your footprint of history data radically.
However, adding the necessary `historyTimeToLive` to all your process, case and decision definitions can be tedious work to do.

Therefore, we are introducing the `historyTimeToLive` attribute in the [process engine configuration](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#historytimetolive)
that allows setting an engine-wide default for those definitions. This value is applied as the default whenever new definitions without TTL are deployed.

Please note that it does not change the TTL of already deployed definitions. You can either redeploy the definitions or use the API method shown below to change history time to live programmatically.

```java
processEngine.getRepositoryService().updateProcessDefinitionHistoryTimeToLive(processDefinitionId, 5);
```

## More User Operation Log Entries
Audit trails are an essential security element associated with business transactions. Our [user operation log](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#user-operation-log)
allows to keep track of the most important actions users can trigger within the Camunda BPM platform.

In an effort to increase the coverage on logged operations, we are introducing new logs for several actions:

* Create, update and delete users, groups, tenants, memberships, and authorizations
* Set and recalculate job due dates
* Synchronously delete historic process, decision and task instances
* Delete batches and historic batches
* Manually trigger the history cleanup
* Resolve incidents
* Update the history time to live on decision and case definitions
* Create, update and delete filters
* Delete metrics
* Execute and delete jobs
* Set the priority of and unlock external tasks

You can see the full [list of logged user operations](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#glossary-of-operations-logged-in-the-user-operation-log) in the documentation.


## Support for Password Policies
Most online users should know about the importance of choosing a secure password. However, each year the [list of most commonly used passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords) is dominated by passwords like `123456`, `password` and `qwerty`.

With this alpha release, we introduce password policies that can be used to enforce certain security standards when choosing a password. Note that this applies only for users that are managed within the Camunda engine. LDAP user management is not affected.

To enable the default password policy set the `enablePasswordPolicy` setting in the engine configuration. The default policy enforces a minimum length (10 characters) and at least one lower case, upper case and special character as well as at least one digit.

It is also possible to deploy your own password policy. More information on that can be found in the [user guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/password-policy/).

## Tasklist: Case-Insensitive Task Queries
In the last alpha release, we introduced a new API to filter task variables case-insensitively. Camunda Tasklist now makes use of this feature when searching for specific tasks. After adding a variable filter to your search, a widget will appear. Using the checkboxes, you can configure how you want the variable names and values to be handled.

{{< figure src="variable_filters.png" alt="Variable Filter View">}}

This filter works for Task-, Case- and Process Variables.

<!--no-more-->

## What's Next?

This is the fourth alpha release on the road to **Camunda BPM 7.11** (due May 31, 2019). Please have a look at our [roadmap](https://camunda.com/learn/community/#roadmap) for what's still to come.

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

