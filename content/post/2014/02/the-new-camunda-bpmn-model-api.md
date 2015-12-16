---
title: "The new camunda BPMN model API"
date: "2014-02-07"
author: "Sebastian Menski"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/02/the-new-camunda-bpmn-model-api.html"

---

<div>
As already mentioned in our <a href="http://blog.camunda.org/2014/01/camunda-bpm-710-alpha2-released.html" target="_blank">last alpha release blog post</a>&nbsp;we are currently working on a BPMN model API to parse, create, edit and write BPMN 2.0 XML files. Last Friday we opened our <a href="https://github.com/camunda/camunda-bpmn-model" target="_blank">GitHub repository</a>&nbsp;and have since then created a <a href="http://docs.camunda.org/guides/user-guide/#bpmn-model-api" target="_blank">userguide</a> and some <a href="https://github.com/camunda/camunda-quickstarts/tree/master/bpmn-model-api" target="_blank">quickstarts</a>.<br />
<br />
The BPMN model API offers you a simple and straightforward way to interact with an BPMN 2.0 model. It enables you to gather information from an existing model, edit and extend them. Of course you can also create completely new ones.<br />
<br />
Technically the model API is based on a DOM layer which is accessed and manipulated by a general XML API developed by us. On top of this, the BPMN model API encapsulates the interaction with the XML API. The BPMN model API as well as the XML API does not hold any state, which means only the DOM layer has the current model state. This enables us to read information which we currently are not aware of without the risk of losing such information. It also allows non-intrusive editing of BPMN Models, conserving custom formatting and source code comments.<br />
<br />
In addition, if your BPMN 2.0 model contains custom elements or attributes they are always accessible even if they are not exposed through the high-level BPMN model Api. Although our BPMN model API cannot be aware of these custom extensions you can obtain and modify them easily with the generic XML API. Another benefit of this concept is that we can already show you the current state despite the fact that the current BPMN model API not yet implements all BPMN 2.0 elements. But the already supported elements are enough to create rather complex processes.<br />
<br />
<a href="https://github.com/camunda/camunda-bpmn-model" target="_blank">Just check it out!</a><br />
<span style="font-family: inherit; font-size: large;"></span><br />
<a name='more'></a>
<br />
<h3>
<span style="font-family: inherit;"><span style="font-size: x-large;">Show me some code please</span></span></h3>
Okey after all this promises I want to show you some code examples so you can get a first impression what already is possible with the BPMN model API.<br />
<div>
<br /></div>
<div>
Lets start with a simple example.</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-UCNxhK9U_pA/UvOIZA_3UNI/AAAAAAAAAA4/BWZQK8VDSqQ/s1600/simple-process.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://4.bp.blogspot.com/-UCNxhK9U_pA/UvOIZA_3UNI/AAAAAAAAAA4/BWZQK8VDSqQ/s1600/simple-process.png" height="109" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">A process with a start event, user task and end event</td></tr>
</tbody></table>
<div>
The following code creates this process with the plain BPMN model API and saves it to a new file.</div>
<div>
<pre class="line-pre" style="background-color: white; font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 12px; line-height: 16.799999237060547px; padding: 0px; width: 744px;"><div class="line" id="file-gistfile1-java-LC1">
<pre style="background-color: #f8f8f8; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(221, 221, 221); font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 13px; line-height: 19px; margin-bottom: 15px; margin-top: 15px; overflow: auto; padding: 6px 10px; word-wrap: normal;"><span class="kd" style="font-weight: bold;">public</span> <span class="kt" style="color: #445588; font-weight: bold;">void</span> <span class="nf" style="color: #990000; font-weight: bold;">testCreateProcess</span><span class="o" style="font-weight: bold;">()</span> <span class="o" style="font-weight: bold;">{</span>
  <span class="n" style="color: #333333;">BpmnModelInstance</span> <span class="n" style="color: #333333;">modelInstance</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">Bpmn</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">createEmptyModel</span><span class="o" style="font-weight: bold;">();</span>
  <span class="n" style="color: #333333;">Definitions</span> <span class="n" style="color: #333333;">definitions</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">Definitions</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">definitions</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setTargetNamespace</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"http://camunda.org/examples"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setDefinitions</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">definitions</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">Process</span> <span class="n" style="color: #333333;">process</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">Process</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">definitions</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">addChildElement</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">process</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">StartEvent</span> <span class="n" style="color: #333333;">startEvent</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">StartEvent</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">startEvent</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setId</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"start"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">process</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">addChildElement</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">startEvent</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">UserTask</span> <span class="n" style="color: #333333;">userTask</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">UserTask</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">userTask</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setId</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"task"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">userTask</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setName</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"User Task"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">process</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">addChildElement</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">userTask</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">SequenceFlow</span> <span class="n" style="color: #333333;">sequenceFlow</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">SequenceFlow</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">sequenceFlow</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setId</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"flow1"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">process</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">addChildElement</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">sequenceFlow</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">connect</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">sequenceFlow</span><span class="o" style="font-weight: bold;">,</span> <span class="n" style="color: #333333;">startEvent</span><span class="o" style="font-weight: bold;">,</span> <span class="n" style="color: #333333;">userTask</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">EndEvent</span> <span class="n" style="color: #333333;">endEvent</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">EndEvent</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">endEvent</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setId</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"end"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">process</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">addChildElement</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">endEvent</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">sequenceFlow</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">newInstance</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">SequenceFlow</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">class</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">sequenceFlow</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setId</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"flow2"</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">process</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">addChildElement</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">sequenceFlow</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">connect</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">sequenceFlow</span><span class="o" style="font-weight: bold;">,</span> <span class="n" style="color: #333333;">userTask</span><span class="o" style="font-weight: bold;">,</span> <span class="n" style="color: #333333;">endEvent</span><span class="o" style="font-weight: bold;">);</span>

  <span class="n" style="color: #333333;">Bpmn</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">writeModelToFile</span><span class="o" style="font-weight: bold;">(</span><span class="k" style="font-weight: bold;">new</span> <span class="n" style="color: #333333;">File</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"target/new-process.bpmn"</span><span class="o" style="font-weight: bold;">),</span> <span class="n" style="color: #333333;">modelInstance</span><span class="o" style="font-weight: bold;">);</span>
<span class="o" style="font-weight: bold;">}</span>

