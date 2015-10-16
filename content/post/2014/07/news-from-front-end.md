---
title: "News from the front-(end)"
date: "2014-07-23"
author: "Valentin Vago"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2014/07/news-from-front-end.html"

---

<div>
The front-end of the camunda BPM platform has been under heavy development.<br />
The web-apps have been externalized and separated into different projects,<br />
which means that the "<a href="https://github.com/camunda/camunda-admin-ui" target="_blank">admin</a>", the "<a href="https://github.com/camunda/camunda-cockpit-ui" target="_blank">cockpit</a>" and the upcoming "<a href="https://github.com/camunda/camunda-tasklist-ui" target="_blank">tasklist</a>" have their own repositories,<br />
and those projects are now relying on the "<a href="https://github.com/camunda/camunda-commons-ui" target="_blank">UI commons</a>" and the "<a href="https://github.com/camunda/camunda-bpm-sdk-js" target="_blank">Javascript SDK</a>"&nbsp;libraries.<br />
<br />
<a name='more'></a><br />
<h2>
The Javascript SDK</h2>
The actual JS SDK has already been implemented in the upcoming tasklist and allows us to start processes and use their embedded forms (when they use one).<br />
<br />
The forms handling is also being re-written from scratch to be easier to use and less conflicting with the HTML you might have wrote to customize your user experience.<br />
<br />
<h3>
New embedded form:</h3>
What did change? Mostly, the attributes.<br />
<ul>
<li>An embedded form&nbsp;<strong>must</strong>&nbsp;have an attribute&nbsp;<em>cam-form</em>&nbsp;in order to be discovered by the toolkit.</li>
<li>The fields who are relevant to the engine&nbsp;<b>must</b>&nbsp;have the&nbsp;<i>c</i><i>am-variable-name</i> attribute with a value being the name of a variable.</li>
<li>The tags having a cam-variable-name attribute may also have a <i>cam-variable-type</i> attribute with one of the following values:
    <ul>
<li>string - only supported type at the moment of writing this post</li>
<li>java primitive types, date, integer, long, short, ...</li>
<li>your own type - if you want to work with complex data</li>
</ul>
</li>
</ul>
How does it work? The following things will happen:
<br />
<ol>
<li>look for form <i>tag</i> with a <i>cam-form</i> attribute</li>
<li>within the form, iterate threw the fields having a <i>cam-variable-name</i> attribute and collect information</li>
<li>send a request to the engine to get information about the variables</li>
<li>update the form fields accordingly (the values and types already present in the form are not being overridden)</li>
<li>the user fills the form and click the submit button</li>
<li>the data is validated (and messages are shown if necessary)</li>
<li>if the validation succeeded, a request - using the API client - is performed</li>
</ol>
<script src="https://gist.github.com/zeropaper/35248319105f3470af65.js?file=start-form.html"></script>
Note, if you cloned the <a href="https://github.com/camunda/camunda-bpm-platform" target="_blank">camunda-bpm-platform</a> repository, you will find this file under<br />
<a href="https://github.com/camunda/camunda-bpm-platform/tree/master/examples/invoice/src/main/webapp/forms/start-form.html">examples/invoice/src/main/webapp/forms/start-form.html</a>. 

<br />
<h3>
New API client</h3>
The API client is aimed to ease the communication between your front-end (or node.js) application and the platform engine. Using it will not only reduce the amount of code you have to write but also increase the life span of your scripts.
<br />
Our goal is to standardize as much as possible the methods and their signatures for each resources in order to make it easy to learn and use. So, most of the resources will have a <i>list</i> function taking<br />
<ol>
<li>an object - describing the query parameters&nbsp;/ options&nbsp;- as first argument</li>
<li>a callback - à-la node.js - to treat the response.
  In the case of a <i>list</i> call, the callback function will have 2 arguments - again, à-la node.js - like:
    <ol>
<li>error: should be falsy, unless an error occurred</li>
<li>result: is going to be an object with the properties
        <ul>
<li>count: is the total amount of records matching the "where" criteria</li>
<li>items: will be an array of objects</li>
</ul>
</li>
</ol>
</li>
</ol>
The following snippet is inspired by the implementation in the new tasklist.
<script src="https://gist.github.com/zeropaper/35248319105f3470af65.js?file=sdk-process-definition.js"></script>
<br />
<h3>
Upcoming</h3>
As mentioned, there is a lot of work done (and to be done) on the different aspects of the web-apps.<br />
We have a plan, we started implementing it and we will, within a few weeks, add API client resources, support additional form field types, improve the stability of our code and provide a brand new web-based user interface for the tasklist.<br />
<br />
By the way... if you want to work on those kind of projects, with a small but great team and play some kicker: we are still <a href="http://camunda.com/about/jobs/frontend-developer.php">looking for front-end developers</a>.
</div>