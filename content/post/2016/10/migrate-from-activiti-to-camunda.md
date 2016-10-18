+++
author = "Bernd Rücker"
categories = ["Execution"]
date = "2016-10-19T12:00:00+01:00"
tags = ["Activiti"]
title = "How to migrate from Activiti 5.21 to Camunda BPM 7.5"
draft = true
+++

With the Activiti Core Developers having left Alfresco (the company behind Activiti), the future of the Activiti project is quite questionable. More and more Activiti users want to migrate to Camunda. There are actually very goood reasons to do so, see [5 Reasons to switch from Activiti to Camunda](xxx) and [Camunda Engine Evolution since Activiti Fork](xxx).

Camunda is a fork of Activiti. We actually developed big parts of the engine ourselves before we decided to part ways with Alfresco back in 2013. Hence it is relatively easy to migrate. This post lists the necessary steps to achieve this:


<!--more-->

* For the development project
** Exchange Activiti library with Camunda library
** Adjust package names and some class names
** Check for Activiti features you used that are not present or solved differently in Camunda
* For the runtime database
** Run a database migration script
* Get familiar with Camunda tooling.

Let's go over this step-by-step. 



# Exchange Libraries

Exchange the Activiti library itself. Simply change the Maven dependency from:

```
<dependency>
  <groupId>org.activiti</groupId>
  <artifactId>activiti</artifactId>
  <version>5.21</version>
</dependency>
```

to:

```
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
  <version>7.5.0</version>
</dependency>

```

