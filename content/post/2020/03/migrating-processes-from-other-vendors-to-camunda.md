+++
author = "Joe Pappas"
categories = ["Community"]
date = "2020-03-17T08:00:00+01:00"
title = "Migrating processes from other vendors to Camunda"
+++

Many vendors support the BPMN standard, but others do not. And even those vendors who support the BPMN standard will omit or extend aspects of it, which can create challenges when you attempt to migrate processes to Camunda. However, there’s a set of tools available to help you migrate processes developed in other vendor platforms.

<!--more-->

The Camunda Consulting team has created a set of tools for migrating process flows from IBM BPM, IBM Blueworks Live, and TIBCO that can be found [here.](https://github.com/camunda-consulting/migrate-to-camunda-tools) These tools will generate a BPMN compliant file which can then be further developed into an executable application. While IBM BPM and BlueworksLive are BPMN compliant, IBM does not include diagram information in its BPMN exports. Attempting to open those exports in Camunda’s Modeler result in a ‘No Diagram To Display’ error message. One of the available [migration tools](https://github.com/camunda-consulting/migrate-to-camunda-tools/tree/master/IBM/create%20diagram%20from%20exported%20BPMN) will generate diagram information based on the available BPMN information. It draws the process in a roughly grid-like pattern but does not retain the fidelity of the original diagram. Here is an example of a process created in Blueworks Live and exported as BPMN:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/migrating-processes-to-camunda/discovery-map.png" alt="discovery map" >}}
And here is the process in Camunda Modeler after the missing diagram has been generated:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/migrating-processes-to-camunda/twx-files.png" alt="twx files" >}}

__.twx files__

If diagram fidelity is desired, the [.twx migration tool](https://github.com/camunda-consulting/migrate-to-camunda-tools/tree/master/IBM/create%20BPMN%20from%20TWX%20export) is the way to go. A .twx file is a project interchange format for IBM BPM which contains diagram information in its zipped xml files. For the .twx migration tool to work you’ll need to extract or unzip the .twx file and locate the appropriate process xml in the /objects folder. The process xmls are in a human-readable but seemingly proprietary format. Here is an example of a process diagram in IBM BPM using all of the available BPMN elements in IBM BPM:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/migrating-processes-to-camunda/twx-migration.png" alt="monitoring" >}}

And after conversion using the .twx tool:
{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/migrating-processes-to-camunda/after-conversion.png" alt="after conversion" >}}
The diagram coordinates are retained, although the default shape scaling is a bit different. The shape sizes used are Camunda defaults, though it can be changed by updating the code to reflect your preferences.

__XPDL to BPMN__

Lastly, we have the [XPDL to BPMN](https://github.com/camunda-consulting/migrate-to-camunda-tools/tree/master/TIBCO/create%20BPMN%20from%20XPDL%20export) migration tool. While there are many XPDL to BPMN conversion tools available, most are online tools that either require you to register or upload your process. If you’re not comfortable with either requirement, you can use the XPDL to BPMN migration tool provided here. And since you have access to the source code, you can update the code for extensions or modifications to meet your needs. Here is an example of a BPMN process converted to XPDL:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/migrating-processes-to-camunda/XPDL-analog.png" alt="XPDL-analog" >}}

Which is then converted back to BPMN. There are a few notations in BPMN that seemingly don’t have an XPDL analog hence you’ll notice items that are ‘lost’ in translation like escalations, abstract tasks, business rule tasks, none event types, and non-interrupting events, subjects for further refinements:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/03/migrating-processes-to-camunda/last-pic.png" alt="XPDL-analog" >}}

Have a look at the tools, give them a try, and provide feedback as we’re always interested in your observations.

__Still puzzling over importing processes from other vendors?__

Join us for our virtual user conference, which will bring the Camunda Community together from all across the globe. We’re working on the finalising the details right now, but you can [sign up for updates](https://camunda.com/events/camundacon-updates/) and be the first to hear the news as it happens.

Joe will walk through the obstacles you can run into when you attempt to migrate processes from vendors like IBM in his technical track: Why can’t I import this BPMN? and how we can help you overcome those challenges with freely available open-source converter utilities. He’ll discuss how they came to be, how they work and how you can use them.
