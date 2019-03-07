+++
author = "Andrea Giardini, Christian Lipphardt"
draft = false
categories = ["Community"]
tags = ["Continuous Integration", "DevOps"]
date = "2019-03-01T08:00:00+01:00"
title = "Camunda's Journey to an Efficient and Scalable CI"

+++

We recently hosted the Berlin Docker Meetup to talk about Continuous Integration and containers. At Camunda we have a long history with Docker. We have been using container technologies for many years to power our Continuous Integration platform and make our products reliable and well tested. During the last year, we focused particularly on Kubernetes and Google Cloud in order to support our increasing workload.

<!--more-->
You can see our full presentation [here](https://docs.google.com/presentation/d/1hNYYcb3tgdHqbkONg4M1vVBhFrbwpMnZxs4wsVQXQbI/edit)

During the Meetup, our DevOps team explained how testing evolved at Camunda over the years and which challenges we had to face. Starting from a single physical machine hosted in our office, we now manage hundreds of builds a day with our Jenkins instances running in the cloud.

As Camunda grew over time, the team had to face several scalability and isolation issues that were making testing very complex.

In general, there are several lessons that we learnt over the years:

- The complexity of the continuous integration system grows in parallel with the number of employees.
- When planning, spend a considerable amount of time thinking about maintainability and updates or they will bite you in the future.
- Managed Kubernetes services are the way to go for an efficient and stable CI. No limitation in term of available resources and no need to pay for idle servers.
- When growing, try to find the degree of autonomy that works for you. Your developers should be able to modify the pipelines and the jobs without asking your team.
- Everything needs to be managed as code. Automate everything you can and leave as little space as possible for manual changes.

### Want to hear more?
Andrea is speaking at [DevOps Pro Europe](https://devopspro.lt/andrea-giardini/) in Vilnius, Lithuania on March 19th. He’ll be sharing his experience of how Camunda has built an extensive CI/CD system based on Jenkins, and share best-practice tips on how you can scale in a complex environment.  
If you have any questions or need further insights to get your workflow processes running smoothly, visit the [Camunda Forum](https://forum.camunda.org/), where our team can help you.
