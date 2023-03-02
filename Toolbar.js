import { intToPx,pxToInt } from "./helpers.js"

const button1Image = 'left-arrow.svg';
const button2Image = 'right-arrow.svg';


export class ToolbarButton {
    constructor(parent,innerContent,onClick,className = 'toolbar-named-button') {
        this.parent = parent;

        this.innerContent = innerContent;

        // create the wrapper div that will contain the button
        this.innerDiv = document.createElement('div');
        this.innerDiv.className = `toolbar-button-wrapper-div`;
        // this.parent.innerDiv.append(this.innerDiv);
    
        // create the button element and add it to the wrapper div
        this.element = document.createElement('button');
        this.element.className = className;
        this.innerDiv.append(this.element);

        // this function checks if the content inside is an svg or text and renders that
        this.validateInnerContent(this.innerContent);

        this.childButtonArray = [];
        this.childrenAreHidden = true;

        this.subMenuCount = 0;

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

    toggleChildren() {
        this.childrenAreHidden = !this.childrenAreHidden;
        this.childButtonArray.forEach((childButton) => {
            if (this.childrenAreHidden) {
                childButton.innerDiv.style.display = 'none'; 
            }
            else {childButton.innerDiv.style.display = 'block';
            };
        });
    };

    showChildren() {
        this.childButtonArray.forEach((childButton) => {
            childButton.innerDiv.style.display = 'block';
            childButton.parent.innerDiv.style.display = 'block';
        });
        this.childrenAreHidden = false;
    };

    hideChildren() {
        this.childButtonArray.forEach((childButton) => {
            childButton.innerDiv.style.display = 'none';
        });
        this.childrenAreHidden = true;
    };

    addChildButton(innerContent,onClick,className = 'toolbar-named-button') {
        const newButton = new ToolbarButton(this,innerContent,onClick,className);
        this.childButtonArray.push(newButton);
        this.innerDiv.append(newButton.innerDiv);

        newButton.innerDiv.style.display = 'none';
        return {
            and: this,
            finally: this.parent
        }
    };

    addSubMenu() {
        const newSubMenu = new SubMenu(this,this.subMenuCount);
        this.innerDiv.append(newSubMenu.innerDiv);
        newSubMenu.innerDiv.style.display = 'none';

        const subMenuParentButton = this.childButtonArray[this.subMenuCount];

        // add an event listener to the sub menu parent to show the submenu children
        subMenuParentButton.innerDiv.addEventListener('mouseenter',() => {
            subMenuParentButton.showChildren();
        });

        // add and event listener to the sub menu parent to hide the children
        subMenuParentButton.innerDiv.addEventListener('mouseleave',() => {
            subMenuParentButton.hideChildren();
        });

        this.subMenuCount ++;

        return {
            and: newSubMenu,
            finally: this
        }
    }
    
}

class SubMenu {
    constructor(parent,count,width = 75) {
        this.parent = parent;

        this.count = count;

        this.innerDiv = document.createElement('div');
        this.innerDiv.className = 'toolbar-dropdown-div';
        this.innerDiv.style.minWidth = intToPx(width);
        this.innerDiv.style.position = 'absolute';
        this.innerDiv.style.left = intToPx(width * 1.5);
        this.innerDiv.style.top = intToPx((this.parent.childButtonArray.length * 25) + 5);

    }

    addChildButton(innerContent,onClick,className = 'toolbar-named-button') {
        const newButton = new ToolbarButton(this,innerContent,onClick,className);
        this.innerDiv.append(newButton.innerDiv);

        // this event listener is to keep the whole
        // submenu open while the mouse is still on it
        this.innerDiv.addEventListener('mouseenter',() => {
            newButton.innerDiv.style.display = 'block';
        });

        this.innerDiv.addEventListener('mouseleave',() => {
            newButton.innerDiv.style.display = 'none';
        })

        // add this button to the childbuttonlist array of the submenu parent
        // since the actual parent of the submenu is the parent button,
        // the submenu parent button needs to be indexed from the parent button childbuttonlist
        this.parent.childButtonArray[this.count].childButtonArray.push(newButton);

        return {
            and: this,
            finally: this.parent
        }
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


        // create a navbar if true bool is passed down
        hasNavbar === true ? this.navBar = new Navbar(this.innerDiv) : this.navBar = null;

        this.parent.div.addEventListener('click',(e) => {
            if (e.target.className === 'toolbar-named-button') {
                // this will be to hide menus when clicking on the window
            };
        });
    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = intToPx(pxToInt(this.parent.computedStyle.height) - 30);
    }


    addParentButton(innerContent,onClick,className = 'toolbar-named-button') {
        const newButton = new ToolbarButton(this,innerContent,onClick,className);
        this.innerDiv.append(newButton.innerDiv);
        
        return {
            and: newButton,
            finally: this,
        }
    }

}