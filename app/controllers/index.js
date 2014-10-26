var fb = null;

if (OS_ANDROID) {
	var fbModule = require('com.ti.facebook');
	fb = fbModule.createActivityWorker({lifecycleContainer: $.win});
}
if (OS_IOS) {
	fb = require('com.facebook');
}

fb.permissions = ['public_profile', 'email', 'user_friends'];
// now set up listeners
fb.addEventListener('login', function(e) {
    if(e.success) {
    	alert("Success!");
        // do your thang.... 
    } else if (e.cancelled) {
    	alert("Cancelled");
        // login was cancelled, just show your login UI again
    } else if (e.error) {
    	alert("Error");
/*        if (Ti.Platform.name === 'iPhone OS') {
            var loginAlert = Ti.UI.createAlertDialog({title: 'Login Error'});
            if (e.error.indexOf('OTHER:') !== 0){
                // guaranteed a string suitable for display to user
                loginAlert.message = e.error;
            } else {
                //alert('Please check your network connection and try again.');
                // after "OTHER:" there may be useful error data, not suitable for user display
                loginAlert.message = 'Please check your network connection and try again';
            }
        } else {
            loginAlert.message = e.error;
        }*/
    } else {
    	alert("Check your network");
        // if not success, nor cancelled, nor error message then pop a generic message
        // e.g. "Check your network, etc" . This is per Facebook's instructions
    }
});

fb.addEventListener('logout', function(e) { alert("logout"); });

fb.initialize(); // the module will do nothing prior to this. This enabled you to set up listeners anywhere in the app  

fb.logout();
if (!fb.loggedIn) {
    // you want to show your login UI in this case
    // if the user is loggedIn, just wait for the login event
    // when you want the user to login, call fb.authorize()
}

$.myLoginButton.addEventListener('click', function(e) {
    fb.authorize(); // this will show the Facebook login UI
});

$.win.open();
