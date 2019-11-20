+++
author = "Thorben Lindhauer"
categories = ["Execution"]
tags = []
date = "2018-10-04T15:00:00+01:00"
title = "How to Use Business Keys?"
+++

In Camunda BPM, every process instance can have a so-called *business key*. This post explains
its purpose, how it compares to process variables and how it can be used.

<!--more-->

## What is a Business Key?

A *business key* is a domain-specific identifier of a process instance. Compare this to the *process instance id*, which is a Camunda-generated UUID.

Let's consider an example: We have a process that ships book orders and we manage our orders
in a secondary database where every order is identified by an id. Now, when we start the process
to ship the order we can link the process instance directly to the order by using the order id
as the business key.

When we want to find the process instance, we can simply query by our order id:

```
RuntimeService runtimeService = ..;
String orderId = ..;

ProcessInstance shipmentInstance = runtimeService
  .createProcessInstanceQuery()
  .processInstanceBusinessKey(orderId)
  .singleResult();
```

In reality, shipping an order may be more complex and involve multiple process instances. We can
link them all together by the same business key. That way, we can find all process instances
related to a particular customer order with a simple query.

There are various more APIs that the business key makes easier to use.

## How does a Business Key Compare to Process Variables?

Instead of using the business key, we can also link process instances to domain objects via
[process variables](https://docs.camunda.org/manual/7.9/user-guide/process-engine/variables/).
The business key is special for two reasons:

1. Performance: Querying by business key is often more efficient than querying by a variable value.
  For example, it does not require a join with the variables table.
1. Visibility: The business key is displayed prominently in applications like Camunda Cockpit.

More on this:

* https://forum.camunda.org/t/business-key/534/2
* https://forum.camunda.org/t/business-key-definition-and-uses/791

## How to set a Business Key?

A business key can be set in two ways:

1. When Starting the Process Instance, i.e. in the context of the code that instantiates the process.
1. From within the Process Instance, i.e. in delegation code that is executed within the process.

Option 1 is easiest and recommended when the key is known upfront. For our shipping example this is the preferred solution. Option 2 is useful when the key cannot be determined upfront, for example because the process is started periodically via a timer.

### When Starting the Process Instance

Setting the business key upfront can be done via the `RuntimeService` APIs for starting a process instance. Example:

```java
RuntimeService runtimeService = ..;
final String orderId = ..;

// second arg is business key
runtimeService.startProcessInstanceByKey("shipping", orderId);
```

### From within the Process Instance

As of the time of writing, there is no API to set a business key once a process instance was started. We plan to provide such an API in the future. Follow the ticket [CAM-3947](https://jira.camunda.com/browse/CAM-3947) for progress updates. For the time being, we can help ourselves with internal API.

**WARNING**: The following code uses *internal* Camunda API. This means: The code is provided as-is, it is not guaranteed to work with future Camunda versions and it is not thoroughly tested. Please test the code in your environment and make sure you understand it and its limitations.

We have prepared an example project with two workarounds: https://github.com/ThorbenLindhauer/camunda-engine-unittest/tree/CAM-3947-workaround (note the branch `CAM-3947-workaround`).

Use the class [BusinessKeyPlugin](https://github.com/ThorbenLindhauer/camunda-engine-unittest/blob/CAM-3947-workaround/src/main/java/org/camunda/example/BusinessKeyPlugin.java) to select either of the workarounds. Run the test [SimpleTestCase](https://github.com/ThorbenLindhauer/camunda-engine-unittest/blob/CAM-3947-workaround/src/test/java/org/camunda/example/SimpleTestCase.java) to see the selected workaround in action.

Workaround 1: Generate the business key in an execution start listener. This approach is more flexible, because the listener can be registered where needed. Limitations: The listener MUST be executed in the first transaction of the process instance. Cannot be used in combination with `camunda:asyncBefore` on the start event.

Workaround 2: Generate the business key in the history event producer. Limitations: Does not work with history level `none`.
