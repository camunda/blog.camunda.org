+++
author = "Daniel Meyer"
categories = ["Camunda"]
date = "2018-04-11T12:00:00+01:00"
tags = ["Security"]
title = "Reporting Security Issues"
+++

Maintaining the security of Camunda BPM is an important task for us. In our documentation,
we have published our [Security Policy](https://docs.camunda.org/manual/7.8/user-guide/security/#security-policy)
which explains how we deal with security issues.

Besides our proactive efforts, it is very valuable to us when we get feedback by the community about security issues which may exist in Camunda itself (or much more commonly) in one of the libraries and dependencies we are using. When you
report security issues, we can investigate them, assess their impact on different usage scenarios, provide fixes and publish
a [security notice](https://docs.camunda.org/enterprise/security-notices/).

To give you an example: In January, Kai Ullrich from [Code White](https://code-white.com/en/) approached us and reported that
using Camunda’s API, it is possible, once authenticated, to submit a Java object value as a variable value in serialized form. Inside Camunda, the object is deserialized which allows attackers to exploit a security vulnerability in Groovy which allows injecting malicious code in a groovy serialized object which is executed upon deserialization. Kai has published the following blogpost in which he has described the [security vulnerability in Groovy](https://codewhitesec.blogspot.de/2018/01/handcrafted-gadgets.html) which can be exploited inside Camunda.

After he reported the issue, we implemented and released guards inside Camunda which allow users to shield their installation against this potential vulnerability in Groovy.

To us, this is a success story: thanks to Kai's and Code White's efforts we could make Camunda more secure for our users.

If you find any issues related to some of the libraries we are using, please do not hesitate to report them so that we can
investigate these issues.
