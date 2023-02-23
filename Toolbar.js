import { intToPx,pxToInt } from "./helpers.js"

const button1Image = 'left-arrow.svg';
const button2Image = 'right-arrow.svg';


export class ToolbarButton {
    constructor(parent,buttonImage,description,onClick) {
        this.parent = parent;

        this.buttonImage = buttonImage;
        this.description = description;

        this.element = document.createElement('button');
        this.element.className = 'toolbar-button';

        this.parent.append(this.element);

        // add passed down image to button
        this.element.innerHTML = `<img src="/static/svgs/${this.buttonImage}" alt=${this.description} class="toolbar-button-img">`;

        // execute function passed down by user
        this.element.addEventListener('click',() => {
            onClick();
        })
        
    }
}


class Navbar {
    constructor(parent) {
        this.parent = parent;

        this.innerDiv = document.createElement('div');
        this.navBarField = document.createElement('input');

        this.parent.append(this.innerDiv);
        this.innerDiv.append(this.navBarField);

        this.innerDiv.className = 'navbar-inner-div';
        this.navBarField.className = 'navbar-input-field';
    }
}


export class Toolbar {
    constructor(parent,description) {
        this.parent = parent;

        this.div = document.createElement('div');
        this.div.className = 'toolbar';

        this.innerDiv = document.createElement('div');
        this.innerDiv.className = 'toolbar-inner';

        this.div.style.width = intToPx(parent.width);
        this.div.style.bottom = intToPx(parent.height - 40);

        this.parent.div.append(this.div);
        this.div.append(this.innerDiv);


        // create button image and append it to button div
        this.button1 = new ToolbarButton(this.innerDiv,button1Image,'Back',() => console.log('click'));
        this.button1 = new ToolbarButton(this.innerDiv,button2Image,'Back',() => console.log('click'));

        // create a navbar
        this.navBar = new Navbar(this.innerDiv);
    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = intToPx(pxToInt(this.parent.computedStyle.height)- 40);
    }
    
}