---
title: "Camunda BPM 7.4.0 Alpha 1 Released"
date: "2015-07-31"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/07/camunda-bpm-740-alpha-1-released.html"

---

<div>
Today we release Camunda BPM 7.4.0-Alpha1. This is the first alpha release previewing the upcoming 7.4.0 Release.<br />
<br />
The highlights of this release are:<br />
<ul><li>DMN (Decision Model and Notation): DMN Engine and browser based Decision Table Editor,</li>
<li>Job Priorities: Control execution order of asynchronous Jobs,</li>
<li>Enhanced BPMN Support: add Signal Start events, Compensation Event Subprocess, enhanced asynchronous continuations for Multi Instance Activities,</li>
<li>Native support for File Variables in Api and Html Forms,</li>
<li>Many Bugfixes</li>
</ul><br />
Overall more than 140 issues were closed. See <a href="https://jira.camunda.com/secure/ReleaseNote.jspa?projectId=10230&version=14191">complete Release Notes in Jira</a>.<br />
<div style="background-color: #f4f6f4; border-radius: 3px; border: 1px solid #e4e6e4; margin: 30px auto; max-width: 500px; overflow: hidden;"><h2 style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; float: left; margin: 0; padding: 15px; position: relative; text-align: center; width: 300px;"><a href="http://camunda.org/download#latest" style="display: block; font-size: 28px; line-height: 32px; text-align: center;">Download For Free</a>   </h2><h3 style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; float: right; margin: 0; padding: 15px; position: relative; text-align: center; width: 200px;"><a href="https://registry.hub.docker.com/u/camunda/camunda-bpm-platform/" style="display: block; font-size: 20px; line-height: 32px; text-align: center;">Run with Docker</a>   </h3></div><a name='more'></a><h2>DMN: Decision Model and Notation</h2>This is the first release which supports DMN (Decision Model and Notation). DMN is a new OMG (Object Management Group) standard for Business Decision Management. (Some of you may also be familiar with the term "Business Rules Management".)<br />
{{< figure src="http://4.bp.blogspot.com/-cnk5FA_Swsw/VboYuNYOyZI/AAAAAAAADEw/Ps50fBs73Oc/s1600/table.png" >}}
DMN allows developers and business people to collaborate around different phases of modeling, testing, executing, monitoring and improving Business Decisions.<br />
<br />
This Camunda BPM release adds<br />
<ul><li>A new <a href="https://github.com/camunda/camunda-engine-dmn">lightweight decision Engine</a> with native support for DMN, developed from scratch,</li>
<li>Seamless integration of the Decision Engine into BPMN and CMMN execution,</li>
<li>A new, <a href="https://github.com/dmn-io">browser based Decision Table Editor</a> built on top of our awesome&nbsp;<a href="http://bpmn.io/">bpmn.io</a> modelling framework</li>
</ul>While these components are currently in an early stage of development, it is already possible to create a decision table in the browser, add it to your java development project, reference it from a BPMN Business Rule Task, and execute the corresponding process.<br />
<br />
For an example, checkout the Invoice Demo (<a href="https://github.com/camunda/camunda-bpm-platform/tree/master/examples/invoice">Sources</a>) shipped with our distribution.<br />
<br />
You can try out a demo of the browser based decision editor here:<br />
<div style="background-color: #f4f6f4; border-radius: 3px; border: 1px solid #e4e6e4; margin: 30px auto; max-width: 500px; overflow: hidden;"><h3 style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; padding: 15px; position: relative; text-align: center;"><a href="http://camunda.org/dmn/demo/" style="display: block; font-size: 18px; line-height: 32px; text-align: center;">DMN Table Editor Demo</a>   </h3></div>Over the next days we will publish a dedicated blogpost on DMN.<br />
You should also read <a href="http://www.bpm-guide.de/2015/07/20/dmn-decision-model-and-notation-introduction-by-example/">Bernd's Post at bpm-guide</a>.<br />
<br />
<h2>Job Priorities</h2>It is now possible to control the order in which asynchronous jobs are executed. <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-the-job-executor-job-prioritization">See the corresponding documentation</a>.<br />
We will publish a dedicated blogpost on Job Priorities later. <a href="http://blog.camunda.org/2015/08/job-prioritization-asynchronous-processing.html">Here it is!</a><br />
<br />
<h2>Enhanced BPMN Support</h2>This release again enhances BPMN support. It is now possible to use<br />
<br />
<ul><li><a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-signal-events-signal-start-event">Signal Start Event</a></li>
<li><a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-cancel-and-compensation-events-compensation-end-event">Compensation End Event</a></li>
<li><a href="http://docs.camunda.org/latest/api-references/bpmn20/#events-cancel-and-compensation-events-compensation-start-event">Compensation Start event of Event Subprocess</a></li>
<li><a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations-of-multi-instance-activities">Enhanced support for Asynchronous Continuations for Multi Instance activities</a></li>
</ul><h2>Native support for File Variables in Api and Html Forms.</h2>We added native support for File Variables to the Java API, Rest API and in HTML Forms.<br />
<br />
Let's start with the forms. In a Form you can now easily allow a user to upload a file:<br />
{{< figure src="http://2.bp.blogspot.com/-kLkQjABXSTU/Vbob6lqRjkI/AAAAAAAADE8/IwFS2BX4lPI/s1600/file-upload.png" >}}
The corresponding html code would looks like this:<br />
<pre class="prettyprint"><code class="language-xml">&lt;input type="file"
       cam-variable-name="INVOICE_DOCUMENT"
       cam-variable-type="File"
       cam-max-filesize="10000000" /&gt;
