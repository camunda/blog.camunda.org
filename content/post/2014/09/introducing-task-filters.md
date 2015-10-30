---
title: "Introducing Task Filters"
date: "2014-09-30"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/09/introducing-task-filters.html"

---

<div>
With Camunda BPM 7.2.0-alpha5, we introduce Task Filters. Task filters are TaskQueries which can be saved to the database so that you can run them repeatedly.<br />
<br />
<a name='more'></a><h3>
Creating a Filter using Java API</h3>
<br />
At a Java API Level, a filter can be created as a regular task query:
<br />
<pre class="prettyprint">// create a taskQuery
TaskQuery myTasksQuery = taskService.createTaskQuery().taskAssignee("daniel.meyer").active();

// save taskQuery as filter
Filter myTasksFilter = filterService.newTaskFilter("My Tasks");
myTasksFilter.setOwner("daniel.meyer");
myTasksFilter.setQuery(myTasksQuery);
String filterId = filterService.saveFilter(myTasksFilter);
 
// execute the filter
List&lt;Task&gt; tasks = filterService.listPage(filterId, 0, 20);

</pre>
If you want to share the filter with other users and for each user, make should return that particular user's tasks, it is possible to use Expression Language in the task query:
<br />
<pre class="prettyprint">taskService.createTaskQuery().taskAssigneeExpression("${ currentUser() }").active();
</pre>
The above example uses the built-in expression <span style="font-family: Courier New, Courier, monospace;">currentUser()</span><span style="font-family: inherit;"> which returns the </span><span style="font-family: Courier New, Courier, monospace;">userId</span><span style="font-family: inherit;"> of the currently authenticated user (set through&nbsp;</span><span style="font-family: Courier New, Courier, monospace;">IdentityService.setAuthentication()</span><span style="font-family: inherit;">).</span><br />
<span style="font-family: inherit;"><br /></span>
For more built-in Expression Language functions, see the corresponding User Guide Section.<br />
<br />
Filters can also be managed using the REST Api.<br />
<h3>
Managing Task Filters in camunda Tasklist</h3>
With the latest release of camunda Tasklist, you can manage filters. Filters are displayed at the left handside of the tasklist and can be assigned a Name, a Priority and a Color.<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-MEDVVJr3APE/VCqml6wz5UI/AAAAAAAAAeQ/S62MfmyaDJk/s1600/overview.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-MEDVVJr3APE/VCqml6wz5UI/AAAAAAAAAeQ/S62MfmyaDJk/s1600/overview.png" height="509" width="640" /></a></div>
<h4>
Creating a new Task Filter</h4>
<div>
A new filter can be created by selecting the "New filter" button. A dialog opens which allows to configure the filter:</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-3bau-VStdSE/VCqmlElPjsI/AAAAAAAAAeI/EzPhmKae8Zw/s1600/create-filter-oveview.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-3bau-VStdSE/VCqmlElPjsI/AAAAAAAAAeI/EzPhmKae8Zw/s1600/create-filter-oveview.png" height="507" width="640" /></a></div>
<div>
<br /></div>
<h4>
Defining Filter Criteria</h4>
<div>
Filter criteria can be defined in the "Criteria" section. In this example we select all tasks by candidate Group and Due Date:</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-dwnbGV4KDQ4/VCqmlBVJF0I/AAAAAAAAAeg/0JLXLjg176M/s1600/create-filter-criteria.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-dwnbGV4KDQ4/VCqmlBVJF0I/AAAAAAAAAeg/0JLXLjg176M/s1600/create-filter-criteria.png" height="508" width="640" /></a></div>
<h4>
Sharing Filters</h4>
<div>
Filters can be shared with other users and Groups by defining Authorizations. This filter is shared with all users part of the group "management". They have been granted "<span style="font-family: Courier New, Courier, monospace;">READ</span>" permission meaning that they can see and execute the filter but they cannot modify or delete it.</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-iXrRP11vmkQ/VCqmlBKYhgI/AAAAAAAAAeM/08PA3rhB45I/s1600/create-filter-sharing.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-iXrRP11vmkQ/VCqmlBKYhgI/AAAAAAAAAeM/08PA3rhB45I/s1600/create-filter-sharing.png" height="507" width="640" /></a></div>
<div>
<br /></div>
<h3>
What's next?</h3>
<div>
With Camunda 7.2 we limit out of the box support for filters to Task Filters. If this is a success, we can think of many more interesting usecases for filters:</div>
<div>
<ul>
<li>camunda Cockpit: Process Definition and Process Instance Filters in cockpit</li>
<li>Operations Monitoring: define a Filter Query and monitor it via REST from an Operations tool like Nagios</li>
<li>Combine Filers and Timer Jobs: At midnight, execute a Filter and for each Task, send a reminder email...</li>
<li>...</li>
</ul>
</div>
<div>
<br /></div>
<div>
<br /></div>

</div>