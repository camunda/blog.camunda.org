+++
author = "Jakob Freund"
categories = ["General"]
date = "2018-10-02T12:00:00+01:00"
tags = ["Camunda", "Workflow"]
title = "The (Re-)Emergence of Workflow Automation"
+++

* We’re all turning into technology companies.
* Digital Transformation relies on Business Process Automation (BPA).
* BPA is a technology puzzle that suits <u>your</u> business.
* Workflow automation is always one piece of that puzzle.



# We’re all turning into technology companies

2 Weeks ago the news broke that Germany’s 2nd largest bank Commerzbank, founded 150 years ago, is not a blue chip anymore, but thrown out of the DAX 30 Index by a Fintech that was founded about 15 years ago. The Commerzbank CEO Mr. Zielke wants to "push ahead with the transformation into a digital enterprise."

For 7 years, Germany's biggest discount grocer Lidl tried to introduce SAP to replace their homegrown core system, spending more than 500 million EUR for customization, before eventually cancelling the whole project in July this year. Now they intend to further develop their homegrown system.

In late August, the Volkswagen CEO gave an interview stating that VW needs to build up extensive software development skills as soon as possible, most likely by acquiring software companies. He sees this digital transformation as mandatory in order to survive. 

So, what's happening?

<!--more-->

In June, Microsoft announced their acquisition of GitHub for 7.5 billion Dollars. If you don't know GitHub, I personally like to call it the Facebook for Software Developers, but it's really a place where developers can share and contribute to open source projects. So why would Microsoft spend 7.5 billion on such a thing? The answer is in their press release.

That's why. My first message for today is: No matter if you’re a bank, or a retailer, or a car manufacturer, you will turn into a tech company.

And I don’t mean because tech becomes super important or we’re spending lots of money on buying technology, I mean all those banks, retailers etc will be <i>creating</i> technology - software technology. That’s what’s happening.  

# Digital Transformation relies on Business Process Automation (BPA)

I am often discussing this development with senior managers, all the way up to the C-Level. More and more often, those C-level executives have new titles, like Chief Digital Officer (CDO). 

According to Wikipedia their mission is to convert a traditional analog business to a digital one, in essence a "digital transformation". In reality however, it’s a bit more nuanced. Let me explain.

A German newspaper recently stated that senior executives in insurance companies, those who drive digital transformation, essentially say: "Amazon.com is our benchmark in terms of customer experience". And I can confirm this, I've heard that very often myself. Actually there is a whole study that confirms it, the "World Insurance Report" recently published by Capgemini. It’s the customer experience that insurances need to catch up with, especially since the BigTechs like Amazon and Google are more and more likely to enter the market soon.

