import store from "../../store/index"; 

const appRoutes = [
    {
            path: "/",
            alias: "/home",
            component: () => import("@/pages/HomePage"),
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuthenticated) {
                    next("/shop")
                } else {
                    next()
                }
            },
    },
]

export default appRoutes;