import Main from "./Main.js";

const PretendOS = new Main();


PretendOS.createNewWindow().render(PretendOS.app)
    .addToolBar()
    .addParentButton('File',(buttonInstance) => {buttonInstance.toggleChildren()}).and
        .addChildButton('New',() => (console.log('new'))).and
            .addSubMenu().and
            .addChildButton('Doc',() => (console.log('open'))).and
            .addChildButton('Window',() => (console.log('save'))).finally
        .addChildButton('Open').and
        .addChildButton('Save').finally
    .addParentButton('Edit',(buttonInstance) => (buttonInstance.toggleChildren())).and
        .addChildButton('Font')


// TODO refactor this so that the "Object" nodes are only added when
// at the end. Effectively a virtual DOM?

// chaining methods and then ultimately everything will be rendered

// TODO change z-index of window when it is clicked on to make it come forward. Will need a state machine to keep track of all windows.
// TODO make the next new window you create appear a little but further to the right
// TODO create an App class to 