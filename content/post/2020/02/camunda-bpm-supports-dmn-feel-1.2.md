+++
author = "Tassilo Weidner"
categories = ["Execution"]
tags = ["DMN", "FEEL", "Camunda BPM"]
date = "2020-02-28T09:00:00+01:00"
title = "Full Coverage of DMN FEEL 1.2 starting with Camunda BPM 7.13"

+++

We are happy to announce, that Camunda BPM 7.13 (scheduled for the end of May) comes with **full
coverage of FEEL 1.2** – for more DMN notation elements than before:

* Input Expressions `NEW!`
* Input Entries
* Output Entries `NEW!`
* Literal Expressions `NEW!`

We achieved these improvements by adding the former Community Extension [FEEL Scala Engine],
written by [Philipp Ossler], to the official Camunda Stack. 

<!--more-->

## Example

Let's have a look at the following example to get a better understanding of how **FEEL 1.2** integrates 
with Camunda BPM.

In this example, we want to calculate the maximum credit sum that we can grant to a customer based 
on the requested type of the credit and the credit score. 

When the credit score of a customer is…

* ... weaker than 80% of the average credit score\
=> no credit is granted

* ... between 80% and 100% of the average credit score\
=> the historical average credit sum is granted

* ... better than the average credit score\
=> 1.5 times of the historical average credit sum is granted

### DMN Table & FEEL 1.2 Expressions

Based on the business context explained above, I created a DMN Table which uses **FEEL 1.2 
Expressions** exclusively.

{{< figure caption="Decision Table \"Calculate Credit Sum\"" class="teaser" src="decision-table.png">}}

Let's have a closer look at the respective parts of the Decision Table.

**Hit Policy**

The hit-policy is set to **U (UNIQUE)**, so only one **Input Entry** must evaluate to `true`.

**Input Expression**

* The variable `credit_type` represents the credit type requested by the customer
* The variable `credit_history` represents the history of already granted credits from the past
* The **Input Expression** `credit_history[type = credit_type]` filters the variable `credit_history` 
for all credit types which equal the variable `credit_type`
* The evaluated result is a list of key-value pairs in the following structure:\

  ```javascript
  [ {"type": "personal-loan", "score": 505, "granted_sum": 1554.30}, ..., ... ]
  ```
* The result can be accessed in **Input Entries** with the help of the `?` character

**Input Entries**

* The `credit_score` variable represents the customer's credit score
* The built-in function `mean(...)` calculates the average credit score based on 
the result of the **Input Expression**
* The expression `mean(...)*.8` multiplies the average credit score with 80%
* The expression `x between y and z` compares whether the customer's credit score 
is between the minimum and the maximum average credit score

**Output Entries**

* The **Output Entry** is selected based on the **Input Entry** that evaluates to `true`
* When the credit score is…
  * `weak` => Zero is returned
  * `medium` => The average of the granted sums is returned
  * `good` => The average of the granted sums times 1.5 is returned

You can read more about the DMN Notation Elements mentioned above here:

* [Hit Policies]
* [Input Expression]
* [Input Entry]
* [Output Entry]

### Try it out!

To try out the example yourself, follow the step-by-step guide below.

**Step 0: Run Camunda BPM**

Make sure to download [Camunda BPM 7.13.0-alpha2][] (click on "Preview Release") and start the platform.

**Step 1: Deploy Decision Model**

Download the decision model [calc-credit-sum.dmn] and deploy it to Camunda BPM. You can 
deploy the model easily with the help of Camunda Modeler.

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

* [Spin-Based JSON & XML Variables Are Represented by Native FEEL Types](#my-link)
* [Register Custom Functions Programmatically](#my-link)

## Further Reading

* You can read more about DMN FEEL 1.2 in the [FEEL Scala Documentation]
* Please also see the [User Guide] to learn more about the Camunda BPM integration

## Please give us Feedback!

Do you like what we've built, or do you want to share some feedback with us?

You can ping us on Twitter [@Camunda] or reach us out on the [Forum].

[FEEL Scala Engine]: https://github.com/camunda/feel-scala
[Philipp Ossler]: https://github.com/saig0

[Hit Policies]: https://docs.camunda.org/manual/latest/reference/dmn11/decision-table/hit-policy/
[Input Expression]: https://docs.camunda.org/manual/7.12/reference/dmn11/decision-table/input/#input-expression
[Input Entry]: https://docs.camunda.org/manual/7.12/reference/dmn11/decision-table/rule/#input-entry-condition
[Output Entry]: https://docs.camunda.org/manual/7.12/reference/dmn11/decision-table/rule/#output-entry-conclusion

[calc-credit-sum.dmn]: https://raw.githubusercontent.com/tasso94/camunda-dmn-feel-1.2-example/master/src/main/resources/calc-credit-sum.dmn
[FEEL 1.2 Example on GitHub]: https://github.com/tasso94/camunda-dmn-feel-1.2-example

[Camunda BPM 7.13.0-alpha2]: https://camunda.com/download/
[FEEL Scala Documentation]: https://camunda.github.io/feel-scala/
[User Guide]: https://docs.camunda.org/manual/latest/user-guide/dmn-engine/feel/
[@Camunda]: https://twitter.com/camunda
[Forum]: https://forum.camunda.org/
