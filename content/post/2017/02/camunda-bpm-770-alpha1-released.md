+++
author = "Daniel Meyer"
categories = ["Execution"]
date = "2017-01-10T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.7.0-alpha1 Released"
+++

Camunda 7.7.0-alpha1 is here and it is packed with new features. The highlights are:

* Webapps: drill down in Metrics Charts and general facelift
* Core Engine: drastic reduction of optimistic locking exceptions when using Job Executor
* External Tasks: History API and monitoring in Cockpit
* Fluent BPMN builder API: now generates BPMN diagram elements
* Supported Environments: IBM Websphere 9 and OpenJDK 8
* Security: salts and stronger hashing of user passwords
* [32 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.7.0-alpha1)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14609) are available in Jira.

[List of known Issues.](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.7.0-alpha1)

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

<!--more-->

## Drill down in Metrics Charts

7.6.0 introduced the metrics charts on the cockpit dashboard. The charts show the number of activity instances, jobs and decisions executed over time. For example, the following is a screenshot taken from a production instance of Camunda 7.6.0 which we use internally:

{{< figure class="teaser no-border" src="metrics.png" caption="Spike in executed Jobs before 02 Feb." >}}

We can see that there is a spike in executed jobs just before 02 Feb (End of January). While this is interesting to see, there was no way to drill down from the chart and find the process instances which were active during this time.

With this release we changed that. With 7.7.0-alpha1 it is now possible to select a time span in the chart and find the corresponding process instances, jobs and decisions which were executed during that time:

{{< figure class="teaser no-border" src="metrics-drilldown.png" caption="Select a time span in metrics chart to drill down." >}}

(Unfortunately the second screenshot shows different data than the first one but I hope that the idea gets clear.)

## Webapps Face Lift

As part of our continuous effort to improve the looks of our webapplications, this release delivers a facelift for Cockpit, Tasklist and Admin. Can you spot the difference in the header and dashboard cards?

{{< figure class="teaser no-border" src="cockpit-dashboard.png" alt="Cockpit Facelift" caption="Cockpit got a Facelift!" >}}

Also, inputs and other form controls were simplified and now have a cleaner UI:

{{< figure class="teaser no-border" src="tasklist.png" alt="Tasklist Facelift" caption="Cleaner and simpler input fields in Tasklist" >}}

## Drastic reduction of optimistic locking exceptions when using Job Executor

This is a big one and it will make users who want to run larger fork/join-style processing with multi instance very happy.

Consider the following two BPMN processes:

{{< figure class="teaser no-border" src="fork-join.png" alt="Historic Task Report" caption="" >}}

The main process iterates over a list containing ~5000 items. For each item, a call activity is executed which invokes another process which processes the item. To effectively parallelize the work performed in the sub process, the sub process is processed asynchronously by the job executor. This way the individual sub process executions can be distributed to different threads (and different nodes in the cluster). Once a subprocess execution is completed, it signals back to the main process, where all the individual sub process executions are joined. While the processing after the fork can be parallelized, the joining cannot.

We setup a similar process in qa and configured it in a way that it produced ~27K jobs. Running it 7.6.0 produced ~43K Optimistic Locking Exceptions on the multi instance join. After analyzing the cause and strengthening the implementation of exclusive jobs, 7.7.0 can run this same scenario without any optimistic locking errors at all!

{{< figure class="teaser no-border" src="optimistic-locking-exceptions.png" caption="Optimistic Locking Errors: from ~43.000 down to 0 (smaller is better)." >}}

Why is this good? A lot less wasteful work is performed, greatly reducing the utilization of the database and the process engine's processing threads.

If you are familiar with the asynchronous processing in Camunda engine you know that this is a big deal!

## History API and monitoring for External Tasks

