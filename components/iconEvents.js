let application = require('application');
const { createIcon } = require("./createIcon");
const { centerInViewport } = require("../lib/utils");

let _iconList = null;

function filterIconList(searchFor, searchList) {
    let lookFor = new RegExp(searchFor.toLowerCase());
    searchList.forEach(icon => {
        if (lookFor.test(icon.getAttribute('data-icon-search'))) {
            icon.className = 'icons--item';
        } else {
            icon.className = 'icons--item hide';
        }
    });
}

function setIconsEvents(panel) {
    // Filter
    const iconSearch = panel.querySelector('#icon-search-text');
    _iconList = panel.querySelectorAll('#icons .icons--item');
    const searchBtn = panel.querySelector('#icon-search');
    searchBtn.addEventListener('click', () => {
        filterIconList(iconSearch.value, _iconList);
    })
    // View Toggle
    const iconBtn = panel.querySelector('#icon-list-view-toggle');
    const iconBtnImg = panel.querySelector('#icon-toggle-button');
    iconBtn && iconBtn.addEventListener('click', () => {
        const iconList = panel.querySelector('.icons--list');
        if (iconList.className === 'icons--list') {
            iconBtnImg.src = './images/format-list-bulleted-square.png';
            iconList.className = 'icons--list icons--list__show-list';
        } else {
            iconBtnImg.src = './images/view-grid.png';
            iconList.className = 'icons--list';
        }
    });
    // Icon List
    const list = panel.querySelector('.icons--list');
    list.addEventListener('click', event => {
        if (event) {
            let target = event.target;
            while (target.nodeName != 'LI') {
                target = target.parentNode;
                if (target === null) {
                    break
                }
            }
            if (target !== null) {
                const classes = target.classList;
                let name = target.classList._cachedAttrValue;
                name = name.split(' ')[1];
                application.editDocument((selection) => {
                    let icon = document.querySelector('.' + name);
                    let path = icon.getAttribute('data-icon-path');
                    let newIcon = createIcon(selection, name, path);
                    centerInViewport(selection, newIcon);
                });
            }
        }
    });
}

module.exports = {
    setIconsEvents
}