+++
author = "Philipp Fromme"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Tooling", "Release Note", "Camunda Modeler"]
date = "2017-10-27T20:00:00+01:00"
title = "Camunda Modeler 1.11.0 Released"
+++

We are happy to announce the release of Camunda Modeler version 1.11.0.

Thanks to a [contribution](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/229) by the community it ships with templating support for connectors.

<!--more-->

## Templating support for connectors

{{< figure class="teaser no-border" src="connector-templating.gif" alt="Connector Templating Support" caption="Connector Template applied to a Task" >}}

Last year we introduced [Element Templates](https://github.com/camunda/camunda-modeler/tree/master/docs/element-templates) that allow you to create pre-defined configurations for BPMN elements. With the latest version of the Camunda Modeler you can also create element templates for [Camunda Connectors](https://docs.camunda.org/manual/7.7/user-guide/process-engine/connectors/).

Let's look at an example of a template that can be applied to a BPMN 2.0 task element:

```javascript
{
  "name": "ConnectorGetTask",
  "id": "my.connector.http.get.Task",
  "appliesTo": [
    "bpmn:Task"
  ],
  "properties": [],
  "scopes": {
    "camunda:Connector": {
      "properties": [
        {
          "label": "ConnectorId",
          "type": "String",
          "value": "My Connector HTTP - GET",
          "binding": {
            "type": "property",
            "name": "connectorId"
          }
        },
        ...
      ]
    }
  }
}
```

Once you apply this template to a task a connector will be created and added to it. The connector's properties can templated like any other property.

Feel free to check out the [documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/element-templates#scoped-bindings) of how to use connector templates.

## What's next?

Do you miss anything or spot a bug? Or do you have feedback on this release? Reach out to us via [our forums](https://forum.camunda.org/c/modeler) or tweet us [@CamundaBPM](https://twitter.com/CamundaBPM).
