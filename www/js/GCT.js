var DevOrProd = "prod"; //### set this to "dev" to have the api hit the dev environment, anything else for prod. Sorry about the naming convention. Not feeling very creative...
var apiVersion = 0.9; 
var api_key_gccollab = "";

/*
* txtType functions:
* takes object of Type and creates the card for them as 'var content'. Content goes through GCT.SetLinks then returns.
*/
GCTLang = {
    txtNewsfeed: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
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
            + "<div class='card-content'>"
            + "<div class='card-content-inner'>"
            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'><i class='fa fa-caret-down'></i></a>"
            + "<div class='item-text large'>" + object.name + " " + object.description + " " + object.more + "</div>"
            + object.text
            + object.source
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + object.reply
            // + "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.SharePost(this);'><i class='fa fa-share-alt-square'></i> <span>" + GCTLang.Trans("share") + "</span></a>"
            + object.action
            + "</div>"
            + "</div>"
            + "</div>";
        //console.log(GCT.SetLinks(content));
        return GCT.SetLinks(content);
    },
    txtComment: function (object) {
        var content = '<li>'
                + '<div class="item-link item-content">'
                    + '<div class="item-media"> <img src="' + object.icon + '" onclick="ShowProfile(' + object.owner + ');" style="border-radius:100%" width="40" height="40" alt="Profile Picture"> </div>'
                    + '<div class="item-inner">'
                        + '<div class="item-title-row">'
                            + '<div class="item-title author-comment">' + object.name +'</div>'
                        + '</div>'
                        + '<div class="time">' + object.date + '<a href="#" class="link pull-right more-options" data-owner="' + object.owner + '" data-guid="' + object.guid + '" data-type="' + object.type + '" onclick="GCTUser.MoreOptions(this); "><i class="fa fa-caret-down"></i></a></div>'
                        + object.description
                    + '</div>'
                + '</div>'
            + '</li>';
        content = GCT.SetLinks(content);
        return content;
    },
    txtBlog: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                        + "<div class='time'>" + object.date + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
            + "<div class='card-content-inner'>"
           
                     + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'><i class='fa fa-caret-down'></i></a>"
                        + "<div class='blog-title'>" + object.title + "</div>"
                        + "<div class='blog-group'>" + object.group + "</div>"
                        + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-footer'>"
                    + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
                    // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
                    // + "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.SharePost(this);'><i class='fa fa-share-alt-square'></i> <span>" + GCTLang.Trans("share") + "</span></a>"
                    + object.action
                + "</div>"
            + "</div>"
        + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtDiscussion: function (object) {
       
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                        + "<div class='time'>" + object.date + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
            + "<div class='card-content-inner'>"
           
                     + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'><i class='fa fa-caret-down'></i></a>"
                        + "<div class='blog-title'>" + object.title + "</div>"
                        + "<div class='blog-group'>" + object.group + "</div>"
                        + "<div class='item-text large " + object.all_text + "'>" + object.description + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-footer'>"
                    + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
                    // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
                    // + "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.SharePost(this);'><i class='fa fa-share-alt-square'></i> <span>" + GCTLang.Trans("share") + "</span></a>"
                    + object.action
                + "</div>"
            + "</div>"
        + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtDoc: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                        + "<div class='time'>" + object.date + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
                    + "<div class='card-content-inner'>"
                        + "<div class='blog-title'>" + object.title + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-footer'>"
                    + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
                    // + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyToPost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
                    // + "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.SharePost(this);'><i class='fa fa-share-alt-square'></i> <span>" + GCTLang.Trans("share") + "</span></a>"
                    + object.action
                + "</div>"
            + "</div>"
        + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtEvent: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div id='" + object.id + "' class='card'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                        + "<div class='time'>" + object.date + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
                    + "<div class='card-content-inner'>"
                        + "<div class='blog-title'>" + object.title + "</div>"
                        + "<div class='item-text large'>" + object.posted + "</div>"
                        + "<div class='item-text large'>" + object.startDate + "<br>" + object.endDate + "</div>"
                        + "<div class='item-text large'>" + object.location + "</div>"
                        + "<div class='item-text large " + object.all_text + "'>" +"<br>"+ object.description + "</div>";

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
                    + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
                    + object.action
                + "</div>"
            + "</div>"
        + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtGroup: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card' data-guid='" + object.owner + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>"
                + "<div class='card-header'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
                    + "<div class='card-content-inner'>"
                        + "<div class='item-text large'>" + object.description + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-footer'>"
                    + "<div>" + object.count + "</div>"
                    + object.action
                + "</div>"
            + "</div>"
        + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtMember: function (object) {
        var content = "<a class='item-link item-content close-popup' data-guid='" + object.guid + "' data-type='gccollab_user' onclick='ShowProfile("+object.guid+");'>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row no-padding-right'>"
            + "</div>"
            + "<div class='row ptm'>"
            + "<div class='col-20'><img src='" + object.icon + "' width='50' alt='" + object.name + "'></div>"
            + "<div class='col-80 item-title reg-text'>" + object.name + "<div class='item-text more_text'>" + object.organization + "</div> <div class='item-text more_text'> " + object.job + "</div></div>"
            + "</div>"
            + "</div>"
            + "</a>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtOpps: function (object) {
        if(object.state != '0' && object.state != 'cancelled'){
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                        + "<div class='time'>" + object.date + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
                    + "<div class='card-content-inner'" + object.all_text +">"
                    + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'><i class='fa fa-caret-down'></i></a>"                    
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
                        + "<div class='blog-title'>" + GCTLang.Trans('opportunity-language-requirements') +"</div>" //change to smaller title later
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
                    if(object.apply == 'mission_apply'){content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ApplyPost(this);'> <span>Apply</span></a>";}
                    else if(object.apply == 'withdraw'){content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>Withdraw</span></a>";}
                    else if(object.apply == 'offered'){content += "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.AcceptPost(this);'> <span>Accept</span></a><a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.WithdrawPost(this);'> <span>Decline</span></a>";}
                    content += object.state
                    
                    + "</div>"
            + "</div>"
        + "</div>";
   
        content = GCT.SetLinks(content);
        return content;
    }
    },
    txtWire: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
                + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row'>"
                            + "<div class='author'>" + object.name + "</div>"
                        + "</div>"
                        + "<div class='time'>" + object.date + "</div>"
                    + "</div>"
                + "</div>"
                + "<div class='card-content'>"
                    + "<div class='card-content-inner'>"
                        + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'><i class='fa fa-caret-down'></i></a>"
            + "<div id='wire-" + object.guid + "' class='item-text large'>" + object.description + "</div>"
            + "<div class='item-media'>"+ object.image +"</div>"
                        + object.source
                    + "</div>"
                + "</div>"
                + "<div class='card-footer'>"
                    + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
                    + "<a href='#' class='link " + object.replied + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.ReplyWirePost(this);'><i class='fa fa-reply'></i> <span>" + GCTLang.Trans("reply") + "</span></a>"
                    // + "<a href='#' class='link' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.SharePost(this);'><i class='fa fa-share-alt-square'></i> <span>" + GCTLang.Trans("share") + "</span></a>"
                    + object.action
                + "</div>"
            + "</div>"
        + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtLikes: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
                + "<div class='card-header plain' onclick='ShowProfile(" + object.owner + ");'>"
                    + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
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
    txtActivity: function (object) {
        var content = "<li class='item-link item-content'>"
            + "<div class='item-inner'>"
            + "<div class='row'>"
            + "<div class='col-20'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' width='50' alt='" + object.name + "'></div>"
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
    txtBookmark: function (object) {
        var content = "<div class='swiper-slide list-block cards-list'>"
            + "<div class='card'>"
            + "<div class='card-header' onclick='ShowProfile(" + object.owner + ");'>"
            + "<div class='item-media rounded'><img alt='Profile Image of " + object.name +"' src='" + object.icon + "' /></div>"
            + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
            + "<div class='author'>" + object.name + "</div>"
            + "</div>"
            + "<div class='time'>" + object.date + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-content'>"
            + "<div class='card-content-inner'>"

            + "<a href='#' class='link pull-right more-options' data-owner='" + object.owner + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.MoreOptions(this);'><i class='fa fa-caret-down'></i></a>"
            + "<div class='blog-title'>" + object.title + "</div>"
            + "<div class='blog-group'>" + object.posted + "</div>"
            + "<div class='item-text large'>" + object.description + "</div>"
            + "<div class='blog-group'>" + "Link: " + object.address + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='card-footer'>"
            + "<a href='#' class='link like " + object.liked + "' data-guid='" + object.guid + "' data-type='" + object.type + "' onclick='GCTUser.LikePost(this);'><i class='fa fa-thumbs-o-up'></i> <span class='like-count'>" + object.likes + "</span></a>"
            + object.action
            + "</div>"
            + "</div>"
            + "</div>";
        content = GCT.SetLinks(content);
        return content;
    },
    txtUserList: function (content) {
        var contentNew = '<li>'
            + '<div class="item-content">'
            + '<div class="item-inner">'
            + content
        '</div>'
            + '</div>'
            + '</li>'
            + '<li>';
        return contentNew;
    },
    txtGlobalNav: function (title) {
        var content = '<div class="left sliding"><a href="#" data-panel="left" class="open-panel link icon-only" aria-label="Button to open Site Navigation Menu"><i class="icon icon-bars"></i></a></div>' +
            '<div class="center" id="'+title+'">' + GCTLang.Trans(title) + '</div>' +
            '<div class="right sliding"><a href="#" data-panel="right" class="open-panel link icon-only" aria-label="Button to open Notification Panel"><i class="fa fa-bell badge-wrapper"></i></a></div>';
        return content;
    },
    liGEDSResult: function (object) {
        var content = "<li class='item-content'>"
            + "<div class='item-inner'>"
                + "<div class='item-title-row' onclick='ShowHideGEDSInfo(this.parentNode);'>"
                    + "<div class='item-title'>" + object.name + "</div>"    
                    + "<div class='item-after'>" + object.dept + "</div>"
                + "</div>"
                + "<div class='' style='clear: both; font-weight: bold;' onclick='ShowHideGEDSInfo(this.parentNode);'>" + object.title + "</div>"    
                + "<div class='item-subtitle' style='display: none; margin-top: 5px;'>" + object.org + "</div>"
                    + "<div class='item-subtitle' style='display:none;'><a class='external' href='mailto:" + object.mail + "' style='border-bottom: 1px solid #000'>" + object.mail + "</a></div>"
                    + "<div class='item-subtitle' style='display:none;'><a class='external' href='tel:" + object.phone + "'>" + object.phone + "</a></div>"
                + "</div>"
            + "</div>";
        + "</li>";
        content = GCT.SetLinks(content);
        return content;
    },
    TransPage: function () {
        if( GCTLang.IsEnglish() ){
            $('[data-translate]').each(function(key, value) {
                var id = $(this).data('translate');
                var target = $(this).data('translate-target');

                if( English[id] ){
                    if( target ){
                        $(this).attr(target, English[id]);
                    } else {
                        $(this).html( English[id] );
                    }
                }
            });
        } else {
            $('[data-translate]').each(function(key, value) {
                var id = $(this).data('translate');
                var target = $(this).data('translate-target');

                if( French[id] ){
                    if( target ){
                        $(this).attr(target, French[id]);
                    } else {
                        $(this).html( French[id] );
                    }
                }
            });
        }
    },
    Trans: function (id) {
        if( GCTLang.IsEnglish() ){
            return ( English[id] ) ? English[id] : "";
        } else {
            return ( French[id] ) ? French[id] : "";
        }
    },
    Lang: function () {
        //### Check Lang cookie for fr, if present return fr else return en
        return (Cookies.get("lang") == 'fr') ? 'fr' : 'en';
    },
    IsEnglish: function () {
        return (GCTLang.Lang() == "en");
    },
    IsFrench: function () {
        return (GCTLang.Lang() == "fr");
    },
    SetAsFrench: function () {
        Cookies.set("lang", "fr", { expires: 100000 });
    },
    SetAsEnglish: function () {
        Cookies.set("lang", "en", { expires: 100000 });
    },
    IsLangSet: function () {
        return (typeof Cookies.get("lang") == "undefined") ? false : true;
    },
    ToggleLang: function(reload) {
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
}

var noContent = '<div class="swiper-slide list-block cards-list"><div class="card"><div class="card-content"><div class="card-content-inner center"><div class="item-text">' + GCTLang.Trans('no-content') + '</div></div></div></div></div>';
var noMatches = '<div class="card"><div class="card-content"><div class="card-content-inner"><div class="item-text">' + GCTLang.Trans('no-matches') + '</div></div></div></div>';
var endOfContent = '<div class="card"><div class="card-content"><div class="card-content-inner"><div class="item-text">' + GCTLang.Trans("end-of-content") + '</div></div></div></div>';

function isAppleDevice(){
    return (navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null) ? true : false;
}

GCTUser = {
    AppOpen: function () {
        //### Here we have all the preloading functionality for when the app is opened
        //### Such as hit GA with an event, check if user can be auto logged in
        //### Check the tools for any notifications
        //### Check paramters to see if the user open tha app from a notification link etc.
        //### Need to find the framework7s first event for this

        //### Uncomment to reset
        //Cookies.remove('lang');
       // Cookies.remove('apikey');
        //Cookies.remove('email');

        //### This function assumes it's being called from the index page after load
        if (GCTLang.IsLangSet()) {
            if (GCTUser.IsLoggedIn()) {
                //### Check if the key is still valid
                $$.ajax({
                    api_key: api_key_gccollab,
                    method: 'POST',
                    dataType: 'json',
                    url: GCT.GCcollabURL,
                    data: { method: "login.user", action: "login", email: GCTUser.Email(), key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
                    timeout: 12000,
                    success: function (data) {
                        if (data.status < 0) {
                            //### Key is invalid, reset it
                            GCTUser.SetAPIKey('');
                            mainView.router.loadPage({ url: 'sign-in.html' });
                        } else {

                            ///### Checks done.
                            //### Check for specific system access

                            var HasAccess = true;
                           
                           // GCTUser.HasGCconnexAccess(data.GCconnexAccess);

                            if (data.GCcollabAccess) {
                                GCTUser.SetUserProfile();
                                mainView.router.loadPage({ url: 'home.html' });
                            } else {
                                //### TODO: no access, this *should* only be caused by someone login it successfully at one point, then leave/banned from the system then opening the app
                            }
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //### Not good. User is not connected to the internet.
                        //### Down the line we may have offline capability
                        //### For now we don't allow the user to move forward
                        //### Maybe provide a "Check Again" modal?
                        console.log("app open error");
                        myApp.confirm('It looks like there is no internet connection. Would you like us to check again?', 'No Internet Connection',
                            function () {
                                window.location.reload(true);
                            }
                        );
                        
                    }
                });
            } else {
                mainView.router.loadPage({ url: 'sign-in.html' });
            }
        } else {
            //### Show lang buttons. This is first call and only happens until they click a lang link
            $('#aEN').toggle();
            $('#aFR').toggle();
        }
    },
    IsLoggedIn: function () {
        if (GCTUser.APIKey() == "") {
            return false;
        } else {
            return true;
        }
    },
    SendValidation: function (successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "login.user", email: GCTUser.Email(), action: "Activate", lang: GCTLang.Lang(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SendValidationCode: function (Code, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "login.user", email: GCTUser.Email(), action: "CheckCode", code: Code, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    Login: function (user, password, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "login.user", action: "loginpass", user: user, password: password, lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    Logout: function (successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "login.user", action: "logout", email: GCTUser.Email(), api_key: GCTUser.APIKey(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SetAPIKey: function (key) {
        if (key == "") {
            Cookies.remove('apikey');
        } else {
            Cookies.set('apikey', api_key_gccollab, { expires: 1000000 });
        }
    },
    APIKey: function () {
        return (typeof Cookies.get('apikey') != 'undefined') ? Cookies.get('apikey') : "";
    },
    LastLoginEmail: function () {
        return (Cookies.get('email')) ? Cookies.get('email') : "";
    },
    Email: function(){
        //### As currently designed, this will always be the same as LastLoginEmail. I think that makes sense if not we can change the logic.
        return GCTUser.LastLoginEmail();
    },
    SaveLoginEmail: function (txtObj) {
        Cookies.set("email", txtObj, { expires: 100000 });
    },
    PrettyContext: function(){
        return (Cookies.get("context") == "gcconnex") ? "GCconnex" : "GCcollab";
    },
    Context: function(){
        return (Cookies.get("context") == "gcconnex") ? "gcconnex" : "gccollab";
    },
    SetContextAsGCconnex: function(reload){
        Cookies.set("context", "gcconnex", { expires: 100000 });
        if (typeof reload == 'undefined' || reload) {
            mainView.router.refreshPage();
        } 
    },
    SetContextAsGCcollab: function(reload){
        Cookies.set("context", "gccollab",{ expires: 100000 } );
        if (typeof reload == 'undefined' || reload) {
            mainView.router.refreshPage();
        } 
    },
    DisplayName: function () {
        return (Cookies.get('displayName')) ? Cookies.get('displayName') : "";
    },
    Username: function () {
        return (Cookies.get('username')) ? Cookies.get('username') : "";
    },
    Guid: function () {
        return (Cookies.get('guid')) ? Cookies.get('guid') : "";
    },
    SetUserProfile: function() {
        GCTUser.GetUserProfile(GCTUser.Email(), function(data){
            var profileData = data.result;
            
            if( profileData ){
                $('#imgUserProfilePic').attr('src', profileData.iconURL);
                $('#divUserProfileName').text(profileData.displayName);
                $('#divUserProfileOrg').text(profileData.department);
                Cookies.set("username", profileData.username, { expires: 100000 });
                Cookies.set("displayName", profileData.displayName, { expires: 100000 });
                Cookies.set("guid", profileData.id, { expires: 100000 });
            }
        }, function (jqXHR, textStatus, errorThrown) {
            console.log("Set user profile error:");
            console.log(jqXHR, textStatus, errorThrown);
        });
    },
    GetUserProfile: function (profile, successCallback, errorCallback) { 
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method:"get.user", user: GCTUser.Email(), api_key: GCTUser.APIKey(), profileemail: profile, environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetUserActivity: function (profile, limit, offset, successCallback, errorCallback) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.useractivity", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang(), api_version: apiVersion },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetUserGroups: function (profile, successCallback, errorCallback) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.usergroups", user: GCTUser.Email(), profileemail: profile, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ViewPost: function (obj, type, title) {

        if (typeof obj == "object") {
            guid = obj.getAttribute("data-guid");
           
            if (typeof obj.getAttribute("data-type") == "string") {
                type = obj.getAttribute("data-type");
            }
            title = $(obj).data("title");
        } else {
            var guid = obj;
        }

        
        switch(type) {
            case "gccollab_blog_post":
                mainView.router.loadPage({ url: 'entity.html?type=' + type +"&guid="+ guid });
                break;

            case "gccollab_discussion_post":
                mainView.router.loadPage({ url: 'entity.html?type=' + type + "&guid=" + guid });
                break;

            case "gccollab_doc":
                mainView.router.loadPage({ url: 'doc.html?guid=' + guid });
                $("#doc-title").text(title);
                break;
                
            case "gccollab_group":
                mainView.router.loadPage({ url: 'group.html?guid=' + guid });
                break;
            case "group":
                mainView.router.loadPage({ url: 'group.html?guid=' + guid });
                break;

            case "gccollab_profile":
                mainView.router.loadPage({ url: 'profile.html?guid=' + guid });
                break;

            case "gccollab_opportunity":
                mainView.router.loadPage({ url: 'entity.html?type=' + type + "&guid=" + guid });
                break;

            case "gccollab_event":
                mainView.router.loadPage({ url: 'entity.html?type=' + type + "&guid=" + guid });
                break;

            case "gccollab_wire_post":
                mainView.router.loadPage({ url: 'entity.html?type=' + type + "&guid=" + guid });
                break;

            case "gccollab_bookmark":
                mainView.router.loadPage({ url: 'entity.html?type=' + type + "&guid=" + guid });
                break;

            default:
                break;
        }
    },
    NewBlogPost: function(){
        console.log("new blog post");

        myApp.prompt(GCTLang.Trans("new-post-info"), GCTLang.Trans("new-blog-post"), function (value) {
            console.log("new blog post: '" + value + "'");
        });
    },
    NewMessage: function(obj){
        var guid = $(obj).data("guid");
        var name = $(obj).data("name");
        var subject = "Message to " + name;

        myApp.prompt(GCTLang.Trans("new-message-info") + name, GCTLang.Trans("message"), function (value) {
            $$.ajax({
                api_key: api_key_gccollab,
                method: 'POST',
                dataType: 'text',
                url: GCT.GCcollabURL,
                data: { method: "send.message", user: GCTUser.Email(), touser: guid, subject: subject, message: value, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
                timeout: 12000,
                success: function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    myApp.alert(data.result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                }
            });
        });
    },
    ReplyMessage: function(obj){
        var guid = $(obj).data("guid");
        var message = $("#reply-message").val();

        if( message == "" ) return;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "reply.message", user: GCTUser.Email(), message: message, guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ReadMessage: function(guid, successCallback, errorCallback){
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "read.message", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },

    PostWirePost: function(){
        myApp.modal({
            title: GCTLang.Trans("new-wire-post"),
            text: GCTLang.Trans("new-post-info"),
            afterText:  '<textarea id="wire-post-textarea"></textarea>',
            buttons: [
                {
                    text: GCTLang.Trans("cancel")
                },
                {
                    text: GCTLang.Trans("ok"),
                    bold: true,
                    onClick: function () {
                        var message = $("#wire-post-textarea").val();
                        if( message != ""){
                            GCTUser.PostWire(message, function(data){
                                console.log(data);
                                myApp.alert(data.result);
                                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
                            }, function(jqXHR, textStatus, errorThrown){
                                    console.log(jqXHR, textStatus, errorThrown);
                            });
                        }
                    }
                },
            ]
        });
    },
    PostWire: function (message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "post.wire", user: GCTUser.Email(), message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ReplyWirePost: function(obj){
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");

        myApp.prompt(GCTLang.Trans("new-post-info"), GCTLang.Trans("reply-wire-post"), function (value) {
            var message = $(".modal .input-field input[type=text]").val();
            GCTUser.ReplyWire(guid, message, function(data){
                console.log(data);
                myApp.alert(data.result);
                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        });
    },
    ReplyWire: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "reply.wire", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    EditWirePost: function (obj) {
        var guid = $(obj).data("guid");
        $(".popover").remove();

        myApp.modal({
            title: GCTLang.Trans("new-wire-post"),
            text: GCTLang.Trans("new-post-info"),
            afterText:  '<textarea id="wire-post-textarea">' + $("#wire-" + guid).text() + '</textarea>',
            buttons: [
                {
                    text: GCTLang.Trans("cancel")
                },
                {
                    text: GCTLang.Trans("ok"),
                    bold: true,
                    onClick: function () {
                        var message = $("#wire-post-textarea").val();
                        if( message != ""){
                            GCTUser.EditWire(guid, message, function(data){
                                console.log(data);
                                myApp.alert(data.result);
                                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
                            }, function(jqXHR, textStatus, errorThrown){
                                    console.log(jqXHR, textStatus, errorThrown);
                            });
                        }
                    }
                },
            ]
        });
    },
    EditWire: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "edit.wire", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    LikePost: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "like.item", user: encodeURI(GCTUser.Email()), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
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

                if( !liked && $(obj).hasClass('liked') ){
                    $(obj).removeClass('liked');
                } else if( liked ){
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
    Report: function (obj) {
        var guid = $(obj).data("guid");
        $(".popover").remove();
        
        myApp.confirm(GCTLang.Trans("reportpost"),
            function (value) {
                $$.ajax({
                    api_key: api_key_gccollab,
                    method: 'POST',
                    dataType: 'text',
                    url: GCT.GCcollabURL,
                    data: { method: "report.post", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
                    timeout: 12000,
                    success: function (data) {
                        data = JSON.parse(data);
                        myApp.alert(GCTLang.Trans("reported"));
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                       console.log(jqXHR, textStatus, errorThrown);
                    }
                });
            },
            function (value) { }
        );
    },
    
    Share: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");
        $(".popover").remove();

        myApp.prompt('Share this post with others:', 'Share', function (value) {

            GCTUser.ShareWire(guid, value, function(data){
                console.log(data);
                myApp.alert(data.result);
                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        });

            myApp.pullToRefreshTrigger(".pull-to-refresh-content");
    },

    ShareWire: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "share.post", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    Delete: function (obj) {
        var guid = $(obj).data("guid");
        $(".popover").remove();
        
        myApp.confirm(GCTLang.Trans("deletepost"),
            function (value) {
                $$.ajax({
                    api_key: api_key_gccollab,
                    method: 'POST',
                    dataType: 'text',
                    url: GCT.GCcollabURL,
                    data: { method: "delete.post", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
                    timeout: 12000,
                    success: function (data) {
                        data = JSON.parse(data);
                        myApp.alert(GCTLang.Trans("deleted"));
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                       console.log(jqXHR, textStatus, errorThrown);
                    }
                });
                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
            },
            function (value) { }
        );
    },
    MoreOptions: function (obj) {
        var owner = $(obj).data("owner");
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");

        var mine = (owner == GCTUser.Guid());
        var popoverHTML = '<div class="popover more-options-choices">'
            + '<div class="popover-inner">'
                + '<div class="list-block">'
                    + '<ul>'
                        + '<li><a href="#" class="item-link list-button" data-guid="' + guid + '" data-type="' + type + '" onclick="GCTUser.Share(this);">' + GCTLang.Trans("share") + '</a></li>'
                        + '<li><a href="#" class="item-link list-button" data-guid="' + guid + '" onclick="GCTUser.Report(this);">' + GCTLang.Trans("report") + '</a></li>';
                        if( mine ){
                            if( type == "gccollab_wire_post" ){ popoverHTML += '<li><a href="#" class="item-link list-button" data-guid="' + guid + '" onclick="GCTUser.EditWirePost(this);">' + GCTLang.Trans("edit") + '</a></li>'; }
                            if( type != "gccollab_opportunity" ){ popoverHTML += '<li><a href="#" class="item-link list-button" data-guid="' + guid + '" onclick="GCTUser.Delete(this);">' + GCTLang.Trans("delete") + '</a></li>';}
                        }
                    popoverHTML += '</ul>'
                + '</div>'
            + '</div>'
        + '</div>';

        myApp.popover(popoverHTML, obj);
    },
    BlockUser: function (obj) {
        var guid = $(obj).data("guid");

        myApp.confirm(GCTLang.Trans("blockuser") + "?",
            function (value) {
                $$.ajax({
                    api_key: api_key_gccollab,
                    method: 'POST',
                    dataType: 'text',
                    url: GCT.GCcollabURL,
                    data: { method: "block.user", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
                    timeout: 12000,
                    success: function (data) {
                        data = JSON.parse(data);
                        console.log("blocked");
                        Cookies.set("blocked", guid);
                        myApp.alert(GCTLang.Trans("blocked"));

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR, textStatus, errorThrown);
                    }
                });
            },
            function (value) { }
        );
    },
    GetBlog: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.blogpost", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBlogs: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.blogposts", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBlogsByUser: function (limit, offset, target, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.blogpostsbyowner", user: GCTUser.Email(), limit: limit, offset: offset, target: target, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    
    GetDiscussion: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.discussion", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    GetDiscussions: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.discussions", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetDoc: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.doc", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetDocs: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.docs", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEvent: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.event", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetEvents: function (from, to, limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;
        from = from || "";
        to = to || "";

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.events", user: GCTUser.Email(), from: from, to: to, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroup: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.group", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupActivity: function (guid, limit, offset, successCallback, errorCallback) {

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groupactivity", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang(), api_version: apiVersion },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupBlogs: function (guid, limit, offset, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groupblogs", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupDiscussions: function (guid, limit, offset, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groupdiscussions", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupDocs: function (guid, limit, offset, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groupdocs", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupEvents: function (guid, limit, offset, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groupevents", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupFiles: function (guid, limit, offset, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groupfiles", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupMembers: function (guid, limit, offset, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "group.members", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    JoinGroup: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "group.join", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
                $("#join-group").hide();
                $("#leave-group").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    LeaveGroup: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "group.leave", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
                $("#leave-group").hide();
                $("#join-group").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    InviteToGroup: function(obj){
        var user = $(obj).data("user");
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "group.invite", user: GCTUser.Email(), profileemail: user, guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    InviteMembersToGroup: function(users, group){
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "group.invitemembers", user: GCTUser.Email(), profileemail: users, guid: group, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    DeclineGroup: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "group.decline", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroups: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groups", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroupsMine: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;
        filters = $.extend({"mine": true}, filters);

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.groups", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    GetComments: function (guid, limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.commentsall", user: GCTUser.Email(), guid: guid, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SubmitComment: function (guid, message, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "submit.comment", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    GetBookmark: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmark", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBookmarks: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmarks", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBookmarksByUserColleague: function (limit, offset, filters, successCallback, errorCallback) {
        

        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmarkscolleague", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBookmarksByUser: function (limit, offset, target, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.bookmarksbyuser", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang(), target: target },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    GetMembers: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.members", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetMembersByUserColleague: function (profile, limit, offset, filters, successCallback, errorCallback) { 
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.memberscolleague", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    GetMessage: function (guid, thread, successCallback, errorCallback) {
        thread = thread || 0;
        
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.message", user: GCTUser.Email(), guid: guid, thread: thread, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetMessages: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.messages", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetNewsfeed: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.newsfeed", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetOpportunity: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.opportunity", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetOpportunities: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.opportunities", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWire: function (guid, thread, successCallback, errorCallback) {
        thread = thread || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.wirepost", user: GCTUser.Email(), guid: guid, thread: thread, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWires: function (limit, offset, filters, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.wireposts", user: GCTUser.Email(), limit: limit, offset: offset, filters: JSON.stringify(filters), api_key: GCTUser.APIKey(), context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWiresByUserColleague: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.wirepostsbycolleagues", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWiresByUser: function (profile, limit, offset, successCallback, errorCallback) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.wirepostsbyuser", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetSentMessages: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.sentmessages", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetNotifications: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.notifications", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetColleagueRequests: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "get.colleaguerequests", user: GCTUser.Email(), limit: limit, offset: offset, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    AddColleague: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "add.colleague", user: GCTUser.Email(), profileemail: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    RemoveColleague: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "remove.colleague", user: GCTUser.Email(), profileemail: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ApproveColleague: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "approve.colleague", user: GCTUser.Email(), profileemail: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
                ShowColleagueRequests();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    DeclineColleague: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "decline.colleague", user: GCTUser.Email(), profileemail: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
                ShowColleagueRequests();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    RevokeColleague: function(obj){
        var guid = $(obj).data("guid");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "revoke.colleague", user: GCTUser.Email(), profileemail: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                myApp.alert(data.result);
                ShowColleagueRequests();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetLikes: function (guid, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "like.count", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetLikeUsers: function(obj){
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");

        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "like.users", user: GCTUser.Email(), guid: guid, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                
                var likeData = data.result;

                var content = "";
                $.each(likeData.users, function (key, value) {
                    content += GCTLang.txtLikes({
                        icon: value.iconURL,
                        name: value.displayName,
                        date: prettyDate(value.time_created),
                        owner: value.user_id
                    });
                });

                $('.popup-generic .popup-title').html(GCTLang.Trans("likes-header"));
                $('.popup-generic .popup-content').html(content);
                myApp.popup('.popup-generic');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GEDSSearch: function (data, successCallback, errorCallback) {
        $$.ajax({
            api_key: api_key_gccollab,
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            data: '{"requestID": "S01", "requestSettings": {"searchValue" : "' + data + '"},"authorizationID":"XXXXXXXX"}',
            url: GCT.GEDSURL,
            timeout: 40000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ApplyPost: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");
        $(".popover").remove();

        myApp.prompt('Message to opportunity creator', 'Apply', function (value) {

            GCTUser.ApplyOpt(guid, value, function(data){
                console.log(data);
                myApp.alert(data.result);
                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        });

            myApp.pullToRefreshTrigger(".pull-to-refresh-content");
    },

    ApplyOpt: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "apply.post", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    WithdrawPost: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");
        $(".popover").remove();

        myApp.prompt('Reason to withdraw', 'Withdraw', function (value) {

            GCTUser.WithdrawOpt(guid, value, function(data){
                console.log(data);
                myApp.alert(data.result);
                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        });

            myApp.pullToRefreshTrigger(".pull-to-refresh-content");
    },

    WithdrawOpt: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "withdraw.post", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },

    AcceptPost: function (obj) {
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");
        $(".popover").remove();

        myApp.confirm('Accept', function (value) {

            GCTUser.AcceptOpt(guid, value, function(data){
                console.log(data);
                myApp.alert(data.result);
                myApp.pullToRefreshTrigger(".pull-to-refresh-content");
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        });

            myApp.pullToRefreshTrigger(".pull-to-refresh-content");
    },

    AcceptOpt: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            api_key: api_key_gccollab,
            method: 'POST',
            dataType: 'text',
            url: GCT.GCcollabURL,
            data: { method: "accept.post", user: GCTUser.Email(), guid: guid, message: message, api_key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context(), lang: GCTLang.Lang() },
            timeout: 12000,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
}



/* GCTEach - handles the different content cards. For 'each(type' sends each value to the corrisponding GCTEach function, and it handles the variables to send to 'GCTLang.txtType' and returns the result */
GCTEach = {
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
            extra = urlify(value.object.wire);
        }

        var content = GCTLang.txtActivity({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            description: description,
            type: type,
            showMore: showMore,
            extra: extra
        });
        return content;
    },
    Newsfeed: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");

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

        var more = "";
        if (value.object.type == "wire") {
            more = "";
        } else if (value.object.type == "user") {
            more = "<a onclick='GCT.FireLink(this)' href='" + value.object.profileURL + "'>" + value.object.displayName + "</a>";
        } else if (value.description == "river:update:user:default") {
            more = "";
        } else {
            more = "<a onclick='GCT.FireLink(this)' href='" + value.object.url + "'>" + value.object.name + "</a>";
        }

        var text = "";
        if (value.object.type == "wire") {
            text = "<blockquote>" + urlify(value.object.wire) + "</blockquote>";
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
        
        var content = GCTLang.txtNewsfeed({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            date: prettyDate(value.time_posted),
            more: more,
            description: description,
            text: text,
            source: source,
            action: action,
            reply: reply,
            owner: value.subject_guid,
            guid: value.object_guid,
            type: "gccollab_newfeed_post",
            liked: liked,
            likes: likes
        });
        return content;
    },
    Member: function (value) {
        var description = (value.about) ? urlify(value.about) : GCTLang.Trans('no-profile');
        var content = GCTLang.txtMember({
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
    Wire: function (value) {
        //var imgs = [];
        if (Cookies.get("blocked") == value.userDetails.displayName)
            return;
        // Removes HTML components from Wire
        var text = urlify(value.description);

        var source = "";
        if (value.shareText && value.shareURL) {
            source = "<blockquote>" + GCTLang.Trans("source") + " <a onclick='GCT.FireLink(this);' data-type='gccollab_wire_post' href='" + value.shareURL + "'>" + value.shareText + "</a></blockquote>";
        }

        var img = '';
        if (value.attachment) {
            img = "<img class='WireImage' onclick='ShowImage(this)' id='image-" + value.guid + "' src='https://gccollab.ca/thewire_image/download/" + value.attachment.guid + "' style='' />";
            //imgs.push(value.guid);
        }

        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        // var action = (value.thread) ? "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>" : "";

        var content = GCTLang.txtWire({
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
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_blog_post' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTLang.txtBlog({
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
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTLang.txtGroup({
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
    Event: function (value) {
        var text = (value.description !== null) ? $($.parseHTML(value.description)).text() : "";

        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_event' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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

        var content = GCTLang.txtEvent({
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
    Opportunity: function (value) {
        // Removes HTML components from Blog
        var text = (value.description !== null) ? value.description : "";

        var replied = (value.replied) ? "replied" : "";
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_opportunity' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

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
        if(value.apply) { apply = value.apply};
        
        var content = GCTLang.txtOpps({
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
    Doc: function (value) {
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");
        var action = "<a class='link' data-title='" + value.title + "' data-guid='" + value.guid + "' data-type='gccollab_doc' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";

        var content = GCTLang.txtDoc({
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
        var action = "<a class='link' data-guid='" + value.guid + "' data-type='gccollab_bookmark' onclick='GCTUser.ViewPost(this);'>" + GCTLang.Trans("view") + "</a>";
        var posted = '';
        if (value.group_guid) {
            posted = GCTLang.Trans("posted-group") + "<a class='link' data-guid='" + value.group_guid + "' data-type='gccollab_group' onclick='GCTUser.ViewPost(this);'>" + value.group + "</a>";
        } else {
            posted = GCTLang.Trans("posted-user") + " <a onclick='ShowProfile(" + value.owner_guid + ")' >" + value.userDetails.displayName + "</a>";
        }
        var address = "<a class='external' data-type='gccollab_bookmark' href='" + value.address + "'>" + value.address + "</a> ";
        var content = GCTLang.txtBookmark({
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
    Comment: function (value) {
        console.log(value);
        var liked = (value.liked) ? "liked" : "";
        var likes = (value.likes > 0) ? value.likes + (value.likes == 1 ? GCTLang.Trans("like") : GCTLang.Trans("likes")) : GCTLang.Trans("like");

        var content = GCTLang.txtComment({
            icon: value.userDetails.iconURL,
            name: value.userDetails.displayName,
            owner: value.owner_guid,
            date: prettyDate(value.time_created),
            description: value.description,
            type: value.subtype,
            guid: value.guid,
            liked: liked,
            likes: likes
        });
        return content;
    }
}

// Exemple of link : https://exemple.ca/services/api/rest/json/?
GCT = {
    GCcollabURL: "https://gccollab.ca/services/api/rest/json",
    GEDSURL: "https://api.geds.gc.ca",
    IsInApp: function () {
        if (window.location.href.toLowerCase().indexOf("http") > -1) {
            return false;
        }
    },

    /**  FireLink : Handles URLs/Pages
     Each 'if' handles different pages that have been setup. 
     Last 'else if' handles any unimplemented gccollab pages, to be handled by 'external-pages.html'.

     New Pages: Add a new 'else if' before the last one to handle those urls.
    **/
    FireLink: function (obj) {
        console.log(obj);
        if (obj.href.indexOf("/blog/view/") > -1) {
            console.log('loading blog page...');
            lnk = obj.href.substr((obj.href.indexOf("/view/") + 6));
            lnk = lnk.substr(0, lnk.indexOf("/"));
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

        
        } else if (obj.href.indexOf("https://gccollab.ca/") > -1) {
            console.log('loading collab page...');
            mainView.router.loadPage('external-pages.html?page=' + obj.href);

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
            mainView.router.loadPage('external-pages.html?page=' + obj.href);
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

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
};

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
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

function urlify(text, context) {
    
    context = context || false;
    
    var urlRegex = /(https:\/\/gccollab.ca\/thewire\/owner\/)(.*?)(?:"|\\|>|$)/g
    
    while (match = urlRegex.exec(text)) {
        text = text.replace(match[1] + match[2], "javascript:ShowProfile('" + match[2] + "');");
    }

    urlRegex = /(https:\/\/gccollab.ca\/thewire\/view\/)(.*?)(?:"|\\|>|$)/g

    while (match = urlRegex.exec(text)) {
        text = text.replace(match[1] + match[2], "javascript:GCTUser.ViewPost(" + match[2] + ",\"gccollab_wire_post\");");
    }

    return text;

    // Removed 'external' class from onclick events
    //
    // urlRegex = /<a /g;
    // return text.replace(urlRegex, function(url) {
    //     return '<a class="external" ';
    // });
}