---
title: "Context Help in Camunda using SOLR Search Server"
date: "2015-09-01T07:39:00+02:00"
author: "Bernd Rücker"

categories:
  - "Development"
tags: 

aliases:
  - "/2015/09/context-help-in-camunda-using-solr.html"

---

Last week we had our anual hack days - that means 48 hours of producing something aswesome. Together with Falko, Ingo and Thorben we build a context help within the <a href="https://github.com/camunda/camunda-bpm-workbench">Camunda BPM Workbench</a> protoype. This uses <a href="http://lucene.apache.org/solr/">Apache SOLR</a>&nbsp;to index various sources (we did the user forum, the docs on Github, a Community Extension and internal best practices). We discussed details on this index and did a comparison to ElasticSearch.<br />
<br />
It was a great study for options and use cases of such a help in our tool chain - but watch the result yourself:<br />
<a name='more'></a><br />
<br />
<iframe allowfullscreen="" frameborder="0" height="272" mozallowfullscreen="" src="https://player.vimeo.com/video/137867732" webkitallowfullscreen="" width="500"></iframe> <br />
<a href="https://vimeo.com/137867732">Context Help / Search via SOLR - hooken into Camunda BPM Workbench</a> from <a href="https://vimeo.com/user22820658">camunda</a> on <a href="https://vimeo.com/">Vimeo</a>.<br />
<br />
Note that this is a prototype - sources are on a <a href="https://github.com/camunda/camunda-bpm-workbench/tree/hack-days-2015">branch in GitHub</a> - but not in a stable state. But let us know what you think of it and if and how you would like to have it in the product! Feedback always helps us to make Camunda even more awesome :-)