+++
author = "Niall Deehan"
categories = ["Community"]
tags = ["BPMN","Microservices Orchestration","Community Extension","Testing","JUnit","camunda-bpm-asserts"]
date = "2019-06-27T09:00:00+01:00"
title = "The Journey of Camunda BPM Asserts: From Extension to Platform"
draft = false
+++

For the people who have been in any way involved with the Camunda Community the last few years, this is unlikely to be the first time you’ve heard the name [Martin Schimak](https://github.com/martinschimak). Also if you’re a developer using Camunda, chances are that, perhaps unbeknownst to you - you’ve been greatly helped by some of the projects that Martin has created and released as open source extensions for the platform.
Having people like Martin as part of the Camunda Community is an important factor to the success and adoption of the Open Source platform, so I wanted to talk to Martin about how he came to be such a positive influence on the project. Perhaps learning from him how to encourage others out there to do the same.
I spoke with him specifically about the [camunda-bpm-asserts](https://github.com/camunda/camunda-bpm-assert) library that he, along with [Rafael Cordones](https://github.com/rafacm ) and other contributors created, and how he feels about it being recently added as a supported part of the Camunda platform.

<!--more-->

**Niall**: So, what is your background as far as software development goes?

**Martin**: If you want to start at the VERY beginning, I started when I was 10 years old and got access to a manual for an Apple II, eventually from a professional point of view I got into Basic and then Pascal, C and PERL. Eventually at the end of the 90s I got into Java!

**N:** What was the first experience you had with regard to Open Source?

**M:** The developments being made on Linux always fascinated me, but while I was interested I never got involved in contributing. Probably because I didn’t dare to think that I had the skills to be part of something like that.

**N:** I guess It was really intimidating – such a big project and a big community might easily make someone feel inadequate?

**M:** That was certainly an aspect. Also in the beginning of any developer’s career you still don’t know everything - things in the industry are moving very quickly and Open Source is doing everything in public!

**N:** Eventually you found Camunda (Spoiler) of course – can you tell me a bit about how that happened?

**M:** Between 2004 to 2010 – I was working for a very small company with a few other guys dealing with energy trading. Basically making sure both parties understood what energy deal they’ve agreed to in detail. We automated that process with some peer to peer software that worked quite successfully. We were eventually able to sell the company – it didn’t make us rich 😊 but it was a cool experience. The reason I bring this up is because our software had a very complicated process built within it, so I was looking into how we can make this better. I found out about BPMN and, based on the cool picture on the back of Camunda Co-Founders [Jakob Freund](https://twitter.com/jakobfreund) and [Bernd Rücker’s](https://blog.bernd-ruecker.com/) ‘[Real Life BPMN](https://www.amazon.de/Real-Life-BPMN-Analyze-Automate-Processes/dp/1480034983)’ book - 😊 – I thought it could be worth working with these guys. I had some time since the company had been sold, so I wrote an email to Jakob and Bernd. We ended up meeting and getting on really well so I decided to take BPMN training that Jakob was still doing in those days… laughs

**N:** Ah yes, the good ol’ days when Camunda had C-Level executives giving trainings – I’m sure he misses giving those trainings.

**M:** And he’s actually a really good trainer! – Anyway, I then ended up doing my first BPMN project in or around 2012 or 2013.

**N:** So that means you would have been a very early user of Camunda and certainly one of the earliest contributors. So what did the community look like in those early days?

**M:** Umm… well I’ll explain with a simple story - in the very beginning of the Camunda community I was actually working on projects with my friend [Rafael Cordones](https://github.com/rafacm). While he was in Berlin there was an event that featured Daniel Meyer (Camunda’s CTO). During this event he was asked about the community by another attendee. Daniel just pointed at Rafael and said “That guy, along with Martin in Vienna…  that’s the community!”.

**N:** laughing

**M:** Well – it was a joke of course, but also with a little bit of truth there where only a handful of community users at the time, including those guys from [holisticon](https://www.holisticon.de/) like [Jan Galinski](https://github.com/jangalinski ) and [Simon Zambrovski](https://github.com/zambrovski).

**N:** So what inspired you to make something as specific as the Camunda-bpm-assert lib.

**M:** Myself and Rafael wanted to check out what we could do with Camunda. So we decided to build a few showcases.  We were pretty happy about the capabilities of Camunda but we saw that it lacked good functionality around testing. We really couldn’t make sure it would run correctly.

**N:** So once you noticed there was this obvious gap in the feature set how did you go about developing a project to fill that gap? Was there a process in place?

**M:** Well really there was no process, because back then, there wasn’t even the concept of community extensions. So it really just started with conversations we were having with Daniel.He suggested the idea of calling it a “community extension” to ensure it got some visibility in the community but making it clear it was not something that was part of Camunda’s own offering.

**N:** Interestingly when I started as a consultant here at  Camunda, every project we built added your camunda-bpm-asserts library by default. In fact I think it was probably used by all new projects being created in the last few years. Most developers knew it was  a fundamental component to their projects – so how did you come to realize its importance to the community?

**M:** Well actually the importance became clear very early on, because even though the community was still quite small, there was quite a bit of interest. I would see really great feedback on the forum and positive comments and so on. This really inspired me to put more effort in, knowing it was so well liked helped me to ensure we were testing the tests 😊. Knowing that it would be very annoying for people if the testing framework was buggy.

**N:** I can certainly imagine that being a problem alright.

**M:** It was also a way of saving myself time. I was doing my own project work at the time and didn’t have all the time to fix every bug that was found, so I thought I’d better spend a lot of time ensuring the quality of the testing, so that it will be a lot less time consuming later on.


**N:** Another thing just came to my mind – what kind of help with regard to pull requests did you get for your extension? Was the community able to help with maintaining it?


**M:** Yeah, from time to time I would get some pull requests. There wasn’t a lot which I actually quite liked because generally it means that people like what they have, there wasn’t a need to add much more to it.

**N:** How did you deal with updating the extension as Camunda’s features started to grow. I know that one of the features we’ve implemented since taking over the project is that External Tasks feature. It might have been the only feature that needed to be added?
**M:** In that area I think I could foresee that Camunda might be able to do this if they took over the project. Although, at the same time, it was my baby….

**N:** I wanted to ask about that actually – considering this is something that you’ve been working on for so long, how did you feel about giving to Camunda to support?
**M:** Well I’m the kind of guy who quite likes to move on from things that are considered “done” or “successful”. This doesn’t mean abandoning  it – but Camunda taking over will help to make a success out of it.

**N:** So, let's imagine that you’ve got a lot of time on your hands and you decide I’m going to build a new extension. What area of Camunda do you think could use some additional features that an extension can bring?

**M:** That’s a hard one… But I think it would be in the area around building models in code. I know that there is some stuff being done there already, but I think there’s potentially more demand for features there. I also think that by adding a little more to that area users will start to see the potential.

**N:** Do you think it would be a different experience for developers now who feel like they want to contribute with a community extension?

**M:** I really do.As we talked about earlier it’s probably become a little intimidating since the community has grown. I knew those few people in the community who contributed, and it felt a bit like a family. Back then we also had relationships with the core developers. That would be harder these days. If I were starting now I would also be wondering how anyone would notice my new extension. I think that really falls to Camunda to encourage people more and be more available to would be community contributors.

**N:** Well I think that’s a great point and actually this conversation is the starting point for us in a much more developer engagement-focused approach to the community and I really hope we’re able to find more contributors like yourself who are able to have a very positive impact on how people use Camunda. Thanks for the chat! Really fun as always. 😊
