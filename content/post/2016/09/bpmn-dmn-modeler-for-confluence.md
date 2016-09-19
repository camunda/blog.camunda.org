+++
author = "Sebastian Sirch, Benedikt Uckat"
categories = ["Modeling", "Community"]
date = "2016-09-19T10:55:53+02:00"
tags = ["BPMN 2.0", "DMN", "Tooling", "Confluence", "BPMN Modeler", "DMN Modeler"]
title = "BPMN- and DMN-Modeler for Confluence"

+++

You are using Confluence? We as community members developed two plugins which allows you to use bpmn-js/dmn-js as full-featured modeling tool within your wiki for BPMN/DMN. Both are available on the on the [Atlassian marketplace](https://marketplace.atlassian.com/vendors/1213394) for free.

<!--more-->
{{< figure class="main" src="bpmn-modeler-animation.gif" alt="BPMN Modeler for Confluence" caption="Use bpmn-ja as a full-featured modeling tool in Confluence" >}}

# Create BPMN process models in Confluence
You can **embed the BPMN macro on any page at any position**. This way, you can bring together diagrams and textual information, e.g. to enrich your process model by context information such as the corresponding process owner or referenced documents.

{{< figure class="" src="macro-page.png" alt="Embed BPMN diagrams or DMN decision tables on Confluence pages" caption="Embed BPMN diagrams or DMN decision tables on Confluence pages" >}}

 You can **start modeling from scratch or import existing BPMN files**. All models are stored as attachments on the page at hand. If you edit a process model, a new version of the attachment is created.
 
When reading a Confluence page, **process models are rendered directly on the page**. The "viewer" also offers you a **fullscreen mode** which is handy for presentations or zooming into large models.

{{< figure class="main" src="bpmn-viewer.png" alt="Process models are rendered directly on the page" caption="BPMN viewer: process models are rendered directly on the page" >}}

When you enter the **editing mode**, you have access to all the features bpmn.io provides you to make modeling your process models as comfortable as possible.

{{< figure class="main" src="bpmn-modeler.png" alt="BPMN Modeler: create and edit your process models directly in Confluence" caption="BPMN Modeler: create and edit your process models directly in Confluence" >}}


You can **export** your process models as **XML** and **SVG** files. 

<Screenshot>

Permissions set on a page are inherited to the process diagrams, e.g. editing is only possible if you have the permissions to do so.
 
# Create DMN decision tables in Confluence

The same set of features is also available for DMN decision tables. 

{{< figure class="main" src="dmn-modeler-animation.gif" alt="DMN Modeler for Confluence" caption="Use dmn-js to create DMN decision tables in Confluence" >}}

# Get started
Both plugins are available on the [Atlassian marketplace](https://marketplace.atlassian.com/vendors/1213394) for free. Give it a try! 

* **BPMN-Modeler**: https://marketplace.atlassian.com/plugins/de.viadee.confluence.bpmn-plugin/server/overview
* **DMN-Modeler**: https://marketplace.atlassian.com/plugins/de.viadee.confluence.dmn-plugin/server/overview

Viadee is currently working on extending features that will make the plugins even more handsome to work with in software development projects. If you have any ideas or feature requests be sure to [get in touch](http://www.viadee.de/bpmn-modeler/). 


# Credits
These plugins have been developed by us as employees of [viadee Unternehmensberatung GmbH](http://www.viadee.de), a German IT consulting company located in Cologne and Münster, who support their customers in Camunda and software development projects .
