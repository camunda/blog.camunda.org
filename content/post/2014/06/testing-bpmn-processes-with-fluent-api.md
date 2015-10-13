---
title: "Testing BPMN processes with fluent assertions: Awesome!"
date: "2014-06-03T09:01:00+02:00"
author: "Daniel Meyer"

categories:
  - "Development"
tags: 
  - "BPMN"
  - "community-extensions"
  - "testing"

aliases:
  - "/2014/06/testing-bpmn-processes-with-fluent-api.html"

---

<div>
Sometimes this topic comes up in the <a href="https://groups.google.com/forum/#!topic/camunda-bpm-users/8j-ZrGW4LM4">camunda BPM foums</a> and I cannot stress &amp; highlight this enough! :)<br />
<br />
Writing test cases for your BPMN processes is a vital part of good process implementation. However, writing good, maintainable testcases can be cumbersome because you may have to write a lot of boilerplate code and the resulting testcases are often hard to read and understand.
As a community extension,&nbsp;<a href="https://github.com/plexiti/">Martin Schimak</a> has developed a fluent and well readable API, <a href="https://github.com/camunda/camunda-bpm-assert">camunda BPM assert</a>:<br />
<br /></div>
<div>
<script src="https://gist.github.com/meyerdan/bf50168b1661a0792d9e.js"></script>
</div>
<div>
<br /></div>
<div>
Awesome, right? Using the Api frees your test code of a lot of boilerplate details, makes it easy to read and maintain. Without <a href="https://github.com/camunda/camunda-bpm-assert">assert</a>, that same testcase would look like this:</div>
<div>
<br />
<div>
<script src="https://gist.github.com/meyerdan/d900eb368a026e12dc1a.js"></script></div>
<div>
<br /></div>
<div>
<br />
From a project management perspective, the project is very mature (it is the result of almost two years of on and off discussion and prototyping)&nbsp; and <a href="https://github.com/camunda/camunda-bpm-assert/blob/master/camunda-bpm-assert/README.md">well documented</a> and is <b>recommended for heavy usage in any camunda BPM project!</b> :)</div>
<div>
<br /></div>
<div>
Enjoy.</div>
</div>
