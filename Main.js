import ResizableDiv from "./ResizableDiv.js";
import Textapp from "./apps/Textapp/Textapp.js";




export default class Main {
    constructor() {
        this.app = document.getElementById('app');
        this.windows = [];
        
        // add a "move" method to Array.
        Array.prototype.move = function(from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        };
    }

    createNewWindow(parent,properties = {}) {
        let newWindow = new ResizableDiv();
        return newWindow;
    }
}