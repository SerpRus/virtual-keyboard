import KeysData from './keysData.js';
import Key from './key.js';
import Textarea from './textarea.js';
import Header from './header.js';

export default class VirtualKeyboard {
    selectors = {
        virtualKeyboard: '#virtual-keyboard',
        key: '[data-code]',
        capsLock: '[data-code="CapsLock"]',
        textarea: '[data-textarea]',

        keyDefault: '.key__text',
        keyCaps: '.key__text--caps',
        keyShift: '.key__text--shift',
        keyCapsShift: '.key__text--caps-shift',
        keyRu: '.key__text--ru',
        keyRuCaps: '.key__text--ru-caps',
        keyRuShift: '.key__text--ru-shift',
        keyRuCapsShift: '.key__text--ru-caps-shift',
    };

    classes = {
        keysWrapper: 'virtual-keyboard__keys-wrapper',
        pushed: 'pushed',
        capsLock: 'caps-lock',
        shift: 'shift',
        ru: 'ru',
    };

    attributes = {
        code: 'data-code',
    };

    virtualKeyboard;

    isCapsLockActive = false;

    activeKeys = [];

    keysData = new KeysData().getKeysData();

    init() {
        this.rendervirtualKeyboardContainer();
        this.renderHeader();
        this.renderTextarea();
        this.renderKeyboard();
        this.initHandlers();

        document.addEventListener('focusout', () => {
            const $keys = document.querySelectorAll(this.selectors.key);

            for (let i = 0; i < $keys.length; i += 1) {
                $keys[i].classList.remove(this.classes.pushed);
            }
        });
    }

    rendervirtualKeyboardContainer() {
        const $virtualKeyboardContainer = document.createElement('div');
        $virtualKeyboardContainer.setAttribute('id', 'virtual-keyboard');
        $virtualKeyboardContainer.className = `virtual-keyboard ${sessionStorage.getItem('lang') ? 'ru' : ''}`;

        document.body.appendChild($virtualKeyboardContainer);

        this.virtualKeyboard = $virtualKeyboardContainer;
    }

    renderHeader() {
        const $header = new Header().createHeader();
        this.virtualKeyboard.appendChild($header);
    }

    renderTextarea() {
        const $textarea = new Textarea().createTextarea();
        this.virtualKeyboard.appendChild($textarea);
    }

    renderKeyboard() {
        const $keysWrapper = document.createElement('div');
        $keysWrapper.classList.add(this.classes.keysWrapper);

        for (let i = 0; i < this.keysData.length; i += 1) {
            const $key = new Key(this.keysData[i]).createKey();
            $keysWrapper.appendChild($key);
        }

        this.virtualKeyboard.appendChild($keysWrapper);
    }

    documentKeydownHandler = (e) => {
        document.querySelector(this.selectors.textarea).focus();

        const { code } = e;

        switch (code) {
        case 'Tab':
            e.preventDefault();

            break;

        case 'CapsLock':
            this.capsLockKeyDown(e);

            break;

        case 'ShiftLeft':
            this.shiftKey(e);

            break;

        case 'ShiftRight':
            this.shiftKey(e);

            break;

        case 'Backspace':
            this.addPushed(code);
            return;

        case 'Delete':
            this.addPushed(code);
            return;

        case 'MetaLeft':
            this.addPushed(code);
            return;

        default:
            break;
        }

        const $textarea = document.querySelector(this.selectors.textarea);
        const caretPos = $textarea.selectionStart;
        const leftString = $textarea.value.slice(0, caretPos);
        const currentValue = this.getCurrentValue(e);
        const newLeftString = leftString + currentValue;
        const rightString = $textarea.value.slice(caretPos);

        $textarea.value = newLeftString + rightString;
        $textarea.setSelectionRange(newLeftString.length, newLeftString.length);

        if (e.repeat) {
            return;
        }

        this.addPushed(code);

        this.activeKeys.push(code);
    };

    capsLockKeyDown(e) {
        if (e.repeat) {
            return;
        }

        this.isCapsLockActive = !this.isCapsLockActive;

        this.virtualKeyboard.classList.toggle(this.classes.capsLock);
    }

    shiftKey(e) {
        if (e.repeat) {
            return;
        }

        this.virtualKeyboard.classList.toggle(this.classes.shift);
    }

    addPushed(code) {
        const $key = document.querySelector(`[${this.attributes.code}="${code}"]`);

        if (!$key) {
            return;
        }

        $key.classList.add(this.classes.pushed);
    }

    documentKeyupHandler = (e) => {
        const { code } = e;

        switch (code) {
        case 'ShiftLeft':
            this.shiftKey(e);

            break;

        case 'ShiftRight':
            this.shiftKey(e);

            break;

        default:
            break;
        }

        this.removePushed(code);

        if (
            this.activeKeys.length === 2
          && this.activeKeys.includes('ShiftLeft')
          && this.activeKeys.includes('AltLeft')
        ) {
            if (this.virtualKeyboard.classList.contains('ru')) {
                this.virtualKeyboard.classList.remove('ru');
                sessionStorage.removeItem('lang');
            } else {
                this.virtualKeyboard.classList.add('ru');
                sessionStorage.setItem('lang', 'ru');
            }
        }

        this.activeKeys = this.activeKeys.filter((value) => value !== code);
    };

