---
author: "Volker Gersabeck"

categories:
  - "Cawemo"

tags:
  - "Cawemo"
  - "Modelling"

title: "Cawemo Enterprise (SaaS) Release: Process Linking for Call Activities"
date: 2020-05-18T10:59:43+02:00

---

With the latest release of [Cawemo.com](https://cawemo.com), we have added a new Enterprise feature: linking of a Call Activity to another process diagram now considers the implementation property _calledElement_.

<!--more-->

## Link a Call Activity

When you add a new link to a Call Activity, the process ID of the child process is written to the _calledElement_ attribute of the Call Activity. Assuming you would export both diagrams as BPMN 2.0 XML files and deploy them to the Camunda Engine, then the processes would already call each other correctly.

{{< figure class="no-border teaser" src="call-activity-links.png" alt="Showing links to the child process diagram" caption="Showing links to the child process diagram" >}}

## See all linked parent processes

In Cawemo you can now also see all other process diagrams that would call the given (child) process. We offer an easy list of all such diagrams next to the specification text of the process.

{{< figure class="no-border teaser" src="process-diagram-links.png" alt="Showing links to the parent process diagram" caption="Showing links to the parent process diagram" >}}

Since multiple process diagrams can share the same process ID (e.g. when you have multiple variants of the same process within Cawemo), we do show all diagrams at the linked Call Activity or in the list of parent processes. Jumping between these diagrams is now just one click away.

## See all links automatically for imported diagrams

By using the process ID, we automatically add links to imported diagrams where we read and match the _calledElement_ attribute. This way, you can simply import all your process diagrams to Cawemo and get an easy overview of how your processes are calling each other.

## Cawemo Enterprise (On-Premises)

This feature will be available to Cawemo Enterprise (On-Premises) users with the next on-premises release. It is not yet part of the current 1.2 version of Cawemo Enterprise (On-Premises).


## Share your thoughts

We love being in touch with our community!

As a user in [https://cawemo.com](https://cawemo.com), you can send us a direct message through the “Provide feedback” form. We are also active in the [Camunda forum](https://forum.camunda.org/) and on [twitter @Camunda](https://twitter.com/Camunda).

If you are interested in the Enterprise plan of Cawemo, please reach out to us via the [contact form](https://camunda.com/products/cawemo/#contact) on our website.
