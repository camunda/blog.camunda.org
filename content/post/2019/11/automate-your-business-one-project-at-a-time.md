+++
author = "Jakob Freund"
categories = ["Community"]
tags = ["CamundaCon"]
date = "2019-11-12T09:00:00+01:00"
title = "How to (not) become a Digital Enterprise - Automate your Business, One Project at a Time"
+++

This blog post is the fourth of a five-part series based on the keynote I presented at CamundaCon 2019 (You can find the [recording on YouTube](https://www.youtube.com/watch?v=zfN2-TlzlZs)). You can read the [first blog in this series here](https://blog.camunda.com/post/2019/10/how-to-not-become-a-digital-enterprise/).

<!--more-->
In essence, I recommend:

- [Prioritizing customer-focused innovation.](https://blog.camunda.com/post/2019/10/prioritizing-customer-focused-innovation/)
- [Bringing technology to the heart of your company.](https://blog.camunda.com/post/2019/11/bringing-technology-to-the-heart-of-your-company/)
- Automating your business, one project at a time.
- Putting executives in charge who care about long-term success, their people and the world.

### Automate your Business, One Project at a Time

I’d like to start this blog by highlighting a few presentations from CamundaCon 2018 - to show how some of our longest-standing users have implemented very different projects using Camunda:

{{< figure src="img01-Human-Task.png" alt="Ensuring Structure in a Human Task User focused Process">}}

Source: https://www.slideshare.net/camunda/camundacon-2018-profile-print-and-explorative-data-mining-duni-viadee

Duni is a Swedish Company and a global leader in producing customizable, high quality napkins. Paper Napkins. One of their core processes is executing incoming orders and since they do B2B they do not have so many orders per year, perhaps a few thousand. Their main goal when introducing Camunda was to control a mostly human task-based business process, getting visibility and assurance that the process is typically conducted as intended, without too many correction loops.

{{< figure src="img02-Automating-EndToEnd.png" alt="Automating the Business Process End-to-End">}}

Source: https://www.slideshare.net/camunda/camundacon-2018-our-journey-to-the-digital-world-of-insurance-talanx

At Talanx however the intention was to automate their core process of selling car insurances, and automate it as much as possible. So you can see in that heatmap diagram, that the default path is STP (straight through processing) and human workers are only involved in exceptional cases. Their main success with Camunda was bringing the automation rate to 97% within three months after go-live.

{{< figure src="img03-High-Throughput.png" alt="High Throughput Processing">}}

Source: https://www.slideshare.net/camunda/camundacon-2018-workflow-automation-at-scale

24 Hour Fitness, on the other hand, embedded Camunda at the absolute heart of their operations platform, executing BPMN process models and DMN decision tables at scale, with more than 80 million executed activity instances every day.

{{< figure src="img04-DAP.png" alt="Digital Automation Platform">}}

Source: https://www.slideshare.net/camunda/camundacon-2018-a-global-workflow-infrastructure-goldman-sachs

Obviously Camunda is deployed for very different use cases, but it is also often used as the foundation for a self-developed, general digital automation platform, like at Goldman Sachs. In such a setup, even a certain degree of low-code can make sense, because it's domain-specific low-code. And many customers leverage our [bpmn.io project](https://bpmn.io/) to offer domain-specific low-code development layers to their developers in different business units.

{{< figure src="img05-Tech-Use-Cases.png" alt="Camunda Technical Use Case Categories">}}

### You don’t have to lead with a big bang

In summary, you can say that there is a broad variety of use cases for Camunda, not just on a business level, but on a technical level. And if you wonder about our product roadmap, it is very much about supporting this set of use cases. The sweet spot, as we see it, is the end-to-end automation of core processes, so that enterprises can offer an excellent customer experience, at scale. Because again, this is where they are, or will be, challenged by disruptive startups. But you don't have to run a big bang project right away, you can start with something smaller to get your feet wet and prove that the direction you're headed makes sense.

{{< figure src="img06-Getting-There.png" alt="Getting there, one Project at a Time">}}

### One Project at a Time

Your journey could begin with a small-scale pilot project, perhaps in the human workflow area, like a purchasing approval. This could lay the foundation to make bolder, bigger steps and eventually build out your own digital automation platform. In many cases this has proven to be better than starting with a multi-year big bang project right away, which comes with more uncertainties and a longer time-to-value. Try to keep that time-to-value as short as possible, then build the next increment. That's agile.

{{< figure src="img07-Next-Challenges.png" alt="The next Challengers we're tackling">}}

### One Team

At Camunda we focus on supporting that set of use cases and this kind of incremental journey. So we're going to continue improving the experience for software developers and enable them to very quickly develop, test and change automation solutions. We will provide more and better ways to involve any stakeholder in process automation design, pulling down the barriers between business and IT, supporting "one team". We will leverage the power of BPMN even more to provide real-time visibility into your processes, way beyond what you might get from things like process mining. We will enable you to automate your business processes end-to-end, but on the scale of high-throughput processing, so you can provide excellent customer experiences at scale. And we will make it super easy to get up and running with Camunda, by lifting the burden of operating the stack from your shoulders.

### So, what does this look like in action?

Interested in learning more about the practical ways you can kick off a Camunda project?

Join our webinar this evening (November 12th): [How to Build Scalable Business Automation with Microservices](https://camunda.com/learn/webinars/build-scalable-business-automation-with-microservices/) with award-winning BPM analyst, consultant and author [Sandy Kemsley](https://column2.com/), who’ll discuss key requirements and success strategies for developing a scalable business automation platform that supports internal application development by distributed teams and delivers true business agility.

You can also catch up on her [CamundaCon 2019 keynote here](https://www.youtube.com/watch?v=GEQoFgxCvAo&list=PLJG25HlmvsOWvVjF44qr5-xXG--cCuXnn&index=29&t=0s).

Plus in next week’s blog - the last of this series - I’ll be discussing why you need to put executives in charge who care about long-term success, their people and the world.
