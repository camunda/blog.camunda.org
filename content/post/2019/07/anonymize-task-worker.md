---
author: "Ingo Richtsmeier"

categories:
  - "Execution"

tags:
  - "data reduction"
  - "history customization"

title: "How to Anonymize Task Worker Data"
date: 2019-07-25T10:00:00+02:00

---

I recently got into a discussion about saving user ids of task workers in the database. During the last releases the Camunda Engine got very good in [capturing all actions that are done in the Cockpit and in the Tasklist](https://docs.camunda.org/manual/7.11/user-guide/process-engine/history/#user-operation-log). This is nice for revisions, but some companies, especially in Germany, don't want to track down every activity to an individual.

There is a need to anonymize the work done by task workers: The group manager should not easily analyze who is the best of his team as all team members should be judged equally.

In the lifecycle of a user task, you create the task with a candidate group and then a user claims the task and he becomes the assignee. And when he has finished his work and completes the task, the process will continue. This is all recorded in the history, on the task and in the user operations log.

As the best way to protect data and prevent data abuse is data reduction, I looked for a way to keep the user Id out of the history tables.
{{<figure src="operations-log-cockpit.png" alt="user operations log" title="User Operations Log in the Cockpit">}}

### A task listener is not sufficient
To remove the assignee from the history tables, my first approach was to use a task listener on the complete event to set the assginee to null.

With the help of my JUnit test, I saw that the listener will remove the user id from the TaskHistory, but the engine records a USER_OP_LOG as well. And the listener invocation is recorded here: The change in task_assignee from user Id to null is recorded. So, the user id is trackable, although it's removed from the task history.

### Custom history level
After this surprise I tried to tweak the user operations log with a custom history level. It's quite easy as you can see from this example: [https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/custom-history-level](https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/custom-history-level)

But it is too coarse-grained. You can only remove all user operation log entries from the database. This will include the Cockpit operations as well.

### A custom history event producer helps
After a chat with the product team, they told my about the `DefaultHistoryEventProducer`, which can be subclassed to achive my goals. The implementation is straight forward: The `DefaultHistoryEventProducer` offers a lot of methods for all kind of events to collect some data for the history. With this implementation you can only filter the assignee from the task history and the user operation log.

```java
package com.camunda.consulting.anonymize_user_task_data.history;

import org.camunda.bpm.engine.history.UserOperationLogEntry;
import org.camunda.bpm.engine.impl.history.event.HistoricTaskInstanceEventEntity;
import org.camunda.bpm.engine.impl.history.event.HistoryEventType;
import org.camunda.bpm.engine.impl.history.event.UserOperationLogEntryEventEntity;
import org.camunda.bpm.engine.impl.history.producer.DefaultHistoryEventProducer;
import org.camunda.bpm.engine.impl.oplog.UserOperationLogContext;
import org.camunda.bpm.engine.impl.oplog.UserOperationLogContextEntry;
import org.camunda.bpm.engine.impl.persistence.entity.PropertyChange;
import org.camunda.bpm.engine.impl.persistence.entity.TaskEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AnonymizeTaskWorkerHistoryEventProducer extends DefaultHistoryEventProducer {

  private static final Logger LOGGER = LoggerFactory.getLogger(AnonymizeTaskWorkerHistoryEventProducer.class);

  @Override
  protected void initUserOperationLogEvent(UserOperationLogEntryEventEntity evt, UserOperationLogContext context, UserOperationLogContextEntry contextEntry,
      PropertyChange propertyChange) {
    super.initUserOperationLogEvent(evt, context, contextEntry, propertyChange);
    if (UserOperationLogEntry.CATEGORY_TASK_WORKER.equals(contextEntry.getCategory())) {
      LOGGER.debug("Anonymize UserOperation Event {}", evt);
      evt.setUserId(null);
      if (evt.getProperty().equals(TaskEntity.ASSIGNEE)) {
        LOGGER.debug("anonymizing assignee");
        evt.setOrgValue(null);
        evt.setNewValue(null);
      }
    }
  }

  @Override
  protected void initTaskInstanceEvent(HistoricTaskInstanceEventEntity evt, TaskEntity taskEntity, HistoryEventType eventType) {
    super.initTaskInstanceEvent(evt, taskEntity, eventType);
    LOGGER.debug("Anonymize TaskInstance Event {}", evt);
    evt.setAssignee(null);
  }
}
```

Now I could even drop the listener.

{{<figure alt="anonymized user operation log" src="anonymized-op-log-cockpit.png" title="Anonymized User Operation Log">}}

You can find the complete example in [our GitHub repository](https://github.com/camunda-consulting/code/tree/master/snippets/anonymize-user-task-data).

It's packaged as process engine plugin and easy to intall on every platform.