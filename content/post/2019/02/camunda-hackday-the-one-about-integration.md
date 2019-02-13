+++
author = "Niall Deehan"
draft = false
categories = ["Community"]
tags = ["BPMN","Camunda","Hackday"]
date = "2019-02-13"
title = "Camunda Hackday – the One about Integration"

+++

On a freezing, snowy Saturday recently, more than 30 hackers joined us at our Berlin HQ for Camunda’s first Hackday to orchestrate some seriously smart workflows.

<iframe width="854" height="480" src="https://www.youtube.com/embed/lfI4ShIi9YI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

One of the best aspects of the day was welcoming a number of Camunda newcomers alongside our experienced users, so we had a great opportunity to assess how intuitive the ‘getting started’ experience is. Plus, it’s always valuable to have a fresh pair of eyes look over your code, so for me, it was interesting to see how developers and architects interacted with our software when using it for the first time.

<!--more-->
## Every Good Hackday needs a Challenge
<img src = "integrationhackday2.png" width="700">

You can’t hack without a reason, and ours was the Integration Challenge. Hackers had seven hours to bring together as many different systems as possible, using Camunda as the central orchestrator.

Our judges, the brilliant software engineer and Camunda open source contributor [Jan Galinski](https://github.com/jangalinski), and Camunda super-consultant [Falko Menge](https://github.com/falko), based their judgments on:

- The number of different systems and frameworks involved
- The complexity of the integration
- Usefulness of the integration
- Strange and funny creations

## Hack Time
<img src = "integrationhackday1.png" width="700">

Our six teams created fictional scenarios to model, all completely different from one another. It was fantastic to see how imaginative the teams were - from writing games to price comparison processes - proving there’s very few processes you can’t model and execute in Camunda.

### Distributed Darts
This game allowed people around the world to compete in online darts. It used a message bus and also had integration with:

- Slack
- Twitter
- Camunda Task List
- A front-end was also created, but unfortunately wasn’t able to be connected before the end of the hack


### Process Avoidance Process
This process, in which someone is supposed to process a travel expense, allows the user to procrastinate instead by playing games or looking at cat pictures. It integrated Slack and also embedded:

- A tic-tac-toe game
- Random cat pictures

[Check it out on GitHub](https://github.com/JoHeinem/camunda-hackathon)

### Get the Tortoise to a Carrot
A neat game where a little tortoise needed to move across the screen towards a carrot. It could be controlled by many users on different devices at the same time. Built on the Android platform, it was written in:

- Python
- JavaScript

### Crime and Weather
This process gathered data on crimes and enriched the crime data XML with weather data using another weather API, so you could see what was happening with the weather at the same time a crime was committed. It integrated:

- Crime Stats API
- Weather API
- PDF document generation

### The Process that Almost Worked
So called because it integrated with a lot of different systems and worked merely moments before the presentation started! This included:

- Email integration
- Tasklist integration
- And more, probably…

[Check it out on GitHub](https://github.com/Malu44/camunda-ws)
### I Pick the Price I Pay
This booking process allowed users to decide how much they wanted to pay for a place to stay, and then loop around until the price was available. It was a strong BPMN model and integrated with numerous coding languages.

- This team learned the most over the course of the day as they had the least combined Camunda experience in the team.


## And the winner is...

Not every Hackday has a winner, but we wanted to award prizes based on how closely the projects met the Integration Challenge criteria. Our winners were the Eucon Group, who built the ingenious Distributed Darts game!

Like the sound of our hackday? Join us for the next one! We’re hacking again this year and will share details on [Twitter](https://twitter.com/Camunda) and [Eventbrite](https://www.eventbrite.ca/o/camunda-services-gmbh-13400540723) closer to the time. If you need more persuasion, check out our [Hackday album](https://www.facebook.com/pg/CamundaBPM/photos/?tab=album&album_id=1392680794207077) to see what we got up to this time around.

In the meantime, don’t miss the next Camunda Meetup. We host a variety of Meetups organized by community members worldwide to share insights on workflow automation, microservices, business process management and other industry topics. Whether you’re a developer, architect, IT manager or just interested in the field, you’re always welcome to join! Here you can find a [Camunda Meetup group close to you](https://www.meetup.com/topics/camunda/).
