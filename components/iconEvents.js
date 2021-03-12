let application = require('application');
const { search } = require("./search");
const { createIcon } = require("./createIcon");
const { centerInViewport } = require("../lib/utils");

function setIconsEvents(panel) {
    // Search
    const iconSearch = panel.querySelector('#icon-search-text');
    const searchBtn = panel.querySelector('#icon-search');
    searchBtn.addEventListener('click', () => {
        search(panel, iconSearch.value);
    });
    panel.addEventListener('keydown', event => {
        if(event.keyCode === 13) {
            search(panel, iconSearch.value);
        }
        if(event.keyCode === 27) {
            iconSearch.value = '';
        }
    });
    // // Icon List
    const list = panel.querySelector('#icons--list');
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
                application.editDocument((selection) => {
                    let name = target.getAttribute('name');
                    let path = target.getAttribute('path');
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