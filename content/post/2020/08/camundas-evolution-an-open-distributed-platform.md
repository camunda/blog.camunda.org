+++
author = "Niall Deehan"
categories = ["Community"]
tags = ["Process Automation Insights"]
date = "2020-08-05T08:00:00+02:00"
title = "Camunda’s Evolution: An Open, Distributed Platform"
+++

We have recently released the first iteration of the OpenAPI documentation, which is a big step towards making Camunda a more technology independent platform. The journey up until now is very much worth discussing. Camunda started off as a lovely, lightweight java project, which was intended to be used by Java developers to embed in their projects so that they could orchestrate their processes. As far as this mission statement goes - it was, of course, a great success. The features we created focused on the Java ecosystems and the needs of Java developers, which is obvious considering that our community was almost exclusively made-up of Java folk.

<!--more-->

There came a time, one which I assume happens often for open source projects, when you take a look at your community and see that they’re starting to use the project in a way you never quite expected and a way in for which it was never designed. For Camunda, this was seeing how developers outside the Java community were coming to use the engine. Considering this was a time where we would tell people - “If you don’t know Java - Camunda probably isn’t for you,” it was odd to see our project making headway into PHP, Python, JavaScript and C-Sharp communities. Considering that Camunda lives by its community, it’s always important to listen and react to what the community tells us. In this case we looked into how we could make it easier for non-Java developers to use our engine and this snowballed.

## The REST API

