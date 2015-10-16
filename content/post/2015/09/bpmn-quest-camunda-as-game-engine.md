---
title: "BPMN Quest - Camunda as a Game Engine!"
date: "2015-09-01"
author: "Niall Deehan"

categories:
  - "Execution"
tags: 
  - "Release Note"

aliases:
  - "/2015/09/bpmn-quest-camunda-as-game-engine.html"

---

<div>
This year at the annual Camunda hackdays one team bravely took it upon themselves to balance out the innovative and useful projects with something fun and frivolous. For two days somewhere in Brandenburg we were "Awesome-Team-Awesome" and we turned the Camunda engine into a platform to create a D&amp;D style quest game. We call it BPMN Quest.<br />
<br />
If you can't wait for it - <a href="http://ec2-52-19-141-24.eu-west-1.compute.amazonaws.com:8080/CharacterCreator/frontend/?game=adventure">here you can play it right away</a>.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-nFSdVVfG5C0/VeVvooqds9I/AAAAAAAAAJw/ykL0zLjW3x0/s1600/startScreen.PNG" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="327" src="http://4.bp.blogspot.com/-nFSdVVfG5C0/VeVvooqds9I/AAAAAAAAAJw/ykL0zLjW3x0/s640/startScreen.PNG" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Start page for bpmn quest.</td></tr>
</tbody></table>
<br />
<br />
<a name='more'></a><br />
The project was split into a few different features and handed out to the reverently skilled members of the (awesome) team (awesome).<br />
<ul>
<li>Location Map - showing the current location of the character as they moved through the story was given over to <a href="https://github.com/pedesen">Paddy </a>with help from <a href="https://github.com/quoka">Neville</a>.</li>
<li>Player's Quest Page - the interface that the user playing the game would see, including story text, pictures and decision buttons was all in the safe hands of <a href="https://github.com/SebastianStamm">Sebastian</a>.</li>
<li>Dungeon Builder- a restricted version of the<a href="http://bpmn.io/"> bpmn.io</a> modeler that would let users create stories to be played by the engine. <a href="https://github.com/pedesen">Paddy </a>accepted this challenge. </li>
<li>Game Mechanics - this included a monster fighting engine, riddles, character creation and many other behind the scenes features. <a href="https://github.com/jakobfreund">Jakob </a>and <a href="https://github.com/NPDeehan/">Myself </a>worked on that.</li>
<li>A Quest - A nice little quest created in order to utilize (and test) all features we had implemented was also created by <a href="https://github.com/jakobfreund">Jakob </a>and <a href="https://github.com/NPDeehan/">Myself</a>. </li>
<li>Integration - who doesn't enjoy integrating independently developed features into one seamless application? We all took part in this particular challenge. </li>
</ul>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-cXb-m6l7UL4/VeVvp0fmgoI/AAAAAAAAAKA/ua9zZkHNXe0/s1600/startgame.PNG" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="484" src="http://3.bp.blogspot.com/-cXb-m6l7UL4/VeVvp0fmgoI/AAAAAAAAAKA/ua9zZkHNXe0/s640/startgame.PNG" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Player interface, the font end bpmn quest</td></tr>
</tbody></table>
We wanted to ensure that the game engine and front end UI was as decoupled as possible from the story being played. This would ensure that people could create their story and deploy it without needing to worry about integration with either the front end or the back end. To accomplish this we standardized how the communication between the engine and the front end was made.<br />
<br />
The front end would ask the engine for the current user task and would receive a few objects it would use to display the story. Including a story object, a character object and a list containing possible choices to be made at that point in the story. Someone creating a new quest would just need to populate a few java objects in either a service task or as input variables to a predefined call activity called "Story Item". <br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-twJQUwdVr2Q/VeVvoJfWaNI/AAAAAAAAAKE/6cJBck2KBYs/s1600/dungeon-builder.gif" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="440" src="http://1.bp.blogspot.com/-twJQUwdVr2Q/VeVvoJfWaNI/AAAAAAAAAKE/6cJBck2KBYs/s640/dungeon-builder.gif" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Dungeon builder, the place where quests are born.</td></tr>
</tbody></table>
<br />
We also utilized the BPMN standard in order to orchestrate the progression of the quest. Exclusive gateways are used for the choices the player would make. Call activities show up for reoccurring events like fighting monsters or answering riddles. We also used an event-sub process which is scoped to be evoked when ever the game ends (either through death or victory).<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-i5ETKLuWnpY/VeVvowzTYaI/AAAAAAAAAJ4/9MskRk9qNl4/s1600/You%2527re%2BDead.PNG" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="482" src="http://2.bp.blogspot.com/-i5ETKLuWnpY/VeVvowzTYaI/AAAAAAAAAJ4/9MskRk9qNl4/s640/You%2527re%2BDead.PNG" width="640" /></a></td></tr>
<tr><td class="tr-caption" style="text-align: center;">Final screen when you've died. </td></tr>
</tbody></table>
<br />
You can actually<a href="http://ec2-52-19-141-24.eu-west-1.compute.amazonaws.com:8080/CharacterCreator/frontend/?game=adventure"> play it online now</a> and you can also download the source <a href="https://github.com/NPDeehan/bpmn-quest">from Github</a>. It was a lot of fun to make - and we hope that it's also a bit of fun to play.
</div>