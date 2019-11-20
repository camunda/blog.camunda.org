+++
author = "Seif Eddine Ghezala"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-02-02T12:00:00+01:00"
title = "Camunda 7.9.0-alpha1 Released"
+++

The first alpha version of Camunda 7.9.0 is here and it is loaded with new features. The highlights are:

* Internationalization of Cockpit Full (Enterprise)
* Call Activity Drill Down in Cockpit
* Sortable and Persistent Table Columns in Cockpit and Admin 
* Restriction of Diagram Statistics by Time Period in Cockpit Full (Enterprise)
* Manual User Operations in Cockpit Full (Enterprise)
* Transient variables
* Conditional Start Event
* Support for Wildfly 11
* [40 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.9.0-alpha1)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15191) are available in Jira.

[List of known Issues.](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.9.0-alpha1)

You can [Download Camunda For Free](https://camunda.com/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

<!--more-->

## Internationalization of Cockpit Full (Enterprise)
Internationalization (i18n) basically means that in addition to the English language, further translations can be added in a simple way.

**Cockpit Basic** of the Community Platform 
[supports i18n since Camunda BPM 7.8](http://blog.camunda.org/post/2017/10/camunda-bpm-780-alpha5-released/#internationalization-i18n-for-cockpit-admin).
In this release, we also added this feature to **Cockpit Full** of the Enterprise Platform.

By default, the Camunda BPM Platform is only shipped with the English language. 
To add more translations, it is necessary to create or add a separate translation file to each webapp.
The selection of the language is performed automatically, based on the language settings in the browser.

A collection of several translations can already be found as a community extension in a 
[central repository](https://github.com/camunda/camunda-webapp-translations).
We highly appreciate your contribution to improve the current translations or to add new ones.

## Call Activity Drill Down in Cockpit
Navigating to called process instances in Cockpit can be very painful, especially when you have an sinificant number of them. To solve this issue, call activity
instances now have an overlay that links to their respective called process instances.

{{< figure class="teaser" src="CallActivity.gif" alt="Call Activity Drill Down" caption="Call Activity Drill Down" title="Camunda BPM Cockpit" >}}

## Sortable and Persistent Table Columns in Cockpit and Admin 
This release brings another improvement to facilitate dealing with large amounts of data: most tables in Cockpit and Admin can now be sorted based on various criteria. 
To avoid repetition when sorting tables, sorting order is also persisted whenever they are altered.

{{< figure class="teaser" src="SortableColumns.gif" alt="Sortable Columns" caption="Sortable Columns" title="Camunda BPM Cockpit" >}}


## Restriction of Diagram Statistics by Time Period  (enterprise)
To enhance viewing large amounts of data in the BPMN diagram heatmap, the interface overlaying the BPMN diagram has been improved. 
It is now possible to restrict the BPMN diagram statistics to only include activity instances for a specific period (i.e., today, this week, or this month).
However, it is also possible to remove any restrictions and show all the activity instances.

The default timer period can be set in the cockpit configurations file. Moreover, the configuration file allows to lock the default time period to prevent any possible changes in the period filter in Cockpit.

{{< figure class="teaser" src="heatmapTimePeriod.gif" alt="Activity Instance Restriction" caption="Activity Instance Restriction by timer period" title="Camunda BPM Cockpit" >}}

> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform.
> To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)

## Manual User Operations in Cockpit Full (enterprise)
You can now audit the activity of different users in the User Operations table. The table can be found in both the process definition as well as the process instance history views. The feature allows to view the history of various user operations (e.g., deleting a process instance) and information about the changes involved.


> Please bear in mind that this feature is only available in the Enterprise Edition of the Camunda BPM platform.
> To try it out anyway, please request a [Free Trial or Quote](https://camunda.com/enterprise/)

## Transient variables

A long awaited feature from some Camunda users.
With this alpha release we are introducing transient variables, i.e., variables which are not persisted to the database. You can only declare them through typed-value-based API.

You can find simple example below for the Java API:
```java
// start process instance with a transient variable
TypedValue typedTransientStringValue = Variables.stringValue("foobar", true);
runtimeService.startProcessInstanceByKey("transientExample",
        Variables.createVariables().putValueTyped("transientFoo", typedTransientStringValue));

// message correlation with a transient variable
VariableMap variables = Variables.createVariables().putValueTyped("blob", Variables.stringValue("blob", true));
runtimeService.correlateMessage("message", correlationKeys, variables);
```
This feature can also be use in the REST API. Here is an example of starting a process instance with a transient variable.

POST /process-definition/key/aProcessDefinitionKey/start
```json
{
 "variables":{
   "aVariable" : {
     "value" : "aStringValue", "type": "String"},
   "anotherVariable" : {
     "value" : true, "type": "Boolean",
     "valueInfo" : { "transient" : true  }
    }
 },
 "businessKey" : "myBusinessKey",
 "withVariablesInReturn": true
}
```
For more details, please see the documentation about the [Java API](https://docs.camunda.org/manual/latest/user-guide/process-engine/variables/#transient-variables)
and one of the examples for the [REST API](http://docs.camunda.org/manual/latest/reference/rest/process-definition/post-start-process-instance/#starting-a-process-instance-with-variables-in-return).

## Conditional Start Event
The conditional event defines an event which is triggered if a given condition is evaluated to true. 
Until now we only had conditional start events for Event Subprocesses. In this alpha release, it is now possible to start processes when the conditional start event is fulfilled. 

Let's check the below picture:

{{< figure src="start-condition.png" >}}

The process will be started if the temperature is higher than 22C°.
To do so through the Java API, you can trigger the evaluation of the deployed process' start conditions via RuntimeService:
```java
List<ProcessInstance> instances = runtimeService
    .createConditionEvaluation()
    .setVariable("temperature", 24)
    .evaluateStartConditions();
```
The REST API call would look like:  
POST /condition
```json
{
  "variables" : {
    "temperature" : {"value" : 24, "type": "Integer",
                    "valueInfo" : { "transient" : true } },
    "city" : {"value" : "Parma", "type": "String"}
  },
  "businessKey" : "aBusinessKey",
  "tenantId" : "aTenantId"
}
```
For more details, please see the documentation about the [Java API](https://docs.camunda.org/manual/latest/reference/bpmn20/events/conditional-events/#conditional-start-event) and the
[REST API](http://docs.camunda.org/manual/latest/reference/rest/condition/post-condition/).

## What's Next?
The next alpha version is scheduled for the end of February and our team is already working on it.

Here are few highlights if you want to know what the team is preparing for the next releases:

* Long polling
* Client for External Tasks

You can also find out more details if you check out our [roadmap](https://camunda.com/learn/community/#roadmap).

## Your Feedback Matters!
Your feedback is extremely important for us in order to improve Camunda BPM, so your thoughts are always highly appreciated and considered by our team.

Feel free to share your ideas and suggestions with us by writing a post in the [forum](https://forum.camunda.org/).

Furthermore, if you have any feedback related to User Experience, things that keep bugging you, things that you think should work differently etc., please share your thoughts with us at [https://camundabpm.userecho.com](https://camundabpm.userecho.com)
