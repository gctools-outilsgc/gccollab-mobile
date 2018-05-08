GCTtxt = {
    txtGlobalNav: function (title) {
        var content = '<div class="center" id="page-' + title + '" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0" >' + GCTLang.Trans("page") + GCTLang.Trans(title) + '</div>' +
            '<div class="left sliding"><a href="#" data-panel="left" class="panel-open link icon-only" aria-label="Open Navigation Menu"><i class="fas fa-bars"></i></a></div>' +
            '<div class="title" id="' + title + '" tabindex="0">' + GCTLang.Trans(title) + '</div>' +
            '<div class="right sliding">' +
            '<a href = "#" data-panel="right" class="panel-open link icon-only" aria - label="Open Notification Panel" > <i class="fa fa-bell badge-wrapper"></i></a >' +
            '<a href="#" id="refresh-'+title+'" class="link icon-only" aria-label="refresh-content"><i class="fas fa-sync"></i></a></div > ';
        return content;
    },
    txtFocusMessage: function (id) {
        return '<span id="focus-' + id + '" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0">' + GCTLang.Trans('content-loaded') + '</span>';
    },
    txtAction: function (ref) {
        var action = '';
        switch (ref) {
            case "post-wire":
                action = '<a href="#" class="link icon-only" onclick="GCTUser.PostWirePost();"><i class="fas fa-rss fa-2x"></i></a>';
                break;
            default: ;
        }
        console.log(action);
        return action;
    },
    txtFilterButton: function (ref) {
        var filter = '';
        switch (ref) {
            default: ;
        }
        return filter;
    },

    txtNewsfeed: function (object) {
        var content = "<div class='list cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img aria-hidden='true' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div id='author-" + object.guid + "' class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);' aria-label='More Options'><i class='fa fa-caret-down'></i></a>"
            + "<div class='item-text large'><a onclick='ShowProfile(" + object.owner + ");'>" + object.name + "</a> " + object.description + " " + object.more + object.context + "</div>"
            + object.text
            + object.source
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + object.reply
            + object.action
            + "</div>"
            + "</div>"
            + "</div>";
        return GCT.SetLinks(content);
    },
    txtWire: function (object) {
        var content = "<div class='list cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-content  card-content-padding'>"
            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'  aria-label='More Options'><i class='fa fa-caret-down'></i></a>"
            + "<div id='wire-" + object.guid + "' class='item-text large'>" + object.description + "</div>"
            + "<div class='item-media'>" + object.image + "</div>"
            + object.source
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyWirePost(this);'><i class='fas fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtBlog: function (object) {
        var content = "<div class='list cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<div id='blog-" + object.guid + "' class='card-content-inner'>"

            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'  aria-label='More Options'><i class='fa fa-caret-down'></i></a>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.group + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
}

GCTEach = {
    Newsfeed: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");

        var description = "";
        if (value.action == "update") { //UPDATE
            switch (value.object.type) {
                case "user": description = GCTLang.Trans("new-avatar"); break;
                case "event_calendar": description = GCTLang.Trans("event-update"); break;
                default: description = "NEED TO HANDLE UPDATE";
            }
        } else if (value.action == "create") { // CREATE
            switch (value.object.type) {
                case "wire": description = GCTLang.Trans("wire-create"); break;
                case "blog": description = GCTLang.Trans("blog-create"); break;
                case "group": description = GCTLang.Trans("group-created"); break;
                case "file": description = GCTLang.Trans("file-created"); break;
                case "groupforumtopic": description = GCTLang.Trans("discussion-add"); break;
                case "etherpad": description = GCTLang.Trans("doc-create"); break;
                case "event_calendar": description = GCTLang.Trans("event-create"); break;
                case "bookmarks": description = GCTLang.Trans("bookmark-create"); break;
                case "page_top": description = GCTLang.Trans("page-create"); break;
                default: description = "NEED TO HANDLE CREATE";
            }
        } else { //OTHER
            switch (value.action) {
                case 'friend': description = GCTLang.Trans("friend-added"); break;
                case 'comment': description = GCTLang.Trans("commented"); break;
                case 'reply': description = GCTLang.Trans("discussion-replied"); break;
                case 'join': description = GCTLang.Trans("joined-group"); break;
                case 'vote': description = GCTLang.Trans("voted"); break;
                default: description = "NEED TO HANDLE ELSE";
            }
        }

        var more = "";
        if (value.object.type == "user" && value.action == "update") {
            more = "";
        } else if (value.object.type == "user") {
            more = "<a onclick='GCT.FireLink(this)' href='" + value.object.profileURL + "'>" + value.object.displayName + "</a>";
        } else if (value.object.type == "wire") {
            more = "";
        } else {
            more = "<a onclick='GCT.FireLink(this)' id='info-" + value.object.type + "' href='" + value.object.url + "'>" + value.object.name + "</a>";
        }

        var context = ""; //Currently only content to groups should need context
        if (value.object.group_guid) {
            context = " " + GCTLang.Trans("group-context") + "<a class='link' data-guid='" + value.object.group_guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + value.object.group_title + "</a>";;
        }

        var text = "";
        if (value.object.type == "wire") {
            text = "<blockquote>" + value.object.wire + "</blockquote>";
        } else if (value.object.description) {
            text = "<blockquote class='item-text large'>" + value.object.description + "</blockquote>";
        }

        var source = "";
        if (value.shareText && value.shareURL) {
            source = "<blockquote>" + GCTLang.Trans("source") + "<a onclick='GCT.FireLink(this);' href='" + value.shareURL + "'>" + value.shareText + "</a></blockquote>";
        }

        var action = "";
        var reply = "";
        if (value.object.type == "wire") {
            action = "<a class='link' data-guid='" + value.object_guid + "' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
            reply = "<a href='#' class='link' data-guid='" + value.object_guid + "' data-type='gccollab_wire_post' onclick='GCTUser.ReplyWirePost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>";
        } else if (value.object.type == "blog") {
            action = "<a class='link' data-guid='" + value.object_guid + "' data-type='gccollab_blog_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        }
        
        var content = GCTtxt.txtNewsfeed({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: prettyDate(value.time_posted),
            more: more,
            context: context,
            description: description,
            text: text,
            source: source,
            action: action,
            reply: reply,
            owner: value.subject_guid,
            guid: value.object_guid,
            type: "gccollab_newfeed_post",
            subtype: value.object.type,
            liked: liked,
            likes: likes
        });
        
        return content;
    },
    Wire: function (value) {
        //var imgs = [];
        if (Cookies.get("blocked") == value.userDetails.displayName)
            return;
        // Removes HTML components from Wire
        var text = value.description;

        var source = "";
        if (value.shareText && value.shareURL) {
            source = "<blockquote>" + GCTLang.Trans("source") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_wire_post' href='" + value.shareURL + "'>" + value.shareText + "</a></blockquote>";
        } else if (value.shareURL) {
            source = "<blockquote>" + GCTLang.Trans("source") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_wire_post' href='" + value.shareURL + "'>" + text + "</a></blockquote>";
        }

        var img = '';
        if (value.attachment) {
            img = "<img class='WireImage' onclick='ShowImage(this)' id='image-" + value.guid + "' src='https://gccollab.ca/thewire_image/download/" + value.attachment.guid + "' style='' />";
            //imgs.push(value.guid);
        }

        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        // var action = (value.thread) ? "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>" : "";

        var content = GCTtxt.txtWire({
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
        return content;
    },
    Blog: function (value) {
        var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
        if (value.groupURL.indexOf("/groups/profile/") > -1) {
            var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
        } else {
            var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
        }
        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_blog_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTtxt.txtBlog({
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
            type: "gccollab_blog_post",
            replied: replied,
            liked: liked,
            likes: likes
        });
        return content;

    },
    ContentSuccess: function (data, obj) {
        
        var info = data.result;
        var content = '';
        if (obj.loaded == true) { $(obj.appendMessage).appendTo('#content-' + obj.id); } else { obj.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                content = obj.eachFunc(value);
                $(content).hide().appendTo('#content-' + obj.id).fadeIn(1000);
            });
        }
        if (info.length < obj.limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + obj.id).fadeIn(1000);
            $('#more-' + obj.id).hide();
        }
        obj.offset += obj.limit;
        var focusNow = document.getElementById('focus-' + obj.id);
        if (focusNow) { focusNow.focus(); }
    }
}

GCTtabs = {
    TabReset: function (obj) {
        obj.offset = 0;
        obj.loaded = false;
        $('#content-' + obj.id).html('');
        $('#more-' + obj.id).show();
        obj.request(obj);
    },
}

GCTLang = {
    IsLangSet: function () {
        return (typeof Cookies.get("lang") == "undefined") ? false : true;
    },
    SetAsFrench: function () {
        Cookies.set("lang", "fr", { expires: 100000 });
    },
    SetAsEnglish: function () {
        Cookies.set("lang", "en", { expires: 100000 });
    },
    Lang: function () {
        //### Check Lang cookie for fr, if present return fr else return en
        return (Cookies.get("lang") == 'fr') ? 'fr' : 'en';
    },
    Trans: function (id) {
        if (GCTLang.IsEnglish()) {
            return (English[id]) ? English[id] : "";
        } else {
            return (French[id]) ? French[id] : "";
        }
    },
    TransPage: function () {
        if (GCTLang.IsEnglish()) {
            $('[data-translate]').each(function (key, value) {
                var id = $(this).data('translate');
                var target = $(this).data('translate-target');

                if (English[id]) {
                    if (target) {
                        $(this).attr(target, English[id]);
                    } else {
                        $(this).html(English[id]);
                    }
                }
            });
        } else {
            $('[data-translate]').each(function (key, value) {
                var id = $(this).data('translate');
                var target = $(this).data('translate-target');

                if (French[id]) {
                    if (target) {
                        $(this).attr(target, French[id]);
                    } else {
                        $(this).html(French[id]);
                    }
                }
            });
        }
    },
    IsEnglish: function () {
        return (GCTLang.Lang() == "en");
    },
    IsFrench: function () {
        return (GCTLang.Lang() == "fr");
    },
    ToggleLang: function (reload) {
        if (GCTLang.Lang() == "en") {
            GCTLang.SetAsFrench();
        } else {
            GCTLang.SetAsEnglish();
        }

        if (typeof reload != "undefined" && reload) {
            mainView.router.refreshPage();
            mainView.router.reloadPage("index.html");
        }
    }
};

GCTUser = {
    Login: function (user, password, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "login.user", user: user, password: password, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    Logout: function () {
        if (openid_enabled) {
            app.request({
                url: openid_logout_url,
                type: "GET"
            });
        }
        Cookies.remove('loggedin');
    },
    IsLoggedIn: function () {
        return (typeof Cookies.get('loggedin') != 'undefined') ? Cookies.get('loggedin') : false;
    },
    SetLoginCookie: function () {
        Cookies.set('loggedin', true, { expires: 7 });
    },
    SaveLoginEmail: function (txtObj) {
        Cookies.set("email", txtObj, { expires: 100000 });
    },
    Email: function () {
        return (Cookies.get('email')) ? Cookies.get('email') : "";
    },
    SetUserProfile: function () {
        GCTrequests.GetUserProfile(GCTUser.Email(), function (data) {
            var profileData = data.result;

            if (profileData) {
                $('#imgUserProfilePic').attr('src', profileData.iconURL);
                $('#divUserProfileName').text(profileData.displayName);
                $('#divUserProfileOrg').text(profileData.department);
                Cookies.set("displayName", profileData.displayName, { expires: 100000 });
                Cookies.set("guid", profileData.id, { expires: 100000 });
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log("Set user profile error:");
            console.log(jqXHR, textStatus, errorThrown);
        });
    },

}

GCTrequests = {
    GetUserProfile: function (profile, successCallback, errorCallback) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.user", user: GCTUser.Email(), api_key: api_key_gccollab, profileemail: profile, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBlogs: function (tabObject) {
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.blogposts", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetNewsfeed: function (tabObject) {
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.newsfeed", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWires: function (tabObject) {
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.wireposts", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
}

GCT = {
    GCcollabURL: "https://gccollab.ca/services/api/rest/json",
    /**  FireLink : Handles URLs/Pages
     Each 'if' handles different pages that have been setup. 
     Last 'else if' handles any unimplemented gccollab pages, to be handled by InAppBrowser.

     New Pages: Add a new 'else if' before the last one to handle those urls.
    **/
    FireLink: function (obj) {
        console.log(obj);
        if (obj.href.indexOf("/blog/view/") > -1) {
            console.log('loading blog page...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            lnk = lnk.substr(0, lnk.indexOf("/"));
            console.log(lnk);
            GCTUser.ViewPost(lnk, "gccollab_blog_post");

        } else if (obj.href.indexOf("/thewire/view/") > -1) {
            console.log('loading wire page...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            if (lnk.indexOf("/") > -1) {
                lnk = lnk.substr(0, lnk.indexOf("/"));
            }
            GCTUser.ViewPost(lnk, "gccollab_wire_post");

        } else if (obj.href.indexOf("/docs/view/") > -1) {
            console.log('loading doc page...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            if (lnk.indexOf("/") > -1) {
                lnk = lnk.substr(0, lnk.indexOf("/"));
            }
            GCTUser.ViewPost(lnk, "gccollab_doc", "test");

        } else if (obj.href.indexOf("/groups/profile/") > -1) {
            console.log('loading group profile...');
            lnk = obj.href.substr((obj.href.indexOf("/profile/") + 9));
            console.log(lnk);
            lnk = lnk.substr(0, lnk.indexOf("/"));
            console.log(lnk);
            GCTUser.ViewPost(lnk, "gccollab_group");

        } else if (obj.href.indexOf("/comment/view/") > -1) {
            console.log('loading comment... ' + obj);
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));

            var the_guids = lnk.split('/');
            var the_container_guid = the_guids[1];
            var comment_guid = the_guids[0];

            // TODO: Need to check what entity type the comment was made on, then route to the proper entity type
            // GCTUser.ViewPost(the_container_guid, "???");

            console.log(the_container_guid, comment_guid);
            window.open(obj.href, '_blank');

        } else if (obj.href.indexOf("/missions/view/") > -1) {
            console.log('loading mission...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            console.log(lnk);
            GCTUser.ViewPost(lnk, "gccollab_opportunity");

        } else if (obj.href.indexOf("/event_calendar/view/") > -1) {
            console.log('loading event...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            console.log(lnk);
            GCTUser.ViewPost(lnk, "gccollab_event");

        } else if (obj.href.indexOf("/discussion/view/") > -1) {
            console.log('loading discussion...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            console.log(lnk);
            GCTUser.ViewPost(lnk, "gccollab_discussion_post");

        } else if (obj.href.indexOf("/bookmarks/view/") > -1) {
            console.log('loading bookmark...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            lnk = lnk.substring(0, lnk.indexOf("/"));
            console.log(lnk);
            GCTUser.ViewPost(lnk, "gccollab_bookmark");

        } else if (obj.href.indexOf("https://gccollab.ca/") > -1) {
            console.log('loading collab page...');
            window.open(obj.href, '_blank');

        } else {
            // This shouldn't happen
            console.log('loading external page (Error)');
            window.open(obj.href, '_system');
        }
        return false;
    },
    SiteLink: function (obj) {
        if (obj.href.indexOf("https://gccollab.ca/") > -1) {
            console.log('loading collab page...');
            window.open(obj.href, '_blank');
        } else {
            console.log('non-gccollab link through SiteLink function. (Error)');
            window.open(obj.href, '_system');
        }
    },
    SetLinks: function (html) {
        var con = $.parseHTML(html);

        $(con).find("a").each(function (i, a) {
            h = a.href;
            o = a.onclick;
            if (h.indexOf('javascript:') != 0 && h.indexOf("#") != 0 && typeof o != "function") {
                obj = $($(con).find("a")[i]);
                if (h.indexOf("https://gccollab.ca") == 0 && h.indexOf("thewire_image") == -1) {
                    //### Collab link
                    obj.attr("onclick", "GCT.FireLink(this);");
                    //obj.attr("href", ""); //### Not sure if we need this
                } else {
                    obj.addClass("external");
                }
            }
        });

        html = con[0].outerHTML;
        return html;
    }
}

function listObject(id, limit, eachFunc) {
    var object = {
        offset : 0,
        loaded : false,
        id : id,
        appendMessage: GCTtxt.txtFocusMessage(id),
        eachFunc: eachFunc,
        limit: limit
    };
    console.log(object);
    return object;
}
function tabObject(page, tab, limit, eachFunc, request) {
    var object = {
        offset: 0,
        limit: limit,
        loaded: false,
        id: page + '-' + tab,
        name: tab,
        page: page,
        appendMessage: GCTtxt.txtFocusMessage(page + '-' + tab),
        eachFunc: eachFunc,
        request: request,
    };
    console.log(object);
    return object;
}

function isAppleDevice() {
    return (navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null) ? true : false;
}

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
};

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function prettyDate(date) {
    if (isAppleDevice()) {
        var dateParts = date.substring(0, 10).split('-');
        var timePart = date.substr(11);
        date = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timePart;
        var d = new Date(Date.parse(date));
        var d2 = new Date(Date.parse(date));
    } else {
        var d = new Date(Date.parse(date));
        var d2 = new Date(Date.parse(date));
    }

    var td = new Date();
    // td.setDate(td.getDate() - 1); //Commented out, why compare to yesterday?

    if (d2.setHours(0, 0, 0, 0) == td.setHours(0, 0, 0, 0)) {
        var hours = ((d.getHours() + 11) % 12 + 1);
        var ampm = (d.getHours() >= 12) ? " PM" : " AM";
        var dformat = [hours.padLeft(), d.getMinutes().padLeft()].join(":") + ampm;
    } else if ((addDays(td, -1) + '') === (d2 + '')) {
        var dformat = "Yesterday";
    } else {
        var dformat = [(d.getMonth() + 1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('/');
    }
    return dformat;
}

function errorConsole(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
}

var endOfContent = '<div class="card"><div class="card-content"><div class="card-content-inner"><div class="item-text">' + GCTLang.Trans("end-of-content") + '</div></div></div></div>';

