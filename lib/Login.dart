import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_LoginState();

}
class _LoginState extends State<Login>
{

   String? _email = 'oussama.sebai@esprit.tn';
   String? _password = '0000';
   bool _isChecked = false;

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();

  final String _baseUrl = "10.0.2.2:9091";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _keyForm,
        child:
        ListView(
        children: [
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(40, 40, 20, 10),
              child: const Text("Sign In",
              style: TextStyle(fontSize: 40,fontWeight: FontWeight.bold))
          ),
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(40, 20, 20, 10),
              child: const Text("Use your email to Login to your account",
                  style: TextStyle(fontSize: 15,color: Colors.grey))
          ),
           Container(
                 margin: const EdgeInsets.fromLTRB(10, 50, 10, 10),
                    child: TextFormField(
                     decoration: const InputDecoration(
                     border:  OutlineInputBorder(),
                       labelText: "Email",
                      prefixIcon: Icon(
                  Icons.email,
                  color: Colors.blue,
                )),
            onSaved: (String? value) {
              _email = value;
            },
            validator: (value) {
              if (value == null || value.isEmpty) {
                return "Please enter your email";
              }
              return null;
            }
          ),
        ),
          Container(
          margin: const EdgeInsets.fromLTRB(10, 40, 10, 10),
            child: TextFormField(
             obscureText: true,
             decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: "Password",
                prefixIcon: Icon(
                  Icons.key,
                  color: Colors.blue,
                )),
            onSaved: (String? value) {
              _password = value;
            },
            validator: (value) {
              if (value == null || value.isEmpty) {
                return "Please enter your password";
              }
              return null;
            },
          ),
        ),
          Container(
            margin: const EdgeInsets.fromLTRB(20, 20, 10, 10),
            child: Row(
              children: [
                const Text("Remember me"),
                Checkbox(
                  value: _isChecked,
                  onChanged: (bool? value) {
                    setState(() {
                      _isChecked = value!;
                    });
                  },
                  activeColor: Colors.blue,
                  checkColor: Colors.white,
                )

              ],
            ),
          ),
          Container(
              margin: const EdgeInsets.fromLTRB(10, 20, 10, 0),
              child: ElevatedButton(
                child: const Text("Sign In"),
                onPressed: () {
                  if(_keyForm.currentState!.validate()){
                     _keyForm.currentState!.save();
                        Map<String, dynamic> employeeData = {
                         "email": _email,
                          "password": _password
                        };
                         Map<String, String> headers = {
                         "Content-Type": "application/json; charset=UTF-8"
                         };
                        http.post(Uri.http(_baseUrl, "/employee/Login"), body: json.encode(employeeData), headers: headers)
                            .then((http.Response response) {
                        if(response.statusCode == 200) {
                          dynamic jsonData = json.decode(response.body);
                          List<dynamic> userData = [];

                          if (jsonData is List<dynamic>) {
                            userData = jsonData;
                          } else {
                            userData.add(jsonData);
                          }
                        showDialog(
                          context: context,
                  builder: (context) {
                       return const AlertDialog(
                            title: Text("Information"),
                            content: Text("Logged successfully")
                       );
                    }
                        );
                      Navigator.pushReplacementNamed(context, "/navigation",arguments: userData);
                   } else if(response.statusCode == 401) {
                     showDialog(
                     context: context,
                     builder: (context) {
                     return const AlertDialog(
                        title: Text("Information"),
                        content: Text("Username et/ou mot de passe incorrect")
                        );
                       }
                       );
                    } else {
                  showDialog(
                     context: context,
                     builder: (context) {
                       return const AlertDialog(
                           title: Text("Information"),
                             content: Text("Une erreur est survenu, veuillez réessayer une autre fois")
                     );
                    }
                   );
                   }
                   });
                   }
                },
              )
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
              GestureDetector(
                child: const Text("Mot de passe oublié ?",style: TextStyle(color: Colors.blue,fontWeight: FontWeight.bold))
              ,onTap: () {
                Navigator.pushNamed(context, "/ForgetPassword");
              },

              )
              ],
            ),
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(0, 180, 0, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Text("By signing in you agree to ",style: TextStyle(color: Colors.grey,fontWeight: FontWeight.bold))
              ],
            ),
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(0, 15, 0, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Text("Terms of service and privicy policy ",style: TextStyle(color: Colors.grey,fontWeight: FontWeight.bold))
              ],
            ),
          )
        ],
      ),
    )
    );
  }


}
