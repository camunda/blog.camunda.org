+++
author = "Jan Galinski"
categories = ["Execution"]
date = "2016-02-08T10:00:00+01:00"
tags = ["extension"]
title = "Event based process applications with camunda-bpm-reactor"
+++

We are proud to announce the release 1.0 of [camunda-bpm-reactor](https://github.com/camunda/camunda-bpm-reactor). 
This community extension brings the power of [projectreactor.io](http://projectreactor.io/)'s event bus to the Camunda world.

<!--more-->

## Why could this be useful for your project?

In the past we often encountered situations, where we use delegate listeners in our executable process models that are not specific for
a special activity but merely describe an aspect of a group of activities. The primary example would be creation of user tasks.
If you use dynamic calculation of candidate groups, priority and due date, have to add a listener on the "create" event for every single task.
Most of the time these implementations only differ in small details, but generally use a common code base.

Using an event/subscribe mechanism decouples the concrete process model from the implementation. All tasks that are created fire a "task created" event and you can provide one central implementation that deals with this aspect. 

Another example would be audit trails. We use multiple empty intermediate events in our processes that document process milestones or provide KPIs. With an event based approach, you can simply register one execution listener with the engine that automatically write log entries and key values when reached.
 
## What is the concept behind it?

The approach chosen is very similar to the cdi-observers that are already present for the engine-cdi extension. Camunda supports
engine plugins that allow you to register ParseListeners. Those listeners are triggered when the model xml is read into the Camunda
engine at deploy time. 
The camunda-bpm-reactor extension provides such a plugin that then registers a DelegateListener for every parsed model element and for
every possible event. These delegates have a very simple implementation: take each execution delegate (task, execution, caseExecution) and
publish it to a synchronous eventBus provided by the reactor framework.
If you are interested in any of those events, in your custom code, you yourself then register a delegate listener with the concrete
implementation (determination of candidate groups for example) to the central bus singleton. Thus your custom code gets executed when
the model element is executed, again, for example, when a task is created.
 What's different with the reactor approach compared to other event-subscriptions you might know, is that you can subscribe on a
 special topic which allows you to created listeners that are triggered whenever something happens on the engine, whenever something
 happens in a certain process or whenever something happens for a certain model element type. 
 
 
## How do I use it?

The extension is published on maven central, so if you are using maven, just add the dependency accordingly:

```xml
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-reactor-core</artifactId>
  <version>1.0</version>
</dependency>
```

Let's have a look at a small example. First register the plugin in your engine configuration:

```java
processEngineConfiguration.addProcessEnginePlugin(CamundaReactor.plugin);
```
    
This creates a synchronous eventBus and registers delegate listeners to every parsed element.

Now implement a task listener that should set candidate group for every user task in "process_a":

```java
@CamundaSelector(event = TaskListener.EVENT_NAME_CREATE, 
               process = "process_a")
public class AddCandidateGroupTaskListener implements TaskListener {

 @Override
 public void notify(DelegateTask task) {
    task.addCandidateGroup("my_group");
 }
}
```

Now, register that listener to the Bus:

```java
CamundaReactor.eventBus().register(new AddCandidateGroupTaskListener());
```
   
That's all you need to do. When "process_a" is deployed, the parse listener adds the event publisher to the model and when the process
instance is executed, for every user task in "process_a" that is created, an event is fired  and your custom task listener gets notified,
causing the addCandidateGroup statement to get executed.

For more examples and in depth implementation details about the event topic subscription, have a look at the README on GitHub and the 
open source code.

## Where do we go from here?

We built the extension to work with a very minimal engine setup, just use your every day in memory H2 engine and you are good to go.
For "enterprise" setups, it would be nice to have an automatic subscription, so next steps will definitely be support for spring and
cdi, so you do not have to provide any glue code yourself, just annotate the listeners.

Another idea might be to wrap the Camunda message correlation mechanism with bus events and provide implementations for inter-process 
communication with signals and messages via events.

We hope you will find this extension as useful as we do, it was developed in parallel to a PoC customer project. It should work out of
the box for most use cases, but if you find a case that is either not supported or miss a feature, let us know via git hub pull request or
issues.

---

This is a guest post by Jan Galinski, creator of camunda-bpm-reactor. Jan is working as a senior consultant for [Holisticon](https://www.holisticon.de/) in Hamburg.
