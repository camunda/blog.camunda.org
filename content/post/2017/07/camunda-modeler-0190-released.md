+++
author = "Patrick Dehn"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-08-01T20:00:00+01:00"
title = "Camunda Modeler 1.9.0 Released"
+++

We are proud to announce the release of Camunda Modeler version 1.9.0.

It ships with improved label editing, improved snapping for better-looking diagrams and various improvements to the underlying toolkit.
<!--more-->

## Label Editing and Text Annotations

Working with text annotations has improved significantly. When editing labels, you now see what you will get once you're finished editing, regardless of the zoom.

Futhermore, text annotations now automatically resize to fit their content and can be resized, too.

{{< figure class="teaser no-border" src="text-editing.gif" alt="Text annotation screencast" caption="Editing labels and text annotations has improved" >}}

## Snap to Flows when creating and moving Elements

This release brings improvements to dropping elements onto flows. Elements now snap to flows when moving them making it easier to create better-looking diagrams. Simply create a new element from the palette or grab an existing one and drop it onto a flow.

{{< figure class="teaser no-border" src="snap-on-flows.gif" alt="Snap on flows screencast" caption="Elements snap to flows" >}}

## Configure History Time To Live in BPMN and CMMN

The [history cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup) feature in Camunda BPM helps to regularly remove historic data from history tables. You can now configure the time to live of historic data for process definitions and case definitions in the Camunda Modeler using the properties panel.

{{< figure class="teaser no-border" src="history-time-to-live.gif" alt="History time to live" caption="Configure history time to live" >}}

Learn more about [history cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup) in the Camunda user guide.

## Other Improvements

* Pasting a elements many times after copying is now possible
* Processes are now executable by default
* Dropping files from other applications is now possible
* Fixes regarding detection of file changes, reopening tabs that weren't saved
* Import diagrams containing an Activiti name space now works
* Labels of attached elements are now moved with their associated element
* Form fields can always be created

You can find the list of all changes [here](https://github.com/camunda/camunda-modeler/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aclosed%20closed%3A%3E2017-06-10%20-label%3Awontfix%20-milestone%3Abacklog%20).

## What's next?

The next milestone will be focussed on improvements in usability and performance for DMN.

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
