---
title: "Why we Re-Implemented BPMN Multi-Instance Support in 7.3"
date: "2015-06-11"
author: "Thorben Lindhauer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2015/06/why-we-re-implemented-bpmn-multi.html"

---

<div>
<div class="markdown-body">
Have you ever experienced bugs with multi-instance activities? You may choose from any of these: <a href="https://jira.camunda.com/browse/CAM-986">CAM-986</a>, <a href="https://jira.camunda.com/browse/CAM-1731">CAM-1731</a>, <a href="https://jira.camunda.com/browse/CAM-2075">CAM-2075</a>, <a href="https://jira.camunda.com/browse/CAM-2338">CAM-2338</a>, <a href="https://jira.camunda.com/browse/CAM-2787">CAM-2787</a>, <a href="https://jira.camunda.com/browse/CAM-2897">CAM-2897</a>, <a href="https://jira.camunda.com/browse/CAM-3851">CAM-3851</a>, <a href="https://jira.camunda.com/browse/CAM-3925">CAM-3925</a>.<br />
From the engine's early beginnings, its multi-instance implementation was more of a quick hack than a durable solution. Yet, it was carried from release to release, the pile of bugs and hair lost by desperate developers growing steadily. With <a href="http://blog.camunda.org/2015/05/camunda-bpm-730-final-released.html">Camunda BPM 7.3</a>, we have <a href="https://github.com/camunda/camunda-bpm-platform/commit/8a33d5037dd11181430cea8d9f775a65e5322ce1#diff-87938bc1730f8f4d5356659ed486eb7d">refactored multi-instance</a> fundamentally, drying one of the largest bug sources and fighting developer bald-headedness.<br />
This post provides insight into the engine's execution model, two alternatives of treating multi-instance in that model, and why we believe our recent changes have dramatically improved the situation.<br />
<br />
<a name='more'></a><br />
<h2 id="onprocessexecution">
On Process Execution</h2>
In order to understand the implementation of multi-instance, we have to make a quick excursion into how the process engine executes a process model. Let us consider the following process (without multi instance):<br />
<br />
{{< figure src="http://3.bp.blogspot.com/-2sEhRWNY40M/VXmDPuuDtOI/AAAAAAAAAB8/9HyathYAFII/s1600/diagram-scaled.png" >}}
<br />
In order to execute an instance of this process, the process engine needs two things:<br />
<ul>
<li><i>Activity Model</i>: A representation of the process model that allows to reason about the causality of activities and other execution-relevant aspects</li>
<li><i>Execution State Model</i>: A representation of process instance state, like <i>tokens</i></li>
</ul>
For the first problem, the process engine parses the BPMN 2.0 XML and creates a <code>ProcessDefinition</code> that contains representations of all the activities in the process model. This is not a loose collection of activities. Instead it maintains the necessary relations between activities required for process execution. These relations are either represented as sequence flow (internally called <i>transitions</i>) in case of direct causality or a parent-child relationship in case that an activity is contained within another. The example process is represented as follows:<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-8lGAEpDxcFs/VXcJWmRJozI/AAAAAAAAABI/Tum7NrBXKbk/s1600/activityModel1.png" >}}
<br />
Activities are represented as blue boxes and may be related by a <i>happens before</i> or a parent-child relationship. These relations do not suffice to represent all aspects relevant to execution, which is why activities have further properties. The most important property is the <i>activity behavior</i> (yellow boxes) that implements what the activity means in the BPMN diagram, such as creating a task in a user's task list.<br />
For the execution state model, i.e. to represent which activities are currently active, the process engine has a concept called <i>executions</i>. An execution can be understood as something in between an activity instance (meaning that for every active activity, there is always at least one execution) and a token (meaning that executions can move from one activity to the next).<br />
These two concepts allow to define a simplified model of process execution:<br />
<ul>
<li>When a process instance is started, the process engine creates an initial execution on the start event of the process model</li>
<li>An execution can be used to execute an activity and temporarily represent the corresponding activity instance</li>
<li>When an activity instance has ended, the process engine evaluates the activity's outgoing sequence flow and executes the next activity (potentially re-using the current execution; token-like behavior)</li>
<li>When a scope is executed, new executions are created that execute activities contained within that scope (the current execution cannot be re-used; activity-instance-like behavior)</li>
</ul>
These tasks are implemented in the very core of the Camunda engine, also referred to as the <i>Process Virtual Machine</i> (PVM). Note that the second task of the above list is much more complex than it looks at first sight. In detail, the follow steps need to be performed:<br />
Before executing the actual behavior (called <i>preparation phase</i> in the following):<br />
<ul>
<li>Initialize the activity instance</li>
<li>Create a job for <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations">asynchronous continuation</a> (<i>asyncBefore</i>)</li>
<li>Invoke <a href="http://docs.camunda.org/latest/guides/user-guide/#bpmn-model-api-delegation-code-execution-listener">execution listeners</a> for the activity instance's <i>start</i> event</li>
<li>Execute the activity's <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-variables-inputoutput-variable-mapping">input variable mappings</a></li>
<li>If this activity defines <a href="http://docs.camunda.org/latest/api-references/bpmn20/#overview-bpmn-20-overview-and-coverage-events">events</a> (e.g. a boundary event), create the necessary event subscriptions and jobs</li>
<li>Create a <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-history-and-audit-event-log">history event</a> for the new activity instance</li>
</ul>
Executing the actual behavior (called <i>execution phase</i>):<br />
<ul>
<li>Invoke the activity's implementation of <code>org.camunda.bpm.engine.impl.pvm.delegate.ActivityBehavior</code></li>
</ul>
After executing the actual behavior (called <i>finalization phase</i>):<br />
<ul>
<li>Invoke execution listeners for the activity instance's <i>end</i> event</li>
<li>Execute the activity's output variable mappings</li>
<li>Delete event subscriptions and jobs created before executing the behavior</li>
<li>Create a history update event for the finished activity instance</li>
<li>Create a job for asynchronous continuation (<i>asyncAfter</i>)</li>
<li>Tear down the activity instance</li>
</ul>
All of these concerns are <i>cross-cutting</i>. Regardless the type and behavior of an activity, they need to be executed for every single activity instance. The PVM implements these concerns in a mostly solid and clean way. Speaking in terms of the activity model diagram above, the PVM is designed to execute these aspects when the blue boxes are instantiated.<br />
With multi-instance the game becomes a little more complicated.<br />
<h2 id="multiinstanceinthepvmmodel">
Multi-Instance in the PVM Model</h2>
There are different understandings on how multi-instance fits into the PVM's execution model. From 7.2 to 7.3, we have revised our understanding and re-implemented multi-instance based on a different view. The two concepts are:<br />
<ul>
<li><b>Pre 7.3</b>: Multi-instance is an aspect of the activity's behavior</li>
<li><b>7.3</b>: Multi-instance is represented by a dedicated scope in the activity model, like an embedded sub process</li>
</ul>
For explanation, let's consider a slightly changed process model where the activity <i>Write Blog Post</i> is now a parallel multi-instance activity:<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-DbnPFnB_B2I/VXmDPnahqxI/AAAAAAAAAB4/_YWSIDMrK4g/s1600/mi-diagram-scaled.png" >}}
<br />
<h2 id="pre73multiinstance">
Pre 7.3 Multi-Instance</h2>
In Camunda versions prior to 7.3, multi-instance is understood and implemented as an aspect of an activity's <code>ActivityBehavior</code>. That means, the actual <code>ActivityBehavior</code> (e.g. the behavior of invoking a web service in case of a service task) is wrapped in a multi-instance-specific behavior. In the activity model, this looks as follows:<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-awuhJ-iq8ho/VXcJWr7o-oI/AAAAAAAAABM/i3oqLYYfVaQ/s1600/activityModel2.png" >}}
<br />
When this behavior is executed, it creates as many activity instances (= executions) as there are configured in the multi-instance loop characteristics and triggers them to execute the wrapped behavior.<br />
However, this solution does not fit well with the PVM's execution model: As mentioned above, the execution of an activity instance is divided into (1) preparation, (2) execution, and (3) finalization phase and therefore spans much more than the invocation of the activity behavior. Let us consider what happens when executing an instance of <i>Write Blog Post</i> with this model:<br />
<ol>
<li>An execution (token) encounters the activity <i>Write Blog Post</i>; the PVM executes the preparation phase in the context of that execution and creates a new activity instance</li>
<li>The PVM executes the execution phase and accordingly the multi-instance activity behavior</li>
<li>The multi-instance activity behavior has to evaluate how many instances are configured and generate as many additional executions</li>
<li>The multi-instance activity behavior has to perform the user task activity behavior in the context of these executions</li>
<li>The multi-instance activity behavior must join these executions when they have finished execution and trigger process continuation when the last one has finished</li>
<li>The PVM executes the finalization phase in the context of the execution leaving the activity</li>
</ol>
The problem with this sequence is in the steps 3 to 5. Aspects that are part of the preparation and finalization phase and thus covered by the PVM must now be performed by the multi-instance activity behavior. For example, it must ensure that execution listeners are invoked for each of the configured instances. This is not as trivial as it sounds, since the listeners for the first instance have already been invoked during the regular preparation phase in step 1. It is as if the PVM regularly executes a single instance of the multi-instance activity and leaves it to the activity behavior to realize:<br />
<blockquote>
Wait a second. This is multi-instance. I should create some more instances.</blockquote>
Similar to the issue with listeners, there are problems with each of the aspects executed in the preparation/finalization phases, resulting in a lot of code duplication and a lively source of bugs.<br />
<h2 id="multiinstancein73">
Multi-Instance in 7.3</h2>
In Camunda 7.3, we changed the notion of multi-instance in the core engine fundamentally. Our change is based on the notion of a <i>multi-instance body</i>. A multi-instance body is a scope that contains the actual activity for which multi instance is configured (in the following referred to as the <i>inner activity</i>).<br />
<br />
{{< figure src="http://3.bp.blogspot.com/-sVH9l3GtBP0/VXcJWkDjumI/AAAAAAAAABo/WyfpYCpADQg/s1600/activityModel3.png" >}}
<br />
Representing the body explicitly as a scope in the activity model is a convenient way of leveraging the PVM's execution model of preparation, execution, and finalization phases for multi-instance. When an activity instance of the body is executed in the context of an execution, the multi-instance activity behavior now only creates executions as configured in the loop characteristics and then tells the PVM to execute the inner activity as often as needed. All activity instances, the instance of the body and the instances of the inner activity, are now handled by the core PVM.<br />
As a side note: The multi-instance body is not something we have made up ourselves. The <a href="http://www.omg.org/spec/BPMN/2.0/PDF/">BPMN 2.0 specification</a> mentions it in exactly one line (Section 10.4.7, page 281):<br />
<blockquote>
BPMN has the following model elements with scope characteristics:<br />
<ul>
<li>Choreography</li>
<li>Pool</li>
<li>Sub-Process</li>
<li>Task</li>
<li>Activity</li>
<li>Multi-instances body</li>
</ul>
Scopes are used to define the semantics of:<br />
<ul>
<li>Visibility of Data Objects (including DataInput and DataOutput)</li>
<li>Event resolution</li>
<li>Starting/stopping of token execution</li>
</ul>
</blockquote>
So the BPMN specification <i>does</i> foresee the need of multi-instance activities for an extra scope in which events or variables can be defined. Sadly enough though, it does not define the concept of a <i>multi-instances body</i> any further. Whether it is meant to be an actual activity (with a proper instance lifecycle) is left to the reader's imagination.<br />
<h2 id="whatdowegain">
What do we gain?</h2>
Apart from improved code quality and maintainability, treating multi-instance body and inner activity as two separate things allows us to differentiate between them when executing any of the cross-cutting concerns of activity execution. To be more precise:<br />
<b>Activity instances</b>: Have a look at the following process instance as shown in Cockpit:<br />
<br />
{{< figure src="http://4.bp.blogspot.com/-zeyGjlwLiqw/VXmFrYqMXYI/AAAAAAAAACs/UgSkpopK4os/s1600/cockpit-process.png" >}}
<br />
In the tree of activity instance, it is now possible to represent the multi-instance body and relate single instances of the inner activity to instances of the body. It looks as follows in Camunda 7.3:</div>
<br />
{{< figure src="http://3.bp.blogspot.com/-8ro6n15KAiU/VXmEoZbELTI/AAAAAAAAACg/nFSqXt-hJ_8/s1600/cockpit73.png" >}}
<br />
The following shows the same process state in Camunda 7.2:<br />
{{< figure src="http://4.bp.blogspot.com/-kD3zyazJ34I/VXmEk5WxCyI/AAAAAAAAACY/_KXiL2CgweI/s1600/cockpit72.png" >}}
In 7.2 and earlier, it is impossible to tell if both instances of MI Subprocess belong to one multi-instance activity instance with two inner instances or to two multi-instance activity instances with one inner instance each. <br />
<b>History</b>: Similar to the previous point, the multi-instance body is now logged in the process engine history including start time, end time, and duration. This way it is easily possible to determine how long all instances have taken.<br />
<b>Process Instance Modification</b>: The re-implementation made it possible to <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-instance-modification">modify active multi-instance activities</a> with our new 7.3 feature. We had literally no idea how to build this with the pre 7.3 multi-instance concept.<br />
<b>Asnychronous Continuation</b>: While not yet implemented, it is going to be possible to make either the multi-instance body (already works) or the inner activity asynchronous (does not work yet). The latter is a useful addition in cases of true parallelism since synchronization of inner instances can then be asynchronously performed after their actual work is done.<br />
<b>Explaining Multi-Instance</b>: Summing up the previous points: It is now much easier to relate execution aspects to either the multi-instance body or the inner activity instances. Multi-instance and its behavior in Camunda can now be easier communicated and understood by both users and developers.
</div>