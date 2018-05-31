$$(document).on('page:init', '.page[data-name="sign-in-old"]', function (e) {
    alert('inside old page');
    $("#email, #password").keyup(function (event) {
        var email = $('#email').val();
        var password = $('#password').val();

        if (event.keyCode == 13) {
            if (email != "" && password != "" && email.length >= 3 && password.length >= 6) {
                GCTUser.Login(email, password, function (success) {
                    if (success.result == true) {
                        mainView.router.navigate('/list-template/home/');
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
                    mainView.router.navigate('/list-template/home/');
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

function ShowProfile(email) {
    if (typeof email == 'undefined')
        email = GCTUser.Email(); //### Get current users profile
    //If email, NaN, so get profile to get guid, else it is guid already, so just go to profile
    if (isNaN(email)) {
        GCTrequests.GetUserProfile(email, function (data) {
            var profileData = data.result;
            /* Temp ViewPost, replace with sheet modal of user profile eventaully */
            mainView.router.navigate('/profile-template/user/' + profileData.id + '/');
        }, function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        });
    } else {
        console.log('skip');
        mainView.router.navigate('/profile-template/user/' + email + '/');
    }
    
}