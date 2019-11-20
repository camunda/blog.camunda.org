---
title: "camunda BPM 7.0-alpha5 released"
date: "2013-05-31"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/05/camunda-bpm-70-alpha5-released.html"

---

<div>
Two weeks after the last alpha release we bring you the freshly baked* alpha5 version of the<a href="http://www.camunda.org/download/"> camunda BPM platform</a>. The highlights of this crispy new release are:<br />
<br />
<ul>
<li>Failed jobs plugin in cockpit,</li>
<li>Process Instance table in cockpit,</li>
<li>Refined client-side plugin infrastructure,</li>
<li>New incident infrastructure in process engine,</li>
<li>Additions to the REST API,</li>
<li><a href="http://docs.camunda.org/guides/installation-guide/was/">Complete support for websphere application server 8.5 (enterprise customers only)</a></li>
</ul>
<div>
<span style="font-family: Arial, FreeSans, Helvetica, sans-serif;"><span style="font-size: 14px; line-height: 18px;">50</span></span> JIRA issues were closed, see the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12892">complete release notes</a>.</div>
<div>
<br /></div>
<div>
Note: this release contains database changes. Upgrade scripts can be found in the "sql" folder of the distribution.</div>
<div>
<i><br /></i></div>
<div>
<i>(* using Robert Gimbel's special homemade yeast)</i><br />
<i></i><br />
<a name='more'></a><i><br /></i></div>
<h3>
Things are happening in the cockpit</h3>
<div>
Over the last two weeks, process engine hacker Roman Smirnov and Javascript wizzard super magician Nico Rehwaldt have been focusing on camunda cockpit. They have added a couple of features and refined the cockpit plugin infrastructure.&nbsp;</div>
<div>
<br /></div>
<div>
There is process definition summary plugin which visualizes the state of a process definition using green and red dots (red = failed jobs):</div>
<div>
<br /></div>
{{< figure src="http://2.bp.blogspot.com/-Z-IkIG4UezQ/Uahw_XbmfEI/AAAAAAAAAII/PTfQNyACrKE/s1600/summary.png" >}}
<div>
<br /></div>
<div>
On the process definition details page we now have process instance table:</div>
<div>
<br /></div>
{{< figure src="http://1.bp.blogspot.com/-D44PYSRGPUE/UahxfbfIoGI/AAAAAAAAAIQ/uHG-XzZz8rk/s1600/process-definition.png" >}}
<div>
<br /></div>
<div>
<br /></div>
<div>
We now have an increasingly powerful and flexible client side-architecture in place which will now allow us to implement interesting new features and start working on usability and layout of existing features. Read the full client-side plugin story at&nbsp;<a href="http://docs.camunda.org/latest/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin">http://docs.camunda.org/latest/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin</a>&nbsp;(section "The client side"). Also check out our client-side test infrastructure using Karma and Node.js: see <a href="https://github.com/camunda/camunda-bpm-platform/blob/master/README.md">README.md</a>&nbsp;and <a href="https://github.com/camunda/camunda-bpm-platform/tree/master/webapps/cockpit/cockpit-webapp/src/test/js">sources</a>.</div>
<div>
<br /></div>
<h3>
Incident infrastructure in Process Engine (Work In Progress)</h3>
<div>
We started work on a new Infrastructure for incidents in the process engine. This project has 3 goals:</div>
<div>
<br />
<ol>
<li>Provide an abstraction over different "notable" events that can happen during process execution.&nbsp;</li>
<li>Provide an extensible, event-oriented API for handling such incidents.</li>
<li>Provide a default implementation for incident event handlers which writes incidents to the database.</li>
</ol>
<div>
Currently we provide incidents for failed jobs. Failed job incidents are raised when automatic retries for a Job (Timer or Asynchronous continuation) have elapsed. The incident indicates that the corresponding execution is stuck and will not continue automatically. Administrative action is necessary. The incident is resolved, when the job is executed manually or when the retries for the corresponding job are reset to a value &gt; 0. In the future, we plan on providing features for raising additional kinds of incidents. Examples are the fact that a process instance has entered a certain task, that an error boundary has been triggered or that a process instance took to long to complete.&nbsp;</div>
<div>
<br /></div>
<div>
Incident handling is extensible. The default implementation writes incidents to the database such that they can be queried:</div>
<div>
<br /></div>
<div>
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.14902); color: #333333; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code style="background-color: transparent; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 0px; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 0px;">runtimeService.createIncidentQuery()
  .processDefinitionId("someDefinition")
  .list();</code></pre>
