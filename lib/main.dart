import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_application_1/AttendanceScreen.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'notif_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  NotificationService().initNotification();

  Firebase.initializeApp();
  SharedPreferences prefs = await SharedPreferences.getInstance();
  runApp(MyApp(prefs: prefs));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key, required SharedPreferences prefs}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        '/attendance': (context) => const AttendanceScreen(),
      },
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  String _errorMessage = '';

  Future<void> _login() async {
    if (Platform.isAndroid) {
      final response = await http.post(
        Uri.parse('http://10.0.2.2:8080/employee/Login'),
        body: jsonEncode(<String, String>{
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      if (response.statusCode == 200) {
        // Login successful, save the ID in shared preferences
        final responseData = json.decode(response.body) as Map<String, dynamic>;
        final employeeId = responseData['_id'];
        final nom = responseData['nom'];
        final prenom = responseData['prenom'];

        if (employeeId != null) {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setString('_id', employeeId);
          prefs.setString('nom', nom);
          prefs.setString('prenom', prenom);
        }

        // Navigate to the next page
        Navigator.pushNamed(context, '/attendance');
      } else {
        // Login failed, display error message
        setState(() {
          _errorMessage = 'Invalid email or password';
        });
      }
    } else {
      final response = await http.post(
        Uri.parse('http://localhost:8080/employee/Login'),
        body: jsonEncode(<String, String>{
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      if (response.statusCode == 200) {
        // Login successful, save the ID in shared preferences
        final responseData = json.decode(response.body) as Map<String, dynamic>;
        final employeeId = responseData['_id'];
        final nom = responseData['nom'];
        final prenom = responseData['prenom'];

        if (employeeId != null) {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setString('_id', employeeId);
          prefs.setString('nom', nom);
          prefs.setString('prenom', prenom);
        }

        // Navigate to the next page
        Navigator.pushNamed(context, '/attendance');
      } else {
        // Login failed, display error message
        setState(() {
          _errorMessage = 'Invalid email or password';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login Page'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Email',
              ),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Password',
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _login,
              child: const Text('Login'),
            ),
            if (_errorMessage.isNotEmpty)
              Text(
                _errorMessage,
                style: const TextStyle(color: Colors.red),
              ),
          ],
        ),
      ),
    );
  }
}
