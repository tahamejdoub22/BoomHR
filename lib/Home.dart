import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() =>_HomeState();

}
class Info {
  final String? nom;
  final String? prenom;
  final double? salary;
  final double? vacation;
  final double? sick;
  final String? Enom;
  final String? localisation;

  Info(this.nom, this.prenom, this.salary, this.vacation, this.sick, this.Enom,
      this.localisation);

  @override
  String toString() {
    return 'Game{nom: $nom, prenom: $prenom, salary: $salary, vacation: $vacation, sick: $sick, Enom: $Enom, localisation: $localisation}';
  }
}
  class _HomeState extends State<Home>
{
  final List<Info> _infos = [];
  final String _baseUrl = "172.16.1.161:9091";
  final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();


  @override
  Widget build(BuildContext context) {
    final route = ModalRoute.of(context);
    final List< dynamic> userData = route!.settings.arguments as List< dynamic>;
    userData.forEach((element) {
      print(element);
      _infos.add(Info(
        element["nom"],
        element["prenom"],
        double.tryParse(element["salary"].toString()),
        double.tryParse(element["vacation"].toString()),
        double.tryParse(element["sick"].toString()),
        element["Enom"],
        element["localisation"],
      ));
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
                   Container(
                     margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                     child: Image.asset("assets/images/ellipse15.png", width: 50, height: 94),
                ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(0, 10, 20, 10),
                    child: Column(
                      children: [
                        Text(_infos.isNotEmpty ? _infos[0].nom ?? '' : ''),
                         Text(_infos.isNotEmpty ? _infos[0].prenom ?? '' : '')
                      ],
                    ),
                  ),

                  Spacer(),
                  Icon(Icons.currency_exchange,color: Colors.blue,),
                  Text(_infos.isNotEmpty ? _infos[0].salary.toString() ?? '' : '')

                ],
              ),
              Row(
                children: [
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                    child: Text("Entreprise"),
                  ),
                  Spacer(),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 70, 10),
                    child: Text(_infos.isNotEmpty ? _infos[0].Enom ?? '' : ''),
                  ),
                ],
              ),
              Divider(),
              Row(
                children: [
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 10, 10),
                    child: Text("Localisation"),
                  ),
                  Spacer(),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 70, 10),
                    child: Text(_infos.isNotEmpty ? _infos[0].localisation ?? '' : ''),
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
                        child: Text("Vacation",style: TextStyle(fontWeight: FontWeight.bold),),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                        child: Text(_infos.isNotEmpty ? _infos[0].vacation.toString() ?? '' : '',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.blue,fontSize: 30)),
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
                        margin: const EdgeInsets.fromLTRB(20, 30, 0, 10),
                        child: Text("Sick",style: TextStyle(fontWeight: FontWeight.bold),),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 0, 10),
                        child: Text(_infos.isNotEmpty ? _infos[0].sick.toString() ?? '' : '',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.blue,fontSize: 30)),
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
                    )
              ]
                )
              )

            ],
          ),
        )
    );
  }


}
