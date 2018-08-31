+++
title = "Introducing Embedded Forms Generator: A Camunda Modeler Plugin for Easier Embedded Form Building"
description = "The Camunda team has just released a new Modeler plugin making it easy to preview a form and to generate the HTML for an embedded form--all without leaving the Modeler. Learn more and see how to use it step-by-step."
date = "2018-08-31T07:00:00+01:00"
author = "Felix Müller, Mike Winters"
categories = ["Modeling"]
tags = ["forms"]
+++

_Tl;dr_ _We just released a [new Camunda Modeler plugin](https://github.com/camunda-consulting/code/tree/master/snippets/camunda-modeler-plugins/camunda-modeler-plugin-usertask-generatedform-preview) that makes it possible to preview task forms and to automatically generate HTML for [embedded task forms](https://docs.camunda.org/manual/7.9/user-guide/task-forms/#embedded-task-forms)--all without leaving the Camunda Modeler. The plugin makes it much faster and easier to do form prototyping at the beginning of a project and then get up and running with an embedded task form._

While some workflow automation use cases can be solved with "straight-through processing"--that is, a process where all tasks are completed by software systems and with no manual intervention--we human beings still have an important role to play in many scenarios. For reasons ranging from regulatory compliance to quality assurance, BPMN's [user task](https://docs.camunda.org/manual/7.9/reference/bpmn20/tasks/user-task/) is frequently a part of process models.

And user tasks almost always connect to a [form](https://docs.camunda.org/manual/7.9/reference/bpmn20/tasks/user-task/#forms) that needs to be submitted by the human who's responsible for completing the task. There are a couple different ways to work with forms in Camunda, and a little more than half of our user base chooses to build their own [external form UI](https://docs.camunda.org/manual/7.9/user-guide/task-forms/#external-task-forms) then send form data back to the process engine via our REST or Java APIs.

## Camunda Tasklist: A Ready-To-Use Web UI For User Tasks

The rest of users, though, take advantage of [Camunda Tasklist](https://camunda.com/products/tasklist/), a ready-to-use web frontend for user tasks. Tasklist is an interface where end users can organize and work on BPMN user tasks they're supposed to complete.

{{< figure src="tasklist-screenshot.png" alt="Camunda Tasklist" >}}

The way Tasklist works is pretty simple: during process execution, the Camunda Engine will create tasks based on a predefined BPMN model. The engine assigns those tasks to end users as defined in the model. When end users click on a task in Tasklist, they'll see a task form that displays information and asks them to enter data. After they've finished working on the task form, they complete it by clicking on a button prompting the Camunda Engine to continue model execution.

There are two different types of forms that Tasklist users can implement for a user task where the form is part of the Camunda Tasklist (rather than part of an external application): [generated task forms](https://docs.camunda.org/manual/7.9/user-guide/task-forms/#generated-task-forms) and [embedded task forms](https://docs.camunda.org/manual/7.9/user-guide/task-forms/#embedded-task-forms). Let's quickly review both of these form types.

### Generated task forms: fast, but not so flexible

Generated form metadata is edited graphically directly inside the Modeler. If you create a user task, select it, then open the Properties panel, you'll see a "Forms" tab where you can add form fields, set the data type, include a default value, and more.

{{< figure src="modeler-formfields.png" alt="Camunda Modeler - Form Fields" >}}

This ease of use makes generated task forms ideal for fast prototyping--you can build a new form and test it in Tasklist in a matter of minutes. But there's some core form functionality that generated task forms currently don't support. For example, what if you need your users to be able to upload a file when completing a form? There are many cases where our users need something beyond the generated task form.

That's where the embedded task form comes in.

### Embedded task forms: anything you want--you just have to build it

Embedded task forms are HTML and JavaScript forms that are displayed directly within Tasklist. An embedded task form is simply an HTML file that you embed in your Camunda project, and it gives you much more flexibility regarding what your form looks like and the types of fields it supports. Our [embedded forms reference](https://docs.camunda.org/manual/7.9/reference/embedded-forms/) in the docs goes into more detail on how to build embedded forms.

One thing about embedded forms is that you have to more or less build them from scratch. Every [Camunda project archetype](https://docs.camunda.org/manual/7.9/user-guide/process-applications/maven-archetypes/) includes a couple of sample form HTML files, but these are simple reference forms that are much more basic than what's required in most real-world use cases. Building an embedded task form is relatively hands-on and labor-intensive for a user, especially when compared to generated task forms.

What if we could combine the ease-of-use of generated task forms with the flexibility of embedded task forms? Sounds like a pretty nice idea! And that's why today we're excited to share…

## Embedded Form Generator Modeler Plugin: The Best of Both Worlds

We built the Embedded Form Generator plugin ([available for download here](https://github.com/camunda-consulting/code/tree/master/snippets/camunda-modeler-plugins/camunda-modeler-plugin-usertask-generatedform-preview)) because we realized these two types of form building can complement each other nicely, and we wanted to make it easier to use them both during the form building process. The new plugin makes it possible to:

1.  Build a generated task form prototype in the Modeler
1.  Create embedded task form HTML _based on the fields in the generated task form_
1.  Preview this HTML directly in the Modeler
1.  Then, of course, edit the HTML and include it in your project so the form works exactly the way you need it to

In other words, with the click of a button, you can go straight from a generated task form that you built as a prototype in Modeler to the corresponding HTML you need for an embedded task form. You'll probably still need to make some edits to this HTML so that it behaves the way you want it to as an embedded form, but we think you'll save a lot of time by generating HTML according to your prototype rather than building it from scratch.

### See the Plugin in action

In the rest of the post, we're going to walk you through how to use the plugin step-by-step. Feel free to follow along and give it a try yourself!

#### Model the process

Let's start by modelling a simple process in the Camunda Modeler:

{{< figure src="the-process.png" alt="Invoice Process Example" >}}

#### Configure the process

Next, we should make the process executable and configure our form fields. Let's imagine that we need to have following data fields to start our process

*   First name
*   Last name
*   Invoice Date
*   Value
*   Reason

Using the Camunda Modeler, it's very easy to simply configure these form fields for a Start Event in the Properties panel:

{{< figure src="invoice-formfields.png" alt="Camunda Modeler - Form Fields" >}}

Right now, you're probably thinking, "But what does will look like in the Camunda Tasklist?" This is where the new plugin comes into play! Just click on the "Preview Forms" button, and you'll see a preview of the form that you just configured:

{{< figure src="plugin-preview.png" alt="Camunda Modeler Plugin - Generated Forms Preview" >}}

After we configured the fields for our start event, we can do the same for our User Task and add an Approve variable. This will be needed for the Exclusive Gateway.

{{< figure src="plugin-preview2.png" alt="Camunda Modeler Plugin - Generated Forms Preview 2" >}}

#### Deploy and use the process

After configuring the rest of the process -- specifically, the implementation of the Service Tasks (by adding the implementation property) and the Condition Type and Expression of the Sequence Flows after the Exclusive Gateway -- we can use the deploy button in the Camunda Modeler to send the process to the workflow engine.

Next, we'll try to start the process using the Camunda Tasklist. The forms that we configured would look like this - very similar to our preview in the Modeler:

{{< figure src="start-process-form.png" alt="Start Instance Form" >}}

{{< figure src="approve-invoice-form.png" alt="Approve Invoice Form" >}}

#### Enhance the process with embedded forms

We're off to a good start, but we realize that this form is not going to be enough to get the job done--after all, when reviewing an invoice, we probably need the actual invoice. The generated form fields in the Modeler support basic fields, but once a form becomes more complicated, it's up to the developers to create some HTML and JavaScript, so let's make this happen.

First, we'll set up a Java Project using Camunda's Maven Archetypes:


{{< figure src="maven-project1.png" alt="Maven Project" >}}

{{< figure src="maven-project2.png" alt="Maven Project" >}}

Then we'll go ahead and copy our BPMN file inside the src/main/resources folder. We know that we want to use embedded forms, so let's create two html files:

{{< figure src="html-files.png" alt="HTML Files" >}}

We don't want to have to write the form HTML from scratch if we don't have to. Fortunately, we can just use our new plugin in the Camunda Modeler and hit the "Copy" button in the Source view of our overlay:

{{< figure src="plugin-sourcecode.png" alt="Camunda Modeler Plugin - Source" >}}

Now we can simply add our form upload field to the HTML so that it's possible to upload an invoice:

{{< figure src="form-uploadhtml.png" alt="Embedded Form HTML" >}}

Now we just need to connect the new embedded form HTML files with our model as shown in the Screenshot for the Start Event:

{{< figure src="properties-panel-embeddedform.png" alt="Properties Panel Embedded Form" >}}

#### Deploy the Process Application and try new forms

Next, let's deploy the form and see what it looks like in Tasklist. We can use Maven to deploy it:

{{< figure src="deploy.png" alt="Maven Deploy" >}}

Lastly, let's start a new invoice process and check out our new fancy form:

{{< figure src="start-instance.png" alt="Start Instance with File Upload" >}}

## Have an idea? Contribute!

Thanks for reading, and we hope you have a chance to try out the Embedded Form Builder plugin yourself. Contributions in the form of code, bug reports, and feature ideas are always welcome and can be made directly in the [camunda-consulting repository](https://github.com/camunda-consulting/code/tree/master/snippets/camunda-modeler-plugins/camunda-modeler-plugin-usertask-generatedform-preview) on GitHub.

Github project

[https://github.com/camunda-consulting/code/tree/master/snippets/camunda-modeler-plugins/camunda-modeler-plugin-usertask-generatedform-preview](https://github.com/camunda-consulting/code/tree/master/snippets/camunda-modeler-plugins/camunda-modeler-plugin-usertask-generatedform-preview)
