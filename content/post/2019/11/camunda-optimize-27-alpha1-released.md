+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-11-01T09:00:00+01:00"
title = "Camunda Optimize 2.7.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.7.0-alpha1.

You can find improvements and features for the upcoming Optimize version 2.7.0 in this first alpha release, including:

- Executing or Pending Flow Node Filter
- Process Instance Durations in Raw Data Table
- Alerts moved into Collections
- User and Group Search for Collections
- Copy of Collections

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15545) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# Executing or Pending Flow Node Filter

Monitoring running processes is an important capability of Optimize and provides a lot of value in a range of scenarios.

Sometimes it is relevant to monitor only certain process instances where a specific step within this process instance is currently active and waiting to be completed. For example, this could be a Timer Event, a User Task that is being worked on, or a Message Catch Event that has not yet been correlated with a process instance.

To allow the user to filter for relevant information, we added a new *executing flow node filter* in the report builder.
You can add the executing flow node filter by clicking on "Add Filter" and then on "Flow Node".
In the following example, we select the User Task "Make an Offer".

{{< figure src="executing-flow-node-filter.png" alt="Executing Flow Node Filter" >}}

In the Raw Data Table we are now only looking at those process instances where at least one "Make an Offer" User Task is currently running.
{{< figure src="executing-flow-node-result.png" alt="Executing Flow Node Filter Raw Data Result" >}}


# Process Instance Durations in Raw Data Table

The raw data table view gives you a good overview of the data that's available from processes and decisions.
The table can be sorted, and columns can be hidden. Because the process instance duration is an important piece of information when it comes to process improvement, we added the process instance duration for completed process instances to this table. Like the other columns, it can also be hidden in a specific report.

{{< figure src="process-instance-durations.png" alt="Process Instance Durations">}}


# User Permission Improvements

With Optimize 2.6.0, we introduced a more complex user permission system based on our Collections.
With this release, we've added even more advanced features, and we make further improvements to permissions in Optimize.

## Alerts moved into Collections

Before this release, Alerts had a separate navigation point in the header of Optimize, and on the Alert List page, only a list of existing Alerts was displayed.

Because Alerts are tightly coupled to reports and also inherit the Permissions from the report that the user has access to, we moved the Alerts into Collections.

Therefore, we added a new tab within the Collections page which allows you to add alerts directly into Collections. At the same time, it is no longer possible to add alerts outside of Collections.

{{< figure src="alerts-in-collections.png" alt="Alerts in Collections">}}
{{< figure src="alerts-in-collections-modal.png" alt="Alerts in Collections">}}

Existing Alerts (including their referenced Reports) will be moved into an "Archive" Collection that will be created during migration.

## User and Group Search for Collections

Before this release, when adding users to your Collections, you had to remember their User or Group ID.

So that working with Collections and Permissions is more user friendly, we are adding a Typeahead Search for Users and Groups with this release.

This search will be performed on Firstname, Lastname and E-Mail Address. Additionally, you can still use the IDs of Users and Groups.

{{< figure src="collections-user-group-search.png" alt="Collections User Group Search">}}

{{< figure src="collections-user-group-list.png" alt="Collections User Group List">}}

To support this feature, Optimize will cache the users and groups (that you gave access rights in Admin) in memory.

## Copy of Collections

With this release, we've added the ability to copy entire Collections, including all Reports, Dashboards, and assigned Users.

You can copy a Collection directly from the homepage, or alternatively, from within the Collection.

{{< figure src="collection-copy.png" alt="Collections Copy">}}

{{< figure src="collection-copy-modal.png" alt="Collections Copy Modal" >}}

# What's Next?

The next alpha of Camunda Optimize 2.7 will be released at the end of November 2019.

Following the next alpha release, we'll release **Camunda Optimize 2.7** at the end of 2019. Stay tuned.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
