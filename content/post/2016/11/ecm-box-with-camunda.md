+++
author = "Felix Müller"
categories = ["Community"]
date = "2016-11-01T14:00:36+02:00"
tags = ["ECM", "Box.com", "DMS"]
title = "ECM and Camunda - Integrating Box.com with Camunda"
+++
Many core workflows in organizations involve some kind of document management. Organizations usually handle document management with the help of DMS or ECM software solutions. The term Enterprise Content Management (ECM) was first introduced in 2000 by the [AIIM International](http://www.aiim.org/What-is-ECM-Enterprise-Content-Management). In todays’ definition ECM covers (web) content, document, records, workflow and digital asset management as well as search, collaboration, capture and scanning. Furthermore, often document management systems (DMS) are viewed to be a component of ECM.

Originally ECM applications were implemented as traditional software applications which were installed on-premise. With the growth of cloud computing and SaaS solutions also the ECM market changed drastically during the last years. Many traditional ECM applications added SaaS technology to their portfolio, but at the same time - or even before that - a large number of start-ups appeared in the market focusing on ECM SaaS as e.g. Box.com, Dropbox, ownCloud - just to name a few.

The Digital Clarity Group just recently outlined “Box represents the future of ECM” and Forrester Wave named Box a leader in ECM business content services. These reasons are enough to have a look on how to integrate such cloud-based ECM software as Box with Camunda.

# Showcase
In order to show the power of DMS I made use of the typical Invoice Showcase that is shipped with the pre-packaged Camunda distribution and modified it slightly. The process looks like this:
{{<bpmn-viewer name="invoice.v2">}}

Besides that, I made changes to the CMMN case that is called from this model to provide an additional upload functionality to the end-user:
{{<figure src="review-invoice.png" alt="Verify Invoice CMMN">}}

The basic idea of this showcase is that the Team-Assistant wants to upload a new invoice that is saved locally on the computer in order to start a new invoice approval process. When the process is started this file is stored in a DMS solution - in our case box. During the process the approver and reviewer are able to preview and download all files related to this process instance or upload a new version to Box.

In comparison to the standard Camunda Invoice Example within this showcase no files are stored within Camunda but instead only the cloud offering is used.

# Solution
For this showcase I extended the Camunda Invoice Example with a few forms, JavaScript and some Java classes.
In the following I will focus on the most important features of this solution:

1. Embedded form
2. REST endpoint
3. Connector to box

## Embedded form: Upload, Download and Preview
### Upload
When using files within the Camunda Tasklist by default the files are saved within the Camunda Database when submitting the form.
I changed this behavior so the files get stored directly in box. In order to do this I wrote a simple upload JavaScript similar to the following:

```JavaScript
var formData = new FormData($form[0]);
$.ajax({
  url: '/camunda-invoice-box/rest/rest/upload', // rest-endpoint
  type: 'POST',
  success: function(data) {
    if (data != null) {
      var response = JSON.parse(data);
      $('input[name="folderName"]').val(response.uniqueID);
    }
  },
  data: formData
});
```

### Download and Preview
Within the embedded form I provided the end user a download link and a preview link. Box preview links are by default only valid for one hour and therefore have to be generated on demand.

When a user clicks on the preview link we call the Box REST API to get a preview link that is valid for one hour. After getting this link it is added as a source to an iframe that is placed within this form. With the help of this functionality the user can preview [a number of different files](https://community.box.com/t5/Managing-Your-Content/What-file-types-and-fonts-are-supported-by-Box-s-Content-Preview/ta-p/327) easily within the form as you can see in the following screenshot:
{{<figure src="approve-invoice-with-box.jpg" alt="Approve Invoice box">}}

### Start case execution manually
Another very nice feature is the possibility to manually activate new human tasks within the verify invoice case. By making use of Camundas' powerful REST API and JavaScript it is very easy to activate new case executions and automatically change to the human task in the Camunda Tasklist.
{{<figure src="start-case-execution.jpg" alt="Activate Case Execution">}}
{{<figure src="activated-human-task.jpg" alt="Activated Human Task">}}
## REST endpoint: Upload and Download
In order to provide upload and download functionality with Box I created a new REST endpoint:
```Java
@Path("/rest")
public class UploadFacade {
  @POST
  @Path("/upload")
  @Consumes("multipart/form-data")
  public Response uploadFile(MultipartFormDataInput input) throws Exception {
    ...
  }
}
```

This endpoint consumes MultipartFormDataInput and uploads the InputStream straight to Box afterwards.
When a new process instance is started a new folder with a unique ID is automatically created in box. This ID is then stored as a reference (as a process variable) within Camunda. With the help of this reference throughout the process it is very easy to interact with box and find the correct documents for a specific process instance.

## Connector to box
Box provides an [open-source Java SDK](https://github.com/box/box-java-sdk) which can easily be used in order to connect to your own box account. The Java SDK already provides easy Java methods to connect to box using their REST API including authentication, downloading and creating new files, etc. With the help of this SDK it was straightforward to implement a connection to box and create folders as well as uploading files.
As an example the following code is responsible for authentication using Java:
```Java
public static BoxDeveloperEditionAPIConnection userClient(String userId) {
    if (userId == null) { //   session data has expired
        return null;
    }
    try {
        BoxDeveloperEditionAPIConnection userClient = BoxDeveloperEditionAPIConnection.getAppUserConnection(userId, CLIENT_ID, CLIENT_SECRET, jwtEncryptionPreferences,accessTokenCache);
        return userClient;
    } catch (BoxAPIException apiException) {
        apiException.printStackTrace();
        throw apiException;
    }
}
```

With the help of this BoxDeveloperEditionAPIConnection we can then easily go ahead and create folders or files, e.g.:
```Java
...
BoxFolder parentFolder = new BoxFolder(api, BOX_FOLDER_ID); // BoxDeveloperEditionAPIConnection api, unique BoxFolderID
BoxFolder.Info childFolderInfo = parentFolder.createFolder(folderName); //String folderName
BoxFolder boxfolder = childFolderInfo.getResource();
boxfolder.uploadFile(fileContent, fileName); //InputStream fileContent, String fileName
...
```

# Summary and Outlook
Within this blogpost I showed how easy it is to integrate Camunda with a modern enterprise content management system like Box.com. Other modern ECM and DMS solutions also provide open-source Java SDKs (as e.g. [Dropbox SDK Java](https://github.com/dropbox/dropbox-sdk-java) or [Google Drive API Client Library for Java](https://developers.google.com/api-client-library/java/apis/drive/v2)) which will make an integration very similar to the one I showed in this blogpost.

# Contribute
Contributions in the form of code, bug reports and feature ideas are very welcome and can be made directly in the [invoice-box](https://github.com/camunda/camunda-consulting/tree/master/snippets/ecm-integrations/invoice-box) repository on GitHub.

If you would like to get more hands-on information and see the source code, you can also join the upcoming Webinar about [Content is king, but how are you managing it?] (https://network.camunda.org/webinars/89).
