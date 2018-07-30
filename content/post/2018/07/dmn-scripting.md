+++
title = "Scripting with DMN inside BPMN"
description = ""
date = "2018-07-13T09:00:00+01:00"
author = "Philipp Ossler"
categories = ["Community"]
tags = ["DMN"]
+++

In Camunda, you can use scripts at different places of a process. For example, inside a Script Task, as an execution/task listener, as a condition expression on a sequence flow or inside an input/output mapping. Usually, the scripts are written in JavaScript, Groovy or JUEL.

Using the [FEEL extension](https://github.com/camunda/feel-scala), it is also possible to write scripts in FEEL (Friendly Enough Expression Language) which is a part of the DMN specification.

<!--more-->

# Why should I care about it?

Some highlights of FEEL are:

* date and time calculations
* useful list operations (e.g. filter, projection, all/at-least-one-test)
* a lot of built-in functions 
* Camunda Spin integration

If you already use DMN then you are more or less familiar with FEEL. So you can use this knowledge to write scripts also in BPMN. 

In general, it can be nice to have only one expression language for both: BPMN and DMN. This makes it easier to understand and modify the process and the involved decisions.

# Example

Assuming that you have the following order process

{{< figure src="order-process.png">}}


and the data model

```javascript
class Order {
  private String id;
  private Date date;
  private List<OrderItem> items = new ArrayList<OrderItem>();
}

class OrderItem {
  private String id;
  private double price;
  private String status;
  private boolean inStock;
}
```

when you can implement the script task, the conditions and the multi-instance expression using the following FEEL expressions:

* Check if all items are available:

```javascript
every item in order.items satisfies item.status = "available"
```

* Calculate the total price:

```javascript
sum(order.items.price) 
```

* Select the items to fetch (as input parameter):

```javascript
(order.items[not(isInStock)]).id
```

* Check if the processing took more than 3 days:

```javascript
now() - order.date > duration("P3D")
```


Note that the expressions works in both cases: if the variable `order` is a regular Java object (i.e. default serialization) and if it is a Camunda Spin JSON object. You don't need to transform the variable or use Spin in the expressions itself.

# How to use it?

**With the Camunda distribution**

* download the JAR from [Github](https://github.com/camunda/feel-scala/releases/tag/1.5.0) (_feel-engine-plugin-1.5.0-complete.jar_) 
* copy it to the _lib_ folder of the Tomcat server
* add the plugin to the process engine configuration (_conf/bpm-platform.xml_)

```xml
<process-engine>
    <plugins>
        <!-- ... -->    
        <plugin>
            <class>org.camunda.feel.CamundaFeelEnginePlugin</class>
        </plugin>
    </plugins> 
</process-engine>
```

**With an embedded Camunda engine**

* add the extension as dependency to your project POM 

```xml
<dependency>
  <groupId>org.camunda.bpm.extension.feel.scala</groupId>
  <artifactId>feel-engine-plugin</artifactId>
  <version>1.5.0</version>
</dependency>
```

* register the plugin in your process engine configuration

```xml
<bean id="processEngineConfiguration" 
 class="org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration">
    <property name="processEnginePlugins">
        <list>
           <!-- ... -->
           <bean class="org.camunda.feel.CamundaFeelEnginePlugin" />
        </list>
    </property>
</bean>
```

# Additional Information

You can find more information about the FEEL engine, the integration in Camunda BPM and examples on [GitHub](https://github.com/camunda/feel-scala) and the [Wiki](https://github.com/camunda/feel-scala/wiki). 
