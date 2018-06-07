//Opens the application, checks cookies, sends to home or login.
function AppOpen() {
    if (GCTLang.IsLangSet()) {
        if (GCTUser.IsLoggedIn()) {
            GCTUser.SetUserProfile();
            mainView.router.navigate('/list-template/home/');
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
        $('#welcome').toggle();
    }
}

$$(document).on('page:init', '.page[data-name="sign-in-old"]', function (e) {
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
//AppOpen();
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

$$(document).on('page:init', '.page[data-name="post-wire"]', function (e) {
    $('#post-wire-navbar-inner').html(GCTtxt.txtGlobalNav('new-wire-post'));
    var imageURI = "";
    $$('#submit-post-wire').on('click', function (e) {
        var message = $("#post-wire-textarea").val();
        if (message) {
            GCTrequests.PostWire(message, imageURI, function (data) {
                console.log(data);
                app.dialog.alert(data.result, '', function () {
                    mainView.router.navigate('/list-template/wires/');
                });
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });
        } else {
            app.dialog.alert("Cannot post wire with no text.");
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
            app.dialog.alert('Missing navigator.camera plugin error. Sorry, restart app, if still doesnt work, probably my fault');
        }
    });

    $$('#camera-gallery').on('click', function (e) {
        if (typeof navigator !== 'undefined' && typeof navigator.camera !== 'undefined') {
            navigator.camera.getPicture(function onSuccess(imageData) {
                $("#picture-taken").attr('src', "data:image/jpeg;base64," + imageData);
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
            app.dialog.alert('Missing navigator.camera plugin error. Sorry, restart app, if still doesnt work, probably my fault');
        }
    });
})

$$(document).on('page:init', '.page[data-name="post-opp"]', function (e) {
    $('#post-opportunity-navbar-inner').html(GCTtxt.txtGlobalNav('new-opportunities-platform'));

    $$('.next-form1').on('click', function (e) {
        var formData = app.form.convertToData('#opt-form1');
        console.log(formData);
        var agree = formData['agree'];
        var message_validation = '';
        let arr = ['name', 'email'];
        arr.forEach((num, index) => {
            console.log(num);
            if (formData[num] === '') {
                message_validation += GCTLang.Trans("validation_" + num) + '<br>';
            }
        });

        if (agree.length === 0) {
            message_validation += GCTLang.Trans("validation_agree") + '<br>';
        }
        if (message_validation === '') {
            var selected = $$(this).attr('data-my-tab-id');
            app.tab.show(selected);
            formData['agree'] = 'YES';
            GCTrequests.CreateOpportinities1(formData, function (data) {
                var result = data.result;
                console.log(result);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });

        } else {
            app.dialog.alert(message_validation);
        }
    });

    $$('.next-form2').on('click', function (e) {

        var formData = app.form.convertToData('#opt-form2');
        var message_validation = '';
        let arr = ['title', 'offert', 'type', 'start_date', 'deadline'];
        arr.forEach((num, index) => {
            console.log(num);
            if (formData[num] === '') {
                message_validation += GCTLang.Trans("validation_" + num) + '<br>';
            }
        });
        if (message_validation === '') {
            var selected = $$(this).attr('data-my-tab-id');
            app.tab.show(selected);
            GCTrequests.CreateOpportinities2(formData, function (data) {
                var selected = $$(this).attr('tab2');
                mainView.router.navigate('tab2/');
                var result = data.result;
                console.log(result);
            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            });

        } else {
            app.dialog.alert(message_validation);
        }
    });

    $$('.next-form3').on('click', function (e) {
        var formData = app.form.convertToData('#opt-form3');
        var message_validation = '';
        let arr = ['hours', 'location'];
        arr.forEach((num, index) => {
            if (formData[num] === '') {
                message_validation += GCTLang.Trans("validation_" + num) + '<br>';
            }
        });
        if (message_validation === '') {
            if (formData['remotly'].lenght != 0) {
                formData['remotly'] = 'on';
            } else { formData['remotly'] == ''; }
            GCTrequests.CreateOpportinities3(formData, function (data) {
                var selected = $$(this).attr('tab2');
                mainView.router.navigate('tab2/');
                var result = data.result;
                console.log(result);
                app.dialog.alert(result, 'Congrat');

            }, function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                app.dialog.alert(textStatus, 'Error');
            });

        } else {
            app.dialog.alert(message_validation);
        }
    });

    $('#group').hide();
    $('#level').hide();
    $$("#type").change(function () {
        var type = $('#type').val();
        if (type == 'missions:casual' || type == 'missions:student') {
            $('#group').show();
            $('#level').show();
        } else {
            $('#group').hide();
            $('#level').hide();
        }
    });
})

$$('.panel-left').on('panel:open', function () {
    var focusTitle = document.getElementById('menu-panel');
    if (focusTitle) { focusTitle.focus(); }
});