If you’re using Java with Camunda I’m sure you’re overwhelmed with the power available to you via the API, but spare a thought for developers who aren’t interested in using Java. Originally they could only really use some scripting languages or in [most cases the REST API](https://docs.camunda.org/manual/latest/reference/rest/). Wanting to help grow the community outside of the Java ecosystem, we decided to expand the REST API through each of our early releases until it covered nearly everything that was possible to do from the Java API.

{{< figure class="no-border teaser" src="rest-api-screen.png" alt=" REST API" >}}
{{< figure class="no-border teaser" src="image1.gif" alt=" REST API Reference" >}}

But even the most incredibly well-built API is lost without its vigilant sidekick - documentation. So we always made a concerted effort to make our docs accessible and up to date. Even now you’ll find each REST call will always have the method, parameter, result, response codes and, most importantly, examples.

{{< figure class="no-border teaser" src="on-this-page.png" alt="Method" >}}

We also started to [create code examples](https://github.com/camunda-consulting/code/tree/master/snippets) and [tutorial videos](https://www.youtube.com/watch?v=ypX90aQScOQ), which resulted in the community growing bigger and a little louder in expressing to us what they felt we were still missing.

## External Tasks

While REST APIs made communicating with the engine much easier, our non-Java community was struggling with how exactly they should have their code orchestrated by Camunda. We offered a basic connector, but this had some disadvantages. It was synchronous, it was impossible to independently version, and it was hard to update once a system was in products. We needed to create a more purpose-built solution. So we did.

We developed a way in which non-Java users can create a client in their language of choice which can fetch and complete work asynchronously. We call them [External Tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/). We also added support for sending BPMN events like Error events back to the engine. But probably the most important features for production use is advanced configuration. Along with long polling and locking multiple tasks per request, there’s also the ability to extend a lock or release a lock for a graceful shutdown.

We build and support two external task client implementations ourselves, [one in Java](https://github.com/camunda/camunda-external-task-client-java) and another [in JavaScript](https://github.com/camunda/camunda-external-task-client-js). There is [a tutorial video](https://www.youtube.com/watch?v=l6pMXr8Jf6k) which helps users understand how it can be used.

While we expected this increase in the number of community members not using Java, we didn’t expect that it would also create a boom in the number of people using Camunda in distributed architectures. With Camunda being used to orchestrate microservices, these architecture options soon became the most popular reason why new projects were choosing to use Camunda.

## Camunda BPM Run

In the two years or so we’ve found ourselves in a place where we have a polyglot community of Camunda developers who like to build distributed systems or prefer to have a microservice architecture. While having the REST API and external tasks were great, a new pain point emerged. Camunda needed an application service in order to run.

By default, we offered a Tomcat distribution; Wildfly was also available. This created a much bigger footprint for the engine by adding all the associated libraries and functionality of these application servers, despite the fact they may not all be needed or wanted. It also had the drawback that if you wanted to configure the engine beyond its default settings, you’d need to mess around with the application server settings. So we decided to take a look at what we could do to help. Thus a new project codenamed “lil’ Camboot” was born.

This project, which evolved into [Camunda BPM Run](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/), would try to solve these problems. It was standalone and simple to start up. It was much more lightweight and was built to ensure that all configuration and features were abstracted and easy to see, understand and edit, including the [process engine settings](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/#configure-camunda-bpm-run).

We also made deployment much easier, being able to deploy with a click from [the Camunda Modeler](https://camunda.com/download/modeler/) or simply leaving your process and decisions in Camunda BPM Run’s resources folder. We also created [another tutorial video](https://www.youtube.com/watch?v=l-sCUKQZ44s) to help new users understand how it all works.

## OpenAPI Integration

If a developer who uses Go, Kotlin or even PHP wants to use Camunda, the features we’ve created let them:

* Talk to the engine over REST
* Run their business logic with external tasks
* Configure the engine with Camunda Run
* Deploy their processes from the Modeler

What else could one need? Well our community is nothing if not vocal, and we soon learned that it’s still quite tough to implement every rest call you wanted to use in your language of choice, manually. We had made it possible but we had not made it easy and over the years, time and time again we’re reminded that if a great feature is hard to get started with - it’ll take a lot longer to gain traction within the community. So we wanted to make it easier to talk to the engine without requiring manually implementing a whole bunch of rest calls. [OpenAPI is the answer](https://docs.camunda.org/manual/7.13/reference/rest/openapi/).

We had invested heavily in making it really easy for developers to understand how to communicate to the engine through the REST-API documentation. The documentation was designed so that if a developer wanted their code to connect the engine, it would just require reading the docs and writing the code accordingly. As an automation company though, doing something manually that could be done programmatically leaves us with obvious room for improvement. So we started to describe our REST API using the [OpenAPI specification](https://swagger.io/specification/), which gives people a world of integration possibilities. Now you can create client code in seconds without any of the manual steps required previously.

With our first release, we implemented what we think are the most important REST calls, but we plan to have the entire rest api described before long.

You can now generate a client in seconds for all of these languages using the [OpenAPI client generator](https://github.com/OpenAPITools/openapi-generator) - so no more tedious rest integration!:

__ActionScript, Ada, Apex, Bash, C, C#__ (.net 2.0, 3.5 or later, .NET Standard 1.3 - 2.0, .NET Core 2.0), __C++__ (cpp-restsdk, Qt5, Tizen), __Clojure, Dart (1.x, 2.x), Elixir, Elm, Eiffel, Erlang, Go, Groovy, Haskell__ (http-client, Servant), __Java__ (Jersey1.x, Jersey2.x, OkHttp, Retrofit1.x, Retrofit2.x, Feign, RestTemplate, RESTEasy, Vertx, Google API Client Library for Java, Rest-assured, Spring 5 Web Client, MicroProfile Rest Client), __k6, Kotlin, Lua, Nim, Node.js/JavaScript__ (ES5, ES6, AngularJS with Google Closure Compiler annotations, Flow types, Apollo GraphQL DataStore), __Objective-C, OCaml, Perl, PHP, PowerShell, Python, R, Ruby, Rust__ (rust, rust-server), __Scala__ (akka, http4s, scalaz, sttp, swagger-async-httpclient), __Swift__ (2.x, 3.x, 4.x, 5.x), __Typescript__ (AngularJS, Angular (2.x - 8.x), Aurelia, Axios, Fetch, Inversify, jQuery, Node, Rxjs)

## The Future?

You probably noticed when reading this that I talked about how we ___heard___ our community. Well that community is anybody using Camunda -- from an active enterprise customer talking to us about their plans or members of the open source community posting on the [Camunda Forum](https://forum.camunda.org/).

So if you’re using Camunda and want to give us feedback on our direction, hopefully this post has shown you that we listen and we act on that feedback. So come say “hi” in the forum, speak to your Customer Success Manager, or [get in touch with us](https://camunda.com/contact/) via our website.
