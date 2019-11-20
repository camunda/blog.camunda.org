+++
author = "Felix Mueller, Omran Abazeed"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-05-03T09:00:00+01:00"
title = "Camunda Optimize 2.5.0-alpha1 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.5.0-alpha1.
You can find improvements and features from the upcoming Optimize version 2.5.0 in this first alpha release, including:

- Improved handling of Reports with many data points
- Searchable Definition Dropdowns

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15391) are available in Jira.

<!--more-->

You can [try out a free trial of Camunda Optimize](#how-to-get-it).


# Improved handling of Reports with many data points

Showing all the report data available in Optimize at once might not be useful in certain visualizations because doing that makes it very hard to see or extract any conclusion from the data. Moreover, some of the data might be outdated or not interesting to the user and loading them all at once will only slow down the application.

To solve these problems, Optimize will not show more than 1000 data points on a selected visualization. This number of data points will be enough to read the data clearly and see any patterns in the overall data. Since all the data is stored in Optimize, the user can still look at the rest of the data by refining the results using one of the filters or modifying the grouping.

A warning message above the visualization will appear when the report does not represent the whole data stored as shown.

{{< figure src="data-warning.png" alt="Incomplete data warning">}}

# Searchable Definition Dropdowns

Optimize is a tool that is especially useful, when you have a lot of data. Typically that includes a myriad of deployed process definitions on the workflow engine. However, selecting a process definition was very tedious in the past, especially if you had a lot of different definitions. That was due to how a user had to select definition name, which was rather inconvenient: the names were shown as a dropdown list and you had to sift through the whole list until you found your desired definition.

Since Optimize 2.5 alpha1 you can search for the name definition that you are looking for and immediately select the right definition. It works for both for process and decision definitions. Have a look at the preview to get an impression how that works:

{{< figure src="definition-selection.png" alt="Searching for definitions">}}


# What's Next?

The next alpha of Camunda Optimize 2.5 will be released on May 31, 2019. Our team is already working on it, adding both larger features and many small improvements.

After the next alpha release, we'll release the next minor **Camunda Optimize 2.5** at the end of the second quarter 2019. Stay tuned.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. Unlike the core Camunda BPM engine, Camunda Optimize is not open source, so please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.

Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
