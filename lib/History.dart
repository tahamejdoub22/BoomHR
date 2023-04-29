import 'dart:math';

import 'package:boom_hr/Home.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';

class History extends StatefulWidget {


  const History({Key? key,}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_HistoryState();
}
class _HistoryState extends State<History>
{

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();


  @override
  Widget build(BuildContext context) {
    final route = ModalRoute.of(context);
    if (route == null) {
      // Handle the case where the route is null
      return Container();
    }
    final args = route.settings.arguments as Map<String, List<Congee>>;
    final List<Congee> approuvedList = args["approuvedList"]!;
    final List<Congee> rejectedList = args["rejectedList"]!;
    final List<Congee> inProgressList = args["inProgressList"]!;
    Random random = Random();
    Color color = Color.fromARGB(
      255,
      random.nextInt(256),
      random.nextInt(256),
      random.nextInt(256),);
    String colorToHex(Color color) {
      return '#${color.value.toRadixString(16).substring(2)}';
    }
    return Scaffold(
        body: Form(
          key: _keyForm,
          child:
          DefaultTabController(
            length: 3,
            child: Column(
              children: [
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.fromLTRB(10, 50, 0, 10),
                  child: Row(
                    children: [
                      IconButton(
                        icon: Icon(Icons.arrow_back),
                        onPressed: () {
                          Navigator.pushReplacementNamed(context, "/navigation");
                        },
                      ),
                      Text("History Congee",
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))
                    ],
                  ),
                ),
                Theme(
                  data: ThemeData(
                    textTheme: TextTheme(
                      bodyText1: TextStyle(color: Colors.black),
                    ),
                  ),
                  child: TabBar(
                    labelColor: Colors.black,
                    tabs: [
                      Tab(text: "Approuved"),
                      Tab(text: "Rejected"),
                      Tab(text: "In Progress"),
                    ],
                  ),
                ),
                Expanded(
                  child: TabBarView(
                    children: [
                      ListView.builder(
                        itemCount: approuvedList.length,
                        itemBuilder: (context, index) {
                          final item = approuvedList[index];
                          return ListTile(
                            leading: Icon(Icons.event_available, color: Colors.blue),
                            title: Text(DateFormat('MMMM').format(DateTime.parse(item.date_debut))+" "
                                +DateTime.parse(item.date_debut).day.toString()+","+DateTime.parse(item.date_debut).year.toString()),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    SizedBox(
                                      height: 40,
                                    ),
                                    Text("Time period: ${DateTime.parse(item.date_fin).difference(DateTime.parse(
                                        item.date_debut
                                    )).inDays}"),
                                    Expanded(child: SizedBox()),
                                    Text(" ${item.etat}", style: TextStyle(color: Colors.green.shade800,  fontWeight: FontWeight.bold)),

                                  ],
                                ),

                                SizedBox(
                                  height: 10,
                                )
                              ],
                            ),
                          );
                        },
                      ),
                      ListView.builder(
                        itemCount: rejectedList.length,
                        itemBuilder: (context, index) {
                          final item = rejectedList[index];
                          return ListTile(
                            leading: Icon(Icons.event_available, color: Colors.blue),
                            title: Text(DateFormat('MMMM').format(DateTime.parse(item.date_debut))+" "
                                +DateTime.parse(item.date_debut).day.toString()+","+DateTime.parse(item.date_debut).year.toString()),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    SizedBox(
                                      height: 40,
                                    ),
                                    Text("Time period: ${DateTime.parse(item.date_fin).difference(DateTime.parse(
                                        item.date_debut
                                    )).inDays}"),
                                    Expanded(child: SizedBox()),
                                    Text(" ${item.etat}", style: TextStyle(color: Colors.redAccent.shade200,  fontWeight: FontWeight.bold)),

                                  ],
                                ),

                                SizedBox(
                                  height: 10,
                                )
                              ],
                            ),
                          );
                        },
                      ),
                      ListView.builder(
                        itemCount: inProgressList.length,
                        itemBuilder: (context, index) {
                          final item = inProgressList[index];
                          return ListTile(
                            leading: Icon(Icons.event_available, color: Colors.blue),
                            title: Text(DateFormat('MMMM').format(DateTime.parse(item.date_debut))+" "
                                +DateTime.parse(item.date_debut).day.toString()+","+DateTime.parse(item.date_debut).year.toString()),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    SizedBox(
                                      height: 40,
                                    ),
                                    Text("Time period: ${DateTime.parse(item.date_fin).difference(DateTime.parse(
                                        item.date_debut
                                    )).inDays}"),
                                    Expanded(child: SizedBox()),
                                    Text(" ${item.etat}", style: TextStyle(color: Colors.yellow.shade500,  fontWeight: FontWeight.bold)),

                                  ],
                                ),

                                SizedBox(
                                  height: 10,
                                )
                              ],
                            ),
                          );
                        },
                      ),
                      // Your widgets to display the Rejected list here
                      // Your widgets to display the In Progress list here
                    ],
                  ),
                ),
              ],
            ),
          )

        )
    );
  }


}
