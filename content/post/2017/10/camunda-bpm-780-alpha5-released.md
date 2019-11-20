+++
author = "Yana Vasileva"
categories = ["Execution"]
tags = ["Release Note"]
date = "2017-10-27T12:00:00+01:00"
title = "Camunda 7.8.0-alpha5 Released"
+++

**Camunda BPM 7.8.0-alpha5** is here and it has great new improvements.

This month the highlights are mostly in Cockpit:

* Internationalization (i18n) for Cockpit & Admin
* Faster rendering of BPMN diagrams
* Metrics about cleaned up data
* Batch modification interface cleanup and new cancel feature
* Persistent configurations in Process Instance Search
* [28 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.8.0-alpha5)


If you are interested you can see the complete list of [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?version=15099&projectId=10230)
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.8.0-alpha5).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.8.0-alpha5).


## Internationalization (i18n) for Cockpit & Admin
> ¿Cómo estás?

Since Camunda BPM 7.2, Tasklist provides i18n support. This means that in addition to the English language, further translations can be added in a simple way.

Starting with this release, support for i18n is expanded to the other webapps. By default, the Camunda BPM Platform is only shipped with the English language. To add more translations, it is necessary to create or add a separate translation file to each webapp. The selection of the language is performed automatically, based on the language settings in the browser.

A collection of several translations for Tasklist can already be found as a community extension in a [central repository](https://github.com/camunda/camunda-tasklist-translations). We highly appreciate your contribution to improve the current translations or to add new ones.

Special thanks go to the [Cristian](https://github.com/macroproyectosCristian) who got the ball for this feature rolling as he provided a [pull-request](https://github.com/camunda/camunda-bpm-webapp/pull/12).


## Faster rendering of BPMN diagrams in Cockpit

The Camunda 7.8.0-alpha3 release already brought some significant performance improvements in rendering BPMN diagrams, making it **4x faster**.

{{< figure class="teaser no-border" src="rendering-faster.png" alt="Chart showing the increase in speed from circa eight to two seconds"
caption="Loading a complex diagram – speed comparision in seconds" >}}

This release breaks that record by making BPMN diagrams render **16x faster**, compared to the original rendering.

## Metrics about cleaned up data in Cockpit

The cleanup page was introduced in the previous release, mainly containing a view of the state of the history cleanup and a table with statistics about it.

To give even more insights about the behaviour of the history cleanup, this release comes up with a new metrics chart about the deleted process/decision/case instances and batch operations.

Although the chart looks similar to the Cockpit Dashboard metrics charts, it uses a logarithmic scale instead of a standard linear one. The use of a logarithmic scale makes it possible to see small metrics values, regardless of the differences in scales between the data sets.

{{< figure class="teaser no-border" src="metrics.png" alt="Cleanup Data Metrics"
caption="Cleanup Data Metrics" >}}


## Batch modification interface cleanup and new cancel feature in Cockpit

The interface for batch modifications in Cockpit has been refined. Now, you find all modification option pooled in the 'Options' section. Next to the already existing 'Asynchronous' check box you now find the options to skip custom listeners and IO mappings there as well.

In case your are applying a 'cancel' instruction now you can also select to
only cancel running activity instances. This is the new default, by unchecking the box you can also select newly created activities to be cancelled.

{{< video mp4="batchModification.mp4" title="Camunda BPM Cockpit" caption="Cancel running activity instances only" >}}


## Persistent configurations in Process Instance Search in Cockpit

With this release of Cockpit, the search functionality for process instances becomes more user friendly. Now, your latest sorting configurations and individually selected columns are persistant! By leveraging the local storage of your browser, it is now possible to come back later and keep working with the same customised search!

{{< video mp4="persistentColumns.mp4" title="Camunda BPM Cockpit" caption="Persistent Configurations in Process Instance Search" >}}


## Upcomming 7.8.0 Release
We are already eagerly busy preparing for the next minor release, which is scheduled for November 30.
So stay tuned...


## Give us your two cents
Please play around with the new **Camunda BPM 7.8.0-alpha5** release, try the new features and share your feedback.

We are always happy to see activity in our [forum](https://forum.camunda.org/).