</div>
<div>
<br /></div>
<div>
In cockpit we can now visualize different kinds of incidents in the same way and allow users to define for a given process definition what constitutes an "incident".</div>
{{< figure src="http://2.bp.blogspot.com/-6RECUsxACQ4/Uah6lFBMzdI/AAAAAAAAAIw/HIuSf7wc7Y0/s1600/incidents.png" >}}
<div>
We also support recursively raising incidents for super process instances and correlating them to the call activity which has invoked the process instance in which the incident occurred. This is used by the cockpit tool for visualizing the state of a process definitions (and instances). &nbsp;The recursive nature of incidents will allow the cockpit tool to provide drill-down features.</div>
{{< figure src="http://2.bp.blogspot.com/-wBOg-yj-Fnc/Uah6auTNi8I/AAAAAAAAAIg/sxM1I6QG_70/s1600/drill-down.png" >}}
<div>
<br /></div>
</div>
<div>
There is an extensible API for handling incidents which allows you to replace or enhance the default behavior. For example, you could send an email to an administrator if an incident inside a given process definition is raised.</div>
<div>
<br /></div>
<div>
Read the doc on incidents:&nbsp;<a href="http://docs.camunda.org/latest/guides/user-guide/index.html#process-engine-incidents">http://docs.camunda.org/latest/guides/user-guide/index.html#process-engine-incidents</a></div>
<h3>
Additions to the REST Api</h3>
<div>
Thorben has done some additions to the REST API, checkout&nbsp;</div>
<div>
<ul>
<li>Better exception messages.</li>
<li>Execution Queries.</li>
<li>Process instance /execution variables.</li>
</ul>
<div>
Errors are now also provided in JSON format:</div>
</div>
<div>
<br /></div>
<div>
<code style="background-color: #f7f7f9; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(225, 225, 232); color: #dd1144; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; line-height: 20px; padding: 2px 4px; white-space: nowrap;">{"type" : "SomeExceptionClass", "message" : "a detailed message"}.</code></div>
<div>
<br /></div>
<div>
You can modify multiple process variables in a single request:</div>
<div>
<br /></div>
<div>
<span class="ng-scope" style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"></span><br />
<div class="ng-scope" style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; margin-bottom: 10px;">
POST&nbsp;<code style="background-color: #f7f7f9; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(225, 225, 232); color: #dd1144; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 2px 4px; white-space: nowrap;">/process-instance/aProcessInstanceId/variables</code></div>
<span class="ng-scope" style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"></span><br />
<div class="ng-scope" style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; margin-bottom: 10px;">
Request body:</div>
<span class="ng-scope" style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;"></span><br />
<pre class="ng-scope" style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.14902); color: #333333; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code style="background-color: transparent; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 0px; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; padding: 0px;">{"modifications": [
    {"name": "aVariable",
     "value": "aValue"},
    {"name": "anotherVariable",
     "value": 42}
    ],
"deletions": [
    "aThirdVariable", "FourthVariable"
]}</code></pre>
</div>
<div>
<br /></div>
<div>
Or you can address individual process variables through PUT/ GET / DELETE:</div>
<div>
<span style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;">PUT&nbsp;</span><code style="background-color: #f7f7f9; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(225, 225, 232); color: #dd1144; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; line-height: 20px; padding: 2px 4px; white-space: nowrap;">/execution/anExecutionId/localVariables/aVarName</code></div>
<div>
<span style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;">GET&nbsp;</span><code style="background-color: #f7f7f9; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(225, 225, 232); color: #dd1144; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; line-height: 20px; padding: 2px 4px; white-space: nowrap;">/execution/anExecutionId/localVariables/aVarName</code></div>
<div>
<span style="background-color: white; color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px;">DELETE&nbsp;</span><code style="background-color: #f7f7f9; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-top-left-radius: 3px; border-top-right-radius: 3px; border: 1px solid rgb(225, 225, 232); color: #dd1144; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 12px; line-height: 20px; padding: 2px 4px; white-space: nowrap;">/execution/anExecutionId/localVariables/aVarName</code></div>
<div>
<br /></div>
<div>
<br /></div>
<div>
<br /></div>
</div>