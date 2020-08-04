+++
author = "Camunda BPM Team"
categories = ["Execution"]
tags = ["Release Note"]
date = "2020-08-11T09:00:00+00:00"
title = "Introduction to the Cockpit 7.14 Plugin System"
+++

With the second alpha release for 7.14, cockpit got a new Plugin system. It replaces the current Angular 1.8 based plugin system and enables you to extend cockpit with domain-specific information written in the web-technologies of your choice.

<!-- more -->

# What are Plugins
Webapp Plugins are user extensions that provide custom functionality to Cockpit, Tasklist, and Admin, which Camunda does not provide out of the box. It allows you to embed domain-specific information into Camunda tooling without switching applications.  

The 7.14 Plugin System allows you to use the Javascript Framework you are most familiar with, whether it be React, Angular, or just plain JavaScript. <!-- It also allows Camunda to migrate away from AngularJS and use more modern technologies. -->

Cockpit is the first App to receive a new Plugin System. Tasklist and Admin will behave the same as in 7.13.  


# Developing a Plugin
In this step-by-step example, we will guide you through creating a Plugin that uses React to display all involved users in a Process Definition in a new tab. If you want to follow along, make sure you have a modern version of NodeJS and Camunda BPM 7.14.0-alpha2 installed. We will be using the Tomcat version for this example. Some Paths might be different if you are using another application server. 
You can find the final plugin in our Git Repository.

## The Interface
Let's have a look at the Plugin API and how to integrate it into cockpit. Let's a look at this Hello World Plugin:

