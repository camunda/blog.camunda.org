+++
author = "Jakob Freund"
categories = ["Community"]
tags = ["Zeebe", "Workflow", "BPM"]
date = "2019-07-17T0:00:00+01:00"
title = "The Zeebe Story"
+++

I’m incredibly excited that Zeebe is now GA and ready to be used in production. You can [download the distribution](https://docs.zeebe.io/introduction/install.html) and [inspect the source code](https://github.com/zeebe-io/zeebe) on GitHub.

Zeebe implements fundamentally new concepts for workflow automation which allow for unprecedented horizontal scalability. With Zeebe, you can orchestrate microservices of any scale while ensuring complete visibility into the executed business processes. This solves one of the major problems we are seeing in the software development space today, a problem that cannot be solved by any of the existing workflow products in the market.

<!--more-->

You can find an explanation of Zeebe's value and how it can impact your projects in my Co-founder [Bernd’s blog post](https://medium.com/@berndruecker/45788a90d549).

In this blog post, I want to focus on a journey that began almost seven years ago and led us to this point. It’s the story of a young company that started as a consulting business and then launched its own software product, with no external funding and no experience in basically anything we were about to do. It’s also the story of a young engineer who couldn’t sleep until he solved the “big workflow problem”. And most of all, it’s a story about the kind of people you need to make great things happen.

## The Pride of an Entrepreneur

I can’t fathom how many times I’ve told the Camunda story over the years:

We started as consultants for BPM back in 2008, understood that the dominating BPMS products (mostly from big vendors) didn’t cut it, launched Camunda BPM in 2013 as a developer-friendly alternative and built an international software business with rapid revenue growth each year. Today we employ more than 130 amazing colleagues, and thousands of organizations use Camunda to automate their core business processes, among them Allianz Insurances, Goldman Sachs and T-Mobile. All of that while still being profitable and without piggybacking on any hype topics like RPA or low-code, but simply by solving an actual problem with an outstanding product.

As an entrepreneur, I am obviously very proud of this story. In truth, however, my share in this success is small. It was the team at Camunda that made it happen, among them Daniel Meyer.

## A Lucky Shot

Daniel joined us in November 2010 as a working student. My Co-founder Bernd and I were not actively hiring at that point, since we were running a small consulting boutique and had no specific growth ambitions. But when we received his application that clearly conveyed Daniel’s passion for workflow engines, we decided to have a chat. Daniel came across as smart and friendly, and we liked him. Today, we employ extensive job candidate screening procedures, including task assignments, multiple interview rounds, reference checks and what not. But back then, Bernd and I just looked at each other and said “seems to be a great guy, let’s give it a shot”.

## Sometimes you just have to be lucky.

Soon after he joined us, Daniel added significant value to our consulting practice, and when, in late 2012, we decided to launch our own BPM product, he was a fresh full-time employee and already the factual technical lead for this project.

## An Idea, a Tough Ride and Sleepless Nights

It was back then that Daniel mentioned for the first time that a workflow engine based on new paradigms could make a lot of sense. Simply put, his issue was that persisting the workflow state in relational databases was a natural ceiling for the horizontal scalability of any workflow engine. This wasn’t a problem for most of the use cases you saw in the BPM space back then, but it limited the potential set of use cases where you could apply workflow as a technical concept in software development beyond BPM, especially when creating high volume transaction applications.

We discussed his thoughts, but all of us (especially Daniel) agreed that we were far from ready to create an actual new engine, mostly because we understood the problem, but we did not yet know the solution. And we saw the potential to truly disrupt the BPMS industry without solving that problem in the first place, since most BPMS users had other pain points, such as a bad developer experience and a lack of process visibility for business stakeholders.

Hence we created Camunda BPM by forking another open source project that we had contributed to before. That project had  somehow stalled and wasn’t progressing, and compared to Camunda BPM today, it was very rudimentary. Nevertheless it was a great basis for us to implement all our ideas around an excellent developer experience as well as business visibility by leveraging the BPMN, and later the DMN standard. Daniel took over the responsibility for this product and eventually became Camunda’s CTO. During these past six years, he has built a product organization with more than 60 employees covering software engineering and many other functions.

It was a tough ride and certainly more than a fulltime job, but during all these years the “big workflow problem” kept nagging at him. So for a while, Daniel would get up in the middle of the night to do lonesome hack sessions until dawn, and then go to the office to manage a fast-growing team as a day job. I started to worry about his health, but I knew it was impossible to stop him, so I crossed my fingers and hoped for the best.

And one crisp, sunny morning in the autumn of 2015, Daniel came to my desk and said: “I think I’ve figured it out:”

So we decided to invest, and, in 2016 Daniel set up a dedicated team with Thorben Lindhauer as his first teammate.Today Thorben is the technical lead for Camunda BPM. That team would build the first version of Zeebe.

## Showtime

BPMNext is an annual industry conference hosted by Bruce Silver, known for his recommendable book <i>“BPMN Method and Style”</i>. Held in Santa Barbara in Southern California, BPM software vendors like to go there and show off their latest features. It’s a bit of a family gathering where you can meet your competitors and a few industry analysts, and have some excellent wine, so you can’t really justify it for sales purposes. Despite, or perhaps because of that, I always enjoyed going there. One funny thing is the “best in show award”. At the end of the conference there’s an audience vote about the best presentation, so it’s basically BPM software vendors voting which of their competitors has delivered the best presentation. I always wanted to win that award because... well... just because.

We did manage to win it in 2016, with our implementation of the DMN standard. So when Daniel and I travelled there to show off Zeebe one year later, we felt a bit pressured to repeat that success. We obviously didn’t have a lot of time to prepare that show since we were heads down with building our company, so we did the entire preparation on the 15 hours flight to Los Angeles. This is a picture of Daniel on the morning before the presentation, and as you can guess we were not at all sure how it would go.

{{< figure src="zeebe-img-1.png" alt="The Zeebe Story - Daniel Meyer">}}

It went well, and you can [watch the recording](https://www.youtube.com/watch?v=xlRGtAjpylc) if you like. So we won the best in show award for the second time, and felt that we were on the right track.

## A big Rework

A few months later we published the first alpha release on https://Zeebe.io.

We saw some significant interest right away, especially from larger organizations that were setting up extensive microservices based architectures. It was around that time that Bernd started to speak publicly about the challenge of integrating microservices, and he truly hit a nerve. Last year alone, Bernd spoke at more than 50 conferences, and almost always about the problems for which Zeebe has been designed to solve. You can find an overview of his presentations [on his website](https://berndruecker.io/).

Soon, people started to evaluate these first versions of Zeebe, they liked what they saw and they urged us to extend the feature set and provide a version that we claimed production ready. As we had expected, these people had often no specific awareness of BPM, however the problems they needed to solve were clearly workflow automation problems. So we spoke to them, conducted joint proofs of concept and incorporated their feedback in the further development of Zeebe. Some early users even started to contribute to the project already, for example an Australia-based company that [created a Node.js client for Zeebe](https://medium.com/@sitapati/node-js-client-for-zeebe-microservices-orchestration-engine-72287e4c7d94).

Still, it would take another two years before we decided that Zeebe was ready for production usage.

One reason for this is a complete rework of the architecture that happened in 2018, when we were already achieving great scalability, but not yet the resilience and fault tolerance we considered mandatory for a technology like this. After all, this workflow engine will execute the mission-critical core business processes of an organization - if this breaks down, it can be fatal for the business. This is one of the many areas where we have greatly benefited from the fact that we already have a successful product that is almost always used in such mission-critical situations, though not on the same scale in terms of transaction volumes. The experiences we have made with our customers have taught us everything we needed to know about the respective requirements, and they made us sensitive enough to invest in this rework rather than just pushing Zeebe out of the door.

By the time we made this decision, the Zeebe team consisted of a half dozen, incredibly smart and dedicated engineers, headed by Sebastian Menski. It was them who did this rework and then relentlessly pushed on to implement the first increment of a feature set that you would want to have in place for a successful microservices orchestration project.

## It’s the People

Today, we’re not just celebrating the Zeebe GA release, but also the fact that it’s not a single mastermind’s creation anymore. Zeebe was created by a whole team of masterminds. And, quite honestly, I deem this even more important.

As you can imagine, it can be a challenge for the CEO of a small company that’s growing rapidly, to stay patient and keep investing in such an uncertain endeavour - especially when this invest has to be funded by customers instead of a VC. But I firmly believe that great things require focus, patience and perseverance, so personally I found it surprisingly easy to stay firm and hold a steady course.

It is my privilege that I’m surrounded by people who share this belief, and never once complained or urged me to deprioritize this project. These people, the whole staff at Camunda, built a thriving business that was not just self-sustaining while growing fast, but even generating profits so generously that we never lacked the capital to invest in Zeebe and anything else we wanted to invest in.
I find it remarkable that during this whole time, we managed to maintain a friendly, warm and collaborative culture, where the Zeebe team was neither seen as an elite, nor criticized for biding their time. Everyone just supported each other and it felt completely natural.

The Zeebe team built this engine, but the whole Camunda team pulled it off.

The end of a story that is just the beginning

And this is the end of a story that is truly just the beginning. We’ve come a long way, and the road ahead is anything but clear. But that is the nature of disruptive innovation, and I cannot wait to see what Zeebe is going to become.

If you’re curious too, I recommend you join us for [CamundaCon](https://www.camundacon.com/) in Berlin, where you will not only learn what’s next, but also meet the extraordinary people that this story was about.

And if you feel that this could be a team worth joining - [join us](https://camunda.com/de/career/) !
