+++
author = "Jan Galinski"
categories = ["execution"]
date = "2016-06-17T12:00:00+02:00"
tags = ["extension"]
title = "Camunda BPM SpringBoot 1.2.0 released"

+++

Good news for all users of the Spring Boot community extension (and those who want to become users):
Version 1.2.0 has been released!

The two major improvements are: 

* Support of latest (>7.4) engine features and 
* full utilisation of the camunda webapp.

You now can run a complete 7.5 webapp in your spring boot container and use embedded forms in your processes!

<!--more-->

## What's new?

Let's have a quick look at the main improvements. For the full list of changes, [click here](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues?utf8=%E2%9C%93&q=milestone%3A1.2+type%3Aissue).

### Features

* **support DMN**
  * running dmn engine inside spring boot app
  *  autodeployment of DMN files
* **support external tasks**
  * spring boot app can run async service tasks and provides REST api to access them via external consumers
* **support webapp**
  * you can now easily run all 3 camunda webapps (tasklist, cockpit, admin) inside a spring boot application. 
  * This feature requires camunda bpm version 7.5.0, in 7.4.0 you will still have some flwas.
  * embedded forms in webapp can be used, just put them in <br/> `src/main/resources/static`
* **latest versions**
  * spring boot: 1.3.5 (introducing spring 4.2)
  * camunda: 7.5.0
* introduce **SpringBootProcessApplication** allowing deployment via `processes.xml` configuration
  
### Fixes

* using history-level `"auto"` now works, allowing multiple engines connected to a single datasource to automatically adopt to the configured history level
* various bean problems in cloud context (hystrix, eureka) solved, it should now be save to use camunda spring boot application in complex multi-node setups.

The extension got more contributors during the last 6 month, so many thanks to Dimitri for the cloud configuration fixes and Ron and bkumar for the (still pending, sorry guys) security patches!
 
## How to use it?

As always, the extension is published on maven central, so if you are using maven, just add the dependency:

```xml
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-spring-boot-starter([-rest|-webapp])</artifactId>
  <version>1.2.0</version>
</dependency>
```

and then create a simple process application like this one:

```java
@SpringBootApplication
@ProcessApplication
public class WebappExampleProcessApplication extends SpringBootProcessApplication {

  public static void main(String[] args) {
    SpringApplication.run(WebappExampleProcessApplication.class, args);
  }

}
```

Make sure to check out the [examples](https://github.com/camunda/camunda-bpm-spring-boot-starter/tree/master/examples) and the [documentation](http://camunda.github.io/camunda-bpm-spring-boot-starter/).

As always: If you like this extensions: Tell your friends and colleagues. If you find some bugs or missing features: [Tell us](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues). 
And if you like to join or help out: we happily accept pull requests.

Finally a short personal note: I will give a short presentation and demo of this extension on the [camunda community day](https://network.camunda.org/meetings/72) in Berlin in september, so make sure to be there!
