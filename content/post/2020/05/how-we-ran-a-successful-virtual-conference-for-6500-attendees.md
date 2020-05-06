+++
author = "Bernd Ruecker"
categories = ["Community"]
date = "2020-05-06T07:00:00+01:00"
tags = ["CamundaCon", "CamundaConLive"]
title = "How we ran a successful virtual conference for > 6500 attendees"
+++

{{< figure src="https://blog.camunda.com/post/2020/04/camundaconlive/camundacon_live_2020.png" alt=" Camundacon Live 2020" >}}

<!--more-->

We planned to hold CamundaCon in New York City at the end of April. Unfortunately, due to the global situation with COVID-19 we had to cancel, but we still wanted to hold an event for the community. So at the end of April  we ran [CamundaCon Live](https://www.camundacon.com/live/) and it was a huge success.

I asked a lot of people about their experiences with virtual conferences beforehand and promised to write a quick recap of how we did afterward. Here it is

TL-DR
- Using On24 with live talks + Slack
- 2 days, 2 tracks, 2 panels, 5 keynotes, 15 other sessions
- US East Coast-friendly time (10am - 4pm EST // 4pm -10pm CEST)
- 6530 registered participants; 2995 unique attendees; 1214 people joined the Slack channel

[Sandy Kemsley actually made a great summary of how we ran our conference in her blog](https://column2.com/2020/04/camundacon-live-2020-day-2-blockchain-interrupted-and-customer-case-studies-with-capital-one-and-goldman-sachs/):

*I mentioned on Twitter today that CamundaCon is now the gold standard for online conferences: all you other vendors who have conferences coming up, take note. I believe that the key contributors to this success are live (not pre-recorded) presentations, use of a discussion platform like Slack or Discord alongside the broadcast platform, full engagement of a large number of company participants in the discussion platform before/during/after presentations, and fast upload of the videos for on-demand watching. Keep in mind that a successful conference, whether in-person or online, allows people to have unscripted interactions: it’s not a one-way broadcast, it’s a big messy collaborative conversation.*


__Tool Requirements__

It was actually a bit disillusioning checking out existing tooling. Even in 2020, virtual conferences are still a huge challenge. We wanted to:

- Stream talks live in two different tracks. Switching the tracks should be easy for the audience.
- Show presenters live on video feed, as well as their slides.
- Have all talks recorded and available on-demand soon after being live.
- Work without technical glitches, for an audience > 5000 people.
- Create some way the attendees could engage, to make it feel more like a conference than a super long series of webinars.

__Engagement__

Out of that list, engagement is especially a big challenge. For the speaker, it is already hard to not have visual feedback. But how can you keep an audience engaged when you’re just showing videos for hours? Where is the advantage over a YouTube playlist?
And this is the hard part when it comes to virtual conferences. I see different strategies applied:

- Some conferences (e.g. [CyberLand in Germany](https://www.feststelltaste.de/erfahrungen-remote-events/)) did rely on the question tool of the webinar software but had a moderator ready to repeat questions to the speaker at the end of the talk. They made sure to have an extra hour available for questions after the talk (which meant attendees might miss the next talk because they were waiting to ask questions).
- Some conferences switch to recorded talks but with a live Q&A, for example, I will talk at [AWS Community Summit Online in May](https://www.comsum.co.uk/) in this way.
- Some conferences have their own channels open for questions and discussions. This is different to just asking questions into the ether (the webinar QA tool) as you can really discuss with others and follow-up on discussions after the talk.

{{< figure title="" src="https://blog.camunda.com/post/2020/04/camundaconlive/pic2.png" alt=" Camundacon Live 2020" >}}

We decided to create our own Slack channel. It turned out to be a huge success. Around 1,200 attendees, out of 6,500 registered participants joined and there were constant discussions going on. There was a dedicated #community-projects and #ask-the-experts channel available, where all Camunda people hung out and answered any question in a couple of minutes.

There was one channel for every track where questions and discussions around the talks happened. And there was a #general channel where hundreds of people said hello and actually shared their selfie attending CamundaCon. Given that most of them are in their private home offices at the moment, sharing this involves quite a bit of trust. But it did make a huge difference to feeling like you were really attending a conference at that moment - something you could never achieve with pure recordings.

## **camundacon is on a roll**

> Your team's now __1204 members__ strong, with __7368 messages__ sent across __6 channels__. You can track your team's progress via the main menu.

Slack worked quite well for us (even if we are now close to the 10,000 message mark where you either pay or lose history). You can also use direct messages to talk to other attendees (e.g. because they asked some interesting questions) or could even jump in a breakout room (video call on slack). And we also had quite some fun internally — the level of engagement made it really enjoyable as you can easily see from our internal channel:

{{< figure src="https://blog.camunda.com/post/2020/04/camundaconlive/pic3.png" alt=" Camundacon Live 2020" >}}

I am happy that we did not try to do CamundaCon without it.
I heard other conferences using [Discord](https://discordapp.com/) for this matter successfully.

__Live Talks vs. Recordings__

For this decision, you typically weigh the advantage of having a live feeling with the effort and risk (what could possibly go wrong?!).

We actually wanted to do live sessions as much as possible, but we asked every speaker if they were OK with that. In the end, only two talks were pre-recorded, one with a very remarkable reason: The speaker had his last university exam on that day and was not sure if he could make it on time for his talk :-) For some other talks we had mp4 recordings available as a fallback but did not need to use it.

We did not experience a lot of technical glitches, only one talk stopped abruptly because the speaker got disconnected. And in one of the panel discussions, one panelist had to rejoin via phone.

I think these obstacles were worth the gain. I can’t explain why, but a live talk feels much better. It motivates me to join. A recording is more patient, I can also watch it in 10 minutes. Hang, on, there is this thing. Let’s do it later. Or tomorrow. Well, never. This also kills the live comments and discussions on Slack easily.

Earlier this month I talked at [AllTheTalks](https://www.allthetalks.org/), which was awesome by the way. They also had mostly live talks, but also a couple of recordings. It was interesting to see for myself, that I was not really motivated to watch the recorded ones. But maybe that’s different for other people?

__Tooling__

Let’s talk about tooling. There is huge opportunity for a good virtual conference tooling to hit the market right now. So far, I haven’t seen the perfect solution. This is what we looked at:
- [On24](https://www.on24.com/) (which is what we went with): This is a proven live event platform. The speaker UI isn’t super great but did work in the end for all of the speakers. The attendee experience is actually pretty OK and better than what we have seen with other tools. We trusted their ability to serve the number of attendees we expected.
- [Hopin.to](https://hopin.to/): I heard of this tool from a couple of people, but it is pretty new and I didn't even manage to get preview access. The upcoming [MicroXchg](https://microxchg.io/) will use it and I am looking forward to testing the experience.
- [Twitch.tv](https://www.twitch.tv/): Being kind of the nerd-internet-TV, twitch can be leveraged for live conferences (I personally will see that happening with [AWS Community Summit](https://www.twitch.tv/awscomsum)).
- Webinar tools like GotoWebinar, BigMarker, Zoom Webinars, Adobe Connect, Google Meet.
- Other tools I saw being used (but we have not investigated further): [https://socio.events/](https://socio.events/), [https://www.cube365.net/](https://www.cube365.net/)
Some back end considerations that our marketing kept in mind when considering the platforms:
- Single sign-up experience. We did not want users to register for 20+ sessions separately.
- Support for pre-registration. We had to start promoting the event before we even had the platform. So pre-registered users would need to be imported without having to re-register.
- Integration with our CRM tools.
- Analytics (e.g. around registered vs. attended by session)
- Onboarding and event support within a super short time frame.
- Own event website provided by the tool to save effort on our side.
In the end, ON24 cut it and we were happy with it.

__Moderation And Support__

{{< figure src="https://blog.camunda.com/post/2020/04/camundaconlive/pic4.png" alt=" Camundacon Live 2020" >}}

There was a lot of work done in the background that you hardly saw. Every track had a producer that verified the tooling worked well. Every session had a support person from On24 joining to sort out any issues.

One more visible aspect was a very important one for the experience: the moderators. Every track had its own video/session moderator as well as a Slack moderator assigned. The video moderator did not only announce the speaker but also had a look at the questions (in On24 and Slack) and thus could moderate the Q&A at the end of the talk. This is a must-have.

The additional Slack moderators made sure that questions in Slack were addressed, often directly during the talk and afterward. They also made sure to motivate people to ask questions.

And as you can see with my colleague [Niall](https://www.linkedin.com/in/niall-deehan-07455a47/) — moderating can also be quite fun and helps keep people engaged ;-)

{{< figure  src="https://blog.camunda.com/post/2020/04/camundaconlive/pic5.png" alt=" Camundacon Live 2020" >}}

__Smaller Conferences And Meetups__

I want to add that we ran a relatively big conference. If you have smaller conferences or meetups with around up to 100 or 200 attendees, I also saw simple video conferencing options work very well, this includes:

- Zoom, seen in the wild at a couple of meetups up to 100 people. Make sure you apply [some best practices](https://twitter.com/patrickdebois/status/1243108672269619200?s=20) around security to avoid spam or people taking over your screen sharing.
- [Videofacilitator](https://www.videofacilitator.com/) as it was used by [Agile Cologne](https://www.agilecologne.de/de/).
- BlueJeans, SendBird, or others.

__Some Numbers And Feedback__

Here are some interesting stats we gathered:

- 6530 Registered Users
- 2995 Unique Attendees (45.8%)
- Live Attendees/session: 809
- Largest session: 1732 live attendees (2070 registrations)
- Average sessions attended: 7 sessions
- Average time (minutes): 181 minutes
- Questions asked: 407 questions
- 8960 hours of content consumed
And we got super positive feedback:

{{< figure  src="https://blog.camunda.com/post/2020/04/camundaconlive/pic6.png" alt=" Camundacon Live 2020" >}}

{{< figure  src="https://blog.camunda.com/post/2020/04/camundaconlive/pic7.png" alt=" Camundacon Live 2020" >}}

{{< figure  src="https://blog.camunda.com/post/2020/04/camundaconlive/pic8.png" alt=" Camundacon Live 2020" >}}

__Now — can It Replace an In-person Conference?__

To be clear: I just describe my personal gut-feeling here. Whatever I say is not a decision of Camunda. Actually, when it comes to deciding about CamundaCon, it is the call of our great marketing folks, together with our epic developer relations team, not me!

That’s said, I think it was a great experience and there is definitely a big upside in doing CamundaCon as a virtual conference. We had a much greater outreach. We had more attendees than we would have had in New York. People joined from all over the world, sometimes in the middle of the night.

And this is actually a big pro-argument: This way of running a conference makes it so much easier for everybody to join, independent of their location, budget, travel constraints or the like. And I got the impression that some people even engaged better on Slack more that they would have in-person. So, yes, I think it would be great to keep running virtual conferences in the future!

But of course, there are downsides as well. You simply do not meet people in person, which is still a very different experience. I have made so many friends at conferences over the years, which would not have happened virtually. And our salespeople or consultants typically meet with a lot of prospects, which allows building a more trusted relationship on a personal level, which is really hard to replace. Also, it gets much more tiring to sit in front of your computer the whole day, probably with your kids disturbing you every other hour. So, no, I don’t think virtual conferences can replace in-person events!

So I am still curious myself, what strategy we come up with for CamundaCon in the future — but I totally trust our world-class team to make the right decision.

A very last remark: Note that we are doing a vendor conference. We don’t do conferences to earn money, but to get the community together and foster knowledge sharing. So we don’t mind that we do the conference for free and can’t sell any sponsoring packages. Incoming money for in-person conferences is directly routed to venues and catering anyway. But this is a whole different story for professional conference organizers that need to earn their money. I think, going virtual is not really an option for them.

__Conclusion__

CamundaCon live was a lot of fun and a huge success. I can just motivate everybody to run a virtual conference. Aim for live talks and a good engagement channel on the side. On24 and Slack served us well.

Don’t underestimate the amount of effort that goes into the organization. We had a lot of people working enthusiastically behind the scenes to make it happen. Thank you all folks — you are truly awesome!


__Want to see what we did?__

One great thing about a virtual conference is that you can watch it all again on-demand. The [CamundaCon recordings](https://www.camundacon.com/live/) and [slides](https://gateway.on24.com/wcc/gateway/eliteCamundaServices/2260438/category/29156/slides) are live for your viewing pleasure!
