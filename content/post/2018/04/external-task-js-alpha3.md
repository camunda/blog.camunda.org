+++
author = "Seif Eddine Ghezala"
categories = ["Execution"]
tags = ["Execution", "Release Note"]
date = "2018-04-12T12:00:00+01:00"
title = "Camunda NodeJS External Task Client 0.2.0 Released"
+++

We are so excited to announce a new alpha release of _camunda-external-task-client-js_, 
an NodeJS module that makes it possible to handle your BPMN Service Tasks.

This release is focused on making it more flexible to handle variables.   
It improves setting variables and brings up two major features:

* setting local variables
* support for Date & File typed variables

The following example will illustrate these features and show how they can be used.

## Example

{{< figure class="teaser" src="order.svg" alt="A Workflow for Handling Orders" title="A Workflow for Handling Orders" >}}

### 1. Setup

- first, make sure to have [Camunda](https://camunda.com/download/) running
- download the following [model](https://raw.githubusercontent.com/camunda/camunda-external-task-client-js/master/examples/granting-loans/assets/loan-process.bpmn) 
  and deploy it using the Camunda Modeler
- create an `invoice.txt` file with some data and place it in the same folder as the script
- install _camunda-external-task-client-js_ from npm using: 
  
  ```sh
  npm install -s camunda-external-task-client-js
  ```
  
  or:
  
  ```sh
  yarn add camunda-external-task-client-js
  ```
  
### 2. NodeJS Service Task Implementation

```js
const {
  Client,
  logger,
  Variables,
  File
} = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'invoiceCreator'
client.subscribe("invoiceCreator", async function({ task, taskService }) {
  // Put your business logic
  // complete the task
  const date = new Date();
  const invoice = await new File({ localPath: "./invoice.txt" }).load();
  const minute = date.getMinutes();
  const variables = new Variables().setAll({ invoice, date });

  // check if minute is even
  if (minute % 2 === 0) {
    // for even minutes, store variables in the process scope
    await taskService.complete(task, variables);
  } else {
    // for odd minutes, store variables in the task local scope
    await taskService.complete(task, null, variables);
  }
});

```

### 3. Results 

The terminal output should be:
```
polling
✓ subscribed to topic invoiceCreator
polling
✓ polled 1 tasks
✓ completed task 21d19522-3e4c-11e8-b8df-186590db1cd7
polling
```

Moreover, the added variables should be available in Cockpit in the history view of the process instance:
{{< figure class="teaser" src="cockpit-order.png" alt="Cockpit History View" title="Cockpit History Views" >}}

## Documentation & More Detailed Examples
This example illustrates a basic usage of the new alpha release of camunda-external-task-client-js.
To find out more about this release, you can check out the [documenation](https://github.com/camunda/camunda-external-task-client-js)
or [get the example running](https://github.com/camunda/camunda-external-task-client-js/tree/master/examples/order).
 
## Feedback
Your feedback is extremely important, so don't hesitate to share it with us by:

 * Reaching out to us via [our forums](https://forum.camunda.org/c/engine)
 * Creating an issue on [Github](https://github.com/camunda/camunda-external-task-client-js/issues)
 * Tweeting us on [@Camunda](https://twitter.com/Camunda)