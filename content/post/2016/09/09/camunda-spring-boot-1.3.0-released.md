+++
author = "Jan Galinski, Oliver Steinhauer"
categories = ["Execution"]
date = "2016-09-05T08:00:33+02:00"
tags = ["extension"]
title = "Camunda BPM SpringBoot 1.3.0 released"
draft = true
+++

Good news for all users of the Spring Boot community extension (and those who want to become users):
Version 1.3.0 has been released!

The major changes are:

* Introducing lifecycle events: `ProcessApplicationStarted` and `ProcessApplicationStopped`
* Engine configuration based on `ProcessEnginePlugin` interface
* Support for configuration properties not covered by `CamundaBpmProperties`

<!--more-->

## What's new?

Let's have a quick look at the main improvements. For the full list of changes, [click here](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues?utf8=✓&q=milestone%3A1.3.0%20type%3Aissue%20).

### Features

* **Properties**
  * added support for authorization, metrics and serialization
  * you can now set all `SpringProcessEngineConfiguration` properties via `camunda.bpm.generic-properties.properties.` without providing your own configuration implementation
* **REST API**
  * `camunda-bpm-spring-boot-starter-rest` now exposes the REST API by default without annoying you to provide custom beans
* **Documentation**
  * we added some missing parts in documentation
* **latest versions**
  * spring boot: 1.3.7
  * you can run your applications with spring boot 1.4.0
* introduce `ProcessApplicationStartedEvent` and `ProcessApplicationStoppedEvent` allowing you to listen to this events

### Fixes

* webapps deployment as war to sth. like Tomcat 8+ now works   

### API breaks

We have decided to refactor the configuration mechanism. Especially we removed the  `org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration` interface. For now all configurations are `org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin`s. With this it is possible to hook into `preInit`, `postInit` and `postProcessEngineBuild` which provides more complex possibilities.

If you have implemented an `CamundaConfiguration` you have to switch to `ProcessEnginePlugin` (and its `preInit` method). You can also extend your configuration from `org.camunda.bpm.spring.boot.starter.configuration.impl.AbstractCamundaConfiguration` to avoid a cast to `SpringProcessEngineConfiguration`.

## How to use it?

As always, the extension is published on maven central, so if you are using maven, just add the dependency:

```xml
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-spring-boot-starter([-rest|-webapp])</artifactId>
  <version>1.3.0</version>
</dependency>
```

and then create a simple process application like this one:

```java
// note that when using the ProcessApplication, you currently need an empty processes.xml under src/main/resources/MET-INF!
@SpringBootApplication
@ProcessApplication
public class WebappExampleProcessApplication extends SpringBootProcessApplication {

  public static void main(String[] args) {
    SpringApplication.run(WebappExampleProcessApplication.class, args);
  }

}
```

Make sure to check out the [examples](https://github.com/camunda/camunda-bpm-spring-boot-starter/tree/master/examples) and the [documentation](http://camunda.github.io/camunda-bpm-spring-boot-starter/).

## Roadmap

For the next version we will do a major version change: 2.0.0! We will switch to Java8 and SpringBoot 1.4 and no longer support Java versions <8. In addition, we will refactor the module structure and provide tools for testing. You can check the planned enhancements on the [milestone page](https://github.com/camunda/camunda-bpm-spring-boot-starter/milestone/3).

## Have fun

As always: If you like this extensions: Tell your friends and colleagues. If you find some bugs or missing features: [Tell us](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues).
And if you like to join or help out: we happily accept pull requests.

And finally the reminder: Jan will give a short presentation and demo of this extension on the [camunda community day](https://network.camunda.org/meetings/72) in Berlin in September, so make sure to be there! We'd love to discuss your user experiences and feature requests so far!
