# Twitter: Argentinian Elections 2019
## Software Engineering Integral Final Work

This repository holds all the codebase for the Front End server and the Back End API used in the development of the 
application found in http://elecciones2019.fi.uba.ar/. 

All this code, as well as all the code you can find [here](https://github.com/RodrigoDeRosa/eleccionesFrontEnd) was 
designed, coded and tested by a team integrated by [Rodrigo De Rosa](https://github.com/RodrigoDeRosa), 
[Facundo Guerrero](https://github.com/facuguerrero) and [Marcos Schapira](https://github.com/marcossch) in the context 
of the Software Engineering integral final work at the University of Buenos Aires. In this readme, the basics of this 
application will be explained as well as how to run it.

## What is this project about?

The point of this whole project was to analyze all the content posted on Twitter related to the Presidential elections
that took place in Argentina in 2019. The main idea was to identify how similar were the conversation topics the
supporters of each political party talked about and, with this, identify how similar each group was to the others.

To be able to make this analysis, it was needed to:

* Find our group of interest; this means whose tweets we would analyze.
* Determine which presidential candidate each of our users of interest supported.
* Get all the hashtags each of this users used.
* Find topics of conversation; this would be communities of nodes in a hashtag co occurrence graph.
* Analyze how common is the use of one or another topic of conversation for one or another support group (or political
party).
* Discover how related are the opinions of the different political parties by comparing how many conversation topics
they have in common.