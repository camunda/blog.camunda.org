+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2019-09-26T11:00:00+01:00"
title = "Camunda BPM 7.12.0-alpha4 Released"
+++

**Camunda BPM 7.12.0-alpha4** is here and the highlights are:

* Handling Bpmn Error and Escalation in User Tasks
* Cascading Changes to Due Dates of Recurring Timers
* Add Time Triggered Task Listeners in User Tasks
* Java 13 Support
* [7 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.12.0-alpha4)


You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15522).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.12.0-alpha4).

<!--more-->

## Handling Bpmn Error and Escalation in User Tasks

In case a business error occurs during the execution of an External Task, it is possible to raise a [Bpmn Error](https://docs.camunda.org/manual/latest/reference/bpmn20/events/error-events/#business-errors-vs-technical-errors).
But have you ever wanted to escalate a User Task, or indicate a business error for a User Task? As of this alpha, you can report a Bpmn Error or an [Escalation](https://docs.camunda.org/manual/latest/reference/bpmn20/events/escalation-events/) for a User Task.
Whenever a business error occurs, the user can invoke, via [Java API](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/user-task/#reporting-bpmn-error) or [REST API](https://docs.camunda.org/manual/latest/reference/rest/task/post-bpmn-error/), a Bpmn Error to be thrown:
​
```json
POST /task/aTaskId/bpmnError
{
  "errorCode": "invalid-report-543",
  "errorMessage": "An error occurred during report review.",
  "variables": {
      "reportId" : {
        "value" : "PLR-233",
        "type": "String"
      }
  }
}
```
If, in a Process, an Error Catch Event is implemented with the respective `errorCode`, the Bpmn Error will be caught and propagated accordingly. The same goes for reporting an Escalation, the respective documentation can be found for the [Java API](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/user-task/#reporting-bpmn-escalation) and the [REST API](https://docs.camunda.org/manual/latest/reference/rest/task/post-bpmn-escalation/).
​
{{< figure src="handle-bpmnerror-escalation-usertask.png">}}

## Cascading Changes to Due Dates of Recurring Timers
Within a BPMN model, a user can specify a recurring timer with an [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals) interval string. (e.g. "R3/PT30M")
The timer stores a due date to indicate when it is ready for execution. For recurring timer, the engine calculates the due date based on the cycle (e.g. "PT30M") and creates a subsequent timer whenever a recurring timer is executed until the number of repeats ("R3" = repeated three times) is reached.

Given a "R3/PT30M" recurring, every timer instance is due 30 minutes after the previous one.
{{< figure src="no-change.png" alt="three 30-minute intervals indicating the three timer due dates">}}
Via the ManagementService it is possible to update the due date of a timer instance. If the due date of <b>Timer 1</b> is altered by 15 minutes via `managementService.setJobDuedate(String jobId, Date newDuedate)` the three timers are executed differently.

{{< figure src="non-cascading-change.png" alt="timer 1 is due after 45min, timer 2 after 60min and timer 3 after 90min">}}
The due date of <b>Timer 1</b> was altered by +15 minutes, so it is due after 45 minutes. However, <b>Timer 2</b> and <b>Timer 3</b> are not affected by this and their due date is still based on the original due date of <b>Timer 1</b>.

However, what if you want a due date change to cascade to subsequent timer instances?
{{< figure src="cascading-change.png" alt="one 45-minute interval then two 30-minute intervals indicating the three timer due dates">}}
With this release you can use the `cascade` flag (via [REST API](https://docs.camunda.org/manual/latest/reference/rest/job/put-set-job-duedate/)) or `managementService.setJobDuedate(String jobId, Date newDuedate, boolean cascade)` to achieve this.

## Add Time Triggered Task Listeners in User Tasks

Sometimes it is useful to trigger a task listener of a user task after a certain time has elapsed, e.g. check daily whether the task needs to be reassigned or whether emails need to be sent.
Up until now, all of this can be done with a boundary event but that has a number of drawbacks when it comes to the cancellation and recreation of the task.

With this alpha, we support a task listener that is triggered after a task has been active for a certain period of time. The listener must be of type `timeout` and can then control 
how to proceed with the task, including completing and reassigning it.

In order to attach such a listener to a user task, you can configure the following in your BPMN:

```xml
...
<bpmn:userTask id="myTask">
  <bpmn:extensionElements>
    <camunda:taskListener delegateExpression="${setBusinessKeyListener}" event="timeout" id="timeout-friendly" >
      <bpmn:timerEventDefinition>
        <bpmn:timeDuration xsi:type="bpmn:tFormalExpression">PT1H</bpmn:timeDuration>
      </bpmn:timerEventDefinition>
    </camunda:taskListener>
  </bpmn:extensionElements>
</bpmn:userTask>
...
```

Adding the `timerEventDefinition` child element to the task listener of type `timeout` will execute the referenced delegate after the specified amount of time after the task was created.

Read more about task listeners in general in the [documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#task-listener), about their configuration in the [reference](https://docs.camunda.org/manual/latest/reference/bpmn20/custom-extensions/extension-elements/#tasklistener), and about their migration in the [guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-migration/#user-task).

## Java 13 Support

This alpha also brings support for the latest Java 13.

## What’s Next?
The next alpha version is scheduled for the end of October and our team is already working on it.

The minor release of Camunda BPM 7.12 is coming this fall (November 30, 2019).

## Your Feedback Matters!
With every release we constantly strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
