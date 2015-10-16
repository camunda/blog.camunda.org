---
title: "Migrate Process Versions"
date: "2015-08-10"
author: "Bernd Rücker"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/08/migrate-process-versions.html"

---

<div>
My colleague Ingo just finished a new cockpit plugin allowing to easily migrate a running process instance to a new version of the process definition:<br />
<br />
<iframe allowfullscreen="" frameborder="0" height="350" mozallowfullscreen="" src="https://player.vimeo.com/video/135853242" webkitallowfullscreen="" width="500"></iframe> <br />
<br />
<a name='more'></a><br />
You can find the sources of the plugin on GitHub:<br />
<br />
<ul>
<li><a href="https://github.com/camunda/camunda-cockpit-plugins/tree/master/cockpit-plugin-version-migration">https://github.com/camunda/camunda-cockpit-plugins/tree/master/cockpit-plugin-version-migration</a>&nbsp;</li>
</ul>
<div>
If you want to build some migration scrips (as customers often do) you can easily cherry-pick some code from the plugin to apply it yourself, see <a href="https://github.com/camunda/camunda-cockpit-plugins/blob/master/cockpit-plugin-version-migration/src/main/java/com/camunda/consulting/cockpitPluginVersionMigration/resources/ProcessInstanceMigrationResource.java#L42">ProcessInstanceMigrationResource.java</a> for the core functionality). By doing so you can e.g. migrate a bunch of instances in one go - and adjust some variables on the way (as new versions might require new data).&nbsp;</div>
<div>
<br /></div>
<div>
Please note that version migration has limitations and risks - we collected them in the README. We used an unsupported internal Command. The whole plugin is not part of the supported product, so there is no warranty of any kind. In short: Please read the limitations carefully and test migrations before you apply them in big scale on your live instances!</div>
<div>
<br /></div>
<div>
<br /></div>

</div>