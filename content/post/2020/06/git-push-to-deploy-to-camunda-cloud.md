+++
author = "Josh Wulf"
categories = ["Community"]
tags = ["GitHub", "Use Cases", "Resources"]
date = "2020-07-23T11:00:00+02:00"
title = "Git push to deploy to Camunda Cloud"

+++

Using the [Zeebe Action for GitHub](https://github.com/marketplace/actions/zeebe-action), you can automate your GitHub repo to deploy BPMN models to Camunda Cloud when you push to a specific branch.

In this quick tutorial, I show you how to configure your GitHub repo to deploy all BPMN models in the bpmn directory of your repo on a push to master.

If you don’t have a Camunda Cloud account yet, you can [join the public beta](https://camunda.io/) to get one.

<!--more-->

{{< figure class="no-border teaser" src="zeebe-action.png" alt="Zeebe Action">}}

## Create a client in Camunda Cloud

* Go into your Zeebe cluster in the Camunda Cloud console, and create a new client. You might want to name it “GitHub-Automation” so you know what it is for.

* Copy the “Connection Info” block by clicking the copy icon in the lower right-hand corner.

{{< figure class="no-border teaser" src="connection-block.png" alt="Connection Info">}}

## Configure Secret in your GitHub repo

* In your GitHub repo, go to the repository settings Secrets configuration. Add a new Secret named `ZEEBE_CLIENT_CONFIG` and paste the Connection Info in there.

{{< figure class="no-border teaser" src="add-secret.png" alt="Add a new secret">}}

## Create a GitHub workflow to deploy models

* Create a file in your repo `.github/workflows/deploy-bpmn-from-master.yml`.

* Paste the following content:

```
name: Deploy Workflows

on:
  push:
    branches:
      - master
    paths:
      - 'bpmn/*'

jobs:
  deploy-workflows:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Deploy Updated Workflows
        uses: jwulf/zeebe-action@master
        with:
          clientConfig: ${{ secrets.ZEEBE_CLIENT_CONFIG }}
          operation: deployWorkflow
          bpmnDirectory: bpmn
```

* Commit the file.

## That’s it!

That’s all you need to do. You now have automation in your GitHub repo to redeploy your BPMN models when they are updated on the master branch of your repo.

The `paths` filter ensures that the deployment happens when the push to master includes a change to at least one model.

Zeebe will only create new versions for the models that were changed since the last deployment, so although the Zeebe Action will send all models in the `bpmn` directory to Camunda Cloud, only the updated models will get new versions deployed.

## What else is possible?

The Zeebe Action can start workflow instances in Camunda Cloud, and publish messages to Camunda Cloud - either to start a new workflow instance, or to be correlated with a running instance. For more ideas on what you can do with it, see the [Zeebe Action README](https://github.com/jwulf/zeebe-action).
