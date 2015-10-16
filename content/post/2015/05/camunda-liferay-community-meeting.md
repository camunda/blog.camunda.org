---
title: "Camunda + Liferay Community Meeting"
date: "2015-05-06"
author: "Bernd Rücker"

categories:
  - "Community"
tags: 
  - "Release Note"

aliases:
  - "/2015/05/camunda-liferay-community-meeting.html"

---

<div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-_yEfasSmK58/VUj4Agr-ITI/AAAAAAAAAQQ/DXUeeauUQK4/s1600/ancud.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-_yEfasSmK58/VUj4Agr-ITI/AAAAAAAAAQQ/DXUeeauUQK4/s1600/ancud.jpg" height="150" width="200" /></a></div>
Yesterday evening we met at our Partner Ancud IT in Nurremberg (Germany). Ancud presented their experiences using Portals (namely the Open Source Portal Liferay) in combination with Process Engines (namely camunda :-)). That was already a topic in a recent webinar, you can check out the recording online: <a href="https://network.camunda.org/webinars/21" target="_blank">English </a>or <a href="https://network.camunda.org/webinars/3" target="_blank">German</a>. Afterwards we had interessting discussions about <b>DMN use cases</b> and a "social collaboration hub" research project. But let's start from the beginning.<br />
<br />
<a name='more'></a><br /><br />
<b>camunda + Liferay</b><br />
<br />
A process application needs a user interface. According to Ancud experiences this is most often a portal - or at least some home grown portal like thing. Personally I am not yet convinced as we still do a lot of non-portal projects - but I see the use case anyway.<br />
<br />
For combining Liferay and camunda you have a couple of options. The <b>problems you need to solve</b> are:<br />
<ul>
<li>Having a tasklist as portlet in the portal. That normally means you can not leverage the existing <a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist" target="_blank">Camunda Tasklist</a>. </li>
<li>Showing forms for User Task in the portal (what we call <a href="http://docs.camunda.org/latest/guides/user-guide/#task-forms" target="_blank">task forms</a>). Ancud showed a generic way to use the form fields defined in the process modell (what we call <a href="http://docs.camunda.org/latest/guides/user-guide/#task-forms-generated-task-forms" target="_blank">generated forms</a>). Having custom developed forms is also possible, but you have to clarify how to do the packaging and deployment of a process application and how to communicate between portals in this case.&nbsp;</li>
<li>Having an operating tool like <a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit" target="_blank">Camunda Cockpit</a>. We discussed that it might be better to use the existing cockpit and add SSO capabilities - as it would be a lot of effort to do a complete rewrite of Cockpit as portlet.</li>
</ul>
<br />
Ancud also explained <b>architecture options</b>, which basically are:<br />
<ul>
<li>Deploy the camunda engine as "<a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-architecture-overview-embedded-process-engine" target="_blank">embedded engine</a>" within your Portlet or</li>
<li>Deploy the camunda engine as "<a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-architecture-overview-shared-container-managed-process-engine" target="_blank">shared engine</a>" on the same container as Liferay or</li>
<li>Deploy the camunda engine as "<a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-architecture-overview-standalone-remote-process-engine-server" target="_blank">remote engine</a>".&nbsp;&nbsp; </li>
</ul>
<br />
We discussed if it make sense to echange the internal "Kaleo" engine in Liferay to react on events in liferay (e.g. approval process when a new blog post is written). My personal oppinion: Depends on the use case. If you use Liferay as "UI" for process applications this is not necessary. It is only interessting if you really want to use BPMN for the internal Liferay processes.<br />
<br />
By the way: If you think "<b>Why should I use a portal?</b>" - the answers were:<br />
<ul>
<li>User Managements / Authorization is already solved.</li>
<li>Coorpoerate Identity is solved.</li>
<li>Frame / Reusable Features are nice.</li>
</ul>
<br />
Last but not least we quickly discussed graphical form editors, like the <a href="http://minikomi.github.io/Bootstrap-Form-Builder/" target="_blank">Bootstrap Form Builder</a> or&nbsp; the Liferay Web Forms. Both were successfully applied in real-life projects in the past.<br />
<br />
I will add a link to the slides as soon as they are set online from Ancud. <br />
<br />
<b>Social Collaboration Hub: Camunda + Liferay + Nuxeo + OpenExchange</b><br />
<br />
<a href="https://network.camunda.org/members/12025/profile" target="_blank">Christian </a>from <a href="http://www.iisys.de/" target="_blank">iisys </a>was present who explained their current research project, which is actually quite interessting. It is called the <a href="https://www.sc-hub.de/" target="_blank">Social Collaboration Hub</a>. They build a "sharepoint alternative" using Open Source Tools - namely Camunda, Liferay, Nuxeo (a Content Management System = CMS), OpenExchange (a Groupware), Elasticsearch and Apache Shinding (an Open Social Implementation). Interessting! They just recently started and have some way to go - but they are planning to make a Cloud product out of it.<br />
<br />
The most interessting detail for me: They want to provide the possibility to start working "document driven" and record all activities you do related to a document (the document serves as common "correlation id"). Then some mining algorithms will be applied to extract CMMN case definitions from the history (as you know which activities were executed). This helps to get to a semi-structured Case Definition - maybe even automatically - or at least recommended. Something I will keep an eye on!<br />
<br />
<b>DMN Use Cases</b><br />
<br />
Finally we discussed&nbsp; potential use cases for using DMN (Decision Model and Notation) - the standard we will include in camunda BPM to provide Business Rule Management capabilities. To be precise we will be able to model and execute decision tables.<br />
<br />
There was one real-life use case from the audience, which I never thought of before: "How is a decision made if some theatre performance is booked for a city/town. It depends on the current city/town if this is decided by the mayor, some round table, some complicated process or something completly different. What if important people are on vacation?". This is funny as you have to make decisions about how to make the decision :-) I would like trying to sketch this in DMN as soon as the requirements got more clear.<br />
<br />
Another example was from automotive: If your car breaks down you might have a lot of information available already (or at least you will have them in the near future). Not only about insurance coverage, milage, driver, age of the car and so on - but maybe also real-time status information from the car computers. So decisions have to be made what to do (towing the car to a garage, try to repair it on the street, get a rental as this is a major problem, order spare parts, ...). <br />
<br />
<b>Thanks for reading</b><br />
<br />
If you want to join community meetings go to <a href="https://network.camunda.org/meetings/" target="_blank">Camunda Network</a>, you can register for the newsletter easily to stay informed. If you want to host some or even offer a presentation / experience report let us know!
</div>