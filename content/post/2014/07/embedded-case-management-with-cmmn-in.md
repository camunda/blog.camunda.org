---
title: "Embedded Case Management with CMMN in camunda BPM"
date: "2014-07-22T07:27:00+02:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 
  - "ACM"
  - "adaptive case management"
  - "case management"
  - "CMMN"
  - "dynamic case management"

aliases:
  - "/2014/07/embedded-case-management-with-cmmn-in.html"

---

In our latest alpha release we include a preview of the upcoming support for CMMN (Case Management Model and Notation) in camunda BPM. Time to have a look at CMMN and the way it is implemented in camunda BPM.<br />
<a name='more'></a><h3>
What is CMMN?</h3>
CMMN is an emerging OMG standard for (Adaptive) Case Management. Version 1.0 is freshly released and vendor adoption starts to take off. <a href="http://www.businessprocessincubator.com/tools/case-management/cmmnwebmodeler.html">Trisotech already provides a Web-based Modeler for CMMN</a>&nbsp;and we at camunda have the ambition to provide the first <a href="http://blog.camunda.org/2014/07/open-source-embedded-case-management.html">embedded, Open Source Runtime Engine for CMMN</a>.<br />
<br />
CMMN allows modeling Cases. A case allows humans to do work in a more or less structured way in order to achieve something. Classic examples where case management is applied are Credit Application, Customer Support Management, Document Management, and so on.<br />
<br />
The following is a simple Example of a Credit Application Case modeled in CMMN:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-XGGj3Ikt-58/U8eXtudzhxI/AAAAAAAAAbU/L9WZHvOWXJw/s1600/loan-application.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-XGGj3Ikt-58/U8eXtudzhxI/AAAAAAAAAbU/L9WZHvOWXJw/s1600/loan-application.png" height="245" width="320" /></a></div>
<br />
<div>
The Picture above shows the graphical representation of the CMMN Model. The model also has an executable XML representation which looks like this:
</div>
<div>
<script src="https://gist.github.com/meyerdan/3f5611399c3c2ca25538.js"></script>
</div>
<h3>
New Features in 7.2.0-alpha3</h3>
<div>
In camunda BPM 7.2.0-alpha3 we implemented the basic Case Instance and Plan Item Instance lifecycle. On top of this, the following task types are available:<br />
<br />
<ul>
<li>Stage</li>
<li>Human Task</li>
<li>Process Task</li>
<li>Case Task</li>
</ul>
<br />
Using API you can now start and complete cases and perform the lifecycle on the plan items:</div>
<div>
<script src="https://gist.github.com/meyerdan/44e83b51053add9639e4.js"></script></div>
<h3>
Read the Docs</h3>
<div>
<a href="http://docs.camunda.org/latest/api-references/cmmn10/">There is some documentation on the CMMN implementation available.</a><br />
<br />
<b>Update!</b><br />
We have published a <a href="http://blog.camunda.org/2014/12/getting-started-cmmn-and-camunda.html">getting started guide for CMMN</a>.</div>
