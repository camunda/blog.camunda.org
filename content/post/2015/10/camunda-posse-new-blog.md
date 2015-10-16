---
title: "A new blog for Camunda BPM posse"
date: "2015-10-14T13:28:00+02:00"
author: "Valentin Vago"

categories:
  - "Community"

tags:
  - "Blog"
  - "Camunda"
  - "Design"
  - "Hugo"
---

I was delighted when [Daniel](//twitter.com/meyerdan) asked me to *valify* (as Robert says) the **Camunda BPM Team Blog**
and make it fit our **CI** (nope, for once, this ain't meaning Continuous Integration). Here's the little story about that work… erm… fun and some showoff about the new blog features.
<!--more-->

# Who, nowadways, wants to write HTML?

*None of my colleagues, that's pretty much a fact.*

And since we rebuild our [documentation website](//docs.camunda.org/latest) using [Hugo](//gohugo.io)
and liked it, it seemed legit to continue with that stack.

# One cannot just drop the older posts

*That's kind of obvious.*

So how would you import the posts written on blogger?  
The nerd would probably start writing a client which would pump the posts using the blogger API and stuff.

I'm more of a creative guy. Which means that I don't make a fuss about the way,
I want to reach my goals (which, by the way, might not always be the {{< bpmn-icon name="end-event-none" >}},
a bit like when Jakob put a `style` attribute in its HTML).  
I went to the Google API console and got myself all the posts from there. Tada.

After that, it's piece of cake, a [grunt task](//gruntjs.com/api/grunt.task) consumes the JSON and
creates the mardown files and it looks more or less like that:

```js
grunt.registerTask('import', function () {
  var jsonContent = grunt.file.readJSON('./camunda-blog-posts.json');
  var postTemplate = [
    '---',
    'title: "<%= title.split(\'\\"\').join(\'\\\\"\') %>"',
    'date: "<%= published %>"',
    'author: "<%= author.displayName %>"',
    '',
    'categories:',
    '  - "<%= category %>"',
    'tags: <%= labels.map(function (tag) { return \'\\n  - "\'+ tag +\'"\'; }).join(\'\') %>',
    '',
    'aliases:',
    '  - "<%= alias %>"',
    '',
    '---',
    '',
    '<%= content %>'
  ].join('\n');

  jsonContent.items.forEach(function (post) {
    var nameParts = post.url.split('/');
    var name = 'content/post/' + nameParts[3] + '/' + nameParts[4] + '/' + nameParts[5].split('.html')[0] + '.md';

    post.category = post.title.toLowerCase().indexOf('release') < 0 ? 'Development' : 'Release';
    post.labels = post.labels || [];
    post.alias = post.url.split('blog.camunda.org').pop();

    post.content
      .split('href="http://blog.camunda.org/')
      .join('href="/')
      .split('href="http://camundabpm.blogspot.de/')
      .join('href="/')
    ;

    grunt.file.write(name, grunt.template.process(postTemplate, {data: post}));
  });

});
```

# New features?

*Sure, got plenty.*

## BPMN diagrams

Based on [Hugo shortcodes](http://gohugo.io) and [bpmn.io](http://bpmn.io), authors can now add their diagrams in a post in a breeze like that:

```html
{{</* bpmn-viewer path="/2015/10/order-process" */>}}
```

And it renders something like that when the :

{{< bpmn-viewer path="/2015/10/order-process" >}}



## BPMN symbols

Also base on Hugo shortcodes, you can add all the symbols contained in the [bpmn-font project](//github.com/bpmn-io/bpmn-font).

```html
<div>{{</* bpmn-icon name="end-event-none" */>}}</div>
```
produces

<div>{{< bpmn-icon name="end-event-none" >}}</div>

## Responsive layout

Yep. And soon responsive youtube video player.

## Text formatting

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

Are loaded when the reader reaches them.

```md
{{</* figure src="/2015/10/please-have-a-seat.jpg" alt="Picture of the office." title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" */>}}
```
produces

{{< figure src="/2015/10/please-have-a-seat.jpg" alt="Picture of the office." title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" >}}


## Code highlighting

You saw it above in action but here's other example with Markown

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

