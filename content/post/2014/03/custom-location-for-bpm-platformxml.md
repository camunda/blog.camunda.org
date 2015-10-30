---
title: "Custom Location for bpm-platform.xml Configuration File"
date: "2014-03-12"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/03/custom-location-for-bpm-platformxml.html"

---

<div>
Starting with camunda BPM 7.1.0-alpha4 it is now possible to put the <span style="font-family: Courier New, Courier, monospace;">bpm-platform.xml</span> file in a different location. This solves the problem that you have to open the camunda bpm platform EAR module and change the configuration file inside the EAR file if you want to customize your settings.<br />
<br />
<i>Note: This post does not apply to the JBoss Application Server distribution since there the process engine configuration is put directly into the JBoss Application Server configuration file (standalone.xml / domain.xml).</i><br />
<br />
You can now put the bpm-platform.xml file in any location and provide the location as an URL. Examples:<br />
<ul>
<li><span style="background-color: white; font-family: 'Courier New', Courier, monospace; line-height: 20px;">/home/camunda/.camunda/bpm-platform.xml</span></li>
<li><span style="font-family: 'Courier New', Courier, monospace;">C:\path\to\bpm-platform.xml</span></li>
<li><span style="font-family: Courier New, Courier, monospace;">http://mydomain.com/path/to/bpm-platform.xml</span></li>
</ul>
The location can be set using<br />
<ol style="background-color: white; box-sizing: border-box; margin-bottom: 10px; margin-top: 0px;">
<li>A JNDI entry named&nbsp;<span style="background-color: #f9f2f4; color: #c7254e; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px;">java:/comp/env/bpm-platform-xml</span>. This is particularly useful on websphere application server.</li>
<li>A System Property named&nbsp;<span style="background-color: #f9f2f4; color: #c7254e; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px;">bpm.platform.xml</span>. Can be set when starting the JVM:<br /><span style="background-color: #f9f2f4; color: #c7254e; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px;">-Dbpm.platform.xml=/home/camunda/.camunda/bpm-platform.xml</span></li>
<li>An environment variable named&nbsp;<span style="background-color: #f9f2f4; color: #c7254e; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 20px;">BPM_PLATFORM_XML</span>.</li>
</ol>
If none of the above is set, we will attempt to load the <span style="font-family: Courier New, Courier, monospace;">bpm-platform.xml</span> from the default location which is the classpath in the Glassfish, IBM Websphere, Oracle Weblogic distributions and&nbsp;<span style="background-color: #f9f2f4; color: #c7254e; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 18.000001907348633px;">{CATALINA_BASE} || ${CATALINA_HOME} + /conf/&nbsp;</span>in the apache tomcat distribution.<br />
<br />
<a href="http://docs.camunda.org/latest/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file">Read more about it in the docs.</a>
</div>