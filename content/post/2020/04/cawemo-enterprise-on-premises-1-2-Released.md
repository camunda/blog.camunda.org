+++
author = "Volker Gersabeck, Catalina Moisuc"
categories = ["Cawemo"]
tags = ["Cawemo", "Modelling"]
date = "2020-04-29T09:00:00+01:00"
title = "Cawemo Enterprise (On-Premises) 1.2 Released"
+++

We’re happy to announce the 1.2 release of Cawemo Enterprise On-Premises.

Cawemo is the BPMN process specification platform of the Camunda stack. Its main purpose is to enable all stakeholders to model and collaborate on business process diagrams.

<!--more-->

The main improvements in this release are:

- Visual diagram comparisons now highlight removed elements and also show changed implementation properties
- Improved UI component for lists of projects, diagrams, or collaborators
- Organization owners have a better overview on the organization and can see a complete list of projects within their organization

As a Camunda Enterprise customer you can install or upgrade to version 1.2 following our [on-premises installation instructions](https://docs.camunda.org/cawemo/latest/technical-guide/installation/). On [cawemo.com](https://cawemo.com), these improvements are already available to you if you are on the enterprise plan.

### Visual diagram comparisons

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/cawemo12/enhanced-visual-diagram-comparisons.gif" alt=" visual diagram" >}}

We are continuously improving our comparison feature based on user feedback that we receive. In this iteration we included two major improvements:

- In the visual diagram comparisons, we now show all changed implementation properties including the name of the property that was changed and the new value of it.
- When elements in the diagram are removed, we not only show that the sequence flows have changed, but we also indicate in color and wording that the element was removed from the diagram. This way, users are better able to detect changes with a bigger impact.

### Improved lists

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/cawemo12/new-entity-list.png" alt="entity list" >}}

We put a lot of effort into making Cawemo more convenient to work with. Whenever you see a list of projects, diagrams, or collaborators, you see a consistent way of selecting, searching, or sorting these items.

In order to sort the list, you can simply click on the column header or use the sorting icon above. By clicking on the magnifying glass, you can type any text to filter the list and only show matching items. For single items there is a context menu on the right hand side and when you select multiple items, there is a drop down list of all available actions for these items. Selecting all items is also now just one click away.

For those of you that also work with other products from the Camunda Stack: this new list UX was also added to the latest version of Optimize. This way you will find a familiar user experience across our products and be more productive with Camunda.

### Organization Management

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/cawemo12/project-list.png" alt="Project list" >}}

As an owner of an organization you can now not only manage who is part of the organization, but also see all the projects that exist within the organization. This way you get a better overview of what is happening within your organization. Next to the name of the project, the list also shows who has created each project. However, these could also be private projects, so unless you were invited directly to the project and already see it listed in the home view of Cawemo, you are not able to see its content or other details.

### Share your thoughts

We love being in touch with our community!

As a user in [https://cawemo.com](https://cawemo.com), you can send us a direct message through the “Provide feedback” form. We are also active in the [Camunda forum](https://forum.camunda.org/) and on [twitter @Camunda](https://twitter.com/Camunda).

If you are interested in the Enterprise plan of Cawemo, please reach out to us via the [contact form](https://camunda.com/products/cawemo/#contact) on our website.
