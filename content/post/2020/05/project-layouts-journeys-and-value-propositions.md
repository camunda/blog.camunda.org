+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-05-25T07:00:00+01:00"
tags = ["Microservices"]
title = "Project Layouts, Journeys and Value Propositions: Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation"
+++

Back in March, I conducted the webinar: “[Monitoring & Orchestrating Your Microservices Landscape using Workflow Automation](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/)”. Not only was I overwhelmed by the number of attendees, but we also got a huge list of interesting questions before and, especially, during the webinar. I was able to answer some of these, but ran out of time to answer them all. So I want to answer all open questions in this series of seven blog posts - you can click on the hyperlinks below to navigate to the other entries.
<!--more-->

In this blog, we’ll be exploring Camunda Best Practice questions
<ol>
<li>[BPMN & modeling-related questions (6 answers)](https://blog.camunda.com/post/2020/04/webinar-faq-part-1-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)</li>
<li>[Architecture related questions (12)](https://blog.camunda.com/post/2020/04/architecture-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)</li>
<li>[Stack & technology questions (6)](https://blog.camunda.com/post/2020/04/stack-and-technology-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)</li>
<li>[Camunda product-related questions (5)](https://blog.camunda.com/post/2020/05/camunda-product-related-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)</li>
<li>[Camunda Optimize-specific questions (3)](https://blog.camunda.com/post/2020/05/camunda-optimize-specific-questions-monitoring-orchestrating-your-microservices-landscape-using-workflow-automation/)</li>
<li>[Questions about best practices (4)](https://blog.camunda.com/post/2020/05/camunda-best-practices-monitoring-and-orchestrating-your-microservices-landscape/)</li>
<li>Questions around project layout, journey and value proposition (3)</li>
</ol>

__Q: Where is the best place to start when moving from old legacy monolith workflow systems to Camunda so there is minimum disruption.__
It depends on so many things. The [How to migrate to Camunda whitepaper](https://camunda.com/learn/whitepapers/migrate-to-camunda/) Can give you some first guidance.

__Q: How can you convince monolith users with legacy to move to microservices?__

You need to find the current pain points and show how microservices can provide a cure. Companies need to understand the real benefits. You should not apply microservices just because it is hip.

The major benefit is around business agility. Microservices are small, autonomous services that do one small thing very well — and then need to work together. The less they need to communicate with anyone else, the more efficient they can work and the more agile they can be when any change is needed. My favorite [quote around that is from Jeff Bezos](https://www.fastcompany.com/50106/inside-mind-jeff-bezos-5):

{{< figure class="no-border teaser" src="Bezos.png" alt="Jeff Bezos">}}

And the metaphor I always use is a three-legged race. If you tie together different teams, so that they need each other to change or deploy anything, you make them all slower. If you cut the bonds, every team can run faster.

{{< figure class="no-border teaser" src="3-legged-race.png" alt="race">}}

Of course, this leaves you with the challenge of how these services collaborate — that’s why you inevitably also will stumble over workflows :-)

I searched a bit but did not find a recording where I go exactly over this storyline, probably [The Role of Workflows in Microservices](https://www.youtube.com/watch?v=UIepHI_JPwE) gives you at least a glimpse of how I think about that.

__: What are the advantages of using Camunda for microservices orchestration?__

Following up on the last answer I am convinced that you need orchestration capabilities in your microservices architecture. I discussed this in this webinar, but also for example in [Complex event flows in distributed systems](https://berndruecker.io/complex-event-flows-in-distributed-systems/).

The second part of this question then is: Why use Camunda instead of any other workflow tool? While I might be a bit biased on this, I am convinced that Camunda has the strongest offering in that space because of the following characteristics:
<ul>
  <li>Developer-friendly: No fluff & unrealistic low-code promises, but a great integration into the developers’ world, including tooling and procedures.</li>
  <li>Highly-scalable: Camunda can back small workflow applications as well as global, mission-critical core business processes. And we help Nasa [to get to Mars :-)](https://camunda.com/case-studies/nasa/)</li>
  <li>BPMN/DMN standards-based: We are completely based on well-known and widely adopted standards, that are not only directly executable but also provide visual diagrams, that non-it folk can understand, which brings us to:</li>
  <li>Business-IT-collaborative (see also [BizDevOps — the true value proposition of workflow engines](https://blog.bernd-ruecker.com/bizdevops-the-true-value-proposition-of-workflow-engines-f342509ba8bb)).</li>
</ul>

__Want to learn more?__

You can watch Bernd’s [webinar here](https://camunda.com/learn/webinars/microservices-landscape-workflow-automation/) and don’t forget to [follow us on Twitter](https://twitter.com/Camunda) for all of our up-to-the-minute news.
