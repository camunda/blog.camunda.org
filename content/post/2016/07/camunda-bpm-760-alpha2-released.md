+++
author = "Philipp Ossler"
categories = ["Execution"]
date = "2016-07-06T12:00:00+01:00"
tags = ["Release Note"]
title = "Camunda BPM 7.6.0-alpha2 Released"

+++

Camunda 7.6.0-alpha2 is here and it is packed with new features. The highlights are:

* Support for Decision Requirements Graphs
* New Task Dashboard in Cockpit
* Mapping Input/Output Parameters of a Call Activity using Java Code
* [38 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.6.0-alpha2)

The [complete release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14605) are available in Jira.

You can [Download Camunda For Free](https://camunda.org/download/)
or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

<!--more-->

# Support for Decision Requirements Graphs

In the current release, we add support for Decision Requirements Graphs (aka DRG) to model dependencies between decision tables. 

Assuming you have a decision table to decide which dish should be served to our guests for dinner. The dish depends on the season and the amount of guests. Using a DRG, you can model that both inputs are the results of two required decision tables which resolve the season and the amount of guests. The following image shows the decision tables. 

{{< figure class="teaser" src="drg-example.png" alt="DRG Example" >}}

All decision tables are inside one DMN resource. The decision table (i.e., the decision which contains the table) references the required decision tables by the `requiredDecision` elements in the XML.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions id="dish" name="Desired Dish" 
  namespace="http://camunda.org/schema/1.0/dmn"
  xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" >
  
  <decision id="dish-decision" name="Dish Decision">
    <informationRequirement>
      <requiredDecision href="#season" />
    </informationRequirement>
    <informationRequirement>
      <requiredDecision href="#guestCount" />
    </informationRequirement>
    <decisionTable id="dishDecisionTable">
      <!-- ... -->
    </decisionTable>
  </decision>
  
  <decision id="season" name="Season decision">
    <decisionTable id="seasonDecisionTable">
      <!-- ... -->
    </decisionTable>
  </decision>
  
  <decision id="guestCount" name="Guest Count">
    <decisionTable id="guestCountDecisionTable">
      <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```  

A DRG can be deployed, parsed and evaluated in the same way as a DMN resource with a single decision table. When the DMN engine evaluates a decision which has required decisions, then it first evaluates the required decision and then maps the output values to the input expressions of the decision table. 

You can evaluate the Dish Decision using the following Code:

```java
DmnDecision decision = dmnEngine.parseDecision("dish-decision", inputStream);

VariableMap variables = Variables
  .putValue("temperature", 8)
  .putValue("dayType", "Weekday");

DmnDecisionTableResult result = dmnEngine.evaluateDecisionTable(decision, variables);
String dish = result.getSingleResult().getSingleEntry();
```

You can find more information about DRGs in the [reference guide](https://docs.camunda.org/manual/latest/reference/dmn11/drg/) and an example on [GitHub](https://github.com/camunda/camunda-bpm-examples/tree/master/dmn-engine/dmn-engine-drg).

Note that you can't model DRGs in the Camunda Modeler, yet. We will add support in future releases.

# New Tasks Dashboard in Cockpit

We added a new dashboard to Cockpit which shows the amount of open tasks grouped by type and group name.

{{< figure class="teaser" src="cockpit-tasks-dashboard.png" alt="Tasks Dashboard" >}}

# Mapping Input/Output Parameters of a Call Activity using Java Code

When you use a call activity in a process then you may want to pass variables to or from the calling process. Instead of specifying the mapping in the XML, you can now map the variables using Java code. The class must implement the `DelegateVariableMapping` interface and is referenced by name in the Camunda extension property `variableMappingClass` of the call activity. 

```xml
<callActivity id="callSubProcess" calledElement="subProcess" 
  camunda:variableMappingClass="org.camunda.bpm.example.DelegatedVarMapping"/>
```

You can also reference the delegate via expression, using the Camunda extension property `variableMappingDelegateExpression`. See the [user guide](https://docs.camunda.org/manual/latest/reference/bpmn20/subprocesses/call-activity/#delegation-of-variable-mapping) for additional information.

# Feedback Welcome

Please try out the awesome new features of this release and provide feedback by commenting on this post or reaching out to us in the [forum](https://forum.camunda.org/).

