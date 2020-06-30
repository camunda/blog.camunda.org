+++
author = "Camunda Team"
categories = ["Community"]
tags = ["CamundaCon Live"]
date = "2020-06-30T08:00:00+02:00"
title = "How Real Estate company Keller Williams became a Technology Leader"

+++

Keller Williams is the world‘s leading real estate agency, employing more than 180,000 agents across the globe. This incredible growth story began in a single office in Texas, USA,  in 1983, based on the core belief that real estate is all about relationships. Gary Keller, co-founder of Keller Williams, stated in 2018 that his company no longer wanted to be recognized as a real estate company, but as a technology company.

<!--more-->

_“That means we build the technology… that means we hire technologists.”_

Driven by a desire to foster meaningful relationships, Keller Williams wanted to provide a seamless user experience for agents and customers (both home sellers and buyers) as they navigated the real estate market. They envisioned a highly flexible home-grown solution, instead of a SaaS suite that did not allow for customization.

Today, the Keller Cloud platform consists of two main components: Command and Consumer. Consumer is the customer-facing component of Command -- a powerful, interconnected tool that enables agents to manage contacts, marketing profiles, campaigns and listings. All services are essentially microservices that run in Google Cloud, with Camunda powering the Tasks and SmartPlans components.

{{< figure class="no-border teaser" src="command-dashboard.png" alt="Command Dashboard" >}}

## Evolving an agent-driven Modeling Process

SmartPlans are agent-configurable workflows that orchestrate a number of calls across services inside Command.

“Before Camunda was brought in, Keller Williams had the product vision for what they wanted SmartPlans to be, but the underlying engine was lacking to say the least. It was essentially a low code platform where they had a UI flow builder and they embedded this directly in the UI via an iframe,” Jeremy Warren, Lead Business Automation Engineer at Keller Williams said.

The low-code solution had limited ability to orchestrate integration calls and provided no visibility into workflows as they were executing. This is where Camunda and partner BP3 were brought in to evolve SmartPlans.

{{< figure class="no-border teaser" src="smartplans-pre-camunda.png" alt="SmartPlans - Pre Camunda" >}}

## A Highly Flexible Architecture

In just 10 months, Warren’s team transformed SmartPlans from a low-code platform to a highly flexible architecture, running in Kubernetes in Google Cloud and using the Camunda Spring Boot Starter and NodeJS external task clients, with a React front-end, as well as auxiliary services including a scheduler and controller.

A Subscriptions database was added to the cloud microservices infrastructure, acting as the source of truth for all SmartPlans -- ensuring data is accurate across all services. With Camund orchestrating process logic, the platform was opened up to new patterns, so agents can schedule and stagger their individual SmartPlans. A Google Pub/Sub handles bulk starts and stops and listens to events in other Keller Williams services. Meanwhile, Camunda Optimize provides real-time visibility into workflow processes.

{{< figure class="no-border teaser" src="dynamic-smartplans.png" alt="Dynamic (User Configurable) SmartPlans" >}}

## Agent knows best

Today, SmartPlans enable agents to craft bespoke workflows for their individual contact base, with full customizations based on their own experience to drive business. For example, sending text messages instead of emails to customers because this generates a higher response rate.

Keller Williams provides a library of standard SmartPlan templates that have proven powerful for agents and customers. Each agent can adapt those templates for their own needs or develop new ones from scratch.

To guard against workflow inconsistencies or accidental loops in process flows, Keller Williams opted for a multi-phase rollout of the new solution and put basic guards in place, so that agents don’t get into difficulties when modeling bespoke processes.

{{< figure class="no-border teaser" src="where-we-are-today.png" alt="SmartPlans by the Numbers" >}}

Today Keller Williams processes more than 13 million SmartPlan instances and onboarded more than 56,000 users to the system, as well as garnering positive feedback from agents who have had considerable success through tailored processes.

Keen to dive into greater detail? Jeremy Warren presented Orchestrating User Configurable Workflows at CamundaCon Live. You can [watch the full presentation](https://event.on24.com/eventRegistration/EventLobbyServlet?target=lobby30.jsp&eventid=2295002&sessionid=1&usercd=322756764&eventuserid=322756764&key=8A591F2C3D8E16665CBF053F9BEA6B0A&showCode=eliteCamundaServices&showId=2260438&source=GATEWAY-2260438&rId=2260438&rKey=0A7A4B9DADC849DFAB7ACDDA443BEF42&hidewidgets=player_share_this&showUserActions=rating,comments&oriontokens=eventId-2295002%7CuserId-322756764%7CgatewayId-2260438%7CexperienceId-%7CcontentType-webcast) and [download the slides](https://cdn2.hubspot.net/hubfs/4513465/CClive/Slides_CClive_session_2_JeremyWarren_KellerWilliams_CamundaCon2020.pdf).
