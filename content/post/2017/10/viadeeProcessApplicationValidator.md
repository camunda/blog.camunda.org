+++
title = "viadeeProcessApplicationValidator"
date = "2017-10-24"
author = "Sascha Di Bernardo"
categories = ["Community"]
tags = ["BPMN 2.0", "Tooling", "BPMN Validation", "Model-Code Inconsistencies", "Check", "viadee"]
+++

Are you an avid user of BPMN2.0 and camunda-based process applications? Are you also spending hours of debugging when your code does not fit the process model? 

If you feel adressed by now, we might have something to help you out. We developed a tool that is able to check your BPMN process model and its underlying implementation for congruency. 

Integrated in your CD/CI pipeline you'll be able to find inconsistencies in the early stages. The viadeeProcessApplicationValidator can also help implementing process applications in your local IDE.

{{< figure src="output1.PNG" alt="bpmn.io" title="Error highlighting of critical elements" >}}

## Features/Checkers
| Checker                                                                              | Summary                                                                  |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------   |
|Java Delegate Checker                                         | Is the implementation (Java class or Spring bean reference) available and usable?                  |
|Dmn Task Checker                                                   | Is the referenced DMN table available?                                                        |
|Embedded Groovy Script Checker                         | Is the script available and is its syntax correct?                                                        |
|Process Variables Name Convention Checker     | Do variables in the process context adhere to desired naming conventions?                                           |
|Task Naming Convention Checker                         | Do task names in the model adhere to desired naming conventions?                                          |
|Versioning Checker                                             | Do java classes implementing tasks fit a versioning scheme?                                      |
|Xor Naming Convention Checker                           | Are XOR gateways ending with e.g. "?". Conventions are configurable.                                     |
|No Script Checker                                                 | Is there any script in the model?                                                              |
|Element Id Convention Checker                           | Do task ids in the model adhere to desired naming conventions?                                           |
|Timer Expression Checker                                   | Are time events following the ISO 8601 scheme?                                                       |
|No Expression Checker                                   | Are expressions used as referenced task implementation? Expressions should only be the last resort.     |
|Process Variables Model Checker  (Experimental)                     | Are process variables in the model provided in the code for all paths?                       | 


## Get Started
In order to provide ease of use, the viadeeProcessApplicationValidator can be integrated as a Maven dependency and executed as JUnit test. For demonstration purposes we forked the [Camunda BPM examples](https://github.com/viadee/camunda-bpm-examples/) to demonstrate the easy integration of vPAV. 

### Maven
You can start the validation by adding the dependency to your local projects POM.xml. 
```xml
<dependency>
  <groupId>de.viadee</groupId>
  <artifactId>viadeeProcessApplicationValidator</artifactId>
  <version>...</version>
  <scope>test</scope>
</dependency>
```

### JUnit
We recommend to configure a JUnit-4 test and start the validation by calling the ModelConsistencyTest.
```java
import de.viadee.bpm.vPAV.ProcessApplicationValidator;
...
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { SpringTestConfig.class })
public class ModelConsistencyTest{
        
    @Autowired
    private ApplicationContext ctx;   
    
    @Test
    public void validateModel() {
        assertTrue("Model inconsistency found. Please check target folder for validation output",
                ProcessApplicationValidator.findModelErrors(ctx).isEmpty());
    }
}

```
Note, that the Validator receives the Spring context. Thereby, the validation can
check referenced beans and their names.

## Configuration
The viadeeProcessApplicationValidator provides a file called ruleSetDefault.xml, which is a basic configuration. By creating and storing a ruleSet.xml in your local project, you are able to use your very own set of rules. This allows you to de-/activate certain checkers or specify naming conventions, etc.

### One set of rules to rule them all
If you want to manage more than one project at a time, it might be of use to have a parent set of rules. All projects inheriting from your parent project will use the same set of rules. But beware, local rules will override and therefore allow maximum customization. 

### Exclusion of false positives
With the creation of a file called **.ignoreIssues** you can whitelist known issues by listing their respective IDs, so they don't break your build. 

**Example**
```
# Comment 
8d04f2e77a7d282c521098ab947ac060
```

## Output
The result of the check is first of all a direct one: if at least one inconsistency is found on the ERROR level, it will break your build or count as a failed unit test which will break your build too.

Further, the consistency check will provide an XML version, a JSON version and a visual version based on  [BPMN.io](https://bpmn.io/) (see above) for all errors and warnings that have been found. 

### Visual Output
With the visual output you will be able to identify errors and warnings at a glance. Highlighting all elements that contain at least a warning and providing a comprehensive list that will let you find and eradicate errors in less than no time and get your build back up and running.

{{< figure src="output.PNG" alt="error list" title="List of critical elements with respective message" >}}

## Contributing to the community version of the viadeeProcessApplicationValidator
The viadeeProcessApplicationValidator has been developed as open-source software by employees of the [viadee Unternehmensberatung GmbH](https://bpm.viadee.de), a German IT consulting company located in Cologne and Münster, who support their customers in Camunda and software development projects.

If you want to extend our software, check out our [Git repository](https://github.com/viadee/vPAV) and feel free to contribute your own ideas. 
For further questions, remarks or feedback do not hesitate to contact us:

[Benedikt Uckat](mailto:bpm@viadee.de)

[Claus-Alexander Usener](mailto:Claus-Alexander.Usener@viadee.de)
