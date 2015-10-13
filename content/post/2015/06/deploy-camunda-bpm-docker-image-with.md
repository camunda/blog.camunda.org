---
title: "Deploy a Camunda BPM Docker Image with Amazon Web Services"
date: "2015-06-26T08:55:00+02:00"
author: "Niall Deehan"

categories:
  - "Development"
tags: 
  - "amazon web services"
  - "camunda bpm platform"
  - "docker"

aliases:
  - "/2015/06/deploy-camunda-bpm-docker-image-with.html"

---

<br />
No one could argue that deploying the Camunda BPM platform to a web server is unmatched in its adrenaline-inducing excitement, but we should spare a thought for those people whose aversion to scripts and consoles has meant that they have never had the opportunity to enjoy Camunda BPM deployments to their fullest. Until now...<br />
<br />
In this post I'm going to explain in detail how you can deploy Camunda BPM to a server using docker and Amazon Web Services (AWS) and interestingly enough - it doesn't require so much as a glance at a console cursor.<br />
<br />
To achieve this we're going to be using two Amazon services:<br />
<ul>
<li>RDS - to setup the process engine's database</li>
<li>EC2 Container Service - as a container for the deployment.</li>
</ul>
<div>
The docker image will be used in conjunction with the EC2 container service to make the deployment even easier.<br />
<br />
<a name='more'></a><br />
<br />
Note: you'll need to sign up for an AWS account to follow this post, you can do that <a href="http://aws.amazon.com/">here</a></div>
<div>
<br /></div>
<h3>
Creating a Database</h3>
<div>
At this point I should let you know that you need to change your region to "EU West (Ireland)" (on the top right of the screen). This is because currently the EC2 Container Service is only available at that location (in Europe), for ease of communication we're going to create both containers in the same region.</div>
<div>
<br /></div>
<div>
To start creating a database first log into the AWS Services menu and select RDS from the arguably over populated dropdown.&nbsp;</div>
<div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-gvJm2wNrdnY/VYlAwGkjK9I/AAAAAAAAABc/W8vgLJ0izCk/s1600/SelectRDS.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="228" src="http://1.bp.blogspot.com/-gvJm2wNrdnY/VYlAwGkjK9I/AAAAAAAAABc/W8vgLJ0izCk/s400/SelectRDS.PNG" width="400" /></a></div>
Now you just need to click the "Launch a DB Instance" button to start the wizard.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-e38ZWgoshDs/VYlCJpTltpI/AAAAAAAAAB0/3kAOtDt3kQg/s1600/launch%2Ba%2BDB%2Binstance.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img border="0" height="130" src="http://2.bp.blogspot.com/-e38ZWgoshDs/VYlCJpTltpI/AAAAAAAAAB0/3kAOtDt3kQg/s320/launch%2Ba%2BDB%2Binstance.PNG" width="320" /></a></div>
<br />
For this instance we would suggest creating a PostgreSQL database. This was decided after a short debate with my colleagues, in which it was agreed (unanimously I might add) that elephants are better than dolphins.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-gocctALyx24/VYlEKgrVo2I/AAAAAAAAACA/UdxCpxzUJh8/s1600/postgreSQL%2Bselect.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="199" src="http://4.bp.blogspot.com/-gocctALyx24/VYlEKgrVo2I/AAAAAAAAACA/UdxCpxzUJh8/s320/postgreSQL%2Bselect.PNG" width="320" /></a></div>
<br />
We're not planning on doing too much production with this database so on the next screen select <b>No</b>.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-Loy08H6WkV4/VYlErE-lf5I/AAAAAAAAACI/MfuFY-3whYY/s1600/production%2Bdatabase.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="208" src="http://3.bp.blogspot.com/-Loy08H6WkV4/VYlErE-lf5I/AAAAAAAAACI/MfuFY-3whYY/s400/production%2Bdatabase.PNG" width="400" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
So now we need to add the DB details - which I've kindly added in the screen shot below.</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-IB0kKbMedfM/VYlGMSoY9YI/AAAAAAAAACc/pVQbDq7mtoM/s1600/DbSettings.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="http://4.bp.blogspot.com/-IB0kKbMedfM/VYlGMSoY9YI/AAAAAAAAACc/pVQbDq7mtoM/s640/DbSettings.PNG" width="526" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Final step now, where we'll be configuring the advanced settings, which should come as no surprise if you've looked at the name of this particular step. Once again the settings are available in the screen shots below</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-OCGQs8_rp-U/VYlHj_mqwMI/AAAAAAAAACo/_07deObYQFM/s1600/db%2Badvanced%2Bsettings%2B1.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="http://3.bp.blogspot.com/-OCGQs8_rp-U/VYlHj_mqwMI/AAAAAAAAACo/_07deObYQFM/s640/db%2Badvanced%2Bsettings%2B1.PNG" width="536" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-oVTf6iig17Q/VYlHo3QcKnI/AAAAAAAAACw/vUGfmFVrGhQ/s1600/db%2Badvanced%2Bsettings%2B2.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="280" src="http://3.bp.blogspot.com/-oVTf6iig17Q/VYlHo3QcKnI/AAAAAAAAACw/vUGfmFVrGhQ/s640/db%2Badvanced%2Bsettings%2B2.PNG" width="640" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
Now click the launch button and in no time at all you'll see a helpful little message saying that your DB instance is being created. Click on the "View Your DB Instance" button to watch the magic, and by "magic" I of course mean "a little blue rotating circle". You might need to wait a short while, but eventually the status will turn green and read as "available" and by expanding it, you should see the following:</div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-LkxSpvaufzM/VYlKD7-HA_I/AAAAAAAAADE/3Dw4WPkShY4/s1600/db%2Bavailale..PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="284" src="http://1.bp.blogspot.com/-LkxSpvaufzM/VYlKD7-HA_I/AAAAAAAAADE/3Dw4WPkShY4/s640/db%2Bavailale..PNG" width="640" /></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
Our sharper-eyed readers will have noticed that I circled the Endpoint url for the database. Which in my case is "processenginedemo.chg37mv5ului.eu-west-1.rds.amazonaws.com".You should memorize it (or copy it) as you're going to need that later on when setting up the EC2 Container.<br />
<br />
<h3>
Creating an EC2 Container</h3>
<div>
Now to create the EC2 Container. The idea here is to create a simple container that will load and deploy a docker image of the Camunda platform. To start we return to the overcrowded Services menu and select "EC2 Container Service"</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-kg7EA0pz0Sc/VYlPB605VwI/AAAAAAAAADU/3Rt6czEuyE4/s1600/EC2%2Bselect.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="240" src="http://1.bp.blogspot.com/-kg7EA0pz0Sc/VYlPB605VwI/AAAAAAAAADU/3Rt6czEuyE4/s400/EC2%2Bselect.PNG" width="400" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div>
<br /></div>
<div>
Amazon has created a handy little wizard for creating the container, click the "Get started" button to begin the fun!&nbsp;</div>
<div>
<br /></div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-r9HAzbvio6c/VYlPy6eknuI/AAAAAAAAADc/rOBBRK9zkUA/s1600/EC2%2Bget%2Bstarted.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="150" src="http://3.bp.blogspot.com/-r9HAzbvio6c/VYlPy6eknuI/AAAAAAAAADc/rOBBRK9zkUA/s320/EC2%2Bget%2Bstarted.PNG" width="320" /></a></div>
We're going to be creating our own custom definition, so select accordingly<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-AdoAtYwosAc/VYlQLXRUYtI/AAAAAAAAADk/4HposErxyAw/s1600/EC2%2Bcustom.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="213" src="http://3.bp.blogspot.com/-AdoAtYwosAc/VYlQLXRUYtI/AAAAAAAAADk/4HposErxyAw/s400/EC2%2Bcustom.PNG" width="400" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
<br /></div>
<br />
The next step of the wizard is where the task definition is named, memory is allocated and parameters are created. To make that whole process both faster and easier you can click on the JSON tab and simply paste this JSON text which I've created with my own fair hands.<br />
<br />
<pre class="prettyprint"><code>
{
  "family": "Camunda",
  "containerDefinitions": [
    {
      "name": "camunda_bpm_platform",
      "image": "camunda/camunda-bpm-platform",
      "cpu": "800",
      "memory": "500",
      "entryPoint": [],
      "environment": [
        {
          "name": "DB_DRIVER",
          "value": "org.postgresql.Driver"
        },
        {
          "name": "DB_USERNAME",
          "value": "camunda"
        },
        {
          "name": "DB_PASSWORD",
          "value": "nobullshitbpm"
        },
        {
          "name": "DB_URL",
          "value": "jdbc:postgresql://processenginedemo.chg37mv5ului.eu-west-1.rds.amazonaws.com"
        }
      ],
      "command": [],
      "portMappings": [
        {
          "hostPort": "80",
          "containerPort": "8080"
        }
      ],
      "volumesFrom": [],
      "links": [],
      "mountPoints": [],
      "essential": true
    }
  ],
  "volumes": []
}

