+++
author = "Niall Deehan"
categories = ["DMN"]
date = "2016-12-15T14:00:36+02:00"
tags = ["DMN", "DRD", "DRG", "Decision Tables", "Tutorial"]
title = "How to chain decisions with DRDs"
+++

# Happy Birthday DMN

DMN has proven to be a very popular and well adopted standard for describing and executing business rules. It's uptake among Camunda users alone has been very impressive, especially considering it's a standard that's only about a year old. It's popularity has given us the perfect excuse to implement even more elements of the standard. In fact since we first started to support it, we've been asked about when we intend to implement DRDs (Decision Requirements Diagram). With the release of Camunda 7.6 we've done just that. This post is simply a way of showing how to use DRDs and is especially relevant if you're already familiar with DMN tables. 

# Assignment Use Case
DMN has become a common way of solving a variety of "assignment" use cases. Whereby depending on certain criteria particular individuals are determined to be the most viable candidates for some kind of mission. Without it, who knows you could end up sending a telephone sanitiser to cut hair. Disastrous! 

Let's take a slightly more universal assignment process as an examples. What are the influencing factors for determining if - for instance - a certain consultant is sent to work on a certain project. Well in my wisdom I've decided they are as follows:

1. Project Complexity
2. Is it a Priority Project 
3. Programming Language used. 

This makes for a pretty easy table. 

{{<figure src="assignConsultantTable.JPG" alt="Assign Consultant to Project">}}

But if we look closely at this table we have some questions we might need clarification on:

1. What exactly does this complexity score mean?
2. What factors contribute to the complexity score?
3. Who or what decides if a project is a priority
4. Why do the consultants have such odd names?

 This is where we can consider using DRDs in order to brighten up the corners a bit. Giving us a visual overview of how all of these variables are created and related to choosing the right consultant. 

# Creating a DRD

So if we've got a perfectly good DMN table, how would you go about creating a DRD for it? Well luckily enough there is a gray button on the top right of the Camunda Modeler, it says - in big friendly letters - "Show DRD". That will bring you straight into the DRD editor. 

{{<figure src="drdEditor.JPG" alt="DRD editing">}}

It's import to know that on a technical level you're actually still editing the same XML file - the only difference is that you can now add multiple decisions and define relationships. There are also some non-executable elements we can add to help with our understanding of the decision, like Input Data and Knowledge Sources. 

{{<figure src="inputData.JPG" alt="Input Data">}}

But the real reason we arrived here is to help answer some of the questions addressed earlier. It turns out that the complexity score is actually  (as the name may have suggested) a relatively complex decision that requires knowing the project length as well as the location. So we're going to need to add a new table to the DRD and express how the result of this new table is a requirement in order to assign a consultant. 

{{<figure src="drdWithComplexityScore.JPG" alt="Added complexity score table">}}

If you've noticed the green icons on the top left corner of each table and been wondering what they're doing there, i shall keep you in suspense no longer. By clicking that button you're brought back the Decision table editor. In the case of the newly created "Decide Project Complexity Score" table it will bring us to a shiny new table and so I'll just go ahead and create the rules for it. 

{{<figure src="complexityScoreTable.JPG" alt="complexity score table details">}}

The nice thing about all this is of course that now we've defined two DMN tables as well as their relationship within the same XML file. This of course means that we can call the "Assign Consultant to Project" decision knowing that it will first call the "Decide Project Complexity Score" table. We can ALSO call the "Decide Project Complexity Score" table independently, because each table is treated as an individual artifact and in fact are even versioned independently. 

But we're not quite finished yet because we still need to work out why any a given project may be a priority or not. To ensure you suffer no ill affects from suspense as you await an answer... i shall go ahead and tell you. If it's where VIP customer has a project that we consider an interesting use case. 
This is a far to simple evaluation for us to require a whole DMN table to address it - so I'm going to use a "Decision Literal Expression". This is a newly supported part of the DMN standard, you can create and edit them using the Camunda Modeler and execute them using the Engine. To create this expression just need to morph a table object to an expression.

{{<figure src="DRDliteralExpression.JPG" alt="DRD with a literal expression">}}

In this case if you click on the green icon you're brought to the Literal Expression editor where we can provide the out variable name, the variable type, the expression language and the expression itself. 


{{<figure src="literalExpression.JPG" alt="Create a literal expression">}}

# Let evaluate this!

So our next step is to simply deploy this DRD to the engine so that we can evaluate some decisions. I'm just going to use the [REST API, which can be used to deploy](https://docs.camunda.org/manual/latest/reference/rest/deployment/post-deployment/) any of the 3 standards the engine implements. 

Once it's deployed you can once again use the REST API to evaluate the table [REST API to evaluate the table](https://docs.camunda.org/manual/7.6/reference/rest/decision-definition/post-evaluate/)

```POST http://localhost:8080/engine-rest/decision-definition/key/AssignConsultant/evaluate ```

I also need to add the following JSON variables as a payload

```
{
  "variables" : {
    "location" : { "value" : "Europe", "type" : "String" },
    "projectMonths" : { "value" : 42, "type" : "Integer"  },
    "vipCustomer" : { "value" : true, "type" : "Boolean"  },
    "newUseCase" : { "value" : true, "type" : "Boolean"  }, 
    "programingLanguage" : { "value" : "Java", "type" : "String"  }
  }
}
```
and our result is:

```
{
	"consultantName": {
	"type": "String",
	"value": "Dirk Gently",
	"valueInfo": {}
}
},
  {
	"consultantName": {
	"type": "String",
	"value": "Ford Prefect",
	"valueInfo": {}
}
},
  {
	"consultantName": {
	"type": "String",
	"value": "Douglas Adams",
	"valueInfo": {}
}
}
```

It'll also be nice to know that you can always check out how your decisions have been evaluated form cockpit. In cockpit you'll see the individual history of each table as well as a diagram displaying the history of all evaluations for DRDs. 

{{<figure src="DRDinCockpit.JPG" alt="Create a literal expression">}}

Hopefully this has been useful in trying to help you understand, create and evaluate DRDs. For more information feel free to browse through [The Camunda Docs on the subject](https://docs.camunda.org/manual/latest/reference/dmn11/). Which goes into a lot more detail in every facet of the implementation.

So long - and thanks for all the fish. 