<span class="kd" style="font-weight: bold;">public</span> <span class="kt" style="color: #445588; font-weight: bold;">void</span> <span class="nf" style="color: #990000; font-weight: bold;">connect</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">SequenceFlow</span> <span class="n" style="color: #333333;">flow</span><span class="o" style="font-weight: bold;">,</span> <span class="n" style="color: #333333;">FlowNode</span> <span class="n" style="color: #333333;">from</span><span class="o" style="font-weight: bold;">,</span> <span class="n" style="color: #333333;">FlowNode</span> <span class="n" style="color: #333333;">to</span><span class="o" style="font-weight: bold;">)</span> <span class="o" style="font-weight: bold;">{</span>
  <span class="n" style="color: #333333;">flow</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setSource</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">from</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">from</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">getOutgoing</span><span class="o" style="font-weight: bold;">().</span><span class="na" style="color: teal;">add</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">flow</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">flow</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">setTarget</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">to</span><span class="o" style="font-weight: bold;">);</span>
  <span class="n" style="color: #333333;">to</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">getIncoming</span><span class="o" style="font-weight: bold;">().</span><span class="na" style="color: teal;">add</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">flow</span><span class="o" style="font-weight: bold;">);</span>
<span class="o" style="font-weight: bold;">}</span></pre>
</div>
</pre>
</div>
<div>
This code generates the following BPMN 2.0 XML file.</div>
<div>
<pre style="background-color: #f8f8f8; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(221, 221, 221); font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 13px; line-height: 19px; margin-bottom: 15px; margin-top: 15px; overflow: auto; padding: 6px 10px; word-wrap: normal;"><span class="cp" style="color: #999999; font-weight: bold;">&lt;?xml version="1.0" encoding="UTF-8" standalone="no"?&gt;</span>
<span class="nt" style="color: navy;">&lt;definitions</span> <span class="na" style="color: teal;">targetNamespace=</span><span class="s" style="color: #dd1144;">"http://camunda.org/examples"</span> <span class="na" style="color: teal;">xmlns=</span><span class="s" style="color: #dd1144;">"http://www.omg.org/spec/BPMN/20100524/MODEL"</span><span class="nt" style="color: navy;">&gt;</span>
  <span class="nt" style="color: navy;">&lt;process&gt;</span>
    <span class="nt" style="color: navy;">&lt;startEvent</span> <span class="na" style="color: teal;">id=</span><span class="s" style="color: #dd1144;">"start"</span><span class="nt" style="color: navy;">&gt;</span>
      <span class="nt" style="color: navy;">&lt;outgoing&gt;</span>flow1<span class="nt" style="color: navy;">&lt;/outgoing&gt;</span>
    <span class="nt" style="color: navy;">&lt;/startEvent&gt;</span>
    <span class="nt" style="color: navy;">&lt;userTask</span> <span class="na" style="color: teal;">id=</span><span class="s" style="color: #dd1144;">"task"</span> <span class="na" style="color: teal;">name=</span><span class="s" style="color: #dd1144;">"User Task"</span><span class="nt" style="color: navy;">&gt;</span>
      <span class="nt" style="color: navy;">&lt;incoming&gt;</span>flow1<span class="nt" style="color: navy;">&lt;/incoming&gt;</span>
      <span class="nt" style="color: navy;">&lt;outgoing&gt;</span>flow2<span class="nt" style="color: navy;">&lt;/outgoing&gt;</span>
    <span class="nt" style="color: navy;">&lt;/userTask&gt;</span>
    <span class="nt" style="color: navy;">&lt;sequenceFlow</span> <span class="na" style="color: teal;">id=</span><span class="s" style="color: #dd1144;">"flow1"</span> <span class="na" style="color: teal;">sourceRef=</span><span class="s" style="color: #dd1144;">"start"</span> <span class="na" style="color: teal;">targetRef=</span><span class="s" style="color: #dd1144;">"task"</span><span class="nt" style="color: navy;">/&gt;</span>
    <span class="nt" style="color: navy;">&lt;endEvent</span> <span class="na" style="color: teal;">id=</span><span class="s" style="color: #dd1144;">"end"</span><span class="nt" style="color: navy;">&gt;</span>
      <span class="nt" style="color: navy;">&lt;incoming&gt;</span>flow2<span class="nt" style="color: navy;">&lt;/incoming&gt;</span>
    <span class="nt" style="color: navy;">&lt;/endEvent&gt;</span>
    <span class="nt" style="color: navy;">&lt;sequenceFlow</span> <span class="na" style="color: teal;">id=</span><span class="s" style="color: #dd1144;">"flow2"</span> <span class="na" style="color: teal;">sourceRef=</span><span class="s" style="color: #dd1144;">"task"</span> <span class="na" style="color: teal;">targetRef=</span><span class="s" style="color: #dd1144;">"end"</span><span class="nt" style="color: navy;">/&gt;</span>
  <span class="nt" style="color: navy;">&lt;/process&gt;</span>
