---
title: "The Case for Open Source Embedded Case Management"
date: "2014-07-19"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/07/open-source-embedded-case-management.html"

---

<div>
<div>
In camunda BPM we enhance our lightweight embedded BPMN Process Engine with <a href="http://docs.camunda.org/latest/api-references/cmmn10/">case management features</a> based on CMMN. CMMN is the new emerging industry standard for (Adaptive) Case Management (ACM) developed by the OMG (Object Management Group), the same consortium which is also behind &nbsp;the BPMN 2.0 standard. I believe that lightweight open source solutions based on open standards can make a difference in the case management space. This is why.</div>
<h3>
The traditional "hard-coded" Approach</h3>
<div>
Traditionally, case management applications were hard coded. If an enterprise needed an application for handling credit applications, it would call on to their Java Developers (or worse: their Cobol Mainframe Developers), there would be some kind of software specification document written and the developers would get down to business and hard code the complete application logic in Java (or Cobol ;) ).</div>
<div>
If the enterprise has a good software development process and skilled software developers, the result of this is usually also quite good: the application is exactly tailored to the specific requirements of the enterprise. However, there are also many downsides to this approach: &nbsp;</div>
<div>
<ul>
<li>due to the fact that the complete business logic is hard coded, it is hard to understand and change. Also, the implemented case logic may not correspond to the initial specification.</li>
<li>There are many "generic" parts of a case management application which have to be rewritten for each and every application.</li>
<li>If you have multiple case management applications, there is no "central monitoring" for all applications. There is no overview over both credit applications and customer support management, for example.</li>
</ul>
<h3>
The blind Alley: Proprietary Suites</h3>
<div>
The answer to this is usually that an enterprise buys a proprietary case management suite. While these suites help enterprises to solve some of the problems of hard-coded case management applications, they come with an entirely new set of problems:</div>
</div>
<div>
<ul>
<li>Vendor Lock In,</li>
<li>Usually these suites have an all-in&nbsp;<a href="http://blog.camunda.org/2013/04/the-camunda-hypothesis.html">zero-coding approach</a>: everything from the user interface up to the business rules has to be "graphically configured". This limits developers to the possibilities that the vendor foresaw in the development tool and it keeps developers from doing what they do best: coding,</li>
<li>The applications are usually generic and cannot easily be adapted to the specific requirements an enterprise may have.</li>
</ul>
<h3>
The Future is Open Source Embedded Case Management</h3>
<div>
So traditionally, enterprises had to choose between either developing everything themselves or buying an expensive proprietary case management suite. This is where I believe that&nbsp;<b>lightweight, embedded case management based on open source and open standards</b>&nbsp;can make a difference. If you use CMMN and a lightweight open source case engine like camunda,</div>
<div>
<ul>
<li>You have minimal vendor lock-in due to open standards (CMMN, Java, ...) and Open Source,</li>
<div>
</div>
<li>You can leverage the CMMN standard for modeling executable Case Models which are more easy to understand and refactor than code,</li>
<li>The lightweight case engine can be embedded into custom applications so that you can still code many aspects (such as business logic, user interfaces, ...) in Java and other programming languages but on the other hand you can delegate the generic aspects (case instance state management, monitoring, ...) to the case management engine.</li>
</ul>
<div>
<b>Update!</b></div>
</div>
</div>
<div>
We have published a&nbsp;<a href="http://blog.camunda.org/2014/12/getting-started-cmmn-and-camunda.html">getting started guide for CMMN</a>.</div>

</div>