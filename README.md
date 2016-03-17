# SchoolNews

A cross-platform mobile app to send announcements/news to students and parents.

## Platform/Framework

This project is developed using following technologies

1. PhoneGap v5.4.1
2. jQuery Mobile v1.4.5
3. NativeDroid2 (material design theme)
4. Android SDK
5. Google Cloud Messaging
6. AWS Simple Notification Service
7. AWS SDK for JavaScript
8. WordPress
9. aws-sns-plugin (https://github.com/fayzandotcom/aws-sns-plugin)


## Description

A cross-platform mobile app developed to keep the students and parents updated with the latest new and announcements.

App is developed using PhoneGap and build using Android SDK. 
Google Cloud Messaging is used to send announcements as push notitifications to app. 
AWS Simple Notification Service is used as a 3rd party server to store Android device IDs and 
send push notification requests to GCM.
AWS SDK for JavaScript is used to store the device regestration id on AWS SNS.

WordPress is used to work as a backend for app. A plugin aws-sns-plugin (https://github.com/fayzandotcom/aws-sns-plugin) is developed 
to send push notifications to topics created on AWS SNS using AWS SDK for PHP. And a plugin "JSON API" is used to expose blog posts as json API.

NativeDroid2 with jQuery Mobile is used for material design theme of the app.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

Version: 1.0
* Initial release.

## License

GPLv2
http://www.gnu.org/licenses/gpl-2.0.html
