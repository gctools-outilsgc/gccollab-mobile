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
                tabs: [{ id: "newsfeed", each: GCTEach.Newsfeed, request: GCTrequests.GetNewsfeed, type: 'card', header: 'newsfeed' },
                    { id: "the-wire", each: GCTEach.Wire, request: GCTrequests.GetWires, type: 'card', header: 'the-wire' },
                    { id: "blogs", each: GCTEach.Blog, request: GCTrequests.GetBlogs, type: 'card', header: 'blogs' }],
                action: 'post-home',
                filters: '',
            },
            wires: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Wire, request: GCTrequests.GetWires, type: 'card' },
                    { id: "my-colleagues", each: GCTEach.Wire, request: GCTrequests.GetWiresByUserColleague, type: 'card' },
                    { id: "mine", each: GCTEach.Wire, request: GCTrequests.GetWiresByUser, type: 'card' }],
                action: 'post-wire',
                filters: '',
            },
            blogs: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Blog, request: GCTrequests.GetBlogs, type: 'card' },
                    { id: "my-colleagues", each: GCTEach.Blog, request: GCTrequests.GetBlogsByColleagues, type: 'card' },
                    { id: "mine", each: GCTEach.Blog, request: GCTrequests.GetBlogsByUser, type: 'card' }],
                action: 'post-blog',
                filters: '',
            },
            groups: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Group, request: GCTrequests.GetGroups, type: 'card' },
                    { id: "my-groups", each: GCTEach.Group, request: GCTrequests.GetGroupsMine, type: 'card' }],
                action: '',
                filters: '',
            },
            members: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Member, request: GCTrequests.GetMembers, type: 'item' },
                    { id: "my-colleagues", each: GCTEach.Member, request: GCTrequests.GetMembersByUserColleague, type: 'item' }],
                action: '',
                filters: '',
            },
            docs: {
                limit: 10,
                tabs: [{ id: "all", each: GCTEach.Doc, request: GCTrequests.GetDocs, type: 'card' }],
                action: '',
                filters: '',
            },
            events: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Event, request: GCTrequests.GetEvents, type: 'card' }],
                action: '',
                filters: '',
            },
            bookmarks: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Bookmark, request: GCTrequests.GetBookmarks, type: 'card' },
                    { id: "my-colleagues", each: GCTEach.Bookmark, request: GCTrequests.GetBookmarksByUserColleague, type: 'card' },
                    { id: "mine", each: GCTEach.Bookmark, request: GCTrequests.GetBookmarksByUser, type: 'card' }],
                action: 'post-blog',
                filters: '',
            },
            opportunities: {
                limit: 8,
                tabs: [{ id: "all", each: GCTEach.Opportunity, request: GCTrequests.GetOpportunities, type: 'card' }],
                action: 'post-opp',
                filters: '',
            },
            userprofile: {
                limit: 15,
                tabs: [{ id: "profile", each: GCTEach.User, request: GCTrequests.GetUserProfileP, type: 'user' },
                    { id: "groups", each: GCTEach.Group, request: GCTrequests.GetUserGroups, type: 'card' },
                    { id: "colleagues", each: GCTEach.Member, request: GCTrequests.GetMembersByUserColleague, type: 'item' },
                    { id: "wires", each: GCTEach.Wire, request: GCTrequests.GetWiresByUser, type: 'card' },
                    { id: "blogs", each: GCTEach.Blog, request: GCTrequests.GetBlogsByUser, type: 'card' },
                    { id: "activity", each: GCTEach.Activity, request: GCTrequests.GetUserActivity, type: 'item' },
                    { id: "bookmarks", each: GCTEach.Bookmark, request: GCTrequests.GetBookmarksByUser, type: 'card' }],
                action: '',
                filters: '',
            },
            groupprofile: {
                limit: 15,
                tabs: [{ id: "profile", each: GCTEach.GroupP, request: GCTrequests.GetGroupP, type: 'group' },
                    { id: "members", each: GCTEach.Member, request: GCTrequests.GetGroupMembers, type: 'item' }],
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