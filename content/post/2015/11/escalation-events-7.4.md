+++
author = "Niall Deehan"
categories = ["Execution"]
date = "2015-10-30T15:53:39+01:00"
tags = ["BPMN 2.0", "Events", "escalation events", "7.4"]
title = "Escalation Events in Camunda BPM 7.4"

+++

The humble escalation event has arrived to the Camunda process engine. 
Well actually there are technically 6 of them and while each is special in its own little way I’m going to give some examples of the most widely used ones. 


<div style="font-size:70pt" >{{< bpmn-icon name="start-event-non-interrupting-escalation" >}}
{{< bpmn-icon name="intermediate-event-catch-escalation" >}}
{{< bpmn-icon name="start-event-escalation" >}}
{{< bpmn-icon name="end-event-escalation" >}}
{{< bpmn-icon name="intermediate-event-throw-escalation" >}}
{{< bpmn-icon name="intermediate-event-catch-non-interrupting-escalation" >}}</div>

Escalation events act a lot like error events with one very important difference - 
You can throw an escalation event without interrupting the process instance. 
A good example of the usefulness of this event can be seen in the following model:


{{< bpmn-viewer name="escalation-events-7.4-camunda" >}}

This model describes a situation where someone needs to be made aware of an issue within the process. Specifically where processing is going to take too long, but we also don't want the process to stop.
By using the escalation throw event the item Procurement activity can continue while the non-interrupting escalation event catches the thrown escalation and passes it on for a parent pool to deal with. In this case someone needs to be informed of a late arival of goods. 

There's of course a lot of other ways to utilize escalation events. 
In the model below i'm using a non-interrupting start event within an event subprocess.


{{< bpmn-viewer name="escalation-event-subprocess" >}}

This means that an escalation can be raised any time within the process and then caught and delth with my the event subprocess without halting the main process itself. 
So go forth and escalate things with Camunda 7.4!

