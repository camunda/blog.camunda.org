---
title: "A new blog for Camunda BPM posse"
date: "2015-10-14T13:28:00+02:00"
author: "Valentin Vago"

categories:
  - "Community"

---

I was delighted when [Daniel](//twitter.com/meyerdan) asked me to *valify* (as Robert says) the **Camunda BPM Team Blog**
and make it fit our **CI** (nope, for once, this ain't meaning _Continuous Integration_).  
Here's the little story about that work… erm… fun and some show-off about the new blog features.
<!--more-->

# Who, nowadways, wants to write HTML?

*None of my colleagues, that's pretty much a fact.*

And since we rebuild our [documentation website](//docs.camunda.org/manual/latest) using [Hugo](//gohugo.io)
and liked it, it seemed legit to continue with that stack.

# One cannot just drop the older posts

*That's kind of obvious.*

So how would you import the posts written on blogger?  
The nerd would probably start writing a client which would pump the posts using the blogger API and stuff.

I'm more of a creative guy. Which means that I don't make a fuss about the way,
I want to reach my goals (which, by the way, might not always be the {{< bpmn-icon name="end-event-terminate" >}},
a bit like when a colleague put a `style` attribute in the HTML).  
I went to the Google API console and got myself all the posts from there. Tada.

After that, it's piece of cake, a [grunt task](//gruntjs.com/api/grunt.task) consumes the JSON and
creates the markdown files.

# Content organization

*Because Camunda evolves.*

We will organize the content of the blog under 3 categories:

 * [Modeling](/categories/modeling)  
   Will get content about [BPMN.io](//bpmn.io), Camunda Modeler and other _*MNs_ modeling tools and practices.
 * [Execution](/categories/execution)  
   For the engine and platform related posts.
 * [Community](/categories/community)  
   Because the community releases some projects which are worth talking about.


# New features?

*Sure, got plenty.*

## Text formatting

*Because a blog post ain't javadoc.*

I tried to make the text of the posts as readable as possible and took care to keep the layout quiet so it doen't disturbs the reading experience.

### Blockquotes

Could be written the markdown way

```md
> Anything that can go wrong will go wrong.
```

which renders

> Anything that can go wrong will go wrong.

or using the special shortcode, which is used like

```md
{{</* blockquote attr="Capt. Ed Murphy" attrlink="https://en.wikipedia.org/wiki/Edward_A._Murphy,_Jr." */>}}
Anything that can go wrong will go wrong.
{{</* /blockquote */>}}
```

and allows to format something said and mention its author

{{< blockquote attr="Capt. Ed Murphy" attrlink="https://en.wikipedia.org/wiki/Edward_A._Murphy,_Jr." >}}
Anything that can go wrong will go wrong.
{{< /blockquote >}}

## Images

Are loaded when the reader reaches them (a technic which is called _[lazy loading](https://en.wikipedia.org/wiki/Lazy_loading)_ and prevents your mobile data plan to be consumed when you look at kitten images).

```md
{{</* figure src="please-have-a-seat.jpg" alt="Picture of the office." title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" */>}}
```
produces

{{< figure src="please-have-a-seat.jpg" alt="Picture of the office." title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" >}}

## BPMN diagrams

Based on [Hugo shortcodes](http://gohugo.io) and [bpmn.io](http://bpmn.io), authors can now add their diagrams in a post in a breeze like that:

```html
{{</* bpmn-viewer name="order-process" */>}}
```

And it renders something like that:

{{< bpmn-viewer name="order-process" >}}



## BPMN symbols

Also base on Hugo shortcodes, you can add all the symbols contained in the [bpmn-font project](//github.com/bpmn-io/bpmn-font).

```html
<div>{{</* bpmn-icon name="end-event-none" */>}}</div>
```
produces

<div>{{< bpmn-icon name="end-event-none" >}}</div>

## Responsive layout

Yep, because it's nice to be able to read blogs on mobile devices.  
On top of that, in order to make the page load fast (and avoid hurting your mobile data plan), most of the *big* features are loaded as the reader reaches them.

## Code highlighting

You saw it above in action but here's other example with some Markdown formatted text:

```md

# Heading 1
## Heading 2
### Heading 3

> blockquote

[link](//url.com)

```
and a last one with some bash

```sh
sudo ./fix-ie.sh # will segfault
```

## Emoji

Na. Not yet. We're not here for fun.

