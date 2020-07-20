let application = require('application');
const { createIcon } = require("./createIcon");
const { centerInViewport } = require("../lib/utils");

let _iconList = null;

function filterIconList(searchFor, searchList) {
    searchList.forEach( icon => {
        let lookFor = new RegExp(searchFor.toLowerCase());
        if (lookFor.test(icon.getAttribute('data-icon-search'))) {
            icon.className = 'icons--item';
        } else {
            icon.className = 'icons--item hide';
        }
    });
}

function setIconsEvents(panel) {
    // Search
    const iconSearch = panel.querySelector('#icon-search-text');
    _iconList = panel.querySelectorAll('#icons .icons--item');
    iconSearch && iconSearch.addEventListener('input', (event) => {
        filterIconList(event.target.value, _iconList);
    });
    // View Toggle
    const iconBtn = panel.querySelector('#icon-list-view-toggle');
    iconBtn && iconBtn.addEventListener('click', () => {
        const iconList = panel.querySelector('.icons--list');
        if (iconList.className === 'icons--list') {
            iconList.className = 'icons--list icons--list__show-list';
        } else {
            iconList.className = 'icons--list';
        }
    });
    // Icon List
    const list = panel.querySelector('.icons--list');
    list.addEventListener('click', event => {
        if (event)  {
            let target = event.target;
            while(target.nodeName != 'LI') {
                target = target.parentNode;
                if (target === null) { break }
            }
            const classes = target.classList;
            let name = target.classList._cachedAttrValue;
            name = name.split(' ')[1];
            application.editDocument( (selection) => {
                let icon = document.querySelector('.' + name);
                let path = icon.getAttribute('data-icon-path');
                let newIcon = createIcon(selection, name, path);
                centerInViewport(selection, newIcon);
            });
        }
    });
}

module.exports = {
    setIconsEvents
}