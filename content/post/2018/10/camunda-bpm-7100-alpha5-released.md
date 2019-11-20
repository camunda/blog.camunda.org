+++
author = "Nikola Koevski"
categories = ["Execution"]
tags = ["Release Note"]
date = "2018-10-26T17:30:00+02:00"
title = "Camunda 7.10.0-alpha5 Released"
+++

**Camunda BPM 7.10.0-alpha5** is here and the highlights are:

* Configure Business Key in Delegation Code
* Fetch and Lock Based on Process Definition and Tenant
* Wildfly support
* [8 Bug Fixes](https://jira.camunda.com/issues/?jql=issuetype%20%3D%20%22Bug%20Report%22%20AND%20fixVersion%20%3D%207.10.0-alpha5)


You can [Download Camunda for free](https://camunda.com/download/) (click on Preview Release) or [Run it with Docker](https://hub.docker.com/r/camunda/camunda-bpm-platform/).


If you are interested, you can see the complete [release notes](https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=15346)
and the list of [known issues](https://jira.camunda.com/issues/?jql=affectedVersion%20%3D%207.10.0-alpha5).

If you want to dig in deeper, you can find the source code on [GitHub](https://github.com/camunda/camunda-bpm-platform/releases/tag/7.10.0-alpha5).

<!--more-->

## Configure Business Key in Delegation Code

Within this alpha we introduce new option to configure the business key. The setting can be done inside delegation code (Execution listener, Task listner or Java delegate implementation). In other words you can configure the business key of already running process instance. Here is an example:
```java
public class SetNewBusinessKeyDelegate implements JavaDelegate {
   public void execute(DelegateExecution execution) throws Exception {
    execution.setProcessBusinessKey("businessKey");
  }
 }
```
You can find more information about the delegation code in our [User guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#set-business-key-from-delegation-code).
What is a business key? - you can check this [How to Use Business Keys?](https://blog.camunda.com/post/2018/10/business-key/) blog post.

## Fetch and Lock Based on Process Definition and Tenant

The "fetch and lock" mechanism is popular among the users implementing [External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks). Now you can filter tasks based on two new options - process definition and tenant id. You can find
java example below:
```java
externalTasks = externalTaskService.fetchAndLock(2, "aWorkerId")
      .topic("createOrder", 10000)
      .processDefinitionId("aProcessDefinitionId")
      .withoutTenantId()
      .execute();
```
and here is Rest API example:

POST `/external-task/fetchAndLock`
```json
 {
      "workerId":"aWorkerId",
      "maxTasks":2,
      "usePriority":true,
      "topics":
          [{"topicName": "createOrder",
            "lockDuration": 10000,
            "processDefinitionId": "aProcessDefinitionId",
            "tenantIdIn": "tenantOne"
          }]
  }
```
For more infomation please check the [Rest documentation](https://docs.camunda.org/manual/latest/reference/rest/external-task/fetch/).

## A Single WildFly distro

It's one small step for the Camunda distros, but a pretty giant leap for the Camunda engineering teams. From Camunda BPM 7.10-alpha5, Camunda will only provide a single WildFly distro, always with the latest version of WildFly (currently WildFly 14).

Don't worry, WildFly 8 continues to be supported through a separate `camunda-wildfly8-subsystem` (included with [this](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-wildfly8-modules/) archive), while version 10 and above work with the latest `camunda-wildfly-subsystem`. New Camunda BPM users, that wish to use it with WildFly 8 or WildFly 10-13, will need to do a [full manual installation](https://docs.camunda.org/manual/latest/installation/full/jboss/manual/) on the appropriate vanilla WildFly application server.

<!--no-more-->

## What's Next?

The minor release of **Camunda BPM 7.10** is coming this November (November 30, 2018). Our team is already working on it, finalising larger features and clearing the backlog are the clear focus.

You can find out more details if you check out our [roadmap](https://camunda.com/learn/community/#roadmap).

## Your Feedback Matters!

With every release we constantly strive to improve Camunda BPM. To make this possible, we are reliant on your feedback. Feel free to share your ideas and suggestions with us.

You can contact us by writing a post in the [forum](https://forum.camunda.org/).
