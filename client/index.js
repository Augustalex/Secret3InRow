const Vue = require('vue');
const Vuex = require('vuex');
const Router = require('./Router.js');
const RootStore = require('./RootStore.js');
const SecretThreeInRow = require('./secretThreeInrow/MatchPage.js');

let rootStore;

Vue.use(Vuex);
bootstrap();

function bootstrap() {
    rootStore = createStores();
    initRouter();
}

function initRouter() {
    const pagesByName = {
        'secretThreeInRow': SecretThreeInRow,
    };
    const pageDependencies = {
        rootStore
    };
    const router = Router({ pagesByName, pageDependencies });

    router.route('secretThreeInRow');
}

function createStores() {
    return RootStore();
}