+++
author = "Tassilo Weidner"
categories = ["Execution"]
tags = ["Release Note"]
date = "2017-08-31T12:00:00+01:00"
title = "Camunda 7.8.0-alpha3 Released"
+++

We are delighted to share the third alpha release of **Camunda BPM 7.8** with you!

This release features the following improvements:

* Batch process instance modification in Cockpit (EE)
* Faster rendering of BPMN diagrams in Cockpit
* Support for JSON and XML variable types in Cockpit
* History time to live for batch operations
* Global configuration for the failed job retry time cycle
* [20 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.8.0-alpha3)

To try out **Camunda BPM 7.8** you can [download](https://camunda.org/download/#latest) one of the distributions or pull and run the
[docker image](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

If you want to take a deeper dive, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.8.0-alpha3).

For a complete list of all improvements take a look at the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?version=14907&projectId=10230).
Please also see the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.8.0-alpha3).
<!--more-->

## Batch Process Instance Modification in Cockpit (EE)
Sometimes process instances somehow take a wrong turn or end up in a state they should not be in. Or, you need to "rewind", or
"go back" in order to re-execute some steps with different parameters. Since the release of Camunda BPM 7.3.0 it is possible to modify a
single process instance that way and with Camunda BPM version 7.7.0 you can modify multiple instances as a batch operation via API.

This release brings the batch modification feature to Cockpit! You find a new "Modify" tab on the process definition screen
that allows you to specify modification instructions for the process definition. Or just grab the tokens from the diagram and
move them somewhere else!

{{< figure class="teaser" src="batchmodification.gif" alt="Animation showing batch process instance modification"
caption="Modify multiple process instances as batch" title="Camunda BPM Cockpit">}}

> Please note that the Cockpit integration of the batch process instance modification is an enterprise feature. If you are
> not an enterprise customer yet, you can get a quote or request a free trial [here](https://camunda.com/bpm/enterprise/).

## Faster Rendering of BPMN Diagrams in Cockpit
Working with complex diagrams in **Camunda BPM Cockpit** was problematic as it took a long time to load and display these.

With this release, the diagram rendering speed is **up to 4x faster** than before.

{{< figure class="teaser no-border" src="speed-improvement.png" alt="Chart showing the increasing of speed from circa eight to two seconds"
caption="Loading a complex diagram – speed comparision in seconds" >}}

## Support for JSON and XML Variable Types in Cockpit
Cockpit provides the possibility to inspect, add, change and delete variables of process instances. Prior to this release,
JSON and XML variables were only supported on engine level but not in Cockpit.

This release enables you to add variables of these types:

{{< video mp4="addJsonXml.webm" alt="Animation showing the add action of JSON/XML variables"
title="Camunda BPM Cockpit" caption="Adding JSON/XML variables" >}}

Moreover, it is possible to edit and delete such variables. To do so, Cockpit is now equipped with strong JSON and XML
dynamic validators. Upon adding or editing a variable, the user instantly gets feedback if the JSON or XML value was malformed.

{{< video mp4="editJsonXml.webm" alt="Animation showing the edit action of JSON/XML variables"
title="Camunda BPM Cockpit" caption="Editing and deleting JSON/XML variables" >}}

## History Time to Live for Batch Operations
The last minor release of Camunda BPM introduced the
[History cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup)
feature. It allows you to remove outdated historic data on a periodical basis.

This release brings the history time to live feature to the historic data of batch operations. As soon as a batch operation
has been finished, the specified time begins to run. During this time period, the historic data is available until the
time has elapsed. Afterwards the history data is irretrievable, cleaned up and the used diskspace is available again.

The configuration can be specified globally or separately for each batch operation type in the `applicationContext.xml` file:

```xml
...
<!-- global -->
<property name="batchOperationHistoryTimeToLive" value="PT5D" />

<!-- per batch operation type -->
<property name="batchOperationsForHistoryCleanup">
  <map>
    <entry key="instance-migration" value="PT10D" />
    <entry key="instance-modification" value="PT7D" />
    ...
    <entry key="custom-operation" value="PT3D" />
  </map>
</property>
...
```

To take a well-informed decision based on real statistics for the history time to live parameter, the
[Cleanable batch report](https://docs.camunda.org/manual/latest/reference/rest/history/batch/get-cleanable-batch-report/)
helps to identify batch types producing larger amounts of historic data.

## Global Configuration for the Failed Job Retry Time Cycle
Whenever a job fails the engine takes care of retrying this job. By default there are two retries left if the job fails
for the first time. This behavior can be changed locally within the BPMN 2.0 XML for several BPMN notation elements
(e. g. tasks).

Starting with this release, the engine allows you to configure the job retry time cycle globally across all process
definitions. All jobs are affected by this unless they have a more specific local configuration.

The property can be set inside the deployment descriptor / process engine configuration:
```xml
...
<process-engine name="default">
  ...
  <properties>
    ...
    <property name="failedJobRetryTimeCycle">R5/PT5M</property>
  </properties>
</process-engine>
...
```

For more information about this feature please also see the
[documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#retry-time-cycle-configuration).

## Next Steps...
As usual the fourth alpha release is scheduled for the end of the next month and we are already working on it.

In order to shorten the waiting time we would like to issue an outlook of features which will be included in one of the
next alpha releases:

* Incorporate Spring Boot Starter extension as core feature
* Improved task selection
* Support for deleted historic variables (EE)

To get a complete overview of already implemented and planned features, please take a look at the [roadmap](https://camunda.org/roadmap).


The minor release of **Camunda BPM 7.8** is coming this fall (November 30, 2017).

## Share your thoughts with us!
Your feedback is really important to us, so please download **Camunda BPM 7.8.0-alpha3**, try it out, and let us know
what you think about it.

You can contact us in the [forum](https://forum.camunda.org/), send a tweet to [@camundaBPM](http://twitter.com/camundaBPM),
or file a bug in [our ticket system](https://jira.camunda.com/secure/CreateIssue!default.jspa).
