---
title: "Get your Tasklist as RSS Feed"
date: "2014-01-14"
author: "Jakob Freund"

categories:
  - "Execution"
tags: 

aliases:
  - "/2014/01/get-your-tasklist-as-rss-feed.html"

---

<div>
I don't like watching my Tasklist all day. <a href="http://blog.camunda.org/2013/10/how-to-send-email-when-usertask-is.html">Getting email notifications for tasks that I should complete</a> is nice, but sometimes I don't want to complete the task right after being notified but still need to keep in mind there is something pending.<br />
<br />
This is how I came to create a simple PHP script that exposes my tasks as an RSS Feed.  I can use that in my personal master dashboard (Microsoft Outlook) to keep track of my camunda Tasklist. Here is the result:<br />
<br />
<iframe allowfullscreen="" frameborder="0" height="331" mozallowfullscreen="" src="//player.vimeo.com/video/84108834?title=0&amp;portrait=0" webkitallowfullscreen="" width="500"></iframe>

<h2>Huh wow, how did I do that?</h2>
I used the <a href="http://camunda.github.io/camunda-bpm-php-sdk/">camunda BPM PHP SDK</a> plus 40 lines of code. You can find them here:<br />
<br />
<a href="https://github.com/camunda/camunda-bpm-php-sdk/blob/examples/example/oop/tasklistrss/index.php">Tasklist RSS Sources</a><br />
<br />
<br />
</div>