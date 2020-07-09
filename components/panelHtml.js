const { html } = require('./panelHtml.html');
const { css } = require('./panelHtml.css');
const { iconHtml } = require('./iconHtml');

const styleReplace = `/* ### Styles ### */`;
const iconsReplace = `<!-- ### Icons ### -->`;

function panelHtml(data) {
    let Html = html();
    Html = Html.replace(styleReplace, css());
    Html = Html.replace(iconsReplace, iconHtml);
    return Html;
}

module.exports = {
    panelHtml
}
