+++
author = "Thorben Lindhauer"
categories = ["Execution"]
date = "2016-06-14T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.6.0-alpha1 Released"

+++

Today, we release Camunda BPM 7.6.0-alpha1. It is primarily a release that fixes a regression in the REST API's correlation method as present in 7.5.0. Check JIRA ticket [CAM-6139](https://jira.camunda.com/browse/CAM-6139) for whether this problem affects your application.

Also, it porvides the following improvements / features:

* Access DelegateExecution from Context (Thread Local) using Public API
* Get a correlation result response when correlating a Message
* Retrieve the Error Message of a thrown Error Event

Read the [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14602) for a complete list of changes.

[Download Camunda For Free](https://camunda.org/download/) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Please let us know on the [user forum](https://forum.camunda.org/) if you find any problems.
