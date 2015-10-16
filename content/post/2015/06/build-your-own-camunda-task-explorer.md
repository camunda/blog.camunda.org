---
title: "Build your own camunda task explorer with CDI and JSF"
date: "2015-06-02"
author: "Ingo Richtsmeier"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/06/build-your-own-camunda-task-explorer.html"

---

<div>
There's a lot of interest in how to write a task list with CDI and JSF, and not a lot of up-to-date examples available. Until now! - In this blog post I'm going to show you how you can build your own task list with Camunda BPM<br />
<a name='more'></a><br />
<br />
<h3>Build a process application with JSF and CDI</h3>To get tasks into your task list, you need to build a process application that includes at least one process definition, as well as some user tasks. A recipe to build a JSF based process application can be found in our <a href="http://docs.camunda.org/7.2/guides/getting-started-guides/java-ee/" target="_blank">getting started guide</a>.<br />
<br />
After completing the tutorial you'll have a <a href="https://github.com/camunda/camunda-get-started-javaee/blob/master/src/main/resources/pizza-order.bpmn" target="_blank">pizza&nbsp;order&nbsp;process</a> like this:<br />
<div><br />
</div><div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-EvGCP6WjV6w/VVnk9DcNrQI/AAAAAAAAADs/ffd37WVEFjk/s1600/pizza-order.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="239" src="http://3.bp.blogspot.com/-EvGCP6WjV6w/VVnk9DcNrQI/AAAAAAAAADs/ffd37WVEFjk/s640/pizza-order.PNG" width="640" /></a></div>It contains a simple <a href="https://github.com/camunda/camunda-get-started-javaee/blob/master/src/main/webapp/placeorder.xhtml" target="_blank">start form</a> to start process instances and a form to approve the order.<br />
<pre class="prettyprint"><code class="language-jsf">&lt;!DOCTYPE HTML&gt;
&lt;html lang="en" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:ui="http://java.sun.com/jsf/facelets"
  xmlns:h="http://java.sun.com/jsf/html"
  xmlns:f="http://java.sun.com/jsf/core"&gt;

&lt;f:view&gt;
  &lt;f:metadata&gt;
    &lt;!-- Start working on a task. Task Id is read internally from
         request parameters and cached in the CDI conversation scope.
    --&gt;
    &lt;f:event type="preRenderView" listener="#{camundaTaskForm.startTaskForm()}" /&gt;
  &lt;/f:metadata&gt;
  &lt;h:head&gt;
    &lt;title&gt;Approve Order&lt;/title&gt;
  &lt;/h:head&gt;
  &lt;h:body&gt;
    &lt;h1&gt;Order:&lt;/h1&gt;
    &lt;p&gt;Customer: #{approveOrderController.orderEntity.customer}&lt;/p&gt;
    &lt;p&gt;Address: #{approveOrderController.orderEntity.address}&lt;/p&gt;
    &lt;p&gt;Pizza: #{approveOrderController.orderEntity.pizza}&lt;/p&gt;
    &lt;h:form id="submitForm"&gt;
      &lt;h:outputLabel&gt;Approve Order?&lt;/h:outputLabel&gt;
      &lt;h:selectBooleanCheckbox value="#{approveOrderController.orderEntity.approved}"/&gt;&lt;br/&gt;
      &lt;h:commandButton id="submit_button" value="Approve Order" action="#{approveOrderController.submitForm()}" /&gt;
    &lt;/h:form&gt;
  &lt;/h:body&gt;
&lt;/f:view&gt;
&lt;/html&gt;
</code></pre>The forms use a pre-built bean&nbsp;<code><a href="https://github.com/camunda/camunda-bpm-platform/blob/master/engine-cdi/src/main/java/org/camunda/bpm/engine/cdi/jsf/TaskForm.java" target="_blank">org.camunda.bpm.engine.cdi.jsf.TaskForm</a>&nbsp;</code>to interact with the process instance. It's used to access the process instance and complete the task.<br />
<br />
The code for the tutorial is also&nbsp;<a href="https://github.com/camunda/camunda-get-started-javaee" target="_blank">available on github</a>.<br />
<br />
You can also use our <a href="http://docs.camunda.org/7.2/guides/user-guide/#process-applications-maven-project-templates-archetypes" target="_blank">maven project templates</a> to generate a project with a process and some form snippets and build your own process aplication. The <code>camunda-archetype-ejb-war</code> will be your friend.<br />
<h3>Start a process instance from a list of process definitions</h3><div>To start a process instances with a JSF-start form you need a list of all process definitions. <a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/java/com/camunda/consulting/jsfSimpleTasklist/ProcessDefinitionList.java" target="_blank">This list</a> is very simple with injection of the process engine services:<br />
<pre class="prettyprint"><code class="language-java">@SessionScoped
@Named("startList")
public class ProcessDefinitionList extends ProcessApplicationBean implements Serializable {
  
