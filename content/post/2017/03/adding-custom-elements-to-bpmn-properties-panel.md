+++
author = "Vinod Louis"
categories = ["Modeling"]
date = "2017-03-30T12:09:03+05:30"
tags = ["BPMN 2.0", "Tooling", "properties-panel"]
title = "Adding custom elements to bpmn properties panel"

+++

Extending bpmn properties panel to add custom elements.

# Goal

In this article We will try to add an custom element to the bpmn properties-panel under General tab for service task type component. To be precise under the General tab under details sections If implementation type is selected as Java class a text box appears below, where user is expected to enter the java class but our goal is to replace the text box by an combo box where the option will be populated externally with JSON/API data.

{{< figure  src="goal.png" alt="Converting implemnetation type java class input to select from text" caption="Converting implemnetation type java class input to select from text" >}}

## pre-requisite

If you are not aware of how to bundle bpmn-properties panel then please go through the [bpmn-properties documentaion.](https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel)  

## Implementation

Get the base source code from the [bpmn-properties-repository](https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel). Once you install the dependencies you will get all under *node_modules*. The important one is [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel) which contains all the implementation of the properties panel.

By navigating to `lib/provider/camunda` you can see the file [CamundaPropertiesProvider.js](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/provider/camunda/CamundaPropertiesProvider.js) where aggreagtion of all tabs displayed under porperties panel, by following its require files it can be easily understood that text-box displayed under general tab details sections when implementation type is class is an result of the file under `/lib/provider/camunda/parts/implementation` as [Delegate.js](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/provider/camunda/parts/implementation/Delegate.js)

Once we get the file is not straight forward to edit it into an select box as it's been used as generic file for various implementation, consider our goal we want select box only to be when implementation type is java class else show this textbox as it is. From here we have two ways to add our select box.

1. We can add one more var as  `var delegateEntrySelect` with all code in same file and return in array. 
2. Create separate file adjacent to Delegate.js and use it in [ServiceTaskDelegateProps.js](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/provider/camunda/parts/ServiceTaskDelegateProps.js) where all service task component are pushed into. 

For modularity purpose we shall stick to #2 New file. Let say our file name is `DelegateSelect.js` under same location `/lib/provider/camunda/parts/implementation` code as below

```

'use strict';

var entryFactory = require('../../../../factory/EntryFactory'),
    cmdHelper    = require('../../../../helper/CmdHelper'),
    domQuery = require('min-dom/lib/query'),
    $ = require("jquery")
var DELEGATE_TYPES = [
  'class',
  'expression',
  'delegateExpression'
];

var PROPERTIES = {
  class: 'camunda:class',
  expression: 'camunda:expression',
  delegateExpression: 'camunda:delegateExpression'
};

function isDelegate(type) {
  return DELEGATE_TYPES.indexOf(type) !== -1;
}

function getAttribute(type) {
  return PROPERTIES[type];
}

function getDelegationLabel(type) {
  switch (type) {
  case 'class':
    return 'Java Class';
  case 'expression':
    return 'Expression';
  case 'delegateExpression':
    return 'Delegate Expression';
  default:
    return '';
  }
}

module.exports = function(element, bpmnFactory, options) {

var getImplementationType = options.getImplementationType,
  getBusinessObject     = options.getBusinessObject;

var delegateEntrySelect = entryFactory.selectBox({
	id: 'delegateSelect',
	 label: 'Value',
	selectOptions: [
	  {value:"one",name:"one"},{value:"two",name:"two"}
	],
	modelProperty: 'delegate',
	emptyParameter: false,

	get: function(element, node) {
      var bo = getBusinessObject(element);
      var type = getImplementationType(element);
      var attr = getAttribute(type);
      var label = getDelegationLabel(type);
      return {
        delegate: bo.get(attr),
        delegationLabel: label
      };
    },

	set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var type = getImplementationType(element);
      var attr = getAttribute(type);
      var prop = {};
      prop[attr] = values.delegate || '';
      return cmdHelper.updateBusinessObject(element, bo, prop);
    },

	validate: function(element, values, node) {
	  return isDelegate(getImplementationType(element)) && !values.delegate ? { delegate: 'Must provide a value' } : {};
	},

	disabled: function(element, node) {
	  //TODO Disabled condition
	}
});   

 return [ delegateEntrySelect];
};

```

Basically its the code borrowed from the `Delegate.js` file, few keys points here to note is:

* We have replaced textField by **entryFactory.selectBox** with its *get* and *set* method.
* Model Property name is same here i.e **delegate**.
* under disabled condition there is nothing because we will come to that later in discussion where it makes more sense.

