+++
author = "Bernd Rücker"
categories = ["Community"]
tags = ["Fast Starts"]
date = "2020-08-04T08:00:00+02:00"
title = "From Project to Program: Managing, Monitoring and Leveraging the Cloud"
+++

How can you move beyond your first project and automate hundreds of processes successfully using an agile step-by-step approach? For the last 10 years we’ve been helping businesses to automate workflow processes, migrating from monolithic systems into agile, scalable ways of working. And we’ve discovered that you don’t have to start with a big bang approach - in fact, starting small is the fastest and most effective route to digital transformation.

<!--more-->

You can catch up on the previous blogs in the series, if you’d like more background before diving straight into this blog, on managing decentralized workflow engines.

* [Scaling Camunda Adoption in Your Company](https://blog.camunda.com/post/2020/07/from-project-to-program-scaling-camunda-adoption-in-your-company/)
* [Phases of Adoption](https://blog.camunda.com/post/2020/07/scaling-camunda-adoption-in-your-company-phases-of-adoption/)

## Managing Decentralized Workflow Engines

Instead of central platforms [I advocate for an approach that every team runs its own engine](https://blog.bernd-ruecker.com/the-microservice-workflow-automation-cheat-sheet-fc0a80dc25aa), especially in a microservices context. The main advantage is to allow for scale by isolating teams.

{{< figure class="no-border teaser" src="workflow-engines.png" alt="Managing Decentralized Workflow Engines" >}}

This means that with microservices you deliberately accept a wild mix of Camunda installations! Typically it is not a problem for your teams to set up Camunda, as they will simply leverage the Camunda documentation, as well as your own best practices or samples.

But how can you get an overview of what is actually running? How can you make sure the Camunda installations have all the important patches installed? Are all engines doing well? And, in case you run the enterprise edition, you want to collect metrics from various engines to check that you are in your license limits? Typically these questions are asked by the center of excellence, your Camunda champion or an enterprise architect with responsibility for Camunda.

In a recent POC, we validated a very simple idea. We automatically harvested the relevant data from different engines within the company. In order to do so, you can leverage the out-of-the-box REST API and retrieve the data via the [metrics](https://docs.camunda.org/manual/latest/reference/rest/metrics/) and [version](https://docs.camunda.org/manual/latest/reference/rest/version/) endpoints. You can [find a screenshot and the source code](https://github.com/berndruecker/camunda-engine-harvester) on GitHub.

{{< figure class="no-border teaser" src="rest-metrics-screen.png" alt="REST API" >}}

Of course, you need to register the endpoints of your engines centrally. But this is actually a chance for the center of excellence to get in touch with the Camunda users. As an alternative, you could also push this data to the harvester, e.g. by writing a simple [process engine plugin](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-plugins/).

{{< figure class="no-border teaser" src="engine-harvester.png" alt=" Process Engine Plugin" >}}

## Leverage Cloud to Ease Provisioning

Provisioning and governance is much easier with managed services. So running multiple engines becomes super easy with [Camunda Cloud](https://camunda.com/de/products/cloud/), as it already has a control plane built-in. This shows exactly the above mentioned information at a glance. It goes even further, as it allows you to update or patch engines automatically or with the click of a button.

## Monitor Business Processes End-To-End

As you scale Camunda usage, an organization’s entire end-to-end process typically exceeds the boundary of one workflow engine. Maybe the process is spread across different microservices using different Camunda engines or third-party workflow engines. Or some steps are executed by legacy software. Either way, you will still need visibility into the end-to-end process.

Trying to force everybody into the same Camunda engine has not proven to be a good approach, as this would limit the independence of different teams.

Most companies rely on business intelligence or data warehousing solutions to gain that overview. While this is a valid approach, our customers report that this is not easy to set up and typically misses the business process perspective. Other tools around observability or distributed tracing are typically too technical. This is why we introduced “[process events monitoring](https://blog.camunda.com/post/2020/04/announcing-camunda-optimize-3.0/)” into our process monitoring and reporting tool Optimize.

Do a step-by-step approach and avoid falling into paralysis by analysis, for example because you want to discuss the end-to-end monitoring upfront with all stakeholders involved.

## Ready for more?

In our next blog, we’ll take a closer look at establishing a Center of Excellence, managing architecture decisions and process architecture, as well as landscapes.

If you're interested in more insights, have a look at the Camunda Consulting team’s [Customer Success Path](https://camunda.com/best-practices/following-the-customer-success-path/), which steps through the most effective way of introducing Camunda as a new BPM platform inside any company.
