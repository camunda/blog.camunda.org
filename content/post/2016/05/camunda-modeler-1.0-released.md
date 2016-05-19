+++
author = "Vladimirs Katusenoks"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note"]
date = "2016-05-19T18:01:31+01:00"
title = "Camunda Modeler v1.0.0 released"

+++

We are happy to announce new stable release of [Camunda Modeler](https://github.com/camunda/camunda-modeler)!

This release contains many new features and stability fixes that significantly improve modeling experience.
Working with large diagrams should be much more flawless activity, as well as general speed of modeling due to features like custom element templates, search, copy/pasting and other. In addition to that, we are introducing CMMN support in the Modeler.

[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).
<!--more-->

{{< figure class="main teaser headline no-border" src="cmmn-diagram.png" alt="Camunda Modeler Screenshot" caption="CMMN diagram support" >}}

<style>
  @media(min-width: 900px) {
    figure.main.teaser.headline {
      margin-left: -80px !important;
      margin-right: -80px !important;
    }
  }
</style>



## New Features
We wanted to make modeling experience as simple as possible for both - new to the tool and our 'power' users. Below are some major features that we were working on for the release.


### CMMN
Camunda Modeler received initial support for working with CMMN diagrams. Now it is possible to create and modify CMMN diagrams using familiar tools to BPMN editing. XML tab is also available for more insights into the diagram structure.

{{< figure class="main teaser no-border" src="cmmn-editing.png" alt="Camunda Modeler Screenshot" caption="CMMN diagram support" >}}


### Custom Element Templates
Now it will be possible to create element descriptors and use them to create specific predefined elements. You can find out more about custom templates and how to use them [here](https://docs.camunda.org/manual/latest/modeler/camunda-modeler/element-templates/).

{{< figure class="main teaser no-border" src="custom-templates.png" alt="Camunda Modeler Screenshot" caption="Mail task custom template" >}}


### Diagram Search
Search provides a quick way of finding, navigating and selecting element based on their ID and name. Properties of pre-selected result are displayed in the properties panel. Hitting `ENTER` would select result element and allow with quick press of `E` key to direct edit name.

{{< figure class="main teaser no-border" src="search-edit.gif" alt="Camunda Modeler Screenshot" caption="Search, select and edit" >}}


### Copy/Paste
Ever wanted to simply copy part of the diagram and use it somewhere elsewhere? Now you can! Simply select elements one by one or use `lasso tool`, copy and paste using shortcuts or context menu. New elements would appear under a mouse cursor. It is also possible to copy/paste elements across all open tabs.

{{< figure class="main teaser no-border" src="copy-paste.gif" alt="Camunda Modeler Screenshot" caption="Copy and paste elements from one diagram to another" >}}


### Canvas Auto-Scrolling While Dragging
Dragging near diagram borders now moves canvas to the relevant direction. That should allow to easily reach desired position without interruption of manually selecting, moving or zooming.

{{< figure class="main teaser no-border" src="auto-scrolling.gif" alt="Camunda Modeler Screenshot" caption="Auto-scrolling of canvas" >}}


### Global Connect Tool
Palette got a new tool that allows to connect distant elements in a few clicks. The tool is available at any zoom level and could be used with auto-scrolling as well.

{{< figure class="main teaser no-border" src="global-connect.gif" alt="Camunda Modeler Screenshot" caption="Using global connect tool" >}}


## Other Improvements
There are several other improvements incorporated into release:

- Palette auto-collapsing on smaller screens
- Correctly zoom/move canvas while dragging elements or using modeling tools
- Space tool improved behavior for removing space
- Morphing behavior fixes
- Combining incoming & outgoing sequence flows when deleting element

## What's next
Focus for the next release would be on improving integration of CMMN. Mini-map and improved label editing are coming, as well.

We would love to hear your feedback. You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
