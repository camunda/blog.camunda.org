+++
author = "Björn Richerzhagen"
categories = ["Community"]
tags = ["Community"]
date = "2019-12-23T09:00:00+01:00"
title = "Ubiquitous Process Management for Industry 4.0 - Processes do not end in the Office"
+++

Björn Richerzhagen, long-time Camunda advocate and owner of [MINAUTICS](http://www.mi-nautics.com/), a consultancy for model-based management, has used Camunda BPM for prototyping scenarios in the manufacturing industry. In this blog post, he describes an automated end-to-end processes that include machinery - an approach for smart factory automation and Industry 4.0.

### Digitalization in the manufacturing industry - More than just a trend.

Digital production or "Industry 4.0" must address digitalization, just like the industries Jakob Freund described in his blog series - [How to (not) become a Digital Enterprise](https://blog.camunda.com/post/2019/10/how-to-not-become-a-digital-enterprise/). In the manufacturing world, workflow automation has so far been used almost exclusively in commercial support processes such as accounting, personnel or purchasing. This helps to reduce overhead costs, but companies only gain a real market advantage if they make their production more flexible, faster or more scalable. In production processes, automation with workflow engines is new territory.

Tailored to company-wide process management, Digital Transformation is the prerequisite for being able to react flexibly to changing market requirements. In particular, the use of modern BPM technology in manufacturing processes raises the potential of digitization.

Anyone who understands that workflows do not end at the office door, but continue in the workshops, production departments and production machines, can make the most of the potential of digitization for the industry. In this blog, I outline a prototype that shows the integration of commercial workflows in sales, planning, actual production processes and billing.

### The End-to-End Process

By way of example, and greatly simplified in terms of the length of this blog, I will outline below a process that:

<ol>
<li>Starts with an order in a webshop</li>
<li>Creates corresponding order and production data in an ERP system</li>
<li>Subsequently drives a machine in production</li>
<li>Leaves shipping to a shipping agent</li>
<li>Initiates an automated invoice dispatch before the process comes to an end</li>
</ol>

{{< figure src="process-collaboration.png" alt="Process collaboration with IT systems and punching machine Process start" >}}
_Illustration 1: Process collaboration with IT systems and punching machine Process start_

### 1 - Where does my Process Begin and where does it End?

Large companies expect their orders via EDI (Electronic Data Interchange), others distribute their own website. In our example, we are waiting for a specific event, namely the receipt of an order in a webshop. The system used is secondary. Rather, a corresponding event monitoring is to be realized. Technically, several ways are conceivable for this purpose. Either the system has corresponding interfaces, so that a signal can be sent to the process by means of a web hook or a trigger.

However, it is also conceivable to monitor the order entry (completion of a shopping basket, receipt of the orders message) at the database level. This can be done by means of regular time queries in the database to query the receipt of new orders or database-specific procedures trigger the process.

### 2 - Production Planning and Control

Planning software is used in most companies. This component makes sense to efficiently control the resources of production. So-called ERP systems support this in many ways. For this reason, in the example mentioned, the order received is recorded in the ERP system.
In practice, this data transmission is often realized by "typing". As part of process automation, a corresponding interface of the ERP system is used to avoid data inconsistencies.

Note: In cases where no technical interfaces are provided by the ERP, the question arises as to how manual data transmission can be avoided. Technologies such as RPA (Robotics Process Automation) provide satisfactory tools here, which can also be integrated into the automation realization.

### 3 - Machine integration

Manufacturing processes often consist of manual and mechanical activities. In the example mentioned, a punch was integrated that is controlled by a programmable logic controller (PLC S7). Depending on the product ordered, the following parameters are transferred to the PLC based on the product and manufacturing information from the ERP system. For this, Internet communication protocols (e.g. RestAPI) and SPS (e.g. OPC UA and others) are used.

This punch is just one example. Of course, other machines can also be involved in the process. Parametrisable transforming, addition and subtraction methods are particularly suitable for continuously digitized production processes. It is obvious that good master data quality is necessary.

### 4 - Process participants

In the example, we have included a human process participant who is to send the order after the punch has finished the production process. The employee receives - at the right time in the process - a task to take the finished article and send it. They confirm the completion of the task by entering the shipping information such as parcel number or similar.
In addition, provided that technical interfaces are available, integration is possible and also sensible.

### 5 - Business transactions

Once the contracted service has been rendered and dispatched, the process continues in the administrative area. There, the commercial transaction, namely the invoicing, is triggered and sent electronically. Again, EDI interfaces can be used.

### Prerequisites

A continuous functional area-spanning approach, as outlined in the example, can not be implemented without preparatory work. Conditions must be created. All preceded by the detailed knowledge of process-mandatory requirements.

In addition, master data management is critical to success. Unclean data can prevent error-free process runs. Often, an organizational solution must first be developed to assign responsibility for master data.

In order to harness corresponding technologies for the enterprise, technical skills are required for the development and operation of such solutions. If these are not available internally, corresponding service providers are available on the market, which also support the modularization and thus the flexibility of the solution.

### Process monitoring

Continuous process automation based on a process engine also makes efficient process monitoring possible.

{{< figure src="integrated-monitoring.png" alt="Integrated Monitoring functionalities offer deeper insights" >}}
_Illustration 2: Integrated Monitoring functionalities offer deeper insights_

This not only makes the ongoing processes visible, but also gives indications of bottlenecks. In the process above, you can see that the punch on "Finished Job" apparently causes limitations in process throughput. If this limitation persists, the process must be altered, for example, the capacity can be expanded or other manufacturing processes can be used in addition.

### Summary

Intelligent and networked methods, processes and tools that digitize value creation along continuous cross-divisional processes enable faster, more cost-effective, quality-assured and flexible production. This increases competitiveness in an increasingly global market environment.

The application of modeling languages ​​such as BPMN ensure transparency in the process. Process management methods and tools can thus be used to achieve strategic goals and serve as the basis for further digitization projects and process improvements.

Software components such as process engines enable business and IT alignment and ensure that implemented solutions are based on market-differentiating processes. In addition, they enable faster customization because process changes create reduced implementation efforts and critical dependencies are quickly made transparent.
