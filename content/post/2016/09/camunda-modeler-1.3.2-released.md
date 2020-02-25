+++
author = "Patrick Dehn"
categories = ["Modeling"]
tags = ["BPMN 2.0", "CMMN", "Tooling", "Release Note", "Camunda Modeler"]
date = "2016-09-28T13:00:00+01:00"
title = "Camunda Modeler 1.3.2 released"

+++

We are happy to announce version 1.3.2 of the Camunda Modeler!

Please [download](https://camunda.org/bpmn/tool/) the new version from [camunda.org](https://camunda.org/bpmn/tool/). We fixed some bugs with the patch releases 1.3.1 and 1.3.2.

<!--more-->

__DMN__

Plenty of bugs have been fixed and some improvements have been added. Check the full [list of changes](https://github.com/bpmn-io/dmn-js/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aclosed%20closed%3A2016-09-14..2016-09-26%20-label%3Aquestion%20).

__BPMN__

We fixed a bug in the boundary event replace handling. If you i.e. morph a boundary event to an error event, everything works as expected again. [See details](https://github.com/camunda/camunda-modeler/issues/415).

__CMMN__

We fixed a bug where existing variableOnPart extension elements are deleted. They are retained now and no warning is shown on import anymore.
[See details](https://forum.camunda.org/t/cmmn-variableonpart-extensionelement-gets-deleted-by-modeller/1533).


## Give us Feedback

We would love to hear your feedback. You can reach us at the [Camunda forum](https://forum.camunda.org/c/modeler).
