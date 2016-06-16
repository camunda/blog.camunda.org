+++
author = "Philipp Ossler"
categories = ["Community"]
date = "2016-06-16"
tags = ["BPMN 2.0"]
title = "Email Integration for Processes"
+++

Since emails are a common form of communication, processes may also interact with them. For example an order process can start when a new order is received via email or an email is sent at the end which contains an invoice. The extension [camunda-bpm-mail](https://github.com/camunda/camunda-bpm-mail) makes it easy to integrate emails in a process and interact with them.

<!--more-->

It provides three [connectors](https://docs.camunda.org/manual/latest/reference/connect/) which can be used inside a process as service tasks to

* send mails,
* poll mails,
* delete mails.

Using these connectors, you can build a pizza order process which is based on email communication:

{{< figure src="pizzaOrderProcess.png" >}} 

First, the process polls the emails with the orders from the server. For each email, it starts the subprocess and creates a user task for making the pizza. When the pizza is made, it sends a confirmation email to the customer and deletes the email with the order.

To build this example, you don't have to write any additional code for email interaction!

# How to use it

The quickest way to get started is to [embed the extension](https://github.com/camunda/camunda-bpm-mail#install) in your project:

1. Add the extension as dependency to your POM:

    ```xml
    <dependency>
      <groupId>org.camunda.bpm.extension</groupId>
      <artifactId>camunda-bpm-mail-core</artifactId>
      <version>1.0.0</version>
    </dependency>
    ```

2. Create a properties file _mail-config.properties_ which contains the [configuration](https://github.com/camunda/camunda-bpm-mail#how-to-configure-it) of the mail server. You can find some example configurations on [GitHub](https://github.com/camunda/camunda-bpm-mail/tree/master/extension/core/configs). 

3. Add a connector to your process:

  * Open your process with the Camunda Modeler
  * Select a service task
  * Choose _Connector_ as Implementation in the Properties Panel
  * Switch to the _Connector_ tab and set the id of the connector (e.g., mail-send) - see the [Connectors Overview](https://github.com/camunda/camunda-bpm-mail#send-mails)
  * Add input parameters to configure the connector 
  * Add output parameters to store the result in a process variable (e.g., polled mails)  

    The XML of your service task may look like: 
  
    ```xml
    <bpmn:serviceTask id="ServiceTask_00zf1ut" name="send mail">
      <bpmn:extensionElements>
        <camunda:connector>
          <camunda:inputOutput>
            <camunda:inputParameter name="to">customer@mail.com</camunda:inputParameter>
            <camunda:inputParameter name="subject">Confirmation</camunda:inputParameter>
            <camunda:inputParameter name="text">Your pizza is on the way!</camunda:inputParameter>
          </camunda:inputOutput>
          <camunda:connectorId>mail-send</camunda:connectorId>
        </camunda:connector>
      </bpmn:extensionElements>
      <!-- ... -->
    </bpmn:serviceTask>
    ```

Now, you are ready to run the process!

# Additional Information

You can find more information about the connectors and the configuration on [GitHub](https://github.com/camunda/camunda-bpm-mail). The repository also contains [examples](https://github.com/camunda/camunda-bpm-mail#examples) and an another way to [react on incoming emails](https://github.com/camunda/camunda-bpm-mail#react-on-incoming-mails).

# Contribute

Contributions in the form of code, bug reports and feature ideas are very welcome and can be made directly in the [camunda-bpm-mail repository](https://github.com/camunda/camunda-bpm-mail) on GitHub.
