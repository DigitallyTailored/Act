export default {
    style: v => (`
        button {
            font-size: 10px;
            margin: 10px;
            border: 0;
            border-radius: 5px;
            padding: 2px 5px;
            box-shadow: 0 0 5px #0000000f;
        }
     `),
    view: v => (`<button>Count state: ${v.watch('count', v => (act.get().count))}</button>`),
    script: v => {

        v.on = {
            click: event => {
                act.set({count: act.get().count + 1})
            }
        }

    }
}