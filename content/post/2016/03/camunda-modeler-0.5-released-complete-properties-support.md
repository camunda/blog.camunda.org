+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-03-08T15:00:00+01:00"
title = "Camunda Modeler v0.5.0 released"
+++


Today we're releasing a new version of the [Camunda Modeler](https://github.com/camunda/camunda-modeler). It brings full support for editing Camunda properties via the properties panel and fixes numerous bugs.


[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).
<!--more-->


## New Features

With this version of the modeler you are able to maintain all Camunda properties via the properties panel. Some highlights are support for form data, input/output mappings and connectors.


### Configure Form Data

Configure form fields to be used with [generated task forms](https://docs.camunda.org/manual/7.4/user-guide/task-forms/#generated-task-forms). This includes validation and constraints.

{{< figure class="teaser no-border" src="form-fields.png" alt="Configure generated task form fields" caption="The Forms tab." >}}


### Edit Input/Output Mappings

Create and modify [input/output mappings](https://docs.camunda.org/manual/7.4/user-guide/process-engine/variables/#input-output-variable-mapping) for service tasks, call activities and connectors.

{{< figure class="teaser no-border" src="input-output.png" alt="Modify input/output mappings for service tasks, call activities and connectors" caption="The Input/Output tab." >}}


### Maintain Connector details

Assign [a connector](https://docs.camunda.org/manual/7.4/user-guide/process-engine/connectors) as the implementation type to service task like elements. A special connector tab will allow you to specify its id and input/output mappings.

{{< figure class="teaser no-border" src="connector.gif" alt="Edit connectors" caption="Validation built in." >}}


## Usability Improvements

Along with these features we improved the overall look and feel of the properties panel. With this release we ship better tabbing, validation as well as undo/redo improvements and straight forward name editing for all diagram elements.


### Scrollable Property Tabs

Tabs in the properties panel can now be scrolled with the mouse wheel.
When overflowing a simple scroll indicator allows you to change between tabs, too.

{{< figure class="teaser no-border" src="tabs.gif" alt="Improved tabbing" caption="Tab navigation improved." >}}

Properties panel resizing did not make it into this Camunda Modeler release. We are going to ship ith with the [next release](https://github.com/camunda/camunda-modeler/milestones/003%20-%20Advanced%20Modeling%20(XML,%20Image,%20Custom%20Tasks\)), promised!


### Better Name Editing

With the new version of the modeler you can edit every elements name directly in the properties panel. This means less context switching when working on technical details.

{{< figure class="teaser no-border" src="names.gif" alt="Edit name directly in properties panel" caption="Simple name editing." >}}


### Validation and Undo/Redo Improvements

The properties panel should feel more natural when using undo/redo. In addition we added and reworked the validation in the panel.

Read about all properties panel related improvements [on the bpmn.io blog](https://bpmn.io/blog/posts/2016-camunda-properties-complete-properties-panel.html) and [tell us](https://github.com/camunda/camunda-modeler/issues) if you spotted something unexpected.


## What's next

We got the [next modeler release](https://github.com/camunda/camunda-modeler/milestones/003%20-%20Advanced%20Modeling%20(XML,%20Image,%20Custom%20Tasks\)) already in the pipeline. There we are focusing on more general improvements such as image export, XML editing and properties resizing. Stay tuned for more!