</code></pre>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-Wz7vyueORSo/VYlTZryd3uI/AAAAAAAAADw/3c9FBX9HQ0Q/s1600/EC2%2BJSON%2BBuild.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="338" src="http://2.bp.blogspot.com/-Wz7vyueORSo/VYlTZryd3uI/AAAAAAAAADw/3c9FBX9HQ0Q/s640/EC2%2BJSON%2BBuild.PNG" width="640" /></a></div>
<br />
When you click back to the "Build" tab, you will see an entry called "camunda_bpm_platform" in the container definitions. The fun hasn't ended yet - click on the definition because you still need to change one of the variables. Remember the database link that I told you to memorize? Well you're going use it to create the DB_URL variable.<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-E7u8NnY-Nrw/VYlVbH4299I/AAAAAAAAAD8/Su9urHzn7CY/s1600/EC2%2Burl%2Bvariable.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="270" src="http://2.bp.blogspot.com/-E7u8NnY-Nrw/VYlVbH4299I/AAAAAAAAAD8/Su9urHzn7CY/s640/EC2%2Burl%2Bvariable.PNG" width="640" /></a></div>
<br />
<br />
In the annoying tiny text field circled above add "jdbc:postgresql://" followed by the link to your database. Once you've done that - click update and move onto the next step.<br />
<br />
While on the next step, if someone happens to ask you what you're doing, you can tell them "I'm defining a service, giving it a name and setting up elastic load balancing". It sounds a lot better than the reality, which is that you're just copying from the screen shot below:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-1yO5y5pGftw/VYlZS-Bb8nI/AAAAAAAAAEI/YT4XDnZ4zlM/s1600/EC2%2Bload%2Bbalancer.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="320" src="http://2.bp.blogspot.com/-1yO5y5pGftw/VYlZS-Bb8nI/AAAAAAAAAEI/YT4XDnZ4zlM/s640/EC2%2Bload%2Bbalancer.PNG" width="640" /></a></div>
<br />
The final part of the setup is configuring the cluster and sorting out security groups. The top half of the step deals with the latter. You can see the settings in the screenshot below:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-7nYmBRBj9tA/VYpeSAPyPOI/AAAAAAAAAEc/fWRI9XnMTec/s1600/EC2%2Bcluster%2Bconfig.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="248" src="http://4.bp.blogspot.com/-7nYmBRBj9tA/VYpeSAPyPOI/AAAAAAAAAEc/fWRI9XnMTec/s640/EC2%2Bcluster%2Bconfig.PNG" width="640" /></a></div>
<br />
In the IAM Role information sections you'll need to create an ECS instance role and an ECS service role. This is actually a really straightforward process, click on the button circled below<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-41DoePZPy6k/VYpgfVZbkWI/AAAAAAAAAE4/hOJgn4nOeSU/s1600/EC2%2BCluster%2Bsecurity.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="320" src="http://3.bp.blogspot.com/-41DoePZPy6k/VYpgfVZbkWI/AAAAAAAAAE4/hOJgn4nOeSU/s640/EC2%2BCluster%2Bsecurity.PNG" width="640" /></a></div>
<br />
which will bring you to the following page - you don't need to do anything more than simply clicking "Allow". Then you can return to the IAM Role information page and you'll able to select the two roles from the drop down menu.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-i__bdtk4D3Q/VYphvs0iyBI/AAAAAAAAAFA/FqvRdNIqONo/s1600/EC2%2Bcreating%2Broles.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="221" src="http://3.bp.blogspot.com/-i__bdtk4D3Q/VYphvs0iyBI/AAAAAAAAAFA/FqvRdNIqONo/s400/EC2%2Bcreating%2Broles.PNG" width="400" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: left;">
The last thing to do on this step is to click "Review &amp; Launch". It should come as no surprise to anyone that once that button is clicked you'll be taken to the final step where you'll get to... (spoiler)... review and launch your instance.&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
So before the excitement of coming to the end of this setup wizard overtakes you completely - click "Launch Instance and Run Service".&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">
More behind-the-scenes magic is taking place - this is visualized by an unremarkable blue bar slowly crawling from left to right.&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-NAcoiXNzC8o/VYpsJQeR1vI/AAAAAAAAAFQ/LysZk7_pT90/s1600/EC2%2Bfinal%2B2.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="300" src="http://3.bp.blogspot.com/-NAcoiXNzC8o/VYpsJQeR1vI/AAAAAAAAAFQ/LysZk7_pT90/s640/EC2%2Bfinal%2B2.PNG" width="640" /></a></div>
<br />
&nbsp;When it eventually finishes you can go back to the EC2 container service though the services menu and instead of being greeted by a creation wizard, you'll in fact see your newly setup cluster, lazily named "default"<br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-yX1zF8bDnHk/VYpujHH-VmI/AAAAAAAAAFc/oTnNiAmfFZY/s1600/Cluster.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="220" src="http://4.bp.blogspot.com/-yX1zF8bDnHk/VYpujHH-VmI/AAAAAAAAAFc/oTnNiAmfFZY/s320/Cluster.PNG" width="320" /></a></div>
<br />
Click on the cluster's name to have a look at what's going on inside, you'll see a task running in the Tasks tab. If you don't see the task up and running - have no fear, it might take a minute or two. Meanwhile in the ECS Instance tab you'll see the container instance.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-JTL9uMRmU2s/VYp1tsmWpAI/AAAAAAAAAFs/_sCqp63Kl78/s1600/Cluster%2Bcontainer.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="284" src="http://1.bp.blogspot.com/-JTL9uMRmU2s/VYp1tsmWpAI/AAAAAAAAAFs/_sCqp63Kl78/s640/Cluster%2Bcontainer.PNG" width="640" /></a></div>
Clicking on the name of the instance will bring you to a page displaying more details about the container including the public DNS.<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-g3nwuzndiKI/VYp2vpM2abI/AAAAAAAAAF0/1deAGiQjbOQ/s1600/Cluster%2BDNS%2Blink.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="132" src="http://4.bp.blogspot.com/-g3nwuzndiKI/VYp2vpM2abI/AAAAAAAAAF0/1deAGiQjbOQ/s320/Cluster%2BDNS%2Blink.PNG" width="320" /></a></div>
<br />
<br />
Following that link in your browser will bring you to an apache tomcat page and adding "/camunda"<br />
to the end of the link will bring to what we've all been waiting for - the Camunda BPM platform!<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-ONNFgo4-zJA/VYp3YMtmbsI/AAAAAAAAAGA/k4gTv1OlveQ/s1600/Cluster%2Bcamunda%2Bplatform.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="342" src="http://4.bp.blogspot.com/-ONNFgo4-zJA/VYp3YMtmbsI/AAAAAAAAAGA/k4gTv1OlveQ/s640/Cluster%2Bcamunda%2Bplatform.PNG" width="640" /></a></div>
Now you can relax and enjoy playing with skillfully-automated processes all thanks to me (and to a lesser extent AWS)!<br />
<br />
<br /></div>
