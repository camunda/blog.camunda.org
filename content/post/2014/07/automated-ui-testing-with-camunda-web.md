---
title: "Automated UI testing with camunda web applications and IntelliJ IDE"
date: "2014-07-11"
author: "Michael Schöttes"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/07/automated-ui-testing-with-camunda-web.html"

---

<div>
<div dir="ltr" style="text-align: left;" trbidi="on">
<div dir="ltr" style="text-align: left;" trbidi="on">
Automated user interface (UI) tests are an effective way to ensure the functionality of your webapp. Furthermore, they serve as E2E tests as they simulate real user interaction and stimulate the whole application down to the database.<br />
BUT, automated UI tests are presumed to be hard to maintain and difficult to understand. Small changes in the webapp’s GUI have massive impact on the test suite to result in refactoring the test cases. Especially when the tests are built by screen recorder.<br />
Another weakness is the response of UI tests. UI tests are perfect to avoid regression running on a CI server all night long. But what if the front-end developer wants to get quick feedback during development?<br />
In this post we give a short introduction to UI testing at camunda. We show how to design robust tests that are easy to maintain and how to get a quick response from your test suite during webapp development.<br />
<div>
</div>
<br />
<a name='more'></a><br />
<h3 style="text-align: left;">
The UI Test Framework</h3>
The camunda bpm stack currently includes four webapps built with HTML 5 and Angular JS: cycle, cockpit, tasklist and admin. For that, we introduced <a href="https://docs.angularjs.org/guide/e2e-testing" target="_blank">Protractor</a>, an E2E test utility for Angular applications.<br />
An important argument for this framework is the seamless integration into our existing technology stack. Protractor is a Node.js based utility that uses Jasmine for its test syntax and can be run with Grunt. Writing UI tests in this environment is very similar to writing unit tests. For both you use the same syntax. As a result, tester and developer speak the same jargon so that knowledge can easily be shared.<br />
<br />
<h3 style="text-align: left;">
Test Development</h3>
As mentioned in the beginning, our goal is to write UI tests that are easy to maintain. Let’s go through the following example:<br />
<br />
<script src="https://gist.github.com/mschoe/eb473ae23c2b599090d0.js?file=testSpec.js"></script>
</div>
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
With this test we check some user administration functionality in the camunda Admin webapp. Although the test will exactly do what we expect, it contains some weaknesses:<br />
-<span class="Apple-tab-span" style="white-space: pre;"> </span>The tests are difficult to understand as they contain a lot of Protractor-specific expressions.<br />
-<span class="Apple-tab-span" style="white-space: pre;"> </span>The test logic and the page elements are closely coupled. Changes on the webapp GUI will have a huge impact on the test cases.<br />
-<span class="Apple-tab-span" style="white-space: pre;"> </span>With each test we duplicate code.<br />
While the mentioned problems seem to be manageable, they will be multiplied with an increasing number of test cases. In the end, the test suite is difficult to maintain.<br />
Fortunately, it is just a matter of code design to avoid the shown problem. To make our tests more robust against changes and to reduce code duplication we encapsulate all logic required to interact with the application under test into separate classes. This design pattern is called Page Object Pattern. As a result we get a clean separation between test logic and the page control logic as shown in the following snippet:<br />
<br />
<script src="https://gist.github.com/mschoe/eb473ae23c2b599090d0.js?file=testSpecRefactoring.js"></script>

<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
After this refactoring the test cases are much better to understand as every step has become more meaningful. Now the test is focused on the behaviour of the application under test and the test specification is more comprehensive. <br />
The corresponding page object looks like this:<br />
<br />
<script src="https://gist.github.com/mschoe/eb473ae23c2b599090d0.js?file=pageObject.js"></script>

<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
By using page objects we decoupled the test from the page elements of the webapp, thus changes on the webapps GUI have no impact on the test case. Furthermore, you only need to adjust the test suite at single points in case of changes.<br />
The outcome of this is a reduction of code duplication, as the page object can be reused wherever needed. <br />
In addition to the page object that represents the page under test, we create a prototype page object. This prototype can be enriched with functionality that is available for all pages of the webapp:<br />
<br />
<script src="https://gist.github.com/mschoe/eb473ae23c2b599090d0.js?file=pageObjectBase.js"></script>

