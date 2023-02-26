import 'package:boom_hr/ForgetPassword.dart';
import 'package:boom_hr/Validate.dart';
import 'package:flutter/material.dart';

import 'Login.dart';
import 'NewPassword.dart';

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
          return Login();
        },
        "/ForgetPassword":(context){
          return ForgetPassword();
        },
        "/Validate":(context){
          return Validate();
        },
        "/NewPassword":(context){
          return NewPassword();
        }
      },
    );
  }
}
