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
    let html = `<li class="icons-group--item" data-icon-search="` + searchTerms + `" data-icon-name="` + icon.name + `" title="` + icon.name + `">
        <span class="icon--sample">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="` + icon.pathData + `" />
            </svg>
        </span>
        <span class="icon--label">` + icon.name + `</span>
    </li>`;
    return html;
}

function iconsHtml(icons) {
    let html = `<dl class="icons">
            <dt class="icons-group--title">
                <span><input id="asset-icon-search-text" type="search" placeholder="Search icons" /></span>
                <button id="icon-list-view-toggle" uxp-variant="action" title="Toggle list/grid view">
                    <img src="./images/icon_24x24.png" />
                </button>
            </dt>
            <dd class="icons-group--content">
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