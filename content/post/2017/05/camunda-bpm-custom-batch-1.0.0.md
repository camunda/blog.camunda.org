+++
author = "Patrick Schalk"
categories = ["Community"]
date = "2017-06-02T17:50:23Z"
tags = ["Release Note", "Batch"]
title = "Camunda BPM Custom Batch 1.0.0 - new community extension"

+++

Have you ever tried to create an own custom batch with camunda? 
I did, it was very time consuming and complex, because there is not really some public api for this. 
You have to work at entity level, and take care that some batch configuration get's saved to ByteArray table.

That's why I've decided to create the [Camunda BPM Custom Batch](https://github.com/camunda/camunda-bpm-custom-batch) Extension. 

The goal of this camunda extension is to provide an simple way of using the camunda batch functionality for own purpose. 

If you have no clue what Camunda Batch is for, it could be used to split a huge workload (e.g. like reassigning all tasks) into small asynchronous jobs. 
See official camunda docs: [Camunda Batch](https://docs.camunda.org/manual/7.6/user-guide/process-engine/batch/)

<!--more-->

# So how does it work

First you have to define an own job handler which works on the batch junks. 
All the boilerplate stuff like creating batch jobs, 
saving and reading batch configuration will be done in the abstract CustomBatchJobHandler. 

You just have to extend the CustomBatchJobHandler and provide the following two methods:

```
@Component
public class PrintStringBatchJobHandler extends CustomBatchJobHandler<String> {
  @Override
  public void execute(List<String> jobData, CommandContext commandContext) {
      logger.info("Work on data: {}", jobData.get(0));
  }

  @Override
  public String getType() {
      return "print-string-batch-handler";
  }
}
```

You need a unique job handler type, and the business logic itself. 
JobData will be in the default configuration just contain one object, 
the size is configurable. (See invocationsPerBatchJob)

To notify the engine about this new job handler, it needs to be registered at startup of the engine.
The easiest way would be to use the CustomBatchHandlerPlugin which comes with the extension.

With spring boot this looks like this: 

```
@Bean
public ProcessEnginePlugin customBatchHandlerPlugin(PrintStringBatchJobHandler printStringBatchJobHandler) {
  return CustomBatchHandlerPlugin.of(Collections.singletonList(printStringBatchJobHandler));
}
```

Now we are almost done, at least you have to create the batch itself, which has to be done whenever you have some data to work on.
With default configuration this looks like this: 

```
 final Batch batch = CustomBatchBuilder.of(data) #List of Objects which should be processed
        .jobHandler(printStringBatchJobHandler)
        .create();
```

When calling create, the batch will be inserted and the job executor will start to work on the batch with it's next run.
So you see, not much work to get a running batch. 

The batch will also be shown in cockpits batch overview for monitoring or stopping it (Enterprise Feature!).

{{< figure class="main teaser no-border" src="cockpit_batch_overview.png" alt="Camunda Cockpit Batch Monitoring" caption="Batch Monitoring in Camunda Cockpit" >}}

# What comes next

There are a lot of ideas which are planned for the next versions:

- Provide possibility for using of a data collector class
- Provide a timer job for automatically triggering of batch creation
- Provide a service bean for creation of the batch (additionally to the builder)
- Provide helper utils to make the simplify testing
- And many more... 

# Last but not least

If you have any questions or ideas, feel free to contact me, or much more better, start contributing to the extension. :)

This is a guest post by [Patrick Schalk](mailto:patrick.schalk@holisticon.de).