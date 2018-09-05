+++
title = "RPA and Camunda BPM: Integrate a Software Robot by Using External Tasks"

description = "In this post, we walk through an example of how you can implement an external task in Camunda with a so-called 'software robot' (in this case Workfusion's RPA Express)."
date = "2018-08-29T12:00:00+01:00"
author = "Benjamin Hoffmann"
categories = ["Community"]
tags = ["rpa", "robotic process automation"]
+++

In [my recent post on RPA](https://blog.camunda.com/post/2018/08/integrating-uipath-rpa-with-camunda/), I used asynchronous REST calls to integrate UiPath with Camunda. This only works if your RPA solution provides an API that can be used by third-party applications. Since I promised you that there would be a follow-up post, I want to take the opportunity to show you another approach of integrating an RPA tool with Camunda. This time, I decided to try out [WorkFusion's RPA Express](https://www.workfusion.com/rpa-express/), which is available for free.

## Scenario

The overall scenario for using an RPA product is the same that I described in my last post -- you need to replace manual work with an automated task, but the external system does not provide an API that can be called from Camunda. On top of that, you may find out that your preferred RPA solution does not provide a public API that could be leveraged for integration with Camunda using asynchronous communication. But don't worry, there's some good news for you.

If your RPA product is capable of making HTTP requests, you can implement your software "robot" as an [external task client](https://docs.camunda.org/manual/7.9/user-guide/ext-client/) that calls the engine and fetches work. This means that you do not depend on your RPA vendor to provide some external API, so the architecture described in this post is more tool-agnostic. Even if the tool does not provide an out-of-the-box feature for HTTP requests, many vendors allow writing custom scripts that you can use to achieve the task. As a last resort, you could use your robot to control the UI of a REST client like Postman and communicate with the engine that way.

## Architecture Overview

The BPMN workflow in Camunda BPM is really simple this time, since all the RPA-related work is contained in a single external service task:

{{< figure src="bpmn-workflow.png" alt="BPMN workflow that is executed in Camunda BPM" >}}

One of WorkFusion's RPA Express main components is WorkFusion Studio, where you can design so-called recorder scripts and bot tasks (both are different representations of a single software robot -- either graphical with drag and drop or pure XML).

{{< figure src="recorder-script-example.png" alt="Example of a recorder script in WorkFusion Studio" title="The action library, a sample recorder script, and the property panel in WorkFusion Studio">}}

These scripts and bot tasks can be published to Control Tower, a web application for robot orchestration. In Control Tower, you can design "Business Processes" with a very basic BPMN-like notation that includes Bot Tasks, Manual Tasks, and Rules (basically exclusive gateways). Control Tower also ships with a feature for scheduling these processes.

{{< figure src="sample-business-process.png" alt="Example of a business process in WorkFusion Control Tower" title="A sample Business Process in WorkFusion Control Tower">}}

One solution to implement the external task worker with WorkFusion could be to put the main logic (including fetch and lock, execution of worker logic and complete) into the bot task and use a scheduled one-step "Business Process" to frequently poll Camunda BPM for new tasks. Another approach is to also include the polling logic into the robot and to start one never-ending one-step "Business Process" manually. This way, it is also quite easy to implement a backoff strategy by increasing the polling interval if no work was found. I decided to go for the latter approach and manually invoked the robot from WorkFusion Studio because this seemed to make local testing easier.

## Running the Showcase

Executing the end-to-end workflow begins with starting a new process instance in Camunda BPM. This results in some demo data being generated that can be used by the RPA flow later. Next, a new external task is created in Camunda, which is ready to be picked up by the WorkFusion "robot".

{{< figure src="process-instance-started.png" alt="Started workflow instance in Camunda Cockpit" >}}

The recorder script of the "robot" implements an external task worker. It fetches a task from Camunda using Camunda's REST API, uses some of the variables for the actual UI automation and finally completes the task. I used Groovy scripts to implement the HTTP calls to Camunda BPM. If there was no task to work on, the robot would wait two seconds and poll again. Instead of idling for a fixed amount of time, you can also implement some sophisticated backoff strategy here. UI automation in my example is limited to the robot typing some process variables into Notepad, but I'm sure we all can think of way more fancy scenarios for real world use cases.

{{< figure src="external-task-worker.png" alt="Recorder script implementing the external task worker" >}}

To launch the robot manually from the Studio, we click _Play recording_ and watch the robot doing some work:

{{< figure src="robot-in-action.png" alt="Robot executing the script" >}}

In Camunda, we can verify that the robot has completed the external task by looking into Cockpit's external task log, as well as by inspecting the subsequent user task in Tasklist:

{{< figure src="cockpit-robot-finished.png" alt="Workflow instance moved on in Camunda" >}}

{{< figure src="tasklist-robot-finished.png" alt="User Task in Camunda Tasklist" >}}

## Wrapping Up

If your RPA tool does not provide an API, Camunda's external task mechanism is a powerful feature that can be used for integration with third-party systems. Implementing a worker is quite easy in any programming language. All it needs is to make some HTTP requests, and every RPA platform should provide a way of doing so, too -- many of them in a low-code fashion.

Since most of those products provide no or only very basic support for BPMN, Camunda is the right choice for overall process execution. That way, you can not only benefit from the great power of BPMN, but also get detailed insights into your workflows during runtime (by using Cockpit) or find weak spots and bottlenecks over a longer period of time (by using Optimize).

Again, if you'd like to get in touch with me about the topic or provide feedback and ideas, feel free to reach out over the usual channels or start a discussion in the [forum](https://forum.camunda.org). Also, there will be a dedicated slot for RPA on this year's [CamundaCon](https://camunda.com/events/camundacon/), and I hope to see you there!
