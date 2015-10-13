---
title: "How to clean up/purge the camunda history tables"
date: "2015-07-07T16:19:00+02:00"
author: "Ingo Richtsmeier"

categories:
  - "Development"
tags: 

aliases:
  - "/2015/07/how-to-clean-uppurge-camunda-history.html"

---

We get this question very often from customers: <b>How can we get rid of old history data that we don't need anymore?</b>&nbsp;First it's important to ask: "What do you mean by 'old data'?". This is completely business focused and depends on the use of cockpit, who is working with the history data, how reports are generated and maybe even constraints due to legislation.<br />
<br />
One of our customers - Hamburger Sparkasse (<a href="http://www.haspa.de/" target="_blank">Haspa</a>) - built a solution that is flexible enough to address the issues raised by the questions above:<br />
<a name='more'></a><ul>
<li>They created a bunch of <b>SQL scripts</b></li>
<li>Created a <b>parameter</b>&nbsp;for&nbsp;the <b>number of days</b> that completed process instances should remain in the database</li>
<li>which then&nbsp;<b>moved the old data into a set of archive tables</b> and marked them with the time-stamp and a sequence number of the cleanup run.</li>
<li>This <b>ensures the process can be&nbsp;undone</b> in case data is moved accidentally - or if you recognize later on that you still need it.</li>
</ul>
<div>
The source code is available in our consulting repository (thanks to Haspa for allowing this!):</div>
<div>
<br /></div>
<div>
<a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/clean-up-history">https://github.com/camunda/camunda-consulting/tree/master/snippets/clean-up-history</a></div>
<br />
<h3>
How can you start it?</h3>
Load the scripts from our repo&nbsp;into your oracle database (we tested them with Oracle 12c). There are scripts that must run once to prepare everything (STEP-1 and STEP-2). STEP-3 loads a PL/SQL-Function which can be started as follows:<br />
<code><br /></code>
<code>select ARCHIVE_CAMUNDA_HISTORY(9, 20) from DUAL; -- Archive PI's older then 9 days and max. 20 instances</code><br />
<br />
If you run<br />
<br />
<code>
select ARCHIVE_CAMUNDA_HISTORY(180, 0) from DUAL;</code><br />
<br />
All process instances, that are completed more than 180 days before today will be moved into the archive tables.<br />
<br />
STEP-4 is made for Restore/Rollback. Run the file once in your SQLDeveloper to compile the function and start it with:<br />
<br />
<code>
select ROLLB_ARCHIVE_CAMUNDA_HISTORY(7, -1, 10) from DUAL;</code><br />
<br />
where 7 is the number of the starting cleanup sequence number, the second parameter is a max cleanup sequence number (-1 means that only the first parameter counts) and the third parameter is the number of process instances that should be restored. 0 for the third parameter restores all process instances from the archive runs:<br />
<br />
<code>
select ROLLB_ARCHIVE_CAMUNDA_HISTORY(8, 10, 0);</code><br />
<code><br /></code>
You will find more detailed documentation <a href="https://github.com/camunda/camunda-consulting/tree/master/snippets/clean-up-history/oracle-scripts" target="_blank">in the code</a>. Its worth it to have a look.<br />
<br />
To get rid of the new tables and functions, there is of course DROP-Script, too.<br />
<h3>
How does it work?&nbsp;</h3>
The archiving function checks first for process instances in the history that match the archiving arguments. It copys the process instance ids into a temporary table.



Then it generates SQL Scripts to insert the data from the history tables into the archive tables and to delete the data from the history.



Afterwards it checks for bytearrays referenced from the archived process instances in the VARINST- and DETAIL-Table.



If there are any, the data are moved, too.<br />
<br />
The restore/rollback function does it the other way around and moves the data from the archive table back into the history table. Now they appear in the cockpit again.


