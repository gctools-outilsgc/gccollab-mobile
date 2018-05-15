GCTtxt = {
    txtGlobalNav: function (title) {
        var content = '<div class="center" id="page-' + title + '" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0" >' + GCTLang.Trans("page") + GCTLang.Trans(title) + '</div>' +
            '<div class="left sliding"><a href="#" data-panel="left" class="panel-open link icon-only" aria-label="Open Navigation Menu"><i class="fas fa-bars"></i></a></div>' +
            '<div class="title" id="' + title + '" tabindex="0">' + GCTLang.Trans(title) + '</div>' +
            '<div class="right sliding">' +
            '<a href = "#" data-panel="right" class="panel-open link icon-only" aria - label="Open Notification Panel" > <i class="fa fa-bell badge-wrapper"></i></a >' +
            '<a href="#" id="refresh-'+ title +'" class="link icon-only" aria-label="refresh-content"><i class="fas fa-sync"></i></a></div > ';
        return content;
    },
    txtGlobalNavGUID: function (title, guid) {
        var content = '<div class="center" id="page-' + title + '-' + guid +'" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0" >' + GCTLang.Trans("page") + GCTLang.Trans(title) + '</div>' +
            '<div class="left sliding"><a href="#" data-panel="left" class="panel-open link icon-only" aria-label="Open Navigation Menu"><i class="fas fa-bars"></i></a></div>' +
            '<div class="title" id="' + title + '-' + guid + '" tabindex="0">' + GCTLang.Trans(title) + '</div>' +
            '<div class="right sliding">' +
            '<a href = "#" data-panel="right" class="panel-open link icon-only" aria - label="Open Notification Panel" > <i class="fa fa-bell badge-wrapper"></i></a >' +
            '<a href="#" id="refresh-' + title + '-' + guid + '" class="link icon-only" aria-label="refresh-content"><i class="fas fa-sync"></i></a></div > ';
        return content;
    },
    txtFocusMessage: function (id) {
        return '<span id="focus-' + id + '" style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px);" tabindex="0">' + GCTLang.Trans('content-loaded') + '</span>';
    },
    txtAction: function (ref) {
        var action = '';
        switch (ref) {
            case "post-home":
                action = '<a id="home-actions" href="#" class="link open-popover" data-popover=".popover-actions" aria-label="Create a new Post Menu Options"><i class="fa fa-plus fa-2x"></i></a>';
                break;
            case "post-wire":
                action = '<a href="#" class="link icon-only" onclick="GCTUser.PostWirePost();"><i class="fas fa-rss fa-2x"></i></a>';
                break;
            case "post-blog":
                action = '<a href="#" onclick="GCTUser.PostBlogPost();" class="right link icon-only "><i class="fas fa-edit fa-2x"></i></a>'
            case "post-opp":
                action = '<a href="#" aria-label="create mission Créer une mission" class="link icon-only" onclick="GCTUser.CreateNewOpportunity();"><i class="fa fa-briefcase fa-2x"></i></a>'
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
    txtTabHeader: function (ref) {
        var header = '';
        switch (ref) {
            case 'newsfeed':
                header = '<div class="block small"><div class="row"><div class="col-66"><h2 class="no-margin" data-translate="newsfeed" tabindex="0" id="tabheader-home-newsfeed">' + GCTLang.Trans("newsfeed") +'</h2></div></div></div>';
                break;
            case 'the-wire':
                header = '<div class="block small"><div class="row"><div class="col-66"><h2 class="no-margin" data-translate="the-wire" tabindex="0" id="tabheader-home-wire">' + GCTLang.Trans("the-wire") + '</h2></div>'
                    + '<div class="col-33"><a href="/list-template/wires/" class="button button-fill pull-right" >' + GCTLang.Trans("view-all") +'</a></div></div></div>';
                break;
            case 'blogs':
                header = '<div class="block small"><div class="row"><div class="col-66"><h2 class="no-margin" data-translate="blogs" tabindex="0" id="tabheader-home-wire">' + GCTLang.Trans("blogs") + '</h2></div>'
                    + '<div class="col-33"><a href="/list-template/blogs/" class="button button-fill pull-right" >' + GCTLang.Trans("view-all") + '</a></div></div></div>';
            default: ;
        }
        return header;
    },
    txtUserList: function (content) {
        var contentNew = '<li>'
            + '<div class="item-content">'
            + '<div class="item-inner">'
            + content
            + '</div>'
            + '</div>'
            + '</li>'
            + '<li>';
        return contentNew;
    },
    txtProfileExp: function (object) {
        var content = '<div class="item-text large" onclick="ToggleAllText(this);">'
            + "<div class='bolder-title'>" + object.title + "</div> "
            + "<div class='norm-text'><i>" + object.subtitle + "<br>" + object.startDate + " to " + object.endDate + "</i></div>"
            + "<div class='norm-text all_text'>" + object.text + "</div>" + '</div>' + "<br>";
        return content;
    },

    txtNewsfeed: function (object) {
        var content = "<div aria-label='"+object.label+"' tabindex='0'><div class='card' aria-hidden='true' >"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img aria-hidden='true' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div id='author-" + object.guid + "' class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time-" + object.guid + "' tabindex='-1'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);' aria-label='More Options'><i class='fa fa-caret-down'></i></a>"
            + "<div role='article' id='text-" + object.guid + " 'class='text'><a onclick='ShowProfile(" + object.owner + ");'>" + object.name + "</a> " + object.description + " " + object.more + object.context 
            + object.text
            + object.source
            + "</div></div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + object.reply
            + object.action
            + "</div>"
            + "</div></div>";
        return GCT.SetLinks(content);
    },
    txtActivity: function (object) {
        var content = "<li class='item-link item-content'>"
            + "<div class='item-inner'>"
            + "<div class='row'>"
            + "<div class='col-20'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' width='50' alt='" + object.name + "'></div>"
            + "<div class='col-80 item-text more_text'>" + object.name + object.description + object.type;
        if (object.showMore) {
            content += "<blockquote>" + object.extra + "</blockquote>";
        }
        content += "</div>"
            + "</div>"
            + "</div>"
            + "</li>";
        return content;
    },
    txtWire: function (object) {
        var content = "<div class='card' role='article'>"
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
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtBlog: function (object) {
        var content = "<div class='card'>"
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
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtGroup: function (object) {
        var content ="<div class='card' data-guid='" + object.owner + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>"
            + "<div class='card-header'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<div class='card-content-inner'>"
            + "<div class='item-text large'>" + object.description + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<div>" + object.count + "</div>"
            + object.action
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtMember: function (object) {
        var content = "<a class='item-link item-content close-popup close-panel' data-guid='" + object.guid + "' data-type='gccollab_user' onclick='ShowProfile(" + object.guid + ");'>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row no-padding-right'>"
            + "</div>"
            + "<div class='row ptm'>"
            + "<div class='col-20 members-icon'><img src='" + object.icon + "' width='50' alt='" + object.name + "'></div>"
            + "<div class='col-80 item-title reg-text'>" + object.name + "<div class='item-text more_text'>" + object.organization + "</div> <div class='item-text more_text'> " + object.job + "</div></div>"
            + "</div>";
        (object.colleaguerequest == true) ? content += object.description : content += '';
        content += "</div>"
            + "</a>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtDoc: function (object) {
        var content ="<div class='card'>"
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
            + "<div class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtEvent: function (object) {
        var content = "<div id='" + object.id + "' class='card'>"
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
            + "<div class='card-content-inner'>"
            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'  aria-label='More Options'><i class='fa fa-caret-down'></i></a>"

            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='item-text large'>" + object.startDate + "<br>" + object.endDate + "</div>"
            + "<div class='item-text large'>" + object.location + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + "<br>" + object.description + "</div>";

        if (object.fullview) { //implement parts for full events popup, rather than the events list
            content += "<div class='item-text large'>" + "" + "</div>" //placeholder for text after desc
                + "</div>"
                + "</div>"
                + "<div class='card-content'>" + "<hr>"
                + "<div class='card-content-inner'>"
                + "<div class='blog-title'>" + object.additionalTitle + "</div>"
                + "<div class='item-text large'>" + object.org + "</div>"
                + "<div class='item-text large'>" + object.phone + "</div>"
                + "<div class='item-text large'>" + object.email + "</div>"
                + "<div class='item-text large'>" + object.fee + "</div>"
                + "<div class='item-text large'>" + object.eventLang + "</div>";
        }
        content += "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' aria-label='like aimer' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + object.action

            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtBookmark: function (object) {
        var content = "<div class='card'>"
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
            + "<div class='card-content-inner'>"

            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);' aria-label='More Options'><i class='fa fa-caret-down'></i></a>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.posted + "</div>"
            + "<div class='item-text large'>" + object.description + "</div>"
            + "<div class='blog-group'>" + "Link: " + object.address + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<div  class='link like " + object.liked + "'><a href='#' aria-label='like aimer' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='far fa-thumbs-up'></i></a> <a href='#' aria-label='See who liked this Voir qui a aimer' data-guid=" + object.guid + " onclick='GCTUser.GetLikeUsers(this);'><span class='like-count'>" + object.likes + "</span></a></div>"
            + object.action
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtOpps: function (object) {

        if (object.state == 'posted') {
            var content = "<div class='card view view-main'>"
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
                + "<div class='card-content-inner'" + object.all_text + ">"
                + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);' aria-label='More Options'><i class='fa fa-caret-down'></i></a>"
                + "<div class='blog-title'>" + object.title + "</div>"
                + "<div class='title'> <b>" + object.jobtype + "(" + object.roletype + ")" + "</b></div>"
                + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>";

            if (object.fullview) { //implement parts for full events popup, rather than the events list
                content += "<div class='item-text large'>" + "" + "</div>" //placeholder for text after desc
                    + "</div>"
                    + "</div>"
                    + "<div class='card-content'>" + "<hr>"
                    + "<div class='card-content-inner'>"
                    + "<div class='blog-title'>" + object.additionalTitle + "</div>" //change from 'blog' title later
                    + "<div class='item-text'>" + object.programArea + "</div>"
                    + "<div class='item-text'>" + object.numOpportunities + "</div>"
                    + "<div class='item-text'>" + object.idealComplete + "</div>"
                    + "<div class='item-text large'>" + object.deadline + "</div>"
                    + "<div class='item-text large'>" + object.oppVirtual + "</div>"
                    + "<div class='item-text large'>" + object.oppOnlyIn + "</div>"
                    + "<div class='item-text large'>" + object.location + "</div>"
                    + "<div class='item-text large'>" + object.security + "</div>"
                    + "<div class='item-text large'>" + object.skills + "</div>"
                    + "<br>"
                    + "<div class='blog-title'>" + GCTLang.Trans('opportunity-language-requirements') + "</div>" //change to smaller title later
                    + "<div class='item-text large'>" + object.languageReq + "</div>"
                    + "<br>"
                    + "<div class='blog-title'>" + GCTLang.Trans("opportunity-scheduling-requirements") + "</div>" //change to smaller title later
                    + "<div class='item-text large'>" + object.timecommitment + "</div>"
                    + "<div class='item-text large'>" + object.timezone + "</div>"
                    + "<div class='item-text large'>" + object.schedulingReq + "</div>"
                    + "<br>"
                    + "<div class='item-text large'>" + object.participants + "</div>"
                    + "<div class='item-text large'>" + object.applicants + "</div>";
            } else {
                content += "<div class='item-text large'>" + object.deadline + "</div>"
                    + "<div class='item-text'>" + object.programArea + "</div>";
            }
            content += "</div>"
                + "</div>"
                + "<div class='card-footer'>"
            content += object.action
            if (object.apply == 'mission_apply') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ApplyPost(this);'> <span>" + GCTLang.Trans('apply-opt') + "</span></a>"; }
            else if (object.apply == 'withdraw') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>" + GCTLang.Trans('withdrawn-opt') + "</span></a>"; }
            else if (object.apply == 'offered') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.AcceptPost(this);'> <span>" + GCTLang.Trans('accept-opt') + "</span></a><a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>" + GCTLang.Trans('decline-opt') + "</span></a>"; }

            content += "</div>"
                + "</div>";
        } else {
            var content = "<div class='swiper-slide list-block cards-list'>";// need something hidden 
        }
        content = GCT.SetLinks(content);
        return content;

    },
}

GCTEach = {
    Newsfeed: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var label = value.userDetails.displayName;
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
        label += description;
        var more = "";
        if (value.object.type == "user" && value.action == "update") {
            more = "";
        } else if (value.object.type == "user") {
            more = "<a onclick='GCT.FireLink(this)' href='" + value.object.profileURL + "'>" + value.object.displayName + "</a>";
            label += value.object.displayName;
        } else if (value.object.type == "wire") {
            more = "";
        } else {
            more = "<a onclick='GCT.FireLink(this)' id='info-" + value.object.type + "' href='" + value.object.url + "'>" + value.object.name + "</a>";
            label += value.object.name;
        }

        var context = ""; //Currently only content to groups should need context
        if (value.object.group_guid) {
            context = " " + GCTLang.Trans("group-context") + "<a class='link' data-guid='" + value.object.group_guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + value.object.group_title + "</a>";
            label += ' ' + GCTLang.Trans("group-context") +' '+ value.object.group_title + '.';
        }

        var text = "";
        if (value.object.type == "wire") {
            text = "<blockquote>" + value.object.wire + "</blockquote>";
            label += '. ' + value.object.wire;
        } else if (value.object.description) {
            text = "<blockquote class='text'>" + value.object.description.trunc(150) + "</blockquote>";
            label += '. ' + value.object.description.trunc(150);
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
            label: label,
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
    Activity: function (value) {
        var description = "";
        if (value.description == "river:update:user:default") {
            description = GCTLang.Trans("new-avatar");
        } else if (value.description == "river:reply:object:default") {
            description = GCTLang.Trans("discussion-replied");
        } else if (value.action == "comment") {
            description = GCTLang.Trans("commented");
        } else if (value.action == "friend") {
            description = GCTLang.Trans("friend-added");
        } else if (value.action == "join") {
            description = GCTLang.Trans("joined-group");
        } else if (value.object.type == "discussion-add") {
            description = GCTLang.Trans("discussion-add");
        } else if (value.object.type == "group" && value.action == "create") {
            description = GCTLang.Trans("group-created");
        } else if (value.object.type == "file" && value.action == "create") {
            description = GCTLang.Trans("file-created");
        } else if (value.object.type == "event" && value.action == "update") {
            description = GCTLang.Trans("event-update");
        } else if (value.object.type == "wire" && value.action == "create") {
            description = GCTLang.Trans("wire-create");
        } else {
            description = value.description;
        }

        var type = "";
        if (value.object.type == "wire") {
            type = "";
        } else if (value.description == "river:update:user:default") {
            type = "";
        } else if (value.object.type == "discussion-reply" || value.object.type == "file" || value.object.type == "group" || value.object.type == "discussion-add") {
            type = "<strong>" + value.object.name + "</strong>";
        } else {
            type = "<strong>" + value.object.displayName + "</strong>";
        }

        var extra = "";
        var showMore = false;
        if (value.object.type == "wire") {
            showMore = true;
            extra = value.object.wire;
        }

        var content = GCTtxt.txtActivity({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            description: description,
            type: type,
            showMore: showMore,
            extra: extra
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
    Group: function (value) {
        var text = (value.description != "") ? value.description : GCTLang.Trans('no-group');
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var members = (value.count > 0) ? value.count + (value.count == 1 ? " " + GCTLang.Trans("member") : " " + GCTLang.Trans("members")) : "";
        var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTtxt.txtGroup({
            icon: value.iconURL,
            name: value.name,
            description: text,
            count: members,
            action: action,
            owner: value.guid,
            type: "gccollab_group",
            liked: liked,
            likes: likes
        });
        return content;
    },
    Member: function (value) {
        var description = value.about || GCTLang.Trans('no-profile');
        var content = GCTtxt.txtMember({
            guid: value.user_id,
            icon: value.iconURL,
            name: value.displayName,
            job: (value.job) ? value.job : '',
            date: GCTLang.Trans("join-date") + "<em>" + prettyDate(value.dateJoined) + "</em>",
            description: description,
            organization: value.organization
        });
        return content;
    },
    Event: function (value) {
        var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";

        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_event' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
        var fullview = false;

        var content = GCTtxt.txtEvent({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            startDate: startDate,
            endDate: endDate,
            date: prettyDate(value.startDate),
            location: location,
            posted: posted,
            description: text.trunc(150),
            title: value.title,
            id: id,
            action: action,
            owner: value.owner_guid,
            guid: value.guid,
            type: "gccollab_event",
            liked: liked,
            likes: likes,
            fullview: fullview
        });
        return content;
    },
    Doc: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a href='#' class='link' data-title='" + value.title + "' data-guid='" + value.guid + "' data-type='gccollab_doc' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTtxt.txtDoc({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: prettyDate(value.time_created),
            title: value.title,
            action: action,
            owner: value.owner_guid,
            guid: value.guid,
            type: "gccollab_doc",
            liked: liked,
            likes: likes
        });
        return content;
    },
    Bookmark: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = '';
        var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_bookmark' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        var posted = '';
        if (value.group_guid) {
            posted = GCTLang.Trans("posted-group") + "<a class='link' data-guid='" + value.group_guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + value.group + "</a>";
        } else {
            posted = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
        }
        var address = "<a class='external' data-type='gccollab_bookmark' href='" + value.address + "'>" + value.address + "</a> ";
        var content = GCTtxt.txtBookmark({
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
        });
        return content;
    },
    Opportunity: function (value) {
        // Removes HTML components from Blog
        var text = (value.description !== null) ? value.description : "";
        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a href='#' class='link' data-guid='" + value.guid + "' data-type='gccollab_opportunity' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var programArea = "<b>" + GCTLang.Trans("program-area") + "</b>";
        if (value.programArea) { programArea += value.programArea; }

        var deadline = "<b>" + GCTLang.Trans("deadline") + "</b>";
        if (value.deadline) { deadline += value.deadline; }

        var jobtype = '';
        if (value.jobtype) { jobtype += value.jobtype; }

        var roletype = '';
        if (value.roletype) { roletype += value.roletype; }

        var state = '';
        if (value.state) { state += value.state; }

        var apply = '';
        if (value.apply) { apply = value.apply };

        var content = GCTtxt.txtOpps({
            guid: value.guid,
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: prettyDate(value.time_created),
            jobtype: jobtype,
            roletype: roletype,
            description: text.trunc(150),
            programArea: programArea,
            deadline: deadline,
            type: "gccollab_opportunity",
            replied: replied,
            action: action,
            owner: value.owner_guid,
            title: value.title,
            liked: liked,
            likes: likes,
            state: state,
            apply: apply
        });
        return content;

    },
    User: function (value, obj) {
        console.log(value);
        var profileData = value.result;
        if (typeof profileData == "string") {
            app.alert(GCTLang.Trans("couldnotfindprofile"));
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

        $("#icon-" + obj.id).attr('src', profileData.iconURL);
        $("#icon-" + obj.id).attr('aria-label', GCTLang.Trans("user-avatar"));
        $("#title-" + obj.id).html(profileData.displayName).text();
        $("#department-" + obj.id).html(profileData.department).text();

        if (!isOwnProfile) {
            var content = '<div class="col-50"><a href="#" class="button button-fill button-raised" data-name="' + profileData.displayName + '" data-guid="' + profileData.id + '" onclick="GCTUser.NewMessage(this);">' + GCTLang.Trans("message") + '</a></div>'
                + '<div class="col-50">' + colleagueButton + '</div>'
                // + '<div class="col-33"><a href="#" class="button button-fill button-raised" data-guid="' + profileData.displayName + '" onclick="GCTUser.BlockUser(this);">' + GCTLang.Trans("blockuser") + '</a></div>'
                + '</div>';
            $("#action-buttons-" + obj.id).html(content).text();
        }

        profile = '';
        profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('name') + '</div>' + profileData.displayName + '</div>';
        if (profileData.hasOwnProperty("jobTitle") && profileData.jobTitle !== null && profileData.jobTitle !== "") {
            profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('job-title') + '</div>' + profileData.jobTitle + '</div>';
        }
        profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('email') + '</div><a class="external" href = "mailto:' + profileData.email + '" > ' + profileData.email + '</a ></div>';
        if (profileData.hasOwnProperty("telephone") && profileData.telephone !== null && profileData.telephone !== "") {
            profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('phone') + '</div><a class="external" href="tel:' + profileData.telephone + '">' + profileData.telephone + '</a></div>';
        }
        if (profileData.hasOwnProperty("about_me") && profileData.about_me !== null && profileData.about_me !== "") {
            profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('about-me') + '</div>' + profileData.about_me + '</div>';
        }
        if (profileData.hasOwnProperty("education") && profileData.education !== null && profileData.education !== "") {
            profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('education') + '</div>';
            $(profileData.education).each(function (key, value) {
                var looper = 0; //dynamic variable counter
                while (value["item_" + looper]) {
                    var school = (value["item_" + looper].school_name) ? value["item_" + looper].school_name : "";
                    var degree = (value["item_" + looper].degree) ? value["item_" + looper].degree : "";
                    var fieldOfStudy = (value["item_" + looper].field_of_study) ? value["item_" + looper].field_of_study : "";
                    var startDate = (value["item_" + looper].start_date) ? value["item_" + looper].start_date : "";
                    var endDate = (value["item_" + looper].end_date) ? value["item_" + looper].end_date : "";
                    profile += GCTtxt.txtProfileExp({
                        title: school,
                        subtitle: degree + " - " + fieldOfStudy,
                        text: "",
                        startDate: startDate,
                        endDate: endDate
                    });
                    looper++;
                }
            });
            profile += '</div>';
        }
        if (profileData.hasOwnProperty("experience") && profileData.experience !== null && profileData.experience !== "") {
            profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('experience') + '</div>';
            $(profileData.experience).each(function (key, value) {
                var looper = 0; //dynamic variable counter, sigh
                while (value["item_" + looper]) {
                    var job_title = (value["item_" + looper].job_title) ? value["item_" + looper].job_title : "";
                    var organization = (value["item_" + looper].organization) ? value["item_" + looper].organization : "";
                    var responsibilities = (value["item_" + looper].responsibilities) ? value["item_" + looper].responsibilities : "";
                    var startDate = (value["item_" + looper].start_date) ? value["item_" + looper].start_date : "";
                    var endDate = (value["item_" + looper].end_date) ? value["item_" + looper].end_date : "";
                    profile += GCTtxt.txtProfileExp({
                        title: job_title,
                        subtitle: organization,
                        text: responsibilities,
                        startDate: startDate,
                        endDate: endDate
                    });
                    looper++;
                }
            });
            profile += '</div>';
        }
        if (profileData.hasOwnProperty("skills") && profileData.skills !== null && profileData.skills !== "") {
            profile += '<div class="block"><div class="block-header">' + GCTLang.Trans('skills') + '</div>';
            $(profileData.skills).each(function (key, value) {
                var looper = 0; //dynamic variable counter
                while (value["item_" + looper]) {
                    var skill = (value["item_" + looper].skill) ? value["item_" + looper].skill : "";
                    profile += '<div class="item-text large" onclick="ToggleAllText(this);">' + skill + '</div>';
                    looper++;
                }
            });
            profile += '</div>';
        }
        $("#info-list-" + obj.id).html(profile).text();

        $("#wire-num-" + obj.id).html(profileData.wires).text();
        $("#blog-num-" + obj.id).html(profileData.blogs).text();
        $("#colleague-num-" + obj.id).html(profileData.colleagues).text();

        if (profileData.hasOwnProperty("links")) {
            var links = '<div class="center">' + GCTLang.Trans('social-media') + '</div>'
                + '<ul class="socials">';
            if (profileData.links.hasOwnProperty("github")) { links += '<li><a id="user-github" aria-label="Github" href="' + profileData.links.github + '" class="gh external"><i class="fab fa-github"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("twitter")) { links += '<li><a id="user-twitter" aria-label="Twitter" href="' + profileData.links.twitter + '" class="tw external"><i class="fab fa-twitter"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("linkedin")) { links += '<li><a id="user-linkedin" aria-label="Linkedin" href="' + profileData.links.linkedin + '" class="li external"><i class="fab fa-linkedin"></i></a></li>'; }
            if (profileData.links.hasOwnProperty("facebook")) { links += '<li><a id="user-facebook" aria-label="Facebook" href="' + profileData.links.facebook + '" class="fb external"><i class="fab fa-facebook"></i></a></li>'; }
            $("#social-media-" + obj.id).html(links).text();
        }
    },
    ContentSuccess: function (data, obj) {
        console.log(obj);
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
    DisplayName: function () {
        return (Cookies.get('displayName')) ? Cookies.get('displayName') : "";
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
    GetUserProfileP: function (tabObject, profile) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.user", user: GCTUser.Email(), api_key: api_key_gccollab, profileemail: profile, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.User(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetUserGroups: function (tabObject, profile) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.usergroups", user: GCTUser.Email(), profileemail: profile, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetUserActivity: function (tabObject, profile) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.useractivity", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang(), api_version: apiVersion },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
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
    GetBlogsByUser: function (tabObject, target) {
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;
        target = target || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.blogpostsbyowner", user: GCTUser.Email(), limit: limit, offset: offset, target: target, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBlogsByColleagues: function (tabObject) {
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.blogpostsbycolleague", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
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
    GetWiresByUserColleague: function (tabObject) {
        limit = tabObject.limit || 12;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.wirepostsbycolleagues", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWiresByUser: function (tabObject, profile) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email();

        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.wirepostsbyuser", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroups: function (tabObject, filters) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.groups", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupsMine: function (tabObject, filters) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';
        filters = $.extend({ "mine": true }, filters);

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.groups", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetMembers: function (tabObject, filters) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.members", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetMembersByUserColleague: function (tabObject, profile, filters) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.memberscolleague", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetDocs: function (tabObject, filters) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.docs", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEvents: function (tabObject, from, to) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        from = from || "";
        to = to || "";

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.events", user: GCTUser.Email(), from: from, to: to, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBookmarks: function (tabObject, filters) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmarks", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBookmarksByUserColleague: function (tabObject, filters) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmarkscolleague", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBookmarksByUser: function (tabObject, target) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        target = tabObject.target || '';
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmarksbyuser", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang(), target: target },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetOpportunities: function (tabObject, filters) {
        limit = tabObject.limit || 10;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.opportunities", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: api_key_gccollab, lang: GCTLang.Lang() },
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
function tabObject(page, tab, limit, type, header, eachFunc, request) {
    var object = {
        offset: 0,
        limit: limit,
        loaded: false,
        id: page + '-' + tab,
        type: type,
        name: tab,
        page: page,
        header: GCTtxt.txtTabHeader(header),
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

var endOfContent = '<div class="card"><div class="card-content card-content-padding"><div class="card-content-inner"><div class="item-text">' + GCTLang.Trans("end-of-content") + '</div></div></div></div>';

