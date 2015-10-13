---
title: "camunda BPM 7.0 on WebLogic 12c"
date: "2013-05-14T10:08:00+02:00"
author: "Bernd Rücker"

categories:
  - "Development"
tags: 

aliases:
  - "/2013/05/camunda-bpm-70-on-weblogic-12c.html"

---

If we go <a href="http://camundabpm.blogspot.de/2013/05/camunda-vs-oracle-shootout-roadshow.html" target="_blank">on tour together with Oracle</a>&nbsp;I think we have to have <a href="http://www.camunda.org/">camunda BPM</a> running on the Oracle WebLogic application server 12c (WLS in short). And one of our enterprise customers asked - so I invested a&nbsp;Sunday&nbsp;and got it running (okay - to be honest - I needed quite some help from our Java EE server guru&nbsp;<a href="http://camunda.org/community/team.html">Christian</a>). In this blog post I give a step by step description how run camunda BPM on WLS. Please note that this is not an official distribution (which would include a <a href="http://camundabpm.blogspot.de/2013/04/camunda-bpm-700-alpha2-released.html">sophisticated QA</a>, a <a href="http://docs.camunda.org/latest/">comprehensive documentation</a> and a <a href="http://www.camunda.org/release/camunda-bpm/">proper distribution</a>) - it was my personal hobby. And I did not fire the whole test suite agains WLS - so there might be some issues. We will do the real productization as soon as we have a customer for it (let us know if this is&nbsp;interesting&nbsp;for you).<br />
<br />
<a name='more'></a><b>Update (March 31, 2014)</b><br />
<span style="color: red;"><br /><span style="font-size: large;">
With camunda BPM 7.1, WebLogic 12c is now officially supported. See our <a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-supported-environments">supported environments</a> for more details. Some links below do no longer work.</span></span><br />
<h3>
Necessary steps</h3>
<div>
After installing and starting up WLS (I used the <a href="http://www.oracle.com/technetwork/middleware/weblogic/downloads/wls-main-097127.html" target="_blank">zip distribution of WLS 12c</a>&nbsp;by the way) you have to do:</div>
<br />
<ol>
<li>Add a datasource</li>
<li>Add shared libraries</li>
<li>Add a resource adapter (for the <a href="https://app.camunda.com/confluence/display/foxUserGuide/The+Job+Executor" target="_blank">Job Executor</a> using a proper WorkManager from WLS)</li>
<li>Add an EAR starting up <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine" target="_blank">one process engine</a></li>
<li>Add a WAR file containing the <a href="http://docs.camunda.org/latest/api-references/rest/" target="_blank">REST API</a></li>
<li>Add other WAR files (e.g. cockpit) and your own <a href="http://docs.camunda.org/latest/guides/user-guide/#process-applications" target="_blank">process applications</a></li>
</ol>
<div>
Actually that sounds more work to do than it is ;-) So let's get started:</div>
<h3>
Add a datasource</h3>
<div>
Add a datasource via the Administration Console (or any other convenient way on WLS - I should admit that personally I am not the WLS expert). Make sure that you target it on your server - this is not done by default:</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<a href="http://1.bp.blogspot.com/-ZATZj3K2AOI/UZEVcS5n4wI/AAAAAAAAAC8/Snmy_X18iGE/s1600/datasource1.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;">
<img border="0" src="http://1.bp.blogspot.com/-ZATZj3K2AOI/UZEVcS5n4wI/AAAAAAAAAC8/Snmy_X18iGE/s200/datasource1.png" height="146" width="200" />&nbsp;</a><a href="http://3.bp.blogspot.com/-ht2xOtEikrs/UZEVchDV42I/AAAAAAAAADA/lfE2QM7e-eg/s1600/datasource2.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img border="0" src="http://3.bp.blogspot.com/-ht2xOtEikrs/UZEVchDV42I/AAAAAAAAADA/lfE2QM7e-eg/s200/datasource2.png" height="152" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<h3>
Which camunda distribution do I use?</h3>
<div>
Before we can install the camunda BPM platform on WLS we have to download it. But there is no WLS distribution yet. Hence we can leverage the existing distributions for other Java EE containers, I use the Glassfish distribution as it is technically pretty close to WLS.&nbsp;</div>
<div>
<br /></div>
<div>
Unfortunately I had small issues with the current alpha3 version on WLS - which I <a href="https://github.com/camunda/camunda-bpm-platform/commit/fefc37027fe4d8db332a62c95f981ab938a5c61e" target="_blank">fixed on a branch</a> and try to convince the team to apply them to alpha4. So for the moment you have to build a patched alpha3 from this branch: <a href="https://github.com/camunda/camunda-bpm-platform/tree/wls-prototype-7.0.0-alpha3/distro/wls12c">https://github.com/camunda/camunda-bpm-platform/tree/wls-prototype-7.0.0-alpha3/distro/wls12c</a>. If you do not want to build it by hand here is a ZIP file containing the relevant artifacts:</div>
<div>
<br /></div>
<div style="text-align: center;">
<b><span style="font-size: large;">DOWNLOAD camunda BPM for WLS (</span></b><span style="color: red; text-align: start;">with camunda BPM 7.1, WebLogic 12c is now officially supported. See our&nbsp;</span><a href="http://docs.camunda.org/latest/guides/user-guide/#introduction-supported-environments" style="text-align: start;">supported environments</a><span style="color: red; text-align: start;">&nbsp;for more details. The link does no longer work.</span><b><span style="font-size: large;">)</span></b></div>
<div>
<br /></div>
<div>
Now we will install the artifacts step by step.</div>
<h3>
Add shared libraries</h3>
<div>
Just copy the provided libraries (the core engine, necessary dependencies like Apache MyBatis and interfaces for the Ressource Adapater) into your domain "lib" folder:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-o240VaVQlR0/UZHXV00C8kI/AAAAAAAAADU/9yVNmxnfj_g/s1600/shared-libs.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-o240VaVQlR0/UZHXV00C8kI/AAAAAAAAADU/9yVNmxnfj_g/s200/shared-libs.png" height="85" width="200" /></a></div>
<h3>
Add&nbsp;resource&nbsp;adapater</h3>
<div>
We use a JCA (Java EE Connector Architecture) resource adapter to be fully Java EE compliant. This component is basically responsible to do something we call Job handling. Basically we need a thread pool to query the database if any timers or the like are due. See more details in the <a href="https://app.camunda.com/confluence/display/foxUserGuide/The+Job+Executor" target="_blank">Job Executor</a>&nbsp;docs.<br />
<br />
The resource adapter is deployed as RAR archive. I used the archive provided for Glassfish - as there are no changes necessary. You can deploy it via the <a href="http://localhost:7001/console/">Administration Console</a> without problems:<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-MYkRBqCgDPU/UZHeOmV16QI/AAAAAAAAAD8/3XN7HXM3kpo/s1600/rar-deployment.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-MYkRBqCgDPU/UZHeOmV16QI/AAAAAAAAAD8/3XN7HXM3kpo/s200/rar-deployment.png" height="145" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<b>Important</b>: You now have to adjust the configuration. Change the deployment order (the resource adapter should be deployed before other stuff), set a JNDI name and allow global access to classes (actually I still wonder how providing the RAR classes to EAR classloaders really works in WLS as defined in the JCA specs - I didn't get it to work in the prototype so I added the stuff as shared libraries - any hints from WLS experts are welcome!):</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-auCGRBj-IRY/UZHeM6r8TZI/AAAAAAAAADk/Ekpp7otTjG8/s1600/rar-config1.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-auCGRBj-IRY/UZHeM6r8TZI/AAAAAAAAADk/Ekpp7otTjG8/s200/rar-config1.png" height="159" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
And you have to provide an outbound connection factory which later can be used via JNDI from our process engine:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-Etrc-jv-EXE/UZHeNchZr2I/AAAAAAAAADo/qxE6w0ZOjxA/s1600/rar-config2.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-Etrc-jv-EXE/UZHeNchZr2I/AAAAAAAAADo/qxE6w0ZOjxA/s200/rar-config2.png" height="151" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
And last but not least we need a <a href="http://docs.oracle.com/cd/E11035_01/wls100/config_wls/self_tuned.html" target="_blank">Weblogic WorkManager</a>&nbsp;for our thread pool:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-HLjxrhIi2ro/UZHeN165hwI/AAAAAAAAADw/K34PJybTd5U/s1600/rar-config3.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-HLjxrhIi2ro/UZHeN165hwI/AAAAAAAAADw/K34PJybTd5U/s320/rar-config3.png" height="237" width="320" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
That's it. Next step :-)</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<h3>
Add EAR starting a process engine</h3>
<div>
I have build a custom EAR for WLS to provide a WLS specific deployment descriptor necessary to wire the EAR with the RAR correctly - but I will skip the details here. The EAR basically only does one thing: It starts up one engine - therefor it does not have more content than the deployment descriptor and a "<a href="https://github.com/camunda/camunda-bpm-platform/blob/wls-prototype-7.0.0-alpha3/distro/wls12c/service/src/main/resources/META-INF/bpm-platform.xml">bpm-platform.xml</a>" file containing the configuration of that process engine. Deploy this with the wizard again:</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-4t1A3Wt_wFI/UZHh_hx72GI/AAAAAAAAAEM/I6G728l9ZuA/s1600/ear-deployment.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-4t1A3Wt_wFI/UZHh_hx72GI/AAAAAAAAAEM/I6G728l9ZuA/s200/ear-deployment.png" height="159" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
This time there is not much to configure - I would suggest &nbsp;that you change the deployment order to 75 - then it gets deployed after the RAR but before other applications.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
If you want - you can have a look in the JNDI tree - you should see the started process engine there:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-9ZpO11gHC5g/UZHiumhBBKI/AAAAAAAAAEU/pMH7gWUCuZI/s1600/JndiView.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-9ZpO11gHC5g/UZHiumhBBKI/AAAAAAAAAEU/pMH7gWUCuZI/s200/JndiView.png" height="170" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<h3>
Deploy REST API as WAR</h3>
<div>
Now we can deploy the <a href="http://docs.camunda.org/api-references/rest/">REST API</a>, this is a simple WAR (leveraging JAX-RS) providing a REST interface to the already running process engine of the server. To be precise it provides an interface to all running process engines of the current server - but that's a story for a different post :-)</div>
<div>
<br /></div>
<div>
You can deploy the WAR file (I again used the Glassfish one without modifications) with the wizard - I think you practiced that enough by now. Just make sure you deploy it as "application" - not as "library" as the wizard tried to trick me here.</div>
<div>
<br /></div>
<div>
For example you can now query all existing process engines:&nbsp;<span style="font-family: 'Courier New', Courier, monospace;"><span style="font-size: x-small;"><a href="http://localhost:7001/engine-rest/engine/">http://localhost:7001/engine-rest/engine/</a>. </span></span>You can see get the one existing engine:</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-lB8oREQgJxM/UZHka_ivCyI/AAAAAAAAAEg/4YNAG4ZTTNs/s1600/rest1.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-lB8oREQgJxM/UZHka_ivCyI/AAAAAAAAAEg/4YNAG4ZTTNs/s320/rest1.png" height="140" width="320" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Congratulations - now on you have a platform working correctly within WLS - fully Java EE 6 compliant - and without any hazzle for starting your process engine. Amazing - isn't it?&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<h3>
Deploy cockpit and tasklist</h3>
<div class="separator" style="clear: both; text-align: left;">
Since tasklist and cockpit are HTML5 web applications using the REST API in the background you can easily deploy them as well as soon as you have the REST API running. Do that now (use the wizard again) and you can access them via the browser:</div>
<div class="separator" style="clear: both; text-align: left;">
</div>
<ul>
<li><a href="http://localhost:7001/cockpit/">http://localhost:7001/cockpit/</a></li>
<li><a href="http://localhost:7001/tasklist/">http://localhost:7001/tasklist/</a>&nbsp;(I locally had a strange problem during login - it basically only worked with Chrome at the moment. Unfortunately no time to dig deeper - but at latest when we productize it we will figure that out! Or you do :-)).&nbsp;</li>
</ul>
<h3>
Deploy Process Applications</h3>
<div>
Now you can deploy normal process applications - as e.g. described in the <a href="http://docs.camunda.org/latest/guides/getting-started-guides/">Getting Started Guide</a>. Enjoy!</div>
<div>
<br /></div>
<div>
Please note that there is one limitation with the current codebase on WLS: The classpath scanning we do in order to find process definition files automatically does not work on WLS. Hence you can not auto-discover your process definitions but have to configure them by hand in the META-INF/processes.xml:</div>
<div>
<br /></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&lt;process-application</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;process-archive name="pa"&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;process-engine&gt;default&lt;/process-engine&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; <b>&lt;process&gt;invoice.bpmn&lt;/process&gt;</b> &nbsp;&nbsp;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;properties&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; &lt;property name="isDeleteUponUndeploy"&gt;false&lt;/property&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &nbsp; <b>&lt;property name="isScanForProcessDefinitions"&gt;<span style="color: red;">false</span>&lt;/property&gt;</b></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &nbsp; &lt;/properties&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&nbsp; &lt;/process-archive&gt;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;">&lt;/process-application&gt;</span></div>
</div>
<div>
<span style="font-family: Courier New, Courier, monospace; font-size: x-small;"><br /></span></div>
<h3>
<span style="font-family: inherit;">Some Screenshots</span></h3>
<div>
<span style="font-family: inherit;">To prove that it was working :-) See cockpit showing the invoice example process application:</span></div>
<div class="separator" style="clear: both; text-align: left;">
<a href="http://1.bp.blogspot.com/-O1yBnux3OX8/UZHwN3qwKqI/AAAAAAAAAEw/e06uI0AGqmU/s1600/cockpit.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-O1yBnux3OX8/UZHwN3qwKqI/AAAAAAAAAEw/e06uI0AGqmU/s200/cockpit.png" height="171" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
The tasklist:</div>
<div class="separator" style="clear: both; text-align: left;">
<a href="http://3.bp.blogspot.com/-xYkpbtYyvnw/UZHwgHXWkxI/AAAAAAAAAE4/vqItM800O8c/s1600/tasklist.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-xYkpbtYyvnw/UZHwgHXWkxI/AAAAAAAAAE4/vqItM800O8c/s200/tasklist.png" height="129" width="200" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
And starting a process instance via REST:</div>
<div class="separator" style="clear: both; text-align: left;">
<a href="http://4.bp.blogspot.com/-zrgAIhZoqlo/UZHwoJ2jvPI/AAAAAAAAAFA/7QNUY9D_EYY/s1600/rest2.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-zrgAIhZoqlo/UZHwoJ2jvPI/AAAAAAAAAFA/7QNUY9D_EYY/s320/rest2.png" height="80" width="320" /></a></div>
<h3>
<span style="font-family: inherit;">Feedback welcome</span></h3>
<div>
<span style="font-family: inherit;">We welcome every feedback on this - best use our forum (</span><a href="http://camunda.org/community/forum.html">http://camunda.org/community/forum.html</a>, can be used by sending mails to it as well: <a href="mailto:camunda-bpm-users@googlegroups.com">camunda-bpm-users@googlegroups.com</a>). Let us now if you want to use this in production - then we can place a proper enterprise distribution on our roadmap...</div>
</div>
