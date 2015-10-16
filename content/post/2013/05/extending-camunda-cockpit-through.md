---
title: "Extending camunda Cockpit through Plugins"
date: "2013-05-17"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/05/extending-camunda-cockpit-through.html"

---

<div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-3aUtRwmI7r0/UZYiaqXKtnI/AAAAAAAAAIE/uQJtXCXHAeg/s1600/cockpit-plugin-yea.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="282" src="http://3.bp.blogspot.com/-3aUtRwmI7r0/UZYiaqXKtnI/AAAAAAAAAIE/uQJtXCXHAeg/s400/cockpit-plugin-yea.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">camunda Cockpit with a plugin. Yeaaah.</td></tr>
</tbody></table>
<br />
As we have seen in the past, it is impossible for camunda Cockpit ---our process monitoring tool--- to satisfy all needs, out of the box. That is why we have long thought about providing it with an appopriate extension mechanism that empoweres users to fit the tool to their very own monitoring needs.<br />
<br />
With the latest relase of camunda BPM a first version of a plugin system for camunda Cockpit is finally here. So what is it about? Simply spoken it is about extending the cockpit GUI with custom views on everything that runs with camunda BPM. Processes, process instances, deployments, tasks... you name it. That may be accomplished by providing backend services that execute custom queries against an engine database. In addition, the backend services can also execute custom engine commands. A colleague already promised me to exploit the full powers of the mechanism in a&nbsp;<a href="https://wiki.jenkins-ci.org/display/JENKINS/ChuckNorris+Plugin" target="_blank">Chuck Norris plugin</a>. <a href="http://camunda.org/" target="_blank">camunda BPM engines</a> around the world, watch out.<br />
<br />
I created an article on&nbsp;<a href="http://docs.camunda.org/latest/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin" target="_blank">how to develop a plugin</a>&nbsp;for everyone who is interested in all the details.&nbsp;Another good start to get right into the matter may be the <a href="https://github.com/Nikku/cockpit-sample-plugin" target="_blank">sample plugin</a>&nbsp;that gets developed in the article.<br />
<br />
The whole plugin matter is brand new and you can expect more source code, documentation and articles on the matter. Up to then we welcome your feedback on our <a href="https://groups.google.com/forum/#!forum/camunda-bpm-dev" target="_blank">dev mailing list</a>.
</div>