+++
author = "Robert Parker"
categories = ["Community"]
tags = ["BPMN 2.0", "DMN"]
date = "2016-05-30T10:00:00+02:00"
title = "Citizen Identity Enrolment using BPMN and DMN"
+++

## Citizen Identity Enrolment using BPMN and DMN

At a recent ‘Hack Day’, I decided I wanted to explore a combined BPMN and DMN solution using the latest Camunda implementation. For a use case I settled on identity enrolment. Identity enrolment requires a combination of process, interactive user tasks and is rich in decision logic. Hence a perfect use case for the combined offering.

At a high level, identity enrolment can be abstracted to the following pattern. An applicant makes a claim over an identity and presents supporting evidence to substantiate their claim. This evidence is then verified and a decision made based on the weight of supporting evidence, whether the applicant’s claim over the identity is accepted or not. In addition, identity enrolment often requires binding the applicant to the identity, typically via taking a portrait photograph of the applicant. Usually the purpose of an identity enrolment is to issue the applicant some sort of credential, eg a building pass or even a passport. A high level process flow is shown below.

{{< figure src="process1.png" >}}

A common technique for proving a person’s claim over an identity is use of breeder documents. A breeder document is a document that can serve as a basis to obtain other identification documents. For example a birth certificate is often required to obtain further identity documents such as a drivers licence or passport. A person can typically substantiate their claim over an identity by presenting sufficient, original supporting identity documents.

A common approach to qualify an applicant’s claim over an identity is to assign various classes of documents points, where higher points are assigned to breeder documents closer to the ‘root’ of the document tree and fewer points are assigned to documents lower down in the breeder document tree. Identity schemes typically set a threshold score such that an applicant must accumulate say 100 points in order to substantiate their claim. In addition, schemes often add rules such as enforcing at least one or at most one document from various document classes in order to ensure breadth of coverage of identity documents, ideally to prevent fraudulent claims. Thus if an applicant presents a collection of supporting identity documents, a high level identity scheme process flow is shown below. The process can be described as, for each document, validate the document, classify the document to give it a class, rate the document by assigning points based on class and accumulate the scores obtained.

{{< figure src="process2.png" >}}

When an applicant presents a supporting breeder document, the document is verified using the following process. The document must be validated. A valid document is a document which is of an accepted type, matches the applicant’s name, and must comply with expiry or disposition rules as defined by the identity scheme. In addition the authenticity of the document must be ascertained either by security features built into the document or by verification back at issuing source. Hence a high level process flow to validate a document is shown below.

{{< figure src="process3.png" >}}

The first three tasks above can be realised by a combination of operator data entry and a decision table based on DMN. A snippet from the decision table I used is shown below.

{{< figure src="table1.png" >}}

This decision table validates a document as valid, supporting evidence of the subject’s claim. The table comprises six input variables; Document Type, Disposition, Years Expired, Years Issued, Legal Given Names and Legal Surname. In addition the table comprises two output variables; a Boolean indicating the validity of the document and a string representing the reasoning behind the decision. Including the reason behind the rule can be very useful to reflect the intent of the rule, and thus useful as a form of documentation. In addition, I have used it as a source of a message to display to a user as to why a decision was or wasn’t true. Thus because the message is displayed to a user, the wording must be clear and precise which also helps with documenting intent. I have also designed the solution such that if I chain a number of decision tables together, the reasons of each decision table can be appended together giving a narrative as to the reason behind the overall decision. 

A valid supporting document must satisfy the following rules. The documents cannot be cancelled, the document must be from a set of defined types, the name on the document must match the name of the subject, and for some documents, the document cannot have expired more than two years ago. The approach taken with this rule set is to treat the document as invalid until proven valid. Hence the hit policy is set to first (F) such that the rule confirming the document is invalid should match first. At the bottom of the table are the rules based on valid document types which in the absence of any other condition, confirm the document as valid. If no rule matches, then the document is invalid and the last rule in the table reflects this condition.

The next stage in the process is to classify documents based on type. This is a very simple decision table as shown in the snippet below.

{{< figure src="table2.png" >}}

his table has one input and one output. The input is the document type and the output is the document’s classification from the set [1..4]. Again the hit policy is set to first as only one rule should ever match. The last rule in the table matches any document, however the classification is set to 0. This is a form of ‘programming defensively’. In other words, new or unrecognized documents types will fail gracefully.

The purpose of classifying the documents is to score them. Each class of document has a different score. It could be tempting to include the score as another output column in the classification decision table above, however the scoring schemes are not that simple. The scoring schemes often contain rules such as the first document of class 1 scores 40 points, however subsequent class 1 documents score zero points, or, the first document of class 2 is worth 30 points, however subsequent class 2 documents score 15 points.

Thus the next stage in the process is referred to as rating the documents. Rating the documents comprises a two stage process. The first step is to count the number of documents from each class and annotate the document with its class and sequence number within its class. Then the following scoring decision table is applied as shown below.

{{< figure src="table3.png" >}}

Once again the hit policy is set to first and a defensive ‘programming’ style is applied. The first rule ensures that an invalid document scores zero points. Subsequent rules apply a score to a document as appropriate based on its classification and sequence number within its class. Once each document has been scored, a final task accumulates the scores across all presented documents and determines if sufficient proof of identity documents have been presented or not. The overall process tying these decision tables together is shown below.

{{< figure src="process4.png" >}}

So what’s the secret sauce bringing this all together? The process above takes a Json array as input where the array represents the set of documents presented in support of an applicant’s claim over an identity. Each Json entry captures the metadata associated with the presented document. Each task in the process may add additional attributes to the Json entries in order that the next task in the chain can access prior task’s output as input.

Hence the process above becomes a re-usable sub-process. A real life use-case may require proof of identity for an applicant or proof of identity for an applicant’s referee. Hence I can call this sub-process from a master process, passing in either the applicant’s or the referee’s context. This sub-process also captures a common pattern. All of the document based verification schemes follow the same pattern. The only differences are in the set of valid documents, the rules for document validity and the scores. Thus it is very easy to adapt this to alternate schemes just by changing the content in the decision tables. 

---

This is a guest blog post by Rob Parker. Rob Parker is an Enterprise Architect for [Australia Post](http://auspost.com.au/).