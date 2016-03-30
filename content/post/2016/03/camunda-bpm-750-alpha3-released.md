+++
author = "Sebastian Stamm"
categories = ["Execution"]
date = "2016-03-31T16:00:00+02:00"
tags = ["Release Note"]
title = "Camunda BPM 7.5.0-alpha3 Released"
+++


<!-- TODO:
  - number of bugfixes and link
  - link to complete release notes
  - check if the list of plugin points in the docs is correct
  - check if the link to the tasklist accessibility section works
  - write chapter about news for multi tenancy
-->

Camunda 7.5.0-alpha3 is here. The highlights of this release are:

* New Design for Camunda Tasklist
* New Cockpit Dashboard
* Improved Support for Multi Tenancy
* Accessibility Features for Tasklist Users
* More Powerful Process Instance Migration
* [18 Bug Fixes](https://app.camunda.com/jira/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.5.0-alpha3)

The [complete release notes](https://app.camunda.com/jira/secure/ReleaseNote.jspa?projectId=10230&version=14390) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

Find a [list of known issues](https://app.camunda.com/jira/issues/?jql=project%20%3D%20%22camunda%20BPM%22%20and%20affectedVersion%20%3D%207.5.0-alpha3) in Jira.

<!--more-->


# New Design for Camunda Tasklist

With this release the Tasklist gets a new look:

{{< figure class="teaser no-border" src="tasklist-2016-design-1.png" caption="The all new Tasklist!" >}}

All information about this change can be read in a [dedicated blogpost]({{< relref "post/2016/03/tasklist-2016-design.md" >}}).


# New Cockpit Dashboard

The Cockpit dashboard is the main entry point for monitoring and operations. Over the past releases, a lot of features were added to the Camunda Cockpit. As a consequence, the dashboard became more and more crowded.

The new Cockpit dashboard provides an overview over four categories in Cockpit: Processes, Decisions, Deployments and Reporting. In this release, the essential information for each of these categories are displayed as well as a link to get to the respective sections of the categories. Processes and Decisions each get their own dashboard for plugins and to display the list of processes or decisions:

{{< figure class="teaser no-border" src="cockpit-dashboard.png" caption="The new Cockpit Dashboard" >}}

The new Dashboard can be extended with plugins and custom functionality. See the documentation for a [list of all plugin points in Cockpit](https://docs.camunda.org/manual/latest/webapps/cockpit/extend/plugins/#plugin-points)


# Improved Support for Multi Tenancy

Todo.


# Accessibility Features for Tasklist Users

All elements in the Camunda Tasklist can be accessed using only the keyboard. There are also [keyboard shortcuts](https://docs.camunda.org/manual/latest/webapps/tasklist/accessibility/#keyboard-shortcuts) which make working with the Tasklist easier. It is also possible to [add additional shortcuts](https://docs.camunda.org/manual/latest/webapps/tasklist/configuration/#shortcuts) and use them in Tasklist plugins.

{{< figure class="teaser no-border" src="tasklist-2016-shortcuts.png" caption="A list of tasklist shortcuts" >}}


# More Powerful Process Instance Migration

With this release it is possible to migrate process instances which have multi-instance activities. In addition, instances can be migrated asynchronously.

The Cockpit interface for the migration now uses a page flow, providing separate pages for the migration mapping, instance selection and confirmation.

{{< figure class="teaser no-border" src="cockpit-migration.png" caption="The migration confirmation screen in Cockpit" >}}


# Feedback Welcome

If you have feedback on the new release, please comment on this post or reach out in the [new forum](https://forum.camunda.org/).
