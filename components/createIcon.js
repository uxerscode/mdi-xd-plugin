const { Rectangle, Path, Color } = require('scenegraph');
const commands = require('commands');

function createIcon(selection, name, pathData) {
    let newIcon = null;
    let iconPath = new Path();
    let iconBoundary = new Rectangle();

    iconPath.name = 'Path / ' + name ;
    iconPath.pathData = pathData;
    iconPath.fill = new Color("black");

    iconBoundary.name = 'Boundary';
    iconBoundary.width = 24;
    iconBoundary.height = 24;
    iconBoundary.fill = new Color("black");
    iconBoundary.opacity = 0;

    selection.insertionParent.addChild(iconBoundary);
    selection.insertionParent.addChild(iconPath);
    selection.items = [ iconBoundary, iconPath ];

    commands.alignVerticalCenter();
    commands.alignHorizontalCenter();
    commands.group();

    newIcon = selection.items[0];
    newIcon.name = 'MDI / ' + name;
    newIcon.opacity = .6;

    return newIcon;
}

module.exports = {
    createIcon
}