const BODY = document.querySelector('body');

function initialisation(){
    const MAIN = createElement('div', 'main');
    let UPPER = createElement('div', 'inputText');
    let CENTER = createElement('div', 'keybord');
    const TEXTAREA = createElement('textArea', 'inputText__textArea');
    console.log(BODY)
    appendElement(BODY, MAIN);
    appendElement(MAIN, UPPER);
    appendElement(UPPER, TEXTAREA);
    appendElement(MAIN, CENTER);
    keybord(CENTER);
    addListenerKey();
}

function createElement(type, className, dataset, text){
    let element = document.createElement(type);
    element.classList.add(className);
    dataset ? element.dataset.name = dataset : '';
    text ? element.textContent = text: '';
    return element;
}

function appendElement(source, block){
    let src = source;
    src.appendChild(block);  
}
function keybord(source){
    const KEYS = {
        1: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9','0', '-', '=', 'backspace'],
        2: ['TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o','p', '[', ']', '\'', 'DEL' ],
        3: ['CAPSLOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',';', "'", 'enter'],
        4: ['SHIFT', `&#92`, 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.',',', '/', 'UP', 'shift'],
        5: ['CTRL', 'WIN', 'ALT', 'space', 'alt', 'ctrl', 'left', 'down', 'right', ],
    
    }
    for(let keys in KEYS){
       let level = createElement('div', 'keybord__level');
       appendElement(source, level);
       KEYS[keys].forEach(item => appendElement(level, createElement('button', 'keybord__key', item, item)));
    }
    
    addListenerKey();
}

function addListenerKey(){
    const KEYS = document.querySelectorAll('.keybord__key');
    KEYS.forEach(btn => btn.addEventListener('click', keybordClick))

}
function keybordClick(event){
    const TEXTAREA = document.querySelector('.inputText__textArea');

    switch(event.target.textContent){
        case 'backspace':
            TEXTAREA.value = TEXTAREA.value.slice(0, TEXTAREA.value.length-1);
            break;
        case 'backspace':    
        default: 
        TEXTAREA.value += event.target.textContent;

    }
    // console.log(TEXTAREA.value.slice(0, TEXTAREA.value.length-1) )

}
initialisation();