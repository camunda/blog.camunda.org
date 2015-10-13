---
title: "Use camunda bom for maven Dependency Management"
date: "2014-04-15T10:42:00+02:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 
  - "maven"

aliases:
  - "/2014/04/use-camunda-bom-for-maven-dependency.html"

---

Sometimes you need to include multiple camunda BPM maven dependencies in your project. The <a href="http://maven.apache.org/">apache maven</a> best practice &nbsp;is to use a bom ("<a href="http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html">Bill of Materials</a>") which ensures that you get the matching versions for multiple dependencies. For camunda bpm we prepared the <span style="font-family: Courier New, Courier, monospace; font-size: x-small;">camunda-bom</span> to make sure you get the right versions for all camunda dependencies and our transitive dependencies.<br />
<br />
First, import the <span style="font-family: Courier New, Courier, monospace; font-size: x-small;">camunda-bom</span> in the <span style="font-family: Courier New, Courier, monospace; font-size: x-small;">dependencyManagement</span> section of your maven pom:<br />
<br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;dependencyManagement&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;dependencies&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;groupId&gt;org.camunda.bpm&lt;/groupId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;artifactId&gt;camunda-bom&lt;/artifactId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;type&gt;pom&lt;/type&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;scope&gt;import&lt;/scope&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;version&gt;7.1.0-Final&lt;/version&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;/dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/dependencies&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;/dependencyManagement&gt;</span><br />
<br />
Now you can reference multiple camunda dependencies without adding their <span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&lt;version&gt;</span>&nbsp;information:<br />
<br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;dependencies&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp;&nbsp;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;org.camunda.bpm&lt;/groupId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;camunda-engine&lt;/artifactId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;org.camunda.bpm&lt;/groupId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;camunda-engine-spring&lt;/artifactId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp;&nbsp;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; ...</span><br />
<br />
What's more: we also give you the versions for the the required dependencies of camunda engine. This way you will always get the version of mybatis, joda-time, java-uuid-generator that the current version of camunda-bpm was built and tested with:<br />
<br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&lt;dependencies&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;org.mybatis&lt;/groupId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;mybatis&lt;/artifactId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;joda-time&lt;/groupId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;joda-time&lt;/artifactId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;com.fasterxml.uuid&lt;/groupId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;java-uuid-generator&lt;/artifactId&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/dependency&gt;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp;&nbsp;</span><br />
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; ...</span><br />
<br />
Note that most of our maven artifacts are pushed to <a href="http://search.maven.org/#browse%7C-713420858">maven central</a>.<br />
<br />