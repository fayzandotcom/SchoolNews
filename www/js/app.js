/*
    All app main code here
 */

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// register onResume event
document.addEventListener("resume", onResume, false);

// register onPause event
document.addEventListener("pause", onPause, false);

// device APIs are available
function onDeviceReady() {
    console.log("onDeviceReady");

    // initialize push notification
    initPush();
}

// app is resume
function onResume() {
    console.log("onResume");
}

// app is pause
function onPause() {
    console.log("onPause");
}

// when news feeds page is shown
$(document).on('pageshow', '#news-feeds', function(){

    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    loadPosts();

});

// when notification page is shown
$(document).on('pageshow', '#notifications', function(){

    displayNotifications();

});

// display notifications
function displayNotifications() {
    // check if there is any notification
    if (window.localStorage.getItem(LOCAL_STORAGE_KEY_PUSH_NOTIFICATIONS) === null) {
        // no notification found...
        console.log("No notification");
    } else {

        // get push notifications
        var notifications = window.localStorage.getItem(LOCAL_STORAGE_KEY_PUSH_NOTIFICATIONS);
        console.log("Push Notification list: " + notifications);

        var notificationArray = notifications.split(PUSH_NOTIFICATIONS_DELIMITER);

        var html = "";
        console.log(notificationArray.length);
        for (var i = 0; i <= notificationArray.length; i++) {
            var json = JSON.parse(notificationArray[i]);
            if (json === null) break;
            var title = json.title;
            var message = json.message;
            var additionalData = json.additionalData;
            var datetime = additionalData.datetime;
            console.log("Notification: title["+title+"], datetime["+datetime+"], message["+message+"]");

            // format datetime
            var date = new Date(datetime);
            var finalDateTime = formatDateTime(date);

            // compose html to display
            html = html + '<div class="nd2-card">' +
                '<div class="card-title has-supporting-text">' +
                    '<h3 class="card-primary-title">'+title+'</h3>' +
                    '<h5 class="card-subtitle">'+finalDateTime+'</h5>' +
                '</div>' +
                '<div class="card-supporting-text has-title" id="notification-message">'+message+'</div>' +
                '</div>';
        }

        $("#notification-content").html(html);

    }
}

// display posts from wordpress
function loadPosts() {

    // query wordpress RESTful api
    $.ajax({
        type: "GET",
        url: "http://192.185.148.110/~his/wp-site/?json=1",
        cache: false,
        dataType: "jsonp",
        success: onSuccess,
        fail: onFail
    });

    function onSuccess(data) {
        console.log("post data:");
        console.log(data);

        var html = "";
        // parse json data
        var postArray = data.posts;
        for (var i=0; i < postArray.length; i++) {
            var title = postArray[i].title;
            var content = postArray[i].content;
            var datetime = postArray[i].modified;
            console.log("Post: title["+title+"], datetime["+datetime+"], content["+content+"]");
            html = html + '<div class="nd2-card">' +
                                '<div class="card-title has-supporting-text">' +
                                    '<h3 class="card-primary-title">'+title+'</h3>' +
                                '</div>' +
                                '<div class="card-supporting-text has-title">' + content + '</div>' +
                            '</div>';
        }

        $("#news-feeds-content").html(html);
    }

    function onFail(err) {
        console.error("Error occurred while querying posts");
        console.log(err);
    }

}