</code></pre><br />
And download it (with the correct Filename):<br />
{{< figure src="http://3.bp.blogspot.com/-cdLtXZIZM6w/Vbob_Yg_LLI/AAAAAAAADFE/iFDGWELNtyI/s1600/file-download.png" >}}
The corresponding html code looks like this:<br />
<pre class="prettyprint"><code class="language-xml">&lt;a cam-file-download="INVOICE_DOCUMENT"&gt;&lt;/a&gt;
</code></pre><br />
Read more about File support Html Forms in the <a href="http://docs.camunda.org/latest/api-references/embedded-forms/#supported-html-controls-file-input-fields">Documentation</a>.<br />
<br />
In your Java code you can work with files using the new <code>FileValue</code> type:<br />
<pre class="prettyprint"><code class="language-java">public class ArchiveInvoiceService implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {

    // get file value using typed api
    FileValue invoiceDocumentVar = execution.getVariableTyped("INVOCE_DOCUMENT");

    InputStream content = invoiceDocumentVar.getValue();
    String filename = invoiceDocumentVar.getFilename();
    String mimeType = invoiceDocumentVar.getMimeType();

    // untyped api returns the InputStream only
    InputStream invoiceDocument = (InputStream) execution.getVariable("INVOCE_DOCUMENT");

    // create a new file variable:
    execution.setVariable("DOC", fileValue(new File("location/doc.pdf")));
  }

}
</code></pre>Find more details in the <a href="http://docs.camunda.org/latest/guides/user-guide/#process-engine-process-variables-file-values">Documentation</a>.<br />
<br />
File Support was a much requested feature by the community.<br />
<br />
We hope you enjoy this release!<br />
<br />
<h2>What's up next?</h2><br />
<ul><li>DMN, DMN, DMN, ... :)</li>
<li>We will continue to enhance the BPMN support by implementing BPMN Escalation,</li>
<li>Support for Tomcat 8,</li>
<li>Support for CMMN Repetition Rule,</li>
<li>As always, amazing things are happening in <a href="http://bpmn.io">bpmn.io</a>,</li>
<li>...</li>
</li>
</ul><br />

</div>