import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _HomeState();
}

class Congee {
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

class _HomeState extends State<Home> {
  late Future<bool> fetchedCongees;
  final List<Congee> _congees = [];
  final List<Congee> _congeesV = [];
  final List<Congee> _congeesS = [];
  late List<dynamic> congeesFromServer;
  late SharedPreferences prefs;
  String? nom;
  String? prenom;
  String? salary;
  String? Enom;
  String? localisation;
  String? vacation;
  String? sick;
  String? c;
  final List<Congee> Approuved = [];
  final List<Congee> Rejected = [];
  final List<Congee> InProgress = [];
  String? nomCapitalized;
  String? prenomCapitalized;
  int x = 0;

  Future<void> initSharedPreferences() async {
    prefs = await SharedPreferences.getInstance();
  }

  Future<bool> fetchCongees() async {
    await initSharedPreferences();
    nom = prefs.getString("nom");
    prenom = prefs.getString("prenom");
    Enom = prefs.getString("job_title");
    localisation = prefs.getString("address");
    vacation = prefs.getString("vacation");
    sick = prefs.getString("sick");
    c = prefs.getString("color");
    nomCapitalized =
        (nom?.substring(0, 1).toUpperCase() ?? '') + (nom?.substring(1) ?? '');
    prenomCapitalized = (prenom?.substring(0, 1).toUpperCase() ?? '') +
        (prenom?.substring(1) ?? '');

    final String userId = prefs.getString("userId")!;
    final Uri uri = Uri.http(_baseUrl, "/congee/get/$userId");
    print(userId);

    http.Response response = await http.get(uri);
    congeesFromServer = json.decode(response.body);
    print(congeesFromServer);
    congeesFromServer.forEach((congee) {
      if (congee["etat"] == "approuvé") {
        Approuved.add(Congee(congee["_id"], congee["date_debut"],
            congee["date_fin"], congee["etat"], congee["type"]));
      } else {
        if (congee["etat"] == "rejeté") {
          Rejected.add(Congee(congee["_id"], congee["date_debut"],
              congee["date_fin"], congee["etat"], congee["type"]));
        } else {
          InProgress.add(Congee(congee["_id"], congee["date_debut"],
              congee["date_fin"], congee["etat"], congee["type"]));
        }
      }
    });

    congeesFromServer.forEach((congee) {
      if (congee["type"] == "vacation") {
        _congeesV.add(Congee(congee["_id"], congee["date_debut"],
            congee["date_fin"], congee["etat"], congee["type"]));

        _congees.add(Congee(congee["_id"], congee["date_debut"],
            congee["date_fin"], congee["etat"], congee["type"]));
      } else {
        _congeesS.add(Congee(congee["_id"], congee["date_debut"],
            congee["date_fin"], congee["etat"], congee["type"]));

        _congees.add(Congee(congee["_id"], congee["date_debut"],
            congee["date_fin"], congee["etat"], congee["type"]));
      }
    });

    // ... Rest of the code remains the same ...
    return true;
  }

  @override
  void initState() {
    fetchedCongees = fetchCongees();
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  final String _baseUrl =
      Platform.isAndroid ? "172.16.1.124:8081" : "localhost:8080";

  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _keyForm,
        child: FutureBuilder(
          future: fetchedCongees,
          builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.connectionState == ConnectionState.done) {
              if (snapshot.hasData) {
                return ListView(
                  children: [
                    const SizedBox(height: 20),
                    _buildHeaderSection(),
                    _buildProfileSection(),
                    const SizedBox(height: 20),
                    _buildTimeOffHistory(),
                    _buildRequestTimeOffButton(),
                    const SizedBox(height: 30),
                    _buildAvailableDaysSection(),
                    const SizedBox(height: 30),
                  ],
                );
              } else {
                return const Center(child: Text('No data'));
              }
            } else {
              return Container();
            }
          },
        ),
      ),
    );
  }

  Widget _buildHeaderSection() {
    return Container(
      margin: const EdgeInsets.fromLTRB(40, 30, 10, 40),
      child: Text(
        "New Request",
        style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildProfileSection() {
    return Container(
      margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        color: Colors.blue.shade200.withOpacity(0.5),
      ),
      height: 100,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          SizedBox(width: 20),
          _buildProfileIcon(),
          SizedBox(width: 20),
          _buildProfileInfo(),
        ],
      ),
    );
  }

  Widget _buildProfileIcon() {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.white,
        border: Border.all(color: Colors.blue, width: 2),
      ),
      child: Icon(Icons.person, size: 40, color: Colors.blue),
    );
  }

  Widget _buildProfileInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: const EdgeInsets.fromLTRB(0, 15, 10, 10),
          child: Text(
            '$prenomCapitalized $nomCapitalized',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
        Container(
          margin: const EdgeInsets.fromLTRB(0, 0, 10, 10),
          child: Text(
            Enom!,
            style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }

  Widget _buildTimeOffHistory() {
    return Container(
      height: 280,
      margin: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        color: Colors.blue.shade200.withOpacity(0.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 20),
          Expanded(
            child: _congees.isNotEmpty
                ? ListView.builder(
                    padding: const EdgeInsets.all(8),
                    itemCount: _congees.length > 2 ? 2 : _congees.length,
                    itemBuilder: (BuildContext context, int index) {
                      return _buildTimeOffEntry(_congees[index]);
                    },
                  )
                : Center(child: Text("No time off history")),
          ),
          SizedBox(height: 20),
          Divider(),
          SizedBox(height: 20),
          _buildSeeHistory(),
        ],
      ),
    );
  }

  Widget _buildTimeOffEntry(Congee conge) {
    return Padding(
      padding: const EdgeInsets.only(left: 16.0),
      child: Text(
        DateFormat('MMMM').format(DateTime.parse(conge.date_debut)) +
            " " +
            DateTime.parse(conge.date_debut).day.toString() +
            "," +
            DateTime.parse(conge.date_debut).year.toString() +
            "-" +
            DateFormat('MMMM').format(DateTime.parse(conge.date_fin)) +
            " " +
            DateTime.parse(conge.date_fin).day.toString() +
            "," +
            DateTime.parse(conge.date_fin).year.toString(),
      ),
    );
  }

  Widget _buildSeeHistory() {
    return Center(
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
    );
  }

  Widget _buildRequestTimeOffButton() {
    return Container(
      height: 60,
      margin: const EdgeInsets.fromLTRB(20, 30, 20, 20),
      child: ElevatedButton(
        child: Text("Request Time Off"),
        onPressed: () {
          Navigator.pushNamed(context, "/Request",
              arguments: {'vacation': vacation, 'sick': sick});
        },
      ),
    );
  }

  Widget _buildAvailableDaysSection() {
    return Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _buildAvailableDaysCard("Available Vacation", vacation!),
          SizedBox(width: 10),
          _buildAvailableDaysCard("Available Sick", sick!),
        ],
      ),
    );
  }

  Widget _buildAvailableDaysCard(String title, String days) {
    return Container(
      height: 80,
      width: 160,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        color: Colors.blue.shade200.withOpacity(0.5),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              color: Colors.blue.shade800,
            ),
          ),
          SizedBox(height: 5),
          Text(
            days + " Days",
            style: TextStyle(
              fontSize: 18,
              color: Colors.blue.shade800,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
