+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2020-04-30T00:00:00+00:00"
title = "Camunda Optimize 3.1.0-alpha1 Released"
+++

We’re excited to announce the release of Camunda Optimize 3.1.0-alpha1.

In this first alpha release of Optimize 3.1.0, you can get an early look at many improvements and features in advance of the stable Optimize 3.1.0.

This release focuses on:

* New Date Filters for all Date Variables
* New Business Key Import Plugin Point

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=16012) are available in Jira.


You can [try out a free trial of Camunda Optimize](#how-to-get-it).

# New Date Filters for all Date Variables

In Optimize 3.0 we added new rolling date filters for Process Instance Start Date and End Date Filter.

With this alpha release we make these new filters available for all Date Variables so that you can set rolling values such as “Today”, “This week” or “in the past 5 months”.

{{< figure src="variable-date-filter1.png" alt="Date Variable Filter Options" >}}
{{< figure src="variable-date-filter2.png" alt="Date Variable Filter Applied" >}}

# New Business Key Import Plugin Point

In Camunda BPM it is possible to define a Business Key for every process instance. Within Optimize the Business Keys are available so that you can identify specific process instances easily.

Sometimes Business Keys can contain confidential information that need to be anonymized so that they can be used in Optimize.
Exactly for this use case we added a new Plugin Point within Optimize which allows you to hook into the Optimize import and adjust business keys during process instance imports.

{{< figure src="process-instance-import.png" alt="Business Key Import" >}}

In order to support you building such a plugin we added an example to our [Optimize Example GitHub Repository](https://github.com/camunda/camunda-optimize-examples/tree/master/businesskey-import-plugin/).

# What's Next?

We'll release the next alpha of **Camunda Optimize 3.1** end of May 2020. Stay tuned.

A smooth update from Camunda Optimize 3.0 to Optimize 3.1 will be possible. Along with the release we will publish a dedicated update guide.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes video](https://camunda.com/learn/videos/getting-started-optimize/).
