+++
author = "Felix Müller"
categories = ["Community"]
date = "2016-11-01T15:00:36+02:00"
tags = ["ECM", "CMIS", "DMS", "Chemistry"]
title = "ECM and Camunda - Using CMIS"
+++

In my [recent blogpost](http://blog.camunda.org/post/2016/11/ecm-box-with-camunda/) I discussed an example on how to integrate Camunda with modern ECM SaaS providers like Box.
As many companies are still using traditional ECM and DMS solutions within this blogpost I will focus on CMIS.
The open CMIS standard stands for Content Management Interoperability Services and allows to integrate with a number of different DMS solutions. CMIS is an abstraction layer that uses web services and extends SOAP by defining a specific domain model and bindings.

# Showcase
Similar to my previous blogpost I reused the typical Invoice Showcase that is shipped with the pre-packaged Camunda distribution and modified it in order to showcase the integration with the CMIS standard.
The invoice process looks like this:
{{<bpmn-viewer name="invoice.v2">}}

This process includes also a CMMN case which provides specific upload functionality:
{{<figure src="review-invoice.png" alt="Verify Invoice CMMN">}}

The basic idea of this showcase is that the Team-Assistant wants to upload a new invoice that is saved locally on the computer in order to start a new invoice approval process. When the process is started this file is stored in a DMS solution that can be integrated using CMIS. During the process the approver and reviewer are able to preview and download the different files or upload a new version to this DMS solution. In comparison to the standard Camunda Invoice Example within this showcase no files are stored within Camunda but instead only the external DMS solution is used.

# Solution
Within this blogpost I will only focus on the CMIS Java Connector and Apache Chemistry as the rest of the functionality is very similar to the one provided in  my [recent blogpost](http://blog.camunda.org/post/2016/11/ecm-box-with-camunda/). Besides that, I will present the major differences in the integration between both solutions.

## Connector to CMIS
Apache Chemistry provides many [open-source implementations of the CMIS specification](https://chemistry.apache.org/java/download.html). The project not only provides a server framework that can be used when developing a DMS but also client libraries in different programming languages (e.g. Java, Python, PHP, etc.).

After including the correct maven repository a connection to a DMS that supports the CMIS standard can be opened like this:

```Java
public Session getSession() {
		// default factory implementation
		SessionFactory factory = SessionFactoryImpl.newInstance();
		Map<String, String> parameters = new HashMap<String, String>();

		// user credentials
		parameters.put(SessionParameter.USER, CMIS_USERNAME);
		parameters.put(SessionParameter.PASSWORD, CMIS_PASSWORD);

		// connection settings
		parameters.put(SessionParameter.BROWSER_URL, CMIS_BROWSER_URL);
		parameters.put(SessionParameter.BINDING_TYPE, BindingType.BROWSER.value());
		parameters.put(SessionParameter.REPOSITORY_ID, CMIS_REPO_ID);

		// create session
		session = factory.createSession(parameters);
		return session;
}
```

Using this session folders and files can be created like this:

```Java
// get specific folder
Folder rootFolder = FileUtils.getFolder(CMIS_ROOT_FOLDER, session);

// create folder
Map<String, String> props = new HashMap<String,String>();
props.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
props.put(PropertyIds.NAME, folderName);
target.createFolder(props);

// create new document
Document d = target.createDocument(props, contentStream, VersioningState.MAJOR);
```

## Differences Box and CMIS integration
Even though both integrations are very different from an architectural point of view, the implementation within Camunda is very similar.
There are few differences within the file upload and download but in the end it is just a different way of using the Java APIs that the solutions provide.
One of the major differences for the CMIS integration is that with this integration out-of-the-box no online preview was possible as with Box. Nevertheless, as most browsers support inline PDF preview, it was possible to manually provide a nice PDF preview:
{{<figure src="cmis-file-preview.jpg" alt="CMIS File Preview">}}

# Summary and Outlook
Within this blogpost I showed how easy it is to integrate Camunda with traditional DMS systems by using Apache Chemistry and the CMIS standard. When looking at the two ECM integrations that I described in this blogpost and my previous blogpost about Box, it becomes obvious that integrating Camunda with ECM and DMS solutions is very easy. The Java APIs that the ECM solutions provde and the developer friendliness of Camunda make the development process very efficient.

# Contribute
Contributions in the form of code, bug reports and feature ideas are very welcome and can be made directly in the [invoice-cmis](https://github.com/camunda/camunda-consulting/tree/master/snippets/ecm-integrations/invoice-cmis) repository on GitHub.

If you would like to get more hands-on information and see the source code, you can also join the upcoming Webinar about [Content is king, but how are you managing it?] (https://network.camunda.org/webinars/89).
