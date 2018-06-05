"use strict";

// Init App
var myApp = new Framework7({
    modalTitle: "GCcollab",
    // Enable Material theme
    material: true,
    pushState: true,
    tapHold: true
    //preloadPreviousPage: false
});


// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
}); 

//focus on input filter
$$(document).on('click','.open-popup',function() {
    $('.item-input input').focus();
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});
$$(document).on('ajaxError', function () {
    myApp.hideIndicator();
});

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        if(n['value'] != ""){
            indexed_array[n['name']] = n['value'];
        }
    });

    return indexed_array;
}

function ToggleAllText(object){
    $(object).toggleClass('all_text');
}

// Add keypress functionality to modals
$$(document).on('keydown', '.modal-text-input', function(e){
    if(e.which == 27){
        $('.modal-button:contains("Cancel")').click();
    }
    if(e.which == 13){
        $('.modal-button:contains("OK")').click();
    }
});

// $$(document).on('taphold', '.like', function(e){
//     GCTUser.GetLikeUsers(this);
// });

$$('.panel-right').on('open', function () {
    LoadMessageCentre();
});

$$('.panel-right').on('panel:opened', function () {
    var focusTitle = document.getElementById('message-panel');
    if (focusTitle) { focusTitle.focus(); }
});
$$('.panel-left').on('panel:opened', function () {
    var focusTitle = document.getElementById('menu-panel');
    if (focusTitle) { focusTitle.focus(); }
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function ShowProfile(email) {
    if (typeof email == 'undefined')
        email = GCTUser.Email(); //### Get current users profile

    // Profile tab
    GCTUser.GetUserProfile(email, function(data) {
        var profileData = data.result;
        /* Temp ViewPost, replace with sheet modal of user profile eventaully */
        GCTUser.ViewPost(profileData.id, "gccollab_profile");
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
}

function ShowImage(img) {
    var img = $(img).attr('src');
    img = img.replace('medium', 'master');
    var myPhotoBrowser = myApp.photoBrowser({
        photos: [img],
        theme: 'dark',
        zoom: true,
        toolbar: false
    });
    myPhotoBrowser.open();
}

function ShowMessage(obj) {
    var guid = $(obj).data("guid");
    var type = $(obj).data("type");

    if (typeof guid == 'undefined')
        return false;

    var thread = (type == "message") ? 1 : 0;

    GCTUser.ReadMessage(guid, function(data) {
        var unread = $(obj).find(".item-inner");
        if( $(unread).hasClass('unread') ){
            $(unread).removeClass('unread');

            if( $(obj).parents('#user-notifications').length ){
                var num = parseInt($("#notifications-tab .count").text()) - 1;
                $("#notifications-tab .count").text(num);
                
                if(num > 0){
                    $("#notifications-tab .count").addClass('exists');
                } else {
                    $("#notifications-tab .count").removeClass('exists')
                }
            } else if( $(obj).parents('#user-messages').length ){
                var num = parseInt($("#messages-tab .count").text()) - 1;
                $("#messages-tab .count").text(num);

                if(num > 0){
                    $("#messages-tab .count").addClass('exists');
                } else {
                    $("#messages-tab .count").removeClass('exists')
                }
            }
        }
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetMessage(guid, thread, function(data) {
        var messages = data.result;

        var content = '<div class="messages messages-auto-layout">';
        $(messages).each(function(key, value) {
            var description = "";
            var type = (value.fromUserDetails.displayName == GCTUser.DisplayName()) ? "sent" : "received";
            var name = (value.fromUserDetails.displayName) ? value.fromUserDetails.displayName : "GCcollab";

            if( thread ){
                var regex = /The content of the message is:([\s\S]*)You can view or reply/;
                var matches = (value.description).match(regex);
                if( matches != null ){
                    description = matches[1];
                } else {
                    description = value.description;
                }

                content += '<div class="message message-' + type + ' message-with-avatar">'
                        + '<div class="message-name">' + name + '</div>'
                        + '<div class="message-text">' + description
                            + '<div class="message-date">' + prettyDate(value.time_created) + '</div>'
                        + '</div>'
                        + '<div style="background-image:url(' + value.fromUserDetails.iconURL + ')" class="message-avatar"></div>'
                    + '</div>';
            } else {
                content += value.description;
            }
        });
        content += '</div>';

        if( thread ){
            content += '<div class="toolbar messagebar"><div class="toolbar-inner"><textarea id="reply-message" placeholder="' + GCTLang.Trans('message') + '"></textarea><a href="#" class="link send-message" data-guid="' + guid + '" onclick="GCTUser.ReplyMessage(this);">' + GCTLang.Trans('send') + '</a></div></div>';
        }
        content = GCT.SetLinks(content);

        // var messageHTML = '<li>'
        //     + '<div class="item-link item-content">';
        //     if( message.fromUserDetails.iconURL ){
        //       messageHTML += '<div class="item-media"><img width="40" height="40" style="border-radius:100%" src="' + message.fromUserDetails.iconURL + '" alt=""></div>';
        //     }
        //     messageHTML += '<div class="item-inner">'
        //             + '<div class="item-title-row">'
        //                 + '<div class="author">' + (message.fromUserDetails.displayName ? message.fromUserDetails.displayName : '') + '</div>'
        //             + '</div>'
        //             + '<div class="time">' + prettyDate(message.time_created) + '</div>'
        //         + '</div>'
        //     + '</div>'
        // + '</li>'
        // + '<div class="content-block">'
        //     + '<div class="blog-title">' + message.title + '</div>'
        //     + message.description
        // + '</div>';

        // $('#user-message').html(messageHTML);
        // myApp.showTab('#tab-message');
        // myApp.openPanel('right');

        $('.popup-generic .popup-title').html(GCTLang.Trans('message'));
        $('.popup-generic .popup-content').html(content);
        myApp.popup('.popup-generic');
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
}

function LoadMessageCentre() {
    var limit = 20;
    var offset = 0;
    var totalUnread = 0;

    GCTUser.GetNotifications(limit, offset, function(data) {
        var notificationData = data.result;

        var notifications = "";
        var notificationsUnread = 0;
        $(notificationData).each(function( key, value ) {
            var description = "";
            var unread = (value.read) ? "" : "unread";
            var regex = /<!-- TITLE OF CONTENT -->([\s\S]*)<div>Need help?/;
            var matches = (value.description).match(regex);
            if( matches != null ){
                description = matches[1];
            } else {
                description = value.description;
            }

            notifications += '<li class="swipeout">'
              + '<a style="float:left; width:80%;" onclick="ShowMessage(this);" class="item-title-row no-padding-rightitem-link item-content tab-link" data-guid="' + value.guid + ' data-type="notification">'
                + '<div class="item-inner ' + unread + '">'
                  + '<div class="item-title-row no-padding-right">'
                    + '<div class="item-subtitle">GCcollab</div>'
                    + '<div class="item-after">' + prettyDate(value.time_created) + '</div>'
                  + '</div>'
                  + '<div class="item-text">' + value.title + '</div>'
                + '</div>'
                + '</a><div class="item-after"><a href="#" class="link trash-notif" data-guid="'+value.guid+'" onclick="GCTUser.Delete(this);"><i class="fa fa-trash fa-2x"></i></a></div>'
           + '</li>';

            if( !value.read ){
                notificationsUnread++;
                totalUnread++;
            }
        });

        $("#notifications-tab .count").text(notificationsUnread);
        if(notificationsUnread > 0){
            $("#notifications-tab .count").addClass('exists');
        } else {
            $("#notifications-tab .count").removeClass('exists')
        }

        $('#user-notifications').html(notifications);

        GCTUser.GetMessages(limit, offset, function(data2) {
            var messageData = data2.result;

            var inboxMessages = "";
            var inboxMessagesUnread = 0;
            $(messageData).each(function( key, value ) {
                // Removes HTML components from Message
                var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                var unread = (value.read) ? "" : "unread";

                inboxMessages += '<li class="swipeout">'
                  + '<a style="float:left; width:80%;" onclick="ShowMessage(this);" class="item-title-row item-content tab-link" data-guid="' + value.guid + '" data-type="message">'
                    + '<div class="item-inner ' + unread + '">'
                      + '<div class="item-title-row no-padding-right">'
                        + '<div class="item-subtitle">' + value.fromUserDetails.displayName + '</div>'
                        + '<div class="item-after">' + prettyDate(value.time_created) + '</div>'
                      + '</div>'
                      + '<div class="item-text">' + value.title + '</div>'
                    + '</div>'
                    + '</a><div class="item-after"><a href="#" class="link trash-notif" data-guid="'+value.guid+'" onclick="GCTUser.Delete(this);"><i class="fa fa-trash fa-2x"></i></a></div>'
                 + '</li>';

                if( !value.read ){
                    inboxMessagesUnread++;
                    totalUnread++;
                }
            });

            $("#messages-tab .count").text(inboxMessagesUnread);
            if(inboxMessagesUnread > 0){
                $("#messages-tab .count").addClass('exists');
            } else {
                $("#messages-tab .count").removeClass('exists')
            }

            $('#user-messages').html(inboxMessages);
        });

        /*
        GCTUser.GetSentMessages(limit, offset, function(data3) {
            var sentData = data3.result;

            var sentMessages = "";
            var sentMessagesUnread = 0;
            $(sentData).each(function( key, value ) {
                // Removes HTML components from Message
                var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                var unread = (value.read) ? "" : "unread";
                
                sentMessages += '<li class="swipeout">'
                  + '<div class="swipeout-content"><a onclick="ShowMessage(this);" class="item-link item-content tab-link" data-guid="' + value.guid + '" data-type="message">'
                    + '<div class="item-inner ' + unread + '">'
                      + '<div class="item-title-row no-padding-right">'
                        + '<div class="item-subtitle">' + value.title + '</div>'
                        + '<div class="item-after">' + prettyDate(value.time_created) + '</div>'
                      + '</div>'
                      + '<div class="item-text">' + text + '</div>'
                    + '</div>'
                    + '</a></div>'
                  + '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" class="demo-forward bg-blue">Forward</a></div>'
                  + '<div class="swipeout-actions-right"><a href="#" class="demo-actions">More</a><a href="#" class="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" class="swipeout-delete swipeout-overswipe">Delete</a></div>'
                + '</li>';

                if( !value.read ){
                    sentMessagesUnread++;
                    totalUnread++;
                }
            });

            $("#sent-tab .count").text(sentMessagesUnread);
            if(sentMessagesUnread > 0){
                $("#sent-tab .count").addClass('exists');
            } else {
                $("#sent-tab .count").removeClass('exists')
            }

            $('#user-sent').html(sentMessages);
        });
        */

        GCTUser.GetColleagueRequests(limit, offset, function(data4){
            var colleagueData = data4.result;
            if( colleagueData && colleagueData.length > 0 ){
                totalUnread += colleagueData.length;
                $("#colleague-requests .badge-wrapper").html('<span class="badge"> ' + colleagueData.length + '</span>');
            } else {
                $("#colleague-requests .badge-wrapper").html('');
            }

            if( totalUnread > 0 ){
                $(".main-navbar .badge-wrapper").html('<span class="badge"> ' + totalUnread + '</span>');
            } else {
                $(".main-navbar .badge-wrapper").html('');
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
}

function ShowColleagueRequests() {
    var limit = 10;
    var offset = 0;

    GCTUser.GetColleagueRequests(limit, offset, function(data){
        var colleagueData = data.result;

        var content = "";
        if(colleagueData.length > 0){
            $.each(colleagueData, function (key, value) {
                var description = '<div class="row"><div class="col-50"><span class="button button-fill button-raised" data-guid="' + value.user_id + '" onclick="GCTUser.ApproveColleague(this);">' + GCTLang.Trans("accept") + '</span></div><span class="col-50"><div class="button button-fill button-raised" data-guid="' + value.user_id + '" onclick="GCTUser.DeclineColleague(this);">' + GCTLang.Trans("decline") + '</span></div></div>';
                
                content += GCTLang.txtMember({
                    guid: value.user_id,
                    icon: value.iconURL,
                    name: value.displayName,
                    date: GCTLang.Trans("join-date") + "<em>" + prettyDate(value.dateJoined) + "</em>",
                    description: description,
                    organization: value.organization,
                    job: (value.job) ? value.job : '',
                    colleaguerequest: true
                });
            });
        } else {
            content = noContent;
        }

        $('.popup-generic .popup-title').html(GCTLang.Trans('colleague-requests'));
        $('.popup-generic .popup-content').html(content);
        myApp.popup('.popup-generic');
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
}

function EmptyUndefined(val) {
    if (typeof val == 'undefined')
        return '';
    else
        return val;
}

function GEDSNameSearch(name) {
    if (name == '')
        return; 

    $("#ulGEDSSearch").empty();
    $("#divGEDSSearchFilter").hide();
    $("#txtGEDSSearchFilter").text("");
    $("#divGEDSSearchResultsCount").text("");
    
    GCTUser.GEDSSearch(name, function (data) {
        if (typeof data.requestResults.personList != "undefined") {
            $.each(data.requestResults.personList, function (i, item) {
                var name = EmptyUndefined(item.gn) + ' ' + EmptyUndefined(item.sn);
                var deptAcronym = EmptyUndefined(item.departmentAcronym);
                var orgEnglish = EmptyUndefined(item.organization);
                var mail = EmptyUndefined(item.mail);
                var phone = EmptyUndefined(item.tn);
                var title = EmptyUndefined(item.title);

                var content = GCTLang.liGEDSResult({
                    name: name,
                    dept: deptAcronym,
                    title: title,
                    org: orgEnglish,
                    mail: mail,
                    phone: phone
                });

                // var str = liGEDSResult.replace("{0}", name).replace("{1}", deptAcronym).replace("{2}", title).replace("{3}", orgEnglish)
                //     .replace("{4,1}", mail).replace("{4,2}", mail)
                //     .replace("{5,1}", phone).replace("{5,2}", phone);
                $("#ulGEDSSearch").append(content);
                //console.log(item);
            });
            
            $("#txtGEDSSearch").blur();
            $("#ulGEDSSearch").find("li").filter(":even").css("background-color", "rgba(0,0,0,.1)");
            if (data.requestResults.personList.length > 3) {
                $("#divGEDSSearchFilter").show();
            }
            $("#divGEDSSearchResultsCount").text("(" + data.requestResults.personList.length + ")");


        } else {
            $("#ulGEDSSearch").append("<li style='padding:15px;'><br />There are no employees matching that name.</li>");
        }
    }, function (xhr, err1, err2) {
        console.log(xhr);
    });
}

function ShowHideGEDSInfo(li) {
    $.each($(li).find('.item-subtitle'), function (key, value) {
        $(value).toggle();
    });
}

function AppOpen() {
    if (GCTLang.IsLangSet()) {
        if (GCTUser.IsLoggedIn()) {
            GCTUser.SetUserProfile();
            mainView.router.loadPage({ url: 'home.html' });
        } else {
            if( openid_enabled ){
                mainView.router.loadPage({ url: 'sign-in.html' });
            } else {
                mainView.router.loadPage({ url: 'sign-in-old.html' });
            }
        }
    } else {
        //### Show lang buttons. This is first call and only happens until they click a lang link
        $('#aEN').toggle();
        $('#aFR').toggle();
    }
}

myApp.onPageInit('*', function (page) {
    myApp.closeModal();
    $$(document).on('click', 'a.external', function (e) {
       e.preventDefault();
       window.open($(this).attr('href'), '_system');
    });

    $$(document).on('open', '.popup-filters', function() {
        $(".popup-overlay").css("visibility", "hidden");
    });

    $$(document).on('close', '.popup-filters', function() {
        $(".popup-overlay").remove();
    });

    LoadMessageCentre();

    $$(document).on('click', '#colleague-requests', function (e) {
        e.preventDefault();
        ShowColleagueRequests();
    });
    
    // Get & save user profile data if not present
    if( GCTUser.Guid() == "" ){
        GCTUser.SetUserProfile();
    }

    //### To do - Store pages once translated and don't translate them again to help performance. Probably use global var array for this.
    GCTLang.TransPage();

    $$('#logoutBtn').on('click', function (e) {
        GCTUser.Logout();
        myApp.closePanel(false);
        if( openid_enabled ){
            mainView.router.loadPage({ url: 'sign-in.html' });
        } else {
            mainView.router.loadPage({ url: 'sign-in-old.html' });
        }
    });

    $$(document).on('click', 'a.social-share', function (e) {
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
        }else if (type == 'gccollab_event') {
            message = $("#event-" + guid + ' .blog-event').text();
            subject = 'GCcollab event';
        }

        if (typeof window.plugins.socialsharing !== 'undefined' && message != "") {
            GCTUser.GetEntityURL(guid, function(data){
                url = data.result;
                
                window.plugins.socialsharing.shareWithOptions({
                    message: message,
                    subject: subject,
                    files: files,
                    url: url,
                    chooserTitle: chooserTitle
                }, function(success) {
                    console.log("Share completed? " + success.completed);
                    console.log("Shared to app: " + success.app);
                }, function(failure) {
                    console.log("Sharing failed with message: " + failure);
                });
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        } else {
            alert('Sorry, social sharing cannot be completed.');
        }
    });
});


myApp.onPageInit('group', function (page) {
    $$('#group-navbar-inner').html(GCTLang.txtGlobalNav('group'));
    var guid = page.query.guid;
    var limit = 20;
    var enabled;
    var access;
    var group_public;

    var group = {};
    group.members = listObject("group-members");
    group.discussions = listObject("group-discussions");
    group.activity = listObject("group-activity");
    group.bookmarks = listObject("group-bookmarks");
    group.blogs = listObject("group-blogs");

    function groupDiscussions(data) {
        var info = data.result;
        var content = '';
        if (group.discussions.loaded == true) { $(group.discussions.appendMessage).appendTo('#content-' + group.discussions.id); } else { group.discussions.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                // Removes HTML components from Discussion
                //var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                var text = "<blockquote class='item-text large'>" + value.description + "</blockquote>";
                var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                var replied = (value.replied) ? "replied" : "";
                var liked = (value.liked) ? "liked" : "";
                var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                content += GCTLang.txtDiscussion({
                    icon: value.userDetails.iconURL,
                    name: value.userDetails.displayName,
                    date: prettyDate(value.time_created),
                    group: group,
                    description: text,
                    title: value.title,
                    all_text: 'all_text',
                    action: action,
                    owner: value.owner_guid,
                    guid: value.guid,
                    type: "gccollab_discussion_post",
                    replied: replied,
                    liked: liked,
                    likes: likes
                });

            });
            $(content).appendTo('#content-' + group.discussions.id);
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).appendTo('#content-' + group.discussions.id);
            $('#more-' + group.discussions.id).hide();
        }
        group.discussions.offset += limit;
        var focusNow = document.getElementById('focus-' + group.discussions.id);
        if (focusNow) { focusNow.focus(); }
    }
    function groupBookmarks(data) {
        var info = data.result;
        if (group.bookmarks.loaded == true) { $(group.bookmarks.appendMessage).appendTo('#content-' + group.bookmarks.id); } else { group.bookmarks.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Bookmark(value);
                $(content).hide().appendTo('#content-' + group.bookmarks.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $(endOfContent).hide().appendTo('#content-' + group.bookmarks.id).fadeIn(1000);
            $('#more-' + group.bookmarks.id).hide();
        }
        group.bookmarks.offset += limit;
        var focusNow = document.getElementById('focus-' + group.bookmarks.id);
        if (focusNow) { focusNow.focus(); }
    }
    function groupMembers(data) {
        var info = data.result;
        if (group.members.loaded == true) { $(group.members.appendMessage).appendTo('#content-' + group.members.id); } else { group.members.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Member(value);
                $(content).hide().appendTo('#content-' + group.members.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $('#more-' + group.members.id).hide();
            $(endOfContent).hide().appendTo('#content-' + group.members.id).fadeIn(1000);
        }
        group.members.offset += limit;
        var focusNow = document.getElementById('focus-' + group.members.id);
        if (focusNow) { focusNow.focus(); }
    }
    function groupActivity(data) {
        var info = data.result;
        if (group.activity.loaded == true) { $(group.activity.appendMessage).appendTo('#content-' + group.activity.id); } else { group.activity.loaded = true; }

        if (info.length > 0) {
            $(info).each(function (key, value) {
                var content = GCTEach.Activity(value);
                $(content).hide().appendTo('#content-' + group.activity.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $(endOfContent).hide().appendTo('#content-' + group.activity.id).fadeIn(1000);
            $('#more-' + group.activity.id).hide();
        }
        group.activity.offset += limit;
        var focusNow = document.getElementById('focus-' + group.activity.id);
        if (focusNow) { focusNow.focus(); }
    }
    function groupBlogs(data) {
        var info = data.result;
        if (group.blogs.loaded == true) { $(group.blogs.appendMessage).appendTo('#content-' + group.blogs.id); } else { group.blogs.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + group.blogs.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $(endOfContent).hide().appendTo('#content-' + group.blogs.id).fadeIn(1000);
            $('#more-' + group.blogs.id).hide();
        }
        group.blogs.offset += limit;
        var focusNow = document.getElementById('focus-' + group.blogs.id);
        if (focusNow) { focusNow.focus(); }
    }

    GCTUser.GetGroup(guid, function (data) {
        var group = data.result;

        var tags = (group.tags) ? ($.isArray(group.tags) ? (group.tags).join(", ") : group.tags) : GCTLang.Trans('no-tags');
        if (group.liked) {
            $(".like").addClass('liked');
        }
        if (group.member) {
            $("#leave-group").show();
        } else {
            $("#join-group").show();
        }
        access = group.access;
        $("#group-description").html(group.description);
        if (group.access) {
            enabled = group.enabled;
        } else {
            enabled = false;
        }

        if (group.public == true) {
            group_public = true;
        } else { group_public = false; }

        $("#group-icon").attr('src', group.iconURL);
        $("#group-icon").attr('alt', "Group Icon of" + group.userDetails.displayName);
        $("#group-title").html(group.name).text();
        $("#group-owner").text(group.userDetails.displayName);
        $("#group-owner-click").attr('onclick', "ShowProfile(" + group.owner_guid + ");");
        $("#group-count").text("(" + group.count + ")");
        $("#like-count").text(group.likes);
        $("#group-tags").text(tags);
        $("[data-owner]").data('owner', group.owner);
        $("[data-guid]").data('guid', group.guid);
        $("[data-type]").data('type', group.type);

    }, errorConsole);

    $("#group-menu").on('click', function (e) {
        var popoverHTML = '<div class="popover pop-group-menu">'
            + '<span id="focus-tabs" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0">' + GCTLang.Trans('more-tab-menu-opened') + '</span>'
            + '<div class="popover-inner">'
            + '<div class="list-block">'
            + '<ul aria-labelledby="focus-tabs">';
        if (access) {
            popoverHTML += (enabled.activity && enabled.activity == "yes") ? '<li><a href="#tab-group-activity" class="button tab-link close-popover" data-translate="activity">' + GCTLang.Trans("activity") + '</a></li>' : "";
            popoverHTML += (enabled.forum && enabled.forum == "yes") ? '<li><a href="#tab-group-discussions" class="button tab-link close-popover" data-translate="discussion">' + GCTLang.Trans("discussion") + '</a></li>' : "";
            popoverHTML += (enabled.bookmarks && enabled.bookmarks == "yes") ? '<li><a href="#tab-group-bookmarks" class="button tab-link close-popover" data-translate="bookmarks">' + GCTLang.Trans("bookmarks") + '</a></li>' : "";
            popoverHTML += (enabled.blog && enabled.blog == "yes") ? '<li><a href="#tab-group-blogs" class="button tab-link close-popover" data-translate="blogs">' + GCTLang.Trans("blogs") + '</a></li>' : "";
        } else {
            popoverHTML += '<li><a href="#" class="item-link list-button">' + GCTLang.Trans("Private-Group") + '</a></li>';
        }
        popoverHTML += '<li><a href="#" id="close-more-tabs" class="button close-popover">' + GCTLang.Trans("close") + '</a></li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '</div>';
        myApp.popover(popoverHTML, this);
        var focusNow = document.getElementById('focus-tabs');
        if (focusNow) { focusNow.focus(); }
        $$('#close-more-tabs').on('click', function (e) {
            var focusClose = document.getElementById('group-menu');
            if (focusClose) { focusClose.focus(); }
        });
    });

    $("#group-actions").on('click', function (e) {
        var popoverHTML = '<div class="popover pop-group-actions">'
            + '<div class="popover-inner">'
            + '<div class="list-block">'
            + '<ul>';
        if (access) {
            popoverHTML += (enabled.blog && enabled.blog == "yes") ? '<li><a href="#" onclick="GCTUser.PostBlogPost(' + page.query.guid + ', ' + group_public + ');" class="list-button item-link close-popover"><i class="fa fa-pencil-square-o"></i>  <span>' + GCTLang.Trans("PostBlog") + '</span> </a></li>' : "";
            popoverHTML += (enabled.forum && enabled.forum == "yes") ? '<li><a href="#" onclick="GCTUser.PostDiscussionPost(' + page.query.guid + ', ' + group_public + ');" class="list-button item-link close-popover"><i class="fa fa-pencil-square-o"></i>  <span>' + GCTLang.Trans("PostDiscussion") + '</span> </a></li>' : "";
        } else {
            popoverHTML += '<li><a href="#" class="item-link list-button">' + GCTLang.Trans("Private-Group") + '</a></li>';
        }
        popoverHTML += '</ul>'
            + '</div>'
            + '</div>'
            + '</div>';
        myApp.popover(popoverHTML, this);
    });

    $("#tab-" + group.discussions.id).on('show', function (e) {
        if (!group.discussions.loaded) {
            GCTUser.GetGroupDiscussions(guid, limit, group.discussions.offset, groupDiscussions, errorConsole);
        }
    });
    $$("#more-" + group.discussions.id).on('click', function (e) {
        $('#focus-' + group.discussions.id).remove();
        GCTUser.GetGroupDiscussions(guid, limit, group.discussions.offset, groupDiscussions, errorConsole);
    });

    $("#tab-" + group.bookmarks.id).on('show', function (e) {
        if (!group.bookmarks.loaded) {
            GCTUser.GetBookmarksByUser(limit, group.bookmarks.offset, guid, groupBookmarks, errorConsole);
        }
    });
    $$("#more-" + group.bookmarks.id).on('click', function (e) {
        $('#focus-' + group.bookmarks.id).remove();
        GCTUser.GetBookmarksByUser(limit, group.bookmarks.offset, guid, groupBookmarks, errorConsole);
    });

    $$('#tab-' + group.members.id).on('show', function (e) {
        if (!group.members.loaded) {
            GCTUser.GetGroupMembers(guid, limit, group.members.offset, groupMembers, errorConsole);
        }
    });
    $$('#more-' + group.members.id).on('click', function (e) {
        $('#focus-' + group.members.id).remove();
        GCTUser.GetGroupMembers(guid, limit, group.members.offset, groupMembers, errorConsole);
    });

    $$('#tab-' + group.activity.id).on('show', function (e) {
        if (!group.activity.loaded) {
            GCTUser.GetGroupActivity(guid, limit, group.activity.offset, groupActivity, errorConsole);
        }
    });
    $$('#more-' + group.activity.id).on('click', function (e) {
        $('#focus-' + group.activity.id).remove();
        GCTUser.GetGroupActivity(guid, limit, group.activity.offset, groupActivity, errorConsole);
    });

    $$('#tab-' + group.blogs.id).on('show', function (e) {
        if (!group.blogs.loaded) {
            GCTUser.GetGroupBlogs(guid, limit, group.blogs.offset, groupBlogs, errorConsole);
        }
    });
    $$('#more-' + group.blogs.id).on('click', function (e) {
        $('#focus-' + group.blogs.id).remove();
        GCTUser.GetGroupBlogs(guid, limit, group.blogs.offset, groupBlogs, errorConsole);
    });
});
$$(document).on('page:afteranimation', '.page[data-page="group"]', function (e) {
    var focusNav = document.getElementById('page-group');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('sign-in', function (page) {
    var clientInfo = {
        client_id: openid_client_id,
        redirect_uri: 'gccollab-mobile'
    };
    var providerInfo = OIDC.discover(openid_issuer);

    OIDC.setClientInfo(clientInfo);
    OIDC.setProviderInfo(providerInfo);
    OIDC.storeInfo(providerInfo, clientInfo);

    $$('#regBtn').on('click', function (e) {
        var registerWindow = window.open(openid_register_url, '_blank', 'location=yes');

        registerWindow.addEventListener('loadstop', function(event) {
            var url = event.url;
            if(url.includes('/register/complete/')){
                setTimeout(function(){
                    registerWindow.close();
                }, 3000);
            }
        });
    });

    $$('#loginBtn').on('click', function (e) {
        var id_token = "";
        var access_token = "";
        var loginURL = OIDC.login({scope: 'openid email', response_type: 'id_token token'});
        var loginWindow = window.open(loginURL, '_blank', 'location=yes');

        loginWindow.addEventListener('loadstop', function(event) {
            var url = event.url;

            if(url.includes('id_token=')){
                id_token = url.substring(url.lastIndexOf('id_token=')+9, url.lastIndexOf('&token_type'));
            }

            if(url.includes('access_token=')){
                access_token = url.substring(url.lastIndexOf('access_token=')+13, url.lastIndexOf('&id_token'));
            }

            if(url.includes('/profile/') || (id_token && access_token)){
                loginWindow.close();
            }
        });

        loginWindow.addEventListener('exit', function(event) {
            if(id_token && access_token){
                $.ajax({
                    url: openid_issuer + "/userinfo",
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (request){
                        request.setRequestHeader("Authorization", "Bearer " + access_token);
                    },
                    success: function (result) {
                        var email = result.email;
                        var sub = result.sub;

                        GCTUser.LoginOpenID(email, sub, function (success) {
                            if (success.result == true) {
                                GCTUser.SaveLoginEmail(email);
                                GCTUser.SetLoginCookie();
                                GCTUser.SetUserProfile();
                                mainView.router.loadPage({ url: 'home.html' });
                            } else {
                                myApp.alert(GCTLang.Trans("invalid"), 'Error');
                            }
                        }, function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR, textStatus, errorThrown);
                        });
                    }
                });
            }
        });
    });
});

myApp.onPageInit('sign-in-old', function (page) {
    $("#email, #password").keyup(function (event) {
        var email = $('#email').val();
        var password = $('#password').val();

        if (event.keyCode == 13) {
            if( email != "" && password != "" && email.length >= 3 && password.length >= 6 ){
                GCTUser.Login(email, password, function (success) {
                    if (success.result==true) {
                        GCTUser.SaveLoginEmail(email);
                        GCTUser.SetLoginCookie();
                        GCTUser.SetUserProfile();
                        mainView.router.loadPage({ url: 'home.html' });
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

        if( email != "" && password != "" ){
            GCTUser.Login(email, password, function (success) {
                if (success.result == true) {
                    GCTUser.SaveLoginEmail(email);
                    GCTUser.SetLoginCookie();
                    GCTUser.SetUserProfile();
                    mainView.router.loadPage({ url: 'home.html' });
                } else {
                    myApp.alert(GCTLang.Trans("invalid"), 'Error');
                }
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    });
});

myApp.onPageInit('home', function (page) {
    $$('#home-navbar-inner').html(GCTLang.txtGlobalNav('home'));
    var limit = 12;

    var home = {}; //variables for this page's content
    home.newsfeed = listObject("home-newsfeed");
    home.wire = listObject("home-wire");
    home.blogs = listObject("home-blogs");

    function homeNewsfeed(data) {
        var newsfeed = data.result;
        var content = '';
        if (home.newsfeed.loaded == true) { $(home.newsfeed.appendMessage).appendTo('#content-' + home.newsfeed.id); } else { home.newsfeed.loaded = true; }

        if (newsfeed.length > 0) {
            $.each(newsfeed, function (key, value) {
                content = GCTEach.Newsfeed(value);
                $(content).hide().appendTo('#content-' + home.newsfeed.id).fadeIn(1000);
            });
        }
        if (newsfeed.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + home.newsfeed.id).fadeIn(1000);
            $('#more-' + home.newsfeed.id).hide();
        }
        home.newsfeed.offset += limit;
        var focusNow = document.getElementById('focus-' + home.newsfeed.id);
        if (focusNow) { focusNow.focus(); }
    }
    function homeWires(data) {
        var wires = data.result;
        var content = '';
        if (home.wire.loaded == true) { $(home.wire.appendMessage).appendTo('#content-' + home.wire.id); } else { home.wire.loaded = true; }

        if (wires.length > 0) {
            $.each(wires, function (key, value) {
                content = GCTEach.Wire(value);
                $(content).hide().appendTo('#content-' + home.wire.id).fadeIn(1000);
            });
        }
        if (wires.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + home.wire.id).fadeIn(1000);
            $('#more-' + home.wire.id).hide();
        }
        home.wire.offset += limit;
        var focusNow = document.getElementById('focus-' + home.wire.id);
        if (focusNow) { focusNow.focus(); }
    }
    function homeBlogs(data) {
        var blogs = data.result;
        var content = '';
        if (home.blogs.loaded == true) { $(home.blogs.appendMessage).appendTo('#content-' + home.blogs.id); } else { home.blogs.loaded = true; }
        if (blogs.length > 0) {
            $.each(blogs, function (key, value) {
                content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + home.blogs.id).fadeIn(1000);
            });
        }
        if (blogs.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + home.blogs.id).fadeIn(1000);
            $('#more-' + home.blogs.id).hide();
        }
        home.blogs.offset += limit;
    }
    function homeReset() {
        $.each(home, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });
        GCTUser.GetNewsfeed(limit, home.newsfeed.offset, homeNewsfeed, errorConsole);
        GCTUser.GetWires(limit, home.wire.offset, '', homeWires, errorConsole);
        GCTUser.GetBlogs(limit, home.blogs.offset, "", homeBlogs, errorConsole);

    }


    GCTUser.GetNewsfeed(limit, home.newsfeed.offset, homeNewsfeed, errorConsole);
    
    $$('#tab-' + home.newsfeed.id).on('show', function (e) {
        var focusTitle = document.getElementById('tabheader-home-newsfeed');
        if (focusTitle) { focusTitle.focus(); }
    });
    $$('#more-' + home.newsfeed.id).on('click', function (e) {
        $('#focus-' + home.newsfeed.id).remove();
        GCTUser.GetNewsfeed(limit, home.newsfeed.offset, homeNewsfeed, errorConsole);
    });

    $$('#tab-' + home.wire.id).on('show', function (e) {
        if (!home.wire.loaded) {
            GCTUser.GetWires(limit, home.wire.offset, '', homeWires, errorConsole);
        }
        var focusTitle = document.getElementById('tabheader-home-wires');
        if (focusTitle) { focusTitle.focus(); }
    });
    $$('#more-' + home.wire.id).on('click', function (e) {
        $('#focus-' + home.wire.id).remove();
        GCTUser.GetWires(limit, home.wire.offset, '', homeWires, errorConsole);
    });

    $$('#tab-' + home.blogs.id).on('show', function (e) {
        if (!home.blogs.loaded) {
            GCTUser.GetBlogs(limit, home.blogs.offset, "", homeBlogs, errorConsole);
        }
        var focusTitle = document.getElementById('tabheader-home-blogs');
        if (focusTitle) { focusTitle.focus(); }
    });
    $$('#more-' + home.blogs.id).on('click', function (e) {
        $('#focus-' + home.blogs.id).remove();
        GCTUser.GetBlogs(limit, home.blogs.offset, "", homeBlogs, errorConsole);
    });

    var refreshHome = $$(page.container).find('.pull-to-refresh-content');
    refreshHome.on('refresh', function (e) {
        console.log("refresh");
        homeReset();
        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="home"]', function (e) {
    var focusTitle = document.getElementById('page-home');
    if (focusTitle) { focusTitle.focus(); }
});

function ShowTransOptions(obj) {
    myApp.prompt("Cette publication a &eacute;t&eacute; traduite pour vous parce que ... <br /> Vous pouvez modifier les options de traduction automatique dans votre <a href='#'>param&egrave;tre</a><br />Voulez- vous afficher la publication tel qu'il &eacute;tait &agrave; l'origine &eacute;crit?",
        'Ce message a &eacute;t&eacute; traduit automatiquement', function (value) {
    });
}

var TransIcon = "";

//var TransIcon = "<li class='fa fa-language fa-lg' style='"
//    + "padding:2px;"
//    + "'"
//    + " onclick='Translate(this.parentNode);'"
//    + "></li>";


function Translate(obj) {
    $.ajax({
        api_key: api_key_gccollab,
        url: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyAp-fbFDY5wKlfP9jGFF40B2IhlDWLwVZU',
        dataType: 'jsonp',
        data: {
            q: $(obj).html(),  // text to translate
            v: '1.0',
            target: 'fr'
        },   // '|es' for auto-detect
        success: function (result) {
            $(obj).html(result.data.translations[0].translatedText);
        },
        error: function (XMLHttpRequest, errorMsg, errorThrown) {
            console.log(errorMsg);
        }
    });
}

myApp.onPageInit('wire', function (page) {
    $$('#wire-navbar-inner').html(GCTLang.txtGlobalNav('the-wire'));
    var limit = 20;
    var offset = 0;
    var offset_wiresColleagues = 0;
    var offset_wiresMine = 0;

    var wires = {}; //objects for each tab's variables.
    wires.all = listObject("wires-all");
    wires.colleagues = listObject("wires-colleagues");
    wires.mine = listObject("wires-mine");

    function wiresWires(data) {
        var info = data.result;
        var imgs = [];
        var content = '';
        if (wires.all.loaded == true) { $(wires.all.appendMessage).appendTo('#content-' + wires.all.id); } else { wires.all.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                content = GCTEach.Wire(value);
                $(content).hide().appendTo('#content-' + wires.all.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + wires.all.id).fadeIn(1000);
            $('#more-' + wires.all.id).hide();
        }
        
        wires.all.offset += limit;
        var focusNow = document.getElementById('focus-' + wires.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function wiresColleagues(data) {
        var info = data.result;
        var imgs = [];
        if (wires.colleagues.loaded == true) { $(wires.colleagues.appendMessage).appendTo('#content-' + wires.colleagues.id); } else { wires.colleagues.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Wire(value);
                $(content).hide().appendTo('#content-' + wires.colleagues.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + wires.colleagues.id).fadeIn(1000);
            $('#more-' + wires.colleagues.id).hide();
        }
        wires.colleagues.offset += limit;
        var focusNow = document.getElementById('focus-' + wires.colleagues.id);
        if (focusNow) { focusNow.focus(); }
    } 
    function wiresMine(data) {
        var info = data.result;
        if (wires.mine.loaded == true) { $(wires.mine.appendMessage).appendTo('#content-' + wires.mine.id); } else { wires.mine.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Wire(value);
                $(content).hide().appendTo('#content-' + wires.mine.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + wires.mine.id).fadeIn(1000);
            $('#more-' + wires.mine.id).hide();
        }
        wires.mine.offset += limit;
        var focusNow = document.getElementById('focus-' + wires.mine.id);
        if (focusNow) { focusNow.focus(); }
    }
    function wiresReset() {
        $.each(wires, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });
        GCTUser.GetWires(limit, wires.all.offset, '', wiresWires, errorConsole);
        GCTUser.GetWiresByUserColleague(limit, wires.colleagues.offset, wiresColleagues, errorConsole);
        GCTUser.GetWiresByUser(GCTUser.Email(), limit, wires.mine.offset, wiresMine, errorConsole);
    }
    
    GCTUser.GetWires(limit, wires.all.offset, '', wiresWires, errorConsole);
    $$('#more-' + wires.all.id).on('click', function (e) {
        $('#focus-' + wires.all.id).remove();
        GCTUser.GetWires(limit, wires.all.offset, '', wiresWires, errorConsole);
    });

    GCTUser.GetWiresByUserColleague(limit, wires.colleagues.offset, wiresColleagues, errorConsole);
    $$('#more-' + wires.colleagues.id).on('click', function (e) {
        $('#focus-' + wires.colleagues.id).remove();
        GCTUser.GetWiresByUserColleague(limit, wires.colleagues.offset, wiresColleagues, errorConsole);
    });

    GCTUser.GetWiresByUser(GCTUser.Email(), limit, wires.mine.offset, wiresMine , errorConsole);
    $$('#more-' + wires.mine.id).on('click', function (e) {
        $('#focus-' + wires.mine.id).remove();
        GCTUser.GetWiresByUser(GCTUser.Email(), limit, wires.mine.offset, wiresMine, errorConsole);
    });
    
    var refreshWires = $$(page.container).find('.pull-to-refresh-content');
    refreshWires.on('refresh', function (e) {
        wiresReset();
        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="wire"]', function (e) {
    var focusNav = document.getElementById('page-the-wire');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('groups', function (page) {
    $$('#groups-navbar-inner').html(GCTLang.txtGlobalNav('groups'));
    var limit = 20;
    var filters = {};
    var filtersOpened = false;
    var groups = {};
    groups.all = listObject("groups-all");
    groups.mine = listObject("groups-mine");

    function groupsAll(data) {
        var info = data.result;
        if (groups.all.loaded == true) { $(groups.all.appendMessage).appendTo('#content-' + groups.all.id); } else { groups.all.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Group(value);
                $(content).hide().appendTo('#content-' + groups.all.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $('#more-' + groups.all.id).hide();
            $(endOfContent).hide().appendTo('#content-' + groups.all.id).fadeIn(1000);
        }
        groups.all.offset += limit;
        var focusNow = document.getElementById('focus-' + groups.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function groupsMine(data) {
        var info = data.result;
        if (groups.mine.loaded == true) { $(groups.mine.appendMessage).appendTo('#content-' + groups.mine.id); } else { groups.mine.loaded = true; }

        if (info.length > 0) {
            $('#more-' + groups.mine.id).show();
            $.each(info, function (key, value) {
                var content = GCTEach.Group(value);
                $(content).hide().appendTo('#content-' + groups.mine.id).fadeIn(1000);
            });
        } 
        if (info.length < limit) {
            $('#more-' + groups.mine.id).hide();
            $(endOfContent).hide().appendTo('#content-' + groups.mine.id).fadeIn(1000);
        }
        groups.mine.offset += limit;
        var focusNow = document.getElementById('focus-' + groups.mine.id);
        if (focusNow) { focusNow.focus(); }
    }
    function groupsReset() {
        $.each(groups, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });

        GCTUser.GetGroups(limit, groups.all.offset, filters, groupsAll, errorConsole);
        GCTUser.GetGroupsMine(limit, groups.mine.offset, filters, groupsMine, errorConsole);
    }
    
    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#group-name").val('');

        groupsReset();
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#group-name").val();
        if( $("#group-name").val() == "" ){
            filters = "";
        }
        groupsReset();
    });

    if( !filtersOpened ){
        GCTUser.GetGroups(limit, groups.all.offset, filters, groupsAll, errorConsole);
        GCTUser.GetGroupsMine(limit, groups.mine.offset, filters, groupsMine, errorConsole);
    }

    $$('#more-' + groups.all.id).on('click', function (e) {
        $('focus-' + groups.all.id).remove();
        GCTUser.GetGroups(limit, groups.all.offset, filters, groupsAll, errorConsole);
    });

    $$('#more-' + groups.mine.id).on('click', function (e) {
        $('focus-' + groups.mine.id).remove();
        GCTUser.GetGroupsMine(limit, groups.mine.offset, filters, groupsMine, errorConsole);
    });

    var refreshGroups = $$(page.container).find('.pull-to-refresh-content');
    refreshGroups.on('refresh', function (e) {
        filtersOpened = false;
        filters = {};
        $("#group-name").val('');
        groupsReset();
        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="groups"]', function (e) {
    var focusNav = document.getElementById('page-groups');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('chat', function (page) {
    $$('#chat-navbar-inner').html(GCTLang.txtGlobalNav('chat'));
    $("#user").val(GCTUser.Email());
    $("#api_key").val(api_key_gccollab);
    $("#chatForm").submit(); 
});
$$(document).on('page:afteranimation', '.page[data-page="chat"]', function (e) {
    var focusNav = document.getElementById('page-chat');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('doc', function (page) {
    $$('#doc-navbar-inner').html(GCTLang.txtGlobalNav('doc-title'));
    $("#user").val(GCTUser.Email());
    $("#api_key").val(api_key_gccollab);
    $("#guid").val(page.query.guid);
    $("#docForm").submit(); 
});
$$(document).on('page:afteranimation', '.page[data-page="doc"]', function (e) {
    var focusNav = document.getElementById('page-doc-title');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('members', function (page) {
    $$('#members-navbar-inner').html(GCTLang.txtGlobalNav('members'));
    var limit = 20;
    var filters = {};
    var filtersOpened = false;
    var members = {};
    members.all = listObject("members-all");
    members.colleagues = listObject("members-colleagues");

    function membersAll(data) {
        var info = data.result;
        if (members.all.loaded == true) { $(members.all.appendMessage).appendTo('#content-' + members.all.id); } else { members.all.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Member(value);
                $(content).hide().appendTo('#content-' + members.all.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $('#more-' + members.all.id).hide();
            $(endOfContent).hide().appendTo('#content-' + members.all.id).fadeIn(1000);
        }
        members.all.offset += limit;
        var focusNow = document.getElementById('focus-' + members.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function membersColleague(data) {
        var info = data.result;
        if (members.colleagues.loaded == true) { $(members.colleagues.appendMessage).appendTo('#content-' + members.colleagues.id); } else { members.colleagues.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Member(value);
                $(content).hide().appendTo('#content-' + members.colleagues.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $(endOfContent).hide().appendTo('#content-' + members.colleagues.id).fadeIn(1000);
            $('#more-' + members.colleagues.id).hide();
        }
        members.colleagues.offset += limit;
        var focusNow = document.getElementById('focus-' + members.colleagues.id);
        if (focusNow) { focusNow.focus(); }
    }
    function membersReset() {
        $.each(members, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });

        GCTUser.GetMembers(limit, members.all.offset, filters, membersAll, errorConsole);
        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, members.colleagues.offset, filters, membersColleague, errorConsole);
    }
    
    $('#clear-filters').on('click', function () {
        filtersOpened = false;
        filters = {};
        $("#member-filters").val('');
        $("#member-name").val('');
        membersReset();
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['type'] = $("#member-filters").val();
        filters['name'] = $("#member-name").val();
        if( $("#member-filters").val() == "" && $("#member-name").val() == "" ){
            filters = "";
        }
        membersReset();
    });

    if( !filtersOpened ){
        GCTUser.GetMembers(limit, members.all.offset, filters, membersAll, errorConsole);
        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, members.colleagues.offset, filters, membersColleague, errorConsole);
    }

    $$('#more-' + members.all.id).on('click', function (e) {
        GCTUser.GetMembers(limit, members.all.offset, filters, membersAll, errorConsole);
    });
    $$('#more-' + members.colleagues.id).on('click', function (e) {
        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, members.colleagues.offset, filters, membersColleague, errorConsole);
    });

    var refreshMembers = $$(page.container).find('.pull-to-refresh-content');
    refreshMembers.on('refresh', function (e) {
        filtersOpened = false;
        filters = {};
        $("#member-filters").val('');
        $("#member-name").val('');
        membersReset();
        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="members"]', function (e) {
    var focusNav = document.getElementById('page-members');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('geds', function (page) {
    $("#txtGEDSSearch").keyup(function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            GEDSNameSearch($(this).val());
        }
    });

    $$('#txtGEDSSearch').on('focusout', function (event) {
        event.preventDefault();
        GEDSNameSearch($(this).val());
    });

    $("#txtGEDSSearchFilter").on("search keyup", function (event) {
        var val = $("#txtGEDSSearchFilter").val().toLowerCase().trim();
        
        var visibles = 0;
        $("#ulGEDSSearch > li").each(function () {
            if ($(this).text().toLowerCase().indexOf(val) > -1) {
                $(this).show();
                visibles++;
            } else {
                $(this).hide();
            }
        });
        
        $("#ulGEDSSearch").find("li").filter(":visible").filter(":even").css("background-color", "rgba(0,0,0,.1)");
        $("#ulGEDSSearch").find("li").filter(":visible").filter(":odd").css("background-color", "inherit");
        $("#divGEDSSearchResultsCount").text("(" + visibles + ")");
    });
});

myApp.onPageInit('discussion', function (page) {
    $$('#discussions-navbar-inner').html(GCTLang.txtGlobalNav('discussions'));
    var limit = 20;
    var offset = 0;
    var discussionsMoreOffset = 0;
    var filters = {};
    var filtersOpened = false;

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#discussion-name").val('');

        GCTUser.GetDiscussions(limit, offset, filters, function(data){
            var discussions = data.result;
            $('#discussions-all').html('');

            if(discussions.length > 0){
                $('#discussions-more').show();
                $.each(discussions, function (key, value) {
                    // Removes HTML components from Discussion
                    var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                    if (value.groupURL.indexOf("/groups/profile/") > -1) {
                        var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
                    } else {
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = "<a herf='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                    var content = GCTLang.txtDiscussion({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        group: group,
                        description: text.trunc(150),
                        title: value.title,
                        all_text: 'all_text',
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        type: "gccollab_discussion_post",
                        replied: replied,
                        liked: liked,
                        likes: likes
                    });

                    $(content).hide().appendTo('#discussions-all').fadeIn(1000);
                });
            } else {
                $('#discussions-more').hide();
                $(noMatches).hide().appendTo('#discussions-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        discussionsMoreOffset = 0;
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#discussion-name").val();
        if( $("#discussion-name").val() == "" ){
            filters = "";
        }

        GCTUser.GetDiscussions(limit, offset, filters, function(data){
            var discussions = data.result;
            $('#discussions-all').html('');

            if(discussions.length > 0){
                $('#discussions-more').show();
                $.each(discussions, function (key, value) {
                    // Removes HTML components from Discussion
                    var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                    if (value.groupURL.indexOf("/groups/profile/") > -1) {
                        var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
                    } else {
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                    var content = GCTLang.txtDiscussion({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        group: group,
                        description: text.trunc(150),
                        title: value.title,
                        all_text: 'all_text',
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        type: "gccollab_discussion_post",
                        replied: replied,
                        liked: liked,
                        likes: likes
                    });

                    $(content).hide().appendTo('#discussions-all').fadeIn(1000);
                });
            } else {
                $('#discussions-more').hide();
                $(noMatches).hide().appendTo('#discussions-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        discussionsMoreOffset = 0;
    });

    if( !filtersOpened ){
        GCTUser.GetDiscussions(limit, offset, filters, function(data){
            var discussions = data.result;

            if(discussions.length > 0){
                $('#discussions-more').show();
                $.each(discussions, function (key, value) {
                    // Removes HTML components from discussion
                    var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                    // if (value.groupURL.indexOf("/groups/profile/") > -1) {
                    //     var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
                    // } else {
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                  //  }
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                    var content = GCTLang.txtDiscussion({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        group: group,
                        description: text.trunc(150),
                        title: value.title,
                        all_text: 'all_text',
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        type: "gccollab_discussion_post",
                        replied: replied,
                        liked: liked,
                        likes: likes
                    });

                    $(content).hide().appendTo('#discussions-all').fadeIn(1000);
                });
            } else {
                $('#discussions-more').hide();
                $(noMatches).hide().appendTo('#discussions-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var discussionsMore = $$(page.container).find('#discussions-more');
    discussionsMore.on('click', function (e) {
        GCTUser.GetDiscussions(limit, discussionsMoreOffset + limit, filters, function(data){
            var blogs = data.result;

            if(blogs.length > 0){
                $('#discussions-more').show();
                $.each(discussions, function (key, value) {
                    // Removes HTML components from discussion
                    var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                    if (value.groupURL.indexOf("/groups/profile/") > -1) {
                        var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
                    } else {
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                    var content = GCTLang.txtDiscussion({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        group: group,
                        description: text.trunc(150),
                        title: value.title,
                        all_text: 'all_text',
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        type: "gccollab_discussion_post",
                        replied: replied,
                        liked: liked,
                        likes: likes
                    });

                    $(content).hide().appendTo('#discussions-all').fadeIn(1000);
                });
            } else {
                $('#discussions-more').hide();
                $(noMatches).hide().appendTo('#discussions-all').fadeIn(1000);
            }

            discussionsMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshDiscussions = $$(page.container).find('.pull-to-refresh-content');
    refreshDiscussions.on('refresh', function (e) {
        GCTUser.GetDiscussions(limit, offset, filters, function(data){
            var blogs = data.result;

            if(discussions.length > 0){
                $('#discussions-more').show();
                var content = "";
                $.each(blogs, function (key, value) {
                    // Removes HTML components from discussion
                    var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                    if (value.groupURL.indexOf("/groups/profile/") > -1) {
                        var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
                    } else {
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                    content = GCTLang.txtDiscussion({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        group: group,
                        description: text.trunc(150),
                        title: value.title,
                        all_text: 'all_text',
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        type: "gccollab_discussion_post",
                        replied: replied,
                        liked: liked,
                        likes: likes
                    });
                });
                $('#discussions-all').html('');
                $(content).hide().appendTo('#discussions-all').fadeIn(1000);
            } else {
                $('#discussions-more').hide();
                $(noMatches).hide().appendTo('#discussions-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        discussionsMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('blog', function (page) {
    $$('#blogs-navbar-inner').html(GCTLang.txtGlobalNav('blogs'));
    var limit = 20;
    var filters = {};
    var filtersOpened = false;
    var blogs = {}; //objects for each tab's variables.
    blogs.all = listObject("blogs-all");
    blogs.colleagues = listObject("blogs-colleagues");
    blogs.mine = listObject("blogs-mine");
    

    function blogsAll(data) {
        var info = data.result;
        if (blogs.all.loaded == true) { $(blogs.all.appendMessage).appendTo('#content-' + blogs.all.id); } else { blogs.all.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + blogs.all.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $('#more-' + blogs.all.id).hide();
            $(endOfContent).hide().appendTo('#content-' + blogs.all.id).fadeIn(1000);
        }
        blogs.all.offset += limit;
        var focusNow = document.getElementById('focus-' + blogs.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function blogsMine(data) {
        var info = data.result;
        if (blogs.mine.loaded == true) { $(blogs.mine.appendMessage).appendTo('#content-' + blogs.mine.id); } else { blogs.mine.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + blogs.mine.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + blogs.mine.id).fadeIn(1000);
            $('#more-' + blogs.mine.id).hide();
        }
        blogs.mine.offset += limit;
        var focusNow = document.getElementById('focus-' + blogs.mine.id);
        if (focusNow) { focusNow.focus(); }
    }
    function blogsColleagues(data) {
        var info = data.result;
        if (blogs.colleagues.loaded == true) { $(blogs.colleagues.appendMessage).appendTo('#content-' + blogs.colleagues.id); } else { blogs.colleagues.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + blogs.colleagues.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + blogs.colleagues.id).fadeIn(1000);
            $('#more-' + blogs.colleagues.id).hide();
        }
        blogs.colleagues.offset += limit;
        var focusNow = document.getElementById('focus-' + blogs.colleagues.id);
        if (focusNow) { focusNow.focus(); }
    }
    function blogsReset() {
        $.each(blogs, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });

        GCTUser.GetBlogs(limit, blogs.all.offset, filters, blogsAll, errorConsole);
        GCTUser.GetBlogsByUser(limit, blogs.mine.offset, '', blogsMine, errorConsole);
        GCTUser.GetBlogsByColleagues(limit, blogs.colleagues.offset, blogsColleagues, errorConsole);
    }
    
    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#blog-name").val('');

        blogsReset();
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#blog-name").val();
        if( $("#blog-name").val() == "" ){
            filters = "";
        }

        blogsReset();
    });

    if( !filtersOpened ){
        GCTUser.GetBlogs(limit, blogs.all.offset, filters, blogsAll, errorConsole);
    }
    $$('#more-' + blogs.all.id).on('click', function (e) {
        GCTUser.GetBlogs(limit, blogs.all.offset, filters, blogsAll, errorConsole);
    });
    
    $$('#tab-' + blogs.mine.id).on('show', function (e) {
        if (!blogs.mine.loaded) {
            GCTUser.GetBlogsByUser(limit, blogs.mine.offset, '', blogsMine, errorConsole);
        }
    });
    $$('#more-' + blogs.mine.id).on('click', function (e) {
        GCTUser.GetBlogsByUser(limit, blogs.mine.offset, '', blogsMine, errorConsole);
    });

    $$('#tab-' + blogs.colleagues.id).on('show', function (e) {
        if (!blogs.colleagues.loaded) {
            GCTUser.GetBlogsByColleagues(limit, blogs.colleagues.offset, blogsColleagues, errorConsole);
        }
    });
    $$('#more-' + blogs.colleagues.id).on('click', function (e) {
        GCTUser.GetBlogsByColleagues(limit, blogs.colleagues.offset, blogsColleagues, errorConsole);
    });
    
    var refreshBlogs = $$(page.container).find('.pull-to-refresh-content');
    refreshBlogs.on('refresh', function (e) {
        $("#blog-name").val('');
        blogsReset();

        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="blog"]', function (e) {
    var focusNav = document.getElementById('page-blogs');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('bookmarks', function (page) {
    $$('#bookmarks-navbar-inner').html(GCTLang.txtGlobalNav('bookmarks'));
    var limit = 10;
    var filters = [];
    var filtersOpened = false;
    var bookmarks = {}; //objects for each tab's variables.
    bookmarks.all = listObject("bookmarks-all");
    bookmarks.colleagues = listObject("bookmarks-colleagues");
    bookmarks.mine = listObject("bookmarks-mine");

    function bookmarksAll(data) {
        var info = data.result;
        var content = '';
        if (bookmarks.all.loaded == true) { $(bookmarks.all.appendMessage).appendTo('#content-' + bookmarks.all.id); } else { bookmarks.all.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                content = GCTEach.Bookmark(value);
                $(content).hide().appendTo('#content-' + bookmarks.all.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + bookmarks.all.id).fadeIn(1000);
            $('#more-' + bookmarks.all.id).hide();
        }

        bookmarks.all.offset += limit;
        var focusNow = document.getElementById('focus-' + bookmarks.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function bookmarksColleagues(data) {
        var info = data.result;
        if (bookmarks.colleagues.loaded == true) { $(bookmarks.colleagues.appendMessage).appendTo('#content-' + bookmarks.colleagues.id); } else { bookmarks.colleagues.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Bookmark(value);
                $(content).hide().appendTo('#content-' + bookmarks.colleagues.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + bookmarks.colleagues.id).fadeIn(1000);
            $('#more-' + bookmarks.colleagues.id).hide();
        }
        bookmarks.colleagues.offset += limit;
        var focusNow = document.getElementById('focus-' + bookmarks.colleagues.id);
        if (focusNow) { focusNow.focus(); }
    }
    function bookmarksMine(data) {
        var info = data.result;
        if (bookmarks.mine.loaded == true) { $(bookmarks.mine.appendMessage).appendTo('#content-' + bookmarks.mine.id); } else { bookmarks.mine.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Bookmark(value);
                $(content).hide().appendTo('#content-' + bookmarks.mine.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + bookmarks.mine.id).fadeIn(1000);
            $('#more-' + bookmarks.mine.id).hide();
        }
        bookmarks.mine.offset += limit;
        var focusNow = document.getElementById('focus-' + bookmarks.mine.id);
        if (focusNow) { focusNow.focus(); }
    }
    function bookmarksReset() {
        $.each(bookmarks, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });
        GCTUser.GetBookmarks(limit, bookmarks.all.offset, filters, bookmarksAll, errorConsole);
        GCTUser.GetBookmarksByUserColleague(limit, bookmarks.colleagues.offset, filters, bookmarksColleagues, errorConsole);
        GCTUser.GetBookmarksByUser(limit, bookmarks.mine.offset, '', bookmarksMine, errorConsole);
    }
    
    $('#clear-filters').on('click', function () {
        filtersOpened = false;
        filters = {};
        $('#bookmark-filters').val('');
        $('#bookmark-name').val('');
        bookmarksReset();
    });

    $('#save-filters').on('click', function () {
        filtersOpened = true;
        filters['type'] = ""; //$("#bookmark-filters").val();
        filters['name'] = $("#bookmark-name").val();
        if ($("#bookmark-filters").val() == "" && $("#bookmark-name").val() == "") {
            filters = "";
        }
        bookmarksReset();
    });

    if (!filtersOpened) {
        GCTUser.GetBookmarks(limit, bookmarks.all.offset, filters, bookmarksAll, errorConsole);
        GCTUser.GetBookmarksByUserColleague(limit, bookmarks.colleagues.offset, filters, bookmarksColleagues, errorConsole);
        GCTUser.GetBookmarksByUser(limit, bookmarks.mine.offset, '', bookmarksMine, errorConsole);
    }


    $$('#more-' + bookmarks.all.id).on('click', function (e) {
        $('#focus-' + bookmarks.all.id).remove();
        GCTUser.GetBookmarks(limit, bookmarks.all.offset, filters, bookmarksAll, errorConsole);
    });
    $$('#more-' + bookmarks.colleagues.id).on('click', function (e) {
        $('#focus-' + bookmarks.colleagues.id).remove();
        GCTUser.GetBookmarksByUserColleague(limit, bookmarks.colleagues.offset, filters, bookmarksColleagues, errorConsole);
    });
    $$('#more-' + bookmarks.mine.id).on('click', function (e) {
        $('#focus-' + bookmarks.mine.id).remove();
        GCTUser.GetBookmarksByUser(limit, bookmarks.mine.offset, '', bookmarksMine, errorConsole);
    });

    var refreshBookmarks = $$(page.container).find('.pull-to-refresh-content');
    refreshBookmarks.on('refresh', function (e) {
        $('#bookmark-filters').val('');
        $('#bookmark-name').val('');
        bookmarksReset();
        myApp.pullToRefreshDone();
    });

});
$$(document).on('page:afteranimation', '.page[data-page="bookmarks"]', function (e) {
    var focusNav = document.getElementById('page-bookmarks');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('docs', function (page) {
    $$('#docs-navbar-inner').html(GCTLang.txtGlobalNav('docs'));
    var limit = 20;
    var filters = {};
    var filtersOpened = false;

    var docs = {};
    docs.all = listObject('docs-all');

    function docsAll(data) {
        var info = data.result;
        if (docs.all.loaded == true) { $(docs.all.appendMessage).appendTo('#content-' + docs.all.id); } else { docs.all.loaded = true; }

        if (info.length > 0) {
            $('#more-' + docs.all.id).show();
            $.each(info, function (key, value) {
                var content = GCTEach.Doc(value);
                $(content).hide().appendTo('#content-' + docs.all.id).fadeIn(1000);
            });
        } 
        if (info.length < limit) {
            $('#more-' + docs.all.id).hide();
            $(endOfContent).hide().appendTo('#content-' + docs.all.id).fadeIn(1000);
        }
        docs.all.offset += limit;
        var focusNow = document.getElementById('focus-' + docs.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function resetDocs() {
        $.each(docs, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });
        GCTUser.GetDocs(limit, docs.all.offset, filters, docsAll, errorConsole);
    }
    
    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#doc-name").val('');

        resetDocs();
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#doc-name").val();
        if( $("#doc-name").val() == "" ){
            filters = "";
        }

        resetDocs();
    });

    if( !filtersOpened ){
        GCTUser.GetDocs(limit, docs.all.offset, filters, docsAll, errorConsole);
    }
    
    $$('#more-' + docs.all.id).on('click', function (e) {
        $('#focus-' + docs.all.id).remove();
        GCTUser.GetDocs(limit, docs.all.offset, filters, docsAll, errorConsole);
    });

    var refreshDocs = $$(page.container).find('.pull-to-refresh-content');
    refreshDocs.on('refresh', function (e) {
        $("#doc-name").val('');
        resetDocs();
        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="docs"]', function (e) {
    var focusNav = document.getElementById('page-docs');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('events', function (page) {
    $$('#events-navbar-inner').html(GCTLang.txtGlobalNav('event-calendar'));
    var eventsArray = [];

    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format',
        dateFormat: 'DD, MM dd, yyyy'
    });
    // With multiple values
    var calendarMultiple = myApp.calendar({
        input: '#ks-calendar-multiple',
        dateFormat: 'M dd yyyy',
        multiple: true
    });
    
    // Inline with custom toolbar
    var monthNames = "";
    if( GCTLang.IsEnglish() ){
        monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    } else {
        monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre' , 'octobre', 'novembre', 'décembre'];
    }

    var eventCalendar = "";
    var limit = 10;
    var counter = 1;
    var filtersOpened = false;

    var events = {};
    events.all = listObject("events-all");
    events.colleagues = listObject("events-colleagues");
    events.mine = listObject("events-mine");
    function eventsAll(data) {
        var info = data.result;
        if (events.all.loaded == true) { $(events.all.appendMessage).appendTo('#content-' + events.all.id); } else { events.all.loaded = true; }

        if (info.length > 0) {
            $('#more-' + events.all.id).show();
            $.each(info, function (key, value) {
                var date = (value.startDate).split(" ")[0];
                var split = date.split("-");
                var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                eventsArray.push(day)
                var content = GCTEach.Event(value);
                $(content).hide().appendTo('#content-' + events.all.id).fadeIn(1000);
                counter++;
            });

            $('#events-calendar').html('');
            eventCalendar = myApp.calendar({
                container: '#events-calendar',
                value: [new Date()],
                events: eventsArray,
                weekHeader: false,
                header: false,
                footer: false,
                toolbarTemplate:
                    '<div class="toolbar calendar-custom-toolbar">' +
                    '<div class="toolbar-inner">' +
                    '<div class="left">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onOpen: function (p) {
                    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                    $$('.calendar-custom-toolbar .left .link').on('click', function () {
                        eventCalendar.prevMonth();
                    });
                    $$('.calendar-custom-toolbar .right .link').on('click', function () {
                        eventCalendar.nextMonth();
                    });
                },
                onMonthYearChangeStart: function (p, year, month) {
                    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                },
                onDayClick: function (p, dayContainer, year, month, day) {
                    var date = $(dayContainer).data('date');
                    if ($("#event-" + date).length > 0) {
                        $$('.page-content').scrollTop($$("#event-" + date).offset().top, 300);
                    }
                }
            });
        }
        if (info.length < limit) {
            $('#more-' + events.all.id).hide();
            $(endOfContent).hide().appendTo('#content-' + events.all.id).fadeIn(1000);
        }
        events.all.offset += limit;
        var focusNow = document.getElementById('focus-' + events.all.id);
        if (focusNow) { focusNow.focus(); }

    }

    function eventsMine(data) {
        var info = data.result;
        if (events.mine.loaded == true) { $(events.mine.appendMessage).appendTo('#content-' + events.mine.id); } else { events.mine.loaded = true; }

        if (info.length > 0) {
            $('#more-' + events.mine.id).show();
            $.each(info, function (key, value) {
                var date = (value.startDate).split(" ")[0];
                var split = date.split("-");
                var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                eventsArray.push(day)
                var content = GCTEach.Event(value);
                $(content).hide().appendTo('#content-' + events.mine.id).fadeIn(1000);
                counter++;
            });

            $('#events-calendar').html('');
            eventCalendar = myApp.calendar({
                container: '#events-calendar',
                value: [new Date()],
                events: eventsArray,
                weekHeader: false,
                header: false,
                footer: false,
                toolbarTemplate:
                    '<div class="toolbar calendar-custom-toolbar">' +
                    '<div class="toolbar-inner">' +
                    '<div class="left">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onOpen: function (p) {
                    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                    $$('.calendar-custom-toolbar .left .link').on('click', function () {
                        eventCalendar.prevMonth();
                    });
                    $$('.calendar-custom-toolbar .right .link').on('click', function () {
                        eventCalendar.nextMonth();
                    });
                },
                onMonthYearChangeStart: function (p, year, month) {
                    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                },
                onDayClick: function (p, dayContainer, year, month, day) {
                    var date = $(dayContainer).data('date');
                    if ($("#event-" + date).length > 0) {
                        $$('.page-content').scrollTop($$("#event-" + date).offset().top, 300);
                    }
                }
            });
        }
        if (info.length < limit) {
            $('#more-' + events.mine.id).hide();
            $(endOfContent).hide().appendTo('#content-' + events.mine.id).fadeIn(1000);
        }
        events.mine.offset += limit;
        var focusNow = document.getElementById('focus-' + events.mine.id);
        if (focusNow) { focusNow.focus(); }

    }

    function eventsColleagues(data) {
        var info = data.result;
        if (events.colleagues.loaded == true) { $(events.colleagues.appendMessage).appendTo('#content-' + events.colleagues.id); } else { events.colleagues.loaded = true; }

        if (info.length > 0) {
            $('#more-' + events.colleagues.id).show();
            $.each(info, function (key, value) {
                var date = (value.startDate).split(" ")[0];
                var split = date.split("-");
                var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                eventsArray.push(day)
                var content = GCTEach.Event(value);
                $(content).hide().appendTo('#content-' + events.colleagues.id).fadeIn(1000);
                counter++;
            });

            $('#events-calendar').html('');
            eventCalendar = myApp.calendar({
                container: '#events-calendar',
                value: [new Date()],
                events: eventsArray,
                weekHeader: false,
                header: false,
                footer: false,
                toolbarTemplate:
                    '<div class="toolbar calendar-custom-toolbar">' +
                    '<div class="toolbar-inner">' +
                    '<div class="left">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onOpen: function (p) {
                    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                    $$('.calendar-custom-toolbar .left .link').on('click', function () {
                        eventCalendar.prevMonth();
                    });
                    $$('.calendar-custom-toolbar .right .link').on('click', function () {
                        eventCalendar.nextMonth();
                    });
                },
                onMonthYearChangeStart: function (p, year, month) {
                    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                },
                onDayClick: function (p, dayContainer, year, month, day) {
                    var date = $(dayContainer).data('date');
                    if ($("#event-" + date).length > 0) {
                        $$('.page-content').scrollTop($$("#event-" + date).offset().top, 300);
                    }
                }
            });
        }
        if (info.length < limit) {
            $('#more-' + events.colleagues.id).hide();
            $(endOfContent).hide().appendTo('#content-' + events.colleagues.id).fadeIn(1000);
        }
        events.colleagues.offset += limit;
        var focusNow = document.getElementById('focus-' + events.colleagues.id);
        if (focusNow) { focusNow.focus(); }

    }
    function eventsReset() {
        
        $.each(events, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });
        GCTUser.GetEvents(from, to, limit, events.all.offset, eventsAll, errorConsole);
        GCTUser.GetEventsByUser(from, to, limit, events.mine.offset, eventsMine, errorConsole);
        GCTUser.GetEventsByColleagues(from, to, limit, events.colleagues.offset, eventsColleagues, errorConsole);

    }
    
    var from = new Date().toString();
    var to = "";
    // var to = from.setMonth(from.getMonth() + 3);

    var toFilter = myApp.calendar({
        input: '#events-from',
    });
    var fromFilter = myApp.calendar({
        input: '#events-to',
    });

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        $("#events-from").val('');
        $("#events-to").val('');
        from = new Date().toString();
        to = "";

        eventsReset();
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        eventsArray = [];
        if( $("#events-from").val() != "" ){
            from = $("#events-from").val();
            from = new Date(from).toString();
        }
        if( $("#events-to").val() != "" ){
            to = $("#events-to").val();
            to = new Date(to).toString();
        }
        
        eventsReset();

    });

    if (!filtersOpened) {
        GCTUser.GetEvents(from, to, limit, events.all.offset, eventsAll, errorConsole);
    }
console.log(events.mine.id);
    $$('#more-' + events.all.id).on('click', function (e) {
        $('#focus-' + events.all.id).remove();
        GCTUser.GetEvents(from, to, limit, events.all.offset, eventsAll, errorConsole);
    });
    $$('#tab-' + events.mine.id).on('show', function (e) {
        if (!events.mine.loaded) {
            GCTUser.GetEventsByUser(limit, events.mine.offset, '', eventsMine, errorConsole);
        }
    });
    $$('#more-' + events.mine.id).on('click', function (e) {
        console.log('test');
        GCTUser.GetEventsByUser(limit, events.mine.offset, '', eventsMine, errorConsole);
    });

    $$('#tab-' + events.colleagues.id).on('show', function (e) {
        if (!events.colleagues.loaded) {
            GCTUser.GetEventsByColleagues(limit, events.colleagues.offset, '' ,eventsColleagues, errorConsole);
        }
    });
    $$('#more-' + events.colleagues.id).on('click', function (e) {
        GCTUser.GetEventsByColleagues(limit, events.colleagues.offset, eventsColleagues, errorConsole);
    });
    var refreshEvents = $$(page.container).find('.pull-to-refresh-content');
    refreshEvents.on('refresh', function (e) {
        $("#event-name").val('');
        eventsReset();

        myApp.pullToRefreshDone();
    });
    
});
$$(document).on('page:afteranimation', '.page[data-page="events"]', function (e) {
    var focusNav = document.getElementById('page-event-calendar');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('opportunities', function (page) {
    $$('#opportunities-navbar-inner').html(GCTLang.txtGlobalNav('opportunities-platform'));
    var limit = 20;
    var filters = {};
    var filtersOpened = false;

    var opportunities = {};
    opportunities.all = listObject('opportunities-all');

    function opportunitiesAll(data) {
        var info = data.result;
        if (opportunities.all.loaded == true) { $(opportunities.all.appendMessage).appendTo('#content-' + opportunities.all.id); } else { opportunities.all.loaded = true; }

        if (info.length > 0) {
            $('#more-' + opportunities.all.id).show();
            $.each(info, function (key, value) {
                var content = GCTEach.Opportunity(value);
                $(content).hide().appendTo('#content-' + opportunities.all.id).fadeIn(1000);
            });
        }
        if (info.length < limit) {
            $('#more-' + opportunities.all.id).hide();
            $(endOfContent).hide().appendTo('#content-' + opportunities.all.id).fadeIn(1000);
        }
        opportunities.all.offset += limit;
        var focusNow = document.getElementById('focus-' + opportunities.all.id);
        if (focusNow) { focusNow.focus(); }
    }
    function opportunitiesReset() {
        $.each(opportunities, function (key, value) {
            value.offset = 0;
            value.loaded = false;
            $('#content-' + value.id).html('');
            $('#more-' + value.id).show();
        });

        GCTUser.GetOpportunities(limit, opportunities.all.offset, filters, opportunitiesAll, errorConsole);
    }

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#opportunity-filters").val('');
        $("#opportunity-name").val('');

        opportunitiesReset();
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['type'] = $("#opportunity-filters").val();
        filters['name'] = $("#opportunity-name").val();
        if( $("#opportunity-filters").val() == "" && $("#opportunity-name").val() == "" ){
            filters = "";
        }
        opportunitiesReset();
    });

    if( !filtersOpened ){
        GCTUser.GetOpportunities(limit, opportunities.all.offset, filters, opportunitiesAll, errorConsole);
    }
    
    $$('#more-' + opportunities.all.id).on('click', function (e) {
        $('#focus-' + opportunities.all.id).remove();
        GCTUser.GetOpportunities(limit, opportunities.all.offset, filters, opportunitiesAll, errorConsole);
    });

    var refreshOpportunities = $$(page.container).find('.pull-to-refresh-content');
    refreshOpportunities.on('refresh', function (e) {
        opportunitiesReset();
        myApp.pullToRefreshDone();
    });
});
$$(document).on('page:afteranimation', '.page[data-page="opportunities"]', function (e) {
    var focusNav = document.getElementById('page-opportunities-platform');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('new-opportunity', function (page) {
    $$('#new-opportunities-navbar-inner').html(GCTLang.txtGlobalNav('new-opportunities-platform')); 
    
    $$('.next-form1').on('click', function (e) {
        var formData = myApp.formToData('#opt-form1');
        var agree = formData['agree'];
        var message_validation = '';
        let arr = ['name', 'email'];
        arr.forEach((num, index) => {
            console.log(num);
            if(formData[num] === ''){
                message_validation += GCTLang.Trans("validation_"+ num) + '<br>';
            }
        });

        if(agree.length === 0){
            message_validation += GCTLang.Trans("validation_agree") + '<br>';
        }
        if (message_validation === '' ) {
            var selected=$$(this).attr('data-my-tab-id');
            myApp.showTab(selected);
            formData['agree'] = 'YES';
            GCTUser.CreateOpportinities1(formData, function (data) {
                var result = data.result;
                console.log(result);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });

        } else {
            myApp.alert(message_validation);
        }
    });

    $$('.next-form2').on('click', function (e) {

        var formData = myApp.formToData('#opt-form2');
        var message_validation = '';
        let arr = ['title','offert', 'type', 'start_date', 'deadline'];
        arr.forEach((num, index) => {
            console.log(num);
            if(formData[num] === ''){
                message_validation += GCTLang.Trans("validation_"+ num) + '<br>';
            }
        });
        if (message_validation === '' ) {
            var selected=$$(this).attr('data-my-tab-id');
            myApp.showTab(selected);
            GCTUser.CreateOpportinities2(formData, function (data) {
                var selected=$$(this).attr('tab2');
                mainView.router.load({ url: 'NewOpportunity.html',context:{myTab:'#tab2'} });
                var result = data.result;
                console.log(result);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });

        } else {
           
        }
    });

    $$('.next-form3').on('click', function (e) {
        var formData = myApp.formToData('#opt-form3');
        var message_validation = '';
        let arr = ['hours','location'];
        arr.forEach((num, index) => {
            if(formData[num] === ''){
                message_validation += GCTLang.Trans("validation_"+ num) + '<br>';
            }
        });
        if (message_validation === '' ) {
            if(formData['remotly'].lenght != 0){
                formData['remotly'] = 'on';
            }else{ formData['remotly'] == '';}
            GCTUser.CreateOpportinities3(formData, function (data) {
                var selected=$$(this).attr('tab2');
                mainView.router.load({ url: 'NewOpportunity.html',context:{myTab:'#tab2'} });
                var result = data.result;
                console.log(result);
                myApp.alert(result, 'Congrat');

            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                myApp.alert(textStatus, 'Error');
            });

        } else {
            myApp.alert(message_validation);
        }
    });
    $('#group').hide();
    $('#level').hide();
    $("#type").change(function() {
        var type = $(this).val();
        if (type == 'Casual Work' || type == 'Student Integration') {
            $('#group').show();
            $('#level').show();
        }else{
            $('#group').hide();
            $('#level').hide();
        }
    });
});
$$(document).on('page:afteranimation', '.page[data-page="new-opportunity"]', function (e) {
    var focusNav = document.getElementById('page-new-opportunities-platform');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('profile', function (page) {
    var guid = page.query.guid; // Checks guid of page, as any link to profile should include the target guid
    var profile_limit = 12;
    $("#profile-navbar-inner").attr('id', "profile-navbar-inner-" + guid);
    $$("#profile-navbar-inner-" + guid).html(GCTLang.txtGlobalNav('profile'));
    var user = {};
    user.activity = listObject('user-activity-' + guid);
    user.bookmarks = listObject('user-bookmarks-' + guid);
    user.wires = listObject('user-wires-' + guid);
    user.blogs = listObject('user-blogs-' + guid);
    user.colleagues = listObject('user-colleagues-' + guid);
    user.groups = listObject('user-groups-' + guid);

    /* Change needed ids to be guid specific */
    $("#TabLink-profile").attr('id', "TabLink-profile-" + guid);
    $("#TabLink-groups").attr('id', "TabLink-groups-" + guid);
    $("#TabLink-profile-" + guid).attr('href', "#tab-user-profile-" + guid);
    $("#TabLink-groups-" + guid).attr('href', "#tab-user-groups-" + guid);

    $("#tab-user-profile").attr('id', "tab-user-profile-" + guid);
    $("#tab-user-colleagues").attr('id', "tab-" + user.colleagues.id);
    $("#tab-user-activity").attr('id', "tab-" + user.activity.id);
    $("#tab-user-bookmarks").attr('id', "tab-" + user.bookmarks.id);
    $("#tab-user-groups").attr('id', "tab-" + user.groups.id);
    $("#tab-user-blogs").attr('id', "tab-" + user.blogs.id);
    $("#tab-user-wires").attr('id', "tab-" + user.wires.id);

    $("#profile-menu").attr('id', "profile-menu-" + guid);
    $("#user-icon").attr('id', "user-icon-" + guid);
    $("#user-title").attr('id', "user-title-" + guid);
    $("#user-department").attr('id', "user-department-" + guid);
    $("#user-info-list").attr('id', "user-info-list-" + guid);
    $("#wire-num").attr('id', "wire-num-" + guid);
    $("#blog-num").attr('id', "blog-num-" + guid);
    $("#colleague-num").attr('id', "colleague-num-" + guid);
    $("#social-media").attr("id", "social-media-" + guid);

    $('#user-groups').attr("id", "content-" + user.groups.id);
    $("#content-user-activity").attr("id", "content-" + user.activity.id);
    $("#more-user-activity").attr("id", "more-" + user.activity.id);
    $("#content-user-bookmarks").attr("id", "content-" + user.bookmarks.id);
    $("#more-user-bookmarks").attr("id", "more-" + user.bookmarks.id);
    $('#content-user-wires').attr("id", "content-" + user.wires.id);
    $('#more-user-wires').attr("id", "more-" + user.wires.id);
    $("#content-user-blogs").attr("id", "content-" + user.blogs.id);
    $("#more-user-blogs").attr("id", "more-" + user.blogs.id);
    $("#content-user-colleagues").attr("id", "content-" + user.colleagues.id);
    $("#more-user-colleagues").attr("id", "more-" + user.colleagues.id);

    function userActivity(data3) {
        var activityData = data3.result;

        if (user.activity.loaded == true) { $(user.activity.appendMessage).appendTo('#content-' + user.activity.id); } else { user.activity.loaded = true; }

        if (activityData.length > 0) {
            $(activityData).each(function (key, value) {
                var content = GCTEach.Activity(value);
                $(content).appendTo('#content-' + user.activity.id);
            });
        }
        if (activityData.length < profile_limit) {
            $(endOfContent).appendTo('#content-' + user.activity.id);
            $('#more-' + user.activity.id).hide();
        }
        user.activity.offset += profile_limit;
        var focusNow = document.getElementById('focus-' + user.activity.id);
        if (focusNow) { focusNow.focus(); }
    }
    function userBookmarks(data) {
        var info = data.result;
        if (user.bookmarks.loaded == true) { $(user.bookmarks.appendMessage).appendTo('#content-' + user.bookmarks.id); } else { user.bookmarks.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Bookmark(value);
                $(content).appendTo('#content-' + user.bookmarks.id);
            });
        }
        if (info.length < profile_limit) {
            $(endOfContent).appendTo('#content-' + user.bookmarks.id);
            $('#more-' + user.bookmarks.id).hide();
        }
        user.bookmarks.offset += profile_limit;
        var focusNow = document.getElementById('focus-' + user.bookmarks.id);
        if (focusNow) { focusNow.focus(); }
    }
    function userWires(data) {
        var info = data.result;
        if (user.wires.loaded == true) { $(user.wires.appendMessage).appendTo('#content-' + user.wires.id); } else { user.wires.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Wire(value);
                $(content).hide().appendTo('#content-' + user.wires.id).fadeIn(1000);
            });
        }
        if (info.length < profile_limit) {
            $(endOfContent).hide().appendTo('#content-' + user.wires.id).fadeIn(1000);
            $('#more-' + user.wires.id).hide();
        }
        user.wires.offset += profile_limit;
        var focusNow = document.getElementById('focus-' + user.wires.id);
        if (focusNow) { focusNow.focus(); }
    }
    function userBlogs(data) {
        var info = data.result;
        if (user.blogs.loaded == true) { $(user.blogs.appendMessage).appendTo('#content-' + user.blogs.id); } else { user.blogs.loaded = true; }


        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Blog(value);
                $(content).hide().appendTo('#content-' + user.blogs.id).fadeIn(1000);
            });
        }
        if (info.length < profile_limit) {
            $(endOfContent).hide().appendTo('#content-' + user.blogs.id).fadeIn(1000);
            $('#more-' + user.blogs.id).hide();
        }
        user.blogs.offset += profile_limit;
        var focusNow = document.getElementById('focus-' + user.blogs.id);
        if (focusNow) { focusNow.focus(); }
    }
    function userColleagues(data) {
        var info = data.result;
        if (user.colleagues.loaded == true) { $(user.colleagues.appendMessage).appendTo('#content-' + user.colleagues.id); } else { user.colleagues.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var content = GCTEach.Member(value);
                $(content).hide().appendTo('#content-' + user.colleagues.id).fadeIn(1000);
            });
        }
        if (info.length < profile_limit) {
            var content = endOfContent;
            $(content).hide().appendTo('#content-' + user.colleagues.id).fadeIn(1000);
            $('#more-' + user.colleagues.id).hide();
        }
        user.colleagues.offset += profile_limit;
        var focusNow = document.getElementById('focus-' + user.colleagues.id);
        if (focusNow) { focusNow.focus(); }
    }
    
    /* Fill profile tab of user profile. */
    GCTUser.GetUserProfile(guid, function (data) {
        var profileData = data.result;
        if (typeof profileData == "string") {
            myApp.alert(GCTLang.Trans("couldnotfindprofile"));
            return;
        }

        var isOwnProfile = false;
        if (profileData.displayName == GCTUser.DisplayName()) {
            isOwnProfile = true;
        }

        var colleagueButton = (profileData.friend) ? '<a href="#" class="button button-fill button-raised" data-guid="' + profileData.id + '" onclick="GCTUser.RemoveColleague(this);">' + GCTLang.Trans("remove-colleague") + '</a>' : '<a href="#" class="button button-fill button-raised" data-guid="' + profileData.id + '" onclick="GCTUser.AddColleague(this);">' + GCTLang.Trans("add-colleague") + '</a>';

        var profile = '';
        var content = '';
        var listItem = '';

        $("#user-icon-" + guid).attr('src', profileData.iconURL);
        $("#user-icon-" + guid).attr('aria-label', GCTLang.Trans("user-avatar"));
        $("#user-title-" + guid).html(profileData.displayName).text();
        $("#user-department-" + guid).html(profileData.department).text();
        
        if (!isOwnProfile) {
            var content ='<div class="col-50"><a href="#" class="button button-fill button-raised" data-name="' + profileData.displayName + '" data-guid="' + profileData.id + '" onclick="GCTUser.NewMessage(this);">' + GCTLang.Trans("message") + '</a></div>'
                + '<div class="col-50">' + colleagueButton + '</div>'
                // + '<div class="col-33"><a href="#" class="button button-fill button-raised" data-guid="' + profileData.displayName + '" onclick="GCTUser.BlockUser(this);">' + GCTLang.Trans("blockuser") + '</a></div>'
                + '</div>';
            $("#action-buttons").html(content).text();
        }

        profile = '<ul>';
        listItem = '<div class="bolder-title">' + GCTLang.Trans('name') + '</div>'
            + '<div class="item-text large norm-text">' + profileData.displayName + '</div>';
        profile += GCTLang.txtUserList(listItem);

        if (profileData.hasOwnProperty("jobTitle") && profileData.jobTitle !== null && profileData.jobTitle !== "") {
            listItem = '<div class="item-text large bolder-title">' + GCTLang.Trans('job-title') + '</div>'
                + '<div class="item-text large norm-text">' + profileData.jobTitle + '</div>';
            profile += GCTLang.txtUserList(listItem);
        }

        listItem = '<div class="bolder-title">' + GCTLang.Trans('email') + '</div>'
            + '<div class="item-text large norm-text"><a class="external" href="mailto:' + profileData.email + '">' + profileData.email + '</a></div>';
        profile += GCTLang.txtUserList(listItem);

        if (profileData.hasOwnProperty("telephone") && profileData.telephone !== null && profileData.telephone !== "") {
            listItem ='<div class="bolder-title">' + GCTLang.Trans('phone') + '</div>'
                + '<div class="item-text large norm-text"><a class="external" href="tel:' + profileData.telephone + '">' + profileData.telephone + '</a></div>';
            profile += GCTLang.txtUserList(listItem);
        }
        if (profileData.hasOwnProperty("about_me") && profileData.about_me !== null && profileData.about_me !== "") {
            profile += '<li class="align-top">'
                + '<div class="item-content">'
                + '<div class="item-inner">'
                + '<div class="bolder-title">' + GCTLang.Trans('about-me') + '</div>'
                + '<div class="item-text large norm-text" onclick="ToggleAllText(this);">' + profileData.about_me + '</div>'
                + '</div>'
                + '</div>'
                + '</li>';
        }

        if (profileData.hasOwnProperty("education") && profileData.education !== null && profileData.education !== "") {
            profile += '<hr><li class="align-top">'
                + '<div class="item-content">'
                + '<div class="item-inner">'
                + '<div class="bolder-head-title">' + GCTLang.Trans('education') + '</div><hr>';
            $(profileData.education).each(function (key, value) {
                var looper = 0; //dynamic variable counter
                while (value["item_" + looper]) {
                    var school = (value["item_" + looper].school_name) ? value["item_" + looper].school_name : "";
                    var degree = (value["item_" + looper].degree) ? value["item_" + looper].degree : "";
                    var fieldOfStudy = (value["item_" + looper].field_of_study) ? value["item_" + looper].field_of_study : "";
                    var startDate = (value["item_" + looper].start_date) ? value["item_" + looper].start_date : "";
                    var endDate = (value["item_" + looper].end_date) ? value["item_" + looper].end_date : "";
                    profile += GCTLang.txtProfileExp({
                        title: school,
                        subtitle: degree + " - " +  fieldOfStudy,
                        text: "",
                        startDate: startDate,
                        endDate: endDate
                    });
                    looper++;
                }
            });
            profile += '</div>'
                + '</div>'
                + '</li>';
        };

        if (profileData.hasOwnProperty("experience") && profileData.experience !== null && profileData.experience !== "") {
            profile += '<hr><li class="align-top">'
                + '<div class="item-content">'
                + '<div class="item-inner" onclick="ToggleAllText(this);">'
                + '<div class="bolder-head-title">' + GCTLang.Trans('experience') + '</div><hr>';
            $(profileData.experience).each(function (key, value) {
                var looper = 0; //dynamic variable counter, sigh
                while (value["item_" + looper]) {
                    var job_title = (value["item_" + looper].job_title) ? value["item_" + looper].job_title : "";
                    var organization = (value["item_" + looper].organization) ? value["item_" + looper].organization : "";
                    var responsibilities = (value["item_" + looper].responsibilities) ? value["item_" + looper].responsibilities : "";
                    var startDate = (value["item_" + looper].start_date) ? value["item_" + looper].start_date : "";
                    var endDate = (value["item_" + looper].end_date) ? value["item_" + looper].end_date : "";
                    profile += GCTLang.txtProfileExp({
                        title: job_title,
                        subtitle: organization,
                        text: responsibilities,
                        startDate: startDate,
                        endDate: endDate
                    });
                    looper++;
                }
            });
            profile += '</div>'
                + '</div>'
                + '</li>';
        };

        if (profileData.hasOwnProperty("skills") && profileData.skills !== null && profileData.skills !== "") {
            profile += '<hr><li class="align-top">'
                + '<div class="item-content">'
                + '<div class="item-inner">'
                + '<div class="bolder-head-title">' + GCTLang.Trans('skills') + '</div><hr>';
            $(profileData.skills).each(function (key, value) {
                var looper = 0; //dynamic variable counter
                while (value["item_" + looper]) {
                    var skill = (value["item_" + looper].skill) ? value["item_" + looper].skill : "";
                    profile += '<div class="item-text large" onclick="ToggleAllText(this);">' + skill + '</div>';
                    looper++;
                }
            });
            profile += '</div>'
                + '</div>'
                + '</li>';
        };

        profile += "</ul>";
        $("#user-info-list-"+guid).html(profile).text();

        $("#wire-num-" + guid).html(profileData.wires).text();
        $("#blog-num-" + guid).html(profileData.blogs).text();
        $("#colleague-num-" + guid).html(profileData.colleagues).text();

        if (profileData.hasOwnProperty("links")) {
            var links = '<div class="center">' + GCTLang.Trans('social-media') + '</div>'
                + '<ul class="socials">';
            if (profileData.links.hasOwnProperty("github")) { links += '<li><a id="user-github" aria-label="Github" href="' + profileData.links.github + '" class="gh external"><i class="fa fa-github"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("twitter")) { links += '<li><a id="user-twitter" aria-label="Twitter" href="' + profileData.links.twitter + '" class="tw external"><i class="fa fa-twitter"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("linkedin")) { links += '<li><a id="user-linkedin" aria-label="Linkedin" href="' + profileData.links.linkedin + '" class="li external"><i class="fa fa-linkedin"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("facebook")) { links += '<li><a id="user-facebook" aria-label="Facebook" href="' + profileData.links.facebook + '" class="fb external"><i class="fa fa-facebook"></i></a></li>'; }
            $("#social-media-" + guid).html(links).text();
        }
        
    }, function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });

    /* Generate the popover drop down for user profile navigation on click */
    $("#profile-menu-" + guid).on('click', function (e) {
        var popoverHTML = '<div class="popover pop-profile-menu">'
            + '<span id="focus-tabs" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0">' + GCTLang.Trans('more-tab-menu-opened') + '</span>'
            + '<div class="popover-inner">'
            + '<div class="list-block">'
            + '<ul aria-labelledby="focus-tabs">';
        
        popoverHTML += '<li><a id="TabLink-colleagues-' + guid + '" href="#tab-user-colleagues-' + guid + '" class="button tab-link close-popover">'+ GCTLang.Trans("colleagues") +'</a></li>';
        popoverHTML += '<li><a id="TabLink-wires-' + guid + '" href="#tab-user-wires-' + guid + '" class="button tab-link close-popover">'+ GCTLang.Trans("wires") +'</a></li>';
        popoverHTML += '<li><a id="TabLink-blogs-' + guid + '" href="#tab-user-blogs-' + guid + '" class="button tab-link close-popover">'+ GCTLang.Trans("blogs") +'</a></li>';
        popoverHTML += '<li><a id="TabLink-activity-' + guid + '" href="#tab-user-activity-' + guid + '" class="button tab-link close-popover">'+ GCTLang.Trans("activity") +'</a></li>';
        popoverHTML += '<li><a id="TabLink-bookmarks-' + guid + '" href="#tab-user-bookmarks-' + guid +'" class="button tab-link close-popover">'+ GCTLang.Trans("bookmarks") +'</a></li>';
        
        
        popoverHTML += '<li><a href="#" id="close-more-tabs" class="button close-popover">' + GCTLang.Trans("close") + '</a></li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '</div>';
        myApp.popover(popoverHTML, this);
        var focusNow = document.getElementById('focus-tabs');
        if (focusNow) { focusNow.focus(); }
        $$('#close-more-tabs').on('click', function (e) {
            var focusClose = document.getElementById('profile-menu-'+guid);
            if (focusClose) { focusClose.focus(); }
        });
    });

    $$('#tab-user-groups-' + guid).on('show', function (e) {
        if (!user.groups.loaded) {
            user.groups.loaded = true;
            GCTUser.GetUserGroups(guid, function (data2) {
                var groupData = data2.result;

                var groups = "";
                $(groupData).each(function (key, value) {
                    // Removes HTML components from Blog
                    var text = (value.description !== null) ? value.description : "";

                    var members = (value.count > 0) ? value.count + (value.count == 1 ? " " + GCTLang.Trans("member") : " " + GCTLang.Trans("members")) : "";
                    groups += "<li><a class='item-link item-content close-popup' data-guid='" + value.guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>"
                        + "<div class='item-inner'>"
                        + "<div class='item-title-row no-padding-right'>"
                        + "<div class='item-title reg-text'>" + value.name + "</div>"
                        + "<div class='item-after'>" + members + "</div>"
                        + "</div>"
                        + "<div class='row ptm'>"
                        + "<div class='col-20'><img src='" + value.iconURL + "' width='50' alt='" + value.name + "'></div>"
                        + "<div class='col-80 item-text more_text'>" + text.trunc(500) + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</a></li>";
                });

                $("#content-" + user.groups.id).html(groups);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        } 
    });
    
    $$('#tab-' + user.activity.id).on('show', function (e) {
        if (!user.activity.loaded) {
            GCTUser.GetUserActivity(guid, profile_limit, user.activity.offset, userActivity, errorConsole);
        }
    });
    $$('#more-' + user.activity.id).on('click', function (e) {
        $('#focus-' + user.activity.id).remove();
        GCTUser.GetUserActivity(guid, profile_limit, user.activity.offset, userActivity, errorConsole);
    });

    $$('#tab-' + user.bookmarks.id).on('show', function (e) {
        if (user.bookmarks.loaded == false) {
            GCTUser.GetBookmarksByUser(profile_limit, user.bookmarks.offset, guid, userBookmarks, errorConsole);
        }
    });
    $$('#more-' + user.bookmarks.id).on('click', function (e) {
        $('#focus-' + user.bookmarks.id).remove();
        GCTUser.GetBookmarksByUser(profile_limit, user.bookmarks.offset, guid, userBookmarks, errorConsole);
    });

    $$('#tab-' + user.wires.id).on('show', function (e) {
        if (user.wires.loaded == false) {
            GCTUser.GetWiresByUser(guid, profile_limit, user.wires.offset, userWires, errorConsole);
        }
    });
    $$('#more-' + user.wires.id).on('click', function (e) {
        $('#focus-' + user.wires.id).remove();
        GCTUser.GetWiresByUser(guid, profile_limit, user.wires.offset, userWires, errorConsole);
    });

    $$('#tab-' + user.blogs.id).on('show', function (e) {
        if (user.blogs.loaded == false) {
            GCTUser.GetBlogsByUser(profile_limit, user.blogs.offset, guid, userBlogs, errorConsole);
        }
    });
    $$('#more-' + user.blogs.id).on('click', function (e) {
        $('#focus-' + user.blogs.id).remove();
        GCTUser.GetBlogsByUser(profile_limit, user.blogs.offset, guid, userBlogs, errorConsole);
    });

    $$('#tab-' + user.colleagues.id).on('show', function (e) {
        if (!user.colleagues.loaded) {
            GCTUser.GetMembersByUserColleague(guid, profile_limit, user.colleagues.offset, '', userColleagues, errorConsole);
        }
    });
    $$('#more-' + user.colleagues.id).on('click', function (e) {
        $('#focus-' + user.colleagues.id).remove();
        GCTUser.GetMembersByUserColleague(guid, profile_limit, user.colleagues.offset, '', userColleagues, errorConsole);
    });

});
$$(document).on('page:afteranimation', '.page[data-page="profile"]', function (e) {
    var focusOld = document.getElementById('page-profile-old');
    if (focusOld) {
        var focusID = document.getElementById('page-profile');
        if (focusID) { $(focusID).attr('id', 'page-profile-temp'); }
        $(focusOld).attr('id', 'page-profile');
        var focusTemp = document.getElementById('page-profile-temp');
        if (focusTemp) { $(focusTemp).attr('id', 'page-profile-old'); }
    }
    var focusCurrent = document.getElementById('page-profile-current');
    if (focusCurrent) { $(focusCurrent).attr('id', 'page-profile-old'); }
    var focusNav = document.getElementById('page-profile');
    if (focusNav) { focusNav.focus(); $(focusNav).attr('id', 'page-profile-current');}
});


myApp.onPageInit('entity', function (page) {
    var guid = page.query.guid;
    var type = page.query.type;
    var limit = 10;
    var offset = 0;
    $("#comments-more").hide();

    console.log(guid + ' ' + type);

    switch (type) {
        case "gccollab_blog_post":
            GCTUser.GetBlog(guid, function (data) {
                var blog = data.result;
                var content = "";
                $(blog).each(function (key, value) {
                    // Removes HTML components from Blog
                    var text = (value.description !== null) ? value.description : "";
                    if (value.groupURL.indexOf("/groups/profile/") > -1) {
                        var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
                    } else {
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = " <a class='link' onclick='GCT.SiteLink(this);' data-type='gccollab_blog_post' href='" + value.url + "'>" + GCTLang.Trans("web-view") + "</a>";

                    content += GCTLang.txtBlog({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        group: group,
                        description: text,
                        title: value.title,
                        all_text: "all_text",
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        type: "gccollab_blog_post",
                        replied: replied,
                        liked: liked,
                        likes: likes
                    });
                });

                $('#entity-title').html(GCTLang.Trans("blog"));
                $(content).hide().appendTo('#entity-main').fadeIn(500);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
            break;

        case "gccollab_discussion_post":
            GCTUser.GetDiscussion(guid, function (data) {
                var discussion = data.result;
                var content = "";
                $(discussion).each(function (key, value) {
                    if (value.subtype == "groupforumtopic") {
                        // Removes HTML components from Discussion
                        var text = (value.description !== null) ? value.description : "";
                        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                        var replied = (value.replied) ? "replied" : "";
                        var liked = (value.liked) ? "liked" : "";
                        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                        var action = '';

                        content += GCTLang.txtDiscussion({
                            icon: value.userDetails.iconURL,
                            name: value.userDetails.displayName,
                            date: prettyDate(value.time_created),
                            group: group,
                            description: text,
                            title: value.title,
                            all_text: "all_text",
                            action: action,
                            owner: value.owner_guid,
                            guid: value.guid,
                            type: "gccollab_discussion_post",
                            replied: replied,
                            liked: liked,
                            likes: likes
                        });
                    } else if (value.subtype == "discussion_reply") {
                        //not needed
                    }

                });

                $('#entity-title').html(GCTLang.Trans("discussion"));
                $(content).hide().appendTo('#entity-main').fadeIn(500);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
            break;
            
        case "gccollab_opportunity":
            $("#comment-card").hide();
            GCTUser.GetOpportunity(guid, function (data) {
                var opportunity = data.result;
                var content = "";
                $(opportunity).each(function (key, value) {

                    var text = (value.description) ? value.description : "";

                    var oppType = (value.jobType) ? oppType += jobType : "";

                    var source = "";
                    if (value.shareText && value.shareURL)
                        source = "<blockquote>Source: <a onclick='GCT.FireLink(this);' href='" + value.shareURL + "'>" + value.shareText + "</a></blockquote>";

                    var jobtype = '';
                    if (value.jobtype) { jobtype += value.jobtype; }

                    var roletype = '';
                    if (value.roletype) { roletype += value.roletype; }

                    var programArea = "<b>" + GCTLang.Trans("program-area") + "</b>";
                    if (value.programArea) { programArea += value.programArea; }

                    var numOpportunities = "<b>" + GCTLang.Trans("num-opportunities") + "</b>";
                    if (value.numOpportunities) { numOpportunities += value.numOpportunities; }

                    var idealStart = "<b>" + GCTLang.Trans("ideal-start") + "</b>";
                    if (value.idealStart) { idealStart += value.idealStart; }

                    var idealComplete = "<b>" + GCTLang.Trans("ideal-complete") + "</b>";
                    if (value.idealComplete) { idealComplete += value.idealComplete; }

                    var deadline = "<b>" + GCTLang.Trans("deadline") + "</b>";
                    if (value.deadline) { deadline += value.deadline; }

                    var oppVirtual = "<b>" + GCTLang.Trans("opportunity-virtual") + "</b>";
                    if (value.oppVirtual) { oppVirtual += value.oppVirtual; }

                    var oppOnlyIn = "<b>" + GCTLang.Trans("opportunity-in") + "</b>";
                    if (value.oppOnlyIn) { oppOnlyIn += value.oppOnlyIn; }

                    var location = "<b>" + GCTLang.Trans("opportunity-location") + "</b>";
                    if (value.location) { location += value.location; }

                    var security = "<b>" + GCTLang.Trans("opportunity-security") + "</b>";
                    if (value.security) { security += value.security; }

                    var skills = "<b>" + GCTLang.Trans("opportunity-skills") + "</b>";
                    if (value.skills) { skills += value.skills; }

                    var languageReq = '';
                    if (value.languageRequirements) { languageReq = value.languageRequirements; }

                    var schedulingReq = "";
                    if (value.schedulingRequirements) { schedulingReq += value.schedulingRequirements; }

                    var timezone = "<b>" + GCTLang.Trans("opportunity-timezone") + "</b>";
                    if (value.timezone) { timezone += value.timezone; }
                    var timecommitment = "<b>" + GCTLang.Trans("opportunity-time-commitment") + "</b>";
                    if (value.timecommitment) { timecommitment += value.timecommitment; }

                    var participants = "<b>" + GCTLang.Trans("participants") + "</b>";
                    if (value.participants) { participants += value.participants; }

                    var applicants = "<b>" + GCTLang.Trans("applicants") + "</b>";
                    if (value.applicants) { applicants += value.applicants; }

                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = " <a class='link' onclick='GCT.SiteLink(this);' data-type='gccollab_opportunity' href='" + value.url + "'>" + GCTLang.Trans("web-view") + "</a>";
                    var fullview = true;

                    var state = '';
                    if (value.state) { state += value.state; }

                    content += GCTLang.txtOpps({
                        guid: value.guid,
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        jobtype: jobtype,
                        roletype: roletype,
                        title: value.title,
                        oppType: oppType,
                        description: text,
                        all_text: "all_text",
                        source: source,

                        fullview: fullview,
                        additionalTitle: GCTLang.Trans("opportunity-details"),
                        programArea: programArea,
                        numOpportunities: numOpportunities,
                        idealStart: idealStart,
                        idealComplete: idealComplete,
                        deadline: deadline,
                        oppVirtual: oppVirtual,
                        oppOnlyIn: oppOnlyIn,
                        location: location,
                        security: security,
                        skills: skills,
                        languageReq: languageReq,
                        schedulingReq: schedulingReq,
                        timezone: timezone,
                        timecommitment: timecommitment,
                        participants: participants,
                        applicants: applicants,
                        state: state,
                        type: "gccollab_opportunity",
                        action: action,
                        owner: value.owner_guid,
                        liked: liked,
                        likes: likes
                    });
                });

                $('#entity-title').html(GCTLang.Trans("opportunity"));
                $(content).hide().appendTo('#entity-main').fadeIn(500);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
            break;

        case "gccollab_event":
            GCTUser.GetEvent(guid, function (data) {
                var event = data.result;
                var content = "";

                $(event).each(function (key, value) {
                    var text = (value.description !== null) ? value.description : "";

                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = " <a class='link' onclick='GCT.SiteLink(this);' data-type='gccollab_event' href='" + value.url + "'>" + GCTLang.Trans("web-view") + "</a>";

                    var date = (value.startDate).split(" ")[0];
                    var split = date.split("-");
                    var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                    var month = parseInt(split[1]) - 1;
                    var id = 'event-' + split[0] + '-' + month + '-' + split[2];
                    id = id.replace(/(^|-)0+/g, "$1");

                    var posted = "";
                    if (value.groupGUID !== null && typeof value.groupGUID !== 'undefined') {
                        posted = GCTLang.Trans("posted-group") + "<a class='link' data-guid='" + value.groupGUID + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + value.group + "</a>";
                    } else {
                        posted = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }

                    var startDate = GCTLang.Trans("start-date") + date;
                    var endDate = GCTLang.Trans("end-date") + (value.endDate).split(" ")[0];

                    var location = ((value.location !== null) && (typeof value.location !== 'undefined')) ? "<b>" + GCTLang.Trans("location") + "</b>" + value.location : "";

                    var fullview = true;
                    var additionalTitle = GCTLang.Trans("additional-info");
                    var org = GCTLang.Trans("organizer");
                    if (value.organizer !== null && typeof value.organizer !== 'undefined')
                        org += value.organizer;
                    var phone = GCTLang.Trans("phone") + ": ";
                    if (value.phone !== null && typeof value.phone !== 'undefined')
                        phone += value.phone;
                    var email = GCTLang.Trans("email") + ": ";
                    if (value.email !== null && typeof value.email !== 'undefined')
                        email += value.email;
                    var fee = GCTLang.Trans("fee");
                    if (value.fee !== null && typeof value.fee !== 'undefined')
                        fee += value.fee;
                    var eventLang = GCTLang.Trans("lang");
                    if (value.eventLang !== null && typeof value.eventLang !== 'undefined')
                        eventLang += value.eventLang;

                    content = GCTLang.txtEvent({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        startDate: startDate,
                        endDate: endDate,
                        date: prettyDate(value.startDate),
                        location: location,
                        posted: posted,
                        description: text,
                        title: value.title,
                        id: id,
                        action: action,
                        owner: value.owner_guid,
                        guid: value.guid,
                        all_text: "all_text",
                        type: "gccollab_event",
                        liked: liked,
                        likes: likes,
                        fullview: fullview,
                        additionalTitle: additionalTitle,
                        org: org,
                        phone: phone,
                        email: email,
                        fee: fee,
                        eventLang: eventLang
                    });
                });
                $('#entity-title').html(GCTLang.Trans("event"));
                $(content).hide().appendTo('#entity-main').fadeIn(500);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
            break;

        case "gccollab_wire_post":
            $("#comment-card").hide();
            GCTUser.GetWire(guid, 1, function (data) {
                var wires = data.result.reverse();
                var content = "";
                $(wires).each(function (key, value) {
                    // Removes HTML components from Blog
                    // var text = $(value.description).text();
                    var text = urlify(value.description);

                    var source = "";
                    if (value.shareText && value.shareURL) {
                        source = "<blockquote>Source: <a onclick='GCT.FireLink(this);' href='" + value.shareURL + "'>" + value.shareText + "</a></blockquote>";
                    }
                    var img = '';
                    if (value.attachment) {
                        img = "<img class='WireImage' onclick='ShowImage(this)' id='image-" + value.guid + "' src='https://gccollab.ca/thewire_image/download/" + value.attachment.guid + "' style='' />";
                    }

                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = '';

                    content += GCTLang.txtWire({
                        guid: value.guid,
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        date: prettyDate(value.time_created),
                        description: text,
                        source: source,
                        type: "gccollab_wire_post",
                        replied: replied,
                        action: action,
                        owner: value.owner_guid,
                        liked: liked,
                        likes: likes,
                        image: img
                    });
                });

                $('#entity-title').html(GCTLang.Trans("wire"));
                $(content).hide().appendTo('#entity-main').fadeIn(500);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
            break;

        case "gccollab_bookmark":
            GCTUser.GetBookmark(guid, function (data) {
                var bookmark = data.result;
                var content = "";
                $(bookmark).each(function (key, value) {
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = '';
                    var action = " <a class='link' onclick='GCT.SiteLink(this);' data-type='gccollab_bookmark' href='" + value.url + "'>" + GCTLang.Trans("web-view") + "</a>";
                    var posted = '';
                    if (value.group_guid) {
                        posted = GCTLang.Trans("posted-group") + "<a class='link' data-guid='" + value.group_guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + value.group + "</a>";
                    } else {
                        posted = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    }
                    var address = "<a class='external' data-type='gccollab_bookmark' href='" + value.address + "'>" + value.address + "</a> ";
                    content += GCTLang.txtBookmark({
                        icon: value.userDetails.iconURL,
                        name: value.userDetails.displayName,
                        owner: value.owner_guid,
                        date: prettyDate(value.time_created),
                        title: value.title,
                        posted: posted,
                        description: value.description,
                        address: address,
                        type: "gccollab_bookmark",
                        guid: value.guid,
                        action: action,
                        liked: liked,
                        likes: likes
                    })
                });
                $('#entity-title').html(GCTLang.Trans("bookmark"));
                $(content).hide().appendTo('#entity-main').fadeIn(500);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
            break;

        default:
            break;
    }
    $$('#comments-view').on('click', function (e) {
        GCTUser.GetComments(guid, limit, offset, function (data) {
            $("#comments-view").hide();
            $("#comments-more").show();
            var comments = data.result;
            var content = "";
            if (comments.length > 0) {
                $(comments).each(function (key, value) {
                    content += GCTEach.Comment(value);
                }); 
                if (comments.length < limit) {
                    $("#comments-more").hide();
                    content += endOfContent;
                }
            } else {
                content += noContent;
                $("#comments-more").hide();
            }
            $(content).hide().appendTo('#entity-comments').fadeIn(500);
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });
    $$('#comments-more').on('click', function (e) {
        GCTUser.GetComments(guid, limit, offset + limit, function (data) {
            offset += limit;
            var comments = data.result;
            var content = "";
            if (comments.length > 0) {
                $(comments).each(function (key, value) {
                    content += GCTEach.Comment(value);
                });
                if (comments.length < limit) {
                    content += endOfContent;
                    $("#comments-more").hide();
                }
            } else {
                content += endOfContent;
                $("#comments-more").hide();
            }
            $(content).hide().appendTo('#entity-comments').fadeIn(500);
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });
    $$('#comments-submit').on('click', function (e) {
        var comment = $$('#message').val();
        if (!(comment === '')) {
            GCTUser.SubmitComment(guid, comment, function (data) {
                console.log("submited");
                var result = data.result;
                console.log(result);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        } else {
            //empty message, dont use, give feedback
        }
    });
});
$$(document).on('page:afteranimation', '.page[data-page="entity"]', function (e) {
    var focusNav = document.getElementById('entity-title');
    if (focusNav) { focusNav.focus(); }
});


myApp.onPageInit('PostWire', function (page) {
    $$('#postwire-navbar-inner').html(GCTLang.txtGlobalNav('new-wire-post'));
    var imageURI = "";
    $$('#submit-wire').on('click', function (e) {
        var message = $("#wire-post-textarea").val();
        if (message != "") {
            GCTUser.PostWire(message, imageURI, function (data) {
                console.log(data);
                myApp.alert(data.result, function () {
                    mainView.router.loadPage({ url: 'wire.html' });
                });
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        } else {
            myApp.alert("Cannot post wire with no text.");
        }
    });

    $$('#camera-camera').on('click', function (e) {
        if (typeof navigator !== 'undefined' && typeof navigator.camera !== 'undefined') {
            navigator.camera.getPicture(function onSuccess(imageData) {
                $("#picture-taken").attr('src', "data:image/jpeg;base64," + imageData);
                imageURI = imageData;
            }, function onFail(message) {
                // myApp.alert('Failed because: ' + message);
            }, {
                    quality: 95,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1920,
                    targetHeight: 1920,
                    allowEdit: false,
                    correctOrientation: true //Corrects Android orientation quirks
                });
        } else {
            myApp.alert('Missing navigator.camera plugin error. Sorry, restart app, if still doesnt work, probably my fault');
        }
    });

    $$('#camera-gallery').on('click', function (e) {
        if (typeof navigator !== 'undefined' && typeof navigator.camera !== 'undefined') {
            navigator.camera.getPicture(function onSuccess(imageData) {
                $("#picture-taken").attr('src', "data:image/jpeg;base64," +  imageData);
                imageURI = imageData;
            }, function onFail(message) {
                // myApp.alert("Failed because: " + message);
            }, {
                    quality: 95,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1920,
                    targetHeight: 1920,
                    allowEdit: false,
                    correctOrientation: true //Corrects Android orientation quirks
                });
        } else {
            alert('Missing navigator.camera plugin error. Sorry, restart app, if still doesnt work, probably my fault');
        }
    });
    
});
$$(document).on('page:afteranimation', '.page[data-page="PostWire"]', function (e) {
    var focusNav = document.getElementById('page-new-wire-post');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('PostBlog', function (page) {
    var action = (page.query.action) ? page.query.action : ''; //Create or Edit
    var container_guid = ''; // guid of group, for posts on groups
    var blog_guid = ''; // guid of blog post, for edit
    
    if (action == "create") {
        $$('#PostBlog-navbar-inner').html(GCTLang.txtGlobalNav('PostBlog'));
        $$('#submit-blog').html(GCTLang.Trans('PostBlog'));
        if (page.query.type == 'group') { $$('#PostBlog-Colleague').remove(); } // If group container, remove colleague access option
        if (page.query.group_public == 'false') { $$('#PostBlog-public').remove(); } // if not a public group, no all logged access
        container_guid = (page.query.group_guid) ? page.query.group_guid : ''; // Set container_guid
        if (!container_guid) { $$('#PostBlog-Group').remove(); } //If not container, remove group access option
    } else if (action == "edit") {
        $$('#PostBlog-navbar-inner').html(GCTLang.txtGlobalNav('EditBlog'));
        $$('#submit-blog').html(GCTLang.Trans('EditBlog'));
        blog_guid = (page.query.post_guid) ? page.query.post_guid : '';
        GCTUser.GetBlogEdit(blog_guid, function (data) {
            var blog = data.result;
            if (blog.group) {
                container_guid = blog.container_guid; // Set container_guid
                $$('#PostBlog-Colleague').remove(); // If group container, remove colleague access option
                if (blog.group.public == false) { $$('#PostBlog-public').remove(); } // if not a public group, no all logged access
            } else {
                $$('#PostBlog-Group').remove(); //If not container, remove group access option
            }
            $$('input#english-title').val(blog.title.en);
            $$('input#french-title').val(blog.title.fr);
            if (blog.excerpt) {
                $$('#french-excerpt').val(blog.excerpt.fr);
                $$('#english-excerpt').val(blog.excerpt.en);
            }
            $$('#english-body-textarea').val(blog.description.en);
            $$('#french-body-textarea').val(blog.description.fr);

        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            });
    }

    $$('#submit-blog').on('click', function (e) {
        $$('#PostBlog-Feedback').html(''); //clears feedback message on new submit
        var title = {}, excerpt = {}, body = {};
        title.en = $('#english-title').val();
        title.fr = $('#french-title').val(); 
        excerpt.en = $('#english-excerpt').val();
        excerpt.fr = $('#french-excerpt').val();
        body.en = $('#english-body-textarea').val();
        body.fr = $('#french-body-textarea').val(); 
        var comment = $('#PostBlog-comments').val();
        var access = $('#PostBlog-access').val();
        var status = $('#PostBlog-status').val();
        //(container, title, excerpt, body, comments, access, successCallback, errorCallback)
        GCTUser.PostBlog(container_guid, blog_guid, title, excerpt, body, comment, access, status, function (data) {
            if (data.result.indexOf("gccollab.ca/blog/view/") > -1) {
                var obj = [];
                obj.href = data.result;
                GCT.FireLink(obj);
            } else {
                myApp.alert(data.result);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }, function (feedback){
            var feedbackmsg = '<p class="card-content-inner" style="padding-top: 0;padding-bottom: 0;" id="PostBlog-Feedback">' +GCTLang.Trans('issue') + feedback + '</p>';
            $(feedbackmsg).hide().appendTo('#PostBlog-Feedback').fadeIn(500);
        });
    });
});

myApp.onPageInit('PostEvent', function (page) {
    var action = (page.query.action) ? page.query.action : ''; //Create or Edit
    var container_guid = ''; // guid of group, for posts on groups
    var event_guid = ''; // guid of blog post, for edit

    if (action == "create") {
        $$('#PostEvent-navbar-inner').html(GCTLang.txtGlobalNav('PostEvent'));
        $$('#submit-event').html(GCTLang.Trans('PostEvent'));
        if (page.query.type == 'group') { $$('#PostEvent-Colleague').remove(); } // If group container, remove colleague access option
        if (page.query.group_public == 'false') { $$('#PostEvent-public').remove(); } // if not a public group, no all logged access
        container_guid = (page.query.group_guid) ? page.query.group_guid : ''; // Set container_guid
        if (!container_guid) { $$('#PostEvent-Group').remove(); } //If not container, remove group access option
    } else if (action == "edit") {
        $$('#PostEvent-navbar-inner').html(GCTLang.txtGlobalNav('EditEvent'));
        $$('#submit-event').html(GCTLang.Trans('EditEvent'));
        event_guid = (page.query.post_guid) ? page.query.post_guid : '';
        GCTUser.GetEventEdit(event_guid, function (data) {
            var event = data.result;
            if (event.group) {
                container_guid = event.container_guid; // Set container_guid
                $$('#EventBlog-Colleague').remove(); // If group container, remove colleague access option
                if (event.group.public == false) { $$('#PostEvent-public').remove(); } // if not a public group, no all logged access
            } else {
                $$('#PostEvent-Group').remove(); //If not container, remove group access option
            }
            $$('input#english-title').val(event.title.en);
            $$('input#french-title').val(event.title.fr);
            if (event.excerpt) {
                $$('#french-excerpt').val(event.excerpt.fr);
                $$('#english-excerpt').val(event.excerpt.en);
            }
            $$('#english-body-textarea').val(event.description.en);
            $$('#french-body-textarea').val(event.description.fr);

        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            });
    }

    $$('#submit-event').on('click', function (e) {
        $$('#PostEvent-Feedback').html(''); //clears feedback message on new submit
        var title = {}, excerpt = {}, body = {};
        title.en = $('#english-title').val();
        title.fr = $('#french-title').val(); 
        excerpt.en = $('#english-excerpt').val();
        excerpt.fr = $('#french-excerpt').val();
        body.en = $('#english-body-textarea').val();
        body.fr = $('#french-body-textarea').val(); 
        var comment = $('#PostEvent-comments').val();
        var access = $('#PostEvent-access').val();
        var status = $('#PostEvent-status').val();
        var starttime = $('#picker-starttime').val();
        var startdate = $('#events-startdate').val();
        var endtime = $('#picker-endtime').val();
        var enddate = $('#events-enddate').val();
        console.log(startdate);
        //(container, title, excerpt, body, comments, access, successCallback, errorCallback)
        GCTUser.PostEvent(container_guid, event_guid, title, excerpt, body, startdate, starttime, enddate, endtime, comment, access, status, function (data) {
            if (data.result.indexOf("localhost/gcconnex/event/view/") > -1) {
                var obj = [];
                obj.href = data.result;
                GCT.FireLink(obj);
            } else {
                myApp.alert(data.result);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }, function (feedback){
            var feedbackmsg = '<p class="card-content-inner" style="padding-top: 0;padding-bottom: 0;" id="PostBlog-Feedback">' +GCTLang.Trans('issue') + feedback + '</p>';
            $(feedbackmsg).hide().appendTo('#PostEvent-Feedback').fadeIn(500);
        });
    });

    var startdate = myApp.calendar({
        input: '#events-startdate',
    });
    var enddate = myApp.calendar({
        input: '#events-enddate',
    });
    var pickerCustomToolbar = myApp.picker({
        input: '#picker-starttime',
        rotateEffect: true,
        toolbarTemplate: 
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">Done</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
            formatValue: function (p, values, displayValues) {
                return displayValues[0] + ' : ' + values[1];
            },
        cols: [
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            {
                divider: true,
            content: ':'
         },
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            },
        ],
        onOpen: function (picker) {
            picker.container.find('.toolbar-randomize-link').on('click', function () {
                var col0Values = picker.cols[0].values;
                var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];
     
                var col1Values = picker.cols[1].values;
                var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];
     
                var col2Values = picker.cols[2].values;
                var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
     
                picker.setValue([col0Random, col1Random, col2Random]);
            });
        }
    });          

 var pickerCustomToolbar = myApp.picker({
        input: '#picker-endtime',
        rotateEffect: true,
        toolbarTemplate: 
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">Done</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
            formatValue: function (p, values, displayValues) {
                return displayValues[0] + ' : ' + values[1];
            },
        cols: [
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            {
                divider: true,
            content: ':'
         },
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            },
        ],
        onOpen: function (picker) {
            picker.container.find('.toolbar-randomize-link').on('click', function () {
                var col0Values = picker.cols[0].values;
                var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];
     
                var col1Values = picker.cols[1].values;
                var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];
     
                var col2Values = picker.cols[2].values;
                var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
     
                picker.setValue([col0Random, col1Random, col2Random]);
            });
        }
    });          
});
$$(document).on('page:afteranimation', '.page[data-page="PostBlog"]', function (e) {
    var focusNav = document.getElementById('page-PostBlog');
    if (focusNav) {
        focusNav.focus();
    } else {
        focusNav = document.getElementById('page-EditBlog');
        if (focusNav) { focusNav.focus(); }
    }
});

myApp.onPageInit('PostDiscussion', function (page) {
    var action = (page.query.action) ? page.query.action : '';
    var container_guid = (page.query.group_guid) ? page.query.group_guid : '';
    var post_guid = (page.query.post_guid) ? page.query.post_guid : '';

    if (action == "create") {
        $$('#PostDiscussion-navbar-inner').html(GCTLang.txtGlobalNav('PostDiscussion'));
        $$('#submit-discussion').html(GCTLang.Trans('PostDiscussion'));
        if (page.query.group_public == 'false') { $$('#PostDiscussion-public').remove(); }
    } else if (action == "edit") {
        $$('#PostDiscussion-navbar-inner').html(GCTLang.txtGlobalNav('EditDiscussion'));
        $$('#submit-discussion').html(GCTLang.Trans('EditDiscussion'));
        GCTUser.GetDiscussionEdit(post_guid, function (data) {
            var discussion = data.result;
            container_guid = discussion.container_guid;
            $$('input#english-title').val(discussion.title.en);
            $$('input#french-title').val(discussion.title.fr);
            $$('#english-body-textarea').val(discussion.description.en);
            $$('#french-body-textarea').val(discussion.description.fr);
            if (!discussion.group.public) { $$('#PostDiscussion-public').remove(); }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            });
    }
    
    $$('#submit-discussion').on('click', function (e) {
        
        $$('#PostDiscussion-Feedback').html(''); //clears feedback message on new submit
        var title = {}, message = {};
        title.en = $('#english-title').val();
        title.fr = $('#french-title').val();
        message.en = $('#english-body-textarea').val();
        message.fr = $('#french-body-textarea').val();
        var status = $('#PostDiscussion-status').val();
        var access = $('#PostDiscussion-access').val();
            
        GCTUser.PostDiscussion(container_guid, post_guid, title, message, status, access, function (data) {
            if (data.result.indexOf("gccollab.ca/discussion/view/") > -1) {
                var obj = [];
                obj.href = data.result;
                GCT.FireLink(obj);
            } else {
                myApp.alert(data.result);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }, function (feedback) {
            var feedbackmsg = '<p class="card-content-inner" style="padding-top: 0;padding-bottom: 0;" id="PostDiscussion-Feedback">' + GCTLang.Trans('issue') + feedback + '</p>';
            $(feedbackmsg).hide().appendTo('#PostDiscussion-Feedback').fadeIn(500);
        });
        
    });
});
$$(document).on('page:afteranimation', '.page[data-page="PostDiscussion"]', function (e) {
    var focusNav = document.getElementById('page-PostDiscussion');
    if (focusNav) {
        focusNav.focus();
    } else {
        focusNav = document.getElementById('page-EditDiscussion');
        if (focusNav) { focusNav.focus(); }
    }
});

 
/* ===== Messages Page ===== */
myApp.onPageInit('messages', function (page) {

    var conversationStarted = false;
    var answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    var people = [
        {
            name: 'Max Johnson',
            avatar: 'img/pic2.png'
        },
        {
            name: 'Stereo Doe',
            avatar: 'img/pic1.png'
        },
        
    ];
    var answerTimeout, isFocused;

    // Initialize Messages
    var myMessages = myApp.messages('.messages');

    // Initialize Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');
    
    $$('.messagebar a.send-message').on('touchstart mousedown', function () {
        isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
    });
    $$('.messagebar a.send-message').on('click', function (e) {
        // Keep focused messagebar's textarea if it was in focus before
        if (isFocused) {
            e.preventDefault();
            myMessagebar.textarea[0].focus();
        }
        var messageText = myMessagebar.value();
        if (messageText.length === 0) {
            return;
        }
        // Clear messagebar
        myMessagebar.clear();

        // Add Message
        myMessages.addMessage({
            text: messageText,
            avatar: 'img/pic2.png',
            type: 'sent',
            date: 'Now'
        });
        conversationStarted = true;
        // Add answer after timeout
        if (answerTimeout) clearTimeout(answerTimeout);
        answerTimeout = setTimeout(function () {
            var answerText = answers[Math.floor(Math.random() * answers.length)];
            var person = people[Math.floor(Math.random() * people.length)];
            myMessages.addMessage({
                text: answers[Math.floor(Math.random() * answers.length)],
                type: 'received',
                name: person.name,
                avatar: person.avatar,
                date: 'Just now'
            });
        }, 2000);
    });
});

/* ===== Pull To Refresh Demo ===== */
myApp.onPageInit('contacts', function (page) {
    // Dummy Content
    var songs = ['Sheela Joshi', 'Boxer Car', 'Makbul Ahemad', 'Lia'];
    var authors = ['India', 'Australia', 'Qatar', 'Clifornia'];
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
            var picURL = 'img/pic1.png';
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + song + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + author + '</div>' +
                                '</div>' +
                            '</li>';
            ptrContent.find('ul').prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });
});

/* ===== Calendar ===== */
myApp.onPageInit('profile todoadd', function (page) {
    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default2',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format2',
        dateFormat: 'DD, MM dd, yyyy'
    });
});

myApp.onPageInit('privacy', function (page) {
    $$('#privacy-navbar-inner').html(GCTLang.txtGlobalNav('privacy-policy'));
    $('#privacy-content').html($('#privacy-content-' + GCTLang.Lang()).html());
});
$$(document).on('page:afteranimation', '.page[data-page="privacy"]', function (e) {
    var focusNav = document.getElementById('page-privacy-policy');
    if (focusNav) { focusNav.focus(); }
});


myApp.onPageInit('terms', function (page) {
    $$('#terms-navbar-inner').html(GCTLang.txtGlobalNav('terms-and-conditions'));
    $('#terms-content').html($('#terms-content-' + GCTLang.Lang()).html());
});
$$(document).on('page:afteranimation', '.page[data-page="terms"]', function (e) {
    var focusNav = document.getElementById('page-terms-and-conditions');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('about', function (page) {
    $$('#about-navbar-inner').html(GCTLang.txtGlobalNav('about-gccollab'));
    $('#about-content').html($('#about-content-' + GCTLang.Lang()).html());
});
$$(document).on('page:afteranimation', '.page[data-page="about"]', function (e) {
    var focusNav = document.getElementById('page-about-gccollab');
    if (focusNav) { focusNav.focus(); }
});

myApp.onPageInit('faqs', function (page) {
    $$('#faq-navbar-inner').html(GCTLang.txtGlobalNav('faq'));
    $('#faqs-content').html($('#faqs-content-' + GCTLang.Lang()).html());
});
$$(document).on('page:afteranimation', '.page[data-page="faq"]', function (e) {
    var focusNav = document.getElementById('page-faq');
    if (focusNav) { focusNav.focus(); }
});


/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});

$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

window.onpopstate = function (event) {
    myApp.closePanel();
};

///### Spent way to much time looking for an elegant solution. This seems to work for now. Will need to clean this up in the future
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            myApp.closePanel('left');
        } else {
            myApp.closePanel('right');
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
