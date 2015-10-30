---
title: "How to handle absent Assignees"
date: "2014-09-24"
author: "Jakob Freund"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/09/how-to-handle-absent-assignees.html"

---

<div>
<p>
<blockquote>"I want usertasks to be reassigned if the assignee is currently absent. How would I do this in Camunda?"
</blockquote>
</p>
<p>
As always, there is plenty of possible approaches to handle this situation. One of them begin a Task Listener. I created a little snippet that demonstrates how this can work: 
</p>
<p>
<a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/task-assignment-absence">Absence Manager Snippet on GitHub</a>
</p>
<p>
For those of you who don't want to build and deploy this demo application right away, there is also a little screencast below. 
</p>
<p>
<iframe src="//player.vimeo.com/video/107013859?title=0&amp;byline=0&amp;portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/107013859">How to handle absent Assignees</a> from <a href="http://vimeo.com/user22820658">camunda</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
</p>
</div>