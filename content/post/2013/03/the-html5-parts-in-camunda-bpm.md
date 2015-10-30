---
title: "The HTML5 parts in camunda BPM"
date: "2013-03-20"
author: "Andreas Drobisch"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/03/the-html5-parts-in-camunda-bpm.html"

---

<div>
<div dir="ltr" style="text-align: left;" trbidi="on">
The camunda bpm stacks currently includes three web apps: cycle, cockpit, tasklist. All of them are rewrites from a JSF 2.0 ancestor version and with this post I want to explain the decision to built them on a HTML5 plus REST architecture and not with <span style="font-family: Courier New, Courier, monospace;">&lt;insert java web framework here&gt;</span>.<br />
<br />
Its clear that the web itself is based on the client-server principle. Many Web frameworks like JSF, Vaadin etc. implement it like this:<br />
<ol style="text-align: left;">
<li>Provide a abstraction layer to define the HTML&nbsp;+ JS + CSS&nbsp;Code to generate (Java Code, Facelets etc.) which in the end is your application</li>
<li>On request, generate the code sent to the browser, initially create a session model for data binding etc.</li>
<li>Keep the generated browser client in sync with the backend session</li>
</ol>
<div>
The main purposes of this approach: reduce the need to touch JavaScript and make it possible to abstract even more to build reusable components. One&nbsp;consequence&nbsp;is a hard wiring of the client and the server session and you will need to have a integration layer between your application code and the framework, which is unlikely to be reused in case of a framework switch.</div>
<div>
<br /></div>
<div>
In the end all that matters is: give the browser the HTML&nbsp;+ JS &nbsp;+ CSS it needs to show the application. So why not write just this code without a server side abstraction or knowledge about the server side implementation?&nbsp;</div>
<div>
<br /></div>
<div>
<div class="separator" style="clear: both; text-align: center;">
</div>
Thats the idea behind the HTML5 buzz. We are now living in the age of web APIs (see&nbsp;<a href="http://www.apihub.com/">http://www.apihub.com/</a>) and this concept can be applied to web app development very easily.&nbsp;</div>
<div>
<br /></div>
<div>
So you provide a server side stateless implementation of you business logic or data and <a href="http://docs.camunda.org/latest/api-references/rest/" target="_blank">define the interface for your clients</a> (typically url paths and the json structure) to have a reusable API for you applications.</div>
<div>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-G3HHc2cy5YM/UUntbZsb2UI/AAAAAAAAAFs/xzjeFX_36pM/s1600/webapps.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="462" src="http://3.bp.blogspot.com/-G3HHc2cy5YM/UUntbZsb2UI/AAAAAAAAAFs/xzjeFX_36pM/s640/webapps.png" width="640" /></a></div>
<br /></div>
<div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br /></div>
<div>
<br /></div>
<div>
What are the benefits:&nbsp;</div>
<div>
<ul style="text-align: left;">
<li>You can build new apps around existing apis very fast, the tasklist and cockpit are using the same server side implementation</li>
<li>You are free in your choice on how to implement the client. There are many MVC JavaScript frameworks to help you&nbsp;kick-start&nbsp;the client side. Its possible to complement that with the whole universe of <a href="http://microjs.com/">JavaScript libs</a>&nbsp;and CSS Frameworks. We are using <a href="http://angularjs.org/" target="_blank">AngularJS</a>, <a href="http://jquery.com/" target="_blank">jQuery</a>, <a href="http://dojotoolkit.org/" target="_blank">dojo</a> and <a href="http://twitter.github.com/bootstrap/" target="_blank">Bootstrap</a> for our apps.</li>
<li>You can easily write <a href="https://github.com/camunda/camunda-bpmn.js/blob/master/test/bpmn/usertask.js" target="_blank">unit tests</a> for the code running in the browser</li>
<li>Full control over the requests made and the browser compatibility layer&nbsp;</li>
<li>You make your application scale better because of the stateless backend</li>
<li>You can develop client and server in parallel and create mockups / prototypes very fast, e.g. to talk about different UI designs</li>
</ul>
</div>
<div>
<i>"With great power comes great responsibility"</i> so you will now need to take care of some aspects yourself:</div>
<div>
<ul style="text-align: left;">
<li>How to structure you client side code (javascript + css) for reuse (we are using <a href="http://requirejs.org/" target="_blank">requirejs</a>)</li>
<li>Browser Compatibility (luckily most frameworks we are using take care themselves)</li>
<li>All JavaScript related stuff like minifiing, concatenation etc. (there are lots of tools out there)</li>
</ul>
<div>
But in the end these points are part of the flexibility as well.</div>
<div>
<br /></div>
<div>
We are really happy with the results and this setup is a future proof foundation for our <a href="http://www.camunda.org/" target="_blank">upcoming features</a>.</div>
</div>
<div>
<br /></div>
<div>
<br /></div>
</div>
</div>