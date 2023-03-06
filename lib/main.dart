import 'package:boom_hr/ForgetPassword.dart';
import 'package:boom_hr/Home.dart';
import 'package:boom_hr/Validate.dart';
import 'package:boom_hr/validateRequest.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'Login.dart';
import 'Navigation_buttom.dart';
import 'NewPassword.dart';
import 'Request.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BoomHR',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: {
        "/":(context){
          return  Login();
        },
        "/ForgetPassword":(context){
          return const ForgetPassword();
        },
        "/Validate":(context){
          return const Validate();
        },
        "/NewPassword":(context){
          return const NewPassword();
        },
        "/navigation":(context){
          return const NavigationBottom();
        },
        "/ValidateRequest":(context){
          return  ValidateRequest();
        },
    "/Request":(context){
      return  CalendarPage();
        }
      },
    );
  }
}
