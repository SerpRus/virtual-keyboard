export default class Key {
    constructor(data) {
        this.data = data;
    }

    classes = {
        elementKey: 'virtual-keyboard__key',
        key: 'key',
        keyText: 'key__text',
        keyTextCaps: 'key__text--caps',
        keyTextShift: 'key__text--shift',
        keyTextCapsShift: 'key__text--caps-shift',

        keyRuText: 'key__text--ru',
        keyRuTextCaps: 'key__text--ru-caps',
        keyRuTextShift: 'key__text--ru-shift',
        keyRuTextCapsShift: 'key__text--ru-caps-shift',
    };

    attributes = {
        shift: 'data-shift',
        shiftRu: 'data-shift-ru',
        code: 'data-code',
    };

    createKey() {
        const $button = document.createElement('button');
        $button.className = `${this.classes.elementKey} ${this.classes.key}`;
        if (this.data.size) {
            $button.classList.add(`key--${this.data.size}`);
        }
        $button.setAttribute(this.attributes.code, this.data.code);

        const $keySpan = document.createElement('span');
        $keySpan.classList.add(this.classes.keyText);
        $keySpan.innerHTML = this.data.char ? this.data.char : '';
        $button.appendChild($keySpan);

        const $keyCapsSpan = document.createElement('span');
        $keyCapsSpan.className = `${this.classes.keyText} ${this.classes.keyTextCaps}`;
        $keyCapsSpan.innerHTML = this.data.charCaps ? this.data.charCaps : '';
        $button.appendChild($keyCapsSpan);

        const $keyShiftSpan = document.createElement('span');
        $keyShiftSpan.className = `${this.classes.keyText} ${this.classes.keyTextShift}`;
        $keyShiftSpan.innerHTML = this.data.charShift ? this.data.charShift : '';
        $button.appendChild($keyShiftSpan);

        const $keyCapsShiftSpan = document.createElement('span');
        $keyCapsShiftSpan.className = `${this.classes.keyText} ${this.classes.keyTextCapsShift}`;
        $keyCapsShiftSpan.innerHTML = this.data.charCapsShift ? this.data.charCapsShift : '';
        $button.appendChild($keyCapsShiftSpan);

        const $keyRuSpan = document.createElement('span');
        $keyRuSpan.className = `${this.classes.keyText} ${this.classes.keyRuText}`;
        $keyRuSpan.innerHTML = this.data.charRu ? this.data.charRu : '';
        $button.appendChild($keyRuSpan);

        const $keyRuCapsSpan = document.createElement('span');
        $keyRuCapsSpan.className = `${this.classes.keyText} ${this.classes.keyRuTextCaps}`;
        $keyRuCapsSpan.innerHTML = this.data.charRuCaps ? this.data.charRuCaps : '';
        $button.appendChild($keyRuCapsSpan);

        const $keyRuShiftSpan = document.createElement('span');
        $keyRuShiftSpan.className = `${this.classes.keyText} ${this.classes.keyRuTextShift}`;
        $keyRuShiftSpan.innerHTML = this.data.charRuShift ? this.data.charRuShift : '';
        $button.appendChild($keyRuShiftSpan);

        const $keyRuCapsShiftSpan = document.createElement('span');
        $keyRuCapsShiftSpan.className = `${this.classes.keyText} ${this.classes.keyRuTextCapsShift}`;
        $keyRuCapsShiftSpan.innerHTML = this.data.charRuCapsShift ? this.data.charRuCapsShift : '';
        $button.appendChild($keyRuCapsShiftSpan);

        return $button;
    }
}
