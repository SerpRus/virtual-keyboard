export default class Textarea {
    classes = {
        textarea: 'textarea',
        elementTextarea: 'virtual-keyboard__textarea',
    };

    createTextarea() {
        const $textarea = document.createElement('textarea');
        $textarea.classList.add(this.classes.elementTextarea);
        $textarea.classList.add(this.classes.textarea);
        $textarea.setAttribute('autofocus', 'autofocus');
        $textarea.setAttribute('data-textarea', '');

        return $textarea;
    }
}
