import { createStore } from 'vuex';
import authModules from './modules/auth';
import shopModule from './modules/shop';
import cartModule from './modules/cart';

const store = createStore({
    modules: {
        auth: authModules,
        shop: shopModule,
        cart: cartModule
    }
})

export default store;