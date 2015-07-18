var actualContent;
var postArray; 
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu ul ul li:odd').addClass('odd');
$('#cssmenu ul ul li:even').addClass('even');
$('#cssmenu > ul > li > a').click(function() {
  $('#cssmenu li').removeClass('active');
  $(this).closest('li').addClass('active');	
  var checkElement = $(this).next();
  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    checkElement.slideUp('normal');
  }
  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
    $('#cssmenu ul ul:visible').slideUp('normal');
    checkElement.slideDown('normal');
  }
  if($(this).closest('li').find('ul').children().length == 0) {
    return true;
  } else {
    return false;	
  }		
});
});
} )( jQuery );

Parse.initialize("dZeSJi216NmOGHhuCwjwie3sQt4aEXoR3jchZuAu", "58NzXAiqgqklsydhe21T7LLLHly1nm9plKyKydMr");

$(window).ready(function() {
    $('#loading').hide();
});



// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
        var user = Parse.User.current();
	if (!Parse.FacebookUtils.isLinked(user)) {
	  Parse.FacebookUtils.link(user, null, {
	    success: function(user) {
	      alert("Woohoo, user logged in with Facebook!");
	    },
	    error: function(user, error) {
	      alert("User cancelled the Facebook login or did not fully authorize.");
	    }
	  });
	}
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function onLoginButtonClicked() {
      Parse.FacebookUtils.logIn("public_profile,email,user_groups,user_education_history,user_work_history,user_friends,friends_groups", {
	  success: function(user) {
	    if (!user.existed()) {
	      alert("User signed up and logged in through Facebook!");
	    } else {
	      alert("User logged in through Facebook!");
	    }
	    
	  },
	  error: function(user, error) {
	    alert("User cancelled the Facebook login or did not fully authorize.");
	  }
	});
  }

  window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '320286661453691',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
        callGroups();
    });
  }
function callGroups() {
  /* make the API call */
  console.log('you called the groups function.... '); 
  FB.api(
      "/AspirationsAward",
      function (response) {
        if (response && !response.error) {
          console.log(response.id); 
        }
        else {
          console.log(response); 
        }
      }
  );
  loadFirst("posts");
}

/*function grabPosts() {
	var postsHTML ="";
  console.log('you asked for the feed .... '); 
  FB.api(
    "/AspirationsAward/feed?limit=50",
    function (response) {
      if (response && !response.error) {
		for (var i = 0; i < response.data.length; i++) {
		    var data = response.data[i];
		    
		    postsHTML += "<tr><div class='fb-post' data-href='" + data.actions[0].link + "' data-width='500px'></div></tr>";
		    //postsHTML += "<tr><td> <img src='" + data.picture + "'/></td><td>";
		    //postsHTML += data.message + "</td></tr>"
		    //console.log(data.message);
		}
		$('#posts').append(postsHTML);
	}
      else {
        console.log(response); 
      }
    }
);
}*/

function getMembers() {
  console.log('retrieving members ... '); 
/* make the API call */
FB.api(
    "/AspirationsAward/members",
    function (response) {
      if (response && !response.error) {
        console.log(response); 
      }
      else {
        console.log(response); 
      }
    }
);
}

function loadFirst(table){
  actualContent = table;
  
  var postsHTML ="";
  console.log('you asked for the feed .... '); 
  FB.api(
    "/AspirationsAward/feed?limit=250",
    function (response) {
      if (response && !response.error) {
      		postArray = response.data; 
      		console.log(postArray.length); 
		for (var i = 0; i < response.data.length; i++) {
		    var data = response.data[i];
		    
		    /*postsHTML += "<tr>" +
		    			"<div class='fb-post' data-href='" + data.actions[0].link + "' data-width='500px'>" +
		    			"</div>" +
		    		"</tr>";*/
		    
		    postsHTML += "<tr id='allPosts"+ i + "'><td id='backgroundIMG'> <img id='postIMG' src='" + data.picture + "'/></td><td id='postMessage'>";
		    postsHTML += "<a class='profileLink' href='" + data.actions[0].link + "'>" + data.message + "</a></td></tr>"
		    
		    //console.log(data.message);
		}
		$('#' + table).append(postsHTML);
		$('#' + table).css("display", "table");
	}
      else {
        console.log(response); 
      }
    }
);
}

function loadContent(table) {
	$('#active').removeAttr('id');
	  $('.circle.' + table + 'Icon').attr('id', 'active');
	  $('#' + actualContent).css({"display": "none"});
	  actualContent = table;
	  switch(table) {
	  	case "posts":
	  		grabPosts();
	  		break;
	  	case "people":
	  		break;
	  	case "events":
	  		break;
	  	case "files":
	  		break;
	  	case "photos":
	  		break;
	  }
	  $('#' + table).css("display", "table");
}

function grabPeople(){
	
}

function grabInternshipPosts(){
		var postsHTML ="";
  console.log('you asked for the internship .... '); 
		for (var i = 0; i < postArray.length; i++) {
		    var data = postArray[i];
		    if ((typeof data.message) == "string") {
			    if ((data.message).indexOf("internships") = -1) {
			    	var rowToHide = "#allPosts" + i;
			    	$(rowToHide).hide();
			    	//console.log(data.message); 
				    //postsHTML += "<tr><div class='fb-post' data-href='" + data.actions[0].link + "' data-width='500px'></div></tr>";
				    //postsHTML += "<tr><td id='postIMG'> <img src='" + data.picture + "'/></td><td id='postMessage'>";
				    //postsHTML += "<a class='profileLink' style='text-decoration:none' href='" + data.actions[0].link + "'>" + data.message + " </a></td></tr>"
				    //console.log(data.message);
				}
				else
				{
					var rowToShow = "#allPosts" + i;
			    		$(rowToShow).show();	
				}
			}
		}
		//$('#posts').append(postsHTML);
	}


/*function loadContent(table) {
  $('#active').removeAttr('id');
  $('.circle.' + table + 'Icon').attr('id', 'active');
  $('#' + actualContent).css({"display": "none"});
  actualContent = table;
  var appendContent = "";
  for (var i = 0; i < 10; i++) {
    appendContent += "<tr>" +
                        "<td>" +
                          table +
                        "</td>" +
                        "<td>" +
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" + 
                        "</td>" +
                      "</tr>";
  }
  $('#' + table).append(appendContent);
  $('#' + table).css("display", "table");
}*/
