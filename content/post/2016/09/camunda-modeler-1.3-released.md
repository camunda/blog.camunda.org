+++
author = "Ricardo Matias"
categories = ["Modeling"]
tags = ["BPMN 2.0", "CMMN", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-09-09T13:00:00+01:00"
title = "Camunda Modeler 1.3 released"

+++

We are happy to announce version 1.3 of the Camunda Modeler!

This release comes with a new mode for DMN, morphing Expanded Sub Processes into Collapsed ones (and vice-versa) in BPMN,
a new context menu for tabs.

[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).

<!--more-->

<style>
  @media(min-width: 900px) {
    figure.main.teaser.headline {
      margin-left: -80px !important;
      margin-right: -80px !important;
    }
  }
</style>


## DMN Simple Mode

We've decided to introduce a new mode for DMN called Simple Mode, which intends to facilitate non technical users to work with DMN tables. Simple Mode is the default option when you open a table, but it's possible to switch to Advanced Mode by the top right button or with `ctrl+m` / `cmd+m`. In this mode, we have provided dialogs for *String, Integer, Double, Long, Date* and *Boolean* types, that make it much easier for users to interact with the cells.

{{< figure class="main teaser no-border" src="simple-mode.gif" alt="Camunda Modeler Screenshot" caption="DMN editing made esy with Simple Mode" >}}


## BPMN Expanded/Collapsed Sub Processes

We've added support for morphing Expanded to Collapsed Sub Processes and vice versa. When you morph an Expanded Sub Process with child elements into a Collapsed one, all the elements that are inside will be retained. Thus morphing back from Collapsed into an Expanded Sub Process will restore the previous state.

{{< figure class="main teaser no-border" src="expanded-collapsed.gif" alt="Camunda Modeler Screenshot" caption="Morph between Expanded and Collapsed Sub Processes." >}}


## Context Menu for Tabs

We've also worked on improving the way you can work with tabs. Now when right-clicking a tab, a contextual menu will open and allow several tab related actions.

{{< figure class="main teaser no-border" src="context-menu.gif" alt="Camunda Modeler Screenshot" caption="Tabs also have a context menu for easier tab handling." >}}


## Other Features

Here is a compendium of other features that were implemented in this release:

__General__

* Keyboard Shortcuts information (Help menu)
* DMN Namespace conversion to (http://www.omg.org/spec/DMN/20130901)


__BPMN__

* Label handling and direct editing
* Create elements of specific types
* Move selection of elements to the origin (0,0)

*BPMN Toolkit [blogpost](https://bpmn.io/blog/posts/2016-usability-modeling-improvements-bpmn-js-0-17.html)*


__DMN__

* Copy & paste rules
* Expression language
* Add a description to a cell
* Input variables
* Input/Output values

*DMN Toolkit [blogpost](https://bpmn.io/blog/posts/2016-simple-editing-dmn-0-6.html)*


__Properties Panel (BPMN & CMMN)__

- descriptions for input fields
- added a date format description for date input fields
- configure field injection for listeners

*Properties Panel Toolkit [blogpost](https://bpmn.io/blog/posts/2016-improvements-bpmn-cmmn-properties-panels.html)*


## Give us Feedback

We would love to hear your feedback. You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
