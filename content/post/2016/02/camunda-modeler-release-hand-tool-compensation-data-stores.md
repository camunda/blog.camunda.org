+++
author = "Ricardo Matias"
categories = ["Modeling"]
date = "2016-02-01T15:00:57+01:00"
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
title = "Camunda Modeler v0.4.0 released"

+++

Today we're releasing a new version of the [Camunda Modeler](https://github.com/camunda/camunda-modeler), with it we've added Data Stores, Compensation, Job priorities and retry time cycle configuration, a Hand tool for BPMN and dragging columns and rows in DMN.


[Download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/).
<!--more-->

## New Features

For the past weeks we have been working hard on closing down our coverage of the BPMN standard, so we are proud to announce that it is now possible to model **Data Stores** and **Compensation** (boundary events and activities).

### Data Stores
{{< figure class="teaser no-border" src="data-stores.gif" alt="Data Stores screencast" caption="Model all the Data Stores!" >}}

### Compensation
{{< figure class="teaser no-border" src="compensation.gif" alt="Compensation screencast" caption="Time to compensate!" >}}

We also continued to work on giving more control over property configuration, therefore it's now possible to configure **job priorities** and **job retry time cycle** through our properties panel.

### Job Priorities and Retry Time Cycle
{{< figure class="teaser no-border" src="job-config.png" alt="Job priorities and retry time cycle screenshot" caption="Set those priorities straight!" >}}

## Usability Improvements

We've also added new interaction features to BPMN and DMN. Now when you're modeling a big, complex BPMN diagram you no longer have to zoom out and grab the canvas to move around it, you can just use the new **Hand tool**.

{{< figure class="teaser no-border" src="hand-tool.gif" alt="Hand tool screencast" caption="Grabbing the canvas has never been so easy!" >}}

We also didn't forget about improving DMN, so we've added the possibility to reorganize columns and rows via drag and drop.

{{< figure class="teaser no-border" src="drag-columns-rows.gif" alt="Drag Columns & Rows screencast" caption="Get these rows/columns moving!" >}}

You can check the blog posts of our toolkits [bpmn-js](https://bpmn.io/blog/posts/2016-hand-tool-data-stores-compensation-bpmn-js.html), [properties-panel-js](http://bpmn.io/blog/posts/2016-properties-panel-050.html) and [dmn-js](http://bpmn.io/blog/posts/2016-dmn-js-040.html) to learn more about what else was implemented and the bugs that were fixed.

## What's next

On the next release you can expect the addition of a **XML Tab** which allows XML live editing, exporting diagrams as SVG or PNG and more control over bpmn properties configuration.
