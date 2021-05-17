const { panelHtml } = require('./components/panelHtml');
const { setIconsEvents } = require('./components/iconEvents');

let panel;

function create() {
  panel = document.createElement('div');
  panel.classList.add('panel');
  panel.innerHTML = panelHtml;
  setIconsEvents(panel);
  return panel;
}

// Show the panel
function show(event) {
  if (!panel) event.node.appendChild(create());
}

module.exports = {
  panels: {
    MDI: {
      show
    }
  }
};