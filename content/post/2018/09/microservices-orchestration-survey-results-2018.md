+++
title = "The Results Are In: A Recap of The 2018 Microservices Orchestration Survey"
description = "In July 2018, Camunda fielded our first-ever microservices orchestration survey. We've analyzed the results, and we're ready to share them with you. Learn how members of the Camunda community are approaching microservices architectures and the problems and benefits they're encountering along the way."
date = "2018-09-25T07:00:00+01:00"
author = "Mike Winters"
categories = ["Use Cases"]
tags = ["survey"]
+++
In this blog post, we'll share a few highlights from the microservices orchestration survey that we fielded in July 2018. [If you'd like to download a report with results, you can do so here](https://camunda.com/microservices-orchestration-survey-results-2018/?utm_campaign=2018%20-%20Microservices%20Survey&utm_source=camunda-blog).
<!--more-->

* [About the survey: why learn more about microservices?](#about-the-survey)
* [How we carried out the survey](#how-we-carried-out-the-survey)
* [Survey highlights: a quick review of the data](#survey-highlights)

## About the survey: why learn more about microservices architectures? {#about-the-survey}

We at Camunda have been [talking to users and customers about how and why to use a workflow engine in a microservices architecture](https://blog.bernd-ruecker.com/why-service-collaboration-needs-choreography-and-orchestration-239c4f9700fa) for a long time now. Over the past couple of years, we've collected anecdotes and [incorporated product feedback into Camunda BPM](https://blog.camunda.com/post/2018/05/camunda-bpm-790-released/) so that we can better support the use case.

In mid-2017, we started our work on [Zeebe](https://zeebe.io), a next-generation workflow engine that can scale to millions of new workflow instances started per second and is built with the microservices orchestration use case at top of mind. And we've seen Camunda users give in-depth presentations about how they're using a workflow engine to [orchestrate microservices](https://vimeo.com/280347763) in the [real world](https://vimeo.com/280348196).

What we were missing, though, was a broad-reaching set of data that described how members of the Camunda community as a whole were approaching their microservices architectures: the reasons they're adopting or not adopting microservices, the supporting tools and frameworks they're using to run their microservices, the benefits they're reaping and challenges they're encountering, and more.

It's not that we ever doubted that there was a real problem that needed solving in the orchestration realm. Beyond our firsthand experience with customers, we saw that some of the earliest adopters of microservices architectures--including Netflix, Uber, Airbnb, and ING--also came to the conclusion that it was to introduce an orchestration layer to monitor and manage long-running business processes that span multiple microservices. All four of these companies have open-sourced the frameworks they built for orchestration and have spoken or written publicly about why microservices orchestration is important to their success.

Of course, we wanted to get more insight into this core orchestration problem in the survey. But we also wanted to go beyond that and fill in some of the blanks around the general patterns and trends in microservices architectures within the Camunda community.


## How we carried out the survey {#how-we-carried-out-the-survey}

We are thrilled with the feedback we received, and we ended up with 354 responses to the survey. Respondents came from 51 different countries and 12 different industries. So that you know exactly how we managed the survey, here's a quick rundown of operational details:

*   We worked with a professional research firm called [Researchscape](http://www.researchscape.com/) to design the survey questions and to build the online survey itself; Researchscape also worked with us on data cleansing and analysis after the survey was closed for responses.

*   The survey was distributed via various Camunda and Zeebe channels, including our email lists, our websites, social media accounts, support forums, and Meetup groups.

*   We didn't use any sort of "independent panel" for survey responses, as we were primarily interested in feedback from users who were in some way connected to the Camunda community. However, only 33% of respondents are using Camunda in production.

*   Nearly all questions were optional, and respondents were allowed to answer the survey anonymously. We wanted to ensure that no respondent felt as though they needed to share confidential information about their organization in order to participate in the survey.

*   The survey was open for responses between July 9 - July 30, 2018.

## Survey highlights {#survey-highlights}

In this post, we'll mention a few key data points from the survey. [We also created a more detailed report with the results that you can download here.](https://camunda.com/microservices-orchestration-survey-results-2018/?utm_campaign=2018%20-%20Microservices%20Survey&utm_source=camunda-blog)

{{< figure src="microservices-challenges.png" alt="Challenges faced by users who are building microservices architectures" >}}

**Microservices adoption**

*   64% of respondents are using microservices for some (46%) or all (18%) of the applications they're building.
*   Another 28% aren't yet using microservices in their applications but are considering microservices.
*   Only 7% have have decided they won't use microservices. Why not? The two most common reasons are the unnecessary complexity that microservices would introduce to the engineering organization and microservices not being the right fit for the use case.

**Microservices benefits**

*   64% of microservices adopters say microservices have resulted in improved scalability of applications, and 60% are able to bring new products to market more quickly.
*   On the business side, 64% cite improved employee efficiency as a benefit of microservices, and 58% say microservices allow them to deliver a better customer or end user experience. 40% expect cost savings on infrastructure or other development tools as a result of adopting microservices.

**Microservices challenges**

*   59% say one of the challenges with a microservices architecture is a lack of visibility into end-to-end business processes that span multiple microservices, and 50% cited ambiguous error handling that leads to unaddressed errors at the boundaries between microservices.
*   But 50% of respondents don't explicitly document the business processes that microservices are a part of or don't consider microservices to be part of broader business processes
*   And 41% work for organizations don't have a uniform approach for handling errors at microservice boundaries.  

**Microservices tools and programming languages**

*   88% of respondents are using REST APIs for communication between microservices, while 46% are using Apache Kafka.
*   46% of respondents work for organizations that use a set of company-wide tools for monitoring individual microservices, and these tools are configured so that each team can see metrics and logging for its microservice only.
*   89% of respondents build applications in Java, while 60% use JavaScript and 25% use C# or Python.
*   41% of respondents use Kubernetes for resource management or container orchestration, while 23% don't use a resource manager.

We'd like to extend our thanks to everyone who participated in the survey. We found the input to be very useful, and we hope you did, too.

To learn more, [take a look at the full report](https://camunda.com/microservices-orchestration-survey-results-2018/?utm_campaign=2018%20-%20Microservices%20Survey&utm_source=camunda-blog) or [read our press release covering the survey results.](https://camunda.com/about/press/new-research-shows-63-percent-of-enterprises-are-adopting-microservices-architectures-yet-50-percent-are-unaware-of-the-impact-on-revenue-generating-business-processes/)

<link rel="canonical" href="https://zeebe.io/blog/2018/09/microservices-orchestration-survey-results-recap/">
