"use strict";

const BODY = document.querySelector("body");
document.addEventListener("keydown", realKeyboardPressed);
document.addEventListener("keyup", realKeyboardReleased);
BODY.addEventListener("click", ()=> document.querySelector(".inputText__textArea").focus());

let capslock = false;
let ctrl = false;
let shift = false;
let alt = false;
let language = false;
let Center = '';
const KEYS_EN = {
    1: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9","0", "-", "=", "backspace"],
    2: ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o","p", "[", "]", "delete" ],
    3: ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";", "backslash", "enter"],
    4: ["shift", "z", "x", "c", "v", "b", "n", "m", ".",",", "/", "arrowup", "shift"],
    5: ["ctrl", "win", "alt", " ", "alt", "ctrl", "arrowleft", "arrowdown", "arrowright", ],  
}
const KEYS_RU = {
    1: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9","0", "-", "=", "backspace"],
    2: ["tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ","з", "[", "]", "delete" ],
    3: ["capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter"],
    4: ["shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "arrowup", "shift"],
    5: ["ctrl", "win", "alt", " ", "alt", "ctrl", "arrowleft", "arrowdown", "arrowright", ],  
}
const ADDITIONAL = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];

function initialisation(){
    const MAIN = createElement("div", "main");
    let UPPER = createElement("div", "inputText");
    Center = createElement("div", "keybord");
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
    let KEYS = language ? KEYS_RU : KEYS_EN;
    for(let keys in KEYS){
       let level = createElement("div", "keybord__level");
       appendelement(source, level);
       KEYS[keys].forEach(item => appendelement(level, createElement("button", "keybord__key", item, item)));
    }
    document.querySelector("[data-name=backslash]") ? document.querySelector("[data-name=backslash]").textContent = "\\" : "";
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
            ctrl ? changeLang() : additionalFunc();
            break;   
        case "alt":
            alt = !alt;
            alt ? currentTarget.classList.add("pressed") : currentTarget.classList.remove("pressed");
            break ;   
        case "WIN":
            alt = !alt;
            break ;  
        case "enter":
            alt = !alt;
            break;   
        case "delete":
            TEXTAREA.value = TEXTAREA.value.slice(0, TEXTAREA.value.length-1);
            break;
        case "↑":
        case "←":
        case "→":
        case "↓":            
            cursorMove();
            break;                                                                                                 
        default: 
        TEXTAREA.value += (capslock || shift) ? TEXT.toUpperCase() : TEXT;
    }
    if(TEXT !== "capslock" && TEXT !=="shift" && TEXT !=="ctrl" && TEXT !=="alt"){
        currentTarget.classList.add("pressed");
        setTimeout(()=>  currentTarget.classList.remove("pressed"), 100);
    } 
    TEXTAREA.focus();
}
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
function cursorMove(){

};
function additionalFunc(){
   const keyCollection = document.querySelectorAll(".keybord__key");
   if(shift){
    for(let i = 0; i < 13; i++){
        keyCollection[i].textContent = ADDITIONAL[i];
       }
   } else {
    for(let i = 0; i < 13; i++){
        keyCollection[i].textContent = KEYS_EN[1][i];
       }
   }
}
function changeLang() {
    language = !language;
    ctrl = false;
    shift = false;
    while (Center.firstChild) {
        Center.removeChild(Center.firstChild);
      }
    keybord(Center);
}
initialisation();