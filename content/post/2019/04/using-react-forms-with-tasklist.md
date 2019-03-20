+++
author = "Martin Stamm"
draft = false
categories = ["Community"]
tags = ["Tasklist", "React"]
date = "2019-04-10T08:00:00+01:00"
title = "Using React Forms with Tasklist"
+++

Camunda's Tasklist is excellent when you have user tasks and don't want to use or build a custom solution. Embedded Forms offer great flexibility when it comes to designing user interfaces. In recent years, React became one of the most popular libraries for building user interfaces. In this blog post, I will show you how to use React forms together with Tasklist.

<!--more-->

Let's take a look at our process first: an Invoice is received and has to be reviewed. We will focus on the Initial Invoice Form and the User Task, the implementation of the automated Tasks using the Camunda Workflow Engine is pretty straight forward.

{{<figure src="diagram.png" alt="The Invoice Process">}}

We will be using embedded Forms for our tasks. After adding React as a custom script to Tasklist, we can start creating our interface. I won't be using JSX for this example, so you can quickly deploy it without transpiling it. Let us begin with a simple field to display values:

```javascript
class DisplayGroup extends React.Component {
  render() {
    return e('div', {className: 'form-group'}, [
      e('label', {className: 'control-label col-md-4', key: 'label'}, this.props.label),
      e('div', {className: 'col-md-6', key: 'container'},
        e('input', {
          className: 'form-control',
          value: this.props.value,
          readOnly: true
        }))
      ]);
  }
}
```

This stateless component uses bootstrap classes for styling. If we want to display multiple values, say the amount and the creditor of the invoice, we can instantiate it numerous times. For example, you could build a form accordingly:

```javascript
e(DisplayGroup, {
  label: 'Amount: ',
  value: this.props.amount.value,
  key: 'Amount'
}),
e(DisplayGroup, {
  label: 'Creditor: ',
  value: this.props.creditor.value,
  key: 'Creditor'
}),
e(DisplayGroup, {
  label: 'Invoice Category: ',
  value: this.props.category.value,
  key: 'Category'
}),
e(DisplayGroup, {
  label: 'Invoice Number: ',
  value: this.props.invoiceID.value,
  key: 'InvoiceID'
}),
e('label', {className: 'control-label col-md-4', key: 'ApprovalLabel'}, 'I approve this Invoice'),
e('div', {className: 'col-md-6', key: 'ApprovalContainer'},
  e('input', {
    className: 'form-control',
    name: 'approved',
    type: 'checkbox',
    checked: this.state.value,
    className: 'form-control',
    onChange: this.handleInputChange
  })
)
```

Below our input fields, I added a controlled component to handle user input. As we have to decide whether to approve this invoice or not, a simple checkbox is enough. These few lines of code already generate most of the final approval form. I just added a heading and got to the final result.

{{<figure src="approval_form.png" alt="The Invoice Approval Form">}}

As you can see, using a Framework like React in Tasklist is not only possible but pretty easy as well.
If you want to learn more about further input types, feel free to check out the [sourcecode](https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-react) which is available on Github.

If you get stuck at any point, do not hesitate to raise questions in our [community forum](https://forum.camunda.org/).
