+++
author = "Vladimirs Katusenoks"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-05-24T14:00:00+02:00"
title = "Camunda Modeler 1.0 released"

+++

We are happy to announce version 1.0 of the Camunda Modeler!

This release contains many new features and stability fixes that significantly improve the modeling experience.
Working with large diagrams should be a lot faster due to features like copy and paste, searching and custom element templates. In addition to that, we are introducing CMMN support in the Modeler.

[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).
<!--more-->

{{< figure class="main teaser headline no-border" src="cmmn-diagram.png" alt="Camunda Modeler Screenshot" caption="Camunda Modeler 1.0" >}}

<style>
  @media(min-width: 900px) {
    figure.main.teaser.headline {
      margin-left: -80px !important;
      margin-right: -80px !important;
    }
  }
</style>



## New Features
We wanted to make the modeling experience as simple as possible for both the new and "power" users. Below are some of the major features we worked on for the release.


### CMMN - Case Management Model and Notation

Camunda Modeler received initial support for working with CMMN diagrams. Now it is possible to create and modify CMMN diagrams using similar tools to BPMN editing. The XML tab is also available for more insights into the diagram structure. Learn more about [modeling CMMN with the Camunda Modeler](/post/2016/05/camunda-modeler-cmmn-modeling/).

{{< figure class="main teaser no-border" src="cmmn-editing.png" alt="Camunda Modeler Screenshot" caption="CMMN diagram support" >}}


### Custom Element Templates

You can now extend the modeler with custom tasks or other elements through _element templates_.
These templates provide custom controls, validation and technical binding to the modeler.

{{< figure class="main teaser no-border" src="custom-templates.png" alt="Camunda Modeler Screenshot" caption="Mail task custom template" >}}

Find out more in our [introductory blog post](/post/2016/05/camunda-modeler-element-templates/) on the topic or the [Modeler Documentation](https://docs.camunda.org/manual/latest/modeler/camunda-modeler/element-templates/).


### Diagram Search
Search provides a quick way of finding, navigating and selecting elements based on their ID and name. Properties of pre-selected result are displayed in the properties panel. Hitting `ENTER` selects the result elements and with a quick press of `E` the name can be edited.

{{< figure class="main teaser no-border" src="search-edit.gif" alt="Camunda Modeler Screenshot" caption="Search, select and edit" >}}


### Copy/Paste
Ever wanted to simply copy part of the diagram and use it somewhere else? Now you can! Simply select the elements you want copied and paste them using the context menu (right-click) or keyboard shortcuts. The new elements will be pasted under the mouse cursor. It is also possible to copy/paste elements across all open tabs.

{{< figure class="main teaser no-border" src="copy-paste.gif" alt="Camunda Modeler Screenshot" caption="Copy and paste elements from one diagram to another" >}}


### Canvas Auto-Scrolling while dragging

Dragging near diagram borders now moves the canvas in that direction. That allows to easily reach the desired position without interruptions.

{{< figure class="main teaser no-border" src="auto-scrolling.gif" alt="Camunda Modeler Screenshot" caption="Auto-scrolling of canvas" >}}


### Global Connect Tool

The palette got a new tool that allows connecting distant elements with a few clicks. The tool is available at any zoom level and could be used with auto-scrolling as well.

{{< figure class="main teaser no-border" src="global-connect.gif" alt="Camunda Modeler Screenshot" caption="Using global connect tool" >}}


## Other Improvements

There are several other improvements incorporated in the release:

- Palette auto-collapse on smaller screens
- Correctly zoom/move the canvas while dragging elements or using modeling tools
- Improved behavior of the space tool for removing space
- Morphing behavior fixes
- Combining incoming & outgoing sequence flows when deleting elements

### Documentation

You can take a look at our new [documentation](https://docs.camunda.org/manual/latest/modeler/camunda-modeler/) section at [Camunda Docs](https://docs.camunda.org/).

## What's next

The focus for the next release is on improving integration of CMMN. A minimap and improved label editing are also in the pipeline.

We would love to hear your feedback. You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
