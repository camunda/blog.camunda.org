+++
author = "Nico Rehwaldt"
categories = ["Modeling"]
tags = ["BPMN 2.0", "Element Templates"]
date = "2016-05-24T13:58:00+02:00"
title = "Element Templates in the Camunda Modeler"

+++

Element templates for BPMN diagrams is one of the exciting features shipped with the latest release of our [Camunda Modeler](/post/2016/05/camunda-modeler-1.0-released/).
They allow developers to extend the modeler with custom controls for certain BPMN elements.

A template, once selected for a diagram element, provides custom fields with domain specific validation of user input.

<!--more-->

{{< figure class="main teaser headline no-border" src="element-templates.png" alt="Camunda Modeler Element Templates Screenshot" caption="Element Templates are here" >}}

<style>
  @media(min-width: 900px) {
    figure.main.teaser.headline {
      margin-left: -80px !important;
      margin-right: -80px !important;
    }
  }
</style>


## Element Templates in a Nutshell

In essence, element templates define custom inputs, custom validation and a technical mapping for the entered data into the Camunda world.

Once selected from the properties panel they are offered to the user as _Custom Fields_.
Custom fields can be dropdowns, check boxes, input and text areas.
On input, the modeler applies domain specific validation and maps the input data to BPMN 2.0 XML and the world of the process engine.


## Element Templates in Code

Element templates are read from [JSON files](http://json.org/) situated in `resources/element-templates` relative to the modelers installation directory.

The example `MailTask` shown in the screenshot above may be defined like that:

```json
[
  {
    "name": "Mail Task",
    "id": "com.camunda.example.MailTask",
    "appliesTo": [
      "bpmn:ServiceTask"
    ],
    "properties": [
      {
        "label": "Implementation Type",
        "type": "String",
        "value": "com.mycompany.MailTaskImpl",
        "editable": false,
        "binding": {
          "type": "property",
          "name": "camunda:javaDelegate"
        }
      },
      ...
      {
        "label": "Template",
        "description": "You can use freemarker templates ${...} here",
        "value": "Hello ${firstName}!",
        "type": "Text",
        "binding": {
          "type": "camunda:inputParameter",
          "name": "messageBody",
          "scriptFormat": "freemarker"
        },
        "constraints": {
          "notEmpty": true
        }
      },
      {
        "label": "Result Status",
        "description": "Process variable to assign the send result to",
        "type": "String",
        "value": "mailSendResult",
        "binding": {
          "type": "camunda:outputParameter",
          "source": "${ resultStatus }"
        }
      },
      {
        "label": "Send Async?",
        "type": "Boolean",
        "value": true,
        "binding": {
          "type": "property",
          "name": "camunda:asyncBefore"
        }
      }
    ]
  }
]
```

The actual details on the template definition go beyond a simple blog post.
Consider checking out our in-depth [element templates documentation](https://docs.camunda.org/manual/latest/modeler/camunda-modeler/element-templates/) or any of the other resources listed below.


## More on Element Templates

Would you like to try out element templates?
These resources help you to learn more:

* [Overview](http://docs.camunda.org/manual/develop/modeler/camunda-modeler/element-templates/)
* [Element Template Documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/element-templates)
* [Sample Template Definitions](https://github.com/camunda/camunda-modeler/blob/master/resources/element-templates/samples.json)


## Feedback Wanted

Element templates add powerful options to extend the Camunda Modeler with pre-defined user, service tasks as well as other BPMN elements.

Do you find these extensions useful?
Is there anything you are missing?
We are happy to hear your feedback in the [Camunda Modeler forum](https://forum.camunda.org/c/modeler).
