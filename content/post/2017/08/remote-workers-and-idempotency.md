+++
author = "Bernd Rücker"
categories = ["Execution"]
tags = ["External Tasks"]
date = "2017-08-04T12:00:00+01:00"
title = "Remote workers  and idempotency"
+++


In Camunda there is a concept called External Tasks. See [External Tasks allows new Use Cases with Camunda BPM](https://blog.camunda.org/post/2015/11/external-tasks/) or [External Tasks in the docs](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/). The basic idea is simple: Camunda does not actively call a service (which would be PUSH), but worker fetch work items queued for them (PULL). Whenever a worker finishes his work item, he reports completion back to Camunda. 



Workers can use the Java API, but most often leverage the REST API, as this allows to run workers as own process. This again allows to scale the workers independently and use whatever language you like to implement them. Also it allows on-premise workers in your private network access a cloud hosted engine. 
Whenever you are talking REST over the wire, you don’t have transactional guarantees. Why is this important? Let’s look at an example:

{{< figure class="teaser no-border" src="idempotentWorker.png" alt="Failure scenarios of remote workers" caption="Failure scenarios of remote workers" >}}

Your worker fetches some task which gets locked for him exclusively. But the resulting data gets lost in the network. Now there is a task locked on the Camunda side which will not be processed, as the worker didn’t get them. This is not a big deal as you just have to wait for the **lock timeout** (configured in Camunda), then the tasks will be handed over to the next worker.

Now let’s assume your worker got the task data, performed the work and calls the complete method, which fails due to network problems. Now you cannot differentiate if the call came through and the task was completed in Camunda (and the workflow moved on) — or if the task was not completed on the Camunda side. So it is not a good idea to rollback the workers work — because if the task was marked as completed the work will never be carried out. You can retry the call to Camunda but you might face a longer network outage. In this case **the best strategy is to ignore the problem**. If the task was completed everything is fine, if not, the worker will get the work again (after the lock timeout). But this means **you have to make the service your worker calls idempotent, or add some logic in the worker for de-duplication**.

A similar problem might arise when you start a new workflow instance. If this fails you cannot know if the workflow was successfully kicked of — or not. This time you have to make the workflow instantiation procedure idempotent. Currently there is no out-of-the box feature for this in Camunda, so you have to take care yourself. 

Typical strategies are:

* Set the so called **businessKey** in workflow instances and [add a **unique constraint** on the businessKey field in the Camunda database](https://docs.camunda.org/manual/latest/user-guide/process-engine/database/#business-key). This is possible and you don’t loose support when doing it. When starting the same instance twice, the the second instance will not be created due to key violation in this case.
* Add some check to a freshly instantiated workflow instance, if there is already another instance running for the same data. Depending on the exact environment this might be very easy — or quite complex to avoid any race condition.

That’s it. I hope you are now aware why your services need to be idempotent and how you should deal with network problems when calling the Camunda REST API. Think about an idempotency strategy when starting workflow instances. While all this might sound like a lot of things to take care of, it is just every days life in distributed systems :-)