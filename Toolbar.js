import { intToPx,pxToInt } from "./helpers.js"

const button1Image = 'left-arrow.svg';
const button2Image = 'right-arrow.svg';


export class ToolbarButton {
    constructor(parent,innerContent,onClick,childrenInstanceArray = [],className = 'toolbar-named-button') {
        this.parent = parent;

        // this array holds a reference to the child button divs
        this.childrenDiv = [];

        this.innerContent = innerContent;

        // create the wrapper div that will contain the button
        this.innerDiv = document.createElement('div');
        this.innerDiv.className = `toolbar-button-wrapper-div`;
        this.parent.innerDiv.append(this.innerDiv);
    
        // create the button element and add it to the wrapper div
        this.element = document.createElement('button');
        this.element.className = className;
        this.innerDiv.append(this.element);

        // this function checks if the content inside is an svg or text and renders that
        this.validateInnerContent(this.innerContent);

        // this array will hold the reference to the children button instance if there are any
        this.childrenInstanceArray = childrenInstanceArray;

        // execute function passed down by user
        this.element.addEventListener('click',() => {
            onClick(this);
        });
    }

    validateInnerContent(innerContent) {
        if (!innerContent) return;

        // if this is a string of text and not a reference to an .svg image
        if (innerContent.search('.svg') === -1) {
            this.element.innerText = innerContent;
        } else {
            // add passed down image to button
        this.element.innerHTML = `<img src="/static/svgs/${this.innerContent}" class="toolbar-button-img">`;
        }
    }

    // if someone clicks on parent button, either hide or show children buttons
    toggleChildElements() {
        this.childrenInstanceArray.forEach((child) => {
            if (child.innerDiv.style.display === "block") {
                child.innerDiv.style.display = "none";
            } else {
                child.innerDiv.style.display = "block";
            };
        })
    }

    addChildButton(innerContent,onClick,...others) {
        const newButton = new ToolbarButton(this,innerContent,onClick,this.childrenInstanceArray,);
        console.log(this);
        newButton.innerDiv.style.display = 'none';
        this.childrenInstanceArray.push(newButton);
        return {
            "and": newButton,
            // this should return the toolbar,so that you can keep adding parent buttons
            "finally": this.childrenInstanceArray[0].parent.parent, 
        };
    };

    addSubMenu(){
        // this div will be used to append child buttons to it
        this.innerDiv.addEventListener("mouseover", this.toggleChildElements());
        this.innerDiv.className = 'toolbar-dropdown-div ';
        return this;
    }
}


class Navbar {
    constructor(parent) {
        this.parent = parent;

        this.innerDiv = document.createElement('div');
        this.navBarField = document.createElement('input');

        this.parent.innerDiv.append(this.innerDiv);
        this.innerDiv.append(this.navBarField);

        this.innerDiv.className = 'navbar-inner-div';
        this.navBarField.className = 'navbar-input-field';
    }
}


export class Toolbar {
    constructor(parent,buttonsArray = [],hasNavbar = false) {
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
        this.parentButtons = this.renderButtons(buttonsArray);

        // create a navbar if true bool is passed down
        hasNavbar === true ? this.navBar = new Navbar(this.innerDiv) : this.navBar = null;
    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = intToPx(pxToInt(this.parent.computedStyle.height) - 30);
    }

    renderButtonChildren(parent,children) {
        let childrenToReturn = [];

        children.forEach((button) => {
            let newButton = new ToolbarButton(
                parent.dropdownDiv,
                button.innerContent,
                button.description,
                button.function,
                button.className,
            );
            parent.dropdownDiv.append(newButton.wrapperDiv);
            newButton.wrapperDiv.style.display = 'none';

            // add all of the children of the button to an array to be passed to the parent later.
            childrenToReturn.push(newButton);
        });

        return childrenToReturn;
    }

    // buttons are passed down as an object of objects
    renderButtons(buttonsArray) {
        // if there are no buttons when toolbar is constructed do nothing
        if (buttonsArray.length === 0) return this.parent;

        let buttonsToReturn = [];

        buttons.forEach((button) => {
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

    addNavBar() {
        if (!this.navBar) {
            this.navBar = new Navbar(this);
            return this;
        } else {
            return this;
        }
    };
    
    addToolBarButton(innerContent,onClick,...others) {
        const newButton = new ToolbarButton(this,innerContent,onClick);
        return {
            "and": newButton,
            "finally": this, 
        };
    };
}