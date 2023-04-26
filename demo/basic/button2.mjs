export default {
    style: v => (`
        button {
            font-size: 20px;
        }
     `),
    view: v => (`<button>${v.body}</button>`),
    script: v => {
        v.act.element.addEventListener('click', (e) => {
            console.log(v)
        })
    }
}