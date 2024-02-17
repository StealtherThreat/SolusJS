# SolusJS
[![License](https://img.shields.io/github/license/StealtherThreat/SolusJS)](https://opensource.org/licenses/MIT)

SolusJS is a javascript framework to quickly create web application. It lets you create project in modules which can be reuse and help in keeping the project clean and organised.

## CDN

https://cdn.jsdelivr.net/gh/StealtherThreat/SolusJS@1.0.4/dist/Solus.min.js


## Getting Started

### Directory Structure
Although you can create your structure in any way you want keeping in mind the modules directory is in the root folder, it is still recommended to create your project as below.
```
you_web_application/
├── css
├── js/
|   └── Solus.min.js
├── modules/
│   └── hello/
│       ├── hello.css
│       |── hello.js
|       └── hello.html
└── index.html
```

### Hello World
```
$ modules/hello/hello.css

#hello {
    .name {
        color: red;
    }
}

# modules/hello/hello.js

export function sayHello() {
    let name = $_$.ELEMENT('name_input.hello').value
    let name_display = $_$.ELEMENT('name_display.hello')

    name_display.innerHTML = name
}

# modules/hello/hello.html

<import>
    sayHello.hello
</import>

<link rel="stylesheet" href="modules/hello/hello.css">

<h1 name="name_display" class="name"></h1>
<br>
<input type="text" name="name_input">
<br>
<button onclick="$_$.LOAD_FUNC('sayHello.hello')">Show Hello</button>

```
