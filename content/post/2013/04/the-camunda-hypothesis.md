---
title: "The camunda Hypothesis"
date: "2013-04-07T17:19:00+02:00"
author: "Jakob Freund"

categories:
  - "Development"
tags: 

aliases:
  - "/2013/04/the-camunda-hypothesis.html"

---

<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-qzrKz0WRZZA/UWEXB2b7qFI/AAAAAAAAACs/rcuLsuVenrE/s1600/deceptive.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="472" src="http://2.bp.blogspot.com/-qzrKz0WRZZA/UWEXB2b7qFI/AAAAAAAAACs/rcuLsuVenrE/s640/deceptive.png" width="640" /></a></div>
<br />
Scott Francis has written <a href="http://www.bp-3.com/blogs/2013/04/the-zero-code-hypothesis/">an excellent post</a> about the core message of our presentation at <a href="http://www.bpmnext.com/">bpmNEXT</a>. He called it the "Zero Code Hypothesis".&nbsp;Though Scott's summary is completely right in its essentials, I would like to put some details straight:<br />
<br />
<ul>
<li>We don't think that "Zero Code BPM" does not work at all - Zero Coding and our approach are both reasonable, depending on what you have and what you need. The real problem is that most of the zero coding BPM vendors claim that you should use their solution for situations where you actually shouldn't.</li>
<li>We do not condemn the ideas and ambitions often associated with the term "ACM". Quite the contrary, we even believe that our approach is very well suited to create the according process applications (basically because <a href="http://www.bpm-guide.de/2012/11/02/bpmn-unstructured-processes-and-acm-example-patent-application/?lang_pref=en">we already did it</a>).</li>
<li>I would not consider our standpoint a&nbsp;counter-point to the movement to make BPM "more accessible" to the business. We just don't belive that zero coding is the right approach to realize that enhanced accessibility. There are other instruments (most of them based on BPMN), that we already successfully validated and incorporated in our approach. But still, just like ACM, this is a field of research. I don't think that anyone could seriously claim to have found the "silver bullet" yet.</li>
</ul>
<br />
But even given these&nbsp;relativizations, we are pretty much off the BPM mainstream with our "camunda Hypothesis":<br />
<blockquote class="tr_bq">
<span style="font-size: large;"><i>While there are reasonable use cases for zero code BPM Suites, they are not the right approach for automating business processes that execute an IT based business model.</i></span>&nbsp;</blockquote>
<br />
A business model is "IT based", if IT is the core infrastructure to create and/or deliver the customer value. Financial Service providers, insurance companies etc. execute IT based business models, while most manufacturing companies, but also doctors etc. don't (though the relevance of IT for business models in any industry is rapidly growing).<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-vuRZ8XEIrZk/UWA_GbUuADI/AAAAAAAAACU/4659XVrpADs/s1600/businessmodel.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="254" src="http://1.bp.blogspot.com/-vuRZ8XEIrZk/UWA_GbUuADI/AAAAAAAAACU/4659XVrpADs/s640/businessmodel.png" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">business processes execute your business model &nbsp;(image: <a href="http://www.businessmodelgeneration.com/">www.businessmodelgeneration.com</a>)</td></tr>
</tbody></table>
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
One critical success factor of a business model is its uniqueness, which leads to the differentiation from competition and therefore to the leadership in the respective market (segment). The obvious conclusion is, that an IT based business model requires a very high degree of flexibility in the underlying IT infrastructure. Otherwise, the unique idea behind the model could not be implemented, or, if there would be a (customizable) "off-the-shelf" IT solution for it, it could very easily be adopted by competition - and actually could not have been really unique in the first place. The second dealbreaker criterion is, that the company must be able to create, adjust and maintain that executing infrastructure independently from external parties: A company with an IT based business model must recognize IT as their core competence (which, by the way, also means that outsourcing IT resources would be a pretty bad idea).<br />
<br />
Zero-Coding BPM suites (including most of the BPM suites currently available) cannot meet those criteria, but an open BPM platform like <a href="http://www.camunda.org/">camunda BPM</a> does, for the following reasons:<br />
<h3>
Accurately fitting solutions</h3>
<div class="separator" style="clear: both; text-align: center;">
</div>
<blockquote class="tr_bq">
<i>"The open architecture of camunda BPM allows us to implement our very individual requirements in a way that a traditional BPM suite just cannot provide."&nbsp;</i>(<a href="http://www.zalando.com/">Zalando</a>, fashion e-commerce)</blockquote>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-vgFSxJDzDUc/UWGDYJB7l-I/AAAAAAAAADE/IijbZ9LqFDY/s1600/iStock_000014266950XSmall.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="278" src="http://1.bp.blogspot.com/-vgFSxJDzDUc/UWGDYJB7l-I/AAAAAAAAADE/IijbZ9LqFDY/s320/iStock_000014266950XSmall.jpg" width="320" /></a></div>
<br />
<br />
In Zero Coding BPM, you would implement your process application using certain forms, wizards etc. The inavoidable consequence is, that you can implement anything... that the BPM vendor has imagined beforehand. But as soon as you have a requirement, that does not map to a checkbox, dropdown or what ever in the Zero Coding Wizard, you're lost. This would not necessarily be an issue - as I said, there are reasonable use cases for this approach. <b>But implementing an unique IT based business model is certainly not amongst them.</b><br />
<br />
Since camunda BPM is a (Java-based) open source framework rather than a black box product, you have the exact same freedom during implementation you always have when developing in Java. You can implement everything in the exact way it is needed for executing your business model.<br />
<blockquote class="tr_bq">
<i>"camunda BPM allows a seamless integration of process automation with non-procedural Use Cases for the case management, so that we are able to interlock optimally structural and non-structural processes."&nbsp;</i>(<a href="http://www.flightright.de/en">flightright</a>, debt collector)</blockquote>
The ability to seamlessly combine structured and semi- or unstructured processes is another advantage of this approach, and a critical foundation for any process application that should be considered "ACM-like". <br />
<h3>
No vendor specific learning curve</h3>
<blockquote class="tr_bq">
<i>"Additionally we can use our existing Java know-how combined with camunda BPM to build quickly and easily lightweight process solutions."</i> (<a href="http://www.freenet.de/">Freenet</a>, Telco Provider)</blockquote>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-jD3WLZ1MLLc/UWGCLCPS5vI/AAAAAAAAAC8/YIyzwJRRJEg/s1600/Learning-Curve-1024x709.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="275" src="http://3.bp.blogspot.com/-jD3WLZ1MLLc/UWGCLCPS5vI/AAAAAAAAAC8/YIyzwJRRJEg/s400/Learning-Curve-1024x709.png" width="400" /></a></div>
<br />
<br />
There are ~10 mio. Java developers worldwide. Think of any available BPM suite and tell me, how many according developers you would find on the market.<br />
<br />
Besides the restrictiveness described above, this is the biggest issue with traditional BPM suites: Your IT staff has to learn how do develop your process applications in a <b>vendor specific way</b>. This takes time, and most certainly your staff will never really master the vendor stack, because they cannot completely focus on it while also working on other projects with other technology stacks. In other words: It will be a huge effort to learn that vendor specific way, and if they don't continuously work with it, they will soon forget what they have learned.<br />
<br />
As a consequence, you will always depend on the know how resources (consultants etc.) the specific vendor or their partners provide. Not the smartest way to execute your business model, is it?<br />
<br />
With camunda BPM, there is no vendor specific way. You know Java? You know camunda.<br />
<br />
Zero Coding BPM vendors like to claim that you don't need your IT staff any more, because it's so easy to implement the process applications that the business users can do that on their own. I can just repeat myself: The more individual your requirements are, the more flexibility your BPM solution must provide. The more flexibility your BPM solution provides, the more complex is it to implement your process application. You won't gain anything with a form wizard instead of programming code, if that wizard consists of 25 elements your business user is expected to understand.<br />
<h3>
The force is with you</h3>
<blockquote class="tr_bq">
<i>"camunda rocks."</i> (<a href="http://www.plexiti.com/">Plexiti</a>, IT solution provider)</blockquote>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-j4rQJ5OdmrE/UWGMAZOM3XI/AAAAAAAAADk/ur7JIrjXRQk/s1600/iStock_000012998399Small.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="265" src="http://3.bp.blogspot.com/-j4rQJ5OdmrE/UWGMAZOM3XI/AAAAAAAAADk/ur7JIrjXRQk/s400/iStock_000012998399Small.jpg" width="400" /></a></div>
<br />
<br />
OK, I am getting carried away. What I really mean is this: If your business model is IT based, your software developers are probably your most valuable assets. And actually they are not just "assets" or "resources", but human beings. They can be incredibly creative and productive, but only if they have the opportunity to flower. Have a look around, at <a href="https://github.com/">GitHub</a>, at <a href="http://www.devoxx.com/">Devoxx</a> etc. There is a whole global movement of extremely talented, enthusiastic software developers who just love to create great value.<br />
<br />
You can benefit from that enormous force, if you let them create your process applications in an open, lightweight, developer-friendly environment, that can be enriched with any emerging technology or method (HTML 5 or what ever), and actually <b>makes fun to work with</b>.<br />
<br />
<blockquote class="tr_bq">
<i>"It took only a few days to highly inspire the whole project team (consisting of people from both IT and business departments) for process mapping with BPMN 2.0" (<a href="http://www.lvm.de/">LVM Versicherungen</a>, insurance company)</i></blockquote>
As I said at bpmNEXT, Business-IT-Alignment is not about getting rid of IT, but a successful collaboration between partners. We know that BPMN assumes a key role here. I would never consider camunda BPM a pure "framework for techies". We strive to inspire both Business <b>and</b> IT, to bring them together and enable them to collaboratively create the process applications they need to execute their IT based business models.<br />
<h3>
The "camunda Hypothesis" is already proven</h3>
<blockquote class="tr_bq">
<i>"camunda showed true roundtripping between third-party business-oriented modeling tools and a BPMS, the first I’ve seen to do that well." (<a href="http://brsilver.com/">Bruce Silver</a>, BPMN Super Hero)</i></blockquote>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-KHSla9RDwBY/UWGOQmOGJII/AAAAAAAAADs/mFZ2QSb7buU/s1600/approach.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="473" src="http://2.bp.blogspot.com/-KHSla9RDwBY/UWGOQmOGJII/AAAAAAAAADs/mFZ2QSb7buU/s640/approach.png" width="640" /></a></div>
<br />
<br />
A this point, I should probably make clear that our "hypothesis" has already been validated. As a consulting agency, we are in the BPM field for 5 years now (the two founders Bernd Rücker and me even for 10 years). Personally, I used to work for a well-known BPM Suite vendor before I joint forces with Bernd, and working for them as a PreSales Consultant I experienced exactly the problems I have described above.<br />
<br />
When we (camunda) finally entered the BPM software market in 2012, we quickly won way more clients than we had expected ourselves. Since March 18th, <a href="http://www.camunda.org/">this product is open source</a>, and there are several clients that agreed to be quoted what they like about it (you have found some extracts in this blog post, but <a href="http://www.camunda.org/community/users.html">there's more</a>).<br />
<br />
We hope that by open sourcing not only our technology stack, but also our know how (we started by publishing <a href="http://www.camunda.org/design/reference.html#!/reference">half of our best-selling BPMN book</a>, but there is way more to come), we can help others to recognize what actually has gone wrong in the last years of BPM, and how we could bring BPM to the next level of success (or even "crossing the chasm" <a href="http://www.column2.com/2013/03/bpmnext-opens-with-paul-harmon-keynote/">Paul Harmon has mentioned</a> at bpmNEXT).<br />
<br />
I suppose this is some hard piece of work, but I know it's worth it.<br />
<br />
<br />
<br />
<br />