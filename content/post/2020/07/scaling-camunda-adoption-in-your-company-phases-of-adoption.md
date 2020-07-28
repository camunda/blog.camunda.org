+++
author = "Bernd Rücker"
categories = ["Community"]
tags = ["Fast Starts"]
date = "2020-07-28T08:00:00+02:00"
title = "Scaling Camunda Adoption in Your Company - Phases of Adoption"

+++

How can you move beyond your first project and automate hundreds of processes successfully using an agile step-by-step approach? For the last 10 years we’ve been helping businesses to automate workflow processes, migrating from monolithic systems into agile, scalable ways of working. And we’ve discovered that you don’t have to start with a big bang approach - in fact, starting small is the fastest and most effective route to digital transformation.

<!--more-->

In this series, we’ll be taking a closer look at Camunda adoption, choosing the right architecture for your use case and assembling teams that are best placed to drive transformational technologies.  

## Phases in Your Adoption Journey

From hundreds of real-life projects over the years, we derived a simple pattern that is most successful when introducing workflow tooling into an organization (our consulting team described it in a best practice called [the customer success path](https://camunda.com/best-practices/following-the-customer-success-path/)):

{{< figure class="no-border teaser" src="phases-your-adoption-journey.png" alt="Phases in Your Adoption Journey" >}}

## Start first with a Pilot Project

The goal of this project is to define and validate architecture and stack. Very often, this pilot project is set up as a [proof-of-concept (POC)](https://camunda.com/best-practices/doing-a-proper-poc/). However, it is important to go-live with that pilot to really learn about all aspects of the workflow solution throughout the full software development life cycle. You should choose a scenario where you can show at least some of the benefits of workflow automation (e.g., increased efficiency, effectiveness, compliance), as many people, including decision-makers, will be interested in quantifiable results.

Soon after running a successful pilot, you should tackle a __lighthouse project__. This project has a broader, more realistic scope and can be better leveraged to show off architecture, tooling and value of workflow automation to other people and teams within your organization. Make sure to select a relevant use case - use caution and avoid political workplace suicide missions!

And only then should you consider the next step -- scaling Camunda adoption across your enterprise. Still you should enter this phase slowly. Make sure to not go too broad before you have experienced enough relevant learnings in at least a handful of projects.

## Start with a project, not a program!

This is so important that I deliberately repeat it throughout this post: Concentrate on delivering business value with your workflow automation projects right from the start. This means two things.

* Do a concrete project and avoid strategic platform initiatives for as long as possible. Doing too much strategic work too early runs a high risk that you don’t deliver any business value for a long time and probably get completely stuck in shaping a complex platform, without understanding its use case.

* Second, favor agile development approaches that develop workflow solutions iteratively and incrementally. This allows you to learn fast and let these learnings correct your course. This is a very positive and motivating spiral that we have seen work successfully for many customers.

## Don’t Get Stuck in Big Platform Initiatives

_“We want to build a company wide BPM (or process automation) platform on top of Camunda — how can we do this”?_

This is a very common question and its motivation is often two-fold. First, you don’t want to be dependent on Camunda too much and second, you might need some integration into company specifics that all projects can leverage. Some companies even assemble a whole SOA or integration stack with components of different vendors.

This is a risky endeavor for multiple reasons: It is quite hard to set up a bespoke platform and it will distract you from delivering business value. It makes it hard to include learnings in later projects, as you settle on certain architecture primitives very early in your journey. Also, it's complicated and time consuming to keep such a platform up-to-date or to fix bugs. Or simply to make all features of the underlying products available and to include new features of new versions. And finally, you simply can’t google for problems in your own bespoke platform, but you can for well-known open-source products.

So far, every one of these initiatives I saw struggled, especially if they started too early in the journey. You should not think about creating a bespoke platform before you have a couple of projects live, so that you can really understand the common characteristics and double-check the value and applicability with each project.

Of course, you might still do some work in the initial projects to make operations or enterprise architects happy. For example, you might integrate into your authentication and authorization infrastructure or make sure the workflow tooling adds its logs into your central logging facility.

## Dos and Don’ts Around Reuse

Reuse can make a lot of sense as you can save effort and costs. If all of your workflow solutions need to communicate with your messaging infrastructure (or worse: your mainframe!), you don’t want to reinvent that wheel in every project.

Instead of building your bespoke platform, another pattern can turn out to be really successful. Think of reusable components or libraries as internal open-source projects. You offer it to your company and provide some resources and help. If it’s great, most people will happily apply it. But nobody has to, probably with the exception of the very first projects, where you evolve these libraries hand-in-hand. If projects need some additional feature they are not locked out, but can always provide pull requests — or fork the project. This model of thinking scales much better and does not block any team from being productive.

Camunda constantly increases its support for this kind of reuse, for example by a worker catalogue. This will allow you to register [external task workers](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) that can be easily reused in your workflow models using the graphical modeler. These workers (or connectors if you will) can, for example, [connect Camunda to your RPA tool](https://blog.camunda.com/tags/rpa/). This approach can make your developers more productive, without restricting anybody to only use these connectors. It concentrates on helpful guidelines instead of putting constraints in place.

Most workflow initiatives also create the idea of extracting process fragments that can be reused in different business processes. I am very skeptical about this. If this is done within one project team, it is totally fine. If these fragments should be shared across teams, you should not do process fragments but instead extract your own services with a properly defined capability and API. It will become an implementation detail that there is a workflow at play. The concept of [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html) is applicable, if you are familiar with DDD, which brings us to microservices.

In fact, in our next blog, we’ll tackle microservices and how to best manage a decentralized workflow engine, as well as how to leverage cloud to ease provisioning.

If you’re interested in more, have a look at the Camunda Consulting team’s [Customer Success Path](https://camunda.com/best-practices/following-the-customer-success-path/), which steps through the most effective way of introducing Camunda as a new BPM platform inside any company.
