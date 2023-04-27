import viewsFactory from "./viewsFactory.mjs";
import state from "./state.mjs";

const version = "0.3";

window.act = {
    version: () => {console.log(`Act ${version} - https://github.com/DigitallyTailored/Act`)},
    ...viewsFactory,
    ...state,
}