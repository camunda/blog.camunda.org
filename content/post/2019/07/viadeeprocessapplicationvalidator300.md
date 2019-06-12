+++
author = "Sascha Di Bernardo"
categories = ["Community"]
tags = ["BPMN", "BPMN Validation", "Model-Code Inconsistencies", "viadee"]
title = "How to Find NullPointerExceptions for Process Variables During Build Time"
date = "2019-07-04T12:00:00+01:00"
+++


The viadee Process Application Validator (vPAV) was released well over a year ago on [GitHub](https://github.com/viadee/vPAV) in order to check the interplay of models and code as part of a CI build.

Since then vPAV has gained traction and more features were developed. It also provides extensibility to create your own set of checkers.

The major release version 3.0.0 comes with many new features, such as a revamped HTML report, inheritance of rules, multiple instantiations of checkers with varying configurations, remote location of process models, multi-language support and most of all a reworked ProcessVariableModelChecker [(see release notes)](https://github.com/viadee/vPAV/blob/master/docs/ReleaseNotes.md).

# Process Variable Flow Validation
For the better part of the last two months, the ProcessVariableModelChecker has been reworked to finally lift the experimental status and release a stable, integrated static analysis regarding access to process variables. By converting the process model into a graph and embedding the respective call graph of the delegated beans, methods of static code analysis can be applied to discover data-flow anomalies across process model and source code: i.e. "Is there a path in the model where a delegate bean relies on a process variable that may be unknown?"

The following model showcases how the ProcessVariableModelChecker works.

{{< figure src="process-model.png" alt="Process Model" title="Example Process Model" width="70%">}}

## Initial Injection of Process Variables
In this scenario we can start a process instance by using the Camunda API and pass a map of variables.

```java
final Map<String, Object> processVariables = Variables.createVariables()
                .putValue("test1", false)
                .putValue("test2", false);

ProcessInstance instance = runtimeService.startProcessInstanceByMessage("initMessage", processVariables);
```

This means that these variables can be accessed globally.
{{< figure src="startevent-message.png" alt="Message to start process" title="Message to start process" width="40%">}}

At build-time, however, we can already interpret the resulting class files using the [Soot](https://github.com/Sable/soot) tooling. Working backwards, we can first find the entry points of process variables into the process scope and then track their origin to find out that they are known unconditionally. In this case vPAV may still issue a warning if you are not using one of your variables later on.

## Delegated Code
The most common approach to call custom code is a Delegate Expression which refers to a bean that in turn knows the location of the corresponding class with the executable code. Access to variables therein will be found and included in the vPAV-data-flow analysis.

{{< figure src="servicetask-delegate.png" alt="Delegate Expression for ServiceTask" title="Delegate Expression for ServiceTask" width="40%">}}
{{< figure src="usertask-delegate.png" alt="Delegate Expression for UserTask" title="Delegate Expression for UserTask" width="40%">}}

```java
public void execute(DelegateExecution execution) {
    Integer val1 = (Integer) execution.getVariable("test");
    execution.setVariable("val2", val1 + 10);
    String val2 = (String) execution.getVariable("test3");
}
```

This code snippet accesses ```test3```, even if ```test3``` was not provided to the process instance, thus returning null. The access to ```test``` seems to be suspicious, but due to the Input Mapping, this variable has been passed through the model. With growing complexity of both the process model and the underlying code base, such data-flows become increasingly confusing and hard to track (and hard to cover all paths with test cases). vPAV discovers such data-flows through a static code analysis in order to detect data-flow anomalies early on.

## Mappings
Using the Input/Output Mapping is an additional way of injecting process variables into the process. In this scenario, the Input Mapping is used to initialize the variable "test" and to pass it to the Service Task. Regarding the data-flow analysis, it is crucial to know the scopes of process variables, as a locally defined variable cannot be accessed outside of the defining element.

{{< figure src="servicetask-input.png" alt="Input Mapping for ServiceTask" title="Input Mapping for ServiceTask" width="40%">}}

## Output
Once the analysis has been conducted, an HTML report provides a graphical result to highlight all data-flows and anomalies discovered.

{{< figure src="output.png" alt="HTML output" title="Result">}}

In the second view, each element has an indicator attached in their lower right corner showing the variable operations found (Read, Write, Delete). The table below the process model gives a general overview on which variable has been accessed by which element.

{{< figure src="pv-access.png" alt="Access to process variables" title="Overview of access of process variables">}}

## Future Work
The current state of the ProcessVariableModelChecker covers the most common ways to access process variables, but we aim to steadily increase the accuracy by incorporating further possibilities of variable access. Asynchronous tasks as well as external tasks are currently the most challenging part and we're still working on finding suitable solutions.

# Feedback and Contributing
The viadee Process Application Validator has been developed as open source software with a BSD license by employees of the [viadee Unternehmensberatung AG](https://www.viadee.de/), a German IT consulting company located in Cologne and Münster in cooperation with the WWU in Münster.

The improved ProcessVariableModelChecker was developed by Sascha Di Bernardo as integral part of his master's thesis. Feedback regarding data flow anomaly detection and related topics is highly appreciated.

If you want to extend our software, check out our [Git](https://github.com/viadee/vPAV) repository and feel free to contribute your own ideas. For further
questions, remarks or feedback do not hesitate to contact us:

[Benedikt Uckat](mailto:Benedikt.Uckat@viadee.de)

[Claus-Alexander Usener](mailto:Claus-Alexander.Usener@viadee.de)

[Sascha Di Bernardo](mailto:Sascha.Dibernardo@viadee.de)