    getCurrentValue(e) {
        const { code } = e;
        const excludes = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'Win', 'AltLeft', 'AltRight', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

        if (excludes.includes(code)) {
            return '';
        }

        const $key = document.querySelector(`[${this.attributes.code}="${code}"]`);

        if (!$key) {
            return '';
        }

        switch (code) {
        case 'Tab':
            return '\t';

        case 'Enter':
            return '\n';

        case 'Space':
            return ' ';

        default:
            break;
        }

        const $virtualKeyboard = document.querySelector(this.selectors.virtualKeyboard);

        if (
            $virtualKeyboard.classList.contains(this.classes.ru)
            && $virtualKeyboard.classList.contains(this.classes.capsLock)
            && $virtualKeyboard.classList.contains(this.classes.shift)
        ) {
            return $key.querySelector(this.selectors.keyRuCapsShift).innerText;
        }

        if (
            $virtualKeyboard.classList.contains(this.classes.ru)
            && $virtualKeyboard.classList.contains(this.classes.capsLock)
        ) {
            return $key.querySelector(this.selectors.keyRuCaps).innerText;
        }

        if (
            $virtualKeyboard.classList.contains(this.classes.ru)
            && $virtualKeyboard.classList.contains(this.classes.shift)
        ) {
            return $key.querySelector(this.selectors.keyRuShift).innerText;
        }

        if (
            $virtualKeyboard.classList.contains(this.classes.ru)
        ) {
            return $key.querySelector(this.selectors.keyRu).innerText;
        }

        if (
            $virtualKeyboard.classList.contains(this.classes.capsLock)
            && $virtualKeyboard.classList.contains(this.classes.shift)
        ) {
            return $key.querySelector(this.selectors.keyCapsShift).innerText;
        }

        if ($virtualKeyboard.classList.contains(this.classes.capsLock)) {
            return $key.querySelector(this.selectors.keyCaps).innerText;
        }

        if ($virtualKeyboard.classList.contains(this.classes.shift)) {
            return $key.querySelector(this.selectors.keyShift).innerText;
        }

        return $key.querySelector(this.selectors.keyDefault).innerText;
    }

    documentClickHandler = (e) => {
        const $key = e.target.closest(this.selectors.key);

        if (!$key) {
            if (this.leftShift) {
                document.dispatchEvent(new KeyboardEvent('keyup', {
                    code: 'ShiftLeft',
                }));

                this.leftShift = null;
            }

            if (this.rightShift) {
                document.dispatchEvent(new KeyboardEvent('keyup', {
                    code: 'ShiftRight',
                }));

                this.rightShift = null;
            }

            return;
        }

        const keyCode = $key.getAttribute(this.attributes.code);

        switch (keyCode) {
        case 'Backspace':
            this.backspaceClick();

            break;

        case 'Delete':
            this.deleteClick();

            break;

        case 'ShiftLeft':
            if (this.leftShift) {
                document.dispatchEvent(new KeyboardEvent('keyup', {
                    code: keyCode,
                }));

                this.leftShift = null;

                return;
            }

            document.dispatchEvent(new KeyboardEvent('keydown', {
                code: keyCode,
            }));

            this.leftShift = $key;

            return;

        case 'ShiftRight':
            if (this.rightShift) {
                document.dispatchEvent(new KeyboardEvent('keyup', {
                    code: keyCode,
                }));

                this.rightShift = null;

                return;
            }

            document.dispatchEvent(new KeyboardEvent('keydown', {
                code: keyCode,
            }));

            this.rightShift = $key;

            return;

        default:
            break;
        }

        document.dispatchEvent(new KeyboardEvent('keydown', {
            code: keyCode,
        }));
        setTimeout(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', {
                code: keyCode,
            }));
        }, 100);

        if (this.leftShift) {
            document.dispatchEvent(new KeyboardEvent('keyup', {
                code: 'ShiftLeft',
            }));

            this.leftShift = null;
        }

        if (this.rightShift) {
            document.dispatchEvent(new KeyboardEvent('keyup', {
                code: 'ShiftRight',
            }));

            this.rightShift = null;
        }
    };

    backspaceClick() {
        const $textarea = document.querySelector(this.selectors.textarea);

        const caretPos = $textarea.selectionStart;
        const leftString = $textarea.value.slice(0, caretPos);

        if (!leftString) {
            return;
        }

        const newLeftString = leftString.slice(0, leftString.length - 1);
        const rightString = $textarea.value.slice(caretPos);

        $textarea.value = newLeftString + rightString;

        $textarea.setSelectionRange(newLeftString.length, newLeftString.length);
    }

    deleteClick() {
        const $textarea = document.querySelector(this.selectors.textarea);

        const caretPos = $textarea.selectionStart;
        const leftString = $textarea.value.slice(0, caretPos);
        const rightString = $textarea.value.slice(caretPos);

        if (!rightString) {
            return;
        }

        const newRightString = $textarea.value.slice(caretPos + 1);

        $textarea.value = leftString + newRightString;

        $textarea.setSelectionRange(leftString.length, leftString.length);
    }

    removePushed(code) {
        const $key = document.querySelector(`[${this.attributes.code}="${code}"]`);

        if (!$key) {
            return;
        }

        $key.classList.remove(this.classes.pushed);
    }

    initHandlers() {
        document.addEventListener('keydown', this.documentKeydownHandler);
        document.addEventListener('keyup', this.documentKeyupHandler);

        document.addEventListener('click', this.documentClickHandler);

        const $textarea = document.querySelector(this.selectors.textarea);
        $textarea.addEventListener('keypress', (e) => {
            e.preventDefault();
        });
    }
}
