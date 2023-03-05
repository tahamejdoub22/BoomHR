import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_calendar_carousel/flutter_calendar_carousel.dart' show CalendarCarousel;
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class ValidateRequest extends StatefulWidget {
  @override
  _ValidateRequestState createState() => _ValidateRequestState();
}

class _ValidateRequestState extends State<ValidateRequest> {
  late DateTime _startDate;
  late DateTime _endDate;
  late String? _type ;
  late String? _note;
  final String _baseUrl = "10.0.2.2:9091";

  @override
  void initState() {
    super.initState();
    _startDate = DateTime.now();
    _endDate = DateTime.now();
  }

  @override
  Widget build(BuildContext context) {
    final Map<String, DateTime> args =
    ModalRoute.of(context)!.settings.arguments as Map<String, DateTime>;

    DateTime startDate = args['startDate']!;
    DateTime endDate = args['endDate']!;
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
                      Navigator.pushReplacementNamed(context, "/");
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
            height: 50,// hauteur personnalisée
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  child: Column(
                    children: [
                      Expanded(child :
                       Text(
                        '$months ${startDate.day}',
                        style: TextStyle(
                          fontSize: 24,
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ) )
                      ,
                      Expanded(child:
                       Text('$days') ),
                    ],
                  ),
                ),
                Icon(Icons.arrow_right_alt),
                Card(
                  child: Column(
                    children: [
                      Expanded(child:
                      Text(
                        '$monthde ${endDate.day}',
                        style: TextStyle(
                          fontSize: 24,
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      )),
                      Expanded(child:
                       Text('$dayde')),
                    ],
                  ),
                ),
              ],

            ),
          ),
          DropdownButton<String>(
            value: dropdownValue,
            onChanged: (String? newValue) {
              setState(() {
                dropdownValue = newValue!;
                _type=newValue;
              });
            },
            items: <String>['vacation', 'sick']
                .map((value) {
              return DropdownMenuItem<String>(
                value: value.toLowerCase(),
                child: Text(value),
              );
            }).toList(),
          ),

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
          ),
          ElevatedButton(
            onPressed: () {
              Map<String, dynamic> congeeData = {
                'id':'63f62662d76692b05dad501e',
                'startDate':startDate.toString(),'endDate':endDate.toString(),'type':_type,'note':_note};
              print(congeeData['id']);
              print(congeeData['startDate']);
              print(congeeData['note']);
              print(congeeData['type']);

              http.post(Uri.http(_baseUrl, "/congee/Request"), body: json.encode(congeeData))
                  .then((http.Response response) {
                if(response.statusCode == 200) {
                  // dynamic jsonData = json.decode(response.body);
                  // List<dynamic> userData = [];
                  //
                  // if (jsonData is List<dynamic>) {
                  //   userData = jsonData;
                  // } else {
                  //   userData.add(jsonData);
                  // }
                  showDialog(
                      context: context,
                      builder: (context) {
                        return const AlertDialog(
                            title: Text("Information"),
                            content: Text("Logged successfully")
                        );
                      }
                  );
                //  Navigator.pushReplacementNamed(context, "/navigation");
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
            },
            child: Text('Afficher les dates sélectionnées'),
          ),


        ],
      ),
    );
  }
}
