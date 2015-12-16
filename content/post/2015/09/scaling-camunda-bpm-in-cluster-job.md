---
title: "Scaling Camunda BPM in a Cluster: Job Executors and Coordination"
date: "2015-09-11"
author: "Thorben Lindhauer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2015/09/scaling-camunda-bpm-in-cluster-job.html"

---

<div>
Throughout development of Camunda 7.4, one of our focus points is job executor features and improvements. The <i>job executor</i> is the process engine's component to perform deferred actions, such as executing an intermediate timer event or an asynchronous continuation. Thus it is central in the Camunda architecture and central for scaling the BPM platform in a cluster. In this post we provide insight in job executor behavior and how job executor instances be coordinated by employing a backoff strategy that is part of the upcoming Camunad 7.4.0-alpha2 release.<br />
<a name='more'></a><br />
<h2>
<a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#setting-clustered-job-execution" id="user-content-setting-clustered-job-execution"><span class="octicon octicon-link"></span></a>Setting: Clustered Job Execution</h2>
As pointed out in the previous post on our new <a href="http://blog.camunda.org/2015/08/job-prioritization-asynchronous-processing.html">job prioritization feature</a>, Camunda is widely used by customers in domains where the degree of automation is high, such as insurances or telecommunications. Being nation-wide or even world-wide players, these businesses handle large amounts of process instances and therefore need a BPM platform that scales with their demands. Prior to developing job prioritization we asked customers and community users in a survey to voice their requirements for job processing. In terms of load numbers, we learned that:<br />
<ul>
<li>Users process up to 1 million jobs per day.</li>
<li>Camunda BPM is used in clusters of up to 20 nodes.</li>
</ul>
<br />
When setting up a cluster of Camunda BPM nodes, the simplified architecture looks as follows:<br />
<div class="separator" style="clear: both; text-align: center;">
{{< figure src="http://2.bp.blogspot.com/-ynFOAI01ah4/VfAeYdpv_NI/AAAAAAAAAEw/KhOfyIEymbY/s1600/Pr%25C3%25A4sentation1.png" >}}</div>
<br />
There is a central data source that a number of nodes responsible for executing BPMN processes access (side note: we talk about one logical data source; you can still apply replication on database level and horizontal partitioning of process instances to multiple databases). Cluster nodes are not coordinated by a central managing instance or in a peer-to-peer fashion. Instead data is exchanged via the central data source only. Each node runs a job executor instance that continuously polls the central data source for jobs to execute. One such cycle of <i>job acquisition</i> consists of the following steps:<br />
<ol>
<li>Select jobs from the job table that are executable (e.g. timer events must be due) and that are supposed to be executed next (e.g. when using job priorities).</li>
<li>Lock jobs for execution by updating them with a timestamp in the future and a lock owner id. The timestamp guarantees that until it expires no other job executor attempts to acquire, lock, and execute the job.</li>
<li>Submit the successfully locked jobs for execution to a thread pool.</li>
</ol>
<br />
<h2>
<a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#problem-parallel-job-acquisition" id="user-content-problem-parallel-job-acquisition"><span class="octicon octicon-link"></span></a>Problem: Parallel Job Acquisition</h2>
As pointed out above, cluster nodes are not actively managed and coordinated. While this makes for a simple architecture in which nodes can be easily added and removed from the cluster, the individual nodes are unaware of each other and in particular acquire jobs independently. That means, two cluster nodes may execute the acquisition cycle in parallel and may select the same jobs during step 1. At step 2, every job can only be locked by only one node. Other parallel locking attempts fail due to the process engine's optimistic locking mechanism. However, this also means that in the worst case an entire acquisition cycle is wasted without locking any jobs.<br />
<br />
Let us call this the <i>dining job executors</i>: Executable jobs are like candy in a jar on a table. We want each job executor to take a fair share of sweets in an efficient way. However in the current state, job executors continuously claim to take sweets that were already taken in parallel.<br />
We can examine this behavior in practice as well. We set up a Postgres 9.4 database on 2 cores of a 4 GHz machine and three execution nodes using Camunda BPM version 7.4.0-alpha1 running on a different host. We start 50,000 process instances that consist of a single asynchronous continuation resulting in 50,000 jobs ready for execution. We configure each job to artificially execute for 0 to 160 milliseconds which should roughly be in the range of invoking an external system. In addition, we use the new job prioritization feature and assign each job a random priority. The following graph shows the acquisition performance of a single execution node:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
{{< figure src="http://4.bp.blogspot.com/-Dfr4-0NTvHk/VfAbpb7ljmI/AAAAAAAAAEc/CVPb8yLHx94/s1600/problem-alpha12.png" >}}</div>
The graph shows the number of jobs acquired successfully (blue line; steps 1 and 2 of job acquisition succeed) as well as the jobs acquired but failed to lock (orange line; step 1 succeeds, step 2 fails). Already in a cluster of three nodes, we notice that the total number of jobs failed to lock outweighs the number of successfully acquired. This effect becomes worse the larger the cluster grows: When one node acquires jobs, it becomes more likely that any other node acquires the same jobs in parallel and succeeds locking them. While this behavior is not harmful for correct process execution, it wastes execution time and puts additional load on the database.<br />
<br />
<h2>
<a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#improvement-exponential-backoff" id="user-content-improvement-exponential-backoff"><span class="octicon octicon-link"></span></a>Improvement: Exponential Backoff</h2>
To avoid conflicts when locking jobs in steps 1 and 2 of acquisition, overlapping acquisition cycles need to become less likely. This can be done in two ways: First, the time a single cycle takes can be reduced. Second, the interval of cycles can be extended. We followed the second approach to which one solution is <i>exponential backoff</i>. The idea of backoff is that in case of failure to lock jobs a job executor waits for a certain amount of time before performing the next acquisition cycle. In case locking fails continuously the wait time increases exponentially. The number of jobs acquired increases with every increase in wait time as well. This way job acquisition becomes less frequent and ideally a configuration in which all job executor nodes acquire at different, non-overlapping times is reached.<br />
<br />
Again, let us look at an example from practice. In the same cluster setup as before using the latest SNAPSHOT build, we use a backoff configuration with 30 milliseconds initial backoff and 150 milliseconds maximum backoff. Backoff increases by factor 2. Accordingly, the number of jobs acquired per cycle goes from 3 to 48. The resulting graph for one cluster node is:<br />
<div class="separator" style="clear: both; text-align: center;">
{{< figure src="http://1.bp.blogspot.com/-4CrtFIz43BM/VfAbT0W1C6I/AAAAAAAAAEY/yCtoyTEJgHw/s1600/improvement-snapshot2.png" >}}</div>
While acquisition failures are still present, they are much less frequent than before.<br />
<br />
Speaking in the figure of the dining job executors: The job executors behave gently when they can't get a sweet they want and wait until they can safely reach into the candy jar.<br />
<br />
<h2>
<a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#practice-configuration-and-performance" id="user-content-practice-configuration-and-performance"><span class="octicon octicon-link"></span></a>Practice: Configuration and Performance</h2>
Above we have shown that job acquisition backoff can reduce database load by avoiding unnecessary acquisition cycles. Two questions remain: Is this improvement noticeable in practice? How to find suitable backoff settings?<br />
<br />
When tweaking job executor configuration settings, it is advisable to do this in a data-driven way. The following should be defined upfront:<br />
<ul>
<li>A <i>scenario</i> that resembles realistic workload; this also includes all parameters that are not optimized as part of the benchmark</li>
<li>A <i>metric of success</i>, i.e. something that indicates whether one setting is better than another</li>
<li>A <i>parameter</i> that is optimized</li>
</ul>
It is also possible to optimize multiple parameters, however in that case it is advisable to optimize one after the other to be able to attribute improvements to a specific parameter change. We define our benchmark as follows:<br />
<ul>
<li> <i>Scenario</i>  <ul>
<li>50,000 instances of a simple process with one asynchronous service task. The task simulates calling an external service by artificially waiting for a verying amount of time. We draw this time from a normal distribution with a mean of 80 milliseconds and a standard deviation of 25 milliseconds.</li>
<li>A Postgres 9.4 instance using three cores of a 4 GHz machine serving as the engine database</li>
<li>The Camunda Tomcat distribution in the versions 7.4.0-alpha1 and the current 7.4.0-SNAPSHOT</li>
<li>The size of the job queue used by the execution thread pool is 100</li>
</ul>
</li>
<li> <i>Metric of success</i>  <ul>
<li>Throughput: Measured by the overall duration to process all jobs</li>
<li>Supplementary metrics: To understand the changes in throughput, we collect the database's CPU usage and <a href="http://docs.camunda.org/manual/latest/user-guide/process-engine/metrics/">statistics of successfully and unsuccessfully locked jobs</a></li>
</ul>
</li>
<li> <i>Parameters</i>  <ul>
<li>Number of cluster nodes</li>
<li>Number of jobs to acquire</li>
<li>Backoff settings</li>
</ul>
</li>
</ul>
<br />
As the first step, we tune the number of cluster nodes until we operate our Postgres instance at full capacity. That level is reached with 5 nodes when there are only marginal improvments in throughput with more nodes due to the database operating with 100% CPU load.<br />
Next, we see if we can improve the performance with the following settings:<br />
<ol>
<li>default alpha1 configuration: 3 jobs acquired per cycle; no backoff (baseline)</li>
<li>default alpha1 configuration: 48 jobs acquired per cycle; no backoff</li>
<li>backoff configuration - initial: 50 ms; maximum: 250 ms; increase factor: 2</li>
<li>backoff configuration - initial: 70 ms; maximum: 350 ms; increase factor: 2</li>
<li>backoff configuration - initial: 90 ms; maximum: 450 ms; increase factor: 2</li>
</ol>
<br />
Note that all of the backoff configurations imply acquiring 3 jobs initially and 48 jobs with the highest backoff. In terms of throughput, we obtain the following results:<br />
<div class="separator" style="clear: both; text-align: center;">
{{< figure src="http://3.bp.blogspot.com/-CDG1Cd8z1vI/VfAb0-vvKjI/AAAAAAAAAEk/-Pt-CN0209g/s1600/throughput.png" >}}</div>
As settings 2 and 5 show the best performance, we notice that acquiring larger chunks of jobs in one acquisition cycle is benefitial in our scenario. Furthermore, we notice only a slight benefit of a configuration with backoff to one without. This can be explained by the way the alpha1 engine deals with the case that the job execution queue is saturated: In such a situation, the job acquisition thread itself begins executing jobs that cannot be submitted. This way, an uncontrolled backoff effect sets in and acquisition automatically becomes less frequent. In case the workload is more heterogenous than in our scenario, it may happen that the acquisition thread executes a rather long running job stalling execution resources that recover meanwhile by not acquiring new jobs. With the upcoming alpha2 release, we have changed this behavior such that the acquisition thread's only responsibility is to acquire jobs.<br />
<br />
This leads to the following conclusions:<br />
<ul>
<li>If you use the BPM platform in a high-load scenario where performance is important, consider tweaking the job executor settings.</li>
<li>Before changing settings, define a suitable benchmark by a realistic scenario, a metric of success, and parameters that you are going to change.</li>
<li>If you run the job executor on a single machine, the execution queue size and the number of jobs acquired per acquisition cycle are good parameters.</li>
<li>If you run a cluster, the job acquisition backoff settings are good parameters.</li>
<li>Backoff reduces the number of acquisition queries and job lock failures, freeing some of your database's processing resources.</li>
</ul>
<br />
<h2>
<a aria-hidden="true" class="anchor" href="https://www.blogger.com/blogger.g?blogID=2414043640680427770#background-reading-and-resources" id="user-content-background-reading-and-resources"><span class="octicon octicon-link"></span></a>Background Reading and Resources</h2>
In order to try out the backoff configuration settings, you may wait for our upcoming alpha2 release or use a <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/7.4.0-SNAPSHOT/">nightly SNAPSHOT build</a>. For all the job executor configuration options have a look at our <code>bpm-platform.xml</code> <a href="http://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/job-executor">deployment descriptor reference</a>. For engine and job acquisition metrics, the <a href="http://docs.camunda.org/manual/latest/user-guide/process-engine/metrics/">user guide</a> provides insight into which metrics are collected out of the box, among these the number of job acquisition cycles and job locking failures that were used in this blogpost.
</div>