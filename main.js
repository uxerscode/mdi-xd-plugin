let application = require('application');
const { panelHtml } = require('./components/panelHtml');
const { translateData } = require('./lib/utils');
const { setIconsEvents } = require('./components/iconsHtml');

let panel;
let data;
let currentSelection;

Object.assign(String.prototype, {
  toSentenceCase() {
      const string = this.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
});

Object.assign(String.prototype, {
  toKebabCase() {
    return this.toLowerCase().replace(/ /g,`-`);
  }
});

Object.assign(String.prototype, {
  toCamelCase() {
    return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }
});

function create() {
    panel = document.createElement('div');
    let html = panelHtml(data);
    panel.innerHTML = html;

    const iconSelection = panel.querySelector('#icons');
    setIconsEvents(panel);

    return panel;
}

function update(selection) {
  currentSelection = selection;
}

// Show the panel
function show(event) {
  if (!panel) event.node.appendChild(create());
  // const items = panel.querySelectorAll('.asset-group--item');
  // items.forEach((item) => {
  //   item.addEventListener('click', function(e) {
  //     const dataItem = this.getAttribute('data-item');
  //     if (dataItem) {
  //       const data = JSON.parse(dataItem.replace(/'/g,`"`));
  //       if (data.type) {
  //         if (data.type === 'color') {
  //           application.editDocument(() => {
  //             setColor(currentSelection, data);
  //           });
  //         }
  //         if (data.type === 'type') {
  //           application.editDocument(() => {
  //             setType(currentSelection, data);
  //           })
  //         }
  //       }
  //     }
  //   });
  // });
}

module.exports = {
  panels: {
    mainMDI: {
      show,
      update
    }
  }
};