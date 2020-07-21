+++
author = "Bernd Rücker"
categories = ["Community"]
tags = ["Fast Starts"]
date = "2020-07-21T09:30:00+00:00"
title = "From Project to Program: Scaling Camunda Adoption in Your Company"
+++

How can you move beyond your first project and automate hundreds of processes successfully using an agile step-by-step approach? For the last 10 years we’ve been helping businesses to automate workflow processes, migrating from monolithic systems into agile, scalable ways of working. And we’ve discovered that you don’t have to start with a big bang approach - in fact, starting small is the fastest and most effective route to digital transformation.

<!--more-->

In this series, we’ll be taking a closer look at Camunda adoption, choosing the right architecture for your use case and assembling teams that are best placed to drive transformational technologies.

I wanted to write this blog because we often get questions like:

* How can we scale Camunda adoption within the enterprise?
* How can we set up a company-wide workflow platform?
* We have seen the scale of Camunda adoption within Goldman Sachs (3000 workflows, 8000 daily users), Societe Generale (600 workflows, 60k human tasks completed/month, 7500 active users) or 24Hour Fitness (800 processes, 230M activity instances/day), how can we get there?

{{< figure class="no-border teaser" src="screen-camunda.png" alt="Some slides from Camunda Con Live 2020" >}}
_[Some slides from Camunda Con Live 2020](https://www.camundacon.com/live/hub/)_

Spoiler alert: If you want a company-wide platform, don’t start with a company-wide platform!

## A Real-life Success Story
Let’s find out why and start with a real-life success story, which a lot of our customers can relate to. It is about an insurance company with around 7000 employees, where I could observe progress over the last five years. Unfortunately I can’t name them here.

In 2014 they formed a team to automate the handling of specific claims around their car insurance. This was a real pain back then, as the existing claim handling was mainly manually driven and spanned a couple of organization units. This made it easy to build a business case for the project and to get buy-in from top management. This was further backed by the strategic initiative to intensify “process orientation”, that was a hot topic for insurances back then.

As part of this project they:

* evaluated a workflow tool,
* modeled the workflow,
* implemented the whole workflow solution,
* integrated it with their existing user interface,
* integrated it with their existing SOA infrastructure,
* exported relevant data into their data warehouse
* And went live and operated it.

The project went relatively smoothly and took around 12 months. After that project, the team was reorganized into its own department. They were given the responsibility of helping other teams design and develop workflow solutions. In the first two to three years, they did a lot of the implementation work for these teams, but over time evolved into an internal consulting task force that “just” helped other teams to get started.

They naturally became the go-to place for any questions or discussions around workflow tooling and thus not only made sure experiences and learnings were kept, but also facilitated knowledge sharing across the entire organization. In the meanwhile, they run an internal BPM blog, organize their own training classes and manage an annual internal community event where different teams can share best practices.

While they did develop some tools on top of Camunda, they never forced anybody in the company to use them. And while they started operating a central BPM platform back in 2015, they moved away from this model to allow people to run their own engine. They still provide reusable components around Camunda, e.g. to hook into Active Directory or to talk to their internal ESB, but these are provided as additional libraries to teams building workflow solutions.

By the end of 2019 they had almost 100 different workflow solutions running in production. Not only is the workflow team super satisfied, but so too are upper management.

## Elements of a Successful Adoption Journey

You can derive a lot of learnings from the initial example, backed by many other stories too:

* Start with a project, not a program.
* Don’t start big and strategic endeavors too early in your journey. Instead, go step-by-step until you are ready to scale.
* Resist the temptation to create your own platform.
* Get buy-in from your decision-maker. This is much easier to obtain when there is some real pain that your workflow is going to solve.
* Let your lessons learned influence your target picture, don’t just adopt some consulting company’s best practices.
* Make sure you give experienced people the opportunity to help in follow-on projects.
* Capture best practices and ensure knowledge sharing.
* Provide reusable components if they increase productivity, but as libraries that teams want to adapt (instead of have to adapt).
* Establish an internal consulting approach, probably organized as a [center of excellence](https://en.wikipedia.org/wiki/Center_of_excellence). At least identify and nurture one well-known champion in the enterprise that can drive the topic.
* Define learning paths for new people or teams.
* Make sure to let projects breath and make their own decisions.

In the next blog, we’ll look into the phases of the Adoption Journey and how to ensure you deliver business value with your workflow automation projects right from the start.

If you’re interested in more, have a look at the Camunda Consulting team’s [Customer Success Path](https://camunda.com/best-practices/following-the-customer-success-path/), which steps through the most effective way of introducing Camunda as a new BPM platform inside any company.
