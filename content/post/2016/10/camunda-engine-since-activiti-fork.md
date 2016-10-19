+++
author = "Daniel Meyer"
categories = ["Execution"]
date = "2016-10-19T12:00:00+01:00"
tags = []
title = "Camunda Engine Evolution since Activiti Fork"
+++

The [future of the Activiti Open Source project](http://www.bpm-guide.de/2016/10/17/5-reasons-to-switch-from-activiti-to-camunda/
) is currently uncertain. Camunda split from the Activiti project in 2013. Since then, we maintained [our own open source fork of the original Activiti Codebase](https://github.com/camunda/camunda-bpm-platform).

The objective of this post is to illustrate the diverging directions the two projects have taken and to serve as input for users who now consider [migrating from Activiti to Camunda](/post/2016/10/migrate-from-activiti-to-camunda/). The first part focuses on two key topics: core BPMN Execution and the persistence layer. For me, **after all the feature talk and the marketing-hurrah is said and done, BPMN and persistence is where the meat is**. In the second part, I compare the current state of the Camunda codebase to the (unreleased) Activiti 6.
<!--more-->

*Two caveats: 1) obviously, I am biased here. 2) In this post I compare the two projects Camunda and Activiti. I point out certain areas where Activiti has failed to drive the code base forward in the same way that we have. This is not meant as a personal insult to the engineers who have been working on Activiti nor the community behind it. After this long period of time, the state of these projects is much more a reflection of Alfresco's vs. Camunda's business strategy than of the work people on both projects have been putting into it.*

# Simplified yet much more Powerful Core  

Contrary to Activiti, we at Camunda have evolved the core of the engine to the point that it now offers

