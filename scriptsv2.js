import Main from "./Main.js";

const PretendOS = new Main();


PretendOS.createNewWindow().render(PretendOS.app)


// TODO refactor this so that the "Object" nodes are only added when
// chaining methods and then ultimately everything will be rendered
// at the end. Effectively a virtual DOM?

// TODO change z-index of window when it is clicked on to make it come forward. Will need a state machine to keep track of all windows.
// TODO make the next new window you create appear a little but further to the right
// TODO create an App class to 