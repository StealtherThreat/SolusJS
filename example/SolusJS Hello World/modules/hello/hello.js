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