import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_application_1/Home2.dart';
import 'package:flutter_calendar_carousel/flutter_calendar_carousel.dart'
    show CalendarCarousel;
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
  late String? _type = '';
  late String? _note;
  final String _baseUrl =
      Platform.isAndroid ? "10.0.2.2:8080" : "localhost:8080";

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
    String vacation = args['vacation']!;
    String sick = args['sick']!;
    print(sick);
    Congee? congee = args['congee'];
    String days = DateFormat('EEEE').format(startDate);
    String months = DateFormat('MMMM').format(startDate);
    String dayde = DateFormat('EEEE').format(endDate);
    String monthde = DateFormat('MMMM').format(endDate);
    String dropdownValue = 'vacation';
    final duration = endDate.difference(startDate);
    final dayss = duration.inDays;

    var text;

    if (_selectedItem == "vacation") {
      text = "le nombre du jours apres submit this vacation :" +
          (int.parse(vacation) - dayss).toString();
    } else {
      text = "le nombre du jours apres envoye cette maladie  :" +
          (int.parse(sick) - dayss).toString();
    }
    print('$days');
    return Scaffold(
      body: ListView(
        children: <Widget>[
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(10, 10, 0, 10),
              child: Row(
                children: [
                  IconButton(
                    icon: Icon(Icons.arrow_back),
                    onPressed: () {
                      Navigator.pushReplacementNamed(context, "/navigation");
                    },
                  ),
                  Text(" Request Leave",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold))
                ],
              )),
          Container(
            margin: const EdgeInsets.fromLTRB(30, 0, 30, 0),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(width: 2.0, color: Colors.white),
              borderRadius: BorderRadius.circular(5.0),
              shape: BoxShape.rectangle, // définit la forme rectangulaire
            ),
            child: DropdownButton(
              items: [
                DropdownMenuItem(
                  value: 'sick',
                  child: Padding(
                    padding: EdgeInsets.only(left: 12.0),
                    child: Text('sick'),
                  ),
                ),
                DropdownMenuItem(
                  value: 'vacation',
                  child: Padding(
                    padding: EdgeInsets.only(left: 12.0),
                    child: Text('vacation'),
                  ),
                ),
              ],
              value:
                  _selectedItem, // la valeur sélectionnée doit être un élément de la liste des éléments
              onChanged: (value) {
                setState(() {
                  _selectedItem = value!;
                  _type = _selectedItem;
                });
              },
              elevation: 16,
              style: TextStyle(color: Colors.black),
            ),
          ),
          SizedBox(
            height: 40,
          ),
          Container(
            height: 80, // hauteur personnalisée
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: 400,
                  width: 170,
                  child: Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15.0),
                      ),
                      child: Row(
                        children: [
                          SizedBox(
                            width: 10,
                          ),
                          Icon(Icons.event_note),
                          SizedBox(
                            width: 10,
                          ),
                          Column(
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
                        ],
                      )),
                ),
                SizedBox(
                  height: 100,
                  width: 170,
                  child: Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15.0),
                      ),
                      color: Colors.blue,
                      child: Row(
                        children: [
                          SizedBox(
                            width: 10,
                          ),
                          Icon(
                            Icons.event_note,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                          Column(
                            children: [
                              Expanded(
                                  child: Text(
                                '$monthde ${endDate.day}',
                                style: TextStyle(
                                  fontSize: 24,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              )),
                              Expanded(
                                  child: Text(
                                '$dayde',
                                style: TextStyle(color: Colors.white),
                              )),
                            ],
                          ),
                        ],
                      )),
                )
              ],
            ),
          ),
          SizedBox(
            height: 20,
          ),
          SizedBox(
            height: 20,
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(30, 0, 30, 0),
            child: TextField(
              maxLines: 5,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'Reason',
              ),
              onChanged: (String value) {
                print(value);
                _note = value;
              },
            ),
          ),
          SizedBox(
            height: 40,
          ),
          Text(text),
          Container(
            margin: const EdgeInsets.fromLTRB(250, 0, 30, 0),
            child: ElevatedButton(
              onPressed: () async {
                SharedPreferences prefs = await SharedPreferences.getInstance();
                Map<String, String> headers = {
                  "Content-Type": "application/json; charset=UTF-8"
                };

                if (congee == null) {
                  print("eeeeee");
                  print(_type);
                  Map<String, dynamic> congeeData = {
                    'id': prefs.getString("userId"),
                    'startDate': startDate.toIso8601String(),
                    'endDate': endDate.toIso8601String(),
                    'type': _type,
                    'note': _note
                  };
                  http
                      .post(Uri.http(_baseUrl, "/congee/Request"),
                          body: json.encode(congeeData), headers: headers)
                      .then((http.Response response) {
                    if (response.statusCode == 200) {
                      showDialog(
                          context: context,
                          builder: (context) {
                            return const AlertDialog(
                                title: Text("Information"),
                                content: Text("your request has been sent "));
                          });
                      Navigator.pushReplacementNamed(context, "/navigation");
                    } else if (response.statusCode == 401) {
                      showDialog(
                          context: context,
                          builder: (context) {
                            return const AlertDialog(
                                title: Text("Information"),
                                content: Text(
                                    "Username et/ou mot de passe incorrect"));
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
                  });
                } else {
                  Map<String, dynamic> congeeData = {
                    '_id': congee.id,
                    'startDate': startDate.toIso8601String(),
                    'endDate': endDate.toIso8601String(),
                    'type': _type,
                    'note': _note
                  };
                  http
                      .put(Uri.http(_baseUrl, "/congee/Update"),
                          body: json.encode(congeeData), headers: headers)
                      .then((http.Response response) {
                    if (response.statusCode == 200) {
                      showDialog(
                          context: context,
                          builder: (context) {
                            return const AlertDialog(
                                title: Text("Information"),
                                content: Text("your request has been sent "));
                          });
                      Navigator.pushReplacementNamed(context, "/navigation");
                    } else if (response.statusCode == 401) {
                      showDialog(
                          context: context,
                          builder: (context) {
                            return const AlertDialog(
                                title: Text("Information"),
                                content: Text(
                                    "Username et/ou mot de passe incorrect"));
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
