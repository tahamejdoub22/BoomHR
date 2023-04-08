import 'dart:async';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_Profile();

}
class _Profile extends State<Profile>
{

  String? _email = 'oussama.sebai@esprit.tn';

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();

  final String _baseUrl = "192.168.153.227:9091";

  late Timer _timer;

  late String? c="";
  late String? nom="";
  late String? prenom = "";

  Future<void> maFonctionAsynchrone() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
   c= prefs.getString('color');
   nom = prefs.getString('nom');
   prenom = prefs.getString('prenom');
  }

// Utiliser la fonction asynchrone


  @override
  void initState() {
    super.initState();
    maFonctionAsynchrone();
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
  @override
  Widget build(BuildContext context) {
    Color hexToColor(String hexString) {
      return Color(int.parse(hexString.substring(1, 7), radix: 16) + 0xFF000000);
    }
    return Scaffold(
        body: Form(
          key: _keyForm,
          child:
          ListView(
            children: [
              Container(
                  width: double.infinity,
                  margin: const EdgeInsets.fromLTRB(0, 40, 20, 10),
                  child:Row(
                    children:  [
                      IconButton(
                        icon: Icon(Icons.arrow_back),
                        onPressed: () {
                          Navigator.pushReplacementNamed(context, "/navigation");
                        },
                      ),
                      Expanded(child:
                       SizedBox()),
                      IconButton(onPressed:() {
                        Navigator.pushReplacementNamed(context, "/");
                       }, icon: Icon(Icons.logout_outlined))
                    ],
                  )
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                child: CircleAvatar(
                  radius: 40,
                  backgroundColor: hexToColor(c!),
                  child: Text(
                    nom!.substring(0, 1).toUpperCase(),
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
              Center(
                child: Text(
                  nom!,
                  style: TextStyle(fontSize: 24),
                ),
              ),
              Center(
                child: Text(
                  prenom!,
                  style: TextStyle(fontSize: 24),
                ),
              ),

              Container(
                margin: const EdgeInsets.fromLTRB(10, 50, 10, 10),
                child: ElevatedButton(
                  onPressed: () {},
                  style: ButtonStyle(
                    minimumSize: MaterialStateProperty.all(Size(200, 50)), // personnaliser la hauteur et la largeur souhaitées
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    backgroundColor: MaterialStateProperty.all(Colors.black12),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.privacy_tip),
                      SizedBox(width: 8),
                      Text("Privicy"),
                    ],
                  ),
                )

              ),
              Container(
                  margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      minimumSize: MaterialStateProperty.all(Size(200, 50)), // personnaliser la hauteur et la largeur souhaitées
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      backgroundColor: MaterialStateProperty.all(Colors.black12),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.history),
                        SizedBox(width: 8),
                        Text("Purchase History"),
                      ],
                    ),
                  )

              ),
              Container(
                  margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      minimumSize: MaterialStateProperty.all(Size(200, 50)), // personnaliser la hauteur et la largeur souhaitées
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      backgroundColor: MaterialStateProperty.all(Colors.black12),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.help_center_outlined),
                        SizedBox(width: 8),
                        Text("Help & Support"),
                      ],
                    ),
                  )

              ),
              Container(
                  margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      minimumSize: MaterialStateProperty.all(Size(200, 50)), // personnaliser la hauteur et la largeur souhaitées
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      backgroundColor: MaterialStateProperty.all(Colors.black12),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.settings),
                        SizedBox(width: 8),
                        Text("Settings"),
                      ],
                    ),
                  )

              ),
              Container(
                  margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      minimumSize: MaterialStateProperty.all(Size(200, 50)), // personnaliser la hauteur et la largeur souhaitées
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      backgroundColor: MaterialStateProperty.all(Colors.black12),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.person_add),
                        SizedBox(width: 8),
                        Text("Invite a friend"),
                      ],
                    ),
                  )

              ),
              Container(
                  margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),

                  child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      minimumSize: MaterialStateProperty.all(Size(200, 50)), // personnaliser la hauteur et la largeur souhaitées
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      backgroundColor: MaterialStateProperty.all(Colors.black12),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.logout_outlined),
                        SizedBox(width: 8),
                        Text("Logout"),
                      ],
                    ),
                  )


              )
            ],
          ),
        )
    );
  }


}
