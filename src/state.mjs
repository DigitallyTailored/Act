export default {
    state: {},
    listeners: new Set(),
    listenersSpecific: [],

    get() {
        return this.state;
    },
    init(newState) {
        const difference = Object.keys(newState).reduce((acc, key) => {
            if (this.state[key] !== newState[key]) {
                acc[key] = newState[key];
            }
            return acc;
        }, {});

        this.state = {...this.state, ...newState};
        return difference
    },
    set(newState) {
        const difference = this.init(newState);

        //run specific listeners
        Object.keys(difference).forEach(key => {
            if (this.listenersSpecific[key]) {
                this.listenersSpecific[key].forEach(listener => {
                    listener(this.state)
                });
            }
        })

        //run global state listeners
        this.listeners.forEach(listener => listener(this.state));
    },

    watch(state, listener = null) {
        if (listener == null) {
            listener = state
            this.listeners.add(listener);
        } else {
            if (!this.listenersSpecific[state]) {
                this.listenersSpecific[state] = new Set();
            }
            this.listenersSpecific[state].add(listener);
        }
    },

    ignore(state, listener = null) {

        if (listener == null) {
            listener = state
            this.listeners.delete(listener);
        } else {
            if (this.listenersSpecific[state]) {
                this.listenersSpecific[state] = this.listenersSpecific[state].filter(l => l !== listener);
            }
        }
    },
}