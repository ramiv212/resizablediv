import ResizableDiv from "./ResizableDiv.js";
import Textapp from "./apps/Textapp/Textapp.js";

const buttons = [
    {
    innerContent : "File",
    description: "File",
    function: () => console.log('clicked on File'),
    className: 'toolbar-named-button',
    },
    {
    innerContent : "Edit",
    description: "Edit",
    function: () => console.log('clicked on Edit'),
    className: 'toolbar-named-button',
    },
    {
    innerContent : "Format",
    description: "Format",
    function: () => console.log('clicked on Format'),
    className: 'toolbar-named-button',
    },
]

export default class Main {
    constructor() {
        this.app = document.getElementById('app');
        this.windows = [];

        this.buttons = buttons,
        
        this.resizable = new Textapp(app,300,300,800,400,this.windows,this.buttons)
        // this.resizable2 = new ResizableDiv(app,300,300,800,400,this.windows)

        // add a "move" method to Array.
        Array.prototype.move = function(from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        };
    }

    createNewWindow(parent,x,y,width,height) {

        // this.windows.push(new ResizableDiv(parent,x,y,width,height));
    }
}