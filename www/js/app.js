// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'ca.tbs-sct.gccollab', // App bundle ID
  name: 'GCcollab', // App name
    theme: 'md', // Automatic theme detection
    statusbar: {
        iosOverlaysWebView: true,
        enabled: true,
        overlay: true,
        materialBackgroundColor: '#e8e8e8',
        iosBackgroundColor: '#e8e8e8',
    },
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
                filters: [{ id: 'name' }],
            },
            groups: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Group, request: GCTrequests.GetGroups, type: 'item' },
                    { id: "my-groups", each: GCTEach.Group, request: GCTrequests.GetGroupsMine, type: 'item' }],
                action: '',
                filters: [{ id: 'name' }],
            },
            members: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Member, request: GCTrequests.GetMembers, type: 'item' },
                    { id: "my-colleagues", each: GCTEach.Member, request: GCTrequests.GetMembersByUserColleague, type: 'item' }],
                action: '',
                filters: [{ id: 'name' }, { id: 'memberType' }],
            },
            docs: {
                limit: 10,
                tabs: [{ id: "all", each: GCTEach.Doc, request: GCTrequests.GetDocs, type: 'card' }],
                action: '',
                filters: [{ id: 'name'}],
            },
            events: {
                limit: 15,
                tabs: [{ id: "all", each: GCTEach.Event, request: GCTrequests.GetEvents, type: 'card', header: 'event' },
                    { id: "my-colleagues", each: GCTEach.Event, request: GCTrequests.GetEventsByColleagues, type: 'card', header: 'event' },
                    { id: "mine", each: GCTEach.Event, request: GCTrequests.GetEventsByUser, type: 'card', header: 'event' }],
                action: '',
                filters: [{ id: 'from' }, { id: 'to' }],
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
                filters: [{ id: 'oppType' }],
            },
            messagecentre: {
                limit: 10,
                tabs: [{ id: "notifications", each: GCTEach.Notification, request: GCTrequests.GetNotifications, type: 'item' },
                    { id: "messages", each: GCTEach.Message, request: GCTrequests.GetMessages, type: 'item' },
                    { id: "colleague-requests", each: GCTEach.ColleagueRequest, request: GCTrequests.GetColleagueRequests, type: 'item' }],
                action: '',
                filters: '',
            },
            userprofile: {
                limit: 15,
                tabs: [{ id: "profile", each: GCTEach.User, request: GCTrequests.GetUserProfileP, type: 'user' },
                    { id: "groups", each: GCTEach.Group, request: GCTrequests.GetUserGroups, type: 'item' },
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
                    { id: "members", each: GCTEach.Member, request: GCTrequests.GetGroupMembers, type: 'item' },
                    { id: "discussion", each: GCTEach.Discussion, request: GCTrequests.GetGroupDiscussions, type: 'card' },
                    { id: "blogs", each: GCTEach.Blog, request: GCTrequests.GetGroupBlogs, type: 'card' },
                    { id: "activity", each: GCTEach.Activity, request: GCTrequests.GetGroupActivity, type: 'item' },
                    { id: "bookmarks", each: GCTEach.Bookmark, request: GCTrequests.GetBookmarksByUser, type: 'card' }],
                action: '',
                filters: '',
            },
            wire: {
                comments: false,
                id: 'wire',
            },
            blog: {
                comments: true,
                id: 'blog',
            },
            discussion: {
                comments: true,
                id: 'discussion',
            },
            opportunity: {
                comments: false,
                id: 'opportunity',
            },
            bookmark: {
                comments: true,
                id: 'bookmark',
            },
            event: {
                comments: true,
                id: 'event',
            },
            notification: {
                comments: false,
                id: 'notifcation',
            },
            message: {
                comments: false,
                id: 'message',
            }
            
        };
    },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});


//Things that are needed for all pages.
$$(document).on('page:init', function (e) {
    GCTLang.TransPage();
    
    $$(document).on('click', 'a.external', function (e) {
        e.preventDefault();
        cordova.InAppBrowser.open($(this).attr('href'), '_system');
    });

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

function SocialShare(obj) {
    var guid = $(this).data("guid");
    var type = $(this).data("type");

    var message = '';
    var subject = '';
    var files = [];
    var url = '';
    var chooserTitle = 'Pick an app';

    if (type == 'gccollab_wire_post') {
        message = $("#wire-" + guid).text();
        subject = 'GCcollab Wire Post';
    } else if (type == 'gccollab_blog_post') {
        message = $("#blog-" + guid + ' .blog-title').text();
        subject = 'GCcollab Blog';
    } else if (type == 'gccollab_event') {
        message = $("#event-" + guid + ' .blog-event').text();
        subject = 'GCcollab event';
    }

    if (typeof window.plugins.socialsharing !== 'undefined' && message != "") {
        GCTrequests.GetEntityURL(guid, function (data) {
            url = data.result;

            window.plugins.socialsharing.shareWithOptions({
                message: message,
                subject: subject,
                files: files,
                url: url,
                chooserTitle: chooserTitle
            }, function (success) {
                alert("Share completed? " + success.completed);
                alert("Shared to app: " + success.app);
            }, function (failure) {
                alert("Sharing failed with message: " + failure);
            });
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    } else {
        alert('Sorry, social sharing cannot be completed.');
    }
}