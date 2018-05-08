routes = [
    {
        path: '/',
        url: './index.html',
    },
    {
        name: 'sign-in',
        path: '/sign-in/',
        url: './pages/sign-in.html',
    },
    {
        name: 'sign-in-old',
        path: '/sign-in-old/',
        url: './pages/sign-in-old.html',
    },
    {
        name: 'home',
        path: '/home/',
        url: './pages/home.html',
    },
    {
        path: '/list-template/:page/:action/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var page = routeTo.params.page;
            var pageInfo = [];
            switch (page) {
                case "home":
                    pageInfo = app.data.home;
                    break;
                case "wires":
                    pageInfo = app.data.wires;
                    break;

                default: reject();
                    
            }
            console.log(pageInfo);
            var navbar = GCTtxt.txtGlobalNav(page);
            var tabs = [];
            pageInfo.tabs.forEach(function (tab) { tabs.push(tabObject(page, tab.id, pageInfo.limit, tab.each, tab.request)); });
            
            resolve(
                {
                    componentUrl: './pages/list-template.html',
                },
                {
                    context: {
                        navbar: navbar,
                        tabs: tabs,
                        page: page,
                    }
                }
            )
        }
    },
    {
        path: '/form/',
        url: './pages/form.html',
    },
    // Page Loaders & Router
    {
        path: '/page-loader-template7/:user/:userId/:posts/:postId/',
        templateUrl: './pages/page-loader-template7.html',
    },
    {
        path: '/page-loader-component/:user/:userId/:posts/:postId/',
        componentUrl: './pages/page-loader-component.html',
    },
    {
        path: '/request-and-load/user/:userId/',
        async: function (routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = routeTo.params.userId;

            // Simulate Ajax Request
            setTimeout(function () {
                // We got user data from request
                var user = {
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [
                        {
                            title: 'Framework7 Website',
                            url: 'http://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'http://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve(
                    {
                        componentUrl: './pages/request-and-load.html',
                    },
                    {
                        context: {
                            user: user,
                        }
                    }
                );
            }, 1000);
        },
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
