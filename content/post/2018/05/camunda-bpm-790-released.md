+++
author = "Svetlana Dorokhova, Nikola Koevski & Roman Smirnov"
categories = ["Execution"]
date = "2018-05-31T12:00:00+02:00"
tags = ["Release Note"]
title = "Camunda 7.9.0 Released"

+++

Camunda BPM platform 7.9.0 is now available, and the highlights are:

<!-- FEATURES LIST BEGINS -->
* Clients for External Tasks
* History Cleanup Performance Improvements
* Transient Variables
* New Features in Camunda Cockpit
* [119 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.9.0)
<!-- FEATURES LIST ENDS -->

<!--more-->

In addition, Wildfly 11, JBoss EAP 7.1, Tomcat 9, and the database Maria DB 10.2 are now officially supported.

You can [Download Camunda for free](https://camunda.com/download/) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

We have also released the Camunda Spring Boot Starter 3.0.0, which relies on Spring Boot 2.0.0 by default.

To see a full list of the changes, please check out our [Release Notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15096)
and the list of [Known Issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.9.0%20and%20status%20!%3D%20Closed).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.9.0).

<!-- FEATURES EXPLANATIONS BEGIN -->

## Clients for External Tasks

If your organization uses a microservices arcitecture, you can (and probably do) use Camunda BPM Platform as an orchestration engine. External tasks are an excellent
choice for this use case. Camunda now provides clients for external tasks, which can be embedded in other applications and significantly simplify dealing with external tasks 
 in the Camunda BPM Platform.
 
We provide two external task clients:

* [NodeJS external task client](https://github.com/camunda/camunda-external-task-client-js) for non-Java developers
* [Java external task client](https://github.com/camunda/camunda-external-task-client-java) - can be embedded in Java applications

You can find the Get Started Guide [here](https://docs.camunda.org/get-started/quick-start/).

## Significant History Cleanup Performance Improvements

Up to this point, the history cleanup was implemented in a way such that it could only be run in one thread. This guaranteed that the history cleanup process 
won't overload the application server and the database and does not have significant impact on the process engine performance. 
However, in some cases, that history cleanup is configured to be run only at night when the application is not used, thus  process engine performance is not a concern.
In such cases, you can now parallelize the history cleanup process by defining **degree of parallelism**, which specifies the possible number of threads 
simultaneously performing the cleanup.

Below, you can see the comparison of history cleanup performance running in one vs. three threads.

(The test was performed on the engine running on a standard PC and using Oracle 12 as a database)

{{< figure class="main teaser no-border" src="history-cleanup-number.png">}}

{{< figure class="main teaser no-border" src="history-cleanup-number-per-sec.png">}} 

In order to enable the feature, you should define the `historyCleanupDegreeOfParallelism` configuration parameter. For more information, please see 
[the docs](https://docs.camunda.org/manual/7.9/reference/deployment-descriptors/tags/process-engine/#history-cleanup-configuration-parameters).

## Transient Variables
 
Various data accompanying the process flow are usually stored as process variables. But it is often the case that there is some raw input data 
(such as a huge XML or JSON file), which must be preprocessed before being used in the process. Before version 7.9, you had to choose to either preprocess it "outside" 
the process and then pass the extracted granular process variables to the engine or to implement a "data processing" step inside the process. The latter forced you
to pass the entire raw dataset as a process variable. This means that it would be stored in the database, and even if you later removed the variable, it would still 
remain in history tables.

This problem can now be solved with the help of transient variables. You can pass the transient variable to the process and be sure that it 
will never be persisted in the database. However, it will be accessible as a normal variable until the next database transaction commit.

Visualizing such a process:

{{< figure class="main teaser no-border" src="transient_variables.png" >}}
  
You can start it with this REST call:
```test
POST /message

{
  "messageName" : "supportRequest",
  "processVariables" : {
    "requestData" : { 
      "value" : "[huge JSON content here]", 
      "type": "String"
      "valueInfo": {
        "transient": true
      }
    }
  }
}

```
or via Java API:

```java
runtimeService.createMessageCorrelation("supportRequest")
      //true in the second parameter indicates transient variable
      .setVariable("requestData", Variables.stringValue("huge JSON content here", true))      
      .correlate();
```

Message correlation will start the new process instance, then the service task "Extract client data" will be executed, where the passed variable can be used to extract
 client id and another data. After that, the database transaction will be committed (as the process has reached the waiting state), saving client id and other data in dedicated variables, 
 but `requestData` will cease to exist.

More information on usage of transient variables can be found in [the docs](https://docs.camunda.org/manual/7.9/user-guide/process-engine/variables/#transient-variables).

## More BPMN Features

Another super useful feature that Camunda now provides are [conditional start events](https://docs.camunda.org/manual/7.9/reference/bpmn20/events/conditional-events/#conditional-start-event) and [sending a payload when throwing a signal](https://docs.camunda.org/manual/7.9/reference/bpmn20/events/signal-events/#passing-variables).

## Docker Container for Camunda BPM Platform Enterprise

A Docker Container for Camunda BPM Platform Enterprise Edition is now available. Read more in the docs [here](https://docs.camunda.org/manual/7.9/installation/docker/).

## New Features in Camunda Cockpit

### Sortable Columns

This release brings another improvement to facilitate dealing with large amounts of data: most tables in Cockpit and Admin can now be sorted based on various criteria. 
In addition, sorting order is persisted so that a user does not need to sort again every time they open a certain view.

{{< figure class="teaser" src="SortableColumns.gif" alt="Sortable Columns" caption="Sortable Columns" title="Camunda BPM Cockpit" >}}

### User Operation Log

The user operation log both in process definition and in process instance view now shows the user who executed a specific operation.

{{< figure class="main teaser no-border" src="cockpit-user-operations.png">}} 


<!-- FEATURES EXPLANATIONS END -->

## And Much More

There are many smaller features and bugfixes in the release that aren't included in this blog post. The [full release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15096) provide the details.

## Register for the Webinar

If you're not already registered, be sure to secure a last-minute spot at the free release webinars, available in [German](https://register.gotowebinar.com/register/9024933668296248067) and [English](https://register.gotowebinar.com/register/1731630049188274947).

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we rely on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep annoying you, things that you think should work differently, and so on, please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
