---
title: "Job Prioritization for Asynchronous Processing at Scale"
date: "2015-08-03"
author: "Thorben Lindhauer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/08/job-prioritization-asynchronous-processing.html"

---

<div>
<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>  <br />
<div class="markdown-body">Camunda users process heavy workloads with the process engine. Often this includes asynchronous processing which is handled using the job executor component. The amount of jobs that need to be processed can quickly reach an order of magnitude of millions of jobs per day. To bring order into situations of high job executor load, Camunda BPM 7.4.0 will ship <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor-job-prioritization">job prioritization</a>. With our first <a href="http://blog.camunda.org/2015/07/camunda-bpm-740-alpha-1-released.html">7.4.0-alpha1</a> release, you can already have a look at it and give it a try. This article deals with three questions:<br />
<ul><li><a href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#the-case-for-job-prioritization">What is Job Priorization useful for?</a></li>
<li><a href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#how-to-use-it">How to use Job Prioritization?</a></li>
<li><a href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#what-you-can-expect-in-740">How will this look like in 7.4.0?</a></li>
</ul><br />
<a name='more'></a><br />
<h2><a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#the-case-for-job-prioritization" id="user-content-the-case-for-job-prioritization"><span class="octicon octicon-link"></span></a>The Case for Job Prioritization</h2>Up to date, Camunda BPM is used by a growing number of customers in a variety of industries, each with different requirements for process automation. Among others, we are especially prominent in the <a href="http://camunda.com/bpm/references/">financial, insurance, and telecommunications sectors</a>. In these fields, processes tend to be mostly or even fully automated (termed <i>Dunkelverarbeitung</i> in German insurances). To scope <i>units of work</i> in these processes, that means sets of activities that are executed in one transaction, Camunda provides the concept of <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations">asynchronous continuations</a>. Asynchronous continuations manifest themselves as <i>jobs</i> at runtime, representing the task to execute a unit of work in a running process instance. The process engine's <i>job executor</i> component continuously picks up jobs from the database and schedules them for execution in a dedicated thread pool.<br />
<br />
With global and national players using the process engine to automate their processes, the amount of jobs present at a time can grow quite large. After the 7.3.0 release, we conducted a survey amongst community and enterprise edition users receiving feedback from some of our most demanding users. Key results were:<br />
<ul><li>Users process up to 5 million jobs per day</li>
<li>Job creation and execution is subject to peaks, varying in rate and duration</li>
</ul><br />
During peaks, the job executor and its thread pool may be temporarily overloaded, needing time to process the existing jobs and reduce the queue size to a manageable portion again. With previous Camunda versions, the order of job execution is generally non-deterministic with limited measures to order execution of jobs (e.g. prefer execution of timers over asynchronous continuations). In a large set of pending jobs, some jobs may be more important than others. For example:<br />
<ul><li>VIP customers are more important than casual customers to a company. In high load situations, VIP orders should be processed with only little delay.</li>
<li>Batch operations like housekeeping tasks create a large amount of jobs in a short time, yet their execution is less important than other business processes.</li>
<li>In an exceptional condition, an external service may respond slowly. Jobs accessing that service are temporarily less important in order to avoid blocking other jobs.</li>
</ul><br />
For use cases like that, job prioritization is the adequate tool in the Camunda toolbox.<br />
<br />
<h2><a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#how-to-use-it" id="user-content-how-to-use-it"><span class="octicon octicon-link"></span></a>How to use it</h2>Let us apply job prioritization by implementing an example. The following diagram shows a simplified delivery scheduling process. In order to automatically retry scheduling in case of failure, the service task <i>Schedule Delivery</i> is declared asynchronous. In the following, we want to treat VIP customers' deliveries with higher priority such that they are sooner processed in case of high job load.<br />
<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-VVr6tnMMjUM/VbnjQv2zrQI/AAAAAAAAADM/pC6aOiErG4k/s1600/process_scaled.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-VVr6tnMMjUM/VbnjQv2zrQI/AAAAAAAAADM/pC6aOiErG4k/s400/process_scaled.png" /></a></div><br />
<h3><a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#engine-configuration" id="user-content-engine-configuration"><span class="octicon octicon-link"></span></a>Engine Configuration</h3>Before starting, we make sure to configure the job executor to acquire jobs by their priority. In <code>bpm-platform.xml</code>, this look as follows:<br />
<div class="highlight highlight-xml"><pre class="prettyprint">&lt;?<span class="pl-ent">xml</span><span class="pl-e"> version</span>=<span class="pl-s"><span class="pl-pds">"</span>1.0<span class="pl-pds">"</span></span><span class="pl-e"> encoding</span>=<span class="pl-s"><span class="pl-pds">"</span>UTF-8<span class="pl-pds">"</span></span>?&gt;
&lt;<span class="pl-ent">bpm-platform</span> ...&gt;
  &lt;<span class="pl-ent">job-executor</span>&gt;
    &lt;<span class="pl-ent">job-acquisition</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>default<span class="pl-pds">"</span></span> /&gt;
  &lt;/<span class="pl-ent">job-executor</span>&gt;

  &lt;<span class="pl-ent">process-engine</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>default<span class="pl-pds">"</span></span>&gt;
    &lt;<span class="pl-ent">job-acquisition</span>&gt;default&lt;/<span class="pl-ent">job-acquisition</span>&gt;
    ...
    &lt;<span class="pl-ent">properties</span>&gt;
      &lt;<span class="pl-ent">property</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>jobExecutorAcquireByPriority<span class="pl-pds">"</span></span>&gt;true&lt;/<span class="pl-ent">property</span>&gt;
      ...
    &lt;/<span class="pl-ent">properties</span>&gt;
    ...
  &lt;/<span class="pl-ent">process-engine</span>&gt;
