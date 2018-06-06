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
        path: '/list-template/:page/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var page = routeTo.params.page;
            var pageInfo = [];
            pageInfo = app.data[page];
            
            var navbar = GCTtxt.txtGlobalNav(page);
            var action = GCTtxt.txtAction(pageInfo.action);
            var filterButton = GCTtxt.txtFilterButton(pageInfo.filters);
            var tabs = [];
            pageInfo.tabs.forEach(function (tab) { tabs.push(tabObject(page, tab.id, pageInfo.limit, tab.type, tab.header, tab.each, tab.request)); });
            
            resolve(
                {
                    componentUrl: './pages/list-template.html',
                },
                {
                    context: {
                        navbar: navbar,
                        tabs: tabs,
                        page: page,
                        action: action,
                        filter: filterButton,
                    }
                }
            )
        }
    },
    {
        path: '/profile-template/:type/:guid/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var guid = routeTo.params.guid;
            var pageInfo = [];
            if (routeTo.params.type == 'group') {
                pageInfo = app.data['groupprofile'];
            } else if (routeTo.params.type == 'user') {
                pageInfo = app.data['userprofile'];
            }
            
            var navbar = GCTtxt.txtGlobalNavGUID('profile', guid);
            var action = '';
            var filterButton = '';
            var tabs = [];
            pageInfo.tabs.forEach(function (tab) { tabs.push(tabObject('profile-' + guid, tab.id, pageInfo.limit, tab.type, tab.header, tab.each, tab.request)); });

            resolve(
                {
                    componentUrl: './pages/profile-template.html',
                },
                {
                    context: {
                        navbar: navbar,
                        tabs: tabs,
                        guid: guid,
                        action: action,
                        filter: filterButton,
                    }
                }
            )
        }
    },
    {
        path: '/entity-template/:type/:guid/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var type = routeTo.params.type;
            var guid = routeTo.params.guid;
            var pageInfo = [];
            pageInfo = app.data[type];
            var navbar = GCTtxt.txtGlobalNavGUID(type, guid);
            resolve(
                {
                    componentUrl: './pages/entity-template.html',
                },
                {
                    context: {
                        navbar: navbar,
                        comments: pageInfo.comments,
                        guid: guid,
                        type: type,
                    }
                }
            )
        }
    },
    {
        path: '/doc/:guid/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var guid = routeTo.params.guid;
            var navbar = GCTtxt.txtGlobalNav('docs');
            resolve(
                {
                    componentUrl: './pages/doc.html',
                },
                {
                    context: {
                        navbar: navbar,
                        guid: guid,
                    }
                }
            )
        }
    },
    {
        path: '/post-entity-group/:type/:group/:public/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var type = routeTo.params.type;
            var group = routeTo.params.group;
            var public = routeTo.params.public;
            var id = 'post-'+type;
            var tabs = [{ id:"english" }, { id:"french" }];

            var navbar = GCTtxt.txtGlobalNav(id);

            resolve(
                {
                    componentUrl: './pages/post-entity.html',
                },
                {
                    context: {
                        navbar: navbar,
                        type: type,
                        group: group,
                        tabs: tabs,
                        id: id,
                        public: public,
                        action: 'post',
                    }
                }
            )
        }
    },
    {
        path: '/post-entity/:type/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var type = routeTo.params.type;
            var id = 'post-' + type;
            var tabs = [{ id: "english" }, { id: "french" }];

            var navbar = GCTtxt.txtGlobalNav(id);

            resolve(
                {
                    componentUrl: './pages/post-entity.html',
                },
                {
                    context: {
                        navbar: navbar,
                        type: type,
                        tabs: tabs,
                        id: id,
                        action: "post",
                    }
                }
            )
        }
    },
    {
        path: '/edit-entity/:type/:guid/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var type = routeTo.params.type;
            var guid = routeTo.params.guid;
            var id = 'edit-' + type;
            var tabs = [{ id: "english" }, { id: "french" }];

            var navbar = GCTtxt.txtGlobalNav(id);

            resolve(
                {
                    componentUrl: './pages/post-entity.html',
                },
                {
                    context: {
                        navbar: navbar,
                        type: type,
                        tabs: tabs,
                        id: id,
                        guid: guid,
                        action: 'edit',
                    }
                }
            )
        }
    },
    {
        name: 'post-wire',
        path: '/post-wire/',
        url: './pages/post-wire.html',
    },
    {
        name: 'post-opp',
        path: '/post-opp/',
        url: './pages/post-opportunity.html',
        tabs: [{
                path: '/',
                id: 'tab1',
            }, {
                path: '/tab2/',
                id: 'tab2',
            }, {
                path: '/tab3/',
                id: 'tab3',
            }
        ]
    },
    {
        path: '/static/:page/',
        async: function (routeTo, routeFrom, resolve, reject) {
            var page = routeTo.params.page;
            var navbar = GCTtxt.txtGlobalNav(page);

            resolve(
                {
                    componentUrl: './pages/plain-template.html',
                },
                {
                    context: {
                        navbar: navbar,
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
