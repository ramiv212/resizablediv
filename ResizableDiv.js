import { pxToInt,intToPx } from "./helpers.js";

export default class ResizableDiv {
    constructor(parent,x,y,width,height) {
        this.parent = parent,
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

        // add div to to the parent element
        this.parent.append(this.div);

        this.computedStyle = getComputedStyle(this.div);

    }
}