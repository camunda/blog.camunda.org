---
title: "Bringing Together: Transactions, Cancel Events and Compensation Tasks"
date: "2015-08-10T09:34:00+02:00"
author: "Niall Deehan"

categories:
  - "Development"
tags: 

aliases:
  - "/2015/08/brining-together-transactions-cancel.html"

---

If you've ever been lucky enough to enjoy <a href="http://camunda.com/bpmn/training/#tab1">Camunda's BPMN training</a> then you probably have fond memories of the slide featuring Compensation tasks and Cancel events. It happens to be the very last slide in the symbol set section and is traditionally follows by a well deserved break. It also happens to be a very well implemented part of the Camunda engine.<br />
<br />
This post is going to be all about how a process containing a transaction, cancel end event and compensation task are all implemented. The process I'm going to be describing is available <a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/bpmn-transaction">on github to download</a> and play with yourself. the process itself looks like this:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-RpMVgp1wHZw/VcNgB_3sA8I/AAAAAAAAAJQ/rAabGMc2cic/s1600/process.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="314" src="http://2.bp.blogspot.com/-RpMVgp1wHZw/VcNgB_3sA8I/AAAAAAAAAJQ/rAabGMc2cic/s640/process.png" width="640" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<a name='more'></a><div class="separator" style="clear: both; text-align: center;">
</div>
This process describes booking a holiday, as this is an example that requires a certain amount of failure, as with most failures it begins with a test. Specifically, a user task called "Personality Test". In this task you'll get to decide if you're you've got bad luck, bad finances or if in fact you're practically perfect in every way.<br />
<h3>
Bad Luck</h3>
If you choose bad luck a variable will be checked by the Book Hotel task will throw a BPMN error:<br />
<br />
<div class="highlight highlight-java">
<pre class="prettyprint">boolean bookingError = (Boolean) exec.getVariable("bookingHotelError");
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; if(bookingError)
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; throw new BpmnError("THIS_IS_NOT_GOOD");

</pre>
</div>
<br />
The error will be caught by the <a href="http://docs.camunda.org/7.3/api-references/bpmn20/#events-error-events-error-boundary-event">error boundary event</a> on the <a href="http://docs.camunda.org/7.3/api-references/bpmn20/#subprocesses-transaction-subprocess">transaction sub-process</a>. It's important to know that the compensation boundary event on the task itself is only triggered by the cancel end event. So in the case where the error is thrown the compensation event is not triggered. Instead the token will follow the flow of the error boundary event and end up at the "How did this happen task".<br />
<br />
For this to work - no additional properties are required to the error boundary event, it is simply a "catch-all" for any errors that might occur.<br />
<h3>
Bad Finances</h3>
If you've decided on bad finances then the booking will pass by without a hitch but you won't be so luck when you try "Charge Credit Card". That service task will throw a different error:<br />
<br />
<div class="highlight highlight-java">
<pre class="prettyprint">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; boolean bookingError = (Boolean) arg0.getVariable("chargeCardError");
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;if(bookingError)
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;throw new BpmnError("CHARGE_FAILURE");;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 

</pre>
</div>
<br />
This case is different of course because the error boundary event is specifically waiting for a "CHARGE_FAILURE" error as defined in the properties. So when this happens the token is going to move straight to the <a href="http://docs.camunda.org/7.3/api-references/bpmn20/#events-cancel-and-compensation-events-cancel-end-event">cancel end event</a>. This is where the engine works it's magic.<br />
<br />
Without needing add any additional configuration yourself, the engine will take a look at the path the token has taken and work out if there are any <a href="http://docs.camunda.org/7.3/api-references/bpmn20/#events-cancel-and-compensation-events-compensation-boundary-event">compensation boundary events</a> that need to be activated. In this case it will find that "Book Hotel" has a compensation boundary event leading to a<a href="http://docs.camunda.org/7.3/api-references/bpmn20/#tasks-task-markers-compensation"> compensation task</a>.<br />
<br />
A new token is generated for the sole purpose of running the "Cancel Hotel Reservation" task. Once all compensation tasks are complete the token is caught by the <a href="http://docs.camunda.org/7.3/api-references/bpmn20/#events-cancel-and-compensation-events-cancel-boundary-event">cancel boundary event</a> on the transaction itself and continues along that flow to the "Cancellation Details" task.<br />
<br />
<h3>
Everything is Fine</h3>
Finally if you happen to choose the final option in which nothing bad happens - you've clearly missed the point of this example - but at least you have time to think about that while you enjoy your holiday.<br />
<br />
For more information on these events<a href="http://docs.camunda.org/7.3/api-references/bpmn20/"> take a look at our docs.</a> More specifically if you want to read about Cancel and Compensation events, <a href="http://docs.camunda.org/7.3/api-references/bpmn20/#events-cancel-and-compensation-events">check this out</a>. <br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />