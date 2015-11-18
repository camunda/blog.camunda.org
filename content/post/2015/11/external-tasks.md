+++
author = "Bernd Rücker"
categories = ["Execution"]
date = "2015-11-18T15:53:39+01:00"
tags = ["BPMN 2.0", "External Tasks"]
title = "External Tasks allows new Use Cases with Camunda BPM 7.4"
draft = true

+++

In a recent [Blog Post](http://www.bpm-guide.de/2015/04/10/from-push-to-pull-external-tasks-in-bpmn-processes/) I wrote about the difference that you might not want to actively call a Service when entering a BPMN Service Task (PUSH), but to create a task for an external worker who can retrieve and process it whenever he is ready (PULL). We got so many great feedback about this that we decided to support this pattern out-of-the-box in Camunda BPM 7.4. 

Let's have a look at an example (yes - we do have customers implementing video processing :-)):

{{< figure src="external-task-pattern.png" alt="External Task Pattern" caption="External Task Pattern">}}

In this case transcoding and uploading a video file can take ages. It is done by special software which often does not have a SOAP or REST API to call. So in this case it is much easier to make an External Task out of it:

{{< figure src="external-task-config.png" alt="External Task configuration using Camunda Modeler" caption="External Task configuration using Camunda Modeler">}}

You have to set a **topic name**. Compare this to messaging where you use Queue Names in order to send messages to somebody. This is the same as the topic name. If a worker wants to retrieve work he specifices the topic name he is interessted in. Retrieving work can be done by Java API or by REST API. The following example queries for transcoding tasks and completes them via REST API: 

```
$.ajax('http://localhost:8080/engine-rest/engine/default/external-task/fetchAndLock/', {
    data: JSON.stringify({
		"workerId":"worker01", // some unique name for the current worker instance
		"maxTasks":5,
		"topics": [
			{
				"topicName": "transcodeVideo",
				"lockDuration": 10000, // How much time the worker thinks he needs to process the task
				"variables": ["video"] // Which variables should be returned in the response (to avoid additional REST calls to read data)
			}
  	    ]
    }),
    contentType : 'application/json',
    type : 'POST',
    success: function (result) {
		for (var index = 0; index < result.length; ++index) {
			var externalTask = result[index];

			// Here the real work would be done!

			$.ajax(REST_BASE_URL + '/external-task/' + externalTask.id + '/complete', {
     			data: JSON.stringify( {"workerId":"worker01"} ),
     			contentType : 'application/json',
     			type : 'POST'
		    });
        }
	});
};
```

You can see the full example in this [HTML/JavaScript page](https://github.com/camunda/camunda-consulting/blob/master/one-time-examples/blog/external-task-example/src/main/webapp/index.html) simulating the two external workers.

{{< figure src="worker-java-script.png" alt="Simple Worker Simulation in JavaScript" caption="Simple Worker Simulation in JavaScript">}}

# More Information

You find more information:

* In the [complete executable source code](https://github.com/camunda/camunda-consulting/blob/master/one-time-examples/blog/external-task-example/) implementing the above process
* In the [User Guide](https://docs.camunda.org/manual/develop/user-guide/process-engine/external-tasks/)
* In the [REST API Reference](http://stage.docs.camunda.org/manual/develop/reference/rest/external-task/)


# Use Cases

I see actually a lot of use cases for External Tasks:

* **Temporal Decoupling (without the need for messaging)**: If you look at the pattern it basically replaces a JMS queue between a Service Task (Consumer) and the Service Implementation (Provider). So you do not need JMS any more when using the External Tasks! And we saw JMS being a pretty painful experience often.

* **Polyglott Architectures / Non-Java-Environments**: Assume you build a .NET based architecture it might not be that easy to write [Java Delegates]() to call your services. External Tasks make it easy to use Camunda via REST interfaces from any technology even for the Service Implementation

* **Better Scaling**: You can start/stop workers as you like - and run as much as you want of them. By doing so you can scale each Service Task (or to be precise: Each topic) individually.

* **Connect Cloud BPM to On Premise Servcies**: Imagine you run Camunda BPM somewhere in the cloud (as customers of us do), you can still have Services on-premise, as they can now query their tasks via REST over SSL, which is quite Firewall-friendly :-)

* **Avoid Timeouts**: In the transcoding example the procssing will take hours. So you could not synchronously call a service blocking for hours (as you will get transaction and connection timeouts). So you would need some asynchronous callback anyway. The External Task pattern makes this easier to handle.

So great times ahead - like always :-)

The External Task will be available with the upcoming [Camunda BPM 7.4](http://camunda.org/) release. Try it out and [let us know what you think of it!](https://camunda.org/forum/)