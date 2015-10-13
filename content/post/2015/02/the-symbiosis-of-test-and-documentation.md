---
title: "The symbiosis of test and documentation"
date: "2015-02-03T14:26:00+01:00"
author: "Sebastian Stamm"

categories:
  - "Development"
tags: 
  - "e2e test"
  - "JavaScript"
  - "testing"
  - "UI test"

aliases:
  - "/2015/02/the-symbiosis-of-test-and-documentation.html"

---

We want to build a library of reusable widgets, which are tested and documented. The components of the tasklist search are examples for such widgets:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-CmJO8miLGR0/VM-WiUVxfsI/AAAAAAAACzQ/eDdiAe87iMs/s1600/searchTasklistScreenshot.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-CmJO8miLGR0/VM-WiUVxfsI/AAAAAAAACzQ/eDdiAe87iMs/s1600/searchTasklistScreenshot.PNG" height="265" width="320" /></a></div>
<br />
This blog entry describes how we document and test widgets and make sure that tests and documentation stay in sync.<br />
<br />
<a name='more'></a><br />
<h3>
Tests</h3>
With <a href="https://docs.angularjs.org/guide/e2e-testing" target="_blank">E2E tests</a> we specify and test the desired behavior of the widgets. For our angular widgets, we use <a href="http://angular.github.io/protractor/#/" target="_blank">Protractor</a>. E2E tests interact with a webpage, e.g. by clicking on links and buttons or typing text. This simulates the user behavior. To run these tests, we have to create the webpages the tests use. These webpages display the widget in the environment we want to test.<br />
<h3>
Documentation</h3>
For the documentation, we describe the interface of the widget and show scenarios where this widget can be used. We also include code samples. This allows developers to copy the code into their application and get an instance of the widget. We also have to create a webpage for this documentation.<br />
<h3>
Bringing Both Together</h3>
Creating separate webpages for documentation and tests creates some problems: When we change the interface or implementation of a widget, we have to adapt both pages. There is a much higher risk of inconsistency between tests and documentation. Therefore documentation and tests should be close together.<br />
<br />
To solve this problem, we create a single webpage, which serves as documentation page, but is also used for automated testing. This page contains three parts:<br />
<br />
<ol>
<li><b>Interface description: </b>Very useful for the developers, but ignored by Protractor</li>
<li><b>Example codes:&nbsp;</b>Also useful for the developers, ignored by Protractor</li>
<li><b>Functional Sample Widgets:&nbsp;</b>Useful for the developers. They can play around with the widget before using it in the app. This is also the part where Protractor performs its tests.</li>
</ol>
<div>
By having documentation and test on the same page, we ensure that both stay in sync and consistent.</div>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-V_x8LlWKzgo/VM-XbPvKafI/AAAAAAAACzY/vdRi2P-oIFE/s1600/screenshot_commons_docu.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-V_x8LlWKzgo/VM-XbPvKafI/AAAAAAAACzY/vdRi2P-oIFE/s1600/screenshot_commons_docu.PNG" height="267" width="320" /></a></div>
<h3>
Try It Out!</h3>
<br />
<ol>
<li>Check out the <a href="https://github.com/camunda/camunda-commons-ui" target="_blank">camunda-commons-ui project</a>&nbsp;</li>
<li>To execute the tests:</li>
<ol>
<li>In the root directory, execute <span style="font-family: Courier New, Courier, monospace;">grunt</span></li>
</ol>
<li>To access the documentation:</li>
<ol>
<li>In the root directory, execute&nbsp;<span style="font-family: Courier New, Courier, monospace;">grunt connect:widgetTests:keepalive</span></li>
<li><span style="font-family: inherit;">Navigate to the .spec.html file of the widget (e.g. http://localhost:8070/lib/widgets/search-pill/test/search-pill.spec.html)</span></li>
</ol>
</ol>
