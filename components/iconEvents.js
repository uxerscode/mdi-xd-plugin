let application = require('application');
const { search } = require("./search");
const { createIcon } = require("./createIcon");
const { centerInViewport } = require("../lib/utils");

let _iconList = null;

function setIconsEvents(panel) {
    // Search
    const iconSearch = panel.querySelector('#icon-search-text');
    const searchBtn = panel.querySelector('#icon-search');
    searchBtn.addEventListener('click', () => {
        search(panel, iconSearch.value);
    })
    // // Icon List
    // const list = panel.querySelector('.icons--list');
    // list.addEventListener('click', event => {
    //     if (event) {
    //         let target = event.target;
    //         while (target.nodeName != 'LI') {
    //             target = target.parentNode;
    //             if (target === null) {
    //                 break
    //             }
    //         }
    //         if (target !== null) {
    //             const classes = target.classList;
    //             let name = target.classList._cachedAttrValue;
    //             name = name.split(' ')[1];
    //             application.editDocument((selection) => {
    //                 let icon = document.querySelector('.' + name);
    //                 let path = icon.getAttribute('data-icon-path');
    //                 let newIcon = createIcon(selection, name, path);
    //                 centerInViewport(selection, newIcon);
    //             });
    //         }
    //     }
    // });
}

module.exports = {
    setIconsEvents
}