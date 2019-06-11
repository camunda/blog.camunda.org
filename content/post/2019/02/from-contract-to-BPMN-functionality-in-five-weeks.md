+++
author = "Charley Mann"
draft = false
categories = ["Community"]
tags = ["BPMN"]
date = "2019-02-04"
title = "From contract to BPMN functionality in five weeks"
+++

"Functionality has been contracted. User acceptance testing is in five weeks. Is it a big deal to implement it?"

What do you do when you’re handed a project with an incredibly tight deadline? This is exactly where SynerTrade found itself – with just five weeks to deliver a seriously complex approval workflow for a global financial client.

<!--more-->

Andrey Shchagin, Lead Software Architect at SynerTrade, Berlin, spoke at our latest Berlin Camunda User Group meetup: Microservices and Messages. He shared his recent experience of being tasked to implement an approval workflow for an invoicing application, based on a microservices architecture, which was already in production – within a five-week window. Aside from the tight timescale, there were other constraints:

* The approval chain needed to be partially transferred from ERP (SAP), but there was no direct access
* SynerTrade didn’t know how often the conditions would change
* Plus, the client needed flexible and reliable solutions which could be easily reused or altered

There were three available routes to solve the approval workflow problem:

* **Reuse a proprietary workflow engine, implemented on a monolith.** However, a proprietary solution wouldn't account for the more than 1,200 settings it could encounter. In addition, it would be too tightly coupled with the database and decoupling would prove tricky.

* **Reuse a BPMN-based solution from a monolith.** This would mean that the workflow wouldn't be tightly coupled, but lack documentation - essential for a financial business. The tight five-week timeframe also worked against this implementation, which would require major refactoring.

* **Integrate a new framework.** A step into the unknown, but importantly, it would give SynerTrade more control over functionality. The solution would support BPMN, integrate with the microservices environment and be reused and repurposed as needs arose.

Opting for the greater functionality and flexibility that integrating a new framework would allow, Andrey and his team deployed Camunda as an extension to the SpringBoot microservices layer, deployed on Kubernetes, integrated with  the existing monolith.

On the first approach, the team structured the workflow process to convert the approval chain data into DMN, and then upload the DMN table into the system.

However, offering too much functionality to users can lead to unexpected results. SynerTrade's developers discovered that DMNs generated from the production environment produced an overhead of 11GB in just one day.

Instead, a consultation session with Camunda turned the workflow process on its head by refactoring the code and delegating the sourcing of approval information to the XLR8 database through service tasks, with no need to import data.

Was it a success? Well, in just five weeks SynerTrade had a release-ready product. With integration packaged in the library, it can be reused on demand. It is also immensely scalable - the invoicing container remains stateless and the database is deployed in a separate container, that can be clustered. In addition, throughout the go-live there was minimal impact on the existing microservices structure and just one new database container was added.  

### Want to hear more interesting use cases?
We believe that exchanging ideas and learning about other user experiences is a great source of knowledge for everyone. We truly value our awesome open source community who has taken the initiative to organize regular Meetups to discuss the industry's latest developments, share code, present company use cases and talk about Camunda's product contributions.

There are already a variety of Meetups organized by community members worldwide to share insights on workflow automation, microservices, business process management and other industry topics. Whether you are a developer, architect, IT manager or just interested in the field, you are always welcome to join! Here you can [find a Camunda Meetup group close to you](https://www.meetup.com/topics/camunda/).  
