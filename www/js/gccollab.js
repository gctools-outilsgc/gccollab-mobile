"use strict";

// Init App
var myApp = new Framework7({
    modalTitle: "GCcollab",
    // Enable Material theme
    material: true,
    pushState: true,
    tapHold: true
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
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

$$("body").addClass("theme-" + GCTUser.Context());

// Add keypress functionality to modals
$$(document).on('keydown', '.modal-text-input', function(e){
    if(e.which == 27){
        $('.modal-button:contains("Cancel")').click();
    }
    if(e.which == 13){
        $('.modal-button:contains("OK")').click();
    }
});

$$(document).on('taphold', '.like', function(e){
    GCTUser.GetLikeUsers(this);
});

$$('.panel-right').on('open', function () {
    LoadMessageCentre();
});

function EnterCode() {
    myApp.prompt(GCTLang.Trans("pleaseenterverification"), function (value) {
        GCTUser.SendValidationCode(value, function (success) {
            console.log(success);
            var txt = "";
            if (success.result == true) {
                GCTUser.SetAPIKey(success.message);
                GCTUser.SetUserProfile();
                mainView.router.loadPage({ url: 'home.html' });
            } else {
                myApp.confirm('Your code could not be validated. Press OK to enter your code again.', 'Code Not Valid',
                    function () {
                        EnterCode();
                    }
                );
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
            alert('strange error');
        });
    });
    $('.modal-text-input').focus();
}

function GetNewCode() {
    GCTUser.SendValidation(function(success){
        if (success.message.length > 0) { ///### Going to have to make some of these returns more descriptive e.g. Invalid Email or Email Extension
            EnterCode();        
        } else {
            myApp.alert('Sorry, we were unable to send you the verification code at this time.');
        }
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
        EnterCode();
    });
}

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
        if (typeof profileData == "string") {
            myApp.alert(GCTLang.Trans("couldnotfindprofile"));
            return;
        }

        var isOwnProfile = false;
        if( profileData.displayName == GCTUser.DisplayName() ){
            isOwnProfile = true;
        }

        GCTUser.GetUserGroups(email, function(data2) {
            var groupData = data2.result;

            var groups = "";
            $(groupData).each(function( key, value ) {
                // Removes HTML components from Blog
                var text = (value.description !== null) ? value.description : "";
                
                var members = (value.count > 0) ? value.count + (value.count == 1 ? " member" : " members") : "";
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

            $('#user-groups').html(groups);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetUserActivity(email, 10, 0, function (data3) {
            var activityData = data3.result;

            var activity = "";
            $(activityData).each(function (key, value) {
                var content = GCTEach.Activity(value);
                
                $(content).appendTo('#user-activity');
            });
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        var colleagueButton = (profileData.friend) ? '<a href="#" class="button button-fill button-raised" data-guid="' + profileData.id + '" onclick="GCTUser.RemoveColleague(this);">' + GCTLang.Trans("remove-colleague") + '</a>' : '<a href="#" class="button button-fill button-raised" data-guid="' + profileData.id + '" onclick="GCTUser.AddColleague(this);">' + GCTLang.Trans("add-colleague") + '</a>';
        
        var profile = '<div class="toolbar tabbar">'
                + '<div class="toolbar-inner">'
                    + '<a href="#tab-profile" class="button active tab-link">' + GCTLang.Trans('profile') + '</a>'
                    + '<a href="#tab-groups" class="button tab-link">' + GCTLang.Trans('groups') + '</a>'
                    + '<a href="#tab-activity" class="button tab-link">' + GCTLang.Trans('activity') + '</a>'
                + '</div>'
            + '</div>'

            + '<div class="tabs">'
                + '<div id="tab-profile" class="tab active">'
                    + '<div class="item-content userprofile">'
                        + '<div class="item-media"><img onclick="ShowImage(this);" src="' + profileData.iconURL + '" width="44" alt=""></div>'
                        + '<div class="item-inner">'
                            + '<div class="item-title-row">'
                                + '<div class="item-title">' + profileData.displayName + '</div>'
                            + '</div>'
                            + '<div class="item-subtitle">' + profileData.department + '</div>'
                        + '</div>'
                    + '</div>';
                if( !isOwnProfile ){
                    profile += '<div class="row margin-10">'
                        + '<div class="col-50"><a href="#" class="button button-fill button-raised" data-name="' + profileData.displayName + '" data-guid="' + profileData.id + '" onclick="GCTUser.NewMessage(this);">' + GCTLang.Trans("message") + '</a></div>'
                        + '<div class="col-50">' + colleagueButton + '</div>'
                        // + '<div class="col-33"><a href="#" class="button button-fill button-raised" data-guid="' + profileData.displayName + '" onclick="GCTUser.BlockUser(this);">' + GCTLang.Trans("blockuser") + '</a></div>'
                    + '</div>';
                }
                    profile += '<div class="page-content">'
                        + '<div class="list-block inputs-list vmargin-10">'
                            + '<ul>'
                                + '<li>'
                                    + '<div class="item-content">'
                                        + '<div class="item-inner">'
                                            + '<div class="item-title label">' + GCTLang.Trans('name') + '</div>'
                                            + '<div class="item-text">' + profileData.displayName + '</div>'
                                         '</div>'
                                    + '</div>'
                                + '</li>'
                                + '<li>'
                                    + '<div class="item-content">'
                                        + '<div class="item-inner">'
                                            + '<div class="item-title label">' + GCTLang.Trans('organization') + '</div>'
                                            + '<div class="item-text">' + profileData.department + '</div>'
                                        + '</div>'
                                    + '</div>'
                                + '</li>';
                            if( profileData.hasOwnProperty("jobTitle") && profileData.jobTitle !== null && profileData.jobTitle !== "" ){
                                profile += '<li>'
                                    + '<div class="item-content">'
                                        + '<div class="item-inner">'
                                            + '<div class="item-title label">' + GCTLang.Trans('job-title') + '</div>'
                                            + '<div class="item-text">' + profileData.jobTitle + '</div>'
                                        + '</div>'
                                    + '</div>'
                                + '</li>';
                            }
                            profile += '<li>'
                                + '<div class="item-content">'
                                    + '<div class="item-inner">'
                                        + '<div class="item-title label">' + GCTLang.Trans('email') + '</div>'
                                        + '<div class="item-text"><a class="external" href="mailto:' + profileData.email + '">' + profileData.email + '</a></div>'
                                    + '</div>'
                                + '</div>'
                            + '</li>';
                            if( profileData.hasOwnProperty("telephone") && profileData.telephone !== null && profileData.telephone !== "" ){
                                profile += '<li>'
                                    + '<div class="item-content">'
                                        + '<div class="item-inner">'
                                            + '<div class="item-title label">' + GCTLang.Trans('phone') + '</div>'
                                            + '<div class="item-text"><a class="external" href="tel:' + profileData.telephone + '">' + profileData.telephone + '</a></div>'
                                        + '</div>'
                                    + '</div>'
                                + '</li>';
                            }
                            if( profileData.hasOwnProperty("about_me") && profileData.about_me !== null && profileData.about_me !== "" ){
                                profile += '<li class="align-top">'
                                    + '<div class="item-content">'
                                        + '<div class="item-inner">'
                                            + '<div class="item-title label">' + GCTLang.Trans('about-me') + '</div>'
                                            + '<div class="item-text large" onclick="ToggleAllText(this);">' + profileData.about_me + '</div>'
                                        + '</div>'
                                    + '</div>'
                                + '</li>';
                            }
                            profile += '</ul>'
                        + '</div>'

                        + '<hr>'
                        + '<div class="content-block text-center vmargin-10">'
                            + '<div class="row profiles">'
                                + '<div class="col-33 profiles">' + profileData.wires + '</div>'
                                + '<div class="col-33 profiles">' + profileData.blogs + '</div>'
                                + '<div class="col-33 profiles">' + profileData.colleagues + '</div>'
                            + '</div>'
                            + '<div class="row profile stats">'
                                + '<div class="col-33 profile stats font-13">' + GCTLang.Trans('wires') + '</div>'
                                + '<div class="col-33 profile stats font-13">' + GCTLang.Trans('blogs') + '</div>'
                                + '<div class="col-33 profile stats font-13">' + GCTLang.Trans('colleagues') + '</div>'
                            + '</div>'
                        + '</div>'
                        + '<hr>';

                    if( profileData.hasOwnProperty("links") ){
                        profile += '<div id="social-media" class="content-block vmargin-10">'
                            + '<div class="center">' + GCTLang.Trans('social-media') + '</div>'
                            + '<ul class="socials">';
                                if( profileData.links.hasOwnProperty("github") ){ profile += '<li><a id="user-github" href="' + profileData.links.github + '" class="gh external"><i class="fa fa-github"></i></a></li>'; }
                                if( profileData.links.hasOwnProperty("twitter") ){ profile += '<li><a id="user-twitter" href="' + profileData.links.twitter + '" class="tw external"><i class="fa fa-twitter"></i></a></li>'; }
                                if( profileData.links.hasOwnProperty("linkedin") ){ profile += '<li><a id="user-linkedin" href="' + profileData.links.linkedin + '" class="li external"><i class="fa fa-linkedin"></i></a></li>'; }
                                if( profileData.links.hasOwnProperty("facebook") ){ profile += '<li><a id="user-facebook" href="' + profileData.links.facebook + '" class="fb external"><i class="fa fa-facebook"></i></a></li>'; }
                            profile += '</ul>'
                        + '</div>';
                    }

                profile += '</div>'
            + '</div>'

            + '<div id="tab-groups" class="tab">'
                + '<div class="list-block media-list"><ul id="user-groups"></ul></div>'
            + '</div>'
            + '<div id="tab-activity" class="tab">'
                + '<div class="list-block media-list"><ul id="user-activity"></ul></div>'
            + '</div>'
            + "<a class='link' data-guid='" + profileData.id + "' data-type='gccollab_profile' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + " Temp</a>"

        + '</div>';

        $('.popup-generic .popup-title').text(GCTLang.Trans("profile"));
        $('.popup-generic .popup-content').html(profile);
        myApp.showTab('#tab-profile');
        myApp.popup('.popup-generic');
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

        // var messageHTML = '<li>'
        //     + '<div class="item-link item-content">';
        //     if( message.fromUserDetails.iconURL ){
        //       messageHTML += '<div class="item-media"><img width="40" height="40" style="border-radius:100%" src="' + message.fromUserDetails.iconURL + '" alt=""></div>';
        //     }
        //     messageHTML += '<div class="item-inner">'
        //             + '<div class="item-title-row">'
        //                 + '<div class="author">' + (message.fromUserDetails.displayName ? message.fromUserDetails.displayName : GCTUser.PrettyContext()) + '</div>'
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
              + '<div class="swipeout-content"><a onclick="ShowMessage(this);" class="item-link item-content tab-link" data-guid="' + value.guid + ' data-type="notification">'
                + '<div class="item-inner ' + unread + '">'
                  + '<div class="item-title-row no-padding-right">'
                    + '<div class="item-subtitle">GCcollab</div>'
                    + '<div class="item-after">' + prettyDate(value.time_created) + '</div>'
                  + '</div>'
                  + '<div class="item-text">' + value.title + '</div>'
                + '</div>'
                + '</a></div>'
              + '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" class="demo-forward bg-blue">Forward</a></div>'
              + '<div class="swipeout-actions-right"><a href="#" class="demo-actions">More</a><a href="#" class="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" class="swipeout-delete swipeout-overswipe">Delete</a></div>'
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
                  + '<div class="swipeout-content"><a onclick="ShowMessage(this);" class="item-link item-content tab-link" data-guid="' + value.guid + '" data-type="message">'
                    + '<div class="item-inner ' + unread + '">'
                      + '<div class="item-title-row no-padding-right">'
                        + '<div class="item-subtitle">' + value.fromUserDetails.displayName + '</div>'
                        + '<div class="item-after">' + prettyDate(value.time_created) + '</div>'
                      + '</div>'
                      + '<div class="item-text">' + value.title + '</div>'
                    + '</div>'
                    + '</a></div>'
                  + '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" class="demo-forward bg-blue">Forward</a></div>'
                  + '<div class="swipeout-actions-right"><a href="#" class="demo-actions">More</a><a href="#" class="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" class="swipeout-delete swipeout-overswipe">Delete</a></div>'
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
                var description = '<div class="row"><div class="col-50"><a href="#" class="button button-fill button-raised" data-guid="' + value.user_id + '" onclick="GCTUser.ApproveColleague(this);">' + GCTLang.Trans("accept") + '</a></div><div class="col-50"><a href="#" class="button button-fill button-raised" data-guid="' + value.user_id + '" onclick="GCTUser.DeclineColleague(this);">' + GCTLang.Trans("decline") + '</a></div></div>';
                
                content += GCTLang.txtMember({
                    guid: value.user_id,
                    icon: value.iconURL,
                    name: value.displayName,
                    date: GCTLang.Trans("join-date") + "<em>" + prettyDate(value.dateJoined) + "</em>",
                    description: description,
                    organization: value.organization
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
    // $(".navbar .center a").text(GCTUser.PrettyContext());
    $(".context").addClass(GCTUser.Context());

    $('#gcconnex-context-option').hide(); //### For a later time when we can actually do this.

    $$('#logoutBtn').on('click', function (e) {
        GCTUser.Logout(function(success){
            //GCTUser.SetAPIKey("");
            myApp.closePanel(false);
            mainView.router.loadPage({ url: 'sign-in.html' });
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });
});


myApp.onPageInit('group', function (page) {
    var guid = page.query.guid;
    var limit = 20;
    var offset = 0;
    var groupActivityMoreOffset = 0;
    var groupMembersMoreOffset = 0;
    var groupBookmarksMoreOffset = 0;
    var enabled;
    var access;
    var membersloaded = false;
    var activityloaded = false;
    var bookmarksloaded = false;

    GCTUser.GetGroup(guid, function(data){
        var group = data.result;
       
        var tags = (group.tags) ? ($.isArray(group.tags) ? (group.tags).join(", ") : group.tags) : GCTLang.Trans('no-tags');
        if( group.liked ){
            $(".like").addClass('liked');
        }
        if( group.member ){
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

    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    $("#group-menu").on('click', function (e) {
        var popoverHTML = '<div class="popover pop-group-menu">'
            + '<div class="popover-inner">'
            + '<div class="list-block">'
            + '<ul>';
        if (access) {
            popoverHTML += (enabled.activity && enabled.activity == "yes") ? '<li><a href="#tab-group-activity" class="button tab-link" data-translate="activity">Activity</a></li>' : "";
            popoverHTML += (enabled.forum && enabled.forum == "yes") ? '<li><a href="#tab-group-discussion" class="button tab-link" data-translate="discussion">Discussion</a></li>' : "";
            popoverHTML += (enabled.bookmarks && enabled.bookmarks == "yes") ? '<li><a href="#tab-group-bookmarks" class="button tab-link" data-translate="bookmarks">Bookmarks</a></li>' : "";
        } else {
            popoverHTML += '<li><a href="#" class="item-link list-button">' + "Private Group" + '</a></li>';
        }
        popoverHTML += '</ul>'
            + '</div>'
            + '</div>'
            + '</div>';
        myApp.popover(popoverHTML, this);
    });

    $("#tab-group-discussion").on('show', function (e) {
        GCTUser.GetGroupDiscussions(guid,limit, offset, function(data){
            var discussions = data.result;
            var content = '';
            if(discussions.length > 0){
                $.each(discussions, function (key, value) {
                    console.log(value);
                    // Removes HTML components from Discussion
                    var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
                    var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
                    var replied = (value.replied) ? "replied" : "";
                    var liked = (value.liked) ? "liked" : "";
                    var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                    var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

                     content += GCTLang.txtDiscussion({
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
                $(content).appendTo('#group-discussion');
            } 
            
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    $("#tab-group-bookmarks").on('show', function (e) {
        if (bookmarksloaded == false) {
            GCTUser.GetBookmarksByUser(limit, offset, guid, function (data) {
                var bookmarks = data.result;
                if (bookmarks.length > 0) {
                    $.each(bookmarks, function (key, value) {
                        var content = GCTEach.Bookmark(value);
                        $(content).appendTo('#group-bookmarks');
                    });
                }
                if (bookmarks.length < limit) {
                    var content = noMatches;
                    $(content).appendTo('#group-bookmarks');
                    $('#group-bookmarks-more').hide();
                }
                bookmarksloaded = true;
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    });

    $(document).on('click', '#group-bookmarks-more', function (e) {
        GCTUser.GetBookmarksByUser(limit, groupBookmarksMoreOffset + limit, guid, function (data) {
            var bookmarks = data.result;
            var content = '';
            if (bookmarks.length > 0) {
                $('#group-bookmarks-more').show();
                $.each(bookmarks, function (key, value) {
                    content += GCTEach.Bookmark(value);
                });
                $(content).hide().appendTo('#group-bookmarks').fadeIn(1000);
            } else {
                $(noMatches).hide().appendTo('#group-bookmarks').fadeIn(1000);
            }
            if (bookmarks.length < limit) {
                $('#group-bookmarks-more').hide();
            }
            groupBookmarksMoreOffset += limit;
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    $("#group-members").on('click', function (e) {
        GCTUser.GetGroupMembers(guid, limit, offset, function(data){
            var members = data.result;

            var content = '<div id="group-members-popup">';
            if(members.length > 0){
                $.each(members, function (key, value) {
                    content += GCTEach.Member(value);
                });
            } else {
                content += noMatches;
            }
            content += '</div><a id="group-members-more" class="button button-big button-fill">' + GCTLang.Trans('view-more') + '</a>';

            $('.popup-generic .popup-title').html(GCTLang.Trans('members'));
            $('.popup-generic .popup-content').html(content);
            myApp.popup('.popup-generic');
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        $(document).on('click', '#group-members-more', function (e) {
            GCTUser.GetGroupMembers(guid, limit, groupMembersMoreOffset + limit, function(data){
                var members = data.result;

                var content = '';
                if(members.length > 0){
                    $('#group-members-more').show();
                    $.each(members, function (key, value) {
                        content += GCTEach.Member(value);
                    });
                    $(content).hide().appendTo('#group-members-popup').fadeIn(1000);
                } else {
                    $('#group-members-more').hide();
                    $(noMatches).hide().appendTo('#group-members-popup').fadeIn(1000);
                }

                groupMembersMoreOffset += limit;
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        });
    });

    $$('#tab-group-members').on('show', function (e) {
        if (membersloaded == false) {
            GCTUser.GetGroupMembers(guid, limit, offset, function (data) {
                var members = data.result;
                if (members.length > 0) {
                    $.each(members, function (key, value) {
                        var content = GCTEach.Member(value);
                        $(content).appendTo('#group-members');
                    });
                } else {
                    var content = noMatches;
                    $(content).appendTo('#group-members');
                }
                membersloaded = true;
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    });
    $(document).on('click', '#group-members-more', function (e) {
        GCTUser.GetGroupMembers(guid, limit, groupMembersMoreOffset + limit, function (data) {
            var members = data.result;

            var content = '';
            if (members.length > 0) {
                $('#group-members-more').show();
                $.each(members, function (key, value) {
                    content += GCTEach.Member(value);
                });
                $(content).hide().appendTo('#group-members').fadeIn(1000);
            } else {
                $('#group-members-more').hide();
                $(noMatches).hide().appendTo('#group-members').fadeIn(1000);
            }

            groupMembersMoreOffset += limit;
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    $$('#tab-group-activity').on('show', function (e) {
        if (activityloaded == false) {
            GCTUser.GetGroupActivity(guid, limit, offset, function (data) {
                var activity = data.result;
                if (activity.length > 0) {
                    $(activity).each(function (key, value) {
                        var content = GCTEach.Activity(value);
                        $(content).appendTo('#group-activity');
                    });
                } else {
                    var content = noMatches;
                    $(content).appendTo('#group-activity');
                }
                activityloaded = true;
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    });


    var groupActivityMore = $$(page.container).find('#group-activity-more');
    groupActivityMore.on('click', function (e) {
        console.log("loading more activity");
        GCTUser.GetGroupActivity(guid, limit, groupActivityMoreOffset + limit, function(data){
            var activityData = data.result;

            if(activityData.length > 0){
                $('#group-activity-more').show();
                $(activityData).each(function( key, value ) {
                    var content = GCTEach.Activity(value);
                    $(content).appendTo('#group-activity');
                });
            } else {
                $('#group-activity-more').hide();
                $(noMatches).hide().appendTo('#group-activity').fadeIn(1000);
            }

            groupActivityMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });
});

myApp.onPageInit('sign-in', function (page) {
    var email = GCTUser.LastLoginEmail();
    if( page.query.email ){
        email = page.query.email;
    }
    $$('#email').val(email);

    var email = $('#email').val();
    var password = $('#password').val();

    if( page.query.register ){
        myApp.alert(GCTLang.Trans("verify"), '');
    }

    $("#email, #password").keyup(function (event) {
        event.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        if (event.keyCode == 13) {
            if( email != "" && password != "" && email.length >= 3 && password.length >= 6 ){
                GCTUser.Login(email, password, function (success) {
                    if (success.result) {
                        GCTUser.SaveLoginEmail(email);
                        GCTUser.SetAPIKey(success.message);
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
                    GCTUser.SetAPIKey(success.message);
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

    if (GCTUser.Context() != "gccollab") {
        $('#liMenuChat').hide();
    } else {
        $('#liMenuChat').show();
    }

    var limit = 15;
    var offset = 0;

    var wireSwiper = new Swiper('.swiper-container.swiper-wires', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }
    });

    GCTUser.GetWires(limit, offset, '', function(data){
        var wires = data.result;
        var imgs = [];
        $('#GCcollabUserWireContent .loading').remove();

        if(wires.length > 0){
            $.each(wires, function (key, value) {
                var content = GCTEach.Wire(value);
                //### I think fades cause significant performance hits on devices when we have 30 concurrent ones like we do.
                //### The below makes it so that it only fades the first, visible, post in the list.
                if (key == 0) {
                    $(content).hide().appendTo('#GCcollabUserWireContent').fadeIn(1000);
                } else {
                    $(content).appendTo('#GCcollabUserWireContent');
                }
            });
        } else {
            $(noContent).hide().appendTo('#GCcollabUserWireContent').fadeIn(1000);
        }

        if (!GCTLang.IsEnglish()) {
            $("#GCcollabUserWireContent div.item-text").each(function (i, obj) {
                //### TODO- check for different lang and only show translation button when diff
                if ($(obj).html().indexOf("<block") == -1) {
                    $(obj).html(TransIcon + $(obj).html());
                }
            });
        }

        wireSwiper.update();
        
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    var newsfeedSwiper = new Swiper('.swiper-container.swiper-newsfeed', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }
    });

    GCTUser.GetNewsfeed(limit, offset, function (data) {
        var newsfeed = data.result;
        $('#GCcollabUserNewsfeedContent .loading').remove();

        if (newsfeed.length > 0) {
            $.each(newsfeed, function (key, value) {
                var content = GCTEach.Newsfeed(value);
                
                //### I think fades cause significant performance hits on devices when we have 30 concurrent ones like we do.
                //### The below makes it so that it only fades the first, visible, post in the list.
                if (key == 0) {
                    $(content).hide().appendTo('#GCcollabUserNewsfeedContent').fadeIn(1000);
                } else {
                    $(content).appendTo('#GCcollabUserNewsfeedContent');
                }
            });
        } else {
            $(noContent).hide().appendTo('#GCcollabUserNewsfeedContent').fadeIn(1000);
        }
        

        if (!GCTLang.IsEnglish()) {
            $("#GCcollabUserNewsfeedContent div.item-text").each(function (i, obj) {
                //### TODO- check for different lang and only show translation button when diff
                if ($(obj).html().indexOf("<block") == -1) {
                    $(obj).html(TransIcon + $(obj).html());
                }
            });
        }

        newsfeedSwiper.update();
        
    }, function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });

    var blogSwiper = new Swiper('.swiper-container.swiper-blogs', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }
    });

    GCTUser.GetBlogs(limit, offset, "", function(data){
        var blogs = data.result;
        $('#GCcollabUserBlogContent .loading').remove();

        if(blogs.length > 0){
            $.each(blogs, function (key, value) {
                var content = GCTEach.Blog(value);
                //### I think fades cause significant performance hits on devices when we have 30 concurrent ones like we do.
                //### The below makes it so that it only fades the first, visible, post in the list.
                if (key == 0) {
                    $(content).hide().appendTo('#GCcollabUserBlogContent').fadeIn(1000);
                } else {
                    $(content).appendTo('#GCcollabUserBlogContent');
                }
            });
        } else {
            $(noContent).hide().appendTo('#GCcollabUserBlogContent').fadeIn(1000);
        }

        if (!GCTLang.IsEnglish()) {
            $("#GCcollabUserBlogContent div.item-text").each(function (i, obj) {
                //### TODO- check for different lang and only show translation button when diff
                if ($(obj).html().indexOf("<block") == -1) {
                    $(obj).html(TransIcon + $(obj).html());
                }
            });
        }

        blogSwiper.update();
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    //### This isn't working but should. Have to come back to this. For the time being login is done through the specific chat and external-pages pages.
    //### The plan was for this to log the user into GCcollab within the app context and have it set cookies then we could use the 
    //### iFrame to load site pages (until we get the functionality into the app one by one).
    //$$.ajax({
    //    method: 'POST',
    //    dataType: 'text',
    //    url: "https://gccollab.ca/services/api/rest/json/?",
    //    data: { method: "login.userforchat", user: GCTUser.Email(), key: GCTUser.APIKey(), _persistant: "true" },
    //    timeout: 12000,
    //    success: function (data) {
    //        console.log(data);
    //    }
    //});

    var refreshHome = $$(page.container).find('.pull-to-refresh-content');
    refreshHome.on('refresh', function (e) {
        console.log("refresh");
        $('#GCcollabUserWireContent').html('<span class="loading">' + GCTLang.Trans("loading") + '</span>');
        GCTUser.GetWires(limit, offset, '', function(data){
            var wires = data.result;
            $('#GCcollabUserWireContent .loading').remove();

            var content = "";
            if(wires.length > 0){
                $.each(wires, function (key, value) {
                    content += GCTEach.Wire(value);
                });

                $(content).hide().appendTo('#GCcollabUserWireContent').fadeIn(1000);
            } else {
                $(noContent).hide().appendTo('#GCcollabUserWireContent').fadeIn(1000);
            }

            wireSwiper.update();
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        $('#GCcollabUserNewsfeedContent').html('<span class="loading">' + GCTLang.Trans("loading") + '</span>');
        GCTUser.GetNewsfeed(limit, offset, function(data){
            var newsfeed = data.result;
            $('#GCcollabUserNewsfeedContent .loading').remove();

            if (newsfeed.length > 0) {
                $.each(newsfeed, function (key, value) {
                    var content = GCTEach.Newsfeed(value);

                    //### I think fades cause significant performance hits on devices when we have 30 concurrent ones like we do.
                    //### The below makes it so that it only fades the first, visible, post in the list.
                    if (key == 0) {
                        $(content).hide().appendTo('#GCcollabUserNewsfeedContent').fadeIn(1000);
                    } else {
                        $(content).appendTo('#GCcollabUserNewsfeedContent');
                    }
                });
            } else {
                $(noContent).hide().appendTo('#GCcollabUserNewsfeedContent').fadeIn(1000);
            }

            newsfeedSwiper.update();
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        $('#GCcollabUserBlogContent').html('<span class="loading">' + GCTLang.Trans("loading") + '</span>');
        GCTUser.GetBlogs(limit, offset, "", function(data){
            var blogs = data.result;
            $('#GCcollabUserBlogContent .loading').remove();

            var content = "";
            if(blogs.length > 0){
                $.each(blogs, function (key, value) {
                    content += GCTEach.Blog(value);
                });

                $(content).hide().appendTo('#GCcollabUserBlogContent').fadeIn(1000);
            } else {
                $(noContent).hide().appendTo('#GCcollabUserBlogContent').fadeIn(1000);
            }

            blogSwiper.update();
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        myApp.pullToRefreshDone();
    });
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
    var limit = 20;
    var offset = 0;
    var wiresAllMoreOffset = 0;
    var wiresColleaguesMoreOffset = 0;
    var wiresMineMoreOffset = 0;

    GCTUser.GetWires(limit, offset, '', function(data){
        var wires = data.result;
        var imgs = [];
        $.each(wires, function (key, value) {
            var content = GCTEach.Wire(value);
            $(content).hide().appendTo('#wires-all').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetWiresByUserColleague(limit, offset, function(data){
        var wires = data.result;
        var imgs = [];
        $.each(wires, function (key, value) {
            var content = GCTEach.Wire(value);
            $(content).hide().appendTo('#wires-colleagues').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetWiresByUser(GCTUser.Email(), limit, offset, function(data){
        var wires = data.result;

        $.each(wires, function (key, value) {
            var content = GCTEach.Wire(value);
            $(content).hide().appendTo('#wires-mine').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    var wiresAllMore = $$(page.container).find('#wires-all-more');
    wiresAllMore.on('click', function (e) {
        GCTUser.GetWires(limit, wiresAllMoreOffset + limit, '', function(data){
            var wires = data.result;

            $.each(wires, function (key, value) {
                var content = GCTEach.Wire(value);
                $(content).hide().appendTo('#wires-all').fadeIn(1000);
            });

            wiresAllMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var wiresColleaguesMore = $$(page.container).find('#wires-colleagues-more');
    wiresColleaguesMore.on('click', function (e) {
        GCTUser.GetWiresByUserColleague(limit, wiresColleaguesMoreOffset + limit, function(data){
            var wires = data.result;

            $.each(wires, function (key, value) {
                var content = GCTEach.Wire(value);
                $(content).hide().appendTo('#wires-colleagues').fadeIn(1000);
            });

            wiresColleaguesMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var wiresMineMore = $$(page.container).find('#wires-mine-more');
    wiresMineMore.on('click', function (e) {
        GCTUser.GetWiresByUser(GCTUser.Email(), limit, wiresMineMoreOffset + limit, function(data){
            var wires = data.result;

            $.each(wires, function (key, value) {
                var content = GCTEach.Wire(value);
                $(content).hide().appendTo('#wires-mines').fadeIn(1000);
            });

            wiresMineMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshWires = $$(page.container).find('.pull-to-refresh-content');
    refreshWires.on('refresh', function (e) {
        GCTUser.GetWires(limit, offset, '', function(data){
            var wires = data.result;
            $('#wires-all').html('');

            var content = "";
            $.each(wires, function (key, value) {
                content += GCTEach.Wire(value);
            });
            $(content).hide().appendTo('#wires-all').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetWiresByUserColleague(limit, offset, function(data){
            var wires = data.result;
            $('#wires-colleagues').html('');

            var content = "";
            $.each(wires, function (key, value) {
                content += GCTEach.Wire(value);
            });
            $(content).hide().appendTo('#wires-colleagues').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetWiresByUser(GCTUser.Email(), limit, offset, function(data){
            var wires = data.result;
            $('#wires-mine').html('');

            var content = "";
            $.each(wires, function (key, value) {
                content += GCTEach.Wire(value);
            });
            $('#wires-mine').html(content);
            $('#wires-mine').hide().fadeIn(1000);
            // $(content).hide().appendTo('#wires-mines').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        wiresAllMoreOffset = 0;
        wiresColleaguesMoreOffset = 0;
        wiresMineMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('newsfeed', function (page) {
    var limit = 20;
    var offset = 0;
    var newsfeedMoreOffset = 0;

    GCTUser.GetNewsfeed(limit, offset, function(data){
        var newsfeed = data.result;
        
        $.each(newsfeed, function (key, value) {
            var content = GCTEach.Newsfeed(value);

            $(content).hide().appendTo('#newsfeed-all').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    var newsfeedMore = $$(page.container).find('#newsfeed-more');
    newsfeedMore.on('click', function (e) {
        GCTUser.GetNewsfeed(limit, newsfeedMoreOffset + limit, function(data){
            var newsfeed = data.result;

            $.each(newsfeed, function (key, value) {
                var content = GCTEach.Newsfeed(value);

                $(content).hide().appendTo('#newsfeed-all').fadeIn(1000);
            });

            newsfeedMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshNewsfeed = $$(page.container).find('.pull-to-refresh-content');
    refreshNewsfeed.on('refresh', function (e) {
        GCTUser.GetNewsfeed(limit, offset, function(data){
            var newsfeed = data.result;

            var content = "";
            $.each(newsfeed, function (key, value) {
                content += GCTEach.Newsfeed(value);
            });
            $('#newsfeed-all').html('');
            $(content).hide().appendTo('#newsfeed-all').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        newsfeedMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('groups', function (page) {
    var limit = 20;
    var offset = 0;
    var groupsAllMoreOffset = 0;
    var groupsMineMoreOffset = 0;
    var filters = {};
    var filtersOpened = false;

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#group-name").val('');

        GCTUser.GetGroups(limit, offset, filters, function(data){
            var groups = data.result;
            $('#groups-all').html('');

            if(groups.length > 0){
                $('#groups-all-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-all').fadeIn(1000);
                });
            } else {
                $('#groups-all-more').hide();
                $(noMatches).hide().appendTo('#groups-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetGroupsMine(limit, offset, filters, function(data){
            var groups = data.result;
            $('#groups-mine').html('');

            if(groups.length > 0){
                $('#groups-mine-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-mine').fadeIn(1000);
                });
            } else {
                $('#groups-mine-more').hide();
                $(noMatches).hide().appendTo('#groups-mine').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        groupsAllMoreOffset = 0;
        groupsMineMoreOffset = 0;
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#group-name").val();
        if( $("#group-name").val() == "" ){
            filters = "";
        }

        GCTUser.GetGroups(limit, offset, filters, function(data){
            var groups = data.result;
            $('#groups-all').html('');

            if(groups.length > 0){
                $('#groups-all-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-all').fadeIn(1000);
                });
            } else {
                $('#groups-all-more').hide();
                $(noMatches).hide().appendTo('#groups-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetGroupsMine(limit, offset, filters, function(data){
            var groups = data.result;
            $('#groups-mine').html('');

            if(groups.length > 0){
                $('#groups-mine-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-mine').fadeIn(1000);
                });
            } else {
                $('#groups-mine-more').hide();
                $(noMatches).hide().appendTo('#groups-mine').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        groupsAllMoreOffset = 0;
        groupsMineMoreOffset = 0;
    });

    if( !filtersOpened ){
        GCTUser.GetGroups(limit, offset, filters, function(data){
            var groups = data.result;

            if(groups.length > 0){
                $('#groups-all-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-all').fadeIn(1000);
                });
            } else {
                $('#groups-all-more').hide();
                $(noMatches).hide().appendTo('#groups-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetGroupsMine(limit, offset, filters, function(data){
            var groups = data.result;

            if(groups.length > 0){
                $('#groups-mine-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-mine').fadeIn(1000);
                });
            } else {
                $('#groups-mine-more').hide();
                $(noMatches).hide().appendTo('#groups-mine').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var groupsAllMore = $$(page.container).find('#groups-all-more');
    groupsAllMore.on('click', function (e) {
        GCTUser.GetGroups(limit, groupsAllMoreOffset + limit, filters, function(data){
            var groups = data.result;

            if(groups.length > 0){
                $('#groups-all-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-all').fadeIn(1000);
                });
            } else {
                $('#groups-all-more').hide();
                $(noMatches).hide().appendTo('#groups-all').fadeIn(1000);
            }

            groupsAllMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var groupsMineMore = $$(page.container).find('#groups-mine-more');
    groupsMineMore.on('click', function (e) {
        GCTUser.GetGroupsMine(limit, groupsMineMoreOffset + limit, filters, function(data){
            var groups = data.result;

            if(groups.length > 0){
                $('#groups-mine-more').show();
                $.each(groups, function (key, value) {
                    var content = GCTEach.Group(value);
                    $(content).hide().appendTo('#groups-mine').fadeIn(1000);
                });
            } else {
                $('#groups-mine-more').hide();
                $(noMatches).hide().appendTo('#groups-mine').fadeIn(1000);
            }

            groupsMineMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshGroups = $$(page.container).find('.pull-to-refresh-content');
    refreshGroups.on('refresh', function (e) {
        GCTUser.GetGroups(limit, offset, filters, function(data){
            var groups = data.result;
            $('#groups-all').html('');

            var content = "";
            if(groups.length > 0){
                $('#groups-all-more').show();
                $.each(groups, function (key, value) {
                    content += GCTEach.Group(value);
                });
                $(content).hide().appendTo('#groups-all').fadeIn(1000);
            } else {
                $('#groups-all-more').hide();
                $(noMatches).hide().appendTo('#groups-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetGroupsMine(limit, offset, filters, function(data){
            var groups = data.result;
            $('#groups-mine').html('');

            var content = "";
            if(groups.length > 0){
                $('#groups-mine-more').show();
                $.each(groups, function (key, value) {
                    content += GCTEach.Group(value);
                });
                $(content).hide().appendTo('#groups-mine').fadeIn(1000);
            } else {
                $('#groups-mine-more').hide();
                $(noMatches).hide().appendTo('#groups-mine').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        groupsAllMoreOffset = 0;
        groupsMineMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('chat', function (page) {
    $("#user").val(GCTUser.Email());
    $("#key").val(GCTUser.APIKey());
    $("#chatForm").submit(); 
});

myApp.onPageInit('doc', function (page) {
    $("#user").val(GCTUser.Email());
    $("#key").val(GCTUser.APIKey());
    $("#guid").val(page.query.guid);
    $("#docForm").submit(); 
});

myApp.onPageInit('external-pages', function (page) {
    //### log them in at app startup in background and do a check for if logged in later on so we don't do this every page hit
    $("#user").val(GCTUser.Email());
    $("#key").val(GCTUser.APIKey());
    $('#url').val(page.query.page);
    $("#formGCcollabLogin").submit();
   
    //$('#iFrameChat').height($(window).height() - $('div:last').offset().top);
    //$('#divChat').height($(window).height() - $('div:last').offset().top);
});

myApp.onPageInit('members', function (page) {
    var limit = 20;
    var offset = 0;
    var filters = {};
    var filtersOpened = false;
    var membersAllMoreOffset = 0;
    var membersColleaguesMoreOffset = 0;

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#member-filters").val('');
        $("#member-name").val('');

        GCTUser.GetMembers(limit, offset, filters, function(data){
            var members = data.result;
            $('#members-all').html('');

            if(members.length > 0){
                $('#members-all-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-all').fadeIn(1000);
                });
            } else {
                $('#members-all-more').hide();
                $(noMatches).hide().appendTo('#members-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, offset, filters, function(data){
            var members = data.result;
            $('#members-colleagues').html('');

            if(members.length > 0){
                $('#members-colleagues-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-colleagues').fadeIn(1000);
                });
            } else {
                $('#members-colleagues-more').hide();
                $(noMatches).hide().appendTo('#members-colleagues').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        membersAllMoreOffset = 0;
        membersColleaguesMoreOffset = 0;
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['type'] = $("#member-filters").val();
        filters['name'] = $("#member-name").val();
        if( $("#member-filters").val() == "" && $("#member-name").val() == "" ){
            filters = "";
        }

        GCTUser.GetMembers(limit, offset, filters, function(data){
            var members = data.result;
            $('#members-all').html('');

            if(members.length > 0){
                $('#members-all-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-all').fadeIn(1000);
                });
            } else {
                $('#members-all-more').hide();
                $(noMatches).hide().appendTo('#members-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, offset, filters, function(data){
            var members = data.result;
            $('#members-colleagues').html('');

            if(members.length > 0){
                $('#members-colleagues-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-colleagues').fadeIn(1000);
                });
            } else {
                $('#members-colleagues-more').hide();
                $(noMatches).hide().appendTo('#members-colleagues').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        membersAllMoreOffset = 0;
        membersColleaguesMoreOffset = 0;
    });

    if( !filtersOpened ){
        GCTUser.GetMembers(limit, offset, filters, function(data){
            var members = data.result;

            if(members.length > 0){
                $('#members-all-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-all').fadeIn(1000);
                });
            } else {
                $('#members-all-more').hide();
                $(noMatches).hide().appendTo('#members-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, offset, filters, function(data){
            var members = data.result;

            if(members.length > 0){
                $('#members-colleagues-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-colleagues').fadeIn(1000);
                });
            } else {
                $('#members-colleagues-more').hide();
                $(noMatches).hide().appendTo('#members-colleagues').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var membersAllMore = $$(page.container).find('#members-all-more');
    membersAllMore.on('click', function (e) {
        GCTUser.GetMembers(limit, membersAllMoreOffset + limit, filters, function(data){
            var members = data.result;

            if(members.length > 0){
                $('#members-all-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-all').fadeIn(1000);
                });
            } else {
                $('#members-all-more').hide();
                $(noMatches).hide().appendTo('#members-all').fadeIn(1000);
            }

            membersAllMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var membersColleaguesMore = $$(page.container).find('#members-colleagues-more');
    membersColleaguesMore.on('click', function (e) {
        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, membersColleaguesMoreOffset + limit, filters, function(data){
            var members = data.result;

            if(members.length > 0){
                $('#members-colleagues-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-colleagues').fadeIn(1000);
                });
            } else {
                $('#members-colleagues-more').hide();
                $(noMatches).hide().appendTo('#members-colleagues').fadeIn(1000);
            }

            membersColleaguesMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshMembers = $$(page.container).find('.pull-to-refresh-content');
    refreshMembers.on('refresh', function (e) {
        GCTUser.GetMembers(limit, offset, filters, function(data){
            var members = data.result;
            $('#members-all').html('');

            var content = "";
            if(members.length > 0){
                $('#members-all-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-all').fadeIn(1000);
                });
            } else {
                $('#members-all-more').hide();
                $(noMatches).hide().appendTo('#members-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetMembersByUserColleague(GCTUser.Email(), limit, offset, filters, function(data){
            var members = data.result;
            $('#members-colleagues').html('');

            var content = "";
            if(members.length > 0){
                $('#members-colleagues-more').show();
                $.each(members, function (key, value) {
                    var content = GCTEach.Member(value);
                    $(content).hide().appendTo('#members-colleagues').fadeIn(1000);
                });
            } else {
                $('#members-colleagues-more').hide();
                $(noMatches).hide().appendTo('#members-colleagues').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        membersAllMoreOffset = 0;
        membersColleaguesMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
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
                    var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
                    var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
                    var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
                    var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
                    var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
    var limit = 20;
    var offset = 0;
    var blogsMoreOffset = 0;
    var filters = {};
    var filtersOpened = false;

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#blog-name").val('');

        GCTUser.GetBlogs(limit, offset, filters, function(data){
            var blogs = data.result;
            $('#blogs-all').html('');

            if(blogs.length > 0){
                $('#blogs-more').show();
                $.each(blogs, function (key, value) {
                    var content = GCTEach.Blog(value);
                    $(content).hide().appendTo('#blogs-all').fadeIn(1000);
                });
            } else {
                $('#blogs-more').hide();
                $(noMatches).hide().appendTo('#blogs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        blogsMoreOffset = 0;
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#blog-name").val();
        if( $("#blog-name").val() == "" ){
            filters = "";
        }

        GCTUser.GetBlogs(limit, offset, filters, function(data){
            var blogs = data.result;
            $('#blogs-all').html('');

            if(blogs.length > 0){
                $('#blogs-more').show();
                $.each(blogs, function (key, value) {
                    var content = GCTEach.Blog(value);
                    $(content).hide().appendTo('#blogs-all').fadeIn(1000);
                });
            } else {
                $('#blogs-more').hide();
                $(noMatches).hide().appendTo('#blogs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        blogsMoreOffset = 0;
    });

    if( !filtersOpened ){
        GCTUser.GetBlogs(limit, offset, filters, function(data){
            var blogs = data.result;

            if(blogs.length > 0){
                $('#blogs-more').show();
                $.each(blogs, function (key, value) {
                    var content = GCTEach.Blog(value);
                    $(content).hide().appendTo('#blogs-all').fadeIn(1000);
                });
            } else {
                $('#blogs-more').hide();
                $(noMatches).hide().appendTo('#blogs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var blogsMore = $$(page.container).find('#blogs-more');
    blogsMore.on('click', function (e) {
        GCTUser.GetBlogs(limit, blogsMoreOffset + limit, filters, function(data){
            var blogs = data.result;

            if(blogs.length > 0){
                $('#blogs-more').show();
                $.each(blogs, function (key, value) {
                    var content = GCTEach.Blog(value);
                    $(content).hide().appendTo('#blogs-all').fadeIn(1000);
                });
            } else {
                $('#blogs-more').hide();
                $(noMatches).hide().appendTo('#blogs-all').fadeIn(1000);
            }
            blogsMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshBlogs = $$(page.container).find('.pull-to-refresh-content');
    refreshBlogs.on('refresh', function (e) {
        GCTUser.GetBlogs(limit, offset, filters, function(data){
            var blogs = data.result;

            if(blogs.length > 0){
                $('#blogs-more').show();
                var content = "";
                $.each(blogs, function (key, value) {
                    content += GCTEach.Blog(value);
                });
                $('#blogs-all').html('');
                $(content).hide().appendTo('#blogs-all').fadeIn(1000);
            } else {
                $('#blogs-more').hide();
                $(noMatches).hide().appendTo('#blogs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        blogsMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('bookmarks', function (page) {
    var limit = 10;
    var offset = 0;
    var filters = [];
    var filtersOpened = false;
    var bookmarksAllMoreOffset = 0;
    var bookmarksColleaguesMoreOffset = 0;
    var bookmarksMineMoreOffset = 0;

    $('#clear-filters').on('click', function () {
        filtersOpened = false;
        filters = {};
        $('#bookmark-filters').val('');
        $('#bookmark-name').val('');

        GCTUser.GetBookmarks(limit, offset, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-all').fadeIn(1000);
                });
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-all').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
        GCTUser.GetBookmarksByUserColleague(limit, offset, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                $.each(bookmarks, function (key, value) {
                    console.log(value);
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
                });
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
        //GCTUser.bookmarks here

        bookmarksAllMoreOffset = 0;
        bookmarksColleaguesMoreOffset = 0;
        bookmarksMineMoreOffset = 0;
    });

    $('#save-filters').on('click', function () {
        filtersOpened = true;
        filters['type'] = ""; //$("#bookmark-filters").val();
        filters['name'] = $("#bookmark-name").val();
        if ($("#bookmark-filters").val() == "" && $("#bookmark-name").val() == "") {
            filters = "";
        }

       //GCTUser.bookmarks here

        bookmarksAllMoreOffset = 0;
        bookmarksColleaguesMoreOffset = 0;
        bookmarksMineMoreOffset = 0;
    });

    if (!filtersOpened) {
        GCTUser.GetBookmarks(limit, offset, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-all').fadeIn(1000);
                });
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-all').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
        GCTUser.GetBookmarksByUserColleague(limit, offset, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
                });
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            });
        GCTUser.GetBookmarksByUser(limit, offset, '', function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-mine-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-mine').fadeIn(1000);
                });
            } else {
                $('#bookmarks-mine-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-mine').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var bookmarksAllMore = $$(page.container).find('#bookmarks-all-more');
    bookmarksAllMore.on('click', function (e) {
        GCTUser.GetBookmarks(limit, bookmarksAllMoreOffset + limit, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-all').fadeIn(1000);
                });
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-all').fadeIn(1000);
            }
            bookmarksAllMoreOffset += limit;
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });


    var bookmarksColleaguesMore = $$(page.container).find('#bookmarks-colleagues-more');
    bookmarksColleaguesMore.on('click', function (e) {
        GCTUser.GetBookmarksByUserColleague(limit, bookmarksColleaguesMoreOffset + limit , filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
                });
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
            }
            bookmarksColleaguesMoreOffset += limit;
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var bookmarksMineMore = $$(page.container).find('#bookmarks-mine-more');
    bookmarksAllMore.on('click', function (e) {
        GCTUser.GetBookmarksByUser(limit, bookmarksMineMoreOffset + limit, '', function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-mine-more').show();
                $.each(bookmarks, function (key, value) {
                    var content = GCTEach.Bookmark(value);
                    $(content).hide().appendTo('#bookmarks-mine').fadeIn(1000);
                });
            } else {
                $('#bookmarks-mine-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-mine').fadeIn(1000);
            }
            bookmarksMineMoreOffset += limit;
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshBookmarks = $$(page.container).find('.pull-to-refresh-content');
    refreshBookmarks.on('refresh', function (e) {
        GCTUser.GetBookmarks(limit, offset, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                var content = "";
                $.each(bookmarks, function (key, value) {
                    content += GCTEach.Bookmark(value);
                });
                $('#bookmarks-all').html('');
                $(content).hide().appendTo('#bookmarks-all').fadeIn(1000);
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-all').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
        GCTUser.GetBookmarksByUserColleague(limit, offset, filters, function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-all-more').show();
                var content = "";
                $.each(bookmarks, function (key, value) {
                    content += GCTEach.Bookmark(value);
                });
                $('#bookmarks-colleagues').html('');
                $(content).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
            } else {
                $('#bookmarks-all-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-colleagues').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
        GCTUser.GetBookmarksByUser(limit, offset, '', function (data) {
            var bookmarks = data.result;
            if (bookmarks.length > 0) {
                $('#bookmarks-mine-more').show();
                var content = "";
                $.each(bookmarks, function (key, value) {
                    console.log(value);
                    content += GCTEach.Bookmark(value);
                });
                $('#bookmarks-mine').html('');
                $(content).hide().appendTo('#bookmarks-mine').fadeIn(1000);
            } else {
                $('#bookmarks-mine-more').hide();
                $(noMatches).hide().appendTo('#bookmarks-mine').fadeIn(1000);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });

        bookmarksAllMoreOffset = 0;
        bookmarksColleaguesMoreOffset = 0;
        bookmarksMineMoreOffset = 0;

        myApp.pullToRefreshDone();
    });

});

myApp.onPageInit('docs', function (page) {
    var limit = 20;
    var offset = 0;
    var docsMoreOffset = 0;
    var filters = {};
    var filtersOpened = false;

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#doc-name").val('');

        GCTUser.GetDocs(limit, offset, filters, function(data){
            var docs = data.result;
            $('#docs-all').html('');

            if(docs.length > 0){
                $('#docs-more').show();
                $.each(docs, function (key, value) {
                    var content = GCTEach.Doc(value);
                    $(content).hide().appendTo('#docs-all').fadeIn(1000);
                });
            } else {
                $('#docs-more').hide();
                $(noMatches).hide().appendTo('#docs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        docsMoreOffset = 0;
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['name'] = $("#doc-name").val();
        if( $("#doc-name").val() == "" ){
            filters = "";
        }

        GCTUser.GetDocs(limit, offset, filters, function(data){
            var docs = data.result;
            $('#docs-all').html('');

            if(docs.length > 0){
                $('#docs-more').show();
                $.each(docs, function (key, value) {
                    var content = GCTEach.Doc(value);
                    $(content).hide().appendTo('#docs-all').fadeIn(1000);
                });
            } else {
                $('#docs-more').hide();
                $(noMatches).hide().appendTo('#docs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        docsMoreOffset = 0;
    });

    if( !filtersOpened ){
        GCTUser.GetDocs(limit, offset, filters, function(data){
            var docs = data.result;

            if(docs.length > 0){
                $('#docs-more').show();
                $.each(docs, function (key, value) {
                    var content = GCTEach.Doc(value);
                    $(content).hide().appendTo('#docs-all').fadeIn(1000);
                });
            } else {
                $('#docs-more').hide();
                $(noMatches).hide().appendTo('#docs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var docsMore = $$(page.container).find('#docs-more');
    docsMore.on('click', function (e) {
        GCTUser.GetDocs(limit, docsMoreOffset + limit, filters, function(data){
            var docs = data.result;

            if(docs.length > 0){
                $('#docs-more').show();
                $.each(docs, function (key, value) {
                    var content = GCTEach.Doc(value);
                    $(content).hide().appendTo('#docs-all').fadeIn(1000);
                });
            } else {
                $('#docs-more').hide();
                $(noMatches).hide().appendTo('#docs-all').fadeIn(1000);
            }

            docsMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshDocs = $$(page.container).find('.pull-to-refresh-content');
    refreshDocs.on('refresh', function (e) {
        GCTUser.GetDocs(limit, offset, filters, function(data){
            var docs = data.result;

            if(docs.length > 0){
                $('#docs-more').show();
                var content = "";
                $.each(docs, function (key, value) {
                    content += GCTEach.Doc(value);
                });
                $('#docs-all').html('');
                $(content).hide().appendTo('#docs-all').fadeIn(1000);
            } else {
                $('#docs-more').hide();
                $(noMatches).hide().appendTo('#docs-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        docsMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('events', function (page) {
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
    var offset = 0;
    var eventsMoreOffset = 0;
    var counter = 1;
    var filters = {};
    var filtersOpened = false;

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
        eventsArray = [];
        filters = {};
        $("#events-from").val('');
        $("#events-to").val('');
        from = new Date().toString();
        to = "";

        GCTUser.GetEvents(from, to, limit, offset, function(data){
            var events = data.result;
            $('#events-all').html('');

            if(events.length > 0){
                $('#events-more').show();
                $('#events-calendar').html('');
                $.each(events, function (key, value) {
                    var date = (value.startDate).split(" ")[0];
                    var split = date.split("-");
                    var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                    eventsArray.push(day)
                    var content = GCTEach.Event(value);
                    $(content).hide().appendTo('#events-all').fadeIn(1000);
                    counter++;
                });

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
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            eventCalendar.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            eventCalendar.nextMonth();
                        });
                    },
                    onMonthYearChangeStart: function (p, year, month) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                    },
                    onDayClick: function (p, dayContainer, year, month, day) {
                        var date = $(dayContainer).data('date');
                    }
                });
            } else {
                $('#events-more').hide();
                $(noMatches).hide().appendTo('#events-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        eventsMoreOffset = 0;
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

        GCTUser.GetEvents(from, to, limit, offset, function(data){
            var events = data.result;
            $('#events-all').html('');

            if(events.length > 0){
                $('#events-more').show();
                $('#events-calendar').html('');
                $.each(events, function (key, value) {
                    var date = (value.startDate).split(" ")[0];
                    var split = date.split("-");
                    var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                    eventsArray.push(day)
                    var content = GCTEach.Event(value);
                    $(content).hide().appendTo('#events-all').fadeIn(1000);
                    counter++;
                });

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
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            eventCalendar.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            eventCalendar.nextMonth();
                        });
                    },
                    onMonthYearChangeStart: function (p, year, month) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                    },
                    onDayClick: function (p, dayContainer, year, month, day) {
                        var date = $(dayContainer).data('date');
                        if( $("#event-" + date).length > 0 ){
                            $$('.page-content').scrollTop($$("#event-" + date).offset().top, 300);
                        }
                    }
                });
            } else {
                $('#events-more').hide();
                $(noMatches).hide().appendTo('#events-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        eventsMoreOffset = 0;
    });

    if (!filtersOpened) {
        GCTUser.GetEvents(from, to, limit, offset, function(data){
            var events = data.result;
            $('#events-all').html('');

            if(events.length > 0){
                $('#events-more').show();
                $('#events-calendar').html('');
                $.each(events, function (key, value) {
                    var date = (value.startDate).split(" ")[0];
                    var split = date.split("-");
                    var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                    eventsArray.push(day)
                    var content = GCTEach.Event(value);
                    $(content).hide().appendTo('#events-all').fadeIn(1000);

                    counter++;
                });

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
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            eventCalendar.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            eventCalendar.nextMonth();
                        });
                    },
                    onMonthYearChangeStart: function (p, year, month) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                    },
                    onDayClick: function (p, dayContainer, year, month, day) {
                        var date = $(dayContainer).data('date');
                        if( $("#event-" + date).length > 0 ){
                            $$('.page-content').scrollTop($$("#event-" + date).offset().top, 300);
                        }
                    }
                });
            } else {
                $('#events-more').hide();
                $(noMatches).hide().appendTo('#events-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var eventsMore = $$(page.container).find('#events-more');
    eventsMore.on('click', function (e) {
        GCTUser.GetEvents(from, to, limit, eventsMoreOffset + limit, function(data){
            var events = data.result;

            if( events.length > 0 ){
                $('#events-more').show();
                $.each(events, function (key, value) {
                    var date = (value.startDate).split(" ")[0];
                    var split = date.split("-");
                    var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                    eventsArray.push(day)
                    var content = GCTEach.Event(value);
                    $(content).hide().appendTo('#events-all').fadeIn(1000);
                    counter++;
                });

                eventsMoreOffset += limit;

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
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            eventCalendar.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            eventCalendar.nextMonth();
                        });
                    },
                    onMonthYearChangeStart: function (p, year, month) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                    },
                    onDayClick: function (p, dayContainer, year, month, day) {
                        var date = $(dayContainer).data('date');
                        if( $("#event-" + date).length > 0 ){
                            $$('.page-content').scrollTop($$("#event-" + date).offset().top, 300);
                        }
                    }
                });
            } else {
                $('#events-more').hide();
                $(noMatches).hide().appendTo('#events-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });
});

myApp.onPageInit('opportunities', function (page) {
    var limit = 20;
    var offset = 0;
    var opportunitiesMoreOffset = 0;
    var filters = {};
    var filtersOpened = false;

    $('#clear-filters').on('click', function() {
        filtersOpened = false;
        filters = {};
        $("#opportunity-filters").val('');
        $("#opportunity-name").val('');

        GCTUser.GetOpportunities(limit, offset, filters, function(data){
            var opportunities = data.result;
            $('#opportunities-all').html('');

            if(opportunities.length > 0){
                $('#opportunities-more').show();
                $.each(opportunities, function (key, value) {
                    var content = GCTEach.Opportunity(value);
                    $(content).hide().appendTo('#opportunities-all').fadeIn(1000);
                });
            } else {
                $('#opportunities-more').hide();
                $(noMatches).hide().appendTo('#opportunities-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        opportunitiesMoreOffset = 0;
    });

    $('#save-filters').on('click', function() {
        filtersOpened = true;
        filters['type'] = $("#opportunity-filters").val();
        filters['name'] = $("#opportunity-name").val();
        if( $("#opportunity-filters").val() == "" && $("#opportunity-name").val() == "" ){
            filters = "";
        }

        GCTUser.GetOpportunities(limit, offset, filters, function(data){
            var opportunities = data.result;
            $('#opportunities-all').html('');

            if(opportunities.length > 0){
                $('#opportunities-more').show();
                $.each(opportunities, function (key, value) {
                    var content = GCTEach.Opportunity(value);
                    $(content).hide().appendTo('#opportunities-all').fadeIn(1000);
                });
            } else {
                $('#opportunities-more').hide();
                $(noMatches).hide().appendTo('#opportunities-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        opportunitiesMoreOffset = 0;
    });

    if( !filtersOpened ){
        GCTUser.GetOpportunities(limit, offset, filters, function(data){
            var opportunities = data.result;

            if(opportunities.length > 0){
                $('#opportunities-more').show();
                $.each(opportunities, function (key, value) {
                    var content = GCTEach.Opportunity(value);
                    $(content).hide().appendTo('#opportunities-all').fadeIn(1000);
                });
            } else {
                $('#opportunities-more').hide();
                $(noMatches).hide().appendTo('#opportunities-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    }

    var opportunitiesMore = $$(page.container).find('#opportunities-more');
    opportunitiesMore.on('click', function (e) {
        GCTUser.GetOpportunities(limit, opportunitiesMoreOffset + limit, filters, function(data){
            var opportunities = data.result;

            if(opportunities.length > 0){
                $('#opportunities-more').show();
                $.each(opportunities, function (key, value) {
                    var content = GCTEach.Opportunity(value);
                    $(content).hide().appendTo('#opportunities-all').fadeIn(1000);
                });
            } else {
                $('#opportunities-more').hide();
                $(noMatches).hide().appendTo('#opportunities-all').fadeIn(1000);
            }

            opportunitiesMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshOpportunities = $$(page.container).find('.pull-to-refresh-content');
    refreshOpportunities.on('refresh', function (e) {
        GCTUser.GetOpportunities(limit, offset, filters, function(data){
            var opportunities = data.result;

            if(opportunities.length > 0){
                $('#opportunities-more').show();
                var content = "";
                $.each(opportunities, function (key, value) {
                    content += GCTEach.Opportunity(value);
                });
                $('#opportunities-all').html('');
                $(content).hide().appendTo('#opportunities-all').fadeIn(1000);
            } else {
                $('#opportunities-more').hide();
                $(noMatches).hide().appendTo('#opportunities-all').fadeIn(1000);
            }
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        opportunitiesMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('profile', function (page) {
    var guid = page.query.guid; // Checks guid of page, as any link to profile should include the target guid
    var profile_limit = 10;
    /* TODO: Tab objects to hold loaded and offset variables. */
    var ld_groups = false; //keeps track of group tab being loaded for the on show of tab
    var offset_groups = 0;
    var ld_activity = false; // Keeps track of activity tab being loaded for the on show of tab
    var offset_activity = 0;
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

        $("#user-icon").attr('src', profileData.iconURL);
        $("#user-title").html(profileData.displayName).text();
        $("#user-department").html(profileData.department).text();
        
        if (!isOwnProfile) {
            var content ='<div class="col-50"><a href="#" class="button button-fill button-raised" data-name="' + profileData.displayName + '" data-guid="' + profileData.id + '" onclick="GCTUser.NewMessage(this);">' + GCTLang.Trans("message") + '</a></div>'
                + '<div class="col-50">' + colleagueButton + '</div>'
                // + '<div class="col-33"><a href="#" class="button button-fill button-raised" data-guid="' + profileData.displayName + '" onclick="GCTUser.BlockUser(this);">' + GCTLang.Trans("blockuser") + '</a></div>'
                + '</div>';
            $("#action-buttons").html(content).text();
        }

        profile = '<ul>';
        listItem = '<div class="item-title label">' + GCTLang.Trans('name') + '</div>'
            + '<div class="item-text">' + profileData.displayName + '</div>';
        profile += GCTLang.txtUserList(listItem);

        if (profileData.hasOwnProperty("jobTitle") && profileData.jobTitle !== null && profileData.jobTitle !== "") {
            listItem = '<div class="item-title label">' + GCTLang.Trans('job-title') + '</div>'
                + '<div class="item-text">' + profileData.jobTitle + '</div>';
            profile += GCTLang.txtUserList(listItem);
        }

        listItem = '<div class="item-title label">' + GCTLang.Trans('email') + '</div>'
            + '<div class="item-text"><a class="external" href="mailto:' + profileData.email + '">' + profileData.email + '</a></div>';
        profile += GCTLang.txtUserList(listItem);

        if (profileData.hasOwnProperty("telephone") && profileData.telephone !== null && profileData.telephone !== "") {
            listItem ='<div class="item-title label">' + GCTLang.Trans('phone') + '</div>'
                + '<div class="item-text"><a class="external" href="tel:' + profileData.telephone + '">' + profileData.telephone + '</a></div>';
            profile += GCTLang.txtUserList(listItem);
        }
        if (profileData.hasOwnProperty("about_me") && profileData.about_me !== null && profileData.about_me !== "") {
            profile += '<li class="align-top">'
                + '<div class="item-content">'
                + '<div class="item-inner">'
                + '<div class="item-title label">' + GCTLang.Trans('about-me') + '</div>'
                + '<div class="item-text large" onclick="ToggleAllText(this);">' + profileData.about_me + '</div>'
                + '</div>'
                + '</div>'
                + '</li>';
        }

        profile += "</ul>";
        $("#user-info-list").html(profile).text();

        $("#wire-num").html(profileData.wires).text();
        $("#blog-num").html(profileData.blogs).text();
        $("#colleague-num").html(profileData.colleagues).text();

        if (profileData.hasOwnProperty("links")) {
            var links = '<div class="center">' + GCTLang.Trans('social-media') + '</div>'
                + '<ul class="socials">';
            if (profileData.links.hasOwnProperty("github")) { links += '<li><a id="user-github" href="' + profileData.links.github + '" class="gh external"><i class="fa fa-github"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("twitter")) { links += '<li><a id="user-twitter" href="' + profileData.links.twitter + '" class="tw external"><i class="fa fa-twitter"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("linkedin")) { links += '<li><a id="user-linkedin" href="' + profileData.links.linkedin + '" class="li external"><i class="fa fa-linkedin"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("facebook")) { links += '<li><a id="user-facebook" href="' + profileData.links.facebook + '" class="fb external"><i class="fa fa-facebook"></i></a></li>'; }
            $("#social-media").html(links).text();
        }
        
    }, function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });

    /* Generate the popover drop down for user profile navigation on click */
    $("#profile-menu").on('click', function (e) {
        var popoverHTML = '<div class="popover pop-profile-menu">'
            + '<div class="popover-inner">'
            + '<div class="list-block">'
            + '<ul>';
        
            popoverHTML += '<li><a href="#tab-user-activity" class="button tab-link" data-translate="activity">Activity</a></li>';
        
        popoverHTML += '</ul>'
            + '</div>'
            + '</div>'
            + '</div>';
        myApp.popover(popoverHTML, this);
    });

    $$('#tab-user-groups').on('show', function (e) {
        if (!ld_groups) {
            ld_groups = true;
            GCTUser.GetUserGroups(guid, function (data2) {
                var groupData = data2.result;

                var groups = "";
                $(groupData).each(function (key, value) {
                    // Removes HTML components from Blog
                    var text = (value.description !== null) ? value.description : "";

                    var members = (value.count > 0) ? value.count + (value.count == 1 ? " member" : " members") : "";
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

                $('#user-groups').html(groups);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        } 
    });
    
    $$('#tab-user-activity').on('show', function (e) {
        if (!ld_activity) {
            ld_activity = true;
            GCTUser.GetUserActivity(guid, profile_limit, 0, function (data3) {
                var activityData = data3.result;

                var activity = "";
                $('#user-activity').html(activity); //Clear activity on first load, see if fixes issue
                $(activityData).each(function (key, value) {
                    var content = GCTEach.Activity(value);

                    $(content).appendTo('#user-activity');
                });
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    });
    $(document).on('click', '#user-activity-more', function (e) {
        GCTUser.GetUserActivity(guid, profile_limit, offset_activity + profile_limit, function (data3) {
            var activityData = data3.result;

            var activity = "";
            $(activityData).each(function (key, value) {
                var content = GCTEach.Activity(value);

                $(content).appendTo('#user-activity');
            });
            offset_activity += profile_limit;

        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

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

myApp.onPageInit('register', function (page) {

    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        return re.test(email);
    }

    $(document).on('change', '#registerForm .error', function (e) {
        if( $(this).val() != "" ){
            $(this).removeClass('error');
        }
    });

    $(document).on('change', '#reg-email', function() {
        if( $(this).val() != "" ){
            if( !validateEmail($(this).val()) ){
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        }
    });

    $(document).on('change', '#toc', function() {
        if( $('#toc').is(':checked') ){
            $('#toc').closest('p').removeClass('error');
        }
    });

    $('#registerBtn').on('click', function (e) {
        var hasErrors = false;

        $('#registerForm input:not(#toc):visible, #registerForm select:visible').each(function(key, value) {
            var id = $(this).attr('id');
            var val = $(this).val();

            if( id == "password" && val.length < 6 ){
                $(this).addClass('error');
                hasErrors = true;
            } else if( val == "" ){
                $(this).addClass('error');
                hasErrors = true;
            }
        });

        if( !validateEmail($('#reg-email').val()) ){
            hasErrors = true;
        }

        if( !$('#toc').is(':checked') ){
            $('#toc').closest('p').addClass('error');
            hasErrors = true;
        }

        if( hasErrors ){
            return false;
        }

        var formValues = getFormData($('#registerForm'));

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            url: GCT.GCcollabURL,
            data: { method:"register.user", email: formValues.email, userdata: JSON.stringify(formValues) },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                if (data.status == -1) {
                    if (data.message.indexOf("ELGG") > -1) {
                        mainView.router.loadPage({ url: 'sign-in.html?register=true&email=' + formValues.email });
                    } else {
                        var message = data.message;
                        var alert = "";
                        if( $.isArray(message) ){
                            $.each(message, function( index, value ) {
                                alert += $(value).text();
                                if(index > 0 && index < message.length){
                                    alert += "<br>";
                                }
                            });
                        }
                        myApp.alert(alert, 'Error');
                    }
                } else {
                    mainView.router.loadPage({ url: 'sign-in.html?register=true&email=' + formValues.email });
                }
            }
        });
    });

    $("#user_type").change(function() {
        var type = $(this).val();
        $('.occupation-choices').hide();

        if (type == 'academic' || type == 'student') {
            if( type == 'academic' ){
                if( $("#institution").val() == 'highschool' ){ $("#institution").prop('selectedIndex', 0); }
                $("#institution option[value='highschool']").hide();
            } else {
                $("#institution option[value='highschool']").show();
            }
            $('#institution-wrapper').fadeIn();
            var institution = $('#institution').val();
            $('#' + institution + '-wrapper').fadeIn();
        } else if (type == 'provincial') {
            $('#provincial-wrapper').fadeIn();
            var province = $('#provincial').val();
            province = province.replace(/\s+/g, '-').toLowerCase();
            $('#' + province + '-wrapper').fadeIn();
        } else {
            $('#' + type + '-wrapper').fadeIn();
        }
    });

    $("#institution").change(function() {
        var type = $(this).val();
        $('.student-choices').hide();
        $('#' + type + '-wrapper').fadeIn();
    });

    $("#provincial").change(function() {
        var province = $(this).val();
        province = province.replace(/\s+/g, '-').toLowerCase();
        $('.provincial-choices').hide();
        $('#' + province + '-wrapper').fadeIn();
    });

    $('.terms').on('click', function (e) {
        e.preventDefault();
        $('.popup-generic .popup-title').html(GCTLang.Trans('terms-and-conditions'));
        $('.popup-generic .popup-content').html($('#terms-content-' + GCTLang.Lang()).html());
        myApp.popup('.popup-generic');
    });
});

myApp.onPageInit('privacy', function (page) {
    $('#privacy-content').html($('#privacy-content-' + GCTLang.Lang()).html());
});

myApp.onPageInit('terms', function (page) {
    $('#terms-content').html($('#terms-content-' + GCTLang.Lang()).html());
});

myApp.onPageInit('faqs', function (page) {
    $('#faqs-content').html($('#faqs-content-' + GCTLang.Lang()).html());
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