+++
author = "Robert Emsbach"
categories = ["Community"]
date = "2020-05-29T07:00:00+01:00"
tags = ["Cloud","BPMN"]
title = "Anyone can run Camunda BPM on Azure in 10 Minutes"
+++

This article shows the simplest and fastest way to get a [Camunda BPM](https://camunda.com/) server running on Microsoft Azure without command line usage. Keeping things as simple as possible, we perform all steps in the browser. No technical knowledge of Azure or Camunda and no local tool installation are required.
<!--more-->
(For CLI usage please read “[Deploying Camunda BPM to Azure via CLI…](https://medium.com/@robert.emsbach/deploying-camunda-bpm-to-azure-container-service-via-cli-in-5-minutes-cab7fd14e50c)” .)
The resulting server will be suitable as a (shared, insecure) playground accessible via the internet. It is [not a secure setup suitable for production usage](https://docs.camunda.org/manual/latest/user-guide/security/). A technical operator setting up a production system would certainly approach things differently and possibly choose different Azure services.

__Azure Access__

To deploy anything on Microsoft Azure you obviously require an [Azure account](https://azure.microsoft.com/en-us/free/). If you do not already have one, the sign-up is easy and usage during the first 12 months or within an initially granted 200 USD budget is free.

Many technical users prefer to interact with Azure via a locally installed command line interface ([CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)) or [cloud shell](https://shell.azure.com/). This is not mandatory, though. Here all steps are performed via the Azure portal. If required, register for an account, then login to the Azure portal at [https://portal.azure.com](https://portal.azure.com/).

{{< figure class="no-border teaser" src="Azure-Portal-Landing-Page.png" alt="Azure Portal Landing Page" caption="Azure Portal Landing Page" >}}

__Creating a Camunda BPM Container Instance__

{{< figure class="no-border teaser" src="Azure-Portal.png" alt="Azure Portal" >}}

The Azure portal’s landing page offers a variety of services. The easiest way to run Camunda BPM on Azure is to create an Azure Container Instance ([ACI](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-overview)).
Select the + Create a resource option, followed by the Containers section and the Container Instances entry.

__Basic Options__

The subscription you created during the registration of the Azure account should already be selected.

{{< figure class="no-border teaser" src="Resource-Group-Creation.png" alt="Resource Group Creation as part of Azure Container Image Creation" caption="Resource Group Creation as part of Azure Container Image Creation" >}}

Azure resources are managed and organized in resource groups. All Azure resources must be deployed into one. The Create new link under the Resource Group field allows to quickly add a new resource group for the container instance. You can freely choose a name,
for instance rg-camunda.

{{< figure class="no-border teaser" src="Container-Image.png" alt="Container Image configuration for Camunda BPM Run on Microsoft Azure" caption="Container Image configuration for Camunda BPM Run on Microsoft Azure" >}}

Next, we need to provide container name, region, image source, and desired system resources for our server.

The container name can also be chosen freely, camunda-run for example, but must only contain lower characters, numbers and dashes (and needs to be unique in the resource group).
DockerHub is where Camunda publishes its images, therefore we must select Docker Hub or another registry as image source.

Out of the [available images](https://hub.docker.com/r/camunda/camunda-bpm-platform/tags) Camunda BPM [Run](https://blog.camunda.com/post/2020/03/introducing-camunda-bpm-run) is easiest to use:

_Camunda BPM Run is a pre-packaged distro of the Camunda BPM platform, including the Camunda webapps (Cockpit, Tasklist, Admin) and the [REST API](https://docs.camunda.org/manual/latest/reference/rest/overview/).
The idea behind Run is to provide a full Camunda BPM distro with a simple but powerful configuration mechanism that can be operated by everyone, regardless of their knowledge about Java or application server configuration.
[https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/)_

The image identifier camunda/camunda-bpm-platform:run-latest always points to the latest version of the Camunda BPM Run distribution.

In the Region field choose the location closest to you or to the location the server will be accessed from. The OS Type should remain set to Linux. The settings under Size can remain unchanged or you can reduce the memory setting to 0.5 GiB.

At the bottom of the page do not yet click Review + create, instead continue with the option Next: Networking > .

__Networking Options__

{{< figure class="no-border teaser" src="Networking-Options.png" alt="Networking Options">}}

Specify a DNS name label of your liking. The label will become part of the URL which will be used to access your server and has to be unique within the previously selected region.
In the Ports section, change the value for Ports to 8080 and leave the Protocol set to TCP.
Again, do not yet select Review + create, but proceed with
Next: Advanced >.

__Advanced Settings__

The Camunda BPM Run distribution includes the REST-API, which can be used, for instance by the Modeler or external services, to communicate with the server.

{{< figure class="no-border teaser" src="Advanced-Settings.png" alt="Advanced Settings">}}

By default this access option is not secured (suitable for installation e.g. on own laptop). As our server will be accessible from the public Internet, we should secure it. Conveniently, Camunda BPM Run is prepared to allow this via a simple switch.

In the Environment Variables section add a Key:<br/>
_SPRING_APPLICATION_JSON<br/>
with the Value:<br/>
{”camunda.bpm.run.auth.enabled”:”true”}_

NOW the configuration can be completed with Review + create.

__Review + Create__

{{< figure class="no-border teaser" src="Configuration-Summary.png" alt="Container Image Configuration Summary" caption="Container Image Configuration Summary">}}

On the summary page review the settings entered, if needed step back with the < Previous button and correct settings, otherwise complete the container image configuration with Create.

{{< figure class="no-border teaser" src="Deployment-Underway.png" alt="Container Instance Overview with Deployment underway" caption="Container Instance Overview with Deployment underway">}}

The screen you are taken to next should show the successful creation of the container instance and indicate that the deployment is underway.

{{< figure class="no-border teaser" src="Completed-Deployment.png" alt="Container Instance Overview with completed Deployment" caption="Container Instance Overview with completed Deployment">}}

Depending on Azure’s resource availability at the particular time, completing the deployment can take just one or several minutes. The screen eventually changes and indicates completion of the deployment.

__Accessing the Camunda Web Portal__

If you follow the Go to resource link you will be taken to the now running camunda-run container instance’s overview page.

{{< figure class="no-border teaser" src="Overview-Page.png" alt="Overview Page">}}

Here we can find the Fully Qualified Domain Name (FQDN), which is basically the URL under which your Camunda server is now accessible. Hoovering the cursor over the FQDN text makes a Copy to clipboard button appear on the right, which copies the FQDN so we can subsequently easily paste it e.g. into the browsers.

However, the FQDN alone is not sufficient to access the web portal. We have to append :8080 to it. In this example the FQDN is: robs-camunda.southeastasia.azurecontainer.io

So the url of the web portal is<br/>
[http://robs-camunda.southeastasia.azurecontainer.io:8080](http://robs-camunda.southeastasia.azurecontainer.io:8080/)

{{< figure class="no-border teaser" src="Camunda-Portal.png" alt="Camunda Web Portal" caption="Camunda Web Portal Login page under http://yourFQDN:8080">}}

After opening your server’s URL [http://yourFQDN:8080](http://your_fqn:8080/) in your browser you should see the login page. Use demo /demo to login, then use the web portals as described in the [documentation](https://docs.camunda.org/manual/latest/webapps/).

(Most browsers indicate that the page is insecure. This is because https is not enabled and means that the communication between this server and your browser is not encrypted. On any system of importance you would, among other steps, register your company’s security certificate and [enable https](https://docs.camunda.org/manual/latest/user-guide/camunda-bpm-run/#https).)

__CHANGE THE PASSWORD!__

After logging in, use the Change password link in the Profile section on the right to change the password.

{{< figure class="no-border teaser" src="Profile.png" alt="Profile section">}}

__Is the REST API is secured?__

To confirm securing the REST-API was successful we can access for instance<br/>
http://yourFQDN:8080/engine-rest/deployment in our browser. In this example the test URL would be<br/>
http://robs-camunda.southeastasia.azurecontainer.io:8080/engine-rest/deployment
If the REST-API is secured then the browser will display a login screen.

{{< figure class="no-border teaser" src="REST-API.png" alt="REST API">}}

The credentials (changed in the paragraph above) or a [newly created account](https://docs.camunda.org/manual/latest/webapps/admin/user-management/) can be used to login.

__Deploying a Process Model__

Depending on the [Camunda Edition](https://docs.camunda.org/manual/latest/webapps/cockpit/deployment-view/) and the tools available to you there are many ways to deploy a process model to your server. One easy way to do this is to [download the Camunda Modeler](https://camunda.com/download/modeler/) and use its built-in deployment feature.

{{< figure class="no-border teaser" src="Modeler.png" alt="Modeler">}}

In the deployment dialog, opened via the Deploy current diagram menu icon, you need to specify the REST endpoint URL of your server:<br/>
http://yourFQDN:8080/engine-rest
In this example it is:<br/>
http://robs-camunda.southeastasia.azurecontainer.io:8080/engine-rest

{{< figure class="no-border teaser" src="Deploy-Diagram.png" alt="Deploy Diagram">}}

If you successfully secured the REST API then you will have to select Authentication:
HTTP Basic and provide the Username and Password you use for the portal login. A notification will confirm a successful deployment. From now on the model will be visible in the [Deployment view](https://docs.camunda.org/manual/latest/webapps/cockpit/deployment-view/) in your Camunda Cockpit and executable via the [Camunda Tasklist](https://docs.camunda.org/manual/latest/webapps/tasklist/) (or other clients).

__Stopping, Cleaning up or Restarting__

To avoid unnecessarily burdening your budget ensure you stop the container instance while it is not needed.

{{< figure class="no-border teaser" src="Services.png" alt="Azure Portal Landing Page with recently used Services and Resources" caption="Azure Portal Landing Page with recently used Services and Resources">}}

The Azure service start menu automatically includes the recently used services on the top and a Recent resources section. Via those links one can navigate to the service’s main pages (Container instances, Resource groups), on which the resources are listed, or directly to the overview pages of the specific resources (resource group rg-camunda or container instance camunda-run).

In any case, clicking on the name of a specific resource leads to the resource’s overview page. The buttons on the top of the resource overview pages allow you to Start / Restart / Stop / Delete the container instance…

{{< figure class="no-border teaser" src="Buttons.png" alt="Container Instance Overview" caption="Container Instance Overview with Start/Restart/Stop/Delete Buttons">}}

…or to delete the resource group.

{{< figure class="no-border teaser" src="Delete.png" alt="Delete the resource group">}}

It may take a bit until a resource is deleted and no longer shows up on the portal’s landing page.

__Conclusion__

The Azure Container Service and the Camunda BPM Run distribution are a great combination and accessible to pretty much everyone. Just following the described steps, no technical knowledge or local installations are required to have a Camunda BPM server running in the cloud in only minutes.
