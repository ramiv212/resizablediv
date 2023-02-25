import ResizableDiv from "../../ResizableDiv.js";

export default class Textapp extends ResizableDiv {
    constructor(parent,x,y,width,height,windows,buttons,hasNavbar){
        super(parent,x,y,width,height,windows,buttons,hasNavbar);

        
        this.textBox = document.createElement('textarea');
        this.div.append(this.textBox);
        this.textBox.className = 'textapp-textarea';



    }
}