```Javascript
// plugin.js

export default {
  id: "involvedUsers",
  pluginPoint: "cockpit.processDefinition.runtime.tab",
  priority: 9,
  label: "Involved Users",
  render: (node, { processDefinitionId }) => {
    node.innerHTML = `Hello Process ${processDefinitionId}`;
  }
};
```
Let's go through it line by line:
<!-- Alternative: Let's have a look at the most important Attributes. For a full explanation of all attributes, check the documentation. Then only talk about JS Module, pluginPoint and render function -->

  * `export default {}`: The is a JavaScript Module which exports an Object. If you have multiple plugins in one file, you can also export an array of Objects.
  *  `id: "involvedUsers"`: The unique ID of our plugin
  *  `pluginPoint: "cockpit.processDefinition.runtime.tab"`: The pluginPoint property describes where the plugin will be rendered. They correspond to the list of Plugin-Points shown in the [docs](https://docs.camunda.org/manual/7.13/webapps/cockpit/extend/plugins/#plugin-points) <!-- TODO: Change link to new docs which also has the passed arguments? -->
  *  `priority: 9`: The order of our Plugins, highest is first
  *  `label: "Involved Users"`: What our new Tab will be called
  * `render: (node, { processDefinitionId })`: The heart of our plugin, here is where we can extend cockpit. The render function receives two arguments: a DOM node in which we can render our content, and an Object with additional information. What will be passed as additional information depends on the Plugin point. For the process definition tab, we get the definition ID, which we will use later and the CSRF Token, which we will not use in this example.

To register it, save the file in your cockpit scripts folder. On Tomcat, this would be `server/apache-tomcat-{version}/webapps/camunda/app/cockpit/scripts`. Lastly, we register it in the `config.js` by adding it to the customScripts field:

```Javascript
// config.js

export default {
  customScripts: [
    'scripts/plugin.js'
  ]}
```

Now you can open your browser and open a Process Definition. If everything worked correctly, it should look something like the picture below. You might have to force-refresh the page to see the results.

<!-- TODO: insert cockpit-plugin-step-01.png -->

If you don't want to add a frontend library, you can stop here and continue developing your plugin using the DOM API. 

## Adding a Frontend Library
To use external libraries in your plugin, you have to provide them with your plugin code in a bundle. We will be using React as a Library and Rollup as a bundler for this example.

First, let's create a project and install react.

```shell
npm init -y
npm install --save react react-dom
```

Now we can import and use React in our plugin code. For now, let's create a simple component which receives the process definition ID as a prop: 
```Javascript
// UserOperationCount.js
import React from "react";

function UserOperationCount({ processDefinitionId }) {
  return <span>This is rendered in React {processDefinitionId}</span>;
}

export default UserOperationCount;
```

And render it using React into the node in our Plugin:
```Javascript
// plugin.js
import React from "react";
import ReactDOM from "react-dom";

import UserOperationCount from "./UserOperationCount";
let container;

export default {
  // ...,
  render: (node, { processDefinitionId }) => {
    container = node;
    ReactDOM.render(
      <UserOperationCount processDefinitionId={processDefinitionId} />,
      container
    );
  },
  unmount: () => {
    ReactDOM.unmountComponentAtNode(container);
  }
};
```
As you have noticed, we also added an `unmount` function and cached the container instance. While the plugin will work without it, it is good practice to unmount and clean up all your components.


To deploy the react plugin, we will have to bundle it first. For this, we will install rollup and a few plugins so we can transpile the JSX we just wrote:
<!-- maybe link to a package? -->
`npm install --save-dev rollup @babel/core @rollup/plugin-babel @babel/preset-react @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-replace`

Now we can configure our bundle in the `rollup.config.js`. We will have to transpile JSX using babel, include all external modules, and replace `NODE_ENV` flags. The final configuration looks like this:

```Javascript
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/plugin.js",
  output: {
    file: "dist/plugin.js"
  },
  plugins: [
    resolve(),
    babel({"presets": ["@babel/preset-react"]}),
    commonjs({
      include: "node_modules/**"
    }),
    replace({
       "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
```

Running `rollup -c` with this configuration will take `plugin.js` located in the `src/` folder and transforms it into a deployable `plugin.js` in the `dist/` folder.

When you deploy it, it should look like this:

<!-- Step2 png -->

## Writing your Plugin

The rest of the development is up to you: you can use the Camunda API to fetch data and react hooks for state management. We will not go into details in this step, as all the Camunda-specific steps are behind us.
If you want to add custom CSS, you can extend the user-styles.css in the webapp folder.

Here are some ideas for you to continue with the development:
  * minify the bundle using uglify
  * add custom CSS in the user-styles
  * split the code into submodules

Read more about it in our [docs](TODO), check out the [source code](TODO), and let us know what you think in our [Forum](TODO).

If you are interested in using other libraries, check out our [examples](). You can also find the code for the involved users tab there.

Here you can find an implementation of the final Involved Users React component.

<!-- TODO: 03.png-->


<!-- That's a lot of code, maybe we can shorten it or hide it in a spoiler - lets see what wordpress provides for this -->
```Javascript
// UserOperationCount.js
import React, { useState, useEffect } from "react";

function Table({ head, children }) {
  return (
    <table className="Table">
      <thead>
        <tr>{head}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.Head = function Head({ children }) {
  return <th className="TableHead">{children}</th>;
};

Table.Row = function Row({ children }) {
  return <tr className="TableRow">{children}</tr>;
};

Table.Cell = function Cell({ children }) {
  return <td className="TableCell">{children}</td>;
};


const engineApi = document.querySelector("base").getAttribute("engine-api");
function UserOperationCount({ processDefinitionId }) {
  const [opLog, setOpLog] = useState();


  useEffect(() => {
    fetch(
      `${engineApi}/engine/default/history/user-operation?maxResults=2000&processDefinitionId=${processDefinitionId}`
    )
      .then(async res => {
        setOpLog(await res.json());
      })
      .catch(err => {
        console.error(err);
      });
  }, [processDefinitionId]);

  if (!opLog) {
    return <div>Loading...</div>;
  }

  const userMap = {};

  opLog.forEach(element => {
    const currentEntry = userMap[element.userId] || {
      categories: new Set(),
      operations: 0
    };

    currentEntry.operations++;
    currentEntry.categories.add(element.category);

    userMap[element.userId] = currentEntry;
  });

  return (
    <Table
      head={
        <>
          <Table.Head key="id">UserId</Table.Head>
          <Table.Head key="role">User Roles</Table.Head>
          <Table.Head key="count">Number of Operations</Table.Head>
        </>
      }
    >
      {Object.keys(userMap).map(value => {
        const user = userMap[value];
        return (
          <Table.Row key={value}>
            <Table.Cell key="id">{value}</Table.Cell>
            <Table.Cell key="role">
              {[...user.categories].join(", ")}
            </Table.Cell>
            <Table.Cell key="count">{user.operations}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table>
  );
}

export default UserOperationCount;
```
