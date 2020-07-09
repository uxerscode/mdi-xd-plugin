let application = require('application');
const { getIcons } = require("../../services/mdi");
const { createIcon } = require("./createIcon");
const { centerInViewport } = require("../lib/utils");

let _iconList = null;
let icons = getIcons();

function filterIconList(searchFor, searchList) {
    searchList.forEach( icon => {
        let lookFor = new RegExp(searchFor.toLowerCase());
        if (lookFor.test(icon.getAttribute('data-icon-search'))) {
            icon.className = 'asset-group--item';
        } else {
            icon.className = 'asset-group--item hide';
        }
    });
}

function setIconsEvents(panel) {
    // Search
    const iconSearch = panel.querySelector('#asset-icon-search-text');
    _iconList = panel.querySelectorAll('#icons .asset-group--item');
    iconSearch && iconSearch.addEventListener('input', (event) => {
        filterIconList(event.target.value, _iconList);
    });
    // View Toggle
    const iconBtn = panel.querySelector('#icon-list-view-toggle');
    iconBtn && iconBtn.addEventListener('click', () => {
        const iconList = panel.querySelector('.assets-icons--list');
        if (iconList.className === 'assets-icons--list') {
            iconList.className = 'assets-icons--list assets-icons--list__show-list';
        } else {
            iconList.className = 'assets-icons--list';
        }
    });
    // Individual icons
    icons.forEach( icon => {
        const iconBtn = panel.querySelector('li[data-icon-name="' + icon.name + '"]');
        iconBtn.addEventListener('click', () => {
            application.editDocument( (selection) => {
                let newIcon = createIcon(selection, icon);
                centerInViewport(selection, newIcon);
            } );
        } );
    } );
}

module.exports = {
    setIconsEvents
}