So all right, nice fancy study, we need to improve the customer experience, but how can we actually do it? Let’s look at just [one example I recently learned about](https://twitter.com/jakobfreund/status/988443242751582209) when I attended the Apache Kafka Summit in London, it's about ING bank. So, when ING customers travel to other countries they want to use "international payment services" that sometimes need a dedicated activation. It's not acceptable to do this in a batch processing fashion, because this means it might take as long as a day or so.

{{<figure src="batch-realtime.png" >}}

By moving away from batch processing, over to single instance processing, we can provide real-time approval of the activation requests so that the customer get what they want not the next day, but right away. The point here is firstly, that this is not about replacing something analog with something digital, but something digital with something other still digital but fundamentally better. And this is what very often <i>really</i> happens when companies do "Digital Transformation". 

And Secondly, it is quite obvious that one key element to this digital transformation thing is a fundamentally improved <i>business process automation (BPA)</i>. 

Just to be clear, Business Process Automation (BPA) should not be seen as a name for a specific discipline, let alone a certain technology. It’s really just what we do: We’re looking at our business as it’s executed every day - in processes - and we try to automate the heck out of it. So BPA is not a discipline or trend or product, it’s just something we need to do. So how is this related to technology options? Let’s ask Capgemini again. 

# BPA is a technology puzzle that suits YOUR business.

They have good news for German insurers, because according to their study, the German insurance industry is leading when it comes to automation! Why? Because a lot of them claim to be using things like Robotic Process Automation, Artificial Intelligence, Machine Learning or Blockchain already. That’s why they’re considered well ahead in terms of automation. Sadly, I can well imagine how this came about.

It's pretty much like in this wonderful comic strip, the [Blockchain Bandwagon](https://marketoonist.com/2018/01/blockchain.html): Some executive wondering what they should focus on, and some expert saying "Blockchain! Will change everything! Everybody talking about it, we don’t want to be left behind!" So instead of actually understanding this new tech, they just kick off some prestige project that needs to "do something with blockchain". Or AI, or whatever. And that’s how those studies come about. It would be funny if it wasn’t so depressing. However it’s clear that those projects are not the ones actually enabling conservative companies to compete with Amazon, Google or others - right? 

Here’s another example: Just do a [google image search for Robotic Process Automation](https://www.google.de/search?q=robotic+process+automation&tbm=isch) - you will find an abundance of weird associations, like a Robert typing, a guy pushing a glass board, then a Robot pushing a glass board, a robot making a phone call, a robot thinking, a robot having a surprising idea and so on. None of these pics have anything to do with the <i>actual</i> problem RPA is trying to solve.

So in essence we’re facing this good old problem of the [technology adoption life cycle](https://en.wikipedia.org/wiki/Technology_adoption_life_cycle) overheating, which then leads the early and late majority to [inflated expectations](https://en.wikipedia.org/wiki/Hype_cycle). Ironically most of these technology trends do of course come with a certain value, if they’re applied appropriately. 

To illustrate this, let’s imagine, your company is currently using a large software system to execute your business, and the product’s name is just three letters: TLM, which stands for the Terrible Legacy Monolith! So, the TLM comes with some amazing features, such as a clumsy user interface, no proper API and so on.

{{<figure src="tlm.png" >}}

 Fortunately, we can apply some of the new technologies to work around these issues. For example we can use process mining to parse and interpret the log files produced by the TLM, and reverse-engineer them into process models, in order to get more transparency. This is of course limited to the data that is actually available in those files, and it is certainly not a real-time view on what’s going on, but it’s still better than nothing.

 {{<figure src="process-mining.png" >}}

Also, we can apply Robotic Process Automation to integrate the TLM even though it doesn’t have an API. RPA products let you describe the steps a user would take in order to read or enter data, and then executes those steps automatically, interacting with the legacy application's user interface. Just to be clear, this screenshot below comes from one of those vendors - I would never dare calling Salesforce a terrible legacy monolith! 

 {{<figure src="rpa-screenshot.png" >}}

You could argue now that the "P" in RPA is a bit exaggerated, like someone from Johnson and Johnson points out [in her abstract for a presentation](https://www.rpaandaisummit.com/speakers/sam-horton-2) in November this year. After all, what you're actually automating is tasks, not processes: The RPA procedures are typically quite granular, and as soon as you look at an actual business process end to end, you will be looking at a few steps that can run in that particular RPA product, but there might be other steps executed in other RPA products or even completely outside of RPA. So RPA products typically don't support end-to-end process automation, and that is a serious problem which RPA users are becoming more and more aware of.

 {{<figure src="rpa-flows.png" >}}

You can compensate this problem by applying workflow automation technology to orchestrate RPA bots and integrate them in the overall business process. We have done this already for some popular RPA products and demonstrated an [integration of Camunda BPM with UiPath](https://blog.camunda.com/post/2018/08/integrating-uipath-rpa-with-camunda/) as well as [with Workfusion](https://blog.camunda.com/post/2018/08/workfusion-rpa-with-external-tasks/). 

{{<figure src="rpa-orchestration.png" >}}

However despite the popularity of RPA we must understand that all of this are just temporary workarounds and <i>not</i> a true digital transformation - these approaches will not bring us on par with big techs like Amazon. In the long run, there is no way around actually replacing the TLM with a flexible solution stack that we produce and own ourselves, thus making things like process mining and RPA obsolete. Remember? We need to become a technology company. So if we’re breaking up the monolith and replace it with a modern software architecture pattern, that is about autonomous, decoupled units, which pattern could you think of? Yes, Microservices! 

Microservices oriented patterns have become super popular, and for good reason. Still, they are of course no silver bullet. One problem when designing decoupled, independent and autonomous units is local optimization, which again can become a problem when those microservices need to play together to automate business processes end to end.

Martin Fowler [connects this to the challenge around event driven architectures](https://martinfowler.com/articles/201701-event-driven.html), which often go hand in hand with microservices. In his blog post he writes that "The danger is that it's very easy to make nicely decoupled systems with event notification, without realizing that you're losing sight of that larger-scale flow, and thus set yourself up for trouble in future years" - this larger-scale flow is what you need to be visible when thinking of business process automation. 

 {{<figure src="workflow-events.png" >}}

Again, workflow automation to the rescue: We can integrate a workflow engine with an event bus (like Apache Kafka) in order to observe and correlate events to business processes. This process event monitoring is a bit like process mining, but much more precise, with a complete set of data and in real-time. The potential next stage of this pattern is letting the workflow engine not just subscribe for events but also publish them, which can be seen as a passive-aggressive way to orchestrate microservices. I am just teasing this topic here, but my co-founder Bernd is currently talking and writing a lot about it - if you happen to visit the Apache Kafka Summit in San Francisco (Oct 16-17, 2018), make sure to [attend his session](https://kafka-summit.org/sessions/monitoring-orchestration-microservices-landscape/).

Now let's arrange this whole puzzle on a timeline. Let’s assume it's early October 2018, and you're really pumped about this whole automation thing and you're going to tackle it, like right away.

 {{<figure src="roadmap.png" >}}

So in Q4 you set up a bunch of RPA bots and some process mining to fix some of the most pressing issues you currently have with your TLM. You can use workflow automation to orchestrate some of those bots and get some more end-to-end control about your processes. Then in 2019 you do the <i>actual</i> digital transformation by replacing your TLM with a new microservices based infrastructure, you use workflow tech again to setup the process events monitoring right from the start to check if your processes are actually executed in those microservices as intended, and pretty soon you take this to the next level by seriously orchestrating your microservices and ensure proper, end-to-end business automation with a flexible, scalable infrastructure. You throw away your legacy stuff and you phase out all the patches and workarounds, and by the end of 2019, your digital transformation is complete and you’re the most amazing tech company in your industry. 

{{<figure src="hannibal.png" class="main teaser no-border" >}}

Sounds like a plan, right? Sure, it's a bit simplified, it's a quite ambitious timeline, but at least there is a plan at all. Way too often, when I ask senior executives about their automation strategy I am hearing: "Well, we’re agile, we’re being opportunistic..." and that's exactly when things happen like that comic strip about blockchain. 

So, in summary, you must understand you won’t master digital transformation by introducing any particular product, because BPA done right always means you’re looking at a bespoke puzzle of technologies, that fit together and make sense for your business today, and in order to let it make sense tomorrow, it’s mandatory that this puzzle will always be evolving and changing, not every 10 years but every 10 months. 

# Workflow automation is always one piece of that puzzle







