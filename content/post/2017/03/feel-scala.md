+++
author = "Philipp Ossler"
categories = ["Community"]
date = "2017-03-14"
tags = ["DMN", "extension"]
title = "More FEEL for Camunda"
+++

I'm happy to announce the first release of the new community extension [FEEL-Scala](https://github.com/camunda/feel-scala). FEEL is a part of the DMN specification of the OMG and stands for "Friendly Enough Expression Language". It provides a simple data model and a syntax designed for a wide audience. The new community extension implements a large feature set of FEEL and replaces the default FEEL engine of the Camunda DMN engine.

<!--more-->

# Why another FEEL engine?

The Camunda DMN engine includes a [built-in FEEL engine](https://docs.camunda.org/manual/latest/reference/dmn11/feel/) which can be used for input entries of a decision table. Currently, this FEEL engine can not be used for other expressions (e.g., output entries, literal expressions) and only supports a limited set of data types and operators. 

The new community extension brings a completely new FEEL engine which has the goal to fill the gaps. It supports all data types, all operators, built-in functions and can be used for input entries (i.e., unary tests) and any other expression. So it might be interesting for applications that use DMN intensively to model complex decisions and especially for decision literal expressions.

# Why Scala?

[Scala](http://scala-lang.org/) is a modern, object-oriented and functional JVM language with a good Java interoperability. The new FEEL engine is written in Scala because it makes it very easy to build a [parser](https://github.com/camunda/feel-scala/blob/master/feel-engine/src/main/scala/org/camunda/feel/parser/FeelParser.scala) for the language (i.e., based on parser combinators). And personally, I really like Scala a lot ;-)

# How to use it?

If you use an embedded Camunda BPM engine then you can add the extension as dependency to your project POM: 

```xml
<dependency>
  <groupId>org.camunda.bpm.extension.feel.scala</groupId>
  <artifactId>feel-engine-plugin</artifactId>
  <version>1.0.0</version>
</dependency>
```

And register the process engine plugin in your configuration:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration">
    <property name="processEnginePlugins">
        <list>
           <bean class="org.camunda.feel.CamundaFeelEnginePlugin" />
        </list>
    </property>
</bean>
```

Or, if you use a shared Camunda BPM engine (i.e., Camunda distribution) then you can [download the extension plugin](https://github.com/camunda/feel-scala/releases/tag/1.0.0) _(feel-engine-plugin-1.0.0-complete.jar)_ and copy it to the library folder of your application server. Then, add the plugin to your process engine configuration (e.g., _conf/bpm-platform.xml_):

```xml
<process-engine>
    <plugins>
        <!-- other plugins -->    
        <plugin>
            <class>org.camunda.feel.CamundaFeelEnginePlugin</class>
        </plugin>
    </plugins> 
</process-engine>
```


# Example

Assuming you have two input variables `applicant` and `credit_history`:

```
applicant: {
    maritalStatus: "M",
    monthly: {
        income: 10000,
        repayments: 2500,
        expenses: 3000
    }
}
  
credit_history: [ 
    {
        record_date: date("2008-03-12"),
        event: "home mortgage",
        weight: 100  
    },
    {
        record_date: date("2011-04-01"),
        event: "foreclosure warning",
        weight: 150  
    } 
]
```

Then, you can evaluate the following FEEL expressions using the Camunda DMN engine with the FEEL-Scala extension:

```
applicant.monthly.income * 12                                            // 120000

if applicant.maritalStatus in ("M","S") then "valid" else "not valid"    // "valid"

sum( [applicant.monthly.repayments, applicant.monthly.expenses] )        // 5500

sum( credit_history[record_date > date("2011-01-01")].weight )           // 150

some ch in credit_history satisfies ch.event = "bankruptcy"              // false
```

See the complete example on [GitHub](https://github.com/camunda/feel-scala/blob/master/examples/src/test/scala/org/camunda/feel/example/spec/SpecExampleTest.scala).

# Additional Information

You can find more information about the FEEL engine, the integration in Camunda BPM and examples on [GitHub](https://github.com/camunda/feel-scala) and the [Wiki](https://github.com/camunda/feel-scala/wiki). 

# Contribute

Contributions in the form of code, bug reports and feature ideas are very welcome and can be made directly in the [feel-scala repository](https://github.com/camunda/feel-scala) on GitHub.