* [Almost Full BPMN Coverage](https://docs.camunda.org/manual/7.5/reference/bpmn20/),
* [Process Instance Modification](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-modification/), [Process Instance Migration](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-migration/) and [Start Process Instance at any Activity](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-engine-concepts/#start-a-process-instance-at-any-set-of-activities).
* [Asynchronous Continuations after Activities](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#understand-asynchronous-continuations),
* [Activity Instance Ids (proper identity for an instance of an Activity / Flow Node)](https://blog.camunda.org/post/2013/06/introducing-activity-instance-model-to/)
* Common behavior shared with the [CMMN engine](https://docs.camunda.org/manual/7.5/reference/cmmn11/).

To give you a little more context:

For the last three and a half years (after the fork), we have been shaping the core of the engine (formerly known as the PVM) into something that is powerful and easily manageable.

Take fundamental BPMN concepts, like interrupting events vs. non-interrupting events, or multiple instances. When we started out, they were either not implemented at all or implemented very poorly outside of the core engine. As a result, the codebase was hard to maintain and it was exceedingly difficult to implement new BPMN constructs. In 2012, [I, myself implemented BPMN Compensation, Messages and Signals, Transactions, Event Subprocesses and Event Based Gateways in Activiti 5.9](http://processdevelopments.blogspot.de/2012/03/activiti-59-is-big-leap-forward.html) and some other constructs in 5.10 and 5.11. Reviewing release notes **I could not find any additional BPMN element type that was implemented by Activiti** since my [last commit](https://github.com/Activiti/Activiti/commit/c53167096cfc1daffd74476d1163ca3bd036bd71) in 2012.

At Camunda, our users have pushed us to implement almost all BPMN constructs as you can see in our latest [coverage map](https://docs.camunda.org/manual/latest/reference/bpmn20/). To get to this level of coverage, **we had to re-shape many core engine concepts such as parent / child relationships, interrupting scopes or starting executions concurrently in the same scope**. [Our post on Multi Instance speaks for itself](https://blog.camunda.org/post/2015/06/why-we-re-implemented-bpmn-multi/). We introduced these BPMN concepts so that all elements having the same behavioral aspects are able to use the same core functionality. Commits [like this one](https://github.com/camunda/camunda-bpm-platform/commit/8a33d5037dd11181430cea8d9f775a65e5322ce1) are the result of intense whiteboard sessions and pair programming. Once we had achieved this, we could start [deleting broken and complex code](https://github.com/camunda/camunda-bpm-platform/commit/046055328d0ee385767237d5afb2cb4a6023b729). 
I guess you are on the right track when you can fix bugs by simply removing code.

We built features like [Process Instance Modification](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-modification/), [Process Instance Migration](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-migration/) and [Start Process Instance at any Activity](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-engine-concepts/#start-a-process-instance-at-any-set-of-activities). 
That was when all the work really started to pay off.
The engine core has become an elastic thing that can be bent in different directions. We can do things that we did not think possible before, and we can do them easily.

The power and possibilities emerging from this cannot be explained at a text level.
Therefore, lets look at how these concepts are exposed in the UI.

Process Instance Modification:

{{< img src="http://4.bp.blogspot.com/-rZ_WJwqplJ4/VWczW-p6MvI/AAAAAAAACVU/nLtw4W7POyA/s1600/modification.gif" >}}

[Process Instance Modification](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-instance-modification/) allows us to repair process instances while they are running, and jump back or skip ahead within a process instance.

The next video showcases Process Instance Migration:

<figure class="">
  <div class="wrapping">
    <video width="100%" height="100%" autoplay="" loop="">      
        <source src="/post/2016/05/camunda-bpm-750-released/migration.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
  <figcaption>
    <p>
    Composition of Migration Plans in Camunda Cockpit       
    </p> 
  </figcaption>
  </div>
</figure>

You can define a mapping between the process on the left and the process on the right. Large numbers of process instances can be batch migrated from left to right.

Providing these features in a way that the user can create mappings, and "drag around tokens" in a UI, requires an engine that provides functionality for every combination of BPMN constructs. 
For example: what happens when you drag a token into a Multi Instance Activity? Or when you drag it out on top of a boundary event that cancels the scope of other activities?
We are proud to say that the Camunda engine can do all of this, and more. 

# New Persistence Layer

Contrary to Activiti, Camunda offers:

- A robust, completely rewritten Persistence Layer,
- Advanced Deadlock Prevention,
- Pluggable Backends (RDBMS, [Cassandra](https://github.com/camunda/camunda-engine-cassandra), Hazelcast distributed Cache),
- Goodies like write-Only Savepoints.

To tell you the truth, at the beginning we were not sure if it could be done at all.
In 2014, an increasing number of Camunda users were complaining about deadlocks. They were using Camunda in high load, highly concurrent scenarios. The root of the problem was our homegrown persistence layer. It flushed SQL UPDATEs and DELETEs in the same order in which they were being issued by the upper layers of the engine. One transaction flushed updates to a pair of entities in one order, and a concurrent transaction did the same in reverse order. This lead to deadlocks which were hard to spot and nasty to debug.

{{< figure class="main teaser" src="https://camunda.org/assets/img/scalability/deadlock.png" >}}

As a result, [we rewrote the persistence layer](https://github.com/camunda/camunda-bpm-platform/commit/1fefb8f77c489f7ff5f8776281ca102a567e1163), introducing the `DbEntityManager` classes. This enforces consistent flush ordering to ensure that whenever two transactions work on the same set of entities, updates and deletes are executed in the same order. Right away, deadlocks originating in this area stopped. At the same time, the burden on the upper layers of the engine code to submit UPDATEs and DELETEs, in an order that does not violate foreign key constraints, was removed. The `DbEntityManager` now computes the flush order on its own.

As far as I can tell, **Activiti has done no comparable refactoring, and flush ordering is still more or less left to chance. When using Activiti, intra process instance transactions still deadlock under high concurrency.**

Feel free to thoroughly inspect Camunda's [entity manager package](https://github.com/camunda/camunda-bpm-platform/tree/master/engine/src/main/java/org/camunda/bpm/engine/impl/db/entitymanager).
Since we rewrote it, we have only fixed a handful of bugs and implemented a few minor features. That's it. The reason for this is our engineering spirit: we strive to build simple and clean solutions that are representative of the problem they solve.

# Different Priorities

To be fair, a lot of good work has been done in Activiti. They have rewritten **XML parsing** and transformation. While this is certainly important, we focused our efforts in other areas that are really key to how a workflow engine works.

# Activiti 6?

About one year ago, the Activiti team announced that they were working on a new version of their code and that, finally, they would address some of their fundamental problems. I do not know what the status of that project is. Now that the principal Activiti engineers have split from the project its future is probably highly uncertain. 
**At Camunda, we have long made these changes and delivered the value years ago**. 

I'll refer to this [blogpost](http://www.jorambarrez.be/blog/2015/09/08/activiti-6-an-evolution-of-the-core-engine/) which names 4 problems addressed in Activiti 6. 
I'll walk through them briefly and comment on how (and why) this has already been addressed in Camunda:

* **Problem 1: Model Transformation**: A workflow engine typically transforms the BPMN XML input into an internal representation. The blogpost states that this internal representation is not sufficiently aligned with the BPMN structure in Activiti 5. (*It then gives an example which I do not completely understand, because it is very BPMN-unlike for a Service Task to choose an outgoing sequence flow (Rather, the Sequence Flows have conditions which work on data. It is not the Service Task that "chooses" an outgoing sequence flow but the conditions need to be evaluated, and the ones that are true are used to leave the activity. In this case, either the sequence flows have no conditions, which makes the BPMN model invalid, or the conditions are ignored by the engine which makes the engine non-compliant.*).
I believe that the argument made goes to the fact that in Activiti 5, the structure of the model representation is not in-line with the actual BPMN structure. For example, in Activiti 5, Boundary events are nested inside the scope to which they are attached, while in BPMN they are part of the parent scope. This turns into all kinds of problems when you try to execute them. See [this](https://github.com/Activiti/Activiti/blob/master/modules/activiti-engine/src/main/java/org/activiti/engine/impl/bpmn/behavior/BoundaryEventActivityBehavior.java) which works in combination with [this](https://github.com/Activiti/Activiti/blob/master/modules/activiti-engine/src/main/java/org/activiti/engine/impl/persistence/entity/ExecutionEntity.java#L506-L606) and [also this](https://github.com/Activiti/Activiti/blob/master/modules/activiti-engine/src/main/java/org/activiti/engine/impl/pvm/runtime/AtomicOperationTransitionDestroyScope.java). 
In Camunda, we have made this change about 2 years ago. As a result, we have this [awesome implementation of the Boundary Event](https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/main/java/org/camunda/bpm/engine/impl/bpmn/behavior/BoundaryEventActivityBehavior.java).

* **Problem 2: Execution Tree**: The Activiti 6 Blogpost states: *"One of the core goals when starting with version 5 was to get the number of inserts to the database as low as possible. Which we did: we (over) optimized and reused execution entities (the representation of a process instance that is executed) as much as possible."* 
This is true. This is Tom Baeyens' legacy, the original creator of Activiti and JBPM, and the mastermind behind these engines.
It then goes on to state that Activiti 6 puts a simpler model forward, which is not as highly optimized but easier to handle, and to inspect by engine engineers and users. The post further states that *"[This] is crucial if you want to do dynamic process definitions and/or instances without hacking"*. I do not know what "dynamic process definitions" means. Maybe something like Camunda's Process Instance Modification? 
In Camunda we have built these things (without hacking) while keeping the optimizations. Again, the key to this was to evolve the core in a way that everything is addressed correctly.
I assume that **Activiti 6 will be slower** in certain situations.

* **Problem 3: Competing Stacks of Operations**: The post states that the way the Activiti engine is built makes it impossible for it to execute some patterns (*"certain patterns cannot be executed on the v5 engine"*). I am sorry to say, that I don't get this. The post does not specify which patterns are meant. Maybe it goes to the example further down: a subprocess with a boundary event with two outgoing sequence flows. This [Bug](https://app.camunda.com/jira/browse/CAM-1730) was fixed in Camunda 7.1 (released March 2014).

* **Problem 4: Persistence Code**: I have already discussed Camunda's rewritten persistence layer. 
The Activiti 6 blogpost states that in Activiti 5 the code is not as nice: *"persistence code has gone everywhere"*, and that this *"makes it impossible to swap out the persistence layer with a custom implementation"*. It says nothing about deadlock prevention. 

Also, the referenced Blogpost shows an example which leads to a stack overflow in Activiti 5. This [Bug](https://app.camunda.com/jira/browse/CAM-4172) was fixed in Camunda 7.4 (Released in November 2015). It is still present in Activiti.

All of this leads me to the conclusion that even if Activiti 6 gets released (a big maybe), the **Camunda engine is miles ahead of it**.

For us at Camunda, moving the codebase forward is a natural and ongoing process. We did and are still doing this in a way that allows our users to have new features and crucial bugs fixed without any disruption. There was no specific point in time where it occurred to us to increment the major version number of the project. That's just not how we work, and how we want to work.

# Summary

In this post I showed the paths that Activiti and Camunda have taken, based on two examples (BPMN Execution and Persistence). 
Activiti promises some changes for the better with the unreleased version 6. 
That is commendable, but they are playing catch-up at best. The benefits that they promise are already long here today in Camunda.
We invite all remaining Activiti Users to evaluate their options. And after doing so, we welcome you to [join](https://forum.camunda.org/) our efforts in building the best open source Workflow technology.
