let viewport = require('viewport');
let icons = [];

function toJSON(str) {
    if (typeof str === 'string') {
        const newStr = str.replace(/'/g,`"`);
        return JSON.parse(newStr);
    }
}

function centerInViewport(selection, target) {
    let moveToBoardX = (selection.focusedArtboard) ? selection.focusedArtboard.boundsInParent.x : 0;
    let moveToBoardY = (selection.focusedArtboard) ? selection.focusedArtboard.boundsInParent.y : 0;
    let moveToX = (viewport.bounds.x + viewport.bounds.width/2) - (target.localBounds.width / 2) - moveToBoardX;
    let moveToY = (viewport.bounds.y + viewport.bounds.height/2) - (target.localBounds.height / 2) - moveToBoardY;
    target.moveInParentCoordinates(moveToX, moveToY);
    viewport.scrollIntoView(target);
}

function findAncestorInDom(obj, cn) {
    let lookFor = new RegExp(cn);
    let parent = obj;
    while (!lookFor.test(parent.className)) {
        parent = parent._parentNode;
    }
    return parent;
}

function translateData(raw) {
    let data = {
        color: raw.palettes,
        typography: raw.type,
        icons: translateIcons(raw.icons),
        components: raw.components
    };
    // console.log(data.icons);
    return raw;
}

/** ----------------------------------------------------------------------------
 *  Icons 
 */

function translateIcons(iconSet) {
    let icons = {};

    return iconSet;
}

function findIconPath(name) {
    let icon = icons.find( icon => icon.name === name );
    let iconPath = null;
    return iconPath;
}

module.exports = {
    toJSON,
    centerInViewport,
    findAncestorInDom,
    translateData
}