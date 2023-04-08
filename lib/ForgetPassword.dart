import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ForgetPassword extends StatefulWidget {
  const ForgetPassword({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_ForgetPassword();

}
class _ForgetPassword extends State<ForgetPassword>
{

  String? _email = 'oussama.sebai@esprit.tn';

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();

  final String _baseUrl = "192.168.153.227:9091";

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
                    children:  [
                    IconButton(
                      icon: Icon(Icons.arrow_back),
                      onPressed: () {
                        Navigator.pushReplacementNamed(context, "/");
                      },
                    ),
                      Text("   Forget Password",
                          style: TextStyle(fontSize: 30,fontWeight: FontWeight.bold))
                    ],
                  )
              ),
              Container(
                  width: double.infinity,
                  margin: const EdgeInsets.fromLTRB(40, 40, 20, 10),
                  child: Image.asset("assets/images/forget1.png",width: 256,height: 256)
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
                  margin: const EdgeInsets.fromLTRB(10, 40, 10, 0),
                  child: ElevatedButton(
                    child: const Text("Continue"),
                    onPressed: () {
                      if(_keyForm.currentState!.validate()){
                        _keyForm.currentState!.save();
                        Map<String, dynamic> employeeData = {
                          "email": _email
                        };
                        Map<String, String> headers = {
                          "Content-Type": "application/json; charset=UTF-8"
                        };
                        http.post(Uri.http(_baseUrl, "/employee/forget"), body: json.encode(employeeData), headers: headers)
                            .then((http.Response response) {
                          if(response.statusCode == 200) {
                            showDialog(
                                context: context,
                                builder: (context) {
                                  return const AlertDialog(
                                      title: Text("Information"),
                                      content: Text("email validee")
                                  );
                                }
                            );
                            Navigator.pushNamed(context, "/Validate",arguments: _email);
                          } else if(response.statusCode == 500) {
                            showDialog(
                                context: context,
                                builder: (context) {
                                  return const AlertDialog(
                                      title: Text("Information"),
                                      content: Text("this account n'est existe pas")
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
