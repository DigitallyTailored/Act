Act - A Simple, Lightweight JavaScript Microframework
=====================================================

<div align="center">
<img src="https://user-images.githubusercontent.com/13086157/219523286-2c28084a-6a25-41e4-ad67-d49dc66dba54.png" width="200" />
</div>

Act is a lightweight microframework designed to be the simplest and easiest to use without sacrificing features. Built and utilized with vanilla JS, HTML, and CSS, it requires minimal additional learning beyond basic web development skills found in most tutorials. The framework seamlessly embeds into existing projects, allowing for the creation of reusable components that can be incorporated across multiple pages or applications.

Features
--------

-   **Reusable Modules**: Each module in Act holds a reusable, self-contained block of code that encapsulates HTML, CSS, and ES6 JavaScript that belong together.
-   **Scoped CSS**: CSS rules are scoped to the component, which ensures that the styles applied to one module do not affect other modules in the app.
-   **Powerful Helpers**: Modules are given powerful helpers and direct references to themselves and their children, which makes it easy to build complex user interfaces.
-   **Flexible Render Method**: The `render` method in Act is very flexible and can take simple HTML strings, HTML elements, Act views and nested views (which can also be strings or views).
-   **Simple State Management**: Simple state management is available within modules and can be directly embedded into HTML.
-   **No Transpiler/Compiler Required**: There is no need to use a transpiler or compiler with Act; simply insert the act.js script tag, and you're good to go.
-   **Tiny**: Act is less than 4KB!
-   **Human-Readable Output**: The output generated by Act is human-readable, and no browser plugins are required to debug it.
-   **Accessible Modules**: Modules can be of any element type for accessibility (no div soup). Events are attached directly to their elements, and CSS rules are clearly defined.

In-Development
--------
- **Dynamically Adding View Elements**: when view elements are added, the need to incorporate Act classes, primarily to retain initial view styling. This is currently not possible. This should be a case of updating the renderer to reuse the current view styles when rendering new HTML from within that view.

Getting Started
---------------

Getting started with Act is very easy. Simply download the latest version of Act and add the act.js script tag to your HTML file. You can also use a CDN to include Act in your project.


Documentation
-------------

Act is a simple, lightweight JavaScript microframework designed to be easy to use without sacrificing features. Here are some basic commands to help you get started:

Loading View Modules: First, load your view modules using `act.load()`. Each module should be in the format of `[name, path]`. Once all modules are loaded, you can use the `act.render()` method to display them. Here is an example:

```javascript
//import our component module
import button from '/modules/button.mjs'

//we further import the modules into the act framework
act.import({button})

//set our render target
act.target = document.getElementById('container')

//show a button with optional text in the render target
act.render(act.view('button', {text: 'Hello'}))
```


Module Format: Each module holds a reusable self-contained block of code that encapsulates HTML, CSS, and ES6 JavaScript that belong together. Each property below is optional, and `v` contains any user values for all objects:


```javascript
export default {
    values: v => ({greeting:"hello world"}), // `v` object with default values for each property below
    style: v => `button {color:blue}`, // unique module styles
    view: v => `<button></button>`, // the HTML to show for the view. The output route element is directly accessible through `v.act.elmement`
    script: v => {v.act.element.innerText = v.greeting} // any scripts to run, events to set or listeners to prepare when the component is added
}
```

Global Methods: Here are some global methods you can use with Act:

-   `act.import({modules...})`: prepares an object of imported modules to use as views
-   `act.target`: used to specify the default target element for `act.render()` to output to.
-   `act.render([target], elements)`: optional target. Array of elements to embed from `act.view()`. Can also accept a single string or element.
-   `act.view(name, [values])`: returns an element to be rendered. Can optionally specify default values.

State Methods: Act also provides simple state management available within modules and with direct embedding into HTML:

