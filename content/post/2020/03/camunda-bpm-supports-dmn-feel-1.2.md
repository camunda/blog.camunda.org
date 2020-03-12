+++
author = "Tassilo Weidner"
categories = ["Execution"]
tags = ["DMN", "FEEL", "Camunda BPM"]
date = "2020-03-11T09:00:00+01:00"
title = "Full Coverage of DMN FEEL 1.2 starting with Camunda BPM 7.13"

+++

We are happy to announce, that Camunda BPM 7.13 (scheduled for the end of May) includes **full
coverage of FEEL 1.2** – for more DMN notation elements than before:

* Input Expressions `NEW!`
* Input Entries
* Output Entries `NEW!`
* Literal Expressions `NEW!`

We achieved these improvements by adding the former Community Extension [FEEL Scala Engine],
written by [Philipp Ossler], to the official Camunda Stack. 

<!--more-->

Let's have a look at the following example to get a better understanding of how **FEEL 1.2** integrates 
with Camunda BPM. 

We want to calculate the maximum credit sum that we can grant to a customer based on the requested 
credit type and the customer's credit score. 

When the customer's credit score is…

* ... weaker than 80% of the average credit score:\
  no credit is granted

* ... between 80% and 100% of the average credit score:\
  the average credit sum from the past is granted

* ... better than the average credit score:\
  1.5 times of the average credit sum from the past is granted

Based on the business context, I created a simple **Decision Requirements Diagram**.

{{< figure class="no-border teaser" src="drd.png">}}

First, let's have a closer look at the FEEL expressions used in the child decision "Calculate Credit History Key Figures".

{{< figure caption="Literal Expression \"Calculate Credit History Key Figures\"" class="teaser" src="literal-expression.png">}}

The variable `credit_type` represents the customer's credit type, and the variable 
`credit_history` the history of already granted credits from the past.

**Context**

The JSON-like structure is called [Context]. It consists of the properties `avg_score` and 
`avg_granted_sum` with expressions as values. The **Context** is assigned to the variable 
`key_figures` so it can be accessed in the root decision.

**Filter Expression**

The expression `credit_history[type = credit_type]` filters the variable `credit_history`
for all credit types which equal the variable `credit_type`. The evaluated result is a list 
of **Contexts** structured as follows:\

  ```javascript
  [ {"type": "personal-loan", "score": 505, "granted_sum": 1554.30}, ..., ... ]
  ```

Read more about the [Filter Expression].

**Path Expression**

With the help of `.score` and `.granted_sum`, the values of the Context can be accessed. 

Read more about the [Path Expression].

**Built-in Functions**

The function `mean(...)` calculates the average and is one out of many more [Built-in Functions]
you can use in your expressions.

Second, let's get to know the FEEL expressions used in the root decision "Calculate Max Grantable Credit Sum".

{{< figure caption="Decision Table \"Calculate Max Grantable Credit Sum\"" class="teaser" src="decision-table.png">}}

**Mathematical Operators**

FEEL allows using [Mathematical Operators]. You can find an example of multiplication in the first 
Input Entry: `key_figures.avg_score*.8`.

**Unary Test Comparison**

In the first and third Input Entries, the value of the Input Expression `credit_score` is implicitly 
compared with the subsequent expressions.

Read more about [Unary Test Comparison].

**Special Variable**

In the second Input Entry, no implicit comparison is performed. Instead, the Special Variable `?` is 
used in conjunction with the `x between y and z` keyword. The Special Variable represents the value of 
the Input Expression `credit_score`.

### Try it out!

To try out the example yourself, follow the step-by-step guide below.

**Step 0: Run Camunda BPM**

Make sure to download [Camunda BPM 7.13.0-alpha2][] (click on "Preview Release"), unpack it, and 
start the platform.

**Step 1: Deploy Decision Model**

Download the decision model [calc-credit-sum.dmn][] (right click & save link as...) and deploy it to 
Camunda BPM. You can deploy the model quickly with the help of [Camunda Modeler].

**Step 2: Evaluate Decision**

Evaluate the decision by performing the following REST API request:

`POST /decision-definition/key/calc-credit-sum/evaluate`
```javascript
{
   "variables":{
      "credit_history":{
         "value":" [{\"type\":\"personal-loan\", \"score\": 505, \"granted_sum\": 1554.30}, {\"type\":\"mortgage\", \"score\": 931, \"granted_sum\": 600900.43}, {\"type\":\"mortgage\", \"score\": 754, \"granted_sum\": 210000.00}, {\"type\":\"personal-loan\", \"score\": 437, \"granted_sum\": 1900.44}]",
         "type": "Json"
      },
      "credit_score":{
         "value": 800
      },
      "credit_type":{
         "value": "mortgage"
      }
   }
}
```

**Step 3: Review Decision History**

Go to Cockpit and open the decision instance view to see the result:

{{< figure caption="Camunda Cockpit \"Decision Instance View\"" class="no-border teaser" src="cockpit-decision-instance-view.png">}}

You can find the complete example prepackaged as a Spring Boot application here:\
[FEEL 1.2 Example on GitHub]

## More Enhancements

* [Native FEEL Types represent Spin-Based JSON & XML Variables][json-feel]
* [Register Custom Functions Programmatically][custom-functions-feel]

## Further Reading

* You can read more about DMN FEEL 1.2 in the [FEEL Scala Documentation]
* Please also see the [User Guide] to learn more about the Camunda BPM integration
* When you use a Camunda BPM version <= 7.12, learn how to migrate your FEEL expressions with the 
help of the [Migration Guide]

## Please give us Feedback!

Do you like what we've built, or do you want to share some feedback with us?

You can ping us on Twitter [@Camunda] or reach us out on the [Forum].

[FEEL Scala Engine]: https://github.com/camunda/feel-scala
[Philipp Ossler]: https://github.com/saig0
[documentation]: https://docs.camunda.org/manual/latest/reference/dmn11/   

[calc-credit-sum.dmn]: https://raw.githubusercontent.com/tasso94/camunda-dmn-feel-1.2-example/master/src/main/resources/calc-credit-sum.dmn
[FEEL 1.2 Example on GitHub]: https://github.com/tasso94/camunda-dmn-feel-1.2-example

[Camunda BPM 7.13.0-alpha2]: https://camunda.com/download/
[FEEL Scala Documentation]: https://camunda.github.io/feel-scala/
[User Guide]: https://docs.camunda.org/manual/latest/user-guide/dmn-engine/feel/
[Migration Guide]: https://docs.camunda.org/manual/latest/update/minor/712-to-713/#entirely-replaced-feel-engine
[@Camunda]: https://twitter.com/camunda
[Forum]: https://forum.camunda.org/

[Filter Expression]: https://camunda.github.io/feel-scala/feel-expression#filter-expression
[Path Expression]: https://camunda.github.io/feel-scala/feel-expression#path-expression
[Built-in Functions]: https://camunda.github.io/feel-scala/feel-built-in-functions
[Context]: https://camunda.github.io/feel-scala/feel-data-types#context
[Mathematical Operators]: https://camunda.github.io/feel-scala/feel-expression#addition
[Unary Test Comparison]: https://camunda.github.io/feel-scala/feel-unary-tests#comparison

[json-feel]: https://docs.camunda.org/manual/latest/user-guide/dmn-engine/feel/spin-integration/
[custom-functions-feel]: https://docs.camunda.org/manual/latest/user-guide/dmn-engine/feel/custom-functions/

[Camunda Modeler]: https://camunda.com/download/modeler/