---
title: "How to use BPMN 2.0 ScriptTask with Groovy in JBoss"
date: "2013-09-05T19:30:00+02:00"
author: "Bernd Rücker"

categories:
  - "Development"
tags: 
  - "BPMN"
  - "how-to"

aliases:
  - "/2013/09/how-to-use-bpmn-20-scripttask-with.html"

---

<b><span style="color: red;">Note: </span>this blogpost only applies to camunda BPM version &nbsp;&lt; 7.1.0. Starting from camunda BPM 7.2.0 we ship Groovy as part of the pre-packaged distribution.</b><br />
<br />
Recently at a customer we added a <a href="http://docs.camunda.org/latest/api-references/bpmn20/#tasks-script-task">ScriptTask </a>to a process and wanted to run a <a href="http://groovy.codehaus.org/">Groovy</a> script. Pretty easy with <a href="http://www.camunda.org/">camunda BPM</a> - but in the JBoss environment you have to know how to correctly put Groovy on the classpath - as we correctly use the <a href="http://www.jcp.org/en/jsr/detail?id=223">JSR 223</a> stuff to recognize existing Scripting Languages.<br />
<a href="http://1.bp.blogspot.com/-xHla-e8c-Hk/Uii-3TdHHtI/AAAAAAAAAFw/e7wxsEuH1wM/s1600/ScriptTask_Groovy.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img border="0" src="http://1.bp.blogspot.com/-xHla-e8c-Hk/Uii-3TdHHtI/AAAAAAAAAFw/e7wxsEuH1wM/s1600/ScriptTask_Groovy.png" /></a><br />
<br />
To help others and to remind myself I quickly wanted to blog how to do this.<br />
<a name='more'></a><br />
<div>
<b>1.) Add groovy module to your JBoss</b></div>
<div>
<div>
<br /></div>
</div>
<div>
Download latest <a href="http://mvnrepository.com/artifact/org.codehaus.groovy/groovy-all">groovy-all.jar</a> and copy it to <i>JBOSS_HOME/modules/groovy/main/groovy-all.jar</i>.</div>
<div>
<br />
Create&nbsp;<i>JBOSS_HOME/modules/groovy/main/module.xml</i> with the following content:</div>
<br />
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&lt;?xml version="1.0"
encoding="UTF-8"?&gt;<o:p></o:p></span></div>
<div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&lt;module
xmlns="urn:jboss:module:1.0" name="groovy"&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp; &lt;resources&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&lt;resource-root path="groovy-all.jar"/&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;
&lt;/resources&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;
&lt;dependencies&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&lt;module name="javax.api"/&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&lt;module name="org.apache.commons.logging"/&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp;&nbsp;&nbsp;
&lt;/dependencies&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&lt;/module&gt;</span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;"><o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><br /></span></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><b>2.) Add dependency to groovy in the camunda engine module</b></span></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><b><br /></b></span></div>
<div class="MsoNormal">
Edit file &nbsp;<i>JBOSS_HOME/modules/org/camunda/bpm/camunda-engine/main/module.xml</i>. Add one line in the dependencies:</div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &lt;module name="groovy"
services="import" export="true" /&gt;</span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;"><o:p></o:p></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span></div>
<div class="MsoNormal">
<span style="font-family: inherit;">Important is the <i>services="import"</i> which tells JBoss to recognize the META-INF/services directory in groovy - which is does not by default. This is the small thing with normally takes some hours to solve - hope this helps somebody out there. <a href="https://docs.jboss.org/author/display/AS7/Class+Loading+in+AS7">You can find the according JBoss documentation online</a>. The whole <i>module.xml</i> now looks more or less like this:&nbsp;</span></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><br /></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&lt;module xmlns="urn:jboss:module:1.0" name="org.camunda.bpm.camunda-engine"&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &lt;resources&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;resource-root path="camunda-engine-7.0.0-Final.jar" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &lt;/resources&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &lt;dependencies&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.api" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.transaction.api"/&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.enterprise.api" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.inject.api" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.ejb.api" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.xml.bind.api" /&gt;&nbsp;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="javax.servlet.api" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="org.jboss.vfs" /&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: 'Courier New', Courier, monospace;">&nbsp; &nbsp; &lt;module name="org.mybatis.mybatis" /&gt;</span><span class="Apple-tab-span" style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> </span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="com.fasterxml.uuid.java-uuid-generator"/&gt;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; &lt;module name="org.joda.time" slot="2.1" /&gt; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &nbsp; <b>&lt;module name="groovy" services="import" export="true" /&gt;</b> &nbsp; &nbsp;</span></div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&nbsp; &lt;/dependencies&gt;</span></div>
<div class="MsoNormal">
</div>
<div class="MsoNormal">
<span style="font-family: Courier New, Courier, monospace;">&lt;/module&gt;</span></div>
<div>
<br /></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><b>3.) Have fun with the ScriptTask!</b></span></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><br /></span></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="MsoNormal">
<span style="font-family: inherit;"><br /></span></div>
</div>