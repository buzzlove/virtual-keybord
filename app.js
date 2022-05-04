"use strict";

const BODY = document.querySelector("body");
document.addEventListener("keydown", realKeyboardPressed);
document.addEventListener("keyup", realKeyboardReleased);
BODY.addEventListener("click", ()=> document.querySelector(".inputText__textArea").focus());

let capslock = false;
let ctrl = false;
let shift = false;
let alt = false;

function initialisation(){
    const MAIN = createElement("div", "main");
    let UPPER = createElement("div", "inputText");
    let Center = createElement("div", "keybord");
    const TEXTAREA = createElement("textArea", "inputText__textArea");
    TEXTAREA.autofocus = true;
    TEXTAREA.resize = "none";
    TEXTAREA.maxLength = 198;
    TEXTAREA.rows = 4;

    appendelement(BODY, MAIN);
    appendelement(MAIN, UPPER);
    appendelement(UPPER, TEXTAREA);
    appendelement(MAIN, Center);
    keybord(Center);
    addListenerKey();
}
function createElement(type, className, dataset, text){
    let element = document.createElement(type);
    element.classList.add(className);
    dataset ? element.dataset.name = dataset : "";
    text ? element.textContent = text: "";
    return element;
}
function appendelement(source, block){
    let src = source;
    src.appendChild(block);  
}
function keybord(source){
    const KEYS = {
        1: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9","0", "-", "=", "backspace"],
        2: ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o","p", "[", "]", "delete" ],
        3: ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";", "backslash", "enter"],
        4: ["shift", "z", "x", "c", "v", "b", "n", "m", ".",",", "/", "arrowup", "shift"],
        5: ["ctrl", "win", "alt", " ", "alt", "ctrl", "arrowleft", "arrowdown", "arrowright", ],  
    }
    for(let keys in KEYS){
       let level = createElement("div", "keybord__level");
       appendelement(source, level);
       KEYS[keys].forEach(item => appendelement(level, createElement("button", "keybord__key", item, item)));
    }
    document.querySelector("[data-name=backslash]").textContent = "\\";
    document.querySelector("[data-name=arrowup]").textContent = "↑";
    document.querySelector("[data-name=arrowleft]").textContent = "←";
    document.querySelector("[data-name=arrowright]").textContent = "→";
    document.querySelector("[data-name=arrowdown]").textContent = "↓";
    addListenerKey();
}
function addListenerKey(){
    const KEYS = document.querySelectorAll(".keybord__key");
    KEYS.forEach(btn => btn.addEventListener("click", keybordClick))
}
function keybordClick(event){
    const currentTarget = event.currentTarget;
    const TEXT = event.target.textContent;
    const TEXTAREA = document.querySelector(".inputText__textArea");

    switch(TEXT){
        case "backspace":
            TEXTAREA.value = TEXTAREA.value.slice(0, TEXTAREA.value.length-1);
            break;
        case "space":
            TEXTAREA.value += " ";  
            break;
        case "tab":
            TEXTAREA.value += "   ";
            break;
        case "capslock":
            capslock = !capslock;
            capslock ? currentTarget.classList.add("pressed") : currentTarget.classList.remove("pressed");
            break;    
        case "ctrl":
            ctrl = !ctrl;
            ctrl ? currentTarget.classList.add("pressed") : currentTarget.classList.remove("pressed");
            break; 
        case "shift":
            shift = !shift;
            shift ? currentTarget.classList.add("pressed") : currentTarget.classList.remove("pressed");
            break;   
        case "ALT":
            alt = !alt;
            alt ? currentTarget.classList.add("pressed") : currentTarget.classList.remove("pressed");
            break ;   
        case "WIN":
            alt = !alt;
            break ;  
        case "enter":
            alt = !alt;
            break;                                                                
        default: 
        TEXTAREA.value += (capslock || shift) ? TEXT.toUpperCase() : TEXT;
    }
    if(TEXT !== "capslock" && TEXT !=="shift" && TEXT !=="ctrl" && TEXT !=="ALT"){
        currentTarget.classList.add("pressed");
        setTimeout(()=>  currentTarget.classList.remove("pressed"), 100);
    } 

    TEXTAREA.focus();
}
initialisation();

function realKeyboardPressed(event){
    let key = event.key.toLowerCase();
    let code = event.code.toLowerCase();
    code === "backslash" ? key = "backslash" : ""; 
    key === "control" ? key = "ctrl" : key === "meta" ? key = "win" : "";
    const getVirtualKeys = document.querySelectorAll(`[data-name="${key}"]`);
    getVirtualKeys.forEach(item => item.classList.add("pressed"));
}
function realKeyboardReleased(event){
    const TEXTAREA = document.querySelector(".inputText__textArea");
    let key = event.key.toLowerCase();
    let code = event.code.toLowerCase();
    code === "backslash" ? key = "backslash" : ""; 
    key === "control" ? key = "ctrl" : key === "meta" ? key = "win" : "";
    const getVirtualKeys = document.querySelectorAll(`[data-name="${key}"]`);
    getVirtualKeys.forEach(item => item.classList.remove("pressed"));
    TEXTAREA.focus();
}