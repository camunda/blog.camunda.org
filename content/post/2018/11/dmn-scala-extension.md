+++
title = "DMN is more than a Decision Table"
description = ""
date = "2018-11-12T09:00:00+01:00"
author = "Philipp Ossler"
categories = ["Community"]
tags = ["DMN"]
+++

Decision tables are the most common element from DMN. They are easy to use and can solve many problems. However, DMN has more elements like Business Knowledge Models, Contexts, Literal Expressions, Function Definitions, Invocations and more.

In this post, I want to introduce the new [extension for DMN](https://github.com/camunda/dmn-scala) and show how it can be used to model an example decision with the full power of DMN.

<!--more-->

# The Extension

The DMN-Scala extension is a community project and has the goal to increase the DMN support for Camunda. It is based on the [FEEL extension](https://github.com/camunda/feel-scala) and the Camunda DMN Model API. It can be integrated into Camunda as a process engine plugin and replaces the Camunda DMN engine. 

# The Example

Assume that we are looking for a new contract for our mobile phone. We have a long list of different contracts and want to rank them based on our preferences. Our criteria are:

* the network quality
* the network speed
* the included data volume
* the monthly cost

We start by modeling the scoring of a contract by the criteria. This is a perfect use case for a decision table. We split the scoring into three decision tables for a better overview.

{{< figure src="network-quality.png">}}

{{< figure src="mobile-data-plan.png">}}

{{< figure src="cost.png">}}

So far, so good. Now we come to the interesting part of the model: how we can combine the results of these decision tables and apply them to the list of contracts. 

## Combine the Results

We use a so-called _context_ to combine the results. It is like a map with key-value-pair. The context has one entry for each result, one entry to calculate the total score and one entry for the contract name. 

{{< figure src="score.png">}}

The results of the decision tables are retrieved by using _invocations_. An invocation evaluates a _business knowledge model_ and returns the result. To make this work, we need to embed the decision tables into business knowledge models as their business logic. A business knowledge model is similar to a decision but it can be invoked by other decisions or business knowledge models.

The total score of the contract is calculated by using a _literal expression_. It aggregates the different results with the [FEEL built-in function](https://github.com/camunda/feel-scala/wiki/FEEL-Builtin-Functions) `sum()`. Each result is multiplied by a factor to represent that some criteria are more important than others.   

## Iterate over the Collection

In order to calculate the score for all contracts, we use a literal expression with the [FEEL list operator](https://github.com/camunda/feel-scala/wiki/FEEL-Language-Guide#list-expressions) `for`. It iterates over the contracts and invokes the score context as a function for each contract. This works when we use the same trick as we did with the decision tables and embed the context into a business knowledge model. 

The result of the iteration is a list of tuples which contains the contract name and the calculated scores. As the final step, the list is sorted by the total score using the FEEL built-in function `sort()`.

{{< figure src="ranking.png">}}

## The final DMN Model

In the end, we have a DMN model with one decision and four business knowledge models. The decision is the entry point of the model and uses the business knowledge models to compute the contract score. 

From a DRD perspective, it looks like this:

{{< figure src="drd.png">}}

When we evaluate the decision with a list of contracts (e.g. via _DecisionService_), then we get a result like this  

```javascript
[
 {name=contract-4, mobileDataPlan=6, cost=6, networkQuality=9,  totalScore=39}, 
 {name=contract-5, mobileDataPlan=6, cost=3, networkQuality=10, totalScore=34}, 
 {name=contract-1, mobileDataPlan=3, cost=9, networkQuality=6,  totalScore=33}, 
 {name=contract-2, mobileDataPlan=2, cost=9, networkQuality=9,  totalScore=33}, 
 {name=contract-3, mobileDataPlan=2, cost=9, networkQuality=6,  totalScore=30}
]
```

We did it! We modeled the contract ranking using only DMN. By using the extension, we have the full power of DMN and don't need to write additional business logic or use BPMN as a coordinator (i.e. Decision Flow).   

# How to use it?

**With the Camunda Tomcat distribution**

* download the JAR from the [Github site](https://github.com/camunda/dmn-scala/releases/tag/1.1.0) (_dmn-engine-camunda-plugin-1.1.0-full.jar_) 
* copy it to the _lib_ folder of the Tomcat server
* add the plugin to the process engine configuration (_conf/bpm-platform.xml_)

```xml
<process-engine>
    <plugins>
        <!-- ... -->    
        <plugin>
            <class>org.camunda.dmn.camunda.plugin.CamundaDmnEnginePlugin</class>
        </plugin>
    </plugins> 
</process-engine>
```

**With an embedded Camunda engine or Spring Boot**

* add the extension as dependency to your project POM 

```xml
<dependency>
  <groupId>org.camunda.bpm.extension.dmn.scala</groupId>
  <artifactId>dmn-engine-camunda-plugin</artifactId>
  <version>1.1.0</version>
</dependency>
```

* register the plugin `org.camunda.dmn.camunda.plugin.CamundaDmnEnginePlugin` in your process engine configuration

# Additional Information

More information about the extension can be found on the [Github site](https://github.com/camunda/dmn-scala). 

The full example is available at the [Github repository](https://github.com/saig0/camunda-engine-unittest/blob/dmn-scala/src/test/java/org/camunda/bpm/unittest/SimpleTestCase.java).
