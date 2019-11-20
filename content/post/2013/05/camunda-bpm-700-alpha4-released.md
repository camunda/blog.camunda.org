---
title: "camunda BPM 7.0.0-alpha4 released"
date: "2013-05-16"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/05/camunda-bpm-700-alpha4-released.html"

---

<div>
Release early and release often. Today we bring you<a href="http://www.camunda.org/download/"> the next release of camunda BPM (7.0.0-alpha4)</a>. The Highlights are:<br />
<ul>
<li><a href="http://camundabpm.blogspot.de/2013/05/extending-camunda-cockpit-through.html">First cut of new plugin API for camunda cockpit</a>.</li>
<li>Added message correlation to REST API.</li>
<li><a href="http://docs.camunda.org/guides/installation-guide/">Support for shared process engine in IBM Websphere distribution</a> (enterprise customers only).</li>
</ul>
<div>
<br />
Read the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12890">full release notes</a> in Jira.<br />
<br /></div>
<h3>
Message correlation in REST API</h3>
<div>
With the previous release we added a message correlation method to the Java API. With this release we bring the new functionality&nbsp;to the REST API. (<a href="http://docs.camunda.org/api-references/rest/#!/message/post-message">Read the docs</a>).</div>
<div>
<br /></div>
<div>
The API is pretty straight forward, just execute a POST to the<span style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;">&nbsp;</span><code style="background-color: #f7f7f9; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(225, 225, 232); color: #dd1144; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; line-height: 20px; padding: 2px 4px; white-space: nowrap;">/message</code>&nbsp;resource. Example:&nbsp;</div>
<div>
<br /></div>
<div>
<pre class="ng-scope" style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.14902); color: #333333; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code style="background-color: transparent; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 0px; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 0px;">{"messageName" : "aMessage",
"businessKey" : "aBusinessKey",
"correlationKeys" : {
    "aVariable" : "aValue"
},
"processVariables" : {
    "aVariable" : "aNewValue",
    "anotherVariable" : true
}}</code></pre>
This allows correlating a message to an existing process instance (or start a new process instance) in a single, atomic request.</div>
<div>
<br /></div>
<div>
The corresponding Java Api call looks like this:</div>
<div>
<br /></div>
<div>
<pre class="ng-scope" style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.14902); color: #333333; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code style="background-color: transparent; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 0px; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 0px;">Map<string object=""> correlationKeys = new HashMap<string object="">();
correlationKeys.put("aVariable", "aValue");
    
Map<string object=""> processVariables = new HashMap<string object="">();
processVariables.put("aVariable", "aNewValue");
processVariables.put("anotherVariable", true);


runtimeService.correlateMessage("aMessage", "aBusinessKey", correlationKeys, processVariables);</string></string></string></string></code></pre>
</div>
<h3>
What's next?</h3>
<div>
Now that we have the infrastructure ready for writing cockpit plugins, we can start implementing a bunch of awesome features in cockpit. We will now also start work on the login and security modules for the&nbsp;web applications.</div>
<div>
<br /></div>
<div>
On top of that, we will continue work on the REST API and the Websphere distribution.</div>
<div>
<br /></div>
<div>
Read the full <a href="http://camunda.org/roadmap/">Roadmap</a>.</div>
</div>