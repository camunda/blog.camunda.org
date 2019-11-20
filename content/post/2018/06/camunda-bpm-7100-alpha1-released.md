+++
author = "Yana Vasileva"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-06-29T12:00:00+01:00"
title = "Camunda 7.10.0-alpha1 Released"
+++

The first alpha release of **Camunda BPM 7.10** is here and the highlights are:

* "Startable in Tasklist" Process Definitions
* "Jump to Tasklist" link from Process Instance View
* [17 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.10.0-alpha1)

You can <a href="https://camunda.com/download/">Download Camunda for free</a> (click on Preview Release) or <a href="https://hub.docker.com/r/camunda/camunda-bpm-platform/">Run it with Docker</a>.


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15318)

and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.10.0-alpha1).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.10.0-alpha1).

<!--more-->

## Query for "Startable in Tasklist" Process Definition

Imagine, you have a process, which is referenced from call activity of parent process, or processes with message, signal or conditional start events. Usually, such processes
 are not intended to be started directly, but rather triggered by some internal events. So far, they would still be shown under Tasklist "Start process" menu. 
 Now, with the new process attribute "*isStartableInTasklist*", you can define, whether the process should be startable from tasklist or not.

You can find simple example of a process below:
```xml
<process id="subProcess" 
         name="Process called from Super Process" 
		 isExecutable="true" 
		 camunda:isStartableInTasklist="false">
...
</process>
```

With then new Camunda version, you can query for "startable in Tasklist" processes via Java API or REST API:
```json
GET /process-definition?latestVersion=true&startableInTasklist=true
```
```java
repositoryService.createProcessDefinitionQuery()
        .latestVersion()
        .startableInTasklist()
        .list();
```
"notStartableInTasklist" filter option is available as well.

Stay tuned! In one of the next Alpha releases, the Tasklist will start using this query. 

## Jump to Tasklist link from Process Instance View

Previously we introduced link from Tasklist leading to the Process Instance View in Cockpit.
The new link can be used if you navigate to Process Instance (Runtime) View and open the User task panel.
Then you can easily navigate to the respective task in Tasklist. Simply click on the Task ID.

{{< figure src="jump-to-tasklist-link.png">}}

<!-- {{< figure class="main teaser no-border" src="jump-to-tasklist-link.png">}} -->

## Take a Sneak Peek at What Is Next
We are already eagerly busy preparing for the next alpha release, which is scheduled for end of July. 

Among other things, we are working on the following topics, which are planned to be released in one of the next alpha releases: 

* Security related improvements
* History Cleanup cascades down the process hierarchy

And there is more to come! Take a look at the [roadmap](https://camunda.com/learn/community/#roadmap) for the bigger list of planned features.


## Your Feedback Is Highly Appreciated!

With every release we constantly strive to improve **Camunda BPM**. To make this possible, we rely on your feedback.
Feel free to share your ideas and suggestions with us. 

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
