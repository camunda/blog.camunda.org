---
title: "Rendering BPMN and highlight current task using bpmn.io"
date: "2015-08-06"
author: "Bernd Rücker"

categories:
  - "Modeling"
tags: 
  - "Release Note"

aliases:
  - "/2015/08/rendering-bpmn-and-highlight-current.html"

---

<div>
With bpmn.io and the Camunda REST API it is really simple to develop a small HTML page that displays a process instance grafically and highlights some activities. In our "<a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/" target="_blank">JSF Simple Tasklist</a>" snippet we used this to highlight the current Task (like it is done in the Camunda BPM Tasklist):<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="https://raw.githubusercontent.com/camunda/camunda-consulting/master/snippets/jsf-simple-tasklist/diagram.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="408" src="https://raw.githubusercontent.com/camunda/camunda-consulting/master/snippets/jsf-simple-tasklist/diagram.png" width="640" /></a></div>
<br />
<br />
<a name='more'></a><br />
<br />
The cool thing - you do not need a lot of code to do this! This is what we do:<br />
<ul>
<li>Handed over the taskId via URL parameter (see Screenshot).&nbsp;</li>
<li>Load the <a href="http://docs.camunda.org/latest/api-references/rest/#task-get-single-task" target="_blank">Task details</a> and <a href="http://docs.camunda.org/latest/api-references/rest/#process-definition-get-bpmn-20-xml" target="_blank">BPMN XML</a> via REST API.</li>
<li>Instantiate the BPMN viewer and hand over the XML for rendering</li>
<li>Add a CSS class for the activity to be highlighted</li>
<li>Load JavaScript/CSS dependencies, we used <a href="http://www.webjars.org/" target="_blank">WebJars</a>, so they are added to our Maven build in a versioned way</li>
</ul>
<div>
This is the required JavaScript Code:<br />
<pre class="Prettyprint"><code language="javascript">
$(document).ready(function() {
    var restAccess = '/engine-rest';
    var BpmnViewer = window.BpmnJS;
    var viewer = new BpmnViewer({container: '#diagramCanvas', width: '100%', height: '100%'});
    var container = $('#js-drop-zone');
    // get the diagram
    $.get(restAccess + '/task/#{taskBean.id}', function(marker) {
      $.get(restAccess + '/process-definition/' + marker.processDefinitionId + '/xml', function(data) {
        // show it in bpmn.io
        viewer.importXML(data.bpmn20Xml, function(err) {
          if (err) {
            console.log('error rendering', err);
          } else {
            var canvas = viewer.get('canvas');
            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
            container.removeClass('with-error')
                 .addClass('with-diagram');
            // add marker
            canvas.addMarker(marker.taskDefinitionKey, 'highlight');                  
          }
        });
      });
    });
});

</code></pre>
You can see the full JSF page here:&nbsp;<a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/webapp/app/taskDetail.xhtml" target="_blank">taskDetail.xhtml</a>. There you can also see the JavaScript libararies we loaded - all available via WebJars by the way.<br />
<br />
Note that it does not have to be JSF - a simple HTML page does the trick as well, as you can see in&nbsp;<a href="https://github.com/camunda/camunda-consulting/blob/master/snippets/jsf-simple-tasklist/src/main/webapp/app/taskDetail.html" target="_blank">taskDetail.html</a>. Or you can embedd all this in the tooling of your choice :-)<br />
<br />
Great stuff - thanks to the <a href="http://bpmn.io/about/" target="_blank">bpmn.io Team</a> for the good work!</div>

</div>