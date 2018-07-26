+++
title = "The 'Platformization' of Workflow at Goldman Sachs: A Camunda Day NYC Recap"
description = "Goldman Sachs has built a Camunda-powered workflow platform that's used by all 40,000 of the firm's employees and runs more than 14,000 unique workflows. At Camunda Day NYC 2018, they shared how they did it."
date = "2018-07-25T09:00:00+01:00"
author = "Mike Winters"
categories = ["Use Cases"]
tags = ["platforms"]
+++

In June 2018, Camunda hosted a [Camunda Days](https://camunda.com/events/camundadays/) New York City event at the Galvanize space in SoHo, our second New York community event in the past 12 months. Members of the Camunda team from our Berlin, Denver, and San Francisco offices traveled to spend time with the local user and customer community and to share updates on Camunda's product lineup, from [Zeebe](https://zeebe.io) to [Optimize](https://camunda.com/products/optimize/).

Headlining the event was an [in-depth presentation from Richard Tarling and Randall Graebner of Goldman Sachs](https://vimeo.com/279286243), who discussed how the firm has built widely-used internal platforms for both workflows and decisions.

"Platformization" of workflow tooling inside of companies is a common trend, and the presentation provides a behind-the-scenes look at how such a platform has evolved inside of a large and dynamic organization over the course of a decade.

The workflow platform adoption numbers inside Goldman Sachs are staggering; every day, 5,000 employees use the Goldman Sachs platform, which runs 14,000 unique workflows.

{{< figure src="goldman-sachs-workflow-numbers-blog.png" alt="Goldman Sachs workflow platform adoption" >}}

_([slide source](https://www.slideshare.net/camunda/richard-tarling-managing-director-and-randall-graebner-senior-engineer-from-goldman-sachs-camunda-day-nyc-2018))_

The presentation also covers some of the unique challenges that the Goldman Sachs team has needed to solve for as they've built their platform.

**Scaling in a huge organization:** Goldman Sachs is a 40,000-employee company with many distinct teams and groups, and the workflow platform is used in some capacity by every single employee--both technical and non-technical. The "scaling" challenge exists in a couple of dimensions. There is, of course, the requirement that the platform scales from a hardware standpoint so that a sudden increase in one team's resource requirements doesn't affect the performance of other teams' running workflows.

And then there's the requirement to provide tooling and training so that end users can operate independently and without an overreliance on the core platform team for support. To meet this demand, Goldman Sachs uses Camunda's [bpmn-js](https://bpmn.io/toolkit/bpmn-js/) to power an internal dashboard for building and managing workflows.

The platform's modeling dashboard integrates directly with the workflow engine and provides extensions aimed technical users that, for example, automatically validate whether the firm's best practices are being followed during deployment.

And there's an ever-increasing demand within the firm for more self-service tools for non-engineers, too; the dashboard also provides business users with tools for basic tasks such as form creation. In the future, the dashboard might make it possible for a non-engineer to assemble entire workflow applications themselves.

{{< figure src="goldman-sachs-internal-dashboard-blog.png" alt="Goldman Sachs internal workflow platform overview" >}}

You might be thinking that this sounds a lot like a "low-code" approach, and we at Camunda tend to advocate _against_ low-code workflow tools--and that's still the case when it comes to generic, one-size-fits-all low-code tools.

On the other hand, custom and use-case-specific solutions such as the platform that Goldman Sachs is building can be hugely beneficial for organizations that need to scale their platforms to a large number of employees, and it's exactly the sort of application that [bpmn-js](https://bpmn.io/toolkit/bpmn-js/) was designed for.

**Operating in a heavily-regulated industry:** As a bank, Goldman Sachs needs to adhere to strict regulations when it comes to auditability of data. The firm doesn't really delete anything, as they need to retain logs for auditing anywhere from seven to twelve years, depending on the regulation.

Using a BPM engine for processes and storing process data indefinitely makes it far easier to meet regulatory standards than would be the case if employees carried out processes by hand.

If you'd like an inside look at the process of rolling out and supporting workflow and decision platforms-as-a-service, or you want to learn more about running Camunda at very large scale, the Goldman Sachs presentation is just what you're looking for. We've linked to the video below, and you can find the [slides from the presentation here](https://www.slideshare.net/camunda/richard-tarling-managing-director-and-randall-graebner-senior-engineer-from-goldman-sachs-camunda-day-nyc-2018).

{{< figure src="goldman-sachs-title-slide.png" alt="Watch the Goldman Sachs workflow platform presentation" attr="Click here to watch the entire Goldman Sachs talk on Vimeo" attrlink="https://vimeo.com/279286243" >}}

_Goldman Sachs will be presenting live at CamundaCon, which is happening on September 20-21, 2018 in Berlin. [You can learn more about the event and buy tickets here](https://camunda.com/events/camundacon/). Join us to see how their platform has evolved and to engage with their team (and the broader Camunda community) in person!_

_If you want to watch recordings of talks from all of our Camunda Days events around the world, [you can find them here](https://vimeo.com/camunda). And we're hosting seven more Camunda Days events in 2018. [Take a look at the schedule and sign up for the event near you](https://camunda.com/events/camundadays/)._
