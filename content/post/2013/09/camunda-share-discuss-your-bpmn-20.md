---
title: "camunda share: Discuss your BPMN 2.0 process model in the cloud"
date: "2013-09-13"
author: "Bernd Rücker"

categories:
  - "Execution"
tags: 

aliases:
  - "/2013/09/camunda-share-discuss-your-bpmn-20.html"

---

<div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-MvXUG5rgDhg/UjL8aVA19FI/AAAAAAAAAGc/LZzu6Ijyt9M/s1600/screenshot.png" imageanchor="1" style="clear: left; display: inline !important; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-MvXUG5rgDhg/UjL8aVA19FI/AAAAAAAAAGc/LZzu6Ijyt9M/s200/screenshot.png" height="148" width="200" /></a></div>
Once a year the whole camunda team does a ShipIt-Day (<a href="https://www.atlassian.com/de/company/about/shipit">inspired by Atlassian</a>) - developing something awesome within 24 hours. This year, <a href="http://camunda.org/community/team.html">Kristin, Falko and me</a> did "camunda share" - a web application in the cloud to share and discuss BPMN 2.0 process models. And we shipped it! It is live.<br />
<br />
Try it today: <a href="http://camunda.org/share/">http://camunda.org/share/</a><br />
<br />
<br />
<a name='more'></a><b>Why camunda share?</b><br />
<br />
We often discuss with colleagues, partners or customers about process models. We often send around annotated PDF files via email. We were tired of it and wanted to have something like&nbsp;<a href="http://doodle.com/" target="_blank">doodle</a>&nbsp;for this. And with <a href="http://www.camunda.org/">camunda BPM</a> and especially the <a href="https://github.com/camunda/camunda-bpmn.js/">camunda-bpmn.js</a> component we had everything at hand to get that going. And we had 24 hours :-)<br />
<br />
The idea is to avoid any hazzle with logins or users - you get a unique URL nobody can guess and can send that to everybody who is interested.<br />
<br />
<b>Feature Overview</b><br />
<b><br /></b>
The following screenshots should give a brief overview of the features of camunda share as of today. As we hacked the last 24 hours I will not go into much more details now...<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-MvXUG5rgDhg/UjL8aVA19FI/AAAAAAAAAGc/LZzu6Ijyt9M/s1600/screenshot.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://1.bp.blogspot.com/-MvXUG5rgDhg/UjL8aVA19FI/AAAAAAAAAGc/LZzu6Ijyt9M/s320/screenshot.png" height="237" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Upload a BPMN 2.0 process model (you can use every tool capable of BPMN 2.0)</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-xW13-eZF8tw/UjL8XjzejzI/AAAAAAAAAGA/E_RDscUkrbo/s1600/addcomment.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://4.bp.blogspot.com/-xW13-eZF8tw/UjL8XjzejzI/AAAAAAAAAGA/E_RDscUkrbo/s320/addcomment.png" height="237" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">comment on elements of the BPMN 2.0 process models</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-Y1S2nA11_lM/UjL8X1z37DI/AAAAAAAAAGI/A3Iw-Jmi3yc/s1600/addcomment2.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://1.bp.blogspot.com/-Y1S2nA11_lM/UjL8X1z37DI/AAAAAAAAAGI/A3Iw-Jmi3yc/s320/addcomment2.png" height="237" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">See all other comments visualized on the model and add your answers</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-tfPUy1hx32A/UjMAoaLGmrI/AAAAAAAAAG4/RYAdIvE0Nw0/s1600/feature.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-tfPUy1hx32A/UjMAoaLGmrI/AAAAAAAAAG4/RYAdIvE0Nw0/s320/feature.png" height="186" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Multiple features explained</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-fobJUen7IxY/UjL8bbQxbRI/AAAAAAAAAGs/EXvwMXJLwd0/s1600/xml-view.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://4.bp.blogspot.com/-fobJUen7IxY/UjL8bbQxbRI/AAAAAAAAAGs/EXvwMXJLwd0/s320/xml-view.png" height="215" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">See or change (as admin) the BPMN 2.0 XML</td></tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-FC-07l9gzbA/UjMEFuzeSgI/AAAAAAAAAHE/YNQCS-wY3BM/s1600/anonymized.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-FC-07l9gzbA/UjMEFuzeSgI/AAAAAAAAAHE/YNQCS-wY3BM/s320/anonymized.png" height="215" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">You can anonymize process models during upload if you want to discuss on structure without providing company internal information.&nbsp;</td></tr>
</tbody></table>
<br />
<b>Roadmap</b><br />
<br />
First of all: We have small remaining problems with Internet Explorer - we will remove them pretty quickly! For the moment please use Firefox or Chrome.<br />
<br />
We plan to integrate camunda share in the camunda.org community and to develop it further. But there is no fixed roadmap yet. With the beta state of this ShipIt Day we want to collect feedback from users (<b>you!!</b>) and start using it in our own consulting work. Then we will decide how to move forward. So let us know what you think - use the <a href="http://camunda.org/community/forum.html">camunda BPM User Forum</a>.<br />
<br />
<b>Update (March 20, 2014)</b><br />
<b><br /></b>
The idea of camunda share inspired us to create a <a href="http://network.camunda.org/forum">BPMN forum</a> where you can discuss your process models with over 10,000 members of our <a href="http://network.camunda.org/">camunda BPM network</a>.<br />
<br />
<b>Where to send the flowers?</b><br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-DdZoJuwClbU/UjMga3blgAI/AAAAAAAAAHQ/3fGsuJODIxA/s1600/shipItTeam.JPG" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-DdZoJuwClbU/UjMga3blgAI/AAAAAAAAAHQ/3fGsuJODIxA/s320/shipItTeam.JPG" height="180" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">The camunda team at the ShipItDay 2013 in Mamerow</td></tr>
</tbody></table>
No need to - we had a lot of fun! But tell all your friends how awesome camunda share, camunda BPM and the whole camunda team is :-)
</div>