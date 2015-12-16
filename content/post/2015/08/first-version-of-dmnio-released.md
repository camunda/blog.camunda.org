---
title: "First Version of dmn.io Released"
date: "2015-08-06"
author: "Sebastian Stamm"

categories:
  - "Modeling"
tags: 
  - "Release Note"

aliases:
  - "/2015/08/first-version-of-dmnio-released.html"

---

<div>
Today we release the first version of dmn.io, our new DMN modeling toolkit. dmn.io allows you to view and model decisions with the DMN 1.0 standard directly on the web. The dmn.io library provides a viewer and an editor that can be embedded into web applications. With this release we provide the front-end element for the <a href="http://blog.camunda.org/2015/07/camunda-bpm-740-alpha-1-released.html" target="_blank">latest Camunda BPM 7.4.0 alpha release</a>, which introduced support for DMN.<br />
<br />
{{< figure src="http://1.bp.blogspot.com/-jD6HCODqujc/VcIRVI5erJI/AAAAAAAADUQ/OraFeNA2rzY/s1600/screencast.gif" >}}
<div style="background-color: #f4f6f4; border-radius: 3px; border: 1px solid #e4e6e4; margin: 30px auto; max-width: 500px; overflow: hidden;">
<h2 style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; float: left; margin: 0; padding: 15px; position: relative; text-align: center; width: 500px;">
<a href="http://camunda.org/dmn/demo/" style="display: block; font-size: 28px; line-height: 32px; text-align: center;">Try it out</a>   </h2>
</div>
<a name='more'></a><br />
<h2>
Under the Hood</h2>
dmn.io is build upon the work of the awesome <a href="http://bpmn.io/" target="_blank">bpmn.io framework</a>. Internally, dmn.io reuses a lot of the components that power the bpmn modeling toolkit. That means that if you know bpmn.io, you will feel at home with dmn.io!<br />
<br />
To get started, you only need a few lines of code:<br />
<br />
<pre class="prettyprint"><code class="language-javascript">var DmnViewer = require('dmn-js');

var viewer = new DmnViewer({ container: '#table' });

var table; // your dmn xml

viewer.importXML(table, function(err) {
  if (!err) {
    console.log('success!');
  } else {
    console.log('something went wrong:', err);
  }
});
</code></pre>
<br />
<br />
Check out some <a href="https://github.com/bpmn-io/dmn-js-examples" target="_blank">usage examples</a> we have put together.<br />
<br />
<h2>
It's Open Source!</h2>
dmn-js and a number of projects it is built with are <a href="https://github.com/bpmn-io/" target="_blank">published on GitHub</a>. We have licensed dmn-js as do whatever you want but keep the project logo in the viewer and released all other projects under the MIT license.<br />
<br />
Feel free to look inside the projects. It is never to early to contribute bug reports and feature requests! Note however that we are still in alpha stage. Because of that documentation may be lacking and APIs might break with future releases.<br />
<br />
<h2>
What's next?</h2>
<ul>
<li>More convenience (e.g. validation hints, typeahead in cells)</li>
<li>More support for DMN fundamentals (e.g. hit policy)</li>
<li>Better separation of IT and Business roles (hiding technical information for certain roles)</li>
<li>Authorizations (e.g. allow editing certain cells only)</li>
<li>Integration with Camunda Cockpit</li>
</ul>

</div>
