import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/Loginpage.dart';
import 'package:flutter_application_1/salarynet.dart';
import 'package:flutter_application_1/validateRequest.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'ForgetPassword.dart';
import 'History.dart';
import 'Login.dart';
import 'Navigation_buttom.dart';
import 'NewPassword.dart';
import 'Profile.dart';
import 'Request.dart';
import 'Validate.dart';
import 'congee_info.dart';
import 'errorpage.dart';
import 'notif_service.dart';

void main() {
  runApp(const MyApp());
  WidgetsFlutterBinding.ensureInitialized();
  NotificationService().initNotification();
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  final String _baseUrl = "localhost:8080";

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300, // set the width to 300
      height: 400, // set the height to 400
      child: MaterialApp(
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
