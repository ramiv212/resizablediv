import { pxToInt,intToPx } from "./helpers.js";
import Anchor from "./Anchor.js";
import Topbar from "./Topbar.js";
import { Toolbar } from "./Toolbar.js";

export default class ResizableDiv {
    constructor(x = 300,y = 300,width = 800,height = 400,windows,toolbar,hasNavbar) {

        // this is an array that contains all of the active windows inside
        this.windows = windows;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // create div object and style it 
        this.div = document.createElement('div');
        this.div.className = 'box';

        // move box to position passed down in args
        this.div.style.left = intToPx(this.x);
        this.div.style.top = intToPx(this.y);

        // size box to values passed down in args
        this.div.style.width = intToPx(this.width);
        this.div.style.height = intToPx(this.height);

        // make sure this div does not get sized too small
        this.div.style.minWidth = intToPx(this.width / 1.5);
        this.div.style.minHeight = intToPx(this.height / 1.5);

        this.computedStyle = getComputedStyle(this.div);

        // create an anchor for this div
        this.Anchor = new Anchor(this,30,30);

        console.log(this.Anchor);

        // create the topbar
        this.Topbar = new Topbar(this);

        // empty variable to be filled with toolbar object if it is added
        // with the toolbar method
        this.Toolbar = null;

        // add a click event listener to focus on the window
        

        // this.setInnerHTML(`
        //     <h1>Hello</h1>
        // `)

    }

    scale(xOffset,yOffset) {
        this.div.style.width = intToPx(this.width - xOffset);
        this.div.style.height = intToPx(this.height - yOffset);

        this.Topbar.resize();
        this.Toolbar?.resize();

    }

    move(xOffset,yOffset) {
        this.div.style.left = intToPx(this.x - xOffset);
        this.div.style.top = intToPx(this.y - yOffset);
    }

    close() {
        this.div.remove();
    }

    focus() {
        
    }

    setInnerHTML(htmlString) {
        let innerDiv = document.createElement('div');
        this.div.append(innerDiv);
        innerDiv.innerHTML = htmlString;
    }

    // add div to to the parent element
    render(parent) {
        parent.append(this.div);
        return this;
    }

    addToolBar() {
        if (!this.toolbar){
            this.toolbar = new Toolbar(this);
            return this.toolbar;
        } else {
            return this.toolbar;
        }
    };

}