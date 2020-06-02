+++
author = "Richard Weinberg"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-06-02T14:32:00+02:00"
title = "Camunda BPM 7.13 Released"

+++

We are excited to announce the availability of  Camunda BPM 7.13, the latest release of Camunda's process automation stack, including the core BPMN workflow and DMN decision engines as well as modelling, operations and analytics applications. Here is an overview of the highlights of this release.

## REST API: Open API Support, new lightweight Distribution, Start Process Instance from Modeler

Camunda 7.13 greatly improves how you can use Camunda’s REST API, making it even easier to automate processes in any programming language.
<!--more-->
The REST API is now documented using the [OpenAPI](https://www.openapis.org/) standard allowing you to generate clients in your programming language of choice such as Javascript/NodeJS, Python, C# and many more. The release also introduces Camunda BPM Run, a lightweight distribution to run Camunda as a standalone orchestration engine used purely via REST.

And finally, the new release of the Camunda Modeler makes it possible to quickly test changes to a BPMN model during development by making it possible to start process instances directly from the modeler using Camunda’s REST Api.

## New FEEL Engine, update to DMN 1.3 and improved DMN Modeling

DMN support gets a big update as well! The release adds [a new FEEL Engine](https://blog.camunda.com/post/2020/06/camunda-bpm-runtime-713-released/), greatly expanding support of the FEEL expression language allowing you to implement more complex expressions in decisions. The release also updates the DMN namespace to the latest version of the DMN standard across the full Camunda stack. The Camunda Modeler [improves modeling of DRDs](https://blog.camunda.com/post/2020/06/camunda-modeler-4.0.0-released/).

{{< figure class="no-border teaser" src="1-dmn.gif" alt="New DRD top-down editing modeling">}}

## Track Changes across Process Versions
When working on a BPMN process within a team, it can be hard to track changes made by different people. The [latest version of Cawemo](https://blog.camunda.com/post/2020/04/cawemo-enterprise-on-premises-1-2-released/) that is included in this release makes it easy to track changes across multiple versions of a BPMN process by introducing visual diagram comparisons.

{{< figure class="no-border teaser" src="enhanced-visual-diagram-comparisons.gif" alt="enhanced visual diagram comparisons">}}


## End-to-End Process Monitoring based on Events
And not to be lost, Camunda's monitoring and analytics capabilities have been significantly enhanced as well. Thanks to the new Process Events Monitoring Feature, Camunda Optimize can now truly monitor processes end-to-end facilitating continuous process improvements even if the  entire process isn’t fully automated in Camunda yet. _Read the [Optimize 3.0 release blogpost](https://blog.camunda.com/post/2020/04/announcing-camunda-optimize-3.0/)._
{{< figure class="no-border teaser" src="end-to-end.png" alt="End-to-End Process Monitoring based on Events">}}


More details can be found in the blog posts for each Camunda product module:
<ul>
<li>[Camunda BPM: NodeJS External Task Client, Spring Boot Starter & Assert](https://blog.camunda.com/post/2020/06/camunda-bpm-713-side-projects-released/)</li>
<li>[BPM Runtime 7.13](https://blog.camunda.com/post/2020/06/camunda-bpm-runtime-713-released/)</li>
<li>[Modeler 4.0](https://blog.camunda.com/post/2020/06/camunda-modeler-4.0.0-released/)</li>
<li>[Cawemo 1.2](https://blog.camunda.com/post/2020/04/cawemo-enterprise-on-premises-1-2-released/)</li>
<li>[Optimize 3.0](https://blog.camunda.com/post/2020/04/announcing-camunda-optimize-3.0/)</li>
</ul>

## Join the Camunda BPM 7.13 Release Webinar

Join Camunda VP of Product Management Rick Weinberg as he discusses all of the advantages of Camunda BPM 7.13  in [our release webinar](https://camunda.com/learn/webinars/camunda-bpm-713-release-webinar) scheduled for Tuesday, June 9, at 5 p.m. CEST / 11 a.m. EDT.

[Register now.](https://camunda.com/learn/webinars/camunda-bpm-713-release-webinar)

## Going Forward
We recently modified our end of May and end of November Camunda BPM release cadence. The next Camunda BPM release (7.14) is scheduled for Tuesday, October 13, 2020.