<span class="nt" style="color: navy;">&lt;/definitions&gt;</span></pre>
</div>
<br />
<h4>
<span style="font-size: x-large;">Fluent model builder API</span></h4>
<div>
Okey I know you say this looks very verbose and becomes easily hundred lines of code to create a complex task like this one.</div>
<div>
<br /></div>
{{< figure src="http://4.bp.blogspot.com/-FWsib1VFTEY/UvOLQfqI6lI/AAAAAAAAABE/YfR7O54bgzs/s1600/invoice.png" >}}
<div>
Although the BPMN model API gives you the possibility to modify the process definition in every aspect there should be an easier way to create process models like the above. And as you might expect here comes another great feature of the BPMN model API: our <b>fluent model builder API</b>. A simple way to create basic BPMN processes with the following BPMN elements:</div>
<div>
<ul>
<li>process</li>
<li>start event</li>
<li>exclusive gateway</li>
<li>parallel gateway</li>
<li>script task</li>
<li>service task</li>
<li>user task</li>
<li>end event</li>
</ul>
So lets create this process fully deployable on our camunda BPM platform in less then 50 lines of code. Please have a look at the complete code in our <a href="https://github.com/camunda/camunda-quickstarts/tree/master/bpmn-model-api/generate-process-fluent-api" target="_blank">quickstart</a>.<br />
<pre style="background-color: #f8f8f8; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(221, 221, 221); font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 13px; line-height: 19px; margin-bottom: 15px; margin-top: 15px; overflow: auto; padding: 6px 10px; word-wrap: normal;"><span class="n" style="color: #333333;">BpmnModelInstance</span> <span class="n" style="color: #333333;">modelInstance</span> <span class="o" style="font-weight: bold;">=</span> <span class="n" style="color: #333333;">Bpmn</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">createProcess</span><span class="o" style="font-weight: bold;">()</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"BPMN API Invoice Process"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">executable</span><span class="o" style="font-weight: bold;">()</span>
  <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">startEvent</span><span class="o" style="font-weight: bold;">()</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Invoice received"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">formKey</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"embedded:app:forms/start-form.html"</span><span class="o" style="font-weight: bold;">)</span>
  <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">userTask</span><span class="o" style="font-weight: bold;">()</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Assign Approver"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">formKey</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"embedded:app:forms/assign-approver.html"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">assignee</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"demo"</span><span class="o" style="font-weight: bold;">)</span>
  <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">userTask</span><span class="o" style="font-weight: bold;">()</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">id</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"approveInvoice"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Approve Invoice"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">formKey</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"embedded:app:forms/approve-invoice.html"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">assignee</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"${approver}"</span><span class="o" style="font-weight: bold;">)</span>
  <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">exclusiveGateway</span><span class="o" style="font-weight: bold;">()</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Invoice approved?"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">gatewayDirection</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">GatewayDirection</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">Diverging</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">condition</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"yes"</span><span class="o" style="font-weight: bold;">,</span> <span class="s" style="color: #dd1144;">"${approved}"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">userTask</span><span class="o" style="font-weight: bold;">()</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Prepare Bank Transfer"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">formKey</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"embedded:app:forms/prepare-bank-transfer.html"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">candidateGroups</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"accounting"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">serviceTask</span><span class="o" style="font-weight: bold;">()</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Archive Invoice"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">className</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"org.camunda.bpm.example.invoice.service.ArchiveInvoiceService"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">endEvent</span><span class="o" style="font-weight: bold;">()</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Invoice processed"</span><span class="o" style="font-weight: bold;">)</span>
  <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">moveToLastGateway</span><span class="o" style="font-weight: bold;">()</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">condition</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"no"</span><span class="o" style="font-weight: bold;">,</span> <span class="s" style="color: #dd1144;">"${!approved}"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">userTask</span><span class="o" style="font-weight: bold;">()</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Review Invoice"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">formKey</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"embedded:app:forms/review-invoice.html"</span> <span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">assignee</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"demo"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">exclusiveGateway</span><span class="o" style="font-weight: bold;">()</span>
        <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Review successful?"</span><span class="o" style="font-weight: bold;">)</span>
        <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">gatewayDirection</span><span class="o" style="font-weight: bold;">(</span><span class="n" style="color: #333333;">GatewayDirection</span><span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">Diverging</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">condition</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"no"</span><span class="o" style="font-weight: bold;">,</span> <span class="s" style="color: #dd1144;">"${!clarified}"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">endEvent</span><span class="o" style="font-weight: bold;">()</span>
        <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">name</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"Invoice not processed"</span><span class="o" style="font-weight: bold;">)</span>
    <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">moveToLastGateway</span><span class="o" style="font-weight: bold;">()</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">condition</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"yes"</span><span class="o" style="font-weight: bold;">,</span> <span class="s" style="color: #dd1144;">"${clarified}"</span><span class="o" style="font-weight: bold;">)</span>
      <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">connectTo</span><span class="o" style="font-weight: bold;">(</span><span class="s" style="color: #dd1144;">"approveInvoice"</span><span class="o" style="font-weight: bold;">)</span>
  <span class="o" style="font-weight: bold;">.</span><span class="na" style="color: teal;">done</span><span class="o" style="font-weight: bold;">();</span></pre>
</div>
<div>
To learn how to use the fluent builder API &nbsp;have a look at our&nbsp;<a href="http://docs.camunda.org/guides/user-guide/#bpmn-model-api-fluent-builder-api" target="_blank">userguide</a>. There you can find examples how to extend an existing process. For example to add a new execution path to a gateway or add new elements between two existing elements.</div>
<div>
<br /></div>
<div>
Well, what more can I say then to&nbsp;<a href="https://github.com/camunda/camunda-bpmn-model" target="_blank">check it out</a> and and give us feedback!</div>

</div>