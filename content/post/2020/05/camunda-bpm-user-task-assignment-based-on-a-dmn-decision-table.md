+++
author = "Robert Emsbach"
categories = ["Community"]
date = "2020-05-22T09:00:00+01:00"
tags = ["BPM","DMN","FEEL"]
title = "Camunda BPM: User Task Assignment based on a DMN Decision Table"
+++

In business processes involving human workflow the task assignment logic can become quite elaborate. For instance the processing of insurance claims, or other variants of approval processes, may require many or complex task assignment rules. The [Decision Model and Notation](https://www.omg.org/dmn/) (DMN) decision tables are an excellent tool to manage such rules — outside of code, in a business user-friendly way.
<!--more-->
Camunda Release 7.13.0 will ship in Early June with the [FEEL Scala Engine](https://docs.camunda.org/manual/latest/reference/dmn11/feel/),
which already supports the [DMN standard version 1.3](https://www.omg.org/spec/DMN/About-DMN/), released in March 2020. [Friendly Enough Expression Language (FEEL)](https://camunda.github.io/feel-scala/) expressions now allow us a more elegant mapping between decision table results and task assignment parameters.

__Example Process__

This example uses a trivial [BPMN Process](https://github.com/camunda-consulting/code/blob/master/snippets/task-assignment-dmn/src/main/resources/Approval.bpmn) consisting of a business rule task, implemented by a DMN file, and a user task, which gets assigned based on the output variables of the rules task. The data object reference shown in the diagram is only for documentation purposes. It has no technical implications and can be removed.

{{< figure class="no-border teaser" src="Process-with-Business-Rule-Task-and-User-Task.png" alt="Process with Business Rule Task and User Task" caption="Process with Business Rule Task and User Task" >}}

__User Task__

A [Camunda User Task](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/user-task/#user-assignment) has three parameters relevant to task assignment:
- assignee (a specific user who must perform the task)
- candidate users (a list of specific users who can perform a task)
- candidate groups (a list of user groups who can perform the task)

In this example these parameters get bound to a process variable using ${variable_name}. This allows us to let the task assignment depend on the output of previous elements (here the business rule task).

{{< figure class="no-border teaser" src="Assignee-Candidate-Users-Candidate-groups.png" alt="User Task Details: Assignee, Candidate Users, Candidate groups" caption="User Task Details: Assignee, Candidate Users, Candidate groups" >}}

__Decision Table__

The example [DMN file](https://github.com/camunda-consulting/code/blob/master/snippets/task-assignment-dmn/src/main/resources/taskAssignment.dmn) uses three product attributes as input to determine the task assignment. The [Hit Policy](https://docs.camunda.org/manual/latest/reference/dmn11/decision-table/hit-policy/#collect-hit-policy) is set to Collect because the intention is to evaluate all rules and create lists of all possible task assignments. (The task assignment logic will later automatically assign the task to an individual user in case a specific assignee is set by a rule.)

{{< figure class="no-border teaser" src="Example-DMN-Table-for-Task-Assignment.png" alt="Example DMN Table for Task Assignment" caption="Example DMN Table for Task Assignments" >}}

__Business Rule Task__

Due to the hit policy (C) the result will be a list of rules (rows) which fire for a given instance. As the decision table produces several outputs (columns) each item in the result list will contain a collection of up to three values (assignee, candidateUsers, candidateGroups). In the properties tab of the business rule task, the decision result needs to be set to reflect this expected data structure (a List of collections), as shown below. The result variable name, here dmnResult, can be chosen freely. The variable name is subsequently used in the mapping expressions.

{{< figure class="no-border teaser" src="Setting-Business-Rule-Task-Properties-to-store-the-Result.png" alt="Setting Business Rule Task Properties to store the Result" caption="Setting Business Rule Task Properties to store the Result" >}}


The final step is to map the output of the business rule task to the three variables used for the task assignment. This can be done on the “Input/Output” properties tab of the business rule task using feel scripts.

To determine the list of candidate users / candidate user groups we:
<ul>
<li>go through list of results (rows), picking the “candidateUsers” / “candidateGroups” value from each row</li>
<li>filter empty entries from the resulting list</li>
<ul>
<li>(for r in dmnResult return get value(r, “candidateUsers”))[item != null]</li>
<li>(for r in dmnResult return get value(r, “candidateGroups”))[item != null]</li>
</ul>
</ul>
To determine the assignee we:
<ul>
<li>go through list of results (rows), picking the “assignee” value from each row</li>
<li>filter empty values from the resulting list</li>
<li>pick the first assignee in the list (assignee can only be one value, not a list)</li>
<ul>
<li>((for r in dmnResult return get value(r, “assignee”))[item != null])[1]</li>
</ul>
</ul>

{{< figure class="no-border teaser" src="Mapping-of-DMN-result-to-process-variables-on-the-Business-Rule-Task.png" alt="Mapping of DMN result to process variables on the Business Rule Task" caption="Mapping of DMN result to process variables on the Business Rule Task" >}}

__Value Mapper Configuration__

{{< figure class="no-border teaser" src="CustomValueMapper-registration-in-META-INF-services.png" alt="CustomValueMapper registration in META-INF\services" caption="CustomValueMapper registration in META-INF\services" >}}


For this approach to work, as of version 7.13.0-alpha4, Camunda still requires the registration of a customer value mapper. The mapper is registered by placing a text file called [org.camunda.feel.valuemapper.CustomValueMapper](https://github.com/camunda-consulting/code/blob/master/snippets/task-assignment-dmn/src/main/resources/META-INF/services/org.camunda.feel.valuemapper.CustomValueMapper)
with the content: _org.camunda.feel.impl.JavaValueMapper_
into the folder: _META_INF/services_.
This step will likely no longer be required in newer versions.

__Unit and manual Tests__

The project can be Unit tested as shown in [AssignmentTest.java](https://github.com/camunda-consulting/code/blob/master/snippets/task-assignment-dmn/src/test/java/org/camunda/demo/AssignmentTest.java) in a few tests for different task assignments. You can run it in your IDE or using mvn clean test.

To step through the process manually, you can start the server using your IDE or mvn spring-boot:run. After the server has started you can access the Camunda tasklist via [http://localhost:8080/app/tasklist/default](http://localhost:8080/app/tasklist/default). Use the credentials demo / demo to login.

The complete example project is available on Github:
[camunda-consulting/code](https://github.com/camunda-consulting/code/tree/master/snippets/task-assignment-dmn)

Credits and many thanks to [Philipp Ossler](https://github.com/saig0) for developing the [Feel engine](https://camunda.github.io/feel-scala/) and teaching me about the available FEEL expressions.

Want to learn more? Check out [this blog for a better](https://blog.camunda.com/post/2020/03/camunda-bpm-supports-dmn-feel-1.2/) understanding of how FEEL 1.2 integrates with Camunda BPM and test it out with a [complete example](https://github.com/tasso94/camunda-dmn-feel-1.2-example) prepackaged as a Spring Boot application.
