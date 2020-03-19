# Camunda BPM Team Blog

## How to write a Blog Post

## TL,DR: (linux and osx with docker)

1. Fork the [repo](https://github.com/camunda/blog.camunda.org) on github (top right)
1. `export TITLE="my-post-title"` set the post title
1. `git clone https://github.com/$(git config --global user.name)/blog.camunda.org.git`
1. `cd blog.camunda.org && git checkout -b $(date +%F)-$TITLE` checkout a new git branch
1. `make new` create the frontmatter boilerplate and print the location of your post to edit
1. edit your post
1. `make` preview your post
1. `git push -u`
1. Open a pull request at [repo](https://github.com/camunda/blog.camunda.org) on github - should show in a yellow bar

> ***NOTE*** docker workflow tested on ubuntu 18 with gnu-make 4.1 - open an issue and ping @afirth if it doesn't work for you

## Some Background Information

This blog is generated using a static site generator ([Hugo][hugo]). This means that the blog has no "backend", no database, no php, no nothing. It also means that you cannot "login somewhere" in order to write a post.

Technically, the blog is generated as a list of html files that are uploaded to our webserver.

### Need help?

We want you to write as many blogposts as humanly possible. If you experience any trouble or have any questions about the technology used here make sure to talk to the following people, they are eager to help you out!

* Daniel Meyer
* Sebastian Menski
* Alastair Firth (docker preview)

## Creating a new Post

Short version: in order to write a new post, you can simply create a pull request adding a new markdown file to the [post folder](https://github.com/camunda/blog.camunda.org/tree/master/content/post). Posts are organized by year and month so make sure to pick / create the correct sub folder.

Long version: follow the steps below :)

## Building the blog locally

We use Hugo as a static site generator for generating the blog. If you want to build the blog locally, you can use docker, or install [hugo][hugo] v0.50 (newer versions _may_ work).

### Fork & clone the repository

Fork & clone this repository.

### Preview the Blog locally

#### with Docker Hugo

`make` previews the blog (including drafts) locally

#### with local Hugo

See the [hugo installation guide][hugo-installation] for more details on how to install Hugo locally if you can't or won't use docker.

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

#### with Docker Hugo

`make new TITLE=my-post-title` generates the boilerplate front matter for a new post and prints the location of the file you should edit.

#### with local Hugo

In order to create a new post, type

```sh
hugo new post/2015/10/camunda-introduces-BPEL-support.md
```

(make sure to replace `2015` with the current year and `10` with the current month.)

What the above command does is it creates a new file in the `content/post/2015/10/` folder.
The file is created based on an [archetype](https://raw.githubusercontent.com/camunda/blog.camunda.org/master/theme-src/archetypes/post.md?token=AAdyf9C1zE46gfuRAM8u1-UPSJ5gczOCks5WPK6BwA%3D%3D) and already contains the necessary yaml front matter.

> *Note*: you do not _have_ to use `hugo new ...`. It is perfectly fine to just add a new file to the correct folder. The `hugo new` command only creates the file and generates a front matter. It has no other side-effects. In particular, you do not have to "register" or "add" the new file somewhere.

#### The Front Matter

The front matter of a post is content above the actual markdown content and is written in yaml. It contains metadata that is required by hugo for categorizing the post and so on.

For the post you just created it looks like this:

```
---
author: "Your Name"

categories:
  - "Execution"

tags:
  - "X"
  - "Y"

title: "Camunda Introduces BPEL Support"
date: 2019-06-17T14:24:30Z

---
```

Lets walk through this and look into this in more detail:

* `title`: this is the title of your post. It will be the main headline. Since it was generated You may want to edit this and capitalize some words. Let's change it to `Camunda finally introduces Support for BPEL`.
* `date`: this contains the current date. In the bog it will be displayed as the publishing date of the post. It does not control when the post is published. **Important**: if it takes you some time to write the blopost, make sure to adjust the date to the actual publishing date. Hugo sorts posts by date on the front page. Faling to set the current date may lead to your post not being listed at the top.
* `author`: Set this to your name :)
* `categories`: choose from the following categories: `Execution`, `Modeling`, `Community`.
* `tags`: further categorize your post using tags. You can use any tag you want, it does not have to pre exist.
* `draft`: value `true` means that the post is a draft. Draft posts are not published automatically.

More information on the hugo front matter can be found here: https://gohugo.io/content/front-matter/

#### The markdown content.

The rest of the post is written in [markdown](https://help.github.com/articles/markdown-basics/). The first paragraph is also used as the post preview. Here are some useful things we have added:

##### Images & Figures

```
{{< figure src="please-have-a-seat.jpg" alt="Picture of the office." title="Please have a seat." caption="We're ready!" attr="V. Vago" attrlink="http://twitter.com/zeropaper" >}}
```

##### Embedding You Tube Videos

Use the shortcode syntax {{< youtube add_your_id_here >}} 


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
grunt task responsible for the automatic compilation of the sources.

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
