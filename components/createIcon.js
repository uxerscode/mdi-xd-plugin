const { Rectangle, Path, Color } = require('scenegraph');
const commands = require('commands');

function createIcon(selection, name, pathData) {
    let newIcon = null;
    let iconPath = new Path();
    let iconBoundary = new Rectangle();
    let replaceIcon = false;
    let lookFor = new RegExp('MDI \/');

    if (selection.items.length == 1 && lookFor.test(selection.items[0].name)) {
        replaceIcon = true;
        commands.ungroup();
        iconBoundary = selection.items[0];
        iconPath = selection.items[1];
    } else {
        iconBoundary.name = 'Boundary';
        iconBoundary.width = 24;
        iconBoundary.height = 24;
        iconBoundary.fill = new Color("black");
        iconBoundary.opacity = 0;
    }

    iconPath.name = 'Path / ' + name ;
    iconPath.pathData = pathData;
    
    if (!replaceIcon){
        iconPath.fill = new Color("black");
        selection.insertionParent.addChild(iconBoundary);
        selection.insertionParent.addChild(iconPath);
    }

    selection.items = [ iconBoundary, iconPath ];

    commands.alignVerticalCenter();
    commands.alignHorizontalCenter();
    commands.group();

    newIcon = selection.items[0];
    newIcon.name = 'MDI / ' + name;
    newIcon.opacity = .6;
    newIcon.replace = replaceIcon;

    return newIcon;
}

module.exports = {
    createIcon
}