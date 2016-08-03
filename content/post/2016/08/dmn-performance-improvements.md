+++
author = "Philipp Ossler"
categories = ["Execution"]
date = "2016-08-08"
tags = ["DMN"]
title = "Improving the Performance of the Camunda DMN Engine"
+++

8 Months ago, we created a benchmark for the DMN engine and measured the number of decision tables the engine can evaluate per second. Now, we had a second look at it to find a way to make the DMN engine even faster. In our benchmarks we see improvements in throughput of up to 6x.

<!--more-->

# Improvements

We used the technique of active benchmarking and ran a profiler while executing the benchmark. The profiler allowed us to break down the time the DMN engine spends when evaluating decisions.
It became apparent that a large fraction of that time was spent in the FEEL engine. Digging deeper, we found out that most of that time was spent on parsing the expressions of the input entries and to evaluate them. Based on this, we started to look into how we could reduce the time spent on the parsing of expressions.

Caching of the parsed expressions seemed to be a simple solution which is also straight forward to implement. Instead of parsing the expressions every time, the engine can now use the already parsed expressions from the cache. We stipulated that this would both

* speed up repeated evaluation of the same decision table,
* speed up the evaluation of a decision tables which uses the same expression as input expression multiple times.

# Benchmark Results

We used the same benchmark and infrastructure as described in the [previous blog post](../../../2015/12/dmn-benchmark/) about the DMN engine performance. 

To measure the impact of the improvements, we ran the benchmark for the latest alpha release 7.6.0-alpha2 of the DMN engine and the latest SNAPSHOT build which includes the changes. The following diagram and table shows the results:

{{< figure class="teaser no-border" src="benchmark-result-diagram.png" alt="Benchmark Results as Diagram" caption="" >}}

{{< figure class="teaser no-border" src="benchmark-result-table.png" alt="Benchmark Results as Table" caption="" >}}

When you compare the results, you can see that the DMN engines evaluated 4 to 6 times more decision tables per second than before. 

Note that this improvements only influences the evaluation of decision table which uses FFEL input entries and the Camunda FEEL engine to evaluate them.
