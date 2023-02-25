import { intToPx,pxToInt } from "./helpers.js"

const button1Image = 'left-arrow.svg';
const button2Image = 'right-arrow.svg';

export class ToolbarButtonChild {
    constructor() {
        
    }
}


export class ToolbarButton {
    constructor(parent,innerContent,description,onClick,className) {
        this.parent = parent;

        this.innerContent = innerContent;
        this.description = description;

        this.element = document.createElement('button');
        this.element.className = className;

        this.parent.append(this.element);

        this.validateInnerContent(this.innerContent);

        // execute function passed down by user
        this.element.addEventListener('click',() => {
            onClick();
        })
        
    }

    validateInnerContent(innerContent) {
        // if this is a string of text and not a reference to an .svg image
        if (innerContent.search('.svg') === -1) {
            this.element.innerText = innerContent;
        } else {
            // add passed down image to button
        this.element.innerHTML = `<img src="/static/svgs/${this.innerContent}" alt=${this.description} class="toolbar-button-img">`;
        }
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
    constructor(parent,buttons) {
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
        // this.button1 = new ToolbarButton(this.innerDiv,button1Image,'Back',() => console.log('click'));
        // this.button1 = new ToolbarButton(this.innerDiv,button2Image,'Back',() => console.log('click'));
        this.renderButtons(buttons);

        // create a navbar
        this.navBar = new Navbar(this.innerDiv);
    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = intToPx(pxToInt(this.parent.computedStyle.height)- 40);
    }

    // buttons are passed down as an object of objects
    renderButtons(buttons) {
        buttons && buttons.forEach((button) => {
            new ToolbarButton(
                this.innerDiv,
                button.innerContent,
                button.description,
                button.function,
                button.className,
            )
        })
    }
    
}