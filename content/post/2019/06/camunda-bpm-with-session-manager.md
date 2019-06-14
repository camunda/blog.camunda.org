+++
author = "Lars Lange"
categories = ["Community"]
tags = ["Community", "Docker", "Kubernetes", "Cloud", "Tomcat", "Redis"]
date = "2019-06-14T09:00:00+01:00"
title = "Camunda BPM - Session Management in Cloud Environments"
+++

In the last few years we’ve noticed many of our users are migrating from bare-metal infrastructures to cloud-based ones. While the cloud has overcome several limitations of the traditional infrastructure, other problems arise when deploying your microservices in environments that have the possibility to scale up and down dynamically based on workload.

When deploying Camunda BPM, the first problem that you will encounter will be, most probably, session management.While this is easily solvable in traditional environments by using sticky sessions, the same solution does not apply when you deal with cloud environments like, Kubernetes. The reason is that sticky sessions do not behave well in dynamic environments since they expect the underlying infrastructure to be static.

Recently we’ve been working on a project which required us to be able to freely scale Camunda BPM to thousands of users and deal with peaks of traffic. In order to implement it efficiently, we had to modify the way Camunda BPM handles sessions by using a shared session manager.

In this article, we will explain the advantages of horizontal/vertical scaling and how we configured Camunda BPM to share user sessions across multiple instances in a cloud environment.

### Horizontal Scaling vs Vertical Scaling

**Vertical scaling** means that you assign more resources to an application/virtual machine/container.

**Horizontal scaling** means that you run add additional applications/virtual/machines/containers beside the one that is already running.

As you might know, vertical scaling has certain limitations and works well to a point from where  it just gets too expensive or impossible to continue.
Whereas horizontal scaling is the go-to in the era of cloud computing as it is cheap and quick to realize.

When it comes to Camunda BPM you’ll notice that assigning more resources will work to a certain degree, and adding another container running Camunda BPM is practically impossible without modifying additional infrastructure.

### Example Setup

As an example setup, we’ll be talking about a simple Kubernetes cluster that is running two Camunda BPM containers with Tomcat 9, which are connected to a PostgreSQL and a load balancer, like nginx, in front of it.

A minimal setup with docker-compose can be found [here](https://github.com/Langleu/cambpm-session-manager-example).

Currently, our requests would be served alternately by either Camunda BPM container, as they both keep their own sessions and don't know what the other container does.

With the default Dockerfile you will notice that you are constantly logged out.

### Options for a distributed Camunda BPM
In static infrastructures the quickest and easiest solution would be to use sticky sessions in our load balancer, which would then ensure that user A would always end up with container A, and B with B and so on.

As we strive to be a profitable company and we don't know how many users will access our services at a certain time, we don't want to run 100 containers just to be ready in case an unforeseen amount of people access it.

The solution to that problem is to deploy a session manager that takes care of managing the users' sessions and replications across all Camunda instances.

By using a session manager, the containers don't keep their own sessions anymore but outsource that to the session manager and only cache known sessions. If a user connects to the container, the session manager is checked for an existing session. If that doesn't exist it will create a new one and the user will keep an entry in their cookies to be uniquely identified.

### How To
Let's finally come to a more technical part and how to use all of this.

As we are using Tomcat we can benefit from [Memcached Session Manager](https://github.com/magro/memcached-session-manager). This takes care of the session management and can either be used with memcached or redis as database.

To be able to use redis and the session manager we have to copy some libraries into the lib folder of our Camunda BPM Tomcat container and update the context with a Manager configuration.

More precisely [Memcached Session Manager](http://repo1.maven.org/maven2/de/javakaffee/msm/memcached-session-manager/), [Memcached Session Manager Tomcat 9](http://repo1.maven.org/maven2/de/javakaffee/msm/memcached-session-manager-tc9/) and [Jedis](http://central.maven.org/maven2/redis/clients/jedis/) have to be placed in the /lib folder of the root container.

As an example we provide a Dockerfile that makes use of it:

```
FROM camunda/camunda-bpm-platform:tomcat-7.10.0

RUN wget http://central.maven.org/maven2/redis/clients/jedis/2.9.0/jedis-2.9.0.jar -P lib/ && \
    wget http://repo1.maven.org/maven2/de/javakaffee/msm/memcached-session-manager/2.3.2/memcached-session-manager-2.3.2.jar -P lib/ && \
    wget http://repo1.maven.org/maven2/de/javakaffee/msm/memcached-session-manager-tc9/2.3.2/memcached-session-manager-tc9-2.3.2.jar -P lib/

RUN sed -i '/^<\/Context>/i \
    <Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager" \
    memcachedNodes="redis://redis-proxy.db:22121" \
    sticky="false" \
    sessionBackupAsync="false" \
    storageKeyPrefix="context" \
    lockingMode="auto" \
    />' conf/context.xml
```

In the provided minimal setup we can now change the Dockerfile in `docker-compose.yml` to `Dockerfile.session` and after running `docker-compose up --build` you will notice that you remain logged in, no matter which container is serving your request.

To quickly explain some properties here:

`memcachedNodes="redis://..."` defines the redis endpoint. For redis only one endpoint is currently supported.

`sticky="false"` disables sticky session management. If you have multiple memcache nodes defined then the sessions will be distributed over your nodes. If you have sticky management enabled then the other nodes will act as a failover node and take over in case the primary node fails.

`sessionBackupAsync="false"` enables synchronous syncing between the tomcat instances and the database.

`storageKeyPrefix="context"` a prefix that is added to the session id, which is useful in case multiple web apps are sharing it.

`lockingMode="auto"` read request do not lock the session, only write requests do.

`requestUriIgnorePattern=".*\.(ico|png|gif|jpg|css|js)$"` while trying out this option we noticed that it doesn't work for Camunda BPM as the sessions were not properly tracked anymore.

For further information or explanation see the documentation of [Session Manager](https://github.com/magro/memcached-session-manager/wiki/SetupAndConfiguration#overview-over-memcached-session-manager-configuration-attributes).

### Serialization Options
<span style="color:red">
Disclaimer: We don't know whether using a different serialization has any side effects and wouldn’t recommended it be used in a production environment.
</span>

The session manager comes with inbuilt support for Java Serialization, which itself is already performant.

In case you’re interested in using a specific Serializer due to better performance,just copy the jars in `/camunda/webapps/camunda/WEB-INF/lib`, `/camunda/webapps/engine-rest/WEB-INF/lib` and add `transcoderFactoryClass="de.javakaffee.web.msm.serializer.$OPTION"`, where `$OPTION` is one of the options presented in the [documentation](https://github.com/magro/memcached-session-manager/wiki/SetupAndConfiguration#overview-over-memcached-session-manager-configuration-attributes) under `transcoderFactoryClass`, to the context manager.

An example can be found in the Dockerfile `Dockerfile.kryo` at the github repository linked earlier in the blog entry.

### Outlook
Before you noticed that you were constantly logged out and now, with the session manager, we stay logged in regardless of which container serves our request.
From here on you will be good to go and your Camunda BPM deployments will use the session manager to save and retrieve users sessions.
