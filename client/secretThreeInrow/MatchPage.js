const Vue = require('vue');
const MatchStore = require('./MatchStore.js');
const MatchView = require('./Match.vue').default;

module.exports = function (deps) {

    const rootStore = deps.rootStore;

    let vm;

    return {
        show,
        hide
    };

    function show() {
        if (rootStore.state.match) {
            rootStore.unregister('match');
        }
        let matchStore = MatchStore({ ...deps });
        rootStore.registerModule('match', matchStore);

        vm = new Vue({
            store: rootStore,
            render(h) {
                return h(MatchView, {});
            }
        });
        const hook = document.createElement('div');
        document.body.appendChild(hook);
        vm.$mount(hook);
    }

    function hide() {
        vm.$destroy();
        vm.$el.remove();
        vm.$store.unregisterModule('match');
        vm = null;
    }
};