+++
author = "Valentin Vago"
categories = ["Integration"]
date = "2017-01-05T13:00:00+02:00"
tags = ["Drupal"]
title = "Integrating Camunda and Drupal"
+++

Over the last days, I have worked on integrating Camunda into the latest version of Drupal.  
For the record, Drupal is an Open Source CMS powering a [large number of](https://w3techs.com/technologies/details/cm-drupal/all/all) [the top websites](https://trends.builtwith.com/cms/Drupal) available on the Internet.
Therefore it is reasonnable to assume that the combination of Camunda and Drupal is a possible scenario.
<!--more-->

# Goal

In this article, Drupal is used as a front-end for the invoice demonstration process (shipped with the Camunda BPM distribution).

{{< figure src="result.png" >}}

# Setup

## Camunda BPM platform

[Download the distribution](https://camunda.org/download) that fits your environment, unpack it and run (from within the extracted folder) `./start-camunda.sh`.

## Drupal 8

The [installation of the PHP CMS](https://www.drupal.org/docs/8/install) will not be covered here.
Once you have Drupal set and running, you will have to install the 2 following modules.

### Camunda BPM API module

The [camunda_bpm_api](https://www.drupal.org/sandbox/zeropaper/camunda_bpm_api) is aimed to abstract requests on the REST API of the Camunda BPM platform as a [Drupal service](https://api.drupal.org/api/drupal/core%21core.api.php/group/container/8.2.x).  
**Note:** This module is a slack time project, it is _by far_ not complete and is not officially supported by Camunda.

```
git clone --branch 8.x-1.x https://git.drupal.org/sandbox/zeropaper/camunda_bpm_api.git camunda_bpm_api
```

### Invoice demo module

This module is meant to provide forms for the invoice demonstration process.  
It is only relevant for this article and illustrates which parts of the integration is left to you to code.

```
git clone https://github.com/zeropaper/cam_invoice_demo.git cam_invoice_demo
```

## Settings

Navigate to the module administration page (_Extend_ in the admin menu), check the modules for installation and proceed.
Once the modules are activated, you should configure the camunda_bpm_api module and then (after) the cam_invoice_demo module.   
You will find the links to the configuration forms of the respective modules in the configuration section of administration.

# Give it a try

Simply go at '/invoice' in your Drupal site and fill the form.

# Under the hood

Since the camunda_bpm_api is installed, you can also use its services to perform requests on the platform REST API.

```php
$procDefService = \Drupal::service('camunda_bpm_api.process_definition');
```

Which can then be used to perform calls on the REST API like starting a process with the submit form

```php
$procDefService->submitStartForm($procDefId, $variables, $businessKey);
```
