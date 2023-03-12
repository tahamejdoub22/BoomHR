import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:boom_hr/congee_info.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_HomeState();

}
class   Congee {
  final String id;
  final String date_debut;
  final String date_fin;
  final String etat;
  final String note;

  Congee(this.id, this.date_debut, this.date_fin, this.etat, this.note);

  @override
  String toString() {
    return 'Congee{_id: $id, date_debut: $date_debut, date_fin: $date_fin, etat: $etat, note: $note}';
  }
}

  class _HomeState extends State<Home>
{
  int _counter = 0;
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
    http.Response response = await http.get(Uri.http(_baseUrl, "/congee/get/" + prefs.getString("userId")!));

     congeesFromServer = json.decode(response.body);

    print("++++++++++++");
    print(congeesFromServer[0]["type"]);
    print(nom);
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
    _timer = Timer.periodic(Duration(milliseconds: 10), (timer) {
      setState(() {
      });
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }
  final String _baseUrl = "192.168.101.227:9091";
  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();


  @override
  Widget build(BuildContext context) {
    final route = ModalRoute.of(context);
    //  List<dynamic> _infos = [];
    // final Map<String, dynamic> userData = route!.settings.arguments as Map<String,dynamic>;
    // _infos = userData.values.toList();
    Color hexToColor(String hexString) {
      return Color(int.parse(hexString.substring(1, 7), radix: 16) + 0xFF000000);
    }

    setState((){

    });

    return Scaffold(
        body: Form(
          key: _keyForm,
          child:
            ListView(
            children: [
              const SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/Profile');
                    },
                    child: Container(
                      margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                      child: CircleAvatar(
                        backgroundColor: hexToColor(c!),
                        child: Text(
                          nom!.substring(0, 1).toUpperCase(),
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(0, 10, 20, 10),
                    child: Column(
                      children: [
                        Text(nom!),
                         Text(prenom!)
                      ],
                    ),
                  ),

                  Spacer(),
                  Text(salary!),
                  Icon(Icons.attach_money,color: Colors.blue,),
                ],
              ),
              Row(
                children: [
                  Icon(Icons.home),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                    child: Text("Entreprise"),
                  ),
                  Spacer(),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 70, 10),
                    child: Text(Enom!),
                  ),
                ],
              ),
              Divider(),
              Row(
                children: [
                  Icon(Icons.location_on),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                    child: Text("Localisation"),
                  ),
                  Spacer(),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 70, 10),
                    child: Text(localisation!),
                  ),
                ],
              ),
              Card(
                child: Column(
                  children: [

                  Row(
                 children: [
                   Container(
                    margin: const EdgeInsets.fromLTRB(20, 50, 0, 10),
                    child: Icon(Icons.timer_off,color: Colors.blue,),
                  ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 50, 70, 10),
                    child: Text("Time off",style: TextStyle(fontSize: 20)),
                  ),
                ],
              ),
                Row(
                children: [
                  Column(
                    children: [
                      Container(
                        margin: const EdgeInsets.fromLTRB(5, 30, 0, 10),
                        child: GestureDetector(
                          onTap: () {
                            setState((){
                            x=1;
                            });
                          },
                          child: const Text(
                            'Vacation',
                            style: TextStyle(
                              decoration: TextDecoration.underline,fontWeight: FontWeight.bold,
                              color: Colors.blue,
                            ),
                          ),
                        )

                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                        child: Text(vacation!,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.blue,fontSize: 30)),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(30, 0, 0, 10),
                        child: Text("HOURS AVAILABE",style: TextStyle(color: Colors.blue,fontSize: 10)),
                      ),

                    ],
                  ),
                  Column(
                    children: [
                      Container(
                          margin: const EdgeInsets.fromLTRB(5, 30, 0, 10),
                          child: GestureDetector(
                            onTap: () {
                              setState((){
                                x=2;
                              });
                            },
                            child: const Text(
                              'Sick',
                              style: TextStyle(
                                decoration: TextDecoration.underline,fontWeight: FontWeight.bold,
                                color: Colors.blue,
                              ),
                            ),
                          )

                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 0, 10),
                        child: Text(sick!,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.blue,fontSize: 30)),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 0, 10),
                        child: Text("HOURS AVAILABE",style: TextStyle(color: Colors.blue,fontSize: 10)),
                      ),

                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 30, 0, 10),
                        child: Text("Bereavement",style: TextStyle(fontWeight: FontWeight.bold),),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 0, 10),
                        child: Icon(Icons.access_time_filled,color: Colors.blue,),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 0, 10),
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
                          Navigator.pushNamed(context, "/Request");
                        },
                      ),
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    FutureBuilder(
                      future: fetchedCongees,
                      builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return const Center(
                            child: CircularProgressIndicator(),
                          );
                        } else if (snapshot.connectionState == ConnectionState.done) {
                          if (snapshot.hasData) {
                            return ListView.builder(
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              itemCount: _congees.length,
                              itemBuilder: (BuildContext context, int index) {
                                if (x==0) {
                                  return CongeeInfo(_congees[index]);
                                } else if (x==1 && index < _congeesV.length) {
                                  return CongeeInfo(_congeesV[index]);
                                } else if (x==2 && index < _congeesS.length) {
                                  return CongeeInfo(_congeesS[index]);
                                } else {

                                  return const SizedBox.shrink();
                                }

                              },
                            );
                          } else if (snapshot.hasError) {
                            return Center(
                              child: Text('Error loading data'),
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
                )


            ),
      ]
    ),

        ),

    );

  }



}
