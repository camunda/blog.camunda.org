+++
author = "Johannes Heinemann"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-11-27T09:00:00+01:00"
title = "Camunda Optimize 2.7.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.7.0-alpha2.

You can find improvements and features for the upcoming Optimize version 2.7.0 in this second alpha release, including:

- Data Sources for Collections
- What's New Message

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10730&version=15545) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

#  Data Sources for Collections

With Optimize 2.6.0, the new collection concept was introduced. Collections do not only contain a compilation of reports and dashboards, but also allow you to define fine grained permissions. With this release we extended the collection feature even further by allowing to define a data source. This enables you to determine on which particular definitions the collection should be based on. 

The following example will illustrate how it works. Let's assume we have a sales department in our company and every member should be able to see, create and update reports based on the lead qualification process to see how the department is currently doing. To do that you just create a collection called `Sales Reports`:

{{< figure src="create-collection-modal.png" alt="Depicts the modal when you create a new collection." >}}

Inside of the new collection you will find a new tab `Data Sources`. If you click on it you are able to add a new data source to the collection. In our case, we want to add the `Lead Qualification` process.

{{< figure src="collection-data-source-tab.png" alt="Shows the collection data source tab." >}}

{{< figure src="add-data-source.png" alt="Displays the modal of adding a data source to a collection." >}}

Once we are done with that, we create a new report inside of this collection. As you will see we are only able to create reports for those definitions we have defined in the data source.

{{< figure src="build-report-inside-collection.png" alt="Shows the report build inside the collection with the defined data source." >}}

This allows us to keep the collection clean and focused on those entities it was designated for. Please be aware that for each newly created collection there is no scope defined by default. Thus, you can only select a definition in a report if you have added the respective data source to the collection before.

# What's New Message on first Optimize Startup

Month by month, Optimize is evolving and growing more mature. With all the new features being added, it can be hard to keep track what's actually new. Therefore, the release displays a `What's New` dialog the first time you enter Optimize.

{{< figure src="whats-new-message.png" alt="What's new message on first startup of Optimize." >}}

You can also have a look at it any time. In the header, you can click the `What's New` link next to the logout button, which opens up the dialog again for you.

# What's Next?

We'll release the minor **Camunda Optimize 2.7** at the end of 2019. Stay tuned.

Feel free to already sign up for [our release webinar](https://camunda.com/learn/webinars/) that will take place in January.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
