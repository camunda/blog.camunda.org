+++
author = "Bernd Rücker"
categories = ["Modeling", "Community"]
date = "2016-01-28"
tags = ["DMN", "Testing"]
title = "Testing DMN Decision Tables"
+++

We did a very successful [roadshow](http://www.bpm-guide.de/2016/01/27/camunda-roadshow-x-done/) the last weeks showing [DMN](https://camunda.org/dmn/tutorial/) amongst other topics. One thing which was always discussed is **how to validate/test** DMN decision tables.

I want to start with a quote of myself (to give you a good impression on my ego ;-)):

> When authoring rules in a more agile, business-friendly way, do not forget about testing them in a more agile, business-friendly way.

This post shows various approaches discussed on the roadshow.

<!--more-->

# Some approaches to test decision tables

* **Unit Tests**: Test Cases written in Java Code.
  * Easy automatable
  * Test Cases are part of the development project
  * Not business friendly
* **Parameterized Unit Tests leveraging Excel Spreadsheets**: Test Cases written in Java Code, loading input data from a Excel Spreadsheet.
  * Easy automatable
  * Test Cases are part of the development project
  * Excel is very business friendly
* **Spock Framework**: Test Cases written in a Groovy DSL making them business readable.
  * Easy automatable
  * Test Cases are part of development project
  * Groovy means a new language, but runs on Java Virtual Machine
  * Reports are business readable
* **Fitnesse Framework**: Test Cases are defined in a Wiki and are directly runnable from there. Requires Java Glue Code to run. Setup is a bit complicated.
  * Complex setup and a bit of work to automate.
  * Test cases are kept seperate from development project.
  * Very business friendly. Business can even do test roundtrips without any developer involved.

Now lets dive into the details.

# Unit Tests

