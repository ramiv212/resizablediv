const box = document.getElementById('box');
const brAnchor = document.getElementById('br-anchor');
const computedHeight = parseInt(computed.height.replace('px',"")) / 2;
const computedWidth = parseInt(computed.width.replace('px',"")) / 2;



class resizableDiv {
    constructor(parent,width,height) {
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.computedStyle = getComputedStyle(brAnchor);

        // create the div and add to an existing node in the DOM
        this.div = document.createElement('div');
        parent.append(this.div);

    }

    addDragListener() {
        this.div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setDragImage(new Image(), 0, 0);
        })
        
        this.div.addEventListener('drag', ((e) => {
            
          
          if (e.x === 0 ) return;
          else {
              e.preventDefault()
            this.div.style.left = e.x.toString() + "px";
            this.div.style.top = (e.y - computedHeight).toString() + "px";
            this.div.style.left = (e.x - computedWidth).toString() + "px";
            this.div.style.borderColor = 'red';
            
        
            e.dataTransfer.setDragImage(new Image(), 0, 0);
          }
          
        }))
    }
}