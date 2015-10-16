---
title: "Camunda meets Cassandra @Zalando: Community Meeting Write-up"
date: "2015-03-11"
author: "Daniel Meyer"

categories:
  - "Community"
tags: 
  - "Release Note"

aliases:
  - "/2015/03/camunda-meets-cassandra-zalando.html"

---

<div>
Jorn Horstman, André Hartmann and Lukas Niemeier from Zalando Tech visited us yesterday evening to present their prototype for running Camunda engine on Apache Cassandra.<br />
They published their <a href="https://docs.google.com/presentation/d/1fvo9doqffDoR96yeat_wZNusQFacXi0GgF0kV4_mAbQ/edit?usp=sharing">slides</a>.<br />
<br />
Zalando is a "<em>multinational e-commerce company that specialises in selling shoes, clothing and other fashion and lifestyle products online</em>". 2014 they had a revenue of €2.3 billion and currently have 8,500 employees (Source: <a href="http://en.wikipedia.org/wiki/Zalando">Wikipedia</a>). AND: they are Camunda enterprise edition subscribers and use Camunda process engine for processing their orders. Whenever you buy something in their online shop, a process instance is kicked off in Camunda process engine.<br />
<br />
<h2>Zalando's current Architecture</h2><br />
Zalando's system needs to scale horizontally.<br />
<br />
Currently Zalando's order processing runs on PostgreSQL database. They partition their order and process engine data over <strong>8 Shards</strong>. Each shard is an independent instance of PostgreSQL. Such an "instance" is a small cluster with replication for performance and failover.<br />
<br />
At the application server level they run on Apache Tomcat and use the Spring Framework. For each shard, they have a datasource for which they create an instance of camunda process engine. This is replicated over 16 nodes. When a new order comes in, it is assigned to one of the shards and an entry is made in a global mapping table, mapping orderIds to shards. Then the corresponding process instance is stated in that shard.<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-8JE-ZyH2y2s/VP_8DaW0nOI/AAAAAAAABp4/AgwKlI7g_fQ/s1600/current_architecture.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-8JE-ZyH2y2s/VP_8DaW0nOI/AAAAAAAABp4/AgwKlI7g_fQ/s1600/current_architecture.png" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Zalando's current Architecture</td></tr>
</tbody></table><br />
When messages come in, they are first correlated to an order. When the order is resolved, they can deduce the responsible shard for the order and resolve the corresponding process engine.<br />
<br />
They say that this works quite well but has some drawbacks:<br />
<ul><li>They need to implement the sharding themselves,</li>
<li>The mapping table needs to be maintained,</li>
<li>Queries must be done against all of the shards and data must be aggregated manually.</li>
</ul><br />
In the context of their "Hackweek", they looked into Apache Cassandra as an alternave.<br />
<br />
<h2>The Cassandra Prototype</h2><br />
Over the course of a week, they built a protoype where they exchanged the relational DB persistence layer in Camunda with an alternative implementation based on Cassandra.<br />
They say that they wanted to<br />
<ul><li>Learn more about Cassandra</li>
<li>Get a better understanding of the Camunda DB structure</li>
</ul><br />
Their Goal was not to run this in production (yet).<br />
<br />
<a href="https://github.com/zalando/camunda-meets-cassandra">The source code of their prototype is on GitHub</a>.<br />
<br />
They provide an <a href="https://github.com/zalando/camunda-meets-cassandra/blob/master/src/main/java/de/zalando/hackweek/bpm/engine/impl/db/CassandraPersistenceSession.java">alternative implementation</a> of Camunda's <a href="https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/main/java/org/camunda/bpm/engine/impl/db/PersistenceSession.java">PersistenceSession</a> interface.<br />
<br />
In their prototype, they replicated Camunda's relational model in Cassandra. They had a table for executions in which each execution became a row, they had tables for variables, tasks etc. They did this on purpose since they wanted to start with a naive implementation and then learn from that.<br />
<br />
During development they used a setup where they multiplexed the persistence session and executed all statements both on an SQL database and cassandra in order to be able to enhance support progressively while always having a working system.<br />
<br />
As a result, they can execute simple processes.<br />
<br />
<h2>Lessons Learned</h2><br />
After they presented their prototype, we discussed the lessons learned. We focused on the core process execution usecase, not on complex monitoring or task queries and things like that, assuming those usecases could be implemented on top of a dedicated search database such as elasticsearch into which data in fed from the execution cluster in near real time.<br />
<br />
<ul><li>Copying the relational data model is problematic. A single process instance is composed of many entities, if they are stored as multiple rows in different tables,</li>
<ul><li>Data related to a single process instance is distributed accross the cluster. This does not match the process engine's access pattern: often all data related to a process instance must be read or updated. If data is distributed, the network overhead is considerable.</li>
<li>Without transactional guarantees we cannot make changed to multiple rows in different tables atomically.</li>
</ul><li>Eventual consistency: Cassandra keeps multiple copies of a data item. When making changes, you can configure whether you want to wait for all copies of a particular data item to be updated or whether one of the copies is enough or whether you need something in between (quorum, etc...). After some discussion, we concluded that the process engine would require to update all copies with most write operations.</li>
</ul><br />
It would be better to keep data related to a single process instance together in one row inside a single table. Then we could update it atomically, reading and updating it would entail minimal network overhead. In addition, we could require write operations to wait for all copies of the data they change to be updated.<br />
<br />
From this the following model results:<br />
<ul><li>Data of a single process instance is kept in one row.</li>
<li>If the process engine does an update to the row, it must first <em>lock</em> it. Conceptually, this could be a logical lock based on a retry mechanism.</li>
<li>If the row is updated / deleted, the operation must be performed on all updates. (Forfeiting the A in the context of P).</li>
</ul><br />
Consequences: No intra-process instance concurrency (concurrency inside a single process instance) involving different process engine instances (a single process engine can still lock the row, do things in multiple threads, join the operations and do one atomic update, releasing the lock).<br />
<br />
Discussing all of this was a lot of fun! <a href="https://network.camunda.org/meetings/">More Meetings are scheduled</a>
</div>