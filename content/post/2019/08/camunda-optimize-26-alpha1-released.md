+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-08-02T09:00:00+01:00"
title = "Camunda Optimize 2.6.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.6.0-alpha1.
You can find improvements and features from the upcoming Optimize version 2.6.0 in this first alpha release, including:

- Multi-Version Support for Process and Decision Reports
- Durations for Running Process Instances
- New User Task Assignee & Candidate Group Reports

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15511) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).


# Multi-Version Support for Process and Decision Reports

The Camunda BPM Platform supports versioning of process and decision definitions. Whenever you deploy a modified definition to the engine it will automatically increase the version of this definition.

Before this release Optimize already allowed you to create reports for a single version or for all versions at the same time.

For many use-cases users need more flexibility for selecting versions for a report. Hence with this release we allow the user for the first time to select multiple versions of the same definition when creating a report.

The Camunda engine additionally allows you to tag a process definition with a version tag attribute. This allows to make small fixes or changes to your definition and keeping a business-related version at the same time. The version tag is already visible within Cockpit, Modeler as well as in different APIs.
With this release we add the Version Tag to Optimize, too. This allows users to select all definition versions with the same Version Tag for a specific report.

In addition to that we added support for selecting the latest version of a definition automatically. This feature is especially useful in situations when you regularly deploy new versions of your process or decision definitions but always want to look at the latest version in your reports. In the past you had to update all reports manually after a deployment if you wanted to achieve the same effect.

The above mentioned features can be seen in following screen:

{{< figure src="multi-version-selection.png" alt="Process Definition Version Selection" >}}


# Durations for Running Process Instances

Durations of process instances are a very important base for process improvements.
So far in Optimize it was only possible to look at the duration of *completed* process instances.

With this release we allow users to look at the duration of *running* process instances.

{{< figure src="running-instances-durations.png" alt="Running Process Instance Durations" title="Running Process Instance Durations" >}}

This feature also has direct influence on the process instance duration filter as it now also supports running process instances.
Additionally, you can easily compare durations of running process instances with durations of completed instance in a Combined Report which allows you to notice if your running instances are taking longer than completed instances.

{{< figure src="running-vs-completed-durations.png" alt="Running vs. Completed Process Instance Durations" title="Running vs. Completed Process Instance Durations" >}}

# New User Task Assignee & Candidate Group Reports

Before this release we added multiple features which support you analyzing User Tasks including information regarding assignees, candidate groups as well as idle, work and total durations. Based on these features you were able to look at the running and completed user task counts and durations per user which allowed you already to see how much workload a current user has and how many he completed in the past.

{{< figure src="running-tasks-by-user.png" alt="Running User Tasks by Assignee distributed by None" title="Running User Tasks by Assignee distributed by None" >}}

With this release we add the possibility to distribute this information additionally by User Tasks which helps you to see which User Tasks of the Process your users are working on or have completed in the past. To allow both (distribution by User Task and no distribution) we added a new option in the configuration popover as you can see below:

{{< figure src="running-tasks-by-user-by-task.png" alt="Running User Tasks by Assignee distributed by User Task" title="Running User Tasks by Assignee distributed by User Task" >}}

Sometimes you might want to look into completed User Tasks and analyze how many User Tasks have been completed by which assignee. This is possible by changing the Flow Node Status to *completed* in the configuration popover.
{{< figure src="completed-tasks-by-users-by-task.png" alt="Completed User Tasks by Assignee" title="Completed User Tasks by Assignee" >}}

The same functionality is also available for durations.

# What's Next?

The next alpha of Camunda Optimize 2.6 will be released End of August 2019.

After the next alpha release, we'll release the minor **Camunda Optimize 2.6** at the end of the third quarter 2019. Stay tuned.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
