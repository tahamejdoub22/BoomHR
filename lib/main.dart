


import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/Loginpage.dart';
import 'package:flutter_application_1/salarynet.dart';
import 'package:flutter_application_1/validateRequest.dart';
import 'ForgetPassword.dart';
import 'History.dart';
import 'Navigation_buttom.dart';
import 'NewPassword.dart';
import 'Profile.dart';
import 'Request.dart';
import 'Validate.dart';
import 'errorpage.dart';
import 'firebase_options.dart';
import 'notif_service.dart';


Future<void> main() async {

  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  String? fcmToken = await FirebaseMessaging.instance.getToken();
  FirebaseMessaging.onMessage.listen((message) {
    print('Got a message whilst in the foreground!');

    if (message.notification != null) {
   print("here");
    }
  });
  print('FCM Token: $fcmToken');
   //NotificationService notificationService = NotificationService();
   //await notificationService.initNotification();

  FirebaseMessaging.instance
      .getInitialMessage()
      .then((RemoteMessage? message) {
    // Handle initial message if any
  });

  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    // Handle incoming messages in the foreground
  });

  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
    // Handle when the app is opened from a background state
  });



// Send a test notification


  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  final String _baseUrl = "localhost:8081";

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    return Container(
      width: 300, // set the width to 300
      height: 400, // set the height to 400
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'BoomHR',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        routes: {
          "/": (context) {
            return LoginPage();
          },
          "/ForgetPassword": (context) {
            return const ForgetPassword();
          },
          "/ForgetPassword": (context) {
            return const ForgetPassword();
          },
          "/Validate": (context) {
            return const Validate();
          },
          "/NewPassword": (context) {
            return const NewPassword();
          },
          "/navigation": (context) {
            return const NavigationBottom();
          },
          "/ValidateRequest": (context) {
            return ValidateRequest();
          },
          "/Request": (context) {
            return CalendarPage();
          },
          "/Profile": (context) {
            return Profile();
          },
          "/History": (context) {
            return History();
          },
          "/salary": (context) {
            return NetSalaryListScreen();
          },
        },
        onUnknownRoute: (settings) {
          return MaterialPageRoute(
            builder: (context) => ErrorPage(message: "Page not found"),
          );
        },
      ),
    );
  }
}
