---
title: "Introducing an Activity Instance Model to the core Process Engine"
date: "2013-06-17T09:40:00+02:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 

aliases:
  - "/2013/06/introducing-activity-instance-model-to.html"

---

<span style="font-weight: normal;"><i><br /></i></span>
<span style="font-weight: normal;"><i>(this post was originally part of the <a href="http://camundabpm.blogspot.de/2013/06/camunda-bpm-700-alpha6-released.html">7.0.0-alpha6 release blog post</a> but later extracted into an own post).</i></span><br />
<span style="font-weight: normal;"><i><br /></i></span>
In 7.0.0-alpha6 we introduced the concept of&nbsp;activity&nbsp;instances and the activity instance tree to the core process engine. This post explains the motivation and gives some insight into the internal implementation.<br />
<h3>
Why do we need an Activity Instance Tree?</h3>
<div>
The activity instance tree contains a node for each activity that is currently active in the process instance. Some activity instances are scopes (such as Embedded Subprocesses). Such scope activity instance may have child activity instances:</div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><a href="http://4.bp.blogspot.com/-nHFq1mJMTD0/Ubsb63GXFJI/AAAAAAAAAKE/QZ_Cd2GqsfI/s1600/tree1.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="122" src="http://4.bp.blogspot.com/-nHFq1mJMTD0/Ubsb63GXFJI/AAAAAAAAAKE/QZ_Cd2GqsfI/s320/tree1.png" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="font-size: 13px;">Activity Instance Tree and Scopes</td></tr>
</tbody></table>
<div>
So far so good. But is that not the execution tree provided by the process engine? To some extent yes, but not in &nbsp;all cases. There are numerous cases where the execution tree is not aligned with activity scoping in BPMN 2.0.</div>
<h3>
Scoping vs. Concurrency</h3>
<div>
The process engine uses the concept of a "child execution" both for scoping and for concurrency. If a non-concurrent execution reaches a parallel gateway, it will stay there and concurrent child executions are spawned for each outgoing sequence flow. The effect is that the child executions are nested below an inactive execution waiting in the parallel gateway (fork). This concept is an internal implementation detail and not aligned with the BPMN 2.0 specification and usually very hard to understand for new users of the process engine:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-uD5Rb0XBsQ0/UbshmnQ3k_I/AAAAAAAAAKo/Yryo_9v_Y_U/s1600/scoping_cs_concurrency.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="253" src="http://3.bp.blogspot.com/-uD5Rb0XBsQ0/UbshmnQ3k_I/AAAAAAAAAKo/Yryo_9v_Y_U/s400/scoping_cs_concurrency.PNG" width="400" /></a></div>
<div>
In the execution tree (left hand side) you will see an inactive scope execution waiting in the parallel gateway (even though the process instance has already completed that activity and is now executing the service tasks). The executions executing the service tasks are nested below the inactive scope execution waiting in the fork gateway. In the activity instance tree (right hand side), this execution is not visible.&nbsp;</div>
<div>
In the activity instance tree, the root node in the activity instance tree represents the process instance itself (ie. the instance of the process definition activity) and its children represent active activity instances for both service tasks.</div>
<div>
<br /></div>
<div>
Another example is Parallel Multi Instance. Consider the following examples:&nbsp;</div>
<div>
1) Single parallel multi instance task:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-CphDoa92RvE/Ubso_L9XzYI/AAAAAAAAALM/wyol3xiZEAA/s1600/tree_multiInstance_single.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="151" src="http://3.bp.blogspot.com/-CphDoa92RvE/Ubso_L9XzYI/AAAAAAAAALM/wyol3xiZEAA/s320/tree_multiInstance_single.PNG" width="320" /></a></div>
<div>
<br /></div>
<div>
<br /></div>
<div>
2) Multi instance subprocess:</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-gtsqLRzxNNI/UbsogihhAiI/AAAAAAAAALE/3BznfVbbnVA/s1600/tree_multiInstance.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="290" src="http://4.bp.blogspot.com/-gtsqLRzxNNI/UbsogihhAiI/AAAAAAAAALE/3BznfVbbnVA/s400/tree_multiInstance.PNG" width="400" /></a></div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div>
The additonal executions in the execution trees on the left hand side are needed for internal process engine reasons. In cockpit we want to visualize the activity instance tree which is easier to understand and more aligned with BPMN 2.0.&nbsp;</div>
<h3>
Execution Tree Compacting and Optimization</h3>
<div>
A second reason for introducing the activity instance tree is that the process engine compacts and optimizes the execution tree at runtime. Consider the example of a parallel gateway with two usertasks. Initially both T1 and T2 are active. In the execution tree we will see the inactive concurrent root execution waiting at the parallel gateway and two child executions, one for each task. The activity instance tree has the same structure but the root node corresponds to the process instance itself and is not waiting in the parallel gateway. After the task T2 is completed, the process engine will compact the execution tree, prune the execution for T1 and replace it with the root execution. If the execution T1 references variables or tasks they are moved to the root execution. The activity instance tree look different: it still contains an activity instance for T1 and for the process definition itself. &nbsp;</div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><a href="http://3.bp.blogspot.com/-TpryPDwOCIQ/UbsylNOPQOI/AAAAAAAAAMM/qZEoNNEj4kY/s1600/replaced_by.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="286" src="http://3.bp.blogspot.com/-TpryPDwOCIQ/UbsylNOPQOI/AAAAAAAAAMM/qZEoNNEj4kY/s400/replaced_by.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="font-size: 13px;">Execution Tee compacting</td></tr>
</tbody></table>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div>
A ramification of this behavior is that in the execution tree there is no concept of "activity instance identity". There is no unique identifier representing an instance of an activity. In general, it is not guaranteed that the same execution that enters an activity instance will be the same execution that completes it. In the example above T1 is started by an execution with Id=2 and ended by an execution with Id=1.</div>
<div>
<b><span style="color: red;"><br /></span></b></div>
<div>
<b><span style="color: red;">(This is why in general you should never use execution IDs for message correlation, BTW!!!)</span></b></div>
<br />
In cockpit we want to allow users to select activity instances and explore their details (variables, tasks ...). If we used the execution IDs the following behavior could occur: the user selects T1 and we write the execution id to the url. While he is looking at the details, T2 is completed and the execution tree is compacted by the process engine. Now the user types F5 (refresh) in the browser. He gets an error since the execution he previously selected does not exist anymore even though the Task is still active. Fail!<br />
(Even worse: he could send the effectively-non-deep-link to a colleague.)<br />
<h4>
Unifying the model for History and Execution</h4>
<div>
The third reason for adding the activity instance tree to the process engine is that it is better aligned with the way the process engine history works. In the process engine history we always had the concept of historic activity instances. Aligning history and runtime tree structures allows us to use the same client-side code in cockpit for visualizing both running an historic activity instances and activities. In addition: cockpit also works if history is turned off.</div>
<h3>
How is the Activity Instance Tree implemented?&nbsp;</h3>
<div>
The activity instance tree is squeezed into the execution tree. We added a new column to the execution table named ACT_INST_ID_:&nbsp;</div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><a href="http://4.bp.blogspot.com/-dYuyGvfrCOo/Ubs1NKr2q9I/AAAAAAAAAMc/RDZnpjzklpU/s1600/db_column.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="165" src="http://4.bp.blogspot.com/-dYuyGvfrCOo/Ubs1NKr2q9I/AAAAAAAAAMc/RDZnpjzklpU/s320/db_column.png" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="font-size: 13px;">New ACT_INST_ID_ column added in Execution table.</td></tr>
</tbody></table>
<div>
It was not necessary changing anything else as far as the database is concerned. The values of all other columns remain untouched and we have the same number of executions as before.&nbsp;</div>
<div>
<br /></div>
<div>
The activity instance IDs are generated by the&nbsp;<a href="https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/main/java/org/camunda/bpm/engine/impl/pvm/runtime/AtomicOperation.java">Atomic Operations</a>&nbsp;that start/ end activities:</div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><a href="http://4.bp.blogspot.com/-pX1xnuq1oPE/Ubs2PrE35RI/AAAAAAAAAMs/RavfOcyOomY/s1600/atomic_ops.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="190" src="http://4.bp.blogspot.com/-pX1xnuq1oPE/Ubs2PrE35RI/AAAAAAAAAMs/RavfOcyOomY/s320/atomic_ops.png" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="font-size: 13px;">New Atomic Operation Type Hierarchy</td></tr>
</tbody></table>
<div>
<a href="https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/test/java/org/camunda/bpm/engine/test/pvm/PvmActivityInstanceTest.java">There are testcases</a>&nbsp;verifying that activity instance Id generation and activity start / end listener invocation works as expected (ie. an activity instance ID is generated BEFORE the activity START listeners are invoked etc.).</div>
<div>
<br /></div>
<h3>
How can I retrieve an Activity Instance Tree?</h3>
<div>
Currently you can retrieve the activity instance tree only for a whole process instance.</div>
<div>
<br /></div>
<div>
<b>Using the Java API:</b></div>
<div>
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">ActivityInstance rootActivityInstance = runtimeService.getActivityInstance(pi.getProcessInstanceId());</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<a href="http://docs.camunda.org/api-references/java/org/camunda/bpm/engine/RuntimeService.html#getActivityInstance(java.lang.String)"><span style="font-family: inherit;">Read the Javadocs.</span></a></div>
<div>
<br /></div>
<div>
<b>You can also use the REST API:</b></div>
<div>
<b><br /></b></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">GET engine-rest/process-instance/8f72bc9f-d505-11e2-bafa-3c970e140ef1/activity-instances</span></div>
<div>
<br /></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">{</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "id": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "parentActivityInstanceId": null,</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "activityId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "childActivityInstances": [</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "id": "SubProcess_1:8f72bca4-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "parentActivityInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "activityId": "SubProcess_1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "childActivityInstances": [],</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "childTransitionInstances": [</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "id": "8f72bca9-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "parentActivityInstanceId": "SubProcess_1:8f72bca4-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "targetActivityId": "ServiceTask_1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "executionId": "8f72bca9-d505-11e2-bafa-3c970e140ef1"</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "id": "8f72bcaa-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "parentActivityInstanceId": "SubProcess_1:8f72bca4-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "targetActivityId": "ServiceTask_2",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "executionId": "8f72bcaa-d505-11e2-bafa-3c970e140ef1"</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ],</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "executionIds": [</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "8f72bc9f-d505-11e2-bafa-3c970e140ef1"</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; ],</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "childTransitionInstances": [],</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; "executionIds": [</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; &nbsp; &nbsp; "8f72bc9f-d505-11e2-bafa-3c970e140ef1"</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">&nbsp; &nbsp; ]</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: xx-small;">}</span></div>
</div>
<br />
<span style="font-family: inherit;">Step by step we will roll out the support for activity instances in public API, add an Activity Instance Query etc.</span><br />
<h3>
Will executions be deprecated?</h3>
<div>
I am not sure yet but my gut feeling is yes. The concept of "Execution" is a proprietary internal process engine concern and will gradually be replaced by the activity instance model. We might go down a road where you can still query for executions but you will in fact get activity instances as result, in order not to break the API. But not before 7.1 or probably 8.0 :)</div>
