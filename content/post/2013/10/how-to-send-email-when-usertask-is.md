---
title: "How to send an email when a usertask is assigned"
date: "2013-10-31"
author: "Jakob Freund"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/10/how-to-send-email-when-usertask-is.html"

---

<div>
<blockquote class="tr_bq">
"I don't want to watch my camunda Tasklist all day. When there is something to do, I want to get an email containing a link that takes me directly to the respective task!"</blockquote>
<br />
This is a typical statement by process participants (aka business users). There are numerous possible ways to implement such a requirement in your process application, e.g. using a service task:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/--iV9hw06uTY/UnIBVw1EK5I/AAAAAAAAAFQ/xkJ5FN-l2oY/s1600/verbose.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="107" src="http://1.bp.blogspot.com/--iV9hw06uTY/UnIBVw1EK5I/AAAAAAAAAFQ/xkJ5FN-l2oY/s400/verbose.png" width="400" /></a></div>
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<br />
But this is not really appropriate, since it makes the process model rather verbose and therefore less valuable for business-IT-alignment.<br />
<br />
The more elegant way is to use a task listener: This very powerful concept is&nbsp;<a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-delegation-code-task-listener">described in detail in the userguide</a>, and the behavior we want is a perfect use case, so let's see how it works!<br />
<br />
<a name='more'></a><br />
<br />
Let's say we created a simple process application (like in the <a href="http://docs.camunda.org/latest/guides/getting-started-guides/developing-process-applications/">Get Started Tutorial</a>), but this process contains only one usertask. The next step is to created a Task Listener Class like the one below. The important parts are:<br />
<br />
<ul>
<li><span style="background-color: orange;">It implements the Task Listener Interface.</span></li>
<li><span style="background-color: yellow;">It retrieves the assignee from the Task Object and loads the according User Profile including the assignee's email address</span>.</li>
<li><span style="background-color: lime;">It creates a simple mail containing a deep link to the task instance.</span></li>
</ul>
<br />
package org.camunda.bpm.quickstart;<br />
<br />
import java.util.logging.Level;<br />
import java.util.logging.Logger;<br />
<br />
<span style="background-color: lime;">import org.apache.commons.mail.Email;</span><br />
<span style="background-color: lime;">import org.apache.commons.mail.SimpleEmail;</span><br />
<span style="background-color: yellow;">import org.camunda.bpm.engine.IdentityService</span>;<br />
<span style="background-color: orange;">import org.camunda.bpm.engine.delegate.DelegateTask;</span><br />
<span style="background-color: orange;">import org.camunda.bpm.engine.delegate.TaskListener;</span><br />
<span style="background-color: yellow;">import org.camunda.bpm.engine.identity.User;</span><br />
import org.camunda.bpm.engine.impl.context.Context;<br />
<br />
<span style="background-color: orange;">public class TaskAssignmentListener implements TaskListener</span> {<br />
<br />
&nbsp;<span style="background-color: lime;"> // TODO: Set Mail Server Properties</span><br />
<span style="background-color: lime;">&nbsp; private static final String HOST = "mail.example.org";</span><br />
<span style="background-color: lime;">&nbsp; private static final String USER = "admin@example.org";</span><br />
<span style="background-color: lime;">&nbsp; private static final String PWD = "toomanysecrets";</span><br />
<br />
&nbsp; private final static Logger LOGGER = Logger.getLogger(TaskAssignmentListener.class.getName());<br />
<br />
<span style="background-color: orange;">&nbsp; public void notify(DelegateTask delegateTask) {</span><br />
<br />
&nbsp; &nbsp; <span style="background-color: yellow;">String assignee = delegateTask.getAssignee();</span><br />
&nbsp; &nbsp; <span style="background-color: lime;">String taskId = delegateTask.getId();</span><br />
<br />
&nbsp; &nbsp; if (assignee != null) {<br />
&nbsp; &nbsp; <br />
&nbsp; &nbsp; &nbsp; <span style="background-color: yellow;">// Get User Profile from User Management</span><br />
<span style="background-color: yellow;">&nbsp; &nbsp; &nbsp; IdentityService identityService = Context.getProcessEngineConfiguration().getIdentityService();</span><br />
<span style="background-color: yellow;">&nbsp; &nbsp; &nbsp; User user = identityService.createUserQuery().userId(assignee).singleResult();</span><br />
<br />
&nbsp; &nbsp; &nbsp; if (user != null) {<br />
&nbsp; &nbsp; &nbsp; <br />
&nbsp; &nbsp; &nbsp; &nbsp;<span style="background-color: yellow;"> // Get Email Address from User Profile</span><br />
<span style="background-color: yellow;">&nbsp; &nbsp; &nbsp; &nbsp; String recipient = user.getEmail();</span><br />
&nbsp; &nbsp; &nbsp; <br />
&nbsp; &nbsp; &nbsp; &nbsp; if (recipient != null &amp;&amp; !recipient.isEmpty()) {<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="background-color: lime;"> Email email = new SimpleEmail();</span><br />
<span style="background-color: lime;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; email.setHostName(HOST);</span><br />
<span style="background-color: lime;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; email.setAuthentication(USER, PWD)</span>;<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; try {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="background-color: lime;">&nbsp; email.setFrom("noreply@camunda.org");</span><br />
<span style="background-color: lime;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; email.setSubject("Task assigned: " + delegateTask.getName());</span><br />
<span style="background-color: lime;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; email.setMsg("Please complete: http://localhost:8080/camunda/app/tasklist/default/#/task/" + taskId);</span><br />
<span style="background-color: lime;"><br /></span>
<span style="background-color: lime;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; email.addTo(recipient);</span><br />
<span style="background-color: lime;"><br /></span>
<span style="background-color: lime;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; email.send();</span><br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; LOGGER.info("Task Assignment Email successfully sent to user '" + assignee + "' with address '" + recipient + "'."); &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } catch (Exception e) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; LOGGER.log(Level.WARNING, "Could not send email to assignee", e);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; } else {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; LOGGER.warning("Not sending email to user " + assignee + "', user has no email address.");<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
<br />
&nbsp; &nbsp; &nbsp; } else {<br />
&nbsp; &nbsp; &nbsp; &nbsp; LOGGER.warning("Not sending email to user " + assignee + "', user is not enrolled with identity service.");<br />
&nbsp; &nbsp; &nbsp; }<br />
<br />
&nbsp; &nbsp; }<br />
<br />
&nbsp; }<br />
<br />
}<br />
<br />
The last step is to assign the class as a task listener to the usertask in the process model. As you can see below, the task listener will be executed when the usertask has been assigned:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-GqrPGJm8PfY/UnIBcp-3X3I/AAAAAAAAAFc/x6HULzEyitg/s1600/listener.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="298" src="http://1.bp.blogspot.com/-GqrPGJm8PfY/UnIBcp-3X3I/AAAAAAAAAFc/x6HULzEyitg/s640/listener.png" width="640" /></a></div>
<br />
<br />
And that's about it! If you want to see an example ready to run, just check out the <a href="https://github.com/camunda/camunda-quickstarts/tree/master/usertask/task-assignment-email">Task Assignment Email Quickstart</a>.<br />
<br />
From a user perspective, it will look like this:<br />
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<br />
<object class="BLOGGER-youtube-video" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" data-thumbnail-src="http://i1.ytimg.com/vi/XLEb3R2Nm5k/0.jpg" height="266" width="320"><param name="movie" value="http://www.youtube.com/v/XLEb3R2Nm5k?version=3&f=user_uploads&c=google-webdrive-0&app=youtube_gdata" /><param name="bgcolor" value="#FFFFFF" /><param name="allowFullScreen" value="true" /><embed width="320" height="266"  src="http://www.youtube.com/v/XLEb3R2Nm5k?version=3&f=user_uploads&c=google-webdrive-0&app=youtube_gdata" type="application/x-shockwave-flash" allowfullscreen="true"></embed></object><br />
<br />
Have fun with camunda :)<br />
<br />
</div>