This release also adds history and monitoring for [external tasks](https://docs.camunda.org/manual/7.6/user-guide/process-engine/external-tasks/).

The history for external tasks is structured as a log. Whenever an external task gets created, locked and completed, a log entry is written. The log entry contains detailed information such as a timestamp, process context such as the activitiy id and also (in case of lock and complete) the `workerId` which can be choosen by the external task worker to identify itself. Besides the log, the history allows to retrieve the _Error Details_ for an external task containing a detailed error message in case execution of an external task failed.

Also see the [External History Task Rest API docs](http://docs.camunda.org/manual/latest/reference/rest/history/external-task-log/).

In cockpit, users can now see more details on external tasks, both in runtime and history views. The runtime view shows the currently open external tasks for the selected process instance. The history view shows the external task log:

{{< figure class="teaser" src="cockpit-external-task-history.png" caption="External Task Log in Cockpit History View" >}}

## Fluent BPMN builder API now generates BPMN diagram elements

The fluent BPMN builder API is our Java API for quickly creating BPMN processes in Java:

```java
final BpmnModelInstance myProcess = Bpmn.createExecutableProcess("process-payments")
      .startEvent()
      .serviceTask()
          .name("Process Payment")
      .endEvent()
      .done();
    
System.out.println(Bpmn.convertToString(myProcess));
```

The problem with processes generated like this was that, while they could be executed by the process engine, it was not possible to see the diagram in Cockpit and open them with the Camunda Modeler. The reason for this was that the builder only generated the _BPMN semantic elements_ (necessary for executing the process) but not the _BPMN diagram elements_ (necessary for rendering the process as a diagram and editing it in a modeler).

Starting from this release, the builder generated both BPMN semantic elements and diagram elements:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<definitions xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="definitions_dfb1f18e-6034-448e-abae-0eb2f41469da" targetNamespace="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">

  <!-- Generated BPMN Semantic Elements -->
  <process id="process-payments" isExecutable="true">
    <startEvent id="startEvent_2b0abd37-75a9-47dd-9838-63f1390d7515">
      <outgoing>sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2</outgoing>
    </startEvent>
    <serviceTask id="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09" name="Process Payment">
      <incoming>sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2</incoming>
      <outgoing>sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35</outgoing>
    </serviceTask>
    <sequenceFlow id="sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2" sourceRef="startEvent_2b0abd37-75a9-47dd-9838-63f1390d7515" targetRef="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09"/>
    <endEvent id="endEvent_8087f927-a53b-4126-95fc-c057736f3b73">
      <incoming>sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35</incoming>
    </endEvent>
    <sequenceFlow id="sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35" sourceRef="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09" targetRef="endEvent_8087f927-a53b-4126-95fc-c057736f3b73"/>
  </process>

  <!-- Generated Diagram Elements (NEW!!!) -->
  <bpmndi:BPMNDiagram id="BPMNDiagram_5b66dfb7-097b-4610-9681-43abb3ff97da">
    <bpmndi:BPMNPlane bpmnElement="process-payments" id="BPMNPlane_ad88b4cf-9d7a-4b86-8386-f8db23ff388d">
      <bpmndi:BPMNShape bpmnElement="startEvent_2b0abd37-75a9-47dd-9838-63f1390d7515" id="BPMNShape_d6c4e3c5-150c-43f7-adf8-1d388f466a69">
        <dc:Bounds height="36.0" width="36.0" x="100.0" y="100.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09" id="BPMNShape_51006773-13df-4327-a4cf-a5952c39e86a">
        <dc:Bounds height="80.0" width="100.0" x="186.0" y="78.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2" id="BPMNEdge_fb360594-8863-4d5d-b515-49e02a88d55d">
        <di:waypoint x="136.0" y="118.0"/>
        <di:waypoint x="186.0" y="118.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape bpmnElement="endEvent_8087f927-a53b-4126-95fc-c057736f3b73" id="BPMNShape_23930820-5507-45a0-8630-b5e45ee8dd4d">
        <dc:Bounds height="36.0" width="36.0" x="336.0" y="100.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35" id="BPMNEdge_07ed502e-069f-42a0-bd1b-fed0d68efbda">
        <di:waypoint x="286.0" y="118.0"/>
        <di:waypoint x="336.0" y="118.0"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

This way, BPMN processes generated with the builder can be opened and viewed in the Camunda Modeler and Cockpit!

## Security: salts and stronger hashing of user passwords

Starting from this version, the security of user passwords was improved:

* Random salt generation is now used to defend against dictionary attacks.
* By default, a stronger hashing algorithm is used.

As almost everything in Camunda, both hashing and salting is implemented as pluggable SPIs, allowing users to customize the process and use the algorithms of their choice.
The [documentation](http://docs.camunda.org/manual/latest/user-guide/process-engine/password-hashing) has the details.

## Feedback Welcome

Please try out the awesome new features of this release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).

