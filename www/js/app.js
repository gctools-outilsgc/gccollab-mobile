// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'ca.tbs-sct.gccollab', // App bundle ID
  name: 'GCcollab', // App name
  theme: 'md', // Automatic theme detection
    data: function () {
        return {
            home: {
                limit: 12,
                tabs: [{ id: "newsfeed", each: GCTEach.Newsfeed, request: GCTrequests.GetNewsfeed },
                    { id: "the-wire", each: GCTEach.Wire, request: GCTrequests.GetWires },
                    { id: "blogs", each: GCTEach.Blog, request: GCTrequests.GetBlogs }],
                action: 'post-home',
                filters: '',
            },
            wires: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Wire, request: GCTrequests.GetWires },
                    { id: "my-colleagues", each: GCTEach.Wire, request: GCTrequests.GetWiresByUserColleague },
                    { id: "mine", each: GCTEach.Wire, request: GCTrequests.GetWiresByUser }],
                action: 'post-wire',
                filters: '',
            },
            blogs: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Blog, request: GCTrequests.GetBlogs },
                    { id: "my-colleagues", each: GCTEach.Blog, request: GCTrequests.GetBlogsByColleagues },
                    { id: "mine", each: GCTEach.Blog, request: GCTrequests.GetBlogsByUser }],
                action: 'post-blog',
                filters: '',
            },
            groups: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Group, request: GCTrequests.GetGroups },
                    { id: "my-groups", each: GCTEach.Group, request: GCTrequests.GetGroupsMine }],
                action: '',
                filters: '',
            },
            members: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Member, request: GCTrequests.GetMembers },
                    { id: "my-colleagues", each: GCTEach.Member, request: GCTrequests.GetMembersByUserColleague }],
                action: '',
                filters: '',
            },
        };
    },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

//Opens the application, checks cookies, sends to home or login.
function AppOpen() {
    if (GCTLang.IsLangSet()) {
        if (GCTUser.IsLoggedIn()) {
            GCTUser.SetUserProfile();
            mainView.router.navigate('/list-template/home/');
        } else {
            if (openid_enabled) {
                mainView.router.navigate('/sign-in/');
            } else {
                mainView.router.navigate('/sign-in-old/');
            }
        }
    } else {
        //### Show lang buttons. This is first call and only happens until they click a lang link
        $('#aEN').toggle();
        $('#aFR').toggle();
    }
}

//Things that are needed for all pages.
$$(document).on('page:init', function (e) {
    GCTLang.TransPage();

    $$('#logoutBtn').on('click', function (e) {
        GCTUser.Logout();
        if (openid_enabled) {
            mainView.router.navigate('/sign-in/');
        } else {
            mainView.router.navigate('/sign-in-old/');
        }
    });
})

function ShowImage(img) {
    var img = $(img).attr('src');
    img = img.replace('medium', 'master');
    var myPhotoBrowser = app.photoBrowser.create({
        photos: [img],
        theme: 'dark',
        zoom: true,
        toolbar: false
    });
    myPhotoBrowser.open();
}