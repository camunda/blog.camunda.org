+++
author = "Niall Deehan"
categories = ["Community"]
date = "2020-04-16T08:00:00+01:00"
tags = ["orchestration", "deployment"]
title = "How to choose the right Camunda architecture."
+++
{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/process-migration/choose-deploy.png" alt="Camunda Distro" >}}

## Decide on the Granularity of your orchestration.

Probably the most important choice you need make about how to use camunda revolves around the level at which you want to orchestrate. You could also think of level as the granularity at which camunda will operate and this often is directly related to the complexity of the communication to what you want to orchestrate. The choice you make here will directly impact how deployment works, how best to maintain your system, error handling and even performance - so it deserves careful thought.

<!--more-->

To simplify things, I'm going to describe two distinct categories which will help you understand the choice you need to make. These are:
__Orchestration of distributed services__
__Orchestration within self-contained systems.__

## Orchestration of distributed services

If most of the following are true of your proposed or existing system then you’re best placed to use camunda as a distributed service architecture:

- Services are individually deployed and versioned from each other and the process
- Services are written in different languages.
- Services can sometimes run asynchronously
- Services can be long-running ( > 10 mins)
- Services have a high degree of independence regarding technologies used
- Services often perform more than one function. Usually a scope of functions within a context.
- Primary communication is done through network protocol (REST etc.)
- These services are likely to subscribe to, or pull work from, an existing system

In this case, Camunda is treated more as an __architectural component__ than just a library. It is also treated distinctly and independently from the services it orchestrates.

Each process deployed to camunda could span multiple contexts and services, often with the goal of being able to visualize, manage and improve operations across a network of services.
All communication to the engine from the services is done through the REST API and, most of the time, the External Task pattern is the main way this is implemented.

## Orchestration within self-contained systems.

In some cases the overhead of individually deploying and maintaining each service is more trouble than it’s worth and it can be more beneficial and easier to keep all your related services together in one place. The “services” in this case tend to look very different from the distributed example, so if the following apply, you’re better to apply Camunda as an additional library:
- Services have a single low-level function
- Often run synchronously in a single transaction when called
- Services are often java classes (or similar granularity)
- Services are tested and deployed together, sharing the same release cycle
- Services share the same language
- These services are called directly as needed by the systems that require their service
- All services are maintained together, often by the same team

In this case,  the Camunda engine is actually treated like an additional library rather than an independent service. Specifically the engine cares about the state transition between the java classes - able to hold state, route the process and perform error handling that would otherwise be embedded functionally within the services.  Each process is limited to the functions available locally and, in this architecture, there may be many self-contained components each containing their own engine, processes and services that are unaware of each other.

## Using Java

The Camunda engine itself is written in Java, but that doesn’t mean that using or even knowing Java is required in order to utilize the engine. You’ll be able to build, deploy and operate processes using Camunda without needing any Java knowledge.

That said, there are benefits from knowing and utilizing Java as your primary business logic language:

- __Testing__ - Testing processes in Camunda is much, much easier using Java. The JUnit libraries that Camunda suppliles makes testing cleaner and easier to build.

- __Extending the Engine-__ As an open source company, Camunda is lucky enough to have a community that frequently contributes back to the project. This is done through extensions which can be attached to the engine.

- __Accessing the Java API__ - While Camunda does have an extensive REST API, using the engine’s native Java API gives you the ability to do a lot more.

## Deploying __to__ Camunda vs Deploying __with__ Camunda

Deploying a Camunda process just means giving Camunda a processes model  that allows you to start an instance of that process. Generally you can do one of two things.

### Deploying __to__ Camunda

In this case, the Camunda instance and the processes are hosted and maintained independently. It could also mean that many different teams are all deploying their projects to the same engine. Deploying a process can happen in two ways

- __Deploy via REST:__ you can simply use Camunda’s REST API to send the process model to the engine. This is often done for the External Task Pattern or in cases where the model is not dependent on any local artifacts (e.g. Java Classes)

- __Deploy via Process Application:__ In this case you would locally build and compile an application containing your process(es) and any other required artifacts and then deploy that to the same application service that contains the engine. The engine will automatically deploy what it finds in the application

## Deploying __with__ Camunda

This kind of deployment is utilized when there are no issues around keeping and maintaining the engine, processes and artifacts in one place. Usually in this case the engine is being used for a single project and often by a single team.

- __Deploy on startup__: All required artifacts are in the same place (often a spring boot application), so when the application is started it will automatically find the process models locally and deploy them to the connected datasource. There isn’t often an additional step beyond simply starting up the application.

## Camunda distribution options

Ready to get up and running on Camunda? Here are links to the distributions that I just finished discussing.

### Camunda BPM Run (codename: lil’ Camboot)
- You want to orchestrate distributed services
- You don’t want to have to use any Java
- Deploy your processes that don’t have local dependencies.
- [https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run/](https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run/ )


### Camunda Spring Boot Starter
- You want to orchestrate local services
- You’d like the option to use Java
- A single team or project is used per engine
- [https://start.camunda.com/](https://start.camunda.com/)
- [Follow this tutorial](https://youtu.be/sHgf_EsQzfc?list=PLJG25HlmvsOUnCziyJBWzcNh7RM5quTmv ): https://youtu.be/sHgf_EsQzfc?list=PLJG25HlmvsOUnCziyJBWzcNh7RM5quTmv

### Camunda Tomcat Distribution
- Don’t mind using Java if needed
- You want to orchestrate local services and/or distributed services
- Many teams and projects are intended to share the same engine.
- [https://camunda.com/download/](https://camunda.com/download/)
- [Follow this tutorial](https://youtu.be/HxtZf5VD6lQ?list=PLJG25HlmvsOUnCziyJBWzcNh7RM5quTmv ): https://youtu.be/HxtZf5VD6lQ?list=PLJG25HlmvsOUnCziyJBWzcNh7RM5quTmv
