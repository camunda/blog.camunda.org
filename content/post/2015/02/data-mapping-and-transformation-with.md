---
title: "Data mapping and transformation with Camunda Spin and Java 8"
date: "2015-02-05"
author: "Daniel Meyer"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/02/data-mapping-and-transformation-with.html"

---

<div>
<div>Working with text based data formats such as Xml and Json is a common requirement when implementing BPMN processes.<br />
<br />
Since version 7.2 Camunda provides an optional library which is called Camunda Spin. Spin is a lightweight wrapper library which provides a easy to use API when working with text based data formats such as XML and Json.</div><div><br />
</div><div>In this post I show how the Camunda Spin can be used for implementing data transformations and mapping in combination with the Java 8 Stream processing API and contrast this to the classical Java 6 / 7 way of doing it.<br />
<br />
<a name='more'></a></div><h3>Example</h3><div>The example we use is how to transform a list of The Big Bang Theory episodes (provided as Xml) into Json output.</div><div><br />
</div><div>The source is obtained from&nbsp;<a href="http://services.tvrage.com/feeds/episode_list.php?sid=8511">http://services.tvrage.com/feeds/episode_list.php?sid=8511</a>&nbsp;and looks like this:</div><pre class="prettyprint"><code class="language-xml">&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;show&gt;
  &lt;name&gt;The Big Bang Theory&lt;/name&gt;
  &lt;totalseasons&gt;8&lt;/totalseasons&gt;
  &lt;episodelist&gt;
    &lt;season no="1"&gt;
      &lt;episode&gt;
        &lt;epnum&gt;1&lt;/epnum&gt;
        &lt;seasonnum&gt;01&lt;/seasonnum&gt;
        &lt;prodnum&gt;276023&lt;/prodnum&gt;
        &lt;airdate&gt;2007-09-24&lt;/airdate&gt;
        &lt;link&gt;http://www.tvrage.com/The_Big_Bang_Theory/episodes/550436&lt;/link&gt;
        &lt;title&gt;Pilot&lt;/title&gt;
      &lt;/episode&gt;
      &lt;episode&gt;
        &lt;epnum&gt;2&lt;/epnum&gt;
        &lt;seasonnum&gt;02&lt;/seasonnum&gt;
        &lt;prodnum&gt;3T6601&lt;/prodnum&gt;
        &lt;airdate&gt;2007-10-01&lt;/airdate&gt;
        &lt;link&gt;http://www.tvrage.com/The_Big_Bang_Theory/episodes/603610&lt;/link&gt;
        &lt;title&gt;The Big Bran Hypothesis&lt;/title&gt;
      &lt;/episode&gt;
...
</code></pre>As Output we want to obtain a json list of all episodes which aired after 2012: <br />
<pre class="prettyprint"><code class="language-json">[{
  "name":"The Shiny Trinket Maneuver",
  "air-date":"2012-01-12"
 },
 {
  "name":"The Recombination Hypothesis",
  "air-date":"2012-01-19"
 }, ... ]
</code></pre><br />
<h3>Enable Spin in your project </h3>In order to enable Camunda Spin in your project,<br />
<br />
1) add it to your maven dependencies:<br />
<br />
<pre class="prettyprint"><code class="language-xml">&lt;dependencymanagement&gt;
    &lt;dependencies&gt;
      &lt;dependency&gt;
        &lt;groupid&gt;org.camunda.bpm&lt;/groupid&gt;
        &lt;artifactid&gt;camunda-bom&lt;/artifactid&gt;
        &lt;version&gt;7.3.0-alpha1&lt;/version&gt;
        &lt;scope&gt;import&lt;/scope&gt;
        &lt;type&gt;pom&lt;/type&gt;
      &lt;/dependency&gt;
    &lt;/dependencies&gt;
  &lt;/dependencymanagement&gt;

  &lt;dependencies&gt;
    &lt;dependency&gt;
      &lt;groupid&gt;org.camunda.spin&lt;/groupid&gt;
      &lt;artifactid&gt;camunda-spin-core&lt;/artifactid&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
      &lt;groupid&gt;org.camunda.spin&lt;/groupid&gt;
      &lt;artifactid&gt;camunda-spin-dataformat-json-jackson&lt;/artifactid&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
      &lt;groupid&gt;org.camunda.spin&lt;/groupid&gt;
      &lt;artifactid&gt;camunda-spin-dataformat-xml-dom&lt;/artifactid&gt;
    &lt;/dependency&gt;
  &lt;/dependencies&gt;
