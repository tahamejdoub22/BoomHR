import 'dart:io';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/AttendanceScreen.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'notif_service.dart';

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
