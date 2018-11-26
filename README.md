# Camunda BPM Team Blog

## How to write a Blog Post

## Some Background Information

If you wrote blogposts on our previous blog (which was based on google blogger), then you are probably familiar with logging into blogger and writing a post in blogger's editing environment. The new blog is not based on blogger and works completely differently.

This blog is generated using a static site generator ([Hugo][hugo]). This means that the blog has no "backend", no database, no php, no nothing. It also means that you cannot "login somewhere" in order to write a post.

Technically, the blog is generated as a list of html files that are uploaded to our webserver. Just like in the old days.

### Need help?

We want you to write as many blogposts as humanly possible. If you experience any trouble or have any questions about the technology used here make sure to talk to the following people, they are eager to help you out!

* Daniel Meyer
* Sebastian Menski

## Creating a new Post

Short version: in order to write a new post, you can simply create a pull request adding a new markdown file to the [post folder](https://github.com/camunda/blog.camunda.org/tree/master/content/post). Posts are organized by year and month so make sure to pick / create the correct sub folder.

Long version: follow the steps below :)

### Install Hugo

We use Hugo as a static site generator for generating the blog. If you want to build the blog locally, you first need to install [hugo][hugo] v0.50 (newer versions _may_ work).

See the [hugo installation guide][hugo-installation] for more details on howto install Hugo.

### Fork & clone the repository

Fork & clone this repository.

### Preview the Blog locally

Once you have installed hugo and forked and cloned the repository, you can preview the blog by typing the following command:

```bash
hugo server --baseUrl="http://localhost"
```

To let hugo include posts which are marked as draft use the `-D` flag:

```sh
hugo server -D --baseUrl="http://localhost"
```

Now point your browser to [http://localhost:1313](http://localhost:1313).

Great, now you have everything in place for writing a new blogpost.

### Create a new Post

> **Warning**: if you push a non-draft post to master it will be released immediately. If you must commit non-draft posts to master instead of to a branch, please mark them as `draft` (see below).

In order to create a new post, type

```sh
hugo new post/2015/10/camunda-introduces-bpel-support.md
```

(make sure to replace `2015` with the current year and `10` with the current month.)

What the above command does is it creates a new file in the `content/post/2015/10/` folder.
The file is created based on an [archetype](https://raw.githubusercontent.com/camunda/blog.camunda.org/master/theme-src/archetypes/post.md?token=AAdyf9C1zE46gfuRAM8u1-UPSJ5gczOCks5WPK6BwA%3D%3D) and already contains the necessary yaml front matter.

> *Note*: you do not _have_ to use `hugo new ...`. It is perfectly fine to just add a new file to the correct folder. The `hugo new` command only creates the file and generates a front matter. It has no other side-effects. In particular, you do not have to "register" or "add" the new file somewhere.

#### The Front Matter

The front matter of a post is content above the actual markdown content and is written in yaml. It contains metadata that is required by hugo for categorizing the post and so on.

For the post you just created it looks like this:

```
+++
title = "camunda introduces support for bpel"
date = "2015-10-30T14:44:10+01:00"
author = "Your Name"
draft = true
categories = ["Execution"]
tags = ["X", "Y"]
+++

```

Lets walk through this and look into this in more detail:

* `title`: this is the title of your post. It will be the main headline. Since it was generated You may want to edit this and capitalize some words. Let's change it to `Camunda finally introduces Support for BPEL`.
* `date`: this contains the current date. In the bog it will be displayed as the publishing date of the post. It does not control when the post is published. **Important**: if it takes you some time to write the blopost, make sure to adjust the date to the actual publishing date. Hugo sorts posts by date on the front page. Faling to set the current date may lead to your post not being listed at the top.
* `author`: contains your name :)
* `categories`: choose from the following categories: `Execution`, `Modeling`, `Community`.
* `tags`: further categorize your post using tags. You can use any tag you want, it does not have to pre exist.
* `draft`: value `true` means that the post is a draft. Draft posts are not published automativally.

More information on the hugo front matter can be found here: https://gohugo.io/content/front-matter/

#### The markdown content.

The rest of the post is written in [markdown](https://help.github.com/articles/markdown-basics/). Here are some useful things we have added:

##### Images & Figures

```
{{< figure src="please-have-a-seat.jpg" alt="Picture of the office." title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" >}}
```

##### Videos

Consider embedding a video (`mp4`) instead of a `gif`. Videos are often considerably smaller and therefore more mobile-friendly.

```
{{< video mp4="myVideo.mp4" title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" >}}
```

##### BPMN files

In order to include a bpmn file in the post, you can either create a screenshot and include it as a figure or render it with bpmn.io. If you want to render it with bpmn.io, use the following short code:

```md
{{< bpmn-viewer name="order-process" >}}
```

The bpmn file `order-process.bpmn` must be placed into the `static/post/2015/10/name-of-your-post` folder.

##### BPMN Symbols

A [bpmn symbol](http://github.com/bpmn-io/bpmn-font)!

<div>{{< bpmn-icon name="end-event-none" >}}</div>

### Create a Pull Request

Once you have written a post, commit and push it to your fork.
Then create a pull request.


## Working on the theme

If you need to make changes on the theme (templates, styles or scripts), you should first start the
grunt task reponsible for the automatic compilation of the sources.

```
grunt
```

Then you can work on the files located in the `theme-src` directory (changed templates will be automatically copied to the relevant theme directory and assets, like styles and scripts, will be compiled in their right destination).

When your work on the source files is done, you should:

1. stop the grunt task
2. run `npm run build`
3. commit _all_ the changes
4. push


## License

The project is licensed under [Apache 2.0](./LICENSE)

The content (content of the `content` directory) is licensed under [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).

[hugo]: http://gohugo.io/
[hugo-installation]: http://gohugo.io/overview/installing/
[nodejs]: http://nodejs.org
[grunt]: http://gruntjs.org
[less]: http://lesscss.org
