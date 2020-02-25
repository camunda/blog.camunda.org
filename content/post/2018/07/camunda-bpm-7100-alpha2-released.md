+++
author = "Nikola Koevski"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-08-03T16:00:00+02:00"
title = "Camunda 7.10.0-alpha2 Released"

+++

The second alpha release of **Camunda BPM 7.10** is here and the highlights are:

* Cascading History Cleanup based on process hierarchy
* Notable security fixes
* Start process list changes in Tasklist
* Modify single process asynchronously
* More supported environments - PostgreSQL 10.4 and MariaDB 10.3
* [18 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.10.0-alpha2)

<!--more-->

You can <a href="https://camunda.com/download/">Download Camunda for free</a> (click on Preview Release) or <a href="https://hub.docker.com/r/camunda/camunda-bpm-platform/">Run it with Docker</a>.

<!-- update links -->
If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15327)

and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.10.0-alpha2).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.10.0-alpha2).

<!-- notable features & fixes - start -->

## Cascading History Cleanup based on process hierarchy

Scene: Lets have a process definition called "Nesting doll" which includes a call activity. Furthermore, this call activity includes it's own call activity, and so on, like a nesting doll. 
A "Nesting doll" process is started, and some of the (child) call activities are completed. Several days pass and the process still hasn't been completed. We open up _Cockpit_ and decide to look into the historical data... and it's gone. What happened? Well, the call activity had a history time to live (TTL) value defined which expired before the containing process was finished, so it was removed by the History Cleanup job.

We solved this historical inconsistency problem through the implementation of a *Hierarchical History Cleanup* mechanism. By introducing a _root-descendant_ structure together with a _removal time_ property for each historic process instance, we ensured that no descendant historic process instances are removed by the history cleanup job before the root one .

## Notable Security fixes

### CSRF Prevention Filter

With the CSRF Prevention Filter the Webapps are even more secure. The CSRF filter is enabled by default, validating each modifying request performed through the webapps. The filter implements a (per-session) _Synchronization Token_ method for CSRF validation with an optional _Same Origin with Standard Headers_ verification.

If you would like to enable the additional _Same Origin with Standard Headers_ verification, the `targetOrigin` init-parameter should be set to the _application expected deployment domain_ in the `web.xml` file of your application.
(See the sample configuration in [the docs](https://docs.camunda.org/manual/latest/update/minor/79-to-710/#support-for-csrf-prevention-in-the-webapps)).

### Whitelist patterns for User, Group and Tenant IDs

Another security fix is resource whitelisting. From now on User, Group and Tenant IDs can be matched against a Whitelist Pattern to determine if the provided ID is acceptable or not. The default (global) Regular Expression pattern to match against is *"[a-zA-Z0-9]+|camunda-admin" (7.10+)*  i.e. any combination of alphanumeric values or _'camunda-admin'_.

It's possible to modify the pattern to suit your needs by setting the process engine configuartion propery `generalResourceWhitelistPattern` with a new pattern. Standard [Java Regular Expression](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html) syntax can be used. For example, to accept any character, the following property value can be used:

```xml
<property name="generalResourceWhitelistPattern" value=".+"/>
```

The definition of different patterns for User, Group and Tenant IDs is possible by using the appropriate configuration propery:

```xml
<property name="userResourceWhitelistPattern" value="[a-zA-Z0-9-]+" />
<property name="groupResourceWhitelistPattern" value="[a-zA-Z]+" />
<property name="tenantResourceWhitelistPattern" value=".+" />
```

Note that if a certain pattern isn't defined (ex. the tenant whitelist pattern), the general pattern will be used, either the default one (`"[a-zA-Z0-9]+|camunda-admin"`) or one defined in the configuration file.

## "Start process" list changes in Tasklist

In the [previous alpha](https://blog.camunda.com/post/2018/06/camunda-bpm-7100-alpha1-released/) we introduced a new query option "startable" for process definitions. In this alpha, the process definitions list provided through the `Start process` feature in Tasklist respects this query option and displays only the "startable" process definitions. 
In addition, the user needs the following permissions to see a process definition in this list, and of course, to start one:

* `CREATE` permission for all Process instances
* `CREATE_INSTANCE` and `READ` permissions on the Process Definition level

## Modify Single process asynchronously

The latest feature in Cockpit is the asynchronous modification of a single process instance. Open Cockpit and navigate to the Runtime view of the desired process instance. Choose which modification to perform. The Asynchronous check box is in the Review modification window.

{{< figure src="cockpit-modification-review.png">}}

Once submitted by clicking "Proceed", a new job will be created and executed asynchronously.

<!-- notable features & fixes - end -->

## Take a Sneak Peek at What Is Next
We are already eagerly busy preparing for the next alpha release, which is scheduled for end of August.

Among other things, we are working on the following topics, which are planned to be released in one of the next alpha releases:

* Latest Wildfly version is supported
* bpmn-js plugins are available in Cockpit

And there is more to come! Take a look at the [roadmap](https://camunda.com/learn/community/#roadmap) for the bigger list of planned features.


## Your Feedback Is Highly Appreciated!

With every release we constantly strive to improve **Camunda BPM**. To make this possible, we rely on your feedback.
Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
