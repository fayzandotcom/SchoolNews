/*
    All helper functions goes here...
 */

// set device state
function setDeviceState(state) {
    console.log("setDeviceState: " + state);
    window.localStorage.setItem(DEVICE_STATE, state);
}

// get device state
function getDeviceState() {
    var state = window.localStorage.getItem(DEVICE_STATE);
    console.log("getDeviceState: " + state);
    return state;
}

// Show Android local notification
function showAndroidLocalNotification(title, msg, datetime) {
    console.log("Showing android local notification. DateTime["+datetime+"], Title["+title+"], Msg["+msg+"]")
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: title,
        text: msg,
        data: { title: title, msg: msg, datetime: datetime }
    });
}

// Show an alert box
function showAlert(title, msg, buttonName, callback) {
    navigator.notification.alert(
        msg,  // message
        callback,         // callback
        title,            // title
        buttonName                  // buttonName
    );
}

// Show a confirmation dialog
function showConfirm(title, msg, buttonName1, buttonName2, callback) {
    navigator.notification.confirm(
        msg, // message
        callback,            // callback to invoke with index of button pressed
        title,           // title
        [buttonName1,buttonName2]         // buttonLabels
    );
}

// Show a prompt dialog
function showPrompt(title, msg, buttonName1, buttonName2, defaultText ,callback) {
    navigator.notification.prompt(
        msg,  // message
        callback,                  // callback to invoke
        title,            // title
        [buttonName1,buttonName2],             // buttonLabels
        defaultText                 // defaultText
    );
}

// Play beep 3 times
function playBeep() {
    navigator.notification.beep(3);
}

// Play beep
function playBeep(times) {
    navigator.notification.beep(times);
}

// Vibrate for 2 seconds
function vibrate() {
    navigator.notification.vibrate(2000);
}

// Vibrate
function vibrate(millisec) {
    navigator.notification.vibrate(millisec);
}

// format datetime
function formatDateTime(date) {

    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    year = year.toString().substr(2,2);
    var hour = (date.getHours()<10?'0':'') + date.getHours();
    var min = (date.getMinutes()<10?'0':'') + date.getMinutes();
    var finalDatetime = day + " " + monthNames[monthIndex] + " " + year + " " + hour + ":" + min;
    return finalDatetime;
}