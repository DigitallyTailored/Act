import viewsFactory from "./viewsFactory.mjs";
import state from "./state.mjs";

window.act = {
    loadTest: (modules) => {
        console.trace(modules);
    },
    test: () => {console.log('test 5')},
    ...viewsFactory,
    ...state,
}

window.a = window.act;