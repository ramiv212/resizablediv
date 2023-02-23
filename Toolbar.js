import { intToPx,pxToInt } from "./helpers.js"

export class ToolbarButton {
    constructor(parent,onClick) {
        this.parent = parent;

        this.div = document.createElement('button');
        this.div.className = 'toolbar-button';

        this.parent.append(this.div);

        // execute function passed down by user
        this.div.addEventListener('click',() => {
            onClick();
        })
        
    }
}

export class Toolbar {
    constructor(parent,description) {
        this.parent = parent;

        this.description = description;
        this.buttonImage = '/static/svgs/left-arrow.svg';

        this.div = document.createElement('div');
        this.div.className = 'toolbar';

        this.innerDiv = document.createElement('div');
        this.innerDiv.className = 'toolbar-inner';

        this.div.style.width = intToPx(parent.width);
        this.div.style.bottom = intToPx(parent.height - 40);

        this.parent.div.append(this.div);
        this.div.append(this.innerDiv);


        // create button image and append it to button div
        this.buttonSVG = `<img src="${this.buttonImage}" alt=${this.alt} class="toolbar-button-img">`;
        this.button1 = new ToolbarButton(this.innerDiv,() => console.log('click'));
        this.button1.div.innerHTML = this.buttonSVG;
    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = intToPx(pxToInt(this.parent.computedStyle.height)- 40);
    }
    
}