## Plug into Tab Elements

Once we have file ready we need it to now cue into the tab details section navigate to file  [ServiceTaskDelegateProps.js #Line60](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/provider/camunda/parts/ServiceTaskDelegateProps.js#L60) you can see the entry `group.entries.concat(delegate(element, bpmnFactory,..`. The traditional Delegate.js file is imported at top and used here similarly we need to import our newly created file DelegateSelect.js and implement it in similar manner.

Initially for all the options [class,delegate,Expression] it was textbox being displayed but now we want our select box to be displayed only when implementaion type is class else we always need the regular textbox to be displayed. Now the disabled condition left in the above file *TODO section* makes sense. first let use see how to cue the selectbox inside the group entry

Inside `ServiceTaskDelegateProps.js ` lets first import the file and then push the Delegate Select item.

```
var delegateSelect     = require('./implementation/DelegateSelect');
```   

Now its time to push the component into group array its make sense to push before the Delegate code #Line60 thus we get the select box in the desired loaction like this 

```
group.entries = group.entries.concat(delegateSelect(element, bpmnFactory, {
    getBusinessObject: getBusinessObject,
    getImplementationType: getImplementationType,
    hideDelegateSelect: function(element, node) {
      return getImplementationType(element) !== 'class';
    }
}));
```

Here above I have passed one more option as **hideDelegateSelect** which will hide this component based on the condition if implementaion type is not class, Now its time to add it into the `DelegateSelect.js` file. Two things to take care of first we need to get the option and then write the implementaion for disabled function

```
	var getBusinessObject     = options.getBusinessObject;
```

and the implementaion of function as 

```
disabled: function(element, node) {
    if (typeof hideDelegateSelect === 'function') {
        return hideDelegateSelect.apply(delegateEntrySelect, arguments);
    }
}
```

Similarly we also need to change condition for textField to not display on value class else we will have select box and text both to do that changes in `ServiceTaskDelegateProps.js` as:

```
group.entries = group.entries.concat(delegate(element, bpmnFactory, {
    getBusinessObject: getBusinessObject,
    getImplementationType: getImplementationType,
    hideDelegateText: function(element, node) {
      return getImplementationType(element) === 'class';
    }
}));
```

To handle **hideDelegateText** inside `Delegate.js` 

```
	var hideDelegateText = options.hideDelegateText;
```

and the implementaion of function as 

```
disabled: function(element, node) {
	if (typeof hideDelegateText === 'function') {
		return hideDelegateText.apply(delegateEntry, arguments);
	}
}
```

At this point in time if your `grunt auto-build` was running successfully you will now see that when under service task you select implementation type as class, An select box will be displayed for other implementation type it will be text box. Everything seems quite well but inside select box we have values [one,two] which doesn't make much sense, So lets populate the values dynamically from an API call.

## Dynamically passing value to Select Box

We will leverage the `setControlValue` attribute from [selectFactory](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/factory/SelectEntryFactory.js#L86) To do so we need to do some changes inside `DelegateSelect.js` file as floows :

1. Need to change value of **selectOptions** from list to **function** as we see the function being called.
2. We need to add one more property as setControlValue to true to register it as dynamic rendering value component.

```
selectOptions: function(element, node) {
    var arrValues = []
    $.ajax({
        url: 'http://localhost:XXXX/XXXX/XX/XX', //any url
        method :"GET",
        success: function (result) {
          //result = ["com.my.class1","com.my.class2","com.my.class3"]
            result.forEach(function(ele){
              arrValues.push({name:ele,value:ele})
            })
         },
        async: false
    });
      return arrValues;
},
setControlValue :true
```

I have used $ because of the import statement added above as :

```
var $ = require("jquery");
```

So now whenever selectOptions is called a server call is resolved and the value is passed back to select factory to populate inside component. So is everthing wrks well you will get your custom select box autopopulated with the values returned from the server as :

{{< figure  src="result.png" alt="Dynamic values passed to select box" caption="Dynamic values passed to select box" >}}

# Summary

In this post I showed how to add custom element to the bmpn properties panel as select box and pass dynamic options to it. While doing this task I faced quite a few problems which I posted on [forum](https://forum.camunda.org/t/changes-to-delegate-entries-under-servive-task-for-bpmn-properties-panel-not-getting-updated-on-ui/3171). But then I got the answers by understanding the camunda code itself to hide the elemets I just followed [resultVariale.js](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/provider/camunda/parts/ServiceTaskDelegateProps.js#L68) and to pass dynamic options I followed [inputOutputParameter.js](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/master/lib/provider/camunda/parts/implementation/InputOutputParameter.js#L345) to reach the solution.