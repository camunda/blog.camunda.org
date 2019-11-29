+++
author = "Johannes Heinemann"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-11-29T00:00:00+00:00"
title = "Camunda Optimize 2.7.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.7.0-alpha2.

In this second alpha release, you can get an early look at many improvements and features in advance of the stable Optimize version 2.7.0, including:

- Data Sources for Collections
- "What's New" Message

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15597) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

#  Data Sources for Collections

In Optimize 2.6.0, a new collection concept was introduced. Collections contain not only a compilation of reports and dashboards, but also make it possible to define fine-grained permissions. With this release, we extended the collection feature even further by allowing the user to define a data source. This makes it possible to determine on which particular definitions the collection should be based. 

The following example illustrates how this works. Let's assume we have a sales department in our company, and every team member should be able to see, create, and update reports based on the lead qualification process to see how the department is currently doing. To make that possible, we simply create a collection called `Sales Reports`:

{{< figure src="create-collection-modal.png" alt="Depicts the modal when you create a new collection." >}}

Inside of the new collection, you will find a new tab called `Data Sources`. If you click on this tab, you are able to add a new data source to the collection. In our case, we want to add the `Lead Qualification` process.

{{< figure src="collection-data-source-tab.png" alt="Shows the collection data source tab." >}}

{{< figure src="add-data-source.png" alt="Displays the modal of adding a data source to a collection." >}}

Next, we'll create a new report inside of this collection. As you can see, we're only able to create reports for those definitions that we've defined in the data source.

{{< figure src="build-report-inside-collection.png" alt="Shows the report build inside the collection with the defined data source." >}}

This allows us to keep the collection clean and focused on those entities it was designated for. Please be aware that for each newly created collection, there is no scope defined by default. Thus, you can only select a definition in a report if you have added the respective data source to the collection before.

# What's New Message on first Optimize Startup

Every month, Optimize is evolving and becoming more robust. With many new features being added, it can be difficult to keep track what's actually new. To make this more clear, the release displays a `What's New` dialog the first time you enter Optimize.

{{< figure src="whats-new-message.png" alt="What's new message on first startup of Optimize." >}}

And you can take a look at this dialog any time you like. In the header, just click the `What's New` link next to the logout button, which opens up the dialog for you again.

# What's Next?

We'll release the minor **Camunda Optimize 2.7** at the end of 2019. Stay tuned.

Within the next few days, you'll be able to sign up the [Optimize 2.7 release webinar](https://camunda.com/learn/webinars/), which will take place in January.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
