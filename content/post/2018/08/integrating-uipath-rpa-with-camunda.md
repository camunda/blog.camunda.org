+++
title = "RPA and Camunda - Using UiPath robots within a BPMN workflow"
description = "Find an example of how one can use a software robot (in this case UiPath's RPA solution) within a Camunda BPM workflow to automate manual work where no APIs are provided."
date = "2018-08-14T12:00:00+01:00"
author = "Benjamin Hoffmann"
categories = ["Community"]
tags = ["rpa", "robotic process automation"]
+++

Having read [Mike's post](https://blog.camunda.com/post/2018/05/combining-bpm-rpa-workflow-automation/) on why it makes sense to combine RPA products with Camunda BPM, I got curious about prototyping an example with a specific RPA tool. I decided to go with [UiPath](https://www.uipath.com) since it seems to have caught a lot of attention in the community recently. In this post, I want to share my experience and the findings of that one-week journey into the world of RPA.

## Scenario

The example can be applied to any scenario where one needs to replace manual work (User Task in BPMN) with an automated task and where the external system does not provide an API that can be called directly from Camunda. So instead of making a service call to the system, one would call the RPA tool's API, let the software robot execute the task and wait for a callback that triggers the progression of the end-to-end workflow.

One could also think of a use case where multiple RPA flows, possibly even including different RPA tools, need to be composed to form an end-to-end process. Camunda BPM can serve as the central orchestration engine here. It would also add a significant benefit by providing visibility for the overall process as well as by generating runtime-related and historical monitoring data that can be subject to further analysis, e.g., using [Camunda Optimize](https://camunda.com/products/optimize/).

## Architecture Overview

Integrating RPA and Camunda narrows down to making an API call from the workflow to the RPA tool and to receiving a callback from that tool so that the workflow can continue.

With UiPath, one cannot call a robot directly, but there is a REST API available for UiPath Orchestrator. Orchestrator is an application that can be used for monitoring robots, for scheduling jobs and - most important for the example - for managing work queues. So instead of triggering a robot from the workflow, we add a new work item to a dedicated queue. One or multiple robots can fetch items from that queue and work on those items in a distributed manner. The work item itself contains all the context data from the workflow that is needed for the actual task.

The robot acts as an agent on a machine that can access the legacy UI and needs to have the RPA process deployed. Once that RPA process is invoked on a robot, it will start interacting with the legacy application. One can trigger the robot manually by using a job in Orchestrator or by launching it from the process designer, but invocations can also be scheduled by using Orchestrator.

The actual RPA process is modeled with [UiPath Studio](https://www.uipath.com/studio), which uses a non-BPMN, proprietary flow-chart-like notation with quite complex configuration options for each step. The main stages of the RPA process consist of fetching the queue item, performing the work and sending the result back to the Camunda workflow.

The overall architecture as seen from Camunda's perspective looks like this:

{{< figure src="process-simple.png" alt="Camunda BPM workflow with UiPath integration" >}}

## Running the Showcase

Executing the end-to-end workflow begins with starting a new process instance in Camunda BPM. This results in some demo data being generated and in sending a POST request that contains the payload needed to perform the RPA flow (variables and message correlation id) to Orchestrator:

{{< figure src="cockpit-instance-started.png" alt="Started workflow instance in Camunda Cockpit" >}}

Now, the workflow waits for a callback from the robot. We can also observe that the new queue item was created in Orchestrator (highlighted in red):

{{< figure src="orchestrator-new-queue-item.png" alt="New queue item in UiPath Orchestrator" >}}

The next step is to launch a robot that can fetch the item from the queue. In my demo, I start it locally from UiPath studio. The robot will then execute the following flow:

{{< figure src="rpa-flow.png" alt="RPA flow in UiPath Studio" >}}

One of the steps will call a sub-flow (the activity called _Try to process item_) that will make the robot interact with a sample application:

{{< figure src="sample-legacy-ui.png" alt="Mocked legacy UI" >}}

The robot fills out some input fields using the data that was provided from the queue item, click the accept button and retrieve the transaction number in the top right corner of the application. It will report back to Orchestrator that the item was processed successfully ...

{{< figure src="orchestrator-item-processed.png" alt="Processed item in UiPath Orchestrator" >}}

... and will finally send the callback with the result (in this case the transaction number) to the Camunda BPM workflow:

{{< figure src="cockpit-robo-finished.png" alt="Workflow instance moved on in Camunda" >}}

## Wrapping Up

When it comes to integrating RPA into a Camunda BPM workflow, there is really no difference compared to the integration of any other service. All it needs is an API on the RPA vendor's side and one of Camunda's ways of interacting with third-party systems - be it [asynchronous messaging](https://docs.camunda.org/manual/7.9/reference/bpmn20/events/message-events/), [synchronous service calls](https://docs.camunda.org/manual/7.9/user-guide/process-engine/delegation-code/#java-delegate) or [external tasks](https://docs.camunda.org/manual/7.9/user-guide/process-engine/external-tasks/). 

Camunda is responsible for orchestrating the end-to-end process, possibly including one or more robots, and the engine could even take over certain functionality where the RPA tool might be limited, e.g., error handling or retry behavior. For this scenario, all you need to add is the standard BPMN patterns to your model:

{{< figure src="process-more-features.png" alt="Extending the workflow to include RPA error handling" >}}

If you are interested in seeing the showcase in action, you are invited to [check out my screencast](https://vimeo.com/285802324), where I do a live demo and show all components in more detail.

Also, I plan on trying out a couple of other RPA products with a similar scenario, so stay tuned for future follow-up posts!

If you'd like to get in touch with me about the topic or provide feedback and ideas, feel free to reach out over the usual channels or start a discussion in the [forum](https://forum.camunda.org). Also, there will be a dedicated slot for RPA on this year's [CamundaCon](https://camunda.com/events/camundacon/), so I hope to meet you there!