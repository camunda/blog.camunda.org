+++
author = "Jakob Freund"
categories = ["Community"]
date = "2020-05-20T09:00:00+01:00"
tags = ["Camundaconlive"]
title = "Is the Future of RPA Promising or Perilous?"
+++

I recently participated in a CamundaCon Live panel, led and moderated by Jason Bloomberg at [Intellyx](https://intellyx.com/), about how enterprises are currently using RPA. My fellow panelists (Vittorio Dal Bianco at Nokia, Marco Einacker at Deutsche Telekom and Paul Jones at NatWest) provided a fascinating look on the benefits and limitations of this much-discussed technology.

During the panel, I gave an analogy to illustrate the issues I’ve seen with RPA implementations:. I have suffered from back problems in the past. When I experienced back pain, that pain then caused my muscles to stiffen, which caused more pain. To help with this, I could take pain medicine, like ibuprofen. However, in order to really get rid of the back pain, I also needed to do physical therapy and modify my diet and this requires discipline. If I hadn’t worked on my physical therapy and diet, I may have solved my problem by taking ibuprofen in the short-term. But ibuprofen didn’t get rid of my back problems in the long-term.

Similarly, companies can take short-term pain caused by inefficiencies away with RPA, but they also need to invest in long-term solutions to embrace process automation and replace underlying legacy systems with a modernized IT infrastructure that comes with a proper API, thus removing the need for UI based integration. This requires time and discipline, just like physical therapy, but pays off in the long term.

Here are some key takeaways from the session that might be useful if you are beginning your RPA journey, or are currently taking stock of best practices.
<ol>
<li>__RPA can provide some key benefits, like cost savings and improved data quality.__</li>
  <ul>
    <li>Implementing RPA can result in major cost savings.</li>
      <ul>
        <li>At Deutsche Telekom, RPA has resulted in savings of more than 100 million Euros.</li>
        <li>NatWest has achieved “eight figure savings” from using RPA in the last few years.</li>
      </ul>
    <li>RPA can help deploy employees to more useful, customer-facing roles, as opposed to tedious and error-prone manual data entry.</li>
    <li>All panelists agreed that RPA has improved data quality, especially when compared to manual data entry completed by employees. The RPA bots can be much more accurate than their human counterparts.</li>
  </ul>

<li>__Companies need to know that RPA is a short-term solution.__</li>
  <ul>
    <li>All the panelists agreed that RPA is more of a tactical band-aid measure and Paul said NatWest even classifies RPA as “technical debt.”</li>
      <ul>
        <li>RPA is a useful short-term solution for many companies to selectively automate the work of individual components in legacy systems, and help automate processes without a significant time investment, as well as IT implementation involving monoliths. But there are issues with it using long-term.</li>
      </ul>  
    <li>RPA is very maintenance-intensive, because the bots are brittle. If your front end changes, your RPA bot doesn’t work anymore.</li>
      <ul>
        <li>Marco at Deutsche Telekom gave a good example of this brittleness: Bots work like human workers, so their passwords have to change every 90 days. That one factor leads to breakages, and lots of maintenance issues with the bots.</li>
      </ul>
    <li>Finding professionals with the right skills to implement RPA can also be very difficult, as Paul at NatWest noted.</li>
  </ul>
<li>__Camunda solutions compliment RPA, helping companies to better automate processes as they digitize their businesses.__</li>  
  <ul>
    <li>Nokia, Deutsche Telekom and NatWest are all using Camunda to help with RPA projects.</li>
    <ul>
      <li>Marco and his team are re-orchestrating their RPA bots with Camunda and have begun to replace some of these RPA bots with API-based interfaces. This helps Deutsche Telekom maintain the RPA savings while moving to a less maintenance-intensive and better-integrated backend automation. (To read more about how Camunda is helping with Deutsche Telekom’s digital transformation, click [here](https://camunda.com/about/press/digital-transformation-deutsche-telekom-counts-on-camunda-for-process-automation-and-rpa-orchestration/).)</li>
      <li>Nokia is using [Optimize](https://camunda.com/products/optimize/reports/) to help monitor RPA bots within Vittorio Dal Bianco’s supply chain management division. Camunda captures events that are generated in those bots and looks at the data in real-time, helping to provide visibility into end-to-end business processes.</li>
      <li>Paul shared how NatWest is developing a process where Camunda will manage UiPath bots in the anti-credit fraud team</li>
    </ul>
  </ul>
</ol>
I believe Deutsche Telekom, Nokia and NatWest are doing the right thing by digitizing and automating their business processes with the long-term in mind.

Our “Promise or Peril: The Future of RPA” panel discussion is available to [watch on-demand](https://gateway.on24.com/wcc/eh/2260438/lp/2323976/on-demand-panel-discussion-promise-or-perilthe-future-of-rpa) now on our CamundCon Live Hub. And feel free to [get in touch with us](https://camunda.com/contact/) if you’d like to learn more about how Camunda enables digital transformation.