  @Inject
  private RepositoryService repositoryService;
  
  @Inject
  private FormService formService;
  
  @Inject
  private RuntimeService runtimeService;
  
  public List&lt;ProcessDefinition&gt; getList() {
    return repositoryService.createProcessDefinitionQuery().latestVersion().list();
  }
  
  public String getAbsoluteStartFormKey(ProcessDefinition processDefinition) {
    String startFormKey = "";
    if (processDefinition.hasStartFormKey()) {
      startFormKey = formService.getStartFormKey(processDefinition.getId());
    }
    
    if (startFormKey.startsWith("app:")) {
      String applicationPath = getApplicationPath(processDefinition.getId());
      return applicationPath + "/" + startFormKey.substring(4); 
    }
    return startFormKey;
  }
}

</code></pre>You will get this start form from it:<br />
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-tXRI6lJ0Lm8/VVnoxdwuS7I/AAAAAAAAAD4/_A6ixia4PkY/s1600/start-list.PNG" imageanchor="1" style="clear: left; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img border="0" height="416" src="http://4.bp.blogspot.com/-tXRI6lJ0Lm8/VVnoxdwuS7I/AAAAAAAAAD4/_A6ixia4PkY/s640/start-list.PNG" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">List of all process definitions to start</td></tr>
</tbody></table>After hitting the start button, the user will see the start form and after that form is completed, the process instance will start. The user will be able to see it in the task list now.<br />
<br />
The <a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/webapp/app/startList.xhtml" target="_blank">starting of the process instance</a> and the navigation to the task list is based on a injected bean of a jsf actionListener:<br />
<pre class="prettyprint"><code class="language-jsf">&lt;h:commandButton&nbsp;class="btn btn-small"&nbsp;
    rendered="#{!thisProcessDefinition.hasStartFormKey()}"&nbsp;
    action="taskList.jsf"&nbsp;
    actionListener="#{businessProcess.startProcessByKey(thisProcessDefinition.key)}" 
    value="start"/&gt;
</code></pre><h3>Handle more than one process application</h3></div>If you have more than one process application deployed to your shared engine, the start list and the task list have to work with different servlet-context-paths.<br />
<br />
This is done in the <a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/java/com/camunda/consulting/jsfSimpleTasklist/ProcessApplicationBean.java" target="_blank">super-class</a> of the ProcessDefinitionList:<br />
<div><pre class="prettyprint"><code class="language-java">  
  public String getApplicationPath(String processDefinitionId) {
    String deploymentId = repositoryService
        .getProcessDefinition(processDefinitionId)
        .getDeploymentId();
  
    // get the name of the process application that made the deployment
    String processApplicationName = managementService
        .getProcessApplicationForDeployment(deploymentId);
  
    if (processApplicationName == null) {
      // no a process application deployment
      return null;
    } else {
      ProcessApplicationService processApplicationService =&nbsp;BpmPlatform.getProcessApplicationService();
      ProcessApplicationInfo processApplicationInfo = processApplicationService.getProcessApplicationInfo(processApplicationName);
      return processApplicationInfo
          .getProperties()
          .get(ProcessApplicationInfo.PROP_SERVLET_CONTEXT_PATH);
    }
  }
</code></pre></div><h3>Working with tasks in JSF-tasklist</h3>Again, injecting the process engine services makes a <a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/java/com/camunda/consulting/jsfSimpleTasklist/TaskList.java" target="_blank">task list</a> very simple:<br />
<br />
<pre class="prettyprint"><code class="language-java">@SessionScoped
@Named
public class TaskList extends ProcessApplicationBean implements Serializable {

  @Inject
  private TaskService taskService;
  @Inject
  private FormService formService;
  
  private String assignee = null;

  public void update() {
    // do nothing here, since a refresh trigger a reload of the list anyway
  }

  public List<task> getList() {
    if (assignee != null &amp;&amp; assignee.length() &gt; 0) {
      return taskService.createTaskQuery().taskAssignee(assignee).initializeFormKeys().list();
    } else {
      return taskService.createTaskQuery().initializeFormKeys().list();
    }
  }

