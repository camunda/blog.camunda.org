---
title: "camunda BPM camunda BPM 7.0.0-alpha8 released"
date: "2013-07-19"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2013/07/camunda-bpm-camunda-bpm-700-alpha8.html"

---

<div>
<a href="http://www.camunda.org/download/">Here</a> comes the latest camunda BPM alpha release with the following highlights:<br />
<br />
New features in cockpit webapplication:<br />
<br />
<ul>
<li>Greatly improved layout</li>
<li>Editing process variables</li>
<li>Cancelling a process instance</li>
<li>Increment retries for failed jobs</li>
<li>Login based on Process Engine Identity Service</li>
</ul>
<div>
We added a new application called camunda Admin which provides support for</div>
<div>
<ul>
<li>Managing users &amp; groups based on the process engine engine identity service</li>
<li>Creating an initial user for a process engine</li>
</ul>
<div>
The REST API was enhanced&nbsp;</div>
</div>
<div>
<ul>
<li>Improved variable handling</li>
<li>Added Jobs resource (<a href="https://github.com/1and1/camunda-bpm-platform">contribution by Clint Manning, 1&amp;1</a>)</li>
<li>Added User and Group Resources</li>
</ul>
<div>
The Process Engine got smarter</div>
</div>
<div>
<ul>
<li>Started work on authorization service</li>
</ul>
<div>
Braking change: the URL for cockpit is now <span style="background-color: white;"><span style="color: red;">http://localhost:8080/camunda/</span></span>.</div>
<div>
<br /></div>
<div>
All in all, 33 issues were closed, including 8 bugfixes. <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&amp;version=12993">Read the full release notes in JIRA.</a></div>
<div>
<br /></div>
<div>
<a href="http://www.camunda.org/download/">camunda BPM 7.0.0-alpha8 can be downloaded here.</a>&nbsp;</div>
</div>
<div>
<br /></div>
<div>
<a name='more'></a><br /></div>
<h3>
Additions to the Webapps</h3>
<div>
Nico Rehwaldt &amp; Roman Smirnov have given cockpit a complete layout overhaul and added a lot of features:</div>
<div>
<br /></div>
<div>
<b>New Cockpit layout:</b><
{{< figure src="http://3.bp.blogspot.com/-Rnq9j8yRpfU/UelAhknmT_I/AAAAAAAAAOQ/0CiN8xsabg0/s1600/cockpit-layout.png" >}}
<b>Editing process variables:</b>
{{< figure src="http://3.bp.blogspot.com/-cR4wDrKdX6Q/UelAg2OMg_I/AAAAAAAAAOI/S7mDZ67UD44/s1600/cockpit-edit-variable.png" >}}
<b>Cancelling Process Instances:</b>
{{< figure src="http://3.bp.blogspot.com/-5KUl_zBSQKM/UelAgY30JtI/AAAAAAAAAN4/X5PT3KhDzjk/s1600/cockpit-cancel-process-instance.png" >}}
<b>Increment Job retries</b>
{{< figure src="http://2.bp.blogspot.com/-lvBs2z2K0N0/UelAhDcMz0I/AAAAAAAAAOE/SQ-zFJ1sAbQ/s1600/cockpit-increment+jobs.png" >}}
<b>Selecting a process engine</b>
{{< figure src="http://1.bp.blogspot.com/-dmtOwOHMt9I/UelAh70imCI/AAAAAAAAAOU/qmI1oq_b8r8/s1600/cockpit-select-process-engine.png" >}}
<b>Switching to a different application</b>
{{< figure src="http://2.bp.blogspot.com/-KHUC3zH2Wes/UelAgWp5vZI/AAAAAAAAAOg/RB4lOijRvkQ/s1600/cockpit-app-swith.png" >}}
<b>The camunda Admin application allows managing Users and Groups</b>
{{< figure src="http://3.bp.blogspot.com/-DihQ_fve3zM/UelAgcICMzI/AAAAAAAAAN0/InGbItieGR0/s1600/camunda-admin-manage-users.png" >}}
<h3>
Started Work on Authorizations:</h3>
<div class="separator" style="clear: both; text-align: left;">
We started work on a resource-based authorization system in the process engine:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
The authorization service allows managing <code><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-authorization-service">Authorizations</a></code>. 
Authorizations manage permissions of a given user/group to interact with a given 
resource.<br />
<br />
<b>Creating an authorization</b><br />
An authorization is created between a user/group and a resource. It describes 
the user/group's <em>permissions</em> to access that resource. An authorization 
may express different permissions, such as the permission to READ, WRITE, DELTE 
the resource.<br />
<br />
<b>Granting / revoking permissions</b><br />
In order to grant the permission to access a certain resource, an 
authorization object is created: <br />
<pre> Authorization auth = authorizationService.createNewAuthorization();
 //... configure auth
 authorizationService.saveAuthorization(auth);
 </pre>
<div class="separator" style="clear: both;">
The authorization object can be configured either for a user or a group: </div>
<pre> auth.setUserId("john");
   -OR-
 auth.setGroupId("management");
 </pre>
<div class="separator" style="clear: both;">
and a resource: </div>
<pre> auth.setResource(Resources.USER);
 auth.setResourceId("mary");
 </pre>
<div class="separator" style="clear: both;">
finally the permissions to access that resource can be assigned: </div>
<pre> auth.addPermission(Permissions.READ);
 </pre>
<div class="separator" style="clear: both;">
and the authorization object is saved: </div>
<pre> authorizationService.saveAuthorization(auth);
 </pre>
<div class="separator" style="clear: both;">
As a result, the given user or group will have permission to READ the 
referenced process definition. 
</div>
<div class="separator" style="clear: both;">
<br /></div>
<br />
<b>Checking a permission</b><br />
Permissions can be checked using a query: <br />
<pre> authorizationQuery.userId("john")
   .resourceType("processDefinition")
   .resourceId("2313")
   .hasPermission(Permissions.READ)
   .hasPermission(Permissions.WRITE)
   .hasPermission(Permissions.DELETE)
   .list();
 </pre>
<div class="separator" style="clear: both;">
Selects all Authorization objects which provide READ,WRITE,DELETE 
Permissions for the user "john".&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
In the 7.0 final release, authorizations will work on the Resources USER, GROUP, APPLICATION, AUTHORIZATION. In 7.1 we will extend authorization support to process definitions.&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
(All plans are subject to change :) )</div>
<h3>
What's coming up next?</h3>
<div>
- LDAP support: identity service provider&nbsp;already there:&nbsp;<a href="https://github.com/camunda/camunda-bpm-platform/tree/master/identity/identity-ldap/src/main/java/org/camunda/bpm/identity/impl/ldap">https://github.com/camunda/camunda-bpm-platform/tree/master/identity/identity-ldap/src/main/java/org/camunda/bpm/identity/impl/ldap</a>&nbsp;)</div>
<div>
- Authorizations</div>
<div>
- Merge new history branch (<a href="https://github.com/camunda/camunda-bpm-platform/tree/history">https://github.com/camunda/camunda-bpm-platform/tree/history</a>)</div>
<div>
- Many awesome features in cockpit :)</div>
</div>
</div>