import ResizableDiv from "./ResizableDiv.js";

export default class Main {
    constructor() {
        this.app = document.getElementById('app');
        this.windows = [];

        this.resizable = new ResizableDiv(app,300,300,800,400)
        this.resizable2 = new ResizableDiv(app,300,300,800,400)
    }

    createNewWindow() {
        this.windows.push(new ResizableDiv())
    }
}