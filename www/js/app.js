// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'ca.tbs-sct.gccollab', // App bundle ID
  name: 'GCcollab', // App name
  theme: 'md', // Automatic theme detection
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
            mainView.router.navigate('/home/');
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