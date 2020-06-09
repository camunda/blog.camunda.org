+++
author = "Joe Pappas"
categories = ["Community"]
tags = ["BPMN", "Migration", "Community"]
date = "2020-06-09T09:00:00+02:00"
title = "Migrating processes from Pega to Camunda - Step-by-step Tutorial"

+++

It’s well known that process flows created in Pega don’t conform to any open standard, despite looking rather BPMN-like. Folks who are looking to jump start their migration from Pega to Camunda are stuck having to manually redraw processes in Modeler. But manually redrawing process flows is tedious and time consuming, especially if there are many or complex processes to convert. In this tutorial we’ll step you through a utility that can help you generate a BPMN compliant process that can serve as a starting point for your Pega to Camunda conversion.

<!--more-->

## Pega XML to BPMN converter tutorial

The Camunda Consulting team has created a set of freely available tools for migrating process flows. The tools for migrating Pega process flows can be found [here](https://github.com/camunda-consulting/migrate-to-camunda-tools/tree/master/Pega/create%20BPMN%20from%20Pega%20XML). You’ll quickly notice it is a Maven project which can be opened in just about any integrated development environment. Eclipse and Intellij are two of the more popular IDEs. But first you’ll need to clone or download the migration tools repository - you can do that [here](https://github.com/camunda-consulting/migrate-to-camunda-tools).

For this tutorial we’ll use Eclipse as our IDE.

* Once you’ve cloned or downloaded the Git repository, copy the contents of the Pega converter tool repository into a fresh workspace. If, for example, your Git repository is at __C:\gitRepos__ then you’ll find the Pega converter at __C:\gitRepos\migrate-to-camunda-tools\Pega\create BPMN from Pega XML__
* Copy the entire folder to the workspace of your choice.
* Next, start Eclipse and select the workspace you just copied the contents into. Once Eclipse has started, navigate to __File > Import > General > Projects from Folder or Archive.__
* Click on __Next__.
* In the dialog box that appears click on __Directory__ and navigate to the folder you just copied into your workspace. Your screen should look something like this (see below)
* Click on __Finish__.

{{< figure class="no-border teaser" src="Import-Projects-from-File-System-or-Archive.png" alt="Import Projects from File System or Archive">}}

The project will be imported into your workspace. You may want to update any Java compiler differences between the provided code and your environment, but it should work as is.

Next we’ll create a Run configuration to allow you to run the converter in Eclipse:

* Right click on the root project folder and select __Run As > Run Configurations…__
* In the dialog box that appears click on __Java Application__ to create a new configuration. The project name should already be filled out in the dialog box. You can give this configuration a new name if you want.
* Next, you’ll need to select a main class. Click on the Search button and be sure to select - __BPMNGenFromPega - org.camunda.bpmn.generator__. Select it and click on __OK__.
* Your screen should look something like this:

{{< figure class="no-border teaser" src="Create-Manage-and-Run-Configurations.png" alt="Create Manage and Run Configurations">}}

Now you’ll need to provide two arguments, the first one being the XML export from Pega and the second being the name of the converted file. Enter the path and file names in the __Program arguments__ section of the __Arguments__ tab enclosed by quotation marks, just in case. There is a provided sample Pega xml file to get you started. To use this sample enter the following for the input and output files:

__"./src/main/resources/SamplePegaProcess.xml"  "./src/main/resources/ConvertedProcessFromPega.bpmn"__

Your screen should look something like this:

{{< figure class="no-border teaser" src="2-Create-Manage-and-Run-Configurations.png" alt="Create Manage and Run Configurations - Arguments">}}

Click on __Run__. A console window should open and you should see the following in the console:

__Diagram ./src/main/resources/SamplePegaProcess.xml converted from Pega and can be found at ./src/main/resources/ConvertedProcessFrom Pega.bpmn__

The resources folder contains a PNG file (samplePegaProcessDiagram.png) of the original process in Pega and it will look like this:

{{< figure class="no-border teaser" src="ConvertedProcessFromPega.png" alt="Converted Process From Pega">}}

Using Camunda Modeler, open __ConvertedProcessFromPega.bpmn__ and it should look something like this:

{{< figure class="no-border teaser" src="2-ConvertedProcessFromPega.png" alt="Converted Process From Pega">}}

## Creating a jar file

If you’d like to simply create a jar file of the utility, you have some options:

* Either right click on the __pom.xml__ file and select __Run As > Maven install.__
* Or right click on the root folder and select __Show in Local Terminal__ and issue the following Maven command: __mvn clean package install__.

In either case (or using your own preferred method) you should get a jar file in your __/target__ folder. Copy that jar wherever you’d like and issue the following command in a terminal:

__java -jar yourGeneratedJarFile.jar “your input file” “your output file”__

That’s it! Please feel free to provide feedback in our [forum](https://forum.camunda.org/) and [watch this Git repository](https://github.com/camunda-consulting/migrate-to-camunda-tools) for additional converters as they become available.