</code></pre>2) In your Java Code, add the following static import:  <br />
<pre class="prettyprint"><code class="language-java">import static org.camunda.spin.Spin.*;</code></pre><br />
<h3>Parsing the Xml input with Spin</h3><div>In order to parse the Xml input, we can use Spin's XML(...) method:</div><div></div><pre class="prettyprint"><code class="language-java">XML(xmlInput)</code></pre><div></div><div>Spin can consume Xml in the form of a string or a java.io.Reader instance.<br />
<h3>The Java 6/7 way</h3></div><div>We'll start with the classical Java way of transforming the input.</div><div><h4>Using Spin's xPath function to iterate through all episodes</h4></div><div>In oder to iterate through all episodes in the document, we can use Spin's xPath funciton:</div><div></div><div><pre class="prettyprint"><code class="language-java">for (SpinXmlElement element : XML(xmlInput).xPath("/Show/Episodelist/Season/episode").elementList()) {
  // work with the element        
}
</code></pre><h4>Getting the production Year as Integer</h4><div>Since we only want to retain those episodes which aired after 2012, we need to get the production year element for the episode and interpret it as integer:</div></div><pre class="prettyprint"><code class="language-java">for (SpinXmlElement element : XML(xmlInput).xPath("/Show/Episodelist/Season/episode").elementList()) {

  int productionYear = Integer.parseInt(element.childElement("airdate").textContent().substring(0, 4));

}</code></pre><h4>Creating an empty Json Document</h4><div>Next, lets create an empty Json document into which we can collect the episodes which aired after 2012:</div><div></div><pre class="prettyprint"><code class="language-java">SpinJsonNode resultJson = JSON("[]");</code></pre><h4>Transform the Episodes into Json </h4>Next we create a json object into which we copy the values from the xml source:  <br />
<pre class="prettyprint"><code class="language-java">SpinJsonNode episodeJson = JSON("{}")
      .prop("name", episode.childElement("title").textContent())
      .prop("air-date", episode.childElement("airdate").textContent());
</code></pre>The complete Java 6/7 source code then looks like this:  <br />
<pre class="prettyprint"><code class="language-java">SpinJsonNode resultJson = JSON("[]");

for (SpinXmlElement episode : XML(xmlInput).xPath("/Show/Episodelist/Season/episode").elementList()) {
  int productionYear = Integer.parseInt(episode.childElement("airdate").textContent().substring(0, 4));
  if(productionYear &gt;= 2012) {
    
    SpinJsonNode episodeJson = JSON("{}")
      .prop("name", episode.childElement("title").textContent())
      .prop("air-date", episode.childElement("airdate").textContent());
    
    resultJson.append(episodeJson);
  }
}
</code></pre><pre></pre><h3>The Java 8 Way</h3>Java 8 introduces the Stream API and lambdas. This allows us to write a very compact representation for obtaining the same thing:  <br />
<pre class="prettyprint"><code class="language-java">final SpinJsonNode resultJson = JSON("[]");

XML(xmlInput)
  .xPath("/Show/Episodelist/Season/episode").elementList()
  .stream()
  .filter(e -&gt; Integer.parseInt(e.childElement("airdate").textContent().substring(0, 4)) &gt;= 2012)
  .map(e -&gt; JSON("{}")
              .prop("name", e.childElement("title").textContent())
              .prop("air-date", e.childElement("airdate").textContent()))
  .forEach(e -&gt; resultJson.append(e));
</code></pre><h3>What is missing?</h3>The above example is not "purely" <a href="http://en.wikipedia.org/wiki/Functional_programming">functional</a>. In the <span style="font-family: Courier New, Courier, monospace;">forEach</span> method we collect the generated customers and append them to the <span style="font-family: Courier New, Courier, monospace;">resultJson</span> object.<br />
<br />
A more functional approach would use a <span style="font-family: Courier New, Courier, monospace;">java.util.stream.Collector</span>:<br />
<br />
<pre class="prettyprint"><code class="language-java">SpinJsonNode resultJson = XML(xmlInput)
  .xPath("/Show/Episodelist/Season/episode").elementList()
  .stream()
  .filter(e -&gt; Integer.parseInt(e.childElement("airdate").textContent().substring(0, 4)) &gt;= 2012)
  .map(e -&gt; JSON("{}")
              .prop("name", e.childElement("title").textContent())
              .prop("air-date", e.childElement("airdate").textContent()))
  .collect(asJsonList());
</code></pre><br />
The <span style="font-family: Courier New, Courier, monospace;">SpinCollectors.asJsonList()</span> method does not exist yet. This would be something the Spin library could provide. In case anybody would use this? <br />

</div>