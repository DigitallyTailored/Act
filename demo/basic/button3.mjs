export default {
    style: v => (`
        button {
            font-size: 10px;
        }
     `),
    view: v => (`<button>${v.watch('count', v => (act.get().count))}</button>`),
    script: v => {

        v.on = {
            click: event => {
                act.set({count: act.get().count + 1})
            }
        }

    }
}