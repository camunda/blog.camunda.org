#JobExecutor Performance Improvements

As most of you, who had been come in touch with the camunda workflow engine, already noticed: The engine is very fast. Have a look at this [whitepaper](https://network.camunda.org/whitepaper/2) or read about our [scalabilty](https://camunda.org/scalability). 

In this release we make the job executor even faster with job priorisation and exponential backoff. If you have many jobs (maybe 50000) which waits to be executed all at the same time, all the engines in your cluster now try to acquire their jobs to execute not all for the same time but with a short delay (maybe 50 to 150 ms, the exponential backoff). Then they will pick only jobs, that no other engine in the cluster locks exclusively. And the engine will pick the most important jobs to execute them first.

Imagine you have 4 engine in the cluster and 50000 jobs to be executed exactly at midnight. All the engines starts acquiring  jobs exactly at midnight, but only one of can lock the first 50 jobs exclusively and start executing them. Three engines can't get any jobs. With exponential backoff they will all start 50 ms later to acquire jobs again. The two engines, that failed to get any jobs to execute will start 150 ms later and the last one will wait 200 ms before querying for jobs again and it will get jobs, that are not exclusively locked by any other engine.

So from now on, the overlapping of acquiring jobs is minimal (if any) and all the jobs can be executed as fast as possible.

Read this [blogpost from Thorben](http://blog.camunda.org/post/2015/09/scaling-camunda-bpm-in-cluster-job/) about his measurements in a big cluster scenario.

Also, we add job priorisation feature to the engine. More important jobs gets higher ranks in the acquisition query and will be executed earlier than non important. And the priority can be evaluated dynamically for each process instance.

![Calculate Job Priority](https://docs.camunda.org/manual/latest/user-guide/process-engine/img/job-executor-priority-precedence.png)

Have a look at the [reference](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/job-executor/) or [user guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/)  to find out how to configure your engine in very heavy load scenarios.

