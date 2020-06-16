+++
author = "Christopher Rogers"
categories = ["Community"]
tags = ["CamundaCon Live"]
date = "2020-06-16T11:00:00+02:00"
title = "Microservices Ecosystem Powering Process Automation at Cox Automotive"

+++

A global automotive solutions company is implementing Camunda BPM to support three distinct solutions serving automotive dealers across the United States, developing several solutions for vehicle titling and registration, fleet titling and registration, and direct-lending lien and title support.

<!--more-->

Cox Automotive is a subsidiary of Cox Enterprises employing more than 30,000 employees worldwide under a variety of brands including Autotrader, Kelley Blue Book, and Manheim, the world’s largest wholesale auto auction. Cox Automotive makes buying, selling, owning and using cars easier for everyone. The global company’s family of brands help millions of car shoppers and 40,000 auto dealer clients across five continents.

The company is modernizing its tech stack, adopting a microservices architecture to innovate solutions across its ecosystem. With Camunda, Cox Automotive was able to create three distinct process automation solutions in a matter of months to serve a range of lending and titling needs for its automotive clients, replicating a loosely coupled codebase of services to create independent processes that handle manual and automated tasks in unique ways.

## Getting Started with Auto Registrations

Cox first adopted Camunda late in 2019 to support its Dealertrack Registration and Title system, which processes titles for sales or leases, trade-ins and more. Dealertrack is invaluable in helping dealers across the U.S. collect the right data and documentation, determine taxes and fees, and process transactions through a state’s Department of Motor Vehicles (DMV). Through its RegUSA solution, Dealertrack removes the complexity of cross-border transactions with hundreds of disparate tax and documentation requirements, helping auto dealer clients increase their efficiency and keep up with an ever-changing automotive landscape.

{{< figure class="no-border teaser" src="Transaction-flow-design-in-BPMN.png" alt="Transaction flow design in BPMN">}}

The RegUSA process provides an estimate of taxes and fees based on sale price and location. Dealers submit transactions through Camunda and then documentation to Dealertrack, kicking off a process instance that incorporates several manual steps to complete the transaction.

## How Camunda uniquely supports Dealertrack’s requirements

As the RegUSA team moved toward a microservices architecture to support its evolving business needs, they became concerned about the potential impact that tightly coupling different steps of their workflow together using custom code might have on scalability and flexibility.

“Camunda is a workflow tool that allows us to decouple every step from every other step, and then independently develop each step, making designing and developing much easier. Workflows change over time, and not planning for change guarantees for more support pain,” said Liz Hesser, lead UI engineer for Cox Automotive. She added that Camunda Modeler’s interface allowed developers to collaborate with the product team on workflow design. The decoupled approach allowed the product team to reorder steps as needed without a significant development effort.

Dealertrack is using Camunda as a back office workflow service manager. The Camunda Process Engine is deployed as an embedded library within a microservice using Spring Boot. A Java Service API and Camunda REST API are used to communicate with the Camunda Process Engine directly. Query APIs, particularly the Rest Query API and Custom Queries, are used for searching the available user tasks leveraging MyBatis for custom queries.

## Styling RegUSA for a Fleet Solution

While initially only focused on supporting individual tax and titling transactions, the Dealertrack team quickly turned their attention to how their solution could streamline the process for dealer fleet accounts. Unlike individual transactions, where data is individually captured and submitted, fleet customers have fleet management tools that have already captured much of the data required to process DMV transactions. The team created a separate process model borrowing from the codebase that powers individual transactions, added new services to enable automated batch transactions and data capture from fleet management tools. By simply uploading a spreadsheet, several vehicles in a fleet may be processed in much the same manner as in an individual deal.

“We were able to dice up existing workflows and add batch-specific behaviors to RegUSA microservices. Using Camunda allowed us to have our own process model and not disrupt the current way deals are handled independently. Using Camunda allowed us to make this product independent while still being able to reuse the parts that make sense,” said Hesser.

The fleet solution makes batch processing of title and registrations much faster, according to senior software engineer Mary Rose Matira. The team added processes to ‘kick out’ any problem submissions within a batch; those deals are then handled individually, allowing the remainder of a batch to be submitted without delay.

## Supporting Direct Lending

Dealertrack also reimagined its direct lending solution to support increased demand for lien and titling services. Expanding the use of Camunda at Cox Automotive. Dealertrack reimagined its existing software for lien placements and title services, customizing the RegUSA codebase once again to run their direct lending business needs, adding new, lending-specific features and running a customized BPMN model in Camunda. Like the RegUSA products for individual deals and fleet management, the Camunda-powered direct lending solution is its own separate product and provides automation and streamlined workflows for lien and title services.

{{< figure class="no-border teaser" src="supporting-direct-lending.png" alt="supporting direct lending">}}

If you’d like to learn more about how Cox Automotive’s microservices ecosystem supports three distinct products for its Dealertrack business unit, watch the presentation and download the slides on the [CamundaCon Live archive](https://event.on24.com/eventRegistration/console/EventConsoleApollo.jsp?&eventid=2325360&sessionid=1&username=&partnerref=&format=fhvideo1&mobile=&flashsupportedmobiledevice=&helpcenter=&key=62768C605FCBC8C304F4CD9916EEA87A&text_language_id=en&playerwidth=1000&playerheight=650&source=GATEWAY-2260438&hidewidgets=player_share_this&rId=2260438&rKey=0A7A4B9DADC849DFAB7ACDDA443BEF42&showUserActions=rating,comments&oriontokens=eventId-2325360%7CuserId-297930384%7CgatewayId-2260438%7CexperienceId-%7CcontentType-webcast&newConsole=false&nxChe=true&eventuserid=297930384&contenttype=A&mediametricsessionid=254831102&mediametricid=3285226&usercd=297930384&mode=launch).
