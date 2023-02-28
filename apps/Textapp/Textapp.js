import ResizableDiv from "../../ResizableDiv.js";

const buttons = [
    {
    innerContent : "File",
    description: "File",
    function: (buttonInstance) => buttonInstance.toggleChildElements(),
    className: 'toolbar-named-button',
        children: [
            {
            innerContent : "New",
            description: "New",
            function: () => console.log("clicked on New"),
            className: 'toolbar-named-button toolbar-named-button-child',
            },
            {
            innerContent : "Open",
            description: "Open",
            function: () => console.log("clicked on Open"),
            className: 'toolbar-named-button toolbar-named-button-child',
            },
        ]
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

const textAppWindowProperties = {
    x: 300,
    y: 300,
    width: 800,
    height: 400,
    buttons: buttons,
    hasNavbar: false,
}

export default class Textapp extends ResizableDiv {
    constructor(parent,properties){
        super(parent,properties);

        
        this.textBox = document.createElement('textarea');
        this.div.append(this.textBox);
        this.textBox.className = 'textapp-textarea';



    }
}