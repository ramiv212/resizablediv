import { intToPx,pxToInt } from "./helpers.js"

export class ToolbarButton {
    constructor(parent) {
        this.parent = parent;

        this.div = document.createElement('div');
        this.div.className = 'toolbar-button';
    }
}

export class Toolbar {
    constructor(parent,buttons) {
        this.parent = parent;

        this.div = document.createElement('div');
        this.div.className = 'toolbar';

        this.div.style.width = intToPx(parent.width);
        this.div.style.bottom = intToPx(parent.height - 50);

        this.parent.div.append(this.div);

        this.buttons = buttons;

        this.initTopbarButtons();
    }

    initTopbarButtons() {
        this.buttons.forEach(button => {
            this.parent.div.append(button.div);
        })
    }
    
}