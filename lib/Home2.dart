import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:boom_hr/congee_info.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

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

    print("++++++++++++");
    print(congeesFromServer[0]["type"]);
    print(nomCapitalized);
    print("++++++++++++");
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
  final String _baseUrl = "192.168.153.227:9091";
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
                            Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Container(
                                    width: 150,
                                    height: 150,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: Colors.white,
                                      border: Border.all(
                                        color: Colors.blue,
                                        width: 3,
                                      ),
                                    ),
                                    child: Icon(
                                      Icons.person,
                                      size: 100,
                                      color: Colors.blue,
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  Text(
                                    prenomCapitalized!+' '+nomCapitalized!,
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Divider(),
                            SizedBox(height: 30,),
                            Row(
                              children: [
                                Container(
                                  margin: const EdgeInsets.fromLTRB(
                                      20, 10, 10, 10),
                                  child: Text("Entreprise",style: TextStyle(color: Colors.grey),),
                                ),
                                Spacer(),
                                Container(
                                  margin: const EdgeInsets.fromLTRB(
                                      20, 10, 50, 10),
                                  child: Text("Localisation",style: TextStyle(color: Colors.grey),),
                                ),
                                Container(
                                  margin: const EdgeInsets.fromLTRB(
                                      20, 10, 70, 10),
                                  child: Text("Age",style: TextStyle(color: Colors.grey),),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Container(
                                  margin: const EdgeInsets.fromLTRB(
                                      20, 0, 10, 10),
                                  child: Text(Enom!,style: TextStyle(color: Colors.blue,fontWeight: FontWeight
                                      .bold,)),
                                ),
                                Spacer(),
                                Container(
                                  margin: const EdgeInsets.fromLTRB(
                                      20, 0, 100, 10),
                                  child: Text(localisation!,style: TextStyle(color: Colors.blue,fontWeight: FontWeight
                                      .bold,)),
                                ),
                                Container(
                                  margin: const EdgeInsets.fromLTRB(
                                      20, 0, 70, 10),
                                  child: Text("19",style: TextStyle(color: Colors.blue,fontWeight: FontWeight
                                      .bold,)),
                                ),
                              ],
                            ),

                            Card(
                                shape: RoundedRectangleBorder(
                                  side: BorderSide(// Définir la couleur de la bordure
                                    color: Colors.black12,
                                    width: 2, // Définir la largeur de la bordure
                                  ),
                                  borderRadius: BorderRadius.circular(10), // Définir le rayon des coins
                                ),
                                child: Column(
                                    children: [

                                      Row(
                                        children: [
                                          Container(
                                            margin: const EdgeInsets.fromLTRB(
                                                20, 50, 0, 10),
                                            child: Icon(Icons.timer_off,
                                              color: Colors.blue,),
                                          ),
                                          Container(
                                            margin: const EdgeInsets.fromLTRB(
                                                20, 50, 70, 10),
                                            child: Text("Time off",
                                                style: TextStyle(fontSize: 20)),
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          Column(
                                            children: [
                                              Container(
                                                  margin: const EdgeInsets
                                                      .fromLTRB(5, 30, 0, 10),
                                                  child: GestureDetector(
                                                    onTap: () {
                                                      setState(() {
                                                        x = 1;
                                                      });
                                                    },
                                                    child: const Text(
                                                      'Vacation',
                                                      style: TextStyle(
                                                        decoration: TextDecoration
                                                            .underline,
                                                        fontWeight: FontWeight
                                                            .bold,
                                                        color: Colors.blue,
                                                      ),
                                                    ),
                                                  )

                                              ),
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(0, 0, 0, 10),
                                                child: Text(vacation!,
                                                    style: TextStyle(
                                                        fontWeight: FontWeight
                                                            .bold,
                                                        color: Colors.blue,
                                                        fontSize: 30)),
                                              ),
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(30, 0, 0, 10),
                                                child: Text("DAYS AVAILABE",
                                                    style: TextStyle(
                                                        color: Colors.blue,
                                                        fontSize: 10)),
                                              ),

                                            ],
                                          ),
                                          Column(
                                            children: [
                                              Container(
                                                  margin: const EdgeInsets
                                                      .fromLTRB(5, 30, 0, 10),
                                                  child: GestureDetector(
                                                    onTap: () {
                                                      setState(() {
                                                        x = 2;
                                                      });
                                                    },
                                                    child: const Text(
                                                      'Sick',
                                                      style: TextStyle(
                                                        decoration: TextDecoration
                                                            .underline,
                                                        fontWeight: FontWeight
                                                            .bold,
                                                        color: Colors.blue,
                                                      ),
                                                    ),
                                                  )

                                              ),
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(20, 0, 0, 10),
                                                child: Text(sick!,
                                                    style: TextStyle(
                                                        fontWeight: FontWeight
                                                            .bold,
                                                        color: Colors.blue,
                                                        fontSize: 30)),
                                              ),
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(20, 0, 0, 10),
                                                child: Text("DAYS AVAILABE",
                                                    style: TextStyle(
                                                        color: Colors.blue,
                                                        fontSize: 10)),
                                              ),

                                            ],
                                          ),
                                          Column(
                                            children: [
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(20, 30, 0, 10),
                                                child: Text("Bereavement",
                                                  style: TextStyle(
                                                      fontWeight: FontWeight
                                                          .bold),),
                                              ),
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(20, 0, 0, 10),
                                                child: Icon(
                                                  Icons.access_time_filled,
                                                  color: Colors.blue,),
                                              ),
                                              Container(
                                                margin: const EdgeInsets
                                                    .fromLTRB(20, 0, 0, 10),
                                                child: Text("0 days used"),
                                              ),

                                            ],
                                          )
                                        ],
                                      ),
                                      Container(
                                        child: ElevatedButton
                                          (
                                          child: Text("Request Time Off"),
                                          onPressed: () {
                                            Navigator.pushNamed(
                                                context, "/Request");
                                          },
                                        ),
                                      ),
                                      SizedBox(
                                        height: 30,
                                      ),

                                    ]
                                )


                            ),
                            SizedBox(
                              height: 30,
                            ),

                            FutureBuilder(
                              future: fetchedCongees,
                              builder: (BuildContext context,
                                  AsyncSnapshot<bool> snapshot) {
                                if (snapshot.connectionState ==
                                    ConnectionState.waiting) {
                                  return const Center(
                                    child: CircularProgressIndicator(),
                                  );
                                } else if (snapshot.connectionState ==
                                    ConnectionState.done) {
                                  if (snapshot.hasData) {
                                    return ListView.builder(
                                      shrinkWrap: true,
                                      physics: NeverScrollableScrollPhysics(),
                                      itemCount: _congees.length,
                                      itemBuilder: (
                                          BuildContext context,
                                          int index) {
                                        if (x == 0) {
                                          return CongeeInfo(
                                              _congees[index]);
                                        } else if (x == 1 && index <
                                            _congeesV.length) {
                                          return CongeeInfo(
                                              _congeesV[index]);
                                        } else if (x == 2 && index <
                                            _congeesS.length) {
                                          return CongeeInfo(
                                              _congeesS[index]);
                                        } else {
                                          return const SizedBox
                                              .shrink();
                                        }
                                      },
                                    );
                                  } else if (snapshot.hasError) {
                                    return Center(
                                      child: Text(
                                          'Error loading data'),
                                    );
                                  } else {
                                    return const Center(
                                      child: Text('No data'),
                                    );
                                  }
                                } else {
                                  return const SizedBox.shrink();
                                }
                              },
                            ),
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
