
+++
author = "Niklas Kiefer"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2019-02-14T08:00:00+01:00"
title = "Camunda Modeler 3.0.0-beta.0 Released"
+++

We are happy to announce the first beta of the Camunda Modeler 3.0.0. This release achieves feature parity with the last stable version and completes our port of the application to an entirely new architecture. Once more it incorporates numerous additional improvements and bug fixes. We encourage you to try it out.

<!--more-->

Building on top of our [last pre-release](https://blog.camunda.com/post/2019/01/camunda-modeler-3.0.0-0-released/), we completed restoring features included in the latest stable release `v2.2.4`. This contained file dropping functionality (cf. picture below), unsaved file detection and the keyboard-shortcut overlay.

{{< figure class="teaser no-border" src="file-dropping.png" alt="Easily drag and drop a file inside" caption="Drop a file to open it in the app." >}}

[Download the latest beta](https://camunda.org/release/camunda-modeler/3.0.0-beta.2/) and start modeling right away.


## BPMN-Only Mode

Starting with this release, you can disable DMN and CMMN editing to end up in a BPMN-only mode.
You may do so via the `disable-dmn` and `disable-cmmn` flags.

{{< figure class="no-border teaser" src="bpmn-only.png" alt="BPMN-only mode" caption="Only BPMN inside." >}}

Learn more about flags and how to use them in [the flags documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/flags).


## Plugin System

This release restores and reworks the plug-in system. We ship [numerous improvements](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#plug-ins) that aim to make it easier and more reliable to write and use plug-ins. See the [plugins documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins) for guidance.

Please note the [**potential breaking changes**](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#breaking-changes) that may affect the usage of plug-ins.

{{< figure class="no-border teaser" src="comment-plugin.png" alt="Integrating plugins" caption="Extend the BPMN modeler with embedded comments." >}}

Wonder what kind of plugins you can integrate into the Camunda Modeler? Check out the [camunda-modeler-plugins repository](https://github.com/camunda/camunda-modeler-plugins) for some examples.


## Improved File Discovery

Starting with this release, you may hover a diagram tab to inspect the full path to the diagram. No more confusion where to find a diagram on disk!

{{< figure class="no-border teaser" src="file-path-tooltip.png" alt="File path tooltip" caption="Inspect the full file path when hovering a tab." >}}


## Align to Origin

Coming out of this release, the modeler prevents the export of negative diagram coordinates by automatically aligning diagrams to the coordinate origin. This change renders the diagram origin cross as well as the _Move to Origin_ action obsolete. Subsequently, both have got removed from all editors.

The new behavior better aligns the tool with the relevant diagram interchange specifications. It results in improved compatibility with other modeling tools, too, as most have trouble dealing with negative diagram coordinates.

On the flip side, this feature is likely to introduce additional noise when merging diagrams using standard text-based DIFF tools. We want to hear your feedback regarding this change. Please [share it in our forum](https://forum.camunda.org/c/modeler).


## Update On Supported Environments

We updated our documentation, clarifying the app's supported environments. Quoting directly from [the documentation](https://docs.camunda.org/manual/latest/installation/camunda-modeler/):

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

As mentioned in the statement above it is reported to run on many other operating systems, especially different variances of Linux, too. We support these alternative environments on a best-effort basis.


## There is More

Read the [changelog](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#300-beta0) to learn about all features and bug fixes that made it into this release. Also, recognize the [**potential breaking changes**](https://github.com/camunda/camunda-modeler/blob/master/CHANGELOG.md#breaking-changes) that may affect the usage of plug-ins.


## Known Issues

As the current release is a beta version, it still [contains known issues](https://github.com/camunda/camunda-modeler/milestone/35) we plan to tackle in the next milestone. Help us test the release and report issues you find in [our issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).


## Looking Forward

This release completes the port of the app to an entirely new architecture. It incorporates many bug fixes and improvements, too. [Download the beta](https://camunda.org/release/camunda-modeler/3.0.0-beta.2/) and give it a try.

Did we miss anything? Did you spot a bug or would you like to suggest an improvement? Reach out to us via [our forums](https://forum.camunda.org/c/modeler), tweet us [@Camunda](https://twitter.com/Camunda) or file issues you found in the [Camunda Modeler issue tracker](https://github.com/camunda/camunda-modeler/issues/new/choose).

Stay tuned for future updates.



