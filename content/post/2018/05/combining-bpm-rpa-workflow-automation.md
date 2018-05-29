+++
title = "End-To-End Workflow Automation with RPA and Camunda BPM"
description = "Learn more about the role of robotic process automation (RPA) in workflow automation and how to combine RPA with Camunda BPM."
date = "2018-05-29T12:00:00+01:00"
author = "Mike Winters"
categories = ["Best Practices"]
tags = ["rpa", "robotic process automation"]
+++

There’s no shortage of hype around RPA (Robotic Process Automation), and you don’t have to take our word for it: in a July 2017 report, Gartner declared RPA to be at the peak of the so-called [Hype Cycle](https://www.gartner.com/doc/3765866/hype-cycle-application-services-).

{{< figure src="rpa-google-trends.png" alt="RPA on Google Trends" attr="Google Trends" attrlink="https://trends.google.com/trends/explore?date=today%205-y&q=rpa" >}}

RPA’s underlying value proposition is indeed compelling. The automation of tedious, manual tasks trapped inside legacy software systems with no API provides enterprises with measurable benefits. Employees can spend less time and energy on low-value work and focus on strategic projects instead.

At Camunda, our area of expertise is workflow automation. Camunda BPM, our business process management platform, powers critical workflows for more than 200 enterprise customers, and the open-source edition of the platform is downloaded thousands of times each month.

Many Camunda users have asked us how to think about RPA in the context of workflow automation, and so in this write-up, we’ll share how we think about combining RPA and Camunda BPM to get the most out of both tools.

## What Exactly is RPA?

RPA is a subset of workflow automation that relies on “software robots” to automate tasks either by integrating with an external system’s API or by controlling an external system’s graphical user interface (UI) when no API exists.

A developer-friendly workflow engine such as Camunda BPM will provide [extensive support for handling external tasks](https://docs.camunda.org/manual/7.8/user-guide/process-engine/external-tasks/), and so any task in a process that requires work from an external application that _does_ provide an API can be handled by a BPM platform by itself--no RPA necessary.

And so in the rest of this post, we’ll focus on RPA’s sweet spot: the automated control of graphical user interfaces (UI) in cases where an API is not available.

## What Does RPA Do Well?

Let’s frame the discussion with an example. Imagine that our company uses legacy CRM and ERP systems that don’t offer an API, and so data must be entered manually via a UI every time we need to input customer information and create a new order.

We know that we should upgrade to more modern CRM and ERP systems, but it’ll take us at least another 12-18 months to free up the engineering resources to make this happen. Our highly-trained employee base is wasting many hours every week on manual data entry, and we need a short-term solution, so we’ve decided to invest in RPA to automate this data entry work.

The resulting RPA flow looks something like this:

{{< figure src="rpa-full-process-model.png" alt="An RPA Task Modeled Using BPMN" >}}

The scenario we’ve described is exactly what RPA was designed for: alleviating short-term pain when a time-consuming manual process simply can’t be automated programmatically.

## Where Does Camunda BPM Come In?

When we take a step back, we can see that the RPA flow above represents a rather simple business process as we’d define it in a tool such as Camunda BPM.

{{< figure src="rpa-plus-business-process+text.png" alt="An RPA Task Distilled Into A Simple Business Process" >}}

In this simple business process, if the RPA system is responsible for completion of both tasks, why would we add Camunda BPM to the mix?

In short, **Camunda BPM manages the business process as a whole while RPA handles rote manual tasks within a process that can’t be completed programmatically**.

Let’s elaborate on Camunda BPM's role.

### Camunda BPM Automates Complex End-to-End Processes With Diverse Task Types--Including RPA Tasks

The example we used above consisted only of two tasks, both of which were carried out by our RPA system. But in the real world, it’s rarely so straightforward.

In addition to tasks completed by an RPA tool (*Enter sales data into CRM* and *Create order in ERP*), a process might also require tasks to be completed by external systems that do provide an API. In addition, the process might require a human to intervene occasionally--for regulatory reasons, for example. And we might need to make decisions based on data attached to a process instance.

Let’s update our process to make it more realistic.

{{< figure src="business-process-with-rpa-real-world.png" alt="An RPA Task Distilled Into A Simple Business Process" >}}

To summarize what we changed:

* After the task *Enter sales data into CRM*, we added a service task *Enrich customer data*, where we pull in additional data about a customer from a separate data enrichment application via API.
* After the task *Create order in ERP*, we added a gateway to signify that orders greater than $100,000 need to be manually approved in the user task *Approve order* before processing.

Note that we didn't remove the RPA tasks from the process, and the actual work handled by the RPA tool hasn't changed, either. We've simply modeled these RPA tasks in the context of a broader business process.

An RPA tool can easily integrate with Camunda BPM and perform tasks as part of an end-to-end business process.  

Camunda’s [external task pattern](https://docs.camunda.org/manual/7.8/user-guide/process-engine/external-tasks/) makes it easy to connect to your RPA tool via REST API, meaning Camunda will automatically send tasks to an RPA worker when a step in an end-to-end process requires it.

After the RPA tool has completed its work and notifies Camunda (again utilizing the REST API), Camunda will execute and monitor the rest of the process.

In addition to its ability to integrate with an RPA tool, there are other factors that make Camunda a good fit for modeling and executing an end-to-end business process like this one.

First, Camunda provides a common language for both technical and non-technical users to design complex workflows such as this one via [ISO-standard BPMN 2.0](https://camunda.com/bpmn/). And [Camunda Modeler](https://camunda.com/products/modeler/) makes it possible for business analysts to define BPMN workflows visually and to collaborate with developers all the way to the actual deployment.

Additionally, Camunda BPM is equipped to handle both the data enrichment task via the [external task pattern](https://docs.camunda.org/manual/7.8/user-guide/process-engine/external-tasks/) we referenced earlier and the user task via [Camunda Tasklist](https://camunda.com/products/tasklist/), a BPMN user task frontend (alternatively, Camunda BPM could integrate with a company’s existing frontend for user tasks instead of Tasklist).

Camunda BPM also provides support for handling escalations and exceptions.  

You might have noticed another task we added when we extended our business process to make it more realistic: *Escalate for manual review*.

Imagine a scenario where the *Enter sales data into CRM* task, which our RPA system is responsible for, isn’t completed within an expected timeframe. How do we ensure that the problem is escalated and addressed as quickly as possible?

One way that BPMN solves for this case is the [Timer Event](https://docs.camunda.org/manual/7.8/reference/bpmn20/events/timer-events/), which is fully supported by Camunda BPM.

Here’s how we defined this escalation in our model:

{{< figure src="timer-event-in-process.png" alt="A Timer Event Monitoring Our RPA Task" >}}

Using a Timer, we automatically notify the right person when our process isn’t completed as expected and ensure that the process instance eventually progresses in a timely manner.

This is just one example of how we might use a Timer Event, and the Timer section in Camunda’s [BPMN Modeling Reference](https://camunda.com/bpmn/reference/) contains more information about using a Timer Event in a process.

### Camunda BPM Provides Visibility into a Business Process as a Whole

We’ve established that the responsibility of RPA is to *automate manual tasks that can’t be handled programmatically*. Just as an RPA tool isn’t responsible for modeling and executing end-to-end business processes, it also isn’t responsible for monitoring business processes at a high level. This monitoring step is critical for business analysts to identify potential issues with a process and to address them quickly.

Camunda Optimize, a business activity monitoring tool for workflows that’s included in Camunda Enterprise Platform, was designed for exactly that.

Optimize provides reports, alerting, BPMN heatmaps, and options for data enrichment, ensuring that no question about a business process is left unanswered and that issues are addressed quickly.

{{< figure src="optimize-dashboard.png" alt="The Camunda Optimize Dashboard For Monitoring and Improving Business Processes" >}}

## Wrapping Up

We hope you came away from this post with an understanding that both BPM and RPA play an important role in workflow automation and form a powerful combination when used correctly.

To summarize our main points:

* BPM platforms such as Camunda BPM are designed to manage and execute complex end-to-end business processes, and Camunda BPM provides the tools necessary for reporting and troubleshooting.
* RPA tools are ideal for carrying out repetitive tasks inside of a process that require use of a UI when no API is available.
* In most cases, an RPA tool can easily be integrated with a BPM platform such as Camunda BPM to include RPA in an end-to-end business process.

If you have questions about integrating your RPA tool with Camunda BPM, [please get in touch](https://camunda.com/contact/). We’d be happy to speak with you.
