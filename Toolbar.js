import { intToPx,pxToInt } from "./helpers.js"

const button1Image = 'left-arrow.svg';
const button2Image = 'right-arrow.svg';


export class ToolbarButton {
    constructor(parent,innerContent,description,onClick,className) {
        this.parent = parent;

        // this array holds a reference to the child button divs
        this.childrenDiv = [];

        this.innerContent = innerContent;
        this.description = description;

        // create the wrapper div that will contain the button
        this.wrapperDiv = document.createElement('div');
        this.wrapperDiv.className = `toolbar-button-wrapper-div`;
        this.parent.append(this.wrapperDiv);
    
        // create the button element and add it to the wrapper div
        this.element = document.createElement('button');
        this.element.className = className;
        this.wrapperDiv.append(this.element);

        // this function checks if the content inside is an svg or text and renders that
        this.validateInnerContent(this.innerContent);

        // this array will hold the reference to the children button instance if there are any
        this.childrenInstanceArray = [];

        // execute function passed down by user
        this.element.addEventListener('click',() => {
            onClick(this);
        })
        
    }

    validateInnerContent(innerContent) {
        if (!innerContent) return;

        // if this is a string of text and not a reference to an .svg image
        if (innerContent.search('.svg') === -1) {
            this.element.innerText = innerContent;
        } else {
            // add passed down image to button
        this.element.innerHTML = `<img src="/static/svgs/${this.innerContent}" alt=${this.description} class="toolbar-button-img">`;
        }
    }

    // if someone clicks on parent button, either hide or show children buttons
    toggleChildElements() {
        this.childrenInstanceArray.forEach((child) => {
            if (child.wrapperDiv.style.display === "block") {
                child.wrapperDiv.style.display = "none";
            } else {
                child.wrapperDiv.style.display = "block";
            };
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
    constructor(parent,buttonsObject,hasNavbar) {
        this.parent = parent;

        this.div = document.createElement('div');
        this.div.className = 'toolbar';

        this.innerDiv = document.createElement('div');
        this.innerDiv.className = 'toolbar-inner';

        this.div.style.width = intToPx(parent.width);
        this.div.style.bottom = intToPx(parent.height - 30);

        this.parent.div.append(this.div);
        this.div.append(this.innerDiv);

        // render the buttons that are passed down as an arg, then return the references to the created button objects to this.parentButtons as an array
        this.parentButtons = this.renderButtons(buttonsObject);

        // create a navbar
        hasNavbar === true ? this.navBar = new Navbar(this.innerDiv) : null;
    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = intToPx(pxToInt(this.parent.computedStyle.height) - 30);
    }

    renderButtonChildren(parentWrapperDiv,children) {
        let dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'toolbar-dropdown-div';
        parentWrapperDiv.append(dropdownDiv);

        let childrenToReturn = [];

        children.forEach((button) => {
            let newButton = new ToolbarButton(
                dropdownDiv,
                button.innerContent,
                button.description,
                button.function,
                button.className,
            );
            dropdownDiv.append(newButton.wrapperDiv);
            newButton.wrapperDiv.style.display = 'none';

            // add all of the children of the button to an array to be passed to the parent later.
            childrenToReturn.push(newButton);
        });

        return childrenToReturn;
    }

    // buttons are passed down as an object of objects
    renderButtons(buttons) {
        let buttonsToReturn = [];

        buttons && buttons.forEach((button) => {
            let newButton = new ToolbarButton(
                this.innerDiv,
                button.innerContent,
                button.description,
                button.function,
                button.className,
            );
            
            // if the button has child buttons, render the child buttons into the parent's button wrapper div
            if (button.children) {
                // the render function returns the instances of the child button classes. Pass them to the parent button
                // so the parent can show and hide the children button when needed
                let childrenInstanceArray = this.renderButtonChildren(newButton.wrapperDiv,button.children);
                newButton.childrenInstanceArray = childrenInstanceArray;
           };

           buttonsToReturn.push(newButton);
        });

        return buttonsToReturn;
    }
    
}