&lt;/<span class="pl-ent">bpm-platform</span>&gt;</pre></div><br />
The job acquisition thread will now acquire jobs strictly by their priority, from highest to lowest. Have a look at the documentation of <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor-the-job-order-of-job-acquisition">job acquisition order</a> for a recommended database index.<br />
<br />
<h3><a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#prioritizing-vip-customers-jobs" id="user-content-prioritizing-vip-customers-jobs"><span class="octicon octicon-link"></span></a>Prioritizing VIP Customers' Jobs</h3>Next, we configure an asynchronous continuation job to receive a <a href="http://docs.camunda.org/latest/guides/user-guide/#specifying-priorities-in-bpmn-xml">priority based on the BPMN 2.0 XML</a>. Priorities are natural numbers in the Integer range and can be either constant values or the result of a JUEL expression. Let us assume that we have a process variable <code>delivery</code> that contains business data related to the delivery such as the customer's identifier. Furthermore, we have a CDI bean called <code>priorityHandler</code> that is able to calculate a customer's priority. In the BPMN XML of our process, we can configure the service task as follows:<br />
<div class="highlight highlight-xml"><pre class="prettyprint">&lt;<span class="pl-ent">bpmn</span><span class="pl-ent">:</span><span class="pl-ent">serviceTask</span> <span class="pl-e">id</span>=<span class="pl-s"><span class="pl-pds">"</span>ScheduleDelivery_1<span class="pl-pds">"</span></span>
  <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>Schedule Delivery<span class="pl-pds">"</span></span>
  <span class="pl-e">camunda</span><span class="pl-e">:</span><span class="pl-e">asyncBefore</span>=<span class="pl-s"><span class="pl-pds">"</span>true<span class="pl-pds">"</span></span>
  <span class="pl-e">camunda</span><span class="pl-e">:</span><span class="pl-e">jobPriority</span>=<span class="pl-s"><span class="pl-pds">"</span>${priorityHandler.calculatePriorityFor(delivery.customer)}<span class="pl-pds">"</span></span> /&gt;</pre></div><br />
Every job for that activity now is dynamically assigned a priority by the <code>priorityHandler</code> bean. <br />
<h3><a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#overriding-priorities-at-runtime" id="user-content-overriding-priorities-at-runtime"><span class="octicon octicon-link"></span></a>Overriding Priorities at Runtime</h3>Our solution works fine until one day the delivery service encounters an overload and starts to respond very slowly. In order to get the delivery scheduling jobs "out of the way" of other jobs, we can use the management service to define a priority for the job definition that temporarily overrides the setting in the BPMN XML.<br />
<div class="highlight highlight-java"><pre class="prettyprint"><span class="pl-c">// find the job definition</span>
<span class="pl-smi">JobDefinition</span> jobDefinition <span class="pl-k">=</span> managementService
  .createJobDefinitionQuery()
  .activityIdIn(<span class="pl-s"><span class="pl-pds">"</span>ScheduleDelivery_1<span class="pl-pds">"</span></span>)
  .singleResult();

<span class="pl-c">// set an overriding priority</span>
managementService<span class="pl-k">.</span>setOverridingJobPriorityForJobDefinition(jobDefinition<span class="pl-k">.</span>getId(), <span class="pl-c1">0</span>);</pre></div><br />
Now, every new async job that is created for the <i>Schedule Delivery</i> activity will receive the priority 0. When the delivery service has returned to normal operation conditions, this priority can similarly be cleared again with<br />
<div class="highlight highlight-java"><pre class="prettyprint">managementService<span class="pl-k">.</span>clearOverridingJobPriorityForJobDefinition(jobDefinition<span class="pl-k">.</span>getId());</pre></div><br />
<h2><a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#what-you-can-expect-in-740" id="user-content-what-you-can-expect-in-740"><span class="octicon octicon-link"></span></a>What you can expect in 7.4.0</h2>In the previous sections, we have explored the engine's new job prioritization feature. As you may have noticed, it deals with the BPMN and Java API part but there is not yet an integration with Cockpit. Similar to features like <a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit-suspension-job-definition-suspension">job definition suspension</a>, we plan to enable Cockpit users to define overriding priorities dynamically at runtime. This way, operators can immediately respond to exceptional conditions that require re-prioritization. In addition, we will integrate the priority attribute into the graphical <a href="http://docs.camunda.org/latest/guides/user-guide/#camunda-modeler">camunda Modeler</a> or <a href="http://bpmn.io/">bpmn.io</a>.<br />
<br />
For now, you can have a look at the <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor-job-prioritization">documentation on job prioritization</a> for a more comprehensive description of the feature. We are eager to receive your feedback, whether prioritization helps you solve use cases, where you see potential for improvement, and if you encounter any bugs or performance issues. Drop us a line in the comments below or on the <a href="https://groups.google.com/forum/#!forum/camunda-bpm-users">camunda user forum</a>.</div>
</div>