<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
Finally, we get a tidy test suite that is much easier to maintain in medium/long term.<br />
<br />
<h3>
Integrating Protractor into IntelliJ IDE</h3>
<div>
</div>
<div style="-webkit-text-stroke-width: 0px; color: black; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px;">
<div style="margin: 0px;">
<div style="text-align: left;">
<div style="text-align: left;">
<span style="font-family: inherit;">Protractor can be integrated into the IntelliJ IDE by installing the node.js plugin. That gives us the benefit to run and to debug tests directly in the IDE:</span></div>
</div>
</div>
<div class="separator" style="clear: both; font-size: medium; font-weight: normal; text-align: center;">
</div>
<div class="separator" style="clear: both; font-size: medium; font-weight: normal; text-align: center;">
</div>
<div style="font-size: medium; font-weight: normal; margin: 0px;">
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-vXTSQTbMCuM/U78AfRbp2lI/AAAAAAAADbU/26wiZeyl1Go/s1600/10_intellij_debugging.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-vXTSQTbMCuM/U78AfRbp2lI/AAAAAAAADbU/26wiZeyl1Go/s1600/10_intellij_debugging.png" /></a></div>
<br />
<br /></div>
</div>
<div style="text-align: left;">
Furthermore, IntelliJ features auto completion in combination with the page objects:</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-KN6ptAlROqk/U78D4XpCjFI/AAAAAAAADbo/VoSuvc9Mc3Q/s1600/11_intellij_autocomplete.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-KN6ptAlROqk/U78D4XpCjFI/AAAAAAAADbo/VoSuvc9Mc3Q/s1600/11_intellij_autocomplete.png" /></a></div>
<div style="text-align: left;">
<br /></div>
<h3 style="text-align: left;">
&nbsp;UI testing during webapp development</h3>
Running a huge automated UI test suite can take a while. So it is common to trigger these tests on your CI server over night to not slow down the build pipeline. This is perfect for regression testing but insufficient during the webapp development process. With the integration of Protractor into Grunt we can trigger single tests simply over the command line or directly in our IDE:<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-EaDOsBMOebY/U75C893nVJI/AAAAAAAADak/bYbpjXuhKXc/s1600/05_grunt_command_line.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-EaDOsBMOebY/U75C893nVJI/AAAAAAAADak/bYbpjXuhKXc/s1600/05_grunt_command_line.png" /></a></div>
<br />
<br />
For that, we create specific profiles in the&nbsp;<a href="https://github.com/camunda/camunda-bpm-platform/blob/7f194058973094cdd1d8c10a5ce589d27f09f343/webapps/camunda-webapp/webapp/Gruntfile.js#L398" target="_blank">Grunt configuration file</a>&nbsp;of our webapps as shown in the following image:<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-Kwqt7eTf0bk/U75C9GewxMI/AAAAAAAADa4/6LpS5QsRjIc/s1600/06_grunt_profile.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-Kwqt7eTf0bk/U75C9GewxMI/AAAAAAAADa4/6LpS5QsRjIc/s1600/06_grunt_profile.png" /></a></div>
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
The test can also be triggered automatically after a change in the codebase. For this purpose we combine the grunt auto-build command with a <a href="https://github.com/camunda/camunda-bpm-platform/blob/7f194058973094cdd1d8c10a5ce589d27f09f343/webapps/camunda-webapp/webapp/Gruntfile.js#L265" target="_blank">protractor profile</a>:<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-0Pjx660UfPY/U75C9ecsMbI/AAAAAAAADao/up1AkHOyT8s/s1600/07_grunt_autoBuild.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-0Pjx660UfPY/U75C9ecsMbI/AAAAAAAADao/up1AkHOyT8s/s1600/07_grunt_autoBuild.png" /></a></div>
<br />
<h3 style="text-align: left;">
Conclusion</h3>
For an active codebase you need a flexible test suite. Writing tests in the described way allows you to separate test logic from page control logic so that high maintainability and better readability can be reached.<br />
Protractor as test framework can easily be integrated in many setups, so that even changes in the technology stack only have a small impact on the test suite.<br />
Last but not least, we decrease development time as we already get feedback from our UI tests during webapp development.<br />
With IntelliJ we have a powerful IDE that allows us to build, run and debug UI tests. We thank <a href="http://www.jetbrains.com/" target="_blank">JetBrains </a>for the great support for our <a href="http://camunda.org/" target="_blank">open source project</a>.<br />
<br /></div>

</div>