  public String getAssignee() {
    return assignee;
  }

  public void setAssignee(String assignee) {
    this.assignee = assignee;
  }
</task></code></pre>Because I've concentrated on the technical details, our task list may looks like this:<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="https://github.com/camunda/camunda-consulting/raw/master/snippets/jsf-simple-tasklist/screenshot.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="412" src="https://github.com/camunda/camunda-consulting/raw/master/snippets/jsf-simple-tasklist/screenshot.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Example task list</td></tr>
</tbody></table><br />
Of course, you can change the cryptic IDs against businessKeys and display more information from your business context.<br />
<h3>Claiming and unclaiming</h3><div>If you work in groups, your colleagues should not be able to see the tasks that you are currently working on. Therefore the user has to claim a task. If you are unable to finish the work, you can give the task back to the team by "claiming" it with userID null.</div><div><br />
</div><div>The methods for claim and unclaim looks like this:</div><pre class="prettyprint"><code class="language-java">  public void unclaim(Task task) {
    taskService.claim(task.getId(), null);
  }

  public void claim(Task task) {
    taskService.claim(task.getId(), currentUser);
  }

  private String currentUser = null;
  
  public String getFormKey(Task task) {
    TaskFormData taskFormData = formService.getTaskFormData(task.getId());
    if (taskFormData!=null) {
      return taskFormData.getFormKey();
    }
    else {
      // we do not want to fail just because we have tasks in the task list without form data (typically manually created tasks)
      return null;
    }
  }
  
  public String getAbsoluteFormKey(Task task) {
    String formkey = getFormKey(task);
    if (formkey.startsWith("app:")) {
      String applicationPath = getApplicationPath(task.getProcessDefinitionId());
      return applicationPath + "/" + formkey.substring(4);
    } else {
      return formkey;
    }
  }
  
  public String getCurrentUser() {
    return currentUser;
  }

  public void setCurrentUser(String currentUser) {
    this.currentUser = currentUser;
  }

</code></pre><div>This is the table of the <a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/webapp/app/taskList.xhtml" target="_blank">taskList.xhtml</a>:</div><div><pre class="prettyprint"><code class="language-jsf">&lt;h:dataTable value="#{taskList.list}" var="thisTask" id="list" cellspacing="0" rowClasses="odd, even" styleClass="table table-striped table-bordered"&gt;
  &lt;h:column&gt;&lt;f:facet name="header"&gt;ID&lt;/f:facet&gt;#{thisTask.id}&lt;/h:column&gt;
  &lt;h:column&gt;&lt;f:facet name="header"&gt;name&lt;/f:facet&gt;&lt;strong&gt;#{thisTask.name}&lt;/strong&gt;&lt;/h:column&gt;
  &lt;h:column&gt;&lt;f:facet name="header"&gt;creation time&lt;/f:facet&gt;#{thisTask.createTime}&lt;/h:column&gt;
  &lt;h:column&gt;&lt;f:facet name="header"&gt;due date&lt;/f:facet&gt;#{thisTask.dueDate}&lt;/h:column&gt;
  &lt;h:column&gt;&lt;f:facet name="header"&gt;assignee&lt;/f:facet&gt;#{thisTask.assignee}&lt;/h:column&gt;
  &lt;h:column&gt;&lt;f:facet name="header"&gt;actions&lt;/f:facet&gt;
    &lt;h:commandLink action="#{taskList.claim(thisTask)}" value="claim" type="submit" class="btn btn-small"/&gt;
    &lt;h:commandLink action="#{taskList.unclaim(thisTask)}" value="release" type="submit" class="btn btn-small"/&gt;
    &lt;h:outputLink value="#{taskList.getAbsoluteFormKey(thisTask)}" class="btn btn-small"&gt;
      &lt;f:param name="taskId" value="#{thisTask.id}"&gt;&lt;/f:param&gt;
      &lt;f:param name="callbackUrl" value="#{request.contextPath}/app/taskList.jsf"&gt;&lt;/f:param&gt;
      complete
    &lt;/h:outputLink&gt;
  &lt;/h:column&gt;
&lt;/h:dataTable&gt;
</code></pre></div><div><h3>Conclusion</h3>The complete Github repo of this task list example is in <a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/jsf-simple-tasklist" target="_blank">consulting/snippets/jsf-simple-tasklist</a>.<br />
<br />
Have fun with JSF-Tasklists.<br />
<br />
</div>
</div>