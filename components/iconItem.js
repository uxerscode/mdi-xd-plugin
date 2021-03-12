const { icons } = require("./icons");

function iconItem(panel, icon, index) {
    const _icon = panel.querySelector('#icon-' + index);
    _icon.className = '';
    _icon.innerHTML = `
            <span class="icon--sample">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="` + icon.path + `" />
                </svg>
            </span>
            <span class="icon--label">` + icon.name + `</span>`;
    _icon.classList.add('icons--item');
    _icon.setAttribute('name', icon.name);
    _icon.setAttribute('path', icon.path);
    _icon.setAttribute('title', icon.author);
    if(icon.google === 'true') {
        _icon.classList.add('google');
    }
}

module.exports = { iconItem };
