+++
author = "Jakob Freund"
categories = ["General"]
date = "2018-10-18T12:00:00+01:00"
tags = ["Camunda", "Workflow"]
title = "The (Re-)Emergence of Workflow Automation"
+++

This blog post is based on the [keynote I presented at CamundaCon 2018](https://www.youtube.com/watch?v=uM3P4Ev3YKM). It covers these four points:

* We’re all turning into technology companies.
* Digital Transformation relies on Business Process Automation (BPA).
* BPA is a technology puzzle that suits <u>your</u> business.
* Workflow automation is always one piece of that puzzle.

I am going to elaborate on each point and describe how I see Camunda contributing to this general development.

<!--more-->

# We’re all turning into technology companies

In early September, [the news broke](https://www.ft.com/content/2d32b806-b150-11e8-8d14-6f049d06439c) that Germany’s 2nd largest bank, Commerzbank, founded 150 years ago, is not a blue chip anymore. Commerzbank was bumped out of the DAX 30 Index by a fintech company that was founded about 15 years ago. Commerzbank CEO Martin Zielke wants to "push ahead with the transformation into a digital enterprise."

For 7 years, Germany's biggest discount grocer Lidl tried to introduce SAP to replace their homegrown core system, spending more than 500 million EUR for customization before eventually [cancelling the whole project](https://global.handelsblatt.com/companies/lidl-software-flop-germany-digital-failure-950223) in July this year. Now they intend to further develop their homegrown system.

In late August, the Volkswagen CEO [gave an interview](http://www.spiegel.de/wirtschaft/unternehmen/volkswagen-chef-herbert-diess-erwaegt-zukaeufe-von-software-firmen-a-1224408.html) stating that his company needs to build up extensive software development skills as soon as possible, most likely by acquiring software companies. He sees this digital transformation as mandatory in order to survive.

There is a pattern.

In June, Microsoft announced their acquisition of GitHub for $7.5 billion dollars. In case you're not familiar with GitHub, I personally like to call it Facebook for software developers. It's a place where developers can share and contribute to open source projects. So why would Microsoft spend $7.5 billion on such a thing? The answer is in their [press release](https://news.microsoft.com/2018/06/04/microsoft-to-acquire-github-for-7-5-billion/):

"Today, every company is becoming a software company and developers are at the center of digital transformation; they drive business processes and functions across organizations from customer service and HR to marketing and IT. And the choices these developers make will increasingly determine value creation and growth across every industry."

That's why. No matter if you’re a bank, or a retailer, or a car manufacturer, you will turn into a tech company.

And I don’t simply mean that tech becomes more important, or companies will spend lots of money on buying technology. I mean that all those banks, retailers, and automotive companies will be <i>creating</i> technology - software technology.  

# Digital Transformation relies on Business Process Automation (BPA)

I often discuss this development with senior managers, all the way up to the C-level. More and more often, those C-level executives have new titles, like Chief Digital Officer (CDO).

[According to Wikipedia](https://en.wikipedia.org/wiki/Chief_digital_officer), a CDO's mission is to convert a traditional analog business to a digital one, in essence a "digital transformation". In reality, however, it’s a bit more nuanced. Let me explain.

A German newspaper [recently wrote](https://www.sueddeutsche.de/wirtschaft/digitalisierung-versichertvon-amazon-1.3747260) that senior executives in insurance companies--the executives who drive digital transformation--essentially say, "Amazon.com is our benchmark in terms of customer experience". And I can confirm this. I've heard that very often myself. In fact, there is an entire study that confirms it: the [World Insurance Report](https://www.worldinsurancereport.com/) recently published by Capgemini. As their [infographic highlights](https://www.worldinsurancereport.com/sites/all/themes/wir_theme/frontend/dist/images/other/infograph.jpg), it's the customer experience that insurance companies need to catch up with, especially since the large tech companies like Amazon and Google are more and more likely to enter the market soon.

So, all right, there's a nice, fancy study, and we need to improve the customer experience. But how can we actually do it? Let’s look at just [one example I recently learned about](https://twitter.com/jakobfreund/status/988443242751582209) from ING Bank when I attended the Apache Kafka Summit in London. So, when ING customers travel to other countries, they'll want to use "international payment services" that sometimes requires a dedicated activation. It's not acceptable to handle this activation in a batch processing fashion, because this means it might take as long as a day or so.

{{<figure src="batch-realtime.png" >}}

By moving away from batch processing, over to single instance processing, we can provide real-time approval of the activation requests so that the customer gets what they want not the next day, but right away. The first point here is that this is not about replacing something analog with something digital, but rather, replacing something digital with something else _still_ digital but fundamentally better. And this is what very often <i>really</i> happens when companies go through "Digital Transformation".

The second point is that it's quite obvious that one key element to this digital transformation thing is fundamentally improved <i>business process automation (BPA)</i>.

Just to be clear, Business Process Automation (BPA) should not be used as a name for a specific discipline, let alone a specific technology. It’s really just running and improving our company: we’re looking at our business as it’s executed every day - in processes - and we try to automate the heck out of it. So BPA is not a discipline or trend or product, it’s just something we need to do. So how is this related to technology options? Let’s ask Capgemini again.

# BPA is a technology puzzle that suits YOUR business.

They have good news for German insurance companies, because according to their study, the German insurance industry is leading the way when it comes to automation! Why? Because a lot of them claim to be using things like Robotic Process Automation, artificial intelligence, machine learning, or blockchain already. That’s why they’re considered to be well ahead in terms of automation. Sadly, I can imagine how this came about.

It's pretty much like in this wonderful comic strip, the [Blockchain Bandwagon](https://marketoonist.com/2018/01/blockchain.html): some executive is wondering what to focus on, and some expert says "Blockchain! It will change everything! Everybody is talking about it, we don’t want to be left behind!" So instead of actually understanding this new tech, they just kick off some prestige project that needs to "do something with blockchain". Or AI, or whatever. And that’s how those studies come about. It would be funny if it wasn’t so depressing. However, it’s clear that those projects are not what actually enables conservative companies to compete with Amazon, Google or others - right?

Here’s another example: just do a [Google image search for Robotic Process Automation](https://www.google.de/search?q=robotic+process+automation&tbm=isch). You'll find an abundance of weird associations, like a robot typing, a guy pushing a giant glass monitor, then a robot pushing a giant glass monitor, a robot making a phone call, a robot thinking, a robot having a surprising idea, and so on. None of these pictures have anything to do with the <i>actual</i> problem RPA is trying to solve.

So in essence, we’re facing this good old problem of the [technology adoption life cycle](https://en.wikipedia.org/wiki/Technology_adoption_life_cycle) overheating, which then leads the early and late majority to [inflated expectations](https://en.wikipedia.org/wiki/Hype_cycle). Ironically, most of these technology trends do of course deliver certain value, if they’re applied appropriately.

To illustrate this, let’s imagine that your company is currently using a large software system to execute your business, and the product’s name is just three letters: TLM, which stands for the Terrible Legacy Monolith! So, the TLM comes with some amazing features, such as a clumsy user interface, no proper API, and so on.

{{<figure src="tlm.png" >}}

Fortunately, we can apply some of the new technologies to work around these issues. For example, we can use process mining to parse and interpret the log files produced by the TLM, and reverse-engineer them into process models in order to get more transparency. This is of course limited to the data that is actually available in those files, and it is certainly not a real-time view on what’s going on, but it’s still better than nothing.

 {{<figure src="process-mining.png" >}}

Also, we can apply Robotic Process Automation to integrate the TLM even though it doesn’t have an API. RPA products let you describe the steps a user would take in order to read or enter data, and then they execute those steps automatically, interacting with the legacy application's user interface. Just to be clear, this screenshot below comes from one of those vendors - I would never dare to call Salesforce a terrible legacy monolith!

 {{<figure src="rpa-screenshot.png" >}}

You could argue now that the "P" in RPA is a bit exaggerated, like someone from Johnson and Johnson points out [in her abstract for a presentation](https://www.rpaandaisummit.com/speakers/sam-horton-2) in November this year. After all, what you're actually automating are tasks, not processes: the RPA procedures are typically quite granular, and as soon as you look at an actual business process end-to-end, you will be looking at a few steps that can run in that particular RPA product, but there might be other steps executed in _other_ RPA products or even completely outside of RPA. So RPA products typically don't support end-to-end process automation, and that is a serious problem that RPA users are becoming more and more aware of.

 {{<figure src="rpa-flows.png" >}}

You can compensate for this problem by applying workflow automation technology to orchestrate RPA bots and integrate them in the overall business process. We have done this already for some popular RPA products and demonstrated an [integration of Camunda BPM with UiPath](https://blog.camunda.com/post/2018/08/integrating-uipath-rpa-with-camunda/) as well as [with Workfusion](https://blog.camunda.com/post/2018/08/workfusion-rpa-with-external-tasks/).

{{<figure src="rpa-orchestration.png" >}}

However, despite the popularity of RPA, we must understand that all of these are just temporary workarounds and <i>not</i> true digital transformation - these approaches will not bring us on par with leading tech companies like Amazon. In the long run, there is no way around actually replacing the TLM with a flexible solution stack that we produce and own ourselves, thus making things like process mining and RPA obsolete. Remember? We need to become a technology company. So if we’re breaking up the monolith and replace it with a modern software architecture pattern that's about autonomous, decoupled units, which pattern could you think of? Yes, microservices!

Microservices-oriented patterns have become super popular, and for good reason. Still, they are of course no silver bullet. One problem when designing decoupled, independent, and autonomous units is local optimization, which again can become a problem when those microservices need to play together to automate business processes end-to-end.

Martin Fowler [connects this to the challenge around event driven architectures](https://martinfowler.com/articles/201701-event-driven.html), which often go hand in hand with microservices. In his blog post he writes that "The danger is that it's very easy to make nicely decoupled systems with event notification, without realizing that you're losing sight of that larger-scale flow, and thus set yourself up for trouble in future years." And this larger-scale flow is what needs to be visible when thinking of business process automation.

 {{<figure src="workflow-events.png" >}}

Again, workflow automation to the rescue: we can integrate a workflow engine with an event bus (like Apache Kafka) in order to observe and correlate events to business processes. This process event monitoring is a bit like process mining, but much more precise, with a complete set of data, and in real time. The potential next stage of this pattern is letting the workflow engine not just subscribe to events but also publish them, which can be seen as a way to orchestrate microservices. I'm just teasing this topic here, but my co-founder Bernd is currently talking and writing a lot about it - if you happen to visit the Apache Kafka Summit in San Francisco (Oct 16-17, 2018), make sure to [attend his session](https://kafka-summit.org/sessions/monitoring-orchestration-microservices-landscape/).

Now let's arrange this whole puzzle on a timeline. Let’s assume it's early October 2018, and you're really pumped about this whole automation thing and you're going to tackle it, like right away.

 {{<figure src="roadmap.png" >}}

So in Q4, you set up a bunch of RPA bots and some process mining to fix some of the most pressing issues you currently have with your TLM. You can use workflow automation to orchestrate some of those bots and get some more end-to-end control over your processes. Then in 2019 you do the <i>actual</i> digital transformation by replacing your TLM with a new microservices-based infrastructure, you use workflow tech again to set up process event monitoring right from the start to check if your processes are actually executed in those microservices as intended, and pretty soon you take this to the next level by seriously orchestrating your microservices to ensure proper, end-to-end business automation with a flexible, scalable infrastructure. You throw away your legacy stuff and you phase out all the patches and workarounds, and by the end of 2019, your digital transformation is complete and you’re the most amazing tech company in your industry.

{{<figure src="hannibal.png" class="main teaser no-border" >}}

Sounds like a plan, right? Sure, that was a bit simplified and it's a quite ambitious timeline, but at least there is a plan at all. Way too often, when I ask senior executives about their automation strategy, I hear, "Well, we’re agile, we’re being opportunistic..." and that's exactly when things unfold like that comic strip about blockchain.

So, in summary, you must understand you won’t master digital transformation by introducing any particular product, because business process automation done right always means you’re looking at a bespoke puzzle of technologies that fit together and make sense for your business today. And in order for it to make sense tomorrow, it’s mandatory that this puzzle will always be evolving and changing, not every 10 years but every 10 months.

# Workflow automation is always one piece of that puzzle

As you see, workflow automation can play a crucial rule in very different approaches to process automation, all the way from RPA to microservices. Given the immense diversity of [use cases we're seeing with our customers](https://camunda.com/case-studies/), it looks like workflow automation is (almost) always a central pillar for <i>any</i> automation technology stack, and I think there is a good explanation for that.  

In case you haven't heard of it, I strongly recommend Harari's book [Homo Deus](https://en.wikipedia.org/wiki/Homo_Deus:_A_Brief_History_of_Tomorrow), basically a prediction of potential developments in the 21st century. Harari states that "The 21st century will be dominated by algorithms. ‘Algorithm’ is arguably the single most important concept in our world.”

He continues to give a few examples for algorithms, from simple calculations over cooking recipes to beverage vending machines. Interestingly, you can express all those examples in [BPMN](https://camunda.com/bpmn/).

And when I am thinking about the business processes that are being automated with Camunda, I actually realize that they are simply the algorithms that our customers use to execute their business models.

{{<figure src="bpmn-algorithms.png" >}}

BPMN is perfectly well suited to express almost any aspect of a (structured) business process in a way that makes it technically executable, while providing a direct visualization that is understandable by just about anyone. By feeding the model into a [workflow engine](https://camunda.com/products/bpmn-engine/) that executes it directly, we're generating real-time data that can be observed by business stakeholders and used for further improvement.

{{<figure src="model-execute-improve.png" >}}

This is an extremely powerful concept, and provided your workflow automation technology is lightweight, open, and flexible, you can apply it to almost any business process automation initiative. You can integrate it with an event bus and communicate with microservices via publish/subscribe (while treating the workflow engine as a microservice itself!), you can use traditional request/response to orchestrate API endpoints, you can integrate it with RPA to involve legacy applications, and you can provide an end user frontend for human task orchestration. All of this not only in the same workflow engine, but actually in the <i>same workflow</i>, which, for example, can help you to transition smoothly from a legacy application to a modern architecture.

{{<figure src="workflow-stack.png" >}}

# Camunda's Contribution

Unlike RPA or process mining, workflow automation is not a hype topic. It's pretty clear, however, that workflow automation is not always visible, but always present when it comes to  automation initiatives - it's basically the backbone for almost any digital transformation.

At Camunda, we're working hard to provide the [best possible technology stack for workflow automation](https://camunda.com/products/). We would love to see any significant business process automation project in any organization being powered by Camunda technology, and it looks like we're on track to get there.

Thank you for reading!
