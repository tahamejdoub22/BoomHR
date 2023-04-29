import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:http/http.dart' as http;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String dropdownValue = 'English';
  String? _email = 'oussama.sebai@esprit.tn';
  String? _password = '0000';
  bool _isChecked = false;

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  String _errorMessage = '';

  Future<void> _login() async {
    Random random = Random();
    Color color = Color.fromARGB(
      255,
      random.nextInt(256),
      random.nextInt(256),
      random.nextInt(256),
    );
    String colorToHex(Color color) {
      return '#${color.value.toRadixString(16).substring(2)}';
    }

    if (Platform.isAndroid) {
      final response = await http.post(
        Uri.parse('http://10.0.2.2:8080/employee/Login'),
        body: jsonEncode(<String, String>{
          'email': usernameController.text,
          'password': passwordController.text,
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
          prefs.setString('userId', employeeId);
          prefs.setString('nom', nom);
          prefs.setString('prenom', prenom);
          prefs.setString('avatar', responseData['avatar']);
          prefs.setString('address', responseData['address']);
          prefs.setString('city', responseData['city']);
          prefs.setString('country', responseData['country']);
          prefs.setString('hire_date', responseData['hire_date']);
          prefs.setInt('vacation', responseData['vacation']);
          prefs.setInt('sick', responseData['sick']);
          prefs.setString('job_title', responseData['job_title']);

          prefs.setString('color', colorToHex(color));
        }

        Navigator.pushReplacementNamed(context, "/navigation",
            arguments: responseData);
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
          'email': usernameController.text,
          'password': passwordController.text,
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
        showDialog(
            context: context,
            builder: (context) {
              return const AlertDialog(
                  title: Text("Information"),
                  content: Text("Logged successfully"));
            });
        Navigator.pushReplacementNamed(context, "navigation",
            arguments: responseData);
      } else if (response.statusCode == 401) {
        showDialog(
            context: context,
            builder: (context) {
              return const AlertDialog(
                  title: Text("Information"),
                  content: Text("Username et/ou mot de passe incorrect"));
            });
      } else {
        showDialog(
            context: context,
            builder: (context) {
              return const AlertDialog(
                  title: Text("Information"),
                  content: Text(
                      "Une erreur est survenu, veuillez réessayer une autre fois"));
            });
      }
    }
  }

  int buttonColor = 0xff26A9FF;

  bool inputTextNotNull = false;

  @override
  Widget build(BuildContext context) {
    double deviseWidth = MediaQuery.of(context).size.width;
    Random random = Random();
    Color color = Color.fromARGB(
      255,
      random.nextInt(256),
      random.nextInt(256),
      random.nextInt(256),
    );
    String colorToHex(Color color) {
      return '#${color.value.toRadixString(16).substring(2)}';
    }

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: MediaQuery.of(context).size.height - 90,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SizedBox(
                  height: 30,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      'assets/logo.png',
                      height: deviseWidth * .20,
                    ),
                    Text("BoomHR"),
                    SizedBox(
                      height: deviseWidth * .05,
                    ),
                    Container(
                      width: deviseWidth * .90,
                      height: deviseWidth * .14,
                      decoration: BoxDecoration(
                        color: Color(0xffE8E8E8),
                        borderRadius: BorderRadius.all(Radius.circular(5)),
                      ),
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: 15),
                        child: Center(
                          child: TextField(
                            onChanged: (text) {
                              setState(() {
                                if (usernameController.text.length >= 2 &&
                                    passwordController.text.length >= 2) {
                                  inputTextNotNull = true;
                                } else {
                                  inputTextNotNull = false;
                                }
                              });
                            },
                            controller: usernameController,
                            style: TextStyle(
                              fontSize: deviseWidth * .040,
                            ),
                            decoration: InputDecoration.collapsed(
                              hintText: 'Phone number, email or username',
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: deviseWidth * .04,
                    ),
                    Container(
                      width: deviseWidth * .90,
                      height: deviseWidth * .14,
                      decoration: BoxDecoration(
                        color: Color(0xffE8E8E8),
                        borderRadius: BorderRadius.all(Radius.circular(5)),
                      ),
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: 15),
                        child: Center(
                          child: TextField(
                            onChanged: (text) {
                              setState(() {
                                if (usernameController.text.length >= 2 &&
                                    passwordController.text.length >= 2) {
                                  inputTextNotNull = true;
                                } else {
                                  inputTextNotNull = false;
                                }
                              });
                            },
                            controller: passwordController,
                            obscureText: true,
                            style: TextStyle(
                              fontSize: deviseWidth * .04,
                            ),
                            decoration: InputDecoration.collapsed(
                              hintText: 'Password',
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: deviseWidth * .04,
                    ),
                    Container(
                      width: deviseWidth * .90,
                      height: deviseWidth * .14,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: inputTextNotNull
                              ? Color(buttonColor)
                              : Colors.grey,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5),
                          ),
                        ),
                        onPressed: () {
                          _login();
                        },
                        child: Text(
                          'Log In',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: deviseWidth * .040,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: deviseWidth * .05,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Forgot your login details?',
                          style: TextStyle(
                            fontSize: deviseWidth * .03,
                          ),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.pushNamed(context, "/ForgetPassword");
                          },
                          child: Text(
                            'Get help logging in.',
                            style: TextStyle(
                              fontSize: deviseWidth * .03,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: deviseWidth * .05,
                    ),
                  ],
                ),
                Container(
                  width: deviseWidth,
                  height: deviseWidth * .20,
                  child: Column(
                    children: [
                      Text(
                        'OR',
                        style: TextStyle(
                          fontSize: deviseWidth * .040,
                          color: Colors.grey,
                        ),
                      ),
                      SizedBox(
                        height: deviseWidth * .02,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            width: deviseWidth * .25,
                            height: deviseWidth * .10,
                            decoration: BoxDecoration(
                              color: Color(0xffE8E8E8),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                            ),
                            child: IconButton(
                              icon: Icon(Icons.facebook),
                              onPressed: () {},
                            ),
                          ),
                          SizedBox(
                            width: deviseWidth * .05,
                          ),
                          Container(
                            width: deviseWidth * .25,
                            height: deviseWidth * .10,
                            decoration: BoxDecoration(
                              color: Color(0xffE8E8E8),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                            ),
                            child: IconButton(
                              icon: Icon(Icons.phone),
                              onPressed: () {},
                            ),
                          ),
                          SizedBox(
                            width: deviseWidth * .05,
                          ),
                          Container(
                            width: deviseWidth * .25,
                            height: deviseWidth * .10,
                            decoration: BoxDecoration(
                              color: Color(0xffE8E8E8),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                            ),
                            child: IconButton(
                              icon: Icon(Icons.mail),
                              onPressed: () {},
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
