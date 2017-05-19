+++
author = "Malte Sörensen"
categories = ["Execution"]
draft = true
date = "2017-05-18T11:54:56+02:00"
tags = ["Process Improvement", "extension", "Migration"]
title = "New Official Extension: camunda-bpm-migration"

+++

Camunda BPM Migration is a framework for making process instance migration easier. It builds upon the migration functionality introduced in Camunda BPM 7.5. 

This is a great feature enabling the community to boldly go where few men have gone before ;)
Typically, instance migration is avoided like the pest. It's a pain. This feature together with this extension aim to ease this pain.

## What Does the Extension Offer?

Before answering that, let's have a look, at what Camunda already provides.

As you know, Camunda BPM provides the ability to do a migration based on process definition mapping. Still, the migration plans can only be defined for deployed processes. This makes it hard to impossible to define a migration plan on a dev machine, test it as-is on pre-production and then apply it to the live system (except you're a danger seeker, then go ahead, have fun!)

You might have also noticed, that changing variables (names, types, values, locations) is not supported. But how often does a model change lead to new or changed variables? And don't forgetthat the delegates may have changed, too, and thus read or write different variables now.

So, to answer the headline's question, this extension currently offers:

* Deployment independent migration plans
* Lots of options for mapping variables

# But enough talked! Let's see some code!

Let's do a simple migration from v1 to v2.
In this scenario the **User Task "AB"** was split up into two **User Tasks "A" and "B"**.

First, we make sure that the right **Process Definitions** are choosen as **source** and **target**.

```java
  ProcessDefinitionSpec v1 = ProcessDefinitionSpec.builder()
    .versionTag("v1")
    .processDefinitionKey("main")
    .build();
  ProcessDefinitionSpec v2 = ProcessDefinitionSpec.builder()
    .versionTag("v2")
    .processDefinitionKey("main")
    .build();

```

As you can see, instead of specifying a fixed **Process Definition ID**, which changes from server to server,
we use the globally distinct combination of **Process Definition Key** and **Version Tag**.

Next, we define the **mapping** from the source Process Definition to the target Process Definition,
and create a new **Migration Step** out of it.

```java
 MigrationPlanFactory camundaMigrationPlanFactory = (source, target) -> runtimeService
    .createMigrationPlan(source, target)
    .mapActivities("Task_AB", "Task_A")
    .mapEqualActivities()
    .build();

  ModelStep migrateModel = new ModelStep(camundaMigrationPlanFactory);
```

Here we use **Camunda's Migration Plan** to map the old task "AB" to new task "A". 
And because we can't create the Migration Plan without first resolving the Process Definition IDs, an indirection via a **MigrationPlanFactory** is used.

Now we can assemble everything together.

```java 
  MigrationPlan migrationPlan = MigrationPlan.builder()
    .from(v1).to(v2)
    .step(migrateModel)
    .build();
``
You should take here, because the created **MigrationPlan* comes from the extension and **must not confused* with the MigrationPlan from Camunda BPM.

With all these things prepared, we can run the migration at any time.

```java  
  new Migrator(processEngine).migrate(migrationPlan);
```

# finally

Want to see all the gracious stuff? Have a look at the [Userguide](https://github.com/camunda/camunda-bpm-migration/blob/develop/USERGUIDE.md)!

And surely you are interested in the things to come, like

* JSON ex-/import
* Token Beamer: after migrating the model, set the token to a 
* [More stuff here...](https://github.com/camunda/camunda-bpm-migration/issues)

If you have any question, ideas and the like, then you are invited to do this in the appropriate issues or create one of yourselves.
I'm looking forward to your feedback!
