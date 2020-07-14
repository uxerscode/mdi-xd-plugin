let application = require('application');
const { panelHtml } = require('./components/panelHtml');
const { setIconsEvents } = require('./components/iconsHtml');

let panel;
let data;
let currentSelection;

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
}

module.exports = {
  panels: {
    mainMDI: {
      show,
      update
    }
  }
};