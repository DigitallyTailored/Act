import viewsFactory from "./viewsFactory.mjs";
import state from "./state.mjs";

window.a = {
    test: () => {console.log('test 4')},
    ...viewsFactory,
    ...state,
}

//todo add styling
//todo add `all:initial` css rule to view by default
//todo run script after inserting view(s) - check how this works for nesting..