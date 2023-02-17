export default {
    values: v => ({
            text: 'Clicker',
            counter: 0,
            emoji: `😊`
        })
    ,
    style: v => (`
        button {
            background-color: white;
            border-radius: 1em;
            padding: 0.5em;
            margin: 0.5em;
            border: 0;
            box-shadow: 5px 5px 10px lightgray, -5px -5px 10px white;
            transition: all 0.2s ease;
        }
        button:hover {
            box-shadow: 5px 5px 20px lightgray, -5px -5px 20px white;
        }
        button:active {
            scale: 0.97;
        }
        `
    ),
    view: v => {
        return `<button>${v.text} - <span></span></button>`
    },
    script: v => {

        //an update method we can call to set the button text
        v.update = () => {
            if(v.counter > 10) {
                v.emoji = `😮`
            }
            if(v.counter > 20) {
                v.emoji = `🚀`
            }
            v.act.find('span').innerText = `Clicked ${v.counter} time${v.counter !== 1 ? 's' : ''} ${v.emoji}`
        }

        //call it immediately to set initial text
        v.update()

        //listen for clicks by adding an event listener to the `v.on` event queue
        v.on.push({
            click: () => {
                //on click, we increment the counter and update the button text
                v.counter++
                v.update()
            }
        })

    }
}