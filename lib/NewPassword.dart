import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class NewPassword extends StatefulWidget {
  const NewPassword({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_NewPassword();

}
class _NewPassword extends State<NewPassword>
{

  String? _email = 'oussama.sebai@esprit.tn';
  String? _password = '0000';

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
                  margin: const EdgeInsets.fromLTRB(20, 40, 20, 10),
                  child:Row(
                    children: [
                      Icon(Icons.arrow_back),
                      Text("   New Password",
                          style: TextStyle(fontSize: 30,fontWeight: FontWeight.bold))
                    ],
                  )
              ),
              Container(
                  width: double.infinity,
                  margin: const EdgeInsets.fromLTRB(40, 20, 80, 10),
                  child: Text("Can vreate a new password, please "
                      "don't forget it too",
                      style: TextStyle(fontSize: 15,color: Colors.grey))
              ),
              Container(
                  width: double.infinity,
                  margin: const EdgeInsets.fromLTRB(40, 40, 20, 10),
                  child: Image.asset("assets/images/forget2.png",width: 256,height: 256)
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(10, 50, 10, 10),
                child: TextFormField(
                    decoration: const InputDecoration(
                        border:  OutlineInputBorder(),
                        labelText: "New Password",
                        prefixIcon: const Icon(
                          Icons.key,
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
                margin: const EdgeInsets.fromLTRB(10, 20, 10, 10),
                child: TextFormField(
                    decoration: const InputDecoration(
                        border:  OutlineInputBorder(),
                        labelText: "Confirm Password",
                        prefixIcon: const Icon(
                          Icons.key,
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
                  margin: const EdgeInsets.fromLTRB(10, 40, 10, 0),
                  child: ElevatedButton(
                    child: const Text("Submit"),
                    onPressed: () {
                      Navigator.pushNamed(context, "/Validate");
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
                            showDialog(
                                context: context,
                                builder: (context) {
                                  return const AlertDialog(
                                      title: Text("Information"),
                                      content: Text("Logged successfully")
                                  );
                                }
                            );
                            // Navigator.pushReplacementNamed(context, "/homeTab");
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
              )
            ],
          ),
        )
    );
  }


}
