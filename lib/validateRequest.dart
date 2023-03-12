import 'dart:async';
import 'dart:convert';

import 'package:boom_hr/Home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_calendar_carousel/flutter_calendar_carousel.dart' show CalendarCarousel;
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ValidateRequest extends StatefulWidget {

  @override
  _ValidateRequestState createState() => _ValidateRequestState();
}

class _ValidateRequestState extends State<ValidateRequest> {
  late DateTime _startDate;
  late DateTime _endDate;
  late String? _type='' ;
  late String? _note;
  final String _baseUrl = "192.168.101.227:9091";
  String _selectedItem = 'vacation';

  @override
  void initState() {
    super.initState();
    _startDate = DateTime.now();
    _endDate = DateTime.now();

  }

  @override
  Widget build(BuildContext context) {
    final Map<String, dynamic> args =
    ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;

    DateTime startDate = args['startDate']!;
    DateTime endDate = args['endDate']!;
    Congee? congee =args['congee'];
    String days = DateFormat('EEEE').format(startDate);
    String months = DateFormat('MMMM').format(startDate);
    String dayde = DateFormat('EEEE').format(endDate);
    String monthde = DateFormat('MMMM').format(endDate);
    String dropdownValue = 'vacation';
    print('$days');
    return Scaffold(
      body: ListView(
        children: <Widget>[
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(10, 10, 0, 10),
              child:Row(
                children:  [
                  IconButton(
                    icon: Icon(Icons.arrow_back),
                    onPressed: () {
                     // Navigator.pushReplacementNamed(context, "/Request");
                    },
                  ),
                  Text(" New Request",
                      style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold))
                ],
              )
          ),
          SizedBox(
            height: 40,
          ),
          Container(
            height: 80,// hauteur personnalisée
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: 400,
                  width: 150,
                  child: Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                    child: Column(
                      children: [
                        Expanded(
                          child: Text(
                            '$months ${startDate.day}',
                            style: TextStyle(
                              fontSize: 24,
                              color: Colors.blue,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text('$days'),
                        ),
                      ],
                    ),
                  ),
                ),
                Icon(Icons.arrow_right_alt,size: 40),
                SizedBox(
                  height: 100,
                  width: 150,
                  child: Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                    color: Colors.blue,
                    child: Column(
                      children: [
                        Expanded(child:
                         Text(
                          '$monthde ${endDate.day}',
                          style: TextStyle(
                            fontSize: 24,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        )),
                        Expanded(child:
                         Text('$dayde',style: TextStyle(color: Colors.white),)),
                      ],
                    ),
                  ),
                )

              ],

            ),
          ),
          SizedBox(
            height: 20,
          ),
          Container(

            margin: const EdgeInsets.fromLTRB(30, 0, 30, 0),
              decoration: BoxDecoration(
                color: Colors.black12,
                border: Border.all(
                  width: 2.0,
                  color: Colors.black12
                ),
                borderRadius: BorderRadius.circular(5.0),
              ),
            child:
            DropdownButton(
              items: [
                DropdownMenuItem(
                  value: 'sick',
                  child: Padding(
                    padding: EdgeInsets.only(left: 12.0),
                    child: Text('Sick'),
                  ),
                ),
                DropdownMenuItem(
                  value: 'vacation',
                  child: Padding(
                    padding: EdgeInsets.only(left: 12.0),
                    child: Text('Vacation'),
                  ),
                ),
              ],
              value: _selectedItem, // la valeur sélectionnée doit être un élément de la liste des éléments
              onChanged: (value) {
                setState(() {
                  _selectedItem = value!;
                });
              },
              elevation: 16,
              style: TextStyle(color: Colors.black),
            ),


          ),

          SizedBox(
            height: 20,
          ),
         Container(
           margin: const EdgeInsets.fromLTRB(30, 0, 30, 0),
           child:
           TextField(
             maxLines: 5,
             decoration: InputDecoration(
               border: OutlineInputBorder(),
               hintText: 'Enter some text',
             ),
             onChanged: (String value) {
               print(value);
               _note=value;
             },
           )
           ,
         )
          ,
          SizedBox(
            height: 40,
          ),
          Container(margin: const EdgeInsets.fromLTRB(250, 0, 30, 0),
            child:
            ElevatedButton(
              onPressed: () async {
                SharedPreferences prefs = await SharedPreferences.getInstance();
                Map<String, String> headers = {
                  "Content-Type": "application/json; charset=UTF-8"
                };

                if(congee==null) {
                  print("eeeeee");
                  Map<String, dynamic> congeeData = {
                    'id':prefs.getString("userId"),
                    'startDate':startDate.toIso8601String(),'endDate':endDate.toIso8601String(),'type':_type,'note':_note};
                  http.post(Uri.http(_baseUrl, "/congee/Request"), body: json.encode(congeeData), headers: headers)
                      .then((http.Response response) {
                    if(response.statusCode == 200) {
                      showDialog(
                          context: context,
                          builder: (context) {
                            return const AlertDialog(
                                title: Text("Information"),
                                content: Text("your request has been sent ")
                            );
                          }
                      );
                      Navigator.pushReplacementNamed(context, "/navigation");
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
                else {
                  print("jjjjjj");
                  Map<String, dynamic> congeeData = {
                    '_id':congee.id,
                    'startDate':startDate.toIso8601String(),'endDate':endDate.toIso8601String(),'type':_type,'note':_note};
                  http.put(Uri.http(_baseUrl, "/congee/Update"), body: json.encode(congeeData), headers: headers)
                      .then((http.Response response) {
                    if(response.statusCode == 200) {
                      showDialog(
                          context: context,
                          builder: (context) {
                            return const AlertDialog(
                                title: Text("Information"),
                                content: Text("your request has been sent ")
                            );
                          }
                      );
                      Navigator.pushReplacementNamed(context, "/navigation");
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
              child: Text('Submit'),
            ),
          )


        ],
      ),
    );
  }
}
