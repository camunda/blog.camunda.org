+++
author = "Charley Mann"
draft = false
categories = ["Community"]
tags = ["Camunda","Case Study"]
date = "2019-02-14T08:00:00+02:00"
title = "T-Mobile Austria: lessons in successful database partitioning"

+++

T-Mobile Austria is one of Austria's largest telecommunications providers. It serves around 7.5 million customers, with 97% of users accessing fast LTE reception. Camunda is a key layer in T-Mobile Austria’s architecture, helping the company to maintain agility within a complex, large-scale environment. We’ve been working with the team at T-Mobile Austria since 2015, in fact, we just wrote a case study about our work with them.

[Download T-Mobile case study in German](https://assets.ctfassets.net/vpidbgnakfvf/5vuJguInekMAdzBndkF5AA/2e0f79ecedbba0292e6cb7fb4d378ed1/Final_EN_T-Mobile_Austria.pdf)<br>
<!-- [Download T-Mobile case study in English](https://assets.ctfassets.net/vpidbgnakfvf/5vuJguInekMAdzBndkF5AA/2e0f79ecedbba0292e6cb7fb4d378ed1/Final_EN_T-Mobile_Austria.pdf)-->

T-Mobile Austria’s IT team of around 100 developers is responsible for ensuring existing and new products integrate seamlessly with around 40 back-end systems. But it’s not just bringing new products to market where the team excels, it also manages an incredible amount of data, at all hours. One of the solutions it uses –  database partitioning –  is something you can easily implement in your own operations.

<!--more-->
T-Mobile Austria has nearly 100,000 process instances running on any given day in Camunda. The resulting data traffic is traced in [Camunda’s Cockpit application](https://docs.camunda.org/manual/7.10/webapps/cockpit/), and controlled by a comparatively small support team.

But, in little more than a week, T-Mobile Austria can rack up more than a million rows of historical process instances in its database. That’s a big chunk of server space given over to historical data that isn’t necessary for future processes.

To support T-Mobile Austria to process these high volumes of data more quickly and efficiently, we built a new feature that enables database partitioning. Shipped as part of the  [Camunda 7.10.0](https://docs.camunda.org/manual/latest/update/minor/79-to-710/) release, the improved [History Cleanup](https://docs.camunda.org/manual/7.10/user-guide/process-engine/history/#history-cleanup) adds an additional removalTime column to all history database tables - making database partitioning far more straightforward.  Removal time is calculated as the end time of the respective process instance, plus the configured time to live.

Partitioning by removalTime splits the database – organized by removalTime– and stores the resulting partitions in physically separate areas of the server. Entire partitions are then removed when the removalTime lapses. This not only frees up valuable space, it means time-dependent queries can be executed much faster on existing data, within set parameters.  

If this sounds like a solution you’d like to test, you’ll need to set up your operations to scan for and delete the partitioned databases. However, if you’re simply looking to save on server space but don’t want to go down the road of database partitioning, we’ve got another option for you.

### History Cleanup

Built into Camunda 7.10.0 is [Camunda History Cleanup](https://docs.camunda.org/manual/7.10/user-guide/process-engine/history/#history-cleanup). This feature will delete rows of historic data in your database. You’ll save significant space on your server and the Camunda Engine manages the entire function for you – so there’s no need for additional manual work deleting historical data. But if it’s not sufficient for your workload, or you want to avoid fragmentation, try the partitioning approach for maximum throughput and efficiency.

By default, the History Cleanup is based on removalTime, but you can also configure your History Cleanup based on endTime via a [process engine configuration](https://docs.camunda.org/manual/7.10/reference/deployment-descriptors/tags/process-engine/) option. History Cleanup can be used on a regular basis (automatically) or for a single cleanup (manual call), but only [camunda-admins](https://docs.camunda.org/manual/7.10/user-guide/process-engine/authorization-service/#the-camunda-admin-group) have permissions to execute this feature.

It’s straightforward to set up and will save you time and space in in the long run, especially if you’re using the Camunda Engine intensively.  As always, if you experience any bumps in the road, come chat with us on the [Camunda Forum](https://forum.camunda.org/) and we’ll help you find the best solution.
