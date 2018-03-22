+++
author = "Seif Eddine Ghezala"
categories = ["Execution"]
tags = ["Execution", "Release Note"]
date = "2018-03-27T09:00:00+01:00"
title = "Camunda NodeJS External Task Client 0.1.1 Released"
+++

We recently published the first alpha release of _camunda-external-task-client-js_, 
an NPM module that makes it possible to handle your BPMN Service Tasks in NodeJS. 

Today, a new alpha release is ready, bringing up major features that revolve around easily exchanging process variables between
 Service Tasks and the Workflow Engine. 
 
 The feature set includes:

* Accessing single/all variables
* Creating/Updating single or multiple variables 
* Support for primitive (e.g. Integer) and complex variable types (e.g. JSON)

Let's walk through a basic example to showcase some of these features:

## Example

{{< figure class="teaser" src="loan-process.svg" alt="A Workflow for Granting Loans" title="A Workflow for Granting Loans" >}}

### 1. Running Camunda
First, make sure to have [Camunda](https://camunda.com/download/) running.

### 2. Deploying the Workflow
Download the following [model](https://raw.githubusercontent.com/camunda/camunda-external-task-client-js/master/examples/granting-loans/assets/loan-process.bpmn) 
and deploy it using the Camunda Modeler.

### 3. Installing the NPM package

Install _camunda-external-task-client-js_ from npm using: 

```sh
npm install -s camunda-external-task-client-js
```

Or:

```sh
yarn add camunda-external-task-client-js
```


### 4. Consuming Service Tasks in NodeJS

```js
const { Client, logger } = require('camunda-external-task-client-js');

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// create a handler for the task
const handler = async({ task, taskService }) => {
  // get task variable 'defaultScore'
  const defaultScore = task.variables.get('defaultScore');

  // set task variable 'creditScores'
  task.variables.set('creditScores', [defaultScore, 9, 1, 4, 10]);

  // complete the task
  try {
    await taskService.complete(task);
    console.log('I completed my task successfully!!');
  } catch (e) {
    console.error(`Failed completing my task, ${e}`);
  }
};

// susbscribe to the topic 'creditScoreChecker' & provide the created handler
client.subscribe('creditScoreChecker', handler);
```

The output should be:
```
polling
✓ subscribed to topic creditScoreChecker
polling
✓ polled 10 tasks
✓ completed task 897ce191-2dea-11e8-a9c0-66b11439c29a
```
## Documentation & More Detailed Examples
The main goal of this post is to show a basic usage of the new alpha release of camunda-external-task-client-js.
To find out about the full range of features, you can check the [documenation](https://github.com/camunda/camunda-external-task-client-js)
or a [more in-depth example](https://github.com/camunda/camunda-external-task-client-js/tree/master/examples/granting-loans).
 
## Feedback
Your feedback is extremely important, so don't hesitate to share it with us by:

 * Reaching out to us via [our forums](https://forum.camunda.org/c/engine)
 * Creating an issue on [Github](https://github.com/camunda/camunda-external-task-client-js/issues)
 * Tweeting us on [@Camunda](https://twitter.com/Camunda)