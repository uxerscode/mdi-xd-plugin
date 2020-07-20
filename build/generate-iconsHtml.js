const fs = require('fs-extra');
const extract = require('extract-svg-path');

function getIcon(svg, filename, meta) {
    const name = filename.replace('.svg','');
    const contents = fs.readFileSync(svg, 'utf-8');
    const path = extract.parse(contents);
    const metadata = meta.find(entry => entry.name == name);
    const icon = {
        'name': name,
        'aliases': metadata.aliases,
        'pathData': path,
        'tags': metadata.tags,
        'community': (metadata.author === 'Google')
    };
    return icon;
}

function buildIcons() {
    const base = './node_modules/@mdi/svg';
    let icons = [];
    const svgs = fs.readdirSync(base + '/svg', {withFileTypes: true});
    const meta = JSON.parse(fs.readFileSync(base + '/meta.json','utf-8'));
    
    for (const svg of svgs) {
        icons.push(getIcon(base + '/svg/' + svg.name, svg.name, meta));
        // if (icons.length > 10) { break; }
    }
    return icons;
}

function iconHtml(icon) {
    let searchTerms = icon.name.toLowerCase();
    for (const alias of icon.aliases) {
        searchTerms += ',' + alias.toLowerCase();
    }
    for (const tag of icon.tags) {
        const values = tag.split('/');
        for (const value of values) {
            searchTerms += ',' + value.trim().toLowerCase();
        }
    }
    let html = `<li class="icons--item ` + (icon.community ? 'google ' : '') +  icon.name +
            `" data-icon-search="` + searchTerms +
            `" data-icon-name="` + icon.name +
            `" data-icon-path="` + icon.pathData +
            `" title="` + icon.name + 
            `">
            <span class="icon--sample">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="` + icon.pathData + `" />
                </svg>
            </span>
            <span class="icon--label">` + icon.name + `</span>
        </li>`;
    return html;
}

function iconsHtml() {
    let icons = buildIcons();
    let html = `<dl class="icons">
            <dt class="icons--title">
                <span>
                    <input id="icon-search-text" type="search" placeholder="Filter icons" />
                </span>
                <button id="icon-search" uxp-variant="action" title="Search">
                    <img src="./images/filter.png" />
                </button>
                <button id="icon-list-view-toggle" uxp-variant="action" title="Toggle list/grid view">
                    <img src="./images/icon_24x24.png" />
                </button>
            </dt>
            <dd class="icons--content">
                <ul class="icons--list">`;
    icons.forEach( icon => {
        html += iconHtml(icon);
    });
    html += `
                </ul>
            </dd>
        </dl>
    `;
    return html;
}

module.exports = {
    iconsHtml
}