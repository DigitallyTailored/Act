export default {

    _uid_val: 0,
    _views: {},
    target: false,

    import(modules) {
        Object.keys(modules).forEach(moduleName => {
            this._views[moduleName] = modules[moduleName]
        })
        /*
        const loadModules = moduleNames.map(module => import(module[1]).then(
            imported => {
                this._views[module[0]] = imported.default
            }
        ));
        return Promise.all(loadModules);
         */
    },

    //todo render should take an array of elements
    render(elements, target = false, replace = true, append = true) {
        target = target || this.target;

        if (replace) {
            this.clearTarget(target);
        }

        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        let elementQueue = this.processElements(elements, target, append);
        this.runScriptsAndCreateEventListeners(elementQueue);
    },

    clearTarget(target) {
        while (target?.firstChild) {
            target.removeChild(target.firstChild);
        }
    },

    processElements(elements, target, append) {
        let elementQueue = [];

        elements.forEach(element => {
            if (typeof element === 'string' || typeof element === 'number') {
                target.insertAdjacentHTML((append ? 'beforeend' : 'afterbegin'), element)
            } else {
                target.insertAdjacentElement((append ? 'beforeend' : 'afterbegin'), element);

                let values = element.act.values();
                let view = this._views[values.act.viewName];

                values.act.parent = () => (target);

                this.setStyle(view, values);

                elementQueue.push(element);

                this.processWatches(element, values);

                if (values?.body) {
                    this.render(values.body, element.querySelector('act-body'));
                }
            }
        });

        return elementQueue;
    },

    setStyle(view, values) {
        if (view.style) {
            if (!this.target.querySelector(`style[data-act_style="${values.act.viewName}"]`)) {
                const styleElement = document.createElement('style');
                styleElement.dataset.act_style = values.act.viewName;

                let stylesheet = view.style(values);

                stylesheet = stylesheet.replace(/([\w\d.#]+)(\s*\{)/g, (match, selector, brace) => {
                    return `${selector}${values.act.style} ${brace}\n`;
                });

                styleElement.innerHTML = stylesheet;
                this.target.insertAdjacentElement('afterbegin', styleElement);
            }
        }
    },

    processWatches(element, values) {
        let watches = element.querySelectorAll('act-watch');
        watches.forEach(watch => {
            const watcher = values.act._watchers[watch.dataset.act_watch_key];
            act.watch(watcher.name, state => {
                watch.innerText = watcher.event(values);
            });
            watch.innerText = watcher.event(values);
        });
    },

    runScriptsAndCreateEventListeners(elementQueue) {
        for (let i = 0; i < elementQueue.length; i++) {
            const element = elementQueue[i];
            const values = element.act.values();
            const view = this._views[values.act.viewName];

            if (view?.script) view.script(values);

            if (values?.on) {
                this.createEventListeners(element, values);
            }
        }
    },

    createEventListeners(element, values) {
        let events = values.on;
        if (!Array.isArray(events)) {
            events = [events];
        }
        for (let i = 0; i < events.length; i++) {
            const event = Object.keys(events[i])[0];
            const callback = events[i][event];
            element.addEventListener(event, (event) => {
                callback(event, values);
            });
        }
    },

    //todo this should probably return the entire element and render handles what do with it (view/styling/script
    view(viewName, values = {}) {

        //add manually set vales to view values if they exist
        if (this._views[viewName]?.values) {
            //values = {...this._views[viewName].values(values), ...values ,...{on:[]}}
            //values = await this._views[viewName].values(values)
            values = {...this._views[viewName].values(values), ...values}
        }

        if (!this._views[viewName].values?.on) {
            values = {...{on: []}, ...values}
        }


        //add act-specific values to view values object
        values.act = {}
        values.act.viewName = viewName
        values.act.view = `[data-act_view="${values.act.viewName}"]`
        values.act.style = `[data-act_style="${values.act.viewName}"]`
        values.act._uid = this.uid()

        //return this._views[viewName].view(values);
        const view = this._views[viewName]
        let element = document.createElement(`div`)

        values.act._watchers = []
        values.watch = (name, event = null) => {
            if (event === null) {
                event = name;
                name = '*'
            }
            values.act._watchers.push({name, event})
            return `<act-watch data-act_watch="${name}" data-act_watch_key="${values.act._watchers.length - 1}"></act-watch>`
        }


        //replace any ${v.body} outputs with a body container
        if (values?.body) {
            values.act._body = values.body
            values.body = `<act-body></act-body>`
        }

        element.innerHTML = view.view(values)

        //revert body to original user content
        if (values?.body) {
            values.body = values.act._body
            delete values.act._body
        }

        let childElements = element.querySelectorAll("*");

        for (let i = 0; i < childElements.length; i++) {
            childElements[i].setAttribute("data-act_style", viewName);
        }

        element = element.children[0]


        //make element directly available to view from values and vice versa
        element.act = {}
        element.act.values = () => (values)
        //values.act.element = () => (element)
        values.act.element = element
        values.act.reference = (reference) => (element.act.find('act-' + reference))


        element.classList.add(values.act._uid)
        element.dataset.act_view = viewName

        //give element access to act methods
        values.act.append = (element, query) => (this.append(query, element))
        values.act.find = (query) => element.querySelector(query)
        values.act.findAll = (query) => element.querySelectorAll(query)
        values.act.findView = (query) => element.querySelector(`[data-act_view="${query}"]`)
        values.act.findViews = (query) => element.querySelectorAll(`[data-act_view="${query}"]`)
        return element
    },

    uid() {
        this._uid_val++
        return 'act_uid_' + this._uid_val
    },

    prepend(elements, target) {
        this.render(elements, target, false, false)
    },
    append(elements, target) {
        this.render(elements, target, false)
    },
}