-   `act.listen([state], callback)`: optionally specify the specific state property to watch. The callback is called each time it is updated.
-   `act.init({})`: used to set the state without updating any listeners. Best to use for initial load or large granular updates.
-   `act.set({})`: used to update the state with the given object.
-   `act.get()`: returns the entire state object to retrieve values. Call within `act.set()` to update existing state values.


_Example: This module uses the `v.watch()` method to display the current count value from the state object, and sets up a click event listener on the button element to update the count in the state object when the button is clicked. When any button using this module is clicked, they will all update automatically due to the listener being set for each_

```javascript
export default {
  values: v => ({
    count: v.count || 0
  }),
  view: v => (`<button>${v.watch('count', v => act.get().count)} clicks</button>`),
  script: v => {
    v.act.element.addEventListener('click', () => {
      act.set({ count: act.get().count + 1 })
    })
  }
}
```

Module Script Methods: Each module script is given powerful helpers and direct references to themselves and their children:

-   `v.act.element`: the HTML element for the module. Can be used to attach listeners, etc.
-   `v.act.find(query)`: performs a `querySelector()` within the scope of the current module.
-   `v.act.findAll(query)`: performs a `querySelectorAll()` within the scope of the current module.
-   `v.act.findViews([name])`: returns all child views under the current module. You can optionally set the name to get specific types of views.

_Example: A view which utilizes the above methods_
```javascript
export default {
  view: v => `
    <div class="parent">
      <h1>Parent element</h1>
      <div class="child">
        <p>Child element</p>
      </div>
    </div>
  `,
  script: v => {
    const parent = v.act.element
    const child = v.act.find('.child')
    const children = v.act.findAll('*')
    const views = v.act.findViews()

    console.log('Parent element:', parent)
    console.log('Child element:', child)
    console.log('All child elements:', children)
    console.log('All child views:', views)
  }
}

```

_This example module defines a simple view with a parent element, a child element, and some nested elements. In the script section, it uses the `v.act` methods to access the HTML elements within the module. `v.act.element` returns the top-level HTML element of the module, which in this case is the `<div>` element with class "parent". `v.act.find(query)` and `v.act.findAll(query)` are used to search for specific elements within the module. `v.act.find('.child')` returns the `<div>` element with class "child", while `v.act.findAll('*')` returns an array of all child elements. Finally, `v.act.findViews([name])` is used to access the child views within the module. With no argument specified, it returns all child views. This particular module has no child views added_





-   `v.watch(state_to_watch, callback)`: used in a module view to directly add output when a specific state is updated.

Module View Methods: Modules can be of any element type for accessibility (no `div` soup), events are attached directly to their elements, and CSS rules are clearly defined:Welcome to Act!

-   `v.body`: This will output an element with the HTML and use that as the render target for any user-defined elements in `v.body`. This is a special method that can be used to create a container element for other elements in the module's view.
-   `v.watch(name, callback)`: Will output the specified `callback` when the given listener `name` is updated. Used for automatically updating HTML with values as they change. This method takes two parameters: `name`, which specifies the name of the listener to watch, and `callback`, which is a function that will be called every time the specified listener is updated.


Conclusion
----------

Act is a lightweight, simple microframework that makes it easy to build complex user interfaces without compromising on features. If you're looking for a framework that is easy to learn, flexible, and powerful, then Act is the perfect choice for you. Try it out today and see how it can improve your web development experience!Welcome to Act!

[<img alt="Luke Heyburn | Twitter" width="42px" src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg" />](https://twitter.com/Luke_Aaron)
[<img alt="Luke Heyburn | LinkedIn" width="42px" src="https://cdn.cdnlogo.com/logos/l/78/linkedin-icon.svg" />](https://www.linkedin.com/in/lukeheyburn/)
[<img alt="Digitally Tailored" width="42px" src="https://user-images.githubusercontent.com/13086157/219529099-c3669a02-ce91-4090-b9f9-8320deffa50a.png" />](https://digitallytailored.com/)
