export default {
    style: v => (`
        button { color: red;}
        span {color: blue;}
     `),
    view: v => (`<button>${v.body} <span>!!!</span></button>`),
    script: v => {


        a.init({ count: 10 });
        a.init({ tester: 0 });

        v.act.element().addEventListener('click', (e) => {
            a.set({ count: a.get().count + 1 });
        })

        /*
        a.listen( state => {
            v.act.find('span').innerText = state.count;
        })
         */
        a.listen( 'count', state => {
            v.act.find('span').innerText = state.count;
        })

        a.listen( 'tester', state => {
            v.act.find('span').innerText = 'ooh';
        })



        /*
        v.act.element().addEventListener('click', (e) => {
            v.act.findViews('button2')?.forEach((e) => {
                console.log(e.act.values())
            })
        })
         */

    }
}