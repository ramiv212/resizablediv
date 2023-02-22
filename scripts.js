
const appDiv = document.getElementById('app');

class AnchorDiv {
    constructor(ResizableDiv,bounds,position) {
        this.ResizableDiv = ResizableDiv;
        this.bounds = bounds;
        this.position = position;

        // create the div and add to an existing node in the DOM
        this.div = document.createElement('div');

        this.div.style.width = `${this.bounds}px`;
        this.div.style.height = `${this.bounds}px`;

        this.div.draggable = "true";
        this.computedStyle = getComputedStyle(this.div);
        this.div.className = 'anchor';
        this.ResizableDiv.div.append(this.div);

        this.resizableDivWidth = parseInt(getComputedStyle(this.ResizableDiv.div).width.replace("px",""));
        this.resizableDivHeight = parseInt(getComputedStyle(this.ResizableDiv.div).height.replace("px",""));

        this.setInitialPosition();

        this.addDragListener();
    }

    setInitialPosition() {
        if (this.position === "br"){
            this.div.style.left = `${this.resizableDivWidth - (this.bounds / 2) + 8}px`;
            this.div.style.top = `${this.resizableDivHeight - (this.bounds / 2) + 8}px`;
        } 
        else if (this.position === "tl") {
            this.div.style.left = this.ResizableDiv.div.style.left;
            this.div.style.top = this.ResizableDiv.div.style.top;
        }
    }

    setUpdatedPosition() {
        if (this.position === "br") {
            this.div.style.left = `${this.ResizableDiv.width - (this.bounds / 2) + 8}px`;
            this.div.style.top = `${this.ResizableDiv.height - (this.bounds / 2) + 8}px`;
        } 
        else if (this.position === "tl") {
            // this.div.style.left = this.ResizableDiv.div.style.left;
            // this.div.style.top = this.ResizableDiv.div.style.top;
        }
    }

    addDragListener() {
        let initialMousePosition = null;
		

        // dragstart listener ------------------------------------
        this.div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setDragImage(new Image(), 0, 0);
            initialMousePosition = {
                x: e.x,
                y: e.y,
            }
        })
        // -------------------------------------------------------
        

        // drag listener -----------------------------------------
        this.div.addEventListener('drag', ((e) => {
			if (e.x === 0 && e.y === 0) return;

			else {
				e.preventDefault()

				let xOffset = initialMousePosition.x - e.x;
				let yOffset = initialMousePosition.y - e.y;

				this.div.style.top = (e.y).toString() + "px";
				this.div.style.left = (e.x).toString() + "px";
				this.div.style.borderColor = 'red';

				// scale the resizable div
				// this.ResizableDiv.scale(xOffset,yOffset,this.position);

        
           		e.dataTransfer.setDragImage(new Image(), 0, 0);
          }
          
        }))


        // dragend listener --------------------------------------
        this.div.addEventListener('dragend',(e) => {
            this.ResizableDiv.width = parseInt(this.ResizableDiv.div.style.width.replace("px",""));
            this.ResizableDiv.height = parseInt(this.ResizableDiv.div.style.height.replace("px",""));

			this.ResizableDiv.y = parseInt(this.ResizableDiv.div.style.top.replace("px",""));
            this.ResizableDiv.x = parseInt(this.ResizableDiv.div.style.left.replace("px",""));

            this.ResizableDiv.resetAllAnchors();
        })
    }
}




class ResizableDiv {
    constructor(parent,width,height,x = 300,y = 300) {
        this.parent = parent;
        this.width = width;
        this.height = height;

        this.div = document.createElement('div');
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;

        this.x = x;
        this.y = y;

		this.div.style.top = `${this.x}px`;
		this.div.style.left = `${this.y}px`;

        this.computedStyle = getComputedStyle(this.div);
        this.div.className = 'box';

        this.parent.append(this.div);

        // create an anchor div on bottom right
        this.brAnchor = new AnchorDiv(this,20,'br');
        this.tlAnchor = new AnchorDiv(this,20,'tl');

    }

    scale(xOffset,yOffset,position) {
        this.div.style.width = `${this.width - xOffset}px`;
        this.div.style.height = `${this.height - yOffset}px`;

		if (position === "tl") {
			this.div.style.top = `${this.x + yOffset}px`;
			// this.div.style.left = `${this.y + xOffset}px`;

		}
    }

	resetAllAnchors() {
		this.brAnchor.setUpdatedPosition();
		this.tlAnchor.setUpdatedPosition();
	}
}


const resizable = new ResizableDiv(appDiv,400,400)