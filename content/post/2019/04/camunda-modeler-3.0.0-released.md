+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2019-04-02T9:00:00+02:00"
title = "Camunda Modeler 3.0.0 Released"
+++

We are excited to announce the Camunda Modeler v3.0.0 major release. It comes with improved error recovery, extensibility, and better modeling experience in comparison to the `v2.x` series. In addition to that, it incorporates numerous bug fixes.

[Download the all-new app](https://camunda.com/download/modeler/) and start modeling right away.

<!--more-->

More than four months ago we set out to re-build the Camunda Modeler on an entirely new architecture, improving maintainability and paving the path for future extensions. We did so successfully and incorporated numerous improvements and bug fixes on the way. Let us have a look at some of the new features shipped with this release.



## Reworked Deployment Tool

We introduced the deployment tool in version 1.12.0. It allows you to deploy your diagrams directly from Camunda Modeler. This version of the app ships with an all-new deploy dialog,  rebuilt from scratch with improved UX, error reporting, support for authentication, [and more](https://blog.camunda.com/post/2019/01/camunda-modeler-3.0.0-0-released#completely-reworked-deployment-tool).

{{< figure class="no-border teaser" src="deployment-success.png" alt="A screenshot of deployment tool with successful deployment authenticated with username and password" caption="Deploy with credentials." >}}


## DMN Tabs

We improved the display and navigation in our DMN editor. With this release, you can inspect and quickly navigate all diagrams in a DMN file via the diagram content tabs.

{{< figure class="no-border teaser" src="decision-tabs.png" alt="A screenshot of DMN diagram with decision elements represented as tabs" caption="Navigate quickly between different diagrams in a DMN file." >}}


## Feedback Shortcuts

Would you like to share an improvement idea or file a bug report? Use the newly added _Report Issue_ entry in the apps help menu to connect to us right from within the app.

{{< figure class="no-border teaser" src="report-issue.png" alt="A screenshot showing shortcut to new issue page in help menu" caption="Report an issue via the help menu." >}}


## BPMN-Only Mode

The app now ships with a BPMN-only mode. [Disable DMN and CMMN via flags](https://github.com/camunda/camunda-modeler/tree/master/docs/flags) and end up with a clean BPMN-only desktop modeler.

{{< figure class="no-border teaser" src="bpmn-only.png" alt="BPMN-only mode" caption="Only BPMN inside." >}}


## Reworked File Dropping

The app now shows appropriate feedback when a user drops a file onto it.

{{< figure class="teaser no-border" src="file-dropping.png" alt="Easily drag and drop a file to open it in the app" caption="Drop a file to open it in the app." >}}


## Plugin System Improvements

Plug-ins are a way to extend the app with [custom features](https://github.com/camunda/camunda-modeler-plugins). The new release ships with [numerous](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#plug-ins) [improvements](https://github.com/camunda/camunda-modeler/issues/1253) that aim to make it easier and more reliable to write and consume them.

Most notably, the app now detects the presence of plug-ins and gives you the ability to re-start without plug-ins to debug if specific problems are plug-in related.

The improvements include [**potential breaking changes**](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#breaking-changes) that may affect the usage of plug-ins. One example is, that the plug-in directories are not scanned for plug-ins recursively anymore.

{{< figure class="no-border teaser" src="plugins-restart.png" alt="Restart the app with plug-ins disabled" caption="Restart the app with plug-ins disabled." >}}

Wonder what kind of plugins you can integrate into the Camunda Modeler? Check out the [camunda-modeler-plugins repository](https://github.com/camunda/camunda-modeler-plugins) for some examples. Head to the [plugins documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins) to learn how to roll your first plug-in.


## Improved File Discovery

The modeler now shows you the full path to a diagram when you hover a diagram tab. No more confusion where to find a diagram on disk!

{{< figure class="no-border teaser" src="file-path-tooltip.png" alt="File path tooltip" caption="Inspect the full file path when hovering a tab." >}}


## Automatic Align to Origin

Starting with this release, the modeler prevents the export of negative diagram coordinates by automatically aligning diagrams to the coordinate origin. This change renders the diagram origin cross as well as the _Move to Origin_ action obsolete. Subsequently, both have got removed from all editors.

The new behavior better aligns the tool with the relevant diagram interchange specifications. It results in improved compatibility with other modeling tools, too, as most have trouble dealing with negative diagram coordinates.

On the flip side, this feature is likely to introduce additional noise when merging diagrams using standard text-based DIFF tools. We want to hear your feedback regarding this change. Please [share it in our forum](https://forum.camunda.org/c/modeler).


## Update On Supported Environments

We updated our documentation, clarifying the app's supported environments. Quoting [the documentation](https://docs.camunda.org/manual/latest/installation/camunda-modeler/) directly:

```
Officially supported on the following operating systems:

* Windows 7 / 10
* Mac OS X 10.11 and later
* Ubuntu LTS (latest)

Reported to work on these operating systems, too:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8
```

As mentioned in the statement above it has been reported to run on many other operating systems, especially different variants of Linux, too. We support these alternative environments on a best-effort basis.


## There is More

Read our [previous](https://blog.camunda.com/post/2019/01/camunda-modeler-3.0.0-0-released/) [posts](https://blog.camunda.com/post/2019/02/camunda-modeler-3.0.0-beta.0-released/) on `v3.x` features or consult the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#300) to learn about all features and bug fixes that made it into this release. Also, recognize the [**potential breaking changes**](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#breaking-changes) that may affect the usage of plug-ins.


## Looking Forward

This release completes the port of the app to an entirely new architecture. It incorporates many bug fixes and improvements, too. [Download the new modeler](https://camunda.com/download/modeler/), give it a try, and, most importantly, give us feedback.

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.
