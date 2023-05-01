import VirtualKeyboard from './modules/virtual-keyboard.js';

function ready() {
    new VirtualKeyboard().init();
}

document.addEventListener('DOMContentLoaded', ready);
