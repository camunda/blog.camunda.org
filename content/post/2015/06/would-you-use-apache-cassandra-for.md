---
title: "Would you use Apache Cassandra for Camunda persistence?"
date: "2015-06-15"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/06/would-you-use-apache-cassandra-for.html"

---

<div>
I am currently planning a hack session with people who are interested in using <a href="http://cassandra.apache.org/">Apache Cassandra</a> as database for Camunda Process engine.<br />
Their main motivation for supporting us is that their whole application is running on Apache Cassandra and they want to use Cassandra as persistence provider for their workflows as well.<br />
They have extensive experience with Cassandra and want to contribute their work as open source.<br />
<br />
If the hacksession which will take place at the beginning of July is successful, we would setup a public repository on GitHub were the community could collaborate around this.<br />
<br />
<a href="https://tech.zalando.com/blog/camunda-meets-cassandra-at-zalando/">I have blogged about our friends at Zalando doing work in that direction as well.</a><br />
<br />
Would more people be interested in being able to use Apache Cassandra as persistence provider for Camunda?<br />
If true, maybe you can provide some feedback of the following questions:<br />
<ol><li>Why do you want to use Apache Cassandra and not a relational Database like PostgreSQL?</li>
<li>Which parts of the process engine Api would you use with Cassandra? BPMN Workflow Execution, Task Management, History...?</li>
<li>In which situations would you be willing to compromise on consistency?</li>
</ol><br />
If you have any comments on this, please get in touch with us by commenting here or pinging me on twitter <a href="https://twitter.com/meyerdan">@meyerdan</a>.<br />
<br />

</div>