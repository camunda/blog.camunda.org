---
title: "Start and Complete a process with the REST API"
date: "2015-08-05"
author: "Niall Deehan"

categories:
  - "Execution"
tags: 

aliases:
  - "/2015/08/start-and-complete-process-with-rest-api.html"

---

If you’ve already [downloaded the Camunda BPM](https://camunda.org/download/) platform you’ve already got our invoice example running locally. So I’m going to start with how you might run through that process using our REST API.

I’m going to assume that you’ve got some method of making those calls either programmatically or using a RestClient (I’ve used chrome’s [advanced rest client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) to test the calls). So lets begin… 

## Starting the process

For most processes we could kick things off by using the [start process instance](http://docs.camunda.org/latest/api-references/rest/#process-definition-start-process-instance) rest call `/process-definition/key/{key}/start`.
But because the invoice process has a start form I’m going to use [another way of starting the process](http://docs.camunda.org/latest/api-references/rest/#process-definition-submit-start-form) `/process-definition/key/{key}/submit-form`. Which looks something like this:

<a href="http://localhost:8080/engine-rest/process-definition/key/invoice/submit-form"><span style="color: darkblue">http&colon;//localhost:8080</span><span style="color: purple">/engine-rest</span><span style="color: #548235">/process-definition/key/<b>invoice</b>/submit-form</span></a>


In blue is the name of the local server. Purple is the start of the path and of course the rest (no pun intended) is the call. This includes “invoice” which is the key that works out which process we want to start.

This isn’t going to work just yet though, we’ll also need to add the content type to the header (this is true for all calls), in this case we’re using JSON so the header look like this:

`content-type: application/json`

There is also the matter of passing in the variables that are needed by the process – the invoice example has a “start form” that requires a user to enter certain data when the process starts. We can pass in those variables in the payload of the call a JSON object. It would look like this:

```js
{
  "variables": {
    "creditor": {"value":"Niall","type":"String"},
    "amount":{"value":"100","type":"String"},
    "invoiceNumber":{"value":"123","type":"String"}
  }
}
```

The REST call is now complete and when we run it should return a happy status of 200 – as well as some useful variables sent through JSON. The interesting parts of which are: 

```js
{
  id: "95aef406-3a7a-11e5-85b6-dafa20524153"
  definitionId: "invoice:1:15e97a1c-312d-11e5-aca3-a0e120524153"
  businessKey: null
  caseInstanceId: null
  ended: false
  suspended: false
}
```

The returned ID is the most important right now – because you can use that to contact the running process instance when you need to make other calls.

## Get a task

The next call we’re going to make is to get details of the task that the process instance is currently waiting at. We’ll be calling the engine and asking for [a single task](http://docs.camunda.org/latest/api-references/rest/#task-get-tasks) `/task` This call has a variety of parameters you can use to get the specific task you’re looking for – we’re just going to use the _**processInstanceId**_ because that was returned to us when we started the process originally and we happen to know that the process only has one active task right now. So the call would look something like this:

<a href="http://localhost:8080/engine-rest/task/?processInstanceId=95aef406-3a7a-11e5-85b6-dafa20524153">http&colon;//localhost:8080/engine-rest/task/?processInstanceId=<b>95aef406-3a7a-11e5-85b6-dafa20524153</b></a>

This call will return a JSON object describing the task:

```js
{
  id: "95af1b22-3a7a-11e5-85b6-dafa20524153"
  name: "Assign Approver"
  assignee: "demo"
  created: "2015-08-04T09:29:47"
  due: "2015-08-07T09:29:47"
  followUp: null
  delegationState: null
  description: "Select the colleague who should approve this invoice."
  executionId: "95aef406-3a7a-11e5-85b6-dafa20524153"
  owner: null
  parentTaskId: null
  priority: 50
  processDefinitionId: "invoice:1:15e97a1c-312d-11e5-aca3-a0e120524153"
  processInstanceId: "95aef406-3a7a-11e5-85b6-dafa20524153"
  taskDefinitionKey: "assignApprover"
  caseExecutionId: null
  caseInstanceId: null
  caseDefinitionId: null
  suspended: false
  formKey: "embedded:app:forms/assign-approver.html"
}
```

The most important variable here is again the ID, but this is the ID of the current task not the process. We can use that ID to send calls to that task - like for instance to complete the task. Which is what we’re going to do right now.

## Complete a task

This is a [very straight forward POST](http://docs.camunda.org/latest/api-references/rest/#task-complete-task) call that requires the id of the task you want to complete `/task/{id}/complete`.
So when you add the id the request looks a little something like this:

<a href="http://localhost:8080/engine-rest/task/95af1b22-3a7a-11e5-85b6-dafa20524153/complete">http&colon;//localhost:8080/engine-rest/task/<b>95af1b22-3a7a-11e5-85b6-dafa20524153</b>/complete</a>

But this particular task has a UI that requires a user to enter center data – an approver. Once again we’re going to need to add variables as a JSON object to the payload of the request:

```js
{
  "variables": {
    "approver": {"value":"Demo","type":"String"}
  }
}
```

That task should complete with a code 204 and doesn’t return any data. The token will then move onto the next task.

## Now you can try a little exercise:

To finish the process all you need to do is use variety of Get Task -> Complete Task calls until the process has reached an end event. You can always check [Cockpit](http://docs.camunda.org/7.3/guides/user-guide/#cockpit) when you need to find out where the token currently is. So why not give it a try? 
