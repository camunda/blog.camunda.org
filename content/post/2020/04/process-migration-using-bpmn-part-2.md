+++
author = "Chris Allen"
categories = ["Community"]
date = "2020-04-28T08:00:00+01:00"
tags = ["BPMN", "Migration", "Process Execution", "Camundacon"]
title = "Process Migration Using BPMN Part 2"
+++

This blog post is the continuation of [Process Migration Using BPMN Part 1](https://blog.camunda.com/post/2020/04/process-migration-using-bpmn-part-1/) - part of my presentation Process Migration 201: [Tips Tricks and Techniques, at CamundaCon Live](https://gateway.on24.com/wcc/eh/2260438/lp/2295007/process-migration-201-tips-tricks-and-techniques-camunda-authentication-authorization-and-beyond-camunda-security-101-camunda). Here, I’ll run through some migration solution examples.

<!--more-->

## Use Case 1 - Solution

The development team decides to create a process to handle the migration.

{{< figure title="" src="/post/2020/04/process-migration/migrate-case-1.png" alt="MIgrate Case 1" >}}

The reusable "Migrate Instances in Batch" subprocess looks like this:

{{< figure title="" src="/post/2020/04/process-migration/migration-core.png" alt="Migration Core" >}}

Migration is triggered by creating a process instance of this Migration process using the REST API.  The payload that initializes process instance variables in our local example looks like this:
```json
    {
        "variables": {
            "processDefKey": {
                "value": "use-case-1",
                "type": "String"
            },
            "fromVersion": {
                "value": 1,
                "type": "Integer"
            },
            "toVersion": {
                "value": 2,
                "type": "Integer"
            },
            "fromUserTaskKey": {
                "value": "user-task-0",
                "type": "String"
            },
            "toUserTaskKey": {
                "value": "migration-task",
                "type": "String"
            },
            "maxPerBatch": {
                "value": 50,
                "type": "Integer"
            },
            "maxUserComplete": {
                "value": 10,
                "type": "Integer"
            },
            "skipIoMappings": {
                "value": true,
                "type": "Boolean"
            },
            "skipCustomListeners": {
                "value": true,
                "type": "Boolean"
            }
        }
    }
```


Notice the "maxPerBatch" variable.  In our local example, we will create 120 instances of version 1 with a token sitting on "user task 0".  Then we will run this migration process, instructing it to migrate in batches of 50 at a time.

Also, note the "maxUserComplete" variable.  Here we are saying "complete no more than 10 user tasks in a single transaction".

The migration process will loop for each batch of process instances to migrate.  For each batch, it will:

-   suspend the processes
-   execute the migration
-   activate the processes
-   using the API, complete the User migration task.  This will trigger the "Prepare Data After Migration" service task, and allow the token to rest at it's final destination, the "user task 2" task.

### Steps to execute the solution locally

1.  Start the Spring Boot application.  The application class is CamundaApplication.java.  Use either your IDE, or using maven with:

        mvn spring-boot:run

This will start Camunda BPM, as well as auto-deploy the first version of the process (case1.bpmn).

2.  Open Postman.  Import the following 4 files into Postman.  They are located in the src/test/resources directory:

{{< figure title="" src="/post/2020/04/process-migration/postman_1.png" alt="Postman (1)" >}}

Once the environment file is loaded, make sure it is selected in your Postman IDE:

{{< figure title="" src="/post/2020/04/process-migration/postman_2.png" alt="Postman (2)" >}}

Once all files are imported, you should see the following three collections:

{{< figure title="" src="/post/2020/04/process-migration/postman_3.png" alt="Postman (3)" >}}

3.  Notice that the "Step 1" collection for generating the data actually does the following:

    -   Starts a process instance that will go down path 1 after the gateway.  That process will auto-complete.
    -   Starts a process instance that will go down path 2 after the gateway.  It will stop at "user task 1".
    -   Get that task instance and complete it, to push the token to "user task 0".
    -   Starts a process instance that will go down path 3, then push that token all the way to completion.

    This means that every time we run this collection of calls, we will have two completed instances (path 1 and 3), and one incomplete instance with a token sitting at "user task 0".

    We want to run this collection 120 times by using the Collection Runner.  Select the "play" button in the upper right portion of the collection.  It should take you to this interface:

    {{< figure title="" src="/post/2020/04/process-migration/postman_4.png" alt="Postman (4)" >}}

Select "Run", then enter "120" for iterations, with a delay of 20 milliseconds.  Run the collection.  When it is complete, log into Cockpit (<http://localhost:8080/app/cockpit/default/>) with demo/demo.  Select the "use-case-1" process definition.  You should see 120 tokens on "user task 0".  If you are running Camunda EE and have History view, it should look like this:

{{< figure title="" src="/post/2020/04/process-migration/step1_complete.png" alt="Step 1 Complete" >}}

4.  In Postman, go to the "Deploy Version 2" request in the Step 2 collection.  Select the "Body" tab of the request, and reload the file provided for the "data" parameter.  It is the "case1_ver2_template.bpmn" file that is located in the root of the Spring Boot project.  Once complete, select the "Save" button, then the "Run" button.  This should deploy version 2 of the use-case-1 process.  Confirm deployment by going into Cockpit to see both versions.

5.  In Postman, go to the "Start process migrate-case-1" request in the "Case 1 - Step 3" collection.  Run the request to start the migration.  Observe the log in Spring Boot to watch the process navigation.  When complete, go into Cockpit to see the results.

    The migration should have run in three batches (50, 50, 20).  History would show something like this:

    {{< figure title="" src="/post/2020/04/process-migration/migration-case-1-afterExec.png" alt="Results (1)" >}}

Migration success would look like this:

    {{< figure title="" src="/post/2020/04/process-migration/result-2.png" alt="Results (2)" >}}

If you would like to run some of these example projects yourself, please feel free to pull them from Git [here](https://github.com/camunda-consulting/migration-examples).
