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
            var filterButton = ''
            if (pageInfo.filters) { filterButton = GCTtxt.txtFilterButton(page); }
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
                        filters: pageInfo.filters,
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
            var navbar = GCTtxt.txtGlobalNavPlain('docs');
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
            var navbar = GCTtxt.txtGlobalNavPlain(page);

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
        path: '/wire/reply/:guid/:type',
        async: function (routeTo, routeFrom, resolve, reject) {
            var guid = routeTo.params.guid;
            var type = routeTo.params.type;
            var card = $$('#' + type + '-' + guid).html();
            var author = $$(card).find(".author");
            var text = $$(card).find(".text-"+type);
            author = $$(author).text();
            text = $$(text).text();

            resolve(
                {
                    componentUrl: './pages/wire-reply.html',
                },
                {
                    context: {
                        guid: guid,
                        type: type,
                        author: author,
                        text: text,
                    }
                }
            )
        }
    },
    // Default route (404 page). MUST BE THE LAST
    /*{
        path: '(.*)',
        url: './pages/404.html',
    }, 
    */
];
