---
title: "Scripting Everywhere in camunda BPM"
date: "2014-07-21"
author: "Sebastian Menski"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/07/scripting-everywhere-in-camunda-bpm.html"

---

<div>
With the last <a href="http://blog.camunda.org/2014/07/camunda-bpm-720-alpha3-released.html" target="_blank">camunda BPM 7.2.0-alpha3</a> release we heavily extended the scripting support of the camunda BPM platform. We started to improve scripting support with the <a href="http://blog.camunda.org/2014/05/720-alpha1-released-rest-api-bugfixes.html" target="_blank">7.2.0-alpha1</a> release and now we think we are done. It is now your turn to start using the different scripting languages and help us to polish this feature for our final release. To get an detailed overview of the scripting support please visit our&nbsp;<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-scripting" target="_blank">user guide</a>.<br />
<a name='more'></a><br />
<h3>
Where can I use scripts?&nbsp;</h3>
<div>
Everywhere but to be more specific you can use scripts as:</div>
<div>
<ul>
<li>Script tasks (of course)</li>
<li>Execution listener</li>
<li>Task listener</li>
<li>Condition of sequence flows</li>
<li>Input output mapping (added in <a href="http://blog.camunda.org/2014/06/camunda-bpm-720-alpha2-released.html" target="_blank">7.2.0-alpha2</a>)</li>
</ul>
<div>
The implementation of the scripting support in camunda BPM is designed to be independent from BPMN which will allow us to also support scripting in our new <a href="http://blog.camunda.org/2014/07/open-source-embedded-case-management.html" target="_blank">CMMN implementation</a> right from the beginning.</div>
<h3>
Why should I use scripts?</h3>
</div>
<div>
First of all scripting is fun. But besides that there are also more&nbsp;convincing reasons to use scripting in camunda BPM.</div>
<div>
<br /></div>
<div>
With the extended scripting support it is easy to prototype complete processes including the business logic. Also the sharing of such prototypes is simple, because the whole code can be embedded inside the process. So only one file has to be exchanged and discussed. In combination with the BPMN model API it allows you to create mock processes with business logic directly inside your code.</div>
<div>
<br /></div>
<div>
Another advantage is that now also non-Java programmers can use camunda BPM to execute their processes without writing Java code. Or if you already have an non-Java code base you can now use it inside camunda BPM without porting it to Java.</div>
<div>
<br /></div>
<div>
We also allow you to reuse scripts by using the camunda:resource attribute. Which loads scripts from external resources. Either the scripts can be part of your deployment or reside in the classpath of your application. To get more information on this please see the corresponding <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-scripting-script-source" target="_blank">section</a> in the user guide.</div>
<div>
<br /></div>
<h3>
Let there be scripts</h3>
<div>
To demonstrate the new feature I created a small example process without a single line of Java code. The following process simulates a dice game in a casino.</div>
{{< figure src="http://4.bp.blogspot.com/-N3P_O7NkXEQ/U8y9hXZzb7I/AAAAAAAAADM/iulOCrZDiII/s1600/scripting-everywhere.png" >}}
<div class="separator" style="clear: both; text-align: left;">
The first process element is a script task which should welcome the new player.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<script src="https://gist.github.com/menski/5c5877d1ff6bc8a357b4.js"></script>
</div>
<div class="separator" style="clear: both; text-align: left;">
We use a input parameter mapping to randomly select our new player. Therefore a groovy script is evaluated and the result of the last script line is saved to the local variable <span style="background-color: white; font-family: inherit;">player</span>. Inside the script task than another groovy script just welcomes the newly select player with a kind message.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
At the start of the exclusive gateway we roll the dice. To do so we use an execution listener for the start event of the gateway.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<script src="https://gist.github.com/menski/cc5789441ad35f3b5445.js"></script>
</div>
<div class="separator" style="clear: both; text-align: left;">
The execution listener is another script which saves the result as a process variable so it can be used to evaluate the following sequence flow conditions. The variable is set with the help of the execution variable which corresponds to the DelegateExecution interface.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The conditions of the sequence flow could be expression language but this is a blog post about scripting so lets use a script for that.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<script src="https://gist.github.com/menski/58dee4e7dcd6285bdff9.js"></script>
</div>
<div class="separator" style="clear: both; text-align: left;">
Both groovy scripts just evaluate the process variable set by the exclusive gateway.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The last action is to inform the system which user task should be executed. For that we add a task listener to both user tasks for the create event.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<script src="https://gist.github.com/menski/2af437bfa7e5788fc397.js"></script>
</div>
<div class="separator" style="clear: both; text-align: left;">
The task listeners are again groovy scripts which uses the task variable to print the task name and the event. The task variable corresponds to the DelegateTask interface.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
So that's it. A whole process without a single line of Java code. To see the complete BPMN xml have a look at <a href="https://gist.github.com/menski/6809bba3c3e3bbc3ad56" target="_blank">this gist</a>. Or if you want directly start playing with it you can clone a test project <a href="https://github.com/menski/camunda-engine-unittest/tree/scriptingEverywhere" target="_blank">here</a>.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Now it's your turn. Have fun and start scripting. And if you have any remarks our if you miss a features please let us know.</div>
<div>
<br /></div>

</div>