+++
author = "Luise Pufahl"
categories = ["Execution"]
date = "2016-10-6T13:00:36+02:00"
tags = ["Batch Processing", "Process Improvement", "Process Execution"]
title = "Efficient bundling of similar activities – Batch Processing with Camunda"
+++

Batch Processing in business processes is the ability to execute an activity or a set of activities for several business cases simultaneously. In practice, we can observe different cases where the bundled execution of several cases is beneficial and can improve process performance. 

* In healthcare, it is more time-efficient to first collect a set of blood samples taken from patients to deliver them to the laboratory instead of sending a nurse for each separately. 
* In e-commerce and logistics, it is more cost-efficient to consolidate packages to be sent to the same customer instead of handling each separately. 
* In administration, usually related sets of invoices are approved to minimize the time to get familiar with the work.

Most process modeling languages do not support the design and configuration of batch processing; it is often enacted as batch manually or hard-coded in software. We have developed a concept for BPMN to directly incorporate batch requirements in a business process model, called batch region. With this, cases are actively bundled in their execution and can be shown in one user view. 
Within this blog entry I will show how batch requirements can be incorporated in a BPMN process and how they are then automatically executed. With this blog entry I like to get feedback from practice to our developed research approach. I look forward to your comments or a short [email](luise.pufahl@hpi.de) by you.


# How does batch processing in business processes work?

## Online Retailer Show Case
Let’s have a look on the following simplified online retailer example in which customer orders are handled. 

{{< figure class="main teaser no-border" src="onlineRetailer.png" alt="Online Retailer" caption="Simplified Online Retailer Example"  width="90%">}}

After an order has been received and it is approved, the articles of the order are packed and sent to the customer. Afterwards the order is archived. Often, online retailers do not charge any transport cost with the effect that customers place multiple orders in relatively short time frames. In such situation, several orders of the same customer could be packed and shipped together to save shipment costs.


## Adding Batch Requirements by a Batch Region to a BPMN Process
A batch region is a special type of BPMN sub-process enabling batch processing for its activities. The next figure shows the online retailer process with a batch region surrounding the activities Pack order and Ship order. In the right panel the configuration parameters of the batch region are visualized with which you are able to specify the conditions for the batch execution. 

{{< figure class="main teaser no-border" src="batchRegion.png" alt="Batch Region" caption="Modeling Batch Regions with Camunda Modeler"  width="80%">}}

After a batch region id has been specified, a __grouping characteristic__ can be provided. A grouping characteristic can be used to cluster the cases to be processed in one batch based on their data characteristics. For example, the process variables *custName* and *custAdress* are used to identify similar order instances in our retailer example. An __activation rule__ is used to determine when a batch execution is activated while balancing between waiting time and costs savings. In the example, a threshold rule was used which activates a batch if two cases are available or the cases of a batch have already waited at maximum for 60 minutes. Finally, the __maximum batch size__ has to be specified which indicates the maximum number of instances in a batch e.g., at maximum three orders fit in one parcel).

## Automatic Execution of the Batch Region
We extended the existing Camunda Engine in order to parse the batch region information and to support its execution. As soon as an execution of a process reaches a batch region, it is interrupted. The execution is then added to a *batch cluster* which is responsible for guiding the batch execution. If a batch cluster gets activated – meaning its activation rule is fulfilled, for example, in the online retailer example two cases have to be available or the time-out of 60 minutes is reached– the data of all instances is collected and stored as a process variable. With the collected information, a batch user task is created being visualized in the next figure. 

{{< figure class="main teaser no-border" src="batchTask.jpg" alt="Batch User Task" caption="Executing a Batch User Task"  width="80%">}}

Here we see as example a batch user task for the *Send order* activity visualizing the data of three cases in which John from Madrid has ordered a book, a TV and a sound bar. The responsible task performer can now select a logistic provider which has only be typed in once and is valid for all three cases. It is also possible to enter individual data for the cases by extending the table.

## Benefits
* Batch Processing in business processes can decrease process costs and increase the efficiency by handling several cases simultaneously for certain activities.
* Our approach offers the possibility to explicitly incorporate batch requirements in the business process model. This provides a quick access for the process stakeholders. In comparison to being hard coded in a software system, the representation of batch information in business process models offers a basis for discussions and also a testing environment.
* The advantage of the batch work item is that the task performer do not have to work on each case individually, all cases of a batch are shown in one user view where data for all cases can be entered. 


# Summary & Outlook
In this blog entry, I showed a concept to capture batch processing requirements in BPMN processes and how this can be automatically executed. More information on this and a screencast can be found [here](http://bpt.hpi.uni-potsdam.de/Public/batchProcessing). I would appreciate your feedback on this approach and would like to know whether you see application areas for the batch region. Does the approach have to be adapted to fit to your use case?

For your feedback and possible question, you can write a comment or you can directly contact me by mail (luise.pufahl@hpi.de).


