+++
title = "Job Executor Improvements in Camunda BPM 7.4"
date = "2015-12-08T14:44:10+01:00"
author = "Ingo Richtsmeier"
categories = ["Execution"]
tags = ["JobExecutor"]
draft = true
+++

If you've used Camunda BPM you might have noticed our engines briefest feature - it's really really fast. Might be an idea to have a look at this [whitepaper](https://network.camunda.org/whitepaper/2) or read about our [scalabilty](https://camunda.org/scalability) if you haven't experienced it for yourself. With the new job priorization feature and the exponential backoff included in the new Camunda BPM 7.4.0- release you will now be able to improve the speed further by tuning the efficiency of your custom jobs among others.  

Imagine you have a lot of jobs (maybe 50,000) on a cluster environment which wait to be executed all at the same time. The current behavior of the engine (Camunda BPM 7.3.0) is to acquire all these jobs in parallel and without any order. So it is possible that the engine executes a rather unimportant "historization" job first while a job that is mission critical for your business is left unprioritized. 

To make execution more efficient for your specific environment and to bring order into this situation of high job executor load, Camunda 7.4.0 now enables you to set a priority for each job. This can be done very easy within the Camunda Cockpit.

{{< figure src="cockpit-change-job-priority.PNG" alt="Change Job Priority in Cockpit." title="Change the job priority" caption="Cockpit screenshot">}}

Furthermore with the new release it's also possible to set job priorities dynamically for each process instance via [process variables] (https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#priorities-at-the-process-level).

At runtime the Camunda engine then evaluates the priority of each job like shown in this BPMN-diagram: 

{{< figure src="job-executor-priority-precedence.png" alt="Calculate Job Priority" title="Calculate Job Priority" caption="The algorithm">}}

But what if you have a large number of jobs with the same priority and same due date?
 
As already shown in [Thorben's blogpost](http://blog.camunda.org/post/2015/09/scaling-camunda-bpm-in-cluster-job/) the current way of executing multiple jobs in parallel is not be very efficient. Imagine you have 4 engines in the cluster and 50,000 jobs to be executed exactly at midnight. All the engines start acquiring jobs exactly at midnight, but only one of them locks the first 50 jobs exclusively and starts executing them. The three remaining engines can't get any job, so 3/4 of an acquisition cycle is wasted without executing jobs.

To handle this inefficient behavior, the new Camunda BPM 7.4.0-release provides a completely new approach, the *exponential backoff*. The engines in your cluster tries no longer to acquire jobs in parallel, but now they try it sequentially with a short delay (maybe 50 to 150 ms, the backoff). In consequence each node will only pick jobs that have no exclusive locks of other engines. So from now on, the acquiring jobs have only minimal overlap (if any) and all the jobs can be executed as quickly as possible.

For further details please have a look at the [reference](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/job-executor/) or [user guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/) to find out how to configure your engine in very heavy load scenarios.


