+++
author = "Casper Biever"
categories = ["Community"]
date = "2016-12-28T18:10:00+01:00"
tags = ["Conway's game of life", "Raspberry Pi"]
title = "Conway's game of life"

+++

The holidays are upon us, time for a lighter kind of blog post: Conways's game of life on a Raspberry Pi.

[Conways game of life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) can be modelled by the following bpmn and dmn:

{{< bpmn-viewer name="ConwaysGameOfLife" >}}

{{< figure src="ConwaysGameOfLifeDMN.png" >}}

In order to see what is happening the [Raspberry Pi](https://www.raspberrypi.org) was hooked up to a 8x8 LED matrix (can be bought e.g at [Adafruit](https://www.adafruit.com/products/872) together with the Raspberry Pi 3, breadboard and jumper wires).

{{< figure src="setup.jpg" alt="Raspberrry Pi and the LED matrix" title="Raspberrry Pi and the LED matrix" >}}

The LED matrix is driven by a simple progam written in Go that receives the information which LED to light or dim through a socket connection from the Camunda engine.

The final result can be seen below:

{{< video mp4="led_matrix.mp4" title="Conway's game of life in action" >}}

The process accepts three parameters: rows, cols, density and duration. The number of rows and columns are standard set at 40, the density at 0.5 (the initial field is randomly initialized with half of the cells alive) and the duration at PT1S (1 second timer).

The unit test does 10 cycles before terminating and simulates a so called glider which can be seen moving in the console or log.

The source can be found [here](https://github.com/cbiever/conways-game-of-life).

Happy holidays and feel free to ask questions!

---

This is a guest post by [Casper Biever](https://github.com/cbiever/).

