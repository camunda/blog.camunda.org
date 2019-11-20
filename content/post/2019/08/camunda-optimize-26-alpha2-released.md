+++
author = "Felix Mueller"
categories = ["Camunda Optimize"]
tags = ["Camunda Optimize", "Release Note"]
date = "2019-08-30T09:00:00+01:00"
title = "Camunda Optimize 2.6.0-alpha2 Released"
+++

We are happy to announce the release of Camunda Optimize version 2.6.0-alpha2.
You can find improvements and features from the upcoming Optimize version 2.6.0 in this second alpha release, including:

- Outlier Analysis
- Improved Support for Undefined and Null Variable Values
- Supported Docker Image

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10730&version=15515) are available in Jira.

<!--more-->

[Try out a free trial of Camunda Optimize](#how-to-get-it).


# Outlier Analysis

Optimize 2.5 allows you to inspect the average, minimum, maximum and median durations of flow nodes within your processes.
Using the heatmap visualization, you are also able to compare the durations with target durations that can be easily set directly in Optimize.

With this release we add a very exciting feature which adds the possibility to easily identify process instances where certain flow node instances take significantly longer than others and subsequently slow down your process.
We call this `Outlier Analysis`. Let's have a look into the feature based on a small step-by-step example.

In the example below, our process consists of two User Tasks and two Send Tasks.
When using the new Outlier Analysis feature within the Analysis section and selecting the process, we can directly see that the Heatmap highlights the Flow Nodes where Optimize identified many duration outliers. In our example, the Tasks *Review Lead* and *Confirm Lead* duration outliers were identified.
When hovering over the task you can see how many instances were identified and how much longer they take compared the average duration.

{{< figure src="outlierExample_1_heatMap.png" alt="Outlier Example Heatmap" >}}

A click on *View Details* on a flow node allows you to directly see a Duration Distribution Chart for that specific flow node. The Duration Distribution Chart shows you how long the identified outliers take - also in comparison to the other flow node instance durations.

{{< figure src="outlierExample_2_distribution.png" alt="Outlier Example Distribution" >}}


## Significant Variable Values

When looking at the duration outlier instances, you can analyze the data further in order to do more root-causing for why these instances eventually took so long.
A click on the significant variables tab shows you a table that lists significant variable values in the outlier instances. It also allows you to see how many times this variable value occurred in the outlier instances compared to the rest the process instances. This can give you a good idea if there is a correlation between a variable value and a flow node that is taking more time than expected.

{{< figure src="outlierExample_3_Variables.png" alt="Outlier Example Variables" >}}


# Undefined and Null Variable Values

Variables are a very important ingredient of most workflows.
Optimize allows you to group process instance count and durations by variables and also includes powerful variable filtering possibilities. With this release we improve in both areas.

## Group by Variable: Null + Undefined Values
When you group the process instance count or duration by a specific variable before this release, you were only able to see process instances where a value was set. With this release Optimize will additionally display the count and duration for process instances where no value is set or a variable has been set explicitly to null.

{{< figure src="group-by-variable.png" alt="Group by Variable with Null Values" >}}


## Filter Process Instances by Null and Undefined Variable Values
In certain scenarios it is necessary to find out which process instances have a null value.
With this release we add the possibility for every supported data type to filter for null and undefined variable values.

{{< figure src="variable-filter-null-values.png" alt="New Variable Filter" >}}
{{< figure src="report-active-null-variablevalue-filter.png" alt="New Variable Filter" >}}

# Supported Docker Image

With this release, we also add an officially supported Docker Image for Optimize to our Camunda Docker Registry.
This will enable you to quickly run Optimize in environments where you are making use of Docker already.

In order to use the Camunda Docker Registry you first have to login with your Enterprise Credentials:
```
docker login registry.camunda.cloud
Username: your_username
Password: ******
Login Succeeded
```

Afterwards you can start Optimize for example like this:
```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -e OPTIMIZE_CAMUNDABPM_REST_URL=http://example.org/engine-rest \
           registry.camunda.cloud/optimize:2.6.0-alpha2
```

A detailed documentation about the Configuration of the container you can find in our [Optimize documentation](https://docs.camunda.org/optimize/latest/technical-guide/setup/installation/#production-docker-image-without-elasticsearch).


# What's Next?

We'll release the minor **Camunda Optimize 2.6** at the end of the third quarter 2019. Stay tuned.
Feel free to already sign up for our release webinar that will take place in October.

# How to get it

If you want to give Camunda Optimize a try, you can download the alpha release [here](https://docs.camunda.org/enterprise/download/#camunda-optimize) with your Enterprise customer credentials. If you prefer, you can also use [Docker to run Camunda Optimize](https://docs.camunda.org/optimize/latest/technical-guide/setup/installation/#production-docker-image-without-elasticsearch). Please sign up [here](https://camunda.com/download/enterprise/) for a free 30-day trial version.


Please note that alpha releases are not intended for production usage.

If you're new to Optimize, we recommend that you watch the [Getting Started with Optimize in less than 5 Minutes](https://camunda.com/learn/videos/getting-started-optimize/) video.
