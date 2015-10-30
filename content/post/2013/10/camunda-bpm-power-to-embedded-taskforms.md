---
title: "camunda BPM: Power to Embedded Taskforms"
date: "2013-10-07"
author: "Nico Rehwaldt"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/10/camunda-bpm-power-to-embedded-taskforms.html"

---

<div>
For everyone out there using <a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist-task-forms-embedded-task-forms">embedded task forms</a>&nbsp;in the&nbsp;<a href="http://docs.camunda.org/latest/guides/user-guide/#tasklist">camunda tasklist</a>&nbsp;there is great news:<br />
The forms are getting way more powerful.<br />
<br />
The upcoming alpha of camunda 7.1 introduces two extensions for embedded task forms: Client side form validation and form extensions via JavaScript.<br />
<a name='more'></a><br />
<h3>
Form Validation</h3>
<div>
<a href="http://docs.angularjs.org/api/ng.directive:input">Validation directives</a>&nbsp;provided by&nbsp;<a href="http://angularjs.org/">AngularJS</a>&nbsp;may now be attached to form fields to activate simple client-side validation constraints for them.<br />
<br />
The following form field will only accept one of the strings <span style="font-family: Courier New, Courier, monospace;">demo</span>, <span style="font-family: Courier New, Courier, monospace;">john</span>, <span style="font-family: Courier New, Courier, monospace;">mary</span><span style="font-family: Courier New, Courier, monospace; font-size: x-small;"> </span>or <span style="font-family: Courier New, Courier, monospace;">peter</span>&nbsp;due to the defined pattern:<br />
<br /></div>
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgb(204, 204, 204); box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 1.428571429; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;">&lt;input form-field type="string" name="assignee" </code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"><span style="color: #bf9000;">ng-pattern="/^(demo|john|mary|peter)$<span id="goog_340102718"></span><span id="goog_340102719"></span>/"</span></code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"> /&gt;</code></pre>
<br />
If a user enters an invalid value in a form field the field will be marked as invalid. Additionally the complete task button will be disabled and the form may not be submitted.<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-T89lLYPYfyc/UlJnP-lEAWI/AAAAAAAAAJU/FyshaXHFadg/s1600/form-validated.png" imageanchor="1" style="padding: 1em;"><img border="0" height="241" src="http://3.bp.blogspot.com/-T89lLYPYfyc/UlJnP-lEAWI/AAAAAAAAAJU/FyshaXHFadg/s400/form-validated.png" width="400" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">An invalid form</td></tr>
</tbody></table>
The validation state of both the form as well as single form fields may be queried through the variable <span style="font-family: Courier New, Courier, monospace;">variablesForm </span>that represents the form inside the scope of an embedded task form.<br />
<div>
<br /></div>
<div>
The following snipped is a valid form markup that renders the message <i>Your form contains errors!</i><br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div>
when the form itself is invalid. In addition, it renders a red&nbsp;<i>Not a valid user!</i> message to the user for specific validation problems of the assignee form field:</div>
<div>
<br /></div>
<div>
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgb(204, 204, 204); box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 1.428571429; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;">&lt;p </code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"><span style="color: #bf9000;">ng-if="variablesForm.$invalid"</span></code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;">&gt;
  Your form contains errors!
&lt;/p&gt;
&lt;p </code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"><span style="color: #bf9000;">ng-if="variablesForm.assignee.$invalid"</span></code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"> style="color: red"&gt;
  Not a valid user!
&lt;/p&gt;</code></pre>
<br />
<h3>
JavaScript Form Extensions</h3>
</div>
</div>
<div>
More complex validations may be performed using form script - JavaScript embedded into task forms. form script is injected into the task form context via a special <span style="font-family: Courier New, Courier, monospace;">&lt;script form-script type="text/form-script" /&gt;</span> tag:</div>
<div>
<br /></div>
<div>
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgb(204, 204, 204); box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 1.428571429; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;">&lt;input form-field type="string" name="approver" <span style="color: #bf9000;">ng-change="approverChanged()"</span> /&gt;

&lt;script form-script type="text/form-script"&gt;
  <span style="color: #bf9000;">$scope.</span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;"><span style="color: #bf9000;">approverChanged</span> </span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">= function(e) {</span>
    var formField = $scope.variablesForm.assignee, 
        value = formField.$modelValue;
        allowedNames = ['demo', 'john', 'mary', 'peter'];

    // value must be contained in allowed names
    if (allowedNames.indexOf(value) == -1) {
      value.$setValidity('validAssignee', false);
    } else {
      value.$setValidity('<span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">validAssignee</span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">', true);</span>
    }
  };
&lt;/script&gt;</code></pre>
<div>
<br /></div>
The above form script performs the same validation as the <span style="font-family: Courier New, Courier, monospace;">ng-pattern</span> directive but via JavaScript. To do that it registers a change listener on the form input that is attached to the forms <span style="font-family: Courier New, Courier, monospace;">$scope</span> inside the form script.</div>
<div>
<br /></div>
<div>
For even more elaborated use cases application services such as <span style="font-family: Courier New, Courier, monospace;">$http</span> may be injected into the form script. using the <span style="font-family: Courier New, Courier, monospace;">inject</span>&nbsp;callback. Given the <span style="font-family: Courier New, Courier, monospace;">$http</span> service backend validation may be performed for a form or its attributes:&nbsp;</div>
<div>
<br /></div>
<div>
<pre style="background-color: whitesmoke; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 1px solid rgb(204, 204, 204); box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: 13px; line-height: 1.428571429; margin-bottom: 10px; padding: 9.5px; white-space: pre-wrap; word-break: break-all; word-wrap: break-word;"><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;">&lt;script form-script type="text/form-script"&gt;

  </code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"><span style="color: #bf9000;">inject(</span></code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; color: inherit; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;">[ '$scope', '$http', function($scope, $http) {

    </code><code class="lang-html" style="background-color: transparent; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; border: 0px; box-sizing: border-box; font-family: Monaco, Menlo, Consolas, 'Courier New', monospace; font-size: inherit; padding: 0px; word-wrap: break-word;"><span style="color: #bf9000;">$scope.<span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">approverChanged</span></span><span style="background-color: transparent; color: black; font-size: inherit; line-height: 1.428571429;"> </span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">= function(e) {</span><span style="color: rgba(0, 0, 0, 0);">
     </span> var formField = $scope.variablesForm.<span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">assignee</span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">, </span>
          value = formField.$modelValue;

      <span style="color: #bf9000;">$http.get("...?<span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">assignee</span></span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;"><span style="color: #bf9000;">=" + value)</span>.success(function(data) {</span>
        if (data == "ok") {
          value.$setValidity('validAssignee', true);
        } else {
          value.$setValidity('<span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">validAssignee</span><span style="background-color: transparent; font-size: inherit; line-height: 1.428571429;">', false);</span>
        }
      });
    };
  }]<span style="color: #bf9000;">)</span>;
&lt;/script&gt;</code></pre>
</div>
<div>
Find all of this including an improved <a href="http://stage.docs.camunda.org/guides/user-guide/#task-forms" target="_blank">documentation</a>&nbsp;of embedded task forms in the next camunda BPM alpha release.</div>
<div>
<br /></div>
<div>
Power to the forms!</div>
</div>