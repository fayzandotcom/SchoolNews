/*
    All push notification related code comes here...
 */
function initPush() {

    // initialize push notification object
    var push = PushNotification.init({
        "android": {
            "senderID": GCM_SENDER_ID
        },
        "ios": {"alert": "true", "badge": "true", "sound": "true"},
        "windows": {}
    });

    // check if device id already saved/registered
    if (window.localStorage.getItem(LOCAL_STORAGE_KEY_DEVICE_ID) === null) {

        console.log("Registering device id...");

        // register event handler for device registration
        push.on('registration', function (data) {

            console.log("Device ID: " + data.registrationId)

            // store device id locally
            window.localStorage.setItem(LOCAL_STORAGE_KEY_DEVICE_ID, data.registrationId);

            // register device with AWS SNS
            registerDeviceIdAws(data.registrationId, USER_ID);

        });

    } else {
        console.log("Device id already registered...");
    }

    // register event handler for notification message received
    push.on('notification', function(data) {

        var jsonStr = JSON.stringify(data);
        console.log("Push message received: " + jsonStr);

        var notifications = window.localStorage.getItem(LOCAL_STORAGE_KEY_PUSH_NOTIFICATIONS);
        notifications = jsonStr + PUSH_NOTIFICATIONS_DELIMITER + notifications;

        window.localStorage.setItem(LOCAL_STORAGE_KEY_PUSH_NOTIFICATIONS, notifications);

        // navigate to notifications page
        $.mobile.pageContainer.pagecontainer('change', '#notifications', {
            transition: 'flip',
            changeHash: false,
            reverse: true,
            showLoadMsg: true
        });

        displayNotifications();

    });

    // register event handler for push notification error
    push.on('error', function(err) {
        console.error("Error occurred upon recieving push notification. Error: " + err.stack);
    });

    /* // Join BBM Meeting when user has clicked on the notification
     cordova.plugins.notification.local.on("click", function (notification) {
         if (notification.id == 1) {
             console.log(notification);
         }
     });*/

}

/*
    Register device id with AWS SNS
 */
function registerDeviceIdAws(deviceId, userId) {

    // init AWS SDK
    AWS.config.update({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY});
    AWS.config.region = AWS_REGION;
    var sns = new AWS.SNS();

    // register device id to AWS SNS
    var params = {
        PlatformApplicationArn: AWS_APPLICATION_ARN,
        Token: deviceId,
        Attributes: {
            //someKey: 'STRING_VALUE',
            /* anotherKey: ... */
        },
        CustomUserData: userId
    };
    sns.createPlatformEndpoint(params, function(err, data) {
        if (err) {	// an error occurred
            console.error("Unable to register device at AWS SNS. Error: " + err.stack);
        } else {	// successful response
            console.log("Device Registered successfully");
            console.log("Registered EndpointArn: " + data.EndpointArn);

            // store endpoint arn locally
            window.localStorage.setItem(LOCAL_STORAGE_KEY_AWS_ENDPOINT_ARN, data.EndpointArn);

            // now subscribe the device to a topic
            var params = {
                Protocol: 'Application',
                TopicArn: AWS_TOPIC_ARN,
                Endpoint: data.EndpointArn
            };
            sns.subscribe(params, function(err, data) {
                if (err) {
                    console.error("Unable to to subscribe with the topic. Error: " + err.stack); // an error occurred
                } else {
                    console.log("Successfully subscribe with the topic");           // successful response
                }
            });
        }
    });

}