function iconItem(panel, icon, index, mode) {
    const _icon = panel.querySelector('#icon-' + index);
    var html = `<span class="icon--sample">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="${icon.path}" />
        </svg>
    </span>`;
    if (mode) {
        html += `<span class="icon--label">${icon.name}</span>`;
    }
    _icon.innerHTML = html;
    _icon.className = 'icon--item';
    if (!mode) {
        _icon.classList.add('icon--item-grid');
    } else {
        _icon.classList.add('icon--item-list');
    }
    _icon.setAttribute('name', icon.name);
    _icon.setAttribute('path', icon.path);
    _icon.setAttribute('title', icon.name + `\n` + icon.author);
    if (icon.google === 'true') {
        _icon.classList.add('google');
    }
}

module.exports = {
    iconItem
};