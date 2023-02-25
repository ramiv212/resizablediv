import ResizableDiv from "../../ResizableDiv.js";

export default class Explorer extends ResizableDiv {
    constructor(parent,x,y,width,height){
        super(parent,x,y,width,height);

        this.textBox = document.createElement('textarea');
        this.div.append(this.textBox);
        this.textBox.className = 'textapp-textarea';
    }
}