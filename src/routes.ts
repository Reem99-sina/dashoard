
function routes() {
    //     const sub_domain = localStorage.getItem('sub_domain')
    //   let {t}=useTranslation("common")
    return (
        [
            {
                href: `/settings`,
                label: "Settings",
                active: window.location.pathname === `/settings`,
                permissions: [],
                component: null,
                submenu: [

                ],
                icon: null,
                noCollapse: false,
                // collapse
            }, {
                href: ``,
                label: "overview",
                active: window.location.pathname === ``,
                permissions: [],
                component: null,
                submenu: [

                ],
                icon: null,
                noCollapse: false,

            }, {
                href: `/billboard`,
                label: "Billboards",
                active: window.location.pathname === `/billboard`,
                permissions: [],
                component: null,
                submenu: [

                ],
                icon: null,
                noCollapse: false,

            }, {
                href: `/products`,
                label: "Products",
                active: window.location.pathname === `/products`,
                permissions: [],
                component: null,
                submenu: [

                ],
                icon: null,
                noCollapse: false,

            }, {
                href: `/sizes`,
                label: "Sizes",
                active: window.location.pathname === `/sizes`,
                permissions: [],
                component: null,
                submenu: [

                ],
                icon: null,
                noCollapse: false,

            }, {
                href: `/colors`,
                label: "Colors",
                active: window.location.pathname === `/colors`,
                permissions: [],
                component: null,
                submenu: [
                    {}
                ],
                icon: null,
                noCollapse: true,

            }, {
                href: `/categories`,
                label: "Categories",
                active: window.location.pathname === `/categories`,
                permissions: [],
                component: null,
                submenu: [

                ],
                icon: null,

                noCollapse: false,
            }, {
                href: `/order`,
                label: "order",
                active: window.location.pathname === `/order`,
                permissions: [],
                component: null,
                submenu: [
{},{},{}
                ],
                icon: null,
                noCollapse: true,

            }
        ]
    )
}
export default routes;
