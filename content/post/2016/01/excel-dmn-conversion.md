+++
author = "Thorben Lindhauer"
categories = ["Community"]
date = "2016-01-25"
tags = ["DMN", "Excel"]
title = "Converting Excel Worksheets to DMN"
+++

Decision Model and Notation (DMN) is the new kid on the block when it comes to defining decisions and business rules. Like BPMN and CMMN, it tries to bridge the gap between human readable definition of business-relevant aspects and technical realization. DMN therefore has a graphical representation as well as an XML-based serialization format and Camunda provides you with a [beautiful editor](https://camunda.org/features/modeler/) to manage both. So why not go full DMN any minute now? Probably because you work with business rule definitions for much longer than DMN is around and you manage them in Excel. Recreating these with the DMN editor is a tedious task. That is where Camunda's newest community extension comes into play: The [Excel worksheet to DMN converter](https://github.com/camunda/camunda-dmn-xlsx).

<!--more-->

Take an Excel table,

{{< figure class="teaser no-border" src="exceltable.png" >}}

convert it to DMN,

{{< figure class="teaser no-border" src="dmntable.png" >}}

and you are one step closer to automating business decisions with [Camunda BPM](https://camunda.org).

# How to use

The quickest way to get started is to try the command line tool:

1. [Download the command line tool](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/extension/dmn/dmn-xlsx-cli/0.1.0/dmn-xlsx-cli-0.1.0.jar). It is a runnable jar file, so you need to have Java installed.
2. Take an Excel file that contains a decision to convert and place it next to the downloaded jar.
3. Execute `java -jar dmn-xlsx-cli-0.1.0.jar --inputs A,B,C --outputs D,E,F path/to/input/file.xlsx path/to/output/file.dmn`. Note that this example assumes the columns A, B, and C are inputs and D, E, F are outputs. You can set these as you like.
4. Obtain the dmn table and import it in Camunda modeler or in the [online DMN table editor](http://demo.bpmn.io/dmn).

# Background

The goal of this project is to provide a Java library for conversion between Excel worksheets and DMN tables. Since no two Excel tables look alike, the library aims for customization of the conversion process. On top of the standalone library, there is a process engine plugin that enables including Excel files in a process application deployment. The files are converted into DMN tables on the fly during deployment. For details, have a look at the [github repository](https://github.com/camunda/camunda-dmn-xlsx).

# Contribute

We are eager to receive feedback and improve the library in future versions. Contributions in form of code, bug reports, and feature ideas can be made directly in the [camunda-dmn-xlsx repository](https://github.com/camunda/camunda-dmn-xlsx) on github.
