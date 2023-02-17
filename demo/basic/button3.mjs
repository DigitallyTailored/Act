export default {
    style: v => (`
        button {
            font-size: 10px;
        }
     `),
    view: v => (`<button>${v.watch('count', v=> {return a.get().count} )}</button>`)
}