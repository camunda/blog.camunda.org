+++
author = "Jakob Freund"
categories = ["Community"]
tags = ["RPA"]
date = "2018-11-28T10:00:00+01:00"
title = "RPA can delay your Digital Transformation"
+++

This is the most tangible insight I took away from attending an [RPA conference](https://www.rpaandaisummit.com/) in London this week. It was actually stated by one of the keynote speakers (he literally said: "many organizations use RPA to delay their digital transformation.").

I share this sentiment. Here is an RPA adoption journey that is not inevitable but can happen:

<!--more-->

# Suffering from legacy applications

Your organization is suffering from legacy applications that require your staff to do a lot of mindless data entry work. For example, processing an order can take several days because there is so much manual work involved that is just about retrieving data from a system, then feeding this data to another system. The customer experience suffers, and you're spending a lot of money on labour that doesn't seem to require a lot of brainpower. 

At the same time, your business is threatened by new competitors, like new startups or the well-known big techs (Google, Amazon, ...). It's pretty clear that you must become more efficient and customer oriented, and the key to that is to become a digital business, hence digital transformation. 

And now you have two options: 

Option 1): Embrace this fundamental change and embark on a mission to get rid of your legacy applications. Do a ruthless evaluation of your IT systems requirements for every business process that runs in your company: That process is either core to your business, which means you will automate it with a bespoke set of technologies that involves doing actual software development yourself. Or it's not core to your business, and in that case you simply sign up for some SaaS product off the shelf to support it. 

Option 2): Buy an RPA product that will allow you to automate some or most of the manual work while not touching your legacy applications. 

Since option 1) means a serious invest that will not pay off immediately, and because your C-suite has heard this fascinating thing about robots replacing employees, your company decides to go for option 2).

# Deceptive sense of achievement

You business users are excited, because they can actually build the first "bots" themselves and see an immediate improvement, without involving software developers. After a while however, you will probably set up a "center of excellence" which defines "coding standards" because the RPA product adoption is spreading and bots are popping up everywhere. 

There is not a lot of experience with how to actually scale the adoption of RPA products, neither within your own company nor anywhere else. As a consequence, you are going through the whole learning curve of traditional software development: requirements engineering, regression testing, operating production deployments, including bug fixing when the original bot developer is not around anymore, all that fun stuff that actual IT departments have figured out over the past three decades. If you're interested in a more detailed description of these RPA related challenges, [here is an excellent article](https://blog.bernd-ruecker.com/how-to-benefit-from-robotic-process-automation-rpa-9edc04430afa).

According to the discussions I witnessed at the conference, this is more or less where we are standing today, the rest is simply unchartered territory. One of the statements heard at the conference was: "we are not yet seeing a lot of large scale deployments." So aside from the shiny success stories presented by the RPA vendors, there is nothing beyond anecdotal evidence, and even in those cases we are yet to see what happens in three or five years. Here's my gloomy prediction: 

# To little, too late

After a long time of trial and error, partially driven by the sunk cost fallacy, your C-suite realizes the inevitable: an automation tech stack based on screen scraping legacy applications does not bring you on par with your newly born, digital-native competitors (surprise!), no matter how much "Artificial Intelligence" your product provides (the AI of today's enterprise software marketing is the modern version of selling snake oil back in the 19th century). 

They finally decide to make the move and go for option 1). Unfortunately, by now it's too late to catch up and your company has been put out of business by either one of those startups or big techs, or, ironically, by one of your traditional competitors that went for option 1) in the first place. 

By no means I am saying this is how it's bound to happen. In fact, if your organization is adopting RPA "only" for the back office processes which are not core to your business (which seems to be the case for 95% of the RPA projects I've heard of) it's not that bad after all. I am ready to admit that RPA can be a great painkiller which brings immediate relief. You just need to understand that a painkiller is not a cure, and adopting RPA is not a digital transformation of your business. 

So if you think RPA is the right approach to automate your actual core business, you're running into the good old low-code trap that has been around almost as long as software development itself. 

# Disclaimer

Since I work for a workflow automation software company, I am clearly biased in my opinion. I'd like to point out however that Camunda BPM and RPA products are not really substitutional, but complementary. [Integrating Camunda with products like UIPath is straight-forward](https://blog.camunda.com/post/2018/08/integrating-uipath-rpa-with-camunda/) and can add a lot of value. 

Nevertheless, I firmly believe you should not use this approach to automate your actual core business processes. In those cases, you must undergo the digital transformation and set up a proper IT infrastructure that comes with sound APIs and other integration points, and base your process automation on that. 

{{< figure src="camunda-rpa.png" alt="Contrasting RPA products and Camunda BPM." caption="Contrasting RPA products and Camunda BPM." >}}