You might need to add the [Camunda Maven Repository](https://docs.camunda.org/get-started/apache-maven/#community-edition-1) to resolve the Maven artifacts.



# Adjust package and class names

Change all package names in the import statements from `org.activiti.*` to `org.camunda.bpm.*`. This can be achieved by doing an "Organizing Imports" in your IDE.

Some class names has also changed, make sure to adjust them as well. A [complete list of class names changed](https://docs.camunda.org/manual/7.5/update/activiti/#which-activiti-class-names-have-changed) is provided.

Make sure you adjust package and class names in configuration files (e.g., Spring XML) too.



# Check feature differences

We forked from Activiti 5.11. Since then, both project evolved in parallel. Luckily, Activiti developed much fewer new features than Camunda (which is not my personal opinion, but easy to see in [OpenHub statistics](https://www.openhub.net/p/_compare?project_0=camunda+BPM+platform&project_1=Activiti)). However, there are features that are not in Camunda BPM, or requirements we solved differently (a good read about us solving a couple of things differently, for good reasons, is [Camunda Engine Evolution since Activiti Fork](xxx)). 

In this post I do not want to list each and every Activiti feature not available in Camunda. I concentrate on the most common things. If you face any missing feature which turns out to be a show-stopper for you, make sure you contact us, either via the [Forum](https://forum.camunda.org/) for community users or via the [Contact Form](https://camunda.com/about/contact/) if you plan to go for an Enterprise Subscription. So far, we have always found a solution for migration users, either by simple workarounds, by custom plug-ins to the Camunda engine or by adding the feature to Camunda itself.


## Activiti Explorer
The most prominent feature solved differently is the Activiti Explorer. We dumped this component completly, as for us the target user of it was unclear. The Explorer mixes task management, process operations and administration in one tool, which, by the way, was pretty unintuitive. We tested that in various customer scenarios and decided to develop new tools for Camunda. So in our universe you have:

* [Camunda Tasklist](https://docs.camunda.org/manual/7.5/webapps/tasklist/): A tasklist application targeting the end user (we call them: process participants, because they participate in processes during runtime). You can still use Activiti Form fields for auto-generated forms, but you can also leverage [powerful HTML forms](https://docs.camunda.org/manual/7.5/user-guide/task-forms/#embedded-task-forms).
* [Camunda Cockpit](https://docs.camunda.org/manual/7.5/webapps/cockpit/): Tooling for the operator, where you can see all deployed processes, all running instances, history and audit data, reporting and so on. An operator can easily engage in the process by changing data, canceling processes, [migrating versions](https://docs.camunda.org/manual/7.5/webapps/cockpit/bpmn/process-instance-migration/), doing ["token jumps"](https://docs.camunda.org/manual/7.5/webapps/cockpit/bpmn/process-instance-modification/) and so on. Some features can be used in a bulk-fashion, meaning you can also cancel millions of process instances in one go (yes - we do have customers needing these capabilities).
* [Camunda Admin](https://docs.camunda.org/manual/7.5/webapps/admin/): Administration of the engine, including users (if you do not use external user management).

In combination, this replaces the Explorer completely.


## REST API
After the fork we developed a new REST API from scratch, due to glitches in the existing one (which the Activiti team also recognized, they replaced their own REST API with a new one in 5.13). Hence the REST API is different and you have to check all your REST calls. E.g., starting a new BPMN process instance:

[Activiti](http://www.activiti.org/userguide/index.html#_start_a_process_instance):
```
POST runtime/process-instances
{
   "processDefinitionId":"oneTaskProcess:1:158",
   "businessKey":"myBusinessKey",
   "variables": [
      {
        "name":"myVar",
        "value":"This is a variable",
      }
   ]
}
```

[Camunda](https://docs.camunda.org/manual/7.5/reference/rest/process-definition/post-start-process-instance/):
```
POST /process-definition/{id}/start
or
POST /process-definition/key/{key}/start

{
	"businessKey": "myBusinessKey",
	"variables": {
		"aVariable": {
			"value": "aStringValue",
			"type": "String"
		},
		"anotherVariable": {
			"value": true,
			"type": "Boolean"
		}
	}
}
```

Of course, we think that we have the more correct resource-oriented approach :-) Check for yourself in the [Camunda 7.5 REST API reference](https://docs.camunda.org/manual/7.5/reference/rest/).

By the way: We had one customer in the past who developed a small REST facade for Activiti REST calls used, and pointed that to Camunda in the background. Depending on the number of REST clients, this might be a good strategy.


## Core engine features

The following list contains core engine features of Activiti not present in Camunda.

### Query API capabilities

Activiti introduced OR capabilities to the query API. Some query parameters are not there in Camunda, e.g., `TaskQuery.processInstanceIdIn`. Some parameters are present in Camunda, but were named differently, e.g., `ProcessDefinitionQuery.processDefinitionIds` in Activiti is named `ProcessDefinitionQuery.processDefinitionIdIn``in Camunda. 

Normally it is always possible to express the current query at hand by means of the Camunda API, it might involve some small re-writing. [Native Queries](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-engine-api/#native-queries) are always a good joker, as they can be easily leveraged to, for example, express OR conditions.

Feel free to ask for help in the [forum](https://forum.camunda.org/) or via support. 

### Process diagrams

All features around process diagram generation and auto-layouting are solved differently in Camunda. We actually rely on the graphical layout information (so-called "DI" for diagram interchange) being present in the XML. That is always the case if you use a proper modeler to build the BPMN. Then we do not generate any PNG, but we render the BPMN directly in the browser by an embedded [bpmn.io](http://bpmn.io) renderer. This is less error-prone and much more flexible and feature-rich on the front-end (for example, you can render the model yourself and easily [add overlays](https://github.com/bpmn-io/bpmn-js-examples/tree/master/overlays)).

We do have an auto-layouter, but "only" as community extension. It is written in JavaScript and easy to apply: [BPMN Auto Layout](https://github.com/bpmn-io/bpmn-moddle-auto-layout). 


### Core entities, data and other features

We have not introduced neither a `Task.category` nor a `claimTime` for tasks. We have not introduced the [Activiti Events](ttp://www.activiti.org/userguide/index.html#eventDispatcher), so you have to exchange that by Execution Listeners or Task Listeners, CDI events or you might even leverage the [Camunda BPM reactor community extension](https://github.com/camunda/camunda-bpm-reactor). We do not write the `ACT_EVT_LOG` table. 

Camunda does not support definition of data objects. We also do not allow to change the business key of a running instance. We do not have a [DynamicBpmService](http://bpmn20inaction.blogspot.de/2015/10/adding-dynamic-behaviour-to-activiti.html) or a Business Calendar. We do solve [Custom MyBatis Mappers](http://www.jorambarrez.be/blog/2014/01/17/execute-custom-sql-in-activiti/) differently (as you can see in [an example](https://github.com/camunda/camunda-consulting/blob/master/snippets/custom-queries/src/main/java/org/camunda/demo/custom/query/TasklistService.java)). The Process Engine Configurator of Activiti is not required, as Camunda knows [Process Engine Plugins](https://docs.camunda.org/manual/7.5/user-guide/process-engine/process-engine-plugins/).

We do not have a Model repository, as we seperate data required for the engine runtime from design time artifacts, like intermediate models.


## Experimental things and community extensions

Activiti has some features and modules, which are in a very experimental stage (or somethimes also kind of abandoned). At Camunda we have a different view on our core product: Whatever is in the product needs to be stable, maintained and can be supported with 24/7 support. So we draw a clear line between core product and what we call community extensions.

Here are examples of half-baked features not in the Camunda BPM product:

* Business Rule Task with Drools integration. This is limited to Drools and in a very specific manner. We can either call [DMN Decision Tables](https://docs.camunda.org/manual/7.5/reference/dmn11/) or hook in custom code (which could be the Drools implementation of Activiti if you like it).
* Mule Task, Web Service Task and Shell Task: You have too hook in code via a normal Service Task. You might leverage the Activiti code though.
* activiti-camel: Can be replaced by [camunda-bpm-camel](https://github.com/camunda/camunda-bpm-camel).
* Spring Boot Starter: In Camunda there is the [camunda-bpm-spring-boot-starter](https://github.com/camunda/camunda-bpm-spring-boot-starter).
* activiti-jmx: Our core engine already provide some beans for JMX. But actually it is seldomly used in projects, normally the REST API is leveraged.
* activiti-crystallball, activiti-kickstart and some more, which are simply not there (and not yet missed by our users).

## Summary

These were the most important differences. As you can, there are some. *But for 3 years of working in parallel - the differences are not that big and migration is a really doable task.* 

We have had quite some customers migrating from Activiti to Camunda in the past, and none had much trouble in doing so.


# Database migration

Camunda forked from Activiti 5.11. 

## Migration for Activiti <= 5.11 

If you have Activiti < 5.11, upgrade to 5.11 first (by upgrade scripts provided by Activiti). Then run the upgrade script from Camunda 6.2 (the Camunda version based on Activiti) to 7.0 (the first forked Camunda version), see [postgres_engine_6.2_to_7.0.sql](https://github.com/camunda/camunda-bpm-platform/blob/master/distro/sql-script/upgrade/postgres_engine_6.2_to_7.0.sql) for Postgres, scripts for other database are provided in the same folder. 

## Migration for Activiti > 5.11

For migrating newer versions we always check database differences manually for the specific Activiti version at hand. 

For Activiti 5.21 - the current version when the Activiti core team left - we did this procedure for you. If you have an Activiti version > 5.11 && < 5.21, then migrate to 5.21 by the Activiti upgrade mechanism. Afterwards, follow the instructions here.

Basically you have to apply all provided [Camunda upgrade scripts](https://github.com/camunda/camunda-bpm-platform/blob/master/distro/sql-script/upgrade/) from version 6.2 (the last camunda version before the fork) to 7.5. However, you have to take care of some conflicts with changes in Activiti (you can see the changes in the beginning of [this commit](https://github.com/camunda/camunda-consulting/commit/f31ecc94bc825c5702376887b10da4d6b0cf6381) if you are interested in the details).

To make it easy for you, we prepared special upgrade files you can apply without modifications. Make sure you run them in this order (e.g., by command line using ```psql -U postgres -d activiti < postgres-1-upgrade.sql`):

* [postgres-1-upgrade.sql](https://github.com/camunda/camunda-consulting/blob/master/snippets/activiti-migration/scripts/postgres-1-upgrade.sql): Upgrade the database to a 7.5. No need to review this file.
* [postgres-2-migrate.sql](https://github.com/camunda/camunda-consulting/blob/master/snippets/activiti-migration/scripts/postgres-2-migrate.sql): Migrates some tables/columns to be compliant with Camunda database. You might want to have a look to make sure you are fine with the changes.
* [postgres-3-drop.sql](https://github.com/camunda/camunda-consulting/blob/master/snippets/activiti-migration/scripts/postgres-3-drop.sql): Drops unused tables and columns from the database. You should double-check that you do not lose data you rely on.

Note that there are corresponding files for your database [in this github folder](https://github.com/camunda/camunda-consulting/blob/master/snippets/activiti-migration/scripts/). 

After this procedure, your database is a Camunda BPM 7.5 database. Congrats! You can now run Camunda and your runtime data is still there.

*Warning:* This migration script is provided without any warranty. We haven't tested it for all circumstances and you might lose data, especially if you used features not supported by Camunda. Make a backup before applying the migration and verify everything is working afterwards! And let us know if you experience errors.

In case of any trouble, contact us! Our consulting team can help you!


# Optional cleanup

If you have come this far and enjoy a running Camunda installation, you might want to lean back, sip at a hot coffee, and just do the last optional clean-up tasks:

* Rename activiti.cfg.xml file to camunda.cfg.xml
* Update namespace of BPMN XML files. The [Camunda Modeler](https://docs.camunda.org/manual/7.5/modeler/camunda-modeler/) does this automatically for you when opening models with the old Activiti namespace. This step is optional as the engine also reads the Activiti namespace to ensure backwards compatible capabilities.


# Enjoy!

Great - you made it. We welcome you as a new Camunda user! Despite already mentioned Camunda Tasklist, Cockpit, Admin and the REST API, there is a lot more to discover, e.g.:

* [Camunda Modeler](https://docs.camunda.org/manual/7.5/modeler/camunda-modeler/) - a superb modeling tool to model standard compliant BPMN, CMMN and DMN.
* [Camunda Engine Evolution since Activiti Fork](xxx)
* [CMMN](https://docs.camunda.org/manual/7.5/reference/cmmn11/) for Case Management
* [DMN](https://camunda.org/dmn/tutorial/) for Decision Management
* [Container Management Platform](https://docs.camunda.org/manual/7.5/introduction/architecture/) gives new architectural possibilities
* ...

Enjoy!