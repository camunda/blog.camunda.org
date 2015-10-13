---
title: "Setting up a Development Environment for Camunda HTML Forms"
date: "2015-07-28T12:05:00+02:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 

aliases:
  - "/2015/07/setting-up-development-environment-for.html"

---

Are you developing HTML forms for Camunda Tasklist? Are you re-packaging your application with maven and re-deploying it to Tomcat or Wildfly for each HMTL form change? Are you annoyed by this? :)<br />
<br />
There is hope: this post explains how to setup a development environment which allows you to develop forms inside Camunda Tasklist and refresh your changes without re-packaging and re-deploying your application.<br />
<br />
We use this kind of setup ourselves when working on the <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/examples/invoice">Invoice Example which is provided with the Camunda Distribution</a>.<br />
<br />
In the following I am assuming that you have setup an application according to the blueprint provided by our <a href="http://docs.camunda.org/7.3/guides/getting-started-guides/developing-process-applications/">Getting Started Guide</a>.<br />
<br />
<a name='more'></a><br />
<br />
<h2>Step 1: Adding a Maven Profile for development</h2>First you need to add a Maven profile for development:<br />
<br />
<pre class="prettyprint"><code class="language-xml">&lt;profiles&gt;
  &lt;profile&gt;
    &lt;id&gt;develop&lt;/id&gt;
    &lt;dependencies&gt;
      &lt;dependency&gt;
        &lt;groupId&gt;org.camunda.bpm.webapp&lt;/groupId&gt;
        &lt;artifactId&gt;camunda-webapp-tomcat-standalone&lt;/artifactId&gt;
        &lt;version&gt;${project.version}&lt;/version&gt;
        &lt;type&gt;war&lt;/type&gt;
      &lt;/dependency&gt;
    &lt;/dependencies&gt;
    &lt;build&gt;
      &lt;resources&gt;
        &lt;resource&gt;
          &lt;!-- override processes.xml, providing custom process engine --&gt;
          &lt;directory&gt;src/develop/resources&lt;/directory&gt;
          &lt;resource&gt;
            &lt;directory&gt;src/main/resources&lt;/directory&gt;
          &lt;/resource&gt;
        &lt;/resource&gt;
      &lt;/resources&gt;
      &lt;plugins&gt;
        &lt;plugin&gt;
          &lt;groupId&gt;org.mortbay.jetty&lt;/groupId&gt;
          &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
          &lt;version&gt;8.1.14.v20131031&lt;/version&gt;
          &lt;configuration&gt;
            &lt;webAppConfig&gt;
              &lt;contextPath&gt;/camunda&lt;/contextPath&gt;
              &lt;resourceBases&gt;
                &lt;resourceBase&gt;${project.basedir}/src/develop/webapp&lt;/resourceBase&gt;
                &lt;resourceBase&gt;${project.basedir}/src/main/webapp&lt;/resourceBase&gt;
              &lt;/resourceBases&gt;
            &lt;/webAppConfig&gt;
          &lt;/configuration&gt;
        &lt;/plugin&gt;
      &lt;/plugins&gt;
    &lt;/build&gt;
  &lt;/profile&gt;
&lt;/profiles&gt;
</code></pre><br />
The profile includes the Camunda Standalone Webapplication as well as the Jetty Maven plugin for starting it as part of the Maven build.<br />
<br />
<h2>Step 2: Override some Configuration</h2>Next we need to override some configuration. The maven profile references two resource locations to which we need to add a configuration file.<br />
<br />
Place the following xml content into <code>src/develop/resources/META-INF/processes.xml</code>:<br />
<br />
<pre class="prettyprint"><code class="language-xml">&lt;?xml version="1.0" encoding="UTF-8" ?&gt;

&lt;process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;

  &lt;process-engine name="default"&gt;
    &lt;configuration&gt;org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration&lt;/configuration&gt;
    &lt;properties&gt;
      &lt;property name="jobExecutorActivate"&gt;true&lt;/property&gt;
      &lt;property name="authorizationEnabled"&gt;true&lt;/property&gt;
    &lt;/properties&gt;
  &lt;/process-engine&gt;

  &lt;process-archive&gt;
    &lt;process-engine&gt;default&lt;/process-engine&gt;
    &lt;properties&gt;
      &lt;property name="isDeleteUponUndeploy"&gt;false&lt;/property&gt;
      &lt;property name="isScanForProcessDefinitions"&gt;true&lt;/property&gt;
    &lt;/properties&gt;
  &lt;/process-archive&gt;

&lt;/process-application&gt;
</code></pre><br />
This ensures that an in-memory process engine is started and that the processes located in the classpath of the maven build are deployed to it.<br />
<br />
Next, place the follwing XML content into <code>src/develop/webapp/WEB-INF/applicationContext.xml</code>:<br />
<br />
<pre class="prettyprint"><code class="language-xml">&lt;beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:activiti="http://www.activiti.org/schema/spring/components"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;


&lt;/beans&gt;
</code></pre><br />
This overrides the Spring Configuration shipped with the Standalone Web Application and makes sure the process engine is not also started using Spring.<br />
<br />
<h2>Step 3: Start the Application and work on Embedded Forms</h2><br />
You can now start your application by typing<br />
<br />
<pre class="prettyprint"><code class="language-xml">mvn clean jetty:run -Pdevelop
</code></pre><br />
And opening Camunda Tasklist at <a href="http://localhost:8080/camunda/app/tasklist/">http://localhost:8080/camunda/app/tasklist/</a>.<br />
<br />
If you now change your HTML forms or Javascript resources, you can simply refresh the page in the Browser and the changes will be visible.<br />
<br />
Enjoy!<br />
<br />
<br />
