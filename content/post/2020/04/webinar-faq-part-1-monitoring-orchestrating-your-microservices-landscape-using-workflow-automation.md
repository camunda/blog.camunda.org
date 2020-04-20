+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-04-13T08:00:00+01:00"
tags = ["Microservices"]
title = "Webinar FAQ Part 1: Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation"
+++

Back in March, I conducted the webinar: “[Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/)”. You can find the recording of the webinar online, as well as the slides. Not only was I overwhelmed by the number of attendees, but we also got a huge list of interesting questions before and, especially, during the webinar. I was able to answer some of these, but ran out of time to answer them all.

<!--more-->

So I want to answer all open questions in this series of seven blog posts covering:

1. BPMN & modeling-related questions (6 answers)
2. Architecture related questions (12)
3. Stack & technology questions (6)
4. Camunda product-related questions (5)
5. Camunda Optimize specific questions (3)
6. Questions about best practices (5)
7. Questions around project layout, journey and value proposition (3)

We’ve also started to experiment with the [Camunda’s Question Corner](https://forum.camunda.org/t/feedback-camundas-question-corner/18828) - an open opportunity to put your questions to Camunda experts in an interactive and fun online webinar -  so keep an eye on the Camunda Forum for more details.

__BPMN & modeling-related questions__

__Q: How to present BPMN diagrams so that common people can understand it?__

There is no simple answer to that. But in my experience most people can understand a basic subset of BPMN easily. For our [Real-Life BPMN book](https://www.amazon.com/dp/1086302095/), we created a chart showing the elements we see used most often in automation-related projects:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/faq-part1.jpg" alt="BPMN model" >}}
BPMN symbols grouped by the frequency they are used [from Real-Life BPMN](https://www.amazon.com/dp/1086302095/)

You can typically express a lot with the subset of “Always” or “Frequently”. And these symbols are intuitive — at least with a bit of training or explanation on the go.But comprehensible models should also comply with certain best practices — you can find one example in [Create Readable Process Models](https://camunda.com/best-practices/creating-readable-process-models/).

Last but not least, it is important to not model every implementation aspect in BPMN. Remember, that a workflow solution is BPMN AND programming code, so you can choose what to express in the BPMN model and what you express in the programming language of your choice (I wrote a whole section about this in my upcoming book, but the super-condensed rule of thumb is: default → Programming, activities where you have to wait → BPMN, activities that should be visible → BPMN).

__Q: Does the Camunda Process Engine in its open-source version support the entire and complete BPMN 2.0 descriptive symbol set?__

There is no difference in BPMN symbol support of the Camunda community and enterprise edition.

Camunda supports almost all symbols. We never missed something in recent real-life projects. You can find the [exact coverage in the documentation](https://docs.camunda.org/manual/7.12/reference/bpmn20/) (this overview does make the gaps transparent).

__Q: Why do you name events and functions in the BPMN model in the same style? Why not e.g. receive payment for a function? It is not fully textbook to model events as activities?__

This question might relate to this workflow model I created in the webinar when I talked about that [Camunda Optimize](https://camunda.com/products/optimize/) can do monitoring on pure events flowing around (even in scenarios where you do not use any workflow engine):

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/pic2.jpg" alt="BPMN model" >}}

And there are indeed two flaws with this model — well spotted! First of all, it violates [our typical naming convention](https://camunda.com/best-practices/naming-bpmn-elements/), whereas every task is named with “object verb”, meaning that would result in:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/pic3.jpg" alt="BPMN model" >}}

While this is indeed better named, it has the downside that the exact event names are no longer shown. If you want to keep the event names from your application, we could model:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/pic4.jpg" alt="BPMN model" >}}

I do agree that this might be the most accurate way of modeling this situation. But in this case, I decided on tasks instead of events for two reasons:

1. This might be more intuitive for business people when they look at the workflow model. Doing the payment will take a bit of time, so events are confusing to some people.

2. I often give this kind of demo to people that do not (yet) know BPMN, and they also seem to understand boxes and arrows quicker. Especially as I typically also show timer boundary events in the same talk, I don’t want to introduce too many different modeling alternatives at once.

As this workflow model is “only” used in Optimize to project events onto, you have a bit of freedom anyway. So in this example, it might even be a good idea to model:

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/pic5.jpg" alt="BPMN model" >}}

There is no right or wrong modeling here, at least, to my gut feeling. But I do agree that the model I did in the heat of the moment might not be the best choice to do in a real-life scenario.

__Q: In the orchestration scenario, BPMN usage appears to be more or less limited to post-run analysis?__

In the orchestration scenario, I used the Camunda engine within the order fulfillment microservice. Why do I do this — what is the value?

- The workflow engine can wait, e.g. until a response or event happens — potentially much later. I can also leverage timer events to react if something takes too long.

- I can use the operations tool to see what is currently going on. This gets especially interesting if something failed or is stuck (which I did not simulate in the webinar).

- Of course you can use the audit data from the workflow engine to do further post-run analysis, but I did not dive into that in the webinar.

{{< figure class="no-border" src="https://blog.camunda.com/post/2020/04/webinarfaq/cockpit.png" alt="BPMN model" >}}

__Q: Are you going to continue to work on CMMN?__

At Camunda we are in maintenance mode with [CMMN](https://docs.camunda.org/manual/latest/reference/cmmn11/). We do support the existing features and fix every possible bug around it. But we do not actively develop it further. I want to quote a paragraph from the latest edition of our [Real-Life BPMN](https://www.amazon.com/dp/B07XC6R17R/), where we explained the reasons:

*We gave CMMN two years to take off, but, within that time, we experienced limited value from CMMN in our projects, especially if you compare it to BPMN or DMN. One observation was, for example, that most logic in CMMN models was hidden in complex rule-sets if certain activities are possible, impossible, mandatory or unnecessary. These rules were often expressed elsewhere and also not represented graphically. Exaggerating a bit, the CMMN model becomes kind of a graphical bullet point list. So we decided to remove CMMN from this book to not confuse anybody that just embarks on their BPM journey. Instead we want to emphasize how to tackle unstructured processes with BPMN in section 4.5.5 on page 142 and point out the limits of this approach.*

You can learn more about that decision in the [webinar for the 4th edition.](https://camunda.com/learn/webinars/real-life-bpmn/)

__Q: Would it be possible to integrate a testing module to help users see the result of newly created DMN before deploying it to production?__

Yes, that is possible. It is not part of Camunda BPM out-of-the-box, at least not at this moment. But I saw customers doing some own-tooling around ours, leveraging the lean DMN engine itself and [dmn.js](https://bpmn.io/toolkit/dmn-js/) for the UI part.

A great example is from LV1871, an insurance company in Germany. [You can read about it in this blog post](https://medium.com/@davidibl/dmn-manager-ed2afa73b221), the whole tooling is open source!

{{< figure class="no-border" title="A bespoke DMN manager example from LV1871, which is available open-source." src="https://blog.camunda.com/post/2020/04/webinarfaq/0__ApbE6rP5pHXD8DY.gif" alt="BPMN model" >}}

__Ready for more?__

Next week we’ll look at architecture-related questions - there were 12 of these overall, the largest of all the categories I created when compiling answers in these blogs. But if you can’t wait until the next blog, you can check out the original [here on my Medium site.](https://blog.bernd-ruecker.com/microservices-webinar-faq-1a9741f4481c)
