export default class Header {
    descriptions = [
        'OS: Windows',
        'Languages: English / Russian',
        'Change Language: "Shift (left)" + "Alt (left)"',
    ];

    createHeader() {
        const $header = document.createElement('header');
        $header.className = 'header';

        const $h1 = document.createElement('h1');
        $h1.innerHTML = 'Virtual keyboard';
        $h1.className = 'title';

        const $descriptionsList = document.createElement('ul');

        for (let i = 0; i < this.descriptions.length; i += 1) {
            const $descriptionsItem = document.createElement('li');
            $descriptionsItem.innerHTML = this.descriptions[i];
            $descriptionsList.appendChild($descriptionsItem);
        }

        $header.appendChild($h1);
        $header.appendChild($descriptionsList);

        return $header;
    }
}
