export default {
    style: v => (`
        button { color: red;}
        span {color: blue;}
     `),
    view: v => (`<button>${v.body} <span>!!!</span></button><act-header/> <act-content/>`),
    script: v => {

        //act.render(act.view("clicker"), v.act.reference('header'))

        act.init({ count: 10 });
        act.init({ tester: 0 });

        v.act.element.addEventListener('click', (e) => {
            act.set({ count: act.get().count + 1 });
        })

        /*
        act.listen( state => {
            v.act.find('span').innerText = state.count;
        })
         */
        act.watch( 'count', state => {
            v.act.find('span').innerText = state.count;
        })

        act.watch( 'tester', state => {
            v.act.find('span').innerText = 'ooh';
        })



        /*
        v.act.element.addEventListener('click', (e) => {
            v.act.findViews('button2')?.forEach((e) => {
                console.log(e.act.values())
            })
        })
         */

    }
}