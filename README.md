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

### Create a Module 'hello'
```
# modules/hello/hello.css

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

### Use Module
```
# js/main.js

async function onInit() {
    await $_$.LOAD('hello');
}

# index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/gh/StealtherThreat/SolusJS@1.0.4/dist/Solus.min.js"></script>
    <script src="js/main.js"></script>
    <title>SolusJS - Hello World</title>
</head>
<body onload="onInit();">
    <div id="hello"></div>
</body>
</html>

```


## Usage

### Create Module
All the modules needs to be present inside modules directory. To create a new module, add a directory with the name you want to give to the module. The module directory can look like below. Please note all the relevant files in below module must have same name as module.
```
├── modules/
│   └── hello/
│       ├── hello.css
│       |── hello.js
|       └── hello.html
```
The javascript file of module can have 3 default functions and are called when -
onload - module is loaded.
onloadstale - trying to load module again when it is already loaded.
ondestroy - module is destroying.

```
export function sayHello() {
    let name = $_$.ELEMENT('name_input.hello').value
    let name_display = $_$.ELEMENT('name_display.hello')

    name_display.innerHTML = name
}

export async function onload() {

}

export async function onloadstale() {

}

export async function ondestroy() {
    
}
```
The functions present inside multiple modules can have same names. The uniqueness is only required at module level. 

The html file of module can contain the part of the structure of your html page. To call the functions present inside javascript of your module, you have to import them first. The css file inside module can also be linked with the html. To be able to access elements present inside this module, give unique names to them. Same as javascript functions, the uniqueness is only required at module level.
```
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

The css file can contain styling of your module. To apply the styles only to the modules, encapsulate the styles inside css id selector of module name. 
```
#hello {
    .name {
        color: red;
    }
}
```

### Load Module
After creating your module, in you html page create a div container where you want your module to be called. The id of the div container must equal to module name. If container not created then module will be loaded at the end of the page. This might be useful in case of popups where placement of module is not permanent. To load module, call from javascript as below. onload function in module will also be called at the same time. If module is already loaded, then by default it will not load it again and onloadstale from module will be called.

```
await $_$.('module_name', false)

#arg1 = name of the module.. 
#arg2 = (default false) reload the module again if already loaded
```
If we want module to be reloaded again when above called, set #arg2 as true.

So, if modules is to loaded at the starting point, call it like below from main javascript file
```
async function onInit() {
    await $_$.LOAD('hello');
}
```
and then from your html like below 
```
<body onload="onInit();">
    <div id="hello"></div>
</body>
```

### Destroy Module
After the module is loaded, if we want unload it, call below from your javascript. At the same time, ondestroy function in module will also be called.
```
await $_$.DESTROY('module_name', param1_of_ondestroy, param2_of_ondestroy, ...)

#arg1 = name of the module
#arg... = parameters of the ondestroy function present inside the module
```

### Import Function
Before an exported function from the module can be called, they need to be imported first. Below are the ways a function can be imported. Either from javascript or module html. An imported function can be called anywhere in the project. The default function of module onload, onloadstale and ondestroy are already imported when a module is loaded.
```
await $_$.IMPORT_FUNC('func_name', 'module_name')

#arg1 = name of the function
#arg2 = name of the module

or 

<import>
    func_name.module_name
</import>
```

### Call Module Function
Imported function from the module can be called anywhere in project. Call below from javascript to execute the imported function.
```
await $_$.LOAD_FUNC('func_name.module_name', function_parameter1, function_parameter2, ...)

#arg1 = name of the function and module name
#arg... = paramters of the function being called
```

### Access Module Element
To access the element present inside the module html, call below from the javascript
```
$_$.ELEMENT('element_name.module_name')

#arg1 = name of the element and module name
```