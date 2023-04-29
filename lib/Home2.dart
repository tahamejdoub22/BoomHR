import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:boom_hr/congee_info.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';

import 'Home.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_HomeState();

}

class _HomeState extends State<Home>
{
  late Future<bool> fetchedCongees;
  final List<Congee> _congees = [];
  final List<Congee> _congeesV = [];
  final List<Congee> _congeesS = [];
  late List<dynamic> congeesFromServer;
  late String? nom ="";
  late String? prenom ="";
  late String? salary="";
  late String? Enom="";
  late String? localisation="";
  late String? vacation="";
  late String? sick="";
  late Timer _timer;
  late String? c="";
  final List<Congee> Approuved=[];
  final List<Congee> Rejected=[];
  final List<Congee> InProgress=[];
  String? nomCapitalized;
  String? prenomCapitalized;
  int x = 0;
  Future<bool> fetchCongees() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    nom = prefs.getString("nom");
    prenom = prefs.getString("prenom");
    salary = prefs.getString("salary");
    Enom = prefs.getString("Enom");
    localisation = prefs.getString("localisation");
    vacation = prefs.getString("vacation");
    sick = prefs.getString("sick");
    c = prefs.getString("color");
    nomCapitalized = (nom?.substring(0, 1)?.toUpperCase() ?? '') + (nom?.substring(1) ?? '');
    prenomCapitalized = (prenom?.substring(0, 1)?.toUpperCase() ?? '') + (prenom?.substring(1) ?? '');
    http.Response response = await http.get(Uri.http(_baseUrl, "/congee/get/" + prefs.getString("userId")!));

    congeesFromServer = json.decode(response.body);


