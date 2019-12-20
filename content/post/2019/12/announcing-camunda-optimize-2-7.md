+++
author = "Mike Winters"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-12-20T09:00:00+01:00"
title = "Announcing Camunda Optimze 2.7.0"
+++

We’re excited to announce the release of Camunda Optimize 2.7.0. 

Optimize provides business activity monitoring for workflows, supporting continuous process improvement by providing transparency into your automated workflows and decisions. Business-friendly reports, dashboards, and alerts make it possible to identify process bottlenecks and improve end-to-end processes.

[If you'd like to learn more about the release and ask our product team questions, we invite you to join us for the Optimize 2.7 webinar on Tuesday, January 7, 2020.](https://camunda.com/learn/webinars/camunda-optimize-2-7-release-webinar-en/) 

Feel free to sign up even if you can’t attend the webinar live–we’ll email a recording to all registrants.  

If you’d like to get started with Optimize 2.7 right away, [you can download the release here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Camunda Enterprise Platform customer credentials. 

You can also use [Docker to run Camunda Optimize](https://docs.camunda.org/optimize/latest/technical-guide/setup/installation/#production-docker-image-without-elasticsearch). 

And if you’re not yet a Camunda customer, [you can sign up here](https://camunda.com/download/enterprise/) for a free 30-day trial of the Camunda Enterprise Platform, which includes Camunda Optimize.

In the rest of this post, we’ll highlight some of the [new capabilities introduced in Optimize 2.7](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15513).


### Faster Insights into the Live State of your Business

Optimize is about much more than after-the-fact analysis, and monitoring live process instances in near real time is a key Optimize use case. 

New filtering features enable users to get insights into running processes more quickly and to drill down to a specific step in the process. 

Sometimes, it’ll be necessary to monitor only process instances where a specific step within a  process instance is currently active and waiting to be completed. Common examples include a Timer Event, a User Task that’s actively being worked on, or a Message Catch Event that hasn’t yet been correlated with a message.

Optimize 2.7’s new “Executing Flow Node” filter in the Report builder makes it possible to filter a Report by a specific Flow Node and to only see process instances that are currently executing this Flow Node. 

To add an “Executing Flow Node” filter, simply click on “Add Filter” and then on “Flow Node”, and be sure you’ve selected “pending or executing” flow nodes only. 

In the following example, we select the User Task “Make an Offer”.

{{< figure src="executing-flow-node-filter-1.png" alt="Filter by executing flow node filter" >}}


If we then move to the Raw Data Table, we’ll see only the process instances where at least one “Make an Offer” User Task is currently being executed.

{{< figure src="executing-flow-node-filter-2.png" alt="The filter is applied to the raw data table" >}}


### Safer Cross-team Collaboration with Fine-grained Control Over Sensitive Data

Optimize often serves as a central hub for process analytics within an organization. Members of many different teams (and in a wide range of roles within a team) need to have access to Optimize to answer critical questions about the business. 

Processes often contain sensitive data that needs to be controlled carefully, and so to enable broader adoption of Optimize within organizations, [last quarter’s Optimize 2.6.0 release](https://blog.camunda.com/post/2019/10/camunda-optimize-26-released/) introduced a new and robust user permissions system. User permissions in Optimize make it possible to grant access to a wide range of stakeholders while limiting who’s able to see what. 

Optimize 2.7 provides streamlined user management capabilities for common tasks so that you can get the right users access to the right Reports and Dashboards as quickly as possible. 

**User and Group Search for Collections:** Prior to 2.7, when adding users to a Collection, it was necessary to remember their User or Group ID. To simplify this process, 2.7 includes a typeahead search for Users and Groups

{{< figure src="collections-user-group-search.png" alt="The filter is applied to the raw data table" >}}

**Alerts moved into Collections:** Prior to 2.7, Alerts had a separate navigation point in the Optimize navigation header, and on the Alert list page, a list of existing Alerts was displayed.

Because Alerts are tightly coupled to Reports and also inherit the permissions from the Report that the user has access to, we moved all Alerts into Collections.

Optimize 2.7 includes a new tab within the Collections page that allows you to add Alerts directly to Collections. And it is now no longer possible to add Alerts _outside_ of Collections.

Existing Alerts (including their referenced Reports) will be moved into an “Archive” Collection that will be created during migration to 2.7. 

{{< figure src="alerts-in-collections-1.png" alt="Alerts are now associated with a Collection" >}}

{{< figure src="alerts-in-collections-2.png" alt="Alert functionality has otherwise not changed, however" >}}

**Data sources for collections:** In Optimize 2.7, it’s now possible to define a Data Source for a Collection. Users can specify on which particular process and decision definitions the Collection should be based.

Let’s walk through an example. Assume that every team member in our company’s sales department should be able to see, create, and update Reports in Optimize based on our hiring process to see how the department is currently doing when it comes to hiring new salespeople. To make that possible, we simply create a Collection called `Sales Reports`:

{{< figure src="data-sources-collections-1.png" alt="Creating a new Collection" >}}

Inside of the new Collection, you’ll now see a tab called Data Sources. If you click on this tab, you are able to add a new Data Source to the Collection. In our case, we want to add the `Hiring Demo` process to the Collection.

{{< figure src="data-sources-collections-2.png" alt="No Data Source added yet" >}}

{{< figure src="data-sources-collections-3.png" alt="Adding a Data Source to the Collection" >}}

Next, we’ll create a new report inside of this Collection. As you can see, **we’re only able to create reports for those process definitions that we’ve identified in the Data Source**.

{{< figure src="data-sources-collections-4.png" alt="The Data Source is available when we create a new Report" >}}

This allows us to keep the Collection clean and focused on the entities it was intended for.

Please be aware that for each newly created Collection, there is no Data Source defined by default. Thus, you can only select a process definition in a Report if you have already added the respective Data Source to the Collection.

### Getting Started and Next Steps

*   [Join the release webinar on January 7, 2020](https://camunda.com/learn/webinars/camunda-optimize-2-7-release-webinar-en/) <br>
*   [Download Optimize 2.7](https://docs.camunda.org/enterprise/download/#camunda-optimize) <br>
*   [Use Docker to run Optimize](https://docs.camunda.org/optimize/latest/technical-guide/setup/installation/#production-docker-image-without-elasticsearch)<br>
*   [Not yet an enterprise customer? Download the Camunda Enterprise Platform (including Optimize) here.](https://camunda.com/download/enterprise/)<br>
*   [New to Optimize? Watch “Getting Started with Optimize in Less Than 5 Minutes”](https://camunda.com/learn/videos/getting-started-optimize/)<br>

If you’re already running a previous version of Optimize, take a look at our upgrade guide: [https://docs.camunda.org/optimize/latest/technical-guide/update/](https://docs.camunda.org/optimize/latest/technical-guide/update/)
