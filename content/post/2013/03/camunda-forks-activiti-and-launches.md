---
title: "camunda forks Activiti and launches camunda BPM"
date: "2013-03-18"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/03/camunda-forks-activiti-and-launches.html"

---

<div>
I am proud to announce that today&nbsp;<a href="http://www.camunda.com/">camunda</a>&nbsp;launches a new open source BPM project:&nbsp;<a href="http://www.camunda.org/">camunda BPM</a>. At this juncture we part ways with the <a href="http://www.activiti.org/">Activiti project</a>&nbsp;which we have contributed to since the first days.<br />
<br />
Leaving Activiti is a sad but necessary step for us. Starting as a consulting company, we have built a customer base of 250+ in little over 4 years. Last year, we entered the BPM vendor business with the camunda fox BPM platform. Our success and the <a href="http://www.camunda.org/community/users.html">positive feedback we got from customers</a> made us realize that we have to go all-in. Today, we drop the "fox"-brand and as camunda BPM, we&nbsp;embark on the journey of building the best BPM platform, under our own leadership &amp; vision.<br />
<br />
We are grateful&nbsp;for Alfresco's contributions to the community and we part with the sad feeling of leaving a great project and a unique pack of people behind. Personally, I still regularly hang with Tom Baeyens (<a href="http://bpmn20inaction.blogspot.de/2012/11/activiti-thanks-tom-baeyens.html">who left Activiti before</a>&nbsp;and <a href="http://www.infoq.com/news/2013/03/baeyens-activiti">has moved on as well</a>) and I am certain to remain in touch with Joram, Tijs and Frederik. Guys, I respect you and I&nbsp;wish&nbsp;you the best of luck!<br />
<br />
But most of all, I am very excited about what lies ahead for us. Our ambition is to kick off a&nbsp;vibrant <a href="http://www.camunda.org/community.html">BPM&nbsp;community</a>&nbsp;and move the open source BPM space forward. We are very serious about our open source commitment. With this move we broaden the scope from open source embeddable BPM to open source BPM infrastructure, opening code and technology that we built as closed source before. Our software will be Apache License v2.0 (excluding the EPL licensed modeling plugin) and all core components will be developed as open source exclusively (no shadow-repositories). &nbsp;The commercial add-ons we plan on providing to&nbsp;paying&nbsp;customers are distributions for commercial application servers (e.g. IBM&nbsp;WebSphere Application Server) and plugins for mass data manipulation inside the operations tooling (camunda cockpit). Check out our <a href="http://camunda.org/community/roadmap.html">Roadmap</a>.<br />
<br />
We know that many people and companies have invested in activiti projects. We will work hard <a href="http://docs.camunda.org/latest/guides/migration-guide/#migrate-from-activiti">keeping the migration path from Activiti to camunda open</a> for as long as we can and support teams that want to migrate their project from Activiti to camunda. <a href="http://www.camunda.org/community/forum.html">Talk to us in the forums</a>&nbsp;(<a href="http://camunda.com/bpm/training/migrate/">or request a Migration Evaluation Workshop</a>).<br />
<h2>
<span style="font-family: inherit;">What is camunda BPM?</span></h2>
<span style="font-family: inherit;">camunda BPM provides <b>infrastructure,</b>&nbsp;<b>tools</b>&nbsp;and <b>knowledge</b> around the BPM lifecycle.&nbsp;</span><br />
<span style="font-family: inherit;"><br /></span>
<span style="font-family: inherit;"><b>Process Implementation and Execution</b></span><br />
<ul style="border: 0px; margin: 15px 0px; padding: 0px 0px 0px 30px;">
<li style="border: 0px; margin: 0px; padding: 0px;"><span style="color: #333333; font-family: inherit; line-height: 20px;"><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine">camunda engine</a> - Fork of the Activiti process engine with lots of additions. Responsible for executing BPMN 2.0 processes.&nbsp;</span><span lang="EN-US"><span style="color: #333333;"><span style="line-height: 115%;">We provide infrastructure integration into Servlet Containers and Java
EE 6 application servers allowing you to run the process engine both embedded or as
a container managed service. With this step we broaden the scope from open source embeddable BPM to open source BPM&nbsp;</span><span style="line-height: 18px;">infrastructure</span><span style="line-height: 115%;">.&nbsp;</span></span></span></li>
<li style="border: 0px; color: #333333; line-height: 20px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://docs.camunda.org/latest/api-references/rest/">REST API</a> - New embeddable REST API based on JAX-RS, providing remote access to running processes.</span></li>
<li style="border: 0px; color: #333333; line-height: 20px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://docs.camunda.org/latest/guides/user-guide/#spring-framework-integration">Spring &amp; CDI integration</a> - Programming model integration that allows developers to write Java Applications that interact with running processes in their familiar environment.</span></li>
</ul>
<h4 style="-webkit-font-smoothing: antialiased; border: 0px; color: #333333; cursor: text; margin: 20px 0px 10px; padding: 0px; position: relative;">
<a class="anchor" href="https://github.com/camunda/camunda-bpm-platform#process-design" name="process-design" style="border: 0px; bottom: 0px; color: #4183c4; cursor: pointer; display: block; left: 0px; margin: 0px 0px 0px -30px; padding: 0px 0px 0px 30px; position: absolute; text-decoration: none; top: 0px;"></a><span style="font-family: inherit;">Process Design</span></h4>
<ul style="border: 0px; line-height: 20px; margin: 15px 0px; padding: 0px 0px 0px 30px;">
<li style="border: 0px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://camunda.org/bpmn/tool/">camunda Modeler</a><span style="color: #333333;"> - A great &nbsp;BP</span>MN 2.<span style="font-family: inherit;">0&nbsp;modeling plugin for eclipse</span><span style="color: #333333;">. Allows developers to design &amp; refactor processes inside their IDE.</span></span></li>
<li style="border: 0px; color: #333333; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://docs.camunda.org/latest/guides/getting-started-guides/roundtrip-with-cycle/">camunda Cycle</a> - Enables BPMN 2.0 based Roundtrip between Business and IT parties involved in a project. Allows to use any BPMN 2.0 compliant modeling tool with camunda BPM.</span></li>
</ul>
<h4 style="-webkit-font-smoothing: antialiased; border: 0px; color: #333333; cursor: text; margin: 20px 0px 10px; padding: 0px; position: relative;">
<a class="anchor" href="https://github.com/camunda/camunda-bpm-platform#process-operations" name="process-operations" style="border: 0px; bottom: 0px; color: #4183c4; cursor: pointer; display: block; left: 0px; margin: 0px 0px 0px -30px; padding: 0px 0px 0px 30px; position: absolute; text-decoration: none; top: 0px;"></a><span style="font-family: inherit;">Process Operations</span></h4>
<ul style="border: 0px; color: #333333; line-height: 20px; margin: 15px 0px; padding: 0px 0px 0px 30px;">
<li style="border: 0px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine">camunda engine</a> - JMX and advanced Runtime Container Integration for process engine monitoring and operations.</span></li>
<li style="border: 0px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit">camunda Cockpit</a> - Web application tool for process operations.</span></li>
</ul>
<h4 style="-webkit-font-smoothing: antialiased; border: 0px; color: #333333; cursor: text; margin: 20px 0px 10px; padding: 0px; position: relative;">
<a class="anchor" href="https://github.com/camunda/camunda-bpm-platform#human-task-management" name="human-task-management" style="border: 0px; bottom: 0px; color: #4183c4; cursor: pointer; display: block; left: 0px; margin: 0px 0px 0px -30px; padding: 0px 0px 0px 30px; position: absolute; text-decoration: none; top: 0px;"></a><span style="font-family: inherit;">Human Task Management</span></h4>
<ul style="border: 0px; color: #333333; line-height: 20px; margin: 15px 0px; padding: 0px 0px 0px 30px;">
<li style="border: 0px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist">camunda Tasklist</a> - Simple web application demonstrating how the process engine task API can be used to build task management applications.</span></li>
</ul>
<h4 style="-webkit-font-smoothing: antialiased; border: 0px; color: #333333; cursor: text; margin: 20px 0px 10px; padding: 0px; position: relative;">
<a class="anchor" href="https://github.com/camunda/camunda-bpm-platform#and-theres-more" name="and-theres-more" style="border: 0px; bottom: 0px; color: #4183c4; cursor: pointer; display: block; left: 0px; margin: 0px 0px 0px -30px; padding: 0px 0px 0px 30px; position: absolute; text-decoration: none; top: 0px;"></a><span style="font-family: inherit;">And there's more...</span></h4>
<ul style="border: 0px; line-height: 20px; margin: 15px 0px; padding: 0px 0px 0px 30px;">
<li style="border: 0px; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><a href="https://github.com/camunda/camunda-bpmn.js">ca-bpmn.js</a><span style="color: #333333;">&nbsp;- </span>We started building a complete BPMN toolkit for Java Script (Parser, Process Engine, Renderer)</span></li>
<li style="border: 0px; color: #333333; margin: 0px; padding: 0px;"><span style="font-family: inherit;"><span style="color: #4183c4;"><a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-community-extensions">camunda BPM community extensions</a>&nbsp;</span>- This is where we, together with the community, try out new ideas.</span></li>
</ul>
<h2>
Who are we? &nbsp;(A bunch of angry nerds.)</h2>
We have assembled a unique <a href="http://camunda.org/community/team.html">team of hackers, nerds and BPM experts</a> who want to move BPM forward.<br />
BPM is our passion, its in our blood (and it has been our bread and butter for the last years). And together, we share a common belief: BPM is powerful but BPM is often not delivering on it's full potential. Why?<br />
<br />
As BPM&nbsp;practitioners, we have seen anything from large scale process automation projects to the kind of wasteful organizational documentation projects you read about in books. Last year we successfully introduced the camunda fox BPM platform to the market and it was a huge success. Our customers come from different industries and organizational cultures (some are explosive startups, others are rather traditional players in the insurance industry). What struck us was that from all these different customers, we got one common message of feedback: "no other BPM solution can be integrated as seamlessly into our existing infrastructure. With camunda we can focus on our individual business requirements. We are not constrained to a predefined space of possibilities set by the BPM vendor." And that's the point: as soon as you start automating core business processes, you tap into your business model and that is something very personal and individual to your business. To do that, you don't need a predefined solution, you need a powerful, configurable framework.<br />
<br />
And you need nerds.<br />
<br />
So we say: BPM has the potential to scale your business and to do this, you need an open, flexible platform that allows you to align Business and IT and together build dedicated, individual solutions that realize your individual business model.<br />
<br />
This is what we believe in and this is what we build.<br />
<br />
<span style="color: #666666;">----------------------</span><br />
<span style="color: #666666; font-family: inherit; font-size: x-small;">Activiti and Alfresco are registered trademarks of Alfresco Software,
Inc.</span><br />
<span style="font-size: x-small;"><span style="color: #666666; font-family: inherit;">All other trademarks are the property of their respective owners</span></span>
</div>