const { Rectangle, Path, Color } = require('scenegraph');
const { getIcons } = require('../../services/mdi');
const commands = require('commands');

let iconSet = null;

const iconDef = {
    width: 24,
    height: 24,
    name: 'No Icon Defined',
    pathData: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
}

function findIcon(name) {
    let thisIcon = false;
    iconSet.set.forEach( icon => {
        if (icon.name.toLowerCase() === name.toLowerCase()) {
            thisIcon = icon;
        }
    });
    return thisIcon;
}

function createIcon(selection, icon) {
    iconSet = getIcons();
    let newIcon = null;
    let iconPath = new Path();
    let iconBoundary = new Rectangle();

    if (typeof icon === 'string') {
        icon = findIcon(icon);
    } else if (!icon) { 
        icon = iconDef;
    }

    iconPath.name = (icon.name) ? 'Path / ' + icon.name : 'Path / ' + iconDef.name;
    iconPath.pathData = (icon.pathData) ? icon.pathData : iconDef.pathData;
    iconPath.fill = ( icon.color && icon.color == 'white') ? new Color("white") : new Color(icon.color);

    iconBoundary.name = 'Boundary';
    iconBoundary.width = iconDef.width;
    iconBoundary.height = iconDef.height;
    iconBoundary.fill = new Color("black");
    iconBoundary.opacity = 0;

    selection.insertionParent.addChild(iconBoundary);
    selection.insertionParent.addChild(iconPath);
    selection.items = [ iconBoundary, iconPath ];

    commands.alignVerticalCenter();
    commands.alignHorizontalCenter();
    commands.group();

    newIcon = selection.items[0];
    newIcon.name = 'MDI / ' + icon.name;
    newIcon.opacity = .6;

    return newIcon;
}

module.exports = {
    createIcon
}