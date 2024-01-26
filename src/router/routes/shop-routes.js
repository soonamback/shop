import CreateProductPage from "@/pages/CreateProductPage"
import ReadProductPage from "@/pages/ReadProductPage";
import ShopPage from "@/pages/ShopPage";

const shopRoutes = [
    {
        
            path: "/shop",
            component: ShopPage,
            meta: {
                requiresAuth: true,
            }
        },
        // V2 LAYOUT
        // {
        //     path: "/v2/shop",
        //     component: () => import("@layouts/v2/TheShopLayout.vue"),
        //     meta: {
        //         requiresAuth: true,
        //     },
        //     children: [
        //         {
        //             path: "",
        //             component: () => import("@/pages/v2/ShopPage.vue")
        //         },
        //         // {
        //         //     path: "create/product",
        //         //     component: () => import("@/pages/v2/CreateProductPage.vue")
        //         // }
        //     ]
        // },
        {
            path: "/shop/create/product",
            component: CreateProductPage,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/shop/read/product/:id",
            name: "ReadProduct",
            component: ReadProductPage,
            props: true,
            meta: {
                requiresAuth: true,
                //enterTransition: "rubberBand"
            }
           
        
    },
]

export default shopRoutes;