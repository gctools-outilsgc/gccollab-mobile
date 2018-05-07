
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
    $$('#home-navbar-inner').html(GCTtxt.txtGlobalNav('home'));
    var limit = 12;
    var home = {}; //variables for this page's content
    home.newsfeed = listObject("home-newsfeed", limit, GCTEach.Newsfeed);
    home.wire = listObject("home-wire");
    home.blogs = listObject("home-blogs");

    function homeNewsfeed(data) {
        var info = data.result;
        var content = '';
        if (home.newsfeed.loaded == true) { $(home.newsfeed.appendMessage).appendTo('#content-' + home.newsfeed.id); } else { home.newsfeed.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                content = GCTEach.Newsfeed(value);
                $(content).hide().appendTo('#content-' + home.newsfeed.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + home.newsfeed.id).fadeIn(1000);
            $('#more-' + home.newsfeed.id).hide();
        }
        home.newsfeed.offset += limit;
        var focusNow = document.getElementById('focus-' + home.newsfeed.id);
        if (focusNow) { focusNow.focus(); }
    }
    function homeWires(data) {
        var info = data.result;
        var content = '';
        if (home.wire.loaded == true) { $(home.wire.appendMessage).appendTo('#content-' + home.wire.id); } else { home.wire.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                content = GCTEach.Wire(value);
                $(content).hide().appendTo('#content-' + home.wire.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + home.wire.id).fadeIn(1000);
            $('#more-' + home.wire.id).hide();
        }
        home.wire.offset += limit;
        var focusNow = document.getElementById('focus-' + home.wire.id);
        if (focusNow) { focusNow.focus(); }
    }
    function homeBlogs(data) {
        var info = data.result;
        var content = '';
        if (home.blogs.loaded == true) { $(home.blogs.appendMessage).appendTo('#content-' + home.blogs.id); } else { home.blogs.loaded = true; }
        if (info.length > 0) {
            $.each(info, function (key, value) {
                content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + home.blogs.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + home.blogs.id).fadeIn(1000);
            $('#more-' + home.blogs.id).hide();
        }
        home.blogs.offset += limit;
    }

    GCTrequests.TestGetNewsfeed(limit, home.newsfeed);
    $$('#tab-' + home.newsfeed.id).on('tab:show', function (e) {
        var focusTitle = document.getElementById('tabheader-home-newsfeed');
        if (focusTitle) { focusTitle.focus(); }
    });
    $$('#more-' + home.newsfeed.id).on('click', function (e) {
        $('#focus-' + home.newsfeed.id).remove();
        GCTrequests.GetNewsfeed(limit, home.newsfeed.offset, homeNewsfeed, errorConsole);
    });

    $$('#tab-' + home.wire.id).on('tab:show', function (e) {
        if (!home.wire.loaded) {
            GCTrequests.GetWires(limit, home.wire.offset, '', homeWires, errorConsole);
        }
        var focusTitle = document.getElementById('tabheader-home-wires');
        if (focusTitle) { focusTitle.focus(); }
    });
    $$('#more-' + home.wire.id).on('click', function (e) {
        $('#focus-' + home.wire.id).remove();
        GCTrequests.GetWires(limit, home.wire.offset, '', homeWires, errorConsole);
    });

    $$('#tab-' + home.blogs.id).on('tab:show', function (e) {
        if (!home.blogs.loaded) {
            GCTrequests.GetBlogs(limit, home.blogs.offset, "", homeBlogs, errorConsole);
        }
        var focusTitle = document.getElementById('tabheader-home-blogs');
        if (focusTitle) { focusTitle.focus(); }
    });
    $$('#more-' + home.blogs.id).on('click', function (e) {
        $('#focus-' + home.blogs.id).remove();
        GCTrequests.GetBlogs(limit, home.blogs.offset, "", homeBlogs, errorConsole);
    });
})

$$(document).on('page:init', '.page[data-name="sign-in-old"]', function (e) {

    $("#email, #password").keyup(function (event) {
        var email = $('#email').val();
        var password = $('#password').val();

        if (event.keyCode == 13) {
            if (email != "" && password != "" && email.length >= 3 && password.length >= 6) {
                GCTUser.Login(email, password, function (success) {
                    if (success.result == true) {
                        mainView.router.navigate('/home/');
                        GCTUser.SaveLoginEmail(email);
                        GCTUser.SetLoginCookie();
                        GCTUser.SetUserProfile();
                    } else {
                        myApp.alert(GCTLang.Trans("invalid"), 'Error');
                    }
                }, function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                });
            }
        }
    });

    $$('#loginBtn').on('click', function (e) {
        var email = $('#email').val();
        var password = $('#password').val();
        if (email != "" && password != "") {
            GCTUser.Login(email, password, function (success) {
                if (success.result == true) {
                    mainView.router.navigate('/home/');
                    GCTUser.SaveLoginEmail(email);
                    GCTUser.SetLoginCookie();
                    GCTUser.SetUserProfile();
                } else {
                    myApp.alert(GCTLang.Trans("invalid"), 'Error');
                }
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    });
})