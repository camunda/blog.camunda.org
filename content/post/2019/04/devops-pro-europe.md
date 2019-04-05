+++
author = "Andrea Giardini"
categories = ["Community"]
tags = ["Community"]
date = "2019-04-05T9:00:00+02:00"
title = "DevOps Pro Europe"
+++

We’ve just returned from [DevOps Pro Europe](https://devopspro.lt/) in Vilnius, Lithuania. This conference focuses on DevOps approaches, tools and methodologies. Many companies attend this event to gain insight into how they can grow their team and get updates about new technologies.

<!--more-->

Camunda was welcomed by the organizers to showcase two events – a pre-conference workshop: Hands-on Introduction to Kubernetes; and a talk: [Jenkins Scaling and Organization for an Efficient CI](https://blog.camunda.com/post/2019/03/camundas-journey-to-an-efficient-and-scalable-ci/).

### CI/CD at Camunda

As you might know, we run a quite large testing infrastructure that ensures our products are well tested and reliable for our users. During our Jenkins talk, we explained how everything started and evolved during the years as the company grew in size. It focused mainly on how continuous integration and continuous delivery is handled at Camunda with the help of Jenkins.

Feedback from the audience was extremely positive and lots of questions came up about Jenkins administration at scale. This still seems to be, as of today, one of the biggest struggles for people managing CI/CD systems. So we’ve answered the three most common questions that arise when teams are considering how best to scale their CI/CD.


### Which alternative to Jenkins to do you suggest?

For Camunda, Jenkins fits quite our scope well and, after years of experience, we are quite comfortable with it. A CI/CD system is a very personal choice and there is no one-size-fits-all. My suggestion is to try to experiment with different projects and figure out which one provides the most value to your developers.

###What about cost? How do you manage such a large cluster without incurring in very high costs?

We work mainly with [Google Cloud preemptible nodes](https://cloud.google.com/preemptible-vms/). These nodes are short-lived compute instances that you can get for a fraction of the price, but that can be re-claimed by Google cloud at any time.

Using these nodes for our workload allowed us to reduce costs significantly without impacting our developers: Jenkins detects automatically if a build failed because a node has been shut down and re-triggers it automatically.

### How do you manage environments for your developers?

Jenkins manages different environments for us. Whenever a developer pushes to a branch that ends with the word "deploy" a new private environment is created with the code that is present in that branch. In this way, developers can test live their changes and share them with other members of the team for review. The environment will be deleted automatically as soon as the branch gets deleted.


## DevOps Pro 2020!

DevOps Pro Europe was a very interesting conference full of quality content and great opportunities for learning and growing. We want to thank the organizers for giving us the opportunity to share the results of our work with people from all over the world. We are looking forward to DevOps Pro 2020!

We hope we’ve managed to give at least a little contribution back to the open-source community by explaining how we handle CI/CD in Camunda. As always, if you have any questions or need further insights to get your workflow processes running smoothly, visit the [Camunda Forum](https://forum.camunda.org/), where our team can help you.
