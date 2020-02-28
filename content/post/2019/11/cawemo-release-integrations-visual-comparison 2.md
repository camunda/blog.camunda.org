+++
author = "Mike Winters"
draft = false
categories = ["Modeling"]
tags = ["Cawemo"]
date = "2019-11-14"
title = "Cawemo Release: Modeler and Engine Integrations, Visual Diagram Comparisons, and More"
+++

This week’s Cawemo release for both the SaaS and on-premises editions introduced new capabilities for all types of users. If you’ve already seen the presentation from CamundaCon 2019 [“It’s All About People: Collaboration with Cawemo”](https://www.youtube.com/watch?v=AktOF_Hsgzo&feature=youtu.be), then you’re probably familiar with these updates–and if you’d like to see the features demoed in a real-world scenario, then the presentation recording is a great resource for you.

In the rest of this post, we’ll discuss how Cawemo’s new features enable more seamless collaboration between engineers, business analysts, and everyone in between. 
<!--more-->

Note that many of the features covered in this post are only available in Cawemo Enterprise. 

For access to a Cawemo Enterprise trial, you can get in touch with us via the contact form available at [https://camunda.com/products/cawemo#contact](https://camunda.com/products/cawemo#contact). 


### Visual Diagram Comparisons For Transparent Collaboration

Visual Diagram Comparisons are foundational to this Cawemo release. This includes the ability to visualize and help a user make sense of changes made from one version of a model to the next. 

During the modeling process, it’s common for many different users–some or all of whom might be located in different offices and time zones–to give input and propose changes to a model. 

Imagine you’re a collaborator who’s signing back onto Cawemo to catch up on edits your teammates made to the first draft of your model. Rather than, say, having to open two different browser tabs then switch back and forth between model versions to piece together what’s changed (or worse: comparing two XML files), Cawemo’s visual comparison features make the changes immediately evident. 

Newly-added elements are highlighted in green, and existing elements that were changed are highlighted in yellow.

{{< figure src="Cawemo-Diffing-1.png" alt="Cawemo's new visual comparison features">}}

And hovering over an edited element will spawn a tooltip with a description of what changed. 

{{< figure src="Cawemo-Diffing-2.png" alt="Cawemo's new visual comparison features">}}

In short, visual comparisons make it possible for teammates working together in Cawemo to quickly get important context as a model evolves from one iteration to the next and to collaborate more effectively.


### Modeler and Engine Integrations For End-To-End Model Visibility {#modeler-and-engine-integrations-for-end-to-end-model-visibility}

A BPMN process model might start in Cawemo, but that’s rarely the only place it lives. 

Imagine a scenario where a developer exports a model from Cawemo to BPMN 2.0 XML, then opens it in [Camunda Modeler](https://camunda.com/products/modeler/) to update properties and make the model executable by the Camunda engine. The developer _also_ makes a couple of last-minute edits to the model itself–a new service task here, a parallel gateway there–then sends it off for deployment. 

The other collaborators who contributed to the design process using Cawemo would be unaware of these changes to the model. For instance, a business analyst who’s responsible for understanding process performance and proposing improvements would be working off of an outdated version of the model, making it less likely that their suggestions are accepted by developers without unnecessary back-and-forth. 

Cawemo’s Modeler and Camunda Engine integrations ensure that the most up-to-date version of a model is synced back to Cawemo and is visible to all users–regardless of where the model has been updated. 

{{< figure src="Cawemo-Integration-2.png" alt="Integrate Cawemo with Camunda Modeler and Engine">}}

[You can learn more about Cawemo’s integrations with the rest of the Camunda stack here.](https://docs.camunda.org/cawemo/latest/technical-guide/integrations/)  


### Up-To-Date Documentation of Processes in Production {#embed-snippets-for-up-to-date-documentation}

Teams often maintain documentation for their process models in Confluence (or similar tools) alongside other important background information about the project. In a case where a model changes frequently, keeping the documentation up-to-date can be a pain. 

Cawemo supports embed snippets for models so that the current version of a model is always available, no manual updating required. These snippets can be added to any HTML page, including wiki pages or issue tracking. With Cawemo’s Modeler and Engine integration, this applies also to models that have been synced to Cawemo, for example everything that is deployed to your production engines.



{{< figure src="Cawemo-Embed-1.png" alt="Embed a Cawemo modeler in Confluence for easy documentation upkeep">}}



### Getting Started With Cawemo {#getting-started-with-cawemo}

[To get started with Cawemo, simply create a free account, and you’ll be modeling and collaborating in a matter of seconds. ](https://cawemo.com/signup)

For access to the enterprise features we covered in this post, you can get in touch with us via the contact form on [https://camunda.com/products/cawemo#contact](https://camunda.com/products/cawemo#contact).

[And to learn more about Cawemo’s capabilities, check out the documentation.](https://docs.camunda.org/cawemo/latest/user-guide/)

Thanks, and happy modeling!
