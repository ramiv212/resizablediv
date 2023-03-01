import { intToPx,pxToInt } from "./helpers.js"

export default class Anchor {

    constructor(parent,width,height) {
        this.width = width;
        this.height = height;

        this.parent = parent;

        // create div object and style it 
        this.div = document.createElement('div');
        this.div.className = 'anchor';

        // size box to values passed down in args
        this.div.style.width = intToPx(this.width);
        this.div.style.height = intToPx(this.height);

        // make it draggable
        this.div.draggable = "true";

        // add div to to the parent element
        this.parent.div.append(this.div);

        // put the anchor at the bottom right of the window
        this.div.style.left = intToPx(this.parent.width - (this.width / 2));
        this.div.style.top = intToPx(this.parent.height - (this.height / 2));


        this.dragEventListener();

    }

    setPosition() {
        let intxPosition = pxToInt(this.parent.computedStyle.width) - (this.width / 2);
        this.div.style.left = intToPx(intxPosition);

        let intyPosition = pxToInt(this.parent.computedStyle.height) - (this.width / 2);
        this.div.style.top = intToPx(intyPosition);
    }

    getPosition(type) {
                if (type === "int") {
                    let intxPosition = pxToInt(this.parent.computedStyle.width) - (this.width / 2);
                    let intyPosition = pxToInt(this.parent.computedStyle.height) - (this.width / 2);

                return {
                    x: intxPosition,
                    y: intyPosition,
                }
            } else if(type === "px") {
                if (type === "int") {
                    let intxPosition = intToPx(this.parent.computedStyle.width) - (this.width / 2);
                    let intyPosition = intToPx(this.parent.computedStyle.height) - (this.width / 2);

                return {
                    x: intxPosition,
                    y: intyPosition,
                };
            }
            
        }
    }

    dragEventListener() {
        let initialMousePosition = null;
        // drag start event
        this.div.addEventListener('dragstart',(e) => {

            // get the current position of the anchor
            this.x = this.getPosition('int').x;
            this.y = this.getPosition('int').y;

            // set the parent's x and y paramenter to their div's current position
            this.parent.x = pxToInt(this.parent.computedStyle.left);
            this.parent.y = pxToInt(this.parent.computedStyle.top);

            initialMousePosition = {x: e.x, y: e.y};

        });

        this.div.addEventListener('drag',(e) => {
            if (e.x === 0 && e.y === 0)  return;

            let xOffset = initialMousePosition.x - e.x;
            let yOffset = initialMousePosition.y - e.y;

            // scale the parent div by the offset between the initial position of the mouse and it's current position
            this.parent.scale(xOffset,yOffset);

            // set the position of this anchor to mouse position as you drag
            this.setPosition();
        });

        this.div.addEventListener('dragend',(e) => {
            //finally set the parent's width and height paramenter to their div's current width and height
            this.parent.width = pxToInt(this.parent.computedStyle.width);
            this.parent.height = pxToInt(this.parent.computedStyle.height);
        })
    }
}