    congeesFromServer.forEach((congee) {
      if(congee["etat"]=="approuvé") {
        Approuved.add(Congee(
            congee["_id"], congee["date_debut"], congee["date_fin"],
            congee["etat"], congee["type"]));
      }
      else
      {
        if(congee["etat"]=="rejeté")
        {
          Rejected.add(Congee(
              congee["_id"], congee["date_debut"], congee["date_fin"],
              congee["etat"], congee["type"]));
        }
        else
        {
          InProgress.add(Congee(
              congee["_id"], congee["date_debut"], congee["date_fin"],
              congee["etat"], congee["type"]));
        }
      }
    });
    print(congeesFromServer.length);
    congeesFromServer.forEach((congee) {
      if(congee["type"]=="vacation") {
        _congeesV.add(Congee(
            congee["_id"], congee["date_debut"], congee["date_fin"],
            congee["etat"], congee["type"]));

        _congees.add(Congee(
            congee["_id"], congee["date_debut"], congee["date_fin"],
            congee["etat"], congee["type"]));
      }
      else
      {
        _congeesS.add(Congee(
            congee["_id"], congee["date_debut"], congee["date_fin"],
            congee["etat"], congee["type"]));

        _congees.add(Congee(
            congee["_id"], congee["date_debut"], congee["date_fin"],
            congee["etat"], congee["type"]));
      }
    });
    print(_congees);
    return true;
  }
  @override
  void initState() {
    fetchedCongees = fetchCongees();
    super.initState();

  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }
  final String _baseUrl = "192.168.1.179:9091";
  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();


  @override
  Widget build(BuildContext context) {
    final route = ModalRoute.of(context);
    Color hexToColor(String hexString) {
      return Color(int.parse(hexString.substring(1, 7), radix: 16) + 0xFF000000);
    }

    setState((){

    });

    return Scaffold(
        body: Form(
            key: _keyForm,
            child: FutureBuilder(
                future: fetchedCongees,
                builder: (BuildContext context ,AsyncSnapshot<bool> snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (snapshot.connectionState == ConnectionState.done) {
                    if (snapshot.hasData) {
                      return ListView(
                          children: [
                            const SizedBox(
                              height: 20,
                            ),
                            Container(
                              margin: const EdgeInsets.fromLTRB(
                                  40, 30, 10, 40),
                              child: Text("New Request",style: TextStyle(  fontSize: 24,
                                fontWeight: FontWeight.bold,
                              )),
                            ),
                              Container(

                                margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.all(Radius.circular(10)),
                                  color: Colors.blue.shade200.withOpacity(0.5),
                                ),
                              height: 100,
                  child:
                            Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SizedBox(
                                    width: 20,
                                  ),
                                  Container(
                                    width: 50,
                                    height: 50,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: Colors.white,
                                      border: Border.all(
                                        color: Colors.blue,
                                        width: 2,
                                      ),
                                    ),
                                    child: Icon(
                                      Icons.person,
                                      size: 40,
                                      color: Colors.blue,
                                    ),
                                  ),
                                  SizedBox(width: 20),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        margin: const EdgeInsets.fromLTRB(0, 15, 10, 10),
                                        child: Text(
                                          prenomCapitalized!+' '+nomCapitalized!,
                                          style: TextStyle(
                                            fontSize: 24,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        margin: const EdgeInsets.fromLTRB(0, 0, 10, 10),
                                        child: Text(
                                          Enom!,
                                          style: TextStyle(
                                            color: Colors.blue,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),

                                ],
                                  ),
                              ),
                            SizedBox(height: 20,),
                            Container(
                              height: 280,
                              margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.all(Radius.circular(10)),
                                color: Colors.blue.shade200.withOpacity(0.5),
                              ),
                              child:  Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  SizedBox(
                                    height: 20,
                                  ),
                                  Text("      "+DateFormat('MMMM').format(DateTime.parse(_congees[0].date_debut))+" "
                                      +DateTime.parse(_congees[0].date_debut).day.toString()+","+DateTime.parse(_congees[0].date_debut).year.toString()
                                    +"-"+DateFormat('MMMM').format(DateTime.parse(_congees[0].date_fin))+" "
                                      +DateTime.parse(_congees[0].date_fin).day.toString()+","+DateTime.parse(_congees[0].date_fin).year.toString())
                                  ,
                                  SizedBox(
                                    height: 20,
                                  ),
                                  Divider(),
                              SizedBox(
                              height: 20,
                            ),
                                  Text("      "+DateFormat('MMMM').format(DateTime.parse(_congees[1].date_debut))+" "
                                      +DateTime.parse(_congees[0].date_debut).day.toString()+","+DateTime.parse(_congees[1].date_debut).year.toString()
                                      +"-"+DateFormat('MMMM').format(DateTime.parse(_congees[1].date_fin))+" "
                                      +DateTime.parse(_congees[0].date_fin).day.toString()+","+DateTime.parse(_congees[1].date_fin).year.toString())
                                  ,
                                  SizedBox(
                                    height: 30,
                                  ),
                                  Divider(),
                                  SizedBox(
                                    height: 60,
                                  ),
                                  Center(
                                    child: GestureDetector(
                                      onTap: () {
                                        Navigator.pushNamed(
                                          context,
                                          "/History",
                                          arguments: {
                                            "approuvedList": Approuved,
                                            "rejectedList": Rejected,
                                            "inProgressList": InProgress,
                                          },
                                        );
                                      },
                                      child: Text(
                                        'See History',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: Colors.blue,
                                        ),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            ),
                            Container(
                              height: 60,
                              margin: const EdgeInsets.fromLTRB(
                                  20, 30, 20, 20),
                              child: ElevatedButton
                                (
                                child: Text("Request Time Off"),
                                onPressed: () {
                                  Navigator.pushNamed(
                                    context,
                                    "/Request",

                                  );
                                },
                              ),
                            ),
                            SizedBox(
                              height: 60,
                            ),
                            Center(
                              child: Row(
                                children: [
                                  SizedBox(
                                    width: 10,
                                  ),
                                  Container(
                                    height: 65,
                                    width: 180,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.all(Radius.circular(10)),
                                      color: Colors.blue.shade200.withOpacity(0.5),
                                    ),
                                    child: Column(
                                      children: [
                                        Text("Available Vacation"),
                                        Text(vacation! + " Days")
                                      ],
                                    ),
                                  ),
                                  SizedBox(
                                    width: 5,
                                  ),
                                  Container(
                                    height: 65,
                                    width: 180,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.all(Radius.circular(4)),
                                      color: Colors.blue.shade200.withOpacity(0.5),
                                    ),
                                    child: Column(
                                      children: [
                                        Text("Available Sick"),
                                        Text(sick! + " Days")
                                      ],
                                    ),

                                  ),
                                  SizedBox(
                                    width: 10,
                                  ),
                                ],
                              ),
                            ),


                            // Card(
                            //     shape: RoundedRectangleBorder(
                            //       side: BorderSide(// Définir la couleur de la bordure
                            //         color: Colors.black12,
                            //         width: 2, // Définir la largeur de la bordure
                            //       ),
                            //       borderRadius: BorderRadius.circular(10), // Définir le rayon des coins
                            //     ),
                            //     child: Column(
                            //         children: [
                            //
                            //           Row(
                            //             children: [
                            //               Container(
                            //                 margin: const EdgeInsets.fromLTRB(
                            //                     20, 50, 0, 10),
                            //                 child: Icon(Icons.watch  ,
                            //                   color: Colors.blue,),
                            //               ),
                            //               Container(
                            //                 margin: const EdgeInsets.fromLTRB(
                            //                     20, 50, 70, 10),
                            //                 child: Text("Time off",
                            //                     style: TextStyle(fontSize: 20)),
                            //               ),
                            //             ],
                            //           ),
                            //           Row(
                            //             children: [
                            //               Column(
                            //                 children: [
                            //                   Container(
                            //                       margin: const EdgeInsets
                            //                           .fromLTRB(5, 30, 0, 10),
                            //                       child: GestureDetector(
                            //                         onTap: () {
                            //                           setState(() {
                            //                             x = 1;
                            //                           });
                            //                         },
                            //                         child: const Text(
                            //                           'Vacation',
                            //                           style: TextStyle(
                            //                             decoration: TextDecoration
                            //                                 .underline,
                            //                             fontWeight: FontWeight
                            //                                 .bold,
                            //                             color: Colors.blue,
                            //                           ),
                            //                         ),
                            //                       )
                            //
                            //                   ),
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(0, 0, 0, 10),
                            //                     child: Text(vacation!,
                            //                         style: TextStyle(
                            //                             fontWeight: FontWeight
                            //                                 .bold,
                            //                             color: Colors.blue,
                            //                             fontSize: 30)),
                            //                   ),
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(30, 0, 0, 10),
                            //                     child: Text("DAYS AVAILABE",
                            //                         style: TextStyle(
                            //                             color: Colors.blue,
                            //                             fontSize: 10)),
                            //                   ),
                            //
                            //                 ],
                            //               ),
                            //               Column(
                            //                 children: [
                            //                   Container(
                            //                       margin: const EdgeInsets
                            //                           .fromLTRB(5, 30, 0, 10),
                            //                       child: GestureDetector(
                            //                         onTap: () {
                            //                           setState(() {
                            //                             x = 2;
                            //                           });
                            //                         },
                            //                         child: const Text(
                            //                           'Sick',
                            //                           style: TextStyle(
                            //                             decoration: TextDecoration
                            //                                 .underline,
                            //                             fontWeight: FontWeight
                            //                                 .bold,
                            //                             color: Colors.blue,
                            //                           ),
                            //                         ),
                            //                       )
                            //
                            //                   ),
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(20, 0, 0, 10),
                            //                     child: Text(sick!,
                            //                         style: TextStyle(
                            //                             fontWeight: FontWeight
                            //                                 .bold,
                            //                             color: Colors.blue,
                            //                             fontSize: 30)),
                            //                   ),
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(20, 0, 0, 10),
                            //                     child: Text("DAYS AVAILABE",
                            //                         style: TextStyle(
                            //                             color: Colors.blue,
                            //                             fontSize: 10)),
                            //                   ),
                            //
                            //                 ],
                            //               ),
                            //               Column(
                            //                 children: [
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(20, 30, 0, 10),
                            //                     child: Text("Bereavement",
                            //                       style: TextStyle(
                            //                           fontWeight: FontWeight
                            //                               .bold),),
                            //                   ),
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(20, 0, 0, 10),
                            //                     child: Icon(
                            //                       Icons.access_time_filled,
                            //                       color: Colors.blue,),
                            //                   ),
                            //                   Container(
                            //                     margin: const EdgeInsets
                            //                         .fromLTRB(20, 0, 0, 10),
                            //                     child: Text("0 days used"),
                            //                   ),
                            //
                            //                 ],
                            //               )
                            //             ],
                            //           ),
                            //
                            //           SizedBox(
                            //             height: 30,
                            //           ),
                            //
                            //         ]
                            //     )
                            //
                            //
                            // ),
                            // SizedBox(
                            //   height: 30,
                            // ),

                            // FutureBuilder(
                            //   future: fetchedCongees,
                            //   builder: (BuildContext context,
                            //       AsyncSnapshot<bool> snapshot) {
                            //     if (snapshot.connectionState ==
                            //         ConnectionState.waiting) {
                            //       return const Center(
                            //         child: CircularProgressIndicator(),
                            //       );
                            //     } else if (snapshot.connectionState ==
                            //         ConnectionState.done) {
                            //       if (snapshot.hasData) {
                            //         return ListView.builder(
                            //           shrinkWrap: true,
                            //           physics: NeverScrollableScrollPhysics(),
                            //           itemCount: _congees.length,
                            //           itemBuilder: (
                            //               BuildContext context,
                            //               int index) {
                            //             if (x == 0) {
                            //               return CongeeInfo(
                            //                   _congees[index]);
                            //             } else if (x == 1 && index <
                            //                 _congeesV.length) {
                            //               return CongeeInfo(
                            //                   _congeesV[index]);
                            //             } else if (x == 2 && index <
                            //                 _congeesS.length) {
                            //               return CongeeInfo(
                            //                   _congeesS[index]);
                            //             } else {
                            //               return const SizedBox
                            //                   .shrink();
                            //             }
                            //           },
                            //         );
                            //       } else if (snapshot.hasError) {
                            //         return Center(
                            //           child: Text(
                            //               'Error loading data'),
                            //         );
                            //       } else {
                            //         return const Center(
                            //           child: Text('No data'),
                            //         );
                            //       }
                            //     } else {
                            //       return const SizedBox.shrink();
                            //     }
                            //   },
                            // ),
                          ]

                      );
                    } else {
                      return Container(
                        child: Text('No data'),
                      );
                    }
                  } else {
                    // Return something to handle other connection states
                    return Container();
                  }
                }
            )
        )
    );

  }



}
