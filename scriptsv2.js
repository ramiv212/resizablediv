import Main from "./Main.js";

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

const PretendOS = new Main();

PretendOS.createNewWindow(PretendOS.app,textAppWindowProperties)

// TODO change z-index of window when it is clicked on to make it come forward. Will need a state machine to keep track of all windows.
// TODO make the next new window you create appear a little but further to the right
// TODO create an App class to 