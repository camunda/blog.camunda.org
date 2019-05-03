+++
author = "Bernd Rücker"
categories = ["Community"]
tags = ["Execution", "Tasklist", "Troubleshooting"]
date = "2019-04-15T15:00:00+01:00"
title = "Class Not Found? There’s a simple solution"
+++

Generali Switzerland deployed Camunda BPM to production in less than six months, with no prior BPMN knowledge. You’ll find some more details about it in this [case study](https://camunda.com/case-studies/generali-switzerland/). But integrating and deploying a new tool into your own technical environment is never entirely smooth sailing. In this blog post, we share how Generali’s engineering team was able to troubleshoot issues around running multiple workflow engines in their microservices architecture. You might also want to watch [Generali’s presentation at CamundaCon 2018](https://www.youtube.com/watch?v=Nx4I8lNMUs0).

<!--more-->
### Deploying to Generali’s microservices stack
Generali is one of the world’s largest insurance companies, operating in 50 countries to serve around 57 million customers with an extensive line of products in the Life, Property and Casualty segments. Generali Switzerland, the Swiss arm of this global insurance leader, employs 1,800 staff, operating from 56 locations within Switzerland, to serve around 1 million customers.

IT operations are run on-premise on a custom-built platform known internally as the Connection Platform (CoPa). This platform is built on Apache Kafka and runs in Docker containers, orchestrated with OpenShift. Most microservices in the CoPa are Spring Boot applications written in Java. The entire platform is scalable and agile.

{{< figure class="no-border teaser" src="1.png" alt="image1" >}}

### Understanding classloading and the impact on microservice boundaries
Christian Nicoll, Generali Director of Platform Engineering and Operation, said: “I think generally the integration of Camunda into our Connection Platform was straightforward. However, there was one exception in the way we deployed Camunda. Our approach of deploying into various microservices came with some limitations about how we designed our processes to mitigate asynchronicity issues.”

{{< figure class="no-border teaser" src="2.png" alt="" caption="" >}}

The first stumbling block was starting a new process. The process definition itself is deployed on the Camunda database, but the associated source code and UI components (HTML files) are present only in the CoPa microservice classpath. So, the user would log into Camunda tasklist, a web app running in its own VM, and try to start a process. However, the HTML files could not be resolved on this VM, as they are only present in the right CoPa microservice itself.

A possible solution could have been to use a [type of form](https://docs.camunda.org/manual/latest/user-guide/task-forms/#embedded-task-forms) that allows the form itself to be deployed in the database too. However, that would just postpone the underlying problem, as users would wind up with a ClassNotFound exception, because Java classes referred to in the process were again not present in the classpath of Camunda tasklist.

{{< figure class="no-border teaser" src="3.png" alt="" caption="" >}}

### The power of asynchronous continuations

The engineering team discovered that, when running on the CoPa, they have to switch to [asynchronous continuation](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#asynchronous-continuations). Now, when a process instance hits an activity where asynchronicity has been enabled, the transaction gets committed before executing anything else.

Generali configured their first activity to be [asynchronous before](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#understand-asynchronous-continuations), to use that mechanism. As a general rule of thumb we recommend configuring the start event of your workflow to be asynchronous before.

{{< figure class="no-border teaser" src="4.png" alt="" caption="" >}}

What happens is:

- An entry in the Camunda job table is created, which will be picked up by the Camunda Job Executor.
- All Camunda engines are configured to act “deployment aware”, meaning that they only execute jobs that make sense in the current engine.
- This means that the Camunda Tasklist does not execute jobs for the various CoPa microservices, instead the job is simply queued in the database.
- And finally, the job is executed in a thread belonging to the job executor of the right CoPa service, which can resolve all necessary resources in its classpath.

{{< figure class="no-border teaser" src="5.png" alt="" caption="" >}}

However, Generali did not want to store HTML in the Camunda database, so they still had to solve the problem of accessing the forms from their Camunda tasklist. They used a simple reverse proxy to solve this. Once the Camunda web app receives a resource request, it is forwarded to a URL specific to the right CoPa microservice. This URL can properly resolve the HTMl form.

### Getting help!

As an open source platform, we believe sharing knowledge and code benefits everyone. If you’ve hit a bump in the road, come talk to us and the global Camunda community on the [Camunda Forum](https://forum.camunda.org/). We can help you find solutions, and you might discover that someone has already experienced and solved your particular issue.
