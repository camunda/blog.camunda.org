---
title: "It's done: camunda BPM 7.0.0-Final released"
date: "2013-08-31"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/08/camunda-BPM-7.0.0-Final-released.html"

---

<div>
We are happy to announce the first major release of camunda BPM: 7.0.0-Final. The highlights of this release are
<br />
<ul>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit">camunda cockpit: new webapplication for visual process monitoring and operations</a></li>
<li>improved process engine with&nbsp;</li>
<ul>
<li>more flexible and better performing history (audit database),</li>
<li><a href="http://camundabpm.blogspot.de/2013/06/introducing-activity-instance-model-to.html">support for activity instance execution model,</a></li>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor">better clustering support</a></li>
</ul>
<li><a href="http://docs.camunda.org/api-references/rest/">REST Api based on JAX-RS</a></li>
<li>Sophisticated Runtime Container Integration</li>
<ul>
<li>Container managed Threading (JBoss Threads, JCA, CommonJ),</li>
<li>Shared Process Egnine as container managed service on all containers including Apache Tomcat.</li>
</ul>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#admin-ldap-connection">Improved user management with authorizations and LDAP support</a></li>
<ul>
</ul>
</ul>
<div>
Distributions are available for Apache Tomcat, JBoss Application Server 7 and Glassfish Application Server 3. An additional IBM WebSphere Application Server 8 distribution is reserved for enterprise customers only. For more information about this release, please join us for our (free) upcoming webinars: webinars now passed.</div>
<div>
<div style="text-align: center;">
<br />
<a href="http://camunda.org/download/"><b><span style="font-size: large;">Download camunda BPM 7.0.0-Final now for free.</span></b></a></div>
<br /></div>
<div>
<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12315">Complete Release Notes for the 7.0 Release in JIRA</a>,&nbsp;<a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12995">Release Notes for the last development iteration.</a></div>
<a name='more'></a><h3>
Enterprise Support</h3>
<div>
The 7.0 release is the first supported production release for camunda BPM. It is fully supported in <a href="http://camunda.com/bpm/enterprise/">the camunda BPM enterprise subscription</a>. Support includes <a href="http://camunda.com/bpm/enterprise/">Help Requests</a> based on different SLAs as well as access to camunda BPM maintenance releases. Maintenance releases allow customers to get bugfixes for production systems based on the 7.0 codebase. While the community project will forge ahead for 7.1, we will backport bugfixes to the 7.0 branch and perform maintenance releases reserved for enterprise subscription customers.<br />
<br />
There is a <a href="http://docs.camunda.org/latest/guides/migration-guide/">Migration Guide</a> targeting existing camunda fox installations.</div>
<h3>
Looking Back</h3>
A little over 5 months have passed since we announced the camunda BPM project launch. During that time we have performed <a href="http://camunda.org/download/previous/">9 community preview releases</a>&nbsp;and&nbsp;<a href="https://github.com/camunda/camunda-bpm-platform/compare/7.0.0-alpha1...7.0.0-Final">14 developers have contributed a little over 1200 commits</a>&nbsp;to <a href="https://github.com/camunda/camunda-bpm-platform">the main codebase</a>. As project lead of camunda BPM I want to take this opportunity for thanking my <a href="http://www.camunda.org/community/team.html">team at camunda</a> for their exceptional work and commitment to this project. Getting to where we are today, to me, felt like one single intense coding session and I must say that the whole team really rocked it to the max.<br />
<br />
<div style="text-align: center;">
<b>The heros of camunda BPM 7.0 are</b></div>
<div style="text-align: center;">
Core Devs: <a href="https://github.com/Nikku">Nico Rehwaldt</a>, <a href="https://github.com/romansmirnov">Roman Smirnov</a>, <a href="https://github.com/ThorbenLindhauer">Thorben Lindhauer</a></div>
<div style="text-align: center;">
QA Engineer: <a href="https://github.com/mschoe">Michael Schöttes</a></div>
<div style="text-align: center;">
QA/CI Infrastructure, Maintenance &amp; Build Automation: <a href="https://github.com/hawky-4s-">Christian Lipphardt</a>,<span style="font-family: inherit;">&nbsp;<span style="background-color: white; color: #333333; line-height: 20px;"><a href="https://github.com/shentschel">Stefan Hentschel</a></span></span></div>
<div style="text-align: center;">
Product Management: <a href="https://github.com/gimbel">Robert Gimbel</a></div>
<div style="text-align: left;">
<br /></div>
<div style="text-align: left;">
Besides us core guys who can work on camunda BPM every day, we have a growing number of community members who contribute to camunda BPM in various ways. Among these I want to stress the restless efforts of <a href="https://github.com/berndruecker">Bernd Rücker</a> who is our chief evangelist and probably the most black-belt BPM practitioner out there. He also co-organizes many of our community meetings. The community meetings are free discussion meetings where people get together and talk about BPM and related topics. So far, we have organized&nbsp;<a href="http://www.camunda.org/community/meetings.html">12 community meetings</a> and the next ones are already scheduled. Bernd is heading the team of camunda consultants among which I want to thank <a href="https://github.com/polenz/">Kristin Polenz</a> and <a href="https://github.com/falko">Falko Menge</a> for their many many contributions to the project and channeling a huge amount of customer feedback. From the community outside of camunda I want to highlight the efforts of&nbsp;<a href="https://github.com/clintmanning">Clint Manning</a>&nbsp;from <a href="http://www.1and1.com/">1&amp;1 </a>who made large contributions to the REST Api as well as <a href="https://github.com/marcel-wieczorek">Marcel Wiczorek</a> and <a href="https://github.com/jbellmann">Jörg Bellmann</a> from <a href="http://www.zalando.de/">zalando</a> for their contributions to the process engine history refactoring.</div>
<div style="text-align: left;">
<br /></div>
<div style="text-align: left;">
The camunda Incubation space was launched with three interesting projects:</div>
<ul>
<li><a href="https://github.com/camunda/camunda-bpm-fluent-testing">Fluent Testing Library</a></li>
<li><a href="http://camunda.github.io/camunda-bpm-php-sdk/">PHP SDK</a></li>
<li><a href="https://github.com/camunda/camunda-bpm-camel">Apache Camel Integration</a></li>
</ul>
<h3>
Looking Forward</h3>
We will do an <a href="http://network.camunda.org/meetings/10">international (English speaking) community Day in Prague</a>. Entry &nbsp;is free and I hope that as many of you as possible can make it.<br />
<br />
And other than that, we will forge ahead for the 7.1 release!<br />
<br />
<div style="text-align: center;">
<b>Do not miss our Webinars: webinars now passed.</b></div>
</div>