+++
author = "Niall Deehan"
categories = ["Community"]
tags = ["extension", "hackdays"]
date = "2019-08-28T01:00:00+01:00"
title = "Camunda hackday projects 2019: Fun and Productive"
+++

The hackdays produced a lot of interesting projects and this is part two of those projects. If you want to catch up on all the fun. you can find [part one here](https://blog.camunda.com/post/2019/08/camunda-hackdays-2019-partone/).  We’ve a dichotomy of project types in this post, ranging from those made for fun to those actually helping productivity. The line is slightly blurred on some of them depending on if you consider reading logs fun or not. Personally I find no better way to relax than curling up on a couch and reading through one of my favorite stack traces. Even if we can predictably assume that in the end the NPE did it.

## Fun & Games!
The hackdays have often produced endearing games like 2015's [BPMN Quest](https://blog.camunda.com/post/2015/09/bpmn-quest-camunda-as-game-engine/) or the amazing games like last year's [Camunda Night Mode](https://github.com/SebastianStamm/camunda-night-mode). This year is no exception andhas produced things inspired by both cards and, oddly enough, traffic.

### Execute Exploding Kittens via Zeebe
[Exploding kittens](https://explodingkittens.com/) is described by its creators as “a card game for people who are into kittens and explosions and laser beams and sometimes goats”, so we can assume that  [Philipp](https://github.com/saig0) is the one who like laser beams and [Zell](https://github.com/Zelldon) likes goats. Clearly they both like kittens exploding. They also share in common their love for [Zeebe](https://zeebe.io/), so really this project as a topic should come as no surprise. They managed to model and execute the game, as well as the ability to watch as AI competitors play against each other!!

{{< figure src="exploding-kittens-monitor-1.png" alt="explodeModitor">}}
{{< figure src="exploding-kittens-monitor-3.png" alt="explodeModitor">}}

If you want to learn how to play this came in the most unconventional way take a look at [the code right here](https://github.com/saig0/bpmn-games). 

### Spot it: Camunda
Another card-game-inspired project is [Spot It](https://boardgamegeek.com/boardgame/63268/spot-it).  which on the face of it sounds like a pretty simple pattern matching game. It has 55 cards, each card has eight symbols and the interesting thing is that every card matches another with exactly one symbol. [Maciej](https://github.com/barmac) decided to build a program that can create this game, but instead of using random symbols he decided to do it with BPMN symbols. We had a lot of fun playing this game and it’s so much harder than it sounds. Spotting a non-interrupting escalation boundary event and SAYING it out load are two very different skills.

{{< figure src="spotit.jpg" alt="spotit">}}

You'll find the [code for it here](https://github.com/barmac/spot-it-generator).

### Jenkins Traffic Light
It was explained to us at the beginning of the hackdays by a colleague we call [Yourhighness](https://github.com/JoHeinem) that logging into Jenkins to find out if tests are passing on a build is simply too much work. “What if..” he said, eyes skyward “.. we built a traffic light to hang in office that shows the state of the build!”. This dream was realized with the help of [Sebastian Bathke's](https://github.com/megglos) woodworking skills and Ralf Puchert doing the work of actually coding it. But this project was not without its victims. At least one Raspberry Pi was harmed in the making of this traffic light.

{{< figure src="traffic1.jpg" alt="trafficOne">}}
{{< figure src="traffic2.jpg" alt="trafficTwo">}}
{{< figure src="traffic3.jpg" alt="trafficThree">}}

## Increasing Productivity
This could have has been grouped as "annoying things that need fixing" because this group of projects are clearly inspired by a hatred of dealing with some kind of inefficiency. As I'm sure a lot of people can relate to, frustration is a powerful incentive for a project.

### Environment data collector

{{< figure src="logCollector.png" alt="collector">}}

For anyone who has tried to help someone fix a technical problem, you might have had a conversation that goes as follows:

> **You**: Can you send me the logs?

> **Them**: Sure, here you go

> **You**: No - I need the WHOLE file

> **Them**: Sure, here you go

> **You**: Not those logs, the one from the application

**Years Pass**

> **Them**: Is this what you're looking for?

> **You**: No... that is not a log, it's an orange...

Well Ilias from our support team knows this very well. So what if you could just run a simple little program that just collects the logs you need and sends them to you. Literally YEARS saved. With help from Kyrylo and Mihal they managed to build a lovely command-line interface to help get the right logs and add them to a ticket without needing to go through this whole log-finding fiasco.

### Faster Engine Unit Testing
[Thorben](https://github.com/ThorbenLindhauer) (or T-Dog as he prefers to be called) works on the Camunda BPM platform, making wonderful improvements that we get to enjoy. Those improvements require something called “testing”.As someone who mostly builds PoCs I was unaware of this concept but apparently it is both important and time consuming. If you want to run all the tests written for the engine it can take 30 minutes. T-Dog does not like this at all and took a dive into the test code to see what he can do to speed things up. He found an interesting pattern where, in some cases, the engine was being created within a test when it didn’t need to be. He found where this was happening and removed it. Now the tests take about 13 minutes! A great success all round!

### Zeebe Test Data Generator
[Zeebe's](https://zeebe.io/)development is moving quite quickly, both with changes to the engine itself and to Zeebe’s front end tool [Operate](https://zeebe.io/blog/2019/04/announcing-operate-visibility-and-problem-solving/) This often requires UX and UI testing which, in turn, requires someone to build a model and then start a bunch of processes so that something visual shows up. That someone asking is likely [Nazli](https://twitter.com/nazlikayadesign) from the UX team and someone building the model and data is likely [Menski,](https://github.com/menski) Zeebe's tech lead. Together they created a great way in which you can have a model automatically generated as well as specifically what kind of data you want created. 

{{< figure src="zeebe-generator-create-workflow.png" alt="ZeebeGenOne">}}
{{< figure src="zeebe-generator-create-instances.png" alt="ZeebeGenTwo">}}
{{< figure src="zeebe-generator-process.png" alt="ZeebeGenThree">}}

If you would also like less conversations with your UX team, the [code is available on github](https://github.com/menski/zeebe-test-data-generator)

### Automating the daily absence email
Every morning at Camunda Towers Ellie takes a look at who won't be in work that day and then constructs an email with a list of who won't be in and when they’re expected to return. Cornelius saw it as a travesty that a process-oriented company like ours could let this go unautomated.So he decided to free up some of Ellie’s morning by writing a program that gathers all of the required data and not only sends out the email but also posts it to slack. Now Ellie has to work out what to do with the extra 10 hours a year she has on her hands.

