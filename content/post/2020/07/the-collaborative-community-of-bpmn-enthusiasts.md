+++
author = "Niall Deehan"
categories = ["Community"]
tags = ["BPMN 2.0", "Community"]
date = "2020-07-02T08:00:00+02:00"
title = "The Collaborative Community of BPMN enthusiasts"

+++

This month 10 years ago, BPMN 2.0 was finalized and adopted as a standard, which in itself is something Camunda is happy to celebrate.But what has happened in the BPM space in the meantime is probably the most interesting thing about BPMN 2.0. A whole ecosystem and community has grown from the standard. While it originally came into existence to give the process building community a unified language, it sparked a lot of independent innovation.

<!--more-->

This was because turning a visual process language into an executable framework brought in a lot of new ways of thinking about processes, so modelers, engines and reporting tools began springing up - all around the same standard. So 10 years on we’ve arrived at a point where the standard, the tooling and the community is a stable and mature source for new ideas in processes and automation.

{{< figure class="no-border teaser" src="bpmn-capability-demo.png" alt="BPMN Capability Demo" >}}

Earlier this month [a demonstration I was part of by members of MIWG](https://youtu.be/vhnO9inscbo) (Model Interchange Working Group) showed the BPMN community’s adherence to the standard, but also doubled as a  snapshot of the cabibilies of today’s tooling around this open standard. It also - for me - validated that this standard is still producing new and innovative ways to build really great software from a common framework. The idea of the demo was to get together a group of vendors who have each built their tools with BPMN and prove one of the fundamental truths of BPMN. That:

_If I model a process in one BPMN 2.0 compliant tool I should be able to load that model in any other tool claiming to also be compliant._

How is this proven? Well we model a process - LIVE - and then the following tool uploads the model made by the previous and adds to it. In the end we have a process modeled to completion which has passed through completely different BPMN models.

The demo itself was done in two parts. __Process Modeling__ and __Process Execution__. The interchange was the most important goal of the modeling section, while the process execution focused on what you can achieve when executing BPMN using today’s BPMN process engines.

{{< figure class="no-border teaser" src="trisotech.png" alt="Process Modeling" >}}

For the [modeling portion of the demo](https://youtu.be/vhnO9inscbo?t=528) I showed our web modeler [Cawemo](http://cawemo.com/) in action. Under the hood Cawemo uses bpmn.io and it’s really cool to see how much you can build and extend that library.

{{< figure class="no-border teaser" src="image5.gif" alt="MIWG Demo" >}}

I then exported the model to the fabled BPMN 2.0 XML and passed it along to Simon from Trisotech so that he could upload it and continue the fun.

{{< figure class="no-border teaser" src="video-call.png" alt="Demo" >}}

When all vendors had gotten their opportunity to prove the interchange works we moved onto what is my personal [favourite part of the demo - execution!](https://youtu.be/vhnO9inscbo?t=1727) Not all of the vendors offer both a modeler and an execution engine but those who did (Camunda included) were given about 2 minutes to show the benefits of an executable notation to varying degrees. A lot of vendors were demonstrating how exactly to add execution semantics, but I decided it might be more interesting to show how a running executable process in Camunda can be easily updated and instances migrated. I also picked this feature to demo because I really love it and the team has done an amazing job of making it look great. The only downside is that it took a lot less than 2 minutes so I thought I’d throw in a few other features such as:

* Cawemo’s [Diffing feature](https://camunda.com/products/cawemo/)
* Cockpit’s [Heatmap](https://camunda.com/products/cockpit/)
* Task management with [Tasklist](https://camunda.com/products/tasklist/)

{{< figure class="no-border teaser" src="image2.gif" alt="Camunda Cockpit" >}}

We ended the session with a lovely long Q & A section in which I did my best to answer the Camunda questions that came my way.

I’m already looking forward to next year’s demo and delighted that Camunda participates in events like these. I hope it gives people the same excitement as it does for me when seeing what a number of vendors can create independently, while still staying connected by the common language of BPMN 2.0.

If you want to see the full demo, you can [watch the recording](https://youtu.be/vhnO9inscbo). And please feel free to reach out to us with any questions you might have [here](https://camunda.com/contact/).
