+++
author = "Falko Menge"
categories = ["Modeling"]
date = "2015-12-11T23:59:59+01:00"
tags = ["OMG", "DMN", "CMMN"]
title = "CMMN 1.1 and DMN 1.1 approved by OMG"

+++

Yesterday, CMMN 1.1 and DMN 1.1 have been approved by the [OMG Architecture Board](https://twitter.com/ObjectMgmtGroup/status/673996737435066368). This means that the new versions of the industry standards "Case Management Model and Notation (CMMN)" and "Decision Model and Notation (DMN)" are now final. They are [immediately](http://www.omg.org/cgi-bin/doc?dtc/15-12-04) [available](http://www.omg.org/cgi-bin/doc?dtc/15-11-51) to OMG members and it's just a matter of some final document conversion until they are released to the public.

## Camunda already released the implementation
Camunda was ahead of it's time and already released it's implementations of [CMMN 1.1](https://docs.camunda.org/manual/7.4/reference/cmmn11/) and [DMN 1.1](https://docs.camunda.org/manual/7.4/reference/dmn11/) last week. So grab your copy of our [Open Source BPM engine](https://camunda.org/download/) and [start using the new versions](https://docs.camunda.org/get-started/dmn11/) today.

{{< figure src="decision-table-in-camunda-bpm.svg" alt="DMN 1.1 Decision Table" caption="A DMN Decision Table in Camunda BPM" >}}

## What's new?
The version numbers already indicate that these are minor revisions, which mainly focus on fixing bugs. So please don't expect completely new standards. However, a couple of interesting features have been added in both specifications. During the next days, I'm going to publish a series of blog posts to explain in detail what has been added and changed in the new revisions. In the meantime I'll leave you with the following CMMN 1.1 diagram as a preview. Can you spot the differences?

{{< figure src="cmmn-1.1-case-model.png" alt="CMMN 1.1 Case Model" caption="A CMMN 1.1 Case Model" >}}

## Camunda's engagement in standardization
At Camunda we were heavily involved in the development of DMN 1.1 and also shaped a couple of new features in CMMN 1.1. We never had such a strong dependency between our standardization work and the product implementation. But especially the new version of DMN brings so many important features, that we couldn't resist to directly implement it. A big Thank You goes to my colleagues Sebastian Menski, Roman Smirnov, Daniel Meyer, Sebastian Stamm, Philipp Ossler and Robert Gimbel that gave a lot of valuable input and feedback while they implemented the new specifications in [Camunda BPM 7.4](http://blog.camunda.org/post/2015/11/camunda-bpm-740-released/). I'd also like to thank Camunda as a company for giving me the opportunity to work in these OMG task forces.