The easiest way to write test cases is to write plan [JUnit](http://junit.org/) tests, where you get some support by Camunda. You can test this table:

{{< figure src="determineEmployee.png"  caption="DMN Decision Table: Determine Employee">}}

by a simple test case:

```java
DmnDecisionTableResult decisionResult = decisionService
  .evaluateDecisionTableByKey("determineEmployee", Variables.createVariables()
      .putValue("type", "Car Accident")
      .putValue("expenditure", 30000));

assertEquals(1, decisionResult.getResultList().size());
assertEquals("Schmidt", decisionResult.getSingleResult().getEntry("employee"));
assertEquals(true, decisionResult.getSingleResult().getEntry("4eyes"));
```

We might add assertions to [camunda-bpm-assert](https://github.com/camunda/camunda-bpm-assert) in future to make your life easier here. 



# Parameterized Unit Tests leveraging Excel Spreadsheets

Lars Orta from our Partner [iteratec](http://www.iteratec.de/) demonstrated in Munic how you can parameterize these JUnit tests and load the test data from an excel file. So after the initial technical setup the test cases in Excel could be filled by a business analyst! Everything can be normally automated in a Continous Integration Environment.

The decision table example shows how a telecommunication company can determine the throughput for the internet connection depending on the technical line in your home:

{{< figure src="technischerDurchsatz.png" caption="DMN Decision Table: Technischer Durchsatz">}}

This is tested by these test cases defined in a plain Excel spreadsheet:

{{< figure src="technischerDurchsatzExcel.png" caption="Testcases defined in Excel Spreadsheet">}}

These test cases are handed into the parametrized JUnit test case shown below and we get a green bar:

{{< figure src="technischerDurchsatzJunit.png" caption="Test run in JUnit">}}

The JUnit code is pretty straight forward (I skipped the Excel parsing code using [Apache POI](https://poi.apache.org/), which is not very hard to write and dependant on the concrete spreadsheet structure you want to have):

```java
public class TechnischerDurchsatzExcelTest {

  private TechnischerDurchsatzTestData mtdTestData;

  public TechnischerDurchsatzExcelTest(TechnischerDurchsatzTestData mtdTestData) {
    this.mtdTestData = mtdTestData;
  }

  @Parameters(name = "#{index}:  {1} = {0}")
  public static Collection<Object[]> data() {
    return ExcelUtils.getTestData();
  }

  @Test
  public void berechneTechnischenDurchsatz() {
    VariableMap variables = Variables
        .putValue("kabeltyp", this.mtdTestData.getKabeltyp())
        .putValue("kabellaenge", this.mtdTestData.getKabellaenge())
        .putValue("nutzungsrechtLeitung", this.mtdTestData.isNutzungsrechtLeitung())
        .putValue("einbaustatusHausanschluss", this.mtdTestData.getEinbaustatusHausanschluss());

    DmnDecisionTableResult result = decisionService
      .evaluateDecisionTableByKey("technischerDurchsatz", variables);

    assertEquals(this.mtdTestData.getTechnischerDurchsatzExpected(),
        result.getSingleResult().getSingleEntry());
  }
```

Cool stuff!

By the way, you do not have to use Spreadsheets in order to parameterize JUnit test cases, this can be done with pure code also:

```
public class TechnischerDurchsatzTest {

  private String kabeltyp;
  private Integer kabellaenge;
  private boolean nutzungsrechtLeitung;
  private String einbaustatusHausanschluss;
  private Integer technischerDurchsatzExpected;

  public TechnischerDurchsatzTest(String kabeltyp, Integer kabellaenge, boolean nutzungsrechtLeitung, String einbaustatusHausanschluss, Integer technischerDurchsatzExpected) {
    this.kabeltyp = kabeltyp;
    this.kabellaenge = kabellaenge;
    this.nutzungsrechtLeitung = nutzungsrechtLeitung;
    this.einbaustatusHausanschluss = einbaustatusHausanschluss;
    this.technischerDurchsatzExpected = technischerDurchsatzExpected;
    this.technischerDurchsatzExpected = technischerDurchsatzExpected;
  }

  @Parameters(name = "#{index}:  {0}, {1}, {2}, {3} -> {4}")
  public static Collection<Object[]> data() {
    Object[][] data = new Object[][] { //
        { "Kupfer", 10, true, "ANGESCHLOSSEN", 25 }, //
        { "Kupfer", 49, true, "ANGESCHLOSSEN", 25 }, //
        { "Kupfer", 50, true, "ANGESCHLOSSEN", 20 }, //
        { "Kupfer", 150, true, "ANGESCHLOSSEN", 20 }, //
        { "Kupfer", 300, true, "ANGESCHLOSSEN", 15 }, //
        { "Kupfer", 600, true, "ANGESCHLOSSEN", 10 }, //
        { "Kupfer", 1499, true, "ANGESCHLOSSEN", 10 }, //
        { "Kupfer", 2500, true, "ANGESCHLOSSEN", 7 }, //
        ...
```



# Parameterized Unit Tests wih automatic permutations?

We discussed in Vienna that these parameterized unit tests could be used in order to test all possible input value combinations automatically. This could serve to test if the hit policy of the table is correct. For example that for "UNIQUE" really only one rule applies. Or that at least one rule is true for every input. Or... Interessting idea!




# Spock

Martin Schimak from our Partner [Plexiti](http://plexiti.com/), who already contributed the [camunda-bpm-assert](https://github.com/camunda/camunda-bpm-assert) framework, started the new initiative [camunda-bpm-spock](https://github.com/plexiti/camunda-bpm-spock), using *the* testing framework from the Groovy world: [Spock](http://spockframework.org/). This allows to write tests in a special DSL, which is a compromise between being business readable but still being code. The resulting test cases can be run locally but also automated in the Continous Integration Environment. 

Martin gave some background in his presentation:

<script async class="speakerdeck-embed" data-id="9d632ed7641747ed8450f2b39346daf5" data-ratio="1.41436464088398" src="//speakerdeck.com/assets/embed.js"></script>

Remember the decision table from the first Unit Test? This can be tested by the following Spock test case:

```groovy
class Prüfbeispiele_zur_Bestimmung_eines_Mitarbeiters extends DecisionSpec {                             

    @Deployment(["dmn/MitarbeiterBestimmung.dmn"])                                                       

    @Unroll("Im Bereich '#Schadenart' entscheidet Mitarbeiter #MitarbeiterErwartet für Fälle            
             in Höhe von EUR #Schadenhoehe #MitVierAugenPrinzip 4-Augen-Prinzip")                        

    void "Prüfbeispiele zur Bestimmung eines Mitarbeiters"() {                                           

        when: "Das Regelwerk zur Bestimmung eines Mitarbeiters ausgewertet wird ..."                     

            Map decision = unique(type: Schadenart, expenditure: Schadenhoehe)                           

        then: "entscheidet je nach Schadenart und -höhe ein erwarteter Mitarbeiter ..."                  

            decision['employee'] == MitarbeiterErwartet                                                  

        and: "ebenfalls nach Schadenart und -höhe entscheidet dieser wie erwartet allein oder auch nicht"

            decision['4eyes'] == VierAugenErwartet                                                       

        where: "Fallsituation und Zuständigkeit des Mitarbeiter wie folgt"                               

            Schadenart    | Schadenhoehe | MitarbeiterErwartet | VierAugenErwartet                       
            "Unfall KFZ"  | 100          | "Müller"            | false                                   
            "Unfall KFZ"  | 1500         | "Meier"             | false                                   
            "Unfall KFZ"  | 15000        | "Schmid"            | true                                    

    }                                                                                                    

}        
```
which results in this HTML report:

{{< figure src="spock1.png" caption="HTML report of test runs">}}

The visualization of differences found is pretty cool:

{{< figure src="spock2.png" caption="Visualization of differences">}}

More details can be found in the [GitHub Repository](https://github.com/plexiti/camunda-bpm-spock) from Martin, please go there for details, and he is happy to take feedback!




# Fitnesse

Personally I did a demo using the [Fitnesse Open Source Framework](http://www.fitnesse.org/). There you write a so called fixture (a special Java class), which takes input from a wiki table and does whatever you want with it, e.g. sending it via Java or REST to the Camunda DMN Engine. This can be triggered by a button in the Wiki and the result is directly compared to the expected result and shown in the table.

The screencast below gives you an impression. I live edit the decision table (which is possible in Camunda BPM 7.4) to let a test case fail. Then I fix the test case in the Wiki and re-run the tests which gives a green bar:

<p>
<iframe src="https://player.vimeo.com/video/153411995" width="500" height="334" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
</p>


# Conclusion

Testing decision tables in a more agile, business-friendly way is possible! There are clearly advantages and disadvantages of the various approaches shown here. But I am sure every project can find a suited method. 

Let me know what you think!
