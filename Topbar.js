import { intToPx,pxToInt } from "./helpers.js";


export default class Topbar {
    constructor(parent) {
        this.parent = parent;

        this.div = document.createElement('div');
        this.div.className = 'topbar';

        this.div.style.width = intToPx(parent.width);
        this.div.style.bottom = intToPx(parent.height);
        this.div.draggable = 'true';

        // title?
        // this.div.innerHTML = innedHTML;
        this.parent.div.append(this.div);

        // close button
        this.closeButton = document.createElement('button');
        this.closeButton.className = "close-button";

        this.closeButton.addEventListener('click',(e) => {
            this.parent.close();
        })
        
        this.div.append(this.closeButton);

        this.dragEventListener();

    }

    resize() {
        this.div.style.width = this.parent.computedStyle.width;
        this.div.style.bottom = this.parent.computedStyle.height;
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
            this.parent.move(xOffset,yOffset);

            // set the position of this anchor to mouse position as you drag
            this.setPosition(e.x,e.y);
        });

        this.div.addEventListener('dragend',(e) => {
            //finally set the parent's width and height paramenter to their div's current width and height
            this.parent.width = pxToInt(this.parent.computedStyle.width);
            this.parent.height = pxToInt(this.parent.computedStyle.height);
        });
    }
}