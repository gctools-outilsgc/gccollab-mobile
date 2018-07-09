GCTtxt = {
    txtGlobalNav: function (title) {
        var content = '<div class="center reader-text" id="page-' + title + '" tabindex="0" >' + GCTLang.Trans("page") + GCTLang.Trans(title) + '</div>' +
            '<div class="left sliding"><a href="#" data-panel="left" class="panel-open link icon-only" data-translate-target="aria-label" data-translate="open-nav"><i class="fas fa-bars"></i></a></div>' +
            '<div class="title" id="' + title + '" tabindex="0">' + GCTLang.Trans(title) + '</div>' +
            '<div class="right sliding">' +
            '<a href="#" id="refresh-' + title + '" class="link icon-only" data-translate-target="aria-label" data-translate="refresh-content"><i class="fas fa-sync"></i></a></div > ';
        return content;
    },
    txtGlobalNavPlain: function (title) {
        var content = '<div class="center reader-text" id="page-' + title + '" tabindex="0" >' + GCTLang.Trans("page") + GCTLang.Trans(title) + '</div>' +
            '<div class="left sliding"><a href="#" data-panel="left" class="panel-open link icon-only" data-translate-target="aria-label" data-translate="open-nav"><i class="fas fa-bars"></i></a></div>' +
            '<div class="title" id="' + title + '" tabindex="0">' + GCTLang.Trans(title) + '</div>';
        return content;
    },
    txtGlobalNavGUID: function (title, guid) {
        var content = '<div class="center reader-text" id="page-' + title + '-' + guid +'" tabindex="0" >' + GCTLang.Trans("page") + GCTLang.Trans(title) + '</div>' +
            '<div class="left sliding"><a href="#" data-panel="left" class="panel-open link icon-only" data-translate-target="aria-label" data-translate="open-nav"><i class="fas fa-bars"></i></a></div>' +
            '<div class="title" id="' + title + '-' + guid + '" tabindex="0">' + GCTLang.Trans(title) + '</div>' +
            '<div class="right sliding">' +
            '<a href="#" id="refresh-' + title + '-' + guid + '" class="link icon-only" data-translate-target="aria-label" data-translate="refresh-content"><i class="fas fa-sync"></i></a></div > ';
        return content;
    },
    txtFocusMessage: function (id) {
        return '<span id="focus-' + id + '" class="reader-text" tabindex="0">' + GCTLang.Trans('content-loaded') + '</span>';
    },
    txtAction: function (ref) {
        var action = '';
        switch (ref) {
            case "post-home":
                action = '<a id="home-actions" href="#" class="button popover-open" data-popover=".popover-actions-home" data-translate-target="aria-label" data-translate="create-post"><i class="fa fa-plus fa-2x"></i></a>';
                break;
            case "post-wire":
                action = '<a href="#" class="link icon-only" onclick="GCTrequests.PostWirePost();" data-translate-target="aria-label" data-translate="create-wire"><i class="fas fa-rss fa-2x"></i></a>';
                break;
            case "post-blog":
                action = '<a href="#" onclick="GCTrequests.PostBlogPost();" class="right link icon-only " data-translate-target="aria-label" data-translate="post-blog"><i class="fas fa-edit fa-2x"></i></a>';
                break;
            case "post-opp":
                action = '<a href="#" class="link icon-only" onclick="GCTrequests.CreateNewOpportunity();" data-translate-target="aria-label" data-translate="create-mission"><i class="fa fa-briefcase fa-2x"></i></a>';
                break;
            case "post-event":
                action = '<a href="#" onclick="GCTrequests.PostEventPost();" class="right link icon-only " data-translate-target="aria-label" data-translate="post-event"><i class="fa fa-calendar fa-2x"></i></a>';
                break;
            default: ;
        }
        return action;
    },
    txtFilterButton: function (ref) {
        var filterButton = '<a id="filters-button-'+ref+'" href="#" data-popup=".filters-' + ref + '" class="popup-open link icon-only" data-translate-target="aria-label" data-translate="filter-options"><i class="fas fa-search fa-2x"></i></a>';
        return filterButton;
    },
    txtTabHeader: function (ref, id) {
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
                break;
            case 'event':
                header = '<div id="event-calendar-' + id +'" aria-hidden="true"></div>';
                break;
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
        var content = '<div class="item-text large" onclick="ToggleAllText(this);"><hr>'
            + "<div class='bolder-title'>" + object.title + "</div><hr> "
            + "<div class='norm-text'><i>" + object.subtitle + "<br>" + object.startDate + " to " + object.endDate + "</i></div>"
            + "<div class='norm-text all_text'>" + object.text + "</div>" + '</div><br>';
        return content;
    },
    txtNewsfeed: function (object) {
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text'>" + object.label + "</div>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img aria-hidden='true' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div id='author-" + object.guid + "' class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time-" + object.guid + "' tabindex='-1'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='list' onclick='GCT.MoreOptions(this);' aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding-options' aria-hidden='true'>"
            + "<div role='article' id='text-" + object.guid + " 'class='text'><a onclick='ShowProfile(" + object.owner + ");'>" + object.name + "</a> " + object.description + " " + object.more + object.context 
            + object.text
            + object.source
            + "</div></div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + object.reply
            + object.action
            + "</div>"
            + "</div></div> </div>";
        return GCT.SetLinks(content);
    },
    txtActivity: function (object) {
        var content = "<li class='item-content'>"
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
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.owner + "' data-location='list' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content  card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
            + "<div id='wire-" + object.guid + "' class='text-list' >" + object.description + "</div>"
            + "<div class='item-media'>" + object.image + "</div>"
            + object.source
            + "</div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='list' onclick='GCTrequests.ReplyWirePost(this);'><i class='fas fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div><div>";
        content = GCT.SetLinks(content);
        return content;
    },
    Wire: function (object) {
        var content = "<div id='post-" + object.guid + "' class='hold-all-card'>"
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
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.owner + "' data-location='post' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content  card-content-padding'>"
            + "<div id='wire-" + object.guid + "' class='text-post'>" + object.description + "</div>"
            + "<div class='item-media'>" + object.image + "</div>"
            + object.source
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='post' onclick='GCTrequests.ReplyWirePost(this);'><i class='fas fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div><div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtBlog: function (object) {
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='list' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
            + "<div id='blog-" + object.guid + "' class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.group + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    Blog: function (object) {
        var content = "<div class='hold-all-card'>"
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
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='post' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<div id='blog-" + object.guid + "' class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.group + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtGroup: function (object) {
        var content = "<li><div class='hold-all-card'> "
            + "<div id='label-" + object.owner + "' class='reader-text' data-guid='" + object.owner + "' data-type='gccollab_group' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div class='item-link item-content' data-guid='" + object.owner + "' data-type='gccollab_group' onclick='GCT.ViewPost(this);' > "
            + "<div class='item-inner'>"
            + "<div class='item-title-row no-padding-right'>"
            + "<div class='item-title reg-text'>" + object.name + "</div>"
            + "<div class='item-after'>" + object.count + "</div>"
            + "</div>"
            + "<div class='row ptm'>"
            + "<div class='col-20 members-icon'><img src='" + object.icon + "' width='50' alt='" + object.name + "'></div>"
            + "<div class='col-80 item-text'>" + object.description.trunc(500) + "</div>"
            + "</div>"
            + "</div></div></div></li>";
        
        content = GCT.SetLinks(content);
        return content;
    },
    txtMember: function (object) {
        var content = "<div class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='gccollab_user' onclick='ShowProfile(" + object.guid + ");'>" + object.label + "</div>"
            + "<div class='item-link item-content close-popup close-panel' data-guid='" + object.guid + "' data-type='gccollab_user' onclick='ShowProfile(" + object.guid + ");' aria-hidden='true'>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row no-padding-right'>"
            + "</div>"
            + "<div class='row ptm'>"
            + "<div class='col-20 members-icon'><img src='" + object.icon + "' width='50' alt='" + object.name + "'></div>"
            + "<div class='col-80 item-title reg-text'>" + object.name + "<div class='item-text more_text'>" + object.organization + "</div> <div class='item-text more_text'> " + object.job + "</div></div>"
            + "</div>";
        (object.colleaguerequest == true) ? content += object.description : content += '';
        content += "</div>"
            + "</div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtDoc: function (object) {
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='list' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
            + "<div class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtEvent: function (object) {
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.id + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div id='" + object.id + "' class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='list' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
            + "<div id='event-" + object.guid + "' class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='item-text large'>" + object.startDate + "<br>" + object.endDate + "</div>"
            + "<div class='item-text large'>" + object.location + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + "<br>" + object.description + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<a href='#' aria-label='like aimer' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + '<a href="#" class="item-link list-button" data-guid="' + object.guid + '" onclick="GCTrequests.SeeCalendar(this);" data-type="' + object.type + '">' + GCTLang.Trans('in-calendar') + '</a>'
            + object.action
            + "</div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    Event: function (object) {
        var content = "<div class='hold-all-card'>"
            + "<div id='" + object.id + "' class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='post' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<div id='blog-" + object.guid + "' class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='item-text large'>" + object.startDate + "<br>" + object.endDate + "</div>"
            + "<div class='item-text large'>" + object.location + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + "<br>" + object.description + "</div>"
            + "<div class='item-text large'>" + "" + "</div>" 
                + "</div>"
                + "</div>"
            + "<div class='card-content card-content-padding'>" + "<hr>"
                + "<div class='card-content-inner'>"
                + "<div class='blog-title'>" + object.additionalTitle + "</div>"
                + "<div class='item-text large'>" + object.org + "</div>"
                + "<div class='item-text large'>" + object.phone + "</div>"
                + "<div class='item-text large'>" + object.email + "</div>"
                + "<div class='item-text large'>" + object.fee + "</div>"
                + "<div class='item-text large'>" + object.eventLang + "</div>"
                + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' aria-label='like aimer' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + '<a href="#" class="item-link list-button" data-guid="' + object.guid + '" onclick="GCTrequests.SeeCalendar(this);" data-type="' + object.type + '">' + GCTLang.Trans('in-calendar') + '</a>'
            + object.action
            + "</div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtSeeCalendar: function (object) {
        var content = "<div class='list cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header plain popup-close' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtBookmark: function (object) {
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='list' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content  card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
            + "<div class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.posted + "</div>"
            + "<div class='item-text large'>" + object.description + "</div>"
            + "<div class='blog-group'>" + "Link: " + object.address + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<div  class='link like " + object.liked + "'><a href='#' aria-label='like aimer' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i></a> <a href='#' aria-label='See who liked this Voir qui a aimer' data-guid=" + object.guid + " onclick='GCTrequests.GetLikeUsers(this);'><span class='like-count'>" + object.likes + "</span></a></div>"
            + object.action
            + "</div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    Bookmark: function (object) {
        var content = "<div class='hold-all-card'>"
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
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='post' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content  card-content-padding'>"
            + "<div class='card-content-inner'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.posted + "</div>"
            + "<div class='item-text large'>" + object.description + "</div>"
            + "<div class='blog-group'>" + "Link: " + object.address + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<div  class='link like " + object.liked + "'><a href='#' aria-label='like aimer' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i></a> <a href='#' aria-label='See who liked this Voir qui a aimer' data-guid=" + object.guid + " onclick='GCTrequests.GetLikeUsers(this);'><span class='like-count'>" + object.likes + "</span></a></div>"
            + object.action
            + "</div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtOpps: function (object) {
        if (object.state == 'posted') {
            var content = "<div class='hold-all-card'>"
                + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
                + "<div class='card view view-main'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
                + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
                + "<div class='item-inner'>"
                + "<div class='item-title-row'>"
                + "<div class='author'>" + object.name + "</div>"
                + "</div>"
                + "<div class='time'>" + object.date + "</div>"
                + "</div>"
                + "</div>"
                + "<div class='row'>"
                + "<div class='col-85'></div>"
                + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "'  data-container='" + object.owner + "' data-location='list' onclick='GCT.MoreOptions(this);' aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
                + "</div>"
                + "<div class='card-content card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
                + "<div class='card-content-inner'" + object.all_text + ">"
                + "<div class='blog-title'>" + object.title + "</div>"
                + "<div class='title'> <b>" + object.jobtype + "(" + object.roletype + ")" + "</b></div>"
                + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
                + "<div class='item-text large'>" + object.deadline + "</div>"
                + "<div class='item-text'>" + object.programArea + "</div>"
                + "</div>"
                + "</div>"
                + "<div class='card-footer' aria-hidden='true'>"
                + object.action;
            if (object.apply == 'mission_apply') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ApplyPost(this);'> <span>" + GCTLang.Trans('apply-opt') + "</span></a>"; }
            else if (object.apply == 'withdraw') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>" + GCTLang.Trans('withdrawn-opt') + "</span></a>"; }
            else if (object.apply == 'offered') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.AcceptPost(this);'> <span>" + GCTLang.Trans('accept-opt') + "</span></a><a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>" + GCTLang.Trans('decline-opt') + "</span></a>"; }

            content += "</div>"
                + "</div></div>";
        } else {
            var content = "<div class='swiper-slide list-block cards-list'>";// need something hidden 
        }
        content = GCT.SetLinks(content);
        return content;

    },
    Opps: function (object) {
        if (object.state == 'posted') {
            var content = "<div class='hold-all-card'>"
                + "<div class='card view view-main'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
                + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
                + "<div class='item-inner'>"
                + "<div class='item-title-row'>"
                + "<div class='author'>" + object.name + "</div>"
                + "</div>"
                + "<div class='time'>" + object.date + "</div>"
                + "</div>"
                + "</div>"
                + "<div class='row'>"
                + "<div class='col-85'></div>"
                + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.owner + "' data-location='post' onclick='GCT.MoreOptions(this);' aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
                + "</div>"
                + "<div class='card-content card-content-padding'>"
                + "<div class='card-content-inner'" + object.all_text + ">"
                + "<div class='blog-title'>" + object.title + "</div>"
                + "<div class='title'> <b>" + object.jobtype + "(" + object.roletype + ")" + "</b></div>"
                + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
                     + "<div class='item-text large'>" + "" + "</div>" //placeholder for text after desc
                    + "</div>"
                    + "</div>"
                + "<div class='card-content card-content-padding'>" + "<hr>"
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
                    + "<div class='item-text large'>" + object.applicants + "</div>"
                + "</div>"
                + "</div>"
                + "<div class='card-footer'>"
            content += object.action
            if (object.apply == 'mission_apply') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ApplyPost(this);'> <span>" + GCTLang.Trans('apply-opt') + "</span></a>"; }
            else if (object.apply == 'withdraw') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>" + GCTLang.Trans('withdrawn-opt') + "</span></a>"; }
            else if (object.apply == 'offered') { content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.AcceptPost(this);'> <span>" + GCTLang.Trans('accept-opt') + "</span></a><a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>" + GCTLang.Trans('decline-opt') + "</span></a>"; }

            content += "</div>"
                + "</div></div>";
        } else {
            var content = "<div class='swiper-slide list-block cards-list'>";// need something hidden 
        }
        content = GCT.SetLinks(content);
        return content;

    },
    txtDiscussion: function (object) {
        var content = "<div id='list-" + object.guid + "' class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='reader-text' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);'>" + object.label + "</div>"
            + "<div class='list cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");' aria-hidden='true'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.owner + "' data-location='list' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding-options item-link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCT.ViewPost(this);' aria-hidden='true'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.group + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
            + "</div>"
            + "<div class='card-footer' aria-hidden='true'>"
            + "<div  class='link like " + object.liked + "'><a href='#' aria-label='like aimer' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i></a> <a href='#' aria-label='See who liked this Voir qui a aimer' data-guid=" + object.guid + " onclick='GCTrequests.GetLikeUsers(this);'><span class='like-count'>" + object.likes + "</span></a></div>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div></div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    Discussion: function (object) {
        var content = "<div class='hold-all-card'>"
            + "<div class='list cards-list'>"
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
            + "<div class='row'>"
            + "<div class='col-85'></div>"
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='post' onclick='GCT.MoreOptions(this);'  aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + "</div>"
            + "<div class='card-content card-content-padding'>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.group + "</div>"
            + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<div  class='link like " + object.liked + "'><a href='#' aria-label='like aimer' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='far fa-thumbs-up'></i></a> <a href='#' aria-label='See who liked this Voir qui a aimer' data-guid=" + object.guid + " onclick='GCTrequests.GetLikeUsers(this);'><span class='like-count'>" + object.likes + "</span></a></div>"
            // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
            + object.action
            + "</div></div></div></div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtNotification: function (object) {
        var content = '<li><div id="list-' + object.guid + '" class="row">'
            + '<div class="col-80 item-content" onclick="GCT.ViewPost(this);" data-guid="' + object.guid + '" data-type="gccollab_notification">'
            + '<div id="item-' + object.guid + '" class="item-inner '  + object.unread + '">'
            + '<div class="item-title-row">'
            + '<div class="item-title">GCcollab</div>'
            + '<div class="item-after">' + object.time + '</div></div>'
            + '<div class="item-text">' + object.title + '</div>'
            + '</div></div>'
            + '<a href="#" class="col-20 link trash-notif" data-guid="' + object.guid + '" data-location="list" onclick="GCTrequests.Delete(this);"><i class="fa fa-trash fa-2x"></i></a>'
            + '</div></li>';
        return content;
    },
    txtMessage: function (object) {
        var content = '<li><div id="list-' + object.guid + '" class="row">'
            + '<div class="col-80 item-content" onclick="GCT.ViewPost(this);" data-guid="' + object.guid + '" data-type="gccollab_message">'
            + '<div class="item-inner ' + object.unread + '">'
            + '<div class="item-title-row">'
            + '<div class="item-title">GCcollab</div>'
            + '<div class="item-after">' + object.time + '</div></div>'
            + '<div class="item-text">' + object.title + '</div>'
            + '</div></div>'
            + '<a href="#" class="col-20 link trash-notif" data-guid="' + object.guid + '" data-location="list" onclick="GCTrequests.Delete(this);"><i class="fa fa-trash fa-2x"></i></a>'
            + '</div></li>';
        return content;
    },
    txtComment: function (object) {
        var content = '<li id="list-' + object.guid + '">'
            + "<div class='hold-all-card'>"
            + "<div id='label-" + object.guid + "' class='col-85 reader-text'>" + object.label + "</div>"
            + "<div class='row'>"
            + "<div class='col-85'>"
            + '<div class="item-content" aria-hidden="true">'
            + '<div class="item-media"> <img src="' + object.icon + '" onclick="ShowProfile(' + object.owner + ');" style="border-radius:100%" width="40" height="40" alt="Profile Picture"> </div>'
            + '<div class="item-inner">'
            + '<div class="item-title-row">'
            + '<div class="item-title author-comment">' + object.name + '</div>'
            + '</div>'
            + '<div class="time">' + object.date + '</div>'
            + object.description
            + "<br><div class='link like " + object.liked + "'><a href='#' aria-label='like aimer' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTrequests.LikePost(this);'><i class='fa fa-thumbs-o-up'></i></a> <a href='#' aria-label='See who liked this Voir qui a aimer' data-guid=" + object.guid + " onclick='GCTrequests.GetLikeUsers(this);'><span class='like-count'>" + object.likes + "</span></a></div>"
            + '</div></div></div>'
            + "<a href='#' class='col-15 link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' data-container='" + object.container + "' data-location='comment' onclick='GCT.MoreOptions(this);' aria-label='" + GCTLang.Trans('more-options') + "'><i class='fas fa-ellipsis-h fa-2x'></i></a>"
            + '</div></div>'
            + '</li>';
        content = GCT.SetLinks(content);
        return content;
    },
    txtLikes: function (object) {
        var content = "<div class='list cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header plain popup-close' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name + "' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
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
        var date = prettyDate(value.time_posted);
        var label = date + ': ' + value.userDetails.displayName;
        var description = "";
        var container = '';
        var type = "gccollab_newfeed_post";
        if (value.action == "update") { //UPDATE
            switch (value.object.type) {
                case "user": description = GCTLang.Trans("new-avatar"); type = "gccollab_profile"; break;
                case "event_calendar": description = GCTLang.Trans("event-update"); type = "gccollab_event"; break;
                case "idea": description = GCTLang.Trans("idea-update"); type = "gccollab_idea"; break;
                default: description = "NEED TO HANDLE UPDATE";
            }
        } else if (value.action == "create") { // CREATE
            switch (value.object.type) {
                case "wire": description = GCTLang.Trans("wire-create"); type = "gccollab_wire_post"; break;
                case "blog": description = GCTLang.Trans("blog-create"); type = "gccollab_blog_post"; break;
                case "group": description = GCTLang.Trans("group-created"); type = "gccollab_group"; break;
                case "file": description = GCTLang.Trans("file-created"); type = "gccollab_file"; break;
                case "groupforumtopic": description = GCTLang.Trans("discussion-add"); type = "gccollab_discussion_post"; break;
                case "etherpad": description = GCTLang.Trans("doc-create"); type = "gccollab_doc"; break;
                case "event_calendar": description = GCTLang.Trans("event-create"); type = "gccollab_event"; break;
                case "bookmarks": description = GCTLang.Trans("bookmark-create"); type = "gccollab_bookmark"; break;
                case "page": case "page_top": description = GCTLang.Trans("page-create"); type = "gccollab_page"; break;
                case "album": description = GCTLang.Trans("album-create"); type = "gccollab_album"; break;
                case "tidypics_batch": description = GCTLang.Trans("file-created"); type = "gccollab_file"; break;
                case "idea": description = GCTLang.Trans("idea-created"); type = "gccollab_idea"; break;
                default: description = "NEED TO HANDLE CREATE";
            }
        } else { //OTHER
            switch (value.action) {
                case 'friend': description = GCTLang.Trans("friend-added"); type = "gccollab_profile"; break;
                case 'comment': description = GCTLang.Trans("commented"); type = "gccollab_comment"; break;
                case 'reply': description = GCTLang.Trans("discussion-replied"); type = "gccollab_discussion_reply"; break;
                case 'join': description = GCTLang.Trans("joined-group"); type = "gccollab_group"; break;
                case 'vote': description = GCTLang.Trans("voted"); type = "gccollab_poll"; break;
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
        } else if (value.object.type == "comment") {
            more = "<a onclick='GCT.ViewPost(this);' id='info-" + value.object.type + "' data-guid='" + value.object.container_guid + "' data-type='gccollab_" + value.object.container_type + "'>" + value.object.name + "</a>";
            label += value.object.name;
        } else {
            more = "<a onclick='GCT.FireLink(this)' id='info-" + value.object.type + "' href='" + value.object.url + "'>" + value.object.name + "</a>";
            label += value.object.name;
        }

        var context = ""; //Currently only content to groups should need context
        if (value.object.group_guid) {
            context = " " + GCTLang.Trans("group-context") + "<a class='link' data-guid='" + value.object.group_guid + "' data-type='gccollab_group' onclick='GCT.ViewPost(this);'>" + value.object.group_title + "</a>";
            if (type === "gccollab_discussion_reply") {
                var lnk = value.object.url.substr((value.object.url.indexOf("/view/") + 6));
                container = lnk.substring(0, lnk.indexOf("/"));
            } else {
                container = value.object.group_guid;
            }
            label += ' ' + GCTLang.Trans("group-context") + ' ' + value.object.group_title + '.';
        } else {
            container = value.subject_guid;
        }

        var text = "";
        if (value.object.type == "wire") {
            text = "<blockquote class='text-list'>" + value.object.wire + "</blockquote>";
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
            action = "<a class='link' data-guid='" + value.object_guid + "' data-type='gccollab_wire_post' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
            reply = "<a href='#' class='link' data-guid='" + value.object_guid + "' data-type='list' onclick='GCTrequests.ReplyWirePost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>";
        } else if (value.object.type == "blog") {
            action = "<a class='link' data-guid='" + value.object_guid + "' data-type='gccollab_blog_post' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        }
        
        
        var content = GCTtxt.txtNewsfeed({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: date,
            more: more,
            context: context,
            description: description,
            text: text,
            source: source,
            label: label,
            action: action,
            reply: reply,
            owner: value.subject_guid,
            container: container,
            guid: value.object_guid,
            type: type,
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
        var date = prettyDate(value.time_created);
        var label = value.userDetails.displayName + ': ' + date + '. ' + value.description;

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
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_wire_post' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        // var action = (value.thread) ? "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_wire_post' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>" : "";

        var content = GCTtxt.txtWire({
            guid: value.guid,
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: date,
            description: text,
            label: label,
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
        var label = '';
        var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
        text = text.trunc(150);
        var date = prettyDate(value.time_created);
        if (value.groupURL.indexOf("/groups/profile/") > -1) {
            var group = GCTLang.Trans("posted-group") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_group' href='" + value.groupURL + "'>" + value.group + "</a>";
            label += value.userDetails.displayName + ' ' + date + '. ' + value.title + ' ' + GCTLang.Trans("posted-group") + value.group;
        } else {
            var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
            label += value.userDetails.displayName + ' ' + date + '. ' + value.title;
        }
        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_blog_post' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTtxt.txtBlog({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: date,
            group: group,
            container: value.container_guid,
            description: text,
            label: label,
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
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_group' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        var label = value.name + '. ' + text;
        var content = GCTtxt.txtGroup({
            icon: value.iconURL,
            name: value.name,
            description: text,
            label: label,
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
        var label = value.displayName + ': ' + value.job + '. ' + value.organization;
        var description = value.about || GCTLang.Trans('no-profile');
        var content = GCTtxt.txtMember({
            guid: value.user_id,
            icon: value.iconURL,
            name: value.displayName,
            job: (value.job) ? value.job : '',
            label: label,
            date: GCTLang.Trans("join-date") + "<em>" + prettyDate(value.dateJoined) + "</em>",
            description: description,
            organization: (value.organization) ? value.organization : '',
        });
        return content;
    },
    Event: function (value) {
        var label = value.title + '. ';
        var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";

        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_event' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var date = (value.startDate).split(" ")[0];
        var split = date.split("-");
        var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);


        var month = parseInt(split[1]) - 1;
        var id = 'event-' + value.tab + '-' + split[0] + '-' + month + '-' + split[2];
        id = id.replace(/(^|-)0+/g, "$1");

        var posted = "";
        if (value.groupGUID !== null && typeof value.groupGUID !== 'undefined') {
            posted = GCTLang.Trans("posted-group") + "<a class='link' data-guid='" + value.groupGUID + "' data-type='gccollab_group' onclick='GCT.ViewPost(this);'>" + value.group + "</a>";
        } else {
            posted = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
        }
        
        var startDate = GCTLang.Trans("start-date1") + ' ' + date;
        var endDate = GCTLang.Trans("end-date") + (value.endDate).split(" ")[0];

        var location = ((value.location !== null) && (typeof value.location !== 'undefined')) ? "<b>" + GCTLang.Trans("location") + "</b>" + value.location : "";
        var fullview = false;

        label += startDate + '. ' + endDate + '. ' + GCTLang.Trans("location") + ': ' + value.location;
        
        var content = GCTtxt.txtEvent({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            startDate: startDate,
            endDate: endDate,
            date: prettyDate(value.startDate),
            location: location,
            posted: posted,
            description: text.trunc(150),
            label: label,
            title: value.title,
            id: id,
            action: action,
            owner: value.owner_guid,
            container: value.container_guid,
            guid: value.guid,
            type: "gccollab_event",
            liked: liked,
            likes: likes,
            fullview: fullview
        });
        return content;
    },
    Doc: function (value) {
        var date = prettyDate(value.time_created);
        var label = value.userDetails.displayName + ': ' + date + '. ' + value.title ;
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-title='" + value.title + "' data-guid='" + value.guid + "' data-type='gccollab_doc' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTtxt.txtDoc({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            container: value.container_guid,
            label: label,
            date: date,
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
        var label = '';
        var date = prettyDate(value.time_created);
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = '';
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_bookmark' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        var posted = '';
        if (value.group_guid) {
            posted = GCTLang.Trans("posted-group") + "<a class='link' data-guid='" + value.group_guid + "' data-type='gccollab_group' onclick='GCT.ViewPost(this);'>" + value.group + "</a>";
        } else {
            posted = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
        }
        var address = "<a class='external' data-type='gccollab_bookmark' href='" + value.address + "'>" + value.address + "</a> ";
        label += value.userDetails.displayName + ': ' + date + '. ' + value.title;
        var content = GCTtxt.txtBookmark({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            owner: value.owner_guid,
            container: value.container_guid,
            date: date,
            title: value.title,
            label: label,
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
        var label = value.title + '. ';
        var text = (value.description !== null) ? value.description : "";
        var date = prettyDate(value.time_created);
        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_opportunity' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        
        var programArea = "<b>" + GCTLang.Trans("program-area") + "</b>";
        if (value.programArea) { programArea += value.programArea; }

        var jobtype = '';
        if (value.jobtype) { jobtype += value.jobtype; label += value.jobtype + ': '; }

        var roletype = '';
        if (value.roletype) { roletype += value.roletype; label += value.roletype + '. '; }

        var deadline = "<b>" + GCTLang.Trans("app-deadline") + "</b>";
        if (value.deadline) { deadline += value.deadline; label += GCTLang.Trans("app-deadline") + ': ' + value.deadline; }

        var state = '';
        if (value.state) { state += value.state; }

        var apply = '';
        if (value.apply) { apply = value.apply };
        var content = GCTtxt.txtOpps({
            guid: value.guid,
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: date,
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
            label: label,
            liked: liked,
            likes: likes,
            state: state,
            apply: apply
        });
        return content;

    },
    Discussion: function (value) {
        // Removes HTML components from Discussion
        //var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";
        var date = prettyDate(value.time_created);
        var label = value.title + ' ' + date;
        var text = "<blockquote class='item-text large'>" + value.description + "</blockquote>";
        var group = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_discussion_post' onclick='GCT.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTtxt.txtDiscussion({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: date,
            label: label,
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
        return content;
    },
    GroupP: function (value, obj) {
        var group = value.result;
        if (obj.loaded == true) { $(obj.appendMessage).appendTo('#content-' + obj.id); } else { obj.loaded = true; }
        var tags = (group.tags) ? ($.isArray(group.tags) ? (group.tags).join(", ") : group.tags) : GCTLang.Trans('no-tags');
        if (group.liked) {
            $(".like").addClass('liked');
        }
        if (group.member) {
            $("#leave-group-" + obj.id).show();
        } else {
            $("#join-group-" + obj.id).show();
        }
        access = group.access;
        $("#group-description-" + obj.id).html(group.description);
        if (group.access) {
            enabled = group.enabled;
        } else {
            enabled = false;
        }

        if (group.public == true) {
            group_public = true;
        } else { group_public = false; }
        var popoverHTML = '';
        if (access) {
            popoverHTML += (enabled.activity && enabled.activity == "yes") ? '<li><a href="#tab-profile-' + group.guid + '-activity" class="list-button tab-link popover-close" data-translate="activity">' + GCTLang.Trans("activity") + '</a></li>' : "";
            popoverHTML += (enabled.forum && enabled.forum == "yes") ? '<li><a href="#tab-profile-' + group.guid + '-discussion" class="list-button tab-link popover-close" data-translate="discussion">' + GCTLang.Trans("discussion") + '</a></li>' : "";
            popoverHTML += (enabled.bookmarks && enabled.bookmarks == "yes") ? '<li><a href="#tab-profile-' + group.guid + '-bookmarks" class="list-button tab-link popover-close" data-translate="bookmarks">' + GCTLang.Trans("bookmarks") + '</a></li>' : "";
            popoverHTML += (enabled.blog && enabled.blog == "yes") ? '<li><a href="#tab-profile-' + group.guid + '-blogs" class="list-button tab-link popover-close" data-translate="blogs">' + GCTLang.Trans("blogs") + '</a></li>' : "";
        } else {
            popoverHTML += '<li><a href="#" class="item-link list-button">' + GCTLang.Trans("Private-Group") + '</a></li>';
        }
        popoverHTML += '<li><a class="list-button item-link popover-close" href="#" data-translate="close">close</a></li>';
        $(popoverHTML).hide().appendTo('#popover-' + group.guid).fadeIn(1000);

        
        var actionHTML = '';
        if (access) {
            actionHTML += (enabled.blog && enabled.blog == "yes") ? '<li><a href="#" onclick="GCTrequests.PostBlogPost(' + group.guid + ', ' + access + ');" class="list-button item-link popover-close"><i class="fas fa-edit"></i>  <span>' + GCTLang.Trans("post-blog") + '</span> </a></li>' : "";
            actionHTML += (enabled.forum && enabled.forum == "yes") ? '<li><a href="#" onclick="GCTrequests.PostDiscussionPost(' + group.guid + ', ' + group.public + ');" class="list-button item-link popover-close"><i class="fas fa-edit"></i>  <span>' + GCTLang.Trans("post-discussion") + '</span> </a></li>' : "";
        } else {
            actionHTML += '<li><a href="#" class="item-link list-button">' + GCTLang.Trans("Private-Group") + '</a></li>';
        }
        $(actionHTML).hide().prependTo('#popover-actions-' + group.guid).fadeIn(1000);

        $("#group-icon-" + obj.id).attr('src', group.iconURL);
        $("#group-icon-" + obj.id).attr('alt', "Group Icon of" + group.userDetails.displayName);
        $("#group-title-" + obj.id).html(group.name).text();
        $("#group-owner-" + obj.id).text(group.userDetails.displayName);
        $("#group-owner-click-" + obj.id).attr('onclick', "ShowProfile(" + group.owner_guid + ");");
        $("#group-count-" + obj.id).text("(" + group.count + ")");
        $("#like-count-" + obj.id).text(group.likes);
        $("#group-tags-" + obj.id).text(tags);
        $("[data-owner-" + obj.id +"]").data('owner', group.owner);
        $("[data-guid-" + obj.id +"]").data('guid', group.guid);
        $("[data-type-" + obj.id + "]").data('type', group.type);
    },
    User: function (value, obj) {
        if (obj.loaded == true) { $(obj.appendMessage).appendTo('#content-' + obj.id); } else { obj.loaded = true; }
        var profileData = value.result;
        if (typeof profileData == "string") {
            app.dialog.alert(GCTLang.Trans("couldnotfindprofile"));
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
            var content = '<div class="col-50"><a href="#" class="button button-fill button-raised" data-name="' + profileData.displayName + '" data-guid="' + profileData.id + '" onclick="GCTrequests.NewMessage(this);">' + GCTLang.Trans("message") + '</a></div>'
                + '<div class="col-50">' + colleagueButton + '</div>'
                // + '<div class="col-33"><a href="#" class="button button-fill button-raised" data-guid="' + profileData.displayName + '" onclick="GCTUser.BlockUser(this);">' + GCTLang.Trans("blockuser") + '</a></div>'
                + '</div>';
            $("#action-buttons-" + obj.id).html(content).text();
        }

        profile = '';
        profile += '<div class="block tight-block"><div class="block-header tight-block-header">' + GCTLang.Trans('name') + '</div>' + profileData.displayName + '</div>';
        if (profileData.hasOwnProperty("jobTitle") && profileData.jobTitle !== null && profileData.jobTitle !== "") {
            profile += '<div class="block tight-block"><div class="block-header tight-block-header">' + GCTLang.Trans('job-title') + '</div>' + profileData.jobTitle + '</div>';
        }
        profile += '<div class="block tight-block"><div class="block-header tight-block-header">' + GCTLang.Trans('email') + '</div><a class="external" href = "mailto:' + profileData.email + '" > ' + profileData.email + '</a ></div>';
        if (profileData.hasOwnProperty("telephone") && profileData.telephone !== null && profileData.telephone !== "") {
            profile += '<div class="block tight-block"><div class="block-header tight-block-header">' + GCTLang.Trans('phone') + '</div><a class="external" href="tel:' + profileData.telephone + '">' + profileData.telephone + '</a></div>';
        }
        if (profileData.hasOwnProperty("about_me") && profileData.about_me !== null && profileData.about_me !== "") {
            profile += '<hr><div class="tight-block block"><div class=" tight-block-header block-header">' + GCTLang.Trans('about-me') + '</div><hr>' + profileData.about_me + '</div>';
        }
        if (profileData.hasOwnProperty("education") && profileData.education !== null && profileData.education !== "") {
            profile += '<hr><div class=" tight-block block"><div class="tight-block-header block-header">' + GCTLang.Trans('education') + '</div>';
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
            profile += '<hr><div class="tight-block block"><div class="tight-block-header block-header">' + GCTLang.Trans('experience') + '</div>';
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
            profile += '<hr><div class="tight-block block"><div class="block-header">' + GCTLang.Trans('skills') + '</div>';
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
        $("#wire-label-" + obj.id).html(profileData.wires + ' ' + GCTLang.Trans('wires')).text();
        $("#blog-num-" + obj.id).html(profileData.blogs).text();
        $("#blog-label-" + obj.id).html(profileData.blogs + ' ' + GCTLang.Trans('blogs')).text();
        $("#colleague-num-" + obj.id).html(profileData.colleagues).text();
        $("#colleague-label-" + obj.id).html(profileData.colleagues + ' ' + GCTLang.Trans('colleagues')).text();

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
    Notification: function (value, obj) {
        var description = "";
        var unread = (value.read) ? "" : "unread";
        var regex = /<!-- TITLE OF CONTENT -->([\s\S]*)<div>Need help?/;
        var matches = (value.description).match(regex);
        if (matches != null) {
            description = matches[1];
        } else {
            description = value.description;
        }
        var content = GCTtxt.txtNotification({
            unread: unread,
            time: prettyDate(value.time_created),
            title: value.title,
            guid: value.guid
        });
        return content;
    },
    Message: function (value, obj) {
        var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : ""; //we don't use this so?
        var unread = (value.read) ? "" : "unread";

        var content = GCTtxt.txtMessage({
            unread: unread,
            time: prettyDate(value.time_created),
            title: value.title,
            sender: value.fromUserDetails.displayName,
            guid: value.guid
        });
        return content;
    },
    Comment: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var date = prettyDate(value.time_created);
        var label = value.userDetails.displayName + ' ' + date + '. ' + value.description;
        var content = GCTtxt.txtComment({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            owner: value.owner_guid,
            container: value.container_guid,
            date: date,
            description: value.description,
            type: value.subtype,
            guid: value.guid,
            liked: liked,
            likes: likes,
            label: label
        });
        return content;
    },
    ColleagueRequest: function (value, obj) {
        var description = '<div class="row"><div class="col-50"><span class="button button-fill button-raised" data-guid="' + value.user_id + '" onclick="GCTUser.ApproveColleague(this);">' + GCTLang.Trans("accept") + '</span></div><span class="col-50"><div class="button button-fill button-raised" data-guid="' + value.user_id + '" onclick="GCTUser.DeclineColleague(this);">' + GCTLang.Trans("decline") + '</span></div></div>';

        var content = GCTtxt.txtMember({
            guid: value.user_id,
            icon: value.iconURL,
            name: value.displayName,
            date: GCTLang.Trans("join-date") + "<em>" + prettyDate(value.dateJoined) + "</em>",
            description: description,
            organization: value.organization,
            job: (value.job) ? value.job : '',
            colleaguerequest: true
        });
        return content;
    },
    ContentSuccess: function (data, obj) {
        console.log(obj);
        var info = data.result;
        var content = '';
        if (obj.loaded == true) { $(obj.appendMessage).appendTo('#content-' + obj.id); } else { obj.loaded = true; }

        if (info && info.length > 0) {
            $.each(info, function (key, value) {
                content = obj.eachFunc(value);
                $(content).hide().appendTo('#content-' + obj.id).fadeIn(1000);
            });
        }
        if (info && info.length < obj.limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + obj.id).fadeIn(1000);
            $('#more-' + obj.id).hide();
        }
        obj.offset += obj.limit;
        app.preloader.hide();
        var focusNow = document.getElementById('focus-' + obj.id);
        if (focusNow) { focusNow.focus(); }
    },
    ContentSuccessEvent: function (data, obj) {
        var info = data.result;
        var content = '';
        //clear old calendar, destroy and clear
        if (obj.calendar) { obj.calendar.destroy(); $('#event-calendar-' + obj.id).html(''); }

        var monthNames = "";
        if (GCTLang.IsEnglish()) {
            monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        } else {
            monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        }

        if (obj.loaded == true) { $(obj.appendMessage).appendTo('#content-' + obj.id); } else { obj.loaded = true; }

        if (info.length > 0) {
            $.each(info, function (key, value) {
                var date = (value.startDate).split(" ")[0];
                var split = date.split("-");
                var day = new Date(split[0], parseInt(split[1]) - 1, split[2]);
                obj.events.push(day);
                value.tab = obj.name;
                content = obj.eachFunc(value);
                $(content).hide().appendTo('#content-' + obj.id).fadeIn(1000);
            });
            obj.calendar = app.calendar.create({
                containerEl: '#event-calendar-' + obj.id,
                value: [new Date()],
                weekHeader: false,
                events: obj.events,
                dateFormat: 'M dd yyyy',
                renderToolbar: function () {
                    return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
                        '<div class="toolbar-inner">' +
                        '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
                        '</div>' +
                        '<div class="center"></div>' +
                        '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                },
                on: {
                    init: function (c) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            obj.calendar.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            obj.calendar.nextMonth();
                        });
                    },
                    monthYearChangeStart: function (c) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] + ', ' + c.currentYear);
                    },
                    dayClick: function (c, dayEl, year, month, day) {
                        console.log('clicked day');
                        var date = $(dayEl).data('date');
                        if ($("#event-" + obj.name + '-' + date).length > 0) {
                            $$('.page-content').scrollTop($$("#event-" + obj.name + '-' + date).offset().top, 300);
                        }
                    }
                }
            });
        }
        if (info.length < obj.limit) {
            content = endOfContent;
            $(content).hide().appendTo('#content-' + obj.id).fadeIn(1000);
            $('#more-' + obj.id).hide();
        }
        obj.offset += obj.limit;
        app.preloader.hide();
        var focusNow = document.getElementById('focus-' + obj.id);
        if (focusNow) { focusNow.focus(); }
    },
}

GCTtabs = {
    TabReset: function (obj, guid) {
        if (obj.events) {
            obj.events = [];
        }
        obj.offset = 0;
        obj.loaded = false;
        $('#content-' + obj.id).html('');
        $('#more-' + obj.id).show();
        obj.request(obj, guid);
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
    LoginOpenID: function (email, sub, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "login.sso", email: email, sub: sub, lang: GCTLang.Lang() },
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
    AddColleague: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "add.colleague", user: GCTUser.Email(), profileemail: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    RemoveColleague: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "remove.colleague", user: GCTUser.Email(), profileemail: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ApproveColleague: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "approve.colleague", user: GCTUser.Email(), profileemail: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log(data);
                ShowColleagueRequests();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    DeclineColleague: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "decline.colleague", user: GCTUser.Email(), profileemail: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log(data);
                ShowColleagueRequests();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    RevokeColleague: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "revoke.colleague", user: GCTUser.Email(), profileemail: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log(data);
                ShowColleagueRequests();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    Guid: function () {
        return (Cookies.get('guid')) ? Cookies.get('guid') : "";
    },
    JoinGroup: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "group.join", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                $("#join-group-profile-"+guid+"-profile").hide();
                $("#leave-group-profile-" + guid + "-profile").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    LeaveGroup: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "group.leave", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                $("#leave-group-profile-" + guid + "-profile").hide();
                $("#join-group-profile-" + guid + "-profile").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
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
                app.preloader.hide();
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
    GetBlog: function (guid, successCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.blogpost", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
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
            data: { method: "get.blogposts", user: GCTUser.Email(), limit: limit, offset: offset, filters: filters, api_key: api_key_gccollab, lang: GCTLang.Lang() },
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
    PostBlogPost: function (group_guid, group_public) {
        if (group_guid) {
            mainView.router.navigate('/post-entity-group/blog/' + group_guid + '/' + group_public + '/');
        } else {
            mainView.router.navigate('/post-entity/blog/');
        }

    },
    PostBlog: function (container, blog_guid, title, excerpt, body, comments, access, status, successCallback, errorCallback, issueCallback) {
        if (!title.en && !title.fr) { issueCallback(GCTLang.Trans("require-title")); return; }
        if (!body.en && !body.fr) { issueCallback(GCTLang.Trans("require-body")); return; }
        if (!(title.en && body.en) && !(title.fr && body.fr)) { issueCallback(GCTLang.Trans("require-same-lang")); return; }

        container = container || '';
        blog_guid = blog_guid || '';
        title = title || '';
        excerpt = excerpt || '';
        body = body || '';
        comments = comments || 1;
        access = access || 1;
        status = status || 0;

        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "save.blog", user: GCTUser.Email(), title: JSON.stringify(title), excerpt: JSON.stringify(excerpt), body: JSON.stringify(body), container_guid: container, blog_guid: blog_guid, comments: comments, access: access, status: status, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
                app.preloader.hide();
            }
        });
    },
    EditBlogPost: function (obj) {
        var guid = $(obj).data("guid");
        mainView.router.navigate('/edit-entity/blog/' + guid + '/');
    },
    GetBlogEdit: function (post_guid, successCallback, errorCallback) {
        if (!post_guid) { return "cannot edit nothing"; } //force back? with message 
        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.blogedit", user: GCTUser.Email(), guid: post_guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
                app.preloader.hide();
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
    GetWire: function (guid, thread, successCallback) {
        thread = thread || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.wirepost", user: GCTUser.Email(), guid: guid, thread: thread, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
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
    PostWirePost: function () {
        mainView.router.navigate('/post-wire/');
    },
    PostWire: function (message, imageURI, successCallback, errorCallback) {
        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "post.wire", user: GCTUser.Email(), message: message, image: imageURI, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                app.preloader.hide();
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                app.preloader.hide();
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ReplyWirePost: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");
        mainView.router.navigate('/wire/reply/' + guid + '/' + type + '/');
    },
    ReplyWire: function (guid, message, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "reply.wire", user: GCTUser.Email(), guid: guid, message: message, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    EditWirePost: function (obj) {
        var guid = $(obj).data("guid");
       
        
           // title: GCTLang.Trans("new-wire-post"),
            //text: GCTLang.Trans("new-post-info"),
            //afterText: '<textarea id="wire-post-textarea">' + $("#wire-" + guid).text() + '</textarea>',
            
    },
    EditWire: function (guid, message, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "edit.wire", user: GCTUser.Email(), guid: guid, message: message, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroups: function (tabObject) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.groups", user: GCTUser.Email(), limit: limit, offset: offset, filters: filters, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupsMine: function (tabObject) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';
        if (tabObject.filters) {
            filters = JSON.parse(tabObject.filters);
        }
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
    GetGroupP: function (tabObject, guid) {
        guid = guid;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.group", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.GroupP(data, tabObject);
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupMembers: function (tabObject, guid) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "group.members", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupDiscussions: function (tabObject, guid) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.groupdiscussions", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupActivity: function (tabObject, guid) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.groupactivity", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang(), api_version: apiVersion },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupBlogs: function (tabObject, guid) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.blogpostsbycontainer", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetDiscussion: function (guid, successCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.discussion", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    PostDiscussionPost: function (group_guid, group_public) {
        mainView.router.navigate('/post-entity-group/discussion/' + group_guid + '/' + group_public + '/');
    },
    PostDiscussion: function (container, topic, title, message, status, access, successCallback, errorCallback, issueCallback) {
        if (!title.en && !title.fr) { issueCallback(GCTLang.Trans("require-title")); return; }
        if (!message.en && !message.fr) { issueCallback(GCTLang.Trans("require-topic")); return; }
        if (!(title.en && message.en) && !(title.fr && message.fr)) { issueCallback(GCTLang.Trans("require-same-lang")); return; }
        if (!container) { container = ''; }
        if (!topic) { topic = ''; }
        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: 'post.discussion', user: GCTUser.Email(), title: JSON.stringify(title), message: JSON.stringify(message), container_guid: container, topic_guid: topic, access: access, open: status, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
                app.preloader.hide();
            }
        });
    },
    EditDiscussionPost: function (obj) {
        var guid = $(obj).data("guid");
        mainView.router.navigate('/edit-entity/discussion/' + guid + '/');
    },
    GetDiscussionEdit: function (post_guid, successCallback, errorCallback) {
        if (!post_guid) { return "cannot edit nothing"; } //force back? with message 
        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.discussionedit", user: GCTUser.Email(), guid: post_guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
                app.preloader.hide();
            }
        });
    },
    GetMembers: function (tabObject) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.members", user: GCTUser.Email(), limit: limit, offset: offset, filters: filters, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetMembersByUserColleague: function (tabObject, profile) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.memberscolleague", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, filters: filters, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetDocs: function (tabObject) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        filters = tabObject.filters || '';

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.docs", user: GCTUser.Email(), limit: limit, offset: offset, filters: filters, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEvent: function (guid, successCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.event", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEvents: function (tabObject, from, to) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        var filters = tabObject.filters || '';
        if (filters) {
            filters = JSON.parse(filters);
        }
        from = filters.from || "";
        to = filters.to || "";

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.events", user: GCTUser.Email(), from: from, to: to, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccessEvent(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEventsByUser: function (tabObject, from, to, targetGUID) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        var filters = tabObject.filters || '';
        if (filters) {
            filters = JSON.parse(filters);
        }
        from = filters.from || "";
        to = filters.to || "";
        target = targetGUID || "";

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.eventsbyowner", user: GCTUser.Email(), target: target, from: from, to: to, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccessEvent(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEventsByColleagues: function (tabObject, from, to) {
        limit = tabObject.limit || 15;
        offset = tabObject.offset || 0;
        var filters = tabObject.filters || '';
        if (filters) {
            filters = JSON.parse(filters);
        }
        from = filters.from || "";
        to = filters.to || "";

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.eventsbycolleagues", user: GCTUser.Email(), from: from, to: to, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccessEvent(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SeeCalendar: function (obj) {
        var guid = $(obj).data("guid");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.seecalendar", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                var seeCalendar = data.result;
                var content = "";
                $.each(seeCalendar, function (key, value) {
                    content += GCTtxt.txtSeeCalendar({
                        icon: value.iconURL,
                        name: value.displayName,
                        date: prettyDate(value.time_created),
                        owner: value.user_id
                    });
                });

                var postCalendar = app.popup.create({
                    content: '<div class="popup">' +
                        '<div class="navbar"><div class="navbar-inner">' +
                        '<div class="left"><a href="#" class="link popup-close" data-translate-target="aria-label" data-translate="close"><i class="far fa-times-circle"></i></a></div>' +
                        '<div id="in-cal-title" class="title" tabindex="0">' + GCTLang.Trans('in-calendar') + '</div>'+
                        '</div></div>' +
                        '<div class="block">' +
                        content +
                        '<p><a href="#" class="link popup-close">' + GCTLang.Trans('close') +'</a></p>' +
                        '</div>' +
                        '</div>',
                    on: {
                        opened: function (popup) {
                            var focusTitle = document.getElementById('in-cal-title');
                            if (focusTitle) { focusTitle.focus(); }
                        },
                        closed: function (popup) {
                            obj.focus();
                        }
                    }
                });
                postCalendar.open();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    AddCalendar: function (obj) {
        var guid = $(obj).data("guid");
        app.request({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "event.add.calendar", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                app.dialog.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    PostEventPost: function () {
        mainView.router.navigate('/post-entity/event/');
    },
    PostEvent: function (container, event_guid, title, body, startdate, starttime, enddate, endtime, venue, room, allday, web_conference, url, additionnal, fees, contact_checkbox, contact_text, contact_email_text, contact_phone_text, picker_language, comments, access, status, successCallback, errorCallback, issueCallback) {
        if (!title.en && !title.fr) { issueCallback(GCTLang.Trans("require-title")); return; }
        if (!body.en && !body.fr) { issueCallback(GCTLang.Trans("require-body")); return; }
        if (!venue) { issueCallback(GCTLang.Trans("require-venue")); return; }
        if (!startdate || !enddate) { issueCallback(GCTLang.Trans("require-dates")); return; }
        if (!(title.en && body.en) && !(title.fr && body.fr)) { issueCallback(GCTLang.Trans("require-same-lang")); return; }

        container = container || '';
        event_guid = event_guid || '';
        title = title || '';
        body = body || '';
        comments = comments || 1;
        access = access || 1;
        status = status || 0;
        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "save.event", user: GCTUser.Email(), title: JSON.stringify(title), body: JSON.stringify(body), startdate: startdate, starttime: starttime, enddate: enddate, endtime: endtime, venue: venue, room: room, allday: allday, web_conference: web_conference, url: url, additionnal: additionnal, fees: fees, contact_checkbox: contact_checkbox, contact_text: contact_text, contact_email_text: contact_email_text, contact_phone_text: contact_phone_text, picker_language: picker_language, container_guid: container, event_guid: event_guid, comments: comments, access: access, status: status, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
                app.preloader.hide();
            }
        });
    },
    GetBookmark: function (guid, successCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmark", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
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
        target = target || '';
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
    GetOpportunity: function (guid, successCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.opportunity", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
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
            data: { method: "get.opportunities", user: GCTUser.Email(), limit: limit, offset: offset, filters: filters, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    CreateNewOpportunity: function () {
        mainView.router.navigate('/post-opp/'); 
    },
    CreateOpportinities1: function (formData, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "create.opportinities1", user: GCTUser.Email(), formData: formData, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    CreateOpportinities2: function (formData, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "create.opportinities2", user: GCTUser.Email(), formData: formData, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log('data' + data);
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    CreateOpportinities3: function (formData, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "create.opportinities3", user: GCTUser.Email(), formData: formData, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log('data is ' + data);
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetNotification: function (guid, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.message", user: GCTUser.Email(), guid: guid, thread: 0, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetNotifications: function (tabObject) {
        limit = tabObject.limit || 10;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.notifications", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetMessage: function (guid, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.message", user: GCTUser.Email(), guid: guid, thread: 1, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 55000,
            success: function (data) {
                successCallback(data);
                $(".popover").remove();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
                $(".popover").remove();
            }
        });
    },
    GetMessages: function (tabObject) {
        limit = tabObject.limit || 10;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.messages", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ReadMessage: function (guid, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "read.message", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    NewMessage: function (obj) {
        var guid = $(obj).data("guid");
        var name = $(obj).data("name");
        var subject = "Message to " + name;
        app.dialog.prompt(GCTLang.Trans("new-message-info"), GCTLang.Trans("message"), function (value) {
            app.request({
                api_key: api_key_gccollab,
                method: 'POST',
                dataType: 'json',
                url: GCT.GCcollabURL,
                data: { method: "send.message", user: GCTUser.Email(), touser: guid, subject: subject, message: value, api_key: api_key_gccollab, lang: GCTLang.Lang() },
                timeout: 12000,
                success: function (data) {
                    console.log(data);
                    alert(data.result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                }
            })
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    },
    ReplyMessage: function (obj) {
        var guid = $(obj).data("guid");
        var message = $("#reply-message").val();

        if (message == "") return;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "reply.message", user: GCTUser.Email(), message: message, guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                console.log(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetColleagueRequests: function (tabObject) {
        limit = tabObject.limit || 10;
        offset = tabObject.offset || 0;

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.colleaguerequests", user: GCTUser.Email(), limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                GCTEach.ContentSuccess(data, tabObject);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetComments: function (guid, limit, offset, successCallback) {
        limit = limit || 10;
        offset = offset || 0;
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "get.commentsall", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorConsole(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SubmitComment: function (guid, message, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "submit.comment", user: GCTUser.Email(), guid: guid, message: message, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    Delete: function (obj) {
        var guid, type, location;
        guid = $(obj).data("guid");
        type = $(obj).data("type");
        location = $(obj).data("location");
        $(".popover").remove();
        app.dialog.confirm(GCTLang.Trans("deletepost"), GCTLang.Trans("deletepost"), function () {
            app.preloader.show();
            app.request({
                api_key: api_key_gccollab,
                method: 'POST',
                dataType: 'json',
                url: GCT.GCcollabURL,
                data: { method: "delete.post", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
                timeout: 12000,
                success: function (data) {
                    app.preloader.hide();
                    app.dialog.alert(GCTLang.Trans("deleted"));
                    if (location === "list" || location === "comment") {
                        $$("#list-" + guid).remove();
                    } else {
                        mainView.router.back();
                        $$("#list-" + guid).remove();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    app.preloader.hide();
                    console.log(jqXHR, textStatus, errorThrown);
                }
            });
        }, '');
    },
    Report: function (obj) {
        var guid = $(obj).data("guid");
        $(".popover").remove();

        app.dialog.confirm('', GCTLang.Trans("reportpost"), function (value) {
            app.request({
                api_key: api_key_gccollab,
                method: 'POST',
                dataType: 'json',
                url: GCT.GCcollabURL,
                data: { method: "report.post", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
                timeout: 12000,
                success: function (data) {
                    app.dialog.alert(GCTLang.Trans("reported"));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                }
            });
        }, function (value) { }
        );
    },
    LikePost: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");

        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "like.item", user: encodeURI(GCTUser.Email()), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                if (typeof data.result == "undefined") {
                    if ($(obj).hasClass('liked')) {
                        $(obj).removeClass('liked');
                    } else {
                        $(obj).addClass('liked');
                    }

                    return;
                }
                var count = data.result.count;
                var liked = data.result.liked;

                if (!liked && $(obj).hasClass('liked')) {
                    $(obj).removeClass('liked');
                } else if (liked) {
                    $(obj).addClass('liked');
                }

                var likes = (count > 0) ? count + (count == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
                $(obj).find('.like-count').text(likes);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetLikeUsers: function (obj) {
        var guid = $(obj).data("guid");
        app.preloader.show();
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "like.users", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                var likeData = data.result;

                var content = "";
                if (likeData.count > 0) {
                    $.each(likeData.users, function (key, value) {
                        content += GCTtxt.txtLikes({
                            icon: value.iconURL,
                            name: value.displayName,
                            date: prettyDate(value.time_created),
                            owner: value.user_id
                        });
                    });
                } else {
                    content += endOfContent;
                }
                

               
                $('#content-likes').html(content);
                app.popup.open('.likes-popup');
                $('#likes-menu').focus();
                app.preloader.hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                app.preloader.hide();
            }
        });
    },
    GetEntityURL: function (guid, successCallback, errorCallback) {
        app.request({
            method: 'POST',
            dataType: 'json',
            url: GCT.GCcollabURL,
            data: { method: "entity.url", user: GCTUser.Email(), guid: guid, api_key: api_key_gccollab, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
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
            GCT.ViewPost(lnk, "gccollab_blog_post");

        } else if (obj.href.indexOf("/thewire/view/") > -1) {
            console.log('loading wire page...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            if (lnk.indexOf("/") > -1) {
                lnk = lnk.substr(0, lnk.indexOf("/"));
            }
            GCT.ViewPost(lnk, "gccollab_wire_post");

        } else if (obj.href.indexOf("/docs/view/") > -1) {
            console.log('loading doc page...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            if (lnk.indexOf("/") > -1) {
                lnk = lnk.substr(0, lnk.indexOf("/"));
            }
            GCT.ViewPost(lnk, "gccollab_doc", "test");

        } else if (obj.href.indexOf("/groups/profile/") > -1) {
            console.log('loading group profile...');
            lnk = obj.href.substr((obj.href.indexOf("/profile/") + 9));
            console.log(lnk);
            lnk = lnk.substr(0, lnk.indexOf("/"));
            console.log(lnk);
            GCT.ViewPost(lnk, "gccollab_group");

        } else if (obj.href.indexOf("/comment/view/") > -1) {
            console.log('loading comment... ' + obj);
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));

            var the_guids = lnk.split('/');
            var the_container_guid = the_guids[1];
            var comment_guid = the_guids[0];

            // TODO: Need to check what entity type the comment was made on, then route to the proper entity type
            // GCT.ViewPost(the_container_guid, "???");

            console.log(the_container_guid, comment_guid);
            window.open(obj.href, '_blank');

        } else if (obj.href.indexOf("/missions/view/") > -1) {
            console.log('loading mission...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            console.log(lnk);
            GCT.ViewPost(lnk, "gccollab_opportunity");

        } else if (obj.href.indexOf("/event_calendar/view/") > -1) {
            console.log('loading event...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            lnk = lnk.substring(0, lnk.indexOf("/"));
            console.log(lnk);
            GCT.ViewPost(lnk, "gccollab_event");

        } else if (obj.href.indexOf("/discussion/view/") > -1) {
            console.log('loading discussion...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            lnk = lnk.substring(0, lnk.indexOf("/"));
            console.log(lnk);
            GCT.ViewPost(lnk, "gccollab_discussion_post");

        } else if (obj.href.indexOf("/bookmarks/view/") > -1) {
            console.log('loading bookmark...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            lnk = lnk.substring(0, lnk.indexOf("/"));
            console.log(lnk);
            GCT.ViewPost(lnk, "gccollab_bookmark");

        } else if (obj.href.indexOf("https://gccollab.ca/") > -1) {
            console.log('loading collab page...');
            cordova.InAppBrowser.open(obj.href, '_blank');

        } else {
            // This shouldn't happen
            console.log('loading external page (Error)');
            cordova.InAppBrowser.open(obj.href, '_system');
        }
        return false;
    },
    SiteLink: function (obj) {
        if (obj.href.indexOf("https://gccollab.ca/") > -1) {
            console.log('loading collab page...');
            cordova.InAppBrowser.open(obj.href, '_blank');
        } else {
            console.log('non-gccollab link through SiteLink function. (Error)');
            cordova.InAppBrowser.open(obj.href, '_system');
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
    },
    ViewPost: function (obj, type, title) {
        //Stops outer events (onclick to the whole post) from triggering if this was reached from a child to it
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        //
        var guid;
        if (typeof obj == "object") {
            guid = obj.getAttribute("data-guid");

            if (typeof obj.getAttribute("data-type") == "string") {
                type = obj.getAttribute("data-type");
            }
            title = $(obj).data("title");
        } else {
            guid = obj;
        }

        switch (type) {
            case "gccollab_profile":
                mainView.router.navigate('/profile-template/user/' + guid + '/');
                break;
            case "gccollab_group":
                mainView.router.navigate('/profile-template/group/' + guid + '/');
                break;
            case "group":
                mainView.router.navigate('/profile-template/group/' + guid + '/');
                break;
            case "gccollab_doc":
                mainView.router.navigate('/doc/' + guid + '/');
                break;
            case "gccollab_wire_post":
                mainView.router.navigate('/entity-template/wire/' + guid + '/');
                break;
            case "gccollab_blog":
            case "gccollab_blog_post":
                mainView.router.navigate('/entity-template/blog/' + guid + '/');
                break;
            case "gccollab_discussion_reply":
            case "gccollab_discussion_post":
                mainView.router.navigate('/entity-template/discussion/' + guid + '/');
                break;
            case "gccollab_opportunity":
                mainView.router.navigate('/entity-template/opportunity/' + guid + '/');
                break;
            case "gccollab_bookmarks":
            case "gccollab_bookmark":
                mainView.router.navigate('/entity-template/bookmark/' + guid + '/');
                break;
            case "gccollab_event_calendar":
            case "gccollab_event":
                mainView.router.navigate('/entity-template/event/' + guid + '/');
                break;
            case "gccollab_notification":
                mainView.router.navigate('/entity-template/notification/' + guid + '/');
                break;
            case "gccollab_message":
                mainView.router.navigate('/entity-template/message/' + guid + '/');
                break;
            default:
                console.log('Worked, but type not handled yet.');
                break;
        }
    },
    MoreOptions: function (obj) {
        var owner = $(obj).data("owner") || '';
        var guid = $(obj).data("guid") || '';
        var type = $(obj).data("type") || '';
        var container = $(obj).data("container") || '';
        var location = $(obj).data("location") || '';

        var isOwner = (owner == GCTUser.Guid());
        var inGroup = ((container && owner) && (container != owner));

        var popoverHTML = '<div class="popover">'
            +'<div class="popover-inner">' 
            +'<div class="list">' 
            +'<ul>' 
            + '<span id="focus-new-popover" class="reader-text" tabindex="0">' + GCTLang.Trans("more-options-opened") + '</span>';
        if (type === "gccollab_discussion_reply") { //comments view post will probably use this too
            popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + container + '" data-type="' + type + '" onclick="GCT.ViewPost(this);">' + GCTLang.Trans("view-post") + '</a></li>';
        } else {
            popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" data-type="' + type + '" onclick="GCT.ViewPost(this);">' + GCTLang.Trans("view-post") + '</a></li>';
        }
        if (type == 'gccollab_wire_post' || type == 'gccollab_blog_post' || type == "gccollab_event") {
            popoverHTML += '<li><a href="#" class="item-link popover-close list-button social-share" data-guid="' + guid + '" data-type="' + type + '" onclick="SocialShare(this);">' + GCTLang.Trans("share") + '</a></li>';
        }
        if (type == "gccollab_event") { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.AddCalendar(this);" data-type="' + type + '">' + GCTLang.Trans("add-calendar") + '</a></li>'; }
        if (type == 'gccollab_wire_post') { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" data-type="' + location + '" onclick="GCTrequests.ReplyWirePost(this);">' + GCTLang.Trans("reply") + '</a></li>'; }
        if (isOwner) {
            if (type == "gccollab_wire_post") { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.EditWirePost(this);">' + GCTLang.Trans("edit") + '</a></li>'; }
            if (type == "gccollab_discussion_post") { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.EditDiscussionPost(this);">' + GCTLang.Trans("edit") + '</a></li>'; }
            if (type == "gccollab_blog_post") { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.EditBlogPost(this);">' + GCTLang.Trans("edit") + '</a></li>'; }
            if (type != "gccollab_opportunity") {
                popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" data-type="' + type + '" data-location="' + location + '" onclick="GCTrequests.Delete(this);">' + GCTLang.Trans("delete") + '</a></li>';
            }
        }
        if (type === "gccollab_wire_post" || type === "gccollab_blog_post" || type === "gccollab_discussion_post" || type === "gccollab_comment" || type === "gccollab_bookmark" || type === "gccollab_event" || type === "gccollab_group") {
            popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" data-type="' + type + '" onclick="GCTrequests.LikePost(this);">' + GCTLang.Trans("like") + '</a></li>';
            if (location === 'post') {
                popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.GetLikeUsers(this);">' + GCTLang.Trans("likes") + '</a></li>';
            }
        }
        if (inGroup) { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + container + '" data-type="gccollab_group" onclick="GCT.ViewPost(this);">' + GCTLang.Trans("view-group") + '</a></li>'; }
        if (type === "gccollab_event") { popoverHTML += '<li><a href="#" class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.SeeCalendar(this);">' + GCTLang.Trans('in-calendar') + '</a></li>'
}
        popoverHTML += '<li><a href="#" class="item-link list-button popover-close" onclick="ShowProfile(' + owner + ');">' + GCTLang.Trans("show-user") + '</a></li>';
        popoverHTML += '<li><a href="#"  class="item-link list-button popover-close" data-guid="' + guid + '" onclick="GCTrequests.Report(this);">' + GCTLang.Trans("report") + '</a></li>';
        popoverHTML += '<li><a href="#" class="list-button item-link popover-close">' + GCTLang.Trans("close") + ' </a></li>';
        popoverHTML += '</ul>'
            + '</div>'
            +'</div>'
            +'</div>';

        optionsPopover = app.popover.create({
            targetEl: obj,
            content: popoverHTML,
            // Events
            on: {
                open: function (popover) {
                    console.log('Popover open');
                },
                opened: function (popover) {
                    console.log('Popover opened');
                },
                closed: function (popover) {
                    $(obj).focus();
                },
            }
        });
        optionsPopover.open();
        $('#focus-new-popover').focus();
    },
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
        header: GCTtxt.txtTabHeader(header, page + '-' + tab),
        appendMessage: GCTtxt.txtFocusMessage(page + '-' + tab),
        eachFunc: eachFunc,
        request: request,
    };
    if (header === 'event') {
        object.events = [];
    }
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
    app.preloader.hide();
}

var endOfContent = '<div class="card"><div class="card-content card-content-padding"><div class="card-content-inner"><div class="item-text">' + GCTLang.Trans("end-of-content") + '</div></div></div></div>';

