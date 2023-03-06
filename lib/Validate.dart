import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Validate extends StatefulWidget {
  const Validate({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_ValidateState();

}
class _ValidateState extends State<Validate>
{
  late String? _code;

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();

  final String _baseUrl = "172.16.1.161:9091";

  @override
  Widget build(BuildContext context) {
    final String? email = ModalRoute.of(context)?.settings.arguments as String?;
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
                          Navigator.pushReplacementNamed(context, "/ForgetPassword");
                        },
                      ),
                      Text("   Validate with email",
                          style: TextStyle(fontSize: 30,fontWeight: FontWeight.bold))
                    ],
                  )
              ),
              Container(
                  width: double.infinity,
                  margin: const EdgeInsets.fromLTRB(40, 20, 20, 10),
                  child: const Text("Code has ben send in your email",
                      style: TextStyle(fontSize: 15,color: Colors.grey))
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(10, 50, 10, 80),
                child: TextFormField(
                    decoration: const InputDecoration(
                        border:  OutlineInputBorder(),),
                    onSaved: (String? value) {
                      _code = value;
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
                  margin: const EdgeInsets.fromLTRB(10, 20, 10, 0),
                  child: ElevatedButton(
                    child: const Text("Verify"),
                    onPressed: () {
                      if(_keyForm.currentState!.validate()){
                        _keyForm.currentState!.save();
                        Map<String, dynamic> employeeData = {
                          "email": email,
                          "resetCode": _code
                        };
                        Map<String, String> headers = {
                          "Content-Type": "application/json; charset=UTF-8"
                        };
                        http.post(Uri.http(_baseUrl, "/employee/test"), body: json.encode(employeeData), headers: headers)
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
                            Navigator.pushNamed(context, "/NewPassword",arguments: email);
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
            ],
          ),
        )
    );
  }


}
