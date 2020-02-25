+++
author = "Ricardo Matias"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-03-24T16:40:49+01:00"
title = "Camunda Modeler v0.6.0 released"

+++

Today we're releasing a new version of the [Camunda Modeler](https://github.com/camunda/camunda-modeler). It comes with many new features, such as the addition of a XML editor for BPMN and DMN diagrams, image exporting and a greatly improved tab handling.

[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).

<!--more-->

{{< figure class="main teaser no-border" src="screenshot.png" alt="Camunda Modeler Screenshot" caption="Speaks XML, too." >}}

<style>
  @media(min-width: 900px) {
    figure.main.teaser {
      margin-left: -80px !important;
      margin-right: -80px !important;
    }
  }
</style>

## New Features

With this release we aim to improve the overall general interaction within the modeler. This comes in the form of editing XML without the need of an external tool, exporting diagrams as pictures and giving you the same level of control over tab management as your favorite browsers/editors.

### XML Editor

It's now possible to edit the underlying XML of BPMN and DMN diagrams directly in the modeler with the XML editor tab. The XML editor comes with its own history (undo/redo), search/replace functionality and XML syntax highlighting.

### Image Exporting

We've added image exporting to BPMN diagrams with support for PNG, JPEG or SVG formats.

{{< figure class="teaser no-border" src="image-export.png" alt="Image Exporting" caption="Export BPMN diagrams as PNG, JPEG or SVG." >}}

### Tab Handling

It's now possible to organize open tabs by dragging, cycle through them, re-open closed ones and close/save all tabs at once. Most of these features can be accessed through the menu or with keyboard shortcuts.

{{< figure class="teaser no-border" src="interaction.gif" alt="Sublime tabbing." caption="Sublime tabbing." >}}

## Usability Improvements

Along with these features we've also added a log tab, where any import errors/warnings that might occur will be shown. Checking for external file changes has also been added, which allows having the diagrams always up to date even when editing the file with other tools. Last but not least, the properties panel is now resizable and the modeler version can be verified in the help menu.


## What's next

We've already got the [next modeler release](https://github.com/camunda/camunda-modeler/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22M04+-+Huge+Diagrams%22) in the pipeline. There we are focusing on improving the overall interaction with big BPMN diagrams and copying and pasting of BPMN elements. Perhaps there will also be some CMMN inside?

We would love to hear your feedback. You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
