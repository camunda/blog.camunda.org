---
title: "cockpit plugin store"
date: "2014-08-15"
author: "Bernd Rücker"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/08/cockpit-plugin-store.html"

---

<div>
We have Camunda Cockpit as a great tool for monitoring and operations. But roles and requirements for monitoring and operations always differ in our real-life projects -&nbsp;so we allow plugins for Cockpit. In the last 48 hours (on our Camunda hackdays) we implemented a "plugin store" for the existing community plugins - so everybody can much easier try out plugins or see what plugins exist.<br />
<br />
<a name='more'></a><br />
<br />
<iframe allowfullscreen="" frameborder="0" height="325" mozallowfullscreen="" src="//player.vimeo.com/video/103495911" webkitallowfullscreen="" width="500"></iframe><br />
<br />
The plugin store scans various GitHub repositories and searches for plugin metadata. And we compiled a list of all default plugins included in the standard distribution (as most of the cockpit functionality is implemented as plugin). You can browse through all plugins easily:<br />
<br />
<div style="text-align: center;">
<span style="font-size: large;">Try it out:&nbsp;<a href="http://camunda.org/plugins/" target="_blank">http://camunda.org/plugins/</a></span></div>
<br />
After collecting plugins you can:<br />
<br />
<ul>
<li>download the cockpit.war: In the background this clones the GitHub repository and does a Maven build for all plugins. Then a cockpit Maven project is created which does an overlay of the original cockpit and adds all plugins as dependency. This generates the cockpit.war which then is provided as download.</li>
<li>download the pom.xml and index.html: You can download the pom.xml used to generate cockpit and build it yourself. The index.html must be included in cockpit to exclude default plugins.</li>
<li>save the configuration: You will get a unique URL to access the configuration later on - or to send it to your colleagues.</li>
</ul>
<div>
Try it out and give us feedback in <a href="http://camunda.org/community/forum.html" target="_blank">the forum</a>.</div>
<div>
<br /></div>
<div>
If you want to develop own plugins these links may be convenient for you - so you can help filling our plugin store immediately:</div>
<div>
<ul>
<li>Maven archetype for cockpit plugins:&nbsp;<a href="https://github.com/camunda/camunda-archetypes/tree/master/camunda-archetype-cockpit-plugin">https://github.com/camunda/camunda-archetypes/tree/master/camunda-archetype-cockpit-plugin</a></li>
<li>How-to develop a cockpit plugin:&nbsp;<a href="http://docs.camunda.org/latest/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin">http://docs.camunda.org/latest/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin</a></li>
<li>Cockpit plugins in the User Guide:&nbsp;<a href="http://docs.camunda.org/latest/guides/user-guide/#cockpit-plugins">http://docs.camunda.org/latest/guides/user-guide/#cockpit-plugins</a></li>
</ul>
<div>
Thanks guys (Christian, Falko and Ingo) - we were a great team. Cant't wait for hackdays 2015!</div>
</div>
<div>
<br /></div>
{{< figure src="http://2.bp.blogspot.com/-qKDSXydTC_8/U-2s3pgLb8I/AAAAAAAAAPs/fo3C5Ffvhek/s1600/team.png" >}}
</div>