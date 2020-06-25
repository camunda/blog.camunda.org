+++
author = "Bernd Rücker"
categories = ["Community"]
tags = ["BPMN", "DMN"]
date = "2020-06-25T09:00:00+02:00"
title = "How to make coffee with BPMN and DMN"

+++

By chance I stumbled over the blog post [Draw your daily routine if you want to learn about workflow diagramming](https://medium.com/@zsofideaz/draw-your-daily-routine-if-you-want-to-learn-about-workflow-diagramming-7827077b768c) from [Zsofia Herendi](https://medium.com/@zsofideaz?source=post_page-----7827077b768c----------------------). She did a great post on how hard it actually is to understand real-life processes — and that drawing diagrams helps.

<!--more-->

_The real thinking behind was that I really want to show you that creating workflow diagrams is a very useful thing and can help you oversee everything basically. […] Every single time I’ve faced with any problem at work throughout this past 15 years it helped me a lot to start drawing._

When I saw this diagram, I immediately started to post-process it in my mind:

{{< figure class="no-border teaser" src="daily-routine.png" alt="Daily Routine Workflow" >}}
_Daily routine workflow from [medium.com/@zsofideaz/draw-your-daily-routine-if-you-want-to-learn-about-workflow-diagramming-7827077b768c](https://medium.com/@zsofideaz/draw-your-daily-routine-if-you-want-to-learn-about-workflow-diagramming-7827077b768c)_

This is a habit I developed working on process automation/workflow engine projects. This diagram is a great prototype of typical requirements you get in the context of process automation projects.

In order to make this workflow executable, you basically need to:

* Clarify the scope of automation.
* Separate decision rules from control flow.
* Model the workflow in an executable notation.

Let’s do this exercise quickly in this post (if for nothing else, you can learn how my brain works &#128521;).

## Scope of automation
Let’s imagine you need to build an application supporting the daily routine (OK, maybe even I wouldn’t automate my daily routine, but let’s assume it for the sake of the argument).

This is most possibly not about the automation of the tasks itself, so no dog walking robot and no WIFI-enabled automated coffee machine. It is much more about the automation of the control flow, hence a workflow engine could steer the workflow, letting participants know what happens next. In this case, the only participant is you (and probably your spouse).
That means a workflow engine will probably get your alarm set at the right time automatically, and use a slack-bot to chat with you about what you should do next:

RoutineBot: _“Hey, it is later this morning. Get up and get the dog out for a short walk please.”_

You: _“Done”_

RoutineBot: _“Great. Thanks! Dog seems to be happy. Now please feed the dog.”_

You get the idea. Workflow engines nowadays really often hide behind a user interface that is not the classical task list people think about when they hear ‘workflow engine’. I know real-life projects actually using a slack-bot. So the scope of automation is the control flow, the sequence of tasks, not the tasks itself.

## Separate decision logic from process logic

Now, an even more interesting aspect. As soon as I read the diagram, I immediately saw that it was hard to understand because it mixes decision logic (which days constitute a workday?) with process logic (what happens on workdays?).
You can use [the DMN standard](https://camunda.com/dmn/) to express rules in a decision table. I quickly drafted this table:

{{< figure class="no-border teaser" src="daily-routine-2.png" alt="Process Logic Table" >}}

The beauty of this table is that it is directly executable. You could even [use online simulators](https://camunda.com/dmn/simulator/) to type in required input and get a result back.

There are different ways of designing that table. You could even split it up into multiple tables. You could decide it should contain more information (like the drinks you want to have) or less. The table structure typically settles after a round of discussion and implementing a first runnable prototype.

Either way, the rules are now separated from the process flow. They are clearly expressed in one place. If they are wrong, you can easily adjust them. If, for example, you feel like changing the drinks for Tuesday only, it is easy to do. And as soon as you captured that new rule in the decision table, you can simply deploy it. The rules do scale. In this case they might be rolled out to your spouse too, and you do not even have to talk to them! (OK, I exaggerate).

This also simplifies the workflow diagram, as we will see shortly.

## Model the workflow in an executable notation

Now there is the point where I don’t agree with Zsofia:

___Shapes are just shapes.___  
_Don’t stress too much about using the right shape that UML prescribes for us. You can use anything with what you can best express your thoughts. Also, simpler and more generic shapes are available everywhere, you don’t need specific flow charting products for it._

I am much in favor of having a standardized notation, a lingua franca of processes and workflows, which is the [ISO standard BPMN](https://camunda.com/bpmn/). BPMN diagrams are still easy to read, as they only contain boxes and arrows. But the semantics are clearly defined and the notation can be [executed directly on a workflow engine](https://www.youtube.com/watch?v=sHgf_EsQzfc).

But I agree with Zsofia, that this should not stand in the way of getting started, so it can be a second step after an initial business analysis. Still, a business analyst should know these tools, to be able to prepare a process diagram for automation.

The resulting process might look like this:

{{< figure class="no-border teaser" src="workflow.png" alt="Workflow" >}}

I could more or less directly execute this on a workflow engine, I simply would need to program the Slack-bot integration. Unfortunately, I have to continue writing my book and exhausted my procrastination time for today.

## Conclusion

I hope you could see that:

* Extracting rules as a decision table makes the rules more explicit and simplifies the process.
* Using BPMN can help to create a more readable diagram, for example because there are clear semantics around activities and events, concepts mixed up in typical visio charts, making people think too much.
* Everything can be automated easily &#128522;
* BPMN and DMN are executable models that [foster business IT collaboration](https://blog.bernd-ruecker.com/bizdevops-the-true-value-proposition-of-workflow-engines-f342509ba8bb?source=collection_detail----45ecc32678df-----1---------------------).

But now I really need to go back to work.

Bernd’s book -  _Practical Process Automation_ - will be available for early access around September. In the meantime, some of our Camundos shared their favourite ‘everyday automation’ diagrams:

Here’s Developer Advocate [Niall Deehan’s](https://twitter.com/NiallDeehan) morning routine:

{{< figure class="no-border teaser" src="daily-routine-3.png" alt="Workflow" >}}

And Consultant [Nele Uhlemann’s](https://twitter.com/nele_lea) Cheese Fondue:

{{< figure class="no-border teaser" src="workflow-2.png" alt="Workflow" >}}

Got an interesting ‘everyday automation’ diagram? [Share it with us on Twitter](https://twitter.com/Camunda) - we love seeing what you’re automating with BPMN!
