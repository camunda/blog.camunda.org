+++
author = "Charley Mann"
categories = ["Community"]
tags = ["Camundacon"]
title = "CamundaCon 2019 - Indiana Farm Bureau: Camunda for Modern Web Applications & Reusable DMN-driven Survey Forms"
date = "2019-08-08T12:00:00+04:00"
+++

When Indiana Farm Bureau’s Sowmya Raghunthan, IT Application Architect; and Corinna Cohn, Senior Web Developer, sat down to develop an app using Camunda as a headless BPM, their research drew a blank. This September at [CamundaCon](https://www.camundacon.com/agenda), the talented pair will present this industry-first use case in two parts. So if you’ve been pondering how to use the Camunda REST Engine to full capability, alongside a decoupled architecture – you do not want to miss this!
<!--more-->

## The interesting facts:

### Q: How long have you been using Camunda?

A: (Sowmya) Almost a year. We did our PoC in late 2017/early 2018 and were in production by December 2018.

### Q: Do you use the Community or Enterprise edition?

A: (S) Enterprise<br>
\(Corinna\) Our Developers use the community edition for local use

### Q: How are you using Camunda?

A: \(C\) We’re using Camunda as our workflow engine, and integrating with a modern web-based user interface written in Angular, to revamp our claims process to be more responsive to our customers’ needs and to also be easier for our claims intake personnel to capture the right information for our adjusters to start taking action.

We use Camunda in a couple of ways for claims intake. First, by interfacing with our existing claims system, we are able to automatically make a number of decisions based on policy information. Then, we use Camunda's business workflow capabilities for determining what information the claims intake specialist needs to capture for processing the claim. We also use decision modeling for determining adjuster assignment, escalation scoring (subrogation and total loss determination), and for generating the sequence of questions claims intake specialists use for claim categorization.

### Q: Have you built any interesting extensions/would you recommend any plugins etc.?

A: \(C\) We’ve been building our own internal customizations, to match our specific use case.

## CamundaCon preview:

### Q: What will you be presenting?

A: \(C\) We’ll be presenting twice. The first talk covers our implementation of Camunda as a headless BPM for driving a stateless Angular application, so that all application business logic is isolated to our Camunda workflows, and the user experience is completely decoupled from the workflow engine. The second talk is our innovative use of business modeling and decision modeling for creating completely customized, dynamically determined, survey questionnaires.

Our use case is building a web app where the UX is driven by the workflow – how we were able to create an interface layer that didn’t require our users to directly use Camunda for workflows.

(S) The thing is, we used decoupled patterns. We have completely used Camunda’s REST Engine’s capability to communicate between the front end and the back end. We use Camunda purely for workflow management, we don’t use any forms or anything like that. Keeping the UX in mind, we use a single-phase application to completely take care of UI and UX.

\(C\) It leaves us with the potential to completely change the front end without having to touch the Camunda code. So, for example, if we wanted to do a pure mobile version of the app, we could do so. We’d only need to implement the contract. But it also allows us to change workflows in the back end without having to do any front end changes.

### Q: What’s motivating you to share your use case?

A: (S) When we were thinking about how to design the app, we couldn’t find any resources online – nothing that explained Camunda being used as a headless BPM. Plus, there was not a lot that emphasized how to use the Camunda REST Engine to its full capability – how to decouple the front and the back ends. The only advice we could find was to use Forms within Camunda, and deploy the Angular forms within Camunda, so that it’s all in one place.

\(C\) Pretty late into the development cycle, our product owners asked for us to change a sequence in a number of screens users interact with. With the extent of changes requested, they estimated it would take between four to six weeks. We finished in about three to four business days thanks to our decoupled patterns.

### Q: Are there any CamundaCon presentations/events that you’re looking forward to?

A: Right now we’re focusing on preparing the two presentations, but we’re looking forward to meeting the wider Camunda Community and enjoying the presentations when we arrive in Berlin!

Don’t miss Sowmya and Corinna’s fascinating presentations: Reusable DMN-driven Survey Forms ( https://www.camundacon.com/agenda/session/94317) on September 12th on the Community Stage; and Camunda for Modern Web Applications (https://www.camundacon.com/agenda/session/94334), September 13th on the Plenum Stage.

## Camunda for Modern Web Applications
An overview of the architecture for an insurance claims loss notice application using headless Camunda BPM to maintain application state and to drive a multi-screen and completely stateless Angular application. Workflow modeling can take users through multiple paths, and the sequence can be changed without altering the Angular application. This architecture decouples UI concerns from the BPM.

## Reusable DMN-driven Survey Forms
A reusable BPMN workflow leveraging DMNs to dynamically generate survey forms in a headless Camunda implementation via REST contract. For a claims system, agents ask clients a list of questions about the claim. A DMN determines the next question to ask, based on the previous answer. The DMN interface is published so that any survey-type form can deployed simply by publishing a new group of DMNs.
