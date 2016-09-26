+++
author = "Thorben Lindhauer"
categories = ["Execution"]
tags = []
date = "2016-09-26T13:00:00+01:00"
title = "Recommending CMMN Activities"

+++

The Case Management Model and Notation (CMMN) standard deals with unstructured work that is performed in the context of a so-called case. A CMMN model specifies the frame in which a case is handled. It expresses design time considerations, such as hard restrictions when an activity can be performed or not. Aside from that, there are often soft patterns that only emerge at runtime based on case workers' experience. Detecting such patterns and providing insights to case workers can make dedicated case management with CMMN and Camunda especially useful.

<!--more-->

The CMMN standard leaves this aspect to tool vendors. During our hackdays in August, we developed an application for recommendation of CMMN activities. It can help answer questions like: *Given a potential customer's attraction and projected value, should I offer them a free consulting session?* Answers to such questions are based on historic case instances and therefore capture behavioral patterns. The algorithm and its implementation are simple enough such that they can be plugged into any process engine and do not require additional infrastructure aside from two database tables.

The application consists of:

* A core component for pattern learning and probability queries
* A process engine plugin for integration with Camunda's CMMN engine
* A Cockpit plugin for presentation


# Core Concept

Recommendations in our context are predictions over activity states. We take a case model for car evaluation:

{{< figure class="main teaser no-border" src="case.png" alt="CMMN Model" caption="Simple CMMN Model for Car Evaluation"  width="55%">}}

To link recommendations to case context, we require a probabilistic model to be deployed along with a CMMN case:

{{< figure class="main teaser no-border" src="graphical-model.png" alt="Graphical Model" caption="Probability Model Linking Data with Activities" >}}

The model describes case instance data, case activities, and their dependencies. Such a model is called a [Bayesian Network](https://en.wikipedia.org/wiki/Bayesian_network) and describes the structure of a probability distribution. See the [github readme](https://github.com/ThorbenLindhauer/cmmn-prediction) for details on this formalism and how we use it.

The core component maintains the distribution's parameters and provides an API for making probabilistic queries over the model's variables, for example: *What is the probability of making a test drive when the car has three doors?* The process engine plugin integrates the core component with the Camunda CMMN engine. It enables deployment of probabilistic models as part of a process application and records historic case instances to learn from.


# Cockpit Plugin

{{< figure class="teaser no-border" src="cockpit1.png" alt="Cockpit Integration" caption="Cockpit Integration" width="70%">}}

In Cockpit's new CMMN case instance view (Enterprise Edition only), we visualize the predictions using the core component's API. Cockpit is a tool targeted at case operators. Activity recommendations fit even better into a case worker's UI, for example as a sorted list from most likely to least likely activity.


# How to Use

The code is available at [https://github.com/ThorbenLindhauer/cmmn-prediction](https://github.com/ThorbenLindhauer/cmmn-prediction) and can be built from source. See the readme on github for setup instructions and more detailed explanations. Feedback is highly appreciated, be it about the general topic or our implementation. Get in contact via the [github issue tracker](https://github.com/ThorbenLindhauer/cmmn-prediction/issues) or the [Camunda forum](https://forum.camunda.org/).

