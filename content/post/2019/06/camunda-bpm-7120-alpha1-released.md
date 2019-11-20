+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-06-27T0:00:00+01:00"
title = "Camunda BPM 7.12.0-alpha1 Released"
+++

**Camunda BPM 7.12.0-alpha1** is here and the highlights are:

* Cockpit: BPMN Documentation
* Cockpit: Embedded Stacktraces
* [19 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.12.0-alpha1)

You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15494).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.12.0-alpha1).

<!--more-->

## Cockpit: BPMN Documentation
With this alpha release, we introduce another functionality to make managing processes in Cockpit easier: viewing the documentation of your processes.

If you have added documentation to the flow elements of your process, you can now view it in the process definition as well as the process instance view. This way, you don't need to switch to the Camunda Modeler when you want to access the documentation.

Documented elements are marked with an info sign (<i class="glyphicon glyphicon-info-sign"></i>) on the BPMN diagram. Clicking it will open a dialog to view the documentation. All documented elements are also listed in a table below the diagram. Clicking on a row will highlight the corresponding flow element in the diagram.

{{< figure src="bpmn_documentation.png" alt="Process Documentation">}}

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform. To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)

## Cockpit: Embedded Stacktraces
Not everything goes according to plan. Camunda provides several features to monitor your processes and intervene if necessary. Stacktraces of failed jobs is one of such features. Previously, these were only viewable in a separate browser window.

From now on, we display incident stacktraces directly in Cockpit, making it unnecessary to leave Cockpit and open new tabs in your browser. Of course, you can still directly link to the embedded stacktrace in case you need to send it to someone. Just open the stacktrace and copy the current browser URL.

{{< figure src="variable_filters.png" alt="Variable Filter View">}}

## Stay Tuned!

This is the first alpha release on the road to **Camunda BPM 7.12** (due November 30, 2019). The next developer preview 
(alpha 2) is scheduled in the end of July and will be packed with new features.

## Your Feedback Matters!

With every release, we strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
