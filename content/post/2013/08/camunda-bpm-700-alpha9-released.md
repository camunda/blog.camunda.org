---
title: "camunda BPM 7.0.0-alpha9 released"
date: "2013-08-09"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/08/camunda-bpm-700-alpha9-released.html"

---

<div>
Today we are happy to announce the next alpha version of camunda BPM. Get it&nbsp;<a href="http://camunda.org/download/" target="_blank">here</a>.<br />
<div>
<br />
<h3>
Highlights of this Release</h3>
<div>
<br /></div>
<div>
cockpit:</div>
<div>
<ul>
<li>instance filters added that allow you to filter for business key and variables</li>
<li>called process definition tab added</li>
<li>called process instances tab added</li>
</ul>
admin:<br />
<ul>
<li>administrate users and groups added</li>
<li>change group memberships added</li>
<li>manage authorizations added</li>
<li>assign access rights to cockpit and tasklist added (as part of manage authorizations)</li>
</ul>
engine:</div>
<div>
<ul>
<li>ability to run process engine in a heterogenous cluster&nbsp;added</li>
<li>unique constraint on business key&nbsp;removed&nbsp;(applied to new installations only)</li>
<li>#noRetriesLeft to jobQuery&nbsp;added</li>
<li>bpmn element throwing message event&nbsp;added</li>
<li>bpmn element&nbsp;send task&nbsp;added</li>
<li>exception types in error codes to declare business exceptions</li>
<li>history performance&nbsp;improved</li>
<li>configuration from camunda.cfg.xml file possible (in addition to activity.cfg.xml)</li>
</ul>
<div>
<br />
Breaking changes:</div>
</div>
<div>
<ul>
<li>the tasklist is now part of the camunda webapp, you should find it at&nbsp;<a href="http://localhost:8080/camunda/app/tasklist">http://localhost:8080/camunda/app/tasklist</a>.&nbsp;</li>
</ul>
<div>
<div>
<br />
In total, 80 issues have been addressed including more than 20 bug fixes. Check out the <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12994">complete list</a> for all the details.</div>
<div>
<br /></div>
<div>
Thanks to&nbsp;<a href="https://github.com/polenz">Kristin</a>,&nbsp;<a href="https://github.com/rafacm">Rafael</a>&nbsp;and&nbsp;<a href="https://github.com/clintmanning">Clint</a>&nbsp;for contributing to this release through their pull requests.&nbsp;</div>
</div>
</div>
<div>
And thanks to <a href="https://github.com/shentschel">Stefan</a>&nbsp;for your continuous fight for better IE compatibility ;-).</div>
<div>
<br /></div>
<div>
<br /></div>
<h3>
Under the Hood</h3>
<div>
A major contribution to this release was <a href="https://github.com/meyerdan">Daniel's</a> work a sophisticated authorization mechanism.<br />
Through that mechanism you have fine grained control over which users and groups may create, view, edit and delete which resources.<br />
<br />
As a first step, we applied that mechanism to cockpit, tasklist and the admin app. From today on, you will only be able to access the apps you have been authorized for ;-).<br />
<br />
Furthermore, superpowered users may configure all this through the extended admin application.<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-6YbqbJjU2f8/UgT_TlvA55I/AAAAAAAAAIo/LFpmS2Kj980/s1600/admin-gui.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="416" src="http://1.bp.blogspot.com/-6YbqbJjU2f8/UgT_TlvA55I/AAAAAAAAAIo/LFpmS2Kj980/s640/admin-gui.jpg" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Manage users, groups and authorizations through the admin app.</td></tr>
</tbody></table>
<br />
Daniel also worked on improving the history, both in terms of structure and performance. The result moved into our code base, expect a blog post about it, soon.<br />
<br /></div>
<div>
In the meantime <a href="https://github.com/romansmirnov">Roman</a>&nbsp;and <a href="https://github.com/Nikku">I</a> overhauled the cockpit process definition and process instance view&nbsp;internals. The result is a small library called <a href="https://github.com/Nikku/angular-data-depend">angular-data-depend</a>&nbsp;and a cleaner code base.<br />
<div>
Each action you perform is reflected in the url. As a result, you are able to walk back through what you have done using your browser's history.</div>
</div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><embed align="middle" allowscriptaccess="always" height="470" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://nixis.de/~nikku/camunda/cockpit-interactivity.swf" type="application/x-shockwave-flash" width="640"></embed></td></tr>
<tr><td class="tr-caption">Walking through your process data with cockpit and jump back using your browser's history. <br />
(Excuse bad quality, not enough pixels ;-)</td></tr>
</tbody></table>
<br />
Last but not least, we created a process instance filter that tells you exactly where you are and what you filter for. It allows you to narrow the displayed process instances based on their business key and process variables, too.</div>
<div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><a href="http://1.bp.blogspot.com/-NWPmBnlqYX8/UgUDAOIwKLI/AAAAAAAAAI8/waesvTpci1s/s1600/instance-filter.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="200" src="http://1.bp.blogspot.com/-NWPmBnlqYX8/UgUDAOIwKLI/AAAAAAAAAI8/waesvTpci1s/s200/instance-filter.jpg" width="135" /></a></td></tr>
<tr><td class="tr-caption">Finds the process instances interesting for you.</td></tr>
</tbody></table>
</div>
<div>
As always, tell us what you think on our <a href="https://groups.google.com/forum/?fromgroups#!forum/camunda-bpm-users">mailing list</a>.</div>

</div>