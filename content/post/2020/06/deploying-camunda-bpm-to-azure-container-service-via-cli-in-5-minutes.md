+++
author = "Rob Emsbach"
categories = ["Community"]
tags = ["BPM","Cloud"]
date = "2020-06-04T09:00:00+02:00"
title = "Deploying Camunda BPM to Azure Container Service via CLI in 5 Minutes"

+++

This article shows the fastest way to get a [Camunda BPM](https://camunda.com/) server running on Microsoft Azure with command line usage. You should be comfortable with using a command-line interface (CLI), otherwise please switch to my blog “[Anyone can run Camunda BPM on Azure in 10 Minutes](https://blog.camunda.com/post/2020/05/anyone-can-run-camunda-bpm-on-azure-in-ten-minutes/)”.

The resulting server will be suitable as a (shared, insecure) playground accessible via the internet. It is [not a secure setup suitable for production usage](https://docs.camunda.org/manual/latest/user-guide/security/). A technical operator setting up a production system would certainly approach things differently and possibly choose different Azure services.

<!--more-->
## Azure Access

To deploy anything on Microsoft Azure you obviously require an [Azure account](https://azure.microsoft.com/en-us/free/). If you do not already have one, the sign-up is easy and usage during the first 12 months or within an initially granted 200 USD budget is free. If required, register for an account.

## Azure Command-line Interface

The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/what-is-azure-cli?view=azure-cli-latest) is “a set of commands used to create and manage Azure resources”. We can use a local installation or an [Azure Cloud Shell](https://azure.microsoft.com/en-us/features/cloud-shell/). Any of the three options will work for the few Azure CLI commands we need.

## Locally installed CLI

If you would like to run the CLI on your own environment run the command suitable for your operating system:
Mac: _brew update && brew install azure-cli_

Linux with Apt or WSL: _curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash_

Win: _Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; rm .\AzureCLI.msi_

Docker: _docker run -it mcr.microsoft.com/azure-cli_

or see the full installation instructions [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

After successful installation it should be possible to login from the command-line using _az login_

{{< figure class="no-border teaser" src="Azure-CLI-Login-from-WSL-Bash-Shell.png" alt="Azure CLI Login from (WSL) Bash Shell" caption="Azure CLI Login from (WSL) Bash Shell" >}}

{{< figure class="no-border teaser" src="Azure-CLI-Login-from-Windows-PowerShell.png" alt="Azure CLI Login from Windows PowerShell" caption="Azure CLI Login from Windows PowerShell" >}}

Requiring a local installation and updates could be considered a minor disadvantage. A small benefit, compared to the following cloud shell alternatives, is that local CLI usage does not require cloud storage.

## Cloud Shell
A cloud shell can be opened embedded into the Azure portal. Login at https://portal.azure.com, then use the __Cloud Shell__ button next to the search bar on the top to open a shell window at the bottom of the page.

{{< figure class="no-border teaser" src="Cloud-Shell-Option-within-the-Azure-Portal.png" alt="Cloud Shell Option within the Azure Portal" caption="Cloud Shell Option within the Azure Portal" >}}

The same cloud shell window is also available standalone under https://shell.azure.com/

## Azure File Share
When the cloud shell is used for the first time, a file share suitable for the usage of the shell can easily be created automatically. Just click __Create Storage__. If required, the advanced settings can be used to control subscription, region, resource group, storage account, or to select an existing storage account. The automatic setup will create these entities for you.

{{< figure class="no-border teaser" src="Azure-Cloud-Shell-File-Share-Creation-advanced-Options.png" alt="Azure Cloud Shell - File Share Creation, advanced Options" caption="Azure Cloud Shell - File Share Creation, advanced Options" >}}

## PowerShell or Bash
When you proceed with the file share creation, Azure will create the file share setup, configure your cloud shell to use it, and open a new cloud shell using [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-7) ([Quickstart](https://docs.microsoft.com/en-us/azure/cloud-shell/quickstart-powershell)). However, Azure also supports [Bash](https://www.gnu.org/software/bash/) ([Quickstart](https://docs.microsoft.com/en-us/azure/cloud-shell/quickstart)).


{{< figure class="no-border teaser" src="Azure-Cloud-Shell-PowerShell-embedded-in-portal.png" alt="Azure Cloud Shell PowerShell (embedded in portal)" caption="Azure Cloud Shell PowerShell (embedded in portal)" >}}

The drop-down field on the top left of the shell window allows you to easily change the shell type.

{{< figure class="no-border teaser" src="Azure-Cloud-Shell-Bash-standalone.png" alt="Azure Cloud Shell Bash (standalone)" caption="Azure Cloud Shell Bash (standalone)" >}}


## Resource Group Creation

Azure resources are managed and organized in resource groups. All Azure resources must be deployed into one. So, before we can create a container instance, we need to create a resource group. You can freely choose a name, for instance _rg-camunda_.

For the region, choose the location closest to you or to the location the server will be accessed from. The command _az account list-locations -o table_ displays a list of locations available to your account/tenant/subscription. After choosing a suitable region you can create a resource group in this location by using the value from the name column and in the command: _az group create --name rg-camunda --location yourLocationName_

{{< figure class="no-border teaser" src="Azure-Resource-Group-Creation-via-CLI.png" alt="Azure Resource Group Creation via CLI" caption="Azure Resource Group Creation via CLI" >}}

With _az group_ list we can list the existing resource groups.

{{< figure class="no-border teaser" src="Azure-Resource-Group-List-via-CLI.png" alt="Azure Resource Group List via CLI" caption="Azure Resource Group List via CLI" >}}

## Container Instance Creation and Start

The [Azure Container Service](https://docs.microsoft.com/en-us/azure/container-service/) allows you to quickly deploy container images, Kubernetes, DC/OS, or Docker Swarm cluster. For our purpose we are going to create a container instance to run a simple [Docker](https://www.docker.com/) image.

The command _az container create --resource-group rg-camunda --name camunda-run_ initiates the creation of a new container instance named camunda-run in the resource group rg-camunda.

Out of the [available images](https://hub.docker.com/r/camunda/camunda-bpm-platform/tags) Camunda BPM [Run](https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run) is easiest to use:

_Camunda BPM Run is a pre-packaged distro of the Camunda BPM platform, including the Camunda webapps (Cockpit, Tasklist, Admin) and the [REST API](https://docs.camunda.org/manual/latest/reference/rest/overview/).
The idea behind Run is to provide a full Camunda BPM distro with a simple but powerful configuration mechanism that can be operated by everyone, regardless of their knowledge about Java or application server configuration._
https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run

The image identifier camunda/camunda-bpm-platform:run-latest
always points to the latest version of the Camunda BPM Run distribution.

Add _--image camunda/camunda-bpm-platform:run-latest_ to the command to specify this image.

To specify the memory and CPU configuration for the container instance we add _--cpu 1 --memory 0.5_

The parameter _--dns-name-label your DNSLabel_ allows use to specify the
DNS name label.

Use a name of your liking, consisting of only lower case letters or dashes. The label will become part of the URL which will be used to access your server and has to be unique within the previously selected region.

The Camunda BPM Run image uses port 8080 for the web application. We need to instruct Azure to make this port accessible from the internet by adding the parameters --_ports 8080 --protocol TCP to the command._

The REST-API, which can be used, for instance by the Modeler or external services, to communicate with the server is included in the Camunda BPM Run distribution, but by default not secured (suitable for installation e.g. on own laptop). As our server will be accessible from the public Internet, we should secure it. Conveniently, Camunda BPM Run is prepared to allow this via a simple switch, which can be passed in via an environment variable. To add the setting we add the parameter _-environment-variables SPRING_APPLICATION_JSON= '{"camunda.bpm.run.auth.enabled":"true"}'_

Altogether, the complete command to create a Camunda BPM Run container instance in the latest version and run it is:

_az container create --resource-group rg-camunda --name camunda-run --image camunda/camunda-bpm-platform:run-latest --dns-name-label robs-camunda --ports 8080 --protocol TCP --cpu 1 --memory 0.5 --environment-variables SPRING_APPLICATION_JSON='{"camunda.bpm.run.auth.enabled":"true"}'_

Depending on Azure’s resource availability at the particular time, completing the deployment can take just one or several minutes. Once the command completes the response shows all parameters and attributes of the new container instance.

{{< figure class="no-border teaser" src="Camunda-BPM-Run-Container-Instance-Creation-in-Azure-Cloud-Shell.png" alt="Camunda BPM Run Container Instance Creation in Azure Cloud Shell" caption="Camunda BPM Run Container Instance Creation in Azure Cloud Shell" >}}


After successful start-up the server will become available under the Fully Qualified Domain Name (FQDN), which you can find near the end of the response. It consists of _dns_label.region.azurecontainer.io._

{{< figure class="no-border teaser" src="Successful-Container-Instance-Creation-in-Azure-Cloud-Shell-Bash.png" alt="Successful Container Instance Creation in Azure Cloud Shell (Bash)" caption="Successful Container Instance Creation in Azure Cloud Shell (Bash)" >}}


To see the container’s standard output and follow the server startup, we can use _az container attach --resource-group rg-camunda --name camunda-run_


{{< figure class="no-border teaser" src="Azure-Cloud-Shell-attached-to-Camunda-BPM-Run-Container-Instance.png" alt="Azure Cloud Shell attached to Camunda BPM Run Container Instance" caption="Azure Cloud Shell attached to Camunda BPM Run Container Instance" >}}

The start-up should take approximately 15–20 seconds.
You can disconnect your shell from the container output using Ctrl-C

{{< figure class="no-border teaser" src="Accessing-the-Web-Portal-or-REST-API.png" alt="Accessing the Web Portal or REST-API" caption="Accessing the Web Portal or REST-API" >}}

The web portal will be accessible under the FQDN on port 8080. In this example the FQDN is _robs-camunda.southeastasia.azurecontainer.io_
so the URL of the web portal is: http://robs-camunda.southeastasia.azurecontainer.io:8080

{{< figure class="no-border teaser" src="Camunda-Web-Portal-Login-page.png" alt="Camunda Web Portal Login" caption="Camunda Web Portal Login page under http://yourFQDN:8080" >}}

After opening your server’s URL http://yourFQDN:8080 in your browser you should see the login page. Use demo /demo to login, then use the web portals as described in the [documentation](https://docs.camunda.org/manual/latest/webapps/).

_Most browsers indicate that the page is insecure. This is because https is not enabled and means that the communication between this server and your browser is not encrypted. On any system of importance you would, among other steps, register your company’s security certificate and [enable https](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/#https)._

The REST-API will be accessible under the [FQDN on port 8080](http://yourfqdn:8080/)/engine-rest.

## CHANGE THE PASSWORD!

After logging in, use the __Change Password__ link in the Profile section on the right to change the password.

{{< figure class="no-border teaser" src="Change-the-Password.png" alt="Change the Password">}}


## Is the REST API secured?

To confirm securing the REST-API was successful we can access for instance
_http://yourFQDN:8080/engine-rest/deployment_ in the browser or using curl. In this example the test URL would be:
_http://robs-camunda.southeastasia.azurecontainer.io:8080/engine-rest/deployment_

If the REST-API is secured then the browser will display a login screen,
curl -I http://yourFQN:8080/engine-rest/deployment shows a response with the HTTP status code 401.

Adding the correct (changed) credentials to the command
curl -I http://yourFQN:8080/engine-rest/deployment -u demo:newpassword should lead to HTTP status code 200.

{{< figure class="no-border teaser" src="The-credentials.png" alt="The credentials">}}

The credentials (changed in the paragraph above) or a [newly created account](https://docs.camunda.org/manual/latest/webapps/admin/user-management/) can be used to login.

## Deploying a Process Model

Depending on the [Camunda Edition](https://docs.camunda.org/manual/latest/webapps/cockpit/deployment-view/) and the tools available to you, there are many ways to deploy a process model to your server via the REST API
(curl, postman, Camunda EE portal,…).

As you will first have to model the process, an easy way to do this is to [download the Camunda Modeler](https://camunda.com/download/modeler/) and use its built-in deployment feature.

{{< figure class="no-border teaser" src="Camunda-Modeler.png" alt="Camunda Modeler">}}

In the deployment dialog, opened via the Deploy current diagram menu icon, you need to specify the REST endpoint URL of your server: _http://yourFQDN:8080/engine-rest_
In this example it is: _http://robs-camunda.southeastasia.azurecontainer.io:8080/engine-rest_

{{< figure class="no-border teaser" src="Deploy-Diagram.png" alt="Deploy Diagram">}}

If you successfully secured the REST API then you will have to select Authentication: HTTP Basic and provide the Username and Password you use for the portal login. A notification will confirm a successful deployment. From now on the model will be visible in the Deployment view in your Camunda Cockpit and executable via the [Camunda Tasklist](https://docs.camunda.org/manual/latest/webapps/tasklist/) (or other clients).


## Stopping, Cleaning up or Restarting

To avoid unnecessarily burdening your budget ensure you stop the container instance while it is not needed.
To control you container instance use
<ul>
<li>_az container list -o table to see a list of your containers,_</li>
<li>_az container stop -g rg-camunda -n camunda-run to stop the instance,_</li>
<li>_az container start -g rg-camunda -n camunda-run to stop the instance,_</li>
<li>_az container delete -g rg-camunda -n camunda-run to delete the instance._</li>
</ul>

{{< figure class="no-border teaser" src="Deletion-of-Container.png" alt="Deletion of Container Instance via Azure Cloud Shell" caption="Deletion of Container Instance via Azure Cloud Shell" >}}

After the container instance has been deleted, the resource group can be deleted using _az group delete -n rg-camunda._

It may take a bit until a resource or resource group is deleted.


{{< figure class="no-border teaser" src="Listing-and-Deleting-Resource-Groups-in-Azure-Shell.png" alt="Listing and Deleting Resource Groups in Azure Shell" caption="Listing and Deleting Resource Groups in Azure Shell" >}}

After the command has completed, we can check the resource / groups lists with _az group list -o table and az container list -o table._

## Conclusion / TLDR

Using the only these two commands you can now create a new Camunda BPM instance on Azure within less than 5 minutes!

__Create a resource group:__

_az group create --name rg-camunda --location yourLocationName_

(Locations e.g. westus, eastus, brazilsouth, westeurope, northeurope, centralindia, westindia, southeastasia, japanwest, australiasoutheast)

__Create and start the Camunda BPM Run container instance:__

_az container create --resource-group rg-camunda --name camunda-run --image_ _camunda/camunda-bpm-platform:run-latest --dns-name-label robs-camunda --ports 8080_ --_protocol TCP --cpu 1 --memory 0.5 --environment-variables_ SPRING_APPLICATION__JSON='{"camunda.bpm.run.auth.enabled":"true"}'

_Access instance via_ http://dns_label.region.azurecontainer.io:8080

__Clean up using:__

_az container delete -g rg-camunda -n camunda-run and az group delete -n rg-camunda_
