+++
author = "Andreas Remdt"
categories = ["Cawemo"]
tags = ["Cawemo", "Modelling"]
date = "2020-07-14T08:00:00+02:00"
title = "Cawemo Enterprise (On-Premises) 1.3 Released"
+++

We’re happy to announce the 1.3 release of Cawemo Enterprise On-Premises.

Cawemo is the BPMN process specification platform of the Camunda stack. Its main purpose is to enable all stakeholders to model and collaborate on business process diagrams.

<!--more-->

The main improvements in this release are:

- Call Activity Links are persisted in the XML as _calledElement_ and better manageable through the UI.
- Related diagrams can be restored as milestones into the current diagram.
- Single milestones can be deleted from synced modeler diagrams and deployed engine processes.

As a Camunda Enterprise customer, you can install or upgrade to version 1.3 following our [on-premises installation instructions](https://docs.camunda.org/cawemo/latest/technical-guide/installation/). On [cawemo.com](https://cawemo.com/), these improvements are already available to you if you are on the enterprise plan.

### Link a Call Activity

When you add a new link to a Call Activity, the process ID of the child process is written to the `calledElement` attribute of the Call Activity. Assuming you would export both diagrams as BPMN 2.0 XML files and deploy them to the Camunda Engine, then the parent process would call its associated child process correctly.

{{< figure class="no-border teaser" src="call-activity-links.png" alt="Showing links to the child process diagram" caption="Showing links to the child process diagram" >}}

### See all linked parent processes

In Cawemo you can now also see all other process diagrams that would call the given (child) process. We offer a list to easily see and access all such diagrams next to the specification text of the process.

{{< figure class="no-border teaser" src="process-diagram-links.png" alt="Showing links to the child process diagram" caption="Showing other process diagrams which are linking to the opened process diagram" >}}

Since multiple process diagrams can share the same process ID (e.g. when you have multiple variants of the same process within Cawemo), we do show all diagrams at the linked Call Activity or in the list of parent processes. Jumping between these diagrams is now just one click away.

### See all links automatically for imported diagrams

By using the process ID, we automatically add links to imported diagrams where we read and match the `calledElement` attribute. This way, you can simply import all your process diagrams to Cawemo and easily get an overview of how your processes are linked together.

### Delete milestones from plugin projects

For each deployed engine process and each synced modeler diagram, a milestone gets created in Cawemo. Using the milestone menu, you can now delete individual milestones to decrease duplication or delete old versions.

{{< figure class="no-border teaser" src="delete-milestones.png" alt="Delete milestones from plugin projects" >}}

### Create milestones from plugin projects

If your diagram has a related deployed process or modeler diagram, you can now create a milestone from either of those. A newly added menu allows you to either open the related diagram or create a new milestone in the diagram you are currently using.

{{< figure class="no-border teaser" src="use-as-milestone.png" width="400" alt="Create milestones from plugin projects" >}}

### Share your thoughts

We love being in touch with our community!

As a user in [https://cawemo.com](https://cawemo.com), you can send us a direct message through the “Provide feedback” form. We are also active in the [Camunda forum](https://forum.camunda.org/) and on [twitter @Camunda](https://twitter.com/Camunda).

If you are interested in the Enterprise plan of Cawemo, please reach out to us via the [contact form](https://camunda.com/products/cawemo/#contact) on our website.
